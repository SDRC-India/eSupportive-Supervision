/*
 * @Author: Ratikanta Pradhan 
 * @email:   ratikanta@sdrc.co.in 
 * @Date: 2017-10-18 16:12:35 
 * @Last Modified by: Ratikanta Pradhan
 * @Last Modified time: 2018-01-07 23:28:15
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Events, AlertController, Platform } from 'ionic-angular';
import { MessageProvider } from '../message/message';
import { MonthdataPipe } from '../../pipes/monthdata/monthdata';
import { TxndataPipe } from '../../pipes/txndata/txndata';
import 'rxjs/add/operator/timeout';
import PouchDB from 'pouchdb';
import { DatePipe} from '@angular/common';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';
import { EssProvider } from '../ess/ess';
import { ConfigImpl } from '../../class/ConfigImpl';

declare var navigator: any;
declare var Connection: any;

@Injectable()

/**
 * @Author: Ratikanta Pradhan 
 * @email:   ratikanta@sdrc.co.in 
 * @Last Modified by: Ratikanta Pradhan
 * @Last Modified time: 11-10-2017 17:14
 */
export class DataProvider {

    db: any;
    db_v1: any 
    typeDetails:any = [];
    typeDetailsAll:any = [];
    masterData : any;
    uiUserObject : any;
    dataExistAreas : any = [];
    database_version_for_new_user : number;
     /**
     * @Author: Ratikanta Pradhan 
     * @email:   ratikanta@sdrc.co.in 
     * @Date: 11-10-2017 19:15
     * @Last Modified by:   Ratikanta Pradhan 
     * @Last Modified time: 11-10-2017 19:15
     * We use this variable to count how many times storage check error is occuring.
     * If the error is occuring more than once then we are not showing the error again
     * @type {number}
     * @memberof DataProvider
     */
    storage_error_message_shown: boolean;

    /**
     * @Author: Ratikanta Pradhan 
     * @email:   ratikanta@sdrc.co.in 
     * @Last Modified by:   Ratikanta Pradhan 
     * @Last Modified time: 12-10-2017 16:27
     */
    constructor(public http: Http, private messageService: MessageProvider, private events: Events,
    private monthdata: MonthdataPipe, private alertCtrl: AlertController, private platform : Platform,
    private txndata: TxndataPipe,private datePipe : DatePipe, private essProvider: EssProvider) {}

    validateUser(obj: any){

      let temp = this;
      temp.messageService.presentLoading("Logging in, please wait...");
      obj.username.trim();
      obj.password.trim();
      if(obj.username == "" || obj.username === undefined || obj.username === null){
        temp.messageService.dismissLoading();
        this.errorToast("Please enter a valid username");
        return false;
      }else if(obj.password == "" || obj.password === undefined || obj.password === null){
        temp.messageService.dismissLoading();
        this.errorToast("Please enter a valid password");
        return false;
      }
      temp.uiUserObject = obj;

      //Checking the user doc is present or not, if it would not be present, we will hit server
      temp.db.get(MessageProvider.DOC_NAMES.MST_DOC_NAME)
      .then(function (doc) {
        if(doc.username === obj.username && doc.password === obj.password){
          temp.messageService.dismissLoading();
            temp.events.publish(MessageProvider.EVENTS.LOGIN_EVENT, true);
            MessageProvider.USER_DETAILS = doc.data.userModel;
        }else{
          temp.uiUserObject.initialLogin = false;          
          if(doc.username === obj.username){
            temp.uiUserObject.initialLogin = false;
            temp.getUserFromServer();
          }else{
            temp.messageService.dismissLoading();
            temp.events.publish(MessageProvider.EVENTS.LOGIN_EVENT, true, true ,"Invalid credentials!", temp.database_version_for_new_user);
          }          
        }
      }).catch(function (err) {
        if (err.status === 404) {
          temp.uiUserObject.initialLogin = true;
          temp.getUserFromServer();
        } else {
          temp.messageService.dismissLoading();
          temp.events.publish(MessageProvider.EVENTS.LOGIN_EVENT, false, false, "Database error! " + "Error status " + err.status);
        }
      });
      
    }
  

  /**
   * Making call to server to validate user (This will happen if the app will run for first time)
   * 
   * @param new_user {boolean}  If the user is new user then this parameter value will be true
   * @author Ratikanta
   * @since 1.0.0
   */

  getUserFromServer(new_user?: boolean) {

    let temp = this;
    if(new_user === true){
      temp.messageService.presentLoading("Logging in, please wait...");
      temp.uiUserObject.newUser = true;
      temp.uiUserObject.initialLogin = false;
    }else{      
      temp.uiUserObject.newUser = false;
    }
    
    let obj = temp.uiUserObject;
    try {
      temp.http.get(MessageProvider.checkInternetURL)
      .timeout(MessageProvider.LOGIN_TIME_OUT)
      .subscribe(data =>{
        let headers = new Headers();
        let encodedApi = btoa(temp.essProvider.getAppVersionName())
        headers.append('Content-Type', 'application/json');
        headers.append('apiToken', encodedApi);
        temp.http.post(MessageProvider.server + "login", JSON.stringify(obj), {
          headers: headers
        })
            .timeout(MessageProvider.LOGIN_TIME_OUT)
            .map(res => res.json())
            .subscribe(data => {
                //Checking null result from server
                if (data != null) {
                  //Checking is there any error came from server or not
                  if (data.errorCode === null) {
                    //No error has come
                    //Checking we got the user or not
                    if (data.userModel != null) {
                      if(data.after_forgot_password === 1){

                        //code for forgot password

                        temp.db.get(MessageProvider.DOC_NAMES.MST_DOC_NAME)
                        .then(function (doc) {
                          return temp.db.put({
                            _id: MessageProvider.DOC_NAMES.MST_DOC_NAME,
                            _rev: doc._rev,
                            data: doc.data,
                            username: obj.username,
                            password: obj.password,
                            email: doc.email
                          }).then(function (success) {                            
                            temp.messageService.dismissLoading();
                            temp.events.publish(MessageProvider.EVENTS.LOGIN_EVENT, true);
                          }).catch(function (err) {
                            temp.messageService.dismissLoading();
                            temp.events.publish(MessageProvider.EVENTS.LOGIN_EVENT, false, false, "Unable to update MstDoc");
                          });
                        }).catch(function (err) {
                          temp.messageService.dismissLoading();
                          temp.events.publish(MessageProvider.EVENTS.LOGIN_EVENT, false, false, "Could not save user data");                          
                        });

                      }else{

                        
                        MessageProvider.USER_DETAILS = data.userModel;
                        //let's store the master data, then switch to home page
                        //We are assuming there is no master data document here becuase we did not have the user
                        //let's create the master data doc then keep the master data in that doc
                        //We have to create the user doc too.
                        temp.db.get(MessageProvider.DOC_NAMES.MST_DOC_NAME)
                          .then(function (doc) {
                            return temp.db.put({
                              _id: MessageProvider.DOC_NAMES.MST_DOC_NAME,
                              _rev: doc._rev,
                              data: data,
                              username: obj.username,
                              password: obj.password,
                              email: data.userModel.email
                            }).then(function (success) {
                              temp.deleteTxnDoc();
                            }).catch(function (err) {
                              temp.messageService.dismissLoading();
                              temp.events.publish(MessageProvider.EVENTS.LOGIN_EVENT, false, false, "Unable to update MstDoc");
                            });
                          }).catch(function (err) {
                            if (err.status === 404) {
                              temp.db.put({
                                _id: MessageProvider.DOC_NAMES.MST_DOC_NAME,
                                data: data,
                                username: obj.username,
                                password: obj.password,
                                email: data.userModel.email
                              }).then(function (response) {
                                temp.deleteTxnDoc();
                              }).catch(function (err) {
                                temp.messageService.dismissLoading();
                                temp.events.publish(MessageProvider.EVENTS.LOGIN_EVENT, false, false, "Could not save user data");
                              });
                            } else {
                              temp.messageService.dismissLoading();
                              temp.events.publish(MessageProvider.EVENTS.LOGIN_EVENT, false, false, "Could not save user data");
                            }
                          });
                        
                      }
                    } else {
                      temp.messageService.dismissLoading();
                      temp.events.publish(MessageProvider.EVENTS.LOGIN_EVENT, false, false, "User details has not come from server");
                    }
                  } else {

                    switch(data.errorCode){
                      case 1: 
                      //Showing error message which has come from server
                      temp.messageService.dismissLoading();
                      temp.events.publish(MessageProvider.EVENTS.LOGIN_EVENT, false, false, data.errorMessage);
                      break;
                      case 2:
                      temp.messageService.dismissLoading();
                      temp.getDB().get(MessageProvider.DOC_NAMES.CONFIG_DOC_NAME)
                      .then(function(doc){
                        let config: Config = new ConfigImpl()
                        config.isLoggedIn = (doc.data as Config).isLoggedIn
                        config.latestAppVersionName = data.latestAppVersionName
                        return temp.getDB().put({
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
                        if(err.status === 404){
                          let config: Config = new ConfigImpl()
                          config.isLoggedIn = false       
                          config.latestAppVersionName = data.latestAppVersionName

                          temp.getDB().put({
                            _id: MessageProvider.DOC_NAMES.CONFIG_DOC_NAME,
                            data: config            
                          }).then(function (response) {
                          
                            let platform = temp.essProvider.getPlatform() 
                            if(platform.isAndroid)
                              temp.messageService.showConfirmOnOkAppExit("Warning", MessageProvider.MESSAGES.UPDATE_MESSGAE + " Latest version is " + config.latestAppVersionName)                                             
                            else if (platform.isMobilePWA)
                              temp.messageService.showConfirmOnOkAppExit("Warning", "An updated version of the app is available, please refresh the app in browser. Latest version is " + config.latestAppVersionName)          
                            else if (platform.isWebPWA)
                              temp.messageService.showConfirmOnOkAppExit("Warning", "An updated version of the app is available, please press 'ctrl+F5' to refresh the app. Latest version is " + config.latestAppVersionName)          

                          }).catch(function (err) {                            
                            temp.messageService.showErrorAlert("Could not update config doc" + err.message)
                            console.log(err)
                          });
                        }else{
                          temp.messageService.showErrorAlert(MessageProvider.MESSAGES.ERROR_GETTING_CONFIG_DOC)
                          console.log(err)
                        }

                        
                      });
                      break;

                    }
                    
                  }
                } else {
                  temp.messageService.dismissLoading();
                  temp.events.publish(MessageProvider.EVENTS.LOGIN_EVENT, false, false, "Invalid data from server");
                }
              },
              err => {
                try {
                  temp.messageService.dismissLoading();
                  switch (err.status) {
                    case 404:
                      temp.events.publish(MessageProvider.EVENTS.LOGIN_EVENT, false, false, "Server not found, please contact admin");
                      break;
                    case 500:
                      temp.events.publish(MessageProvider.EVENTS.LOGIN_EVENT, false, false, "Server error, please contact admin");
                      break;
                    case 400:
                      temp.events.publish(MessageProvider.EVENTS.LOGIN_EVENT, false, false, "Bad input");
                      break;
                    default:
                      temp.events.publish(MessageProvider.EVENTS.LOGIN_EVENT, false, false, "Error : error status " + err.status + "\n" + err);
                      break;
                  }
                } catch (c_err) {
                  temp.messageService.dismissLoading();
                  temp.events.publish(MessageProvider.EVENTS.LOGIN_EVENT, false, false, "Error : " + err);
                }
              });

        }
	  	, err => {
	  	  temp.messageService.dismissLoading();
        temp.errorToast(MessageProvider.MESSAGES.INTERNET_CHECK);
	  	});
    } catch (err) {
      temp.messageService.dismissLoading();
      this.errorToast("Unable to access server, please try again later");
    }
  }


  /**
   * This method will delete txn doc
   * 
   * @author Ratikanta
   * @since 1.0.0
   */
  deleteTxnDoc(){
    let temp = this;
    temp.db.get(MessageProvider.DOC_NAMES.TXN_DOC_NAME)
    .then(function(doc) {
      return temp.db.remove(doc);
    }).then(function (result) {
      temp.messageService.dismissLoading();
      temp.events.publish(MessageProvider.EVENTS.LOGIN_EVENT, true);
    }).catch(function (err) {
      temp.messageService.dismissLoading();
      if(err.status === 404) 
        temp.events.publish(MessageProvider.EVENTS.LOGIN_EVENT, true);
      else
        temp.events.publish(MessageProvider.EVENTS.LOGIN_EVENT, false, false, "Error : " + err);
    });    
  }

  /**
   * The following method will return facility questions json
   */
  getFacilityJson(){

    let sectors = [
      {
        id : 1,
        name : "General Information",
        hasSubsector: false        
      },
      {
        id : 2,
        name : "Data of last reported month from facility",
        hasSubsector: false       
      },
      {
        id : 3,
        name : "RMNCH+A Health System",
        hasSubsector: true,
        subsectors:  [
          {
            id: 31,
            name: "Reproductive Health"
          },
          {
            id: 32,
            name: "Maternal Health: Drugs and Supplies"
          },
          {
            id:  33,
            name: "Newborn Health: Drugs and Supplies"
          },
          {
            id: 34,
            name: "Child Health: Drugs and Supplies"
          }, 
          {
            id: 35,
            name: "Vaccines"
          },    
          {
            id: 36,
            name: "Antibiotics"
          },    
          {
            id: 37,
            name: "Infrastructure"
          },    
          {
            id: 38,
            name: "Infection Prevention"
          },
          {
            id: 39,
            name: "Adolescent Health: Drugs and Supplies"
          },
          {
            id: 310,
            name: "Other Equipment"
          },
          {
            id: 311,
            name: "HR deployed/posted in facility"
          }
        ]       
      },
      {
        id :4,
        name : "Service Delivery Indicators",
        hasSubsector: true,
        subsectors: [
            {
              id: 41,
              name: "Antenatal Care"
            },
            {
              id: 42,
              name: "Intra-partum and Immediate post-partum practices"
            },
            {
              id: 43,
              name: "Essential Newborn Care (ENBC), Resuscitation and Child Health"
            },
            {
              id: 44,
              name: "Family Planning"
            },
            {
              id: 45,
              name: "Client Satisfaction"
            },
            {
              id: 46,
              name: "Facility mechanism and others"
            },
            {
              id: 47,
              name: "Adolescent Health"
            }
        ]       
      },
      {
        id :5,
        name : "Health System Strengthening",
        hasSubsector: true,
        subsectors: [
            {
              id: 51,
              name: "Service Delivery"
            },
            {
              id: 52,
              name: "Health Information System & Essential medicine"
            },
            {
              id: 53,
              name: "Human Resources Management Information System"
            },
            {
              id: 54,
              name: "Health Finance"
            },
            {
              id: 55,
              name: "Leadership and Governance"
            }
        ]       
      },
      {
        id :6,
        name : "CD & NCD",
        hasSubsector: true,
        subsectors: [
            {
              id: 61,
              name: "NPCDCS-Diagnosis"
            },
            {
              id: 62,
              name: "NPCDCS-Treatment"
            },
            {
              id :63,
              name : "National Tobacco Control Programme",
            },
            {
              id :64,
              name : "National Vector Borne Disease Control Program (NVBDCP)",
            },
            {
              id :65,
              name : "RNTCP",
            },
            {
              id :66,
              name : "Leprosy",
            },
            {
              id :67,
              name : "NCD",
            },
            {
              id :68,
              name : "NPPC",
            }
        ]       
      },
      {
        id :8,
        name : "Plan of action",
        hasSubsector: true,
        subsectors: [
            {
              id: 112,
              name: "Infrastructure"
            },
            {
              id: 113,
              name: "Human Resource"
            },
            {
              id: 114,
              name: "Capacity Building/Training"
            },
            {
              id: 115,
              name: "Service Delivery"
            },
            {
              id: 116,
              name: "Logistics and Supplies"
            }
        ]       
      },
      {
        id :9,
        name : "Geo co-ordinate",
        hasSubsector: false 
      }
    ]
    return sectors;
  }
  getCommunityJson(){

    let sectors = [
      {
        id : 1,
        name : "General Information",
        hasSubsector: false        
      },
      {
        id : 2,
        name : "VHND Assessment",
        hasSubsector: false       
      },
      {
        id : 3,
        name : "Interview with ANM",
        hasSubsector: false     
      },
      {
        id :4,
        name : "lnterview with ASHA",
        hasSubsector: true,
        subsectors: [
            {
              id: 41,
              name: "Incentives to ASHA"
            },
            {
              id: 42,
              name: "Availability of essential commodities with ASHA/School/AWCs"
            },
            {
              id: 43,
              name: "Availability of IFA with ASHA"
            },
            {
              id: 44,
              name: "Availability of IFA at school/AWCs"
            }
        ]       
      },
      {
        id :5,
        name : "Interview with beneficiaries (Household visits)",
        hasSubsector: true,
        subsectors: [
            {
              id: 51,
              name: "Interview with Pregnant woman"
            },
            {
              id: 52,
              name: "Interview with Lactating mother with 0-6 months baby (based on recall)"
            },
            {
              id: 53,
              name: "Ask about services she received at the facility where she delivered"
            },
            {
              id: 54,
              name: "Interview mother with a child of 6 months - 2 years"
            },
            {
              id: 55,
              name: "Interview with beneficiaries (Mothers & Pregnant women) pertaining to MCTFC"
            },
            {
              id: 56,
              name: "Interview with family having Adolescents"
            },
            {
              id: 57,
              name: "Interview with Household with Home delivery"
            },
            {
              id: 58,
              name: "School/AWC visit- Interview with WIFS Nodal teacher/AWW"
            }
        ]       
      },
      {
        id: 6,
        name: "Plan of action",
        hasSubsector: true,
        subsectors: [
          {
            id: 112,
            name: "VHND"
          },
          {
            id: 113,
            name: "ANM"
          },
          {
            id: 114,
            name: "ASHA"
          },
          {
            id: 115,
            name: "Household"
          },
          {
            id: 116,
            name: "School/AWC"
          }
        ]
      },
      {
        id :7,
        name : "Geo co-ordinate",
        hasSubsector: false
      }
    ]
    return sectors;
  }

   

/**
 * This method is going to give us the real data json in which we are going to set data and put it in database
 * @author Ratikanta
 * @since 1.0.0
 */
  getFacilityObject(){
      let a = MessageProvider.USER_DETAILS.designation.level;
      let level;
      switch(a){
        case 1:
          level = "National";
        break;
        case 2:
          level = "State";
        break;
        case 3:
          level = "Division";
        break;
        case 4:
          level = "District";
        break;
        case 5:
          level = "Sub-district(Block)";
        break;
        case 6:
          level = "Sub-centre";
        case 8:
          level = "Facility";
        break;
      }
      let obj = {

            state: null,
            c1: MessageProvider.USER_DETAILS.name,
            c11: MessageProvider.USER_DETAILS.designation.name,
            c2: MessageProvider.USER_DETAILS.organization.id,
            c3: level,
            c31: null,
            district: null,
            block: null,
            c43: null,
            c5: null,
            c51: null,
            c6: null,
            c7: null,
            c8: null,
            c9: null,
            d1: null,
            d2: null,
            d3: null,
            d41: null,
            d42: null,
            d43: null,
            d44: null,
            d51: null,
            d52: null,
            d53: null,
            d54: null,
            d55: null,
            d56: null,
            d57: null,
            d58: null,
            d61: null,
            d62: null,
            d71: null,
            d72: null,
            d73: null,
            d74: null,
            d8: null,
            d91: null,
            d92: null,
            d93: null,
            d94: null,
            d101: null,
            d102: null,
            d103: null,
            d104: null,
            d11: null,
            d121: null,
            d122: null,
            d131: null,
            d132: null,
            d133: null,
            d134: null,
            d135: null,
            d136: null,
            d137: null,
            d138: null,
            d141: null,
            d142: null,
            d143: null,
            d144: null,
            d145: null,
            d146: null,
            d151: null,
            d152: null,
            d153: null,
            d161: null,
            d162: null,
            d171: null,
            d172: null,
            e111: null,
            e112: null,
            e121: null,
            e122: null,
            e13: null,
            e14: null,
            e15: null,
            e16: null,
            e17: null,
            e_RH_score:null,
            e21: null,
            e22: null,
            e23: null,
            e24: null,
            e25: null,
            e26: null,
            e27: null,
            e28: null,
            e29: null,
            e210: null,
            e211: null,
            e212: null,
            e213: null,
            e214: null,
            e215: null,
            e216: null,
            e217: null,
            e218: null,
            e219: null,
            e220: null,
            e221: null,
            e222: null,
            e223: null,
            e224: null,
            e225: null,
            e226: null,
            e227: null,
            e228: null,
            e229: null,
            e230: null,
            e231: null,
            e232: null,
            e233: null,
            e234: null,
            e235: null,
            e236: null,
            e_MHDS_score:null,
            e31: null,
            e32: null,
            e33: null,
            e341: null,
            e342: null,
            e351: null,
            e352: null,
            e36: null,
            e37: null,
            e38: null,
            e39: null,
            e310: null,
            e311: null,
            e312: null,
            e313: null,
            e_NHDS_score:null,
            e41: null,
            e42: null,
            e43: null,
            e44: null,
            e45: null,
            e46: null,
            e47: null,
            e_CHDS_score:null,
            e51: null,
            e52: null,
            e53: null,
            e54: null,
            e55: null,
            e56: null,
            e57: null,
            e58: null,
            e59: null,
            e510: null,
            e511: null,
            e512: null,
            e513: null,
            e_Vaccines_score:null,
            e61: null,
            e62: null,
            e63: null,
            e64: null,
            e65: null,
            e66: null,
            e67: null,
            e_Antibiotics_score:null,
            e71: null,
            e72: null,
            e73: null,
            e74: null,
            e75: null,
            e76: null,
            e77: null,
            e_Infrastructure_score:null,
            e81: null,
            e82: null,
            e83: null,
            e84: null,
            e85: null,
            e86: null,
            e87: null,
            e88: null,
            e_IP_score:null,
            e91: null,
            e92: null,
            e93: null,
            e94: null,
            e_AHDS_score:null,
            e101: null,
            e102: null,
            e103: null,
            e104: null,
            e105: null,
            e106: null,
            e107: null,
            e108: null,
            e109: null,
            e1010: null,
            e1011: null,
            e_OE_score:null,
            e11g1: null,
            e1111: null,
            e1112: null,
            e1113: null,
            e1114: null,
            e1115: null,
            e11g2: null,
            e1121: null,
            e1122: null,
            e1123: null,
            e1124: null,
            e1125: null,
            e11g3: null,
            e1131: null,
            e1132: null,
            e1133: null,
            e1134: null,
            e1135: null,
            e11g4: null,
            e1141: null,
            e1142: null,
            e1143: null,
            e1144: null,
            e1145: null,
            e_total_score:null,
            e_total_score_max:null,
            note_SC_1: null,
            note_Non_24x7_PHC_1: null,
            note_24x7_PHC_1: null,
            note_Non_FRU_CHC_1: null,
            note_FRU_CHC_1: null,
            note_SDH_1: null,
            note_DH_1: null,
            note_Area_Hospital_1: null,
            note_MC_1: null,
            f11: null,
            f12: null,
            f13: null,
            f14: null,
            f15: null,
            f16: null,
            f17: null,
            f18: null,
            f19: null,
            f110: null,
            f111: null,
            f_ANC_score:null,            
            f21: null,
            f22: null,
            f23: null,
            f24: null,
            f25: null,
            f26: null,
            f27: null,
            f28: null,
            f29: null,
            f210: null,
            f_IPIP_score:null,  
            f31: null,
            f32: null,
            f33: null,
            f34: null,
            f35: null,
            f36: null,
            f37: null,
            f38: null,
            f39: null,
            f310: null,
            f_ENCR_score:null,
            f41: null,
            f42: null,
            f43: null,
            f44: null,
            f45: null,
            f_FP_score:null,
            f51: null,
            f52: null,
            f53: null,
            f54: null,
            f55: null,
            f56: null,
            f57: null,
            f58: null,
            f_CS_score:null,
            f61: null,
            f62: null,
            f63: null,
            f64: null,
            f65: null,
            f66: null,
            f_FMO_score:null,
            f71: null,
            f72: null,
            f73: null,
            f74: null,
            f75: null,
            f76: null,
            f77: null,
            f78: null,
            f79: null,
            f710: null,
            f711: null,
            f_AH_score:null,
            f_total_score:null,
            f_total_score_max:null,
            note_SC_2: null,
            note_Non_24x7_PHC_2: null,
            note_24x7_PHC_2: null,
            note_Non_FRU_CHC_2: null,
            note_FRU_CHC_2: null,
            note_SDH_2: null,
            note_DH_2: null,
            note_Area_Hospital_2: null,
            note_MC_2: null,
            note_SC: null,
            note_Non_24x7_PHC: null,
            note_24x7_PHC: null,
            note_Non_FRU_CHC: null,
            note_FRU_CHC: null,
            note_SDH: null,
            note_DH: null,
            note_Area_Hospital: null,
            note_MC: null,
            major: null,
            action: null,
            planOfAction: [],
            f_img: null,
            s_img: null,
            geopoint: null,
            img1: null,
            img2: null,
            img3: null,
            deviceId: null,
            note_max_SC_1: null,
            note_max_SC_2: null,
            note_max_SC: null,
            note_max_Non_24x7_PHC_1: null,
            note_max_Non_24x7_PHC_2: null,
            note_max_Non_24x7_PHC: null,
            note_max_24x7_PHC_1: null,
            note_max_24x7_PHC_2: null,
            note_max_24x7_PHC: null,
            note_max_Non_FRU_CHC_1: null,
            note_max_Non_FRU_CHC_2: null,
            note_max_Non_FRU_CHC: null,
            note_max_FRU_CHC_1: null,
            note_max_FRU_CHC_2: null,
            note_max_FRU_CHC: null,
            note_max_SDH_1: null,
            note_max_SDH_2: null,
            note_max_SDH: null,
            note_max_DH_1: null,
            note_max_DH_2: null,
            note_max_DH: null,
            note_max_Area_Hospital_1: null,
            note_max_Area_Hospital_2: null,
            note_max_Area_Hospital: null,
            note_max_MC_1: null,
            note_max_MC_2: null,
            note_max_MC: null,
            hA1: null,
            hA2: null,
            hA2p1: null,
            hA2p2: null,
            hA3: null,
            hA3p1: null,
            hB1: null,
            hB2: null,
            hD1: null,
            hC1: null,
            hC2: null,
            hE1: null,
            hE2p1: null,
            hE2p2: null,
            hE2p3: null,
            hE2p4: null,
            hE2p5: null,
            hE3p1: null,
            hE3p2: null,
            hE3p3: null,
            hE3p4: null,
            hE3p5: null,
            hF1: null,
            hF1p1: null,
            hF1p2: null,
            hF1p2p1: null,
            hF2: null,
            iA1: null,
            iA2: null,
            iB1: null,
            iB2: null,
            iB3: null,
            iB4: null,
            iB4p1: null,
            iC1: null,
            iC2: null,
            iC3: null,
            /*@author Jagat Bandhu Sahoo*/
            //National Vector Borne Disease Control Program (NVBDCP)
            // Malaria
            iDA1: null,
            iDA2: null,
            iDA3: null,
            iDA3p1: null,
            iDA3p2: null,
            iDA3p3: null,
            iDA3p4: null,
            iDA3p5: null,
            iDA3p6: null,
            iDA3p7: null,
            //Japanese encephalitis (JE)
            iDB1: null,
            iDB2: null,
            iDB3: null,
            //Dengue and chicken gunya
            iDC1: null,
            iDC2: null,
            iDC3: null,
            //Lymphatic Filariasis
            iDD1: null,
            iDD2: null,
            iDD3: null,
            //kala azar
            iDE1: null,
            iDE2: null,
            iDE3: null,
            iDE4: null,
            iDE5: null,
            iDE6: null,
            //RNTCP
            iE1: null,
            iE2: null,
            iE3: null,
            iE4: null,
            iE5: null,
            iE6: null,
            //Leprosy
            iF1: null,
            iF2: null,
            iF3: null,
            iF4: null,
            //NCD
            iG1: null,
            iG2: null,
            iG3: null,
            iG3p1: null,
            iG4: null,
            iG4p1: null,
            iG5: null,
            iG6: null,
            //NPCC
            iH1: null,
            iH1p1: null,
            iH2: null,     

            /*@author Jagat Bandhu Sahoo*/
            e_RH_score_max: null,
            e_MHDS_score_max: null,
            e_NHDS_score_max: null,
            e_CHDS_score_max: null,
            e_Vaccines_score_max: null, 
            e_Antibiotics_score_max: null, 
            e_Infrastructure_score_max: null,
            e_IP_score_max: null, 
            e_AHDS_score_max: null,
            e_OE_score_max: null, 

            f_ANC_score_max: null, 
            f_IPIP_score_max: null, 
            f_ENCR_score_max: null, 
            f_FP_score_max: null, 
            f_CS_score_max: null, 
            f_FMO_score_max: null,
            f_AH_score_max: null,
            checklist_score: null,
            checklist_score_max: null,
            fSterilizationTotal: null,
            sterilizationTotal: null
      };
      return obj;
  }

/**
 * We can get community default object from this methoid
 * @author Ratikanta
 */
  getCommunityObject(){
    let a = MessageProvider.USER_DETAILS.designation.level;
      let level;
      switch(a){
        case 1:
          level = "National";
        break;
        case 2:
          level = "State";
        break;
        case 3:
          level = "Division";
        break;
        case 4:
          level = "District";
        break;
        case 5:
          level = "Sub-district(Block)";
        break;
        case 6:
          level = "Sub-centre";
        case 8:
          level = "Facility";
        break;
      }
    let obj = {
      q1: null,
      q2: null,
      facilityType: null,
      q3: null,
      facilityId: null,
      q4: null,
      q5: MessageProvider.USER_DETAILS.name,
      q5a: null,
      q5b: MessageProvider.USER_DETAILS.designation.name,
      q6: MessageProvider.USER_DETAILS.organization.id,
      q7: level,
      q7_a: null,
      date: null,
      q1p1: null,
      q11a: null,
      q11b: null,
      q11c: null,
      q11d: null,
      q11e: null,
      q1p2: null,
      q1p3: null,
      q1p4: null,
      q1p5: null,
      c_VHNDA_score: null,
      note11: null,
      q21: null,
      q22: null,
      q23: null,
      q24: null,
      q25: null,
      q251: null,
      q26: null,
      q27: null,
      c_IWANM_score: null,
      note21: null,
      q31: null,
      q31a: null,
      q31b: null,
      q31c: null,
      q31d: null,
      q311: null,
      q32: null,
      q321: null,
      q33: null,
      q331: null,
      q34: null,
      q35: null,
      q36: null,
      c_IA_IASHA_score: null,
      cal3: null,
      q37a: null,
      q37b: null,
      q37c: null,
      q37d: null,
      q37e: null,
      c_IA_AOECWASA_score: null,
      q37fi: null,
      q37fii: null,
      c_IA_AIWA_score: null,
      q37gi: null,
      q37gii: null,
      q37h: null,
      q37i: null,
      q37j: null,
      q37k: null,
      q37l: null,
      c_IA_AISA_score: null,
      cal3a: null,
      note31b: null,
      q411: null,
      q412: null,
      q413: null,
      c_IB_IWPW_score: null,
      cal4: null,
      q421: null,
      q422: null,
      q423a: null,
      q423b: null,
      q423c: null,
      q423d: null,
      q423e: null,
      q423I: null,
      c_IB_IWLMWMB_score: null,
      cal4a: null,
      q424a: null,
      q424b: null,
      q424c: null,
      q424d: null,
      q424e: null,
      q424f: null,
      q424g: null,
      q424h: null,
      q424i: null,
      q424j: null,
      c_IB_AASSRFWSD_score: null,
      cal4b: null,
      q431: null,
      q431a: null,
      q431b: null,
      q432: null,
      q433: null,
      q434: null,
      q435: null,
      q436: null,
      q437: null,
      q437a: null,
      q437b: null,
      q437c: null,
      q437d: null,
      q437e: null,
      c_IB_IMWCM_score: null,
      q437eI: null,
      cal4c: null,
      q441: null,
      q442: null,
      q443: null,
      q444: null,
      q445: null,
      cal4d: null,
      q446a: null,
      q446b: null,
      q446c: null,
      cal4e: null,
      q447: null,
      c_IB_IWBMPWPM_score: null,
      cal4f: null,
      q451: null,
      q452: null,
      q453: null,
      c_IB_IWFHA_score: null,
      cal4g: null,
      q461a: null,
      q461b: null,
      q461c: null,
      q461d: null,
      q461e: null,
      q461eI: null,
      cal4h: null,
      q462a: null,
      q462b: null,
      q462c: null,
      cal4i: null,
      q463: null,
      c_IB_IHHD_score: null,
      cal4j: null,
      q471: null,
      q471a: null,
      q472: null,
      q473: null,
      q474: null,
      q474a: null,
      cal4k: null,
      q475: null,
      q476: null,
      c_IB_SAIWWNTA_score: null,
      cal4l: null,
      note41a: null,
      note51a: null,
      planOfAction: [],
      // q8: null,
      // q9: null,
      // q10: null,
      // q11: null,
      // q12: null,
      // q13: null,
      // q14: null,
      // q15: null,
      img: null,
      f_img: null,
      s_img: null,
      geopoint: null,
      img1: null,
      img2: null,
      img3: null,
      deviceid: null,
      note1: null,
      note2: null,
      note3b: null,
      note4a: null,
      note5a: null,
      c_IA_IASHA_score_max: 0,
      c_IA_AOECWASA_score_max: 0,
      c_IA_AIWA_score_max: 0,
      c_IA_AISA_score_max: 0,
      c_IB_IWPW_score_max: 0,
      c_IB_IWLMWMB_score_max: 0,
      c_IB_AASSRFWSD_score_max: 0,
      c_IB_IMWCM_score_max: 0,
      c_IB_IWBMPWPM_score_max: 0,
      c_IB_IWFHA_score_max: 0,
      c_IB_IHHD_score_max: 0,
      c_IB_SAIWWNTA_score_max: 0
    }
    return obj;
  }

/**
 * 
 * @Author: Ratikanta Pradhan 
 * @email:   ratikanta@sdrc.co.in 
 * @Last Modified by: Ratikanta Pradhan
 * @Last Modified time: 11-10-2017 13:25
 * This method is going to save facility data into database
 * @param obj The facility data
 * @param {boolean} forEdit If the data has come for edit, this value will be true otherwise false
 */
  saveFacilityData(obj: any, forEdit : boolean, finalized : boolean, id: string, formInfo : any, scoreObj: any, percentageScore: any){
    try{
      let temp = this;
      this.db.get(MessageProvider.DOC_NAMES.TXN_DOC_NAME).then(function(doc){
          
          let arr = doc.data;
          if(forEdit){
            for(let i = 0; i < arr.length;i++){
              if(arr[i].id === id){
                arr[i].data = obj;
                arr[i].finalized = finalized;
                arr[i].score = scoreObj;
                arr[i].percentage = percentageScore;
                arr[i].facilitTypeName = formInfo.facilityTypeName;
                if(formInfo.districtName !== undefined && formInfo.districtName !== null)
                  arr[i].district = formInfo.districtName;
                if(formInfo.facilityName !== undefined && formInfo.facilityName !== null)
                  arr[i].facility = formInfo.facilityName;
                break;
              }
            }
          }else{
            let objToDB = {
              id: temp.datePipe.transform(new Date(), MessageProvider.DATE_FORMAT.SAVE),
              data: obj,
              score:scoreObj,
              percentage:percentageScore,
              type: MessageProvider.FORM_TYPE.FACILITY,
              synced: false,
              finalized: finalized,
              hasError : false,
              errorMessage: null,
              deleted: false,
              district: formInfo.districtName,
              facility: formInfo.facilityName,
              facilitTypeName : formInfo.facilityTypeName
            };
            arr.push(objToDB);
          }         


          return temp.db.put({
            _id: MessageProvider.DOC_NAMES.TXN_DOC_NAME,
            _rev: doc._rev,
            data: arr
          }).then(function(doc){
            temp.events.publish(MessageProvider.EVENTS.FACILITY_DATA_SAVE_EVENT, true, finalized);
          }).catch(function(err){
            if(err.status === 500 && err.name === 'indexed_db_went_bad' 
            && err.reason === 'QuotaExceededError'){
              console.log("Error in saving data. No storage available to store data")
              temp.events.publish(MessageProvider.EVENTS.FACILITY_DATA_SAVE_EVENT, false, "Error : " + 
              MessageProvider.MESSAGES.NO_STORAGE);
            }else{
              console.log("Error in saving data" + err)
              temp.events.publish(MessageProvider.EVENTS.FACILITY_DATA_SAVE_EVENT, false, "Error : " + err);
            }
            
          });
      }).catch(function(err){
          if(err.status === 404){

              let arr = [];
               let objToDB = {
                  id: temp.datePipe.transform(new Date(), MessageProvider.DATE_FORMAT.SAVE),
                  data: obj,
                  score:scoreObj,
                  percentage:percentageScore,
                  type: MessageProvider.FORM_TYPE.FACILITY,                  
                  synced: false,
                  finalized: finalized,
                  hasError : false,
                  errorMessage: null,
                  deleted: false,
                  district: formInfo.districtName,
                  facility: formInfo.facilityName,
                  facilitTypeName : formInfo.facilityTypeName
                };
              arr.push(objToDB);
               temp.db.put({
                _id: MessageProvider.DOC_NAMES.TXN_DOC_NAME,
                data: arr
              }).then(function (response) {
                temp.events.publish(MessageProvider.EVENTS.FACILITY_DATA_SAVE_EVENT, true, finalized);
              }).catch(function (err) {

                if(err.status === 500 && err.name === 'indexed_db_went_bad' 
                && err.reason === 'QuotaExceededError'){
                  console.log("Error in saving data. No storage available to store data")
                  temp.events.publish(MessageProvider.EVENTS.FACILITY_DATA_SAVE_EVENT, false, "Error : " + 
                  MessageProvider.MESSAGES.NO_STORAGE);
                }else{
                  console.log("Error in saving data" + err)
                  temp.events.publish(MessageProvider.EVENTS.FACILITY_DATA_SAVE_EVENT, false, "Could not save data!");
                }                
              });
          }else{
              temp.events.publish(MessageProvider.EVENTS.FACILITY_DATA_SAVE_EVENT, false, "Error : " + err);
          }
      });
    }catch(err){
      this.events.publish(MessageProvider.EVENTS.FACILITY_DATA_SAVE_EVENT, false, "Error : " + err);
    }
      
  }


/**
 * @Author: Ratikanta Pradhan 
 * @email:   ratikanta@sdrc.co.in 
 * @Last Modified by: Ratikanta Pradhan
 * @Last Modified time: 11-10-2017 15:22
 * This method is going to save community data into database
 * @param obj The community data
 * @param {boolean} forEdit If the data has come for edit, this value will be true otherwise false
 */

  docCopy : any;
  saveCommunityData(obj: any, forEdit : boolean, finalized : boolean, id : string, formInfo: any, scoreObj: any, percentageScore: any){
    try{
      let temp = this;
      this.db.get(MessageProvider.DOC_NAMES.TXN_DOC_NAME).then(function(doc){
        temp.docCopy = doc;
          let arr = doc.data;
          if(forEdit){
            for(let i = 0; i < arr.length;i++){
              if(arr[i].id === id){
                arr[i].data = obj;
                arr[i].finalized = finalized;
                arr[i].score = scoreObj;
                arr[i].percentage = percentageScore;
                if(formInfo.blockName !== undefined && formInfo.blockName !== null)
                  arr[i].block = formInfo.blockName;
                if(formInfo.facilityName !== undefined && formInfo.facilityName !== null)
                  arr[i].facility = formInfo.facilityName;
                break;
              }
            }
          }else{
            let objToDB = {
              id: temp.datePipe.transform(new Date(), MessageProvider.DATE_FORMAT.SAVE),
              data: obj,
              score:scoreObj,
              percentage:percentageScore,
              type: MessageProvider.FORM_TYPE.COMMUNITY,
              synced: false,
              finalized: finalized,
              hasError : false,
              errorMessage: null,
              deleted: false,
              block: formInfo.blockName,
              facility: formInfo.facilityName,
            };
            arr.push(objToDB);
          }         

          return temp.db.put({
            _id: MessageProvider.DOC_NAMES.TXN_DOC_NAME,
            _rev: doc._rev,
            data: arr
          });
          
      }).then(function(doc){
        temp.events.publish(MessageProvider.EVENTS.COMMUNITY_DATA_SAVE_EVENT, true, finalized);
      }) .catch(function(err){
          if(err.status === 404){
              let arr = [];
               let objToDB = {
                  id: temp.datePipe.transform(new Date(), MessageProvider.DATE_FORMAT.SAVE),
                  data: obj,
                  score:scoreObj,
                  percentage:percentageScore,
                  type: MessageProvider.FORM_TYPE.COMMUNITY,
                  synced: false,
                  finalized: finalized,
                  hasError : false,
                  errorMessage: null,
                  deleted: false,
                  block: formInfo.blockName
                };
              arr.push(objToDB);
               temp.db.put({
                _id: MessageProvider.DOC_NAMES.TXN_DOC_NAME,
                data: arr
              }).then(function (response) {
                temp.events.publish(MessageProvider.EVENTS.COMMUNITY_DATA_SAVE_EVENT, true, finalized);
              }).catch(function (err) {
                temp.events.publish(MessageProvider.EVENTS.COMMUNITY_DATA_SAVE_EVENT, false, "Could not save data!");
              });
          }else if(err.status === 500){
            temp.db.close().then(function (result){
              console.log("DB CLOSED");
              temp.db = new PouchDB(MessageProvider.DB_NAME);
              temp.db.then(function(){
                temp.events.publish(MessageProvider.EVENTS.COMMUNITY_DATA_SAVE_EVENT, false, "Could not save data, Insufficient space!");
                console.log("CONNECTION IS NOW OPEN");
              }).catch(function(err){
                console.log(err);
              })
            }).catch(function (err){
              console.log("Could not close db connection");
            });
          }else if(err.status === undefined){

          }else{
              temp.events.publish(MessageProvider.EVENTS.COMMUNITY_DATA_SAVE_EVENT, false, "Error : " + err);
          }
      });
    }catch(err){
      this.events.publish(MessageProvider.EVENTS.COMMUNITY_DATA_SAVE_EVENT, false, "Error : " + err);
    }
      
  }

/**
 * @Author: Ratikanta Pradhan 
 * @email:   ratikanta@sdrc.co.in 
 * @Last Modified by: Ratikanta Pradhan
 * @Last Modified time: 11-10-2017 17:14
 * This method is going to get facility saved forms
 */
  getSavedForms(){

    let temp = this;
    try{
      let obj = {
        facility: [],
        community: []
      };
      temp.db.get(MessageProvider.DOC_NAMES.TXN_DOC_NAME)
      .then(function(doc){
          obj.facility = doc.data.filter(d=>(d.type===MessageProvider.FORM_TYPE.FACILITY && d.finalized == false))
          obj.community = doc.data.filter(d=>d.type===MessageProvider.FORM_TYPE.COMMUNITY && d.finalized == false);
          obj.facility = temp.txndata.transform(obj.facility, {type : MessageProvider.TXNDATAPIPE_TYPE.ORDER_BY_DATE_DESC});
          obj.community = temp.txndata.transform(obj.community, {type : MessageProvider.TXNDATAPIPE_TYPE.ORDER_BY_DATE_DESC});
          temp.events.publish(MessageProvider.EVENTS.SAVED_FORMS, true, obj,null); 
      }).catch(function(err){
        if(err != null && err != undefined && err.message != null && 
          err.message.includes("The database connection is closing")){
            if(!this.storage_error_message_shown){
              this.storage_error_message_shown = true
              temp.events.publish(MessageProvider.EVENTS.SAVED_FORMS, false, null,MessageProvider.MESSAGES.NO_STORAGE);              
            }
            
        }else{
          if(err.status == 404){
            temp.events.publish(MessageProvider.EVENTS.SAVED_FORMS, true, obj,null);    
          }else{
            temp.events.publish(MessageProvider.EVENTS.SAVED_FORMS, false, null,err);  
          }
        }
        
        
      });
    }catch(err){
      this.events.publish(MessageProvider.EVENTS.SAVED_FORMS, false, null,err);
    }

  }


  /**
   * @Author: Ratikanta Pradhan 
   * @email:   ratikanta@sdrc.co.in 
   * @Last Modified by: Ratikanta Pradhan
   * @Last Modified time: 11-10-2017 17:14
   * This method is going to get facility finalize forms
   */
  getFinalizeForms(){

    let temp = this;
    try{
      let obj = {
        facility: [],
        community: []
      };
      temp.db.get(MessageProvider.DOC_NAMES.TXN_DOC_NAME)
      .then(function(doc){
          obj.facility = doc.data.filter(d=>(d.type===MessageProvider.FORM_TYPE.FACILITY && d.finalized == true && d.synced == false));
          obj.community = doc.data.filter(d=>(d.type===MessageProvider.FORM_TYPE.COMMUNITY && d.finalized == true && d.synced == false));
          obj.facility = temp.txndata.transform(obj.facility, {type : MessageProvider.TXNDATAPIPE_TYPE.ORDER_BY_DATE_DESC});
          obj.community = temp.txndata.transform(obj.community, {type : MessageProvider.TXNDATAPIPE_TYPE.ORDER_BY_DATE_DESC});
          temp.events.publish(MessageProvider.EVENTS.FINALIZE_FORMS, true, obj,null);    
      })
      .catch(function(err){
        if(err != null && err != undefined && err.message != null && 
          err.message.includes("The database connection is closing")){
            if(!this.storage_error_message_shown){
              this.storage_error_message_shown = true
              temp.events.publish(MessageProvider.EVENTS.FINALIZE_FORMS, false, null,MessageProvider.MESSAGES.NO_STORAGE);
            }
        }else{
          if(err.status == 404){
            temp.events.publish(MessageProvider.EVENTS.FINALIZE_FORMS, true, obj,null);    
          }else{
            temp.events.publish(MessageProvider.EVENTS.FINALIZE_FORMS, false, null,err);  
          }
        }
        
      });
    }catch(err){
      this.events.publish(MessageProvider.EVENTS.FINALIZE_FORMS, false, null,err);
    }

  }
  

  /**
 * This method is going to get facility view sent forms
 */
  getViewSentForms(){

    let temp = this;
    try{
      let obj = {
        facility: [],
        community: []
      };
      temp.db.get(MessageProvider.DOC_NAMES.TXN_DOC_NAME)
      .then(function(doc){
          obj.facility = doc.data.filter(d=>(d.type===MessageProvider.FORM_TYPE.FACILITY && d.synced == true));
          obj.community = doc.data.filter(d=>(d.type===MessageProvider.FORM_TYPE.COMMUNITY && d.synced == true));
          obj.facility = temp.txndata.transform(obj.facility, {type : MessageProvider.TXNDATAPIPE_TYPE.ORDER_BY_DATE_DESC});
          obj.community = temp.txndata.transform(obj.community, {type : MessageProvider.TXNDATAPIPE_TYPE.ORDER_BY_DATE_DESC});
          temp.events.publish(MessageProvider.EVENTS.VIEW_SENT_FORMS, true, obj,null);    
      })
      .catch(function(err){
        if(err.status == 404){
          temp.events.publish(MessageProvider.EVENTS.VIEW_SENT_FORMS, true, obj,null);    
        }else{
          temp.events.publish(MessageProvider.EVENTS.VIEW_SENT_FORMS, false, null,err);  
        }
        
      });
    }catch(err){
      this.events.publish(MessageProvider.EVENTS.VIEW_SENT_FORMS, false, null,err);
    }

  }






  /**
 * This method is going to get not deleted view sent forms
 */
  getViewSentForms_not_deleted(){

    let temp = this;
    try{
      let obj = {
        facility: [],
        community: []
      };
      temp.db.get(MessageProvider.DOC_NAMES.TXN_DOC_NAME)
      .then(function(doc){
          obj.facility = doc.data.filter(d=>(d.type===MessageProvider.FORM_TYPE.FACILITY && d.synced == true && d.deleted == false));
          obj.community = doc.data.filter(d=>(d.type===MessageProvider.FORM_TYPE.COMMUNITY && d.synced == true && d.deleted == false));
          obj.facility = temp.txndata.transform(obj.facility, {type : MessageProvider.TXNDATAPIPE_TYPE.ORDER_BY_DATE_DESC});
          obj.community = temp.txndata.transform(obj.community, {type : MessageProvider.TXNDATAPIPE_TYPE.ORDER_BY_DATE_DESC});
          temp.events.publish(MessageProvider.EVENTS.VIEW_SENT_FORMS_NOT_DELETED, true, obj,null);    
      })
      .catch(function(err){
        if(err.status == 404){
          temp.events.publish(MessageProvider.EVENTS.VIEW_SENT_FORMS_NOT_DELETED, true, obj,null);    
        }else{
          temp.events.publish(MessageProvider.EVENTS.VIEW_SENT_FORMS_NOT_DELETED, false, null,err);  
        }
        
      });
    }catch(err){
      this.events.publish(MessageProvider.EVENTS.VIEW_SENT_FORMS_NOT_DELETED, false, null,err);
    }

  }

/**
 * The following method is going to delete a record from txn data by id
 * @param id The id
 * @param {boolean} keepMetaData When we want to keep meta data this flag should be true
 */
  deleteTxnData(type : number, id : Date, keepMetaData: boolean, formType: number){
      let temp = this;
      this.db.get(MessageProvider.DOC_NAMES.TXN_DOC_NAME)
      .then(function(doc){
        if(keepMetaData){

          if(formType == MessageProvider.FORM_TYPE.FACILITY){
              for(let i = 0; i < doc.data.length; i++){
               if(doc.data[i].id === id){

                let ldata = {

                  c5: doc.data[i].data.c5,
                  district: doc.data[i].data.district,
                  c7: doc.data[i].data.c7

                }

                doc.data[i].data = ldata;
                doc.data[i].deleted = true;
                 break;
               } 
          }
          }else if(formType == MessageProvider.FORM_TYPE.COMMUNITY){
              for(let i = 0; i < doc.data.length; i++){
               if(doc.data[i].id === id){

                let ldata = {

                  q3: doc.data[i].data.q3,
                  q4: doc.data[i].data.q4,
                  date: doc.data[i].data.date

                }

                doc.data[i].data = ldata;
                doc.data[i].deleted = true;
                 break;
               } 
              }
          }
          
        }else{
            for(let i = 0; i < doc.data.length; i++){
               if(doc.data[i].id === id){
                 doc.data.splice(i, 1);
                 break;
               } 
          }
        }
          

          return temp.db.put({
            _id: MessageProvider.DOC_NAMES.TXN_DOC_NAME,
            _rev: doc._rev,
            data: doc.data
          });

      }).then(function(doc){
        switch(type){
          case MessageProvider.MENU.EDIT_SAVED_FORM:
            temp.events.publish(MessageProvider.EVENTS.SAVED_FORM_DELETED, true);
          break;
          case MessageProvider.MENU.VIEW_FINALIZED_FORM:
            temp.events.publish(MessageProvider.EVENTS.FINALIZED_FORM_DELETED, true);
          break;
          case MessageProvider.MENU.VIEW_SENT_FORM:
            temp.events.publish(MessageProvider.EVENTS.SENT_FORM_DELETED, true);
          break;
          default:
          break;
        }        
      })
      .catch(function(err){
        switch(type){
          case MessageProvider.MENU.EDIT_SAVED_FORM:
            temp.events.publish(MessageProvider.EVENTS.SAVED_FORM_DELETED, false, err);
          break;
          case MessageProvider.MENU.VIEW_FINALIZED_FORM:
          temp.events.publish(MessageProvider.EVENTS.FINALIZED_FORM_DELETED, false, err);
          break;
          case MessageProvider.MENU.VIEW_SENT_FORM:
          temp.events.publish(MessageProvider.EVENTS.SENT_FORM_DELETED, false, err);
          break;
          default:
          break;
        }
          
      });
  }

  /**
 * The following method is going to set the master data in global variable here
 */
  setMasterData(){
    let temp=this;
    this.db.get(MessageProvider.DOC_NAMES.MST_DOC_NAME).then(function(doc){
      temp.masterData = doc.data;

      temp.typeDetailsAll = [];  
      temp.typeDetailsAll = doc.data.typeDetails; 
      //setting type details
      temp.typeDetails = [];
      for( let i = 0; i < doc.data.typeList.length;i++){
        let typeDetails = doc.data.typeDetails.filter(d=>d.typeId.id === doc.data.typeList[i].id);
        doc.data.typeList[i].typeDetails = typeDetails;
        temp.typeDetails.push(doc.data.typeList[i]);
      }
    }).catch(function(err){
       temp.typeDetails = []; 
    });
  }

  /**
   * This method will return type details
   */

  getTypeDetails(){
      return this.typeDetails;
  }

/**
 * The following method will give you all areas
 */
  getAreas(){
      return this.masterData.areaDetails;
  }

  /**
   * The following method will give you roles for plan of action
   */
  getRoles(){
    return this.masterData.roles;
  }

  /**
   * The following method will give you all designations
   */
  getDesignations(){
    return this.masterData.designations;
  }

  /**
   * The following method will give you all organizations
   */
  getOrganizations(){
    return this.masterData.organizations;
  }

/**
 * The following method will give you 
 */
  getTxnDataCount() {
    let temp = this;
    let obj = {
           community: false,
           facility : false
    };
    this.db.get(MessageProvider.DOC_NAMES.TXN_DOC_NAME)
    .then(function(doc){
        temp.events.publish(MessageProvider.EVENTS.TXN_DATA_COUNT_DONE,true,obj,null)
    }).catch(function(err){
      if(err.status === 404){
           temp.events.publish(MessageProvider.EVENTS.TXN_DATA_COUNT_DONE,true,obj,null)
      }else{
          temp.events.publish(MessageProvider.EVENTS.TXN_DATA_COUNT_DONE,false,null,err)
      }
        
    });
  }

//used in facility.ts
  typeDetailsValue(id : number){
      return this.typeDetailsAll.filter(d=>d.id === id)[0].name;
  }

getTempdata(){
  return new Promise(resolve => {
      let temp = this;
    this.db.get(MessageProvider.DOC_NAMES.TXN_DOC_NAME)
    .then(function(doc){
        temp.dataExistAreas = [];
        temp.dataExistAreas = temp.getAreas();
        for(let i = 0; i < temp.dataExistAreas.length;i++){
          let flag = false;
          if(temp.dataExistAreas[i].level === MessageProvider.AREA_LEVEL.FACILITY_AREA_LEVEL){
            let arr = doc.data.filter(d=>d.c5 === temp.dataExistAreas[i].areaNId.toString());
            for(let j = 0; j < arr.length;j++){
                if(temp.monthdata.transform(arr[j].c7)){                  
                  flag = true;
                  break;
                } 
            }
          }

          if(flag){
              temp.dataExistAreas[i].disable = true;
          }else{
            temp.dataExistAreas[i].disable = false;
          }
        }
        resolve(temp.dataExistAreas);
        // temp.events.publish(MessageProvider.EVENTS.AREA_EXTRACTED, temp.dataExistAreas);
        
    })
    .catch(function(err){
        console.log(err);
    });


        // this.myDB.get(id).then(items => resolve(items));
  });
}


  setDataExistsAreas(){
    let temp = this;
    this.db.get(MessageProvider.DOC_NAMES.TXN_DOC_NAME)
    .then(function(doc){
        temp.dataExistAreas = [];
        temp.dataExistAreas = temp.getAreas();
        for(let i = 0; i < temp.dataExistAreas.length;i++){
          let flag = false;
          if(temp.dataExistAreas[i].level === MessageProvider.AREA_LEVEL.FACILITY_AREA_LEVEL){
            let arr = doc.data.filter(d=>d.c5 === temp.dataExistAreas[i].areaNId.toString());
            for(let j = 0; j < arr.length;j++){
                if(temp.monthdata.transform(arr[j].c7)){                  
                  flag = true;
                  break;
                } 
            }
          }

          if(flag){
              temp.dataExistAreas[i].disable = true;
          }else{
            temp.dataExistAreas[i].disable = false;
          }
        }
        temp.events.publish(MessageProvider.EVENTS.AREA_EXTRACTED, temp.dataExistAreas);
        
    })
    .catch(function(err){
        console.log(err);
    });


  }

  getDataExistAreas(){
    return this.dataExistAreas;
  }

  getDB(): any {
    return this.db;
  }


/**
 * @Author: Ratikanta Pradhan 
 * @email:   ratikanta@sdrc.co.in 
 * @Last Modified by: Ratikanta Pradhan
 * @Last Modified time: 11-10-2017 18:55
 * This Method is going to check whether user has already filled us data for this facility or not.
 * It will publish data->true or false,
 * 
 * @param facilityId The facility id to which we have to validate
 */
  validateFacilityForTodayDataEntry(facilityId : number): void{

    let temp = this;
    this.db.get(MessageProvider.DOC_NAMES.TXN_DOC_NAME)
    .then(function(doc){
      //sending data to pipe for fil
      let recordPresent = temp.txndata.transform(doc.data, {type : MessageProvider.TXNDATAPIPE_TYPE.FACILITY_VALIDATION, facilityId : facilityId});
      if(recordPresent){
        //record present
        temp.events.publish(MessageProvider.EVENTS.FACILITY_VALIDATED, false, null, true);
      }else{
        //record not present
        let obj = {
          pvData : [],
          isPvData : false
        };

        try{
          temp.db.get(MessageProvider.DOC_NAMES.PRV_DOC_NAME)
          .then(function(doc){
              for(let i=0; i<doc.prefetchData.length; i++){
                if(doc.prefetchData[i].facilityId == facilityId && 
                    doc.prefetchData[i].formType == MessageProvider.CHECKLIST_ID.FACILITY){
                  obj.isPvData = true;
                  obj.pvData.push(doc.prefetchData[i]);
                }
              }
              temp.events.publish(MessageProvider.EVENTS.FACILITY_VALIDATED, false, null, false, obj);
          }).catch(function(err){
              temp.events.publish(MessageProvider.EVENTS.FACILITY_VALIDATED, false, null, false, obj);
              console.log(err);
          });
        }catch(e){
          this.errorToast(e);
        }
      }
    }).catch(function(err){

      if(err != null && err != undefined && err.message != null && 
        err.message.includes("The database connection is closing")){

          temp.events.publish(MessageProvider.EVENTS.FACILITY_VALIDATED, true, 
            "Error while validating facility<br> " +  MessageProvider.MESSAGES.NO_STORAGE, false);



      }else{
        if(err.status === 404){
          let obj = {
            pvData : [],
            isPvData : false
          };
            temp.db.put({
              _id: MessageProvider.DOC_NAMES.TXN_DOC_NAME,
              data: []
            }).then(function (response) {
              try{
                temp.db.get(MessageProvider.DOC_NAMES.PRV_DOC_NAME)
                .then(function(doc){
                    for(let i=0; i<doc.prefetchData.length; i++){
                      if(doc.prefetchData[i].facilityId == facilityId &&
                          doc.prefetchData[i].formType == MessageProvider.CHECKLIST_ID.FACILITY){
                        obj.isPvData = true;
                        obj.pvData.push(doc.prefetchData[i]);
                      }
                    }
                    temp.events.publish(MessageProvider.EVENTS.FACILITY_VALIDATED, false, null, false, obj);
                }).catch(function(err){
                    temp.events.publish(MessageProvider.EVENTS.FACILITY_VALIDATED, false, null, false, obj);
                    console.log(err);
                });
              }catch(e){
                this.errorToast(e);
              }
              // temp.events.publish(MessageProvider.EVENTS.FACILITY_VALIDATED, false, null, false, obj);
            }).catch(function (err) {
               temp.events.publish(MessageProvider.EVENTS.FACILITY_VALIDATED, true, 
          "Error while validating facility<br>error status : " + err.status + "<br>error message : "
           + err.message + "<br>error name : " + err.name + "<br>error reason : " + err.reason, false, obj);
            });
        }else{
            temp.events.publish(MessageProvider.EVENTS.FACILITY_VALIDATED, true, 
          "Error while validating facility<br>error status : " + err.status + "<br>error message : "
           + err.message + "<br>error name : " + err.name + "<br>error reason : " + err.reason, false);
        }
      }      
        
    });
  }

  getPreviousDataFromDB(areaNId, formType) {
    let temp = this;
    let obj = { pvData : [], isPvData : false };
    try {
      temp.db.get(MessageProvider.DOC_NAMES.PRV_DOC_NAME)
        .then(function (doc) {
          for (let i = 0; i < doc.prefetchData.length; i++) {
            if (doc.prefetchData[i].facilityId == areaNId &&
              doc.prefetchData[i].formType == formType) {
              obj.isPvData = true;
              obj.pvData.push(doc.prefetchData[i]);
            }
          }
          temp.events.publish(MessageProvider.EVENTS.PREFETCH_PROCESS_COMPLETE, true, obj);
        }).catch(function (err) {
          temp.events.publish(MessageProvider.EVENTS.PREFETCH_PROCESS_COMPLETE, false, obj);
        });
    } catch (e) {
      this.errorToast(e);
    }
  }



 /**
  * @Author: Ratikanta Pradhan 
  * @email:   ratikanta@sdrc.co.in 
  * @Last Modified by: Ratikanta Pradhan
  * @Last Modified time: 11-10-2017 15:32
  */ 
getPreviousData(obj) {    
    let temp = this;

    try {
      temp.http.get(MessageProvider.checkInternetURL)
        .timeout(MessageProvider.LOGIN_TIME_OUT)
        .subscribe(data => {
        //if(this.messageService.checkInternet()){

          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          temp.http.post(MessageProvider.server + "prefetchData", JSON.stringify(obj), {
              headers: headers
            })
            .timeout(MessageProvider.LOGIN_TIME_OUT)
            .map(res => res.json())
            .subscribe(data => {
              if (data != null && (data.prefetchData.length > 0) && !data.hasError) {
                temp.db.get(MessageProvider.DOC_NAMES.PRV_DOC_NAME)
                  .then(function (doc) {
                    let doc_copy = temp.checkForExistingData(doc.prefetchData, data.prefetchData);

                    return temp.db.put({
                      _id: MessageProvider.DOC_NAMES.PRV_DOC_NAME,
                      _rev: doc._rev,
                      prefetchData: doc_copy
                    }).then(function (result) {
                      temp.messageService.dismissLoading();
                      temp.presentToast("Fetch successful");
                    }).catch(function (err) {
                      temp.messageService.dismissLoading();                      

                      if(err.status === 500 && err.name === 'indexed_db_went_bad' 
                      && err.reason === 'QuotaExceededError'){
                        console.log("Error in saving data. No storage available to store data")
                        temp.errorToast("Error : " + MessageProvider.MESSAGES.NO_STORAGE);
                      }else{
                        console.log("Error in saving data" + err)
                        temp.errorToast("Error while saving last visit data" + err);
                      }
                      
                    });
                  }).catch(function (err) {
                    if (err.status === 404) {
                      temp.db.put({
                        _id: MessageProvider.DOC_NAMES.PRV_DOC_NAME,
                        prefetchData: data.prefetchData
                      }).then(function (result) {
                        temp.messageService.dismissLoading();
                        temp.presentToast("Fetch successful");
                      }).catch(function (err) {
                        temp.messageService.dismissLoading();
                        if(err.status === 500 && err.name === 'indexed_db_went_bad' 
                        && err.reason === 'QuotaExceededError'){
                          console.log("Error in saving data. No storage available to store data")
                          temp.errorToast("Error : " + MessageProvider.MESSAGES.NO_STORAGE);
                        }else{
                          console.log("Error in saving data" + err)
                          temp.errorToast("Error while saving last visit data" + err);
                        }
                      });
                    } else {
                      temp.messageService.dismissLoading();
                      temp.errorToast(err);
                    }
                  });
              }else{
                temp.messageService.dismissLoading();
                if(data.errorCode == 1)
                  temp.presentToast(data.errorMessage);
                else
                  temp.errorToast(data.errorMessage);
              }
            }, err => {
              temp.messageService.dismissLoading();
              temp.errorToast(err);
            });
        }
          
        
        , err => {
            temp.messageService.dismissLoading();
            temp.errorToast(MessageProvider.MESSAGES.INTERNET_CHECK);
        });
    } catch (err) {
      temp.messageService.dismissLoading();
      temp.errorToast(err);
    }
  }


  checkForExistingData(dbPrefetchData, serverPrefetchData){
    let tempArray = [];
    for(let i=0; i<dbPrefetchData.length; i++){
      let exist = false;
      for(let j=0; j<serverPrefetchData.length; j++){
        if(dbPrefetchData[i].facilityId == serverPrefetchData[j].facilityId && 
            dbPrefetchData[i].formType == serverPrefetchData[j].formType){
              exist = true;
              break;
        }
      }
      if(!exist){
        tempArray.push(dbPrefetchData[i]);
      }
    }

    for(let j=0; j<serverPrefetchData.length; j++){
      tempArray.push(serverPrefetchData[j]);
    }

    return tempArray;
  }

  errorToast(message) {
  
  let confirm = this.alertCtrl.create({enableBackdropDismiss:false});
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

  presentToast(message) {
  
  let confirm = this.alertCtrl.create({enableBackdropDismiss:false});
        confirm.setCssClass('sectorSelectionModalCommunity');
        confirm.setTitle("Info");
        confirm.setMessage(message);
        confirm.addButton({
          text: "Ok",
          handler: data => {
            confirm.dismiss;
          }
        });
        confirm.present();
  }
  gettimeline(){
    return [1,2,3,4,5,6,7,8,9,10,11,12];
  }

  /**
   * This method will check whether the user has already logged in or not.
   * This method will publish an event 'MessageProvider.EVENTS.LOGGED_IN'
   * 
   * @author Ratikanta Pradhan
   */
  check_logged_in(): Promise<boolean>{

    return new Promise((resolve, reject)=>{

      this.db.get(MessageProvider.DOC_NAMES.CONFIG_DOC_NAME)
        .then(doc=>{
          let config = doc.data as Config          
          if(config.isLoggedIn){
            
            this.db.get(MessageProvider.DOC_NAMES.MST_DOC_NAME)
            .then( doc => {  
              MessageProvider.USER_DETAILS = doc.data.userModel;  
              this.events.publish(MessageProvider.EVENTS.SIDE_MENU_DATA, true);
              this.setMasterData();   
              resolve(true)               
            }).catch( err => {
              reject(MessageProvider.MESSAGES.OTHER_DB_ERRR + ", " + err.message)                     
            });            
          }else
            resolve(false)
        })
        .catch(err=>{
          err.status != 404?reject(MessageProvider.MESSAGES.OTHER_DB_ERRR + ", " + err.message):resolve(false)
        })
    })   
  }

 

  /**
   * This method is going to transfer all the data from v1 datbase to v2 database and destroy v1 database, 
   * after successfull migration
   * 
   * @author Ratikanta Pradhan
   * @returns Promise<string> Returns nothing if job is done, return string error message if ther will be any error
   * @since v2.0.0
   */
  migrateDataIfAnyFromV1ToV2(): Promise<string>{

    return new Promise((resolve, reject)=>{

      this.checkV1Data()
      .then(()=>{

        this.makeConfigDocCompatibleIfAny()
        .then(()=>{
          resolve()
        })
        .catch(err=>{
          reject(err)
        })
      })
      .catch(err=>{
        reject(err)
      })
    })
    
  }

  /**
   * This method is going to get executed after database migration From V1 To V2
   * @author Ratikanta Pradhan
   * @since 2.0.0
   */
  migrateDataIfAnyFromV1ToV2Complete(): Promise<string>{

    return new Promise((resolve, reject)=> {

      this.db_v1.destroy().then(response=>{
        this.messageService.dismissLoading();        
        this.messageService.showInfoAlert(MessageProvider.MESSAGES.PILOT_DATA_CLEARED_SUCCESSFULLY)
        resolve()
      }).catch(err=>{
        this.messageService.dismissLoading();
        reject(
          "Database error while destroying v1 database, please contact admin. Inside file : data.ts, method: migrateDataIfAnyFromV1ToV2Complete() Error message : "
           + err.message + ", error status : " + err.status);
      })


    })   
  }

  /**
   * This method is going to set logged in true/false in config doc
   * 
   * @param flag {boolean} If this is true, then isLoggedIn is true and vice-versa
   * @author Ratikanta
   * @since 2.1.0
   */
  setIsLoggedIn(flag: boolean): Promise<string>{

    let temp_this = this
    return new Promise((resolve, reject)=>{

      temp_this.getDB().get(MessageProvider.DOC_NAMES.CONFIG_DOC_NAME)
      .then(doc=>{
        let config: Config = new ConfigImpl()
        config.isLoggedIn = flag
        config.latestAppVersionName = (doc.data as Config).latestAppVersionName
        return temp_this.getDB().put({
          _id: MessageProvider.DOC_NAMES.CONFIG_DOC_NAME,
          _rev: doc._rev,
          data: config
        })
      })
      .then(()=> {
        resolve()
      })
      .catch(err=>{

        if(err.status === 404){

          let config: Config = new ConfigImpl()
          config.isLoggedIn = flag       

          temp_this.getDB().put({
            _id: MessageProvider.DOC_NAMES.CONFIG_DOC_NAME,
            data: config            
          }).then(function (response) {
            resolve()
          }).catch(function (err) {
            reject("Could not update config doc" + err.message)
          });

        }else{
          reject("Could not update config doc" + err.message)
        }

      })
    })

  }

  /**
   * This method is going to create database and 
   * migrate database if necessary
   * 
   * @author Ratikanta
   * @returns Promise<string> Returns nothing if job is done, return string error message if ther will be any error
   * @since 2.1.0
   */
  createAndMigrateDatabase(): Promise<string>{
    return new Promise((resolve, reject)=>{

      //Database initialization
      //if it is android device, we will use cordova sqlite plugin otherwise we will default pouchdb 
      if(this.essProvider.getPlatform().isAndroid){
        PouchDB.plugin(cordovaSqlitePlugin);
        this.db_v1 = new PouchDB(MessageProvider.DB_NAME);        
        this.db = new PouchDB(MessageProvider.DB_NAME_V2, {adapter: 'cordova-sqlite'});
      }else{          
        this.db_v1 = new PouchDB(MessageProvider.DB_NAME);
        this.db = new PouchDB(MessageProvider.DB_NAME_V2); 
      }
      this.migrateDataIfAnyFromV1ToV2()
      .then(() => {
        resolve()
      })
      .catch(err => {
        reject(err)  
      })
    })
  }


  /**
   * This method is going to migrate data(if there is any) from version 1.0.0 to 2.0.0 +
   * 
   * @author Ratikanta
   * @returns {Promise<string>} 
   * @memberof DataProvider
   * @since 2.1.0
   */
  checkV1Data(): Promise<string>{

    return new Promise((resolve, reject)=>{

      this.db_v1.allDocs({include_docs: true})
      .then( doc =>{

        if(doc.rows.length > 0){
          this.messageService.presentLoading("Migrating database, please wait...")
          let count: number = 0
          let max_no_of_doc : number = 2//because we just need to keep mst and config data
          
          for(let i = 0; i < doc.rows.length;i++){
    
            //Copy master data records
            if(doc.rows[i].id === MessageProvider.DOC_NAMES.MST_DOC_NAME){
              
              this.db.put({
                _id: MessageProvider.DOC_NAMES.MST_DOC_NAME,
                data: (<any>doc.rows[i].doc).data,
                email: (<any>doc.rows[i].doc).email,
                password: (<any>doc.rows[i].doc).password,
                username: (<any>doc.rows[i].doc).username
              })              
              .then((response)=>{
                if(++count === max_no_of_doc){
                  this.migrateDataIfAnyFromV1ToV2Complete()
                  .then(() => {
                    resolve()
                  })         
                  .catch(err => {
                    reject(err)
                  })       
                }
              })
              .catch(err =>{
                this.messageService.dismissLoading();
                reject(
                  "Database error while putting value in mst doc, please contact admin. Inside file : data.ts, method: migrateDataIfAnyFromV1ToV2() Error message : "
                    + err.message + ", error status : " + err.status);
              })
            } 
            
            
            //Copy config data records
            else if(doc.rows[i].id === MessageProvider.DOC_NAMES.CONFIG_DOC_NAME){
              this.db.put({
                _id: MessageProvider.DOC_NAMES.CONFIG_DOC_NAME,              
                data: doc.data
              })              
              .then( response =>{
                if(++count === max_no_of_doc){
                  this.migrateDataIfAnyFromV1ToV2Complete()
                  .then(() => {
                    resolve()
                  })         
                  .catch(err => {
                    reject(err)
                  })
                }
              }).catch( err =>{
                this.messageService.dismissLoading();
                reject(
                  "Database error while putting value in config doc, please contact admin. Inside file : data.ts, method: migrateDataIfAnyFromV1ToV2() Error message : "
                    + err.message + ", error status : " + err.status);
              })
            } 
          }
        }else
          resolve() //Migration did not happen 
      }).catch( err =>{
        this.messageService.dismissLoading();
        reject(
          "Database error while fetching allDoc, please contact admin. Inside file : data.ts, method: migrateDataIfAnyFromV1ToV2() Error message : "
          + err.message + ", error status : " + err.status);
      })
    })

  }





  /**
   * This method is going to migrate config db if there is any
   * 
   * @author Ratikanta
   * @returns {Promise<string>} 
   * @memberof DataProvider
   * @since 2.1.0
   */
  makeConfigDocCompatibleIfAny(): Promise<string>{

    return new Promise((resolve, reject) => {
      
      this.getDB().get(MessageProvider.DOC_NAMES.CONFIG_DOC_NAME)
      .then(doc =>{

        if(doc.is_logged_in != undefined){
          let config: Config = new ConfigImpl()
          config.isLoggedIn = doc.is_logged_in
          return this.getDB().put({
            _id: MessageProvider.DOC_NAMES.CONFIG_DOC_NAME,
            _rev: doc._rev,
            data: config                    
          }).then(function (doc) {
            resolve()
          }).catch(function (err) {
            reject(MessageProvider.MESSAGES.ERROR_MIGRATING_CONFIG_DOC)
            console.log(err)
          });

        }else
          resolve()

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