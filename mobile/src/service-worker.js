/*
 * @Author: Ratikanta Pradhan 
 * @email:   ratikanta@sdrc.co.in 
 * @Date: 2017-10-12 19:30:33 
 * @Last Modified by: Ratikanta Pradhan
 * @Last Modified time: 2018-01-08 12:24:24
 */

//v0.1.78 15-01-2018 14:35


'use strict';
importScripts('./build/sw-toolbox.js');
importScripts('./assets/js/pouchdb-6.2.0.min.js');

var server_url = 'http://localhost:8080/ess/';
// var server_url = "http://192.168.1.108:8081/ess/"
// var home_page = 'http://192.168.1.108:8081/ess-de/';
// var server_url = 'https://prod2.sdrc.co.in/ess-test/';
// var home_page = 'https://prod2.sdrc.co.in/ess-de-test/';
var appVersionName = '2.1.0'
var home_page = 'http://localhost:8080/';

self.toolbox.options.cache = {
  name: 'eSS-cache'
};
// pre-cache our key assets
self.toolbox.precache(
  [
    './build/main.js',
    './build/main.css',
    './build/polyfills.js',
    'index.html',
    'manifest.json'
  ]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.cacheFirst);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;
self.addEventListener('sync', function (event) {
  if (event.tag == "esssync") {
    event.waitUntil(sync()
      .then(function (data) {
        try {
          if (Notification.permission === 'granted') {
            self.registration.showNotification("Sync success", {
                "body": data,
                "icon": "./assets/img/logo.png",
                "vibrate": [200, 100, 200, 100, 200, 100, 400]
              });
          } else {
            // console.log("Sync success");
          }
        } catch (err) {
          // console.log("Sync success");
        }
      })
      .catch(function (err) {
        try {
          if (Notification.permission === 'granted') {
            self.registration.showNotification("Sync failure", {
                "body": "Scheduled, Error : " + err,
                "icon": "./assets/img/logo.png",
                "vibrate": [200, 100, 200, 100, 200, 100, 400]
              });
          } else {
            // console.log("Could not sync, error : " + err);
          }
          throw err;
        } catch (err) {
          // console.log("Could not sync, error : " + err);
          throw err;
        }
      }));
  }
});

function sync() {
  return new Promise(function (resolve, reject) {
    try {
      var db = new PouchDB("ess_v2");
      var syncModel = {
        loginDataModel: {
          username: null,
          lastSyncDate: null
        },
        facilityDataList: [],
        communityDataList: []
      };
      var masterData;
      var syncResult;

      db.get("masterData").then(function (doc) {
        syncModel.loginDataModel.username = doc.username;
        syncModel.loginDataModel.lastSyncDate = doc.data.lastSyncedDate;
        var email = doc.email;
        var pass = doc.password;
        masterData = doc.data;

        //fetching forms from db to sync with  server
        db.get("txnData")
          .then(function (doc) {


            var facilityArray = [];
            var communityArray = [];

            for (var i = 0; i < doc.data.length; i++) {
              if (doc.data[i].type === 1 && !(doc.data[i].synced) && doc.data[i].finalized) {
                facilityArray.push(doc.data[i].data);
              } else if (doc.data[i].type === 2 && !(doc.data[i].synced) && doc.data[i].finalized) {
                communityArray.push(doc.data[i].data);
              }
            }


            var txnDataExist = false;

            if (facilityArray != null && facilityArray.length > 0) {
              txnDataExist = true;
              syncModel.facilityDataList = facilityArray;
            }

            if (communityArray != null && communityArray.length > 0) {
              txnDataExist = true;
              syncModel.communityDataList = communityArray;
            }

            var encodedApi = null;
            encodedApi = btoa(syncModel.loginDataModel.username +"_"+ pass + "_" + appVersionName);

            fetch(server_url + 'sync', {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                  'apiToken': encodedApi
                },
                body: JSON.stringify(syncModel)
              })
              .then(
                function (response) {
                  if (response.status !== 200) {
                    reject("Error status " + response.status);
                  }

                  // Examine the text in the response
                  response.json().then(function (data) {

                    if (data != null && data.errorMessage === null) { //checking whether the data in db needs to be updated
                      syncResult = data;

                      if (data.masterDataModel !== null && data.masterDataModel.userModel != null)
                        masterData.userModel = data.masterDataModel.userModel; // pushing updated usermodel to db
                      
                      //updating last sync date
                      if(data.masterDataModel.lastSyncedDate != undefined && data.masterDataModel.lastSyncedDate != null)
                        masterData.lastSyncedDate = data.masterDataModel.lastSyncedDate;

                      

                        if (data.masterDataModel.areaDetails !== null && data.masterDataModel.areaDetails.length > 0) {
                          // masterData.areaDetails = data.masterDataModel.areaDetails;
                          if (data.masterDataModel.updateCode != null && data.masterDataModel.updateCode == 1) {
                            masterData.areaDetails = data.masterDataModel.areaDetails;
                          } else if (data.masterDataModel.updateCode != null && data.masterDataModel.updateCode == 2) {
                            for (let i = 0; i < data.masterDataModel.areaDetails.length; i++) {
                              let exist = false;
                              for (let j = 0; j<masterData.areaDetails.length; j++) {
                                if (masterData.areaDetails[j].areaNId == data.masterDataModel.areaDetails[i].areaNId) {
                                  masterData.areaDetails[j] = data.masterDataModel.areaDetails[i];
                                  exist = true;
                                }
                              }
                              if (!exist) {
                                masterData.areaDetails.push(data.masterDataModel.areaDetails[i]);
                              }
                            }
                          }
                        }
                        if (data.masterDataModel.typeDetails !== null && data.masterDataModel.typeDetails.length > 0) {
                          for (let j = 0; j < data.masterDataModel.typeDetails.length; j++) {
                            let exist = false;
                            for (let i = 0; i < masterData.typeDetails.length; i++) {
                              if (masterData.typeDetails[i].id == data.masterDataModel.typeDetails[j].id) {
                                masterData.typeDetails[i] = data.masterDataModel.typeDetails[j];
                                exist = true;
                              }
                            }
                            if (!exist) {
                              masterData.typeDetails.push(data.masterDataModel.typeDetails[j]);
                            }
                          }
                        }
                        if (data.masterDataModel.typeList !== null && data.masterDataModel.typeList.length > 0) {
                          for (let j = 0; j < data.masterDataModel.typeList.length; j++) {
                            let exist = false;
                            for (let i = 0; i < masterData.typeList.length; i++) {
                              if (masterData.typeList[i].id == data.masterDataModel.typeList[j].id) {
                                masterData.typeList[i] = data.masterDataModel.typeList[j];
                                exist = true;
                              }
                            }
                            if (!exist) {
                              masterData.typeList.push(data.masterDataModel.typeList[j]);
                            }
                          }
                        }
                        if (data.masterDataModel.roles !== null && data.masterDataModel.roles.length > 0) {
                          for (let j = 0; j < data.masterDataModel.roles.length; j++) {
                            let exist = false;
                            for (let i = 0; i < masterData.roles.length; i++) {
                              if (masterData.roles[i].roleId == data.masterDataModel.roles[j].roleId) {
                                masterData.roles[i] = data.masterDataModel.roles[j];
                                exist = true;
                              }
                            }
                            if (!exist) {
                              masterData.roles.push(data.masterDataModel.roles[j]);
                            }
                          }
                        }
                        if (data.masterDataModel.organizations !== null && data.masterDataModel.organizations.length > 0) {
                          for (let j = 0; j < data.masterDataModel.organizations.length; j++) {
                            let exist = false;
                            for (let i = 0; i < masterData.organizations.length; i++) {
                              if (masterData.organizations[i].id == data.masterDataModel.organizations[j].id) {
                                masterData.organizations[i] = data.masterDataModel.organizations[j];
                                exist = true;
                              }
                            }
                            if (!exist) {
                              masterData.organizations.push(data.masterDataModel.organizations[j]);
                            }
                          }
                        }
                        if(data.masterDataModel.designations !== null && data.masterDataModel.designations.length > 0){
                          for(let j=0; j<data.masterDataModel.designations.length; j++){
                            let exist = false;
                            for(let i=0; i<masterData.designations.length; i++){
                              if(masterData.designations[i].doarMappingId == data.masterDataModel.designations[j].doarMappingId){
                                masterData.designations[i] = data.masterDataModel.designations[j];
                                exist = true;
                              }
                            }
                            if(!exist){
                              masterData.designations.push(data.masterDataModel.designations[j]);
                            }
                          }
                        }

                        db.get("masterData")
                          .then(function (doc) {
                            return db.put({
                              _id: "masterData",
                              _rev: doc._rev,
                              data: masterData,
                              username: data.masterDataModel.userModel.userName,
                              password: data.masterDataModel.userModel.password,
                              email: data.masterDataModel.userModel.email
                            }).then(function (doc) {
                              if (txnDataExist) {
                                try {
                                  db.get("txnData")
                                    .then(function (doc) {
                                      var tempTxn = doc.data;
                                      if (syncResult.facilityErrorModels.length > 0) {
                                        for (var i = 0; i < tempTxn.length; i++) {
                                          for (var j = 0; j < syncResult.facilityErrorModels.length; j++) {
                                            if(tempTxn[i].data.c5 == syncResult.facilityErrorModels[j].id
                                              && tempTxn[i].synced == false && tempTxn[i].finalized == true){
                                              tempTxn[i].hasError = true;
                                              tempTxn[i].errorMessage = syncResult.facilityErrorModels[j].errorMessage;
                                              tempTxn[i].synced = true;
                                            }
                                          }
                                          
                                          for (let j = 0; j < syncResult.communityErrorModels.length; j++) {
                                            if (tempTxn[i].data.facilityId == syncResult.communityErrorModels[j].id &&
                                              tempTxn[i].synced == false && tempTxn[i].finalized == true) {
                                              tempTxn[i].hasError = true;
                                              tempTxn[i].errorMessage = syncResult.communityErrorModels[j].errorMessage;
                                              tempTxn[i].synced = true;
                                            } 
                                          }

                                          for (let i = 0; i < tempTxn.length; i++) {
                                            if (tempTxn[i].finalized == true && tempTxn[i].hasError == false) {
                                              tempTxn[i].synced = true;
                                            }
                                          }
                                        
                                        }
                                      } else {
                                        for (var i = 0; i < tempTxn.length; i++) {
                                          if(tempTxn[i].finalized == true){
                                            tempTxn[i].synced = true;
                                          }
                                        }
                                      }

                                      return db.put({
                                        _id: "txnData",
                                        _rev: doc._rev,
                                        data: tempTxn
                                      }).then(function (response) {
                                        /////////////////////////////////
                                        resolve(
                                          "Facility form(s) synced : " + syncResult.facilityRecordsSynced+ "\n"+
                                          "Facility form(s) rejected : " + syncResult.facilityErrorModels.length +"\n"+
                                          "Community form(s) synced : " + syncResult.communityRecordsSynced+ "\n"+
                                          "Community form(s) rejected : " + syncResult.communityErrorModels.length
                                        );
                                      }).catch(function (err) {
                                        reject("Txn table update failed, please try again!");
                                      });
                                    }).catch(function (err) {
                                      reject(err);
                                    });
                                } catch (err) {
                                  reject(err);
                                }
                              } else {
                                resolve(
                                  "Facility form(s) synced : " + syncResult.facilityRecordsSynced+ "\n"+
                                  "Facility form(s) rejected : " + syncResult.facilityErrorModels.length +"\n"+
                                  "Community form(s) synced : " + syncResult.communityRecordsSynced+ "\n"+
                                  "Community form(s) rejected : " + syncResult.communityErrorModels.length
                                  );
                              }
                            }).catch(function (err) {
                              if (txnDataExist) {
                                try {
                                  db.get("txnData")
                                    .then(function (doc) {
                                      var tempTxn = doc.data;
                                      if (syncResult.facilityErrorModels.length > 0) {
                                        for (var i = 0; i < tempTxn.length; i++) {
                                          for (var j = 0; j < syncResult.facilityErrorModels.length; j++) {
                                            if (tempTxn[i].data.c5 == syncResult.facilityErrorModels[j].id &&
                                              tempTxn[i].synced == false) {
                                              tempTxn[i].hasError = true;
                                              tempTxn[i].errorMessage = syncResult.facilityErrorModels[j].errorMessage;
                                              tempTxn[i].synced = true;
                                            }
                                          }

                                          for (let j = 0; j < syncResult.communityErrorModels.length; j++) {
                                            if (tempTxn[i].data.facilityId == syncResult.communityErrorModels[j].id &&
                                              tempTxn[i].synced == false && tempTxn[i].finalized == true) {
                                              tempTxn[i].hasError = true;
                                              tempTxn[i].errorMessage = syncResult.communityErrorModels[j].errorMessage;
                                              tempTxn[i].synced = true;
                                            } 
                                          }

                                          for (let i = 0; i < tempTxn.length; i++) {
                                            if (tempTxn[i].finalized == true && tempTxn[i].hasError == false) {
                                              tempTxn[i].synced = true;
                                            }
                                          }
                                        }
                                      } else {
                                        for (var i = 0; i < tempTxn.length; i++) {
                                          tempTxn[i].synced = true;
                                        }
                                      }

                                      return db.put({
                                        _id: "txnData",
                                        _rev: doc._rev,
                                        data: tempTxn
                                      }).then(function (response) {
                                        /////////////////////////////////
                                        resolve(
                                          "Facility form(s) synced : " + syncResult.facilityRecordsSynced+ "\n"+
                                          "Facility form(s) rejected : " + syncResult.facilityErrorModels.length +"\n"+
                                          "Community form(s) synced : " + syncResult.communityRecordsSynced+ "\n"+
                                          "Community form(s) rejected : " + syncResult.communityErrorModels.length
                                          );
                                      }).catch(function (err) {
                                        reject("Txn table update failed, please try again!");
                                      });
                                    }).catch(function (err) {
                                      reject(err);
                                    });
                                } catch (err) {
                                  reject(err);
                                }
                              } else {
                                reject("Master table update failed, please try again!");
                              }
                            });
                          }).catch(function (err) {
                            reject("Master table update failed, please try again!" + err.message);
                          });
                    }else{
                      switch(data.errorCode){
                        case 1 :
                        reject(data.errorMessage);
                        break;
                        case 2 :
                        db.get('config')
                        .then(function(doc){
                          var config = {
                            isLoggedIn: undefined,
                            latestAppVersionName: undefined
                          }
                          config.isLoggedIn = doc.data.isLoggedIn
                          config.latestAppVersionName = data.latestAppVersionName
                          return db.put({
                            _id: 'config',
                            _rev: doc._rev,
                            data: config                    
                          }).then(function (doc) {
                            reject("An updated version of the app is available, please press 'ctrl+F5' to refresh the app. Latest version is " + config.latestAppVersionName)                                            
                          }).catch(function (err) {
                            reject("Database error! Error while updating latest app version name")
                          });
                        }).catch(function (err){
                          reject("Error getting config doc while updating latest app version name")                  
                        });                
                        break;
                      }
                    }
                  });
                }
              )
              .catch(function (err) {
                reject("Error status " + err);
              });
          }).catch(function (err) {
            var encodedApi = null;
            encodedApi = btoa(syncModel.loginDataModel.username +"_"+ pass + "_" + appVersionName); 

            fetch(server_url + 'sync', {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                  'apiToken': encodedApi
                },
                body: JSON.stringify(syncModel)
              })
              .then(
                function (response) {
                  if (response.status !== 200) {
                    reject("Error status " + response.status);
                  }

                  // Examine the text in the response
                  response.json().then(function (data) {

                    if (data != null && data.errorMessage === null) { //checking whether the data in db needs to be updated
                    syncResult = data;

                    if (data.masterDataModel !== null && data.masterDataModel.userModel != null)
                      masterData.userModel = data.masterDataModel.userModel; // pushing updated usermodel to db

                    if(data.masterDataModel.lastSyncedDate != undefined && data.masterDataModel.lastSyncedDate != null)
                      masterData.lastSyncedDate = data.masterDataModel.lastSyncedDate;

                    

                      if (data.masterDataModel.areaDetails !== null && data.masterDataModel.areaDetails.length > 0) {
                        // masterData.areaDetails = data.masterDataModel.areaDetails;
                        if (data.masterDataModel.updateCode != null && data.masterDataModel.updateCode == 1) {
                          masterData.areaDetails = data.masterDataModel.areaDetails;
                        } else if (data.masterDataModel.updateCode != null && data.masterDataModel.updateCode == 2) {
                          for (let i = 0; i < data.masterDataModel.areaDetails.length; i++) {
                            let exist = false;
                            for (let j = 0; j<masterData.areaDetails.length; j++) {
                              if (masterData.areaDetails[j].areaNId == data.masterDataModel.areaDetails[i].areaNId) {
                                masterData.areaDetails[j] = data.masterDataModel.areaDetails[i];
                                exist = true;
                              }
                            }
                            if (!exist) {
                              masterData.areaDetails.push(data.masterDataModel.areaDetails[i]);
                            }
                          }
                        }
                      }
                      if (data.masterDataModel.typeDetails !== null && data.masterDataModel.typeDetails.length > 0) {
                        for (let j = 0; j < data.masterDataModel.typeDetails.length; j++) {
                          let exist = false;
                          for (let i = 0; i < masterData.typeDetails.length; i++) {
                            if (masterData.typeDetails[i].id == data.masterDataModel.typeDetails[j].id) {
                              masterData.typeDetails[i] = data.masterDataModel.typeDetails[j];
                              exist = true;
                            }
                          }
                          if (!exist) {
                            masterData.typeDetails.push(data.masterDataModel.typeDetails[j]);
                          }
                        }
                      }
                      if (data.masterDataModel.typeList !== null && data.masterDataModel.typeList.length > 0) {
                        for (let j = 0; j < data.masterDataModel.typeList.length; j++) {
                          let exist = false;
                          for (let i = 0; i < masterData.typeList.length; i++) {
                            if (masterData.typeList[i].id == data.masterDataModel.typeList[j].id) {
                              masterData.typeList[i] = data.masterDataModel.typeList[j];
                              exist = true;
                            }
                          }
                          if (!exist) {
                            masterData.typeList.push(data.masterDataModel.typeList[j]);
                          }
                        }
                      }
                      if (data.masterDataModel.roles !== null && data.masterDataModel.roles.length > 0) {
                        for (let j = 0; j < data.masterDataModel.roles.length; j++) {
                          let exist = false;
                          for (let i = 0; i < masterData.roles.length; i++) {
                            if (masterData.roles[i].roleId == data.masterDataModel.roles[j].roleId) {
                              masterData.roles[i] = data.masterDataModel.roles[j];
                              exist = true;
                            }
                          }
                          if (!exist) {
                            masterData.roles.push(data.masterDataModel.roles[j]);
                          }
                        }
                      }
                      if (data.masterDataModel.organizations !== null && data.masterDataModel.organizations.length > 0) {
                        for (let j = 0; j < data.masterDataModel.organizations.length; j++) {
                          let exist = false;
                          for (let i = 0; i < masterData.organizations.length; i++) {
                            if (masterData.organizations[i].id == data.masterDataModel.organizations[j].id) {
                              masterData.organizations[i] = data.masterDataModel.organizations[j];
                              exist = true;
                            }
                          }
                          if (!exist) {
                            masterData.organizations.push(data.masterDataModel.organizations[j]);
                          }
                        }
                      }
                      if(data.masterDataModel.designations !== null && data.masterDataModel.designations.length > 0){
                        for(let j=0; j<data.masterDataModel.designations.length; j++){
                          let exist = false;
                          for(let i=0; i<masterData.designations.length; i++){
                            if(masterData.designations[i].doarMappingId == data.masterDataModel.designations[j].doarMappingId){
                              masterData.designations[i] = data.masterDataModel.designations[j];
                              exist = true;
                            }
                          }
                          if(!exist){
                            masterData.designations.push(data.masterDataModel.designations[j]);
                          }
                        }
                      }

                      db.get("masterData")
                        .then(function (doc) {
                          return db.put({
                            _id: "masterData",
                            _rev: doc._rev,
                            data: masterData,
                            username: data.masterDataModel.userModel.userName,
                            password: data.masterDataModel.userModel.password,
                            email: data.masterDataModel.userModel.email
                          }).then(function (doc) {


                            resolve(
                                        "Facility form(s) synced : " + syncResult.facilityRecordsSynced+ "\n"+
                                        "Facility form(s) rejected : " + syncResult.facilityErrorModels.length +"\n"+
                                        "Community form(s) synced : " + syncResult.communityRecordsSynced+ "\n"+
                                        "Community form(s) rejected : " + syncResult.communityErrorModels.length
                                      );



                            
                          }).catch(function (err) {
                            reject("Master table update failed, please try again! Error message " + err.message);
                          });
                        }).catch(function (err) {
                          reject("Master table update failed, please try again! Error message " + err.message);
                        });
                    }else{
                      switch(data.errorCode){
                        case 1 :
                        reject(data.errorMessage);
                        break;
                        case 2 :
                        db.get('config')
                        .then(function(doc){
                          var config = {
                            isLoggedIn: undefined,
                            latestAppVersionName: undefined
                          }
                          config.isLoggedIn = doc.data.isLoggedIn
                          config.latestAppVersionName = data.latestAppVersionName
                          return db.put({
                            _id: 'config',
                            _rev: doc._rev,
                            data: config                    
                          }).then(function (doc) {
                            reject("An updated version of the app is available, please press 'ctrl+F5' to refresh the app. Latest version is " + config.latestAppVersionName)                                            
                          }).catch(function (err) {
                            reject("Database error! Error while updating latest app version name")
                          });
                        }).catch(function (err){
                          reject("Error getting config doc while updating latest app version name")                  
                        });                
                        break;
                      }
                    }
                  });
                }
              )
              .catch(function (err) {
                reject("Error status " + err);
              });
          });
      }).catch(function (err) {
        reject("Sync Unsuccessfull, please try again. error : " + err);
      });
    } catch (err) {
      reject("Error in fetching transaction data : " + err);
    }
  });
}
self.addEventListener('notificationclick', function(event) {
  // Android doesn’t close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: 'window'
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url === home_page && 'focus' in client) {
        return client.focus();
      }
    }
    if (clients.openWindow) {
      return clients.openWindow('/ess-de-test/');
      // return clients.openWindow('/');
    }
  }));
});