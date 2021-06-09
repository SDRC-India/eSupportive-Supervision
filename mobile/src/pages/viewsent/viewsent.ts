import { EssProvider } from './../../providers/ess/ess';
import { Component } from '@angular/core';
import { IonicPage, NavController, Events, AlertController, MenuController } from 'ionic-angular';
import { MessageProvider } from '../../providers/message/message';
import { DataProvider } from '../../providers/data/data';
import { FacilityPage } from '../facility/facility';
import { CommunityPage } from '../community/community';

/**
 * Generated class for the ViewsentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-viewsent',
  templateUrl: 'viewsent.html',
})
export class ViewsentPage {

  savedForms : any = {
    facility : [],
    community: []
  };
  areas: any = [];
  id : Date;
  is_web : boolean = false;
  constructor(public navCtrl: NavController, 
    private events : Events,
    private dataService : DataProvider,
    private alertCtrl: AlertController,
    private menu : MenuController,
    private messageService: MessageProvider,
  private essService : EssProvider) {
      this.is_web = this.essService.getPlatform().isWebPWA
      this.menu.swipeEnable(false);
  }

  ionViewDidLoad(): void{
      this.areas = this.dataService.getAreas();
  }

  ngOnInit():void {

    this.dataService.getViewSentForms();
    this.dataService.getViewSentForms_not_deleted();
    this.events.subscribe(MessageProvider.EVENTS.VIEW_SENT_FORMS, (flag, data,message) => {      
              if(flag){                                   
                  this.savedForms.facility = data.facility;
                  this.savedForms.community = data.community;
              }else{
                this.errorToast(message);
              }                 
     });


     this.events.subscribe(MessageProvider.EVENTS.SENT_FORM_DELETED, (flag, message) => {      
          
        if(flag){
            let deleted : boolean = false;
            for(let i = 0; i < this.savedForms.facility.length;i++){
              if(this.savedForms.facility[i].id === this.id){
                this.savedForms.facility[i].deleted = true;
                deleted = true;
                break;
              }
            }
            if(!deleted){
              for(let i = 0; i < this.savedForms.community.length;i++){
                if(this.savedForms.community[i].id === this.id){
                  this.savedForms.community[i].deleted = true;
                  deleted = true;
                  break;
                }
              } 
            }
            this.warningToast("Delete successfully!");
          }else{
            this.errorToast(message);
          } 
              
     });
     this.messageService.dismissLoading();
  }


/**
 * This method is going to send the navigation to facility page with data
 * @param d The form
 */
  facilitySelected(d:any){

    //If for is deleted, we do not need to send it to facility page because there will be no data, only meta data will be there
    if(d.deleted){
      this.warningToast("Form has been deleted!");
    }else{
      this.navCtrl.push(FacilityPage, d);
    }      
  }

  /**
 * This method is going to send the navigation to facility page with data
 * @param d The form
 */
  communitySelected(d:any){      
    //If for is deleted, we do not need to send it to facility page because there will be no data, only meta data will be there
    if(d.deleted){
      this.warningToast("Form has been deleted!");
    }else{
      this.navCtrl.push(CommunityPage, d);
    }
  }

/**
 * This method is going to delete one record from list
 * @param date 
 */
  deleteFacilityData(id : Date){
    let temp = this;
    let confirm = this.alertCtrl.create({enableBackdropDismiss:false});
        confirm.setCssClass('sectorSelectionModalFacility');
        confirm.setTitle(MessageProvider.MESSAGES.FACILITY_PAGE_CANCEL_CONFIRM_TITLE);
        confirm.setMessage('Are you sure you want to delete this sent checklist?');
        confirm.addButton(MessageProvider.MESSAGES.FACILITY_COMMUNITY_PAGE_CANCEL_CONFIRM_NEGATIVE_TEXT);
        confirm.addButton({
          text: MessageProvider.MESSAGES.FACILITY_COMMUNITY_PAGE_CANCEL_CONFIRM_POSITIVE_TEXT,
          handler: () => {
            temp.id = id;
            this.dataService.deleteTxnData(MessageProvider.MENU.VIEW_SENT_FORM, id, true, MessageProvider.FORM_TYPE.FACILITY);
            }
          });
        confirm.present(); 
  }

  deleteCommunityData(id : Date){
    let temp = this;
    let confirm = this.alertCtrl.create({enableBackdropDismiss:false});
        confirm.setCssClass('sectorSelectionModalFacility');
        confirm.setTitle(MessageProvider.MESSAGES.FACILITY_PAGE_CANCEL_CONFIRM_TITLE);
        confirm.setMessage('Are you sure you want to delete this sent checklist?');
        confirm.addButton(MessageProvider.MESSAGES.FACILITY_COMMUNITY_PAGE_CANCEL_CONFIRM_NEGATIVE_TEXT);
        confirm.addButton({
          text: MessageProvider.MESSAGES.FACILITY_COMMUNITY_PAGE_CANCEL_CONFIRM_POSITIVE_TEXT,
          handler: () => {
            temp.id = id;
            this.dataService.deleteTxnData(MessageProvider.MENU.VIEW_SENT_FORM, id, true, MessageProvider.FORM_TYPE.COMMUNITY);
            }
          });
        confirm.present(); 
  }

  warningToast(message) {
  
  let confirm = this.alertCtrl.create({enableBackdropDismiss:false});
        confirm.setCssClass('sectorSelectionModalCommunity');
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

  ngOnDestroy(): void {
      this.events.unsubscribe(MessageProvider.EVENTS.SENT_FORM_DELETED);
      this.events.unsubscribe(MessageProvider.EVENTS.VIEW_SENT_FORMS);
      
      
      //We called the following line cause it will reflect the number of sent forms in home page.
      this.dataService.getViewSentForms_not_deleted();      
      this.dataService.getFinalizeForms();
      this.dataService.getViewSentForms();
  }

  facilityInfo(info) {
    this.errorToast(info);
  }

}
