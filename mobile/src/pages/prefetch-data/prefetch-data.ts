import { EssProvider } from './../../providers/ess/ess';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, MenuController, AlertController,
          ViewController} from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { FacilitiesModalPage } from '../facilities-modal/facilities-modal';
import { MessageProvider } from '../../providers/message/message';
/**
 * Generated class for the PrefetchDataPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-prefetch-data',
  templateUrl: 'prefetch-data.html',
})

/**
 * @Author: Naseem
 * @Author: Ratikanta Pradhan 
 * @email:   ratikanta@sdrc.co.in 
 * @Date: 19-06-2017 16:24 
 * @Last Modified by:   Ratikanta Pradhan 
 * @Last Modified time: 2017-10-11 15:03:13 
 */
export class PrefetchDataPage {

  fetchAreas : any = [];
  areas : any = null;
  states : any = [];
  cCheckListFacility : any = [];
  fCheckListFacility : any = [];
  is_web : boolean = false;
  facilityModal : any = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, private dataService: DataProvider,
    public modalCtrl : ModalController, private menu : MenuController, private alertCtrl: AlertController,
    private messageService: MessageProvider, private viewCtrl: ViewController,
  private essService : EssProvider) {
    this.fetchAreas = this.dataService.getAreas();
    this.menu.swipeEnable(false);
    this.areas = this.fetchAreas[0];
    this.states = this.areas.children;
    this.is_web = this.essService.getPlatform().isWebPWA
  }

  openFacilitySelectionModal(type) {
    let temp = this;
    let obj = { type : type};
    temp.facilityModal = this.modalCtrl.create(FacilitiesModalPage, obj);
    temp.facilityModal.onDidDismiss(data => {
      if(data !== undefined){
        if(data.facilityArray.length > 0){
          temp.formatList(data);
        }
      }
    });
    temp.facilityModal.present();

  }

  formatList(obj){
    switch(obj.type){
      case 'facility' :
        if(this.fCheckListFacility.length > 0){
          for(let i=0; i<obj.facilityArray.length; i++){
            let present = false;
            for(let j=0; j<this.fCheckListFacility.length; j++){
              if(this.fCheckListFacility[j].areaNId == obj.facilityArray[i].areaNId)
                present = true;
            }
            if(!present)
              this.fCheckListFacility.push(obj.facilityArray[i]);
          }
        }else{
          this.fCheckListFacility = obj.facilityArray;
        }
      break;

      case 'community' :
        if(this.cCheckListFacility.length > 0){
          for(let i=0; i<obj.facilityArray.length; i++){
            let present = false;
            for(let j=0; j<this.cCheckListFacility.length; j++){
              if(this.cCheckListFacility[j].areaNId == obj.facilityArray[i].areaNId)
                present = true;
            }
            if(!present)
              this.cCheckListFacility.push(obj.facilityArray[i]);
          }
        }else{
          this.cCheckListFacility = obj.facilityArray;
        }
      break;
    }
  }

  fetchData(){
    this.messageService.presentLoading("Fetching last visit data, please wait...");
    let obj = {
      communityList : [],
      facilityList : []
    }

    for(let i=0; i<this.cCheckListFacility.length; i++){
      obj.communityList.push(this.cCheckListFacility[i].areaNId);
    }

    for(let i=0; i<this.fCheckListFacility.length; i++){
      obj.facilityList.push(this.fCheckListFacility[i].areaNId);
    }

    if(obj.facilityList.length > 0 || obj.communityList.length > 0){
      this.dataService.getPreviousData(obj);
    }else{
      this.messageService.dismissLoading();
      this.presentToast("Please select a facility to fetch last visit data");
    }
  }

  confirms:any;
  presentToast(message) {
  let temp = this;
  temp.confirms = temp.alertCtrl.create({enableBackdropDismiss:false});
  temp.confirms.setCssClass('sectorSelectionModalCommunity');
  temp.confirms.setTitle("Warning");
  temp.confirms.setMessage(message);
  temp.confirms.addButton({
          text: "Ok",
          handler: data => {
            temp.confirms.dismiss;
          }
        });
        temp.confirms.present();
  }
  
  ngOnDestroy(){
    // if(this.facilityModal)
    //   this.facilityModal.dismiss();

    // if(this.confirms){
    //   this.confirms.dismiss;
    // }
  }

  ionViewWillLeave(){
    debugger;
    if(this.facilityModal)
      this.facilityModal.dismiss();
    
    if(this.confirms){
      this.confirms.dismiss;
    }
  }

}
