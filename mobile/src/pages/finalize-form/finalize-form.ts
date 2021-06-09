import { EssProvider } from './../../providers/ess/ess';
import { Component } from '@angular/core';
import { IonicPage, NavController, Events , AlertController, MenuController } from 'ionic-angular';
import { MessageProvider } from '../../providers/message/message';
import { DataProvider } from '../../providers/data/data';
import { FacilityPage } from '../facility/facility';
import { CommunityPage } from '../community/community';


/**
 * Generated class for the FinalizeFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-finalize-form',
  templateUrl: 'finalize-form.html',
})
export class FinalizeFormPage {

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
    private alertCtrl : AlertController,
    private menu : MenuController,
    private messageService: MessageProvider,
  private essService: EssProvider) {
      this.is_web = this.essService.getPlatform().isWebPWA
      this.menu.swipeEnable(false);
      this.areas = dataService.getAreas();
  }

  ngOnInit():void {

    this.dataService.getFinalizeForms();  
    this.dataService.getViewSentForms_not_deleted();      
    this.dataService.getFinalizeForms();
    this.dataService.getViewSentForms();
    this.events.subscribe(MessageProvider.EVENTS.FINALIZE_FORMS, (flag, data,message) => {      
              if(flag){                                   
                  this.savedForms.facility = data.facility;
                  this.savedForms.community = data.community;
              }else{
                this.errorToast(message);
              }                      
     });


     this.events.subscribe(MessageProvider.EVENTS.FINALIZED_FORM_DELETED, (flag, message) => {      
              if(flag){
                let deleted : boolean = false;
                for(let i = 0; i < this.savedForms.facility.length;i++){
                  if(this.savedForms.facility[i].id === this.id){
                    this.savedForms.facility.splice(i, 1);
                    deleted = true;
                    break;
                  }
                }
                if(!deleted){
                 for(let i = 0; i < this.savedForms.community.length;i++){
                    if(this.savedForms.community[i].id === this.id){
                      this.savedForms.community.splice(i, 1);
                      deleted = true;
                      break;
                    }
                  } 
                }
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
      this.navCtrl.push(FacilityPage, d);
  }

  /**
 * This method is going to send the navigation to facility page with data
 * @param d The form
 */
  communitySelected(d:any){    
      this.navCtrl.push(CommunityPage, d);
  }

/**
 * This method is going to delete one record from list
 * @param date 
 */
  delete(id : Date){
    let temp = this;
    let confirm = this.alertCtrl.create({enableBackdropDismiss:false});
        confirm.setCssClass('sectorSelectionModalFacility');
        confirm.setTitle(MessageProvider.MESSAGES.FACILITY_PAGE_CANCEL_CONFIRM_TITLE);
        confirm.setMessage('Are you sure you want to delete this finalized checklist?');
        confirm.addButton(MessageProvider.MESSAGES.FACILITY_COMMUNITY_PAGE_CANCEL_CONFIRM_NEGATIVE_TEXT);
        confirm.addButton({
          text: MessageProvider.MESSAGES.FACILITY_COMMUNITY_PAGE_CANCEL_CONFIRM_POSITIVE_TEXT,
          handler: () => {
            temp.id = id;
            temp.dataService.deleteTxnData(MessageProvider.MENU.VIEW_FINALIZED_FORM, id, false, null);
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

  facilityInfo(i: number) {
    this.errorToast(this.savedForms.facility[i].errorMessage);
  }

  communityInfo(i: number) {
    this.errorToast(this.savedForms.community[i].errorMessage);
  }

  ngOnDestroy(): void {
    this.events.unsubscribe(MessageProvider.EVENTS.FINALIZED_FORM_DELETED);

    //We called the following line cause it will reflect the number of finalized forms in home page.
    this.dataService.getFinalizeForms();
    this.dataService.getViewSentForms_not_deleted();        
    this.dataService.getViewSentForms();
  }
}
