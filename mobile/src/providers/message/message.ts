/*
 * @Author: Ratikanta Pradhan
 * @email:   ratikanta@sdrc.co.in
 * @Last Modified by: Ratikanta Pradhan
 * @Last Modified time: 2018-01-08 14:41:35
 */
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AlertController, LoadingController, ToastController, Platform } from 'ionic-angular';
import { File } from '@ionic-native/file'
/*
  Generated class for the MessageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MessageProvider {

  // static server : string = 'http://localhost:8080/ess/';
  static server : string = 'https://prod2.sdrc.co.in/ess-test/'
  static checkInternetURL: string = MessageProvider.server + 'test';
  static LOGIN_TIME_OUT: number = 120000;
  static MESSAGES: any = {
    ERROR_IN_CAPTURING_IMAGE: 'Error in capturing image',
    PILOT_DATA_CLEARED_SUCCESSFULLY: "e Supportive Supervision application has been successfully updated. Data pertaining to older version of the application has been erased from your local device.",
    BROWSER_OR_DEVICE_NOT_SUPPORT_DATABASE: 'Browser/device does not support database',
    NEW_USER_OR_FORGOT_PASSWORD: 'If it is new user, on successful login, existing user and its data will be deleted. Do you want to continue?',
    DATABASE_VERSION_NOT_GIVEN: "Database version is not given from web. Please give and try to login again!",
    DATA_CLEARED: "All data has been cleared because of new database change. Please login again. For more info, contact admin.",
    FACILITY_PAGE_CANCEL_CONFIRM_TITLE: "Confirm",
    FACILITY_PAGE_CANCEL_MESSAGE: "Are you sure you want to cancel?",
    FACILITY_PAGE_PLAN_OF_ACTION_CONFIRM_MESSAGE: "Unsaved data of this partially filled subsection will be erased, if you switch to another subsection. Are you sure want to switch?",
    FACILITY_PAGE_PLAN_OF_ACTION_CONFIRM_MESSAGE_FOR_SECTOR: "Unsaved data of this partially filled subsection will be erased, if you switch to another section. Are you sure want to switch?",
    FACILITY_COMMUNITY_PAGE_CANCEL_CONFIRM_POSITIVE_TEXT: "Yes",
    FACILITY_COMMUNITY_PAGE_CANCEL_CONFIRM_NEGATIVE_TEXT: "No",
    SAVE_SUCCESSFULL: "Saved successfully.",
    FINALIZE_SUCCESSFULL: "Finalized successfully",
    SAVE_CONFIRMATION:"Do you want to save? Once you save, you cannot change State, District, Block, Facility and FacilityLevel",
    FACILITY_TYPE_CONFIRMATION: "Do you want to continue with this facility type? Once selected, cannot " +
      "be changed further.",
    FACILITY_LEVEL_CONFIRMATION: "Do you want to continue with this facility level? Once selected, cannot " +
      "be changed further.",
      BACKGROUND_SYNC_NOT_SUPPORTED: 'Background sync not supported, syncing online. Please upgrade the browser if possible.',
      COULD_NOT_SCHEDULE_SYNC : 'Could not schedule sync, syncing online',
      SYNC_SCHEDULED: 'Sync scheduled',
      PLAN_OF_ACTION: 'Please fillup the plan of action fields.',
      INTERNET_CHECK: 'Connection Problem, please check your internet or contact admin.',
      /**
       * @author Jagat Bandhu
       */
      CAPTURE_GEO_COORDINATES: 'Capturing Geo Coordinates, please wait',

      /*
        * @Author: Ratikanta Pradhan
        * @email:   ratikanta@sdrc.co.in
        * @Date: 2017-09-27 18:01:01
        * @Last Modified by:   Ratikanta Pradhan
        * @Last Modified time: 2017-09-27 18:01:01
        */
      UNEXPECTED_RESULT_FROM_STORAGE_TEST: 'Unexpected result came from storage test!, please contact admin',

      /**
       * @Author: Ratikanta Pradhan
        * @email:   ratikanta@sdrc.co.in
        * @Date: 2017-09-27 18:01:01
        * @Last Modified by:   Ratikanta Pradhan
        * @Last Modified time: 09-10-2017 17:02
        * @description {{User will see this message, when he will get err.status === 500 && err.name === 'indexed_db_went_bad'
              && err.reason === 'QuotaExceededError'}}


       */
      NO_STORAGE: 'You do not have enough storage space to store data, please delete some data.',
       /**
       * @Author: Subhadarshani Patra
        * @email:   subhadarshani@sdrc.co.in
        * @Date: 2017-10-16 02:40
        * @Last Modified by:  Subhadarshani Patra
        * @Last Modified time: 2017-10-16 02:40
        * @description {{User will see this message, if the running browser is Internet Explorer.}}


       */
      NOT_SUPPORTED_IN_IE:'Not supported in Internet Explorer yet.We recommend to use chrome version 49 and above.',

      /**
       * @Author: Ratikanta Pradhan
       * @description {{When storage space will be less than MessageProvider.MIN_STORAGE, user will see this warning message}}{{}}
       */
      LOW_STORAGE_SPACE: "Storage space is low, please free up some device/internal memory",

      /**
       * @author: Naseem Akhtar
       * @description: If new update available, this message would be displayed to the user.
       */
      UPDATE_MESSGAE : "A new update is available in the Google Play Store. Please update the app!",

      /**
       * @author Ratikanta
       * @description: This message will be displayed while error will happen in updating latest app version name.
       */
      ERROR_UPDATING_LATEST_APP_VERSION_NAME : "Database error! Error while updating latest app version name",

      /**
       * @author Ratikanta
       * @description: This message will be displayed while error will happen in getting config doc, while updating latest app version name.
       */

      ERROR_GETTING_CONFIG_DOC: "Error getting config doc while updating latest app version name",

      /**
       * @author Ratikanta
       * @description: this is the error we get from database opration,
       */
      OTHER_DB_ERRR: "Some other database error!",

      /**
       * @author Ratikanta
       * @description: this error will happen when we try the migrate the config doc from version bellow 2.1.0 to 2.1.0 +
       * @since 2.1.0
       */

      ERROR_MIGRATING_CONFIG_DOC: "Database error! Error while migrating config doc"

  };
  static DOC_NAMES: any = {
    MST_DOC_NAME: 'masterData',
    TXN_DOC_NAME: "txnData",
    PRV_DOC_NAME: 'prefetchData',
    CONFIG_DOC_NAME : 'config'
  };
  loader: any;
  static DB_NAME: string = "ess";
    /**
     * The following variable may be used for ess v2.0.0 for new database sqlite.
     * We may migrate data from ess to ess_v2
     * @author Ratikanta Pradhan
     */
  static DB_NAME_V2: string = "ess_v2"
  static EVENTS: any = {
    LOGGED_IN: "loggedIn",
    LOGIN_EVENT: "loginEvent",
    FACILITY_DATA_SAVE_EVENT: "FacilityDataSaveEvent",
    COMMUNITY_DATA_SAVE_EVENT: "FacilityDataSaveEvent",
    SAVED_FORMS: "savedForms",
    FINALIZE_FORMS: "finalizeForms",
    VIEW_SENT_FORMS: "viewSentForms",
    VIEW_SENT_FORMS_NOT_DELETED: "viewSentForms_not_deleted",
    SAVED_FORM_DELETED: "savedFormDeleted",
    TXN_DATA_COUNT_DONE: "txnDataCountDone",
    SENT_FORM_DELETED: "sentFormDeleted",
    FINALIZED_FORM_DELETED: "finalizedFormDeleted",
    AREA_EXTRACTED: "areaExtracted",
    SIDE_MENU_DATA: "getSideMenuData",
    FACILITY_VALIDATED: "facilityValidated",
    PREFETCH_PROCESS_COMPLETE : "preftechFromDB",
    DISSMISS_LOADER_FACILITY : "dissmissLoaderFacility",
    DISSMISS_LOADER_COMMUNITY : "dissmissLoaderCommunity",
    DISSMISS_MODAL_FACILITY : "dissmissModalFacility",
    DISSMISS_MODAL_COMMUNITY : "dissmissModalCommunity"
  };
  static FORM_TYPE: any = {
    FACILITY: 1,
    COMMUNITY: 2
  };
  static TYPE_IDS: any = {
    DESIGNATION_TYPE_ID: 1,
    ORGANIZATION_TYPE_ID: 2,
    FACILITY_TYPE_ID: 3,
    LEVEL_TYPE_ID: 4,
    OPTION_TYPE_ID: 5,
    FACILITY_LEVEL_TYPE_ID: 6,
    YES_NO_TYPE_ID: 7,
    COMMUNITY_OPTION_TYPE_ID: 8,
    YES_NO_NA_TYPE_ID: 9,
    INTERVENTION_TYPE_ID: 10,
    NPCDCS_TYPE_ID: 17
  };
   static TYPE_DETAIL_IDS : any = {
    DESIGNATION_OF_SUPERVISOR_OTHERS : "7",
    LEVEL_SUPERVISOR_POSTED_AT_OTHERS: "25",
    FACILITY_TYPE_OTHRES : "20"
  };
  static FACILITY_TYPE_IDS: any = {
    SC_TYPE_ID: 11,
    NON_247_PHC_TYPE_ID: 12,
    PHC_247_TYPE_ID: 13,
    NON_PRU_CHC_TYPE_ID: 14,
    PRU_CHC_TYPE_ID: 15,
    SDH_TYPE_ID: 16,
    DH_TYPE_ID: 17,
    AREA_HOSPITAL_TYPE_ID: 18
  };
  static AREA_LEVEL: any = {
    COUNTRY_AREA_LEVEL: 1,
    STATE_AREA_LEVEL: 2,
    DISTRICT_AREA_LEVEL: 3,
    BLOCK_AREA_LEVEL: 4,
    FACILITY_AREA_LEVEL: 5,
  };
  static MENU: any = {
    EDIT_SAVED_FORM: 1,
    VIEW_FINALIZED_FORM: 2,
    VIEW_SENT_FORM: 3
  };

  static SCORE: any = {
    SC: 10,
    Non24x7PHC: 10,
    S24X7PHC: 10,
    FRUCHC: 10,
    SDH: 10,
    DH: 10,
    AreaHosp: 10
  }
  static FCILITY_SCORE: any = {
    e_RH_score_SC: 7,
    e_RH_score_Non24x7PHC: 7,
    e_RH_score_Other: 9,
    e_MHDS_score_SC: 24,
    e_MHDS_score_SC_other: 25,
    e_MHDS_score_Non24x7PHC: 24,
    e_MHDS_score_Non24x7PHC_other: 25,
    e_MHDS_score_S24X7PHC: 31,
    e_MHDS_score_S24X7PHC_other: 32,
    e_MHDS_score_NONFRUCHC: 31,
    e_MHDS_score_NONFRUCHC_other: 32,
    e_MHDS_score_FRUCHC: 31,
    e_MHDS_score_FRUCHC_other: 32,
    e_MHDS_score_SDH: 31,
    e_MHDS_score_SDH_other: 32,
    e_MHDS_score_Other: 35,
    e_MHDS_score_Other_other: 36,
    e_NHDS_score_SC: 14,
    e_NHDS_score_Non24x7PHC: 14,
    e_NHDS_score_Other: 15,
    e_CHDS_score: 7,
    e_Vaccines_score: 13,
    e_Antibiotics_score: 7,
    e_Infrastructure_score_SC: 4,
    e_Infrastructure_score_Non24x7PHC: 4,
    e_Infrastructure_score_S24X7PHC: 5,
    e_Infrastructure_score_NONFRUCHC: 5,
    e_Infrastructure_score_FRUCHC: 6,
    e_Infrastructure_score_SDH: 6,
    e_Infrastructure_score_Other: 7,
    e_IP_score: 8,
    e_AHDS_score: 4,
    e_OE_score_SC: 6,
    e_OE_score_Non24x7PHC: 6,
    e_OE_score_S24X7PHC: 10,
    e_OE_score_NONFRUCHC: 10,
    e_OE_score_FRUCHC: 10,
    e_OE_score_SDH: 10,
    e_OE_score_Other: 11,
    f_ANC_score_DH_default: 0,
    f_ANC_score_DH: 10,
    e_ANC_score_AreaHosp: 10,
    e_ANC_score_Other: 9,
    f_IPIP_score: 10,
    f_ENCR_score_SC: 9,
    e_ENCR_score_Non24x7PHC: 9,
    e_ENCR_score_S24X7PHC: 9,
    e_ENCR_score_NONFRUCHC: 9,
    e_ENCR_score_Other: 10,
    f_FP_score_SC: 3,
    e_FP_score_Non24x7PHC: 3,
    e_FP_score_S24X7PHC: 4,
    e_FP_score_NONFRUCHC: 4,
    e_FP_score_FRUCHC: 4,
    e_FP_score_SDH: 4,
    e_FP_score_DH: 4,
    e_FP_score_AreaHosp: 4,
    e_FP_score_Others: 5,
    f_CS_score: 8,
    f_FMO_score: 6,
    f_AH_score_SC: 0,
    e_AH_score_Non24x7PHC: 0,
    e_AH_score_Other: 11
  }
  static COMMUNITY_SCORE: any = {
    c_VHNDA_score: 8,
    c_VHNDA_other_score: 9,
    c_IWANM_score: 6,
    c_IA_IASHA_score_default: 10,
    c_IA_IASHA_score: 9,
    c_IA_IASHA_other_score: 11,
    c_IA_IASHA_score_optional: 0,
    c_IA_AOECWASA_score: 5,
    c_IA_AIWA_score: 2,
    c_IA_AISA_score: 7,
    c_IB_IWPW_score: 3,
    c_IB_IWLMWMB_score: 1,
    c_IB_IWLMWMB_other_score: 7,
    c_IB_AASSRFWSD_score: 10,
    c_IB_IMWCM_score: 12,
    c_IB_IMWCM_other_score: 13,
    c_IB_IWBMPWPM_score: 1,
    c_IB_IWBMPWPM_other_score: 9,
    c_IB_IWFHA_score: 3,
    c_IB_IHHD_score: 9,
    c_IB_SAIWWNTA_score: 8
  }

  static USER_DETAILS: any = null;
  static TXNDATAPIPE_TYPE: any = {
    FACILITY_VALIDATION: 1,
    ORDER_BY_DATE_DESC: 2
  }
  static DATE_FORMAT: any = {
    SAVE: 'y-MM-dd-HH-mm-ss'
  };

  static IS_LOCATION : boolean;

  static CHECKLIST_ID : any = {
    FACILITY : 121,
    COMMUNITY : 122
  }

  static CLOSE_ALERTS : any = {
    FACILITY : 'facility',
    COMMUNITY : 'community'
  }

  static MODAL_ALERTS : any = {
    SIGNATURE : false,
    HELP : false
  }

  static ROLE_CODE : any = {
    BLOCK : 'R-1005'
  }

  /**
   * @author Jagat Bandhu
   * if any of the loader is on, value of this variable is true.
   * If no loader is on, value of the variable will be false.
   */
  isLoaderActive: boolean = false;

  /*
 * @Author: Ratikanta Pradhan
 * @email:   ratikanta@sdrc.co.in
 * @Date: 2017-09-29 13:27:48
 * @Last Modified by:   Ratikanta Pradhan
 * @Last Modified time: 2017-09-29 13:27:48
 * This variable is used for checking the storage, we will check the storage if value of this variable is false,
 * we will not check the storage if value of this variable is true
 *
 * When we checked the storage it then we will make it true.
 */
  storageChecked: boolean = false


  /**
   * This variable will be the root folder of ess project in android devices
   * @Author: Ratikanta Pradhan
   * @static
   * @type {string}
   * @memberof MessageProvider

   *
   */
  static DIRECTORY_NAME: string = "ess"

  /**
   * This is the storage limit below which user will see low storage space message
   * @Author: Ratikanta Pradhan
   * @static
   * @type {number}
   * @memberof MessageProvider
   */

  static MIN_STORAGE: number = 24768

  /**
   * Creates an instance of MessageProvider.
   * @Author: Ratikanta Pradhan
   * @param {AlertController} alertCtrl
   * @param {LoadingController} loadingController
   * @param {ToastController} toastCtrl
   * @memberof MessageProvider

   *
   */


  constructor(private alertCtrl: AlertController,
    private loadingController: LoadingController,
    private toastCtrl: ToastController,
    private file: File,
    private platform: Platform

  ) {}

  /**
   * This method will help us showing error message
   * @param msg The message
   */
  showErrorAlert(msg) {
    let alert = this.alertCtrl.create({ enableBackdropDismiss: false });
    alert.setCssClass('sectorSelectionModalCommunity');
    alert.setTitle("Error");
    alert.setMessage(msg);
    alert.addButton({
           text: "OK",
       handler: data => {
            alert.dismiss;
         }
    });
    alert.present();
  }

  /**
   * @Author: Ratikanta Pradhan
   * @param msg The message
   * @description {{This method will help us showing warning message}}{{}}
   *
   */
  showWarning(msg) {
    let alert = this.alertCtrl.create({ enableBackdropDismiss: false });
    alert.setCssClass('sectorSelectionModalCommunity');
    alert.setTitle("Warning");
    alert.setMessage(msg);
    alert.addButton({
           text: "OK",
       handler: data => {
            alert.dismiss;
         }
    });
    alert.present();
  }

  /**
   * Create the loading
   */
  presentLoading(msg) {
    this.isLoaderActive = true;
    this.loader = this.loadingController.create({
      content: msg
    });
    this.loader.present();
  }

  /**
   * Dismiss the loading
   */
  dismissLoading() {
    this.loader.dismiss();
    this.isLoaderActive = false;
  }

  /**
   * This method will show toast
   * @param msg The message
   */
  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  showInfoAlert(msg) {
    let alert = this.alertCtrl.create({ enableBackdropDismiss: false });
    alert.setCssClass('sectorSelectionModalCommunity');
    alert.setTitle("Info");
    alert.setMessage(msg);
    alert.addButton({
           text: "OK",
       handler: data => {
            alert.dismiss;
         }
    });
    alert.present();
  }

  showHintMessage(msg) {
    let alert = this.alertCtrl.create({ enableBackdropDismiss: false });
    alert.setCssClass('sectorSelectionModalCommunity');
    alert.setTitle("Hint !");
    alert.setMessage(msg);
    alert.addButton({
           text: "OK",
       handler: data => {
            alert.dismiss;
         }
    });
  }

/**
 * @author Ratikanta
 * @param given_number number to check
 * @return number type or boolean type
 */
  numberValidation(given_number: string) : any{

    let finalValue : number;
    try{
    if(given_number.includes(".")){
        finalValue = parseInt(given_number.split(".")[0]);
      }else if(given_number.includes("*")){
        finalValue = parseInt(given_number.split("*")[0]);
      }else if(given_number.includes("-")){
        finalValue = parseInt(given_number.split("-")[0]);
      }else if(given_number.includes("/")){
        finalValue = parseInt(given_number.split("/")[0]);
      }else if(given_number.includes("\\")){
        finalValue = parseInt(given_number.split("\\")[0]);
      }else if(given_number.includes(")")){
        finalValue = parseInt(given_number.split(")")[0]);
      }else if(given_number.includes("(")){
        finalValue = parseInt(given_number.split("(")[0]);
      }else if(given_number.includes("=")){
        finalValue = parseInt(given_number.split("=")[0]);
      }else if(given_number.includes("_")){
        finalValue = parseInt(given_number.split("_")[0]);
      }else if(given_number.includes(",")){
        finalValue = parseInt(given_number.split(",")[0]);
      }else{
        finalValue = parseInt(given_number);
      }
      return finalValue;
    }catch(e){
      return false;
    }

  }

  /**
   * This method will create the root folder for the application
   * @Author: Ratikanta Pradhan
   * @memberof MessageProvider
   */
  create_root_folder(){
      this.presentLoading("Loading, please wait...")
      let temp_this = this
      temp_this.file.checkDir(temp_this.file.externalRootDirectory, MessageProvider.DIRECTORY_NAME).then(_ =>{
        temp_this.dismissLoading()
      }).catch(err => {
        if(err.code === 1){
          //Directory does not exists, have to create
          temp_this.file.createDir(temp_this.file.externalRootDirectory, MessageProvider.DIRECTORY_NAME, false).then(data=>{
            temp_this.dismissLoading()
          }).catch((err)=>{
            temp_this.dismissLoading()
            temp_this.showErrorAlert("err while creating root directory : code " + err.code + " message: " + err.message)
          })
        }else{
          temp_this.dismissLoading()
          temp_this.showErrorAlert("err while creating root directory : code " + err.code + " message: " + err.message)
        }
      })
  }

  /**
   * This method will check storage amount. If storage will be less than 20 mb, it will show error message
   * @Author: Ratikanta Pradhan
   */

  check_storage_capacity(){
    let temp_this = this
    this.file.getFreeDiskSpace().then(data=>{
        if(data < MessageProvider.MIN_STORAGE){
         temp_this.showWarning(MessageProvider.MESSAGES.LOW_STORAGE_SPACE)
        }
    }).catch(err=>{
      temp_this.showErrorAlert("Error while checking storage, code : " + err.code + " message : " + err.message)
    })
  }

  /**
   * This method is going to show a ess alert, it will have only one button(Ok),
   * By tapping/clicking on "Ok" button, the app will exit
   *
   * @param title {string} Title of the alert message
   * @param message {string} Message body of the alert message
   * @author Ratikanta
   * @since 2.1.0
   */
  showConfirmOnOkAppExit(title: string, message: string){

    let confirm = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: title,
      message: message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    confirm.setCssClass('sectorSelectionModalCommunity');
    confirm.present();
  }

}
