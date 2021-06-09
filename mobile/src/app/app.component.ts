import { ConfigImpl } from './../class/ConfigImpl';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, AlertController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http, Headers } from '@angular/http';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { MessageProvider } from '../providers/message/message';
import { EditFormPage } from '../pages/edit-form/edit-form';
import { FinalizeFormPage } from '../pages/finalize-form/finalize-form';
import { ViewsentPage } from '../pages/viewsent/viewsent';
import { FacilityPage } from '../pages/facility/facility';
import { CommunityPage } from '../pages/community/community';
import { PrefetchDataPage } from '../pages/prefetch-data/prefetch-data';
import { Geolocation } from '@ionic-native/geolocation';
import { DataProvider } from '../providers/data/data';
import { AppVersion } from '@ionic-native/app-version'
import { EssProvider } from '../providers/ess/ess'
import { ESSPlatformImpl } from '../class/ESSPlatformImpl';


@Component({
  templateUrl: 'app.html'
})

/**
 * @Author: Ratikanta Pradhan 
 * @email:   ratikanta@sdrc.co.in
 * @Last Modified by: Ratikanta Pradhan
 * @Last Modified time: 2018-01-07 18:18:55
 */
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array < {
    title: string,
    component: any
  } > ;
  syncModel: any;
  pass: string;
  email: string;
  masterData: any;
  syncResult: any;

  //variable to check if exit confirm dialog is showing or not
  isExitDialogShowing: any = false;
  //end

  //variable to check if cancle confirm dialog is showing or not
  isCancleDialogShowing: boolean = false;
  //end

  editFormPage: any;
  finalizeFormPage: any;
  viewsentFormPage: any;
  prefetchDataPage: any;
  userObject: Object = {
    name: null,
    designation: {},
    email: null
  };
  isIE:any;

  /**
   * @Author: Ratikanta Pradhan
   * @email:   ratikanta@sdrc.co.in
   * @Last Modified by:subhadarshani Patra
   * @Last Modified time: 2017-10-16 02:40:00
   */
  constructor(public http: Http, public platform: Platform, public statusBar: StatusBar, private events: Events,
    public splashScreen: SplashScreen, private alertCtrl: AlertController, private messageService: MessageProvider,
    private dataService: DataProvider, private geolocation: Geolocation, public app : App,
    private appVersion : AppVersion, private essProvider: EssProvider) {


      
      


      this.editFormPage = EditFormPage;
      this.finalizeFormPage = FinalizeFormPage
      this.viewsentFormPage = ViewsentPage;
      this.prefetchDataPage = PrefetchDataPage;

      this.events.subscribe(MessageProvider.EVENTS.SIDE_MENU_DATA, data => {
        this.getSideMenuData();
      });
      
  }

  ngOnInit():void {

    //There are some operations which we should do when platform is ready
    this.platform.ready().then(() => {  

      //Setting platforms
      let essPlatform: ESSPlatform = new ESSPlatformImpl()
    
      if(this.platform.is('mobileweb')){
        essPlatform.isMobilePWA = true
      }else if(this.platform.is('core')){
          essPlatform.isWebPWA = true
      }else if(this.platform.is('android') && this.platform.is('cordova')){
        essPlatform.isAndroid = true
      }

      this.essProvider.setPlatform(essPlatform)     

      this.controlBackButton();
      this.appVersion.getVersionNumber()
      .then(data=>{
        this.essProvider.setAppVersionName(data);
      })
      .catch(err =>{        
      })
      .then(()=>{          

        //creating/initiating database
        this.dataService.createAndMigrateDatabase()
        .then(()=>{

          //checking for latest version
          this.checkAppVersionIsOkOrNot()
          .then(data=>{
            if(data != undefined && data.length > 0){
              this.messageService.showConfirmOnOkAppExit("Warning", data)
            }else{
              if(localStorage.getItem("isIE")){
                this.messageService.showConfirmOnOkAppExit('Error', MessageProvider.MESSAGES.NOT_SUPPORTED_IN_IE)
              } else {                
                this.dataService.check_logged_in()
                .then((isLoggedIn)=>{
                  isLoggedIn?this.nav.setRoot(HomePage):this.rootPage = LoginPage
                })
                .catch((err)=>{
                  this.messageService.showErrorAlert(err);
                })                
              }
            }
            
          })
          .catch(err=>{
            this.messageService.showErrorAlert(err)          
          })
        })
        .catch(err => {
          this.messageService.showErrorAlert(err);
        })                    
      })
    })










    //Listen to Event
    // this.events.subscribe(MessageProvider.EVENTS.LOGGED_IN, (data, go_to_login_page ,message) => {
      // alert("ngOnInit")
      // if(data){
      //     this.nav.setRoot(HomePage);
      // }else{
      //   if(go_to_login_page){
      //     this.rootPage = LoginPage;
      //   }else{
      //     this.messageService.showErrorAlert(message);
      //   }
      // }
    // });
  }

  /**
   * This method will initialize the app
   * @author Ratikanta Pradhan
   */
  // initializeApp() {  
    
  //   this.statusBar.styleDefault();
  //   this.splashScreen.hide();     
  //   if (window.location.search.indexOf('userAgent=web') > -1) {      
  //     this.rootPage = LoginPage;
  //   }
    
  // }

  /**
   * The following method will logout from the app
   */
  logout() {
    let confirm = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: 'Warning',
      message: 'Are you sure you want to logout?',
      buttons: [{
          text: 'No',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: () => {
              let temp_this = this
              this.dataService.setIsLoggedIn(false)
              .then((data)=>{
                temp_this.nav.setRoot(LoginPage);
              })
              .catch(err=>{
                temp_this.messageService.showErrorAlert(err)
              })
              
          }
        }
      ]
    });
    confirm.setCssClass('sectorSelectionModalCommunity');
    confirm.present();
  }

  /**
   * This following method will send and receive data from server
   */
  sync() {

    let temp = this;
    
    if (
      this.essProvider.getPlatform().isMobilePWA ||
      this.essProvider.getPlatform().isWebPWA ||
      (!this.essProvider.getPlatform().isAndroid)) {


      if ('serviceWorker' in navigator) {
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.ready.then(function (reg) {
            if (reg.sync) {
              reg.sync.register('esssync')
                .then(function (event) {
                  temp.messageService.showToast(MessageProvider.MESSAGES.SYNC_SCHEDULED);
                })
                .catch(function (error) {
                  temp.messageService.showToast(MessageProvider.MESSAGES.COULD_NOT_SCHEDULE_SYNC);
                  temp.doOnlineSync();
                });
            } else {
              temp.messageService.showToast(MessageProvider.MESSAGES.BACKGROUND_SYNC_NOT_SUPPORTED);
              temp.doOnlineSync();
            }
          }).catch(function (err) {
            temp.messageService.showToast(MessageProvider.MESSAGES.COULD_NOT_SCHEDULE_SYNC);
            temp.doOnlineSync();
          });
        } else {
          temp.messageService.showToast(MessageProvider.MESSAGES.COULD_NOT_SCHEDULE_SYNC);
          temp.doOnlineSync();
        }
      } else {
        temp.messageService.showToast(MessageProvider.MESSAGES.BACKGROUND_SYNC_NOT_SUPPORTED);
        temp.doOnlineSync();
      }
    } else {
      temp.doOnlineSync();
    }

  }

  doOnlineSync(): void {
    this.messageService.presentLoading("Syncing, please wait...");
    try {
      this.http.get(MessageProvider.checkInternetURL)
        .timeout(MessageProvider.LOGIN_TIME_OUT)
        .subscribe(data => {


          let temp = this;

          temp.syncModel = {
            loginDataModel: {
              username: null,
              lastSyncDate: null
            },
            facilityDataList: [],
            communityDataList: []
          };

          temp.dataService.getDB().get(MessageProvider.DOC_NAMES.MST_DOC_NAME).then(function (doc) {

            temp.syncModel.loginDataModel.username = doc.username;
            temp.syncModel.loginDataModel.lastSyncDate = doc.data.lastSyncedDate;
            
            // We do not need to send the email id to server.For submission report, email will be queried from server db
            // The following line should be removed later.

            temp.syncModel.loginDataModel.email = '';
            temp.email = doc.email;
            temp.pass = doc.password;
            temp.masterData = doc.data;
            // let txnDataExist = false;

            //fetching forms from db to sync with  server
            temp.dataService.getDB().get(MessageProvider.DOC_NAMES.TXN_DOC_NAME)
              .then(function (doc) {


                let tempArray = doc.data.filter(d => d.type === MessageProvider.FORM_TYPE.FACILITY && !(d.synced) &&
                  d.finalized === true);
                let tempArray1 = doc.data.filter(d => d.type === MessageProvider.FORM_TYPE.COMMUNITY && !(d.synced) &&
                  d.finalized === true);
                let facilityArray = [];
                let communityArray = [];

                if (tempArray.length > 0) {
                  for (let i = 0; i < tempArray.length; i++) {
                    facilityArray.push(tempArray[i].data);
                  }
                }
                if (tempArray1.length > 0) {
                  for (let i = 0; i < tempArray1.length; i++) {
                    communityArray.push(tempArray1[i].data);
                  }
                }
                temp.formatSyncData(facilityArray, communityArray);                
              }).catch(function (err) {
                temp.sendSyncData(false);
                if (err.status == 404) {
                  console.log("Txn doc not found, syncing master data");
                } else {
                  console.log(err);
                }
              });
          }).catch(function (err) {
            temp.messageService.dismissLoading();
            temp.messageService.showErrorAlert("Sync Unsuccessful, please try again!");
            console.log(err);
          });
        }, err => {
          this.messageService.dismissLoading();
          this.errorToast(MessageProvider.MESSAGES.INTERNET_CHECK);
        });
    } catch (err) {
      this.messageService.dismissLoading();
      this.messageService.showErrorAlert("Error in fetching transaction data : " + err);
    }
  }

  errorToast(message) {
    let confirm = this.alertCtrl.create({
      enableBackdropDismiss: false
    });
    confirm.setCssClass('sectorSelectionModalCommunity');
    confirm.setTitle("Error");
    confirm.setMessage(message);
    confirm.addButton({
      text: "Ok",
      handler: data => {
        confirm.dismiss;
      }
    });
    confirm.present();
  }

  sendSyncData(txnDataExist) {
    try {
      let temp = this;
      let encodedApi = btoa(temp.syncModel.loginDataModel.username + "_" + temp.pass + "_" + 
      temp.essProvider.getAppVersionName());
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('apiToken', encodedApi);
      temp.http.post(MessageProvider.server + "sync", JSON.stringify(temp.syncModel), {
          headers: headers
        })
        .timeout(MessageProvider.LOGIN_TIME_OUT)
        .map(res => res.json())
        .subscribe(data => {
            if (data != null && data.errorMessage === null) { //checking whether the data in db needs to be updated
              temp.syncResult = data;
              // temp.syncResult.facilityErrorModels = data.facilityErrorModels === null ? [] : temp.syncResult.facilityErrorModels.length;
              // temp.syncResult.communityErrorModels = data.communityErrorModels === null ? [] : temp.syncResult.communityErrorModels.length;
              if (data.masterDataModel !== null && data.masterDataModel.userModel != null) {
                temp.masterData.userModel = data.masterDataModel.userModel; // pushing updated usermodel to db
                MessageProvider.USER_DETAILS = data.masterDataModel.userModel;
              }

              if (data.masterDataModel.lastSyncedDate != undefined && data.masterDataModel.lastSyncedDate != null)
                temp.masterData.lastSyncedDate = data.masterDataModel.lastSyncedDate;



              if (data.masterDataModel.areaDetails !== null && data.masterDataModel.areaDetails.length > 0) {
                if (data.masterDataModel.updateCode != null && data.masterDataModel.updateCode == 1) {
                  temp.masterData.areaDetails = data.masterDataModel.areaDetails;
                } else if (data.masterDataModel.updateCode != null && data.masterDataModel.updateCode == 2) {
                  for (let i = 0; i < data.masterDataModel.areaDetails.length; i++) {
                    let exist = false;
                    for (let j = 0; j < temp.masterData.areaDetails.length; j++) {
                      if (temp.masterData.areaDetails[j].areaNId == data.masterDataModel.areaDetails[i].areaNId) {
                        temp.masterData.areaDetails[j] = data.masterDataModel.areaDetails[i];
                        exist = true;
                      }
                    }
                    if (!exist) {
                      temp.masterData.areaDetails.push(data.masterDataModel.areaDetails[i]);
                    }
                  }
                }
              }
              if (data.masterDataModel.typeDetails !== null && data.masterDataModel.typeDetails.length > 0) {
                for (let j = 0; j < data.masterDataModel.typeDetails.length; j++) {
                  let exist = false;
                  for (let i = 0; i < temp.masterData.typeDetails.length; i++) {
                    if (temp.masterData.typeDetails[i].id == data.masterDataModel.typeDetails[j].id) {
                      temp.masterData.typeDetails[i] = data.masterDataModel.typeDetails[j];
                      exist = true;
                    }
                  }
                  if (!exist) {
                    temp.masterData.typeDetails.push(data.masterDataModel.typeDetails[j]);
                  }
                }
              }
              if (data.masterDataModel.typeList !== null && data.masterDataModel.typeList.length > 0) {
                for (let j = 0; j < data.masterDataModel.typeList.length; j++) {
                  let exist = false;
                  for (let i = 0; i < temp.masterData.typeList.length; i++) {
                    if (temp.masterData.typeList[i].id == data.masterDataModel.typeList[j].id) {
                      temp.masterData.typeList[i] = data.masterDataModel.typeList[j];
                      exist = true;
                    }
                  }
                  if (!exist) {
                    temp.masterData.typeList.push(data.masterDataModel.typeList[j]);
                  }
                }
              }
              if (data.masterDataModel.roles !== null && data.masterDataModel.roles.length > 0) {
                for (let j = 0; j < data.masterDataModel.roles.length; j++) {
                  let exist = false;
                  for (let i = 0; i < temp.masterData.roles.length; i++) {
                    if (temp.masterData.roles[i].roleId == data.masterDataModel.roles[j].roleId) {
                      temp.masterData.roles[i] = data.masterDataModel.roles[j];
                      exist = true;
                    }
                  }
                  if (!exist) {
                    temp.masterData.roles.push(data.masterDataModel.roles[j]);
                  }
                }
              }
              if (data.masterDataModel.organizations !== null && data.masterDataModel.organizations.length > 0) {
                for (let j = 0; j < data.masterDataModel.organizations.length; j++) {
                  let exist = false;
                  for (let i = 0; i < temp.masterData.organizations.length; i++) {
                    if (temp.masterData.organizations[i].id == data.masterDataModel.organizations[j].id) {
                      temp.masterData.organizations[i] = data.masterDataModel.organizations[j];
                      exist = true;
                    }
                  }
                  if (!exist) {
                    temp.masterData.organizations.push(data.masterDataModel.organizations[j]);
                  }
                }
              }
              if (data.masterDataModel.designations !== null && data.masterDataModel.designations.length > 0) {
                for (let j = 0; j < data.masterDataModel.designations.length; j++) {
                  let exist = false;
                  for (let i = 0; i < temp.masterData.designations.length; i++) {
                    if (temp.masterData.designations[i].doarMappingId == data.masterDataModel.designations[j].doarMappingId) {
                      temp.masterData.designations[i] = data.masterDataModel.designations[j];
                      exist = true;
                    }
                  }
                  if (!exist) {
                    temp.masterData.designations.push(data.masterDataModel.designations[j]);
                  }
                }
              }

              temp.dataService.getDB().get(MessageProvider.DOC_NAMES.MST_DOC_NAME)
                .then(function (doc) {
                  return temp.dataService.getDB().put({
                    _id: MessageProvider.DOC_NAMES.MST_DOC_NAME,
                    _rev: doc._rev,
                    data: temp.masterData,
                    username: data.masterDataModel.userModel.userName,
                    password: data.masterDataModel.userModel.password,
                    email: data.masterDataModel.userModel.email
                  }).then(function (doc) {
                    temp.dataService.setMasterData();
                    if (txnDataExist)
                      temp.updateTxnData();
                    else {
                      temp.messageService.dismissLoading();
                      temp.showAlert();
                    }
                  }).catch(function (err) {

                    if(err.status === 500 && err.name === 'indexed_db_went_bad' 
                    && err.reason === 'QuotaExceededError'){
                      temp.messageService.dismissLoading();
                      temp.messageService.showErrorAlert("Master table update failed, please try again!" + 
                      MessageProvider.MESSAGES.NO_STORAGE);
                    }else{
                      if (txnDataExist)
                        temp.updateTxnData();
                      else {
                        temp.messageService.dismissLoading();
                        temp.messageService.showErrorAlert("Master table update failed, please try again!");
                      }
                    }
                    
                    console.log(err);
                  });
                }).catch(function (err) {
                  temp.messageService.dismissLoading();
                  temp.messageService.showErrorAlert("Master table update failed, please try again!");
                  console.log(err);
                });
            } else {
              switch(data.errorCode){
                case 1 :
                temp.messageService.dismissLoading();
                temp.messageService.showErrorAlert(data.errorMessage);
                break;
                case 2 :
                temp.messageService.dismissLoading();
                temp.dataService.getDB().get(MessageProvider.DOC_NAMES.CONFIG_DOC_NAME)
                .then(function(doc){
                  let config: Config = new ConfigImpl()
                  config.isLoggedIn = (doc.data as Config).isLoggedIn
                  config.latestAppVersionName = data.latestAppVersionName
                  return temp.dataService.getDB().put({
                    _id: MessageProvider.DOC_NAMES.CONFIG_DOC_NAME,
                    _rev: doc._rev,
                    data: config                    
                  }).then(function (doc) {
                    let platform = temp.essProvider.getPlatform() 
                    if(platform.isAndroid)
                      temp.messageService.showConfirmOnOkAppExit("Warning", MessageProvider.MESSAGES.UPDATE_MESSGAE + " Latest version is " + config.latestAppVersionName)                                             
                    else if (platform.isMobilePWA)
                      temp.messageService.showConfirmOnOkAppExit("Warning", "An updated version of the app is available, please refresh the app in browser. Latest version is " + config.latestAppVersionName)          
                    else if (platform.isWebPWA)
                      temp.messageService.showConfirmOnOkAppExit("Warning", "An updated version of the app is available, please press 'ctrl+F5' to refresh the app. Latest version is " + config.latestAppVersionName)          
                  }).catch(function (err) {
                    temp.messageService.showErrorAlert(MessageProvider.MESSAGES.ERROR_UPDATING_LATEST_APP_VERSION_NAME)
                    console.log(err)
                  });
                }).catch(function (err){
                  temp.messageService.showErrorAlert(MessageProvider.MESSAGES.ERROR_GETTING_CONFIG_DOC)
                  console.log(err)                  
                });                
                break;
              }
            }
          },
          err => {
            temp.messageService.dismissLoading();
            temp.messageService.showErrorAlert("Sync Unsuccessful, please try again!");
          });
    } catch (err) {
      this.messageService.dismissLoading();
      this.messageService.showErrorAlert("Error in fetching transaction data : " + err);
    }
  }

  updateTxnData() {
    let temp = this;
    try {
      this.dataService.getDB().get(MessageProvider.DOC_NAMES.TXN_DOC_NAME)
        .then(function (doc) {
          let tempTxn = doc.data;
          if (temp.syncResult.facilityErrorModels.length > 0 || 
                temp.syncResult.communityErrorModels.length > 0) {
            for (let i = 0; i < tempTxn.length; i++) {
              for (let j = 0; j < temp.syncResult.facilityErrorModels.length; j++) {
                if (tempTxn[i].data.c5 == temp.syncResult.facilityErrorModels[j].id &&
                  tempTxn[i].synced == false && tempTxn[i].finalized == true) {
                  tempTxn[i].hasError = true;
                  tempTxn[i].errorMessage = temp.syncResult.facilityErrorModels[j].errorMessage;
                  tempTxn[i].synced = true;
                }
              }
              for (let j = 0; j < temp.syncResult.communityErrorModels.length; j++) {
                if (tempTxn[i].data.facilityId == temp.syncResult.communityErrorModels[j].id &&
                  tempTxn[i].synced == false && tempTxn[i].finalized == true) {
                  tempTxn[i].hasError = true;
                  tempTxn[i].errorMessage = temp.syncResult.communityErrorModels[j].errorMessage;
                  tempTxn[i].synced = true;
                } 
              }
            }

            for (let i = 0; i < tempTxn.length; i++) {
              if (tempTxn[i].finalized == true && tempTxn[i].hasError == false) {
                tempTxn[i].synced = true;
              }
            }
          } else {
            for (let i = 0; i < tempTxn.length; i++) {
              if (tempTxn[i].finalized == true) {
                tempTxn[i].synced = true;
              }
            }
          }

          return temp.dataService.getDB().put({
            _id: MessageProvider.DOC_NAMES.TXN_DOC_NAME,
            _rev: doc._rev,
            data: tempTxn
          }).then(function (response) {
            temp.messageService.dismissLoading();
            temp.showAlert();
          }).catch(function (err) {
            temp.messageService.dismissLoading();
            if(err.status === 500 && err.name === 'indexed_db_went_bad' 
            && err.reason === 'QuotaExceededError'){
              temp.messageService.showErrorAlert("Txn table update failed, please try again!" + 
              MessageProvider.MESSAGES.NO_STORAGE);
            }else{
              temp.messageService.showErrorAlert("Txn table update failed, please try again!");
            }
            
            
          });
        }).catch(function (err) {
          temp.messageService.dismissLoading();
          console.log(err);
        });
    } catch (err) {
      temp.messageService.dismissLoading();
      console.log(err);
    }
  }

  formatSyncData(facility, community) {

    let temp = this;
    let txnDataExist = false;
    temp.syncModel.facilityDataList = [];
    temp.syncModel.communityDataList = [];

    if (facility != null && facility.length > 0) {
      for (let i = 0; i < facility.length; i++) {
        facility[i].c11 == null ? null : parseInt(facility[i].c11);
        facility[i].c2 == null ? null : parseInt(facility[i].c2);
        facility[i].c3 == null ? null : parseInt(facility[i].c3);
        facility[i].c4 == null ? null : parseInt(facility[i].c4);
        facility[i].c5 == null ? null : parseInt(facility[i].c5);
        facility[i].c6 == null ? null : parseInt(facility[i].c6);
        facility[i].d1 == null ? null : parseInt(facility[i].d1);
        facility[i].d2 == null ? null : parseInt(facility[i].d2);
        facility[i].d3 == null ? null : parseInt(facility[i].d3);
        facility[i].d41 == null ? null : parseInt(facility[i].d41);
        facility[i].d42 == null ? null : parseInt(facility[i].d42);
        facility[i].d43 == null ? null : parseInt(facility[i].d43);
        facility[i].d51 == null ? null : parseInt(facility[i].d51);
        facility[i].d52 == null ? null : parseInt(facility[i].d52);
        facility[i].d53 == null ? null : parseInt(facility[i].d53);
        facility[i].d54 == null ? null : parseInt(facility[i].d54);
        facility[i].d56 == null ? null : parseInt(facility[i].d56);
        facility[i].d57 == null ? null : parseInt(facility[i].d57);
        facility[i].d61 == null ? null : parseInt(facility[i].d61);
        facility[i].d62 == null ? null : parseInt(facility[i].d62);
        facility[i].d71 == null ? null : parseInt(facility[i].d71);
        facility[i].d72 == null ? null : parseInt(facility[i].d72);
        facility[i].d73 == null ? null : parseInt(facility[i].d73);
        facility[i].d74 == null ? null : parseInt(facility[i].d74);
        facility[i].d8 == null ? null : parseInt(facility[i].d8);
        facility[i].d91 == null ? null : parseInt(facility[i].d91);
        facility[i].d92 == null ? null : parseInt(facility[i].d92);
        facility[i].d93 == null ? null : parseInt(facility[i].d93);
        facility[i].d101 == null ? null : parseInt(facility[i].d101);
        facility[i].d102 == null ? null : parseInt(facility[i].d102);
        facility[i].d103 == null ? null : parseInt(facility[i].d103);
        facility[i].d104 == null ? null : parseInt(facility[i].d104);
        facility[i].d11 == null ? null : parseInt(facility[i].d11);
        facility[i].d121 == null ? null : parseInt(facility[i].d121);
        facility[i].d122 == null ? null : parseInt(facility[i].d122);
        facility[i].d131 == null ? null : parseInt(facility[i].d131);
        facility[i].d132 == null ? null : parseInt(facility[i].d132);
        facility[i].d133 == null ? null : parseInt(facility[i].d133);
        facility[i].d134 == null ? null : parseInt(facility[i].d134);
        facility[i].d135 == null ? null : parseInt(facility[i].d135);
        facility[i].d136 == null ? null : parseInt(facility[i].d136);
        facility[i].d137 == null ? null : parseInt(facility[i].d137);
        facility[i].d138 == null ? null : parseInt(facility[i].d138);
        facility[i].d141 == null ? null : parseInt(facility[i].d141);
        facility[i].d142 == null ? null : parseInt(facility[i].d142);
        facility[i].d143 == null ? null : parseInt(facility[i].d143);
        facility[i].d144 == null ? null : parseInt(facility[i].d144);
        facility[i].d145 == null ? null : parseInt(facility[i].d145);
        facility[i].d146 == null ? null : parseInt(facility[i].d146);
        facility[i].d151 == null ? null : parseInt(facility[i].d151);
        facility[i].d152 == null ? null : parseInt(facility[i].d152);
        facility[i].d153 == null ? null : parseInt(facility[i].d153);
        facility[i].d161 == null ? null : parseInt(facility[i].d161);
        facility[i].d162 == null ? null : parseInt(facility[i].d162);
        facility[i].d171 == null ? null : parseInt(facility[i].d171);
        facility[i].d172 == null ? null : parseInt(facility[i].d172);
        facility[i].e111 == null ? null : parseInt(facility[i].e111);
        facility[i].e112 == null ? null : parseInt(facility[i].e112);
        facility[i].e121 == null ? null : parseInt(facility[i].e121);
        facility[i].e122 == null ? null : parseInt(facility[i].e122);
        facility[i].e13 == null ? null : parseInt(facility[i].e13);
        facility[i].e14 == null ? null : parseInt(facility[i].e14);
        facility[i].e15 == null ? null : parseInt(facility[i].e15);
        facility[i].e16 == null ? null : parseInt(facility[i].e16);
        facility[i].e17 == null ? null : parseInt(facility[i].e17);
        facility[i].e21 == null ? null : parseInt(facility[i].e21);
        facility[i].e22 == null ? null : parseInt(facility[i].e22);
        facility[i].e23 == null ? null : parseInt(facility[i].e23);
        facility[i].e24 == null ? null : parseInt(facility[i].e24);
        facility[i].e25 == null ? null : parseInt(facility[i].e25);
        facility[i].e26 == null ? null : parseInt(facility[i].e26);
        facility[i].e27 == null ? null : parseInt(facility[i].e27);
        facility[i].e28 == null ? null : parseInt(facility[i].e28);
        facility[i].e29 == null ? null : parseInt(facility[i].e29);
        facility[i].e210 == null ? null : parseInt(facility[i].e210);
        facility[i].e211 == null ? null : parseInt(facility[i].e211);
        facility[i].e212 == null ? null : parseInt(facility[i].e212);
        facility[i].e213 == null ? null : parseInt(facility[i].e213);
        facility[i].e214 == null ? null : parseInt(facility[i].e214);
        facility[i].e215 == null ? null : parseInt(facility[i].e215);
        facility[i].e216 == null ? null : parseInt(facility[i].e216);
        facility[i].e217 == null ? null : parseInt(facility[i].e217);
        facility[i].e218 == null ? null : parseInt(facility[i].e218);
        facility[i].e219 == null ? null : parseInt(facility[i].e219);
        facility[i].e220 == null ? null : parseInt(facility[i].e220);
        facility[i].e221 == null ? null : parseInt(facility[i].e221);
        facility[i].e222 == null ? null : parseInt(facility[i].e222);
        facility[i].e223 == null ? null : parseInt(facility[i].e223);
        facility[i].e224 == null ? null : parseInt(facility[i].e224);
        facility[i].e225 == null ? null : parseInt(facility[i].e225);
        facility[i].e226 == null ? null : parseInt(facility[i].e226);
        facility[i].e227 == null ? null : parseInt(facility[i].e227);
        facility[i].e228 == null ? null : parseInt(facility[i].e228);
        facility[i].e229 == null ? null : parseInt(facility[i].e229);
        facility[i].e230 == null ? null : parseInt(facility[i].e230);
        facility[i].e231 == null ? null : parseInt(facility[i].e231);
        facility[i].e232 == null ? null : parseInt(facility[i].e232);
        facility[i].e233 == null ? null : parseInt(facility[i].e233);
        facility[i].e234 == null ? null : parseInt(facility[i].e234);
        facility[i].e235 == null ? null : parseInt(facility[i].e235);
        facility[i].e236 == null ? null : parseInt(facility[i].e236);
        facility[i].e31 == null ? null : parseInt(facility[i].e31);
        facility[i].e32 == null ? null : parseInt(facility[i].e32);
        facility[i].e33 == null ? null : parseInt(facility[i].e33);
        facility[i].e341 == null ? null : parseInt(facility[i].e341);
        facility[i].e342 == null ? null : parseInt(facility[i].e342);
        facility[i].e351 == null ? null : parseInt(facility[i].e351);
        facility[i].e352 == null ? null : parseInt(facility[i].e352);
        facility[i].e36 == null ? null : parseInt(facility[i].e36);
        facility[i].e37 == null ? null : parseInt(facility[i].e37);
        facility[i].e38 == null ? null : parseInt(facility[i].e38);
        facility[i].e39 == null ? null : parseInt(facility[i].e39);
        facility[i].e310 == null ? null : parseInt(facility[i].e310);
        facility[i].e311 == null ? null : parseInt(facility[i].e311);
        facility[i].e312 == null ? null : parseInt(facility[i].e312);
        facility[i].e313 == null ? null : parseInt(facility[i].e313);
        facility[i].e41 == null ? null : parseInt(facility[i].e41);
        facility[i].e42 == null ? null : parseInt(facility[i].e42);
        facility[i].e43 == null ? null : parseInt(facility[i].e43);
        facility[i].e44 == null ? null : parseInt(facility[i].e44);
        facility[i].e45 == null ? null : parseInt(facility[i].e45);
        facility[i].e46 == null ? null : parseInt(facility[i].e46);
        facility[i].e47 == null ? null : parseInt(facility[i].e47);
        facility[i].e51 == null ? null : parseInt(facility[i].e51);
        facility[i].e52 == null ? null : parseInt(facility[i].e52);
        facility[i].e53 == null ? null : parseInt(facility[i].e53);
        facility[i].e54 == null ? null : parseInt(facility[i].e54);
        facility[i].e55 == null ? null : parseInt(facility[i].e55);
        facility[i].e56 == null ? null : parseInt(facility[i].e56);
        facility[i].e57 == null ? null : parseInt(facility[i].e57);
        facility[i].e58 == null ? null : parseInt(facility[i].e58);
        facility[i].e59 == null ? null : parseInt(facility[i].e59);
        facility[i].e510 == null ? null : parseInt(facility[i].e510);
        facility[i].e511 == null ? null : parseInt(facility[i].e511);
        facility[i].e512 == null ? null : parseInt(facility[i].e512);
        facility[i].e513 == null ? null : parseInt(facility[i].e513);
        facility[i].e61 == null ? null : parseInt(facility[i].e61);
        facility[i].e62 == null ? null : parseInt(facility[i].e62);
        facility[i].e63 == null ? null : parseInt(facility[i].e63);
        facility[i].e64 == null ? null : parseInt(facility[i].e64);
        facility[i].e65 == null ? null : parseInt(facility[i].e65);
        facility[i].e66 == null ? null : parseInt(facility[i].e66);
        facility[i].e67 == null ? null : parseInt(facility[i].e67);
        facility[i].e71 == null ? null : parseInt(facility[i].e71);
        facility[i].e72 == null ? null : parseInt(facility[i].e72);
        facility[i].e73 == null ? null : parseInt(facility[i].e73);
        facility[i].e74 == null ? null : parseInt(facility[i].e74);
        facility[i].e75 == null ? null : parseInt(facility[i].e75);
        facility[i].e76 == null ? null : parseInt(facility[i].e76);
        facility[i].e77 == null ? null : parseInt(facility[i].e77);
        facility[i].e81 == null ? null : parseInt(facility[i].e81);
        facility[i].e82 == null ? null : parseInt(facility[i].e82);
        facility[i].e83 == null ? null : parseInt(facility[i].e83);
        facility[i].e84 == null ? null : parseInt(facility[i].e84);
        facility[i].e85 == null ? null : parseInt(facility[i].e85);
        facility[i].e86 == null ? null : parseInt(facility[i].e86);
        facility[i].e87 == null ? null : parseInt(facility[i].e87);
        facility[i].e88 == null ? null : parseInt(facility[i].e88);
        facility[i].e91 == null ? null : parseInt(facility[i].e91);
        facility[i].e92 == null ? null : parseInt(facility[i].e92);
        facility[i].e93 == null ? null : parseInt(facility[i].e93);
        facility[i].e94 == null ? null : parseInt(facility[i].e94);
        facility[i].e101 == null ? null : parseInt(facility[i].e101);
        facility[i].e102 == null ? null : parseInt(facility[i].e102);
        facility[i].e103 == null ? null : parseInt(facility[i].e103);
        facility[i].e104 == null ? null : parseInt(facility[i].e104);
        facility[i].e105 == null ? null : parseInt(facility[i].e105);
        facility[i].e106 == null ? null : parseInt(facility[i].e106);
        facility[i].e107 == null ? null : parseInt(facility[i].e107);
        facility[i].e108 == null ? null : parseInt(facility[i].e108);
        facility[i].e109 == null ? null : parseInt(facility[i].e109);
        facility[i].e1010 == null ? null : parseInt(facility[i].e1010);
        facility[i].e1011 == null ? null : parseInt(facility[i].e1011);
        facility[i].e11g1 == null ? null : parseInt(facility[i].e11g1);
        facility[i].e1111 == null ? null : parseInt(facility[i].e1111);
        facility[i].e1112 == null ? null : parseInt(facility[i].e1112);
        facility[i].e1113 == null ? null : parseInt(facility[i].e1113);
        facility[i].e1114 == null ? null : parseInt(facility[i].e1114);
        facility[i].e1115 == null ? null : parseInt(facility[i].e1115);
        facility[i].e112 == null ? null : parseInt(facility[i].e112);
        facility[i].e1121 == null ? null : parseInt(facility[i].e1121);
        facility[i].e1122 == null ? null : parseInt(facility[i].e1122);
        facility[i].e1123 == null ? null : parseInt(facility[i].e1123);
        facility[i].e1124 == null ? null : parseInt(facility[i].e1124);
        facility[i].e1125 == null ? null : parseInt(facility[i].e1125);
        facility[i].e113 == null ? null : parseInt(facility[i].e113);
        facility[i].e1131 == null ? null : parseInt(facility[i].e1131);
        facility[i].e1132 == null ? null : parseInt(facility[i].e1132);
        facility[i].e1133 == null ? null : parseInt(facility[i].e1133);
        facility[i].e1134 == null ? null : parseInt(facility[i].e1134);
        facility[i].e1135 == null ? null : parseInt(facility[i].e1135);
        facility[i].e114 == null ? null : parseInt(facility[i].e114);
        facility[i].e1141 == null ? null : parseInt(facility[i].e1141);
        facility[i].f11 == null ? null : parseInt(facility[i].f11);
        facility[i].f12 == null ? null : parseInt(facility[i].f12);
        facility[i].f13 == null ? null : parseInt(facility[i].f13);
        facility[i].f14 == null ? null : parseInt(facility[i].f14);
        facility[i].f15 == null ? null : parseInt(facility[i].f15);
        facility[i].f16 == null ? null : parseInt(facility[i].f16);
        facility[i].f17 == null ? null : parseInt(facility[i].f17);
        facility[i].f18 == null ? null : parseInt(facility[i].f18);
        facility[i].f19 == null ? null : parseInt(facility[i].f19);
        facility[i].f110 == null ? null : parseInt(facility[i].f110);
        facility[i].f111 == null ? null : parseInt(facility[i].f111);
        facility[i].f21 == null ? null : parseInt(facility[i].f21);
        facility[i].f22 == null ? null : parseInt(facility[i].f22);
        facility[i].f23 == null ? null : parseInt(facility[i].f23);
        facility[i].f24 == null ? null : parseInt(facility[i].f24);
        facility[i].f25 == null ? null : parseInt(facility[i].f25);
        facility[i].f26 == null ? null : parseInt(facility[i].f26);
        facility[i].f27 == null ? null : parseInt(facility[i].f27);
        facility[i].f28 == null ? null : parseInt(facility[i].f28);
        facility[i].f29 == null ? null : parseInt(facility[i].f29);
        facility[i].f210 == null ? null : parseInt(facility[i].f210);
        facility[i].f31 == null ? null : parseInt(facility[i].f31);
        facility[i].f32 == null ? null : parseInt(facility[i].f32);
        facility[i].f33 == null ? null : parseInt(facility[i].f33);
        facility[i].f34 == null ? null : parseInt(facility[i].f34);
        facility[i].f35 == null ? null : parseInt(facility[i].f35);
        facility[i].f36 == null ? null : parseInt(facility[i].f36);
        facility[i].f37 == null ? null : parseInt(facility[i].f37);
        facility[i].f38 == null ? null : parseInt(facility[i].f38);
        facility[i].f39 == null ? null : parseInt(facility[i].f39);
        facility[i].f310 == null ? null : parseInt(facility[i].f310);
        facility[i].f41 == null ? null : parseInt(facility[i].f41);
        facility[i].f42 == null ? null : parseInt(facility[i].f42);
        facility[i].f43 == null ? null : parseInt(facility[i].f43);
        facility[i].f44 == null ? null : parseInt(facility[i].f44);
        facility[i].f45 == null ? null : parseInt(facility[i].f45);
        facility[i].f51 == null ? null : parseInt(facility[i].f51);
        facility[i].f52 == null ? null : parseInt(facility[i].f52);
        facility[i].f53 == null ? null : parseInt(facility[i].f53);
        facility[i].f54 == null ? null : parseInt(facility[i].f54);
        facility[i].f55 == null ? null : parseInt(facility[i].f55);
        facility[i].f56 == null ? null : parseInt(facility[i].f56);
        facility[i].f57 == null ? null : parseInt(facility[i].f57);
        facility[i].f58 == null ? null : parseInt(facility[i].f58);
        facility[i].f61 == null ? null : parseInt(facility[i].f61);
        facility[i].f62 == null ? null : parseInt(facility[i].f62);
        facility[i].f63 == null ? null : parseInt(facility[i].f63);
        facility[i].f64 == null ? null : parseInt(facility[i].f64);
        facility[i].f65 == null ? null : parseInt(facility[i].f65);
        facility[i].f66 == null ? null : parseInt(facility[i].f66);
        facility[i].f71 == null ? null : parseInt(facility[i].f71);
        facility[i].f72 == null ? null : parseInt(facility[i].f72);
        facility[i].f73 == null ? null : parseInt(facility[i].f73);
        facility[i].f74 == null ? null : parseInt(facility[i].f74);
        facility[i].f75 == null ? null : parseInt(facility[i].f75);
        facility[i].f76 == null ? null : parseInt(facility[i].f76);
        facility[i].f77 == null ? null : parseInt(facility[i].f77);
        facility[i].f78 == null ? null : parseInt(facility[i].f78);
        facility[i].f79 == null ? null : parseInt(facility[i].f79);
        facility[i].f710 == null ? null : parseInt(facility[i].f710);
        facility[i].f711 == null ? null : parseInt(facility[i].f711);
      }
      txnDataExist = true;
      temp.syncModel.facilityDataList = facility;
    }

    if (community != null && community.length > 0) {
      for (let i = 0; i < community.length; i++) {
        community[i].q2 = community[i].q2 == null ? null : parseInt(community[i].q2);
        community[i].q3 == null ? null : parseInt(community[i].q3);
        community[i].q6 == null ? null : parseInt(community[i].q6);
        community[i].q7 == null ? null : parseInt(community[i].q7);
        community[i].q1p1 == null ? null : parseInt(community[i].q11);
        community[i].q11a == null ? null : parseInt(community[i].q11a);
        community[i].q11b == null ? null : parseInt(community[i].q11b);
        community[i].q11c == null ? null : parseInt(community[i].q11c);
        community[i].q11d == null ? null : parseInt(community[i].q11d);
        community[i].q11e == null ? null : parseInt(community[i].q11e);
        community[i].q1p2 == null ? null : parseInt(community[i].q12);
        community[i].q1p3 == null ? null : parseInt(community[i].q13);
        community[i].q1p4 == null ? null : parseInt(community[i].q14);
        community[i].q1p5 == null ? null : parseInt(community[i].q15);
        community[i].q21 == null ? null : parseInt(community[i].q21);
        community[i].q22 == null ? null : parseInt(community[i].q22);
        community[i].q23 == null ? null : parseInt(community[i].q23);
        community[i].q24 == null ? null : parseInt(community[i].q24);
        community[i].q25 == null ? null : parseInt(community[i].q25);
        community[i].q251 == null ? null : parseInt(community[i].q251);
        community[i].q26 == null ? null : parseInt(community[i].q26);
        community[i].q27 == null ? null : parseInt(community[i].q27);
        community[i].q31a == null ? null : parseInt(community[i].q31a);
        community[i].q31b == null ? null : parseInt(community[i].q31b);
        community[i].q31c == null ? null : parseInt(community[i].q31c);
        community[i].q31d == null ? null : parseInt(community[i].q31d);
        community[i].q311 == null ? null : parseInt(community[i].q311);
        community[i].q32 == null ? null : parseInt(community[i].q32);
        community[i].q321 == null ? null : parseInt(community[i].q321);
        community[i].q33 == null ? null : parseInt(community[i].q33);
        community[i].q331 == null ? null : parseInt(community[i].q331);
        community[i].q34 == null ? null : parseInt(community[i].q34);
        community[i].q35 == null ? null : parseInt(community[i].q35);
        community[i].q36 == null ? null : parseInt(community[i].q36);
        community[i].q37a == null ? null : parseInt(community[i].q37a);
        community[i].q37b == null ? null : parseInt(community[i].q37b);
        community[i].q37c == null ? null : parseInt(community[i].q37c);
        community[i].q37d == null ? null : parseInt(community[i].q37d);
        community[i].q37e == null ? null : parseInt(community[i].q37e);
        community[i].q37fi == null ? null : parseInt(community[i].q37fi);
        community[i].q37fii == null ? null : parseInt(community[i].q37fii);
        community[i].q37gi == null ? null : parseInt(community[i].q37gi);
        community[i].q37gii == null ? null : parseInt(community[i].q37gii);
        community[i].q37h == null ? null : parseInt(community[i].q37h);
        community[i].q37i == null ? null : parseInt(community[i].q37i);
        community[i].q37j == null ? null : parseInt(community[i].q37j);
        community[i].q37k == null ? null : parseInt(community[i].q37k);
        community[i].q37l == null ? null : parseInt(community[i].q37l);
        community[i].q411 == null ? null : parseInt(community[i].q411);
        community[i].q412 == null ? null : parseInt(community[i].q412);
        community[i].q413 == null ? null : parseInt(community[i].q413);
        community[i].q421 == null ? null : parseInt(community[i].q421);
        community[i].q422 == null ? null : parseInt(community[i].q422);
        community[i].q423a == null ? null : parseInt(community[i].q423a);
        community[i].q423b == null ? null : parseInt(community[i].q423b);
        community[i].q423c == null ? null : parseInt(community[i].q423c);
        community[i].q423d == null ? null : parseInt(community[i].q423d);
        community[i].q423e == null ? null : parseInt(community[i].q423e);
        community[i].q424a == null ? null : parseInt(community[i].q424a);
        community[i].q424b == null ? null : parseInt(community[i].q424b);
        community[i].q424c == null ? null : parseInt(community[i].q424c);
        community[i].q424d == null ? null : parseInt(community[i].q424d);
        community[i].q424e == null ? null : parseInt(community[i].q424e);
        community[i].q424f == null ? null : parseInt(community[i].q424f);
        community[i].q424g == null ? null : parseInt(community[i].q424g);
        community[i].q424h == null ? null : parseInt(community[i].q424h);
        community[i].q424i == null ? null : parseInt(community[i].q424i);
        community[i].q424j == null ? null : parseInt(community[i].q424j);
        community[i].q431 == null ? null : parseInt(community[i].q431);
        community[i].q431a == null ? null : parseInt(community[i].q431a);
        community[i].q431b == null ? null : parseInt(community[i].q431b);
        community[i].q432 == null ? null : parseInt(community[i].q432);
        community[i].q433 == null ? null : parseInt(community[i].q433);
        community[i].q434 == null ? null : parseInt(community[i].q434);
        community[i].q435 == null ? null : parseInt(community[i].q435);
        community[i].q436 == null ? null : parseInt(community[i].q436);
        community[i].q437 == null ? null : parseInt(community[i].q437);
        community[i].q437a == null ? null : parseInt(community[i].q437a);
        community[i].q437b == null ? null : parseInt(community[i].q437b);
        community[i].q437c == null ? null : parseInt(community[i].q437c);
        community[i].q437d == null ? null : parseInt(community[i].q437d);
        community[i].q437e == null ? null : parseInt(community[i].q437e);
        community[i].q441 == null ? null : parseInt(community[i].q441);
        community[i].q442 == null ? null : parseInt(community[i].q442);
        community[i].q443 == null ? null : parseInt(community[i].q443);
        community[i].q444 == null ? null : parseInt(community[i].q444);
        community[i].q445 == null ? null : parseInt(community[i].q445);
        community[i].q446a == null ? null : parseInt(community[i].q446a);
        community[i].q446b == null ? null : parseInt(community[i].q446b);
        community[i].q446c == null ? null : parseInt(community[i].q446c);
        community[i].q447 == null ? null : parseInt(community[i].q447);
        community[i].q451 == null ? null : parseInt(community[i].q451);
        community[i].q452 == null ? null : parseInt(community[i].q452);
        community[i].q453 == null ? null : parseInt(community[i].q453);
        community[i].q461a == null ? null : parseInt(community[i].q461a);
        community[i].q461b == null ? null : parseInt(community[i].q461b);
        community[i].q461c == null ? null : parseInt(community[i].q461c);
        community[i].q461d == null ? null : parseInt(community[i].q461d);
        community[i].q461e == null ? null : parseInt(community[i].q461e);
        community[i].q462a == null ? null : parseInt(community[i].q462a);
        community[i].q462b == null ? null : parseInt(community[i].q462b);
        community[i].q462c == null ? null : parseInt(community[i].q462c);
        community[i].q463 == null ? null : parseInt(community[i].q463);
        community[i].q471 == null ? null : parseInt(community[i].q471);
        community[i].q471a == null ? null : parseInt(community[i].q471a);
        community[i].q472 == null ? null : parseInt(community[i].q472);
        community[i].q473 == null ? null : parseInt(community[i].q473);
        community[i].q474 == null ? null : parseInt(community[i].q474);
        community[i].q474a == null ? null : parseInt(community[i].q474a);
        community[i].q475 == null ? null : parseInt(community[i].q475);
        community[i].q476 == null ? null : parseInt(community[i].q476);
        community[i].q10 == null ? null : parseInt(community[i].q10);
        community[i].q14 == null ? null : parseInt(community[i].q14);
      }
      txnDataExist = true;
      temp.syncModel.communityDataList = community;
    }

    temp.sendSyncData(txnDataExist);
  }

  showAlert() {
    this.dataService.getViewSentForms_not_deleted();
    this.dataService.getFinalizeForms();
    let alert = this.alertCtrl.create({
      title: 'Sync Report',
      cssClass: 'syncModal',      
      message: '<div class="reportBody">' +
        '<h5>Facility form(s) synced : ' + this.syncResult.facilityRecordsSynced + '</h5><br>' +
        '<h5>Facility form(s) rejected : ' + this.syncResult.facilityErrorModels.length + '</h5><br>' +
        '<h5>Community form(s) synced : ' + this.syncResult.communityRecordsSynced + '</h5><br>' +
        '<h5>Community form(s) rejected : ' + this.syncResult.communityErrorModels.length + '</h5></div>',
      buttons: ['OK']
    });
    alert.present();
  }

  goTo(page) {
    switch (page) {
      case "entry":
        this.gotoNext();
        break;
      case "edit":
        this.nav.push(this.editFormPage);
        break;
      case "final":
        this.nav.push(this.finalizeFormPage);
        break;
      case "view":
        this.nav.push(this.viewsentFormPage);
        break;
      case "prefetch":
        this.nav.push(this.prefetchDataPage);
        break;
    }
  }

  gotoNext() {
    // this.dataService.getTxnDataCount();
    let alert = this.alertCtrl.create();
    alert.setTitle('Select Checklist');
    alert.setCssClass('sectorSelectionModal'),
      alert.addInput({
        type: 'radio',
        label: 'Facility',
        value: '1',
        checked: false
      });
    alert.addInput({
      type: 'radio',
      label: 'Community',
      value: '2',
      checked: false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.messageService.presentLoading("Loading, please wait...");
        setTimeout(() => {
          if (data == MessageProvider.FORM_TYPE.FACILITY) {
            if (this.nav.push(FacilityPage)) {
              this.messageService.dismissLoading();
            }
          } else if (data == MessageProvider.FORM_TYPE.COMMUNITY) {
            if (this.nav.push(CommunityPage)) {
              this.messageService.dismissLoading();
            }
          }
        }, 300);
      }
    });
    alert.present();
  }

  getSideMenuData() {
    let temp = this;
    try {
      this.dataService.getDB().get(MessageProvider.DOC_NAMES.MST_DOC_NAME)
        .then(function (result) {
          temp.userObject = result.data.userModel;
        }).catch(function (err) {
          console.log("dynamic data fetch for side menu failed.");
        });
    } catch (err) {
      console.log("dynamic data fetch for side menu failed.");
    }
  }

  /**
   * @author Jagat Bandhu Sahoo
   * @param checklist, if the back button is pressed at the time od facility checklist, the value of this parameter
   * will be 'facility' otherwise undefined
   */
  handleBackButton(checklist?: string) {
    if (checklist == 'facility') {
      if(this.messageService.isLoaderActive){
        this.messageService.isLoaderActive = false;
        this.events.publish(MessageProvider.EVENTS.DISSMISS_LOADER_FACILITY);
      } else {
        if(MessageProvider.MODAL_ALERTS.SIGNATURE){
          MessageProvider.MODAL_ALERTS.SIGNATURE = false;
          this.nav.getActive().instance.sigModal.dismiss();
        }else if(MessageProvider.MODAL_ALERTS.HELP){
          MessageProvider.MODAL_ALERTS.HELP = false;
          this.events.publish(MessageProvider.EVENTS.DISSMISS_MODAL_FACILITY);
        }else if(!this.isCancleDialogShowing) {
          this.isCancleDialogShowing = true;
          let confirm = this.alertCtrl.create({
            enableBackdropDismiss: false,
            title: 'Confirm',
            message: 'Are you sure you want to cancel?',
            buttons: [{
                text: 'No',
                handler: () => {
                  this.isCancleDialogShowing = false;
                }
              },
              {
                text: 'Yes',
                handler: () => {
                  this.isCancleDialogShowing = false;
                  this.nav.pop();
                }
              }
            ]
          });
          confirm.setCssClass('sectorSelectionModalCommunity');
          confirm.present();
        }
      }
    } else {
      if(this.messageService.isLoaderActive){
        this.messageService.isLoaderActive = false;
        this.events.publish(MessageProvider.EVENTS.DISSMISS_LOADER_COMMUNITY);
      } else {
        if(MessageProvider.MODAL_ALERTS.SIGNATURE){
          MessageProvider.MODAL_ALERTS.SIGNATURE = false;
          this.nav.getActive().instance.sigModal.dismiss();
        }else if(MessageProvider.MODAL_ALERTS.HELP){
          MessageProvider.MODAL_ALERTS.HELP = false;
          this.events.publish(MessageProvider.EVENTS.DISSMISS_MODAL_COMMUNITY);
        }else if(!this.isCancleDialogShowing) {
          this.isCancleDialogShowing = true;
          let confirm = this.alertCtrl.create({
            enableBackdropDismiss: false,
            title: 'Confirm',
            message: 'Are you sure you want to cancel?',
            buttons: [{
                text: 'No',
                handler: () => {
                  this.isCancleDialogShowing = false;
                }
              },
              {
                text: 'Yes',
                handler: () => {
                  this.isCancleDialogShowing = false;
                  this.nav.pop();
                }
              }
            ]
          });
          confirm.setCssClass('sectorSelectionModalCommunity');
          confirm.present();
        }
      }
    }
    
  }

  handleExitApp() {
    if (!this.isExitDialogShowing) {
      this.isExitDialogShowing = true;
      let confirm = this.alertCtrl.create({
        enableBackdropDismiss: false,
        title: 'Confirm',
        message: 'Are you sure you want to exit?',
        buttons: [{
            text: 'No',
            handler: () => {
              this.isExitDialogShowing = false;
            }
          },
          {
            text: 'Yes',
            handler: () => {
              this.isExitDialogShowing = false;
              this.platform.exitApp();
            }
          }
        ]
      });
      confirm.setCssClass('sectorSelectionModalCommunity');
      confirm.present();
    }
  }

  controlBackButton() {
    this.platform.registerBackButtonAction(() => {
      /**
       * @author Naseem Akhtar (naseem@sdrc.co.in)
       * As there is no solution to remove the slect pop created through the html dynamically
       * We go through the backend and check whether there is any overlay view present, if so
       * we dismiss it.
       * 
       * @author Jagat Bandhu
       * trying to fix bug no 533
       */
      const overlayView = this.app._appRoot._overlayPortal._views[0];
      if (overlayView && overlayView.dismiss && (!this.isCancleDialogShowing && !this.isExitDialogShowing)) {
        overlayView.dismiss();
      }else{
        switch (this.nav.getActive().instance.navCtrl._app._title.trim()) {
          case "Facility Checklist":
            this.handleBackButton('facility');
            break;
          case "Community Checklist":
            this.handleBackButton();
            break;
          case "Signature":
            this.nav.getActive().instance.sigModal.dismiss();
            // this.nav.getActive()._destroy;
            break;
          case "Saved Forms":
            this.nav.pop();
            break;
          case "Finalized Forms":
            this.nav.pop();
            break;
          case "Sent Forms":
            this.nav.pop();
            break;
          case "Select Facilities":
            this.nav.pop();
            break;
          case "Prefetch Data":
            this.nav.pop();
            break;
          case "Home":
            this.handleExitApp();
            break;
          case "Login":
            this.handleExitApp();
            break;
        }
      }
      console.log(this.nav.getActive().instance.navCtrl._app._title);
      console.log(this.nav.getActive().instance);
    });
  }

  ngOnDestroy(): void{
    this.events.unsubscribe(MessageProvider.EVENTS.LOGGED_IN)
  }

  /**
   * This method will check whether the app is of latest version or not.
   * If app is not the latest version, we will exit the app by showing some error
   * 
   * @author Ratikanta
   * @since 2.1.0
   */
  checkAppVersionIsOkOrNot(): Promise<string>{

    return new Promise((resolve, reject)=>{
      let temp_this = this
      this.dataService.getDB().get(MessageProvider.DOC_NAMES.CONFIG_DOC_NAME)
      .then(doc =>{
        let latestAppVersionName = doc.data != undefined?(doc.data as Config).latestAppVersionName: undefined
        if(latestAppVersionName != undefined && latestAppVersionName != temp_this.essProvider.getAppVersionName()){
          let platform = temp_this.essProvider.getPlatform() 
          if(platform.isAndroid)
            reject(MessageProvider.MESSAGES.UPDATE_MESSGAE + " Latest version is " + latestAppVersionName)          
          else if (platform.isMobilePWA)
            reject("An updated version of the app is available, please refresh the app in browser. Latest version is " + latestAppVersionName)          
          else if (platform.isWebPWA)
            reject("An updated version of the app is available, please press 'ctrl+F5' to refresh the app. Latest version is " + latestAppVersionName)          
        } else {
          resolve()
        }
      })
      .catch(err=>{
        if(err.status != 404){
          console.log(err)
          reject("Error-" +MessageProvider.MESSAGES.OTHER_DB_ERRR+ " While checking app version.")
        } else 
            resolve()
        
      })
    })
        

  }
}
