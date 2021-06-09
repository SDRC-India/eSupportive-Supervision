import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, ViewController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { AreaPipe } from '../../pipes/area/area';
import { MessageProvider } from '../../providers/message/message';

/**
 * Generated class for the FacilitiesModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-facilities-modal',
  templateUrl: 'facilities-modal.html',
})
export class FacilitiesModalPage {

  fetchAreas : any = [];
  areas : any = null;
  countries : any = [];
  states : any = [];
  selectedState : any = null;
  districts : any = [];
  selectedDistrict : any = null;
  blocks : any = [];
  selectedBlock : any = null;
  facilities : any = [];
  selectedFacility : any = null;
  typeDetails : any = [];
  facilityTypeDetails : any = [];
  selectedFacilitytype : any = null;
  facilityType : any = null;
  blockFlag : boolean = false;
  type = this.navParams.get('type');
  selectPreFetchStateOptions : any;
  selectPreFetchDistrictOptions :any;
  selectPreFetchFacilityTypeOptions:any;
  selectPreFetchBlockOptions :any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, private dataService: DataProvider, private area: AreaPipe,
    private messageService: MessageProvider, public platform: Platform) {

    this.selectPreFetchStateOptions = {
        title: 'Select State'
      };
      this.selectPreFetchDistrictOptions = {
        title: 'Select District'
      };
      this.selectPreFetchFacilityTypeOptions = {
        title: 'Select Facility Type'
      };
       this.selectPreFetchBlockOptions = {
        title: 'Select Block'
      };
    this.fetchAreas = this.dataService.getAreas();
    this.areas = this.area.convertToParentChild(this.fetchAreas);
    this.countries = this.areas.children;
    this.states = this.countries[0].children;
    if(this.states.length == 1){
        this.selectedState = this.states[0];  
         this.districts = this.selectedState.children; 

     }
    this.typeDetails = dataService.getTypeDetails();
    this.facilityTypeDetails = (this.typeDetails.filter
        (d=>d.id === MessageProvider.TYPE_IDS.FACILITY_TYPE_ID))[0].typeDetails;

    if(this.type == 'community')
      this.facilityTypeDetails = this.facilityTypeDetails.filter(d=>d.id === 12 || d.id === 13);
    // this.selectedState = this.states[0];
  }

  ionViewDidLoad() {
  }

  stateSelected(){
    this.districts = this.selectedState.children;
  }

  districtSelected(){
    this.facilities = [];
    this.blocks = [];

    if(this.facilityType != null && this.facilityType != undefined){
      if(this.facilityType == 105){
        for(let i=0; i<this.selectedDistrict.children.length; i++){
          if(this.selectedDistrict.children[i].level == 5){
            this.selectedDistrict.children[i].checked = false;
            this.facilities.push(this.selectedDistrict.children[i]);
          }
          else{
            this.blocks.push(this.selectedDistrict.children[i]);
          }
        }
      }else{
        for(let i=0; i<this.selectedDistrict.children.length; i++){
          if(this.selectedDistrict.children[i].level == 4){
            this.blocks.push(this.selectedDistrict.children[i]);
          }
        }
      }
    }else{
      for(let i=0; i<this.selectedDistrict.children.length; i++){
        if(this.selectedDistrict.children[i].level == 4){
          this.blocks.push(this.selectedDistrict.children[i]);
        }
      }
    }
  }

  facilityTypeSelected(){
    this.facilities = [];

    switch(this.selectedFacilitytype.id){ //this.facilityTypeObject.name
      case 17: this.facilityType = 105; break; //DH
      case 11: this.facilityType = 101; break; //SC
      case 12: this.facilityType = 102; break; //Non 24x7
      case 13: this.facilityType = 102; break; //24x7
      case 14: this.facilityType = 103; break; //Non FRU
      case 15: this.facilityType = 103; break; //FRU
      case 16: this.facilityType = 104; break; //SDH
      case 18: this.facilityType = 106; break; // Area Hospital
      case 19: this.facilityType = 107; break; //Medical College
    }
    
    if(this.facilityType == 105){
      this.blockFlag = false;
      this.selectedBlock = null;
      for(let i=0; i<this.selectedDistrict.children.length; i++){
          if(this.selectedDistrict.children[i].level == 5){
            this.selectedDistrict.children[i].checked = false;
            this.facilities.push(this.selectedDistrict.children[i]);
          }
        }
    }else{
      this.blockFlag = true;
      if(this.selectedBlock != null && this.selectedBlock != undefined){
        for(let i=0; i<this.selectedBlock.children.length; i++){
          if(this.selectedBlock.children[i].facilityType.id == this.facilityType){
            this.selectedBlock.children[i].checked = false;
            this.facilities.push(this.selectedBlock.children[i]);
          }
        }
      }
    }
  }

  blockSelected(){
    this.facilities = [];
    // for(let i=0; i<this.selectedDistrict.children.length; i++){
    //   if(this.selectedDistrict.children[i].level == 5){
    //     this.selectedDistrict.children[i].checked = false;
    //     this.facilities.push(this.selectedDistrict.children[i]);
    //   }
    // }

    for(let i=0; i<this.selectedBlock.children.length; i++){
      if(this.selectedBlock.children[i].facilityType.id == this.facilityType){
        this.selectedBlock.children[i].checked = false;
        this.facilities.push(this.selectedBlock.children[i]);
      }
    }
  }

  viewSelected(){
    let obj = { facilityArray : [], type : this.type};
    for(let i=0; i<this.facilities.length; i++){
      if(this.facilities[i].checked == true)
        obj.facilityArray.push(this.facilities[i]);
    }

    this.viewCtrl.dismiss(obj);
  }

  cancel(){
    this.viewCtrl.dismiss();
  }

  ionViewWillLeave(){
  }

}
