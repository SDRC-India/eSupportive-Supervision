import { Component, ViewChild, DoCheck, KeyValueDiffers, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events, Navbar, 
          ModalController, MenuController, Content,
          Platform , ToastController,ViewController} from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { MessageProvider } from '../../providers/message/message';
import { HintProvider } from '../../providers/hint/hint';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe} from '@angular/common';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AreaPipe } from '../../pipes/area/area';
import { FacilitylevelPipe } from '../../pipes/facilitylevel/facilitylevel';
import { NegativeinputProvider } from '../../providers/negativeinput/negativeinput';
import { MonthdataPipe } from '../../pipes/monthdata/monthdata';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { SignatureModalPage } from '../signature-modal/signature-modal';
import { HintModalPage } from '../hint-modal/hint-modal';
import { EssProvider } from '../../providers/ess/ess'
/**
 * Generated class for the FacilityPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-facility',
  templateUrl: 'facility.html',
})


/*
 * @Author: Ratikanta Pradhan 
 * @email: ratikanta@sdrc.co.in 
 * @Last Modified by: Ratikanta Pradhan
 * @Last Modified time: 10-10-2017 13:48
 */
export class FacilityPage implements DoCheck {
  @ViewChild('myInput') myInput: ElementRef;

  sectors:any;
  text : any;
  sent:boolean = false;
  isf11:boolean = false;
  ise11g1:boolean = false;
  ise11g2:boolean = false;
  ise11g3:boolean = false;
  ise11g4:boolean = false;
  disabledSector:boolean = true;
  selectedSector:string = "1";
  selectedSectorNumber: number = 1;
  selectedSubsector:string;
  selectedSubSectorNumber:number;
  subsectors:any;
  sectorOrSubsectorNumber:number;
  showSubsectors:boolean = false;
  obj : any;
  lvobj: any;
  facilityradioObj:any;
  facilityradioObjTemp:any;
  forEdit : boolean = false;
  forSaveStatus: boolean = false;
  imageSrc: string = '';
  imageType: string ='';
  public cSectionForm:FormGroup;
  public dSectionForm:FormGroup;
  public e1SectionForm:FormGroup;
  public e2SectionForm:FormGroup;
  public e3SectionForm:FormGroup;
  public e4SectionForm:FormGroup;
  public e5SectionForm:FormGroup;
  public e6SectionForm:FormGroup;
  public e7SectionForm:FormGroup;
  public e8SectionForm:FormGroup;
  public e9SectionForm:FormGroup;
  public e10SectionForm:FormGroup;
  public e11SectionForm:FormGroup;
  public f1SectionForm:FormGroup;
  public f2SectionForm:FormGroup;
  public f3SectionForm:FormGroup;
  public f4SectionForm:FormGroup;
  public f5SectionForm:FormGroup;
  public f6SectionForm:FormGroup;
  public f7SectionForm:FormGroup;
  public h1SectionForm:FormGroup;
  public h2SectionForm:FormGroup;
  public h3SectionForm:FormGroup;
  public h4SectionForm:FormGroup;
  public h5SectionForm:FormGroup;
  public i1SectionForm:FormGroup;
  public i2SectionForm:FormGroup;
  public i3SectionForm:FormGroup;
  public i4SectionForm:FormGroup;
  public i5SectionForm:FormGroup;
  public i6SectionForm:FormGroup;
  public i7SectionForm:FormGroup;
  public i8SectionForm:FormGroup;
  public geoSectionForm:FormGroup;
  public press: number = 0;

  finalizeAttempt:boolean=false;
  cS:boolean=false;
  colors: any = [];
  typeDetails : any = [];
  optionTypeDetails : any = [];
  yesNoTypeDetails : any = [];
  npcdcsOptionDetails : any [];
  organisationTypeDetails : any = [];
  planOfActionOrganizations : any = [];
  districtTypeDetails:any=[];
  blockTypeDetails:any=[];
  levelTypeDetails:any=[];
  facilityTypeDetails:any=[];
  facilityLevelTypeDetails:any=[];
  fetchAreas : any = [];
  areas : any = null;
  countries : any = [];
  states : any = [];
  districts : any = [];
  blocks : any = [];
  facilities : any = [];
  selectedState:string;
  selectedStateNumber:number;
  selectedDistrict:string;
  selectedDistrictNumber:string;
  selectedBlock:string;
  selectedBlockNumber:string;
  selectedFacility:string;
  selectedFacilityNumber:string;
  today:any;
  finalized : boolean = false;

  /**
   * @author Naseem
   * @author Jagat Bandhu
   * this variable is used to hide and show the lat long text field in html/View.
   * if gpsFlag is false the the text will hide otherwise the text will show.
   */
  gpsFlag : boolean = false;
  stateObject : any = null;
  districtObject : any = null;
  blockObject : any = null;
  facilityObject : any = null;
  facilityTypeObject : any = null;
  formInfo : any = {};
  show_c_progressbar: boolean = false;
  show_d_progressbar: boolean = true;
  show_e_progressbar: boolean = true;
  show_e_meternalhealth_progressbar = true;
  show_e_newborn_progressbar = true;
  show_e_childhealth_progressbar = true;
  show_e_vaccine_progressbar = true;
  show_e_antibiotics_progressbar = true;
  show_e_infra_progressbar = true;
  show_e_infection_progressbar = true;
  show_e_andolescent_progressbar = true;
  show_e_other_progressbar = true;
  show_e_hr_progressbar = true;
  show_f_ante_progressbar = true;
  show_f_intra_progressbar = true;
  show_f_newborn_progressbar = true;
  show_f_family_progressbar = true;
  show_f_client_progressbar = true;
  show_f_facility_progressbar = true;
  show_f_adloscent_progressbar = true;
  show_h_service_progressbar = true;
  show_h_healthinfo_progressbar = true;
  show_h_hr_progressbar = true;
  show_h_healthfinance_progressbar = true;
  show_h_leadership_progressbar = true;
  show_i_diagnosis_progressbar = true;
  show_i_treatment_progressbar = true;
  show_i_national_progressbar = true;
  show_i_nvbcdp_progressbar = true;
  show_i_rntcp_progressbar = true;
  show_i_leprosy_progressbar = true;
  show_i_ncd_progressbar = true;
  show_i_nppc_progressbar = true;
  show_geo_coordinate_progressbar = true;
   progressBarObj : any ={
      loadProgress: 0,
      loadProgressD: 0,
      loadProgressE: 0,
      loadProgressE_meternal: 0,
      loadProgressE_newborn: 0,
      loadProgressE_childhealth: 0,
      loadProgressE_vaccine: 0,
      loadProgressE_antibiotics: 0,
      loadProgressE_infra: 0,
      loadProgressE_infection: 0,
      loadProgressE_andolescent: 0,
      loadProgressE_other: 0,
      loadProgressE_hr: 0,
      loadProgressF_ante: 0,
      loadProgressF_intra: 0,
      loadProgressF_newborn: 0,
      loadProgressF_family: 0,
      loadProgressF_client: 0,
      loadProgressF_facility: 0,
      loadProgressF_adloscent: 0,
      loadProgressH_service: 0,
      loadProgressH_healthinfo: 0,
      loadProgressH_hr: 0,
      loadProgressH_healthfinance: 0,
      loadProgressH_leadership: 0,
      loadProgressI_diagnosis: 0,
      loadProgressI_treatment: 0,
      loadProgressI_national: 0,
      loadProgressI_nvbcdp: 0,
      loadProgressI_rntcp: 0,
      loadProgressI_leprosy: 0,
      loadProgressI_ncd: 0,
      loadProgressI_nppc: 0,
      loadProgressGeo_coordinate: 0,
  }

  e1Score:number = 0;
  e2Score:number = 0;
  e3Score:number = 0;
  e4Score:number = 0;
  e5Score:number = 0;
  e6Score:number = 0;
  e7Score:number = 0;
  e8Score:number = 0;
  e9Score:number = 0;
  e10Score:number = 0;
  e11Score:number = 0;  
  anteNatalCareSubSectionMaxScore:number = 0;
  ipipppScore:number = 0;
  ENBCRCScore:number = 0;
  familyPlanningScore:number = 0;
  clientSaticfactionScore:number = 0;
  FMOScore:number = 0;
  adolescentHealthScore:number = 0;

  clickCounterObj:any=[]; 
  is_web : boolean = false;
  ioncontentHeight:any;
  scrollHeight:any;
  facilityTypeDisable: boolean = true;
  facilityLevelDisable: boolean = true;
  facilityTypeDisableStatus: boolean = false;
  facilityLevelDisableStatus: boolean = false;
  differ: any;
  isLvData : boolean = false;
  checked:boolean = false;
  disableBlock:boolean = true;

  true : boolean = false;
  false : boolean = false;

  isYes :boolean = false;
  isNo:boolean = false;
  isDontKnow = false;
  chooseImage : boolean = true;
  img1 : any;
  img2 : any;
  img3: any


  lastChoosenFileName : string = "";

  organizationObject : any = null;
  roles : any = [];
  masterRoles : any = [];
  designations : any = [];
  designationByOrg : any = [];
  timelines:any=[];

  enableAdd: boolean = true;
  shownGroup = null;
  shownGroup1 = null;
  presentToastConfirm: any;
  objectPlanofAction:any;

  planOfActionObject : any = {
    majorFindings : null,
    intervention_activities : null,
    responsibility : null,
    timeline : null,
    levelOfIntervention : null,
    sectionType : null,
    facilityId : null
  };

  selectStateOptions : any;
  selectDistrictOptions : any;
  selectFacilityTypeOptions : any;
  selectBlockOptions : any;
  selectFacilityOptions : any;
  selectFacilityLevelOptions : any;
  selectLevelOfInterventionOptions : any;
  selectOrganisationOptions : any;
  selectResponsibilityOptions : any;
  selectTimelineOptions : any;

  /**
   * @author Jagat Bandhu
   * when the loader is on at the time of capturing geo-coordinates, at the same time user tap on back button 
   * we are publishing an event in handleBackButton method of MyApp class.
   * 
   * Though this event is asynschronous, we face problem to stop the device to capture geo-location. 
   * This following variable will help us to prevent capturing geo-location when hardware back button of android 
   * device is tapped.
   */
  backButtonStatus: boolean = false;

  alert1 : any;
  alert2 : any;
  alert3 : any;
  alert4 : any;
  alert5 : any;
  alert6 : any;
  alert7 : any;
  alert8 : any;
  alert9 : any;
  alert10 : any;
  alert11 : any;
  alert12 : any;

  visibility : any = {
    visibleInL1Facility: false,
    visibleInL2Facility: false,
    visibleInL3Facility: false,
    visibleInL4Facility: false
  }

  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private dataService: DataProvider,
    private hintService: HintProvider,
    private messageService: MessageProvider,
    private alertCtrl : AlertController,
    private events : Events,
    public formBuilder: FormBuilder,
    private datePipe : DatePipe,
    private camera: Camera,
    private area: AreaPipe,
    private facilitylevelPipe: FacilitylevelPipe,
    private negativeinputProvider: NegativeinputProvider,
    private monthdata: MonthdataPipe,
    private geolocation: Geolocation,
    private backgroundGeolocation: BackgroundGeolocation,
    public modalCtrl : ModalController,
    private menu : MenuController,
    private toastCtrl: ToastController,
    private viewController:ViewController,
    private differs: KeyValueDiffers,
    public platform : Platform,
    private ess: EssProvider) {

      this.selectStateOptions = {
        title: 'Select State'
      };

      this.selectDistrictOptions = {
        title: 'Select District'
      };

      this.selectFacilityTypeOptions = {
        title: 'Select Facility Type'
      };

      this.selectBlockOptions = {
        title: 'Select Block'
      };

      this.selectFacilityOptions = {
        title: 'Select Facility'
      };
    
      this.selectFacilityLevelOptions = {
        title: 'Select Facility Level'
      };

      this.selectLevelOfInterventionOptions = {
        title: 'Select Level Of Intervention'
      };

      this.selectOrganisationOptions = {
        title: "Select Organisation"
      };

      this.selectResponsibilityOptions = {
        title: "Select Responsibility"
      };

      this.selectTimelineOptions = {
        title: "Select Timeline (in months)"
      }
    
     window.addEventListener('native.keyboardshow', function(){
       //this.toolBarElement = document.querySelector('ion-toolbar');
       this.footerBarElement = document.querySelector('ion-footer');
        document.body.classList.add('keyboard-is-open');
        //this.toolBarElement.style.display = 'none';
        this.footerBarElement.style.display = 'none';
     });
     window.addEventListener('native.keyboardhide', function(){
        document.body.classList.remove('keyboard-is-open');
        //this.toolBarElement.style.display = 'flex';
        this.footerBarElement.style.display = 'block';
     });

      if(this.navParams.data.id === undefined){

        this.today =  new Date();
      } else {
        this.today = new Date(this.navParams.data.data.c7.split("-")[2] + "-" +this.navParams.data.data.c7.split("-")[1]
        +"-"+this.navParams.data.data.c7.split("-")[0]);
        this.facilityLevelSelected(this.navParams.data.data.c6);
      }

      this.text = "All fields are mandatory";

      this.lvobj = [];

      this.facilityradioObj = {
            e111: false,
            e112: false,
            e121: false,
            e122: false,
            e13: false,
            e14: false,
            e15: false,
            e16: false,
            e17: false,           
            e21: false,
            e22: false,
            e23: false,
            e24: false,
            e25: false,
            e26: false,
            e27: false,
            e28: false,
            e29: false,
            e210: false,
            e211: false,
            e212: false,
            e213: false,
            e214: false,
            e215: false,
            e216: false,
            e217: false,
            e218: false,
            e219: false,
            e220: false,
            e221: false,
            e222: false,
            e223: false,
            e224: false,
            e225: false,
            e226: false,
            e227: false,
            e228: false,
            e229: false,
            e230: false,
            e231: false,
            e232: false,
            e233: false,
            e234: false,
            e235: false,
            e236: false,          
            e31: false,
            e32: false,
            e33: false,
            e341: false,
            e342: false,
            e351: false,
            e352: false,
            e36: false,
            e37: false,
            e38: false,
            e39: false,
            e310: false,
            e311: false,
            e312: false,
            e313: false,         
            e41: false,
            e42: false,
            e43: false,
            e44: false,
            e45: false,
            e46: false,
            e47: false,          
            e51: false,
            e52: false,
            e53: false,
            e54: false,
            e55: false,
            e56: false,
            e57: false,
            e58: false,
            e59: false,
            e510: false,
            e511: false,
            e512: false,
            e513: false,          
            e61: false,
            e62: false,
            e63: false,
            e64: false,
            e65: false,
            e66: false,
            e67: false,           
            e71: false,
            e72: false,
            e73: false,
            e74: false,
            e75: false,
            e76: false,
            e77: false,         
            e81: false,
            e82: false,
            e83: false,
            e84: false,
            e85: false,
            e86: false,
            e87: false,
            e88: false,           
            e91: false,
            e92: false,
            e93: false,
            e94: false,          
            e101: false,
            e102: false,
            e103: false,
            e104: false,
            e105: false,
            e106: false,
            e107: false,
            e108: false,
            e109: false,
            e1010: false,
            e1011: false,            
            e11g1: false,
            e1111: false,
            e1112: false,
            e1113: false,
            e1114: false,
            e1115: false,
            e11g2: false,
            e1121: false,
            e1122: false,
            e1123: false,
            e1124: false,
            e1125: false,
            e11g3: false,
            e1131: false,
            e1132: false,
            e1133: false,
            e1134: false,
            e1135: false,
            e11g4: false,
            e1141: false,
            e1142: false,
            e1143: false,
            e1144: false,
            e1145: false,            
            f11: false,
            f12: false,
            f13: false,
            f14: false,
            f15: false,
            f16: false,
            f17: false,
            f18: false,
            f19: false,
            f110: false,
            f111: false,
                       
            f21: false,
            f22: false,
            f23: false,
            f24: false,
            f25: false,
            f26: false,
            f27: false,
            f28: false,
            f29: false,
            f210: false,           
            f31: false,
            f32: false,
            f33: false,
            f34: false,
            f35: false,
            f36: false,
            f37: false,
            f38: false,
            f39: false,
            f310: false,           
            f41: false,
            f42: false,
            f43: false,
            f44: false,
            f45: false,           
            f51: false,
            f52: false,
            f53: false,
            f54: false,
            f55: false,
            f56: false,
            f57: false,
            f58: false,            
            f61: false,
            f62: false,
            f63: false,
            f64: false,
            f65: false,
            f66: false,          
            f71: false,
            f72: false,
            f73: false,
            f74: false,
            f75: false,
            f76: false,
            f77: false,
            f78: false,
            f79: false,
            f710: false,
            f711: false,
            hA1: false,
            hA2: false,
            hA2p1: false,
            hA2p2: false,
            hA3: false,
            hA3p1: false,
            hD1: false,
            hC1: false,
            hC2: false,
            hF1p1: false,
            hF1p2p1: false,
            hF2: false,
            iA1: false,
            iA2: false,
            iB1: false,
            iB2: false,
            iB3: false,
            iB4: false,
            iB4p1: false,
            iC1: false,
            iC2: false,
            iC3: false,
            /*@author Jagat Bandhu Sahoo*/
            //National Vector Borne Disease Control Program (NVBDCP)
            // Malaria
            iDA1: false,
            iDA2: false,
            iDA3: false,
            iDA3p1: false,
            iDA3p2: false,
            iDA3p3: false,
            iDA3p4: false,
            iDA3p5: false,
            iDA3p6: false,
            iDA3p7: false,
            //Japanese encephalitis (JE)
            iDB1: false,
            iDB2: false,
            iDB3: false,
            //Dengue and chicken gunya
            iDC1: false,
            iDC2: false,
            iDC3: false,
            //Lymphatic Filariasis
            iDD1: false,
            iDD2: false,
            iDD3: false,
            //kala azar
            iDE1: false,
            iDE2: false,
            iDE3: false,
            iDE4: false,
            iDE5: false,
            iDE6: false,
            //RNTCP
            iE1: false,
            iE2: false,
            iE3: false,
            iE4: false,
            iE5: false,
            iE6: false,
            //Leprosy
            iF1: false,
            iF2: false,
            iF3: false,
            iF4: false,
            //NCD
            iG1: false,
            iG2: false,
            iG3: false,
            iG3p1: false,
            iG4: false,
            iG4p1: false,
            iG5: false,
            iG6: false,
            //NPCC
            iH1: false,
            iH1p1: false,
            iH2: false,     

      }
      this.facilityradioObjTemp= {
            e111: null,
            e112: null,
            e121: null,
            e122: null,
            e13: null,
            e14: null,
            e15: null,
            e16: null,
            e17: null,           
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
            e41: null,
            e42: null,
            e43: null,
            e44: null,
            e45: null,
            e46: null,
            e47: null,          
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
            e61: null,
            e62: null,
            e63: null,
            e64: null,
            e65: null,
            e66: null,
            e67: null,           
            e71: null,
            e72: null,
            e73: null,
            e74: null,
            e75: null,
            e76: null,
            e77: null,         
            e81: null,
            e82: null,
            e83: null,
            e84: null,
            e85: null,
            e86: null,
            e87: null,
            e88: null,           
            e91: null,
            e92: null,
            e93: null,
            e94: null,          
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
            f41: null,
            f42: null,
            f43: null,
            f44: null,
            f45: null,           
            f51: null,
            f52: null,
            f53: null,
            f54: null,
            f55: null,
            f56: null,
            f57: null,
            f58: null,            
            f61: null,
            f62: null,
            f63: null,
            f64: null,
            f65: null,
            f66: null,          
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
            hA1: null,
            hA2: null,
            hA2p1: null,
            hA2p2: null,
            hA3: null,
            hA3p1: null,
            hD1: null,
            hC1: null,
            hC2: null,
            hF1p1: null,
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
            //NPCC
            iH1: null,
            iH2: null,     
       
        }
  this.differ = differs.find({}).create(null);
    this.menu.swipeEnable(false);
    this.sectors = this.dataService.getFacilityJson();
    this.is_web = this.ess.getPlatform().isWebPWA;
    if(this.navParams.data.id === undefined){
      this.obj = this.dataService.getFacilityObject();      
    }else{
      this.obj = this.navParams.data.data;
      this.finalized = this.navParams.data.finalized;
      this.sent = this.navParams.data.synced;
      this.progressBarObj=this.navParams.data.percentage;
      this.clickCounterObj=this.navParams.data.score;
      this.forEdit = true;
      if(this.obj.f11>0){
        this.isf11 = true;
      }
      if(this.obj.e11g1>0){
        this.ise11g1 = true;
      }
      if(this.obj.e11g2>0){
        this.ise11g2 = true;
      }
      if(this.obj.e11g3>0){
        this.ise11g3 = true;
      }
      if(this.obj.e11g4>0){
        this.ise11g4 = true;
      }
      
    }
    this.ioncontentHeight="0";
    this.scrollHeight="100";
    // this.e1Score=MessageProvider.FACILITY_SCORE.e_RH_score;

    this.sectorSelectionWork();  
    this.sectorOrSubsectorNumber = 1;

    this.cSectionForm = this.formBuilder.group({
      state: [{ value: '', disabled: this.sent || this.finalized }, Validators.compose([Validators.required])],
          c1: [{ value: '', disabled: this.sent || this.finalized || true}, Validators.compose([Validators.required])],
          c11: [{ value: '', disabled: this.sent || this.finalized || true},Validators.compose([Validators.required])],
          c2:[{ value: '', disabled: true || this.finalized},Validators.compose([Validators.required])],
          c3:[{ value: '', disabled: this.sent || this.finalized || true},Validators.compose([Validators.required])],
          c5:[{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          c43:[{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          c6:[{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          c8: [{ value: '', disabled: this.sent || this.finalized }, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z .,]+$')])],
          c9:[{ value: '', disabled: this.sent || this.finalized}, Validators.compose([Validators.required])],
          district: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          block: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          c51: [{ value: '', disabled: this.sent || this.finalized }, Validators.compose([Validators.required])]
          
   });
   this.dSectionForm=this.formBuilder.group({
        d1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d2: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d3: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d41: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d42: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])] ,
        d43: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d44: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],	
        d51: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d52: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d53: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d54: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d55: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d56: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d57: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d58: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d61: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d62: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d71: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d72: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d73: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d74: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d8: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d91: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d92: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d93: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d94: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d101: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d102: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d103: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d104: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d11: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d121: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d122: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d131: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d132: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d133: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d134: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d135: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d136: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d137: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d138: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d141: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d142: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d143: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d144: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d145: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d146: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d151: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d152: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d153: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d161: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d162: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d171: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d172: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])]

   });
   this.e1SectionForm=this.formBuilder.group({
        e111: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e112: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e121: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e122: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e13: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e14: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e15: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e16: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e17: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])]
   });
   this.e2SectionForm=this.formBuilder.group({
        e21: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e22: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e23: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e24: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e25: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e26: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e27: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e28: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e29: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e210: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e211: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e212: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e213: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e214: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e215: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e216: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e217: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e218: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e219: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e220: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e221: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e222: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e223: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e224: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e225: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e226: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e227: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e228: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e229: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e230: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e231: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e232: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e233: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e234: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e235: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e236: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],

   })
   this.e3SectionForm=this.formBuilder.group({
      e31: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e32: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e33: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e341: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e342: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e351: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e352: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e36: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e37: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e38: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e39: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e310: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e311: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e312: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e313: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.e4SectionForm=this.formBuilder.group({
      e41: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e42: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e43: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e44: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e45: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e46: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e47: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.e5SectionForm=this.formBuilder.group({
      e51: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e52: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e53: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e54: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e55: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e56: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e57: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e58: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e59: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e510: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e511: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e512: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e513: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.e6SectionForm=this.formBuilder.group({
      e61: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e62: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e63: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e64: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e65: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e66: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e67: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.e7SectionForm=this.formBuilder.group({
      e71: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e72: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e73: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e74: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e75: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e76: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e77: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.e8SectionForm=this.formBuilder.group({
      e81: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e82: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e83: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e84: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e85: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e86: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e87: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e88: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.e9SectionForm=this.formBuilder.group({
      e91: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e92: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e93: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e94: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.e10SectionForm=this.formBuilder.group({
      e101: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e102: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e103: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e104: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e105: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e106: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e107: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e108: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e109: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e1010: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e1011: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.e11SectionForm=this.formBuilder.group({
     
      e11g1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1111: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1112: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1113: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1114: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1115: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e11g2: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1121: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1122: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1123: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1124: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1125: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e11g3: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1131: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1132: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1133: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1134: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1135: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e11g4: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1141: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1142: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1143: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1144: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1145: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
   });
   this.f1SectionForm=this.formBuilder.group({
      f11: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f12: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f13: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f14: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f15: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f16: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f17: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f18: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f19: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f110: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f111: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.f2SectionForm=this.formBuilder.group({
      f21: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f22: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f23: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f24: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f25: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f26: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f27: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f28: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f29: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f210: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.f3SectionForm=this.formBuilder.group({
      f31: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f32: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f33: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f34: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f35: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f36: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f37: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f38: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f39: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f310: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.f4SectionForm=this.formBuilder.group({
      f41: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f42: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f43: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f44: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f45: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.f5SectionForm=this.formBuilder.group({
      f51: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f52: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f53: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f54: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f55: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f56: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f57: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f58: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.f6SectionForm=this.formBuilder.group({
      f61: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f62: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f63: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f64: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f65: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f66: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.f7SectionForm=this.formBuilder.group({
      f71: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f72: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f73: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f74: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f75: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f76: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f77: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f78: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f79: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f710: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f711: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });

  this.h1SectionForm=this.formBuilder.group({
      hA1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      hA2: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      hA2p1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      hA2p2: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      hA3: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      hA3p1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
  this.h2SectionForm=this.formBuilder.group({
      hB1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      hB2: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      hD1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  });
  this.h3SectionForm=this.formBuilder.group({
      hC1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      hC2: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  });
  this.h4SectionForm=this.formBuilder.group({
      hE1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      hE2p1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      hE2p2: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      hE2p3: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      hE2p4: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      hE2p5: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      hE3p1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      hE3p2: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      hE3p3: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      hE3p4: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      hE3p5: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  });
  this.h5SectionForm=this.formBuilder.group({
      hF1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      hF1p1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      hF1p2: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      hF1p2p1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      hF2: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  });
  this.i1SectionForm=this.formBuilder.group({
      iA1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      iA2: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  });
  this.i2SectionForm=this.formBuilder.group({
      iB1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      iB2: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      iB3: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      iB4: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      iB4p1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])]
  });
  this.i3SectionForm=this.formBuilder.group({
      iC1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      iC2: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      iC3: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  });
  this.i4SectionForm=this.formBuilder.group({
    iDA1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iDA2: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iDA3: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iDA3p1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iDA3p2: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iDA3p3: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iDA3p4: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iDA3p5: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iDA3p6: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iDA3p7: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],

    iDB1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iDB2: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iDB3: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],

    iDC1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iDC2: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iDC3: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],

    iDD1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iDD2: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iDD3: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],

    iDE1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iDE2: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iDE3: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iDE4: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iDE5: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iDE6: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  });
  this.i5SectionForm=this.formBuilder.group({
    iE1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iE2: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iE3: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iE4: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iE5: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iE6: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  }); 
  this.i6SectionForm=this.formBuilder.group({
    iF1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iF2: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iF3: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iF4: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  }); 
  this.i7SectionForm=this.formBuilder.group({
    iG1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iG2: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iG3: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iG3p1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iG4: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iG4p1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iG5: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iG6: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  }); 
  this.i8SectionForm=this.formBuilder.group({
    iH1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iH1p1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iH2: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  }); 
   this.geoSectionForm=this.formBuilder.group({
      f_img: [''],
      s_img: [''],
      geopoint: [''],
      img1: [''],
      img2: [''],
      img3: ['']
   });
   this.typeDetails = dataService.getTypeDetails();
   this.optionTypeDetails = (this.typeDetails.filter(d=>d.id === MessageProvider.TYPE_IDS.OPTION_TYPE_ID))[0].typeDetails;
   this.yesNoTypeDetails = (this.typeDetails.filter(d=>d.id === MessageProvider.TYPE_IDS.YES_NO_TYPE_ID))[0].typeDetails;
   this.npcdcsOptionDetails = (this.typeDetails.filter(d=>d.id === MessageProvider.TYPE_IDS.NPCDCS_TYPE_ID))[0].typeDetails;
  //  this.organisationTypeDetails = (this.typeDetails.filter(d=>d.id === MessageProvider.TYPE_IDS.ORGANIZATION_TYPE_ID))[0].typeDetails;
   this.levelTypeDetails = (this.typeDetails.filter(d=>d.id === MessageProvider.TYPE_IDS.LEVEL_TYPE_ID))[0].typeDetails;
   this.facilityTypeDetails = (this.typeDetails.filter(d=>d.id === MessageProvider.TYPE_IDS.FACILITY_TYPE_ID))[0].typeDetails; 
   this.facilityLevelTypeDetails = (this.typeDetails.filter(d=>d.id === MessageProvider.TYPE_IDS.FACILITY_LEVEL_TYPE_ID))[0].typeDetails; 
   this.facilityLevelTypeDetails = this.facilitylevelPipe.transform(this.facilityLevelTypeDetails, {});
   
  this.fetchAreas = this.dataService.getAreas();
  this.areas = this.area.convertToParentChild(this.fetchAreas);
  this.roles = this.dataService.getRoles();
  this.masterRoles = this.dataService.getRoles();
  this.designations = this.dataService.getDesignations();
  this.designationByOrg = this.designations.filter(d=> d.isResponsibleFacility);
  this.timelines = this.dataService.gettimeline();
  this.organisationTypeDetails = this.dataService.getOrganizations();
  this.planOfActionOrganizations = (this.organisationTypeDetails.filter(o=>o.isGovernmentOrg == true));

  if(this.ess.getPlatform().isAndroid){
    this.chooseImage = false;
  }

  if(this.obj.c2 != null){
    for(let i=0; i< this.organisationTypeDetails.length; i++){
      if(this.obj.c2 == this.organisationTypeDetails[i].id)
        this.organizationObject = this.organisationTypeDetails[i];
    }
  }

  // this.initializeSubSectionMaxScores()

}
/** 
 * This method will calculate max score of sub section "Antenatal Care" of 
 * section "Service delivery indicators", based of question 
 * F.1.1. Number of days ANC being conducted at facility in a week:
 * @author Jagat
 * @since 1.0.0
 */
validatef11(){
  
  if(this.obj.f11==0 || this.obj.f11==null || this.obj.f11==""){
    this.isf11 = false;
    this.obj.f12 = null;
    this.obj.f13 = null;
    this.obj.f14 = null;
    this.obj.f15 = null;
    this.obj.f16 = null;
    this.obj.f17 = null;
    this.obj.f18 = null;
    this.obj.f19 = null;
    this.obj.f110 = null;
    this.obj.f111 = null;
    this.facilityradioObj["f12"] = false;
    this.facilityradioObjTemp["f12"] = null
    this.f1SectionForm.controls["f12"].setErrors(null);
    this.facilityradioObj["f13"] = false;
    this.facilityradioObjTemp["f13"] = null
    this.f1SectionForm.controls["f13"].setErrors(null);
    this.facilityradioObj["f14"] = false;
    this.facilityradioObjTemp["f14"] = null
    this.f1SectionForm.controls["f14"].setErrors(null);
    this.facilityradioObj["f15"] = false;
    this.facilityradioObjTemp["f15"] = null
    this.f1SectionForm.controls["f15"].setErrors(null);
    this.facilityradioObj["f16"] = false;
    this.facilityradioObjTemp["f16"] = null
    this.f1SectionForm.controls["f16"].setErrors(null);
    this.facilityradioObj["f17"] = false;
    this.facilityradioObjTemp["f17"] = null
    this.f1SectionForm.controls["f17"].setErrors(null);
    this.facilityradioObj["f18"] = false;
    this.facilityradioObjTemp["f18"] = null
    this.f1SectionForm.controls["f18"].setErrors(null);
    this.facilityradioObj["f19"] = false;
    this.facilityradioObjTemp["f19"] = null
    this.f1SectionForm.controls["f19"].setErrors(null);
    this.facilityradioObj["f110"] = false;
    this.facilityradioObjTemp["f110"] = null
    this.f1SectionForm.controls["f110"].setErrors(null);
    this.facilityradioObj["f111"] = false;
    this.facilityradioObjTemp["f111"] = null
    this.f1SectionForm.controls["f111"].setErrors(null);
    for(let ids of [118,119,120,121,122,123,124,125,126,127]) {
        this.deleteRowsfromCounterObj(ids);
    }
   }else{
    this.calculateSubSectorMaxScore(this.selectedSubSectorNumber)
    this.isf11 = true;
  }
}
validatee11g1true(){
  if(this.obj.e11g1>0 && (this.obj.e1111>=0 && this.obj.e1112>=0 && this.obj.e1113>=0 && this.obj.e1114>=0 && this.obj.e1115>=0)){
    return true;
  }else{
    return false;
  }
}
validatee11g2true(){
  if(this.obj.e11g2>0 && (this.obj.e1121>=0 && this.obj.e1122>=0 && this.obj.e1123>=0 && this.obj.e1124>=0 && this.obj.e1125>=0)){
    return true;
  }else{
    return false;
  }
}
validatee11g3true(){
  if(this.obj.e11g3>0 && (this.obj.e1131>=0 && this.obj.e1132>=0 && this.obj.e1133>=0 && this.obj.e1134>=0 && this.obj.e1135>=0)){
    return true;
  }else{
    return false;
  }
}
validatee11g4true(){
  if(this.obj.e11g4>0 && (this.obj.e1141>=0 && this.obj.e1142>=0 && this.obj.e1143>=0 && this.obj.e1144>=0 && this.obj.e1145>=0)){
    return true;
  }else{
    return false;
  }
}

validatee11g1(){
  if(this.obj.e11g1==0 || this.obj.e11g1==null || this.obj.e11g1==""){
    this.ise11g1 = false;
    this.obj.e1111 = null;
    this.e11SectionForm.controls["e1111"].setErrors(null);
    this.obj.e1112 = null;
    this.e11SectionForm.controls["e1112"].setErrors(null);
    this.obj.e1113 = null;
    this.e11SectionForm.controls["e1113"].setErrors(null);
    this.obj.e1114 = null;
    this.e11SectionForm.controls["e1114"].setErrors(null);
    this.obj.e1115 = null;
    this.e11SectionForm.controls["e1115"].setErrors(null);
  }else if(this.obj.e11g1>0){
    this.ise11g1 = true;
  }
}
validatee11g2(){
  if(this.obj.e11g2==0 || this.obj.e11g2==null || this.obj.e11g2==""){
    this.ise11g2 = false;
    this.obj.e1121 = null;
    this.e11SectionForm.controls["e1121"].setErrors(null);
    this.obj.e1122 = null;
    this.e11SectionForm.controls["e1122"].setErrors(null);
    this.obj.e1123 = null;
    this.e11SectionForm.controls["e1123"].setErrors(null);
    this.obj.e1124 = null;
    this.e11SectionForm.controls["e1124"].setErrors(null);
    this.obj.e1125 = null;
    this.e11SectionForm.controls["e1125"].setErrors(null);
  }else if(this.obj.e11g2>0){
    this.ise11g2 = true;
  }
}
validatee11g3(){
  if(this.obj.e11g3==0 || this.obj.e11g3==null || this.obj.e11g3==""){
    this.ise11g3 = false;
    this.obj.e1131 = null;
    this.e11SectionForm.controls["e1131"].setErrors(null);
    this.obj.e1132 = null;
    this.e11SectionForm.controls["e1132"].setErrors(null);
    this.obj.e1133 = null;
    this.e11SectionForm.controls["e1133"].setErrors(null);
    this.obj.e1134 = null;
    this.e11SectionForm.controls["e1134"].setErrors(null);
    this.obj.e1135 = null;
    this.e11SectionForm.controls["e1135"].setErrors(null);
  }else if(this.obj.e11g3>0){
    this.ise11g3 = true;
  }
}
validatee11g4(){
  if(this.obj.e11g4==0 || this.obj.e11g4==null || this.obj.e11g4==""){
    this.ise11g4 = false;
    this.obj.e1141 = null;
    this.e11SectionForm.controls["e1141"].setErrors(null);
    this.obj.e1142 = null;
    this.e11SectionForm.controls["e1142"].setErrors(null);
    this.obj.e1143 = null;
    this.e11SectionForm.controls["e1143"].setErrors(null);
    this.obj.e1144 = null;
    this.e11SectionForm.controls["e1144"].setErrors(null);
    this.obj.e1145 = null;
    this.e11SectionForm.controls["e1145"].setErrors(null);
  }else if(this.obj.e11g4>0){
    this.ise11g4 = true;
  }
}
resize(myInput) {
 let textareaelement = myInput["_elementRef"].nativeElement;
 textareaelement.children[0].style.height = textareaelement.children[0].scrollHeight + 'px';
}
ionViewDidLoad() {
window.addEventListener('native.keyboardshow', function(){
    document.body.classList.add('keyboard-open');
  });
  if(this.navParams.data.id != undefined){
    if(document.getElementById('c_id')!=null){
          this.setPercentCSS('c_id',this.progressBarObj.loadProgress);
    }
  }

 if(this.navParams.data.id === undefined){
  this.obj.e_RH_score=0;
  this.obj.e_MHDS_score=0;
  this.obj.e_NHDS_score=0;
  this.obj.e_CHDS_score=0;
  this.obj.e_Vaccines_score=0;
  this.obj.e_Antibiotics_score=0;
  this.obj.e_Infrastructure_score=0;
  this.obj.e_IP_score=0;
  this.obj.e_AHDS_score=0;
  this.obj.e_OE_score=0;
  this.obj.f_ANC_score=0;
  this.obj.f_IPIP_score=0;
  this.obj.f_ENCR_score=0;
  this.obj.f_FP_score=0;
  this.obj.f_CS_score=0;
  this.obj.f_FMO_score=0;
  this.obj.f_AH_score=0;
  this.obj.e_total_score=0;
  this.obj.f_total_score=0;
  this.obj.note_SC_1 = 0;
  this.obj.note_SC_2 = 0;
  this.obj.note_SC = 0;
  this.obj.note_Non_24x7_PHC_1 = 0;
  this.obj.note_Non_24x7_PHC_2 = 0;
  this.obj.note_Non_24x7_PHC = 0;
  this.obj.note_24x7_PHC_1 = 0;
  this.obj.note_24x7_PHC_2 = 0;
  this.obj.note_24x7_PHC = 0;
  this.obj.note_Non_FRU_CHC_1 = 0;
  this.obj.note_Non_FRU_CHC_2 = 0;
  this.obj.note_Non_FRU_CHC = 0;
  this.obj.note_FRU_CHC_1 = 0;
  this.obj.note_FRU_CHC_2 = 0;
  this.obj.note_FRU_CHC = 0;
  this.obj.note_SDH_1 = 0;
  this.obj.note_SDH_2 = 0;
  this.obj.note_SDH = 0;
  this.obj.note_DH_1 = 0;
  this.obj.note_DH_2 = 0;
  this.obj.note_DH = 0;
  this.obj.note_Area_Hospital_1 = 0;
  this.obj.note_Area_Hospital_2 = 0;
  this.obj.note_Area_Hospital = 0;
  this.obj.note_MC_1 = 0;
  this.obj.note_MC_2 = 0;
  this.obj.note_MC = 0;
  this.obj.note_max_SC_1 = null,
  this.obj.note_max_SC_2 = null,
  this.obj.note_max_SC = null,
  this.obj.note_max_Non_24x7_PHC_1 = null,
  this.obj.note_max_Non_24x7_PHC_2 = null,
  this.obj.note_max_Non_24x7_PHC = null,
  this.obj.note_max_24x7_PHC_1 = null,
  this.obj.note_max_24x7_PHC_2 = null,
  this.obj.note_max_24x7_PHC = null,
  this.obj.note_max_Non_FRU_CHC_1 = null,
  this.obj.note_max_Non_FRU_CHC_2 = null,
  this.obj.note_max_Non_FRU_CHC = null,
  this.obj.note_max_FRU_CHC_1 = null,
  this.obj.note_max_FRU_CHC_2 = null,
  this.obj.note_max_FRU_CHC = null,
  this.obj.note_max_SDH_1 = null,
  this.obj.note_max_SDH_2 = null,
  this.obj.note_max_SDH = null,
  this.obj.note_max_DH_1 = null,
  this.obj.note_max_DH_2 = null,
  this.obj.note_max_DH = null,
  this.obj.note_max_Area_Hospital_1 = null,
  this.obj.note_max_Area_Hospital_2 = null,
  this.obj.note_max_Area_Hospital = null,
  this.obj.note_max_MC_1 = null,
  this.obj.note_max_MC_2 = null,
  this.obj.note_max_MC = null

 }
      
  //  this.states = this.area.transform(this.areas, {level: 2, parentAreaId: 1});
   this.countries = this.areas.children;
   this.states = this.countries[0].children;
 //  this.statename=this.states[0].name;

   if(this.obj.state != null){
      // this.districts = this.area.transform(this.areas, {level: 3, parentAreaId: parseInt(this.obj.state)});
      for(let i=0; i< this.states.length; i++){
        if(this.obj.state == this.states[i].areaNId)
          this.stateObject = this.states[i];
      }
      
   
      this.districts = this.stateObject.children;

      if(this.obj.district != null){
        for(let i=0; i< this.districts.length; i++){
          if(this.obj.district == this.districts[i].areaNId)
            this.districtObject = this.districts[i];
        }
        this.blocks = this.districtObject.children.filter(block => block.level == 4 
          && block.parentAreaId == this.districtObject.areaNId);
        this.facilities = this.districtObject.children.filter(facility => facility.level == 5 
          && facility.parentAreaId == this.districtObject.areaNId);
      }

      if(this.obj.block != null){
        this.facilities = [];
        for(let i=0; i< this.blocks.length; i++){
          if(this.obj.block == this.blocks[i].areaNId)
            this.blockObject = this.blocks[i];
        }
        this.facilities = this.blockObject.children;
      }

      if(this.obj.c5 != null){
        for(let i=0; i< this.facilities.length; i++){
          if(this.obj.c5 == this.facilities[i].areaNId)
            this.facilityObject = this.facilities[i];
        }
        this.messageService.presentLoading("Validating, please wait...");
        this.dataService.getPreviousDataFromDB(this.obj.c5, MessageProvider.CHECKLIST_ID.FACILITY);
      }

      if(this.obj.c43 != null){
        for(let i=0; i< this.facilityTypeDetails.length; i++){
          if(this.obj.c43 == this.facilityTypeDetails[i].id)
            this.facilityTypeObject = this.facilityTypeDetails[i];
        }
        if(this.obj.c43==17){
          this.roles = [];
          this.roles = this.masterRoles.filter(r => r.roleCode != MessageProvider.ROLE_CODE.BLOCK);
        }
      }
   }else{
     if(this.states.length == 1){
        this.stateObject = this.states[0];
        this.obj.state = this.stateObject.areaNId;       
        this.obj.district = null;   
        this.districts = this.stateObject.children;
        this.obj.block = null;
        this.blocks = [];
        this.obj.c5 = null;
        this.facilities = []; 
     }
   }

   if(this.obj.c2 != null){
    for(let i=0; i< this.organisationTypeDetails.length; i++){
      if(this.obj.c2 == this.organisationTypeDetails[i].id)
        this.organizationObject = this.organisationTypeDetails[i];
    }
   }
  
   if(this.obj.geopoint != null){
     this.gpsFlag = true;
     this.latitude = this.obj.geopoint.split(",")[0];
     this.longitude = this.obj.geopoint.split(",")[1];
   }

   this.navBar.backButtonClick = (e:UIEvent)=>{
      this.cancel();
   }
  }

  scroll(){
    this.content.scrollToTop(300);//300ms animation speed
  }


  /*

 */

 /**
  * @Author: Ratikanta Pradhan 
  * @email:   ratikanta@sdrc.co.in 
  * @Last Modified by: Ratikanta Pradhan
  * @Last Modified time: 09-10-2017 15:21
  */

 ngOnInit():void {


    this.events.subscribe(MessageProvider.EVENTS.FACILITY_DATA_SAVE_EVENT, (flag, message) => {      
          if(flag){
            if(message){              
              this.saveToast(MessageProvider.MESSAGES.FINALIZE_SUCCESSFULL);    
            }else{              
              this.saveToast(MessageProvider.MESSAGES.SAVE_SUCCESSFULL);               
            }
            this.navCtrl.pop();
          }else{
            this.errorToast(message);            
          }        
    });

    //subscribe to facility validated publish
    this.events.subscribe(MessageProvider.EVENTS.FACILITY_VALIDATED, (errorFlag,errorMessage, data, pvDataObj) => {      

          this.messageService.dismissLoading();
          if(!errorFlag){
              if(data){
                  this.errorToast("You have already filled data for this facility today." +
                  "<br><br>Please go to Edit Saved Form if you have not finalized the record.");
                  this.facilityObject = null;
              }else{
                this.obj.c5 = this.facilityObject.areaNId;
                this.formInfo.facilityName = this.facilityObject.name;
                this.isLvData = pvDataObj.isPvData;

                if(pvDataObj && pvDataObj.isPvData){
                  this.lvobj = pvDataObj.pvData;
                  this.obj.lastVisitPlanOfAction = this.lvobj;
                }else{
                  this.obj.lastVisitPlanOfAction = [];
                }
              }
          }else{                                    
            this.facilityObject = null;
            this.errorToast(errorMessage);
          }                  
    });

    this.events.subscribe(MessageProvider.EVENTS.PREFETCH_PROCESS_COMPLETE, (flag, pvDataObj) => {
      let temp = this;
      temp.messageService.dismissLoading();
      if (flag) {
          temp.isLvData = pvDataObj.isPvData;

          if (pvDataObj && pvDataObj.isPvData) {
            temp.lvobj = pvDataObj.pvData;
          }
      }
    });


    /**
     * @author Jagat Bandhu
     */
    this.events.subscribe(MessageProvider.EVENTS.DISSMISS_LOADER_FACILITY,() => {
      this.backButtonStatus = true;
      this.gpsFlag = false
      this.obj.geopoint = null;
      this.messageService.dismissLoading();
    });
    
    if(this.navParams.data.id === undefined){  
       this.obj.planOfAction = [];   
    }else{
      this.cSectionForm = this.formBuilder.group({
          state: [{ value: this.obj.state, disabled: this.sent || this.finalized || this.forEdit}],
          c1: [{ value: this.obj.c1, disabled: this.sent || this.finalized || true}, Validators.compose([Validators.required])],
          c11: [{ value: this.obj.c11, disabled: this.sent || this.finalized || true}, Validators.compose([Validators.required])],
          c2:[{ value: this.obj.c2, disabled: true || this.finalized},Validators.compose([Validators.required])],
          c3:[{ value: this.obj.c3, disabled: this.sent || this.finalized || true},Validators.compose([Validators.required])],
          c5:[{ value: this.obj.c5, disabled: this.sent || this.finalized || this.forEdit}],
          c43:[{ value: this.obj.c43, disabled: this.sent || this.finalized || this.forEdit}],
          c6:[{ value: this.obj.c6, disabled: this.sent || this.finalized || this.forEdit}],
          c8: [{ value: this.obj.c8, disabled: this.sent || this.finalized }, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z .,]+$')])],
          c9:[{ value: this.obj.c9, disabled: this.sent || this.finalized}, Validators.compose([Validators.required])],
          district: [{ value: this.obj.district, disabled: this.sent || this.finalized || this.forEdit}],
          block: [{ value: this.obj.block, disabled: this.sent || this.finalized || this.forEdit}],
          c51:[{ value: this.obj.c51, disabled: this.sent || this.finalized},Validators.compose([Validators.required])]
   });
   this.dSectionForm=this.formBuilder.group({
        d1: [{ value: this.obj.d1, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d2: [{ value: this.obj.d2, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d3: [{ value: this.obj.d3, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d41: [{ value: this.obj.d41, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d42: [{ value: this.obj.d42, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])] ,
        d43: [{ value: this.obj.d43, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d44: [{ value: this.obj.d44, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],	
        d51: [{ value: this.obj.d51, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d52: [{ value: this.obj.d52, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d53: [{ value: this.obj.d53, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d54: [{ value: this.obj.d54, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d55: [{ value: this.obj.d55, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d56: [{ value: this.obj.d56, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d57: [{ value: this.obj.d57, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d58: [{ value: this.obj.d58, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d61: [{ value: this.obj.d61, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d62: [{ value: this.obj.d62, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d71: [{ value: this.obj.d71, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d72: [{ value: this.obj.d72, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d73: [{ value: this.obj.d73, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d74: [{ value: this.obj.d74, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d8: [{ value: this.obj.d8, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d91: [{ value: this.obj.d91, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d92: [{ value: this.obj.d92, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d93: [{ value: this.obj.d93, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d94: [{ value: this.obj.d94, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d101: [{ value: this.obj.d101, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d102: [{ value: this.obj.d102, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d103: [{ value: this.obj.d103, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d104: [{ value: this.obj.d104, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d11: [{ value: this.obj.d11, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d121: [{ value: this.obj.d121, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d122: [{ value: this.obj.d122, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d131: [{ value: this.obj.d131, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d132: [{ value: this.obj.d132, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d133: [{ value: this.obj.d133, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d134: [{ value: this.obj.d134, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d135: [{ value: this.obj.d135, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d136: [{ value: this.obj.d136, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d137: [{ value: this.obj.d137, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d138: [{ value: this.obj.d138, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d141: [{ value: this.obj.d141, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d142: [{ value: this.obj.d142, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d143: [{ value: this.obj.d143, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d144: [{ value: this.obj.d144, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d145: [{ value: this.obj.d145, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d146: [{ value: this.obj.d146, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d151: [{ value: this.obj.d151, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d152: [{ value: this.obj.d152, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d153: [{ value: this.obj.d153, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d161: [{ value: this.obj.d161, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d162: [{ value: this.obj.d162, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d171: [{ value: this.obj.d171, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
        d172: [{ value: this.obj.d172, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])]

   });
   this.e1SectionForm=this.formBuilder.group({
        e111: [{ value: this.obj.e111, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e112: [{ value: this.obj.e112, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e121: [{ value: this.obj.e121, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e122: [{ value: this.obj.e122, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e13: [{ value: this.obj.e13, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e14: [{ value: this.obj.e14, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e15: [{ value: this.obj.e15, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e16: [{ value: this.obj.e16, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e17: [{ value: this.obj.e17, disabled: this.sent || this.finalized},Validators.compose([Validators.required])]
   });
   this.e2SectionForm=this.formBuilder.group({
        e21: [{ value: this.obj.e21, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e22: [{ value: this.obj.e22, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e23: [{ value: this.obj.e23, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e24: [{ value: this.obj.e24, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e25: [{ value: this.obj.e25, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e26: [{ value: this.obj.e26, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e27: [{ value: this.obj.e27, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e28: [{ value: this.obj.e28, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e29: [{ value: this.obj.e29, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e210: [{ value: this.obj.e210, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e211: [{ value: this.obj.e211, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e212: [{ value: this.obj.e212, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e213: [{ value: this.obj.e213, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e214: [{ value: this.obj.e214, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e215: [{ value: this.obj.e215, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e216: [{ value: this.obj.e216, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e217: [{ value: this.obj.e217, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e218: [{ value: this.obj.e218, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e219: [{ value: this.obj.e219, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e220: [{ value: this.obj.e220, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e221: [{ value: this.obj.e221, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e222: [{ value: this.obj.e222, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e223: [{ value: this.obj.e223, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e224: [{ value: this.obj.e224, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e225: [{ value: this.obj.e225, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e226: [{ value: this.obj.e226, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e227: [{ value: this.obj.e227, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e228: [{ value: this.obj.e228, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e229: [{ value: this.obj.e229, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e230: [{ value: this.obj.e230, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e231: [{ value: this.obj.e231, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e232: [{ value: this.obj.e232, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e233: [{ value: this.obj.e233, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e234: [{ value: this.obj.e234, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e235: [{ value: this.obj.e235, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
        e236: [{ value: this.obj.e236, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],

   })
   this.e3SectionForm=this.formBuilder.group({
      e31: [{ value: this.obj.e31, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e32: [{ value: this.obj.e32, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e33: [{ value: this.obj.e33, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e341: [{ value: this.obj.e341, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e342: [{ value: this.obj.e342, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e351: [{ value: this.obj.e351, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e352: [{ value: this.obj.e352, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e36: [{ value: this.obj.e36, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e37: [{ value: this.obj.e37, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e38: [{ value: this.obj.e38, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e39: [{ value: this.obj.e39, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e310: [{ value: this.obj.e310, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e311: [{ value: this.obj.e311, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e312: [{ value: this.obj.e312, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e313: [{ value: this.obj.e313, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.e4SectionForm=this.formBuilder.group({
      e41: [{ value: this.obj.e41, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e42: [{ value: this.obj.e42, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e43: [{ value: this.obj.e43, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e44: [{ value: this.obj.e44, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e45: [{ value: this.obj.e45, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e46: [{ value: this.obj.e46, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e47: [{ value: this.obj.e47, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.e5SectionForm=this.formBuilder.group({
      e51: [{ value: this.obj.e51, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e52: [{ value: this.obj.e52, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e53: [{ value: this.obj.e53, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e54: [{ value: this.obj.e54, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e55: [{ value: this.obj.e55, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e56: [{ value: this.obj.e56, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e57: [{ value: this.obj.e57, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e58: [{ value: this.obj.e58, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e59: [{ value: this.obj.e59, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e510: [{ value: this.obj.e510, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e511: [{ value: this.obj.e511, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e512: [{ value: this.obj.e512, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e513: [{ value: this.obj.e513, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.e6SectionForm=this.formBuilder.group({
      e61: [{ value: this.obj.e61, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e62: [{ value: this.obj.e62, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e63: [{ value: this.obj.e63, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e64: [{ value: this.obj.e64, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e65: [{ value: this.obj.e65, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e66: [{ value: this.obj.e66, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e67: [{ value: this.obj.e67, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.e7SectionForm=this.formBuilder.group({
      e71: [{ value: this.obj.e71, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e72: [{ value: this.obj.e72, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e73: [{ value: this.obj.e73, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e74: [{ value: this.obj.e74, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e75: [{ value: this.obj.e75, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e76: [{ value: this.obj.e76, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e77: [{ value: this.obj.e77, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.e8SectionForm=this.formBuilder.group({
      e81: [{ value: this.obj.e81, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e82: [{ value: this.obj.e82, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e83: [{ value: this.obj.e83, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e84: [{ value: this.obj.e84, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e85: [{ value: this.obj.e85, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e86: [{ value: this.obj.e86, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e87: [{ value: this.obj.e87, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e88: [{ value: this.obj.e88, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.e9SectionForm=this.formBuilder.group({
      e91: [{ value: this.obj.e91, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e92: [{ value: this.obj.e92, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e93: [{ value: this.obj.e93, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e94: [{ value: this.obj.e94, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.e10SectionForm=this.formBuilder.group({
      e101: [{ value: this.obj.e101, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e102: [{ value: this.obj.e102, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e103: [{ value: this.obj.e103, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e104: [{ value: this.obj.e104, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e105: [{ value: this.obj.e105, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e106: [{ value: this.obj.e106, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e107: [{ value: this.obj.e107, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e108: [{ value: this.obj.e108, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e109: [{ value: this.obj.e109, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e1010: [{ value: this.obj.e1010, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      e1011: [{ value: this.obj.e1011, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.e11SectionForm=this.formBuilder.group({
     
      e11g1: [{ value: this.obj.e11g1, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1111: [{ value: this.obj.e1111, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1112: [{ value: this.obj.e1112, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1113: [{ value: this.obj.e1113, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1114: [{ value: this.obj.e1114, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1115: [{ value: this.obj.e1115, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e11g2: [{ value: this.obj.e11g2, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1121: [{ value: this.obj.e1121, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1122: [{ value: this.obj.e1122, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1123: [{ value: this.obj.e1123, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1124: [{ value: this.obj.e1124, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1125: [{ value: this.obj.e1125, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e11g3: [{ value: this.obj.e11g3, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1131: [{ value: this.obj.e1131, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1132: [{ value: this.obj.e1132, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1133: [{ value: this.obj.e1133, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1134: [{ value: this.obj.e1134, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1135: [{ value: this.obj.e1135, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e11g4: [{ value: this.obj.e11g4, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1141: [{ value: this.obj.e1141, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1142: [{ value: this.obj.e1142, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1143: [{ value: this.obj.e1143, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1144: [{ value: this.obj.e1144, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
      e1145: [{ value: this.obj.e1145, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
   });
   this.f1SectionForm=this.formBuilder.group({
      f11: [{ value: this.obj.f11, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f12: [{ value: this.obj.f12, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f13: [{ value: this.obj.f13, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f14: [{ value: this.obj.f14, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f15: [{ value: this.obj.f15, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f16: [{ value: this.obj.f16, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f17: [{ value: this.obj.f17, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f18: [{ value: this.obj.f18, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f19: [{ value: this.obj.f19, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f110: [{ value: this.obj.f110, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f111: [{ value: this.obj.f111, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.f2SectionForm=this.formBuilder.group({
      f21: [{ value: this.obj.f21, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f22: [{ value: this.obj.f22, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f23: [{ value: this.obj.f23, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f24: [{ value: this.obj.f24, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f25: [{ value: this.obj.f25, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f26: [{ value: this.obj.f26, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f27: [{ value: this.obj.f27, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f28: [{ value: this.obj.f28, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f29: [{ value: this.obj.f29, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f210: [{ value: this.obj.f210, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.f3SectionForm=this.formBuilder.group({
      f31: [{ value: this.obj.f31, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f32: [{ value: this.obj.f32, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f33: [{ value: this.obj.f33, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f34: [{ value: this.obj.f34, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f35: [{ value: this.obj.f35, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f36: [{ value: this.obj.f36, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f37: [{ value: this.obj.f37, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f38: [{ value: this.obj.f38, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f39: [{ value: this.obj.f39, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f310: [{ value: this.obj.f310, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.f4SectionForm=this.formBuilder.group({
      f41: [{ value: this.obj.f41, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f42: [{ value: this.obj.f42, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f43: [{ value: this.obj.f43, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f44: [{ value: this.obj.f44, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f45: [{ value: this.obj.f45, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.f5SectionForm=this.formBuilder.group({
      f51: [{ value: this.obj.f51, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f52: [{ value: this.obj.f52, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f53: [{ value: this.obj.f53, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f54: [{ value: this.obj.f54, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f55: [{ value: this.obj.f55, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f56: [{ value: this.obj.f56, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f57: [{ value: this.obj.f57, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f58: [{ value: this.obj.f58, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.f6SectionForm=this.formBuilder.group({
      f61: [{ value: this.obj.f61, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f62: [{ value: this.obj.f62, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f63: [{ value: this.obj.f63, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f64: [{ value: this.obj.f64, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f65: [{ value: this.obj.f65, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f66: [{ value: this.obj.f66, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.f7SectionForm=this.formBuilder.group({
      f71: [{ value: this.obj.f71, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f72: [{ value: this.obj.f72, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f73: [{ value: this.obj.f73, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f74: [{ value: this.obj.f74, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f75: [{ value: this.obj.f75, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f76: [{ value: this.obj.f76, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f77: [{ value: this.obj.f77, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f78: [{ value: this.obj.f78, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f79: [{ value: this.obj.f79, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f710: [{ value: this.obj.f710, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      f711: [{ value: this.obj.f711, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
   this.h1SectionForm=this.formBuilder.group({
    hA1: [{ value: this.obj.hA1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    hA2: [{ value: this.obj.hA2, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    hA2p1: [{ value: this.obj.hA2p1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    hA2p2: [{ value: this.obj.hA2p2, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    hA3: [{ value: this.obj.hA3, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    hA3p1: [{ value: this.obj.hA3p1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
 });
this.h2SectionForm=this.formBuilder.group({
    hB1: [{ value: this.obj.hB1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    hB2: [{ value: this.obj.hB2, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    hD1: [{ value: this.obj.hD1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
});
this.h3SectionForm=this.formBuilder.group({
    hC1: [{ value: this.obj.hC1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    hC2: [{ value: this.obj.hC2, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
});
this.h4SectionForm=this.formBuilder.group({
    hE1: [{ value: this.obj.hE1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    hE2p1: [{ value: this.obj.hE2p1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    hE2p2: [{ value: this.obj.hE2p2, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    hE2p3: [{ value: this.obj.hE2p3, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    hE2p4: [{ value: this.obj.hE2p4, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    hE2p5: [{ value: this.obj.hE2p5, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    hE3p1: [{ value: this.obj.hE3p1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    hE3p2: [{ value: this.obj.hE3p2, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    hE3p3: [{ value: this.obj.hE3p3, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    hE3p4: [{ value: this.obj.hE3p4, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    hE3p5: [{ value: this.obj.hE3p5, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
});
this.h5SectionForm=this.formBuilder.group({
    hF1: [{ value: this.obj.hF1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    hF1p1: [{ value: this.obj.hF1p1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    hF1p2: [{ value: this.obj.hF1p2, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    hF1p2p1: [{ value: this.obj.hF1p2p1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    hF2: [{ value: this.obj.hF2, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
});
this.i1SectionForm=this.formBuilder.group({
    iA1: [{ value: this.obj.iA1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iA2: [{ value: this.obj.iA2, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
});
this.i2SectionForm=this.formBuilder.group({
    iB1: [{ value: this.obj.iB1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iB2: [{ value: this.obj.iB2, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iB3: [{ value: this.obj.iB3, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iB4: [{ value: this.obj.iB4, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iB4p1: [{ value: this.obj.iB4p1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])]
});
this.i3SectionForm=this.formBuilder.group({
    iC1: [{ value: this.obj.iC1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iC2: [{ value: this.obj.iC2, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iC3: [{ value: this.obj.iC3, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
});
this.i4SectionForm=this.formBuilder.group({
  iDA1: [{ value: this.obj.iDA1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  iDA2: [{ value: this.obj.iDA2, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  iDA3: [{ value: this.obj.iDA3, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  iDA3p1: [{ value: this.obj.iDA3p1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  iDA3p2: [{ value: this.obj.iDA3p2, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  iDA3p3: [{ value: this.obj.iDA3p3, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  iDA3p4: [{ value: this.obj.iDA3p4, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  iDA3p5: [{ value: this.obj.iDA3p5, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  iDA3p6: [{ value: this.obj.iDA3p6, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  iDA3p7: [{ value: this.obj.iDA3p7, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],

  iDB1: [{ value: this.obj.iDB1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  iDB2: [{ value: this.obj.iDB2, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  iDB3: [{ value: this.obj.iDB3, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],

  iDC1: [{ value: this.obj.iDC1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  iDC2: [{ value: this.obj.iDC2, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  iDC3: [{ value: this.obj.iDC3, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],

  iDD1: [{ value: this.obj.iDD1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  iDD2: [{ value: this.obj.iDD2, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  iDD3: [{ value: this.obj.iDD3, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],

  iDE1: [{ value: this.obj.iDE1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  iDE2: [{ value: this.obj.iDE2, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  iDE3: [{ value: this.obj.iDE3, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  iDE4: [{ value: this.obj.iDE4, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  iDE5: [{ value: this.obj.iDE5, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  iDE6: [{ value: this.obj.iDE6, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
});
this.i5SectionForm=this.formBuilder.group({
    iE1: [{ value: this.obj.iE1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iE2: [{ value: this.obj.iE2, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iE3: [{ value: this.obj.iE3, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iE4: [{ value: this.obj.iE4, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iE5: [{ value: this.obj.iE5, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iE6: [{ value: this.obj.iE6, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  }); 
  this.i6SectionForm=this.formBuilder.group({
    iF1: [{ value: this.obj.iF1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iF2: [{ value: this.obj.iF2, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iF3: [{ value: this.obj.iF3, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iF4: [{ value: this.obj.iF4, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  }); 
  this.i7SectionForm=this.formBuilder.group({
    iG1: [{ value: this.obj.iG1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iG2: [{ value: this.obj.iG2, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iG3: [{ value: this.obj.iG3, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iG3p1: [{ value: this.obj.iG3p1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iG4: [{ value: this.obj.iG4, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iG4p1: [{ value: this.obj.iG4p1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iG5: [{ value: this.obj.iG5, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iG6: [{ value: this.obj.iG6, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  }); 
  this.i8SectionForm=this.formBuilder.group({
    iH1: [{ value: this.obj.iH1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iH1p1: [{ value: this.obj.iH1p1, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
    iH2: [{ value: this.obj.iH2, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  }); 
   this.geoSectionForm=this.formBuilder.group({
      f_img: [{ value: this.obj.f_img, disabled: this.sent || this.finalized}],
      s_img: [{ value: this.obj.s_img, disabled: this.sent || this.finalized}],
      geopoint: [{ value: this.obj.geopoint, disabled: this.sent || this.finalized}],
      img1: [{ value: this.obj.img1, disabled: this.sent || this.finalized}],
      img2: [{ value: this.obj.img2, disabled: this.sent || this.finalized}],
      img3: [{ value: this.obj.img3, disabled: this.sent || this.finalized}]
   });
    }

  this.events.subscribe(MessageProvider.CLOSE_ALERTS.FACILITY, obj => {
    this.closeAllPopups();
  });

}

errorToast(message) {
  var temp = this;
  temp.alert1 = this.alertCtrl.create({
    enableBackdropDismiss: false
  });
  temp.alert1.setCssClass('sectorSelectionModalCommunity');
  temp.alert1.setTitle("Error");
  temp.alert1.setMessage(message);
  temp.alert1.addButton({
    text: "Ok",
    handler: data => {
      temp.alert1.dismiss;
    }
  });
  temp.alert1.present();
}

saveToast(message) {
  var temp = this;
  temp.alert2 = this.alertCtrl.create({
    enableBackdropDismiss: false
  });
  temp.alert2.setCssClass('sectorSelectionModalCommunity');
  temp.alert2.setTitle("Info");
  temp.alert2.setMessage(message);
  temp.alert2.addButton({
    text: "Ok",
    handler: data => {
      temp.alert2.dismiss;
    }
  });
  temp.alert2.present();
}


/**
 * Default camera options
 */
options: CameraOptions = {
  quality: 40,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE,
  // targetWidth: 250,
  // targetHeight: 250
}

/**
 * This method will be used for capturing images
 * @auther Ratikanta
 */
captureImage(qNo){
  if(this.platform.is('core') || this.platform.is('mobileweb')){
    this.messageService.showErrorAlert("This feature is not availble in browsers");    
  }else{
    this.camera.getPicture(this.options).then((imageData) => {
      switch(qNo){
        case "img1": 
        this.obj.img1 = 'data:image/jpeg;base64,' + imageData;
        break;
        case "img2": this.obj.img2 = 'data:image/jpeg;base64,' + imageData;
        break
        case "img3": 
        this.obj.img3 = 'data:image/jpeg;base64,' + imageData;
        break;
      }
    }, (err) => {
      console.log(err);
      this.messageService.showErrorAlert(MessageProvider.MESSAGES.ERROR_IN_CAPTURING_IMAGE);
    });
  }
}
/**
 * ?
 */
handleInputChange(e,type){
this.imageType = type;
  var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if(file !== undefined){
      var pattern = /image-*/;
      var reader = new FileReader();

      if (!file.type.match(pattern)) {
        this.messageService.showErrorAlert("Invalid image format.");
        return;
      }else if(this.is_web == true && file.size>500000){
        this.presentToast("File size should not exceed 500kb.");
        var input = document.getElementById(this.imageType) as HTMLInputElement;
        input.value = "";
        return;
      }else{
        this.lastChoosenFileName = file.name;
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
      }
    }
}
/**
 * ?
 */
_handleReaderLoaded(e) {
        var reader = e.target;
        this.imageSrc = reader.result;
        if(this.imageType == 'img1'){
          this.obj.img1 = this.imageSrc;
        }else if(this.imageType == 'img2'){
          this.obj.img2 = this.imageSrc;
        } else{
          this.obj.img3 = this.imageSrc;
        }
     
    }
/**
 * This method gets called when we select a sector from sector dropdown
 */
  onclickSelect(){
    if(this.obj.c43==null || this.obj.c5==null || this.obj.c6==null){
        this.presentToast("Please select both facility, facility type and facility level before selecting any other section");
      }
  }
  onclickSelectDistrict(){
    if(this.obj.state==null){
        this.presentToast("Please select the state before selecting district");
      }
  }
  onclickSelectFacilityType(){
    if(this.obj.district==null){
        this.presentToast("Please select the district before selecting facility type");
      } 
  }
  onclickSelectBlock(){
    if(this.obj.district==null){
        this.presentToast("Please select the district before selecting block");
      }
  }
  onclickSelectFacility(){
    if(this.obj.c43==null)
    { 
      this.presentToast("Please select the facility type before selecting facility");
    }else{
      if(this.obj.c43!=17)
      {
        if(this.obj.block==null)
        {
          this.presentToast("Please select the block before selecting facility");
        } 
      }
    }
  }
  onclickSelectFacilityLevel(){
    if(this.obj.c5==null){
      this.presentToast("Please select the facility before selecting facility level");
    }
  }
  onclickSelectOrganization(){
    let listofObject: any = this.obj.planOfAction[this.obj.planOfAction.length - 1];
    if(listofObject.levelOfIntervention == null){
      this.presentToast("Please select the Intervention level before selecting organization");
    }
  }
  onclickSelectResponsibility(){
    let listofObject: any = this.obj.planOfAction[this.obj.planOfAction.length - 1];
    if(listofObject.organizationId == null){
      this.presentToast("Please select the organization before selecting responsibility");
    }
  }
  emailValidation() {
    var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let splitvalObj = this.obj.c9 != null ? this.obj.c9.split(/[ ,]+/) : null;
    if (splitvalObj != null) {
      for (let val of splitvalObj) {
        if (!EMAIL_REGEXP.test(val)) {
          this.cSectionForm.controls['c9'].setErrors({ "c13_mismatch": true });
        } else {
          this.cSectionForm.controls['c9'].setErrors(null);
        }
      }
    }
  }

  sectorSelected(){
    var temp = this;
      this.scroll();
      this.sectorOrSubsectorNumber = 0;
      this.selectedSectorNumber = parseInt(this.selectedSector);
      this.sectorSelectionWork();
      this.facilityTypeWiseScore(); 
      this.emailValidation();
      this.calculateSubSectorMaxScore(this.selectedSubSectorNumber) 
      this.changeProgressBarPercentageValue(this.selectedSubSectorNumber)
    if (this.obj.planOfAction.length > 0) {
          this.toggleGroup(this.shownGroup);
          if (!this.enableAdd && this.objectPlanofAction.sectionType !== this.sectorOrSubsectorNumber) {
            temp.alert3 = this.alertCtrl.create({ enableBackdropDismiss: false });
            temp.alert3.setCssClass('sectorSelectionModalFacility');
            temp.alert3.setTitle(MessageProvider.MESSAGES.FACILITY_PAGE_CANCEL_CONFIRM_TITLE);
            temp.alert3.setMessage(MessageProvider.MESSAGES.FACILITY_PAGE_PLAN_OF_ACTION_CONFIRM_MESSAGE_FOR_SECTOR);
            temp.alert3.addButton({
              text: MessageProvider.MESSAGES.FACILITY_COMMUNITY_PAGE_CANCEL_CONFIRM_NEGATIVE_TEXT,
              role: 'cancel',
              handler: data => {
                this.selectedSector = "8";
                this.selectedSubsector = this.objectPlanofAction.sectionType;
                if(this.presentToastConfirm != undefined || this.presentToastConfirm != null){
                  this.presentToastConfirm.dismiss();
                }
              }
            });
            temp.alert3.addButton({
              text: MessageProvider.MESSAGES.FACILITY_COMMUNITY_PAGE_CANCEL_CONFIRM_POSITIVE_TEXT,
              handler: data => {
                let index = this.obj.planOfAction.indexOf(this.objectPlanofAction);
                this.obj.planOfAction.splice(index, 1);
                this.objectPlanofAction = {};
                this.enableAdd = true;
              }
            });

            temp.alert3.present();
          } 
      }
      if (this.lvobj.length > 0) {
        this.toggleGroup1(this.shownGroup1);
      }
      if(this.navParams.data.id != undefined){
        if(document.getElementById('c_id')!=null){
          this.setPercentCSS('c_id',this.progressBarObj.loadProgress);
        }
        if(document.getElementById('d_id')!=null){
          this.setPercentCSS('d_id',this.progressBarObj.loadProgressD);
        }
        if(document.getElementById('e1_id')!=null){
          this.setPercentCSS('e1_id',this.progressBarObj.loadProgressE);
        }
		    if(document.getElementById('f1_id')!=null){
          this.setPercentCSS('f1_id',this.progressBarObj.loadProgressF_ante);
        }
        if(document.getElementById('h1_id')!=null){
          this.setPercentCSS('h1_id',this.progressBarObj.loadProgressH_service);
        }
        if(document.getElementById('i1_id')!=null){
          this.setPercentCSS('i1_id',this.progressBarObj.loadProgressI_diagnosis);
        }
        if(document.getElementById('geo_id')!=null){
          this.setPercentCSS('geo_id',this.progressBarObj.loadProgressGeo_coordinate);
        }
      }
      if(this.showSubsectors){
        if (this.platform.is('tablet')) {
            this.ioncontentHeight = "55";
            this.scrollHeight = "94";
        }else{
            this.ioncontentHeight = "55";
            this.scrollHeight = "90";
        }
      }else{
          this.ioncontentHeight="0";
          this.scrollHeight="100";
      } 
      if (this.selectedSectorNumber === 1) {
      this.show_c_progressbar = false;
      this.show_d_progressbar = true;
      this.show_e_meternalhealth_progressbar = true;
      this. show_e_newborn_progressbar =true;
      this.show_e_progressbar =true;
      this.show_e_childhealth_progressbar = true;
      this.show_e_vaccine_progressbar =true;
      this.show_e_antibiotics_progressbar = true;
      this.show_e_infra_progressbar = true;
      this. show_e_infection_progressbar = true;
      this.show_e_andolescent_progressbar = true;
      this.show_e_other_progressbar = true;
      this.show_e_hr_progressbar = true;
      this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = true;
      this. show_f_newborn_progressbar = true;
    this.show_f_family_progressbar = true;
    this.show_f_client_progressbar = true;
    this.show_f_facility_progressbar = true;
    this.show_f_adloscent_progressbar = true;
    this.show_h_service_progressbar = true;
    this.show_h_healthinfo_progressbar = true;
    this.show_h_hr_progressbar = true;
    this.show_h_healthfinance_progressbar = true;
    this.show_h_leadership_progressbar = true;
    this.show_i_diagnosis_progressbar = true;
    this.show_i_treatment_progressbar = true;
    this.show_i_national_progressbar = true;
    this.show_i_nvbcdp_progressbar = true;
    this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
    } else if (this.selectedSectorNumber === 2) {
      this.show_c_progressbar = true;
      this.show_d_progressbar = false;
      this.show_e_meternalhealth_progressbar = true;
      this. show_e_newborn_progressbar =true;
      this.show_e_progressbar =true;
      this.show_e_childhealth_progressbar = true;
      this.show_e_vaccine_progressbar =true;
      this.show_e_antibiotics_progressbar = true;
      this.show_e_infra_progressbar = true;
      this. show_e_infection_progressbar = true;
      this.show_e_andolescent_progressbar = true;
      this.show_e_other_progressbar = true;
      this.show_e_hr_progressbar = true;
      this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = true;
      this. show_f_newborn_progressbar = true;
    this.show_f_family_progressbar = true;
    this.show_f_client_progressbar = true;
    this.show_f_facility_progressbar = true;
    this.show_f_adloscent_progressbar = true;
    this.show_h_service_progressbar = true;
		this.show_h_healthinfo_progressbar = true;
		this.show_h_hr_progressbar = true;
		this.show_h_healthfinance_progressbar = true;
		this.show_h_leadership_progressbar = true;
		this.show_i_diagnosis_progressbar = true;
		this.show_i_treatment_progressbar = true;
		this.show_i_national_progressbar = true;
    this.show_i_nvbcdp_progressbar = true;
    this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
    } else if (this.selectedSectorNumber === 3) {
      this.show_c_progressbar = true;
      this.show_d_progressbar = true;
      this.show_e_meternalhealth_progressbar = true;
      this. show_e_newborn_progressbar =true;
      this.show_e_progressbar = false;
      this.show_e_childhealth_progressbar = true;
      this.show_e_vaccine_progressbar =true;
      this.show_e_antibiotics_progressbar = true;
      this.show_e_infra_progressbar = true;
      this. show_e_infection_progressbar = true;
      this.show_e_andolescent_progressbar = true;
      this.show_e_other_progressbar = true;
      this.show_e_hr_progressbar = true;
      this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = true;
      this. show_f_newborn_progressbar = true;
    this.show_f_family_progressbar = true;
    this.show_f_client_progressbar = true;
    this.show_f_facility_progressbar = true;
    this.show_f_adloscent_progressbar = true;
    this.show_h_service_progressbar = true;
		this.show_h_healthinfo_progressbar = true;
		this.show_h_hr_progressbar = true;
		this.show_h_healthfinance_progressbar = true;
		this.show_h_leadership_progressbar = true;
		this.show_i_diagnosis_progressbar = true;
		this.show_i_treatment_progressbar = true;
		this.show_i_national_progressbar = true;
    this.show_i_nvbcdp_progressbar = true;
    this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
    } else if(this.sectorOrSubsectorNumber === 41){
    this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =true;
    this.show_e_antibiotics_progressbar = true;
    this.show_e_infra_progressbar = true;
    this. show_e_infection_progressbar = true
    this.show_e_andolescent_progressbar = true;
    this.show_e_other_progressbar = true;
     this.show_e_hr_progressbar = true;
     this.show_f_ante_progressbar = false;
      this.show_f_intra_progressbar = true;
      this. show_f_newborn_progressbar = true;
       this.show_f_family_progressbar = true;
       this.show_f_client_progressbar = true;
     this.show_f_facility_progressbar = true;
     this.show_f_adloscent_progressbar = true;
     this.show_h_service_progressbar = true;
     this.show_h_healthinfo_progressbar = true;
     this.show_h_hr_progressbar = true;
     this.show_h_healthfinance_progressbar = true;
     this.show_h_leadership_progressbar = true;
     this.show_i_diagnosis_progressbar = true;
     this.show_i_treatment_progressbar = true;
     this.show_i_national_progressbar = true;
     this.show_i_nvbcdp_progressbar = true;
     this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
    } else if(this.sectorOrSubsectorNumber === 51){
      this.show_c_progressbar = true;
        this.show_d_progressbar = true;
      this. show_e_newborn_progressbar =true;
      this.show_e_meternalhealth_progressbar = true;
      this.show_e_progressbar = true;
      this.show_e_childhealth_progressbar = true;
      this.show_e_vaccine_progressbar =true;
      this.show_e_antibiotics_progressbar = true;
      this.show_e_infra_progressbar = true;
      this. show_e_infection_progressbar = true
      this.show_e_andolescent_progressbar = true;
      this.show_e_other_progressbar = true;
       this.show_e_hr_progressbar = true;
       this.show_f_ante_progressbar = true;
        this.show_f_intra_progressbar = true;
        this. show_f_newborn_progressbar = true;
         this.show_f_family_progressbar = true;
         this.show_f_client_progressbar = true;
       this.show_f_facility_progressbar = true;
       this.show_f_adloscent_progressbar = true;
       this.show_h_service_progressbar = false;
       this.show_h_healthinfo_progressbar = true;
       this.show_h_hr_progressbar = true;
       this.show_h_healthfinance_progressbar = true;
       this.show_h_leadership_progressbar = true;
       this.show_i_diagnosis_progressbar = true;
       this.show_i_treatment_progressbar = true;
       this.show_i_national_progressbar = true;
       this.show_i_nvbcdp_progressbar = true;
       this.show_i_rntcp_progressbar = true;
      this.show_i_leprosy_progressbar = true;
      this.show_i_ncd_progressbar = true;
      this.show_i_nppc_progressbar = true;
       this.show_geo_coordinate_progressbar = true;
      } else if(this.sectorOrSubsectorNumber === 61){
        this.show_c_progressbar = true;
          this.show_d_progressbar = true;
        this. show_e_newborn_progressbar =true;
        this.show_e_meternalhealth_progressbar = true;
        this.show_e_progressbar = true;
        this.show_e_childhealth_progressbar = true;
        this.show_e_vaccine_progressbar =true;
        this.show_e_antibiotics_progressbar = true;
        this.show_e_infra_progressbar = true;
        this. show_e_infection_progressbar = true
        this.show_e_andolescent_progressbar = true;
        this.show_e_other_progressbar = true;
         this.show_e_hr_progressbar = true;
         this.show_f_ante_progressbar = true;
          this.show_f_intra_progressbar = true;
          this. show_f_newborn_progressbar = true;
           this.show_f_family_progressbar = true;
           this.show_f_client_progressbar = true;
         this.show_f_facility_progressbar = true;
         this.show_f_adloscent_progressbar = true;
         this.show_h_service_progressbar = true;
         this.show_h_healthinfo_progressbar = true;
         this.show_h_hr_progressbar = true;
         this.show_h_healthfinance_progressbar = true;
         this.show_h_leadership_progressbar = true;
         this.show_i_diagnosis_progressbar = false;
         this.show_i_treatment_progressbar = true;
         this.show_i_national_progressbar = true;
         this.show_i_nvbcdp_progressbar = true;
         this.show_i_rntcp_progressbar = true;
        this.show_i_leprosy_progressbar = true;
        this.show_i_ncd_progressbar = true;
        this.show_i_nppc_progressbar = true;
         this.show_geo_coordinate_progressbar = true;
        } else if(this.sectorOrSubsectorNumber === 112){
    this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =true;
    this.show_e_antibiotics_progressbar = true;
    this.show_e_infra_progressbar = true;
    this. show_e_infection_progressbar = true
    this.show_e_andolescent_progressbar = true;
    this.show_e_other_progressbar = true;
     this.show_e_hr_progressbar = true;
     this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = true;
      this. show_f_newborn_progressbar = true;
       this.show_f_family_progressbar = true;
       this.show_f_client_progressbar = true;
     this.show_f_facility_progressbar = true;
     this.show_f_adloscent_progressbar = true;
     this.show_h_service_progressbar = true;
     this.show_h_healthinfo_progressbar = true;
     this.show_h_hr_progressbar = true;
     this.show_h_healthfinance_progressbar = true;
     this.show_h_leadership_progressbar = true;
     this.show_i_diagnosis_progressbar = true;
     this.show_i_treatment_progressbar = true;
     this.show_i_national_progressbar = true;
     this.show_i_nvbcdp_progressbar = true;
     this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
        } else if(this.sectorOrSubsectorNumber === 113){
    this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =true;
    this.show_e_antibiotics_progressbar = true;
    this.show_e_infra_progressbar = true;
    this. show_e_infection_progressbar = true
    this.show_e_andolescent_progressbar = true;
    this.show_e_other_progressbar = true;
     this.show_e_hr_progressbar = true;
     this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = true;
      this. show_f_newborn_progressbar = true;
       this.show_f_family_progressbar = true;
       this.show_f_client_progressbar = true;
     this.show_f_facility_progressbar = true;
     this.show_f_adloscent_progressbar = true;
     this.show_h_service_progressbar = true;
     this.show_h_healthinfo_progressbar = true;
     this.show_h_hr_progressbar = true;
     this.show_h_healthfinance_progressbar = true;
     this.show_h_leadership_progressbar = true;
     this.show_i_diagnosis_progressbar = true;
     this.show_i_treatment_progressbar = true;
     this.show_i_national_progressbar = true;
     this.show_i_nvbcdp_progressbar = true;
     this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
        } else if(this.sectorOrSubsectorNumber === 114){
    this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =true;
    this.show_e_antibiotics_progressbar = true;
    this.show_e_infra_progressbar = true;
    this. show_e_infection_progressbar = true
    this.show_e_andolescent_progressbar = true;
    this.show_e_other_progressbar = true;
     this.show_e_hr_progressbar = true;
     this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = true;
      this. show_f_newborn_progressbar = true;
       this.show_f_family_progressbar = true;
       this.show_f_client_progressbar = true;
     this.show_f_facility_progressbar = true;
     this.show_f_adloscent_progressbar = true;
     this.show_h_service_progressbar = true;
     this.show_h_healthinfo_progressbar = true;
     this.show_h_hr_progressbar = true;
     this.show_h_healthfinance_progressbar = true;
     this.show_h_leadership_progressbar = true;
     this.show_i_diagnosis_progressbar = true;
     this.show_i_treatment_progressbar = true;
     this.show_i_national_progressbar = true;
     this.show_i_nvbcdp_progressbar = true;
     this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
        } else if(this.sectorOrSubsectorNumber === 115){
    this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =true;
    this.show_e_antibiotics_progressbar = true;
    this.show_e_infra_progressbar = true;
    this. show_e_infection_progressbar = true
    this.show_e_andolescent_progressbar = true;
    this.show_e_other_progressbar = true;
     this.show_e_hr_progressbar = true;
     this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = true;
      this. show_f_newborn_progressbar = true;
       this.show_f_family_progressbar = true;
       this.show_f_client_progressbar = true;
     this.show_f_facility_progressbar = true;
     this.show_f_adloscent_progressbar = true;
     this.show_h_service_progressbar = true;
     this.show_h_healthinfo_progressbar = true;
     this.show_h_hr_progressbar = true;
     this.show_h_healthfinance_progressbar = true;
     this.show_h_leadership_progressbar = true;
     this.show_i_diagnosis_progressbar = true;
     this.show_i_treatment_progressbar = true;
     this.show_i_national_progressbar = true;
     this.show_i_nvbcdp_progressbar = true;
     this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
        } else if(this.sectorOrSubsectorNumber === 116){
    this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =true;
    this.show_e_antibiotics_progressbar = true;
    this.show_e_infra_progressbar = true;
    this. show_e_infection_progressbar = true
    this.show_e_andolescent_progressbar = true;
    this.show_e_other_progressbar = true;
     this.show_e_hr_progressbar = true;
     this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = true;
      this. show_f_newborn_progressbar = true;
       this.show_f_family_progressbar = true;
       this.show_f_client_progressbar = true;
     this.show_f_facility_progressbar = true;
     this.show_f_adloscent_progressbar = true;
     this.show_h_service_progressbar = true;
     this.show_h_healthinfo_progressbar = true;
     this.show_h_hr_progressbar = true;
     this.show_h_healthfinance_progressbar = true;
     this.show_h_leadership_progressbar = true;
     this.show_i_diagnosis_progressbar = true;
     this.show_i_treatment_progressbar = true;
     this.show_i_national_progressbar = true;
     this.show_i_nvbcdp_progressbar = true;
     this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
        } else if (this.selectedSectorNumber === 9) {
      this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =true;
    this.show_e_antibiotics_progressbar = true;
    this.show_e_infra_progressbar = true;
    this. show_e_infection_progressbar = true
    this.show_e_andolescent_progressbar = true;
    this.show_e_other_progressbar = true;
     this.show_e_hr_progressbar = true;
     this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = true;
      this. show_f_newborn_progressbar = true;
       this.show_f_family_progressbar = true;
       this.show_f_client_progressbar = true;
     this.show_f_facility_progressbar = true;
     this.show_f_adloscent_progressbar = true;
     this.show_h_service_progressbar = true;
     this.show_h_healthinfo_progressbar = true;
     this.show_h_hr_progressbar = true;
     this.show_h_healthfinance_progressbar = true;
     this.show_h_leadership_progressbar = true;
     this.show_i_diagnosis_progressbar = true;
     this.show_i_treatment_progressbar = true;
     this.show_i_national_progressbar = true;
     this.show_i_nvbcdp_progressbar = true;
     this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
        this.show_geo_coordinate_progressbar = false;
    }  

  }

/**
 * This method gets called when we select a subsector from subsectors dropdown
 */
  subsectorSelected(){

    let temp = this;
    this.scroll();
    this.selectedSubSectorNumber = parseInt(this.selectedSubsector);  
    this.calculateSubSectorMaxScore(this.selectedSubSectorNumber)
    this.changeProgressBarPercentageValue(this.selectedSubSectorNumber)
    this.sectorOrSubsectorNumber = this.selectedSubSectorNumber; 
    
    if (this.obj.planOfAction.length > 0) {
         this.toggleGroup(this.shownGroup);
    }
    if (this.lvobj.length >0){
         this.toggleGroup1(this.shownGroup1);
    }
    if(this.navParams.data.id != undefined){
        if(document.getElementById('e1_id')!=null){
          this.setPercentCSS('e1_id',this.progressBarObj.loadProgressE);
        }
        if(document.getElementById('e2_id')!=null){
          this.setPercentCSS('e2_id',this.progressBarObj.loadProgressE_meternal);
        }
        if(document.getElementById('e3_id')!=null){
          this.setPercentCSS('e3_id',this.progressBarObj.loadProgressE_newborn);
        }
        if(document.getElementById('e4_id')!=null){
          this.setPercentCSS('e4_id',this.progressBarObj.loadProgressE_childhealth);
        }
        if(document.getElementById('e5_id')!=null){
          this.setPercentCSS('e5_id',this.progressBarObj.loadProgressE_vaccine);
        }
        if(document.getElementById('e6_id')!=null){
          this.setPercentCSS('e6_id',this.progressBarObj.loadProgressE_antibiotics);
        }
        if(document.getElementById('e7_id')!=null){
          this.setPercentCSS('e7_id',this.progressBarObj.loadProgressE_infra);
        }
        if(document.getElementById('e8_id')!=null){
          this.setPercentCSS('e8_id',this.progressBarObj.loadProgressE_infection);
        }
        if(document.getElementById('e9_id')!=null){
          this.setPercentCSS('e9_id',this.progressBarObj.loadProgressE_andolescent);
        }
        if(document.getElementById('e10_id')!=null){
          this.setPercentCSS('e10_id',this.progressBarObj.loadProgressE_other);
        }
        if(document.getElementById('e11_id')!=null){
          this.setPercentCSS('e11_id',this.progressBarObj.loadProgressE_hr);
        }
        if(document.getElementById('f1_id')!=null){
          this.setPercentCSS('f1_id',this.progressBarObj.loadProgressF_ante);
        }
        if(document.getElementById('f2_id')!=null){
          this.setPercentCSS('f2_id',this.progressBarObj.loadProgressF_intra);
        }
        if(document.getElementById('f3_id')!=null){
          this.setPercentCSS('f3_id',this.progressBarObj.loadProgressF_newborn);
        }
        if(document.getElementById('f4_id')!=null){
          this.setPercentCSS('f4_id',this.progressBarObj.loadProgressF_family);
        }
        if(document.getElementById('f5_id')!=null){
          this.setPercentCSS('f5_id',this.progressBarObj.loadProgressF_client);
        }
        if(document.getElementById('f6_id')!=null){
          this.setPercentCSS('f6_id',this.progressBarObj.loadProgressF_facility);
        }
        if(document.getElementById('f7_id')!=null){
          this.setPercentCSS('f7_id',this.progressBarObj.loadProgressF_adloscent);
        }
        if(document.getElementById('h1_id')!=null){
          this.setPercentCSS('h1_id',this.progressBarObj.loadProgressH_service);
        }
        if(document.getElementById('h2_id')!=null){
          this.setPercentCSS('h2_id',this.progressBarObj.loadProgressH_healthinfo);
        }
        if(document.getElementById('h3_id')!=null){
          this.setPercentCSS('h3_id',this.progressBarObj.loadProgressH_hr);
        }
        if(document.getElementById('h4_id')!=null){
          this.setPercentCSS('h4_id',this.progressBarObj.loadProgressH_healthfinance);
        }
        if(document.getElementById('h5_id')!=null){
          this.setPercentCSS('h5_id',this.progressBarObj.loadProgressH_leadership);
        }
        if(document.getElementById('i1_id')!=null){
          this.setPercentCSS('i1_id',this.progressBarObj.loadProgressI_diagnosis);
        }
        if(document.getElementById('i2_id')!=null){
          this.setPercentCSS('i2_id',this.progressBarObj.loadProgressI_treatment);
        }
        if(document.getElementById('i3_id')!=null){
          this.setPercentCSS('i3_id',this.progressBarObj.loadProgressI_national);
        }
        if(document.getElementById('i4_id')!=null){
          this.setPercentCSS('i4_id',this.progressBarObj.loadProgressI_nvbcdp);
        }
        if(document.getElementById('i5_id')!=null){
          this.setPercentCSS('i5_id',this.progressBarObj.loadProgressI_rntcp);
        }
        if(document.getElementById('i6_id')!=null){
          this.setPercentCSS('i6_id',this.progressBarObj.loadProgressI_leprosy);
        }
        if(document.getElementById('i7_id')!=null){
          this.setPercentCSS('i7_id',this.progressBarObj.loadProgressI_ncd);
        }
        if(document.getElementById('i8_id')!=null){
          this.setPercentCSS('i8_id',this.progressBarObj.loadProgressI_nppc);
        }
        if(document.getElementById('geo_id')!=null){
          this.setPercentCSS('geo_id',this.progressBarObj.loadProgressGeo_coordinate);
        }
    }    
     if (this.sectorOrSubsectorNumber === 31) {
       this.show_c_progressbar = true;
      this.show_d_progressbar = true;
      this.show_e_meternalhealth_progressbar = true;
      this. show_e_newborn_progressbar =true;
      this.show_e_progressbar = false;
      this.show_e_childhealth_progressbar = true;
      this.show_e_vaccine_progressbar =true;
      this.show_e_antibiotics_progressbar = true;
      this.show_e_infra_progressbar = true;
      this. show_e_infection_progressbar = true;
      this.show_e_andolescent_progressbar = true;
      this.show_e_other_progressbar = true;
      this.show_e_hr_progressbar = true;
      this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = true;
      this. show_f_newborn_progressbar = true;
    this.show_f_family_progressbar = true;
    this.show_f_client_progressbar = true;
    this.show_f_facility_progressbar = true;
    this.show_f_adloscent_progressbar = true;
    this.show_h_service_progressbar = true;
		this.show_h_healthinfo_progressbar = true;
		this.show_h_hr_progressbar = true;
		this.show_h_healthfinance_progressbar = true;
		this.show_h_leadership_progressbar = true;
		this.show_i_diagnosis_progressbar = true;
		this.show_i_treatment_progressbar = true;
		this.show_i_national_progressbar = true;
    this.show_i_nvbcdp_progressbar = true;
    this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
    } else if (this.sectorOrSubsectorNumber === 32) {
      this.show_c_progressbar = true;
      this.show_d_progressbar = true;
      this.show_e_meternalhealth_progressbar = false;
       this. show_e_newborn_progressbar =true;
      this.show_e_progressbar = true;
       this.show_e_childhealth_progressbar = true;
       this.show_e_vaccine_progressbar =true;
        this.show_e_antibiotics_progressbar = true;
         this.show_e_infra_progressbar = true;
         this. show_e_infection_progressbar = true;
           this.show_e_andolescent_progressbar = true;
           this.show_e_other_progressbar = true;
           this.show_e_hr_progressbar = true;
           this.show_f_ante_progressbar = true;
            this.show_f_intra_progressbar = true;
             this. show_f_newborn_progressbar = true;
           this.show_f_family_progressbar = true;
           this.show_f_client_progressbar = true;
            this.show_f_facility_progressbar = true;
            this.show_f_adloscent_progressbar = true;
            this.show_h_service_progressbar = true;
            this.show_h_healthinfo_progressbar = true;
            this.show_h_hr_progressbar = true;
            this.show_h_healthfinance_progressbar = true;
            this.show_h_leadership_progressbar = true;
            this.show_i_diagnosis_progressbar = true;
            this.show_i_treatment_progressbar = true;
            this.show_i_national_progressbar = true;
            this.show_i_nvbcdp_progressbar = true;
            this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
    }else if(this.sectorOrSubsectorNumber === 33){
      this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =false;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =true;
     this.show_e_antibiotics_progressbar = true;
      this.show_e_infra_progressbar = true;
      this. show_e_infection_progressbar = true;
        this.show_e_andolescent_progressbar = true;
        this.show_e_other_progressbar = true;
        this.show_e_hr_progressbar = true;
        this.show_f_ante_progressbar = true;
        this.show_f_intra_progressbar = true;
          this.show_f_family_progressbar = true;
          this. show_f_newborn_progressbar = true;
          this.show_f_client_progressbar = true;
           this.show_f_facility_progressbar = true;
           this.show_f_adloscent_progressbar = true;
           this.show_h_service_progressbar = true;
           this.show_h_healthinfo_progressbar = true;
           this.show_h_hr_progressbar = true;
           this.show_h_healthfinance_progressbar = true;
           this.show_h_leadership_progressbar = true;
           this.show_i_diagnosis_progressbar = true;
           this.show_i_treatment_progressbar = true;
           this.show_i_national_progressbar = true;
           this.show_i_nvbcdp_progressbar = true;
           this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
    }else if(this.sectorOrSubsectorNumber === 34){
      this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = false;
     this.show_e_vaccine_progressbar =true;
      this.show_e_antibiotics_progressbar = true;
       this.show_e_infra_progressbar = true;
        this.show_e_infra_progressbar = true;
        this. show_e_infection_progressbar = true;
          this.show_e_andolescent_progressbar = true;
          this.show_e_other_progressbar = true;
          this.show_e_hr_progressbar = true;
          this.show_f_ante_progressbar = true;
          this.show_f_intra_progressbar = true;
            this.show_f_family_progressbar = true;
            this. show_f_newborn_progressbar = true;
            this.show_f_client_progressbar = true;
 this.show_f_facility_progressbar = true;
 this.show_f_adloscent_progressbar = true;
 this.show_h_service_progressbar = true;
 this.show_h_healthinfo_progressbar = true;
 this.show_h_hr_progressbar = true;
 this.show_h_healthfinance_progressbar = true;
 this.show_h_leadership_progressbar = true;
 this.show_i_diagnosis_progressbar = true;
 this.show_i_treatment_progressbar = true;
 this.show_i_national_progressbar = true;
 this.show_i_nvbcdp_progressbar = true;
 this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
  }
  else if(this.sectorOrSubsectorNumber === 35){
    this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =false;
    this.show_e_antibiotics_progressbar = true;
     this.show_e_infra_progressbar = true;
     this. show_e_infection_progressbar = true;
       this.show_e_andolescent_progressbar = true;
       this.show_e_other_progressbar = true;
       this.show_e_hr_progressbar = true;
       this.show_f_ante_progressbar = true;
        this.show_f_intra_progressbar = true;
         this.show_f_family_progressbar = true;
     this. show_f_newborn_progressbar = true;
     this.show_f_client_progressbar = true;
   this.show_f_facility_progressbar = true;
   this.show_f_adloscent_progressbar = true;
   this.show_h_service_progressbar = true;
   this.show_h_healthinfo_progressbar = true;
   this.show_h_hr_progressbar = true;
   this.show_h_healthfinance_progressbar = true;
   this.show_h_leadership_progressbar = true;
   this.show_i_diagnosis_progressbar = true;
   this.show_i_treatment_progressbar = true;
   this.show_i_national_progressbar = true;
   this.show_i_nvbcdp_progressbar = true;
   this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
  }else if(this.sectorOrSubsectorNumber === 36){
    this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =true;
    this.show_e_antibiotics_progressbar = false;
    this.show_e_infra_progressbar = true;
    this. show_e_infection_progressbar = true;
      this.show_e_andolescent_progressbar = true;
      this.show_e_other_progressbar = true;
      this.show_e_hr_progressbar = true;
      this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = true;
        this.show_f_family_progressbar = true;
     this. show_f_newborn_progressbar = true;
     this.show_f_client_progressbar = true;
   this.show_f_facility_progressbar = true;
   this.show_f_adloscent_progressbar = true;
   this.show_h_service_progressbar = true;
   this.show_h_healthinfo_progressbar = true;
   this.show_h_hr_progressbar = true;
   this.show_h_healthfinance_progressbar = true;
   this.show_h_leadership_progressbar = true;
   this.show_i_diagnosis_progressbar = true;
   this.show_i_treatment_progressbar = true;
   this.show_i_national_progressbar = true;
   this.show_i_nvbcdp_progressbar = true;
   this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
  }
  else if(this.sectorOrSubsectorNumber === 37){
    this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =true;
    this.show_e_antibiotics_progressbar = true;
    this.show_e_infra_progressbar = false;
    this. show_e_infection_progressbar = true
      this.show_e_andolescent_progressbar = true;
      this.show_e_other_progressbar = true;
      this.show_e_hr_progressbar = true;
      this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = true;
     this. show_f_newborn_progressbar = true;
      this.show_f_family_progressbar = true;
      this.show_f_client_progressbar = true;
   this.show_f_facility_progressbar = true;
   this.show_f_adloscent_progressbar = true;
   this.show_h_service_progressbar = true;
   this.show_h_healthinfo_progressbar = true;
   this.show_h_hr_progressbar = true;
   this.show_h_healthfinance_progressbar = true;
   this.show_h_leadership_progressbar = true;
   this.show_i_diagnosis_progressbar = true;
   this.show_i_treatment_progressbar = true;
   this.show_i_national_progressbar = true;
   this.show_i_nvbcdp_progressbar = true;
   this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
  }
   else if(this.sectorOrSubsectorNumber === 38){
     this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =true;
    this.show_e_antibiotics_progressbar = true;
    this.show_e_infra_progressbar = true;
    this. show_e_infection_progressbar = false
    this.show_e_andolescent_progressbar = true;
    this.show_e_other_progressbar = true;
    this.show_e_hr_progressbar = true;
    this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = true;
      this. show_f_newborn_progressbar = true;
      this.show_f_client_progressbar = true;
       this.show_f_family_progressbar = true;
        this.show_f_facility_progressbar = true;
        this.show_f_adloscent_progressbar = true;
        this.show_h_service_progressbar = true;
        this.show_h_healthinfo_progressbar = true;
        this.show_h_hr_progressbar = true;
        this.show_h_healthfinance_progressbar = true;
        this.show_h_leadership_progressbar = true;
        this.show_i_diagnosis_progressbar = true;
        this.show_i_treatment_progressbar = true;
        this.show_i_national_progressbar = true;
        this.show_i_nvbcdp_progressbar = true;
        this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
  }
   else if(this.sectorOrSubsectorNumber === 39){
     this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =true;
    this.show_e_antibiotics_progressbar = true;
    this.show_e_infra_progressbar = true;
    this. show_e_infection_progressbar = true
    this.show_e_andolescent_progressbar = false;
    this.show_e_other_progressbar = true;
    this.show_e_hr_progressbar = true;
    this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = true;
      this. show_f_newborn_progressbar = true;
       this.show_f_family_progressbar = true;
       this.show_f_client_progressbar = true;
        this.show_f_facility_progressbar = true;
        this.show_f_adloscent_progressbar = true;
        this.show_h_service_progressbar = true;
        this.show_h_healthinfo_progressbar = true;
        this.show_h_hr_progressbar = true;
        this.show_h_healthfinance_progressbar = true;
        this.show_h_leadership_progressbar = true;
        this.show_i_diagnosis_progressbar = true;
        this.show_i_treatment_progressbar = true;
        this.show_i_national_progressbar = true;
        this.show_i_nvbcdp_progressbar = true;
        this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
  }
 else if(this.sectorOrSubsectorNumber === 310){
   this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =true;
    this.show_e_antibiotics_progressbar = true;
    this.show_e_infra_progressbar = true;
    this. show_e_infection_progressbar = true
    this.show_e_andolescent_progressbar = true;
    this.show_e_other_progressbar = false;
     this.show_e_hr_progressbar = true;
     this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = true;
       this. show_f_newborn_progressbar = true;
        this.show_f_family_progressbar = true;
        this.show_f_client_progressbar = true;
         this.show_f_facility_progressbar = true;
         this.show_f_adloscent_progressbar = true;
         this.show_h_service_progressbar = true;
         this.show_h_healthinfo_progressbar = true;
         this.show_h_hr_progressbar = true;
         this.show_h_healthfinance_progressbar = true;
         this.show_h_leadership_progressbar = true;
         this.show_i_diagnosis_progressbar = true;
         this.show_i_treatment_progressbar = true;
         this.show_i_national_progressbar = true;
         this.show_i_nvbcdp_progressbar = true;
         this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
  }
   else if(this.sectorOrSubsectorNumber === 311){
     this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =true;
    this.show_e_antibiotics_progressbar = true;
    this.show_e_infra_progressbar = true;
    this. show_e_infection_progressbar = true
    this.show_e_andolescent_progressbar = true;
    this.show_e_other_progressbar = true;
     this.show_e_hr_progressbar = false;
     this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = true;
       this. show_f_newborn_progressbar = true;
       this.show_f_client_progressbar = true;
        this.show_f_family_progressbar = true;
     this.show_f_facility_progressbar = true;
     this.show_f_adloscent_progressbar = true;
     this.show_h_service_progressbar = true;
     this.show_h_healthinfo_progressbar = true;
     this.show_h_hr_progressbar = true;
     this.show_h_healthfinance_progressbar = true;
     this.show_h_leadership_progressbar = true;
     this.show_i_diagnosis_progressbar = true;
     this.show_i_treatment_progressbar = true;
     this.show_i_national_progressbar = true;
     this.show_i_nvbcdp_progressbar = true;
     this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
  }else if(this.sectorOrSubsectorNumber === 41){
    this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =true;
    this.show_e_antibiotics_progressbar = true;
    this.show_e_infra_progressbar = true;
    this. show_e_infection_progressbar = true
    this.show_e_andolescent_progressbar = true;
    this.show_e_other_progressbar = true;
     this.show_e_hr_progressbar = true;
     this.show_f_ante_progressbar = false;
      this.show_f_intra_progressbar = true;
      this. show_f_newborn_progressbar = true;
       this.show_f_family_progressbar = true;
       this.show_f_client_progressbar = true;
     this.show_f_facility_progressbar = true;
     this.show_f_adloscent_progressbar = true;
     this.show_h_service_progressbar = true;
     this.show_h_healthinfo_progressbar = true;
     this.show_h_hr_progressbar = true;
     this.show_h_healthfinance_progressbar = true;
     this.show_h_leadership_progressbar = true;
     this.show_i_diagnosis_progressbar = true;
     this.show_i_treatment_progressbar = true;
     this.show_i_national_progressbar = true;
     this.show_i_nvbcdp_progressbar = true;
     this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
  }
  else if(this.sectorOrSubsectorNumber === 42){
    this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =true;
    this.show_e_antibiotics_progressbar = true;
    this.show_e_infra_progressbar = true;
    this. show_e_infection_progressbar = true
    this.show_e_andolescent_progressbar = true;
    this.show_e_other_progressbar = true;
     this.show_e_hr_progressbar = true;
     this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = false;
      this. show_f_newborn_progressbar = true;
       this.show_f_family_progressbar = true;
       this.show_f_client_progressbar = true;
     this.show_f_facility_progressbar = true;
     this.show_f_adloscent_progressbar = true;
     this.show_h_service_progressbar = true;
     this.show_h_healthinfo_progressbar = true;
     this.show_h_hr_progressbar = true;
     this.show_h_healthfinance_progressbar = true;
     this.show_h_leadership_progressbar = true;
     this.show_i_diagnosis_progressbar = true;
     this.show_i_treatment_progressbar = true;
     this.show_i_national_progressbar = true;
     this.show_i_nvbcdp_progressbar = true;
     this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
  }
  else if(this.sectorOrSubsectorNumber === 43){
    this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =true;
    this.show_e_antibiotics_progressbar = true;
    this.show_e_infra_progressbar = true;
    this. show_e_infection_progressbar = true
    this.show_e_andolescent_progressbar = true;
    this.show_e_other_progressbar = true;
     this.show_e_hr_progressbar = true;
     this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = true;
      this. show_f_newborn_progressbar = false;
      this.show_f_client_progressbar = true;
       this.show_f_family_progressbar = true;
     this.show_f_facility_progressbar = true;
     this.show_f_adloscent_progressbar = true;
     this.show_h_service_progressbar = true;
     this.show_h_healthinfo_progressbar = true;
     this.show_h_hr_progressbar = true;
     this.show_h_healthfinance_progressbar = true;
     this.show_h_leadership_progressbar = true;
     this.show_i_diagnosis_progressbar = true;
     this.show_i_treatment_progressbar = true;
     this.show_i_national_progressbar = true;
     this.show_i_nvbcdp_progressbar = true;
     this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
  }
   else if(this.sectorOrSubsectorNumber === 44){
     this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =true;
    this.show_e_antibiotics_progressbar = true;
    this.show_e_infra_progressbar = true;
    this. show_e_infection_progressbar = true
    this.show_e_andolescent_progressbar = true;
    this.show_e_other_progressbar = true;
     this.show_e_hr_progressbar = true;
     this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = true;
      this. show_f_newborn_progressbar = true;
       this.show_f_family_progressbar = false;
       this.show_f_client_progressbar = true;
     this.show_f_facility_progressbar = true;
     this.show_f_adloscent_progressbar = true;
     this.show_h_service_progressbar = true;
     this.show_h_healthinfo_progressbar = true;
     this.show_h_hr_progressbar = true;
     this.show_h_healthfinance_progressbar = true;
     this.show_h_leadership_progressbar = true;
     this.show_i_diagnosis_progressbar = true;
     this.show_i_treatment_progressbar = true;
     this.show_i_national_progressbar = true;
     this.show_i_nvbcdp_progressbar = true;
     this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
  }
  else if(this.sectorOrSubsectorNumber === 45){
    this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =true;
    this.show_e_antibiotics_progressbar = true;
    this.show_e_infra_progressbar = true;
    this. show_e_infection_progressbar = true
    this.show_e_andolescent_progressbar = true;
    this.show_e_other_progressbar = true;
     this.show_e_hr_progressbar = true;
     this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = true;
      this. show_f_newborn_progressbar = true;
       this.show_f_family_progressbar = true;
       this.show_f_client_progressbar = false;
     this.show_f_facility_progressbar = true;
     this.show_f_adloscent_progressbar = true;
     this.show_h_service_progressbar = true;
     this.show_h_healthinfo_progressbar = true;
     this.show_h_hr_progressbar = true;
     this.show_h_healthfinance_progressbar = true;
     this.show_h_leadership_progressbar = true;
     this.show_i_diagnosis_progressbar = true;
     this.show_i_treatment_progressbar = true;
     this.show_i_national_progressbar = true;
     this.show_i_nvbcdp_progressbar = true;
     this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
  }else if(this.sectorOrSubsectorNumber === 46){
    this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =true;
    this.show_e_antibiotics_progressbar = true;
    this.show_e_infra_progressbar = true;
    this. show_e_infection_progressbar = true
    this.show_e_andolescent_progressbar = true;
    this.show_e_other_progressbar = true;
     this.show_e_hr_progressbar = true;
     this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = true;
      this. show_f_newborn_progressbar = true;
       this.show_f_family_progressbar = true;
       this.show_f_client_progressbar = true;
     this.show_f_facility_progressbar = false;
     this.show_f_adloscent_progressbar = true;
     this.show_h_service_progressbar = true;
     this.show_h_healthinfo_progressbar = true;
     this.show_h_hr_progressbar = true;
     this.show_h_healthfinance_progressbar = true;
     this.show_h_leadership_progressbar = true;
     this.show_i_diagnosis_progressbar = true;
     this.show_i_treatment_progressbar = true;
     this.show_i_national_progressbar = true;
     this.show_i_nvbcdp_progressbar = true;
     this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
  }else if(this.sectorOrSubsectorNumber === 47){
    this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =true;
    this.show_e_antibiotics_progressbar = true;
    this.show_e_infra_progressbar = true;
    this. show_e_infection_progressbar = true
    this.show_e_andolescent_progressbar = true;
    this.show_e_other_progressbar = true;
     this.show_e_hr_progressbar = true;
     this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = true;
      this. show_f_newborn_progressbar = true;
       this.show_f_family_progressbar = true;
       this.show_f_client_progressbar = true;
     this.show_f_facility_progressbar = true;
     this.show_f_adloscent_progressbar = false;
     this.show_h_service_progressbar = true;
     this.show_h_healthinfo_progressbar = true;
     this.show_h_hr_progressbar = true;
     this.show_h_healthfinance_progressbar = true;
     this.show_h_leadership_progressbar = true;
     this.show_i_diagnosis_progressbar = true;
     this.show_i_treatment_progressbar = true;
     this.show_i_national_progressbar = true;
     this.show_i_nvbcdp_progressbar = true;
     this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
    }else if(this.sectorOrSubsectorNumber === 51){
      this.show_c_progressbar = true;
        this.show_d_progressbar = true;
      this. show_e_newborn_progressbar =true;
      this.show_e_meternalhealth_progressbar = true;
      this.show_e_progressbar = true;
      this.show_e_childhealth_progressbar = true;
      this.show_e_vaccine_progressbar =true;
      this.show_e_antibiotics_progressbar = true;
      this.show_e_infra_progressbar = true;
      this. show_e_infection_progressbar = true
      this.show_e_andolescent_progressbar = true;
      this.show_e_other_progressbar = true;
       this.show_e_hr_progressbar = true;
       this.show_f_ante_progressbar = true;
        this.show_f_intra_progressbar = true;
        this. show_f_newborn_progressbar = true;
         this.show_f_family_progressbar = true;
         this.show_f_client_progressbar = true;
       this.show_f_facility_progressbar = true;
       this.show_f_adloscent_progressbar = true;
       this.show_h_service_progressbar = false;
       this.show_h_healthinfo_progressbar = true;
       this.show_h_hr_progressbar = true;
       this.show_h_healthfinance_progressbar = true;
       this.show_h_leadership_progressbar = true;
       this.show_i_diagnosis_progressbar = true;
       this.show_i_treatment_progressbar = true;
       this.show_i_national_progressbar = true;
       this.show_i_nvbcdp_progressbar = true;
       this.show_i_rntcp_progressbar = true;
      this.show_i_leprosy_progressbar = true;
      this.show_i_ncd_progressbar = true;
      this.show_i_nppc_progressbar = true;
       this.show_geo_coordinate_progressbar = true;
      }else if(this.sectorOrSubsectorNumber === 52){
        this.show_c_progressbar = true;
          this.show_d_progressbar = true;
        this. show_e_newborn_progressbar =true;
        this.show_e_meternalhealth_progressbar = true;
        this.show_e_progressbar = true;
        this.show_e_childhealth_progressbar = true;
        this.show_e_vaccine_progressbar =true;
        this.show_e_antibiotics_progressbar = true;
        this.show_e_infra_progressbar = true;
        this. show_e_infection_progressbar = true
        this.show_e_andolescent_progressbar = true;
        this.show_e_other_progressbar = true;
         this.show_e_hr_progressbar = true;
         this.show_f_ante_progressbar = true;
          this.show_f_intra_progressbar = true;
          this. show_f_newborn_progressbar = true;
           this.show_f_family_progressbar = true;
           this.show_f_client_progressbar = true;
         this.show_f_facility_progressbar = true;
         this.show_f_adloscent_progressbar = true;
         this.show_h_service_progressbar = true;
         this.show_h_healthinfo_progressbar = false;
         this.show_h_hr_progressbar = true;
         this.show_h_healthfinance_progressbar = true;
         this.show_h_leadership_progressbar = true;
         this.show_i_diagnosis_progressbar = true;
         this.show_i_treatment_progressbar = true;
         this.show_i_national_progressbar = true;
         this.show_i_nvbcdp_progressbar = true;
         this.show_i_rntcp_progressbar = true;
        this.show_i_leprosy_progressbar = true;
        this.show_i_ncd_progressbar = true;
        this.show_i_nppc_progressbar = true;
         this.show_geo_coordinate_progressbar = true;
        }else if(this.sectorOrSubsectorNumber === 53){
          this.show_c_progressbar = true;
            this.show_d_progressbar = true;
          this. show_e_newborn_progressbar =true;
          this.show_e_meternalhealth_progressbar = true;
          this.show_e_progressbar = true;
          this.show_e_childhealth_progressbar = true;
          this.show_e_vaccine_progressbar =true;
          this.show_e_antibiotics_progressbar = true;
          this.show_e_infra_progressbar = true;
          this. show_e_infection_progressbar = true
          this.show_e_andolescent_progressbar = true;
          this.show_e_other_progressbar = true;
           this.show_e_hr_progressbar = true;
           this.show_f_ante_progressbar = true;
            this.show_f_intra_progressbar = true;
            this. show_f_newborn_progressbar = true;
             this.show_f_family_progressbar = true;
             this.show_f_client_progressbar = true;
           this.show_f_facility_progressbar = true;
           this.show_f_adloscent_progressbar = true;
           this.show_h_service_progressbar = true;
           this.show_h_healthinfo_progressbar = true;
           this.show_h_hr_progressbar = false;
           this.show_h_healthfinance_progressbar = true;
           this.show_h_leadership_progressbar = true;
           this.show_i_diagnosis_progressbar = true;
           this.show_i_treatment_progressbar = true;
           this.show_i_national_progressbar = true;
           this.show_i_nvbcdp_progressbar = true;
           this.show_i_rntcp_progressbar = true;
          this.show_i_leprosy_progressbar = true;
          this.show_i_ncd_progressbar = true;
          this.show_i_nppc_progressbar = true;
           this.show_geo_coordinate_progressbar = true;
          }else if(this.sectorOrSubsectorNumber === 54){
            this.show_c_progressbar = true;
              this.show_d_progressbar = true;
            this. show_e_newborn_progressbar =true;
            this.show_e_meternalhealth_progressbar = true;
            this.show_e_progressbar = true;
            this.show_e_childhealth_progressbar = true;
            this.show_e_vaccine_progressbar =true;
            this.show_e_antibiotics_progressbar = true;
            this.show_e_infra_progressbar = true;
            this. show_e_infection_progressbar = true
            this.show_e_andolescent_progressbar = true;
            this.show_e_other_progressbar = true;
             this.show_e_hr_progressbar = true;
             this.show_f_ante_progressbar = true;
              this.show_f_intra_progressbar = true;
              this. show_f_newborn_progressbar = true;
               this.show_f_family_progressbar = true;
               this.show_f_client_progressbar = true;
             this.show_f_facility_progressbar = true;
             this.show_f_adloscent_progressbar = true;
             this.show_h_service_progressbar = true;
             this.show_h_healthinfo_progressbar = true;
             this.show_h_hr_progressbar = true;
             this.show_h_healthfinance_progressbar = false;
             this.show_h_leadership_progressbar = true;
             this.show_i_diagnosis_progressbar = true;
             this.show_i_treatment_progressbar = true;
             this.show_i_national_progressbar = true;
             this.show_i_nvbcdp_progressbar = true;
             this.show_i_rntcp_progressbar = true;
            this.show_i_leprosy_progressbar = true;
            this.show_i_ncd_progressbar = true;
            this.show_i_nppc_progressbar = true;
             this.show_geo_coordinate_progressbar = true;
            }else if(this.sectorOrSubsectorNumber === 55){
              this.show_c_progressbar = true;
                this.show_d_progressbar = true;
              this. show_e_newborn_progressbar =true;
              this.show_e_meternalhealth_progressbar = true;
              this.show_e_progressbar = true;
              this.show_e_childhealth_progressbar = true;
              this.show_e_vaccine_progressbar =true;
              this.show_e_antibiotics_progressbar = true;
              this.show_e_infra_progressbar = true;
              this. show_e_infection_progressbar = true
              this.show_e_andolescent_progressbar = true;
              this.show_e_other_progressbar = true;
               this.show_e_hr_progressbar = true;
               this.show_f_ante_progressbar = true;
                this.show_f_intra_progressbar = true;
                this. show_f_newborn_progressbar = true;
                 this.show_f_family_progressbar = true;
                 this.show_f_client_progressbar = true;
               this.show_f_facility_progressbar = true;
               this.show_f_adloscent_progressbar = true;
               this.show_h_service_progressbar = true;
               this.show_h_healthinfo_progressbar = true;
               this.show_h_hr_progressbar = true;
               this.show_h_healthfinance_progressbar = true;
               this.show_h_leadership_progressbar = false;
               this.show_i_diagnosis_progressbar = true;
               this.show_i_treatment_progressbar = true;
               this.show_i_national_progressbar = true;
               this.show_i_nvbcdp_progressbar = true;
               this.show_i_rntcp_progressbar = true;
              this.show_i_leprosy_progressbar = true;
              this.show_i_ncd_progressbar = true;
              this.show_i_nppc_progressbar = true;
               this.show_geo_coordinate_progressbar = true;
              }else if(this.sectorOrSubsectorNumber === 61){
                this.show_c_progressbar = true;
                  this.show_d_progressbar = true;
                this. show_e_newborn_progressbar =true;
                this.show_e_meternalhealth_progressbar = true;
                this.show_e_progressbar = true;
                this.show_e_childhealth_progressbar = true;
                this.show_e_vaccine_progressbar =true;
                this.show_e_antibiotics_progressbar = true;
                this.show_e_infra_progressbar = true;
                this. show_e_infection_progressbar = true
                this.show_e_andolescent_progressbar = true;
                this.show_e_other_progressbar = true;
                 this.show_e_hr_progressbar = true;
                 this.show_f_ante_progressbar = true;
                  this.show_f_intra_progressbar = true;
                  this. show_f_newborn_progressbar = true;
                   this.show_f_family_progressbar = true;
                   this.show_f_client_progressbar = true;
                 this.show_f_facility_progressbar = true;
                 this.show_f_adloscent_progressbar = true;
                 this.show_h_service_progressbar = true;
                 this.show_h_healthinfo_progressbar = true;
                 this.show_h_hr_progressbar = true;
                 this.show_h_healthfinance_progressbar = true;
                 this.show_h_leadership_progressbar = true;
                 this.show_i_diagnosis_progressbar = false;
                 this.show_i_treatment_progressbar = true;
                 this.show_i_national_progressbar = true;
                 this.show_i_nvbcdp_progressbar = true;
                 this.show_i_rntcp_progressbar = true;
                this.show_i_leprosy_progressbar = true;
                this.show_i_ncd_progressbar = true;
                this.show_i_nppc_progressbar = true;
                 this.show_geo_coordinate_progressbar = true;
                }else if(this.sectorOrSubsectorNumber === 62){
                  this.show_c_progressbar = true;
                    this.show_d_progressbar = true;
                  this. show_e_newborn_progressbar =true;
                  this.show_e_meternalhealth_progressbar = true;
                  this.show_e_progressbar = true;
                  this.show_e_childhealth_progressbar = true;
                  this.show_e_vaccine_progressbar =true;
                  this.show_e_antibiotics_progressbar = true;
                  this.show_e_infra_progressbar = true;
                  this. show_e_infection_progressbar = true
                  this.show_e_andolescent_progressbar = true;
                  this.show_e_other_progressbar = true;
                   this.show_e_hr_progressbar = true;
                   this.show_f_ante_progressbar = true;
                    this.show_f_intra_progressbar = true;
                    this. show_f_newborn_progressbar = true;
                     this.show_f_family_progressbar = true;
                     this.show_f_client_progressbar = true;
                   this.show_f_facility_progressbar = true;
                   this.show_f_adloscent_progressbar = true;
                   this.show_h_service_progressbar = true;
                   this.show_h_healthinfo_progressbar = true;
                   this.show_h_hr_progressbar = true;
                   this.show_h_healthfinance_progressbar = true;
                   this.show_h_leadership_progressbar = true;
                   this.show_i_diagnosis_progressbar = true;
                   this.show_i_treatment_progressbar = false;
                   this.show_i_national_progressbar = true;
                   this.show_i_nvbcdp_progressbar = true;
                   this.show_i_rntcp_progressbar = true;
                  this.show_i_leprosy_progressbar = true;
                  this.show_i_ncd_progressbar = true;
                  this.show_i_nppc_progressbar = true;
                   this.show_geo_coordinate_progressbar = true;
                  }else if(this.sectorOrSubsectorNumber === 63){
                    this.show_c_progressbar = true;
                      this.show_d_progressbar = true;
                    this. show_e_newborn_progressbar =true;
                    this.show_e_meternalhealth_progressbar = true;
                    this.show_e_progressbar = true;
                    this.show_e_childhealth_progressbar = true;
                    this.show_e_vaccine_progressbar =true;
                    this.show_e_antibiotics_progressbar = true;
                    this.show_e_infra_progressbar = true;
                    this. show_e_infection_progressbar = true
                    this.show_e_andolescent_progressbar = true;
                    this.show_e_other_progressbar = true;
                     this.show_e_hr_progressbar = true;
                     this.show_f_ante_progressbar = true;
                      this.show_f_intra_progressbar = true;
                      this. show_f_newborn_progressbar = true;
                       this.show_f_family_progressbar = true;
                       this.show_f_client_progressbar = true;
                     this.show_f_facility_progressbar = true;
                     this.show_f_adloscent_progressbar = true;
                     this.show_h_service_progressbar = true;
                     this.show_h_healthinfo_progressbar = true;
                     this.show_h_hr_progressbar = true;
                     this.show_h_healthfinance_progressbar = true;
                     this.show_h_leadership_progressbar = true;
                     this.show_i_diagnosis_progressbar = true;
                     this.show_i_treatment_progressbar = true;
                     this.show_i_national_progressbar = false;
                     this.show_i_nvbcdp_progressbar = true;
                     this.show_i_rntcp_progressbar = true;
                    this.show_i_leprosy_progressbar = true;
                    this.show_i_ncd_progressbar = true;
                    this.show_i_nppc_progressbar = true;
                     this.show_geo_coordinate_progressbar = true;
                  } else if(this.sectorOrSubsectorNumber === 64){
                    this.show_c_progressbar = true;
                      this.show_d_progressbar = true;
                    this. show_e_newborn_progressbar =true;
                    this.show_e_meternalhealth_progressbar = true;
                    this.show_e_progressbar = true;
                    this.show_e_childhealth_progressbar = true;
                    this.show_e_vaccine_progressbar =true;
                    this.show_e_antibiotics_progressbar = true;
                    this.show_e_infra_progressbar = true;
                    this. show_e_infection_progressbar = true
                    this.show_e_andolescent_progressbar = true;
                    this.show_e_other_progressbar = true;
                     this.show_e_hr_progressbar = true;
                     this.show_f_ante_progressbar = true;
                      this.show_f_intra_progressbar = true;
                      this. show_f_newborn_progressbar = true;
                       this.show_f_family_progressbar = true;
                       this.show_f_client_progressbar = true;
                     this.show_f_facility_progressbar = true;
                     this.show_f_adloscent_progressbar = true;
                     this.show_h_service_progressbar = true;
                     this.show_h_healthinfo_progressbar = true;
                     this.show_h_hr_progressbar = true;
                     this.show_h_healthfinance_progressbar = true;
                     this.show_h_leadership_progressbar = true;
                     this.show_i_diagnosis_progressbar = true;
                     this.show_i_treatment_progressbar = true;
                     this.show_i_national_progressbar = true;
                     this.show_i_nvbcdp_progressbar = false;
                     this.show_i_rntcp_progressbar = true;
                    this.show_i_leprosy_progressbar = true;
                    this.show_i_ncd_progressbar = true;
                    this.show_i_nppc_progressbar = true;
                     this.show_geo_coordinate_progressbar = true;
                  } else if(this.sectorOrSubsectorNumber === 65){
                    this.show_c_progressbar = true;
                      this.show_d_progressbar = true;
                    this. show_e_newborn_progressbar =true;
                    this.show_e_meternalhealth_progressbar = true;
                    this.show_e_progressbar = true;
                    this.show_e_childhealth_progressbar = true;
                    this.show_e_vaccine_progressbar =true;
                    this.show_e_antibiotics_progressbar = true;
                    this.show_e_infra_progressbar = true;
                    this. show_e_infection_progressbar = true
                    this.show_e_andolescent_progressbar = true;
                    this.show_e_other_progressbar = true;
                     this.show_e_hr_progressbar = true;
                     this.show_f_ante_progressbar = true;
                      this.show_f_intra_progressbar = true;
                      this. show_f_newborn_progressbar = true;
                       this.show_f_family_progressbar = true;
                       this.show_f_client_progressbar = true;
                     this.show_f_facility_progressbar = true;
                     this.show_f_adloscent_progressbar = true;
                     this.show_h_service_progressbar = true;
                     this.show_h_healthinfo_progressbar = true;
                     this.show_h_hr_progressbar = true;
                     this.show_h_healthfinance_progressbar = true;
                     this.show_h_leadership_progressbar = true;
                     this.show_i_diagnosis_progressbar = true;
                     this.show_i_treatment_progressbar = true;
                     this.show_i_national_progressbar = true;
                     this.show_i_nvbcdp_progressbar = true;
                     this.show_i_rntcp_progressbar = false;
                    this.show_i_leprosy_progressbar = true;
                    this.show_i_ncd_progressbar = true;
                    this.show_i_nppc_progressbar = true;
                     this.show_geo_coordinate_progressbar = true;
                  } else if(this.sectorOrSubsectorNumber === 66){
                    this.show_c_progressbar = true;
                      this.show_d_progressbar = true;
                    this. show_e_newborn_progressbar =true;
                    this.show_e_meternalhealth_progressbar = true;
                    this.show_e_progressbar = true;
                    this.show_e_childhealth_progressbar = true;
                    this.show_e_vaccine_progressbar =true;
                    this.show_e_antibiotics_progressbar = true;
                    this.show_e_infra_progressbar = true;
                    this. show_e_infection_progressbar = true
                    this.show_e_andolescent_progressbar = true;
                    this.show_e_other_progressbar = true;
                     this.show_e_hr_progressbar = true;
                     this.show_f_ante_progressbar = true;
                      this.show_f_intra_progressbar = true;
                      this. show_f_newborn_progressbar = true;
                       this.show_f_family_progressbar = true;
                       this.show_f_client_progressbar = true;
                     this.show_f_facility_progressbar = true;
                     this.show_f_adloscent_progressbar = true;
                     this.show_h_service_progressbar = true;
                     this.show_h_healthinfo_progressbar = true;
                     this.show_h_hr_progressbar = true;
                     this.show_h_healthfinance_progressbar = true;
                     this.show_h_leadership_progressbar = true;
                     this.show_i_diagnosis_progressbar = true;
                     this.show_i_treatment_progressbar = true;
                     this.show_i_national_progressbar = true;
                     this.show_i_nvbcdp_progressbar = true;
                     this.show_i_rntcp_progressbar = true;
                    this.show_i_leprosy_progressbar = false;
                    this.show_i_ncd_progressbar = true;
                    this.show_i_nppc_progressbar = true;
                     this.show_geo_coordinate_progressbar = true;
                  } else if(this.sectorOrSubsectorNumber === 67){
                    this.show_c_progressbar = true;
                      this.show_d_progressbar = true;
                    this. show_e_newborn_progressbar =true;
                    this.show_e_meternalhealth_progressbar = true;
                    this.show_e_progressbar = true;
                    this.show_e_childhealth_progressbar = true;
                    this.show_e_vaccine_progressbar =true;
                    this.show_e_antibiotics_progressbar = true;
                    this.show_e_infra_progressbar = true;
                    this. show_e_infection_progressbar = true
                    this.show_e_andolescent_progressbar = true;
                    this.show_e_other_progressbar = true;
                     this.show_e_hr_progressbar = true;
                     this.show_f_ante_progressbar = true;
                      this.show_f_intra_progressbar = true;
                      this. show_f_newborn_progressbar = true;
                       this.show_f_family_progressbar = true;
                       this.show_f_client_progressbar = true;
                     this.show_f_facility_progressbar = true;
                     this.show_f_adloscent_progressbar = true;
                     this.show_h_service_progressbar = true;
                     this.show_h_healthinfo_progressbar = true;
                     this.show_h_hr_progressbar = true;
                     this.show_h_healthfinance_progressbar = true;
                     this.show_h_leadership_progressbar = true;
                     this.show_i_diagnosis_progressbar = true;
                     this.show_i_treatment_progressbar = true;
                     this.show_i_national_progressbar = true;
                     this.show_i_nvbcdp_progressbar = true;
                     this.show_i_rntcp_progressbar = true;
                    this.show_i_leprosy_progressbar = true;
                    this.show_i_ncd_progressbar = false;
                    this.show_i_nppc_progressbar = true;
                     this.show_geo_coordinate_progressbar = true;
                  } else if(this.sectorOrSubsectorNumber === 68){
                    this.show_c_progressbar = true;
                      this.show_d_progressbar = true;
                    this. show_e_newborn_progressbar =true;
                    this.show_e_meternalhealth_progressbar = true;
                    this.show_e_progressbar = true;
                    this.show_e_childhealth_progressbar = true;
                    this.show_e_vaccine_progressbar =true;
                    this.show_e_antibiotics_progressbar = true;
                    this.show_e_infra_progressbar = true;
                    this. show_e_infection_progressbar = true
                    this.show_e_andolescent_progressbar = true;
                    this.show_e_other_progressbar = true;
                     this.show_e_hr_progressbar = true;
                     this.show_f_ante_progressbar = true;
                      this.show_f_intra_progressbar = true;
                      this. show_f_newborn_progressbar = true;
                       this.show_f_family_progressbar = true;
                       this.show_f_client_progressbar = true;
                     this.show_f_facility_progressbar = true;
                     this.show_f_adloscent_progressbar = true;
                     this.show_h_service_progressbar = true;
                     this.show_h_healthinfo_progressbar = true;
                     this.show_h_hr_progressbar = true;
                     this.show_h_healthfinance_progressbar = true;
                     this.show_h_leadership_progressbar = true;
                     this.show_i_diagnosis_progressbar = true;
                     this.show_i_treatment_progressbar = true;
                     this.show_i_national_progressbar = true;
                     this.show_i_nvbcdp_progressbar = true;
                     this.show_i_rntcp_progressbar = true;
                    this.show_i_leprosy_progressbar = true;
                    this.show_i_ncd_progressbar = true;
                    this.show_i_nppc_progressbar = false;
                     this.show_geo_coordinate_progressbar = true;
  }else if(this.sectorOrSubsectorNumber === 112){
    this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =true;
    this.show_e_antibiotics_progressbar = true;
    this.show_e_infra_progressbar = true;
    this. show_e_infection_progressbar = true
    this.show_e_andolescent_progressbar = true;
    this.show_e_other_progressbar = true;
     this.show_e_hr_progressbar = true;
     this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = true;
      this. show_f_newborn_progressbar = true;
       this.show_f_family_progressbar = true;
       this.show_f_client_progressbar = true;
     this.show_f_facility_progressbar = true;
     this.show_f_adloscent_progressbar = true;
     this.show_h_service_progressbar = true;
     this.show_h_healthinfo_progressbar = true;
     this.show_h_hr_progressbar = true;
     this.show_h_healthfinance_progressbar = true;
     this.show_h_leadership_progressbar = true;
     this.show_i_diagnosis_progressbar = true;
     this.show_i_treatment_progressbar = true;
     this.show_i_national_progressbar = true;
     this.show_i_nvbcdp_progressbar = true;
     this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
  } else if(this.sectorOrSubsectorNumber === 113){
    this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =true;
    this.show_e_antibiotics_progressbar = true;
    this.show_e_infra_progressbar = true;
    this. show_e_infection_progressbar = true
    this.show_e_andolescent_progressbar = true;
    this.show_e_other_progressbar = true;
     this.show_e_hr_progressbar = true;
     this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = true;
      this. show_f_newborn_progressbar = true;
       this.show_f_family_progressbar = true;
       this.show_f_client_progressbar = true;
     this.show_f_facility_progressbar = true;
     this.show_f_adloscent_progressbar = true;
     this.show_h_service_progressbar = true;
     this.show_h_healthinfo_progressbar = true;
     this.show_h_hr_progressbar = true;
     this.show_h_healthfinance_progressbar = true;
     this.show_h_leadership_progressbar = true;
     this.show_i_diagnosis_progressbar = true;
     this.show_i_treatment_progressbar = true;
     this.show_i_national_progressbar = true;
     this.show_i_nvbcdp_progressbar = true;
     this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
  } else if(this.sectorOrSubsectorNumber === 114){
    this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =true;
    this.show_e_antibiotics_progressbar = true;
    this.show_e_infra_progressbar = true;
    this. show_e_infection_progressbar = true
    this.show_e_andolescent_progressbar = true;
    this.show_e_other_progressbar = true;
     this.show_e_hr_progressbar = true;
     this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = true;
      this. show_f_newborn_progressbar = true;
       this.show_f_family_progressbar = true;
       this.show_f_client_progressbar = true;
     this.show_f_facility_progressbar = true;
     this.show_f_adloscent_progressbar = true;
     this.show_h_service_progressbar = true;
     this.show_h_healthinfo_progressbar = true;
     this.show_h_hr_progressbar = true;
     this.show_h_healthfinance_progressbar = true;
     this.show_h_leadership_progressbar = true;
     this.show_i_diagnosis_progressbar = true;
     this.show_i_treatment_progressbar = true;
     this.show_i_national_progressbar = true;
     this.show_i_nvbcdp_progressbar = true;
     this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
  } else if(this.sectorOrSubsectorNumber === 115){
    this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =true;
    this.show_e_antibiotics_progressbar = true;
    this.show_e_infra_progressbar = true;
    this. show_e_infection_progressbar = true
    this.show_e_andolescent_progressbar = true;
    this.show_e_other_progressbar = true;
     this.show_e_hr_progressbar = true;
     this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = true;
      this. show_f_newborn_progressbar = true;
       this.show_f_family_progressbar = true;
       this.show_f_client_progressbar = true;
     this.show_f_facility_progressbar = true;
     this.show_f_adloscent_progressbar = true;
     this.show_h_service_progressbar = true;
     this.show_h_healthinfo_progressbar = true;
     this.show_h_hr_progressbar = true;
     this.show_h_healthfinance_progressbar = true;
     this.show_h_leadership_progressbar = true;
     this.show_i_diagnosis_progressbar = true;
     this.show_i_treatment_progressbar = true;
     this.show_i_national_progressbar = true;
     this.show_i_nvbcdp_progressbar = true;
     this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
  } else if(this.sectorOrSubsectorNumber === 116){
    this.show_c_progressbar = true;
      this.show_d_progressbar = true;
    this. show_e_newborn_progressbar =true;
    this.show_e_meternalhealth_progressbar = true;
    this.show_e_progressbar = true;
    this.show_e_childhealth_progressbar = true;
    this.show_e_vaccine_progressbar =true;
    this.show_e_antibiotics_progressbar = true;
    this.show_e_infra_progressbar = true;
    this. show_e_infection_progressbar = true
    this.show_e_andolescent_progressbar = true;
    this.show_e_other_progressbar = true;
     this.show_e_hr_progressbar = true;
     this.show_f_ante_progressbar = true;
      this.show_f_intra_progressbar = true;
      this. show_f_newborn_progressbar = true;
       this.show_f_family_progressbar = true;
       this.show_f_client_progressbar = true;
     this.show_f_facility_progressbar = true;
     this.show_f_adloscent_progressbar = true;
     this.show_h_service_progressbar = true;
     this.show_h_healthinfo_progressbar = true;
     this.show_h_hr_progressbar = true;
     this.show_h_healthfinance_progressbar = true;
     this.show_h_leadership_progressbar = true;
     this.show_i_diagnosis_progressbar = true;
     this.show_i_treatment_progressbar = true;
     this.show_i_national_progressbar = true;
     this.show_i_nvbcdp_progressbar = true;
     this.show_i_rntcp_progressbar = true;
    this.show_i_leprosy_progressbar = true;
    this.show_i_ncd_progressbar = true;
    this.show_i_nppc_progressbar = true;
     this.show_geo_coordinate_progressbar = true;
  }
  this.facilityTypeWiseScore();   
 
   if (this.sectorOrSubsectorNumber === 112 ||
     this.sectorOrSubsectorNumber === 113 ||
     this.sectorOrSubsectorNumber === 114 ||
     this.sectorOrSubsectorNumber === 115 ||
     this.sectorOrSubsectorNumber === 116) {
     if (!this.enableAdd && this.objectPlanofAction.sectionType !== this.sectorOrSubsectorNumber) {
           temp.alert4 = this.alertCtrl.create({ enableBackdropDismiss: false });
           temp.alert4.setCssClass('sectorSelectionModalFacility');
           temp.alert4.setTitle(MessageProvider.MESSAGES.FACILITY_PAGE_CANCEL_CONFIRM_TITLE);
           temp.alert4.setMessage(MessageProvider.MESSAGES.FACILITY_PAGE_PLAN_OF_ACTION_CONFIRM_MESSAGE);
           temp.alert4.addButton({
             text: MessageProvider.MESSAGES.FACILITY_COMMUNITY_PAGE_CANCEL_CONFIRM_NEGATIVE_TEXT,
             role: 'cancel',
             handler: data => {
               this.selectedSubsector = this.objectPlanofAction.sectionType;
             }
           });
           temp.alert4.addButton({
             text: MessageProvider.MESSAGES.FACILITY_COMMUNITY_PAGE_CANCEL_CONFIRM_POSITIVE_TEXT,
             handler: data => {
               let index = this.obj.planOfAction.indexOf(this.objectPlanofAction);
               this.obj.planOfAction.splice(index, 1);
               this.objectPlanofAction = {};
               this.enableAdd = true;
             }
           });

           temp.alert4.present();
         } 

       }
   
  }

/**
 * This method is going to do the initial setup of questions and subsectors
 */
  sectorSelectionWork(){
      
      let sectors = this.sectors.filter(sector=>sector.id===this.selectedSectorNumber);
      if(sectors[0].hasSubsector){        
        this.subsectors = sectors[0].subsectors;
        if (this.selectedSector=="4"){
          if(this.obj.c43==11 || this.obj.c43==12){
            let sectors = this.sectors.filter(sector=>sector.id===4);
            if(sectors[0].hasSubsector){        
              this.subsectors = sectors[0].subsectors.filter(sector=>sector.id!==47);
            }
          }
        }
        if (this.selectedSector=="5"){
          let sectors = this.sectors.filter(sector=>sector.id===5);
          let sectorFilter:any=[];
          sectorFilter=sectors[0].subsectors;
          if(this.obj.c43!=17){
            if(sectors[0].hasSubsector){        
              sectorFilter = sectorFilter.filter(sector=>sector.id!==53);
            }
          }
          if(this.obj.c43==11){
            if(sectors[0].hasSubsector){        
              sectorFilter = sectorFilter.filter(sector=>sector.id!==55);
            }
          }
          this.subsectors = sectorFilter;
        }
        if (this.selectedSector=="6"){
            let sectors = this.sectors.filter(sector=>sector.id===6);
            let sectorFilter:any=[];
            sectorFilter=sectors[0].subsectors;
            if(this.obj.c43==11 || this.obj.c43==12 || this.obj.c43==13 || this.obj.c43==14 || this.obj.c43==15 || this.obj.c43==16 || this.obj.c43==18){
              if(sectors[0].hasSubsector){        
                sectorFilter = sectorFilter.filter(sector=>sector.id!==68);
              }
            }
            if(this.obj.c43==11 || this.obj.c43==12 || this.obj.c43==13 || this.obj.c43==16 || this.obj.c43==18){
              if(sectors[0].hasSubsector){        
                sectorFilter = sectorFilter.filter(sector=>sector.id!==62);
              }
            }
            if(this.obj.c43==11){
              if(sectors[0].hasSubsector){        
                sectorFilter = sectorFilter.filter(sector=>sector.id!==65);
              }
              if(sectors[0].hasSubsector){        
                sectorFilter = sectorFilter.filter(sector=>sector.id!==66);
              }
            }
            this.subsectors=sectorFilter;
        }
        switch(sectors[0].id){
          case 3:
            this.selectedSubsector = "31";
            this.selectedSubSectorNumber = 31;
            this.sectorOrSubsectorNumber = 31;
            break;
          case 4:
            this.selectedSubsector = "41";
            this.selectedSubSectorNumber = 41;
            this.sectorOrSubsectorNumber = 41;
            break;
          case 5:
            this.selectedSubsector = "51";
            this.selectedSubSectorNumber = 51;
            this.sectorOrSubsectorNumber = 51;
            break;
          case 6:
            this.selectedSubsector = "61";
            this.selectedSubSectorNumber = 61;
            this.sectorOrSubsectorNumber = 61;
            break;
          case 8:
          let listObject: any = this.obj.planOfAction[this.obj.planOfAction.length - 1];
          if(this.objectPlanofAction==undefined || Object.keys(this.objectPlanofAction).length === 0){
            if (this.obj.planOfAction.length > 0 && !this.forEdit) {
                  this.selectedSubsector = listObject.sectionType;
                  this.selectedSubSectorNumber = listObject.sectionType;
                  this.sectorOrSubsectorNumber = listObject.sectionType;
            }else if(this.obj.planOfAction.length > 0 && this.forEdit && listObject.sectionType!=112){
                  this.selectedSubsector = listObject.sectionType;
                  this.selectedSubSectorNumber = listObject.sectionType;
                  this.sectorOrSubsectorNumber = listObject.sectionType;
            }else{
                  this.selectedSubsector = "112";
                  this.selectedSubSectorNumber = 112;
                  this.sectorOrSubsectorNumber = 112;
            }
          }else{
            if (this.obj.planOfAction.length > 0 && !this.forEdit) {
                  this.selectedSubsector = listObject.sectionType;
                  this.selectedSubSectorNumber = listObject.sectionType;
                  this.sectorOrSubsectorNumber = listObject.sectionType;
            }else if(this.obj.planOfAction.length > 0 && this.forEdit && this.objectPlanofAction.sectionType!=112){
                  this.selectedSubsector = this.objectPlanofAction.sectionType;
                  this.selectedSubSectorNumber = this.objectPlanofAction.sectionType;
                  this.sectorOrSubsectorNumber = this.objectPlanofAction.sectionType;
            }else{
                  this.selectedSubsector = "112";
                  this.selectedSubSectorNumber = 112;
                  this.sectorOrSubsectorNumber = 112;
            }
          }
          break;
        }
        this.showSubsectors = true;
      }else{
        this.sectorOrSubsectorNumber = this.selectedSectorNumber;
        this.showSubsectors = false;
      }
      
  }

  /**
 * This method is going to handle the cancel button event
 */
  cancel(){
      //show confirm alert
      //if confirmed go to home page   
        let temp = this;  
        temp.alert5 = this.alertCtrl.create({enableBackdropDismiss:false});
        temp.alert5.setCssClass('sectorSelectionModalFacility');
        temp.alert5.setTitle(MessageProvider.MESSAGES.FACILITY_PAGE_CANCEL_CONFIRM_TITLE);
        temp.alert5.setMessage(MessageProvider.MESSAGES.FACILITY_PAGE_CANCEL_MESSAGE);
        temp.alert5.addButton(MessageProvider.MESSAGES.FACILITY_COMMUNITY_PAGE_CANCEL_CONFIRM_NEGATIVE_TEXT);
        temp.alert5.addButton({
          text: MessageProvider.MESSAGES.FACILITY_COMMUNITY_PAGE_CANCEL_CONFIRM_POSITIVE_TEXT,
          handler: data => {
            this.navCtrl.pop();
            }
          });
        temp.alert5.present();
  }

  removePlanOfActionItem(object) {
    let temp = this;
    temp.alert6 = this.alertCtrl.create({enableBackdropDismiss:false});
        temp.alert6.setCssClass('sectorSelectionModalFacility');
        temp.alert6.setTitle(MessageProvider.MESSAGES.FACILITY_PAGE_CANCEL_CONFIRM_TITLE);
        temp.alert6.setMessage('Are you sure you want to delete?');
        temp.alert6.addButton(MessageProvider.MESSAGES.FACILITY_COMMUNITY_PAGE_CANCEL_CONFIRM_NEGATIVE_TEXT);
        temp.alert6.addButton({
          text: MessageProvider.MESSAGES.FACILITY_COMMUNITY_PAGE_CANCEL_CONFIRM_POSITIVE_TEXT,
          handler: () => {
            let index = this.obj.planOfAction.indexOf(object);
            this.obj.planOfAction.splice(index, 1);
            this.getValidateAcordion(object);
            }
          });
        temp.alert6.present();
  }

  getValidateAcordion(paObject){
    this.objectPlanofAction=paObject;
    let filteredObj = this.obj.planOfAction
    .filter(planofaction => planofaction.sectionType == this.sectorOrSubsectorNumber);
    let count:number = 0;
    filteredObj.forEach(eachObj => {
        if (eachObj.intervention_activities == "" ||
          eachObj.levelOfIntervention == null ||
          eachObj.responsibility == null ||
          eachObj.timeline == null ||
          eachObj.timeline == "") {
            count++;
        }
    });
    if(count>0){
      this.enableAdd = false;
      return true;
    }else{
      this.enableAdd = true;
      return false;
    }
  }
  addPlanOfActionItem() {
    this.content.scrollToBottom(300);
    this.toggleGroup(this.shownGroup);
    if (this.lvobj.length > 0) {
      this.toggleGroup1(this.shownGroup1);
    }
    let majorFindings: string = "";
    if(this.sectorOrSubsectorNumber === 112){ majorFindings="Infrastructure" }
    if(this.sectorOrSubsectorNumber === 113){ majorFindings = "Human Resource" }
    if(this.sectorOrSubsectorNumber === 114){ majorFindings = "Capacity building/ Training" }
    if(this.sectorOrSubsectorNumber === 115) { majorFindings = "Service delivery" }
    if(this.sectorOrSubsectorNumber === 116){ majorFindings = "Logistics and supplies" }
    let tempobject={
      majorFindings: majorFindings, intervention_activities: "",
      levelOfIntervention: null, responsibility: null, timeline: null,
      sectionType: this.sectorOrSubsectorNumber,
      organizationId : null
    }
    this.obj.planOfAction.push(tempobject);
    this.objectPlanofAction=tempobject;
    this.enableAdd = false;
    this.groupshow();
  }

  groupshow(){
    let filteredObj=this.obj.planOfAction.filter(planofaction => planofaction.sectionType == this.sectorOrSubsectorNumber);
    setTimeout(() => {
    this.toggleGroup(filteredObj.length - 1);
    },200)
  }
  
  filterResponsibilityByOrganiztion(organizationId, level){
    let temp = this;
    if(organizationId !== null && level !== null){
      temp.designationByOrg = [];
      temp.designationByOrg = temp.designations.filter(d=> d.organizationId == organizationId 
        && d.level == level && d.areaId == temp.stateObject.areaNId && d.isResponsibleFacility);
    }
  }
  planofactionObjectAssign(paObject){
    this.objectPlanofAction=paObject;
  }
  toggleGroup(group) {
      if (this.isGroupShown(group)) {
        this.shownGroup = null;
      } else {
        this.shownGroup = group;
        setTimeout(() => {
          this.content.scrollToBottom(300);
        },300)
      }
  };

  isGroupShown(group) {
      return this.shownGroup === group;
  };

  /**
   * These 2 methods are for prefetch.
   * @param group 
   */
  toggleGroup1(group) {
      if (this.isGroupShown1(group)) {
        this.shownGroup1 = null;
      } else {
        this.shownGroup1 = group;
        setTimeout(() => {
          this.content.scrollToBottom(300);
        },300)
      }
  };

  isGroupShown1(group) {
      return this.shownGroup1 === group;
  };

  /////////// Other field validation ////////////
  validate_hB1(){
    if(Number(this.obj.hB1)==0){
      this.obj.hB2 = null;
    }
  }
  validate_percentage(){
    if(Number(this.obj.hE1)>=0 && Number(this.obj.hE1)<=100){
      this.obj.hE1 =parseFloat(this.obj.hE1).toFixed(2);
    }else{
      this.obj.hE1 = null;
    }
  }
  validate_hB1_lessthan_dataelement(){
    if(Number(this.obj.hB1)>=0){
      if(Number(this.obj.hB2) > Number(this.obj.hB1)){
        this.obj.hB2 = null;
      }
    }
  }
  validate_hE2p1_lessthan(){
    if(Number(this.obj.hE2p1)>=0){
      if(Number(this.obj.hE3p1) > Number(this.obj.hE2p1)){
        this.obj.hE3p1 = null;
      }
    }
  }
  validate_hE2p2_lessthan(){
    if(Number(this.obj.hE2p2)>=0){
      if(Number(this.obj.hE3p2) > Number(this.obj.hE2p2)){
        this.obj.hE3p2 = null;
      }
    }
  }
  validate_hE2p3_lessthan(){
    if(Number(this.obj.hE2p3)>=0){
      if(Number(this.obj.hE3p3) > Number(this.obj.hE2p3)){
        this.obj.hE3p3 = null;
      }
    }
  }
  validate_hE2p4_lessthan(){
    if(Number(this.obj.hE2p4)>=0){
      if(Number(this.obj.hE3p4) > Number(this.obj.hE2p4)){
        this.obj.hE3p4 = null;
      }
    }
  }
  validate_hE2p5_lessthan(){
    if(Number(this.obj.hE2p5)>=0){
      if(Number(this.obj.hE3p5) > Number(this.obj.hE2p5)){
        this.obj.hE3p5 = null;
      }
    }
  }
  validate_d52_lessthan_d51totalnumber(){
    if(this.obj.d52!=null && this.obj.d52.length > 0){
      if(Number(this.obj.d51) > Number(this.obj.d52)){
        this.obj.d51 = null;
        this.dSectionForm.controls['d51'].invalid;
      }
    }
  }
  validate_d51_lessthan_d52totalnumber(){
    if(this.obj.d51!=null && this.obj.d51.length > 0){
      if(Number(this.obj.d51) > Number(this.obj.d52)){
        this.obj.d52 = null;
        this.dSectionForm.controls['d52'].invalid;
      }
    }
  }
  validate_d71_TotalNumber(){
    if(this.obj.d52!=null && this.obj.d52.length > 0){
      if(Number(this.obj.d71) > Number(this.obj.d52)){
        this.obj.d71 = null;
        this.dSectionForm.controls['d71'].invalid;
      }
    }
  }
  validate_d72_TotalNumber(){
    if(this.obj.d52!=null && this.obj.d52.length > 0){
      if(Number(this.obj.d72) > Number(this.obj.d52)){
        this.obj.d72 = null;
        this.dSectionForm.controls['d72'].invalid;
      }
    }
  }
  validate_d73_TotalNumber(){
    if(this.obj.d52!=null && this.obj.d52.length > 0){
      if(Number(this.obj.d73) > Number(this.obj.d52)){
        this.obj.d73 = null;
        this.dSectionForm.controls['d73'].invalid;
      }
    }
  }
  validate_d74_TotalNumber(){
    if(this.obj.d52!=null && this.obj.d52.length > 0){
      if(Number(this.obj.d74) > Number(this.obj.d52)){
        this.obj.d74 = null;
        this.dSectionForm.controls['d74'].invalid;
      }
    }
  }
  validate_d8_TotalNumber(){
    if(this.obj.d44!=null){
      if(Number(this.obj.d8) > Number(this.obj.d44)){
        this.obj.d8 = null;
        this.dSectionForm.controls['d8'].invalid;
      }
    }
  }
  validate_d131_TotalNumber(){
    if(this.obj.d3!=null && this.obj.d3.length > 0){
      if(Number(this.obj.d131) > Number(this.obj.d3)){
        this.obj.d131 = null;
        this.dSectionForm.controls['d131'].invalid;
      }
    }
  }
  validate_d132_TotalNumber(){
    if(this.obj.d3!=null && this.obj.d3.length > 0){
      if(Number(this.obj.d132) > Number(this.obj.d3)){
        this.obj.d132 = null;
        this.dSectionForm.controls['d132'].invalid;
      }
    }
  }
  validate_d133_TotalNumber(){
    if(this.obj.d3!=null && this.obj.d3.length > 0){
      if(Number(this.obj.d133) > Number(this.obj.d3)){
        this.obj.d133 = null;
        this.dSectionForm.controls['d133'].invalid;
      }
    }
  }
  validate_d134_TotalNumber(){
    if(this.obj.d3!=null && this.obj.d3.length > 0){
      if(Number(this.obj.d134) > Number(this.obj.d3)){
        this.obj.d134 = null;
        this.dSectionForm.controls['d134'].invalid;
      }
    }
  }
  validate_d135_TotalNumber(){
    if(this.obj.d3!=null && this.obj.d3.length > 0){
      if(Number(this.obj.d135) > Number(this.obj.d3)){
        this.obj.d135 = null;
        this.dSectionForm.controls['d135'].invalid;
      }
    }
  }
  validate_d136_TotalNumber(){
    if(this.obj.d3!=null && this.obj.d3.length > 0){
      if(Number(this.obj.d136) > Number(this.obj.d3)){
        this.obj.d136 = null;
        this.dSectionForm.controls['d136'].invalid;
      }
    }
  }
  validate_d137_TotalNumber(){
    if(this.obj.d3!=null && this.obj.d3.length > 0){
      if(Number(this.obj.d137) > Number(this.obj.d3)){
        this.obj.d137 = null;
        this.dSectionForm.controls['d137'].invalid;
      }
    }
  }
  validate_d138_TotalNumber(){
    if(this.obj.d3!=null && this.obj.d3.length > 0){
      if(Number(this.obj.d138) > Number(this.obj.d3)){
        this.obj.d138 = null;
        this.dSectionForm.controls['d138'].invalid;
      }
    }
  }
  validate_d162_Admitted(){
    if(this.obj.d161!=null && this.obj.d161.length > 0){
      if(Number(this.obj.d162) > Number(this.obj.d161)){
        this.obj.d162 = null;
        this.dSectionForm.controls['d162'].invalid;
      }
    }
  }
  validate_d172_Admitted(){
    if(this.obj.d171!=null && this.obj.d171.length > 0){
      if(Number(this.obj.d172) > Number(this.obj.d171)){
        this.obj.d172 = null;
        this.dSectionForm.controls['d172'].invalid;
      }
    }
  }
  validate_iG6_lessthan(){
    if(Number(this.obj.iG6)<=0){
      this.obj.iG6 = null;
    }
  }
  validate_iH1p1_lessthan(){
    if(Number(this.obj.iH1p1)<=0){
      this.obj.iH1p1 = null;
    }
  }
  validate_d53_and_d54_totalnumber(){
    this.obj.d55=  Number(this.obj.d53) + Number(this.obj.d54);
  }
  validate_d4_TotalNumber(){
    this.obj.d44=  Number(this.obj.d41) + Number(this.obj.d42) + Number(this.obj.d43);
  }
  validate_d5_TotalNumber(){
    this.obj.d58=  Number(this.obj.d52) + Number(this.obj.d55);
  }
  validate_d9_TotalNumber(){
    this.obj.d94=  Number(this.obj.d91) + Number(this.obj.d92) + Number(this.obj.d93);;
  }


  validate_c11_OtherField(val){
    if(Number(val)==7){
      this.cSectionForm.controls['c12'].setErrors({"c12_a_mismatch": true});
    }else{
      this.obj.c12=null;
      this.cSectionForm.controls['c12'].setErrors(null);
    }
  }
  validate_c3_OtherField(val){
    if(Number(val)==25){
      this.cSectionForm.controls['c31'].setErrors({"c31_a_mismatch": true});
    }else{
      this.obj.c31=null;
      this.cSectionForm.controls['c31'].setErrors(null);
    }
  }
  validate_c5_OtherField(val: any,facilityObj){
    let temp = this;
    if(val != null && facilityObj !=null){
        if(Number(val.id)==20){
          this.cSectionForm.controls['c51'].setErrors({"c51_a_mismatch": true});
        }else{
          this.obj.c51=null;
          this.cSectionForm.controls['c51'].setErrors(null);
        }
        this.validateOtherField(val.id);

        if(val.id != null && !this.forEdit && !this.facilityTypeDisable){
          this.disabledSector = false;
        
          temp.alert7 = this.alertCtrl.create({enableBackdropDismiss:false});
            temp.alert7.setCssClass('sectorSelectionModalFacility');
            temp.alert7.setTitle("Warning");
            temp.alert7.setMessage(MessageProvider.MESSAGES.FACILITY_TYPE_CONFIRMATION);
            temp.alert7.addButton({
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
                  //facil._overlay.data["inputs"][1].checked=false;
                  let facilityObj_tem:any=facilityObj._options._results;
                  for(var i=0; i < facilityObj_tem.length; i++) {
                      facilityObj._options._results[i].selected=false;
                  }
                  this.obj.c43=null;
                  this.facilityTypeObject = null;
                  this.facilityTypeDisable=false;
              }
            })
            temp.alert7.addButton({
              text: "Ok",
              handler: data => {
                this.facilityTypeDisable=true;
                this.facilityTypeDisableStatus=true;
              }
            });
            temp.alert7.present();

         }
    }
  }

  validate_c6_OtherField(val: any,facilityObj){
    let temp = this;

    if(val != null && !this.forEdit && !this.facilityLevelDisable){
    temp.alert7 = this.alertCtrl.create({enableBackdropDismiss:false});
            temp.alert7.setCssClass('sectorSelectionModalFacility');
            temp.alert7.setTitle("Warning");
            temp.alert7.setMessage(MessageProvider.MESSAGES.FACILITY_LEVEL_CONFIRMATION);
            temp.alert7.addButton({
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
                  //facil._overlay.data["inputs"][1].checked=false;
                  let facilityObj_tem:any=facilityObj._options._results;
                  for(var i=0; i < facilityObj_tem.length; i++) {
                      facilityObj._options._results[i].selected=false;
                  }
                  this.obj.c6=null;
                  this.facilityLevelDisable=false;
              }
            })
            temp.alert7.addButton({
              text: "Ok",
              handler: data => {
                this.facilityLevelDisable=true;
                this.facilityLevelDisableStatus=true;
              }
            });
            temp.alert7.present();
          }
  }

  validateOtherField(val: any){
     if(Number(val)==11){
        this.e11SectionForm.controls['e11g1'].setErrors(null);
        this.e11SectionForm.controls['e1111'].setErrors(null);
        this.e11SectionForm.controls['e1112'].setErrors(null);
        this.e11SectionForm.controls['e1113'].setErrors(null);
        this.e11SectionForm.controls['e1114'].setErrors(null);
        this.e11SectionForm.controls['e1115'].setErrors(null);

        this.e11SectionForm.controls['e11g2'].setErrors(null);
        this.e11SectionForm.controls['e1121'].setErrors(null);
        this.e11SectionForm.controls['e1122'].setErrors(null);
        this.e11SectionForm.controls['e1123'].setErrors(null);
        this.e11SectionForm.controls['e1124'].setErrors(null);
        this.e11SectionForm.controls['e1125'].setErrors(null);

        this.e11SectionForm.controls['e11g4'].setErrors(null);
        this.e11SectionForm.controls['e1141'].setErrors(null);
        this.e11SectionForm.controls['e1142'].setErrors(null);
        this.e11SectionForm.controls['e1143'].setErrors(null);
        this.e11SectionForm.controls['e1144'].setErrors(null);
        this.e11SectionForm.controls['e1145'].setErrors(null);

        this.h1SectionForm.controls["hA2"].setErrors(null);
        this.h1SectionForm.controls["hA2p1"].setErrors(null);
        this.h1SectionForm.controls["hA2p2"].setErrors(null);
        this.h1SectionForm.controls["hA3"].setErrors(null);
        this.h1SectionForm.controls["hA3p1"].setErrors(null);
        this.h3SectionForm.controls["hC1"].setErrors(null);
        this.h3SectionForm.controls["hC2"].setErrors(null);
        this.h4SectionForm.controls["hE2p1"].setErrors(null);
        this.h4SectionForm.controls["hE2p2"].setErrors(null);
        this.h4SectionForm.controls["hE2p3"].setErrors(null);
        this.h4SectionForm.controls["hE2p4"].setErrors(null);
        this.h4SectionForm.controls["hE3p1"].setErrors(null);
        this.h4SectionForm.controls["hE3p2"].setErrors(null);
        this.h4SectionForm.controls["hE3p3"].setErrors(null);
        this.h4SectionForm.controls["hE3p4"].setErrors(null);
        this.h5SectionForm.controls["hF1"].setErrors(null);
        this.h5SectionForm.controls["hF1p1"].setErrors(null);
        this.h5SectionForm.controls["hF1p2"].setErrors(null);
        this.h5SectionForm.controls["hF1p2p1"].setErrors(null);
        this.h5SectionForm.controls["hF2"].setErrors(null);
        this.i1SectionForm.controls["iA2"].setErrors(null);
        this.i2SectionForm.controls["iB1"].setErrors(null);
        this.i2SectionForm.controls["iB2"].setErrors(null);
        this.i2SectionForm.controls["iB3"].setErrors(null);
        this.i2SectionForm.controls["iB4"].setErrors(null);
        this.i2SectionForm.controls["iB4p1"].setErrors(null);

        this.i4SectionForm.controls["iDB2"].setErrors(null);
        this.i4SectionForm.controls["iDD1"].setErrors(null);
        this.i6SectionForm.controls["iF1"].setErrors(null);
        this.i7SectionForm.controls["iG5"].setErrors(null);
        this.i8SectionForm.controls["iH1"].setErrors(null);
        this.i8SectionForm.controls["iH1p1"].setErrors(null);
        this.i8SectionForm.controls["iH2"].setErrors(null);

        this.i4SectionForm.controls["iDC1"].setErrors(null);
        this.i4SectionForm.controls["iDE1"].setErrors(null);
        this.i4SectionForm.controls["iDE2"].setErrors(null);
        this.i4SectionForm.controls["iDE3"].setErrors(null);
        this.i4SectionForm.controls["iDE4"].setErrors(null);
        this.i4SectionForm.controls["iDE5"].setErrors(null);
        this.i4SectionForm.controls["iDE6"].setErrors(null);
        this.i5SectionForm.controls["iE2"].setErrors(null);
        this.i5SectionForm.controls["iE3"].setErrors(null);
        this.i5SectionForm.controls["iE4"].setErrors(null);
        this.i5SectionForm.controls["iE5"].setErrors(null);
        this.i5SectionForm.controls["iE6"].setErrors(null);
        this.i6SectionForm.controls["iF2"].setErrors(null);
        this.i6SectionForm.controls["iF3"].setErrors(null);
        this.i6SectionForm.controls["iF4"].setErrors(null);

        this.i7SectionForm.controls["iG1"].setErrors(null);
        this.i7SectionForm.controls["iG2"].setErrors(null);
        this.i7SectionForm.controls["iG3p1"].setErrors(null);
        this.i7SectionForm.controls["iG4p1"].setErrors(null);
     }
     if(Number(val)==12){
        this.e11SectionForm.controls['e11g4'].setErrors(null);
        this.e11SectionForm.controls['e1141'].setErrors(null);
        this.e11SectionForm.controls['e1142'].setErrors(null);
        this.e11SectionForm.controls['e1143'].setErrors(null);
        this.e11SectionForm.controls['e1144'].setErrors(null);
        this.e11SectionForm.controls['e1145'].setErrors(null);

        this.h1SectionForm.controls["hA2"].setErrors(null);
        this.h1SectionForm.controls["hA2p1"].setErrors(null);
        this.h1SectionForm.controls["hA2p2"].setErrors(null);
        this.h1SectionForm.controls["hA3"].setErrors(null);
        this.h1SectionForm.controls["hA3p1"].setErrors(null);

        this.i1SectionForm.controls["iA2"].setErrors(null);
        this.h3SectionForm.controls["hC1"].setErrors(null);
        this.h3SectionForm.controls["hC2"].setErrors(null);
        this.h5SectionForm.controls["hF2"].setErrors(null);
        this.i2SectionForm.controls["iB1"].setErrors(null);
        this.i2SectionForm.controls["iB2"].setErrors(null);
        this.i2SectionForm.controls["iB3"].setErrors(null);
        this.i2SectionForm.controls["iB4"].setErrors(null);
        this.i2SectionForm.controls["iB4p1"].setErrors(null);

        this.i4SectionForm.controls["iDB2"].setErrors(null);
        this.i4SectionForm.controls["iDD1"].setErrors(null);
        this.i6SectionForm.controls["iF1"].setErrors(null);
        this.i7SectionForm.controls["iG5"].setErrors(null);
        this.i8SectionForm.controls["iH1"].setErrors(null);
        this.i8SectionForm.controls["iH1p1"].setErrors(null);
        this.i8SectionForm.controls["iH2"].setErrors(null);

        this.i7SectionForm.controls["iG1"].setErrors(null);
        this.i7SectionForm.controls["iG2"].setErrors(null);
        this.i7SectionForm.controls["iG3p1"].setErrors(null);
        this.i7SectionForm.controls["iG4p1"].setErrors(null);
     }
     if(Number(val)==11||Number(val)==12){
        this.e1SectionForm.controls['e122'].setErrors(null);
        this.e1SectionForm.controls['e17'].setErrors(null);
        this.e2SectionForm.controls['e24'].setErrors(null);
        this.e2SectionForm.controls['e27'].setErrors(null);
        this.e2SectionForm.controls['e28'].setErrors(null);
        this.e2SectionForm.controls['e210'].setErrors(null);
        this.e2SectionForm.controls['e211'].setErrors(null);
        this.e2SectionForm.controls['e220'].setErrors(null);
        this.e2SectionForm.controls['e221'].setErrors(null);
        this.e2SectionForm.controls['e222'].setErrors(null);
        this.e2SectionForm.controls['e227'].setErrors(null);
        this.e2SectionForm.controls['e228'].setErrors(null);
        this.e2SectionForm.controls['e230'].setErrors(null);
        this.e3SectionForm.controls['e38'].setErrors(null);
        this.e7SectionForm.controls['e74'].setErrors(null);
        this.e7SectionForm.controls['e75'].setErrors(null);
        this.e7SectionForm.controls['e77'].setErrors(null);
        this.e10SectionForm.controls['e102'].setErrors(null);
        this.e10SectionForm.controls['e108'].setErrors(null);
        this.e10SectionForm.controls['e109'].setErrors(null);
        this.e10SectionForm.controls['e1010'].setErrors(null);
        this.e10SectionForm.controls['e1011'].setErrors(null);
        this.e11SectionForm.controls['e1145'].setErrors(null);
        this.f1SectionForm.controls['f19'].setErrors(null);
        this.f3SectionForm.controls['f310'].setErrors(null);
        this.f4SectionForm.controls['f44'].setErrors(null);
        this.f7SectionForm.controls['f71'].setErrors(null);
        this.f7SectionForm.controls['f72'].setErrors(null);
        this.f7SectionForm.controls['f73'].setErrors(null);
        this.f7SectionForm.controls['f74'].setErrors(null);
        this.f7SectionForm.controls['f75'].setErrors(null);
        this.f7SectionForm.controls['f76'].setErrors(null);
        this.f7SectionForm.controls['f77'].setErrors(null);
        this.f7SectionForm.controls['f78'].setErrors(null);
        this.f7SectionForm.controls['f79'].setErrors(null);
        this.f7SectionForm.controls['f710'].setErrors(null);
        this.f7SectionForm.controls['f711'].setErrors(null);
        }
        if(Number(val)==13||Number(val)==14||Number(val)==15||Number(val)==16){
          this.e2SectionForm.controls['e210'].setErrors(null);
          this.e2SectionForm.controls['e222'].setErrors(null);
          this.e2SectionForm.controls['e227'].setErrors(null);
          this.e2SectionForm.controls['e228'].setErrors(null);
          this.e7SectionForm.controls['e75'].setErrors(null);
          this.e10SectionForm.controls['e108'].setErrors(null);
          this.e11SectionForm.controls['e1141'].setErrors(null);
          this.e11SectionForm.controls['e1142'].setErrors(null);
          this.e11SectionForm.controls['e1143'].setErrors(null);
          this.e11SectionForm.controls['e1144'].setErrors(null);
          this.f1SectionForm.controls['f19'].setErrors(null);
        }
        if(Number(val)==13||Number(val)==14){
          this.e7SectionForm.controls['e77'].setErrors(null);
          this.e11SectionForm.controls['e1141'].setErrors(null);
          this.e11SectionForm.controls['e1142'].setErrors(null);
          this.e11SectionForm.controls['e1143'].setErrors(null);
          this.e11SectionForm.controls['e1144'].setErrors(null);
          this.f3SectionForm.controls['f310'].setErrors(null);
          this.f4SectionForm.controls['f44'].setErrors(null);
        }
        if(Number(val)==17||Number(val)==18){
          this.e11SectionForm.controls['e1141'].setErrors(null);
          this.e11SectionForm.controls['e1142'].setErrors(null);
          this.e11SectionForm.controls['e1143'].setErrors(null);
          this.e11SectionForm.controls['e1144'].setErrors(null);
        }
        if(Number(val)==11||Number(val)==12||Number(val)==15||Number(val)==16||Number(val)==17||Number(val)==18){
          this.f4SectionForm.controls['f45'].setErrors(null);
        }
        if(Number(val)==12||Number(val)==13||Number(val)==14||Number(val)==15||Number(val)==16||Number(val)==17||Number(val)==18){
          this.i4SectionForm.controls['iDA3p1'].setErrors(null);
          this.i4SectionForm.controls['iDA3p2'].setErrors(null);
          this.i4SectionForm.controls['iDA3p5'].setErrors(null);
        }
        if(Number(val)==11||Number(val)==12||Number(val)==13||Number(val)==14||Number(val)==15||Number(val)==16||Number(val)==18){
          this.i4SectionForm.controls['iDB1'].setErrors(null);
          this.i4SectionForm.controls['iDC2'].setErrors(null);
          this.i4SectionForm.controls['iDC3'].setErrors(null);
          this.i5SectionForm.controls['iE1'].setErrors(null);
        }
        if(Number(val)==17){
          this.cSectionForm.controls['block'].setErrors(null);
        }
        if(Number(val)==13){
          this.h1SectionForm.controls["hA2"].setErrors(null);
          this.h1SectionForm.controls["hA2p1"].setErrors(null);
          this.h1SectionForm.controls["hA2p2"].setErrors(null);
          this.h1SectionForm.controls["hA3"].setErrors(null);
          this.h1SectionForm.controls["hA3p1"].setErrors(null);
          this.i1SectionForm.controls["iA2"].setErrors(null);
          this.h3SectionForm.controls["hC1"].setErrors(null);
          this.h3SectionForm.controls["hC2"].setErrors(null);
          this.h5SectionForm.controls["hF2"].setErrors(null);
          this.i2SectionForm.controls["iB1"].setErrors(null);
          this.i2SectionForm.controls["iB2"].setErrors(null);
          this.i2SectionForm.controls["iB3"].setErrors(null);
          this.i2SectionForm.controls["iB4"].setErrors(null);
          this.i2SectionForm.controls["iB4p1"].setErrors(null);

          this.i4SectionForm.controls["iDB2"].setErrors(null);
          this.i4SectionForm.controls["iDD1"].setErrors(null);
          this.i6SectionForm.controls["iF1"].setErrors(null);
          this.i7SectionForm.controls["iG5"].setErrors(null);
          this.i8SectionForm.controls["iH1"].setErrors(null);
          this.i8SectionForm.controls["iH1p1"].setErrors(null);
          this.i8SectionForm.controls["iH2"].setErrors(null);

          this.i7SectionForm.controls["iG1"].setErrors(null);
          this.i7SectionForm.controls["iG2"].setErrors(null);
          this.i7SectionForm.controls["iG3p1"].setErrors(null);
          this.i7SectionForm.controls["iG4p1"].setErrors(null);
        }
        if(Number(val)==14){
          this.i2SectionForm.controls["iB2"].setErrors(null);
          this.i2SectionForm.controls["iB3"].setErrors(null);
          this.i2SectionForm.controls["iB4"].setErrors(null);
          this.i2SectionForm.controls["iB4p1"].setErrors(null);
          this.h3SectionForm.controls["hC1"].setErrors(null);
          this.h3SectionForm.controls["hC2"].setErrors(null);
          this.h5SectionForm.controls["hF2"].setErrors(null);

          this.i4SectionForm.controls["iDB2"].setErrors(null);
          this.i4SectionForm.controls["iDD1"].setErrors(null);
          this.i6SectionForm.controls["iF1"].setErrors(null);
          this.i7SectionForm.controls["iG5"].setErrors(null);
          this.i8SectionForm.controls["iH1"].setErrors(null);
          this.i8SectionForm.controls["iH1p1"].setErrors(null);
          this.i8SectionForm.controls["iH2"].setErrors(null);
        }
        if(Number(val)==15){
          this.i2SectionForm.controls["iB2"].setErrors(null);
          this.i2SectionForm.controls["iB3"].setErrors(null);
          this.i2SectionForm.controls["iB4"].setErrors(null);
          this.i2SectionForm.controls["iB4p1"].setErrors(null);
          this.h3SectionForm.controls["hC1"].setErrors(null);
          this.h3SectionForm.controls["hC2"].setErrors(null);
          this.h5SectionForm.controls["hF2"].setErrors(null);

          this.i4SectionForm.controls["iDB2"].setErrors(null);
          this.i4SectionForm.controls["iDD1"].setErrors(null);
          this.i6SectionForm.controls["iF1"].setErrors(null);
          this.i7SectionForm.controls["iG5"].setErrors(null);
          this.i8SectionForm.controls["iH1"].setErrors(null);
          this.i8SectionForm.controls["iH1p1"].setErrors(null);
          this.i8SectionForm.controls["iH2"].setErrors(null);
        }
        if(Number(val)==16){
          this.h3SectionForm.controls["hC1"].setErrors(null);
          this.h3SectionForm.controls["hC2"].setErrors(null);
          this.i1SectionForm.controls["iA2"].setErrors(null);
          this.i2SectionForm.controls["iB1"].setErrors(null);
          this.i2SectionForm.controls["iB2"].setErrors(null);
          this.i2SectionForm.controls["iB3"].setErrors(null);
          this.i2SectionForm.controls["iB4"].setErrors(null);
          this.i2SectionForm.controls["iB4p1"].setErrors(null);

          this.i4SectionForm.controls["iDB2"].setErrors(null);
          this.i4SectionForm.controls["iDD1"].setErrors(null);
          this.i6SectionForm.controls["iF1"].setErrors(null);
          this.i7SectionForm.controls["iG5"].setErrors(null);
          this.i8SectionForm.controls["iH1"].setErrors(null);
          this.i8SectionForm.controls["iH1p1"].setErrors(null);
          this.i8SectionForm.controls["iH2"].setErrors(null);
        }
        if(Number(val)==18){
          this.h3SectionForm.controls["hC1"].setErrors(null);
          this.h3SectionForm.controls["hC2"].setErrors(null);
          this.i1SectionForm.controls["iA2"].setErrors(null);
          this.i2SectionForm.controls["iB1"].setErrors(null);
          this.i2SectionForm.controls["iB2"].setErrors(null);
          this.i2SectionForm.controls["iB3"].setErrors(null);
          this.i2SectionForm.controls["iB4"].setErrors(null);
          this.i2SectionForm.controls["iB4p1"].setErrors(null);

          this.i4SectionForm.controls["iDB2"].setErrors(null);
          this.i4SectionForm.controls["iDD1"].setErrors(null);
          this.i6SectionForm.controls["iF1"].setErrors(null);
          this.i7SectionForm.controls["iG5"].setErrors(null);
          this.i8SectionForm.controls["iH1"].setErrors(null);
          this.i8SectionForm.controls["iH1p1"].setErrors(null);
          this.i8SectionForm.controls["iH2"].setErrors(null);
        }
   }
   validatee21Field(val: any){
    if(Number(val)==27 || Number(val)==29){

      this.obj.e22= null;
      
      this.facilityradioObj["e22"] = false;

      this.facilityradioObjTemp["e22"] = null

      this.e2SectionForm.controls["e22"].setErrors(null); 
    }
   }

   validatef11Field(val: any){
    if(this.obj.f11==0 || this.obj.f11==null || this.obj.f11==""){
      this.isf11 = false;
      this.obj.f12 = null;
      this.obj.f13 = null;
      this.obj.f14 = null;
      this.obj.f15 = null;
      this.obj.f16 = null;
      this.obj.f17 = null;
      this.obj.f18 = null;
      this.obj.f19 = null;
      this.obj.f110 = null;
      this.obj.f111 = null;
      this.facilityradioObj["f12"] = false;
      this.facilityradioObjTemp["f12"] = null
      this.f1SectionForm.controls["f12"].setErrors(null);
      this.facilityradioObj["f13"] = false;
      this.facilityradioObjTemp["f13"] = null
      this.f1SectionForm.controls["f13"].setErrors(null);
      this.facilityradioObj["f14"] = false;
      this.facilityradioObjTemp["f14"] = null
      this.f1SectionForm.controls["f14"].setErrors(null);
      this.facilityradioObj["f15"] = false;
      this.facilityradioObjTemp["f15"] = null
      this.f1SectionForm.controls["f15"].setErrors(null);
      this.facilityradioObj["f16"] = false;
      this.facilityradioObjTemp["f16"] = null
      this.f1SectionForm.controls["f16"].setErrors(null);
      this.facilityradioObj["f17"] = false;
      this.facilityradioObjTemp["f17"] = null
      this.f1SectionForm.controls["f17"].setErrors(null);
      this.facilityradioObj["f18"] = false;
      this.facilityradioObjTemp["f18"] = null
      this.f1SectionForm.controls["f18"].setErrors(null);
      this.facilityradioObj["f19"] = false;
      this.facilityradioObjTemp["f19"] = null
      this.f1SectionForm.controls["f19"].setErrors(null);
      this.facilityradioObj["f110"] = false;
      this.facilityradioObjTemp["f110"] = null
      this.f1SectionForm.controls["f110"].setErrors(null);
      this.facilityradioObj["f111"] = false;
      this.facilityradioObjTemp["f111"] = null
      this.f1SectionForm.controls["f111"].setErrors(null);
      for(let ids of [118,119,120,121,122,123,124,125,126,127]) {
        this.deleteRowsfromCounterObj(ids);
      }
    }
   }

   validatehA2Field(val: any){
    if(Number(val)==34){
      this.obj.hA2p1= null;
      this.obj.hA2p2= null;
      
      this.facilityradioObj["hA2p1"] = false;
      this.facilityradioObj["hA2p2"] = false;

      this.facilityradioObjTemp["hA2p1"] = null;
      this.facilityradioObjTemp["hA2p2"] = null;

      this.h1SectionForm.controls["hA2p1"].setErrors(null);
      this.h1SectionForm.controls["hA2p2"].setErrors(null);
    }
   }

   validatehA3Field(val: any){
    if(Number(val)==34){
      this.obj.hA3p1= null;
      
      this.facilityradioObj["hA3p1"] = false;

      this.facilityradioObjTemp["hA3p1"] = null

      this.h1SectionForm.controls["hA3p1"].setErrors(null);
    }
   }

   validatehF1Field(val: any){
    if(Number(val)==34){
      this.obj.hF1p1= null;
      this.obj.hF1p2= null;
      this.obj.hF1p2p1= null;
      
      this.facilityradioObj["hF1p1"] = false;
      this.facilityradioObj["hF1p2"] = false;
      this.facilityradioObj["hF1p2p1"] = false;

      this.facilityradioObjTemp["hF1p1"] = null
      this.facilityradioObjTemp["hF1p2"] = null
      this.facilityradioObjTemp["hF1p2p1"] = null

      this.h5SectionForm.controls["hF1p1"].setErrors(null);
      this.h5SectionForm.controls["hF1p2"].setErrors(null);
      this.h5SectionForm.controls["hF1p2p1"].setErrors(null);
    }
   }

   validatehF1p2Field(val: any){
    if(Number(val)==34){
      this.obj.hF1p2p1= null;
      
      this.facilityradioObj["hF1p2p1"] = false;

      this.facilityradioObjTemp["hF1p2p1"] = null

      this.h5SectionForm.controls["hF1p2p1"].setErrors(null);
    }
   }

   validateiB4Field(val: any){
    if(Number(val)==34){
      this.obj.iB4p1= null;
      
      this.facilityradioObj["iB4p1"] = false;

      this.facilityradioObjTemp["iB4p1"] = null

      this.i2SectionForm.controls["iB4p1"].setErrors(null);
    }
   }
    validateiDA3Field(val: any){
    if(Number(val)==34){
      this.obj.iDA3p1= null;
      this.obj.iDA3p2= null;
      this.obj.iDA3p3= null;
      this.obj.iDA3p4= null;
      this.obj.iDA3p5= null;
      this.obj.iDA3p6= null;
      this.obj.iDA3p7= null;
      
      this.facilityradioObj["iDA3p1"] = false;
      this.facilityradioObj["iDA3p2"] = false;
      this.facilityradioObj["iDA3p3"] = false;
      this.facilityradioObj["iDA3p4"] = false;
      this.facilityradioObj["iDA3p5"] = false;
      this.facilityradioObj["iDA3p6"] = false;
      this.facilityradioObj["iDA3p7"] = false;

      this.facilityradioObjTemp["iDA3p1"] = null
      this.facilityradioObjTemp["iDA3p2"] = null
      this.facilityradioObjTemp["iDA3p3"] = null
      this.facilityradioObjTemp["iDA3p4"] = null
      this.facilityradioObjTemp["iDA3p5"] = null
      this.facilityradioObjTemp["iDA3p6"] = null
      this.facilityradioObjTemp["iDA3p7"] = null

      this.i4SectionForm.controls["iDA3p1"].setErrors(null);
      this.i4SectionForm.controls["iDA3p2"].setErrors(null);
      this.i4SectionForm.controls["iDA3p3"].setErrors(null);
      this.i4SectionForm.controls["iDA3p4"].setErrors(null);
      this.i4SectionForm.controls["iDA3p5"].setErrors(null);
      this.i4SectionForm.controls["iDA3p6"].setErrors(null);
      this.i4SectionForm.controls["iDA3p7"].setErrors(null);
    }
   }
   validateiG3Field(val: any){
    if(Number(val)==34){
      this.obj.iG3p1= null;
            
      this.facilityradioObj["iG3p1"] = false;

      this.facilityradioObjTemp["iG3p1"] = null

      this.i7SectionForm.controls["iG3p1"].setErrors(null);
    }
   }
   validateiG4Field(val: any){
    if(Number(val)==34){
      this.obj.iG4p1= null;
            
      this.facilityradioObj["iG4p1"] = false;

      this.facilityradioObjTemp["iG4p1"] = null

      this.i7SectionForm.controls["iG4p1"].setErrors(null);
    }
   }
   validateiH1Field(val: any){
    if(Number(val)==34){
      this.obj.iH1p1= null;
      
      this.facilityradioObj["iH1p1"] = false;

      this.facilityradioObjTemp["iH1p1"] = null

      this.i8SectionForm.controls["iH1p1"].setErrors(null);
    }
   }
   validateiB4(){
     if(this.obj.c43 == 17){
        if(this.obj.iB4 != null && this.obj.iB4 == 33){
          if(this.obj.iB4p1 == null || this.obj.iB4p1 == undefined){
            return false;
          }else{
            return true;
          }
        }else{
          return true;
        }
     } else {
       return true;
     }
    }
    validateiDA3(){
      if(this.obj.c43 == 11){
        if(this.obj.iDA3 != null && this.obj.iDA3 == 33){
          if((this.obj.iDA3p1 == null || this.obj.iDA3p1 == undefined)||
          (this.obj.iDA3p2 == null || this.obj.iDA3p2 == undefined)||
          (this.obj.iDA3p3 == null || this.obj.iDA3p3 == undefined)||
          (this.obj.iDA3p4 == null || this.obj.iDA3p4 == undefined)||
          (this.obj.iDA3p5 == null || this.obj.iDA3p5 == undefined)||
          (this.obj.iDA3p6 == null || this.obj.iDA3p6 == undefined)||
          (this.obj.iDA3p7 == null || this.obj.iDA3p7 == undefined)) {
            return false;
          }else{
            return true;
          }
        }else{
          return true;
        }
     } else if(this.obj.c43 != 11){
      if(this.obj.iDA3 != null && this.obj.iDA3 == 33){
        if((this.obj.iDA3p3 == null || this.obj.iDA3p3 == undefined)||
        (this.obj.iDA3p4 == null || this.obj.iDA3p4 == undefined)||
        (this.obj.iDA3p6 == null || this.obj.iDA3p6 == undefined)||
        (this.obj.iDA3p7 == null || this.obj.iDA3p7 == undefined)) {
          return false;
        }else{
          return true;
        }
      }else{
        return true;
      }
     }
    }
    validateiG3(){
      if(this.obj.c43 > 13){
        if(this.obj.iG3 != null && this.obj.iG3 == 33){
          if(this.obj.iG3p1 == null || this.obj.iG3p1 == undefined){
            return false;
          }else{
            return true;
          }
        }else{
          return true;
        }
     } else {
       return true;
     }
    }
    validateiG4(){
      if(this.obj.c43 > 13){
        if(this.obj.iG4 != null && this.obj.iG4 == 33){
          if(this.obj.iG4p1 == null || this.obj.iG4p1 == undefined){
            return false;
          }else{
            return true;
          }
        }else{
          return true;
        }
     } else {
       return true;
     }
    }
    validateiH1(){
      if(this.obj.c43 == 17){
        if(this.obj.iH1 != null && this.obj.iH1 == 33){
          if(this.obj.iH1p1 == null || this.obj.iH1p1 == undefined || this.obj.iH1p1 == ""){
            return false;
          }else{
            return true;
          }
        }else{
          return true;
        }
     } else {
       return true;
     }
    }
    validatehA2(){
      if(this.obj.c43>13){
        if(this.obj.hA2 != null && this.obj.hA2 == 33){
          if((this.obj.hA2p1 == null || this.obj.hA2p1 == undefined) && 
          (this.obj.hA2p2 == null || this.obj.hA2p2 == undefined)){
            return false;
          }else if((this.obj.hA2p1 != null || this.obj.hA2p1 != undefined) && 
          (this.obj.hA2p2 == null || this.obj.hA2p2 == undefined)){
            return false
          }else if((this.obj.hA2p1 == null || this.obj.hA2p1 == undefined) && 
          (this.obj.hA2p2 != null || this.obj.hA2p2 != undefined)){
            return false;
          }else{
            return true;
          }
        }else{
          return true;
        }
      } else {
       return true;
     }
    }
    validatehA3(){
      if(this.obj.c43 > 13){
        if(this.obj.hA3 != null && this.obj.hA3 == 33){
          if(this.obj.hA3p1 == null || this.obj.hA3p1 == undefined || this.obj.hA3p1 == ""){
            return false;
          }else{
            return true;
          }
        }else{
          return true;
        }
     } else {
       return true;
     }
    }
    validatehF1(){
      if(this.obj.c43>11){
        if(this.obj.hF1 != null && this.obj.hF1 == 33){
          if((this.obj.hF1p1 == null || this.obj.hF1p1 == undefined) && 
          (this.obj.hF1p2 == null || this.obj.hF1p2 == undefined)){
            return false;
          }else if((this.obj.hF1p1 != null || this.obj.hF1p1 != undefined) && 
          (this.obj.hF1p2 == null || this.obj.hF1p2 == undefined)){
            return false
          }else if((this.obj.hF1p1 == null || this.obj.hF1p1 == undefined) && 
          (this.obj.hF1p2 != null || this.obj.hF1p2 != undefined)){
            return false;
          }else{
            return true;
          }
        }else{
          return true;
        }
      } else {
       return true;
     }
    }
    validatehF1p2(){
        if(this.obj.hF1p2 != null || this.obj.hF1p2 != undefined){
          if(this.obj.c43 > 11){
            if(this.obj.hF1p2 != null && this.obj.hF1p2 == 33){
              if(this.obj.hF1p2p1 == null || this.obj.hF1p2p1 == undefined || this.obj.hF1p2p1 == ""){
                return false;
              }else{
                return true;
              }
            }else{
              return true;
            }
        } else {
          return true;
        }
      }else{
        return true;
      }
    }
    validatefacilitiesL2L3(val:any){
      if(Number(val)==31){
        this.dSectionForm.controls['d43'].setErrors(null);
        this.dSectionForm.controls['d93'].setErrors(null);
        this.dSectionForm.controls['d104'].setErrors(null);
        this.dSectionForm.controls['d121'].setErrors(null);
        this.dSectionForm.controls['d122'].setErrors(null);
      }
      if(Number(val)!=31 && Number(val)!=32){
        this.dSectionForm.controls['d43'].setErrors(null);
        this.dSectionForm.controls['d91'].setErrors(null);
        this.dSectionForm.controls['d93'].setErrors(null);
        this.dSectionForm.controls['d101'].setErrors(null);
        this.dSectionForm.controls['d102'].setErrors(null);
        this.dSectionForm.controls['d103'].setErrors(null);
        this.dSectionForm.controls['d104'].setErrors(null);
        this.dSectionForm.controls['d11'].setErrors(null);
        this.dSectionForm.controls['d121'].setErrors(null);
        this.dSectionForm.controls['d122'].setErrors(null);
        this.dSectionForm.controls['d151'].setErrors(null);
        this.dSectionForm.controls['d152'].setErrors(null);
        this.dSectionForm.controls['d153'].setErrors(null);
      }
    }
  _alphabetsKeyDown(e) {
   if (e.target["value"].length > 200) {
     e.target["value"] = e.target["value"].substring(0, e.target["value"].length - 1);
   }
  }
  _alphabetsKeyPress(event: any) {
    const pattern = /^[a-zA-Z .,]*$/;
    var a = event.charCode;
    if (a == 0) { return; }
    let inputChar = String.fromCharCode(event.charCode);
    if (event.target["value"].length >= 200) {
      event.preventDefault();
    }
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  _alphaNumericKeyPress(event: any){
    const pattern = /^[a-zA-Z . 0-9,]*$/;
    var a = event.charCode;
    if (a == 0) { return; }
    let inputChar = String.fromCharCode(event.charCode);
    if (event.target["value"].length >= 200) {
      event.preventDefault();
    }
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  _floatNumberKeyPress(event: any) {
    const pattern = /^[. 0-9 ]*$/;
    var a = event.charCode;
        if(a==0){return;}
    let inputChar = String.fromCharCode(event.charCode);
    if (event.target["value"].length >= 3 || event.keyCode == 32) {
      event.preventDefault();
    }
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  _numberKeyPress(event: any) {
    const pattern = /[0-9\ ]/;
    var a = event.charCode;
        if(a==0){return;}
    let inputChar = String.fromCharCode(event.charCode);
    if (event.target["value"].length >= 8 || event.keyCode == 32) {
      event.preventDefault();
    }
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  _numberKeyPressforTimeline(event: any) {
    const pattern = /[0-9\ ]/;
    var a = event.charCode;
    if (a == 0) { return; }
    let inputChar = String.fromCharCode(event.charCode);
    if (event.target["value"].length >= 2 || event.keyCode == 32) {
      event.preventDefault();
    }
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  _numberKeyPressForHMISReport(event: any) {
    const pattern = /[0-9\ ]/;
    var a = event.charCode;
        if(a==0){return;}
    let inputChar = String.fromCharCode(event.charCode);
    if (event.target["value"].length >= 8 || event.keyCode == 32) {
      event.preventDefault();
    }
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  _numberKeyUp(event,value: string, object) {
    let index=this.obj.planOfAction.indexOf(object);
    try{
      if(value=="" || Number(value) > 12 || Number(value) <= 0){
        event.target["value"]="";
        this.obj.planOfAction[index].timeline="";
      }else{
        this.obj.planOfAction[index].timeline = value.replace(/[&\/\\#,+-.|/\{}?]/g, '');
        event.target["value"]=this.obj.planOfAction[index].timeline;
        if(Number(event.target["value"]) > 12 || Number(event.target["value"]) <= 0){
          event.target["value"]="";
          this.obj.planOfAction[index].timeline="";
        }
      }
    }catch(e){
      event.target["value"]="";
      this.obj.planOfAction[index].timeline = "";
    }
  }
  _lengthKeyPress(event: any) {
    if (event.target["value"].length >= 200) {
      event.preventDefault();
    }
  }
  _lengthKeyUpforAcordion(value: string,object) {
    let index = this.obj.planOfAction.indexOf(object);
    if (value.length >= 200) {
      this.obj.planOfAction[index].intervention_activities = value.slice(0, -1);;
    }
  }
  _emailKeyPress(event: any) {
    if (event.which == 13){ 
      event.preventDefault(); 
    }
  }
  changeText(val:any) {
    console.log(val);
  }

  onblurMoValidate(val){
    let fieldName:any =["e1111","e1112","e1113","e1114","e1115"];
    if(val==1){
      for (var filteredObj in fieldName) // for acts as a foreach  
      {
        let name:any = fieldName[filteredObj];
        if(Number(this.obj.e11g1)<Number(this.obj[name])){
          this.obj[name] = null;
          this.e11SectionForm.controls[name].setErrors({ errorstr: true});
        }
      }  
    }else{
      for (var filteredObj in fieldName) // for acts as a foreach  
      {
        let name:any = fieldName[filteredObj];
        if(Number(this.obj.e11g1)<Number(this.obj[name])){
          this.obj[name] = null;
          this.e11SectionForm.controls[name].setErrors({ errorstr: true});
        }
      }  
     if (this.obj.e11g1 == "" || this.obj.e11g1 == null) {
          this.obj.e1111 = null;
          this.obj.e1112 = null;
          this.obj.e1113 = null;
          this.obj.e1114 = null;
          this.obj.e1115 = null;
      }
    }
  }
  onblurSnValidate(val){
    let fieldName:any =["e1121","e1122","e1123","e1124","e1125"];
    if(val==1){
      for (var filteredObj in fieldName) // for acts as a foreach  
      {
        let name:any = fieldName[filteredObj];
        if(Number(this.obj.e11g2)<Number(this.obj[name])){
          this.obj[name] = null;
          this.e11SectionForm.controls[name].setErrors({ errorstr: true});
        }
      }  
    }else{
      for (var filteredObj in fieldName) // for acts as a foreach  
      {
        let name:any = fieldName[filteredObj];
        if(Number(this.obj.e11g2)<Number(this.obj[name])){
          this.obj[name] = null;
          this.e11SectionForm.controls[name].setErrors({ errorstr: true});
        }
      }  
      
     if (this.obj.e11g2 == "" || this.obj.e11g2 == null) {
         this.obj.e1121 = null;
         this.obj.e1122 = null;
         this.obj.e1123 = null;
         this.obj.e1124 = null;
         this.obj.e1125 = null;
      }
    }
  }
  onblurAnmValidate(val){
    let fieldName:any =["e1131","e1132","e1133","e1134","e1135"];
    if(val==1){
      for (var filteredObj in fieldName) // for acts as a foreach  
      {
        let name:any = fieldName[filteredObj];
        if(Number(this.obj.e11g3)<Number(this.obj[name])){
          this.obj[name] = null;
          this.e11SectionForm.controls[name].setErrors({ errorstr: true});
        }
      } 
    }else{
      for (var filteredObj in fieldName) // for acts as a foreach  
      {
        let name:any = fieldName[filteredObj];
        if(Number(this.obj.e11g3)<Number(this.obj[name])){
          this.obj[name] = null;
          this.e11SectionForm.controls[name].setErrors({ errorstr: true});
        }
      } 
      if (this.obj.e11g3 == "" || this.obj.e11g3 == null) {
          this.obj.e1131 = null;
          this.obj.e1132 = null;
          this.obj.e1133 = null;
          this.obj.e1134 = null;
          this.obj.e1135 = null;
      }
    }
  }
  onblurAhValidate(val){
    let fieldName:any =["e1141","e1142","e1143","e1144","e1145"];
    if(val==1){
      for (var filteredObj in fieldName) // for acts as a foreach  
      {
        let name:any = fieldName[filteredObj];
        if(Number(this.obj.e11g4)<Number(this.obj[name])){
          this.obj[name] = null;
          this.e11SectionForm.controls[name].setErrors({ errorstr: true});
        }
      } 
    }else{
      for (var filteredObj in fieldName) // for acts as a foreach  
      {
        let name:any = fieldName[filteredObj];
        if(Number(this.obj.e11g4)<Number(this.obj[name])){
          this.obj[name] = null;
          this.e11SectionForm.controls[name].setErrors({ errorstr: true});
        }
      } 
      if(this.obj.e11g4 == "" || this.obj.e11g4 == null) {
        this.obj.e1141 = null;
        this.obj.e1142 = null;
        this.obj.e1143 = null;
        this.obj.e1144 = null;
        this.obj.e1145 = null;
      }
    }
  }
/**
 * This method is going to handle finalize button event
 */

  checkForImage(type) {
    let temp = this;
    temp.img1 = document.getElementsByName('img1');
    temp.img2 = document.getElementsByName('img2');

    if((temp.img1.length > 0 && temp.img1[0].files.length > 0) || 
      (temp.img2.length > 0 && temp.img2[0].files.length > 0)){
      if (temp.img1[0].files.length > 0) {
        temp.vallidateImage('img1', temp.img1, 1,type);
      }
      if (temp.img2.length > 0 && temp.img2[0].files.length > 0) {
        temp.vallidateImage('img2', temp.img2, 2,type);
      }
    }else{
        if(type == 'finalize'){
        temp.finalize();
      }else if(type == 'saveConfirmation'){
        temp.saveConfirmation();
      }
    }
  }
   // save data
  finalize(){
      //validate for mandatory fields
      //if there any error show that error otherwise finalize and save the form
      //then pass the controll to home page 
      let temp = this;   
      if (this.getValidateAcordion(this.objectPlanofAction)) {
        temp.alert8 = this.alertCtrl.create({ enableBackdropDismiss: false });
          temp.alert8.setCssClass('sectorSelectionModalFacility');
          temp.alert8.setTitle("Warning");
          temp.alert8.setMessage(MessageProvider.MESSAGES.PLAN_OF_ACTION);
          temp.alert8.addButton({
            text: "Cancel",
            handler: data => {
              temp.alert8.dismiss;
            }
          });
          temp.alert8.addButton({
            text: "Ok",
            handler: data => {
              // let listObject: any = this.obj.planOfAction[this.obj.planOfAction.length - 1];
              // this.selectedSector = "8";
              // this.selectedSubsector = listObject.sectionType;
            }
          });
          temp.alert8.present();
          return true;
      } else { 
      this.forSaveStatus = true;
      this.validateAll();
      this.validateOtherField(this.obj.c43);
      this.validatee21Field(this.obj.e21);
      this.validatef11Field(this.obj.f11);
      this.validatehA2Field(this.obj.hA2);
      this.validatehA3Field(this.obj.hA3);
      this.validatehF1Field(this.obj.hF1);
      this.validatehF1p2Field(this.obj.hF1p2);
      this.validateiB4Field(this.obj.iB4);
      this.validateRatikanta()
      this.validateiDA3Field(this.obj.iDA3);
      this.validateiG3Field(this.obj.iG3);
      this.validateiG4Field(this.obj.iG4);
      this.validateiH1Field(this.obj.iH1);
      this.validatefacilitiesL2L3(this.obj.c6);
      if(this.obj.e11g1>0){
        this.ise11g1 = true;
      }
      if(this.obj.e11g2>0){
        this.ise11g2 = true;
      }
      if(this.obj.e11g3>0){
        this.ise11g3 = true;
      }
      if(this.obj.e11g4>0){
        this.ise11g4 = true;
      }
      this.validatee11g1();
      this.validatee11g2();
      this.validatee11g3();
      this.validatee11g4();

      this.cS = true;
      this.finalizeAttempt=true;
      this.emailValidation();
      if(this.cSectionForm.valid &&
        this.dSectionForm.valid &&
        this.e1SectionForm.valid &&
        this.e2SectionForm.valid &&
        this.e3SectionForm.valid &&
        this.e4SectionForm.valid &&
        this.e5SectionForm.valid &&
        this.e6SectionForm.valid &&
        this.e7SectionForm.valid &&
        this.e8SectionForm.valid &&
        this.e9SectionForm.valid &&
        this.e10SectionForm.valid &&
        this.e11SectionForm.valid &&
        this.f1SectionForm.valid &&
        this.f2SectionForm.valid &&
        this.f3SectionForm.valid &&
        this.f4SectionForm.valid &&
        this.f5SectionForm.valid &&
        this.f6SectionForm.valid &&
        this.f7SectionForm.valid &&
        this.validatehA2() &&
        this.validatehA3() &&
        this.validatehF1() &&
        this.validatehF1p2() &&
        this.validateiB4() &&
        this.validateiDA3() &&
        this.validateiG3() &&
        this.validateiG4() &&
        this.validateiH1()
      )
      {
        temp.alert9 = this.alertCtrl.create({enableBackdropDismiss:false});
            temp.alert9.setCssClass('sectorSelectionModalCommunity');
            temp.alert9.setTitle("Warning");
            temp.alert9.setMessage("Are you sure you want to finalize the form?");
            temp.alert9.addButton({
            text: "Cancel",
            handler: data => {
              temp.alert9.dismiss;
            }});
            temp.alert9.addButton({
            text: "Ok",
            handler: data => {
              this.finalized = true;
              this.facilityTypeWiseScore();
              this.obj.e_total_score = this.obj.e_RH_score + this.obj.e_MHDS_score + this.obj.e_NHDS_score + 
                this.obj.e_CHDS_score + this.obj.e_Vaccines_score + this.obj.e_Antibiotics_score + 
                this.obj.e_Infrastructure_score + this.obj.e_IP_score + this.obj.e_AHDS_score + 
                this.obj.e_OE_score;

              this.obj.f_total_score = this.obj.f_ANC_score + this.obj.f_IPIP_score + this.obj.f_ENCR_score + 
                this.obj.f_FP_score + this.obj.f_CS_score + this.obj.f_FMO_score + this.obj.f_AH_score;

              this.obj.e_total_score_max = this.e1Score + this.e2Score + this.e3Score + this.e4Score +
                this.e5Score + this.e6Score + this.e7Score + this.e8Score + this.e9Score + this.e10Score;

              this.obj.f_total_score_max = this.anteNatalCareSubSectionMaxScore + this.ipipppScore + this.ENBCRCScore + this.familyPlanningScore + 
                this.clientSaticfactionScore + this.FMOScore + this.adolescentHealthScore;

              this.obj.checklist_score = this.obj.e_total_score + this.obj.f_total_score;
              this.obj.checklist_score_max = this.obj.e_total_score_max + this.obj.f_total_score_max;

              /*@author Jagat Bandhu Sahoo*/
              this.obj.e_RH_score_max = this.e1Score;
              this.obj.e_MHDS_score_max = this.e2Score;
              this.obj.e_NHDS_score_max = this.e3Score;
              this.obj.e_CHDS_score_max = this.e4Score;
              this.obj.e_Vaccines_score_max = this.e5Score;
              this.obj.e_Antibiotics_score_max = this.e6Score;
              this.obj.e_Infrastructure_score_max = this.e7Score;
              this.obj.e_IP_score_max = this.e8Score;
              this.obj.e_AHDS_score_max = this.e9Score;
              this.obj.e_OE_score_max = this.e10Score;

              this.obj.f_ANC_score_max = this.anteNatalCareSubSectionMaxScore;
              this.obj.f_IPIP_score_max = this.ipipppScore;
              this.obj.f_ENCR_score_max = this.ENBCRCScore;
              this.obj.f_FP_score_max = this.familyPlanningScore;
              this.obj.f_CS_score_max = this.clientSaticfactionScore;
              this.obj.f_FMO_score_max = this.FMOScore;
              this.obj.f_AH_score_max = this.adolescentHealthScore;

              /**
               * @author - Naseem Akhtar (naseem@sdrc.co.in)
               */
              this.obj.fSterilizationTotal = (this.obj.d101 * 1) + (this.obj.d102 * 1) + (this.obj.d103 * 1) + (this.obj.d104 * 1);
              this.obj.sterilizationTotal = (this.obj.d101 * 1) + (this.obj.d102 * 1) + (this.obj.d103 * 1) + 
                                              (this.obj.d104 * 1) + (this.obj.d11 * 1);
              // this.obj.deviceId = MessageProvider.DEVICE_UUID;

              this.obj.c7 = this.datePipe.transform(this.today, 'dd-MM-y');
              this.dataService.saveFacilityData(this.obj, this.forEdit, true, this.navParams.data.id, this.formInfo,this.clickCounterObj, this.progressBarObj);
            }});
            temp.alert9.present();   
      } else if(!this.cSectionForm.valid){
        this.presentToast("Please fillup mandatory fields of General Information Section");
        this.selectedSector="1";
        this.selectedSubsector = "1";
       }else if(!this.dSectionForm.valid){
        this.presentToast("Please fillup mandatory fields of Data of last reported month from facility Section");
        this.selectedSector="2";
        this.selectedSubsector = "2";
       }else if(!this.e1SectionForm.valid){
        this.presentToast("Please fillup mandatory fields of Reproductive Health Section");
        this.selectedSector="3";
        this.selectedSubsector = "31";
       }else if(!this.e2SectionForm.valid){
        this.presentToast("Please fillup mandatory fields of Maternal Health: Drugs and Supplies Section");
        this.selectedSector="3";
        setTimeout( () => {
              this.selectedSubsector = "32";
            }, 50)
       }else if(!this.e3SectionForm.valid){
        this.presentToast("Please fillup mandatory fields of New Born Health: Drugs and Supplies Section");
        this.selectedSector="3";
        setTimeout( () => {
              this.selectedSubsector = "33";
            }, 50)
       }else if(!this.e4SectionForm.valid){
        this.presentToast("Please fillup mandatory fields of Child Health: Drugs and Supplies Section");
        this.selectedSector="3";
        setTimeout( () => {
              this.selectedSubsector = "34";
            }, 50)
       }else if(!this.e5SectionForm.valid){
        this.presentToast("Please fillup mandatory fields of Vaccines Section");
        this.selectedSector="3";
        setTimeout( () => {
              this.selectedSubsector = "35";
            }, 50)
       }else if(!this.e6SectionForm.valid){
        this.presentToast("Please fillup mandatory fields of Antibiotics Section");
        this.selectedSector="3";
        setTimeout( () => {
              this.selectedSubsector = "36";
            }, 50)
       }else if(!this.e7SectionForm.valid){
        this.presentToast("Please fillup mandatory fields of Infrastructure Section");
        this.selectedSector="3";
        setTimeout( () => {
              this.selectedSubsector = "37";
            }, 50)
       }else if(!this.e8SectionForm.valid){
        this.presentToast("Please fillup mandatory fields of Infection Prevention Section");
        this.selectedSector="3";
        setTimeout( () => {
              this.selectedSubsector = "38";
            }, 50)
       }else if(!this.e9SectionForm.valid){
        this.presentToast("Please fillup mandatory fields of Adolescent Health: Drugs and Supplies Section");
        this.selectedSector="3";
        setTimeout( () => {
              this.selectedSubsector = "39";
            }, 50)
       }else if(!this.e10SectionForm.valid){
        this.presentToast("Please fillup mandatory fields of Other Equipment Section");
        this.selectedSector="3";
        setTimeout( () => {
              this.selectedSubsector = "310";
            }, 50)
       }else if(!this.e11SectionForm.valid){
        this.presentToast("Please fillup mandatory fields of HR deployed/posted in facility Section");
        this.selectedSector="3";
        setTimeout( () => {
              this.selectedSubsector = "311";
            }, 50)
       }else if(!this.f1SectionForm.valid){
        this.presentToast("Please fillup mandatory fields of Antenatal Care Section");
        this.selectedSector="4";
        this.selectedSubsector = "41";
       }else if(!this.f2SectionForm.valid){
        this.presentToast("Please fillup mandatory fields of Intra-partum and Immediate post-partum practices Section");
        this.selectedSector="4";
        setTimeout( () => {
              this.selectedSubsector = "42";
            }, 50)
       }else if(!this.f3SectionForm.valid){
        this.presentToast("Please fillup mandatory fields of Essential Newborn Care (ENBC), Resuscitation and Child Health Section");
        this.selectedSector="4";
        setTimeout( () => {
              this.selectedSubsector = "43";
            }, 50)
       }else if(!this.f4SectionForm.valid){
        this.presentToast("Please fillup mandatory fields of Family Planning Section");
        this.selectedSector="4";
        setTimeout( () => {
              this.selectedSubsector = "44";
            }, 50)
       }else if(!this.f5SectionForm.valid){
        this.presentToast("Please fillup mandatory fields of Client Satisfaction Section");
        this.selectedSector="4";
        setTimeout( () => {
              this.selectedSubsector = "45";
            }, 50)
       }else if(!this.f6SectionForm.valid){
        this.presentToast("Please fillup mandatory fields of Facility mechanism and others Section");
        this.selectedSector="4";
        setTimeout( () => {
              this.selectedSubsector = "46";
            }, 50)
       }else if(!this.f7SectionForm.valid){
        this.presentToast("Please fillup mandatory fields of Adolescent Health Section");
        this.selectedSector="4";
        setTimeout( () => {
              this.selectedSubsector = "47";
            }, 50)
       }else if(!this.validatehA2() || !this.validatehA3()){
        this.presentToast("Please fillup mandatory field of Service Delivery Section");
        this.selectedSector="5";
          setTimeout( () => {
              this.selectedSubsector = "51";
            }, 50)
      } else if(!this.validatehF1() || !this.validatehF1p2()){
        this.presentToast("Please fillup mandatory field of Leadership and Governance Section");
        this.selectedSector="5";
          setTimeout( () => {
                this.selectedSubsector = "55";
              }, 50)
      } else if(!this.validateiB4()){
        this.presentToast("Please fillup mandatory field of NPCDCS-Treatment Section");
        this.selectedSector="6";
          setTimeout( () => {
                this.selectedSubsector = "62";
              }, 50)
      } else if(!this.validateiDA3()){
        this.presentToast("Please fillup mandatory field of National Vector Borne Disease Control Program (NVBCDP) Section");
        this.selectedSector="6";
          setTimeout( () => {
                this.selectedSubsector = "64";
              }, 50)
      } else if(!this.validateiG3() || !this.validateiG4()){
        this.presentToast("Please fillup mandatory field of NCD Section");
        this.selectedSector="6";
          setTimeout( () => {
                this.selectedSubsector = "67";
              }, 50)
      } else if(!this.validateiH1()){
        this.presentToast("Please fillup mandatory field of NCCP Section");
        this.selectedSector="6";
          setTimeout( () => {
                this.selectedSubsector = "68";
              }, 50)
      } 
    }
  }
/**
 * This method is going to handle save button event
 */

//validate and send the data to dataservice for saving purpose
  saveConfirmation(){
    let temp = this;
    if(this.obj.c8 == null || this.obj.c8 == ""){
      this.obj.c8 = null;
      this.cSectionForm.controls['c8'].setErrors(null);
    }
    if(this.obj.c9 == null || this.obj.c9 == ""){
      this.obj.c9 = null;
      this.cSectionForm.controls['c9'].setErrors(null);
    }
    if (this.getValidateAcordion(this.objectPlanofAction)) {
      temp.alert10 = this.alertCtrl.create({ enableBackdropDismiss: false });
        temp.alert10.setCssClass('sectorSelectionModalFacility');
        temp.alert10.setTitle("Warning");
        temp.alert10.setMessage(MessageProvider.MESSAGES.PLAN_OF_ACTION);
        temp.alert10.addButton({
          text: "Cancel",
          handler: data => {
            temp.alert10.dismiss;
          }
        });
        temp.alert10.addButton({
          text: "Ok",
          handler: data => {
            // let listObject: any = this.obj.planOfAction[this.obj.planOfAction.length - 1];
            // this.selectedSector = "8";
            // this.selectedSubsector = listObject.sectionType;
          }
        });
        temp.alert10.present();
       return true;
      } else {
    this.cS=true;
    this.finalizeAttempt=false;

	this.emailValidation();
    if(this.cSectionForm.valid){

      if(!this.forEdit) {
        temp.alert11 = this.alertCtrl.create({enableBackdropDismiss:false});
          temp.alert11.setCssClass('sectorSelectionModalFacility');
          temp.alert11.setTitle("Warning");
          temp.alert11.setMessage(MessageProvider.MESSAGES.SAVE_CONFIRMATION);
          temp.alert11.addButton({
              text: "Cancel",
              handler: data => {
                this.forSaveStatus = false;
                temp.alert11.dismiss;
                if(this.obj.c8 == null || this.obj.c8 == ""){
                  this.obj.c8 = null;
                  this.cSectionForm.controls['c8'].setErrors([Validators.required]);
                }
                if(this.obj.c9 == null || this.obj.c9 == ""){
                  this.obj.c9 = null;
                  this.cSectionForm.controls['c9'].setErrors([Validators.required]);
                }
              }});
          temp.alert11.addButton({
            text: "Ok",
            handler: data => {
              this.save();
            }
          });
          temp.alert11.present();
        } else {
          this.save();
        }
    }else if(!this.cSectionForm.valid){
      this.presentToast("Please fillup mandatory fields of General Information Section");
      this.selectedSector="1";
      this.selectedSubsector = "1";
    }
      }
  }

  save(){
    this.validateAll();
    this.calculateAllSubSectorMaxScores()
    this.obj.c7 = this.datePipe.transform(this.today, 'dd-MM-y');
    this.dataService.saveFacilityData(this.obj, this.forEdit, this.finalized, this.navParams.data.id, this.formInfo,this.clickCounterObj,this.progressBarObj); 
  }

  validateAll(){
    this.validatee11g1true();
    this.validatee11g2true();
    this.validatee11g3true();
    this.validatee11g4true();
    this.validate_d52_lessthan_d51totalnumber();
    this.validate_d51_lessthan_d52totalnumber();
    this.validate_d71_TotalNumber();
    this.validate_d72_TotalNumber();
    this.validate_d73_TotalNumber();
    this.validate_d74_TotalNumber();
    this.validate_d8_TotalNumber();
    this.validate_d131_TotalNumber();
    this.validate_d132_TotalNumber();
    this.validate_d133_TotalNumber();
    this.validate_d134_TotalNumber();
    this.validate_d135_TotalNumber();
    this.validate_d136_TotalNumber();
    this.validate_d137_TotalNumber();
    this.validate_d138_TotalNumber();
    this.validate_d162_Admitted();
    this.validate_d172_Admitted();
  }

  onPaste(e: any,a: any) {
    setTimeout(() => {
        this.obj[a] = null;
    }, 0);
  }

  onPastePOA(e: any,a,name) {
    let index = this.obj.planOfAction.indexOf(a);
    console.log(index)
    setTimeout(() => {
        this.obj.planOfAction[index][name] = null;
    }, 0);
  }
  
  presentToast(message) {
      this.presentToastConfirm = this.alertCtrl.create({ enableBackdropDismiss: false });
      this.presentToastConfirm.setCssClass('sectorSelectionModalFacility');
      this.presentToastConfirm.setTitle("Warning");
      this.presentToastConfirm.setMessage(message);
      this.presentToastConfirm.addButton({
        text: "Ok",
        handler: data => {
          this.presentToastConfirm.dismiss;
        }
      });
      this.presentToastConfirm.present();
  }

/**
 * This method is going to get executed when user will select a state
 */
  stateSelected(){
    if(this.stateObject !=null){
    this.obj.state = this.stateObject.areaNId;
    this.obj.district = null;
    // this.districts = this.area.transform(this.areas, {level: 3, parentAreaId: parseInt(this.obj.state)});
    this.districts = this.stateObject.children;
    this.obj.block = null;
    this.blocks = [];
    this.obj.c5 = null;
    this.facilities = []; 
    }
       

  }


/**
 * This method is going to get executed when user will select a district
 */
  districtSelected(){
    if(this.districtObject !=null){
    this.obj.district = this.districtObject.areaNId;
    this.formInfo.districtName = this.districtObject.name;
    this.obj.block = null;
    this.obj.c5 = null;
    this.facilities = [];
    this.blocks = [];
    // let tempFacilities = [];
    // let tempBlocks = [];
    this.blocks = this.districtObject.children.filter(block => block.level == 4 
      && block.parentAreaId == this.districtObject.areaNId);
    this.facilities = this.districtObject.children.filter(facility => facility.level == 5 
      && facility.parentAreaId == this.districtObject.areaNId);
      if(!this.facilityTypeDisableStatus){
        this.facilityTypeDisable=false;
      }
    }
   
    // this.removeFacilityDuplicate(tempFacilities);
    // this.removeBlockDuplicate(tempBlocks);
  }

  /**
 * This method is going to get executed when user will select a district
 */
  blockSelected(){
    if(this.blockObject!=null){
    this.obj.block = this.blockObject.areaNId;
    this.obj.c5 = null;
    this.facilities = [];
    // this.facilities = this.area.transform(this.areas, {level: 5, parentAreaId: parseInt(this.obj.block)});
    let type = null;
    switch(this.obj.c43){ //this.facilityTypeObject.name
      case 11: type = 101; break; //SC
      case 12: type = 102; break; //Non 24x7
      case 13: type = 102; break; //24x7
      case 14: type = 103; break; //Non FRU
      case 15: type = 103; break; //FRU
      case 16: type = 104; break; //SDH
      case 18: type = 106; break; // Area Hospital
      case 19: type = 107; break; //Medical College
    }
    
    this.facilities = this.blockObject.children.filter(facility => facility.facilityType.id == 
      type && facility.parentAreaId == this.blockObject.areaNId);
    // this.removeFacilityDuplicate(facilityArray);
    
      if(this.obj.block!=null)
          {
            this.disableBlock = false;
          } 
    }
    
  }


  /**
 * This method is going to get executed when user will select a facility
 */
  facilitySelected(){

    if(this.facilityObject != null && this.facilityObject != undefined
    && this.facilityObject.areaNId != null && this.facilityObject.areaNId != undefined
    ){
        this.messageService.presentLoading("Validating, please wait...");        
        if(this.facilityObject.facilityInchargeEmailId != null){
          this.obj.c9 = this.facilityObject.facilityInchargeEmailId
        }        
        this.dataService.validateFacilityForTodayDataEntry(this.facilityObject.areaNId);
        if(!this.facilityLevelDisableStatus){
          this.facilityLevelDisable=false;
        }
    }else{
      this.obj.c9 = null
    }
  }

  /**
   * This method will work when a type has been selected.
   */
  h1SectionForm_total:any = 1;
  h1SectionForm_secured:any = 0;
  h5SectionForm_total:any = 2;
  h5SectionForm_secured:any = 0;
  facilityTypeSelected(){
    let temp = this;
    temp.roles = [];
    if(temp.facilityTypeObject != null){
      temp.obj.c43 = temp.facilityTypeObject.id;
      temp.formInfo.facilityTypeName = temp.facilityTypeObject.name;
      if(temp.obj.c43==17){
        temp.disableBlock = false;
        temp.roles = temp.masterRoles.filter(r => r.roleCode != MessageProvider.ROLE_CODE.BLOCK);
      }else{
        temp.roles = temp.masterRoles;
      }
      if(temp.obj.c43 > 13){
        temp.h1SectionForm_total = 3;
      }      
    }    
  }

  latitude : any;
  longitude : any;
  accuracy : any;
  gpsOptions : Object = {
    'maximumAge' : 0,
    'timeout' : 120000,
    'enableHighAccuracy' : true
  }
  captureGPS(){

    let temp = this;
    try{
      if(!temp.platform.is('core') && temp.platform.is('cordova')){
        temp.backgroundGeolocation.isLocationEnabled().then((resp) =>{
          console.log(resp);
          resp == 1 ? temp.captureGPS1() : temp.switchToLocationSettings();
        });
      }else{
        temp.captureGPS1();
      }
    }catch(err){
      this.messageService.dismissLoading();
      this.errorToast('Error ' + err);
      console.log('Error ', err);
    }
  }

  /**
   * @author Jagat Bandhu
   * Checking the status of backButtonStatus for preventing the value to set in geopoint variable.
   * if backButton status is true then we will consider the user has tapped hardware backbutton,
   * then we don't have to capture the gps
   */
  captureGPS1(){
    this.messageService.presentLoading(MessageProvider.MESSAGES.CAPTURE_GEO_COORDINATES);
    this.geolocation.getCurrentPosition(this.gpsOptions).then((resp) => {
      if(!this.backButtonStatus){
        this.gpsFlag = true;
        this.obj.geopoint = resp.coords.latitude + "," + resp.coords.longitude;
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        this.messageService.dismissLoading();
      }else{
        this.backButtonStatus = false;
      }
    }).catch((error) => {
      this.messageService.dismissLoading();
      switch(error.code){
        case 1 : break;//this.errorToast('Please allow eSS to acess device\'s location to capture GPS'); break;
        case 3 : this.errorToast('Timeout, please try again.'); break;
        default : this.errorToast('Error getting location' + error.code + " " +error.message); break;
      }
    });
  }


  switchToLocationSettings(){
    let temp = this;
    temp.alert12 = this.alertCtrl.create({
      enableBackdropDismiss:false,
      title: 'Confirm',
      message: 'Location is off. Do you want to switch it on?',
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.backgroundGeolocation.showLocationSettings();
          }
        }
      ]
    });
    temp.alert12.setCssClass('sectorSelectionModalCommunity');
    temp.alert12.present();
  }

  sigModal : any;
  openSigModal(designation) {
    let temp = this;
    let obj = { type : designation };
    temp.sigModal = this.modalCtrl.create(SignatureModalPage, obj);

    temp.sigModal.onDidDismiss(data => {
       if(data != null && data.signature != null){
          switch(data.type){
            case "facility":
             this.obj.f_img = data.signature;
              // document.getElementById('f_facility_incharge_id').setAttribute('src',data.signature);
              break;
            case "supervisor": 
            this.obj.s_img = data.signature;
            //  document.getElementById('f_supervisor_id').setAttribute('src',data.signature);
             break;
          }
          //this.saveToast("Signature captured successfully");
       }      
    });

    temp.sigModal.present();
  }

  closeSigModal(){
    this.sigModal.dismiss();
  }

  selectPressed(e, value){
      this.press++
      if(this.press >= 1 ){
          switch(value){
            case 'state':
              this.obj.state = null;
              this.stateObject = null;
            break;
            case 'c11':
              this.obj.c11 = null;
            break;
            case 'c2':
              this.obj.c2 = null;
            break;
            case 'c3':
              this.obj.c3 = null;
            break;
            case 'district':
              this.obj.district = null;
              this.districtObject =null;
            break;
            case 'block':
              this.obj.block = null;
              this.blockObject = null;
            break;
            case 'c5':
              this.obj.c5 = null;
              this.facilityObject = null;
            break;
            case 'c43':
              this.disabledSector=false;
              this.obj.c43 = null;
              this.facilityTypeObject = null;
            break;
            case 'c6':
              this.obj.c6 = null;
            break;
          }
      }
  }

  /**
   * This method will calculate each individual sub section max score, 
   * based on the facility type and individual question of each subsection it self.
   * 
   * @author Jagat
   * @since 1.0.0
   */
  
facilityTypeWiseScore(){
    this.e1Score=(this.obj.c43==11?MessageProvider.FCILITY_SCORE.e_RH_score_SC:
                  this.obj.c43==12?MessageProvider.FCILITY_SCORE.e_RH_score_Non24x7PHC:MessageProvider.FCILITY_SCORE.e_RH_score_Other);
    this.e2Score=((this.obj.c43==11 && this.obj.e21==26)?MessageProvider.FCILITY_SCORE.e_MHDS_score_SC_other:(this.obj.c43==11 && this.obj.e21!=26)?MessageProvider.FCILITY_SCORE.e_MHDS_score_SC:
                  (this.obj.c43==12 && this.obj.e21==26)?MessageProvider.FCILITY_SCORE.e_MHDS_score_Non24x7PHC_other:(this.obj.c43==12 && this.obj.e21!=26)?MessageProvider.FCILITY_SCORE.e_MHDS_score_Non24x7PHC:
                  (this.obj.c43==13 && this.obj.e21==26)?MessageProvider.FCILITY_SCORE.e_MHDS_score_S24X7PHC_other:(this.obj.c43==13 && this.obj.e21!=26)?MessageProvider.FCILITY_SCORE.e_MHDS_score_S24X7PHC:
                  (this.obj.c43==14 && this.obj.e21==26)?MessageProvider.FCILITY_SCORE.e_MHDS_score_NONFRUCHC_other:(this.obj.c43==14 && this.obj.e21!=26)?MessageProvider.FCILITY_SCORE.e_MHDS_score_NONFRUCHC:
                  (this.obj.c43==15 && this.obj.e21==26)?MessageProvider.FCILITY_SCORE.e_MHDS_score_FRUCHC_other:(this.obj.c43==15 && this.obj.e21!=26)?MessageProvider.FCILITY_SCORE.e_MHDS_score_FRUCHC:
                  (this.obj.c43==16 && this.obj.e21==26)?MessageProvider.FCILITY_SCORE.e_MHDS_score_SDH_other:(this.obj.c43==16 && this.obj.e21!=26)?MessageProvider.FCILITY_SCORE.e_MHDS_score_SDH:
                  this.obj.e21==26?MessageProvider.FCILITY_SCORE.e_MHDS_score_Other_other:MessageProvider.FCILITY_SCORE.e_MHDS_score_Other)

    this.e3Score=(this.obj.c43==11?MessageProvider.FCILITY_SCORE.e_NHDS_score_SC:
                      this.obj.c43==12?MessageProvider.FCILITY_SCORE.e_NHDS_score_Non24x7PHC:MessageProvider.FCILITY_SCORE.e_NHDS_score_Other)
    this.e4Score=MessageProvider.FCILITY_SCORE.e_CHDS_score,
    this.e5Score=MessageProvider.FCILITY_SCORE.e_Vaccines_score,
    this.e6Score=MessageProvider.FCILITY_SCORE.e_Antibiotics_score,

    this.e7Score=(this.obj.c43==11?MessageProvider.FCILITY_SCORE.e_Infrastructure_score_SC:
                  this.obj.c43==12?MessageProvider.FCILITY_SCORE.e_Infrastructure_score_Non24x7PHC:
                  this.obj.c43==13?MessageProvider.FCILITY_SCORE.e_Infrastructure_score_S24X7PHC:
                  this.obj.c43==14?MessageProvider.FCILITY_SCORE.e_Infrastructure_score_NONFRUCHC:
                  this.obj.c43==15?MessageProvider.FCILITY_SCORE.e_Infrastructure_score_FRUCHC:
                  this.obj.c43==16?MessageProvider.FCILITY_SCORE.e_Infrastructure_score_SDH:
                  MessageProvider.FCILITY_SCORE.e_Infrastructure_score_Other)
    this.e8Score=MessageProvider.FCILITY_SCORE.e_IP_score,
    this.e9Score=MessageProvider.FCILITY_SCORE.e_AHDS_score,
    this.e10Score=(this.obj.c43==11?MessageProvider.FCILITY_SCORE.e_OE_score_SC:
                  this.obj.c43==12?MessageProvider.FCILITY_SCORE.e_OE_score_Non24x7PHC:
                  this.obj.c43==13?MessageProvider.FCILITY_SCORE.e_OE_score_S24X7PHC:
                  this.obj.c43==14?MessageProvider.FCILITY_SCORE.e_OE_score_NONFRUCHC:
                  this.obj.c43==15?MessageProvider.FCILITY_SCORE.e_OE_score_FRUCHC:
                  this.obj.c43==16?MessageProvider.FCILITY_SCORE.e_OE_score_SDH:
                  MessageProvider.FCILITY_SCORE.e_OE_score_Other)
};
yescountObj:any={};
 fetchvalObj:any={};

  /**
   * This method is going to get called when user will tap or click on the radio button
   * 
   * @author Jagat
   * @author Ratikanta
   * @since 1.0.0
   */

  radclick(id, type ,name ,e){    

    if(this.is_web == true){
     
      if(this.facilityradioObj[e] == true){
        if(type == this.facilityradioObjTemp[e]){
          setTimeout( () => {
              this.deleteRowsfromCounterObj(id);
              this.clearTheResponse(id);
              switch(e){
                case "e21":
                  this.obj["e21"] = null;
                  this.facilityradioObj["e21"] = false;
                  this.facilityradioObjTemp["e21"] = null;
                  this.obj["e22"] = null;
                  this.facilityradioObj["e22"] = false;
                  this.facilityradioObjTemp["e22"] = null;
                  this.e2Score=(this.obj.c43==11?MessageProvider.FCILITY_SCORE.e_MHDS_score_SC:
                    this.obj.c43==12?MessageProvider.FCILITY_SCORE.e_MHDS_score_Non24x7PHC:
                    this.obj.c43==13?MessageProvider.FCILITY_SCORE.e_MHDS_score_S24X7PHC:
                    this.obj.c43==14?MessageProvider.FCILITY_SCORE.e_MHDS_score_Non24x7PHC:
                    this.obj.c43==15?MessageProvider.FCILITY_SCORE.e_MHDS_score_NONFRUCHC:
                    this.obj.c43==16?MessageProvider.FCILITY_SCORE.e_MHDS_score_FRUCHC:
                    this.obj.c43==18?MessageProvider.FCILITY_SCORE.e_MHDS_score_SDH:MessageProvider.FCILITY_SCORE.e_MHDS_score_Other);
                  for(let ids of [11]) {
                    this.deleteRowsfromCounterObj(ids);
                  }
                break;
                case "hA2":
                  this.obj["hA2"] = null;
                  this.facilityradioObj["hA2"] = false;
                  this.facilityradioObjTemp["hA2"] = null;
                  this.obj["hA2p1"] = null;
                  this.facilityradioObj["hA2p1"] = false;
                  this.facilityradioObjTemp["hA2p1"] = null;
                  this.obj["hA2p2"] = null;
                  this.facilityradioObj["hA2p2"] = false;
                  this.facilityradioObjTemp["hA2p2"] = null;
                  for(let ids of [180,181]) {
                    this.deleteRowsfromCounterObj(ids);
                  }
                break;
                case "hA3":
                  this.obj["hA3"] = null;
                  this.facilityradioObj["hA3"] = false;
                  this.facilityradioObjTemp["hA3"] = null;
                  this.obj["hA3p1"] = null;
                  this.facilityradioObj["hA3p1"] = false;
                  this.facilityradioObjTemp["hA3p1"] = null;
                  for(let ids of [183]) {
                    this.deleteRowsfromCounterObj(ids);
                  }
                break;
                case "hF1":
                  this.obj["hF1"] = null;
                  this.facilityradioObj["hF1"] = false;
                  this.facilityradioObjTemp["hF1"] = null;
                  this.obj["hF1p1"] = null;
                  this.facilityradioObj["hF1p1"] = false;
                  this.facilityradioObjTemp["hF1p1"] = null;
                  this.obj["hF1p2"] = null;
                  this.facilityradioObj["hF1p2"] = false;
                  this.facilityradioObjTemp["hF1p2"] = null;
                  this.obj["hF1p2p1"] = null;
                  this.facilityradioObj["hF1p2p1"] = false;
                  this.facilityradioObjTemp["hF1p2p1"] = null;
                  for(let ids of [188,189,190]) {
                    this.deleteRowsfromCounterObj(ids);
                  }
                break;
                case "hF1p2":
                  this.obj["hF1p2"] = null;
                  this.facilityradioObj["hF1p2"] = false;
                  this.facilityradioObjTemp["hF1p2"] = null;
                  this.obj["hF1p2p1"] = null;
                  this.facilityradioObj["hF1p2p1"] = false;
                  this.facilityradioObjTemp["hF1p2p1"] = null;
                  for(let ids of [190]) {
                    this.deleteRowsfromCounterObj(ids);
                  }
                break;
                case "iB4":
                  this.obj["iB4"] = null;
                  this.facilityradioObj["iB4"] = false;
                  this.facilityradioObjTemp["iB4"] = null;
                  this.obj["iB4p1"] = null;
                  this.facilityradioObj["iB4p1"] = false;
                  this.facilityradioObjTemp["iB4p1"] = null;
                  for(let ids of [198]) {
                    this.deleteRowsfromCounterObj(ids);
                  }
                break;
                case "iDA3":
                  this.obj["iDA3"] = null;
                  this.facilityradioObj["iDA3"] = false;
                  this.facilityradioObjTemp["iDA3"] = null;
                  this.obj["iDA3p1"] = null;
                  this.facilityradioObj["iDA3p1"] = false;
                  this.facilityradioObjTemp["iDA3p1"] = null;
                  this.obj["iDA3p2"] = null;
                  this.facilityradioObj["iDA3p2"] = false;
                  this.facilityradioObjTemp["iDA3p2"] = null;
                  this.obj["iDA3p3"] = null;
                  this.facilityradioObj["iDA3p3"] = false;
                  this.facilityradioObjTemp["iDA3p3"] = null;
                  this.obj["iDA3p4"] = null;
                  this.facilityradioObj["iDA3p4"] = false;
                  this.facilityradioObjTemp["iDA3p4"] = null;
                  this.obj["iDA3p5"] = null;
                  this.facilityradioObj["iDA3p5"] = false;
                  this.facilityradioObjTemp["iDA3p5"] = null;
                  this.obj["iDA3p6"] = null;
                  this.facilityradioObj["iDA3p6"] = false;
                  this.facilityradioObjTemp["iDA3p6"] = null;
                  this.obj["iDA3p7"] = null;
                  this.facilityradioObj["iDA3p7"] = false;
                  this.facilityradioObjTemp["iDA3p7"] = null;
                  for(let ids of [205,206,207,208,209,210,211]) {
                    this.deleteRowsfromCounterObj(ids);
                  }
                break;
                case "iG3":
                  this.obj["iG3"] = null;
                  this.facilityradioObj["iG3"] = false;
                  this.facilityradioObjTemp["iG3"] = null;
                  this.obj["iG3p1"] = null;
                  this.facilityradioObj["iG3p1"] = false;
                  this.facilityradioObjTemp["iG3p1"] = null;
                  for(let ids of [240]) {
                    this.deleteRowsfromCounterObj(ids);
                  }
                break;
                case "iG4":
                  this.obj["iG4"] = null;
                  this.facilityradioObj["iG4"] = false;
                  this.facilityradioObjTemp["iG4"] = null;
                  this.obj["iG4p1"] = null;
                  this.facilityradioObj["iG4p1"] = false;
                  this.facilityradioObjTemp["iG4p1"] = null;
                  for(let ids of [242]) {
                    this.deleteRowsfromCounterObj(ids);
                  }
                break;
                case "iH1":
                  this.obj["iH1"] = null;
                  this.facilityradioObj["iH1"] = false;
                  this.facilityradioObjTemp["iH1"] = null;
                  this.obj["iH1p1"] = null;
                  this.facilityradioObj["iH1p1"] = false;
                  this.facilityradioObjTemp["iH1p1"] = null;
                  for(let ids of [245]) {
                    this.deleteRowsfromCounterObj(ids);
                  }
                break;
                default:
                  this.obj[e] = null;
                  this.facilityradioObj[e] = false;
                  this.facilityradioObjTemp[e] = null;
                break;
              }
            }, 100)
        }else{
          this.facilityradioObjTemp[e] = type;
        }
      }else{
        this.facilityradioObj[e] = true;
        this.facilityradioObjTemp[e] = type;
      }
      
      
      }

      if(type=="No"){
          if(id==10){
            this.obj.e22= null;
            
            this.facilityradioObj["e22"] = false;

            this.facilityradioObjTemp["e22"] = null

            this.e2SectionForm.controls["e22"].setErrors(null);
            for(let ids of [11]) {
              this.deleteRowsfromCounterObj(ids);
            }
          }
          if(id==179){
            this.obj.hA2p1= null;
            this.obj.hA2p2= null;
            
            this.facilityradioObj["hA2p1"] = false;
            this.facilityradioObj["hA2p2"] = false;

            this.facilityradioObjTemp["hA2p1"] = null;
            this.facilityradioObjTemp["hA2p2"] = null;

            this.h1SectionForm.controls["hA2p1"].setErrors(null);
            this.h1SectionForm.controls["hA2p2"].setErrors(null);
            for(let ids of [180,181]) {
              this.deleteRowsfromCounterObj(ids);
            }
          }
          if(id==182){
            this.obj.hA3p1= null;
            
            this.facilityradioObj["hA3p1"] = false;

            this.facilityradioObjTemp["hA3p1"] = null

            this.h1SectionForm.controls["hA3p1"].setErrors(null);
            for(let ids of [183]) {
              this.deleteRowsfromCounterObj(ids);
            }
          }
          if(id==187){
            this.obj.hF1p1= null;
            this.obj.hF1p2= null;
            this.obj.hF1p2p1= null;
            
            this.facilityradioObj["hF1p1"] = false;
            this.facilityradioObj["hF1p2"] = false;
            this.facilityradioObj["hF1p2p1"] = false;

            this.facilityradioObjTemp["hF1p1"] = null
            this.facilityradioObjTemp["hF1p2"] = null
            this.facilityradioObjTemp["hF1p2p1"] = null

            this.h5SectionForm.controls["hF1p1"].setErrors(null);
            this.h5SectionForm.controls["hF1p2"].setErrors(null);
            this.h5SectionForm.controls["hF1p2p1"].setErrors(null);
            for(let ids of [188,189,190]) {
              this.deleteRowsfromCounterObj(ids);
            }
          }
          if(id==189){
            this.obj.hF1p2p1= null;
            
            this.facilityradioObj["hF1p2p1"] = false;

            this.facilityradioObjTemp["hF1p2p1"] = null

            this.h5SectionForm.controls["hF1p2p1"].setErrors(null);
            for(let ids of [190]) {
              this.deleteRowsfromCounterObj(ids);
            }
          }
          if(id==197){
            this.obj.iB4p1= null;
            
            this.facilityradioObj["iB4p1"] = false;

            this.facilityradioObjTemp["iB4p1"] = null

            this.i2SectionForm.controls["iB4p1"].setErrors(null);
            for(let ids of [198]) {
              this.deleteRowsfromCounterObj(ids);
            }
          }
          if(id==204){
            this.obj.iDA3p1= null;
            this.obj.iDA3p2= null;
            this.obj.iDA3p3= null;
            this.obj.iDA3p4= null;
            this.obj.iDA3p5= null;
            this.obj.iDA3p6= null;
            this.obj.iDA3p7= null;
            
            this.facilityradioObj["iDA3p1"] = false;
            this.facilityradioObj["iDA3p2"] = false;
            this.facilityradioObj["iDA3p3"] = false;
            this.facilityradioObj["iDA3p4"] = false;
            this.facilityradioObj["iDA3p5"] = false;
            this.facilityradioObj["iDA3p6"] = false;
            this.facilityradioObj["iDA3p7"] = false;

            this.facilityradioObjTemp["iDA3p1"] = null
            this.facilityradioObjTemp["iDA3p2"] = null
            this.facilityradioObjTemp["iDA3p3"] = null
            this.facilityradioObjTemp["iDA3p4"] = null
            this.facilityradioObjTemp["iDA3p5"] = null
            this.facilityradioObjTemp["iDA3p6"] = null
            this.facilityradioObjTemp["iDA3p7"] = null

            this.i4SectionForm.controls["iDA3p1"].setErrors(null);
            this.i4SectionForm.controls["iDA3p2"].setErrors(null);
            this.i4SectionForm.controls["iDA3p3"].setErrors(null);
            this.i4SectionForm.controls["iDA3p4"].setErrors(null);
            this.i4SectionForm.controls["iDA3p5"].setErrors(null);
            this.i4SectionForm.controls["iDA3p6"].setErrors(null);
            this.i4SectionForm.controls["iDA3p7"].setErrors(null);
            for(let ids of [205,206,207,208,209,210,211]) {
              this.deleteRowsfromCounterObj(ids);
            }
          }
          if(id==239){
            this.obj.iG3p1= null;
            
            this.facilityradioObj["iG3p1"] = false;

            this.facilityradioObjTemp["iG3p1"] = null

            this.i7SectionForm.controls["iG3p1"].setErrors(null);
            for(let ids of [240]) {
              this.deleteRowsfromCounterObj(ids);
            }
          }
          if(id==241){
            this.obj.iG4p1= null;
            
            this.facilityradioObj["iG4p1"] = false;

            this.facilityradioObjTemp["iG4p1"] = null

            this.i7SectionForm.controls["iG4p1"].setErrors(null);
            for(let ids of [242]) {
              this.deleteRowsfromCounterObj(ids);
            }
          }
          if(id==244){
            this.obj.iH1p1= null;
            
            this.facilityradioObj["iH1p1"] = false;

            this.facilityradioObjTemp["iH1p1"] = null

            this.i8SectionForm.controls["iH1p1"].setErrors(null);
            for(let ids of [245]) {
              this.deleteRowsfromCounterObj(ids);
            }
          }
          this.clearTheResponse(id);
        }
      if(type=="Don't Know"){
        if(id==10){
          this.obj.e22= null;
          
          this.facilityradioObj["e22"] = false;

          this.facilityradioObjTemp["e22"] = null

          this.e2SectionForm.controls["e22"].setErrors(null);
          for(let ids of [11]) {
            this.deleteRowsfromCounterObj(ids);
          }
        }   
        this.clearTheResponse(id);
      }
    if(type=="Yes"){
     //this.checked = false;
        this.fetchvalObj = this.clickCounterObj.filter(counter => counter.id == id);
        if(this.fetchvalObj.length==0){
           if(name=="E1"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.e_RH_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                   this.obj.e_RH_score = this.obj.e_RH_score+data.value;
                }
              }
           }else if(name=="E2"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.e_MHDS_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.e_MHDS_score = this.obj.e_MHDS_score+data.value;
                }
              }
           }else if(name=="E3"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.e_NHDS_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.e_NHDS_score = this.obj.e_NHDS_score+data.value;
                }
              }
           }else if(name=="E4"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.e_CHDS_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.e_CHDS_score = this.obj.e_CHDS_score+data.value;
                }
              }
           }else if(name=="E5"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.e_Vaccines_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.e_Vaccines_score = this.obj.e_Vaccines_score+data.value;
                }
              }
           }else if(name=="E6"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.e_Antibiotics_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.e_Antibiotics_score = this.obj.e_Antibiotics_score+data.value;
                }
              }
           }else if(name=="E7"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.e_Infrastructure_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.e_Infrastructure_score = this.obj.e_Infrastructure_score+data.value;
                }
              }
           }else if(name=="E8"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.e_IP_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.e_IP_score = this.obj.e_IP_score+data.value;
                }
              }
           }else if(name=="E9"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.e_AHDS_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.e_AHDS_score = this.obj.e_AHDS_score+data.value;
                }
              }
           }else if(name=="E10"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.e_OE_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.e_OE_score = this.obj.e_OE_score+data.value;
                }
              }
           }else if(name=="F1"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.f_ANC_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.f_ANC_score = this.obj.f_ANC_score+data.value;
                }
              }
           }else if(name=="F2"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.f_IPIP_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.f_IPIP_score = this.obj.f_IPIP_score+data.value;
                }
              }
           }else if(name=="F3"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.f_ENCR_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.f_ENCR_score = this.obj.f_ENCR_score+data.value;
                }
              }
           }else if(name=="F4"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.f_FP_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.f_FP_score = this.obj.f_FP_score+data.value;
                }
              }
           }else if(name=="F5"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.f_CS_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.f_CS_score = this.obj.f_CS_score+data.value;
                }
              }
           }else if(name=="F6"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.f_FMO_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.f_FMO_score = this.obj.f_FMO_score+data.value;
                }
              }
           }else if(name=="F7"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.f_AH_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.f_AH_score = this.obj.f_AH_score+data.value;
                }
              }
           }
           
          }
      }else{
        this.deleteRowsfromCounterObj(id);
      }
  }

  clearTheResponse(id){
    if(id==42 || id==43){
      this.obj.f12= null;    
      this.facilityradioObj["f12"] = false;
      this.facilityradioObjTemp["f12"] = null;
      this.f1SectionForm.controls["f12"].setErrors(null);
      this.obj.f23= null;      
      this.facilityradioObj["f23"] = false;
      this.facilityradioObjTemp["f23"] = null;
      this.f2SectionForm.controls["f23"].setErrors(null);
      for(let ids of [118,130]) {
        this.deleteRowsfromCounterObj(ids);
      }
    }
    if(id==40){
      this.obj.f15= null;      
      this.facilityradioObj["f15"] = false;
      this.facilityradioObjTemp["f15"] = null
      this.f1SectionForm.controls["f15"].setErrors(null);
      for(let ids of [121]) {
        this.deleteRowsfromCounterObj(ids);
      }
    }
    if(id==110){
      this.obj.f14= null;      
      this.facilityradioObj["f14"] = false;
      this.facilityradioObjTemp["f14"] = null
      this.f1SectionForm.controls["f14"].setErrors(null);
      for(let ids of [120]) {
        this.deleteRowsfromCounterObj(ids);
      }
    }
    if(id==38){
      this.obj.f18= null;      
      this.facilityradioObj["f18"] = false;
      this.facilityradioObjTemp["f18"] = null
      this.f1SectionForm.controls["f18"].setErrors(null);
      for(let ids of [124]) {
        this.deleteRowsfromCounterObj(ids);
      }
    }
    if(id==114 && (this.obj.e109==27 || this.obj.e109==29 || this.obj.e109==null)){
      this.obj.f19= null;      
      this.facilityradioObj["f19"] = false;
      this.facilityradioObjTemp["f19"] = null
      this.f1SectionForm.controls["f19"].setErrors(null);
      for(let ids of [125]) {
        this.deleteRowsfromCounterObj(ids);
      }
    }
    if(id==115 && (this.obj.e108==27 || this.obj.e108==29 || this.obj.e108==null)){
      this.obj.f19= null;      
      this.facilityradioObj["f19"] = false;
      this.facilityradioObjTemp["f19"] = null
      this.f1SectionForm.controls["f19"].setErrors(null);
      for(let ids of [125]) {
        this.deleteRowsfromCounterObj(ids);
      }
    }
    if(id==26){
      this.obj.f111= null;      
      this.facilityradioObj["f111"] = false;
      this.facilityradioObjTemp["f111"] = null
      this.f1SectionForm.controls["f111"].setErrors(null);
      for(let ids of [127]) {
        this.deleteRowsfromCounterObj(ids);
      }
    }
    if(id==45){
      this.obj.f21= null;     
      this.facilityradioObj["f21"] = false;
      this.facilityradioObjTemp["f21"] = null
      this.f2SectionForm.controls["f21"].setErrors(null);
      for(let ids of [128]) {
        this.deleteRowsfromCounterObj(ids);
      }
    }
    if(id==32){
      this.obj.f24= null;      
      this.facilityradioObj["f24"] = false;
      this.facilityradioObjTemp["f24"] = null
      this.f2SectionForm.controls["f24"].setErrors(null);
      for(let ids of [131]) {
        this.deleteRowsfromCounterObj(ids);
      }
    }
    if(id==15){
      this.obj.f25= null;      
      this.facilityradioObj["f25"] = false;
      this.facilityradioObjTemp["f25"] = null
      this.f2SectionForm.controls["f25"].setErrors(null);
      for(let ids of [132]) {
        this.deleteRowsfromCounterObj(ids);
      }
    }
    if(id==14){
      this.obj.f26= null;      
      this.facilityradioObj["f26"] = false;
      this.facilityradioObjTemp["f26"] = null
      this.f2SectionForm.controls["f26"].setErrors(null);
      for(let ids of [133]) {
        this.deleteRowsfromCounterObj(ids);
      }
    }
    if(id==10 && (this.obj.e23==27 || this.obj.e23==29 || this.obj.e23==null)){
      this.obj.f27= null;      
      this.facilityradioObj["f27"] = false;
      this.facilityradioObjTemp["f27"] = null
      this.f2SectionForm.controls["f27"].setErrors(null);
      for(let ids of [134]) {
        this.deleteRowsfromCounterObj(ids);
      }
    }
    if(id==12 && (this.obj.e21==27 || this.obj.e21==29 || this.obj.e21==null)){
      this.obj.f27= null;      
      this.facilityradioObj["f27"] = false;
      this.facilityradioObjTemp["f27"] = null
      this.f2SectionForm.controls["f27"].setErrors(null);
      for(let ids of [134]) {
        this.deleteRowsfromCounterObj(ids);
      }
    }
    if(id==56){
      this.obj.f32= null;      
      this.facilityradioObj["f32"] = false;
      this.facilityradioObjTemp["f32"] = null
      this.f3SectionForm.controls["f32"].setErrors(null);
      for(let ids of [139]) {
        this.deleteRowsfromCounterObj(ids);
      }
    }
    if(id==57){
      this.obj.f33= null;      
      this.facilityradioObj["f33"] = false;
      this.facilityradioObjTemp["f33"] = null
      this.f3SectionForm.controls["f33"].setErrors(null);
      for(let ids of [140]) {
        this.deleteRowsfromCounterObj(ids);
      }
    }
    if(id==58){
      this.obj.f36= null;      
      this.facilityradioObj["f36"] = false;
      this.facilityradioObjTemp["f36"] = null
      this.f3SectionForm.controls["f36"].setErrors(null);
      for(let ids of [143]) {
        this.deleteRowsfromCounterObj(ids);
      }
    }
    if(id==46){
      this.obj.f37= null;      
      this.facilityradioObj["f37"] = false;
      this.facilityradioObjTemp["f37"] = null
      this.f3SectionForm.controls["f37"].setErrors(null);
      for(let ids of [144]) {
        this.deleteRowsfromCounterObj(ids);
      }
    }
    if(id==68 || id==69 || id==70){
      this.obj.f38= null;    
      this.facilityradioObj["f38"] = false;
      this.facilityradioObjTemp["f38"] = null;
      this.f3SectionForm.controls["f38"].setErrors(null);
      for(let ids of [145]) {
        this.deleteRowsfromCounterObj(ids);
      }
    }
    if(id==1 && (this.obj.e112==27 || this.obj.e112==29 || this.obj.e112==null)){
      this.obj.f42= null;      
      this.facilityradioObj["f42"] = false;
      this.facilityradioObjTemp["f42"] = null
      this.f4SectionForm.controls["f42"].setErrors(null);
      this.obj.f43= null;      
      this.facilityradioObj["f43"] = false;
      this.facilityradioObjTemp["f43"] = null
      this.f4SectionForm.controls["f43"].setErrors(null);
      for(let ids of [149,150]) {
        this.deleteRowsfromCounterObj(ids);
      }
    }
    if(id==2 && (this.obj.e111==27 || this.obj.e111==29 || this.obj.e111==null)){
      this.obj.f42= null;      
      this.facilityradioObj["f42"] = false;
      this.facilityradioObjTemp["f42"] = null
      this.f4SectionForm.controls["f42"].setErrors(null);
      this.obj.f43= null;      
      this.facilityradioObj["f43"] = false;
      this.facilityradioObjTemp["f43"] = null
      this.f4SectionForm.controls["f43"].setErrors(null);
      for(let ids of [149,150]) {
        this.deleteRowsfromCounterObj(ids);
      }
    }
    if(id==98){
      this.obj.f64= null;      
      this.facilityradioObj["f64"] = false;
      this.facilityradioObjTemp["f64"] = null
      this.f6SectionForm.controls["f64"].setErrors(null);
      for(let ids of [164]) {
        this.deleteRowsfromCounterObj(ids);
      }
    }
    if(id==96 || ((id==101 && (this.obj.e88==27 || this.obj.e88==29 || this.obj.e88==null)))){
      this.obj.f65= null;      
      this.facilityradioObj["f65"] = false;
      this.facilityradioObjTemp["f65"] = null
      this.f6SectionForm.controls["f65"].setErrors(null);
      for(let ids of [165]) {
        this.deleteRowsfromCounterObj(ids);
      }
    }
    if(id==96 || ((id==102 && (this.obj.e87==27 || this.obj.e87==29 || this.obj.e87==null)))){
      this.obj.f65= null;      
      this.facilityradioObj["f65"] = false;
      this.facilityradioObjTemp["f65"] = null
      this.f6SectionForm.controls["f65"].setErrors(null);
      for(let ids of [165]) {
        this.deleteRowsfromCounterObj(ids);
      }
    }
    if(id==117){
      this.obj.f711= null;      
      this.facilityradioObj["f711"] = false;
      this.facilityradioObjTemp["f711"] = null
      this.f7SectionForm.controls["f711"].setErrors(null);
      for(let ids of [177]) {
        this.deleteRowsfromCounterObj(ids);
      }
    }

  }
  
  deleteRowsfromCounterObj(id){
        this.fetchvalObj = this.clickCounterObj.filter(counter => counter.id == id);
        if(this.fetchvalObj.length>0){
          let index: number = this.clickCounterObj.findIndex(x => x.id==id);
          this.clickCounterObj.splice(index, 1);
          this.obj.e_RH_score=0;
          this.obj.e_MHDS_score=0;
          this.obj.e_NHDS_score=0;
          this.obj.e_CHDS_score=0;
          this.obj.e_Vaccines_score=0;
          this.obj.e_Antibiotics_score=0;
          this.obj.e_Infrastructure_score=0;
          this.obj.e_IP_score=0;
          this.obj.e_AHDS_score=0;
          this.obj.e_OE_score=0;
          this.obj.f_ANC_score=0;
          this.obj.f_IPIP_score=0;
          this.obj.f_ENCR_score=0;
          this.obj.f_FP_score=0;
          this.obj.f_CS_score=0;
          this.obj.f_FMO_score=0;
          this.obj.f_AH_score=0;
            for(let data of this.clickCounterObj) {
              if(data.name=="E1"){
                 this.obj.e_RH_score = this.obj.e_RH_score + data.value; 
              }else if(data.name=="E2"){
                 this.obj.e_MHDS_score = this.obj.e_MHDS_score + data.value; 
              }else if(data.name=="E3"){
                 this.obj.e_NHDS_score = this.obj.e_NHDS_score + data.value; 
              }else if(data.name=="E4"){
                 this.obj.e_CHDS_score = this.obj.e_CHDS_score + data.value; 
              }else if(data.name=="E5"){
                 this.obj.e_Vaccines_score = this.obj.e_Vaccines_score + data.value; 
              }else if(data.name=="E6"){
                 this.obj.e_Antibiotics_score = this.obj.e_Antibiotics_score + data.value; 
              }else if(data.name=="E7"){
                 this.obj.e_Infrastructure_score = this.obj.e_Infrastructure_score + data.value; 
              }else if(data.name=="E8"){
                 this.obj.e_IP_score = this.obj.e_IP_score + data.value; 
              }else if(data.name=="E9"){
                 this.obj.e_AHDS_score = this.obj.e_AHDS_score + data.value; 
              }else if(data.name=="E10"){
                 this.obj.e_OE_score = this.obj.e_OE_score + data.value; 
              }else if(data.name=="F1"){
                 this.obj.f_ANC_score = this.obj.f_ANC_score + data.value; 
              }else if(data.name=="F2"){
                 this.obj.f_IPIP_score = this.obj.f_IPIP_score + data.value; 
              }else if(data.name=="F3"){
                 this.obj.f_ENCR_score = this.obj.f_ENCR_score + data.value; 
              }else if(data.name=="F4"){
                 this.obj.f_FP_score = this.obj.f_FP_score + data.value; 
              }else if(data.name=="F5"){
                 this.obj.f_CS_score = this.obj.f_CS_score + data.value; 
              }else if(data.name=="F6"){
                 this.obj.f_FMO_score = this.obj.f_FMO_score + data.value; 
              }else if(data.name=="F7"){
                 this.obj.f_AH_score = this.obj.f_AH_score + data.value; 
              }
              
            }
          }
  }

  hintModalFacility : any;
  hintModal(id) {
    let hintObj = this.hintService.getHintsJson();
    let filteredHintObj= hintObj.filter(hint => hint.id == id);
    this.hintModalFacility = this.modalCtrl.create(HintModalPage, filteredHintObj);
    this.hintModalFacility.present();
  }
  
  radioPressed(radiovar, e, value,id){
    /// Writen by Jagat Bandhu ////////////
    let radid = radiovar.id;
    let radgroup = radiovar["_group"]["_btns"];
    let count: number = 0;
    for (var v in radgroup) // for acts as a foreach  
    {
      if (radgroup[v].id == radid){
        if (radgroup[v]._checked==true){
          count++;
        }
      }
    }  
    if (count==0){
      return false;
    }
    if(!this.finalized && !this.sent){
    this.press++
    if(this.press >= 1 ){
        switch(value){
          case 'e111':
            this.deleteRowsfromCounterObj(id);        
              this.obj.e111 = null;   
              this.clearTheResponse(id);
          break;
          case 'e112':
            this.deleteRowsfromCounterObj(id);
            this.obj.e112 = null;
            this.clearTheResponse(id);
          break;
          case 'e121':
            this.deleteRowsfromCounterObj(id);
            this.obj.e121 = null;
          break;
          case 'e122':
            this.deleteRowsfromCounterObj(id);
            this.obj.e122 = null;
          break;
          case 'e13':
            this.deleteRowsfromCounterObj(id);
            this.obj.e13 = null;
          break;
          case 'e14':
            this.deleteRowsfromCounterObj(id);
            this.obj.e14 = null;
          break;
          case 'e15':
            this.deleteRowsfromCounterObj(id);
            this.obj.e15 = null;
          break;
          case 'e16':
            this.deleteRowsfromCounterObj(id);
            this.obj.e16 = null;
          break;
          case 'e17':
            this.deleteRowsfromCounterObj(id);
            this.obj.e17 = null;
          break;
          case 'e21':
            this.deleteRowsfromCounterObj(id);
            this.obj.e21 = null;
            this.obj.e22 = null;
            this.clearTheResponse(id);
          break;
          case 'e22':
            this.deleteRowsfromCounterObj(id);
            this.obj.e22 = null;
          break;
          case 'e23':
            this.deleteRowsfromCounterObj(id);
            this.obj.e23 = null;
            this.clearTheResponse(id);
          break;
          case 'e24':
            this.deleteRowsfromCounterObj(id);
            this.obj.e24 = null;
          break;
          case 'e25':
            this.deleteRowsfromCounterObj(id);
            this.obj.e25 = null;
            this.clearTheResponse(id);
          break;
          case 'e26':
            this.deleteRowsfromCounterObj(id);
            this.obj.e26 = null;
            this.clearTheResponse(id);
          break;
          case 'e27':
            this.deleteRowsfromCounterObj(id);
            this.obj.e27 = null;
          break;
          case 'e28':
            this.deleteRowsfromCounterObj(id);
            this.obj.e28 = null;
          break;
          case 'e29':
            this.deleteRowsfromCounterObj(id);
            this.obj.e29 = null;
          break;
          case 'e210':
            this.deleteRowsfromCounterObj(id);
            this.obj.e210 = null;
          break;
          case 'e211':
            this.deleteRowsfromCounterObj(id);
            this.obj.e211 = null;
          break;
          case 'e212':
            this.deleteRowsfromCounterObj(id);
            this.obj.e212 = null;
          break;
          case 'e213':
            this.deleteRowsfromCounterObj(id);
            this.obj.e213 = null;
          break;
          case 'e214':
            this.deleteRowsfromCounterObj(id);
            this.obj.e214 = null;
          break;
          case 'e215':
            this.deleteRowsfromCounterObj(id);
            this.obj.e215 = null;
          break;
          case 'e216':
            this.deleteRowsfromCounterObj(id);
            this.obj.e216 = null;
          break;
          case 'e217':
            this.deleteRowsfromCounterObj(id);
            this.obj.e217 = null;
            this.clearTheResponse(id);
          break;
          case 'e218':
            this.deleteRowsfromCounterObj(id);
            this.obj.e218 = null;
          break;
          case 'e219':
            this.deleteRowsfromCounterObj(id);
            this.obj.e219 = null;
          break;
          case 'e220':
            this.deleteRowsfromCounterObj(id);
            this.obj.e220 = null;
          break;
          case 'e221':
            this.deleteRowsfromCounterObj(id);
            this.obj.e221 = null;
          break;
          case 'e222':
            this.deleteRowsfromCounterObj(id);
            this.obj.e222 = null;
          break;
          case 'e223':
            this.deleteRowsfromCounterObj(id);
            this.obj.e223 = null;
            this.clearTheResponse(id);
          break;
          case 'e224':
            this.deleteRowsfromCounterObj(id);
            this.obj.e224 = null;
          break;
          case 'e225':
            this.deleteRowsfromCounterObj(id);
            this.obj.e225 = null;
          break;
          case 'e226':
            this.deleteRowsfromCounterObj(id);
            this.obj.e226 = null;
          break;
          case 'e227':
            this.deleteRowsfromCounterObj(id);
            this.obj.e227 = null;
          break;
          case 'e228':
            this.deleteRowsfromCounterObj(id);
            this.obj.e228 = null;
          break;
          case 'e229':
            this.deleteRowsfromCounterObj(id);
            this.obj.e229 = null;
            this.clearTheResponse(id);
          break;
          case 'e230':
          this.deleteRowsfromCounterObj(id);
            this.obj.e230 = null;
          break;
          case 'e231':
          this.deleteRowsfromCounterObj(id);
            this.obj.e231 = null;
            this.clearTheResponse(id);
          break;
          case 'e232':
          this.deleteRowsfromCounterObj(id);
            this.obj.e232 = null;
          break;
          case 'e233':
          this.deleteRowsfromCounterObj(id);
            this.obj.e233 = null;
            this.clearTheResponse(id);
          break;
          case 'e234':
          this.deleteRowsfromCounterObj(id);
            this.obj.e234 = null;
            this.clearTheResponse(id);
          break;
          case 'e235':
          this.deleteRowsfromCounterObj(id);
            this.obj.e235 = null;
          break;
          case 'e236':
          this.deleteRowsfromCounterObj(id);
            this.obj.e236 = null;
            this.clearTheResponse(id);
          break;
          case 'e31':
          this.deleteRowsfromCounterObj(id);
            this.obj.e31 = null;
            this.clearTheResponse(id);
          break;
          case 'e32':
          this.deleteRowsfromCounterObj(id);
            this.obj.e32 = null;
          break;
          case 'e33':
          this.deleteRowsfromCounterObj(id);
            this.obj.e33 = null;
          break;
          case 'e341':
          this.deleteRowsfromCounterObj(id);
            this.obj.e341 = null;
          break;
          case 'e342':
          this.deleteRowsfromCounterObj(id);
            this.obj.e342 = null;
          break;
          case 'e351':
          this.deleteRowsfromCounterObj(id);
            this.obj.e351 = null;
          break;
          case 'e352':
          this.deleteRowsfromCounterObj(id);
            this.obj.e352 = null;
          break;
          case 'e36':
          this.deleteRowsfromCounterObj(id);
            this.obj.e36 = null;
          break;
          case 'e37':
          this.deleteRowsfromCounterObj(id);
            this.obj.e37 = null;
          break;
          case 'e38':
          this.deleteRowsfromCounterObj(id);
            this.obj.e38 = null;
          break;
          case 'e39':
          this.deleteRowsfromCounterObj(id);
            this.obj.e39 = null;
            this.clearTheResponse(id);
          break;
          case 'e310':
          this.deleteRowsfromCounterObj(id);
            this.obj.e310 = null;
            this.clearTheResponse(id);
          break;
          case 'e311':
          this.deleteRowsfromCounterObj(id);
            this.obj.e311 = null;
            this.clearTheResponse(id);
          break;
          case 'e312':
          this.deleteRowsfromCounterObj(id);
            this.obj.e312 = null;
          break;
          case 'e313':
          this.deleteRowsfromCounterObj(id);
            this.obj.e313 = null;
          break;
          case 'e41':
          this.deleteRowsfromCounterObj(id);
            this.obj.e41 = null;
          break;
          case 'e42':
          this.deleteRowsfromCounterObj(id);
            this.obj.e42 = null;
          break;
          case 'e43':
          this.deleteRowsfromCounterObj(id);
            this.obj.e43 = null;
          break;
          case 'e44':
          this.deleteRowsfromCounterObj(id);
            this.obj.e44 = null;
          break;
          case 'e45':
          this.deleteRowsfromCounterObj(id);
            this.obj.e45 = null;
          break;
          case 'e46':
          this.deleteRowsfromCounterObj(id);
            this.obj.e46 = null;
          break;
          case 'e47':
          this.deleteRowsfromCounterObj(id);
            this.obj.e47 = null;
          break;
          case 'e51':
          this.deleteRowsfromCounterObj(id);
            this.obj.e51 = null;
            this.clearTheResponse(id);
          break;
          case 'e52':
          this.deleteRowsfromCounterObj(id);
            this.obj.e52 = null;
            this.clearTheResponse(id);
          break;
          case 'e53':
          this.deleteRowsfromCounterObj(id);
            this.obj.e53 = null;
            this.clearTheResponse(id);
          break;
          case 'e54':
          this.deleteRowsfromCounterObj(id);
            this.obj.e54 = null;
          break;
          case 'e55':
          this.deleteRowsfromCounterObj(id);
            this.obj.e55 = null;
          break;
          case 'e56':
          this.deleteRowsfromCounterObj(id);
            this.obj.e56 = null;
          break;
          case 'e57':
          this.deleteRowsfromCounterObj(id);
            this.obj.e57 = null;
          break;
          case 'e58':
          this.deleteRowsfromCounterObj(id);
            this.obj.e58 = null;
          break;
          case 'e59':
          this.deleteRowsfromCounterObj(id);
            this.obj.e59 = null;
          break;
          case 'e510':
          this.deleteRowsfromCounterObj(id);
            this.obj.e510 = null;
          break;
          case 'e511':
          this.deleteRowsfromCounterObj(id);
            this.obj.e511 = null;
          break;
          case 'e512':
          this.deleteRowsfromCounterObj(id);
            this.obj.e512 = null;
          break;
          case 'e513':
          this.deleteRowsfromCounterObj(id);
            this.obj.e513 = null;
          break;
          case 'e61':
          this.deleteRowsfromCounterObj(id);
            this.obj.e61 = null;
          break;
          case 'e62':
          this.deleteRowsfromCounterObj(id);
            this.obj.e62 = null;
          break;
          case 'e63':
          this.deleteRowsfromCounterObj(id);
            this.obj.e63 = null;
          break;
          case 'e64':
          this.deleteRowsfromCounterObj(id);
            this.obj.e64 = null;
          break;
          case 'e65':
          this.deleteRowsfromCounterObj(id);
            this.obj.e65 = null;
          break;
          case 'e66':
          this.deleteRowsfromCounterObj(id);
            this.obj.e66 = null;
          break;
          case 'e67':
          this.deleteRowsfromCounterObj(id);
            this.obj.e67 = null;
          break;
          case 'e71':
          this.deleteRowsfromCounterObj(id);
            this.obj.e71 = null;
          break;
          case 'e72':
          this.deleteRowsfromCounterObj(id);
            this.obj.e72 = null;
          break;
          case 'e73':
          this.deleteRowsfromCounterObj(id);
            this.obj.e73 = null;
          break;
          case 'e74':
          this.deleteRowsfromCounterObj(id);
            this.obj.e74 = null;
          break;
          case 'e75':
          this.deleteRowsfromCounterObj(id);
            this.obj.e75 = null;
          break;
          case 'e76':
          this.deleteRowsfromCounterObj(id);
            this.obj.e76 = null;
          break;
          case 'e77':
          this.deleteRowsfromCounterObj(id);
            this.obj.e77 = null;
          break;
          case 'e81':
          this.deleteRowsfromCounterObj(id);
            this.obj.e81 = null;
          break;
          case 'e82':
          this.deleteRowsfromCounterObj(id);
            this.obj.e82 = null;
            this.clearTheResponse(id);
          break;
          case 'e83':
          this.deleteRowsfromCounterObj(id);
            this.obj.e83 = null;
          break;
          case 'e84':
          this.deleteRowsfromCounterObj(id);
            this.obj.e84 = null;
            this.clearTheResponse(id);
          break;
          case 'e85':
          this.deleteRowsfromCounterObj(id);
            this.obj.e85 = null;
          break;
          case 'e86':
          this.deleteRowsfromCounterObj(id);
            this.obj.e86 = null;
          break;
          case 'e87':
          this.deleteRowsfromCounterObj(id);
            this.obj.e87 = null;
            this.clearTheResponse(id);
          break;
          case 'e88':
          this.deleteRowsfromCounterObj(id);
            this.obj.e88 = null;
            this.clearTheResponse(id);
          break;
          case 'e91':
          this.deleteRowsfromCounterObj(id);
            this.obj.e91 = null;
          break;
          case 'e92':
          this.deleteRowsfromCounterObj(id);
            this.obj.e92 = null;
          break;
          case 'e93':
          this.deleteRowsfromCounterObj(id);
            this.obj.e93 = null;
          break;
          case 'e94':
          this.deleteRowsfromCounterObj(id);
            this.obj.e94 = null;
          break;
          case 'e101':
          this.deleteRowsfromCounterObj(id);
            this.obj.e101 = null;
          break;
          case 'e102':
          this.deleteRowsfromCounterObj(id);
            this.obj.e102 = null;
          break;
          case 'e103':
          this.deleteRowsfromCounterObj(id);
            this.obj.e103 = null;
          break;
          case 'e104':
          this.deleteRowsfromCounterObj(id);
            this.obj.e104 = null;
            this.clearTheResponse(id);
          break;
          case 'e105':
          this.deleteRowsfromCounterObj(id);
            this.obj.e105 = null;
          break;
          case 'e106':
            this.deleteRowsfromCounterObj(id);
            this.obj.e106 = null;
          break;
          case 'e107':
          this.deleteRowsfromCounterObj(id);
            this.obj.e107 = null;
          break;
          case 'e108':
          this.deleteRowsfromCounterObj(id);
            this.obj.e108 = null;
            this.clearTheResponse(id);
          break;
          case 'e109':
          this.deleteRowsfromCounterObj(id);
            this.obj.e109 = null;
            this.clearTheResponse(id);
          break;
          case 'e1010':
          this.deleteRowsfromCounterObj(id);
            this.obj.e1010 = null;
          break;
          case 'e1011':
          this.deleteRowsfromCounterObj(id);
            this.obj.e1011 = null;
            this.clearTheResponse(id);
          break;
          case 'f12':
          this.deleteRowsfromCounterObj(id);
            this.obj.f12 = null;
          break;
          case 'f13':
          this.deleteRowsfromCounterObj(id);
            this.obj.f13 = null;
          break;
          case 'f14':
          this.deleteRowsfromCounterObj(id);
            this.obj.f14 = null;
          break;
          case 'f15':
          this.deleteRowsfromCounterObj(id);
            this.obj.f15 = null;
          break;
          case 'f16':
          this.deleteRowsfromCounterObj(id);
            this.obj.f16 = null;
          break;
          case 'f17':
          this.deleteRowsfromCounterObj(id);
            this.obj.f17 = null;
          break;
          case 'f18':
          this.deleteRowsfromCounterObj(id);
            this.obj.f18 = null;
          break;
          case 'f19':
          this.deleteRowsfromCounterObj(id);
            this.obj.f19 = null;
          break;
          case 'f110':
          this.deleteRowsfromCounterObj(id);
            this.obj.f110 = null;
          break;
          case 'f111':
          this.deleteRowsfromCounterObj(id);
            this.obj.f111 = null;
          break;
          case 'f21':
          this.deleteRowsfromCounterObj(id);
            this.obj.f21 = null;
          break;
          case 'f22':
          this.deleteRowsfromCounterObj(id);
            this.obj.f22 = null;
          break;
          case 'f23':
          this.deleteRowsfromCounterObj(id);
            this.obj.f23 = null;
          break;
          case 'f24':
          this.deleteRowsfromCounterObj(id);
            this.obj.f124 = null;
          break;
          case 'f25':
          this.deleteRowsfromCounterObj(id);
            this.obj.f25 = null;
          break;
          case 'f26':
          this.deleteRowsfromCounterObj(id);
            this.obj.f26 = null;
          break;
          case 'f27':
          this.deleteRowsfromCounterObj(id);
            this.obj.f27 = null;
          break;
          case 'f28':
          this.deleteRowsfromCounterObj(id);
            this.obj.f28 = null;
          break;
          case 'f12':
          this.deleteRowsfromCounterObj(id);
            this.obj.f12 = null;
          break;
          case 'f29':
          this.deleteRowsfromCounterObj(id);
            this.obj.f29 = null;
          break;
          case 'f210':
          this.deleteRowsfromCounterObj(id);
            this.obj.f210 = null;
          break;
          case 'f31':
          this.deleteRowsfromCounterObj(id);
            this.obj.f31 = null;
          break;
          case 'f32':
          this.deleteRowsfromCounterObj(id);
            this.obj.f32 = null;
          break;
          case 'f33':
          this.deleteRowsfromCounterObj(id);
            this.obj.f33 = null;
          break;
          case 'f34':
          this.deleteRowsfromCounterObj(id);
            this.obj.f34 = null;
          break;
          case 'f35':
          this.deleteRowsfromCounterObj(id);
            this.obj.f35 = null;
          break;
          case 'f36':
          this.deleteRowsfromCounterObj(id);
            this.obj.f36 = null;
          break;
          case 'f37':
          this.deleteRowsfromCounterObj(id);
            this.obj.f37 = null;
          break;
          case 'f38':
          this.deleteRowsfromCounterObj(id);
            this.obj.f38 = null;
          break;
          case 'f39':
          this.deleteRowsfromCounterObj(id);
            this.obj.f39 = null;
          break;
          case 'f310':
          this.deleteRowsfromCounterObj(id);
            this.obj.f310 = null;
          break;
          case 'f41':
          this.deleteRowsfromCounterObj(id);
            this.obj.f41 = null;
          break;
          case 'f42':
          this.deleteRowsfromCounterObj(id);
            this.obj.f42 = null;
          break;
          case 'f43':
          this.deleteRowsfromCounterObj(id);
            this.obj.f43 = null;
          break;
          case 'f44':
          this.deleteRowsfromCounterObj(id);
            this.obj.f44 = null;
          break;
          case 'f45':
          this.deleteRowsfromCounterObj(id);
            this.obj.f45 = null;
          break;
          case 'f51':
          this.deleteRowsfromCounterObj(id);
            this.obj.f51 = null;
          break;
          case 'f52':
          this.deleteRowsfromCounterObj(id);
            this.obj.f52 = null;
          break;
          case 'f53':
          this.deleteRowsfromCounterObj(id);
            this.obj.f53 = null;
          break;
          case 'f54':
          this.deleteRowsfromCounterObj(id);
            this.obj.f54 = null;
          break;
          case 'f55':
          this.deleteRowsfromCounterObj(id);
            this.obj.f55 = null;
          break;
          case 'f56':
          this.deleteRowsfromCounterObj(id);
            this.obj.f56 = null;
          break;
          case 'f57':
          this.deleteRowsfromCounterObj(id);
            this.obj.f57 = null;
          break;
          case 'f58':
          this.deleteRowsfromCounterObj(id);
            this.obj.f58 = null;
          break;
          case 'f61':
          this.deleteRowsfromCounterObj(id);
            this.obj.f61 = null;
          break;
          case 'f62':
          this.deleteRowsfromCounterObj(id);
            this.obj.f62 = null;
          break;
          case 'f63':
          this.deleteRowsfromCounterObj(id);
            this.obj.f63 = null;
          break;
          case 'f64':
          this.deleteRowsfromCounterObj(id);
            this.obj.f64 = null;
          break;
          case 'f65':
          this.deleteRowsfromCounterObj(id);
            this.obj.f65 = null;
          break;
          case 'f66':
          this.deleteRowsfromCounterObj(id);
            this.obj.f66 = null;
          break;
          case 'f71':
          this.deleteRowsfromCounterObj(id);
            this.obj.f71 = null;
          break;
          case 'f72':
          this.deleteRowsfromCounterObj(id);
            this.obj.f72 = null;
          break;
          case 'f73':
          this.deleteRowsfromCounterObj(id);
            this.obj.f73 = null;
          break;
          case 'f74':
          this.deleteRowsfromCounterObj(id);
            this.obj.f74 = null;
          break;
          case 'f75':
          this.deleteRowsfromCounterObj(id);
            this.obj.f75 = null;
          break;
          case 'f76':
          this.deleteRowsfromCounterObj(id);
            this.obj.f76 = null;
          break;
          case 'f77':
          this.deleteRowsfromCounterObj(id);
            this.obj.f77 = null;
          break;
          case 'f78':
          this.deleteRowsfromCounterObj(id);
            this.obj.f78 = null;
          break;
          case 'f79':
          this.deleteRowsfromCounterObj(id);
            this.obj.f79 = null;
          break;
          case 'f710':
          this.deleteRowsfromCounterObj(id);
            this.obj.f710 = null;
          break;
          case 'f711':
          this.deleteRowsfromCounterObj(id);
            this.obj.f711 = null;
          break;
          case 'hA1':
          this.deleteRowsfromCounterObj(id);
            this.obj.hA1 = null;
          break;
          case 'hA2':
          this.deleteRowsfromCounterObj(id);
            this.obj.hA2 = null;
            this.obj.hA2p1 = null;
            this.obj.hA2p2 = null;
          break;
          case 'hA2p1':
          this.deleteRowsfromCounterObj(id);
            this.obj.hA2p1 = null;
          break;
          case 'hA2p2':
          this.deleteRowsfromCounterObj(id);
            this.obj.hA2p2 = null;
          break;
          case 'hA3':
          this.deleteRowsfromCounterObj(id);
            this.obj.hA3 = null;
            this.obj.hA3p1 = null;
          break;
          case 'hA3p1':
          this.deleteRowsfromCounterObj(id);
            this.obj.hA3p1 = null;
          break;
          case 'hD1':
          this.deleteRowsfromCounterObj(id);
            this.obj.hD1 = null;
          break;
          case 'hC1':
          this.deleteRowsfromCounterObj(id);
            this.obj.hC1 = null;
          break;
          case 'hC2':
          this.deleteRowsfromCounterObj(id);
            this.obj.hC2 = null;
          break;
          case 'hF1':
          this.deleteRowsfromCounterObj(id);
            this.obj.hF1 = null;
            this.obj.hF1p1= null;
            this.obj.hF1p2= null;
            this.obj.hF1p2p1= null;
          case 'hF1p1':
          this.deleteRowsfromCounterObj(id);
            this.obj.hF1p1 = null;
          break;
          case 'hF1p2':
          this.deleteRowsfromCounterObj(id);
            this.obj.hF1p2 = null;
            this.obj.hF1p2p1 = null;
          break;
          case 'hF1p2p1':
          this.deleteRowsfromCounterObj(id);
            this.obj.hF1p2p1 = null;
          break;
          case 'hF2':
          this.deleteRowsfromCounterObj(id);
            this.obj.hF2 = null;
          break;
          case 'iA1':
          this.deleteRowsfromCounterObj(id);
            this.obj.iA1 = null;
          break;
          case 'iA2':
          this.deleteRowsfromCounterObj(id);
            this.obj.iA2 = null;
          break;
          case 'iB1':
          this.deleteRowsfromCounterObj(id);
            this.obj.iB1 = null;
          break;
          case 'iB2':
          this.deleteRowsfromCounterObj(id);
            this.obj.iB2 = null;
          break;
          case 'iB3':
          this.deleteRowsfromCounterObj(id);
            this.obj.iB3 = null;
          break;
          case 'iB4':
          this.deleteRowsfromCounterObj(id);
            this.obj.iB4 = null;
            this.obj.iB4p1 = null;
          break;
          case 'iB4p1':
          this.deleteRowsfromCounterObj(id);
            this.obj.iB4p1 = null;
          break;
          case 'iC1':
          this.deleteRowsfromCounterObj(id);
            this.obj.iC1 = null;
          break;
          case 'iC2':
          this.deleteRowsfromCounterObj(id);
            this.obj.iC2 = null;
          break;
          case 'iC3':
          this.deleteRowsfromCounterObj(id);
            this.obj.iC3 = null;
          break;
          case 'iDA1':
          this.deleteRowsfromCounterObj(id);
            this.obj.iDA1 = null;
          break;
          case 'iDA2':
          this.deleteRowsfromCounterObj(id);
            this.obj.iDA2 = null;
          break;
          case 'iDA3':
          this.deleteRowsfromCounterObj(id);
            this.obj.iDA3 = null;
            this.obj.iDA3p1 = null;
            this.obj.iDA3p2 = null;
            this.obj.iDA3p3 = null;
            this.obj.iDA3p4 = null;
            this.obj.iDA3p5 = null;
            this.obj.iDA3p6 = null;
            this.obj.iDA3p7 = null;
          break;
          case 'iDA3p1':
          this.deleteRowsfromCounterObj(id);
            this.obj.iDA3p1 = null;
          break;
          case 'iDA3p2':
          this.deleteRowsfromCounterObj(id);
            this.obj.iDA3p2 = null;
          break;
          case 'iDA3p3':
          this.deleteRowsfromCounterObj(id);
            this.obj.iDA3p3 = null;
          break;
          case 'iDA3p4':
          this.deleteRowsfromCounterObj(id);
            this.obj.iDA3p4 = null;
          break;
          case 'iDA3p5':
          this.deleteRowsfromCounterObj(id);
            this.obj.iDA3p5 = null;
          break;
          case 'iDA3p6':
          this.deleteRowsfromCounterObj(id);
            this.obj.iDA3p6 = null;
          break;
          case 'iDA3p7':
          this.deleteRowsfromCounterObj(id);
            this.obj.iDA3p7 = null;
          break;
          case 'iDB1':
          this.deleteRowsfromCounterObj(id);
            this.obj.iDB1 = null;
          break;
          case 'iDB2':
          this.deleteRowsfromCounterObj(id);
            this.obj.iDB2 = null;
          break;
          case 'iDB3':
          this.deleteRowsfromCounterObj(id);
            this.obj.iDB3 = null;
          break;
          case 'iDC1':
          this.deleteRowsfromCounterObj(id);
            this.obj.iDC1 = null;
          break;
          case 'iDC2':
          this.deleteRowsfromCounterObj(id);
            this.obj.iDC2 = null;
          break;
          case 'iDC3':
          this.deleteRowsfromCounterObj(id);
            this.obj.iDC3 = null;
          break;
          case 'iDD1':
          this.deleteRowsfromCounterObj(id);
            this.obj.iDD1 = null;
          break;
          case 'iDD2':
          this.deleteRowsfromCounterObj(id);
            this.obj.iDD2 = null;
          break;
          case 'iDD3':
          this.deleteRowsfromCounterObj(id);
            this.obj.iDD3 = null;
          break;
          case 'iDE1':
          this.deleteRowsfromCounterObj(id);
            this.obj.iDE1 = null;
          break;
          case 'iDE2':
          this.deleteRowsfromCounterObj(id);
            this.obj.iDE2 = null;
          break;
          case 'iDE3':
          this.deleteRowsfromCounterObj(id);
            this.obj.iDE3 = null;
          break;
          case 'iDE4':
          this.deleteRowsfromCounterObj(id);
            this.obj.iDE4 = null;
          break;
          case 'iDE5':
          this.deleteRowsfromCounterObj(id);
            this.obj.iDE5 = null;
          break;
          case 'iDE6':
          this.deleteRowsfromCounterObj(id);
            this.obj.iDE6 = null;
          break;
          case 'iE1':
          this.deleteRowsfromCounterObj(id);
            this.obj.iE1 = null;
          break;
          case 'iE2':
          this.deleteRowsfromCounterObj(id);
            this.obj.iE2 = null;
          break;
          case 'iE3':
          this.deleteRowsfromCounterObj(id);
            this.obj.iE3 = null;
          break;
          case 'iE4':
          this.deleteRowsfromCounterObj(id);
            this.obj.iE4 = null;
          break;
          case 'iE5':
          this.deleteRowsfromCounterObj(id);
            this.obj.iE5 = null;
          break;
          case 'iE6':
          this.deleteRowsfromCounterObj(id);
            this.obj.iE6 = null;
          break;
          case 'iF1':
          this.deleteRowsfromCounterObj(id);
            this.obj.iF1 = null;
          break;
          case 'iF2':
          this.deleteRowsfromCounterObj(id);
            this.obj.iF2 = null;
          break;
          case 'iF3':
          this.deleteRowsfromCounterObj(id);
            this.obj.iF3 = null;
          break;
          case 'iF4':
          this.deleteRowsfromCounterObj(id);
            this.obj.iF4 = null;
          break;
          case 'iG1':
          this.deleteRowsfromCounterObj(id);
            this.obj.iG1 = null;
          break;
          case 'iG2':
          this.deleteRowsfromCounterObj(id);
            this.obj.iG2 = null;
          break;
          case 'iG3':
          this.deleteRowsfromCounterObj(id);
            this.obj.iG3 = null;
            this.obj.iG3p1 = null;
          break;
          case 'iG3p1':
          this.deleteRowsfromCounterObj(id);
            this.obj.iG3p1 = null;
          break;
          case 'iG4':
          this.deleteRowsfromCounterObj(id);
            this.obj.iG4 = null;
            this.obj.iG4p1 = null;
          break;
          case 'iG4p1':
          this.deleteRowsfromCounterObj(id);
            this.obj.iG4p1 = null;
          break;
          case 'iG5':
          this.deleteRowsfromCounterObj(id);
            this.obj.iG5 = null;
          break;
          case 'iH1':
          this.deleteRowsfromCounterObj(id);
            this.obj.iH1 = null;
            this.obj.iH1p1 = null;
          break;
          case 'iH2':
          this.deleteRowsfromCounterObj(id);
            this.obj.iH2 = null;
          break;
        }
      this.press = 0;
    }
  }
  }

  

  /**
   *   
   * @Author: Ratikanta Pradhan 
   * @Author: Jagat Bandhu Sahoo
   * @email: ratikanta@sdrc.co.in 
   * @Last Modified by: Ratikanta Pradhan
   * @Last Modified time: 10-10-2017 13:48
   */
   
  ngOnDestroy(): void {
    this.events.unsubscribe(MessageProvider.EVENTS.FACILITY_DATA_SAVE_EVENT);
    this.events.unsubscribe(MessageProvider.EVENTS.FACILITY_VALIDATED);
    this.events.unsubscribe(MessageProvider.EVENTS.PREFETCH_PROCESS_COMPLETE);
    this.events.unsubscribe(MessageProvider.CLOSE_ALERTS.FACILITY);
    this.events.unsubscribe(MessageProvider.EVENTS.DISSMISS_LOADER_FACILITY);
    //We called the following lines cause it will reflect the number of saved and finalized forms in home page.
    this.dataService.getSavedForms();
    this.dataService.getFinalizeForms();
  }
  setProgressbarColor(id,colorCode):void{
      let htmlelement= document.getElementById(id);
      if( htmlelement.getElementsByClassName('progress-inner').length>0){
          htmlelement.getElementsByClassName('progress-inner')[0]['style'].backgroundColor = colorCode;
      }
}
setPercentCSS(id,percent){
  if(percent<=10){
  this.setProgressbarColor(id,"#ff0000");
  }else if(percent<=20){
  this.setProgressbarColor(id,"#Fe3c3c");
  }else if(percent<=30){
  this.setProgressbarColor(id,"#Fe6464");
  }else if(percent<=40){
  this.setProgressbarColor(id,"#Fe7c7c");
  }else if(percent<=50){
  this.setProgressbarColor(id,"#Fe9b9b");
  }else if(percent<=60){
  this.setProgressbarColor(id,"#7ee5b6");
  }else if(percent<=70){
  this.setProgressbarColor(id,"#69c299");
  }else if(percent<=80){
  this.setProgressbarColor(id,"#539c7a");
  }else if(percent<=90){
  this.setProgressbarColor(id,"#427b5e");
  }else{
  this.setProgressbarColor(id,"#386d53");
  }
     
}
    ngDoCheck() {
    var changes = this.differ.diff(this.obj);
    if(!this.finalized && !this.sent){
    if (changes) {

      let state: number = 0;
      let c1: number = 0;
      let c11: number = 0;
      let c12: number = 0;
      let c9: number = 0;
      let c2: number = 0;
      let c3: number = 0;
      let c31: number = 0;
      let district: number = 0;
      let block: number = 0;
      let c5: number = 0;
      let c43: number = 0;
      let c51: number = 0;
      let c6: number = 0;
      let c7: number = 1; //pre fill, not editable
      let c8: number = 0;

      switch (this.selectedSectorNumber) {
        //C sector
        //  sectorOrSubsectorNumber

        case 1:

          let total: number = 13;
          let total_block: number = 12;
          let des_others: number = 0;
          let sup_post_others: number = 0;
          let facility_type_others: number = 0;

          if (this.obj.state != null) {
            state = 1;
          } else {
            state = 0;
          }

          if (this.obj.c1 != null) {
             if (this.obj.c1.length > 0) {
              c1 = 1;
            } else {
              c1 = 0;
            }
          }else {
            c1 = 0;
          }


          if (this.obj.c11 != null) {
            c11 = 1;
            if (this.obj.c11 != MessageProvider.TYPE_DETAIL_IDS.DESIGNATION_OF_SUPERVISOR_OTHERS) {
              des_others = 0;
            } else {
              des_others = 1;
              if (this.obj.c12 != null) {
                c12 = 1;
              } else {
                c12 = 0;
              }
            }
          } else {
            c11 = 0;
          }

          if (this.obj.c9 != null) {
            if (this.obj.c9.length > 0) {
              c9 = 1;
            } else {
              c9 = 0;
            }
          }else {
            c9 = 0;
          }


          if (this.obj.c2 != null) {
            c2 = 1;
          } else {
            c2 = 0;
          }

          if (this.obj.c3 != null) {
            c3 = 1;
            if (this.obj.c3 != MessageProvider.TYPE_DETAIL_IDS.LEVEL_SUPERVISOR_POSTED_AT_OTHERS) {
              sup_post_others = 0;
            } else {
              sup_post_others = 1;
              if (this.obj.c31 != null) {
                c31 = 1;
              } else {
                c31 = 0;
              }
            }
          } else {
            c3 = 0;
          }

          if (this.obj.district != null) {
            district = 1;
          } else {
            district = 0;
          }

          if (this.obj.block != null) {
            block = 1;
          } else {
            block = 0;
          }


          if (this.obj.c5 != null) {
            c5 = 1;
          } else {
            c5 = 0;
          }

          if (this.obj.c43 != null) {
            c43 = 1;
            if (this.obj.c43 != MessageProvider.TYPE_DETAIL_IDS.FACILITY_TYPE_OTHRES) {
              facility_type_others = 0;
            } else {
              facility_type_others = 1;
              if (this.obj.c51 != null) {
                c51 = 1;
              } else {
                c51 = 0;
              }
            }
          } else {
            c43 = 0;
          }


          if (this.obj.c6 != null) {
            c6 = 1;
          } else {
            c6 = 0;
          }

          if (this.obj.c8 != null) {
            if (this.obj.c8.length > 0) {
              c8 = 1;
            } else {
              c8 = 0;
            }
          }else {
            c8 = 0;
          }

          let filledUp = state + c1 + c11 + c12 + c9 + c2 + c3 + c31 + district + block + c5 + c43 + c51 + c6 + c7 + c8;
          total = total + des_others + sup_post_others + facility_type_others;
          if(this.obj.c43==17){
            this.progressBarObj.loadProgress =  Math.round(((filledUp / total_block) * 100));
          } else {
            this.progressBarObj.loadProgress =  Math.round(((filledUp / total) * 100));
          }
         // Math.round(((filledUp / total) * 100));
          
          this.setPercentCSS('c_id',this.progressBarObj.loadProgress);   
          break;     
        case 2:

          let d1: number = 0;
          let d2: number = 0;
          let d3: number = 0;
          let d41: number = 0;
          let d42: number = 0;
          let d43: number = 0;
          let d51: number = 0;
          let d52: number = 0;
          let d53: number = 0;
          let d54: number = 0;
          let d56: number = 0;
          let d57: number = 0;
          let d61: number = 0;
          let d62: number = 0;
          let d71: number = 0;
          let d72: number = 0;
          let d73: number = 0;
          let d74: number = 0;
          let d8: number = 0;
          let d91: number = 0;
          let d92: number = 0;
          let d93: number = 0;
          let d101: number = 0;
          let d102: number = 0;
          let d103: number = 0;
          let d104: number = 0;
          let d11: number = 0;
          let d121: number = 0;
          let d122: number = 0;
          let d131: number = 0;
          let d132: number = 0;
          let d133: number = 0;
          let d134: number = 0;
          let d135: number = 0;
          let d136: number = 0;
          let d137: number = 0;
          let d138: number = 0;
          let d141: number = 0;
          let d142: number = 0;
          let d143: number = 0;
          let d144: number = 0;
          let d145: number = 0;
          let d146: number = 0;
          let d151: number = 0;
          let d152: number = 0;
          let d153: number = 0;
          let d161: number = 0;
          let d162: number = 0;
          let d171: number = 0;
          let d172: number = 0;
          let d_total: number = 37;
          let d_total_L2: number = 45;
          let d_total_L3: number = 50;

          if (this.obj.d1 != null) {
            if (this.obj.d1.length > 0) {
              d1 = 1;
            } else {
              d1 = 0;
            }

          } else {
            d1 = 0;
          }
          if (this.obj.d2 != null) {
            if (this.obj.d2.length > 0) {
              d2 = 1;
            } else {
              d2 = 0;
            }

          } else {
            d2 = 0;
          }
          if (this.obj.d3 != null) {
            if (this.obj.d3.length > 0) {
              d3 = 1;
            } else {
              d3 = 0;
            }

          } else {
            d3 = 0;
          }
          if (this.obj.d41 != null) {
            if (this.obj.d41.length > 0) {
              d41 = 1;
            } else {
              d41 = 0;
            }

          } else {
            d41 = 0;
          }
          if (this.obj.d42 != null) {
            if (this.obj.d42.length) {
              d42 = 1;
            } else {
              d42 = 0;
            }

          } else {
            d42 = 0;
          }
          if (this.obj.d43 != null) {
            if (this.obj.d43.length > 0) {
              d43 = 1;
            } else {
              d43 = 0;
            }

          } else {
            d43 = 0;
          }
          if (this.obj.d51 != null) {
            if (this.obj.d51.length > 0) {
              d51 = 1;
            } else {
              d51 = 0;
            }

          } else {
            d51 = 0;
          }
          if (this.obj.d52 != null) {
            if (this.obj.d52.length > 0) {
              d52 = 1;
            } else {
              d52 = 0;
            }

          } else {
            d52 = 0;
          }
          if (this.obj.d53 != null) {

            if (this.obj.d53.length > 0) {
              d53 = 1;
            } else {
              d53 = 0;
            }
          } else {
            d53 = 0;
          }
          if (this.obj.d54 != null) {

            if (this.obj.d54.length > 0) {
              d54 = 1;
            } else {
              d54 = 0;
            }
          } else {
            d54 = 0;
          }
          if (this.obj.d56 != null) {
            if (this.obj.d56.length > 0) {
              d56 = 1;
            } else {
              d56 = 0;
            }

          } else {
            d56 = 0;
          }
          if (this.obj.d57 != null) {
            if (this.obj.d57.length > 0) {
              d57 = 1;
            } else {
              d57 = 0;
            }

          } else {
            d57 = 0;
          }
          if (this.obj.d61 != null) {
            if (this.obj.d61.length > 0) {
              d61 = 1;
            } else {
              d61 = 0;
            }

          } else {
            d61 = 0;
          }
          if (this.obj.d62 != null) {
            if (this.obj.d62.length > 0) {
              d62 = 1;
            } else {
              d62 = 0;
            }

          } else {
            d62 = 0;
          }

          if (this.obj.d71 != null) {
            if (this.obj.d71.length > 0) {
              d71 = 1;
            } else {
              d71 = 0;
            }

          } else {
            d71 = 0;
          }
          if (this.obj.d72 != null) {
            if (this.obj.d72.length > 0) {
              d72 = 1;
            } else {
              d72 = 0;
            }

          } else {
            d72 = 0;
          }
          if (this.obj.d73 != null) {
            if (this.obj.d73.length > 0) {
              d73 = 1;
            } else {
              d73 = 0;
            }

          } else {
            d73 = 0;
          }
          if (this.obj.d74 != null) {
            if (this.obj.d74.length > 0) {
              d74 = 1;
            } else {
              d74 = 0;
            }

          } else {
            d74 = 0;
          }
          if (this.obj.d8 != null) {
            if (this.obj.d8.length > 0) {
              d8 = 1;
            } else {
              d8 = 0;
            }

          } else {
            d8 = 0;
          }
          if (this.obj.d91 != null) {
            if (this.obj.d91.length > 0) {
              d91 = 1;
            } else {
              d91 = 0;
            }

          } else {
            d91 = 0;
          }
          if (this.obj.d92 != null) {
            if (this.obj.d92.length > 0) {
              d92 = 1;
            } else {
              d92 = 0;
            }

          } else {
            d92 = 0;
          }
          if (this.obj.d93 != null) {

            if (this.obj.d93.length > 0) {
              d93 = 1;
            } else {
              d93 = 0;
            }
          } else {
            d93 = 0;
          }
          if (this.obj.d101 != null) {

            if (this.obj.d101.length > 0) {
              d101 = 1;
            } else {
              d101 = 0;
            }


          } else {
            d101 = 0;
          }
          if (this.obj.d102 != null) {
            if (this.obj.d102.length > 0) {
              d102 = 1;
            } else {
              d102 = 0;
            }

          } else {
            d102 = 0;
          }
          if (this.obj.d103 != null) {
            if (this.obj.d103.length > 0) {
              d103 = 1;
            } else {
              d103 = 0;
            }

          } else {
            d103 = 0;
          }
          if (this.obj.d104 != null) {

            if (this.obj.d104.length > 0) {
              d104 = 1;
            } else {
              d104 = 0;
            }
          } else {
            d104 = 0;
          }
          if (this.obj.d11 != null) {

            if (this.obj.d11.length > 0) {
              d11 = 1;
            } else {
              d11 = 0;
            }
          } else {
            d11 = 0;
          }
          if (this.obj.d121 != null) {
            if (this.obj.d121.length > 0) {
              d121 = 1;
            } else {
              d121 = 0;
            }

          } else {
            d121 = 0;
          }
          if (this.obj.d122 != null) {
            if (this.obj.d122.length > 0) {
              d122 = 1;
            } else {
              d122 = 0;
            }

          } else {
            d122 = 0;
          }
          if (this.obj.d131 != null) {
            if (this.obj.d131.length > 0) {
              d131 = 1;
            } else {
              d131 = 0;
            }

          } else {
            d131 = 0;
          }
          if (this.obj.d132 != null) {
            if (this.obj.d132.length > 0) {
              d132 = 1;
            } else {
              d132 = 0;
            }

          } else {
            d132 = 0;
          }
          if (this.obj.d133 != null) {
            if (this.obj.d133.length > 0) {
              d133 = 1;
            } else {
              d133 = 0;
            }

          } else {
            d133 = 0;
          }
          if (this.obj.d134 != null) {
            if (this.obj.d134.length > 0) {
              d134 = 1;
            } else {
              d134 = 0;
            }

          } else {
            d134 = 0;
          }
          if (this.obj.d135 != null) {

            if (this.obj.d135.length > 0) {
              d135 = 1;
            } else {
              d135 = 0;
            }
          } else {
            d135 = 0;
          }
          if (this.obj.d136 != null) {

            if (this.obj.d136.length > 0) {
              d136 = 1;
            } else {
              d136 = 0;
            }
          } else {
            d136 = 0;
          }
          if (this.obj.d137 != null) {

            if (this.obj.d137.length > 0) {
              d137 = 1;
            } else {
              d137 = 0;
            }
          } else {
            d137 = 0;
          }
          if (this.obj.d138 != null) {

            if (this.obj.d138.length > 0) {
              d138 = 1;
            } else {
              d138 = 0;
            }
          } else {
            d138 = 0;
          }
          if (this.obj.d141 != null) {
            if (this.obj.d141.length > 0) {
              d141 = 1;
            } else {
              d141 = 0;
            }

          } else {
            d141 = 0;
          }
          if (this.obj.d142 != null) {

            if (this.obj.d142.length > 0) {
              d142 = 1;
            } else {
              d142 = 0;
            }
          } else {
            d142 = 0;
          }
          if (this.obj.d143 != null) {

            if (this.obj.d143.length > 0) {
              d143 = 1;
            } else {
              d143 = 0;
            }
          } else {
            d143 = 0;
          }
          if (this.obj.d144 != null) {

            if (this.obj.d144.length > 0) {
              d144 = 1;
            } else {
              d144 = 0;
            }
          } else {
            d144 = 0;
          }
          if (this.obj.d145 != null) {

            if (this.obj.d145.length > 0) {
              d145 = 1;
            } else {
              d145 = 0;
            }
          } else {
            d145 = 0;
          }
          if (this.obj.d145 != null) {
            if (this.obj.d145.length > 0) {
              d145 = 1;
            } else {
              d145 = 0;
            }

          } else {
            d145 = 0;
          }
          if (this.obj.d146 != null) {
            if (this.obj.d146.length > 0) {
              d146 = 1;
            } else {
              d146 = 0;
            }

          } else {
            d146 = 0;
          }
          if (this.obj.d151 != null) {
            if (this.obj.d151.length > 0) {
              d151 = 1;
            } else {
              d151 = 0;
            }

          } else {
            d151 = 0;
          }
          if (this.obj.d152 != null) {
            if (this.obj.d152.length > 0) {
              d152 = 1;
            } else {
              d152 = 0;
            }

          } else {
            d152 = 0;
          }
          if (this.obj.d153 != null) {

            if (this.obj.d153.length > 0) {
              d153 = 1;
            } else {
              d153 = 0;
            }
          } else {
            d153 = 0;
          }
          if (this.obj.d161 != null) {

            if (this.obj.d161.length > 0) {
              d161 = 1;
            } else {
              d161 = 0;
            }
          } else {
            d161 = 0;
          }
          if (this.obj.d162 != null) {
            if (this.obj.d162.length > 0) {
              d162 = 1;
            } else {
              d162 = 0;
            }

          } else {
            d162 = 0;
          }
          if (this.obj.d171 != null) {
            if (this.obj.d171.length > 0) {
              d171 = 1;
            } else {
              d171 = 0;
            }

          } else {
            d171 = 0;
          }
          if (this.obj.d172 != null) {
            if (this.obj.d172.length > 0) {
              d172 = 1;
            } else {
              d172 = 0;
            }

          } else {
            d172 = 0;
          }

          if(this.obj.c6=="31"){
            let d_filledUp = d1 + d2 + d3 + d41 + d42 + d51 + d52 + d53 + d54 + d56 + d57 + d61 + d62 + d71 + d72 + d73 + d74 + d8 + d91 + d92 + d101 + d102 + d103 + d11 + d131 + d132 + d133 + d134 + d135 + d136 + d137 + d138 + d141 + d142 + d143 + d144 + d145 + d146 + d151 + d152 + d153 + d161 + d162 + d171 + d172;
            this.progressBarObj.loadProgressD = Math.round(((d_filledUp / d_total_L2) * 100));
          }else if(this.obj.c6=="32" || this.obj.c6=="48"){
            let d_filledUp = d1 + d2 + d3 + d41 + d42 + d43 + d51 + d52 + d53 + d54 + d56 + d57 + d61 + d62 + d71 + d72 + d73 + d74 + d8 + d91 + d92 + d93 + d101 + d102 + d103 + d104 + d11 + d121 + d122 + d131 + d132 + d133 + d134 + d135 + d136 + d137 + d138 + d141 + d142 + d143 + d144 + d145 + d146 + d151 + d152 + d153 + d161 + d162 + d171 + d172;
            this.progressBarObj.loadProgressD = Math.round(((d_filledUp / d_total_L3) * 100));
          }else {
            let d_filledUp = d1 + d2 + d3 + d41 + d42 + d51 + d52 + d53 + d54 + d56 + d57 + d61 + d62 + d71 + d72 + d73 + d74 + d8 + d92 + d131 + d132 + d133 + d134 + d135 + d136 + d137 + d138 + d141 + d142 + d143 + d144 + d145 + d146 + d153 + d161 + d162 + d171 + d172;
            this.progressBarObj.loadProgressD = Math.round(((d_filledUp / d_total) * 100));
          }
           this.setPercentCSS('d_id',this.progressBarObj.loadProgressD);
           break;
        case 3:
          if (this.sectorOrSubsectorNumber === 31) {
            let e111: number = 0;
            let e112: number = 0;
            let e121: number = 0;
            let e122: number = 0;
            let e13: number = 0;
            let e14: number = 0;
            let e15: number = 0;
            let e16: number = 0;
            let e17: number = 0;
            let e_total: number = 9;
            let e_total_11_12: number = 7;

            if (this.obj.e111 != null) {
              e111 = 1;
            } else {
              e111 = 0;
            }
            if (this.obj.e112 != null) {
              e112 = 1;
            } else {
              e112 = 0;
            }
            if (this.obj.e121 != null) {
              e121 = 1;
            } else {
              e121 = 0;
            }
            if (this.obj.e122 != null) {
              e122 = 1;
            } else {
              e122 = 0;
            }
            if (this.obj.e13 != null) {
              e13 = 1;
            } else {
              e13 = 0;
            }
            if (this.obj.e14 != null) {
              e14 = 1;
            } else {
              e14 = 0;
            }
            if (this.obj.e15 != null) {
              e15 = 1;
            } else {
              e15 = 0;
            }
            if (this.obj.e16 != null) {
              e16 = 1;
            } else {
              e16 = 0;
            }
            if (this.obj.e17 != null) {
              e17 = 1;
            } else {
              e17 = 0;
            }
            let e_filledUp = e111 + e112 + e121 + e122 + e13 + e14 + e15 + e16 + e17;
            if( this.obj.c43==11 || this.obj.c43==12){
              this.progressBarObj.loadProgressE = Math.round(((e_filledUp / e_total_11_12) * 100));
            } else {
              this.progressBarObj.loadProgressE = Math.round(((e_filledUp / e_total) * 100));
            }
             this.setPercentCSS('e1_id',this.progressBarObj.loadProgressE);
        
            
          } else if (this.sectorOrSubsectorNumber === 32) {
            let e21: number = 0;
            let e22: number = 0;
            let e23: number = 0;
            let e24: number = 0;
            let e25: number = 0;
            let e26: number = 0;
            let e27: number = 0;
            let e28: number = 0;
            let e29: number = 0;
            let e210: number = 0;
            let e211: number = 0;
            let e212: number = 0;
            let e213: number = 0;
            let e214: number = 0;
            let e215: number = 0;
            let e216: number = 0;
            let e217: number = 0;
            let e218: number = 0;
            let e219: number = 0;
            let e220: number = 0;
            let e221: number = 0;
            let e222: number = 0;
            let e223: number = 0;
            let e224: number = 0;
            let e225: number = 0;
            let e226: number = 0;
            let e227: number = 0;
            let e228: number = 0;
            let e229: number = 0;
            let e230: number = 0;
            let e231: number = 0;
            let e232: number = 0;
            let e233: number = 0;
            let e234: number = 0;
            let e235: number = 0;
            let e236: number = 0;
            let e_total_met: number = 35;
            let e_total_met_11_12: number = 24;
            let e_total_met_11_16: number = 31;
            let e_total_met_other: number = 36;
            let e_total_met_11_12_other: number = 25;
            let e_total_met_11_16_other: number = 32;
            
            if (this.obj.e21 != null) {
              this.e2Score=((this.obj.c43==11 && this.obj.e21==26)?MessageProvider.FCILITY_SCORE.e_MHDS_score_SC_other:(this.obj.c43==11 && this.obj.e21!=26)?MessageProvider.FCILITY_SCORE.e_MHDS_score_SC:
                (this.obj.c43==12 && this.obj.e21==26)?MessageProvider.FCILITY_SCORE.e_MHDS_score_Non24x7PHC_other:(this.obj.c43==12 && this.obj.e21!=26)?MessageProvider.FCILITY_SCORE.e_MHDS_score_Non24x7PHC:
                (this.obj.c43==13 && this.obj.e21==26)?MessageProvider.FCILITY_SCORE.e_MHDS_score_S24X7PHC_other:(this.obj.c43==13 && this.obj.e21!=26)?MessageProvider.FCILITY_SCORE.e_MHDS_score_S24X7PHC:
                (this.obj.c43==14 && this.obj.e21==26)?MessageProvider.FCILITY_SCORE.e_MHDS_score_NONFRUCHC_other:(this.obj.c43==14 && this.obj.e21!=26)?MessageProvider.FCILITY_SCORE.e_MHDS_score_NONFRUCHC:
                (this.obj.c43==15 && this.obj.e21==26)?MessageProvider.FCILITY_SCORE.e_MHDS_score_FRUCHC_other:(this.obj.c43==15 && this.obj.e21!=26)?MessageProvider.FCILITY_SCORE.e_MHDS_score_FRUCHC:
                (this.obj.c43==16 && this.obj.e21==26)?MessageProvider.FCILITY_SCORE.e_MHDS_score_SDH_other:(this.obj.c43==16 && this.obj.e21!=26)?MessageProvider.FCILITY_SCORE.e_MHDS_score_SDH:
                this.obj.e21==26?MessageProvider.FCILITY_SCORE.e_MHDS_score_Other_other:MessageProvider.FCILITY_SCORE.e_MHDS_score_Other)
              e21 = 1;
            } else {
              e21 = 0;
            }
            if (this.obj.e22 != null) {
              e22 = 1;
            } else {
              e22 = 0;
            }
            if (this.obj.e23 != null) {
              e23 = 1;
            } else {
              e23 = 0;
            }
            if (this.obj.e24 != null) {
              e24 = 1;
            } else {
              e24 = 0;
            }
            if (this.obj.e25 != null) {
              e25 = 1;
            } else {
              e25 = 0;
            }
            if (this.obj.e26 != null) {
              e26 = 1;
            } else {
              e26 = 0;
            }
            if (this.obj.e27 != null) {
              e27 = 1;
            } else {
              e27 = 0;
            }
            if (this.obj.e28 != null) {
              e28 = 1;
            } else {
              e28 = 0;
            }
            if (this.obj.e29 != null) {
              e29 = 1;
            } else {
              e29 = 0;
            }
            if (this.obj.e210 != null) {
              e210 = 1;
            } else {
              e210 = 0;
            }
            if (this.obj.e211 != null) {
              e211 = 1;
            } else {
              e211 = 0;
            }
            if (this.obj.e212 != null) {
              e212 = 1;
            } else {
              e212 = 0;
            }
            if (this.obj.e213 != null) {
              e213 = 1;
            } else {
              e213 = 0;
            }
            if (this.obj.e214 != null) {
              e214 = 1;
            } else {
              e214 = 0;
            }
            if (this.obj.e215 != null) {
              e215 = 1;
            } else {
              e215 = 0;
            }
            if (this.obj.e216 != null) {
              e216 = 1;
            } else {
              e216 = 0;
            }
            if (this.obj.e217 != null) {
              e217 = 1;
            } else {
              e217 = 0;
            }
            if (this.obj.e218 != null) {
              e218 = 1;
            } else {
              e218 = 0;
            }
            if (this.obj.e219 != null) {
              e219 = 1;
            } else {
              e219 = 0;
            }
            if (this.obj.e220 != null) {
              e220 = 1;
            } else {
              e220 = 0;
            }
            if (this.obj.e221 != null) {
              e221 = 1;
            } else {
              e221 = 0;
            }
            if (this.obj.e222 != null) {
              e222 = 1;
            } else {
              e222 = 0;
            }
            if (this.obj.e223 != null) {
              e223 = 1;
            } else {
              e223 = 0;
            }
            if (this.obj.e224 != null) {
              e224 = 1;
            } else {
              e224 = 0;
            }

            if (this.obj.e225 != null) {
              e225 = 1;
            } else {
              e225 = 0;
            }
            if (this.obj.e226 != null) {
              e226 = 1;
            } else {
              e226 = 0;
            }
            if (this.obj.e227 != null) {
              e227 = 1;
            } else {
              e227 = 0;
            }
            if (this.obj.e228 != null) {
              e228 = 1;
            } else {
              e228 = 0;
            }
            if (this.obj.e229 != null) {
              e229 = 1;
            } else {
              e229 = 0;
            }
            if (this.obj.e230 != null) {
              e230 = 1;
            } else {
              e230 = 0;
            }
            if (this.obj.e231 != null) {
              e231 = 1;
            } else {
              e231 = 0;
            }
            if (this.obj.e232 != null) {
              e232 = 1;
            } else {
              e232 = 0;
            }
            if (this.obj.e233 != null) {
              e233 = 1;
            } else {
              e233 = 0;
            }
            if (this.obj.e234 != null) {
              e234 = 1;
            } else {
              e234 = 0;
            }
            if (this.obj.e235 != null) {
              e235 = 1;
            } else {
              e235 = 0;
            }
            if (this.obj.e236 != null) {
              e236 = 1;
            } else {
              e236 = 0;
            }

            if(this.obj.e21==26 && (this.obj.c43==11 || this.obj.c43==12)){
              let e_met_filledUp = e21 + e22 + e23 + e24 + e25 + e26 + e27 + e28 + e29 + e210 + e211 + e212 + e213 + e214 + e215 + e216 + e217 + e218 + e219 + e220 + e221 + e222 + e223 + e224 + e225 + e226 + e227 + e228 + e229 + e230 + e231 + e232 + e233 + e234 + e235 + e236;
              this.progressBarObj.loadProgressE_meternal = Math.round(((e_met_filledUp / e_total_met_11_12_other) * 100));
            }else if(this.obj.e21!=26 && (this.obj.c43==11 || this.obj.c43==12)){
              let e_met_filledUp = e21 + e23 + e24 + e25 + e26 + e27 + e28 + e29 + e210 + e211 + e212 + e213 + e214 + e215 + e216 + e217 + e218 + e219 + e220 + e221 + e222 + e223 + e224 + e225 + e226 + e227 + e228 + e229 + e230 + e231 + e232 + e233 + e234 + e235 + e236;
              this.progressBarObj.loadProgressE_meternal = Math.round(((e_met_filledUp / e_total_met_11_12) * 100));
            }else if(this.obj.e21==26 && (this.obj.c43==13 || this.obj.c43==14 || this.obj.c43==15 || this.obj.c43==16)){
              let e_met_filledUp = e21 + e22 + e23 + e24 + e25 + e26 + e27 + e28 + e29 + e210 + e211 + e212 + e213 + e214 + e215 + e216 + e217 + e218 + e219 + e220 + e221 + e222 + e223 + e224 + e225 + e226 + e227 + e228 + e229 + e230 + e231 + e232 + e233 + e234 + e235 + e236;
              this.progressBarObj.loadProgressE_meternal = Math.round(((e_met_filledUp / e_total_met_11_16_other) * 100));
            }else if(this.obj.e21!=26 && (this.obj.c43==13 || this.obj.c43==14 || this.obj.c43==15 || this.obj.c43==16)){
              let e_met_filledUp = e21 + e23 + e24 + e25 + e26 + e27 + e28 + e29 + e210 + e211 + e212 + e213 + e214 + e215 + e216 + e217 + e218 + e219 + e220 + e221 + e222 + e223 + e224 + e225 + e226 + e227 + e228 + e229 + e230 + e231 + e232 + e233 + e234 + e235 + e236;
              this.progressBarObj.loadProgressE_meternal = Math.round(((e_met_filledUp / e_total_met_11_16) * 100));
            } else if(this.obj.e21==26){
              let e_met_filledUp = e21 + e22 + e23 + e24 + e25 + e26 + e27 + e28 + e29 + e210 + e211 + e212 + e213 + e214 + e215 + e216 + e217 + e218 + e219 + e220 + e221 + e222 + e223 + e224 + e225 + e226 + e227 + e228 + e229 + e230 + e231 + e232 + e233 + e234 + e235 + e236;
              this.progressBarObj.loadProgressE_meternal = Math.round(((e_met_filledUp / e_total_met_other) * 100));
            } else {
              let e_met_filledUp = e21 + e23 + e24 + e25 + e26 + e27 + e28 + e29 + e210 + e211 + e212 + e213 + e214 + e215 + e216 + e217 + e218 + e219 + e220 + e221 + e222 + e223 + e224 + e225 + e226 + e227 + e228 + e229 + e230 + e231 + e232 + e233 + e234 + e235 + e236;
              this.progressBarObj.loadProgressE_meternal = Math.round(((e_met_filledUp / e_total_met) * 100));
            }
             this.setPercentCSS('e2_id',this.progressBarObj.loadProgressE_meternal);
         
          }else if (this.sectorOrSubsectorNumber === 33) {
            let e31: number = 0;
            let e32: number = 0;
            let e33: number = 0;
            let e341: number = 0;
            let e342: number = 0;
            let e351: number = 0;
            let e352: number = 0;
            let e36: number = 0;
            let e37: number = 0;
            let e38: number = 0;
            let e39: number = 0;
            let e310: number = 0;
            let e311: number = 0;
            let e312: number = 0;
            let e313: number = 0;
            let e_newborn_total = 15;
            let e_newborn_total_11_12 = 14;

            if (this.obj.e31 != null) {
              e31 = 1;
            } else {
              e31 = 0;
            }
            if (this.obj.e32 != null) {
              e32 = 1;
            } else {
              e32 = 0;
            }
            if (this.obj.e33 != null) {
              e33 = 1;
            } else {
              e33 = 0;
            }
            if (this.obj.e341 != null) {
              e341 = 1;
            } else {
              e341 = 0;
            }
            if (this.obj.e342 != null) {
              e342 = 1;
            } else {
              e342 = 0;
            }
            if (this.obj.e351 != null) {
              e351 = 1;
            } else {
              e351 = 0;
            }
            if (this.obj.e352 != null) {
              e352 = 1;
            } else {
              e352 = 0;
            }
            if (this.obj.e36 != null) {
              e36 = 1;
            } else {
              e36 = 0;
            }

            if (this.obj.e37 != null) {
              e37 = 1;
            } else {
              e37 = 0;
            }
            if (this.obj.e38 != null) {
              e38 = 1;
            } else {
              e38 = 0;
            }
            if (this.obj.e39 != null) {
              e39 = 1;
            } else {
              e39 = 0;
            }
            if (this.obj.e310 != null) {
              e310 = 1;
            } else {
              e310 = 0;
            }
            if (this.obj.e311 != null) {
              e311 = 1;
            } else {
              e311 = 0;
            }
            if (this.obj.e312 != null) {
              e312 = 1;
            } else {
              e312 = 0;
            }
             if (this.obj.e313 != null) {
              e313 = 1;
            } else {
              e313 = 0;
            }
            let e_newborn_filledUp = e31 + e32 + e33 + e341 + e342 + e351 + e352 + e36 + e37 + e38 + e39 + e310 + e311 + e312  + e313;
            if(this.obj.c43==11 || this.obj.c43==12){
              this.progressBarObj.loadProgressE_newborn = Math.round(((e_newborn_filledUp / e_newborn_total_11_12) * 100));
            }else{
              this.progressBarObj.loadProgressE_newborn = Math.round(((e_newborn_filledUp / e_newborn_total) * 100));
            }
              this.setPercentCSS('e3_id',this.progressBarObj.loadProgressE_newborn);
         
          }else if (this.sectorOrSubsectorNumber === 34) {
             let e41: number = 0;
            let e42: number = 0;
            let e43: number = 0;
            let e44: number = 0;
            let e45: number = 0;
            let e46: number = 0;
            let e47: number = 0;
             let e_childhealth_total = 7;
           if (this.obj.e41 != null) {
              e41 = 1;
            } else {
              e41 = 0;
            }
             if (this.obj.e42 != null) {
              e42 = 1;
            } else {
              e42 = 0;
            }
            if (this.obj.e43 != null) {
              e43 = 1;
            } else {
              e43 = 0;
            }
            if (this.obj.e44 != null) {
              e44 = 1;
            } else {
              e44 = 0;
            }
             if (this.obj.e45 != null) {
              e45 = 1;
            } else {
              e45 = 0;
            }
              if (this.obj.e46 != null) {
              e46 = 1;
            } else {
              e46 = 0;
            }
             if (this.obj.e47 != null) {
              e47 = 1;
            } else {
              e47 = 0;
            }
            let e_child_filledUp = e41 + e42 + e43 + e44 + e45 + e46 + e47;
            
          this.progressBarObj.loadProgressE_childhealth =Math.round(( (e_child_filledUp / e_childhealth_total) * 100)); 
          this.setPercentCSS('e4_id',this.progressBarObj.loadProgressE_childhealth);
         
          }else if (this.sectorOrSubsectorNumber === 35) {
              let e51: number = 0;
            let e52: number = 0;
            let e53: number = 0;
            let e54: number = 0;
            let e55: number = 0;
            let e56: number = 0;
            let e57: number = 0;
            let e58: number = 0;
            let e59: number = 0;
            let e510: number = 0;
            let e511: number = 0; 
            let e512: number = 0;
            let e513: number = 0;
            let e_vaccine_total  = 13;
              if (this.obj.e51 != null) {
              e51 = 1;
            } else {
              e51 = 0;
            }
            if (this.obj.e52 != null) {
              e52 = 1;
            } else {
              e52 = 0;
            }
            if (this.obj.e53 != null) {
              e53 = 1;
            } else {
              e53 = 0;
            }
             if (this.obj.e54 != null) {
              e54 = 1;
            } else {
              e54 = 0;
            }
              if (this.obj.e55 != null) {
              e55 = 1;
            } else {
              e55 = 0;
            }
               if (this.obj.e56 != null) {
              e56 = 1;
            } else {
              e56 = 0;
            }
             if (this.obj.e57 != null) {
              e57 = 1;
            } else {
              e57 = 0;
            }
             if (this.obj.e58 != null) {
              e58 = 1;
            } else {
              e58 = 0;
            }
             if (this.obj.e59 != null) {
              e59 = 1;
            } else {
              e59 = 0;
            }
             if (this.obj.e510 != null) {
              e510 = 1;
            } else {
              e510 = 0;
            }
             if (this.obj.e511 != null) {
              e511 = 1;
            } else {
              e511 = 0;
            }
            if (this.obj.e512 != null) {
              e512 = 1;
            } else {
              e512 = 0;
            }
            if (this.obj.e513 != null) {
              e513 = 1;
            } else {
              e513 = 0;
            }
            let e_vaccine_filledUp = e51 + e52 + e53 + e54 + e55 + e56 + e57+e58+e59+e510+e511+e512+e513;
 
            this.progressBarObj.loadProgressE_vaccine = Math.round(( (e_vaccine_filledUp / e_vaccine_total) * 100));
            this.setPercentCSS('e5_id',this.progressBarObj.loadProgressE_vaccine);         

          }else if (this.sectorOrSubsectorNumber === 36) {
            let e61: number = 0;
            let e62: number = 0;
            let e63: number = 0;
            let e64: number = 0;
            let e65: number = 0;
            let e66: number = 0;
            let e67: number = 0;
            let e_ant_total  = 7;
            if (this.obj.e61 != null) {
              e61 = 1;
            } else {
              e61 = 0;
            }
            if (this.obj.e62 != null) {
              e62 = 1;
            } else {
              e62 = 0;
            }
            if (this.obj.e63 != null) {
              e63 = 1;
            } else {
              e63 = 0;
            }
            if (this.obj.e64 != null) {
              e64 = 1;
            } else {
              e64 = 0;
            }
            if (this.obj.e65 != null) {
              e65 = 1;
            } else {
              e65 = 0;
            }
            if (this.obj.e66 != null) {
              e66 = 1;
            } else {
              e66 = 0;
            }
            if (this.obj.e67 != null) {
              e67 = 1;
            } else {
              e67 = 0;
            }
            let e_ant_filledUp = e61 + e62 + e63 + e64 + e65 + e66 + e67; 
            this.progressBarObj.loadProgressE_antibiotics = Math.round((   (e_ant_filledUp / e_ant_total) * 100));
            this.setPercentCSS('e6_id',this.progressBarObj.loadProgressE_antibiotics);       
          }else if (this.sectorOrSubsectorNumber === 37) {
            let e71: number = 0;
            let e72: number = 0;
            let e73: number = 0;
            let e74: number = 0;
            let e75: number = 0;
            let e76: number = 0;
            let e77: number = 0;
            let e_infra_total  = 7;
            let e_infra_total_11_12  = 4;
            let e_infra_total_13_14  = 5;
            let e_infra_total_15_16  = 6;
             if (this.obj.e71 != null) {
              e71 = 1;
            } else {
              e71 = 0;
            }
             if (this.obj.e72 != null) {
              e72 = 1;
            } else {
              e72 = 0;
            }
             if (this.obj.e73 != null) {
              e73 = 1;
            } else {
              e73 = 0;
            }
            if (this.obj.e74 != null) {
              e74 = 1;
            } else {
              e74 = 0;
            }
            if (this.obj.e75 != null) {
              e75 = 1;
            } else {
              e75 = 0;
            }
             if (this.obj.e76 != null) {
              e76 = 1;
            } else {
              e76 = 0;
            }
            if (this.obj.e77 != null) {
              e77 = 1;
            } else {
              e77 = 0;
            }

            let e_infra_filledUp = e71 + e72 + e73 + e74 + e75 + e76 + e77; 
            if(this.obj.c43==11 || this.obj.c43==12){
              this.progressBarObj.loadProgressE_infra =Math.round(((e_infra_filledUp / e_infra_total_11_12) * 100));
            }else if(this.obj.c43==13 || this.obj.c43==14){
              this.progressBarObj.loadProgressE_infra =Math.round(((e_infra_filledUp / e_infra_total_13_14) * 100));
            }else if(this.obj.c43==15 || this.obj.c43==16){
              this.progressBarObj.loadProgressE_infra =Math.round(((e_infra_filledUp / e_infra_total_15_16) * 100));
            }else {
              this.progressBarObj.loadProgressE_infra =Math.round(((e_infra_filledUp / e_infra_total) * 100));
            }
           this.setPercentCSS('e7_id',this.progressBarObj.loadProgressE_infra);        
          }else if (this.sectorOrSubsectorNumber === 38) {
             let e81: number = 0;
            let e82: number = 0;
            let e83: number = 0;
            let e84: number = 0;
            let e85: number = 0;
            let e86: number = 0;
            let e87: number = 0;
            let e88: number = 0;
            let e_infection_total  = 8;
            if (this.obj.e81 != null) {
              e81 = 1;
            } else {
              e81 = 0;
            }
             if (this.obj.e82 != null) {
              e82 = 1;
            } else {
              e82 = 0;
            }
             
             if (this.obj.e83 != null) {
              e83 = 1;
            } else {
              e83 = 0;
            }
             if (this.obj.e84 != null) {
              e84 = 1;
            } else {
              e84 = 0;
            }
             if (this.obj.e85 != null) {
              e85 = 1;
            } else {
              e85 = 0;
            }
             if (this.obj.e86 != null) {
              e86 = 1;
            } else {
              e86 = 0;
            }
            if (this.obj.e87 != null) {
              e87 = 1;
            } else {
              e87 = 0;
            }
            if (this.obj.e88 != null) {
              e88 = 1;
            } else {
              e88 = 0;
            }
            let e_inf_filledUp = e81 + e82 + e83 + e84+e85+e86+e87+e88; 
            this.progressBarObj.loadProgressE_infection =Math.round(( (e_inf_filledUp / e_infection_total) * 100))
            this.setPercentCSS('e8_id',this.progressBarObj.loadProgressE_infection);
         
          }else if (this.sectorOrSubsectorNumber === 39) {
            let e91: number = 0;
            let e92: number = 0;
            let e93: number = 0;
            let e94: number = 0;
            let e_ad_total  = 4;
             if (this.obj.e91 != null) {
              e91 = 1;
            } else {
              e91 = 0;
            }
              if (this.obj.e92 != null) {
              e92 = 1;
            } else {
              e92 = 0;
            }
              if (this.obj.e93 != null) {
              e93 = 1;
            } else {
              e93 = 0;
            }
              if (this.obj.e94 != null) {
              e94 = 1;
            } else {
              e94 = 0;
            }
            let e_ad_filledUp = e91 + e92 + e93 + e94; 
            this.progressBarObj.loadProgressE_andolescent =Math.round((  (e_ad_filledUp / e_ad_total) * 100));
            this.setPercentCSS('e9_id',this.progressBarObj.loadProgressE_andolescent);
         
          }else if (this.sectorOrSubsectorNumber === 310) {
            let e101: number = 0;
            let e102: number = 0;
            let e103: number = 0;
            let e104: number = 0;
            let e105: number = 0;
            let e106: number = 0;
            let e107: number = 0;
            let e108: number = 0;
            let e109: number = 0;
            let e1010: number = 0;
            let e1011: number = 0;
            let e_other_total  = 11;
            let e_other_total_11_12  = 6;
            let e_other_total_13_16  = 10;
             if (this.obj.e101 != null) {
              e101 = 1;
            } else {
              e101 = 0;
            }
            if (this.obj.e102 != null) {
              e102 = 1;
            } else {
              e102 = 0;
            }
             if (this.obj.e103 != null) {
              e103 = 1;
            } else {
              e103 = 0;
            }
             if (this.obj.e104 != null) {
              e104 = 1;
            } else {
              e104 = 0;
            }
             if (this.obj.e105 != null) {
              e105 = 1;
            } else {
              e105 = 0;
            }
             if (this.obj.e106 != null) {
              e106 = 1;
            } else {
              e106 = 0;
            }
             if (this.obj.e107 != null) {
              e107 = 1;
            } else {
              e107 = 0;
            }
            if (this.obj.e108 != null) {
              e108 = 1;
            } else {
              e108 = 0;
            }
            if (this.obj.e109 != null) {
              e109 = 1;
            } else {
              e109 = 0;
            }
            if (this.obj.e1010 != null) {
              e1010 = 1;
            } else {
              e1010 = 0;
            }
            if (this.obj.e1011 != null) {
              e1011 = 1;
            } else {
              e1011 = 0;
            }

            let e_other_filledUp = e101 + e102 + e103 + e104 + e105 + e106 + e107 + e108 + e109 + e1010 + e1011;
            if(this.obj.c43==11 || this.obj.c43==12){
              this.progressBarObj.loadProgressE_other =Math.round(((e_other_filledUp / e_other_total_11_12) * 100)); 
            }else if(this.obj.c43==13 || this.obj.c43==14 || this.obj.c43==15 || this.obj.c43==16){
              this.progressBarObj.loadProgressE_other =Math.round(((e_other_filledUp / e_other_total_13_16) * 100)); 
            }else {
              this.progressBarObj.loadProgressE_other =Math.round(((e_other_filledUp / e_other_total) * 100)); 
            }
             this.setPercentCSS('e10_id',this.progressBarObj.loadProgressE_other);         
          }else if (this.sectorOrSubsectorNumber === 311) {
            let e11g1: number =0;
            let e1111: number =0;
            let  e1112: number =0;
            let e1113: number =0;
            let e1114:number =0;
            let e1115: number =0;
            let e11g2: number =0;
            let  e1121:number =0;
            let  e1122: number =0;
            let e1123: number =0;
            let e1124:number =0;
            let  e1125: number =0;
            let  e11g3: number =0;
            let e1131: number =0;
            let  e1132:number =0;
            let e1133: number =0;
            let e1134: number =0;
            let e1135: number =0;
            let e11g4: number =0;
            let e1141: number =0;
            let e1142: number =0;
            let e1143: number =0;
            let e1144: number =0;
            let e1145: number =0;
            let e_hr_total_11 = 6;
            let e_hr_total_12 = 18;
            if (this.obj.e11g1 != null) {
            if (this.obj.e11g1.length > 0) {
              e11g1 = 1;
            } else {
              e11g1 = 0;
            }

            } else {
            e11g1 = 0;
          }
           if (this.obj.e1111 != null) {
            if (this.obj.e1111.length > 0) {
              e1111 = 1;
            } else {
              e1111 = 0;
            }

            } else {
            e1111 = 0;
          }
          if (this.obj.e1112 != null) {
            if (this.obj.e1112.length > 0) {
              e1112 = 1;
            } else {
              e1112 = 0;
            }

            } else {
            e1112 = 0;
          }
          if (this.obj.e1113 != null) {
            if (this.obj.e1113.length > 0) {
              e1113 = 1;
            } else {
              e1113 = 0;
            }

            } else {
            e1113 = 0;
          }
          if (this.obj.e1114 != null) {
            if (this.obj.e1114.length > 0) {
              e1114 = 1;
            } else {
              e1114 = 0;
            }

            } else {
            e1114 = 0;
          }
          if (this.obj.e1115 != null) {
            if (this.obj.e1115.length > 0) {
              e1115 = 1;
            } else {
              e1115 = 0;
            }

            } else {
            e1115 = 0;
          }
          if (this.obj.e11g2 != null) {
            if (this.obj.e11g2.length > 0) {
              e11g2 = 1;
            } else {
              e11g2 = 0;
            }

            } else {
            e11g2 = 0;
          }
          if (this.obj.e1121 != null) {
            if (this.obj.e1121.length > 0) {
              e1121 = 1;
            } else {
              e1121 = 0;
            }

            } else {
            e1121 = 0;
          }
           if (this.obj.e1122 != null) {
            if (this.obj.e1122.length > 0) {
              e1122 = 1;
            } else {
              e1122 = 0;
            }

            } else {
            e1122 = 0;
          }
            if (this.obj.e1123 != null) {
            if (this.obj.e1123.length > 0) {
              e1123 = 1;
            } else {
              e1123 = 0;
            }

            } else {
            e1123 = 0;
          }
           if (this.obj.e1124 != null) {
            if (this.obj.e1124.length > 0) {
              e1124 = 1;
            } else {
              e1124 = 0;
            }

            } else {
            e1124 = 0;
          }
          if (this.obj.e1125 != null) {
            if (this.obj.e1125.length > 0) {
              e1125 = 1;
            } else {
              e1125 = 0;
            }

            } else {
            e1125 = 0;
          }
           if (this.obj.e11g3 != null) {
            if (this.obj.e11g3.length > 0) {
              e11g3 = 1;
            } else {
              e11g3 = 0;
            }

            } else {
            e11g3 = 0;
          }
          if (this.obj.e1131 != null) {
            if (this.obj.e1131.length > 0) {
              e1131 = 1;
            } else {
              e1131 = 0;
            }

            } else {
            e1131 = 0;
          }
          if (this.obj.e1132 != null) {
            if (this.obj.e1132.length > 0) {
              e1132 = 1;
            } else {
              e1132 = 0;
            }

            } else {
            e1132 = 0;
          }
           if (this.obj.e1133 != null) {
            if (this.obj.e1133.length > 0) {
              e1133 = 1;
            } else {
              e1133 = 0;
            }

            } else {
            e1133 = 0;
          }
          if (this.obj.e1134 != null) {
            if (this.obj.e1134.length > 0) {
              e1134 = 1;
            } else {
              e1134 = 0;
            }

            } else {
            e1134 = 0;
          }
           if (this.obj.e1135 != null) {
            if (this.obj.e1135.length > 0) {
              e1135 = 1;
            } else {
              e1135 = 0;
            }

            } else {
            e1135 = 0;
          }
          if (this.obj.e11g4 != null) {
            if (this.obj.e11g4.length > 0) {
              e11g4 = 1;
            } else {
              e11g4 = 0;
            }

            } else {
            e11g4 = 0;
          }
          if (this.obj.e1141 != null) {
            if (this.obj.e1141.length > 0) {
              e1141 = 1;
            } else {
              e1141 = 0;
            }

            } else {
            e1141 = 0;
          }
          if (this.obj.e1142 != null) {
            if (this.obj.e1142.length > 0) {
              e1142 = 1;
            } else {
              e1142 = 0;
            }

            } else {
            e1142 = 0;
          }
          if (this.obj.e1143 != null) {
            if (this.obj.e1143.length > 0) {
              e1143 = 1;
            } else {
              e1143 = 0;
            }

            } else {
            e1143 = 0;
          }
          if (this.obj.e1144 != null) {
            if (this.obj.e1144.length > 0) {
              e1144 = 1;
            } else {
              e1144 = 0;
            }

            } else {
            e1144 = 0;
          }
          if (this.obj.e1145 != null) {
            if (this.obj.e1145.length > 0) {
              e1145 = 1;
            } else {
              e1145 = 0;
            }

            } else {
            e1145 = 0;
          }
            if(this.obj.c43==11 && this.obj.e11g3>0){
              let e_hr_filledUp = e11g3+e1131+e1132+e1133+e1134+e1135;
              this.progressBarObj.loadProgressE_hr = Math.round((  (e_hr_filledUp / e_hr_total_11) * 100));
            }else if(this.obj.c43==11 && (this.obj.e11g3==0 || this.obj.e11g3==null || this.obj.e11g3=="")){
              let e_hr_filledUp = e11g3;
              this.progressBarObj.loadProgressE_hr = Math.round((  (e_hr_filledUp / 1) * 100));
            }else if(this.obj.c43==12 && (this.obj.e11g1>0 && this.obj.e11g2>0 && this.obj.e11g3>0)){
              let e_hr_filledUp = e11g1+e1111+e1112+e1113+e1114+e1115+e11g2+e1121+e1122+e1123+e1124+e1125+e11g3+e1131+e1132+e1133+e1134+e1135;
              this.progressBarObj.loadProgressE_hr = Math.round((  (e_hr_filledUp / e_hr_total_12) * 100));
            }else if(this.obj.c43==12 && this.obj.e11g1>0 && this.obj.e11g2>0 && (this.obj.e11g3==0 || this.obj.e11g3==null || this.obj.e11g3=="")){
              let e_hr_filledUp = e11g3+e11g1+e1111+e1112+e1113+e1114+e1115+e11g2+e1121+e1122+e1123+e1124+e1125;
              this.progressBarObj.loadProgressE_hr = Math.round((  (e_hr_filledUp / 13) * 100));
            }else if(this.obj.c43==12 && this.obj.e11g1>0 && this.obj.e11g3>0 && (this.obj.e11g2==0 || this.obj.e11g2==null || this.obj.e11g2=="")){
              let e_hr_filledUp = e11g2+e11g1+e1111+e1112+e1113+e1114+e1115+e11g3+e1131+e1132+e1133+e1134+e1135;
              this.progressBarObj.loadProgressE_hr = Math.round((  (e_hr_filledUp / 13) * 100));
            }else if(this.obj.c43==12 && this.obj.e11g2>0 && this.obj.e11g3>0 && (this.obj.e11g1==0 || this.obj.e11g1==null || this.obj.e11g1=="")){
              let e_hr_filledUp = e11g1+e11g2+e1121+e1122+e1123+e1124+e1125+e11g3+e1131+e1132+e1133+e1134+e1135;
              this.progressBarObj.loadProgressE_hr = Math.round((  (e_hr_filledUp / 13) * 100));
            }else if(this.obj.c43==12 && this.obj.e11g1>0 && 
              (this.obj.e11g2==0 || this.obj.e11g2==null || this.obj.e11g2=="") &&
              (this.obj.e11g3==0 || this.obj.e11g3==null || this.obj.e11g3=="")){
              let e_hr_filledUp = e11g2+e11g3+e11g1+e1111+e1112+e1113+e1114+e1115;
              this.progressBarObj.loadProgressE_hr = Math.round((  (e_hr_filledUp / 8) * 100));
            }else if(this.obj.c43==12 && this.obj.e11g2>0 && 
              (this.obj.e11g1==0 || this.obj.e11g1==null || this.obj.e11g1=="") &&
              (this.obj.e11g3==0 || this.obj.e11g3==null || this.obj.e11g3=="")){
              let e_hr_filledUp = e11g1+e11g3+e11g2+e1121+e1122+e1123+e1124+e1125;
              this.progressBarObj.loadProgressE_hr = Math.round((  (e_hr_filledUp / 8) * 100));
            }else if(this.obj.c43==12 && this.obj.e11g3>0 && 
              (this.obj.e11g1==0 || this.obj.e11g1==null || this.obj.e11g1=="") &&
              (this.obj.e11g2==0 || this.obj.e11g2==null || this.obj.e11g2=="")){
              let e_hr_filledUp = e11g1+e11g2+e11g3+e1131+e1132+e1133+e1134+e1135;
              this.progressBarObj.loadProgressE_hr = Math.round((  (e_hr_filledUp / 8) * 100));
            }else if(this.obj.c43==12 &&
              (this.obj.e11g1==0 || this.obj.e11g1==null || this.obj.e11g1=="") &&
              (this.obj.e11g2==0 || this.obj.e11g2==null || this.obj.e11g2=="") &&
              (this.obj.e11g3==0 || this.obj.e11g3==null || this.obj.e11g3=="")){
              let e_hr_filledUp = e11g1+e11g2+e11g3;
              this.progressBarObj.loadProgressE_hr = Math.round((  (e_hr_filledUp / 3) * 100));
            }else if((this.obj.c43!=11 || this.obj.c4!=12) &&
              (this.obj.e11g1==0 || this.obj.e11g1==null || this.obj.e11g1=="") &&
              (this.obj.e11g2==0 || this.obj.e11g2==null || this.obj.e11g2=="") &&
              (this.obj.e11g3==0 || this.obj.e11g3==null || this.obj.e11g3=="") &&
              (this.obj.e11g4==0 || this.obj.e11g4==null || this.obj.e11g4=="")){
              let e_hr_filledUp = e11g1+e11g2+e11g3+e11g4;
              this.progressBarObj.loadProgressE_hr = Math.round((  (e_hr_filledUp / 4) * 100));
            }else if((this.obj.c43!=11 || this.obj.c4!=12) && this.obj.e11g4>0 &&
              (this.obj.e11g1==0 || this.obj.e11g1==null || this.obj.e11g1=="") &&
              (this.obj.e11g2==0 || this.obj.e11g2==null || this.obj.e11g2=="") &&
              (this.obj.e11g3==0 || this.obj.e11g3==null || this.obj.e11g3=="")){
              let e_hr_filledUp = e11g1+e11g2+e11g3+e11g4+e1145;
              this.progressBarObj.loadProgressE_hr = Math.round((  (e_hr_filledUp / 5) * 100));
            }else if((this.obj.c43!=11 || this.obj.c4!=12) && this.obj.e11g3>0 &&
              (this.obj.e11g1==0 || this.obj.e11g1==null || this.obj.e11g1=="") &&
              (this.obj.e11g2==0 || this.obj.e11g2==null || this.obj.e11g2=="") &&
              (this.obj.e11g4==0 || this.obj.e11g4==null || this.obj.e11g4=="")){
              let e_hr_filledUp = e11g1+e11g2+e11g3+e1131+e1132+e1133+e1134+e1135+e11g4;
              this.progressBarObj.loadProgressE_hr = Math.round((  (e_hr_filledUp / 9) * 100));
            }else if((this.obj.c43!=11 || this.obj.c4!=12) && this.obj.e11g2>0 &&
              (this.obj.e11g1==0 || this.obj.e11g1==null || this.obj.e11g1=="") &&
              (this.obj.e11g3==0 || this.obj.e11g3==null || this.obj.e11g3=="") &&
              (this.obj.e11g4==0 || this.obj.e11g4==null || this.obj.e11g4=="")){
              let e_hr_filledUp = e11g1+e11g2+e1121+e1122+e1123+e1124+e1125+e11g3+e11g4;
              this.progressBarObj.loadProgressE_hr = Math.round((  (e_hr_filledUp / 9) * 100));
            }else if((this.obj.c43!=11 || this.obj.c4!=12) && this.obj.e11g3>0 && this.obj.e11g4>0 &&
              (this.obj.e11g1==0 || this.obj.e11g1==null || this.obj.e11g1=="") &&
              (this.obj.e11g2==0 || this.obj.e11g2==null || this.obj.e11g2=="")){
              let e_hr_filledUp = e11g1+e11g2+e11g3+e1131+e1132+e1133+e1134+e1135+e11g4+e1145;
              this.progressBarObj.loadProgressE_hr = Math.round((  (e_hr_filledUp / 10) * 100));
            }else if((this.obj.c43!=11 || this.obj.c4!=12) && this.obj.e11g2>0 && this.obj.e11g4>0 &&
              (this.obj.e11g1==0 || this.obj.e11g1==null || this.obj.e11g1=="") &&
              (this.obj.e11g3==0 || this.obj.e11g3==null || this.obj.e11g3=="")){
              let e_hr_filledUp = e11g1+e11g3+e11g2+e1121+e1122+e1123+e1124+e1125+e11g4+e1145;
              this.progressBarObj.loadProgressE_hr = Math.round((  (e_hr_filledUp / 10) * 100));
            }else if((this.obj.c43!=11 || this.obj.c4!=12) && this.obj.e11g2>0 && this.obj.e11g3>0 &&
              (this.obj.e11g1==0 || this.obj.e11g1==null || this.obj.e11g1=="") &&
              (this.obj.e11g4==0 || this.obj.e11g4==null || this.obj.e11g4=="")){
              let e_hr_filledUp = e11g1+e11g4+e11g3+e1131+e1132+e1133+e1134+e1135+e11g2+e1121+e1122+e1123+e1124+e1125;
              this.progressBarObj.loadProgressE_hr = Math.round((  (e_hr_filledUp / 14) * 100));
            }else if((this.obj.c43!=11 || this.obj.c4!=12) && this.obj.e11g2>0 && this.obj.e11g3>0 && this.obj.e11g4>0 &&
              (this.obj.e11g1==0 || this.obj.e11g1==null || this.obj.e11g1=="")){
              let e_hr_filledUp = e11g1+e11g2+e1121+e1122+e1123+e1124+e1125+e11g3+e1131+e1132+e1133+e1134+e1135+e11g4+e1145
              this.progressBarObj.loadProgressE_hr = Math.round((  (e_hr_filledUp / 15) * 100));
            }else if((this.obj.c43!=11 || this.obj.c4!=12) && this.obj.e11g1>0 &&
              (this.obj.e11g2==0 || this.obj.e11g2==null || this.obj.e11g2=="") &&
              (this.obj.e11g3==0 || this.obj.e11g3==null || this.obj.e11g3=="") &&
              (this.obj.e11g4==0 || this.obj.e11g4==null || this.obj.e11g4=="")){
              let e_hr_filledUp = e11g1+e1111+e1112+e1113+e1114+e1115+e11g2+e11g3+e11g4;
              this.progressBarObj.loadProgressE_hr = Math.round((  (e_hr_filledUp / 9) * 100));
            }else if((this.obj.c43!=11 || this.obj.c4!=12) && this.obj.e11g1>0 && this.obj.e11g4>0 &&
              (this.obj.e11g2==0 || this.obj.e11g2==null || this.obj.e11g2=="") &&
              (this.obj.e11g3==0 || this.obj.e11g3==null || this.obj.e11g3=="")){
              let e_hr_filledUp = e11g1+e1111+e1112+e1113+e1114+e1115+e11g2+e11g3+e11g4+e1145;
              this.progressBarObj.loadProgressE_hr = Math.round((  (e_hr_filledUp / 10) * 100));
            }else if((this.obj.c43!=11 || this.obj.c4!=12) && this.obj.e11g1>0 && this.obj.e11g3>0 &&
              (this.obj.e11g2==0 || this.obj.e11g2==null || this.obj.e11g2=="") &&
              (this.obj.e11g4==0 || this.obj.e11g4==null || this.obj.e11g4=="")){
              let e_hr_filledUp = e11g1+e1111+e1112+e1113+e1114+e1115+e11g2+e11g3+e1131+e1132+e1133+e1134+e1135+e11g4;
              this.progressBarObj.loadProgressE_hr = Math.round((  (e_hr_filledUp / 14) * 100));
            }else if((this.obj.c43!=11 || this.obj.c4!=12) && this.obj.e11g1>0 && this.obj.e11g2>0 &&
              (this.obj.e11g3==0 || this.obj.e11g3==null || this.obj.e11g3=="") &&
              (this.obj.e11g4==0 || this.obj.e11g4==null || this.obj.e11g4=="")){
              let e_hr_filledUp = e11g1+e1111+e1112+e1113+e1114+e1115+e11g2+e1121+e1122+e1123+e1124+e1125+e11g3+e11g4;
              this.progressBarObj.loadProgressE_hr = Math.round((  (e_hr_filledUp / 14) * 100));
            }else if((this.obj.c43!=11 || this.obj.c4!=12) && this.obj.e11g1>0 && this.obj.e11g3>0 && this.obj.e11g4>0 &&
              (this.obj.e11g2==0 || this.obj.e11g2==null || this.obj.e11g2=="")){
              let e_hr_filledUp = e11g1+e1111+e1112+e1113+e1114+e1115+e11g2+e11g3+e1131+e1132+e1133+e1134+e1135+e11g4+e1145;
              this.progressBarObj.loadProgressE_hr = Math.round((  (e_hr_filledUp / 15) * 100));
            }else if((this.obj.c43!=11 || this.obj.c4!=12) && this.obj.e11g1>0 && this.obj.e11g2>0 && this.obj.e11g4>0 &&
              (this.obj.e11g3==0 || this.obj.e11g3==null || this.obj.e11g3=="")){
              let e_hr_filledUp = e11g1+e1111+e1112+e1113+e1114+e1115+e11g2+e1121+e1122+e1123+e1124+e1125+e11g3+e11g4+e1145;
              this.progressBarObj.loadProgressE_hr = Math.round((  (e_hr_filledUp / 15) * 100));
            }else if((this.obj.c43!=11 || this.obj.c4!=12) && this.obj.e11g1>0 && this.obj.e11g2>0 && this.obj.e11g3>0 &&
              (this.obj.e11g4==0 || this.obj.e11g4==null || this.obj.e11g4=="")){
              let e_hr_filledUp = e11g1+e1111+e1112+e1113+e1114+e1115+e11g2+e1121+e1122+e1123+e1124+e1125+e11g3+e1131+e1132+e1133+e1134+e1135+e11g4;
              this.progressBarObj.loadProgressE_hr = Math.round((  (e_hr_filledUp / 19) * 100));
            }else if((this.obj.c43!=11 || this.obj.c4!=12) && this.obj.e11g1>0 && this.obj.e11g2>0 && this.obj.e11g3>0 && this.obj.e11g4>0){
              let e_hr_filledUp = e11g1+e1111+e1112+e1113+e1114+e1115+e11g2+e1121+e1122+e1123+e1124+e1125+e11g3+e1131+e1132+e1133+e1134+e1135+e11g4+e1145;
              this.progressBarObj.loadProgressE_hr = Math.round((  (e_hr_filledUp / 20) * 100));
            }
            this.setPercentCSS('e11_id',this.progressBarObj.loadProgressE_hr);         
          }
          break;
          
          case 4  :
          this.changeProgressBarPercentageValue(this.sectorOrSubsectorNumber)
          this.calculateSubSectorMaxScore(this.sectorOrSubsectorNumber)
          break;
        case 5  :
        if(this.sectorOrSubsectorNumber === 51){  
          let hA1: number = 0;
          let hA2: number = 0;
          let hA2p1: number = 0;
          let hA2p2: number = 0; 
          let hA3: number = 0;
          let hA3p1: number = 0;

          if (this.obj.hA1 != null) {
            hA1 = 1;
          } else {
            hA1 = 0;
          }
          
          if (this.obj.hA2 != null) {
            if(this.obj.hA2 == 33){
              this.h1SectionForm_total = 5;
            } else {
              this.h1SectionForm_total = 3;
            }
            hA2 = 1;
          }else{
            if(this.h1SectionForm_total == 5){
              this.h1SectionForm_total = 3;
            }
            hA2 = 0;
            hA2p1 = 0;
            hA2p2 = 0;
            this.obj.hA2p1 = null;
            this.obj.hA2p2 = null;
          }

          if (this.obj.hA2p1 != null) {
            hA2p1 = 1;
          }else{
            hA2p1 = 0;
          }

          if (this.obj.hA2p2 != null) {
            hA2p2 = 1;
          } else {
            hA2p2 = 0;
         }

          if (this.obj.hA3 != null) {
            if(this.obj.hA2 == 33 && this.obj.hA3 == 33){
              this.h1SectionForm_total = 6;
            }else if(this.obj.hA2 == 33 && this.obj.hA3 == 34){
              this.h1SectionForm_total = 5;
            }else if(this.obj.hA2 == 34 && this.obj.hA3 == 33){
              this.h1SectionForm_total = 4;
            }else{
              this.h1SectionForm_total = 3;
            }
            hA3 = 1;
          } else {
            if((this.obj.hA2 == null || this.obj.hA2 == 34) && this.h1SectionForm_total != 1){
              this.h1SectionForm_total = 3;
            }else if(this.obj.hA2 == 33 && this.h1SectionForm_total != 1){
              this.h1SectionForm_total = 5;
            }
            hA3 = 0;
            hA3p1 = 0;
            this.obj.hA3p1 = null;
          }

          if (this.obj.hA3p1 != null) {
            hA3p1 = 1;
          }else {
            hA3p1 = 0;
          }

          this.h1SectionForm_secured = hA1 + hA2 + hA2p1 + hA2p2 + hA3 + hA3p1;
          this.progressBarObj.loadProgressH_service = Math.round(( (this.h1SectionForm_secured / this.h1SectionForm_total) * 100));
          this.setPercentCSS('h1_id',this.progressBarObj.loadProgressH_service);

        }else if(this.sectorOrSubsectorNumber === 52){
          let hB1: number = 0;
          let hB2: number = 0;
          let hD1: number = 0;
          let h2SectionForm_total: number = 3;

          if (this.obj.hB1 != null) {
            if (this.obj.hB1.length > 0) {
              hB1 = 1;
            } else {
              hB1 = 0;
            }

            } else {
              hB1 = 0;
          }

          if (this.obj.hB2 != null) {
            if (this.obj.hB2.length > 0) {
              hB2 = 1;
            } else {
              hB2 = 0;
            }

            } else {
              hB2 = 0;
          }

          if (this.obj.hD1 != null) {
            hD1 = 1;
          }else {
            hD1 = 0;
          }

          let h2SectionForm_secured = hB1 + hB2 + hD1;
          this.progressBarObj.loadProgressH_healthinfo = Math.round(( (h2SectionForm_secured / h2SectionForm_total) * 100));
          this.setPercentCSS('h2_id',this.progressBarObj.loadProgressH_healthinfo);
        }else if(this.sectorOrSubsectorNumber === 53){
          let hC1: number = 0;
          let hC2: number = 0;
          let h3SectionForm_total: number = 2;

          if (this.obj.hC1 != null) {
            hC1 = 1;
          }else {
            hC1 = 0;
          }

          if (this.obj.hC2 != null) {
            hC2 = 1;
          }else {
            hC2 = 0;
          }

          let h3SectionForm_secured = hC1 + hC2;
          this.progressBarObj.loadProgressH_hr = Math.round(( (h3SectionForm_secured / h3SectionForm_total) * 100));
          this.setPercentCSS('h3_id',this.progressBarObj.loadProgressH_hr);

        }else if(this.sectorOrSubsectorNumber === 54){
          let hE1: number = 0;
          let hE2p1: number = 0;
          let hE2p2: number = 0;
          let hE2p3: number = 0;
          let hE2p4: number = 0;
          let hE2p5: number = 0;
          let hE3p1: number = 0;
          let hE3p2: number = 0;
          let hE3p3: number = 0;
          let hE3p4: number = 0;
          let hE3p5: number = 0;
          let h4SectionForm_total: number = 11;
          let h4SectionForm_total_hsc: number = 3;

          if (this.obj.hE1 != null) {
            if (this.obj.hE1.length > 0) {
              hE1 = 1;
            } else {
              hE1 = 0;
            }

            } else {
              hE1 = 0;
          }

          if (this.obj.hE2p1 != null) {
            if (this.obj.hE2p1.length > 0) {
              hE2p1 = 1;
            } else {
              hE2p1 = 0;
            }

            } else {
              hE2p1 = 0;
          }

          if (this.obj.hE2p2 != null) {
            if (this.obj.hE2p2.length > 0) {
              hE2p2 = 1;
            } else {
              hE2p2 = 0;
            }

            } else {
              hE2p2 = 0;
          }

          if (this.obj.hE2p3 != null) {
            if (this.obj.hE2p3.length > 0) {
              hE2p3 = 1;
            } else {
              hE2p3 = 0;
            }

            } else {
              hE2p3 = 0;
          }

          if (this.obj.hE2p4 != null) {
            if (this.obj.hE2p4.length > 0) {
              hE2p4 = 1;
            } else {
              hE2p4 = 0;
            }

            } else {
              hE2p4 = 0;
          }

          if (this.obj.hE2p5 != null) {
            if (this.obj.hE2p5.length > 0) {
              hE2p5 = 1;
            } else {
              hE2p5 = 0;
            }

            } else {
              hE2p5 = 0;
          }

          if (this.obj.hE3p1 != null) {
            if (this.obj.hE3p1.length > 0) {
              hE3p1 = 1;
            } else {
              hE3p1 = 0;
            }

            } else {
              hE3p1 = 0;
          }

          if (this.obj.hE3p2 != null) {
            if (this.obj.hE3p2.length > 0) {
              hE3p2 = 1;
            } else {
              hE3p2 = 0;
            }

            } else {
              hE3p2 = 0;
          }

          if (this.obj.hE3p3 != null) {
            if (this.obj.hE3p3.length > 0) {
              hE3p3 = 1;
            } else {
              hE3p3 = 0;
            }

            } else {
              hE3p3 = 0;
          }

          if (this.obj.hE3p4 != null) {
            if (this.obj.hE3p4.length > 0) {
              hE3p4 = 1;
            } else {
              hE3p4 = 0;
            }

            } else {
              hE3p4 = 0;
          }

          if (this.obj.hE3p5 != null) {
            if (this.obj.hE3p5.length > 0) {
              hE3p5 = 1;
            } else {
              hE3p5 = 0;
            }

            } else {
              hE3p5 = 0;
          }


          if(this.obj.c43!=11){
            let h4SectionForm_secured = hE1 + hE2p1 + hE2p2 + hE2p3 + hE2p4 + hE2p5 + hE3p1 + hE3p2 + hE3p3 + hE3p4 + hE3p5;
            this.progressBarObj.loadProgressH_healthfinance = Math.round(( (h4SectionForm_secured / h4SectionForm_total) * 100));
          }else{
            let h4SectionForm_secured = hE1 + hE2p5 + hE3p5;
            this.progressBarObj.loadProgressH_healthfinance = Math.round(( (h4SectionForm_secured / h4SectionForm_total_hsc) * 100));
          }
          
          this.setPercentCSS('h4_id',this.progressBarObj.loadProgressH_healthfinance);
          
        }else if(this.sectorOrSubsectorNumber === 55){
          let hF1: number = 0;
          let hF1p1: number = 0;
          let hF1p2: number = 0;
          let hF1p2p1: number = 0;
          let hF2: number = 0;
          if (this.obj.hF1 != null) {
            if(this.obj.hF1 == 33){
              this.h5SectionForm_total = 4;
            } else {
              //if(this.obj.c43 == 17){
                this.h5SectionForm_total = 2;
              // }else{
              //   this.h5SectionForm_total = 1;
              // }
              
            }
            hF1 = 1;
          } else {
            hF1 = 0;
            if(this.h5SectionForm_total == 4){
              this.h5SectionForm_total = 2;
            }
            hF1p1 =0;
            hF1p2 =0;
          }
          if (this.obj.hF1p1 != null) {
            hF1p1 = 1;
          } else {
            hF1p1 = 0;
         }

          if (this.obj.hF1p2 != null) {
            hF1p2 = 1;
            if(this.obj.hF1p2 == 33){
              //if(this.obj.c43 == 17){
                this.h5SectionForm_total = 5;
              // }else{
              //   this.h5SectionForm_total = 4;
              // }
              
            } else {
             // if(this.obj.c43 == 17){
              this.h5SectionForm_total = 4;
              // }else{
              //   this.h5SectionForm_total = 3;
              // }
            }
          } else {
            hF1p2 = 0;
         }
         if (this.obj.hF1p2p1 != null) {
          hF1p2p1 = 1;
        } else {
          hF1p2p1 = 0;
        }
         if (this.obj.hF2 != null) {
          hF2 = 1;
        } else {
          hF2 = 0;
        }
         this.h5SectionForm_secured = hF1 + hF1p1 + hF1p2 + hF1p2p1 + hF2;
         this.progressBarObj.loadProgressH_leadership = Math.round(( (this.h5SectionForm_secured / this.h5SectionForm_total) * 100));
         this.setPercentCSS('h5_id',this.progressBarObj.loadProgressH_leadership);
        }
        break;
        case 6  :
        if(this.sectorOrSubsectorNumber === 61){  
          let iA1: number = 0;
          let iA2: number = 0; 
          let i1SectionForm_CHC_DH = 2;
          let i1SectionForm_All = 1;

          if (this.obj.iA1 != null) {
            iA1 = 1;
          }else {
            iA1 = 0;
          }

          if (this.obj.iA2 != null) {
            iA2 = 1;
          }else {
            iA2 = 0;
          }

          if(this.obj.c43 == 14 || this.obj.c43 == 15 || this.obj.c43 == 17){
            this.progressBarObj.loadProgressI_diagnosis = Math.round(( ((iA1+iA2) / i1SectionForm_CHC_DH) * 100));
          } else {
            this.progressBarObj.loadProgressI_diagnosis = Math.round(( (iA1 / i1SectionForm_All) * 100));
          }
          this.setPercentCSS('i1_id',this.progressBarObj.loadProgressI_diagnosis);
        }else if(this.sectorOrSubsectorNumber === 62){
          let iB1: number = 0;
          let iB2: number = 0;
          let iB3: number = 0;
          let iB4: number = 0;
          let iB4p1: number = 0;
          let i2SectionForm_CHC = 1;
          let i2SectionForm_DH_No = 4;
          let i2SectionForm_DH_Yes = 5;

          if (this.obj.iB1 != null) {
            iB1 = 1;
          }else {
            iB1 = 0;
          }

          if (this.obj.iB2 != null) {
            iB2 = 1;
          }else {
            iB2 = 0;
          }

          if (this.obj.iB3 != null) {
            iB3 = 1;
          }else {
            iB3 = 0;
          }

          if (this.obj.iB4 != null) {
            iB4 = 1;
          }else {
            iB4 = 0;
          }

          if (this.obj.iB4p1 != null) {
            iB4p1 = 1;
          }else {
            iB4p1 = 0;
          }

          if(this.obj.c43 == 14 || this.obj.c43 == 15){
            this.progressBarObj.loadProgressI_treatment = Math.round(( (iB1 / i2SectionForm_CHC) * 100));
          }else if(this.obj.c43 == 17 && this.obj.iB4 == 34){
            this.progressBarObj.loadProgressI_treatment = Math.round(( ((iB1+iB2+iB3+iB4) / i2SectionForm_DH_No) * 100));
          }else{
            this.progressBarObj.loadProgressI_treatment = Math.round(( ((iB1+iB2+iB3+iB4+iB4p1) / i2SectionForm_DH_Yes) * 100));
          }
          this.setPercentCSS('i2_id',this.progressBarObj.loadProgressI_treatment);
        }else if(this.sectorOrSubsectorNumber === 63){
          let iC1: number = 0;
          let iC2: number = 0;
          let iC3: number = 0;
          let i2SectionForm_total = 3;

          if (this.obj.iC1 != null) {
            iC1 = 1;
          }else {
            iC1 = 0;
          }

          if (this.obj.iC2 != null) {
            iC2 = 1;
          }else {
            iC2 = 0;
          }

          if (this.obj.iC3 != null) {
            iC3 = 1;
          }else {
            iC3 = 0;
          }

          this.progressBarObj.loadProgressI_national = Math.round(( ((iC1+iC2+iC3) / i2SectionForm_total) * 100));
          this.setPercentCSS('i3_id',this.progressBarObj.loadProgressI_national);
        }else if(this.sectorOrSubsectorNumber === 64){
          let iDA1: number = 0;
          let iDA2: number = 0;
          let iDA3: number = 0;
          let iDA3p1: number = 0;
          let iDA3p2: number = 0;
          let iDA3p3: number = 0;
          let iDA3p4: number = 0;
          let iDA3p5: number = 0;
          let iDA3p6: number = 0;
          let iDA3p7: number = 0;
          let iDB1: number = 0;
          let iDB2: number = 0;
          let iDB3: number = 0;
          let iDC1: number = 0;
          let iDC2: number = 0;
          let iDC3: number = 0;
          let iDD1: number = 0;
          let iDD2: number = 0;
          let iDD3: number = 0;
          let iDE1: number = 0;
          let iDE2: number = 0;
          let iDE3: number = 0;
          let iDE4: number = 0;
          let iDE5: number = 0;
          let iDE6: number = 0;

          if (this.obj.iDA1 != null) {
            iDA1 = 1;
          }else {
            iDA1 = 0;
          }

          if (this.obj.iDA2 != null) {
            iDA2 = 1;
          }else {
            iDA2 = 0;
          }

          if (this.obj.iDA3 != null) {
            iDA3 = 1;
          }else {
            iDA3 = 0;
          }

          if (this.obj.iDA3p1 != null) {
            iDA3p1 = 1;
          }else {
            iDA3p1 = 0;
          }

          if (this.obj.iDA3p2 != null) {
            iDA3p2 = 1;
          }else {
            iDA3p2 = 0;
          }

          if (this.obj.iDA3p3 != null) {
            iDA3p3 = 1;
          }else {
            iDA3p3 = 0;
          }

          if (this.obj.iDA3p4 != null) {
            iDA3p4 = 1;
          }else {
            iDA3p4 = 0;
          }

          if (this.obj.iDA3p5 != null) {
            iDA3p5 = 1;
          }else {
            iDA3p5 = 0;
          }

          if (this.obj.iDA3p6 != null) {
            iDA3p6 = 1;
          }else {
            iDA3p6 = 0;
          }

          if (this.obj.iDA3p7 != null) {
            iDA3p7 = 1;
          }else {
            iDA3p7 = 0;
          }

          if (this.obj.iDB1 != null) {
            iDB1 = 1;
          }else {
            iDB1 = 0;
          }

          if (this.obj.iDB2 != null) {
            iDB2 = 1;
          }else {
            iDB2 = 0;
          }

          if (this.obj.iDB3 != null) {
            iDB3 = 1;
          }else {
            iDB3 = 0;
          }

          if (this.obj.iDC1 != null) {
            iDC1 = 1;
          }else {
            iDC1 = 0;
          }

          if (this.obj.iDC2 != null) {
            iDC2 = 1;
          }else {
            iDC2 = 0;
          }

          if (this.obj.iDC3 != null) {
            iDC3 = 1;
          }else {
            iDC3 = 0;
          }

          if (this.obj.iDD1 != null) {
            iDD1 = 1;
          }else {
            iDD1 = 0;
          }

          if (this.obj.iDD2 != null) {
            iDD2 = 1;
          }else {
            iDD2 = 0;
          }

          if (this.obj.iDD3 != null) {
            iDD3 = 1;
          }else {
            iDD3 = 0;
          }

          if (this.obj.iDE1 != null) {
            iDE1 = 1;
          }else {
            iDE1 = 0;
          }

          if (this.obj.iDE2 != null) {
            iDE2 = 1;
          }else {
            iDE2 = 0;
          }

          if (this.obj.iDE3 != null) {
            iDE3 = 1;
          }else {
            iDE3 = 0;
          }

          if (this.obj.iDE4 != null) {
            iDE4 = 1;
          }else {
            iDE4 = 0;
          }

          if (this.obj.iDE5 != null) {
            iDE5 = 1;
          }else {
            iDE5 = 0;
          }

          if (this.obj.iDE6 != null) {
            iDE6 = 1;
          }else {
            iDE6 = 0;
          }
          
          if(this.obj.c43==11 && this.obj.iDA3==33){
            this.progressBarObj.loadProgressI_nvbcdp = Math.round(( ((iDA1+iDA2+iDA3+iDA3p1+iDA3p2+iDA3p3+iDA3p4+iDA3p5+iDA3p6+iDA3p7+iDB3+iDD2+iDD3) / 13) * 100));
          }else if(this.obj.c43==11 && this.obj.iDA3!=33){
            this.progressBarObj.loadProgressI_nvbcdp = Math.round(( ((iDA1+iDA2+iDA3+iDB3+iDD2+iDD3) / 6) * 100));
          }else if((this.obj.c43==12||this.obj.c43==13||this.obj.c43==14||this.obj.c43==15||this.obj.c43==16||this.obj.c43==18) && this.obj.iDA3==33){
            this.progressBarObj.loadProgressI_nvbcdp = Math.round(( ((iDA1+iDA2+iDA3+iDA3p3+iDA3p4+iDA3p6+iDA3p7+iDB3+iDC1+iDD2+iDD3+iDE1+iDE2+iDE3+iDE4+iDE5+iDE6) / 17) * 100));
          }else if((this.obj.c43==12||this.obj.c43==13||this.obj.c43==14||this.obj.c43==15||this.obj.c43==16||this.obj.c43==18) && this.obj.iDA3!=33){
            this.progressBarObj.loadProgressI_nvbcdp = Math.round(( ((iDA1+iDA2+iDA3+iDB3+iDC1+iDD2+iDD3+iDE1+iDE2+iDE3+iDE4+iDE5+iDE6) / 13) * 100));
          }else if(this.obj.c43==17 && this.obj.iDA3==33){
            this.progressBarObj.loadProgressI_nvbcdp = Math.round(( ((iDA1+iDA2+iDA3+iDA3p3+iDA3p4+iDA3p6+iDA3p7+iDB1+iDB2+iDB3+iDC1+iDC2+iDC3+iDD1+iDD2+iDD3+iDE1+iDE2+iDE3+iDE4+iDE5+iDE6) / 22) * 100));
          }else if(this.obj.c43==17 && this.obj.iDA3!=33){
            this.progressBarObj.loadProgressI_nvbcdp = Math.round(( ((iDA1+iDA2+iDA3+iDB1+iDB2+iDB3+iDC1+iDC2+iDC3+iDD1+iDD2+iDD3+iDE1+iDE2+iDE3+iDE4+iDE5+iDE6) / 18) * 100));
          }
          this.setPercentCSS('i4_id',this.progressBarObj.loadProgressI_nvbcdp);
        }else if(this.sectorOrSubsectorNumber === 65){
          let iE1: number = 0;
          let iE2: number = 0;
          let iE3: number = 0;
          let iE4: number = 0;
          let iE5: number = 0;
          let iE6: number = 0;
          let i5SectionForm_total_DH = 6;
          let i5SectionForm_total = 5;

          if (this.obj.iE1 != null) {
            iE1 = 1;
          }else {
            iE1 = 0;
          }

          if (this.obj.iE2 != null) {
            iE2 = 1;
          }else {
            iE2 = 0;
          }

          if (this.obj.iE3 != null) {
            iE3 = 1;
          }else {
            iE3 = 0;
          }

          if (this.obj.iE4 != null) {
            iE4 = 1;
          }else {
            iE4 = 0;
          }

          if (this.obj.iE5 != null) {
            iE5 = 1;
          }else {
            iE5 = 0;
          }

          if (this.obj.iE6 != null) {
            iE6 = 1;
          }else {
            iE6 = 0;
          }

          if(this.obj.c43>11 && this.obj.c43!=17){
            this.progressBarObj.loadProgressI_rntcp = Math.round(( ((iE2+iE3+iE4+iE5+iE6) / i5SectionForm_total) * 100));
          }else if(this.obj.c43==17){
            this.progressBarObj.loadProgressI_rntcp = Math.round(( ((iE1+iE2+iE3+iE4+iE5+iE6) / i5SectionForm_total_DH) * 100));
          }
          this.setPercentCSS('i5_id',this.progressBarObj.loadProgressI_rntcp);
        }else if(this.sectorOrSubsectorNumber === 66){
          let iF1: number = 0;
          let iF2: number = 0;
          let iF3: number = 0;
          let iF4: number = 0;
          let i6SectionForm_total_DH = 4;
          let i6SectionForm_total = 3;

          if (this.obj.iF1 != null) {
            iF1 = 1;
          }else {
            iF1 = 0;
          }

          if (this.obj.iF2 != null) {
            iF2 = 1;
          }else {
            iF2 = 0;
          }

          if (this.obj.iF3 != null) {
            iF3 = 1;
          }else {
            iF3 = 0;
          }

          if (this.obj.iF4 != null) {
            iF4 = 1;
          }else {
            iF4 = 0;
          }

          if(this.obj.c43>11 && this.obj.c43!=17){
            this.progressBarObj.loadProgressI_leprosy = Math.round(( ((iF2+iF3+iF4) / i6SectionForm_total) * 100));
          }else if(this.obj.c43==17){
            this.progressBarObj.loadProgressI_leprosy = Math.round(( ((iF1+iF2+iF3+iF4) / i6SectionForm_total_DH) * 100));
          }
          this.setPercentCSS('i6_id',this.progressBarObj.loadProgressI_leprosy);
        }else if(this.sectorOrSubsectorNumber === 67){
          let iG1: number = 0;
          let iG2: number = 0;
          let iG3: number = 0;
          let iG3p1: number = 0;
          let iG4: number = 0;
          let iG4p1: number = 0;
          let iG5: number = 0;
          let iG6: number = 0;

          if (this.obj.iG1 != null) {
            iG1 = 1;
          }else {
            iG1 = 0;
          }

          if (this.obj.iG2 != null) {
            iG2 = 1;
          }else {
            iG2 = 0;
          }

          if (this.obj.iG3 != null) {
            iG3 = 1;
          }else {
            iG3 = 0;
          }

          if (this.obj.iG3p1 != null) {
            iG3p1 = 1;
          }else {
            iG3p1 = 0;
          }

          if (this.obj.iG4 != null) {
            iG4 = 1;
          }else {
            iG4 = 0;
          }

          if (this.obj.iG4p1 != null) {
            iG4p1 = 1;
          }else {
            iG4p1 = 0;
          }

          if (this.obj.iG5 != null) {
            iG5 = 1;
          }else {
            iG5 = 0;
          }

          if (this.obj.iG6 != null) {
            if (this.obj.iG6.length > 0) {
              iG6 = 1;
            } else {
              iG6 = 0;
            }

            } else {
              iG6 = 0;
          }

          if(this.obj.c43==11||this.obj.c43==12||this.obj.c43==13){
            this.progressBarObj.loadProgressI_ncd = Math.round(( ((iG3+iG4+iG6) / 3) * 100));
          } else if((this.obj.c43==14||this.obj.c43==15||this.obj.c43==16||this.obj.c43==18) && this.obj.iG3==33 && this.obj.iG4==33){
            this.progressBarObj.loadProgressI_ncd = Math.round(( ((iG1+iG2+iG3+iG3p1+iG4+iG4p1+iG6) / 7) * 100));
          } else if((this.obj.c43==14||this.obj.c43==15||this.obj.c43==16||this.obj.c43==18) && this.obj.iG3!=33 && this.obj.iG4==33){
            this.progressBarObj.loadProgressI_ncd = Math.round(( ((iG1+iG2+iG3+iG4+iG4p1+iG6) / 6) * 100));
          } else if((this.obj.c43==14||this.obj.c43==15||this.obj.c43==16||this.obj.c43==18) && this.obj.iG3==33 && this.obj.iG4!=33){
            this.progressBarObj.loadProgressI_ncd = Math.round(( ((iG1+iG2+iG3+iG3p1+iG4+iG6) / 6) * 100));
          } else if((this.obj.c43==14||this.obj.c43==15||this.obj.c43==16||this.obj.c43==18) && this.obj.iG3!=33 && this.obj.iG4!=33){
            this.progressBarObj.loadProgressI_ncd = Math.round(( ((iG1+iG2+iG3+iG4+iG6) / 5) * 100));
          } else if(this.obj.c43==17 && this.obj.iG3==33 && this.obj.iG4==33){
            this.progressBarObj.loadProgressI_ncd = Math.round(( ((iG1+iG2+iG3+iG3p1+iG4+iG4p1+iG5+iG6) / 8) * 100));
          } else if(this.obj.c43==17 && this.obj.iG3!=33 && this.obj.iG4==33){
            this.progressBarObj.loadProgressI_ncd = Math.round(( ((iG1+iG2+iG3+iG4+iG4p1+iG5+iG6) / 7) * 100));
          } else if(this.obj.c43==17 && this.obj.iG3==33 && this.obj.iG4!=33){
            this.progressBarObj.loadProgressI_ncd = Math.round(( ((iG1+iG2+iG3+iG3p1+iG4+iG5+iG6) / 7) * 100));
          } else if(this.obj.c43==17 && this.obj.iG3!=33 && this.obj.iG4!=33){
            this.progressBarObj.loadProgressI_ncd = Math.round(( ((iG1+iG2+iG3+iG4+iG5+iG6) / 6) * 100));
          }
          this.setPercentCSS('i7_id',this.progressBarObj.loadProgressI_ncd);

        }else if(this.sectorOrSubsectorNumber === 68){
          let iH1: number = 0;
          let iH1p1: number = 0;
          let iH2: number = 0;
          let i8SectionForm_total = 3;
          let i8SectionForm_total_YES_NO = 2;

          if (this.obj.iH1 != null) {
            iH1 = 1;
          }else {
            iH1 = 0;
          }

          if (this.obj.iH1p1 != null) {
            if (this.obj.iH1p1.length > 0) {
              iH1p1 = 1;
            } else {
              iH1p1 = 0;
            }

            } else {
              iH1p1 = 0;
          }

          if (this.obj.iH2 != null) {
            iH2 = 1;
          }else {
            iH2 = 0;
          }

          if(this.obj.c43==17 && this.obj.iH1==33){
            this.progressBarObj.loadProgressI_nppc = Math.round(( ((iH1+iH1p1+iH2) / i8SectionForm_total) * 100));
          }else{
            this.progressBarObj.loadProgressI_nppc = Math.round(( ((iH1+iH2) / i8SectionForm_total_YES_NO) * 100));
          }
          this.setPercentCSS('i8_id',this.progressBarObj.loadProgressI_nppc);
        }
        break;
        case 9:  
          let f_img: number = 0;
          let s_img: number = 0;
          let geopoint: number = 0;
          let img1: number = 0;
          let img2: number = 0;
          let img3: number = 0;
          let geo_coordinate_total = 6;

          if (this.obj.f_img!= null) {
            if (this.obj.f_img.length > 0) {
              f_img = 1;
            } else {
              f_img = 0;
            }
            } else {
            f_img = 0;
          }

          if (this.obj.s_img!= null) {
            if (this.obj.s_img.length > 0) {
              s_img = 1;
            } else {
              s_img = 0;
            }
            } else {
            s_img = 0;
          }

          if (this.obj.geopoint!= null) {
            if (this.obj.geopoint.length > 0) {
              geopoint = 1;
            } else {
              geopoint = 0;
            }
            } else {
            geopoint = 0;
          }

          if (this.obj.img1!= null) {
            if (this.obj.img1.length > 0) {
              img1 = 1;
            } else {
              img1 = 0;
            }
          } else {
              img1 = 0;
          }

          if (this.obj.img2!= null) {
            if (this.obj.img2.length > 0) {
              img2 = 1;
            } else {
              img2 = 0;
            }
          } else {
            img2 = 0;
          }

          if (this.obj.img3!= null) {
            if (this.obj.img3.length > 0) {
              img3 = 1;
            } else {
              img3 = 0;
            }
          } else {
            img3 = 0;
          }


          let geo_coordinate_filledUp = f_img + s_img + geopoint + img1 + img2 + img3;
          this.progressBarObj.loadProgressGeo_coordinate = Math.round(( (geo_coordinate_filledUp /geo_coordinate_total) * 100));
          this.setPercentCSS('geo_id',this.progressBarObj.loadProgressGeo_coordinate);   
      
        break;
        default:
          break;

      }

      // console.log('changes detected');
      // changes.forEachChangedItem(r => console.log('changed ', r.currentValue));
      // changes.forEachAddedItem(r => console.log('added ' + r.currentValue));
      // changes.forEachRemovedItem(r => console.log('removed ' + r.currentValue));
    }
    }
  }

  vallidateImage(id, picTag, pos,type){
    let temp = this;
    let validImageFormats = ["jpg","JPG","jpeg","JPEG","png","PNG"];
      let imgFile = picTag[0].files;
      let ext = imgFile[0].name.split(".").pop();

      if(validImageFormats.indexOf(ext) == -1){
        temp.messageService.showErrorAlert("Invalid image format.");
      }else if(this.is_web == true && imgFile[0].size>500000){
        temp.messageService.showErrorAlert("File size should not exceeds more than 500kb.");
      }
      else{
        temp.getBase64(id, imgFile[0], pos,type);
      }
  }

  getBase64 = function (id, file, pos,type) {
    let temp = this;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setTimeout(function(){
        temp.obj[id] = reader.result;
        switch(pos){
          case 1: if(temp.img2[0].files.length == 0){ // && temp.img2[0].files.length < 1
             if(type == 'finalize'){
                temp.finalize();
              }else if(type == 'saveConfirmation'){
                temp.saveConfirmation();
              }
          }
          break;
          case 2:// if(temp.img1[0].files.length == 0){
             if(type == 'finalize'){
                temp.finalize();
              }else if(type == 'saveConfirmation'){
                temp.saveConfirmation();
              } 
         // }
          break;
        }
      },100)
    }
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  closeAllPopups() {
    let temp = this;
    if (temp.alert1)
      temp.alert1.dismiss();
    if (temp.alert2)
      temp.alert2.dismiss();
    if (temp.alert3)
      temp.alert3.dismiss();
    if (temp.alert4)
      temp.alert4.dismiss();
    if (temp.alert5)
      temp.alert5.dismiss();
    if (temp.alert6)
      temp.alert6.dismiss();
    if (temp.alert7)
      temp.alert7.dismiss();
    if (temp.alert8)
      temp.alert8.dismiss();
    if (temp.alert9)
      temp.alert9.dismiss();
    if (temp.alert10)
      temp.alert10.dismiss();
    if (temp.alert11)
      temp.alert11.dismiss();
    if (temp.alert12)
      temp.alert12.dismiss();
    if (temp.presentToastConfirm)
      temp.presentToastConfirm.dismiss();
  }


  /**
   * This method is going to calculate sub sector max score
   * @author Ratikanta
   * @since 2.1.0
   */
  calculateSubSectorMaxScore(subSectorNumber: number){

    switch(subSectorNumber){

      //F1 Antenatal Care
      case EssProvider.SUB_SECTOR_NUMBER.ANC_SUB_SECTOR_NUMBER:
        let maxScore = this.ess.getSubSectionMaxscores().ANCSubSectionMaxScore

        let f11ValuePresent : boolean = false

        //checking blood presure question visible or not
        if(!(this.obj.e233 === EssProvider.BOOLEAN_RESPONSE.YES && this.obj.e234 === EssProvider.BOOLEAN_RESPONSE.YES)){
          maxScore--
        }

        //checking Blood glucose measured is Dependent on availability of Glucometer
        if(!(this.obj.e104 === EssProvider.BOOLEAN_RESPONSE.YES)){
          maxScore--
        }

        //checking Urine albumin estimate is Dependent on availability of Urine albumin kit
        if(!(this.obj.e231 === EssProvider.BOOLEAN_RESPONSE.YES)){
          maxScore--
        }

        //checking Universal HIV screening is Dependent on availability of HIV testing kit
        if(!(this.obj.e229 === EssProvider.BOOLEAN_RESPONSE.YES)){
          maxScore--
        }

        //checking Hypothyroidism screening done for high risk ANC cases  is Dependent on availability of Auto analyzer
        if(!(
        
           (this.obj.c43 === MessageProvider.FACILITY_TYPE_IDS.DH_TYPE_ID || 
            this.obj.c43 === MessageProvider.FACILITY_TYPE_IDS.AREA_HOSPITAL_TYPE_ID)

            && (this.obj.e108 === EssProvider.BOOLEAN_RESPONSE.YES || this.obj.e109 === EssProvider.BOOLEAN_RESPONSE.YES) 
        
        
        
        )){
          maxScore--
        }

        //checking Malaria testing (for malaria endemic areas only) is Dependent on availability of Rapid Diagnostic Test kit for Malaria
        if(!(this.obj.e217 === EssProvider.BOOLEAN_RESPONSE.YES)){
          maxScore--
        }        

        if(!(this.obj.f11==0 || this.obj.f11==null || this.obj.f11=="")){
          f11ValuePresent = true
        }

        if(!f11ValuePresent){
          this.anteNatalCareSubSectionMaxScore = 0
        } else {
          this.anteNatalCareSubSectionMaxScore = maxScore
        } 
          
        break;

        //F2 Intra-partum and immediate post-partum pratices
        case EssProvider.SUB_SECTOR_NUMBER.IPIPPP:
        maxScore = this.ess.getSubSectionMaxscores().IPIPPP

        //Foetal heart rate (FHR) recorded at time of admission is Dependent on availability of Foetoscope/Foetal doppler
        if(!(this.obj.e236 === EssProvider.BOOLEAN_RESPONSE.YES)){
          maxScore--
        }

        //Mothers BP recorded at the time of admission is Dependent on availability of BP apparatus
        if(!(this.obj.e233 === EssProvider.BOOLEAN_RESPONSE.YES && this.obj.e234 === EssProvider.BOOLEAN_RESPONSE.YES)){
          maxScore--
        }

        //Partograph used to monitor progress of labour is Dependent on availability of partograph
        if(!(this.obj.e223 === EssProvider.BOOLEAN_RESPONSE.YES)){
          maxScore--
        }

        //Antenatal corticosteroids used for preterm delivery is Dependent on availability of Inj. Dexamethasone
        if(!(this.obj.e26 === EssProvider.BOOLEAN_RESPONSE.YES)){
          maxScore--
        }

        //Magnesium sulphate used for eclampsia management is Dependent on availability of Inj. Mag sulphate
        if(!(this.obj.e25 === EssProvider.BOOLEAN_RESPONSE.YES)){
          maxScore--
        }

        //Active Management of third stage of labor being performed is Dependent on availability of oxytocin available
        //OR
        //Active Management of third stage of labor being performed is Dependent on availability of Tab. Misoprostol
        if(!(this.obj.e21 === EssProvider.BOOLEAN_RESPONSE.YES || this.obj.e23 === EssProvider.BOOLEAN_RESPONSE.YES)){
          maxScore--
        }

        this.ipipppScore = maxScore
        break;

        //F3 Essential Newborn care(ENBC), Resuscitation and Child Health
        case EssProvider.SUB_SECTOR_NUMBER.ENBCRC:
        maxScore = this.ess.getSubSectionMaxscores().ENBCRC

        //Babies dried with clean/sterile towels just after delivery is Dependent on availability of Clean Towels/drape
        if(!(this.obj.e39 === EssProvider.BOOLEAN_RESPONSE.YES)){
          maxScore--
        }

        //Delayed cord cutting (1-3 mins) practiced is Dependent on availability of cord tie/clamps
        if(!(this.obj.e310 === EssProvider.BOOLEAN_RESPONSE.YES)){
          maxScore--
        }

        //baby weighed is Dependent on availability of Newborn weighing machine
        if(!(this.obj.e311 === EssProvider.BOOLEAN_RESPONSE.YES)){
          maxScore--
        }

        //Vitamin K1 administered to all newborns (within 24 hours of birth) is Dependent on availability of Vitamin K1
        if(!(this.obj.e31 === EssProvider.BOOLEAN_RESPONSE.YES)){
          maxScore--
        }

        //Newborns given BCG, OPV, Hep B within 24 hours of birth is Dependent on availability of BCG and OPV and HEP B
        if(!(this.obj.e51 === EssProvider.BOOLEAN_RESPONSE.YES && this.obj.e52 === EssProvider.BOOLEAN_RESPONSE.YES && this.obj.e53 === EssProvider.BOOLEAN_RESPONSE.YES)){
          maxScore--
        }

        //Question F.3.10. KMC practiced for Low birth Weight in Post-natal ward:, is not application to following facility types
        if(!(this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID && 
              this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID && 
              this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.PHC_247_TYPE_ID && 
              this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_PRU_CHC_TYPE_ID )){
          maxScore--
        }

        

        this.ENBCRCScore = maxScore
        break;

        //F4 Family planning
        case EssProvider.SUB_SECTOR_NUMBER.FAMILY_PLANNING:
        maxScore = this.ess.getSubSectionMaxscores().FAMILY_PLANNING
        
        //PPIUCD insertions is Dependent on availability of 380A/375
        if(!(this.obj.e111 === EssProvider.BOOLEAN_RESPONSE.YES || this.obj.e112 === EssProvider.BOOLEAN_RESPONSE.YES)){
          maxScore--
        }

        //Interval IUCD insertions is Dependent on availability of 380A/375
        if(!(this.obj.e111 === EssProvider.BOOLEAN_RESPONSE.YES || this.obj.e112 === EssProvider.BOOLEAN_RESPONSE.YES)){
          maxScore--
        }

        //Question F.4.4. Sterilization procedures (Fixed Day Static Services):, is not application to following facility types
        if(!(this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID && 
          this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID && 
          this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.PHC_247_TYPE_ID && 
          this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_PRU_CHC_TYPE_ID ))
          {
          maxScore--
        }

        //Question F.4.5. Sterilization procedures (Fixed Day Camps):, is only application to following facility types
        if(!(this.obj.c43 === MessageProvider.FACILITY_TYPE_IDS.PHC_247_TYPE_ID ||
          this.obj.c43 === MessageProvider.FACILITY_TYPE_IDS.NON_PRU_CHC_TYPE_ID )) {
          maxScore--
        }

        
        this.familyPlanningScore = maxScore
        break;


        //F5 Client satisfaction
        case EssProvider.SUB_SECTOR_NUMBER.CLIENT_SATISFACTION:
        maxScore = this.ess.getSubSectionMaxscores().CLIENT_SATISFACTION

        this.clientSaticfactionScore = maxScore
        break;


        //F6 Facility mechanism and others
        case EssProvider.SUB_SECTOR_NUMBER.FMO:
        maxScore = this.ess.getSubSectionMaxscores().FMO

        //Infection prevention being practiced and segregation being followed is Dependent on availability of Color coded bins
        if(!(this.obj.e84 === EssProvider.BOOLEAN_RESPONSE.YES)){
          maxScore--
        }

        //Disinfection practices being followed is Dependent on availability of Bleaching powder and (boiler or autoclave)
        if(!(this.obj.e82 === EssProvider.BOOLEAN_RESPONSE.YES && (this.obj.e88 === EssProvider.BOOLEAN_RESPONSE.YES || this.obj.e87 === EssProvider.BOOLEAN_RESPONSE.YES))){
          maxScore--
        }


        this.FMOScore = maxScore
        break;


        //F7 Adolescent health
        case EssProvider.SUB_SECTOR_NUMBER.ADOLESCENT_HEALTH:
        maxScore = this.ess.getSubSectionMaxscores().ADOLESCENT_HEALTH

        //Question F.7.1. Contraceptive available at AFHC:, not application for following facilities
        if(!(this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
              this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
          maxScore--
        }

        //Question F.7.2. Contraceptive being given to client:, not application for following facilities
        if(!(this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
          this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
          maxScore--
        }

        //Question F.7.3. Height Scale available:, not application for following facilities
        if(!(this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
          this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
          maxScore--
        }

        //Question F.7.4. Height measured:, not application for following facilities
        if(!(this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
          this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
          maxScore--
        }

        //Question F.7.5. Weighing Machine available:, not application for following facilities
        if(!(this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
          this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
          maxScore--
        }

        //Question F.7.6. Weight measured:, not application for following facilities
        if(!(this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
          this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
          maxScore--
        }

        //Question F.7.7. BP apparatus available at AFHC:, not application for following facilities
        if(!(this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
          this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
          maxScore--
        }

        //Question F.7.8. BP Apparatus being used:, not application for following facilities
        if(!(this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
          this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
          maxScore--
        }

        //Question F.7.9. BMI Calculated:, not application for following facilities
        if(!(this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
          this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
          maxScore--
        }

        //Question F.7.10. Counselling conducted at AFHC:, not application for following facilities
        if(!(this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
          this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
          maxScore--
        }

        //Question F.7.11. Vision being checked with Snellen chart:, not application for following facilities
        if(!(this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
          this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
          maxScore--
        }


        //Vision being checked with snellen chart is Dependent on availability of Snellen chart
        if(!(this.obj.e1011 === EssProvider.BOOLEAN_RESPONSE.YES)){
          maxScore--
        }


        this.adolescentHealthScore = maxScore
        break;
    }

  }
  
  /**
   * This method is going to calculate max scores of all subsectors
   * We basically call it before save or finalize the form
   * 
   * @author Ratikanta
   * @since 2.1.0
   */
  calculateAllSubSectorMaxScores(){
    this.calculateSubSectorMaxScore(EssProvider.SUB_SECTOR_NUMBER.ANC_SUB_SECTOR_NUMBER)
    this.calculateSubSectorMaxScore(EssProvider.SUB_SECTOR_NUMBER.IPIPPP)
    this.calculateSubSectorMaxScore(EssProvider.SUB_SECTOR_NUMBER.ENBCRC)
    this.calculateSubSectorMaxScore(EssProvider.SUB_SECTOR_NUMBER.FAMILY_PLANNING)
    this.calculateSubSectorMaxScore(EssProvider.SUB_SECTOR_NUMBER.CLIENT_SATISFACTION)
    this.calculateSubSectorMaxScore(EssProvider.SUB_SECTOR_NUMBER.FMO)
    this.calculateSubSectorMaxScore(EssProvider.SUB_SECTOR_NUMBER.ADOLESCENT_HEALTH)
  }

  /**
   * This will calculate and change progress bar percentage value
   * 
   * @author Ratikanta
   * @since 2.1.0
   */
  changeProgressBarPercentageValue(subSectorNumber: number){

    switch(subSectorNumber){
      case EssProvider.SUB_SECTOR_NUMBER.ANC_SUB_SECTOR_NUMBER:
      this.progressBarObj.loadProgressF_ante = 
      this.ess.calculateProgressBarPercentage(EssProvider.SUB_SECTOR_NUMBER.ANC_SUB_SECTOR_NUMBER, this.obj)
      this.setPercentCSS('f1_id',this.progressBarObj.loadProgressF_ante);
      break;

      case EssProvider.SUB_SECTOR_NUMBER.IPIPPP:
      this.progressBarObj.loadProgressF_intra = 
      this.ess.calculateProgressBarPercentage(EssProvider.SUB_SECTOR_NUMBER.IPIPPP, this.obj)
      this.setPercentCSS('f2_id',this.progressBarObj.loadProgressF_intra);
      break;

      case EssProvider.SUB_SECTOR_NUMBER.ENBCRC:
      this.progressBarObj.loadProgressF_newborn = 
      this.ess.calculateProgressBarPercentage(EssProvider.SUB_SECTOR_NUMBER.ENBCRC, this.obj)
      this.setPercentCSS('f3_id',this.progressBarObj.loadProgressF_newborn);
      break;

      case EssProvider.SUB_SECTOR_NUMBER.FAMILY_PLANNING:
      this.progressBarObj.loadProgressF_family = 
      this.ess.calculateProgressBarPercentage(EssProvider.SUB_SECTOR_NUMBER.FAMILY_PLANNING, this.obj)
      this.setPercentCSS('f4_id',this.progressBarObj.loadProgressF_family);
      break;

      case EssProvider.SUB_SECTOR_NUMBER.CLIENT_SATISFACTION:
      this.progressBarObj.loadProgressF_client = 
      this.ess.calculateProgressBarPercentage(EssProvider.SUB_SECTOR_NUMBER.CLIENT_SATISFACTION, this.obj)
      this.setPercentCSS('f5_id',this.progressBarObj.loadProgressF_client);
      break;

      case EssProvider.SUB_SECTOR_NUMBER.FMO:
      this.progressBarObj.loadProgressF_facility = 
      this.ess.calculateProgressBarPercentage(EssProvider.SUB_SECTOR_NUMBER.FMO, this.obj)
      this.setPercentCSS('f6_id',this.progressBarObj.loadProgressF_facility);
      break;

      case EssProvider.SUB_SECTOR_NUMBER.ADOLESCENT_HEALTH:
      this.progressBarObj.loadProgressF_adloscent = 
      this.ess.calculateProgressBarPercentage(EssProvider.SUB_SECTOR_NUMBER.ADOLESCENT_HEALTH, this.obj)
      this.setPercentCSS('f7_id',this.progressBarObj.loadProgressF_adloscent);
      break;
    }
    

    

  }



  /**
   * This method is going to remove mandatory validation from 
   * Sub section "Antenatal Care" of section "Service delivery indicators"
   * When the questions are not applicable
   * 
   * @author Ratikanta
   * @since 2.1.0
   */
  validateRatikanta(){

  
    //Removing validation from Question "F.1.2. Blood Pressure measured:"
    if(!(this.obj.e233 === EssProvider.BOOLEAN_RESPONSE.YES && this.obj.e234 === EssProvider.BOOLEAN_RESPONSE.YES)){
      this.obj.f12 = null
      this.f1SectionForm.controls["f12"].setErrors(null);
    }

    //Removing validation from Question "F.1.4. Blood Glucose measured:"
    if(!(this.obj.e104 === EssProvider.BOOLEAN_RESPONSE.YES)){
      this.obj.f14 = null
      this.f1SectionForm.controls["f14"].setErrors(null);
    }

    //Removing validation from Question "F.1.5. Urine Albumin estimation:"
    if(!(this.obj.e231 === EssProvider.BOOLEAN_RESPONSE.YES)){
      this.obj.f15 = null
      this.f1SectionForm.controls["f15"].setErrors(null);
    }

    //Removing validation from Question "F.1.8. Universal HIV screening:"
    if(!(this.obj.e229 === EssProvider.BOOLEAN_RESPONSE.YES)){
      this.obj.f18 = null
      this.f1SectionForm.controls["f18"].setErrors(null);
    }

    //Removing validation from Question "F.1.9. Hypothyroidism screening done for high risk ANC cases (DH/MC):"
    if(!(
        
      (this.obj.c43 === MessageProvider.FACILITY_TYPE_IDS.DH_TYPE_ID || 
       this.obj.c43 === MessageProvider.FACILITY_TYPE_IDS.AREA_HOSPITAL_TYPE_ID)

       && (this.obj.e108 === EssProvider.BOOLEAN_RESPONSE.YES || this.obj.e109 === EssProvider.BOOLEAN_RESPONSE.YES) 
   
   
   
   )){
    this.obj.f19 = null
    this.f1SectionForm.controls["f19"].setErrors(null);
   }  

   //checking Malaria testing (for malaria endemic areas only) is Dependent on availability of Rapid Diagnostic Test kit for Malaria
   if(!(this.obj.e217 === EssProvider.BOOLEAN_RESPONSE.YES)){
    this.obj.f111 = null
    this.f1SectionForm.controls["f111"].setErrors(null);
   }
   
   //F2 Intra-partum and immediate post-partum pratices

   //Foetal heart rate (FHR) recorded at time of admission is Dependent on availability of Foetoscope/Foetal doppler
   if(!(this.obj.e236 === EssProvider.BOOLEAN_RESPONSE.YES)){
    this.obj.f21 = null
    this.f2SectionForm.controls["f21"].setErrors(null);
   }

   //Mothers BP recorded at the time of admission is Dependent on availability of BP apparatus
   if(!(this.obj.e233 === EssProvider.BOOLEAN_RESPONSE.YES && this.obj.e234 === EssProvider.BOOLEAN_RESPONSE.YES)){
    this.obj.f23 = null
    this.f2SectionForm.controls["f23"].setErrors(null);
   }

   //Partograph used to monitor progress of labour is Dependent on availability of partograph
   if(!(this.obj.e223 === EssProvider.BOOLEAN_RESPONSE.YES)){
    this.obj.f24 = null
    this.f2SectionForm.controls["f24"].setErrors(null);
   }

   //Antenatal corticosteroids used for preterm delivery is Dependent on availability of Inj. Dexamethasone
   if(!(this.obj.e26 === EssProvider.BOOLEAN_RESPONSE.YES)){
    this.obj.f25 = null
    this.f2SectionForm.controls["f25"].setErrors(null);
   }

   //Magnesium sulphate used for eclampsia management is Dependent on availability of Inj. Mag sulphate
   if(!(this.obj.e25 === EssProvider.BOOLEAN_RESPONSE.YES)){
    this.obj.f26 = null
    this.f2SectionForm.controls["f26"].setErrors(null);
   }

   //Active Management of third stage of labor being performed is Dependent on availability of oxytocin available
   //OR
   //Active Management of third stage of labor being performed is Dependent on availability of Tab. Misoprostol
   if(!(this.obj.e21 === EssProvider.BOOLEAN_RESPONSE.YES || this.obj.e23 === EssProvider.BOOLEAN_RESPONSE.YES)){
    this.obj.f27 = null
    this.f2SectionForm.controls["f27"].setErrors(null);
   }


   //F3 Essential Newborn care(ENBC), Resuscitation and Child Health
   

   //Babies dried with clean/sterile towels just after delivery is Dependent on availability of Clean Towels/drape
   if(!(this.obj.e39 === EssProvider.BOOLEAN_RESPONSE.YES)){
    this.obj.f32 = null
    this.f3SectionForm.controls["f32"].setErrors(null);
   }

   //Delayed cord cutting (1-3 mins) practiced is Dependent on availability of cord tie/clamps
   if(!(this.obj.e310 === EssProvider.BOOLEAN_RESPONSE.YES)){
    this.obj.f33 = null
    this.f3SectionForm.controls["f33"].setErrors(null);
   }

   //baby weighed is Dependent on availability of Newborn weighing machine
   if(!(this.obj.e311 === EssProvider.BOOLEAN_RESPONSE.YES)){
     this.obj.f36 = null
     this.f3SectionForm.controls["f36"].setErrors(null);
   }

   //Vitamin K1 administered to all newborns (within 24 hours of birth) is Dependent on availability of Vitamin K1
   if(!(this.obj.e31 === EssProvider.BOOLEAN_RESPONSE.YES)){
     this.obj.f37 = null
     this.f3SectionForm.controls["f37"].setErrors(null);
   }

   //Newborns given BCG, OPV, Hep B within 24 hours of birth is Dependent on availability of BCG and OPV and HEP B
   if(!(this.obj.e51 === EssProvider.BOOLEAN_RESPONSE.YES && this.obj.e52 === EssProvider.BOOLEAN_RESPONSE.YES && this.obj.e53 === EssProvider.BOOLEAN_RESPONSE.YES)){
     this.obj.f38 = null
     this.f3SectionForm.controls["f38"].setErrors(null);
   }

   //Question F.3.10. KMC practiced for Low birth Weight in Post-natal ward:, is not application to following facility types
   if(!(this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID && 
         this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID && 
         this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.PHC_247_TYPE_ID && 
         this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_PRU_CHC_TYPE_ID )){
     this.obj.f310 = null
     this.f3SectionForm.controls["f310"].setErrors(null);
   }

   //F4 Family planning

   
   //PPIUCD insertions is Dependent on availability of 380A/375
   if(!(this.obj.e111 === EssProvider.BOOLEAN_RESPONSE.YES || this.obj.e112 === EssProvider.BOOLEAN_RESPONSE.YES)){
     this.obj.f42 = null
     this.f4SectionForm.controls["f42"].setErrors(null);
   }

   //Interval IUCD insertions is Dependent on availability of 380A/375
   if(!(this.obj.e111 === EssProvider.BOOLEAN_RESPONSE.YES || this.obj.e112 === EssProvider.BOOLEAN_RESPONSE.YES)){
     this.obj.f43 = null
     this.f4SectionForm.controls["f43"].setErrors(null);
   }

   //Question F.4.4. Sterilization procedures (Fixed Day Static Services):, is not application to following facility types
   if(!(this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID && 
     this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID && 
     this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.PHC_247_TYPE_ID && 
     this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_PRU_CHC_TYPE_ID ))
     {
     this.obj.f44 = null
     this.f4SectionForm.controls["f44"].setErrors(null);
   }

   //Question F.4.5. Sterilization procedures (Fixed Day Camps):, is only application to following facility types
   if(!(this.obj.c43 === MessageProvider.FACILITY_TYPE_IDS.PHC_247_TYPE_ID ||
     this.obj.c43 === MessageProvider.FACILITY_TYPE_IDS.NON_PRU_CHC_TYPE_ID )) {
     this.obj.f45 = null
     this.f4SectionForm.controls["f45"].setErrors(null);
   }

   //F5 Client satisfaction


   //F6 Facility mechanism and others

   //Infection prevention being practiced and segregation being followed is Dependent on availability of Color coded bins
   if(!(this.obj.e84 === EssProvider.BOOLEAN_RESPONSE.YES)){
     this.obj.f64 = null
     this.f6SectionForm.controls["f64"].setErrors(null);
   }

   //Disinfection practices being followed is Dependent on availability of Bleaching powder and (boiler or autoclave)
   if(!(this.obj.e82 === EssProvider.BOOLEAN_RESPONSE.YES && (this.obj.e88 === EssProvider.BOOLEAN_RESPONSE.YES || this.obj.e87 === EssProvider.BOOLEAN_RESPONSE.YES))){
     this.obj.f65 = null
     this.f6SectionForm.controls["f65"].setErrors(null);
   }

   //F7 Adolescent health


   //Question F.7.1. Contraceptive available at AFHC:, not application for following facilities
   if(!(this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
         this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
     this.obj.f71 = null
     this.f7SectionForm.controls["f71"].setErrors(null);
   }

   //Question F.7.2. Contraceptive being given to client:, not application for following facilities
   if(!(this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
     this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
     this.obj.f72 = null
     this.f7SectionForm.controls["f72"].setErrors(null);
   }

   //Question F.7.3. Height Scale available:, not application for following facilities
   if(!(this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
     this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
     this.obj.f73 = null
     this.f7SectionForm.controls["f73"].setErrors(null);
   }

   //Question F.7.4. Height measured:, not application for following facilities
   if(!(this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
     this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
     this.obj.f74 = null
     this.f7SectionForm.controls["f74"].setErrors(null);
   }

   //Question F.7.5. Weighing Machine available:, not application for following facilities
   if(!(this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
     this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
     this.obj.f75 = null
     this.f7SectionForm.controls["f75"].setErrors(null);
   }

   //Question F.7.6. Weight measured:, not application for following facilities
   if(!(this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
     this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
     this.obj.f76 = null
     this.f7SectionForm.controls["f76"].setErrors(null);
   }

   //Question F.7.7. BP apparatus available at AFHC:, not application for following facilities
   if(!(this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
     this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
     this.obj.f77 = null
     this.f7SectionForm.controls["f77"].setErrors(null);
   }

   //Question F.7.8. BP Apparatus being used:, not application for following facilities
   if(!(this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
     this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
     this.obj.f78 = null
     this.f7SectionForm.controls["f78"].setErrors(null);
   }

   //Question F.7.9. BMI Calculated:, not application for following facilities
   if(!(this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
     this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
     this.obj.f79 = null
     this.f7SectionForm.controls["f79"].setErrors(null);
   }

   //Question F.7.10. Counselling conducted at AFHC:, not application for following facilities
   if(!(this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
     this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
     this.obj.f710 = null
     this.f7SectionForm.controls["f710"].setErrors(null);
   }

   //Question F.7.11. Vision being checked with Snellen chart:, not application for following facilities
   //AND
   if(!(this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
     this.obj.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID &&
     this.obj.e1011 === EssProvider.BOOLEAN_RESPONSE.YES
    
    
    )){
     this.obj.f711 = null
     this.f7SectionForm.controls["f711"].setErrors(null);
   }

    



  }

  /**
   * This method will called, when facility level will be changed/selected
   * @author Jagat
   * @since 2.1.0 
   */
  facilityLevelSelected(obj : any){
    switch(obj){
      case EssProvider.TypeDetailIds.facilityLevelL1:
        this.visibility.visibleInL1Facility = true;
        this.visibility.visibleInL2Facility = false;
        this.visibility.visibleInL3Facility = false;
        this.visibility.visibleInL4Facility = false;
      break;
      case EssProvider.TypeDetailIds.facilityLevelL2:
        this.visibility.visibleInL2Facility = true;
        this.visibility.visibleInL1Facility = false;
        this.visibility.visibleInL3Facility = false;
        this.visibility.visibleInL4Facility = false;
      break;
      case EssProvider.TypeDetailIds.facilityLevelL3:
        this.visibility.visibleInL3Facility = true;
        this.visibility.visibleInL1Facility = false;
        this.visibility.visibleInL2Facility = false;
        this.visibility.visibleInL4Facility = false;
      break;
      case EssProvider.TypeDetailIds.facilityLevelL4:
        this.visibility.visibleInL3Facility = false;
        this.visibility.visibleInL1Facility = false;
        this.visibility.visibleInL2Facility = false;
        this.visibility.visibleInL4Facility = true;
      break;
    }
  }
}
