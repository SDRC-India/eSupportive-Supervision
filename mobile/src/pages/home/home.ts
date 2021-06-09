/*
 * @Author: Ratikanta Pradhan 
 * @email:   ratikanta@sdrc.co.in 
 * @Date: 2017-10-12 18:13:47 
 * @Last Modified by: Ratikanta Pradhan
 * @Last Modified time: 2017-10-16 16:39:48
 */
import { Component } from '@angular/core';
import { NavController, MenuController, AlertController, Events, Platform } from 'ionic-angular';
import { MessageProvider } from '../../providers/message/message';
import { FacilityPage } from '../facility/facility';
import { CommunityPage } from '../community/community';
import { EditFormPage } from '../edit-form/edit-form';
import { FinalizeFormPage } from '../finalize-form/finalize-form';
import { ViewsentPage } from '../viewsent/viewsent';
import { PrefetchDataPage } from '../prefetch-data/prefetch-data';
import { DataProvider } from '../../providers/data/data';
import { EssProvider } from '../../providers/ess/ess'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

/**
 * @Author: Ratikanta Pradhan 
 * @email:   ratikanta@sdrc.co.in 
 * @Last Modified by: Ratikanta Pradhan
 * @Last Modified time: 11-10-2017 12:30
 */
export class HomePage {

  saved_form : number = 0;
  finalized_form : number = 0;
  sent_form : number = 0;

 prefetchDataPage:any;
 width:any;
 is_web : boolean = false; 
 db: any;
 appVersionName: string;

 /*
  * @Author: Ratikanta Pradhan 
 */
 constructor(public navCtrl: NavController, public menuCtrl: MenuController
              ,public alertCtrl: AlertController,
              private events : Events, private platform: Platform,
              private messageService: MessageProvider, private dataService: DataProvider,
            private ess: EssProvider) {

                this.platform.ready().then(_=>{
                  if(this.platform.is('android') && this.platform.is('cordova')){
                    this.messageService.check_storage_capacity()
                  }
                  
                })
                
                this.prefetchDataPage = PrefetchDataPage;
                this.menuCtrl.enable(true);
                this.menuCtrl.swipeEnable(true);
                this.menuCtrl.get().enable(true);
                this.is_web = this.ess.getPlatform().isWebPWA
                
                if (window.location.search.indexOf('userAgent=web') > -1) {              
                          
                // window.location.href =  window.location.href.split("?")[0];               
               var query = window.location.search.substring(1)              
                // is there anything there ?
                if(query.length) {
                // are the new history methods available ?
                if(window.history != undefined && window.history.pushState != undefined) {
                      // if pushstate exists, add a new state the the history, this changes the url without reloading the page
                     window.history.pushState({},document.title, window.location.pathname);   
                }
                }
                }
                
                this.appVersionName = this.ess.getAppVersionName()
                
                
              
  }
              

  /*
 * @Author: Ratikanta Pradhan 
 * @email:   ratikanta@sdrc.co.in 
 * @Last Modified by:   Ratikanta Pradhan 
 * @Last Modified time: 11-10-2017 11:27:09 
 */
  ngOnInit():void {
    this.width = this.platform.width();
    this.dataService.getSavedForms();  
    this.dataService.getFinalizeForms();
    this.dataService.getViewSentForms_not_deleted();
    this.events.subscribe(MessageProvider.EVENTS.SAVED_FORMS, (flag, data,message) => {
        this.saved_form = 0;       
        if(flag){                                   
            if(!(data.facility == null || data.facility == undefined)){
                this.saved_form += data.facility.length;
            }
            if(!(data.community == null || data.community == undefined)){
                this.saved_form += data.community.length;
            }
        }else{
          this.messageService.showErrorAlert(message)
        }                      
     });

     //Subscribing to finalize event
      this.events.subscribe(MessageProvider.EVENTS.FINALIZE_FORMS, (flag, data,message) => {      
        this.finalized_form = 0;
              if(flag){
                if(!(data.facility == null || data.facility == undefined)){
                    this.finalized_form += data.facility.length;
                }
                if(!(data.community == null || data.community == undefined)){
                    this.finalized_form += data.community.length;
                }
              }   
              
     });


     //Subscribing to sent form event
     this.events.subscribe(MessageProvider.EVENTS.VIEW_SENT_FORMS_NOT_DELETED, (flag, data,message) => {      
       this.sent_form = 0;
              if(flag){                                   
                if(!(data.facility == null || data.facility == undefined)){
                    this.sent_form += data.facility.length;
                }
                if(!(data.community == null || data.community == undefined)){
                    this.sent_form += data.community.length;
                } 
              }                 
     });

  }

  ionViewWillEnter() {    
    this.menuCtrl.swipeEnable(true);          
  }

  /**
   * @Author: Ratikanta Pradhan 
   * @email:   ratikanta@sdrc.co.in 
   * @Last Modified by: Ratikanta Pradhan
   * @Last Modified time: 11-10-2017 12:30
   */

  gotoNext() {
    // this.dataService.getTxnDataCount();
    let alert = this.alertCtrl.create({enableBackdropDismiss:false});
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
              if (data === undefined) {
                this.presentToast("Please select any one Checklist");
                this.messageService.dismissLoading();
              } else {
                if (data == MessageProvider.FORM_TYPE.COMMUNITY) {
                  if (this.navCtrl.push(CommunityPage)) {
                    this.messageService.dismissLoading()
                  }
                } else if (data == MessageProvider.FORM_TYPE.FACILITY) {
                  if (this.navCtrl.push(FacilityPage)) {
                    this.messageService.dismissLoading()
                  }
                }
              } 
          }, 300);      
      }
    });
    alert.present();
  }

  goToEditForm(){
    this.messageService.presentLoading("Loading, please wait...");
    this.navCtrl.push(EditFormPage);      
  }

  goToFinalizedForm(){
    this.messageService.presentLoading("Loading, please wait...");
    this.navCtrl.push(FinalizeFormPage);     
  }

  goToViewSentForm(){
    this.messageService.presentLoading("Loading, please wait...");
    this.navCtrl.push(ViewsentPage);    
  } 

  presentToast(message) {
  let confirm = this.alertCtrl.create({enableBackdropDismiss:false});
        confirm.setCssClass('sectorSelectionModalFacility');
        confirm.setTitle("Warning");
        confirm.setMessage(message);
        confirm.addButton({
          text: "Ok",
          handler: data => {
            confirm.dismiss;
          }
        });
        confirm.present();
  }

  /*
 * @Author: Ratikanta Pradhan 
 * @email:   ratikanta@sdrc.co.in 
 * @Last Modified by:   Ratikanta Pradhan 
 * @Last Modified time: 2017-09-29 11:27:09 
 */
  ngOnDestroy():void{
    this.events.unsubscribe(MessageProvider.EVENTS.TXN_DATA_COUNT_DONE);
    this.events.unsubscribe(MessageProvider.EVENTS.SAVED_FORMS);
    this.events.unsubscribe(MessageProvider.EVENTS.FINALIZE_FORMS);   
    this.events.unsubscribe(MessageProvider.EVENTS.VIEW_SENT_FORMS_NOT_DELETED);
    //Ratikanta
    this.events.unsubscribe(MessageProvider.EVENTS.STORAGE_TEST_DONE);
  }

}
