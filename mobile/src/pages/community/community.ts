import { Component,ViewChild,DoCheck,KeyValueDiffers } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Navbar, AlertController, MenuController, Platform,ModalController, ToastController, Content  } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { HintProvider } from '../../providers/hint/hint';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MessageProvider } from '../../providers/message/message';
import { DatePipe} from '@angular/common';
import { AreaPipe } from '../../pipes/area/area';
import { FacilitylevelPipe } from '../../pipes/facilitylevel/facilitylevel';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { SignatureModalPage } from '../signature-modal/signature-modal';
import { HintModalPage } from '../hint-modal/hint-modal';
import { EssProvider } from '../../providers/ess/ess';
/**
 * The community page code
 * @author Ratikanta
 * 
 */

@IonicPage()
@Component({
  selector: 'page-community',
  templateUrl: 'community.html',
})

export class CommunityPage implements DoCheck{

  is_web : boolean = false;
  isq33 : boolean = false;
  text : any;
  obj : any;
  differ: any;
  sectors:any;
  countries : any = [];
  states : any = [];
  districts : any = [];
  facilities : any = [];
  blocks : any = [];
  forEdit : boolean = false;
  forSaveStatus: boolean = false;
  sent:boolean = false;
  img1 : any;
  img2 : any;
  img3 : any;
  disabledSector:boolean = true;
  selectedSector:string = "1";
  selectedSectorNumber: number = 1;
  selectedSubsector:string;
  selectedSubSectorNumber:number;
  subsectors:any;
  sectorOrSubsectorNumber:number;
  showSubsectors:boolean = false;
  finalizeAttempt:boolean=false;
  saveAttempt:boolean=false;
  typeDetails : any = [];
  designationTypeDetails : any = [];
  optionTypeDetails : any = [];
  yesNoTypeDetails : any = [];
  yesNoNaTypeDetails : any = [];
  organizationTypeDetails : any = [];
  planOfActionOrganizations : any = [];
  levelTypeDetails : any = [];
  facilityTypeDetails:any=[];
  facilityLevelTypeDetails:any=[];
  interventionTypeDetails : any = [];
  communityOptionTypeDetails : any = [];
  districtTypeDetails:any=[];
  blockTypeDetails:any=[];
  areas : any = null;
  fetchAreas : any = null;
  stateObject : any = null;
  districtObject : any = null;
  blockObject : any = null;
  facilityObject : any = null;
  facilityTypeObject : any = null;
  imageSrc: string = '';
  imageType: string ='';
  formInfo : any = {};
  o : any = {
      state : "",
      district : "",
      block : ""
  };
  public press: number = 0;
  selectedStateNumber:number;  
  selectedDistrictNumber:number;
  public types:any;
  public generalInformationForm:FormGroup;
  public vhndAssessment:FormGroup;
  public interviewAnm:FormGroup;
  public interviewAsha:FormGroup;
  public aoecwAshaSchoolAwcs:FormGroup;
  public availabilityOfIfaWithAsha:FormGroup;
  public availabilityOfIfaAtSchoolAwcs:FormGroup;
  public interviewWithOregnantWomanSection:FormGroup;
  public interviewWithLactatingMotherWithBaby:FormGroup;
  public askAboutServiceSheReceivedAtFacility:FormGroup;
  public interviewMothertWithChild:FormGroup;
  public interviewWithBeneficiariesToMctfc:FormGroup;
  public interviewWithFamilyHavingAdolescents:FormGroup;
  public interviewWithHouseholdHomeDelivery:FormGroup;
  public interviewWithWifsNodalteacherAww:FormGroup;
  public planOfAction:FormGroup;
  public geoCordinate:FormGroup;

  gForm: boolean = false;
  today:any;
  finalized : boolean = false;

  /**
   * @author Naseem
   * @author Jagat Bandhu
   * this variable is used to hide and show the lat long text field in html/View.
   * if gpsFlag is false the the text will hide otherwise the text will show.
   */
  gpsFlag : boolean = false;

  show_general_progressbar: boolean = false;
  show_VHNDA_progressbar: boolean = true;
  show_IWANM_progressbar: boolean = true;
  show_IA_IASHA_progressbar: boolean = true;
  show_IA_AOECWASA_progressbar: boolean = true;
  show_IA_AIWA_progressbar: boolean = true;
  show_IA_AISA_progressbar: boolean = true;
  show_IB_IWPW_progressbar: boolean = true;
  show_IB_IWLMWMB_progressbar: boolean = true;
  show_IB_AASSRFWSD_progressbar: boolean = true;
  show_IB_IMWCM_progressbar: boolean = true;
  show_IB_IWBMPWPM_progressbar: boolean = true;
  show_IB_IWFHA_progressbar: boolean = true;
  show_IB_IHHD_progressbar: boolean = true;
  show_IB_SAIWWNTA_progressbar: boolean = true;
  show_Geo_Coordinate_progressbar: boolean = true;
  
  progressBarObj : any ={
      loadProgress_General: 0,
      loadProgress_VHNDA: 0,
      loadProgress_IWANM: 0,
      loadProgress_IA_IASHA: 0,
      loadProgress_IA_AOECWASA: 0,
      loadProgress_IA_AIWA: 0,
      loadProgress_IA_AISA: 0,
      loadProgress_IB_IWPW: 0,
      loadProgress_IB_IWLMWMB: 0,
      loadProgress_IB_AASSRFWSD: 0,
      loadProgress_IB_IMWCM: 0,
      loadProgress_IB_IWBMPWPM: 0,
      loadProgress_IB_IWFHA: 0,
      loadProgress_IB_IHHD: 0,
      loadProgress_IB_SAIWWNTA: 0,
      loadProgress_Geo_coordinate: 0
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
  e12Score:number = 0;
  e13Score:number = 0;
  e14Score:number = 0;
  c_VHNDA_score:number = 0;
  c_IWANM_score:number = 0;
  c_IA_IASHA_score:number = 0;
  c_IA_AOECWASA_score:number = 0;
  c_IA_AIWA_score:number = 0;
  c_IA_AISA_score:number = 0;
  c_IB_IWPW_score:number = 0;
  c_IB_IWLMWMB_score:number = 0;
  c_IB_AASSRFWSD_score:number = 0;
  c_IB_IMWCM_score:number = 0;
  c_IB_IWBMPWPM_score:number = 0;
  c_IB_IWFHA_score:number = 0;
  c_IB_IHHD_score:number = 0;
  c_IB_SAIWWNTA_score:number = 0;
  e1ScoreCount:number = 0;
  e2ScoreCount:number = 0;
  e3ScoreCount:number = 0;
  e4ScoreCount:number = 0;
  e5ScoreCount:number = 0;
  e6ScoreCount:number = 0;
  e7ScoreCount:number = 0;
  e8ScoreCount:number = 0;
  e9ScoreCount:number = 0;
  e10ScoreCount:number = 0;
  e11ScoreCount:number = 0;
  e12ScoreCount:number = 0;
  e13ScoreCount:number = 0;
  e14ScoreCount:number = 0; 

  ioncontentHeight:any;
  scrollHeight:any;
  facilityTypeDisable: boolean = true;
  facilityTypeDisableStatus: boolean = false;
  disableBlock:boolean = true;
  communityRadioObj:any;
  communityRadioTempObj:any;
  chooseImage : boolean = true;
  lastChoosenFileName : string = "";
  organizationObject : any = null;
  enableAdd: boolean = true;
  presentToastConfirm: any;
  shownGroup = null;
  roles : any = [];
  designations : any = [];
  designationByOrg : any = [];
  isLvData : boolean = false;
  lvobj: any;
  objectPlanofAction:any;
  timelines:any=[];

  selectNameOfTheStateOptions : any;
  selectNameOfTheDistrictOptions : any;
  selectFacilityTypeOptions : any;
  selectBlockOptions : any;
  selectFacilityOptions : any;
  selectLevelOfInterventionOptions : any;
  selectOrganizationOptions : any;
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

  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams, private dataService: DataProvider,
  private hintService: HintProvider, private backgroundGeolocation: BackgroundGeolocation,
  public formBuilder: FormBuilder,private messageService: MessageProvider,private datePipe : DatePipe,
  private events : Events,private area: AreaPipe, private facilitylevelPipe: FacilitylevelPipe, private alertCtrl: AlertController, private menu : MenuController, 
  public modalCtrl : ModalController, private camera: Camera, private geolocation: Geolocation, 
  private toastCtrl: ToastController, private differs: KeyValueDiffers,public platform : Platform,
  private essService: EssProvider
) {

    this.selectNameOfTheStateOptions = {
      title : "Select State"
    };

    this.selectNameOfTheDistrictOptions = {
      title : "Select District"
    };

    this.selectFacilityTypeOptions = {
      title : "Select Facility Type"
    }

    this.selectBlockOptions = {
      title : "Select Block"
    }

    this.selectFacilityOptions = {
      title : "Select Facility"
    }

    this.selectLevelOfInterventionOptions = {
      title : "Select Level of intervention"
    }

    this.selectOrganizationOptions = {
      title : "Select Organization"
    }

    this.selectResponsibilityOptions = {
      title : "Select Responsibility"
    }

    this.selectTimelineOptions = {
      title : "Select Timeline (in months)"
    }

      window.addEventListener('native.keyboardshow', function(){
       this.toolBarElement = document.querySelector('ion-toolbar');
       this.footerBarElement = document.querySelector('ion-footer');
        document.body.classList.add('keyboard-is-open');
        this.toolBarElement.style.display = 'none';
        this.footerBarElement.style.display = 'none';
     });
     window.addEventListener('native.keyboardhide', function(){
        document.body.classList.remove('keyboard-is-open');
        this.toolBarElement.style.display = 'flex';
        this.footerBarElement.style.display = 'block';
     });

    if(this.essService.getPlatform().isAndroid){
      this.chooseImage = false;
    }

     if(this.navParams.data.id === undefined){
        this.today =  new Date();
      } else {
        this.today = new Date(this.navParams.data.data.date.split("-")[2] + "-" +this.navParams.data.data.date.split("-")[1]
        +"-"+this.navParams.data.data.date.split("-")[0]);
      }

    this.differ = differs.find({}).create(null);

    this.text = "All fields are mandatory";
    
    this.lvobj = [];

    this.communityRadioObj ={
      q11a: false,
      q11b: false,
      q11c: false,
      q11d: false,
      q11e: false,
      q1p2: false,
      q1p3: false,
      q1p4: false,
      q1p5: false,     
      q21: false,
      q22: false,
      q23: false,
      q24: false,
      q25: false,
      q251: false,
      q26: false,
      q27: false,  
      q31: false,   
      q31a: false,
      q31b: false,
      q31c: false,
      q31d: false,
      q311: false,
      q32: false,
      q321: false,
      q33: false,
      q331: false,
      q34: false,
      q35: false,
      q36: false,    
      cal3: false,
      q37a: false,
      q37b: false,
      q37c: false,
      q37d: false,
      q37e: false,     
      q37fi: false,
      q37fii: false,     
      q37gi: false,
      q37gii: false,
      q37h: false,
      q37i: false,
      q37j: false,
      q37k: false,
      q37l: false,      
      cal3a: false,    
      q411: false,
      q412: false,
      q413: false,   
      cal4: false,
      q421: false,
      q422: false,
      q423a: false,
      q423b: false,
      q423c: false,
      q423d: false,
      q423e: false,
      q423I: false,     
      cal4a: false,
      q424a: false,
      q424b: false,
      q424c: false,
      q424d: false,
      q424e: false,
      q424f: false,
      q424g: false,
      q424h: false,
      q424i: false,
      q424j: false,      
      cal4b: false,
      q431: false,
      q431a: false,
      q431b: false,
      q432: false,
      q433: false,
      q434: false,
      q435: false,
      q436: false,
      q437: false,
      q437a: false,
      q437b: false,
      q437c: false,
      q437d: false,
      q437e: false,      
      q437eI: false,
      cal4c: false,
      q441: false,
      q442: false,
      q443: false,
      q444: false,
      q445: false,
      cal4d: false,
      q446a: false,
      q446b: false,
      q446c: false,
      cal4e: false,
      q447: false,     
      cal4f: false,
      q451: false,
      q452: false,
      q453: false,   
      cal4g: false,
      q461a: false,
      q461b: false,
      q461c: false,
      q461d: false,
      q461e: false,
      q461eI: false,
      cal4h: false,
      q462a: false,
      q462b: false,
      q462c: false,
      cal4i: false,
      q463: false,     
      cal4j: false,
      q471: false,
      q471a: false,
      q472: false,
      q473: false,
      q474: false,
      q474a: false,
      cal4k: false,
      q475: false,
      q476: false,     
      cal4l: false,
      facilityId : null,
      facilityType : null  
    }
    this.communityRadioTempObj ={
      q11a: null,
      q11b: null,
      q11c: null,
      q11d: null,
      q11e: null,
      q1p2: null,
      q1p3: null,
      q1p4: null,
      q1p5: null,     
      q21: null,
      q22: null,
      q23: null,
      q24: null,
      q25: null,
      q251: null,
      q26: null,
      q27: null,     
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
      cal3: null,
      q37a: null,
      q37b: null,
      q37c: null,
      q37d: null,
      q37e: null,     
      q37fi: null,
      q37fii: null,     
      q37gi: null,
      q37gii: null,
      q37h: null,
      q37i: null,
      q37j: null,
      q37k: null,
      q37l: null,      
      cal3a: null,    
      q411: null,
      q412: null,
      q413: null,   
      cal4: null,
      q421: null,
      q422: null,
      q423a: null,
      q423b: null,
      q423c: null,
      q423d: null,
      q423e: null,
      q423I: null,     
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
      cal4f: null,
      q451: null,
      q452: null,
      q453: null,   
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
      cal4l: null,
      facilityId : null,
      facilityType : null      
    }
    this.menu.swipeEnable(false);
     this.is_web = this.essService.getPlatform().isWebPWA
    this.sectors = this.dataService.getCommunityJson();
     if(this.navParams.data.id === undefined){
      this.obj = this.dataService.getCommunityObject();      
    }else{
      this.obj = this.navParams.data.data;
      this.finalized = this.navParams.data.finalized;
      this.sent = this.navParams.data.synced;
      this.clickCounterObj=this.navParams.data.score;
      this.progressBarObj=this.navParams.data.percentage;
      this.forEdit = true;
      if(this.sent || this.finalized){
        if(this.obj.q423I == "33"){
          this.obj.q423I = "Yes";
        } else if(this.obj.q423I == "34"){
          this.obj.q423I = "No";
        }
        if(this.obj.q437 == "33"){
          this.obj.q437 = "Yes";
        } else if(this.obj.q437 == "34"){
          this.obj.q437 = "No";
        }
      }
      if(this.obj.q33>0){
        this.isq33 = true;
      } 
    }
    this.ioncontentHeight="0";
    this.scrollHeight="100";
    this.sectorSelectionWork();  
    this.sectorOrSubsectorNumber = 1;
    this.types=this.dataService.setMasterData();
        this.generalInformationForm = this.formBuilder.group({
                q1: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
                q2: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
                facilityType: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
                q3: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
                facilityId: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
                q4: [{ value: '', disabled: this.sent || this.finalized }, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z .,]+$')])],
                q5: [{ value: '', disabled: this.sent || this.finalized || true}],
                q5a: [{ value: '', disabled: this.sent || this.finalized}, Validators.compose([Validators.required])],
                q5b: [{ value: '', disabled: this.sent || this.finalized || true}],
                q6: [{ value: '', disabled: true },Validators.compose([Validators.required])],
                q7: [{ value: '', disabled: this.sent || this.finalized || true},Validators.compose([Validators.required])],
               /* c1: [{ value: '', disabled: this.sent || this.finalized}, Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],*/
        });

        this.vhndAssessment = this.formBuilder.group({
              q11a: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
              q11b: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
              q11c: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
              q11d: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
              q11e: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
              q1p2: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
              q1p3: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
              q1p4: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
              q1p5: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      });

      this.interviewAnm = this.formBuilder.group({
                q21: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
                q22: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
                q23: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
                q24: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
                q25: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
                q251: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
                q26: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
                q27: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      });

   this.interviewAsha = this.formBuilder.group({
          q31: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q31a: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q31b: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q31c: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q31d: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q311: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q32: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q321: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q33: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
          q331: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q34: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q35: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q36: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
this.aoecwAshaSchoolAwcs = this.formBuilder.group({
          q37a: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q37b: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q37c: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q37d: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q37e: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  });

  this.availabilityOfIfaWithAsha = this.formBuilder.group({
          q37fi: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q37fii: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  });

  this.availabilityOfIfaAtSchoolAwcs = this.formBuilder.group({
          q37gi: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q37gii: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q37h: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q37i: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q37j: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q37k: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q37l: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  });

  this.interviewWithOregnantWomanSection = this.formBuilder.group({
          q411: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q412: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q413: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  });

  this.interviewWithLactatingMotherWithBaby = this.formBuilder.group({
          q421: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q422: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q423a: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q423b: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q423c: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q423d: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q423e: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q423I: [{ value: '', disabled: this.sent || this.finalized || true}],
  });

this.askAboutServiceSheReceivedAtFacility = this.formBuilder.group({
      q424a: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q424b: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q424c: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q424d: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q424e: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q424f: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q424g: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q424h: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q424i: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q424j: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
});

this.interviewMothertWithChild = this.formBuilder.group({
      q431: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q431a: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q431b: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q432: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q433: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q434: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q435: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q436: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q437: [{ value: '', disabled: this.sent || this.finalized || true}],
      q437a: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q437b: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q437c: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q437d: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q437e: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q437eI: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
});

this.interviewWithBeneficiariesToMctfc = this.formBuilder.group({
      q441: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q442: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q443: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q444: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q445: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q446a: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q446b: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q446c: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q447: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
});

this.interviewWithFamilyHavingAdolescents = this.formBuilder.group({
      q451: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q452: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q453: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
});

this.interviewWithHouseholdHomeDelivery = this.formBuilder.group({
      q461a: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q461b: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q461c: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q461d: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q461e: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q461eI: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q462a: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q462b: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q462c: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q463: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
});

this.interviewWithWifsNodalteacherAww = this.formBuilder.group({
      q471: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q471a: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q472: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q473: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q474: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q474a: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q475: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q476: [{ value: '', disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
});

this.geoCordinate=this.formBuilder.group({
      f_img: [{ value: '', disabled: this.sent || this.finalized}],
      s_img: [{ value: '', disabled: this.sent || this.finalized}],
      geopoint: [{ value: '', disabled: this.sent || this.finalized}],
      img1: [{ value: '', disabled: this.sent || this.finalized}],
      img2: [{ value: '', disabled: this.sent || this.finalized}],
      img3: [{ value: '', disabled: this.sent || this.finalized}]
});

   this.typeDetails = dataService.getTypeDetails();
   this.designationTypeDetails = (this.typeDetails.filter(d=>d.id === MessageProvider.TYPE_IDS.DESIGNATION_TYPE_ID))[0].typeDetails; 
   this.optionTypeDetails = (this.typeDetails.filter(d=>d.id === MessageProvider.TYPE_IDS.OPTION_TYPE_ID))[0].typeDetails;
   this.yesNoTypeDetails = (this.typeDetails.filter(d=>d.id === MessageProvider.TYPE_IDS.YES_NO_TYPE_ID))[0].typeDetails;
   this.yesNoNaTypeDetails = (this.typeDetails.filter(d=>d.id === MessageProvider.TYPE_IDS.YES_NO_NA_TYPE_ID))[0].typeDetails;
   this.levelTypeDetails = (this.typeDetails.filter(d=>d.id === MessageProvider.TYPE_IDS.LEVEL_TYPE_ID))[0].typeDetails;
   this.facilityTypeDetails = (this.typeDetails.filter(d=>d.id === MessageProvider.TYPE_IDS.FACILITY_TYPE_ID))[0].typeDetails; 
   this.facilityTypeDetails = (this.facilityTypeDetails.filter(d=>d.id === 12 || d.id === 13)); 
   this.facilityLevelTypeDetails = (this.typeDetails.filter(d=>d.id === MessageProvider.TYPE_IDS.FACILITY_LEVEL_TYPE_ID))[0].typeDetails; 
   this.facilityLevelTypeDetails = this.facilitylevelPipe.transform(this.facilityLevelTypeDetails, {});
   this.interventionTypeDetails = (this.typeDetails.filter(d=>d.id === MessageProvider.TYPE_IDS.INTERVENTION_TYPE_ID))[0].typeDetails;
   this.communityOptionTypeDetails = (this.typeDetails.filter(d=>d.id === MessageProvider.TYPE_IDS.COMMUNITY_OPTION_TYPE_ID))[0].typeDetails;
   this.areas = dataService.getAreas();
   this.organizationTypeDetails = dataService.getOrganizations();
   this.planOfActionOrganizations = (this.organizationTypeDetails.filter(o=>o.isGovernmentOrg == true));
   this.roles = this.dataService.getRoles();
   this.designations = this.dataService.getDesignations();
   this.designationByOrg = this.designations.filter(d=> d.isResponsibleCommunity);
   this.timelines = this.dataService.gettimeline();
   if(this.obj.q6 != null){
    for(let i=0; i< this.organizationTypeDetails.length; i++){
      if(this.obj.q6 == this.organizationTypeDetails[i].id)
        this.organizationObject = this.organizationTypeDetails[i];
    }
   }

  }

  scroll(){
    this.content.scrollToTop(300);//300ms animation speed
  }

  ngOnInit(): void {
    if (this.navParams.data.id === undefined) {
      //this.messageService.dismissLoading();
    }
    this.events.subscribe(MessageProvider.EVENTS.COMMUNITY_DATA_SAVE_EVENT, (flag, message) => {
      if (flag) {
        if (message) {
          this.saveToast(MessageProvider.MESSAGES.FINALIZE_SUCCESSFULL);
        } else {
          this.saveToast(MessageProvider.MESSAGES.SAVE_SUCCESSFULL);
        }
        this.navCtrl.pop();
      } else {
        this.errorToast(message);
      }
    });

    this.events.subscribe(MessageProvider.EVENTS.PREFETCH_PROCESS_COMPLETE, (flag, pvDataObj) => {
      let temp = this;
      temp.messageService.dismissLoading();
      if(this.facilityObject != undefined){
        this.formInfo.facilityName = this.facilityObject.name;
      }
      if (flag) {
          temp.isLvData = pvDataObj.isPvData;
          if (pvDataObj && pvDataObj.isPvData) {
            temp.lvobj = pvDataObj.pvData;
            this.obj.lastVisitPlanOfAction = temp.lvobj;
          }else{
            this.obj.lastVisitPlanOfAction = [];
          }
      } else {
        this.obj.lastVisitPlanOfAction = [];
      }
    });

    /**
     * @author Jagat Bandhu
     */
    this.events.subscribe(MessageProvider.EVENTS.DISSMISS_LOADER_COMMUNITY,() => {
      this.backButtonStatus = true;
      this.gpsFlag = false
      this.obj.geopoint = null;
      this.messageService.dismissLoading();
    });

  }


 /**
  * @Author: Ratikanta Pradhan 
  * @email: ratikanta@sdrc.co.in 
  * @Last Modified by: Ratikanta Pradhan
  * @Last Modified time: 10-10-2017 14:55
  */
  saveToast(message) {
    let confirm = this.alertCtrl.create({
      enableBackdropDismiss: false
    });
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

  resize(myInput) {
    let textareaelement = myInput["_elementRef"].nativeElement;
    textareaelement.children[0].style.height = textareaelement.children[0].scrollHeight + 'px';
    if(this.obj.q33==0 || this.obj.q33==null || this.obj.q33==""){
      this.isq33 = false;
      this.obj.q331 = null;
      this.communityRadioObj["q331"] = false;
		  this.communityRadioTempObj["q331"] = null
		  this.interviewAsha.controls["q331"].setErrors(null);
		  for(let ids of [24]) {
          this.deleteRowsfromCounterObj(ids);
      }
      this.e3Score=((this.obj.q31==34 || this.obj.q31==undefined)?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_optional:
          (this.obj.q32==26 && this.obj.q33>0)?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_other_score:
          (this.obj.q32==26 && (this.obj.q33!>0 || this.obj.q33==null || this.obj.q33==""))?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_default:
          (this.obj.q32!=26 && this.obj.q33>0)?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_default:
          (this.obj.q32==26 && this.obj.q33==0)?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_default:
          MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score);
     }else{
      this.isq33 = true;
          this.e3Score=((this.obj.q31==34 || this.obj.q31==undefined)?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_optional:
          (this.obj.q32==26 && this.obj.q33>0)?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_other_score:
          (this.obj.q32==26 && (this.obj.q33!>0 || this.obj.q33==null || this.obj.q33==""))?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_default:
          (this.obj.q32!=26 && this.obj.q33>0)?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_default:
          (this.obj.q32==26 && this.obj.q33==0)?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_default:
          MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score);
    }
  }

  ionViewDidLoad() {
    if (this.navParams.data.id != undefined) {
      if (document.getElementById('general_id') != null) {
        this.setPercentCSS('general_id', this.progressBarObj.loadProgress_General);
      }
    }

    if(this.navParams.data.id === undefined){
      this.obj.c_VHNDA_score=0;
      this.obj.c_IWANM_score=0;
      this.obj.c_IA_IASHA_score=0;
      this.obj.c_IA_AOECWASA_score=0;
      this.obj.c_IA_AIWA_score=0;
      this.obj.c_IA_AISA_score=0;
      this.obj.c_IB_IWPW_score=0;
      this.obj.c_IB_IWLMWMB_score=0;
      this.obj.c_IB_AASSRFWSD_score=0;
      this.obj.c_IB_IMWCM_score=0;
      this.obj.c_IB_IWBMPWPM_score=0;
      this.obj.c_IB_IWFHA_score=0;
      this.obj.c_IB_IHHD_score=0;
      this.obj.c_IB_SAIWWNTA_score=0;
    }

    this.fetchAreas = this.dataService.getAreas();
    this.areas = this.area.convertToParentChild(this.fetchAreas);
    //  this.states = this.area.transform(this.areas, {level: 2, parentAreaId: 1});
    this.countries = this.areas.children;
    this.states = this.countries[0].children;

    if(this.obj.q1 != null){
      // this.districts = this.area.transform(this.areas, {level: 3, parentAreaId: parseInt(this.obj.q1)});
      for(let i=0; i< this.states.length; i++){
        if(this.obj.q1 == this.states[i].areaNId)
          this.stateObject = this.states[i];
      }
      this.districts = this.stateObject.children;

      if(this.obj.q2 != null){
        for(let i=0; i< this.districts.length; i++){
          if(this.obj.q2 == this.districts[i].areaNId)
            this.districtObject = this.districts[i];
        }
        this.blocks = this.districtObject.children.filter(block => block.level == 4 
          && block.parentAreaId == this.districtObject.areaNId);
        this.facilities = this.districtObject.children.filter(facility => facility.level == 5 
          && facility.parentAreaId == this.districtObject.areaNId);
      }

      if(this.obj.q3 != null){
        this.facilities = [];
        for(let i=0; i< this.blocks.length; i++){
          if(this.obj.q3 == this.blocks[i].areaNId)
            this.blockObject = this.blocks[i];
        }
        this.facilities = this.blockObject.children;
      }

      if(this.obj.facilityId != null){
        for(let i=0; i< this.facilities.length; i++){
          if(this.obj.facilityId == this.facilities[i].areaNId)
            this.facilityObject = this.facilities[i];
        }
      }

      if(this.obj.facilityType != null){
        for(let i=0; i< this.facilityTypeDetails.length; i++){
          if(this.obj.facilityType == this.facilityTypeDetails[i].id)
            this.facilityTypeObject = this.facilityTypeDetails[i];
        }
      }

    }else{
       if(this.states.length == 1){   
       this.stateObject = this.states[0];   
        this.obj.q1 = this.stateObject.areaNId;
        this.obj.q2 = null;
        // this.districts = this.area.transform(this.areas, {level: 3, parentAreaId: parseInt(this.obj.state)});
        this.districts = this.stateObject.children;
        this.obj.q3 = null;
        this.blocks = [];
        this.obj.facilityId = null;
        this.facilities = []; 
    
     }
    }

    if(this.obj.geopoint != null){
      this.gpsFlag = true;
      this.latitude = this.obj.geopoint.split(",")[0];
      this.longitude = this.obj.geopoint.split(",")[1];
    }

    //handle back button tap
    this.navBar.backButtonClick = (e:UIEvent)=>{
        this.cancel();
    }

    if(this.navParams.data.id === undefined){
       this.obj.planOfAction = [];
    }else{
    this.types=this.dataService.setMasterData();
      this.generalInformationForm = this.formBuilder.group({
          q1: [{ value: this.obj.q1, disabled: this.sent || this.finalized || this.forEdit}],
          q2: [{ value: this.obj.q2, disabled: this.sent || this.finalized || this.forEdit}],
          facilityType:[{ value: this.obj.facilityType, disabled: this.sent || this.finalized || this.forEdit}],
          q3: [{ value: this.obj.q3, disabled: this.sent || this.finalized || this.forEdit}],
          facilityId:[{ value: this.obj.facilityId, disabled: this.sent || this.finalized || this.forEdit}],
          q4: [{ value: this.obj.q4, disabled: this.sent || this.finalized }, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z .,]+$')])],
          q5: [{ value: this.obj.q5, disabled: this.sent || this.finalized || true}],
          q5a: [{ value: this.obj.q5a, disabled: this.sent || this.finalized}, Validators.compose([Validators.required])],
          q5b: [{ value: this.obj.q5b, disabled: this.sent || this.finalized || true}],
          q6: [{ value: this.organizationObject.organizationName, disabled: true},Validators.compose([Validators.required])],
          q7: [{ value: this.obj.q7, disabled: this.sent || this.finalized || true},Validators.compose([Validators.required])],
      });

        this.vhndAssessment = this.formBuilder.group({
              q11a: [{ value: this.obj.q11a, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
              q11b: [{ value: this.obj.q11b, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
              q11c: [{ value: this.obj.q11c, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
              q11d: [{ value: this.obj.q11d, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
              q11e: [{ value: this.obj.q11e, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
              q1p2: [{ value: this.obj.q1p2, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
              q1p3: [{ value: this.obj.q1p3, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
              q1p4: [{ value: this.obj.q1p4, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
              q1p5: [{ value: this.obj.q1p5, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      });

      this.interviewAnm = this.formBuilder.group({
                q21: [{ value: this.obj.q21, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
                q22: [{ value: this.obj.q22, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
                q23: [{ value: this.obj.q23, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
                q24: [{ value: this.obj.q24, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
                q25: [{ value: this.obj.q25, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
                q251: [{ value: this.obj.q251, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
                q26: [{ value: this.obj.q26, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
                q27: [{ value: this.obj.q27, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      });

   this.interviewAsha = this.formBuilder.group({
          q31: [{ value: this.obj.q31, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q31a: [{ value: this.obj.q31a, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q31b: [{ value: this.obj.q31b, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q31c: [{ value: this.obj.q31c, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q31d: [{ value: this.obj.q31d, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q311: [{ value: this.obj.q311, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q32: [{ value: this.obj.q32, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q321: [{ value: this.obj.q321, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q33: [{ value: this.obj.q33, disabled: this.sent || this.finalized},Validators.compose([Validators.maxLength(8), Validators.required])],
          q331: [{ value: this.obj.q331, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q34: [{ value: this.obj.q34, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q35: [{ value: this.obj.q35, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q36: [{ value: this.obj.q36, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
   });
this.aoecwAshaSchoolAwcs = this.formBuilder.group({
          q37a: [{ value: this.obj.q37a, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q37b: [{ value: this.obj.q37b, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q37c: [{ value: this.obj.q37c, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q37d: [{ value: this.obj.q37d, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q37e: [{ value: this.obj.q37e, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  });

  this.availabilityOfIfaWithAsha = this.formBuilder.group({
          q37fi: [{ value: this.obj.q37fi, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q37fii: [{ value: this.obj.q37fii, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  });

  this.availabilityOfIfaAtSchoolAwcs = this.formBuilder.group({
          q37gi: [{ value: this.obj.q37gi, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q37gii: [{ value: this.obj.q37gii, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q37h: [{ value: this.obj.q37h, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q37i: [{ value: this.obj.q37i, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q37j: [{ value: this.obj.q37j, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q37k: [{ value: this.obj.q37k, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q37l: [{ value: this.obj.q37l, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  });

  this.interviewWithOregnantWomanSection = this.formBuilder.group({
          q411: [{ value: this.obj.q411, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q412: [{ value: this.obj.q412, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q413: [{ value: this.obj.q413, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
  });

  this.interviewWithLactatingMotherWithBaby = this.formBuilder.group({
          q421: [{ value: this.obj.q421, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q422: [{ value: this.obj.q422, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q423a: [{ value: this.obj.q423a, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q423b: [{ value: this.obj.q423b, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q423c: [{ value: this.obj.q423c, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q423d: [{ value: this.obj.q423d, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q423e: [{ value: this.obj.q423e, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
          q423I: [{ value: this.obj.q423I, disabled: this.sent || this.finalized || true}],
  });

this.askAboutServiceSheReceivedAtFacility = this.formBuilder.group({
      q424a: [{ value: this.obj.q424a, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q424b: [{ value: this.obj.q424b, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q424c: [{ value: this.obj.q424c, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q424d: [{ value: this.obj.q424d, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q424e: [{ value: this.obj.q424e, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q424f: [{ value: this.obj.q424f, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q424g: [{ value: this.obj.q424g, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q424h: [{ value: this.obj.q424h, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q424i: [{ value: this.obj.q424i, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q424j: [{ value: this.obj.q424j, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
});

this.interviewMothertWithChild = this.formBuilder.group({
      q431: [{ value: this.obj.q431, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q431a: [{ value: this.obj.q431a, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q431b: [{ value: this.obj.q431b, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q432: [{ value: this.obj.q432, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q433: [{ value: this.obj.q433, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q434: [{ value: this.obj.q434, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q435: [{ value: this.obj.q435, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q436: [{ value: this.obj.q436, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q437: [{ value: this.obj.q437, disabled: this.sent || this.finalized || true}],
      q437a: [{ value: this.obj.q437a, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q437b: [{ value: this.obj.q437b, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q437c: [{ value: this.obj.q437c, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q437d: [{ value: this.obj.q437d, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q437e: [{ value: this.obj.q437e, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q437eI: [{ value: this.obj.q437eI, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
});

this.interviewWithBeneficiariesToMctfc = this.formBuilder.group({
      q441: [{ value: this.obj.q441, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q442: [{ value: this.obj.q442, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q443: [{ value: this.obj.q443, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q444: [{ value: this.obj.q444, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q445: [{ value: this.obj.q445, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q446a: [{ value: this.obj.q446a, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q446b: [{ value: this.obj.q446b, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q446c: [{ value: this.obj.q446c, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q447: [{ value: this.obj.q447, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
});

this.interviewWithFamilyHavingAdolescents = this.formBuilder.group({
      q451: [{ value: this.obj.q451, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q452: [{ value: this.obj.q452, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q453: [{ value: this.obj.q453, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
});

this.interviewWithHouseholdHomeDelivery = this.formBuilder.group({
      q461a: [{ value: this.obj.q461a, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q461b: [{ value: this.obj.q461b, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q461c: [{ value: this.obj.q461c, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q461d: [{ value: this.obj.q461d, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q461e: [{ value: this.obj.q461e, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q461eI: [{ value: this.obj.q461eI, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q462a: [{ value: this.obj.q462a, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q462b: [{ value: this.obj.q462b, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q462c: [{ value: this.obj.q462c, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q463: [{ value: this.obj.q463, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
});

this.interviewWithWifsNodalteacherAww = this.formBuilder.group({
      q471: [{ value: this.obj.q471, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q471a: [{ value: this.obj.q471a, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q472: [{ value: this.obj.q472, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q473: [{ value: this.obj.q473, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q474: [{ value: this.obj.q474, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q474a: [{ value: this.obj.q474a, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q475: [{ value: this.obj.q475, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
      q476: [{ value: this.obj.q476, disabled: this.sent || this.finalized},Validators.compose([Validators.required])],
});

this.geoCordinate=this.formBuilder.group({
      f_img: [{value: this.obj.f_img, disabled: this.sent || this.finalized}],
      s_img: [{value: this.obj.s_img, disabled: this.sent || this.finalized}],
      geopoint: [{ value: this.obj.geopoint, disabled: this.sent || this.finalized}],
      img1: [{ value: this.obj.img1, disabled: this.sent || this.finalized}],
      img2: [{ value: this.obj.img2, disabled: this.sent || this.finalized}],
      img3: [{ value: this.obj.img3, disabled: this.sent || this.finalized}]
});
    }
  }

  /**
 * This method gets called when we select a sector from sector dropdown
 */
  onclickSelect(){
    if(this.obj.facilityType==null || this.obj.facilityId==null){
        this.presentToast("Please select both facility and facility type before selecting any other section");
      }
  }
  onclickSubSectionSelect(){
    if(this.obj.q31==null || this.obj.q31==undefined || this.obj.q31==34){
        this.presentToast("As ASHA is not available for interview, therefore you cannot fill questions related to “interview with ASHA” section. Please select another section for continuing data entry.");
    }
  }
  onclickSelectDistrict(){
    if(this.obj.q1==null){
        this.presentToast("Please select the state before selecting district");
      }
  }
  onclickSelectFacilityType(){
    if(this.obj.q2==null){
        this.presentToast("Please select the district before selecting facility type");
      } 
  }
  onclickSelectBlock(){
    if(this.obj.q2==null){
        this.presentToast("Please select the district before selecting block");
      }
  }
  onclickSelectFacility(){
    if(this.obj.facilityType==null)
    { 
      this.presentToast("Please select the facility type before selecting facility");
    }else{
      if(this.obj.facilityType!=17)
      {
        if(this.obj.q3==null)
        {
          this.presentToast("Please select the block before selecting facility");
        } 
      }
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

/**
 * This method gets called when we select a sector from sector dropdown
 */
  emailValidation() {
    var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let splitvalObj = this.obj.q5a != null ? this.obj.q5a.split(/[ ,]+/) : null;
    if (splitvalObj != null) {
      for (let val of splitvalObj) {
        if (!EMAIL_REGEXP.test(val)) {
          this.generalInformationForm.controls['q5a'].setErrors({ "q5a_mismatch": true });
        } else {
          this.generalInformationForm.controls['q5a'].setErrors(null);
        }
      }
    }
  }
  sectorSelected(){
    this.scroll();
    this.sectorOrSubsectorNumber = 0;
    this.selectedSectorNumber = parseInt(this.selectedSector);
    this.sectorSelectionWork();
        if (this.obj.planOfAction.length > 0) {
          this.toggleGroup(this.shownGroup);
          if (!this.enableAdd && this.objectPlanofAction.sectionType !== this.sectorOrSubsectorNumber) {
            let confirm = this.alertCtrl.create({ enableBackdropDismiss: false });
            confirm.setCssClass('sectorSelectionModalFacility');
            confirm.setTitle(MessageProvider.MESSAGES.FACILITY_PAGE_CANCEL_CONFIRM_TITLE);
            confirm.setMessage(MessageProvider.MESSAGES.FACILITY_PAGE_PLAN_OF_ACTION_CONFIRM_MESSAGE_FOR_SECTOR);
            confirm.addButton({
              text: MessageProvider.MESSAGES.FACILITY_COMMUNITY_PAGE_CANCEL_CONFIRM_NEGATIVE_TEXT,
              role: 'cancel',
              handler: data => {
                this.selectedSector = "6";
                this.selectedSubsector = this.objectPlanofAction.sectionType;
                if(this.presentToastConfirm != undefined || this.presentToastConfirm != null){
                  this.presentToastConfirm.dismiss();
                }
              }
            });
            confirm.addButton({
              text: MessageProvider.MESSAGES.FACILITY_COMMUNITY_PAGE_CANCEL_CONFIRM_POSITIVE_TEXT,
              handler: data => {
                let index = this.obj.planOfAction.indexOf(this.objectPlanofAction);
                this.obj.planOfAction.splice(index, 1);
                this.objectPlanofAction = {};
                this.enableAdd = true;
              }
            });

            confirm.present();
          }
        }
        if (this.lvobj.length > 0) {
          this.toggleGroup1(this.shownGroup1);
        }
        if(this.navParams.data.id != undefined){
        if(document.getElementById('general_id')!=null){
          this.setPercentCSS('general_id',this.progressBarObj.loadProgress_General);
        }
        if(document.getElementById('vhnda_id')!=null){
          this.setPercentCSS('vhnda_id',this.progressBarObj.loadProgress_VHNDA);
        }
        if(document.getElementById('iwanm_id')!=null){
          this.setPercentCSS('iwanm_id',this.progressBarObj.loadProgress_IWANM);
        }
        if(document.getElementById('iasha_id')!=null){
          this.setPercentCSS('iasha_id',this.progressBarObj.loadProgress_IA_IASHA);
        }
        if(document.getElementById('iwpw_id')!=null){
          this.setPercentCSS('iwpw_id',this.progressBarObj.loadProgress_IB_IWPW);
        }
        if(document.getElementById('ib_plan_of_action_id')!=null){
          this.setPercentCSS('ib_plan_of_action_id',this.progressBarObj.loadProgress_Plan_Of_Action);
        }
        if(document.getElementById('geo_coordinate_id')!=null){
          this.setPercentCSS('geo_coordinate_id',this.progressBarObj.loadProgress_Geo_coordinate);
        }
    }  
    if(this.showSubsectors){
      if (this.platform.is('tablet')) {
        this.ioncontentHeight = "55";
        this.scrollHeight = "94";
      } else {
        this.ioncontentHeight = "55";
        this.scrollHeight = "90";
      }
    } else {
        this.ioncontentHeight="0";
        this.scrollHeight="100";
    }  
    switch(this.sectorOrSubsectorNumber){
      case 1:
      this.show_general_progressbar = false;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 2:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = false;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 3:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = false;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 41:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = false;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 42:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = false;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 43:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = false;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 44:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = false;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 51:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = false;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 52:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = false;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 53:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = false;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 54:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = false;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 55:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = false;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 56:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = false;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 57:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = false;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 58:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = false;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 112:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 113:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 114:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 115:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 116:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 7:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = false;
      break;
    }
  }

/**
 * This method gets called when we select a subsector from subsectors dropdown
 */
  subsectorSelected(){
    this.scroll();
    this.selectedSubSectorNumber = parseInt(this.selectedSubsector);  
    this.sectorOrSubsectorNumber = this.selectedSubSectorNumber;
    if(this.lvobj.length >0){
      this.toggleGroup1(this.shownGroup1);
    }
    if (this.obj.planOfAction.length > 0) {
      this.toggleGroup(this.shownGroup);
    }
    if(this.navParams.data.id != undefined){
        if(document.getElementById('iasha_id')!=null){
          this.setPercentCSS('iasha_id',this.progressBarObj.loadProgress_IA_IASHA);
        }
        if(document.getElementById('aoecwasa_id')!=null){
          this.setPercentCSS('aoecwasa_id',this.progressBarObj.loadProgress_IA_AOECWASA);
        }
        if(document.getElementById('aiwa_id')!=null){
          this.setPercentCSS('aiwa_id',this.progressBarObj.loadProgress_IA_AIWA);
        }
        if(document.getElementById('aisa_id')!=null){
          this.setPercentCSS('aisa_id',this.progressBarObj.loadProgress_IA_AISA);
        }
        if(document.getElementById('iwpw_id')!=null){
          this.setPercentCSS('iwpw_id',this.progressBarObj.loadProgress_IB_IWPW);
        }
        if(document.getElementById('iwlmwmb_id')!=null){
          this.setPercentCSS('iwlmwmb_id',this.progressBarObj.loadProgress_IB_IWLMWMB);
        }
        if(document.getElementById('aassrfwsd_id')!=null){
          this.setPercentCSS('aassrfwsd_id',this.progressBarObj.loadProgress_IB_AASSRFWSD);
        }
        if(document.getElementById('ib_imwcm_id')!=null){
          this.setPercentCSS('ib_imwcm_id',this.progressBarObj.loadProgress_IB_IMWCM);
        }
        if(document.getElementById('iwbmpwpm_id')!=null){
          this.setPercentCSS('iwbmpwpm_id',this.progressBarObj.loadProgress_IB_IWBMPWPM);
        }
        if(document.getElementById('ib_iwfha_id')!=null){
          this.setPercentCSS('ib_iwfha_id',this.progressBarObj.loadProgress_IB_IWFHA);
        }
        if(document.getElementById('ib_ihhd_id')!=null){
          this.setPercentCSS('ib_ihhd_id',this.progressBarObj.loadProgress_IB_IHHD);
        }
        if(document.getElementById('ib_saiwwnta_id')!=null){
          this.setPercentCSS('ib_saiwwnta_id',this.progressBarObj.loadProgress_IB_SAIWWNTA);
        }
    }  
    switch(this.sectorOrSubsectorNumber){
      case 1:
      this.show_general_progressbar = false;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 2:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = false;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 3:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = false;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 41:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = false;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 42:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = false;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 43:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = false;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 44:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = false;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 51:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = false;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 52:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = false;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 53:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = false;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 54:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = false;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 55:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = false;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 56:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = false;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 57:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = false;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 58:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = false;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 112:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = true;
      break;
      case 7:
      this.show_general_progressbar = true;
      this.show_VHNDA_progressbar = true;
      this.show_IWANM_progressbar = true;
      this.show_IA_IASHA_progressbar = true;
      this.show_IA_AOECWASA_progressbar = true;
      this.show_IA_AIWA_progressbar = true;
      this.show_IA_AISA_progressbar = true;
      this.show_IB_IWPW_progressbar = true;
      this.show_IB_IWLMWMB_progressbar = true;
      this.show_IB_AASSRFWSD_progressbar = true;
      this.show_IB_IMWCM_progressbar = true;
      this.show_IB_IWBMPWPM_progressbar = true;
      this.show_IB_IWFHA_progressbar = true;
      this.show_IB_IHHD_progressbar = true;
      this.show_IB_SAIWWNTA_progressbar = true;
      this.show_Geo_Coordinate_progressbar = false;
      break;
    }
    if (this.sectorOrSubsectorNumber === 112 ||
      this.sectorOrSubsectorNumber === 113 ||
      this.sectorOrSubsectorNumber === 114 ||
      this.sectorOrSubsectorNumber === 115 ||
      this.sectorOrSubsectorNumber === 116) {
      if (!this.enableAdd && this.objectPlanofAction.sectionType !== this.sectorOrSubsectorNumber) {
        let confirm = this.alertCtrl.create({ enableBackdropDismiss: false });
        confirm.setCssClass('sectorSelectionModalFacility');
        confirm.setTitle(MessageProvider.MESSAGES.FACILITY_PAGE_CANCEL_CONFIRM_TITLE);
        confirm.setMessage(MessageProvider.MESSAGES.FACILITY_PAGE_PLAN_OF_ACTION_CONFIRM_MESSAGE);
        confirm.addButton({
          text: MessageProvider.MESSAGES.FACILITY_COMMUNITY_PAGE_CANCEL_CONFIRM_NEGATIVE_TEXT,
          role: 'cancel',
          handler: data => {
            this.selectedSubsector = this.objectPlanofAction.sectionType;
          }
        });
        confirm.addButton({
          text: MessageProvider.MESSAGES.FACILITY_COMMUNITY_PAGE_CANCEL_CONFIRM_POSITIVE_TEXT,
          handler: data => {
            //this.obj.planOfAction.pop();
            let index = this.obj.planOfAction.indexOf(this.objectPlanofAction);
            this.obj.planOfAction.splice(index, 1);
            this.objectPlanofAction = {};
            this.enableAdd = true;
          }
        });

        confirm.present();
      }

    }
  }

/**
 * This method is going to do the initial setup of questions and subsectors
 */
  sectorSelectionWork(){
      this.facilityTypeWiseScore();  
      let sectors = this.sectors.filter(sector=>sector.id===this.selectedSectorNumber);
      if(sectors[0].hasSubsector){        
        this.subsectors = sectors[0].subsectors;
        switch(sectors[0].id){
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
        let confirm = this.alertCtrl.create({enableBackdropDismiss:false});
        confirm.setCssClass('sectorSelectionModalCommunity');
        confirm.setTitle(MessageProvider.MESSAGES.FACILITY_PAGE_CANCEL_CONFIRM_TITLE);
        confirm.setMessage(MessageProvider.MESSAGES.FACILITY_PAGE_CANCEL_MESSAGE);
        confirm.addButton(MessageProvider.MESSAGES.FACILITY_COMMUNITY_PAGE_CANCEL_CONFIRM_NEGATIVE_TEXT);
        confirm.addButton({
          text: MessageProvider.MESSAGES.FACILITY_COMMUNITY_PAGE_CANCEL_CONFIRM_POSITIVE_TEXT,
          handler: data => {
            this.navCtrl.pop();
          }
        });
        confirm.present();
  }
  removePlanOfActionItem(object) {
    let temp = this;
    let confirm = temp.alertCtrl.create({enableBackdropDismiss:false});
        confirm.setCssClass('sectorSelectionModalFacility');
        confirm.setTitle(MessageProvider.MESSAGES.FACILITY_PAGE_CANCEL_CONFIRM_TITLE);
        confirm.setMessage('Are you sure you want to delete?');
        confirm.addButton(MessageProvider.MESSAGES.FACILITY_COMMUNITY_PAGE_CANCEL_CONFIRM_NEGATIVE_TEXT);
        confirm.addButton({
          text: MessageProvider.MESSAGES.FACILITY_COMMUNITY_PAGE_CANCEL_CONFIRM_POSITIVE_TEXT,
          handler: () => {
            temp.toggleGroup(temp.shownGroup);
            if(this.lvobj.length >0){
              this.toggleGroup1(this.shownGroup1);
            }
            let index = temp.obj.planOfAction.indexOf(object);
            temp.obj.planOfAction.splice(index, 1);
            temp.getValidateAcordion(object);
            }
          });
        confirm.present();
  }

  getValidateAcordion(paObject) {
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
    if(this.lvobj.length >0){
      this.toggleGroup1(this.shownGroup1);
    }
    let majorFindings: string = "";
    if(this.sectorOrSubsectorNumber === 112){ majorFindings="VHND" }
    if(this.sectorOrSubsectorNumber === 113){ majorFindings = "ANM" }
    if(this.sectorOrSubsectorNumber === 114){ majorFindings = "ASHA" }
    if(this.sectorOrSubsectorNumber === 115) { majorFindings = "Household" }
    if(this.sectorOrSubsectorNumber === 116){ majorFindings = "School/AWC" }
    let tempobject={
      majorFindings: majorFindings,
      intervention_activities: "",
      levelOfIntervention: null, responsibility: null, timeline: null,
      sectionType: this.sectorOrSubsectorNumber,
      organizationId : null
    };
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
        && d.level == level && d.areaId == temp.stateObject.areaNId && d.isResponsibleCommunity);
    }
  }
  planofactionObjectAssign(paObject){
    this.objectPlanofAction=paObject;
  }

  shownGroup1 = null;
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


  validate_c5_OtherField(val: any,facilityObj){
        
    if(val != null && facilityObj !=null){
        if(val.id != null && !this.forEdit && !this.facilityTypeDisable){
          this.disabledSector = false;
        
          let confirm = this.alertCtrl.create({enableBackdropDismiss:false});
            confirm.setCssClass('sectorSelectionModalFacility');
            confirm.setTitle("Warning");
            confirm.setMessage(MessageProvider.MESSAGES.FACILITY_TYPE_CONFIRMATION);
            confirm.addButton({
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
                  //facil._overlay.data["inputs"][1].checked=false;
                  let facilityObj_tem:any=facilityObj._options._results;
                  for(var i=0; i < facilityObj_tem.length; i++) {
                      facilityObj._options._results[i].selected=false;
                  }
                  this.obj.facilityType=null;
                  this.facilityTypeObject = null;
                  this.facilityTypeDisable=false;
              }
            })
            confirm.addButton({
              text: "Ok",
              handler: data => {
                this.facilityTypeDisable=true;
                this.facilityTypeDisableStatus=true;
              }
            });
            confirm.present();

         }
    }
  }

  validate_q7_OtherField(val){
    if(Number(val)==25){
      this.generalInformationForm.controls['q7_a'].setErrors({"q7_a_mismatch": true});
    }else{
      this.obj.q7_a=null;
      this.generalInformationForm.controls['q7_a'].setErrors(null);
    }
  }
  validate_q437e_OtherField(val){
    if(Number(this.obj.q437e)==26){
      this.interviewMothertWithChild.controls['q437eI'].setErrors({"q437eI_a_mismatch": true});
    }else{
      this.obj.q437eI=null;
      this.interviewMothertWithChild.controls['q437eI'].setErrors(null);
    }
  }
  validate_q461e_OtherField(val){
    if(Number(this.obj.q461e)==26){
      this.interviewWithHouseholdHomeDelivery.controls['q461eI'].setErrors({"q461eI_a_mismatch": true});
    }else{
      this.obj.q461eI=null;
      this.interviewWithHouseholdHomeDelivery.controls['q461eI'].setErrors(null);
    }
  }
  validateq1p4Field(val: any){
    if(Number(val)==40){
     this.obj.q1p5=null;
     this.vhndAssessment.controls['q1p5'].setErrors(null);
    }
 }
 validateq31OptionalField(val: any){
  if(Number(val)==34){

    this.interviewAsha.controls["q31a"].setErrors(null);
    this.interviewAsha.controls["q31b"].setErrors(null);
    this.interviewAsha.controls["q31c"].setErrors(null);
    this.interviewAsha.controls["q31d"].setErrors(null);
    this.interviewAsha.controls["q311"].setErrors(null);
    this.interviewAsha.controls["q32"].setErrors(null);
    this.interviewAsha.controls["q321"].setErrors(null);
    this.interviewAsha.controls["q33"].setErrors(null);
    this.interviewAsha.controls["q331"].setErrors(null);
    this.interviewAsha.controls["q34"].setErrors(null);
    this.interviewAsha.controls["q35"].setErrors(null);
    this.interviewAsha.controls["q36"].setErrors(null);
    this.aoecwAshaSchoolAwcs.controls["q37a"].setErrors(null);
    this.aoecwAshaSchoolAwcs.controls["q37b"].setErrors(null);
    this.aoecwAshaSchoolAwcs.controls["q37c"].setErrors(null);
    this.aoecwAshaSchoolAwcs.controls["q37d"].setErrors(null);
    this.aoecwAshaSchoolAwcs.controls["q37e"].setErrors(null);
    this.availabilityOfIfaWithAsha.controls["q37fi"].setErrors(null);
    this.availabilityOfIfaWithAsha.controls["q37fii"].setErrors(null);
    this.availabilityOfIfaAtSchoolAwcs.controls["q37gi"].setErrors(null);
    this.availabilityOfIfaAtSchoolAwcs.controls["q37gii"].setErrors(null);
    this.availabilityOfIfaAtSchoolAwcs.controls["q37h"].setErrors(null);
    this.availabilityOfIfaAtSchoolAwcs.controls["q37i"].setErrors(null);
    this.availabilityOfIfaAtSchoolAwcs.controls["q37j"].setErrors(null);
    this.availabilityOfIfaAtSchoolAwcs.controls["q37k"].setErrors(null);
    this.availabilityOfIfaAtSchoolAwcs.controls["q37l"].setErrors(null);
  }
}
  validateq32Field(val: any){
    if(Number(val)==27||Number(val)==29){
     this.obj.q321=null;
     this.interviewAsha.controls['q321'].setErrors(null);
    }
 }
  validateq437eField(val: any){
     if(Number(val)==27||Number(val)==29){
      this.obj.q437eI=null;
      this.interviewMothertWithChild.controls['q437eI'].setErrors(null);
     }
  }
  validateq461eField(val: any){
     if(Number(val)==27||Number(val)==29){
       this.obj.q461eI=null;
       this.interviewWithHouseholdHomeDelivery.controls['q461eI'].setErrors(null);
     }
  }
  validateq421Field(val: any){
    if(Number(val)==27 || Number(val)==29){

      this.obj.q422= null;
      this.obj.q423a= null;
      this.obj.q423b= null;
      this.obj.q423c= null;
      this.obj.q423d= null;
      this.obj.q423e= null;
      this.communityRadioObj["q422"] = false;
      this.communityRadioObj["q423a"] = false;
      this.communityRadioObj["q423b"] = false;
      this.communityRadioObj["q423c"] = false;
      this.communityRadioObj["q423d"] = false;
      this.communityRadioObj["q423e"] = false;

      this.communityRadioTempObj["q422"] = null
      this.communityRadioTempObj["q423a"] = null
      this.communityRadioTempObj["q423b"] = null
      this.communityRadioTempObj["q423c"] = null
      this.communityRadioTempObj["q423d"] = null
      this.communityRadioTempObj["q423e"] = null

      this.interviewWithLactatingMotherWithBaby.controls["q422"].setErrors(null);
      this.interviewWithLactatingMotherWithBaby.controls["q423a"].setErrors(null);
      this.interviewWithLactatingMotherWithBaby.controls["q423b"].setErrors(null);
      this.interviewWithLactatingMotherWithBaby.controls["q423c"].setErrors(null);
      this.interviewWithLactatingMotherWithBaby.controls["q423d"].setErrors(null);
      this.interviewWithLactatingMotherWithBaby.controls["q423e"].setErrors(null);

    }
  }

  validateq431Field(val: any){
    if(Number(val)==27 || Number(val)==29){

      this.obj.q431b= null;
      
      this.communityRadioObj["q431b"] = false;

      this.communityRadioTempObj["q431b"] = null

      this.interviewMothertWithChild.controls["q431b"].setErrors(null);

    }
  }

  validateq441Field(val: any){
    if(Number(val)==27 || Number(val)==29){
      this.obj.q442= null;
      this.obj.q443= null;
      this.obj.q444= null;
      this.obj.q445= null;
      this.obj.q446a= null;
      this.obj.q446b= null;
      this.obj.q446c= null;
      this.obj.q447= null;
      this.communityRadioObj["q442"] = false;
      this.communityRadioObj["q443"] = false;
      this.communityRadioObj["q444"] = false;
      this.communityRadioObj["q445"] = false;
      this.communityRadioObj["q446a"] = false;
      this.communityRadioObj["q446b"] = false;
      this.communityRadioObj["q446c"] = false;
      this.communityRadioObj["q447"] = false;

      this.communityRadioTempObj["q442"] = null
      this.communityRadioTempObj["q443"] = null
      this.communityRadioTempObj["q444"] = null
      this.communityRadioTempObj["q445"] = null
      this.communityRadioTempObj["q446a"] = null
      this.communityRadioTempObj["q446b"] = null
      this.communityRadioTempObj["q446c"] = null
      this.communityRadioTempObj["q447"] = null

      this.interviewWithBeneficiariesToMctfc.controls["q442"].setErrors(null);
      this.interviewWithBeneficiariesToMctfc.controls["q443"].setErrors(null);
      this.interviewWithBeneficiariesToMctfc.controls["q444"].setErrors(null);
      this.interviewWithBeneficiariesToMctfc.controls["q445"].setErrors(null);
      this.interviewWithBeneficiariesToMctfc.controls["q446a"].setErrors(null);
      this.interviewWithBeneficiariesToMctfc.controls["q446b"].setErrors(null);
      this.interviewWithBeneficiariesToMctfc.controls["q446c"].setErrors(null);
      this.interviewWithBeneficiariesToMctfc.controls["q447"].setErrors(null);
    }
  }

  validateq331Field(val: any){
    if(this.obj.q33==0 || this.obj.q33==null || this.obj.q33==""){
      this.isq33 = false;
      this.obj.q331 = null;
      this.communityRadioObj["q331"] = false;
		  this.communityRadioTempObj["q331"] = null
		  this.interviewAsha.controls["q331"].setErrors(null);
		  for(let ids of [24]) {
          this.deleteRowsfromCounterObj(ids);
      }
    }
  }

/**
 * This method is going to handle finalize button event
 */
  finalize(){
      //validate for mandatory fields
      //if there any error show that error otherwise finalize and save the form
      //then pass the controll to home page
      if (this.getValidateAcordion(this.objectPlanofAction)) {
            let confirm = this.alertCtrl.create({ enableBackdropDismiss: false });
            confirm.setCssClass('sectorSelectionModalFacility');
            confirm.setTitle("Warning");
            confirm.setMessage(MessageProvider.MESSAGES.PLAN_OF_ACTION);
            confirm.addButton({
              text: "Cancel",
              handler: data => {
                confirm.dismiss;
              }
            });
            confirm.addButton({
              text: "Ok",
              handler: data => {
              }
            });
            confirm.present();
            return true;
          } else {
            this.forSaveStatus = true;
       this.validateq1p4Field(this.obj.q1p4);
       this.validateq31OptionalField(this.obj.q31);
       this.validateq32Field(this.obj.q32);
       this.validateq437eField(this.obj.q437e);
       this.validateq461eField(this.obj.q461e);
       this.validateq421Field(this.obj.q421);
       this.validateq431Field(this.obj.q431);
       this.validateq441Field(this.obj.q441);
       this.validateq331Field(this.obj.q331);
       this.finalizeAttempt = true;
       this.gForm = true
       this.emailValidation();
       if(this.generalInformationForm.valid &&
          this.vhndAssessment.valid &&
          this.interviewAnm.valid &&      
          this.interviewAsha.valid &&    
          this.aoecwAshaSchoolAwcs.valid &&
          this.availabilityOfIfaWithAsha.valid &&
          this.availabilityOfIfaAtSchoolAwcs.valid &&
          this.interviewWithOregnantWomanSection.valid &&
          this.interviewWithLactatingMotherWithBaby.valid &&
          this.askAboutServiceSheReceivedAtFacility.valid &&
          this.interviewMothertWithChild.valid &&
          this.interviewWithBeneficiariesToMctfc.valid &&
          this.interviewWithFamilyHavingAdolescents.valid &&
          this.interviewWithHouseholdHomeDelivery.valid &&
          this.interviewWithWifsNodalteacherAww.valid
        )
          {
          let confirm = this.alertCtrl.create({enableBackdropDismiss:false});
            confirm.setCssClass('sectorSelectionModalCommunity');
            confirm.setTitle("Warning");
            confirm.setMessage("Are you sure you want to finalize the form?");
            confirm.addButton({
            text: "Cancel",
            handler: data => {
              confirm.dismiss;
            }});
            confirm.addButton({
            text: "Ok",
            handler: data => {

              if(this.obj.q423I == "Yes"){
                this.obj.q423I = "33";
              } else {
                this.obj.q423I = "34";
              }
              if(this.obj.q437 == "Yes"){
                this.obj.q437 = "33";
              } else {
                this.obj.q437 = "34";
              }

              if(this.obj.q421==27 || this.obj.q421==29 || this.obj.q421==null){
                this.obj.q423I = null;
              }
              this.facilityTypeWiseScore();
              this.obj.note1 = this.e1Score;
              this.obj.note11 = this.obj.c_VHNDA_score;
              
              this.obj.note2 = this.e2Score;
              this.obj.note21 = this.obj.c_IWANM_score;

              this.obj.note3b = this.e3Score + this.e4Score + this.e5Score + this.e6Score;
              this.obj.note31b = this.obj.c_IA_IASHA_score + this.obj.c_IA_AOECWASA_score +
              this.obj.c_IA_AIWA_score + this.obj.c_IA_AISA_score;

              this.obj.note4a = this.e7Score + this.e8Score + this.e9Score + this.e10Score +
              this.e11Score + this.e12Score + this.e13Score + this.e14Score;
              this.obj.note41a = this.obj.c_IB_IWPW_score + this.obj.c_IB_IWLMWMB_score +
              this.obj.c_IB_AASSRFWSD_score + this.obj.c_IB_IMWCM_score + this.obj.c_IB_IWBMPWPM_score +
              this.obj.c_IB_IWFHA_score + this.obj.c_IB_IHHD_score + this.obj.c_IB_SAIWWNTA_score;

              this.obj.note5a = this.obj.note1 + this.obj.note2 + this.obj.note3b + this.obj.note4a;
              this.obj.note51a = this.obj.note41a + this.obj.note31b + this.obj.note21 + this.obj.note11;

              this.obj.c_IA_IASHA_score_max = this.e3Score;
              this.obj.c_IA_AOECWASA_score_max = this.e4Score;
              this.obj.c_IA_AIWA_score_max = this.e5Score;
              this.obj.c_IA_AISA_score_max = this.e6Score;
              this.obj.c_IB_IWPW_score_max = this.e7Score;
              this.obj.c_IB_IWLMWMB_score_max = this.e8Score;
              this.obj.c_IB_AASSRFWSD_score_max = this.e9Score;
              this.obj.c_IB_IMWCM_score_max = this.e10Score;
              this.obj.c_IB_IWBMPWPM_score_max = this.e11Score;
              this.obj.c_IB_IWFHA_score_max = this.e12Score;
              this.obj.c_IB_IHHD_score_max = this.e13Score;
              this.obj.c_IB_SAIWWNTA_score_max = this.e14Score;
              // this.obj.deviceid = MessageProvider.DEVICE_UUID;
              
              this.obj.date = this.datePipe.transform(this.today, 'dd-MM-y');
              this.dataService.saveCommunityData(this.obj, this.forEdit, true, this.navParams.data.id, this.formInfo,this.clickCounterObj, this.progressBarObj);
            }});
        confirm.present();          
       }else if(!this.generalInformationForm.valid){
        this.presentToast("Please fillup mandatory fields of General Information Section");
        this.selectedSector="1";
        this.selectedSubsector = "1";
       }else if(!this.vhndAssessment.valid){
        this.presentToast("Please fillup mandatory fields of VHND Assessment Section");
        this.selectedSector="2";
        this.selectedSubsector = "2";
      }else if(!this.interviewAnm.valid){
        this.presentToast("Please fillup mandatory fields of Interview with ANM Section");
        this.selectedSector="3";
        this.selectedSubsector = "3";
      }else if(!this.interviewAsha.valid){
        this.presentToast("Please fillup mandatory fields of Incentives to ASHA Section");
        this.selectedSector="4";
        this.selectedSubsector = "41";
      }else if(!this.aoecwAshaSchoolAwcs.valid){
        this.presentToast("Please fillup mandatory fields of Availability of essential commodities with ASHA/School/AWCs Section");
        this.selectedSector="4";
        setTimeout( () => {
              this.selectedSubsector = "42";
            }, 50)
      }else if(!this.availabilityOfIfaWithAsha.valid){
        this.presentToast("Please fillup mandatory fields of Availability of IFA with ASHA Section");
        this.selectedSector="4";
        setTimeout( () => {
              this.selectedSubsector = "43";
            }, 50)
      }else if(!this.availabilityOfIfaAtSchoolAwcs.valid){
        this.presentToast("Please fillup mandatory fields of Availability of IFA at school/AWCs Section");
        this.selectedSector="4";
        setTimeout( () => {
              this.selectedSubsector = "44";
            },50)
      }else if(!this.interviewWithOregnantWomanSection.valid){
        this.presentToast("Please fillup mandatory fields of Interview with Pregnant woman Section");
        this.selectedSector="5";
        this.selectedSubsector = "51";
       }else if(!this.interviewWithLactatingMotherWithBaby.valid){
         this.presentToast("Please fillup mandatory fields of Interview with Lactating mother with 0-6 months baby (based on recall) Section");
         this.selectedSector="5";
         setTimeout( () => {
              this.selectedSubsector = "52";
            }, 50)
      }else if(!this.askAboutServiceSheReceivedAtFacility.valid){
        this.presentToast("Please fillup mandatory fields of Ask about services she received at the facility where she delivered Section");
        this.selectedSector="5";
        setTimeout( () => {
              this.selectedSubsector = "53";
            }, 50)
      }else if(!this.interviewMothertWithChild.valid){
        this.presentToast("Please fillup mandatory fields of Interview mother with a child of 6 months - 2 years Section");
        this.selectedSector="5";
        setTimeout( () => {
              this.selectedSubsector = "54";
            }, 50)
      }else if(!this.interviewWithBeneficiariesToMctfc.valid){
        this.presentToast("Please fillup mandatory fields of Interview with beneficiaries (Mothers & Pregnant women) pertaining to MCTFC Section");
        this.selectedSector="5";
        setTimeout( () => {
              this.selectedSubsector = "55";
            }, 50)
      }else if(!this.interviewWithFamilyHavingAdolescents.valid){
        this.presentToast("Please fillup mandatory fields of Interview with family having Adolescents Section");
        this.selectedSector="5";
        setTimeout( () => {
              this.selectedSubsector = "56";
            }, 50)
      }else if(!this.interviewWithHouseholdHomeDelivery.valid){
        this.presentToast("Please fillup mandatory fields of Interview with Household with Home delivery Section");
        this.selectedSector="5";
        setTimeout( () => {
              this.selectedSubsector = "57";
            }, 50)
      }else if(!this.interviewWithWifsNodalteacherAww.valid){
        this.presentToast("Please fillup mandatory fields of School/AWC visit- Interview with WIFS Nodal teacher/AWW Section  ");
        this.selectedSector="5";
        setTimeout( () => {
              this.selectedSubsector = "58";
            }, 50)
      }
  }
  }
  _alphabetsKeyDown(e) {
   if (e.target["value"].length > 200) {
     e.target["value"] = e.target["value"].substring(0, e.target["value"].length - 1);
   }
  }
  _alphabetsKeyPress(event) {
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
  // _numberKeyUp(event,value: string, object) {
  //   let index=this.obj.planOfAction.indexOf(object);
  //   try{
  //     if(value=="" || Number(value) > 12 || Number(value) <= 0){
  //       event.target["value"]="";
  //       this.obj.planOfAction[index].timeline="";
  //     }else{
  //       this.obj.planOfAction[index].timeline = value.replace(/[&\/\\#,+-.|/\{}?]/g, '');
  //       event.target["value"]=this.obj.planOfAction[index].timeline;
  //       if(Number(event.target["value"]) > 12 || Number(event.target["value"]) <= 0){
  //         event.target["value"]="";
  //         this.obj.planOfAction[index].timeline="";
  //       }
  //     }
  //   }catch(e){
  //     event.target["value"]="";
  //     this.obj.planOfAction[index].timeline = "";
  //   }
  // }
  _lengthKeyPress(event: any) {
    if (event.target["value"].length >= 200) {
      event.target["value"] = event.target["value"].substring(0, event.target["value"].length - 1);
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
  onblurAhValidate(val){
    if(val==1){
      this.obj.q251=null;
    }else{
      if(Number(this.obj.q25)<Number(this.obj.q251)){
        this.obj.q251 = null;
        this.interviewAnm.controls['q251'].setErrors({"q251_mismatch": true});
      }
      if(this.obj.q25 == "" || this.obj.q25 == null) {
        this.obj.q251 = null;
      }
    }
  }
  _validate_q33(e){
    alert(e);
  }
/**
 * This method is going to handle save button event
 */
  save(){
      //validate and send the data to dataservice for saving purpose
      if (this.getValidateAcordion(this.objectPlanofAction)) {
                let confirm = this.alertCtrl.create({ enableBackdropDismiss: false });
                confirm.setCssClass('sectorSelectionModalFacility');
                confirm.setTitle("Warning");
                confirm.setMessage(MessageProvider.MESSAGES.PLAN_OF_ACTION);
                confirm.addButton({
                  text: "Cancel",
                  handler: data => {
                    confirm.dismiss;
                  }
                });
                confirm.addButton({
                  text: "Ok",
                  handler: data => {
                  }
                });
                confirm.present();
                return true;
              } else {
          this.gForm = true
          this.finalizeAttempt = false;
          if(this.obj.q5a == null || this.obj.q5a == ""){
            this.obj.q5a = null;
            this.generalInformationForm.controls['q5a'].setErrors(null);
          }
          this.emailValidation();
          if(this.generalInformationForm.valid ){
            this.obj.date = this.datePipe.transform(this.today, 'dd-MM-y');
            this.dataService.saveCommunityData(this.obj, this.forEdit, false, this.navParams.data.id, this.formInfo, this.clickCounterObj, this.progressBarObj);
          }else if(!this.generalInformationForm.valid){
            this.presentToast("Please fillup mandatory fields of General Information");
            this.selectedSector="1";
            this.selectedSubsector = "1";
          }
    }
  }

onPaste(e: any,a) {
  setTimeout(() => {
      this.obj[a] = null;
  }, 0);
}

onPastePOA(e: any,a,name) {
  let index = this.obj.planOfAction.indexOf(a);
  setTimeout(() => {
      this.obj.planOfAction[index][name] = null;
  }, 0);
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
  
     this.presentToastConfirm = this.alertCtrl.create({ enableBackdropDismiss: false });
     this.presentToastConfirm.setCssClass('sectorSelectionModalCommunity');
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
    this.obj.q1 = this.stateObject.areaNId;
    this.obj.q2 = null;
    // this.districts = this.area.transform(this.areas, {level: 3, parentAreaId: parseInt(this.obj.state)});
    this.districts = this.stateObject.children;
    this.obj.q3 = null;
    this.blocks = [];
    this.obj.facilityId = null;
    this.facilities = []; 
    }
  }


/**
 * This method is going to get executed when user will select a district
 */
  districtSelected(){
    if(this.districtObject !=null){
    this.obj.q2 = this.districtObject.areaNId;
    this.formInfo.districtName = this.districtObject.name;
    this.obj.q3 = null;
    this.obj.facilityId = null;
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
  }

  /**
 * This method is going to get executed when user will select a district
 */
  blockSelected(){
    if(this.blockObject!=null){
      this.obj.q3 = this.blockObject.areaNId;
      this.formInfo.blockName = this.blockObject.name;
      this.obj.facilityId = null;
      this.facilities = [];
      // this.facilities = this.area.transform(this.areas, {level: 5, parentAreaId: parseInt(this.obj.block)});
      let type = null;
      switch(this.obj.facilityType){ //this.facilityTypeObject.name
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
    }
  }


  /**
 * This method is going to get executed when user will select a district
 */
  facilitySelected(){

    if(this.facilityObject != null && this.facilityObject != undefined
    && this.facilityObject.areaNId != null && this.facilityObject.areaNId != undefined
    ){
        this.obj.facilityId = this.facilityObject.areaNId;
        this.messageService.presentLoading("Validating, please wait...");
        if(this.facilityObject.facilityInchargeEmailId != null){
          this.obj.q5a = this.facilityObject.facilityInchargeEmailId
        }        
        this.dataService.getPreviousDataFromDB(this.facilityObject.areaNId, MessageProvider.CHECKLIST_ID.COMMUNITY);
    } else {
      this.obj.q5a = null
    }
  }

  /**
   * This method will work when a type has been selected.
   */
  facilityTypeSelected(){
    if(this.facilityTypeObject != null){
      this.obj.facilityType = this.facilityTypeObject.id;
      this.formInfo.facilityTypeName = this.facilityTypeObject.name;
    }
  }

  /**
 * Default camera options
 */
options: CameraOptions = {
  quality: 40,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
}

/**
 * This method will be used for capturing images
 * @author Ratikanta
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
      case "img2":
       this.obj.img2 = 'data:image/jpeg;base64,' + imageData;
      break;
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
 * @author Ratikanta
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
 * @author Ratikanta
 */
_handleReaderLoaded(e) {
        var reader = e.target;
        this.imageSrc = reader.result;
        if(this.imageType == 'img1'){
          this.obj.img1 = this.imageSrc;
        }else if(this.imageType == 'img2'){
           this.obj.img2 = this.imageSrc;
        }else{
          this.obj.img3 = this.imageSrc;  
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

  gpsOptions1 : Object = {
    'enableHighAccuracy' : true
  }
  

  captureGPS(){
    let temp = this;
    try{
      if(!temp.platform.is('core') && temp.platform.is('cordova')){
        temp.backgroundGeolocation.isLocationEnabled().then((resp) =>{
          resp == 1 ? temp.captureGPS1() : temp.switchToLocationSettings();
        });
      }else{
        temp.captureGPS1();
      }
    }catch(err){
      temp.messageService.dismissLoading();
      temp.errorToast('Error ' + err);
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
          case 1 : break; //this.errorToast('Please allow eSS to acess device\'s location to capture GPS'); break;
          case 3 : this.errorToast('Timeout, please try again.'); break;
          default : this.errorToast('Error getting location' + error.code + " " +error.message); break;
        }
        // console.log('Error getting location', error.code + " " +error.message);
      });
  }

  switchToLocationSettings(){
    let confirm = this.alertCtrl.create({
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
    confirm.setCssClass('sectorSelectionModalCommunity');
    confirm.present();
  }

 checkForImage(type) {
    let temp = this;
    temp.img1 = document.getElementsByName('img1');
    temp.img2 = document.getElementsByName('img2');
    temp.img3 = document.getElementsByName('img3');

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
      }else if(type == 'save'){
        temp.save();
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
              }else if(type == 'save'){
                temp.save();
              }       
          }
          break;
          case 2:            
             if(type == 'finalize'){
                temp.finalize();
              }else if(type == 'save'){
                temp.save();
              }    
          break;
        }
      },100)
    }
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  sigModal : any;
  openSigModal(designation) {
    let obj = { type : designation };
    this.sigModal = this.modalCtrl.create(SignatureModalPage, obj);

    this.sigModal.onDidDismiss(data => {
       if(data != null && data.signature != null){
          switch(data.type){
            case "facility": 
            this.obj.f_img = data.signature;
            // document.getElementById('facility_incharge_id').setAttribute('src',data.signature);
             break;
            case "supervisor": 
            this.obj.s_img = data.signature; 
              // document.getElementById('supervisor_id').setAttribute('src',data.signature);
            break;
          }
          //this.saveToast("Signature captured successfully");
       }
       
    });

    this.sigModal.present();
  }

selectPressed(e, value){
    this.press++
    if(this.press >= 1 ){
        switch(value){
          case 'q1':
            this.obj.q1 = null;
            this.stateObject = null;
          break;
          case 'q2':
            this.obj.q2 = null;
            this.districtObject = null;
          break;
          case 'facilityType':
            this.disabledSector=false;
            this.obj.facilityType = null;
            this.facilityTypeObject = null;
          break;
          case 'q3':
            this.obj.q3 = null;
            this.blockObject = null;
          break;
          case 'facility':
            this.obj.facilityId = null;
            this.facilityObject = null;
          case 'q6':
            this.obj.q6 = null;
          break;
          case 'q7':
            this.obj.q7 = null;
          break;
        }
    }
}
facilityTypeWiseScore(){

    this.e1Score=(this.obj.q1p4==39?MessageProvider.COMMUNITY_SCORE.c_VHNDA_other_score:MessageProvider.COMMUNITY_SCORE.c_VHNDA_score);
    this.e2Score=MessageProvider.COMMUNITY_SCORE.c_IWANM_score,
    this.e3Score=((this.obj.q31==34 || this.obj.q31==undefined)?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_optional:
                  (this.obj.q32==26 && this.obj.q33>0)?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_other_score:
                  (this.obj.q32==26 && (this.obj.q33!>0 || this.obj.q33==null || this.obj.q33==""))?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_default:
                  (this.obj.q32!=26 && this.obj.q33>0)?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_default:
                  (this.obj.q32==26 && this.obj.q33==0)?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_default:
                  MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score);
    this.e4Score=(this.obj.q31==34 || this.obj.q31==undefined)?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_optional:MessageProvider.COMMUNITY_SCORE.c_IA_AOECWASA_score,
    this.e5Score=(this.obj.q31==34 || this.obj.q31==undefined)?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_optional:MessageProvider.COMMUNITY_SCORE.c_IA_AIWA_score,
    this.e6Score=(this.obj.q31==34 || this.obj.q31==undefined)?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_optional:MessageProvider.COMMUNITY_SCORE.c_IA_AISA_score,
    this.e7Score=MessageProvider.COMMUNITY_SCORE.c_IB_IWPW_score,
    this.e8Score=(this.obj.q421==26?MessageProvider.COMMUNITY_SCORE.c_IB_IWLMWMB_other_score:MessageProvider.COMMUNITY_SCORE.c_IB_IWLMWMB_score);
    this.e9Score=MessageProvider.COMMUNITY_SCORE.c_IB_AASSRFWSD_score,
    this.e10Score=(this.obj.q431==26?MessageProvider.COMMUNITY_SCORE.c_IB_IMWCM_other_score:MessageProvider.COMMUNITY_SCORE.c_IB_IMWCM_score);
    this.e11Score=(this.obj.q441==26?MessageProvider.COMMUNITY_SCORE.c_IB_IWBMPWPM_other_score:MessageProvider.COMMUNITY_SCORE.c_IB_IWBMPWPM_score);
    this.e12Score=MessageProvider.COMMUNITY_SCORE.c_IB_IWFHA_score,
    this.e13Score=MessageProvider.COMMUNITY_SCORE.c_IB_IHHD_score,
    this.e14Score=MessageProvider.COMMUNITY_SCORE.c_IB_SAIWWNTA_score

};

calculateYesNoq423I(){
  if(this.obj.q423a == 26 && this.obj.q423b == 26 && (this.obj.q423c == 26 || this.obj.q423c == 29) 
    &&  this.obj.q423d == 26 && this.obj.q423e == 26){
  this.obj.q423I = "Yes";
  }else{
  this.obj.q423I = "No";
  }
}

clickCounterObj:any=[];
yesnoCounterObj:any=[];
noCount:number=0;
 fetchvalObj:any={};
 radclickOptional(id,type,name,e){
   //for web
   if(this.is_web == true){
    if(this.communityRadioObj[e] == true){
      if(type == this.communityRadioTempObj[e]){
        setTimeout( () => {
            this.deleteRowsfromCounterObj(id);
            this.obj[e] = null;
            switch(e){
              case "q31":
                this.obj["q31"] = null;
                this.communityRadioObj["q31"] = false;
                this.communityRadioTempObj["q31"] = null;
                this.obj["q31a"] = null;
                this.communityRadioObj["q31a"] = false;
                this.communityRadioTempObj["q31a"] = null;
                this.obj["q31b"] = null;
                this.communityRadioObj["q31b"] = false;
                this.communityRadioTempObj["q31b"] = null;
                this.obj["q31c"] = null;
                this.communityRadioObj["q31c"] = false;
                this.communityRadioTempObj["q31c"] = null;
                this.obj["q31d"] = null;
                this.communityRadioObj["q31d"] = false;
                this.communityRadioTempObj["q31d"] = null;
                this.obj["q311"] = null;
                this.communityRadioObj["q311"] = false;
                this.communityRadioTempObj["q311"] = null;
                this.obj["q32"] = null;
                this.communityRadioObj["q32"] = false;
                this.communityRadioTempObj["q32"] = null;
                this.obj["q321"] = null;
                this.communityRadioObj["q321"] = false;
                this.communityRadioTempObj["q321"] = null;
                this.obj["q33"] = null;
                this.obj["q331"] = null;
                this.communityRadioObj["q331"] = false;
                this.communityRadioTempObj["q331"] = null;
                this.obj["q34"] = null;
                this.communityRadioObj["q34"] = false;
                this.communityRadioTempObj["q34"] = null;
                this.obj["q35"] = null;
                this.communityRadioObj["q35"] = false;
                this.communityRadioTempObj["q35"] = null;
                this.obj["q36"] = null;
                this.communityRadioObj["q36"] = false;
                this.communityRadioTempObj["q36"] = null;
                this.e3Score=MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_optional;
                this.progressBarObj.loadProgress_IA_AOECWASA = 0;
                this.progressBarObj.loadProgress_IA_AIWA = 0;
                this.progressBarObj.loadProgress_IA_AISA = 0;
                this.setPercentCSS('aoecwasa_id',this.progressBarObj.loadProgress_IA_AOECWASA);
                this.setPercentCSS('aiwa_id',this.progressBarObj.loadProgress_IA_AIWA);
                this.setPercentCSS('aisa_id',this.progressBarObj.loadProgress_IA_AISA);
                this.obj["q37a"] = null;
                this.communityRadioObj["q37a"] = false;
                this.communityRadioTempObj["q37a"] = null;
                this.obj["q37b"] = null;
                this.communityRadioObj["q37b"] = false;
                this.communityRadioTempObj["q37b"] = null;
                this.obj["q37c"] = null;
                this.communityRadioObj["q37c"] = false;
                this.communityRadioTempObj["q37c"] = null;
                this.obj["q37d"] = null;
                this.communityRadioObj["q37d"] = false;
                this.communityRadioTempObj["q37d"] = null;
                this.obj["q37e"] = null;
                this.communityRadioObj["q37e"] = false;
                this.communityRadioTempObj["q37e"] = null;
                this.obj["q37fi"] = null;
                this.communityRadioObj["q37fi"] = false;
                this.communityRadioTempObj["q37fi"] = null;
                this.obj["q37fii"] = null;
                this.communityRadioObj["q37fii"] = false;
                this.communityRadioTempObj["q37fii"] = null;
                this.obj["q37gi"] = null;
                this.communityRadioObj["q37gi"] = false;
                this.communityRadioTempObj["q37gi"] = null;
                this.obj["q37gii"] = null;
                this.communityRadioObj["q37gii"] = false;
                this.communityRadioTempObj["q37gii"] = null;
                this.obj["q37h"] = null;
                this.communityRadioObj["q37h"] = false;
                this.communityRadioTempObj["q37h"] = null;
                this.obj["q37i"] = null;
                this.communityRadioObj["q37i"] = false;
                this.communityRadioTempObj["q37i"] = null;
                this.obj["q37j"] = null;
                this.communityRadioObj["q37j"] = false;
                this.communityRadioTempObj["q37j"] = null;
                this.obj["q37k"] = null;
                this.communityRadioObj["q37k"] = false;
                this.communityRadioTempObj["q37k"] = null;
                this.obj["q37l"] = null;
                this.communityRadioObj["q37l"] = false;
                this.communityRadioTempObj["q37l"] = null;
                
                for(let ids of [105,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41]) {
                  this.deleteRowsfromCounterObj(ids);
                }
              break;
              default:
                this.obj[e] = null;
                this.communityRadioObj[e] = false;
                this.communityRadioTempObj[e] = null
              break;
            }
          }, 100)
      }else{
        this.communityRadioTempObj[e] = type;
      }
      
    }else{
      this.communityRadioObj[e] = true;
      this.communityRadioTempObj[e] = type;
    }
    }
    if(type=="No"){
      this.fetchvalObj = this.clickCounterObj.filter(counter => counter.id == id);
      if(name=="IASHA"){
        if(id==105){
          this.obj["q31a"] = null;
          this.communityRadioObj["q31a"] = false;
          this.communityRadioTempObj["q31a"] = null;
          this.obj["q31b"] = null;
          this.communityRadioObj["q31b"] = false;
          this.communityRadioTempObj["q31b"] = null;
          this.obj["q31c"] = null;
          this.communityRadioObj["q31c"] = false;
          this.communityRadioTempObj["q31c"] = null;
          this.obj["q31d"] = null;
          this.communityRadioObj["q31d"] = false;
          this.communityRadioTempObj["q31d"] = null;
          this.obj["q311"] = null;
          this.communityRadioObj["q311"] = false;
          this.communityRadioTempObj["q311"] = null;
          this.obj["q32"] = null;
          this.communityRadioObj["q32"] = false;
          this.communityRadioTempObj["q32"] = null;
          this.obj["q321"] = null;
          this.communityRadioObj["q321"] = false;
          this.communityRadioTempObj["q321"] = null;
          this.obj["q33"] = null;
          this.obj["q331"] = null;
          this.communityRadioObj["q331"] = false;
          this.communityRadioTempObj["q331"] = null;
          this.obj["q34"] = null;
          this.communityRadioObj["q34"] = false;
          this.communityRadioTempObj["q34"] = null;
          this.obj["q35"] = null;
          this.communityRadioObj["q35"] = false;
          this.communityRadioTempObj["q35"] = null;
          this.obj["q36"] = null;
          this.communityRadioObj["q36"] = false;
          this.communityRadioTempObj["q36"] = null;
          this.obj["q37a"] = null;
          this.communityRadioObj["q37a"] = false;
          this.communityRadioTempObj["q37a"] = null;
          this.obj["q37b"] = null;
          this.communityRadioObj["q37b"] = false;
          this.communityRadioTempObj["q37b"] = null;
          this.obj["q37c"] = null;
          this.communityRadioObj["q37c"] = false;
          this.communityRadioTempObj["q37c"] = null;
          this.obj["q37d"] = null;
          this.communityRadioObj["q37d"] = false;
          this.communityRadioTempObj["q37d"] = null;
          this.obj["q37e"] = null;
          this.communityRadioObj["q37e"] = false;
          this.communityRadioTempObj["q37e"] = null;
          this.obj["q37fi"] = null;
          this.communityRadioObj["q37fi"] = false;
          this.communityRadioTempObj["q37fi"] = null;
          this.obj["q37fii"] = null;
          this.communityRadioObj["q37fii"] = false;
          this.communityRadioTempObj["q37fii"] = null;
          this.obj["q37gi"] = null;
          this.communityRadioObj["q37gi"] = false;
          this.communityRadioTempObj["q37gi"] = null;
          this.obj["q37gii"] = null;
          this.communityRadioObj["q37gii"] = false;
          this.communityRadioTempObj["q37gii"] = null;
          this.obj["q37h"] = null;
          this.communityRadioObj["q37h"] = false;
          this.communityRadioTempObj["q37h"] = null;
          this.obj["q37i"] = null;
          this.communityRadioObj["q37i"] = false;
          this.communityRadioTempObj["q37i"] = null;
          this.obj["q37j"] = null;
          this.communityRadioObj["q37j"] = false;
          this.communityRadioTempObj["q37j"] = null;
          this.obj["q37k"] = null;
          this.communityRadioObj["q37k"] = false;
          this.communityRadioTempObj["q37k"] = null;
          this.obj["q37l"] = null;
          this.communityRadioObj["q37l"] = false;
          this.communityRadioTempObj["q37l"] = null;

          this.interviewAsha.controls["q31a"].setErrors(null);
          this.interviewAsha.controls["q31b"].setErrors(null);
          this.interviewAsha.controls["q31c"].setErrors(null);
          this.interviewAsha.controls["q31d"].setErrors(null);
          this.interviewAsha.controls["q311"].setErrors(null);
          this.interviewAsha.controls["q32"].setErrors(null);
          this.interviewAsha.controls["q321"].setErrors(null);
          this.interviewAsha.controls["q33"].setErrors(null);
          this.interviewAsha.controls["q331"].setErrors(null);
          this.interviewAsha.controls["q34"].setErrors(null);
          this.interviewAsha.controls["q35"].setErrors(null);
          this.interviewAsha.controls["q36"].setErrors(null);
          this.aoecwAshaSchoolAwcs.controls["q37a"].setErrors(null);
          this.aoecwAshaSchoolAwcs.controls["q37b"].setErrors(null);
          this.aoecwAshaSchoolAwcs.controls["q37c"].setErrors(null);
          this.aoecwAshaSchoolAwcs.controls["q37d"].setErrors(null);
          this.aoecwAshaSchoolAwcs.controls["q37e"].setErrors(null);
          this.availabilityOfIfaWithAsha.controls["q37fi"].setErrors(null);
          this.availabilityOfIfaWithAsha.controls["q37fii"].setErrors(null);
          this.availabilityOfIfaAtSchoolAwcs.controls["q37gi"].setErrors(null);
          this.availabilityOfIfaAtSchoolAwcs.controls["q37gii"].setErrors(null);
          this.availabilityOfIfaAtSchoolAwcs.controls["q37h"].setErrors(null);
          this.availabilityOfIfaAtSchoolAwcs.controls["q37i"].setErrors(null);
          this.availabilityOfIfaAtSchoolAwcs.controls["q37j"].setErrors(null);
          this.availabilityOfIfaAtSchoolAwcs.controls["q37k"].setErrors(null);
          this.availabilityOfIfaAtSchoolAwcs.controls["q37l"].setErrors(null);
          this.e3Score=MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_optional;
          this.e4Score=MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_optional;
          this.e5Score=MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_optional;
          this.e6Score=MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_optional;
          this.progressBarObj.loadProgress_IA_AOECWASA = 0;
          this.progressBarObj.loadProgress_IA_AIWA = 0;
          this.progressBarObj.loadProgress_IA_AISA = 0;
          this.setPercentCSS('aoecwasa_id',this.progressBarObj.loadProgress_IA_AOECWASA);
          this.setPercentCSS('aiwa_id',this.progressBarObj.loadProgress_IA_AIWA);
          this.setPercentCSS('aisa_id',this.progressBarObj.loadProgress_IA_AISA);
          for(let ids of [105,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41]) {
            this.deleteRowsfromCounterObj(ids);
          }
        }
      }
    }else{
      this.deleteRowsfromCounterObj(id);
    }
    if(type=="Yes"){
      this.e4Score=(this.obj.q31==34 || this.obj.q31==undefined)?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_optional:MessageProvider.COMMUNITY_SCORE.c_IA_AOECWASA_score,
      this.e5Score=(this.obj.q31==34 || this.obj.q31==undefined)?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_optional:MessageProvider.COMMUNITY_SCORE.c_IA_AIWA_score,
      this.e6Score=(this.obj.q31==34 || this.obj.q31==undefined)?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_optional:MessageProvider.COMMUNITY_SCORE.c_IA_AISA_score,
      this.fetchvalObj = this.clickCounterObj.filter(counter => counter.id == id);
      if(name=="IASHA"){
        if(id==105){
          this.aoecwAshaSchoolAwcs.controls["q37a"].setErrors(Validators.compose([Validators.required]));
          this.aoecwAshaSchoolAwcs.controls["q37b"].setErrors(Validators.compose([Validators.required]));
          this.aoecwAshaSchoolAwcs.controls["q37c"].setErrors(Validators.compose([Validators.required]));
          this.aoecwAshaSchoolAwcs.controls["q37d"].setErrors(Validators.compose([Validators.required]));
          this.aoecwAshaSchoolAwcs.controls["q37e"].setErrors(Validators.compose([Validators.required]));
          this.availabilityOfIfaWithAsha.controls["q37fi"].setErrors(Validators.compose([Validators.required]));
          this.availabilityOfIfaWithAsha.controls["q37fii"].setErrors(Validators.compose([Validators.required]));
          this.availabilityOfIfaAtSchoolAwcs.controls["q37gi"].setErrors(Validators.compose([Validators.required]));
          this.availabilityOfIfaAtSchoolAwcs.controls["q37gii"].setErrors(Validators.compose([Validators.required]));
          this.availabilityOfIfaAtSchoolAwcs.controls["q37h"].setErrors(Validators.compose([Validators.required]));
          this.availabilityOfIfaAtSchoolAwcs.controls["q37i"].setErrors(Validators.compose([Validators.required]));
          this.availabilityOfIfaAtSchoolAwcs.controls["q37j"].setErrors(Validators.compose([Validators.required]));
          this.availabilityOfIfaAtSchoolAwcs.controls["q37k"].setErrors(Validators.compose([Validators.required]));
          this.availabilityOfIfaAtSchoolAwcs.controls["q37l"].setErrors(Validators.compose([Validators.required]));
        }
      }
    }else{
      this.deleteRowsfromCounterObj(id);
    }
 }
  radclick(id,type,name,e){
//for web
      if(this.is_web == true){
      if(this.communityRadioObj[e] == true){
        if(type == this.communityRadioTempObj[e]){
          setTimeout( () => {
              this.deleteRowsfromCounterObj(id);
              this.obj[e] = null;
              switch(e){
                case 'q423a':
                  this.obj.q423a = null;
                  this.clearTheText();
                break;
                case 'q423b':
                  this.obj.q423b = null;
                  this.clearTheText();
                break;
                case 'q423c':
                  this.obj.q423c = null;
                  this.clearTheText();
                break;
                case 'q423d':
                  this.obj.q423d = null;
                  this.clearTheText();
                break;
                case 'q423e':
                  this.obj.q423e = null;
                  this.clearTheText();
                break;
                case 'q437a':
                this.obj.q437a = null;
                this.clearTheTextValue();
              break;
              case 'q437b':
                this.obj.q437b = null;
                this.clearTheTextValue();
              break;
              case 'q437c':
                this.obj.q437c = null;
                this.clearTheTextValue();
              break;
              case 'q437d':
                this.obj.q437d = null;
                this.clearTheTextValue();
              break;
              case 'q437e':
                this.obj.q437e = null;
                this.clearTheTextValue();
              break;
              }
              switch(e){
                case "q1p4":
                  this.obj["q1p4"] = null;
                  this.communityRadioObj["q1p4"] = false;
                  this.communityRadioTempObj["q1p4"] = null;
                  this.obj["q1p5"] = null;
                  this.communityRadioObj["q1p5"] = false;
                  this.communityRadioTempObj["q1p5"] = null;
                  this.e1Score=MessageProvider.COMMUNITY_SCORE.c_VHNDA_score;
                  for(let ids of [10]) {
                    this.deleteRowsfromCounterObj(ids);
                  }
                break;
                case "q32":
                  this.obj["q32"] = null;
                  this.communityRadioObj["q32"] = false;
                  this.communityRadioTempObj["q32"] = null;
                  this.obj["q321"] = null;
                  this.communityRadioObj["q321"] = false;
                  this.communityRadioTempObj["q321"] = null;
                  this.e3Score=MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score;
                  for(let ids of [23]) {
                    this.deleteRowsfromCounterObj(ids);
                  }
                break;
                case "q421":
                  this.obj["q421"] = null;
                  this.communityRadioObj["q421"] = false;
                  this.communityRadioTempObj["q421"] = null;
                  this.obj["q422"] = null;
                  this.communityRadioObj["q422"] = false;
                  this.communityRadioTempObj["q422"] = null;
                  this.obj["q423a"] = null;
                  this.communityRadioObj["q423a"] = false;
                  this.communityRadioTempObj["q423a"] = null;
                  this.obj["q423b"] = null;
                  this.communityRadioObj["q423b"] = false;
                  this.communityRadioTempObj["q423b"] = null;
                  this.obj["q423c"] = null;
                  this.communityRadioObj["q423c"] = false;
                  this.communityRadioTempObj["q423c"] = null;
                  this.obj["q423d"] = null;
                  this.communityRadioObj["q423d"] = false;
                  this.communityRadioTempObj["q423d"] = null;
                  this.obj["q423e"] = null;
                  this.communityRadioObj["q423e"] = false;
                  this.communityRadioTempObj["q423e"] = null;
                  this.e8Score=MessageProvider.COMMUNITY_SCORE.c_IB_IWLMWMB_score;
                  for(let ids of [46,47,48,49,50,51]) {
                    this.deleteRowsfromCounterObj(ids);
                  }
                break;
                case "q431":
                  this.obj["q431"] = null;
                  this.communityRadioObj["q431"] = false;
                  this.communityRadioTempObj["q431"] = null;
                  this.obj["q431b"] = null;
                  this.communityRadioObj["q431b"] = false;
                  this.communityRadioTempObj["q431b"] = null;
                  this.e10Score=MessageProvider.COMMUNITY_SCORE.c_IB_IMWCM_score;
                  for(let ids of [64]) {
                    this.deleteRowsfromCounterObj(ids);
                  }
                break;
                case "q441":
                  this.obj["q441"] = null;
                  this.communityRadioObj["q441"] = false;
                  this.communityRadioTempObj["q441"] = null;
                  this.obj["q442"] = null;
                  this.communityRadioObj["q442"] = false;
                  this.communityRadioTempObj["q442"] = null;
                  this.obj["q443"] = null;
                  this.communityRadioObj["q443"] = false;
                  this.communityRadioTempObj["q443"] = null;
                  this.obj["q444"] = null;
                  this.communityRadioObj["q444"] = false;
                  this.communityRadioTempObj["q444"] = null;
                  this.obj["q445"] = null;
                  this.communityRadioObj["q445"] = false;
                  this.communityRadioTempObj["q445"] = null;
                  this.obj["q446a"] = null;
                  this.communityRadioObj["q446a"] = false;
                  this.communityRadioTempObj["q446a"] = null;
                  this.obj["q446b"] = null;
                  this.communityRadioObj["q446b"] = false;
                  this.communityRadioTempObj["q446b"] = null;
                  this.obj["q446c"] = null;
                  this.communityRadioObj["q446c"] = false;
                  this.communityRadioTempObj["q446c"] = null;
                  this.obj["q447"] = null;
                  this.communityRadioObj["q447"] = false;
                  this.communityRadioTempObj["q447"] = null;
                  this.e11Score=MessageProvider.COMMUNITY_SCORE.c_IB_IWBMPWPM_score;
                  for(let ids of [77,78,79,80,81,82,83,84]) {
                    this.deleteRowsfromCounterObj(ids);
                  }
                break;
                case "q423a":
                  this.obj["q423a"] = null;
                  this.communityRadioObj["q423a"] = false;
                  this.communityRadioTempObj["q423a"] = null;
                  this.calculateYesNoq423I();
                  this.clearTheText();
                  for(let ids of [47]) {
                    this.deleteRowsfromCounterObj(ids);
                  }
                break;
                case "q423b":
                  this.obj["q423b"] = null;
                  this.communityRadioObj["q423b"] = false;
                  this.communityRadioTempObj["q423b"] = null;
                  this.calculateYesNoq423I();
                  this.clearTheText();
                  for(let ids of [48]) {
                    this.deleteRowsfromCounterObj(ids);
                  }
                break;
                case "q423c":
                  this.obj["q423c"] = null;
                  this.communityRadioObj["q423c"] = false;
                  this.communityRadioTempObj["q423c"] = null;
                  this.calculateYesNoq423I();
                  this.clearTheText();
                  for(let ids of [49]) {
                    this.deleteRowsfromCounterObj(ids);
                  }
                break;
                case "q423d":
                  this.obj["q423d"] = null;
                  this.communityRadioObj["q423d"] = false;
                  this.communityRadioTempObj["q423d"] = null;
                  this.calculateYesNoq423I();
                  this.clearTheText();
                  for(let ids of [50]) {
                    this.deleteRowsfromCounterObj(ids);
                  }
                break;
                case "q423e":
                  this.obj["q423e"] = null;
                  this.communityRadioObj["q423e"] = false;
                  this.communityRadioTempObj["q423e"] = null;
                  this.calculateYesNoq423I();
                  this.clearTheText();
                  for(let ids of [51]) {
                    this.deleteRowsfromCounterObj(ids);
                  }
                break;
                default:
                  this.obj[e] = null;
                  this.communityRadioObj[e] = false;
                  this.communityRadioTempObj[e] = null
                break;
              }
            }, 100)
        }else{
          this.communityRadioTempObj[e] = type;
        }
        
      }else{
        this.communityRadioObj[e] = true;
        this.communityRadioTempObj[e] = type;
      }
      }
      let count:number=0;
      if(id!=62 && id!=63 && id!=64 && id!=65 && id!=66 && id!=67 && id!=68 && id!=69){
          if(this.yesnoCounterObj.length==0){
            this.yesnoCounterObj.push({id:id,value:type});
          }else{
            for(let ids of [71,72,73,74,75]) {
              for(let data of this.yesnoCounterObj) {
                if(ids==data.id && id==data.id){
                  let index=this.yesnoCounterObj.indexOf(data)
                  this.yesnoCounterObj.splice(index, 1);
                  count++;
                }
              }
            }
            if(count>=0){
              this.yesnoCounterObj.push({id:id,value:type});
            }
          }
      
          let yesnocount:number = 0;
          for(let ids of [71,72,73,74,75]) {
            for(let data of this.yesnoCounterObj) {
              if(data.id==ids && data.value=="Yes"){
                yesnocount++;
              }
            }
          } 
          if(yesnocount>0){
            this.obj.q437 = "Yes";
          }else{
            this.obj.q437 = "No";
          }
          this.clearTheTextValue();
        }

    if(type=="No"){
        this.fetchvalObj = this.clickCounterObj.filter(counter => counter.id == id);
        if(name=="VHNDA"){
          if(id==9){
            this.obj.q1p5= null;
            
            this.communityRadioObj["q1p5"] = false;

            this.communityRadioTempObj["q1p5"] = null

            this.vhndAssessment.controls["q1p5"].setErrors(null);
            for(let ids of [10]) {
              this.deleteRowsfromCounterObj(ids);
            }
          }
        }
        if(name=="IASHA"){
          if(id==22){
            this.obj.q321= null;

            this.communityRadioObj["q321"] = false;

            this.communityRadioTempObj["q321"] = null

            this.interviewAsha.controls["q321"].setErrors(null);
            for(let ids of [23]) {
              this.deleteRowsfromCounterObj(ids);
            }
          }
        }
        if(name=="IWLMWMB"){
          if(id==45){

            this.obj.q422= null;
            this.obj.q423a= null;
            this.obj.q423b= null;
            this.obj.q423c= null;
            this.obj.q423d= null;
            this.obj.q423e= null;
            this.communityRadioObj["q422"] = false;
            this.communityRadioObj["q423a"] = false;
            this.communityRadioObj["q423b"] = false;
            this.communityRadioObj["q423c"] = false;
            this.communityRadioObj["q423d"] = false;
            this.communityRadioObj["q423e"] = false;

            this.communityRadioTempObj["q422"] = null
            this.communityRadioTempObj["q423a"] = null
            this.communityRadioTempObj["q423b"] = null
            this.communityRadioTempObj["q423c"] = null
            this.communityRadioTempObj["q423d"] = null
            this.communityRadioTempObj["q423e"] = null

            this.interviewWithLactatingMotherWithBaby.controls["q422"].setErrors(null);
            this.interviewWithLactatingMotherWithBaby.controls["q423a"].setErrors(null);
            this.interviewWithLactatingMotherWithBaby.controls["q423b"].setErrors(null);
            this.interviewWithLactatingMotherWithBaby.controls["q423c"].setErrors(null);
            this.interviewWithLactatingMotherWithBaby.controls["q423d"].setErrors(null);
            this.interviewWithLactatingMotherWithBaby.controls["q423e"].setErrors(null);

            for(let ids of [46,47,48,49,50,51]) {
              this.deleteRowsfromCounterObj(ids);
            }
          }
        }
        if(name=="IMWCM"){
          if(id==62){
            this.obj.q431b= null;

            this.communityRadioObj["q431b"] = false;

            this.communityRadioTempObj["q431b"] = null

            this.interviewMothertWithChild.controls["q431b"].setErrors(null);
            for(let ids of [64]) {
              this.deleteRowsfromCounterObj(ids);
            }
          }
        }
        if(name=="IWBMPWPM"){
          if(id==76){
            this.obj.q442= null;
            this.obj.q443= null;
            this.obj.q444= null;
            this.obj.q445= null;
            this.obj.q446a= null;
            this.obj.q446b= null;
            this.obj.q446c= null;
            this.obj.q447= null;
            this.communityRadioObj["q442"] = false;
            this.communityRadioObj["q443"] = false;
            this.communityRadioObj["q444"] = false;
            this.communityRadioObj["q445"] = false;
            this.communityRadioObj["q446a"] = false;
            this.communityRadioObj["q446b"] = false;
            this.communityRadioObj["q446c"] = false;
            this.communityRadioObj["q447"] = false;

            this.communityRadioTempObj["q442"] = null
            this.communityRadioTempObj["q443"] = null
            this.communityRadioTempObj["q444"] = null
            this.communityRadioTempObj["q445"] = null
            this.communityRadioTempObj["q446a"] = null
            this.communityRadioTempObj["q446b"] = null
            this.communityRadioTempObj["q446c"] = null
            this.communityRadioTempObj["q447"] = null

            this.interviewWithBeneficiariesToMctfc.controls["q442"].setErrors(null);
            this.interviewWithBeneficiariesToMctfc.controls["q443"].setErrors(null);
            this.interviewWithBeneficiariesToMctfc.controls["q444"].setErrors(null);
            this.interviewWithBeneficiariesToMctfc.controls["q445"].setErrors(null);
            this.interviewWithBeneficiariesToMctfc.controls["q446a"].setErrors(null);
            this.interviewWithBeneficiariesToMctfc.controls["q446b"].setErrors(null);
            this.interviewWithBeneficiariesToMctfc.controls["q446c"].setErrors(null);
            this.interviewWithBeneficiariesToMctfc.controls["q447"].setErrors(null);

            for(let ids of [77,78,79,80,81,82,83,84]) {
              this.deleteRowsfromCounterObj(ids);
            }
          }
        }
        if(name=="IMWCM"){
          this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
          this.obj.c_IB_IMWCM_score=0;
            for(let data of this.clickCounterObj) {
              if(data.name==name){

              this.obj.c_IB_IMWCM_score = this.obj.c_IB_IMWCM_score+data.value;
              }
            }
            this.clearTheText();
         } 
        if(this.fetchvalObj.length==0){
          if(name=="IWLMWMB"){
            this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
            this.obj.c_IB_IWLMWMB_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                this.obj.c_IB_IWLMWMB_score = this.obj.c_IB_IWLMWMB_score+data.value;
                }
              }
              let noCount:number=0;
              for(let ids of [47,48,49,50,51]) {
                for(let data of this.clickCounterObj) {
                  if(data.id==ids){
                    noCount=noCount+1;
                  }
                }
              }  
              if(id!=45 && id!=46){
                if(noCount==5)
                  this.obj.q423I = "No";
                else
                  this.obj.q423I = "No";
              }
              this.clearTheText();
           }
        }
      }else{
        this.deleteRowsfromCounterObj(id);
      }
      if(type=="Don't Know"){
        this.fetchvalObj = this.clickCounterObj.filter(counter => counter.id == id);
        if(name=="VHNDA"){
          if(id==9){
            this.obj.q1p5= null;
            
            this.communityRadioObj["q1p5"] = false;

            this.communityRadioTempObj["q1p5"] = null

            this.vhndAssessment.controls["q1p5"].setErrors(null);
            for(let ids of [10]) {
              this.deleteRowsfromCounterObj(ids);
            }
          }
        }
        if(name=="IASHA"){
          if(id==22){
            this.obj.q321= null;
            
            this.communityRadioObj["q321"] = false;

            this.communityRadioTempObj["q321"] = null

            this.interviewAsha.controls["q321"].setErrors(null);
            for(let ids of [23]) {
              this.deleteRowsfromCounterObj(ids);
            }
          }
        }
        if(name=="IWLMWMB"){
          if(id==45){
            this.obj.q422= null;
            this.obj.q423a= null;
            this.obj.q423b= null;
            this.obj.q423c= null;
            this.obj.q423d= null;
            this.obj.q423e= null;
            this.communityRadioObj["q422"] = false;
            this.communityRadioObj["q423a"] = false;
            this.communityRadioObj["q423b"] = false;
            this.communityRadioObj["q423c"] = false;
            this.communityRadioObj["q423d"] = false;
            this.communityRadioObj["q423e"] = false;

            this.communityRadioTempObj["q422"] = null
            this.communityRadioTempObj["q423a"] = null
            this.communityRadioTempObj["q423b"] = null
            this.communityRadioTempObj["q423c"] = null
            this.communityRadioTempObj["q423d"] = null
            this.communityRadioTempObj["q423e"] = null

            this.interviewWithLactatingMotherWithBaby.controls["q422"].setErrors(null);
            this.interviewWithLactatingMotherWithBaby.controls["q423a"].setErrors(null);
            this.interviewWithLactatingMotherWithBaby.controls["q423b"].setErrors(null);
            this.interviewWithLactatingMotherWithBaby.controls["q423c"].setErrors(null);
            this.interviewWithLactatingMotherWithBaby.controls["q423d"].setErrors(null);
            this.interviewWithLactatingMotherWithBaby.controls["q423e"].setErrors(null);
            for(let ids of [46,47,48,49,50,51]) {
              this.deleteRowsfromCounterObj(ids);
            }
          }
        }
        if(name=="IMWCM"){
          if(id==62){
            this.obj.q431b= null;

            this.communityRadioObj["q431b"] = false;

            this.communityRadioTempObj["q431b"] = null

            this.interviewMothertWithChild.controls["q431b"].setErrors(null);
            for(let ids of [64]) {
              this.deleteRowsfromCounterObj(ids);
            }
          }
        }
        if(name=="IWBMPWPM"){
          if(id==76){
            this.obj.q442= null;
            this.obj.q443= null;
            this.obj.q444= null;
            this.obj.q445= null;
            this.obj.q446a= null;
            this.obj.q446b= null;
            this.obj.q446c= null;
            this.obj.q447= null;
            this.communityRadioObj["q442"] = false;
            this.communityRadioObj["q443"] = false;
            this.communityRadioObj["q444"] = false;
            this.communityRadioObj["q445"] = false;
            this.communityRadioObj["q446a"] = false;
            this.communityRadioObj["q446b"] = false;
            this.communityRadioObj["q446c"] = false;
            this.communityRadioObj["q447"] = false;

            this.communityRadioTempObj["q442"] = null
            this.communityRadioTempObj["q443"] = null
            this.communityRadioTempObj["q444"] = null
            this.communityRadioTempObj["q445"] = null
            this.communityRadioTempObj["q446a"] = null
            this.communityRadioTempObj["q446b"] = null
            this.communityRadioTempObj["q446c"] = null
            this.communityRadioTempObj["q447"] = null

            this.interviewWithBeneficiariesToMctfc.controls["q442"].setErrors(null);
            this.interviewWithBeneficiariesToMctfc.controls["q443"].setErrors(null);
            this.interviewWithBeneficiariesToMctfc.controls["q444"].setErrors(null);
            this.interviewWithBeneficiariesToMctfc.controls["q445"].setErrors(null);
            this.interviewWithBeneficiariesToMctfc.controls["q446a"].setErrors(null);
            this.interviewWithBeneficiariesToMctfc.controls["q446b"].setErrors(null);
            this.interviewWithBeneficiariesToMctfc.controls["q446c"].setErrors(null);
            this.interviewWithBeneficiariesToMctfc.controls["q447"].setErrors(null);

            for(let ids of [77,78,79,80,81,82,83,84]) {
              this.deleteRowsfromCounterObj(ids);
            }
          }
        }
        if(name=="IMWCM"){
          this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
          this.obj.c_IB_IMWCM_score=0;
            for(let data of this.clickCounterObj) {
              if(data.name==name){
              this.obj.c_IB_IMWCM_score = this.obj.c_IB_IMWCM_score+data.value;
              }
            }
            let dontKnowCount:number=0;
            for(let ids of [71,72,73,74,75]) {
              for(let data of this.clickCounterObj) {
                if(data.id==ids){
                  dontKnowCount=dontKnowCount+1;
                }
              }
            }  
            this.clearTheTextValue();
         } 
        if(this.fetchvalObj.length==0){
          if(name=="IWLMWMB"){
            this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
            this.obj.c_IB_IWLMWMB_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                this.obj.c_IB_IWLMWMB_score = this.obj.c_IB_IWLMWMB_score+data.value;
                }
              }
              this.calculateYesNoq423I();
              this.clearTheText();
           }
        }
      }else{
        this.deleteRowsfromCounterObj(id);
      }
    if(type=="Yes"){
        this.fetchvalObj = this.clickCounterObj.filter(counter => counter.id == id);
        if(this.fetchvalObj.length==0){
           if(name=="VHNDA"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.c_VHNDA_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                   this.obj.c_VHNDA_score = this.obj.c_VHNDA_score+data.value;
                }
              }
           
            }else if(name=="IWANM"){
               this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
             this.obj.c_IWANM_score=0;
               for(let data of this.clickCounterObj) {
                 if(data.name==name){
                  this.obj.c_IWANM_score = this.obj.c_IWANM_score+data.value;
                 }
               }
           }else if(name=="IASHA"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.c_IA_IASHA_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.c_IA_IASHA_score = this.obj.c_IA_IASHA_score+data.value;
                }
              }
           }else if(name=="AOECWASA"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.c_IA_AOECWASA_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.c_IA_AOECWASA_score = this.obj.c_IA_AOECWASA_score+data.value;
                }
              }
           }else if(name=="AIWA"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.c_IA_AIWA_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.c_IA_AIWA_score = this.obj.c_IA_AIWA_score+data.value;
                }
              }
           }else if(name=="AISA"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.c_IA_AISA_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.c_IA_AISA_score = this.obj.c_IA_AISA_score+data.value;
                }
              }
           }else if(name=="IWPW"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.c_IB_IWPW_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.c_IB_IWPW_score = this.obj.c_IB_IWPW_score+data.value;
                }
              }
           }else if(name=="IWLMWMB"){
            this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
            this.obj.c_IB_IWLMWMB_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                this.obj.c_IB_IWLMWMB_score = this.obj.c_IB_IWLMWMB_score+data.value;
                }
              }
              this.calculateYesNoq423I();
              this.clearTheText();
           }else if(name=="AASSRFWSD"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.c_IB_AASSRFWSD_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.c_IB_AASSRFWSD_score = this.obj.c_IB_AASSRFWSD_score+data.value;
                }
              }
           }else if(name=="IMWCM"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.c_IB_IMWCM_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.c_IB_IMWCM_score = this.obj.c_IB_IMWCM_score+data.value;
                }
              }
              let yesCount:number=0;
              for(let ids of [71,72,73,74,75]) {
                for(let data of this.clickCounterObj) {
                  if(data.id==ids){
                    yesCount=yesCount+1;
                  }
                }
              }  
              this.clearTheTextValue();
           }else if(name=="IWBMPWPM"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.c_IB_IWBMPWPM_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.c_IB_IWBMPWPM_score = this.obj.c_IB_IWBMPWPM_score+data.value;
                }
              }
           }else if(name=="IWFHA"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.c_IB_IWFHA_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.c_IB_IWFHA_score = this.obj.c_IB_IWFHA_score+data.value;
                }
              }
           }else if(name=="IHHD"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.c_IB_IHHD_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.c_IB_IHHD_score = this.obj.c_IB_IHHD_score+data.value;
                }
              }
           }else if(name=="SAIWWNTA"){
              this.clickCounterObj.push({id:id,type:"Yes",value:1,name:name});
              this.obj.c_IB_SAIWWNTA_score=0;
              for(let data of this.clickCounterObj) {
                if(data.name==name){
                 this.obj.c_IB_SAIWWNTA_score = this.obj.c_IB_SAIWWNTA_score+data.value;
                }
              }
           }
           
          }
      }else{
        this.deleteRowsfromCounterObj(id);
      }
  }

deleteRowsfromCounterObj(id){
 // this.obj.q423I = "";
  //this.clearTheText();
  
  this.fetchvalObj = this.clickCounterObj.filter(counter => counter.id == id);
        if(this.fetchvalObj.length>0){
         
          let index: number = this.clickCounterObj.findIndex(x => x.id == id);
          this.clickCounterObj.splice(index, 1);
          this.obj.c_VHNDA_score=0;
          this.obj.c_IWANM_score=0;
          this.obj.c_IA_IASHA_score=0;
          this.obj.c_IA_AOECWASA_score=0;
          this.obj.c_IA_AIWA_score=0;
          this.obj.c_IA_AISA_score=0;
          this.obj.c_IB_IWPW_score=0;
          this.obj.c_IB_IWLMWMB_score=0;
          this.obj.c_IB_AASSRFWSD_score=0;
          this.obj.c_IB_IMWCM_score=0;
          this.obj.c_IB_IWBMPWPM_score=0;
          this.obj.c_IB_IWFHA_score=0;
          this.obj.c_IB_IHHD_score=0;
          this.obj.c_IB_SAIWWNTA_score=0;
            for(let data of this.clickCounterObj) {
              if(data.name=="VHNDA"){
                 this.obj.c_VHNDA_score = this.obj.c_VHNDA_score + data.value; 
              }else if(data.name=="IWANM"){
                 this.obj.c_IWANM_score = this.obj.c_IWANM_score + data.value; 
              }else if(data.name=="IASHA"){
                 this.obj.c_IA_IASHA_score = this.obj.c_IA_IASHA_score + data.value; 
              }else if(data.name=="AOECWASA"){
                 this.obj.c_IA_AOECWASA_score = this.obj.c_IA_AOECWASA_score + data.value; 
              }else if(data.name=="AIWA"){
                 this.obj.c_IA_AIWA_score = this.obj.c_IA_AIWA_score + data.value; 
              }else if(data.name=="AISA"){
                 this.obj.c_IA_AISA_score = this.obj.c_IA_AISA_score + data.value; 
              }else if(data.name=="IWPW"){
                 this.obj.c_IB_IWPW_score = this.obj.c_IB_IWPW_score + data.value; 
              }else if(data.name=="IWLMWMB"){
                 this.obj.c_IB_IWLMWMB_score = this.obj.c_IB_IWLMWMB_score + data.value; 
                   let yesCount:number=0;
                    for(let ids of [47,48,49,50,51]) {
                      for(let data of this.clickCounterObj) {
                        if(data.id==ids){
                          yesCount=yesCount+1;
                        }
                      }
                    }  
                this.calculateYesNoq423I();
                this.clearTheText();
              }else if(data.name=="AASSRFWSD"){
                 this.obj.c_IB_AASSRFWSD_score = this.obj.c_IB_AASSRFWSD_score + data.value; 
              }else if(data.name=="IMWCM"){
                 this.obj.c_IB_IMWCM_score = this.obj.c_IB_IMWCM_score + data.value; 
                 let yesCount:number=0;
                 for(let ids of [71,72,73,74,75]) {
                   for(let data of this.clickCounterObj) {
                     if(data.id==ids){
                       yesCount=yesCount+1;
                     }
                   }
                 }  
              }else if(data.name=="IWBMPWPM"){
                 this.obj.c_IB_IWBMPWPM_score = this.obj.c_IB_IWBMPWPM_score + data.value;
              }else if(data.name=="IWFHA"){
                 this.obj.c_IB_IWFHA_score = this.obj.c_IB_IWFHA_score + data.value; 
              } else if(data.name=="IHHD"){
                 this.obj.c_IB_IHHD_score = this.obj.c_IB_IHHD_score + data.value; 
              } else if(data.name=="SAIWWNTA"){
                 this.obj.c_IB_SAIWWNTA_score = this.obj.c_IB_SAIWWNTA_score + data.value; 
              } 
            }
          }
}

hintModal(id) {
    let hintObj = this.hintService.getCommunityHintsJson();
    let filteredHintObj= hintObj.filter(hint => hint.id == id);
       let myModal = this.modalCtrl.create(HintModalPage, filteredHintObj);
       myModal.present();
   
}
  radioPressed(radiovar, e, value, id) {
  /// Writen by sourav keshari nath ////////////
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
          case 'q11a':
          this.deleteRowsfromCounterObj(id);
            this.obj.q11a = null;
          break;
          case 'q11b':
          this.deleteRowsfromCounterObj(id);
            this.obj.q11b = null;
          break;
          case 'q11c':
          this.deleteRowsfromCounterObj(id);
            this.obj.q11c = null;
          break;
          case 'q11d':
          this.deleteRowsfromCounterObj(id);
            this.obj.q11d = null;
          break;
          case 'q11e':
          this.deleteRowsfromCounterObj(id);
            this.obj.q11e = null;
          break;
          case 'q1p2':
          this.deleteRowsfromCounterObj(id);
            this.obj.q1p2 = null;
          break;
          case 'q1p2':
          this.deleteRowsfromCounterObj(id);
            this.obj.q1p2 = null;
          break;
          case 'q1p3':
          this.deleteRowsfromCounterObj(id);
            this.obj.q1p3 = null;
          break;
          case 'q1p4':
          this.deleteRowsfromCounterObj(id);
            this.obj.q1p4 = null;
            this.obj.q1p5 = null;
          break;
          case 'q1p5':
          this.deleteRowsfromCounterObj(id);
            this.obj.q1p5 = null;
          break;
          case 'q21':
          this.deleteRowsfromCounterObj(id);
            this.obj.q21 = null;
          break;
          case 'q22':
          this.deleteRowsfromCounterObj(id);
            this.obj.q22 = null;
          break;
          case 'q23':
          this.deleteRowsfromCounterObj(id);
            this.obj.q23 = null;
          break;
          case 'q24':
          this.deleteRowsfromCounterObj(id);
            this.obj.q24 = null;
          break;
          case 'q26':
          this.deleteRowsfromCounterObj(id);
            this.obj.q26 = null;
          break;
          case 'q27':
          this.deleteRowsfromCounterObj(id);
            this.obj.q27 = null;
          break;
          case 'q31':
          this.deleteRowsfromCounterObj(id);
            this.obj.q31 = null;
            this.obj.q31a = null;
            this.obj.q31b = null;
            this.obj.q31c = null;
            this.obj.q31d = null;
            this.obj.q311 = null;
            this.obj.q32 = null;
            this.obj.q321 = null;
            this.obj.q331 = null;
            this.obj.q34 = null;
            this.obj.q35 = null;
            this.obj.q36 = null;
            this.obj.q37a = null;
            this.obj.q37b = null;
            this.obj.q37c = null;
            this.obj.q37d = null;
            this.obj.q37e = null;
            this.obj.q37fi = null;
            this.obj.q37fii = null;
            this.obj.q37gi = null;
            this.obj.q37gii = null;
            this.obj.q37h = null;
            this.obj.q37i = null;
            this.obj.q37j = null;
            this.obj.q37k = null;
            this.obj.q37l = null;
          break;
          case 'q31a':
          this.deleteRowsfromCounterObj(id);
            this.obj.q31a = null;
          break;
          case 'q31b':
          this.deleteRowsfromCounterObj(id);
            this.obj.q31b = null;
          break;
          case 'q31c':
          this.deleteRowsfromCounterObj(id);
            this.obj.q31c = null;
          break;
          case 'q31d':
          this.deleteRowsfromCounterObj(id);
            this.obj.q31d = null;
          break;
          case 'q311':
          this.deleteRowsfromCounterObj(id);
            this.obj.q311 = null;
          break;
          case 'q32':
          this.deleteRowsfromCounterObj(id);
            this.obj.q32 = null;
            this.obj.q321 = null;
          break;
          case 'q321':
          this.deleteRowsfromCounterObj(id);
            this.obj.q321 = null;
          break;
          case 'q331':
          this.deleteRowsfromCounterObj(id);
            this.obj.q331 = null;
          break;
          case 'q34':
          this.deleteRowsfromCounterObj(id);
            this.obj.q34 = null;
          break;
          case 'q35':
          this.deleteRowsfromCounterObj(id);
            this.obj.q35 = null;
          break;
          case 'q36':
          this.deleteRowsfromCounterObj(id);
            this.obj.q36 = null;
          break;
          case 'q37a':
          this.deleteRowsfromCounterObj(id);
            this.obj.q37a = null;
          break;
          case 'q37b':
          this.deleteRowsfromCounterObj(id);
            this.obj.q37b = null;
          break;
          case 'q37c':
          this.deleteRowsfromCounterObj(id);
            this.obj.q37c = null;
          break;
          case 'q37d':
          this.deleteRowsfromCounterObj(id);
            this.obj.q37d = null;
          break;
          case 'q37e':
          this.deleteRowsfromCounterObj(id);
            this.obj.q37e = null;
          break;
          case 'q37fi':
          this.deleteRowsfromCounterObj(id);
            this.obj.q37fi = null;
          break;
          case 'q37fii':
          this.deleteRowsfromCounterObj(id);
            this.obj.q37fii = null;
          break;
          case 'q37gi':
          this.deleteRowsfromCounterObj(id);
            this.obj.q37gi = null;
          break;
          case 'q37gii':
          this.deleteRowsfromCounterObj(id);
            this.obj.q37gii = null;
          break;
          case 'q37h':
          this.deleteRowsfromCounterObj(id);
            this.obj.q37h = null;
          break;
          case 'q37i':
          this.deleteRowsfromCounterObj(id);
            this.obj.q37i = null;
          break;
          case 'q37j':
          this.deleteRowsfromCounterObj(id);
            this.obj.q37j = null;
          break;
          case 'q37k':
          this.deleteRowsfromCounterObj(id);
            this.obj.q37k = null;
          break;
          case 'q37l':
          this.deleteRowsfromCounterObj(id);
            this.obj.q37l = null;
          break;
          case 'q411':
          this.deleteRowsfromCounterObj(id);
            this.obj.q411 = null;
          break;
          case 'q412':
          this.deleteRowsfromCounterObj(id);
            this.obj.q412 = null;
          break;
          case 'q413':
          this.deleteRowsfromCounterObj(id);
            this.obj.q413 = null;
          break;
          case 'q421':
          this.deleteRowsfromCounterObj(id);
            this.obj.q421 = null;
            this.obj.q422= null;
            this.obj.q423a= null;
            this.obj.q423b= null;
            this.obj.q423c= null;
            this.obj.q423d= null;
            this.obj.q423e= null;
          break;
          case 'q422':
          this.deleteRowsfromCounterObj(id);
            this.obj.q422 = null;
          break;
          case 'q423':
          this.deleteRowsfromCounterObj(id);
            this.obj.q423 = null;
          break;
          case 'q423a':
          this.deleteRowsfromCounterObj(id);
            this.obj.q423a = null;
            this.calculateYesNoq423I();
            this.clearTheText();
          break;
          case 'q423b':
          this.deleteRowsfromCounterObj(id);
            this.obj.q423b = null;
            this.calculateYesNoq423I();
            this.clearTheText();
          break;
          case 'q423c':
          this.deleteRowsfromCounterObj(id);
            this.obj.q423c = null;
            this.calculateYesNoq423I();
            this.clearTheText();
          break;
          case 'q423d':
          this.deleteRowsfromCounterObj(id);
            this.obj.q423d = null;
            this.calculateYesNoq423I();
            this.clearTheText();
          break;
          case 'q423e':
          this.deleteRowsfromCounterObj(id);
            this.obj.q423e = null;
            this.calculateYesNoq423I();
            this.clearTheText();
          break;
          case 'q424a':
          this.deleteRowsfromCounterObj(id);
            this.obj.q424a = null;
            this.clearTheText();
          break;
          case 'q424b':
          this.deleteRowsfromCounterObj(id);
            this.obj.q424b = null;
          break;
          case 'q424c':
          this.deleteRowsfromCounterObj(id);
            this.obj.q424c = null;
          break;
          case 'q424d':
          this.deleteRowsfromCounterObj(id);
            this.obj.q424d = null;
          break;
          case 'q424e':
          this.deleteRowsfromCounterObj(id);
            this.obj.q424e = null;
          break;
          case 'q424f':
          this.deleteRowsfromCounterObj(id);
            this.obj.q424f = null;
          break;
          case 'q424g':
          this.deleteRowsfromCounterObj(id);
            this.obj.q424g = null;
          break;
          case 'q424h':
          this.deleteRowsfromCounterObj(id);
            this.obj.q424h = null;
          break;
          case 'q424i':
          this.deleteRowsfromCounterObj(id);
            this.obj.q424i = null;
          break;
          case 'q424i':
          this.deleteRowsfromCounterObj(id);
            this.obj.q424i = null;
          break;
          case 'q424j':
          this.deleteRowsfromCounterObj(id);
            this.obj.q424j = null;
          break;
          case 'q431':
          this.deleteRowsfromCounterObj(id);
            this.obj.q431 = null;
            this.obj.q431b= null;
          break;
          case 'q431a':
          this.deleteRowsfromCounterObj(id);
            this.obj.q431a = null;
          break;
          case 'q431b':
          this.deleteRowsfromCounterObj(id);
            this.obj.q431b = null;
          break;
          case 'q432':
          this.deleteRowsfromCounterObj(id);
            this.obj.q432 = null;
          break;
          case 'q433':
          this.deleteRowsfromCounterObj(id);
            this.obj.q433 = null;
          break;
          case 'q434':
          this.deleteRowsfromCounterObj(id);
            this.obj.q434 = null;
          break;
          case 'q435':
          this.deleteRowsfromCounterObj(id);
            this.obj.q435 = null;
          break;
          case 'q436':
          this.deleteRowsfromCounterObj(id);
            this.obj.q436 = null;
          break;
          case 'q437':
          this.deleteRowsfromCounterObj(id);
            this.obj.q437 = null;
          break;
          case 'q437a':
          this.deleteRowsfromCounterObj(id);
            this.obj.q437a = null;
            this.clearTheTextValue();
          break;
          case 'q437b':
          this.deleteRowsfromCounterObj(id);
            this.obj.q437b = null;
            this.clearTheTextValue();
          break;
          case 'q437c':
          this.deleteRowsfromCounterObj(id);
            this.obj.q437c = null;
            this.clearTheTextValue();
          break;
          case 'q437d':
          this.deleteRowsfromCounterObj(id);
            this.obj.q437d = null;
            this.clearTheTextValue();
          break;
          case 'q437e':
          this.deleteRowsfromCounterObj(id);
            this.obj.q437e = null;
            this.clearTheTextValue();
          break;
          case 'q441':
          this.deleteRowsfromCounterObj(id);
            this.obj.q441 = null;
            this.obj.q442= null;
            this.obj.q443= null;
            this.obj.q444= null;
            this.obj.q445= null;
            this.obj.q446a= null;
            this.obj.q446b= null;
            this.obj.q446c= null;
            this.obj.q447= null;
          break;
          case 'q442':
          this.deleteRowsfromCounterObj(id);
            this.obj.q442 = null;
          break;
          case 'q443':
          this.deleteRowsfromCounterObj(id);
            this.obj.q443 = null;
          break;
          case 'q444':
          this.deleteRowsfromCounterObj(id);
            this.obj.q444 = null;
          break;
          case 'q445':
          this.deleteRowsfromCounterObj(id);
            this.obj.q445 = null;
          break;
          case 'q446a':
          this.deleteRowsfromCounterObj(id);
            this.obj.q446a = null;
          break;
          case 'q446b':
          this.deleteRowsfromCounterObj(id);
            this.obj.q446b = null;
          break;
          case 'q446c':
          this.deleteRowsfromCounterObj(id);
            this.obj.q446c = null;
          break;
          case 'q447':
          this.deleteRowsfromCounterObj(id);
            this.obj.q447 = null;
          break;
          case 'q451':
          this.deleteRowsfromCounterObj(id);
            this.obj.q451 = null;
          break;
          case 'q452':
          this.deleteRowsfromCounterObj(id);
            this.obj.q452 = null;
          break;
          case 'q453':
          this.deleteRowsfromCounterObj(id);
            this.obj.q453 = null;
          break;
          case 'q461a':
          this.deleteRowsfromCounterObj(id);
            this.obj.q461a = null;
          break;
          case 'q461b':
          this.deleteRowsfromCounterObj(id);
            this.obj.q461b = null;
          break;
          case 'q461c':
          this.deleteRowsfromCounterObj(id);
            this.obj.q461c = null;
          break;
          case 'q461d':
          this.deleteRowsfromCounterObj(id);
            this.obj.q461d = null;
          break;
          case 'q461e':
          this.deleteRowsfromCounterObj(id);
            this.obj.q461e = null;
          break;
          case 'q462a':
          this.deleteRowsfromCounterObj(id);
            this.obj.q462a = null;
          break;
          case 'q462b':
          this.deleteRowsfromCounterObj(id);
            this.obj.q462b = null;
          break;
          case 'q462c':
          this.deleteRowsfromCounterObj(id);
            this.obj.q462c = null;
          break;
          case 'q463':
          this.deleteRowsfromCounterObj(id);
            this.obj.q463 = null;
          break;
          case 'q471':
          this.deleteRowsfromCounterObj(id);
            this.obj.q471 = null;
          break;
          case 'q471a':
          this.deleteRowsfromCounterObj(id);
            this.obj.q471a = null;
          break;
          case 'q472':
          this.deleteRowsfromCounterObj(id);
            this.obj.q472 = null;
          break;
          case 'q473':
          this.deleteRowsfromCounterObj(id);
            this.obj.q473 = null;
          break;
          case 'q474':
          this.deleteRowsfromCounterObj(id);
            this.obj.q474 = null;
          break;
          case 'q474a':
          this.deleteRowsfromCounterObj(id);
            this.obj.q474a = null;
          break;
          case 'q475':
          this.deleteRowsfromCounterObj(id);
            this.obj.q475 = null;
          break;
          case 'q476':
          this.deleteRowsfromCounterObj(id);
            this.obj.q476 = null;
          break;
        }
      this.press = 0;
    }
  }
  }

clearTheText(){
  if(this.obj.q423a == null && this.obj.q423b == null && this.obj.q423c == null && this.obj.q423d == null && this.obj.q423e == null){
            this.obj.q423I = "";
          }
}
clearTheTextValue(){
  if(this.obj.q437a == null && this.obj.q437b == null && this.obj.q437c == null && this.obj.q437d == null && this.obj.q437e == null){
            this.obj.q437 = "";
          }
}

/**
 * @author Jagat Bandhu Sahoo
 */
ngOnDestroy():void {
  this.events.unsubscribe(MessageProvider.EVENTS.COMMUNITY_DATA_SAVE_EVENT);
  this.events.unsubscribe(MessageProvider.EVENTS.PREFETCH_PROCESS_COMPLETE);
  this.events.unsubscribe(MessageProvider.EVENTS.DISSMISS_LOADER_COMMUNITY);
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
    if(!this.finalized && !this.sent) {
     if (changes) {

        switch (this.sectorOrSubsectorNumber) {

        case 1:

          let q1: number = 0;
          let q2: number = 0;
          let facilityType: number = 0;
          let q3: number = 0;
          let facilityId: number = 0;
          let q4: number = 0;
          let q5: number = 0;
          let q5a: number = 0;
          let q5b: number = 0;
          let q6: number = 0;
          let q7: number = 0;
          let totalGeneral: number = 11;

          if (this.obj.q1 != null) {
            q1 = 1;
          } else {
            q1 = 0;
          }

          if (this.obj.q2 != null) {
            q2 = 1;
          } else {
            q2 = 0;
          }

          if (this.obj.facilityType != null) {
            facilityType = 1;
          } else {
            facilityType = 0;
          }

          if (this.obj.q3 != null) {
            q3 = 1;
          } else {
            q3 = 0;
          }

          if (this.obj.facilityId != null) {
            facilityId = 1;
          } else {
            facilityId = 0;
          }

          if (this.obj.q4 != null) {
            if (this.obj.q4.length > 0) {
              q4 = 1;
            } else {
              q4 = 0;
            }
          }else {
            q4 = 0;
          }

          if (this.obj.q5 != null) {
            if (this.obj.q5.length > 0) {
              q5 = 1;
            } else {
              q5 = 0;
            }
          }else {
            q5 = 0;
          }

          if (this.obj.q5a != null) {
            if (this.obj.q5a.length > 0) {
              q5a = 1;
            } else {
              q5a = 0;
            }
          }else {
            q5a = 0;
          }

          if (this.obj.q5b != null) {
            if (this.obj.q5b.length > 0) {
              q5b = 1;
            } else {
              q5b = 0;
            }
          }else {
            q5b = 0;
          }

          if (this.obj.q6 != null) {
            q6 = 1;
          } else {
            q6 = 0;
          }

          if (this.obj.q7 != null) {
            q7 = 1;
          } else {
            q7 = 0;
          }

          let filledUpGeneral = q1 + q2 + facilityType + q3 + facilityId + q4 + q5 + q5a + q5b + q6 + q7;
          this.progressBarObj.loadProgress_General = Math.round(((filledUpGeneral / totalGeneral) * 100));
          this.setPercentCSS('general_id',this.progressBarObj.loadProgress_General);
        break;
        case 2:

          let q11a: number = 0;
          let q11b: number = 0;
          let q11c: number = 0;
          let q11d: number = 0;
          let q11e: number = 0;
          let q1p2: number = 0;
          let q1p3: number = 0;
          let q1p4: number = 0;
          let q1p5: number = 0;
          let totalVHNDA: number = 8;
          let totalVHNDA_other: number = 9;

          if (this.obj.q11a != null) {
            q11a = 1;
          } else {
            q11a = 0;
          }

          if (this.obj.q11b != null) {
            q11b = 1;
          } else {
            q11b = 0;
          }

          if (this.obj.q11c != null) {
            q11c = 1;
          } else {
            q11c = 0;
          }

          if (this.obj.q11d != null) {
            q11d = 1;
          } else {
            q11d = 0;
          }

          if (this.obj.q11e != null) {
            q11e = 1;
          } else {
            q11e = 0;
          }

          if (this.obj.q1p2 != null) {
            q1p2 = 1;
          } else {
            q1p2 = 0;
          }

          if (this.obj.q1p3 != null) {
            q1p3 = 1;
          } else {
            q1p3 = 0;
          }

          if (this.obj.q1p4 != null) {
            this.e1Score=(this.obj.q1p4==39?MessageProvider.COMMUNITY_SCORE.c_VHNDA_other_score:MessageProvider.COMMUNITY_SCORE.c_VHNDA_score);
            q1p4 = 1;
          } else {
            q1p4 = 0;
          }

          if (this.obj.q1p5 != null) {
            q1p5 = 1;
          } else {
            q1p5 = 0;
          }

          if(this.obj.q1p4==39){
            let filledUpVHNDA = q11a + q11b + q11c + q11d + q11e + q1p2 + q1p3 + q1p4 + q1p5;
            this.progressBarObj.loadProgress_VHNDA = Math.round(((filledUpVHNDA / totalVHNDA_other) * 100));
          }else{
            let filledUpVHNDA = q11a + q11b + q11c + q11d + q11e + q1p2 + q1p3 + q1p4;
            this.progressBarObj.loadProgress_VHNDA = Math.round(((filledUpVHNDA / totalVHNDA) * 100));
          }
          
          this.setPercentCSS('vhnda_id',this.progressBarObj.loadProgress_VHNDA);
        break;
        case 3:

          let q21: number = 0;
          let q22: number = 0;
          let q23: number = 0;
          let q24: number = 0;
          let q25: number = 0;
          let q251: number = 0;
          let q26: number = 0;
          let q27: number = 0;
          let totalIWANM: number = 8;

          if (this.obj.q21 != null) {
            q21 = 1;
          } else {
            q21 = 0;
          }

          if (this.obj.q22 != null) {
            q22 = 1;
          } else {
            q22 = 0;
          }

          if (this.obj.q23 != null) {
            q23 = 1;
          } else {
            q23 = 0;
          }

          if (this.obj.q24 != null) {
            q24 = 1;
          } else {
            q24 = 0;
          }

          if (this.obj.q25 != null) {
            if (this.obj.q25.length > 0) {
              q25 = 1;
            } else {
              q25 = 0;
            }
          }else {
            q25 = 0;
          }

          if (this.obj.q251 != null) {
            if (this.obj.q251.length > 0) {
              q251 = 1;
            } else {
              q251 = 0;
            }
          }else {
            q251 = 0;
          }

          if (this.obj.q26 != null) {
            q26 = 1;
          } else {
            q26 = 0;
          }

          if (this.obj.q27 != null) {
            q27 = 1;
          } else {
            q27 = 0;
          }

          let filledUpIWANM = q21 + q22 + q23 + q24 + q25 + q251 + q26 + q27;
          this.progressBarObj.loadProgress_IWANM = Math.round(((filledUpIWANM / totalIWANM) * 100));
          this.setPercentCSS('iwanm_id',this.progressBarObj.loadProgress_IWANM);
        break;
        case 41:

          let q31: number = 0;
          let q31a: number = 0;
          let q31b: number = 0;
          let q31c: number = 0;
          let q31d: number = 0;
          let q311: number = 0;
          let q32: number = 0;
          let q321: number = 0;
          let q33: number = 0;
          let q331: number = 0;
          let q34: number = 0;
          let q35: number = 0;
          let q36: number = 0;
          let total_IA_IASHA_default: number = 11;
          let total_IA_IASHA_other: number = 12;
          let total_IA_IASHA: number = 13;
          let total_IA_IASHA_optional: number = 1;

          if (this.obj.q31 != null) {
            q31 = 1;
          } else {
            q31 = 0;
          }

          if (this.obj.q31a != null) {
            q31a = 1;
          } else {
            q31a = 0;
          }

          if (this.obj.q31b != null) {
            q31b = 1;
          } else {
            q31b = 0;
          }

          if (this.obj.q31c != null) {
            q31c = 1;
          } else {
            q31c = 0;
          }

          if (this.obj.q31d != null) {
            q31d = 1;
          } else {
            q31d = 0;
          }

          if (this.obj.q311 != null) {
            q311 = 1;
          } else {
            q311 = 0;
          }

          if (this.obj.q32 != null) {
            this.e3Score=((this.obj.q31==34 || this.obj.q31==undefined)?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_optional:
                (this.obj.q32==26 && this.obj.q33>0)?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_other_score:
                (this.obj.q32==26 && (this.obj.q33!>0 || this.obj.q33==null || this.obj.q33==""))?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_default:
                (this.obj.q32!=26 && this.obj.q33>0)?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_default:
                (this.obj.q32==26 && this.obj.q33==0)?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_default:
                MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score);
            q32 = 1;
          } else {
            this.e3Score=((this.obj.q31==34 || this.obj.q31==undefined)?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_optional:
                (this.obj.q32==26 && this.obj.q33>0)?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_other_score:
                (this.obj.q32==26 && (this.obj.q33!>0 || this.obj.q33==null || this.obj.q33==""))?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_default:
                (this.obj.q32!=26 && this.obj.q33>0)?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_default:
                (this.obj.q32==26 && this.obj.q33==0)?MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score_default:
                MessageProvider.COMMUNITY_SCORE.c_IA_IASHA_score);
            q32 = 0;
          }

          if (this.obj.q321 != null) {
            q321 = 1;
          } else {
            q321 = 0;
          }

          if (this.obj.q33 != null) {
            if (this.obj.q33.length > 0) {
              q33 = 1;
            } else {
              q33 = 0;
            }
          }else {
            q33 = 0;
          }

          if (this.obj.q331 != null) {
            q331 = 1;
          } else {
            q331 = 0;
          }

          if (this.obj.q34 != null) {
            q34 = 1;
          } else {
            q34 = 0;
          }

          if (this.obj.q35 != null) {
            q35 = 1;
          } else {
            q35 = 0;
          }

          if (this.obj.q36 != null) {
            q36 = 1;
          } else {
            q36 = 0;
          }

          if(this.obj.q31==34 || this.obj.q31==undefined){
            let filledUp_IA_IASHA = q31;
            this.progressBarObj.loadProgress_IA_IASHA = Math.round(((filledUp_IA_IASHA / total_IA_IASHA_optional) * 100));
          }else if(this.obj.q32==26 && this.obj.q33>0){
            let filledUp_IA_IASHA = q31 + q31a + q31b + q31c + q31d + q311 + q32 + q321 + q33 + q331 + q34 + q35 + q36;
            this.progressBarObj.loadProgress_IA_IASHA = Math.round(((filledUp_IA_IASHA / total_IA_IASHA) * 100));
          }else if(this.obj.q32==26 && (this.obj.q33!>0 || this.obj.q33==null || this.obj.q33=="")){
            let filledUp_IA_IASHA = q31 + q31a + q31b + q31c + q31d + q311 + q32 + q321 + q33 + q34 + q35 + q36;
            this.progressBarObj.loadProgress_IA_IASHA = Math.round(((filledUp_IA_IASHA / total_IA_IASHA_other) * 100));
          }else if(this.obj.q32!=26 && this.obj.q33>0){
            let filledUp_IA_IASHA = q31 + q31a + q31b + q31c + q31d + q311 + q32 + q33 + q331 + q34 + q35 + q36;
            this.progressBarObj.loadProgress_IA_IASHA = Math.round(((filledUp_IA_IASHA / total_IA_IASHA_other) * 100));
          }else if(this.obj.q32==26 && this.obj.q33==0){
            let filledUp_IA_IASHA = q31 + q31a + q31b + q31c + q31d + q311 + q32 + q321 + q33 + q34 + q35 + q36;
            this.progressBarObj.loadProgress_IA_IASHA = Math.round(((filledUp_IA_IASHA / total_IA_IASHA_other) * 100));
          }else{
            let filledUp_IA_IASHA = q31 + q31a + q31b + q31c + q31d + q311 + q32 + q321 + q33 + q34 + q35 + q36;
            this.progressBarObj.loadProgress_IA_IASHA = Math.round(((filledUp_IA_IASHA / total_IA_IASHA_default) * 100));
          }
          this.setPercentCSS('iasha_id',this.progressBarObj.loadProgress_IA_IASHA);
        break;
        case 42:

          let q37a: number = 0;
          let q37b: number = 0;
          let q37c: number = 0;
          let q37d: number = 0;
          let q37e: number = 0;
          let total_IA_AOECWASA: number = 5;

          if (this.obj.q37a != null) {
            q37a = 1;
          } else {
            q37a = 0;
          }

          if (this.obj.q37b != null) {
            q37b = 1;
          } else {
            q37b = 0;
          }

          if (this.obj.q37c != null) {
            q37c = 1;
          } else {
            q37c = 0;
          }

          if (this.obj.q37d != null) {
            q37d = 1;
          } else {
            q37d = 0;
          }

          if (this.obj.q37e != null) {
            q37e = 1;
          } else {
            q37e = 0;
          }

          let filledUp_IA_AOECWASA = q37a + q37b + q37c + q37d + q37e;
          this.progressBarObj.loadProgress_IA_AOECWASA = Math.round(((filledUp_IA_AOECWASA / total_IA_AOECWASA) * 100));
          this.setPercentCSS('aoecwasa_id',this.progressBarObj.loadProgress_IA_AOECWASA);
        break;
        case 43:

          let q37fi: number = 0;
          let q37fii: number = 0;
          let total_IA_AIWA: number = 2;

          if (this.obj.q37fi != null) {
            q37fi = 1;
          } else {
            q37fi = 0;
          }

          if (this.obj.q37fii != null) {
            q37fii = 1;
          } else {
            q37fii = 0;
          }

          let filledUp_IA_AIWA = q37fi + q37fii;
          this.progressBarObj.loadProgress_IA_AIWA = Math.round(((filledUp_IA_AIWA / total_IA_AIWA) * 100));
          this.setPercentCSS('aiwa_id',this.progressBarObj.loadProgress_IA_AIWA);
        break;
        case 44:

          let q37gi: number = 0;
          let q37gii: number = 0;
          let q37h: number = 0;
          let q37i: number = 0;
          let q37j: number = 0;
          let q37k: number = 0;
          let q37l: number = 0;
          let total_IA_AISA: number = 7;

          if (this.obj.q37gi != null) {
            q37gi = 1;
          } else {
            q37gi = 0;
          }

          if (this.obj.q37gii != null) {
            q37gii = 1;
          } else {
            q37gii = 0;
          }

          if (this.obj.q37h != null) {
            q37h = 1;
          } else {
            q37h = 0;
          }

          if (this.obj.q37i != null) {
            q37i = 1;
          } else {
            q37i = 0;
          }

          if (this.obj.q37j != null) {
            q37j = 1;
          } else {
            q37j = 0;
          }

          if (this.obj.q37k != null) {
            q37k = 1;
          } else {
            q37k = 0;
          }

          if (this.obj.q37l != null) {
            q37l = 1;
          } else {
            q37l = 0;
          }

          let filledUp_IA_AISA = q37gi + q37gii + q37h + q37i + q37j + q37k + q37l;
          this.progressBarObj.loadProgress_IA_AISA = Math.round(((filledUp_IA_AISA / total_IA_AISA) * 100));
          this.setPercentCSS('aisa_id',this.progressBarObj.loadProgress_IA_AISA);
        break;
        case 51:

          let q411: number = 0;
          let q412: number = 0;
          let q413: number = 0;
          let total_IB_IWPW: number = 3;

          if (this.obj.q411 != null) {
            q411 = 1;
          } else {
            q411 = 0;
          }

          if (this.obj.q412 != null) {
            q412 = 1;
          } else {
            q412 = 0;
          }

          if (this.obj.q413 != null) {
            q413 = 1;
          } else {
            q413 = 0;
          }

          let filledUp_IB_IWPW = q411 + q412 + q413;
          this.progressBarObj.loadProgress_IB_IWPW = Math.round(((filledUp_IB_IWPW / total_IB_IWPW) * 100));
          this.setPercentCSS('iwpw_id',this.progressBarObj.loadProgress_IB_IWPW);
        break;
        case 52:

          let q421: number = 0;
          let q422: number = 0;
          let q423a: number = 0;
          let q423b: number = 0;
          let q423c: number = 0;
          let q423d: number = 0;
          let q423e: number = 0;
          let q423I: number = 0;
          let total_IB_IWLMWMB: number = 1
          let total_IB_IWLMWMB_other: number = 8;

          if (this.obj.q421 != null) {
            q421 = 1;
            this.e8Score=(this.obj.q421==26?MessageProvider.COMMUNITY_SCORE.c_IB_IWLMWMB_other_score:MessageProvider.COMMUNITY_SCORE.c_IB_IWLMWMB_score);
          } else {
            q421 = 0;
          }

          if (this.obj.q422 != null) {
            q422 = 1;
          } else {
            q422 = 0;
          }

          if (this.obj.q423a != null) {
            q423a = 1;
          } else {
            q423a = 0;
          }

          if (this.obj.q423b != null) {
            q423b = 1;
          } else {
            q423b = 0;
          }

          if (this.obj.q423c != null) {
            q423c = 1;
          } else {
            q423c = 0;
          }

          if (this.obj.q423d != null) {
            q423d = 1;
          } else {
            q423d = 0;
          }

          if (this.obj.q423e != null) {
            q423e = 1;
          } else {
            q423e = 0;
          }

          if (this.obj.q423I != null) {
            q423I = 1;
          } else {
            q423I = 0;
          }

          if(this.obj.q421==26){
            let filledUp_IB_IWLMWMB = q421 + q422 + q423a + q423b + q423c + q423d + q423e + q423I;
            this.progressBarObj.loadProgress_IB_IWLMWMB = Math.round(((filledUp_IB_IWLMWMB / total_IB_IWLMWMB_other) * 100));
          } else {
            let filledUp_IB_IWLMWMB = q421;
            this.progressBarObj.loadProgress_IB_IWLMWMB = Math.round(((filledUp_IB_IWLMWMB / total_IB_IWLMWMB) * 100));
          }
          
          this.setPercentCSS('iwlmwmb_id',this.progressBarObj.loadProgress_IB_IWLMWMB);
        break;
        case 53:

          let q424a: number = 0;
          let q424b: number = 0;
          let q424c: number = 0;
          let q424d: number = 0;
          let q424e: number = 0;
          let q424f: number = 0;
          let q424g: number = 0;
          let q424h: number = 0;
          let q424i: number = 0;
          let q424j: number = 0;
          let total_IB_AASSRFWSD: number = 10;

          if (this.obj.q424a != null) {
            q424a = 1;
          } else {
            q424a = 0;
          }

          if (this.obj.q424b != null) {
            q424b = 1;
          } else {
            q424b = 0;
          }

          if (this.obj.q424c != null) {
            q424c = 1;
          } else {
            q424c = 0;
          }

          if (this.obj.q424d != null) {
            q424d = 1;
          } else {
            q424d = 0;
          }

          if (this.obj.q424e != null) {
            q424e = 1;
          } else {
            q424e = 0;
          }

          if (this.obj.q424f != null) {
            q424f = 1;
          } else {
            q424f = 0;
          }

          if (this.obj.q424g != null) {
            q424g = 1;
          } else {
            q424g = 0;
          }

          if (this.obj.q424h != null) {
            q424h = 1;
          } else {
            q424h = 0;
          }

          if (this.obj.q424i != null) {
            q424i = 1;
          } else {
            q424i = 0;
          }

          if (this.obj.q424j != null) {
            q424j = 1;
          } else {
            q424j = 0;
          }

          let filledUp_IB_AASSRFWSD = q424a + q424b + q424c + q424d + q424e + q424f + q424g + q424h + q424i + q424j;
          this.progressBarObj.loadProgress_IB_AASSRFWSD = Math.round(((filledUp_IB_AASSRFWSD / total_IB_AASSRFWSD) * 100));
          this.setPercentCSS('aassrfwsd_id',this.progressBarObj.loadProgress_IB_AASSRFWSD);
        break;
        case 54:

          let q431: number = 0;
          let q431a: number = 0;
          let q431b: number = 0;
          let q432: number = 0;
          let q433: number = 0;
          let q434: number = 0;
          let q435: number = 0;
          let q436: number = 0;
          let q437: number = 0;
          let q437a: number = 0;
          let q437b: number = 0;
          let q437c: number = 0;
          let q437d: number = 0;
          let q437e: number = 0;
          let q437eI: number = 0;
          let total_IB_IMWCM_hide: number = 13;
          let total_IB_IMWCM: number = 14;
          let total_IB_IMWCM_Other: number = 15;

          if (this.obj.q431 != null) {
            this.e10Score=(this.obj.q431==26?MessageProvider.COMMUNITY_SCORE.c_IB_IMWCM_other_score:MessageProvider.COMMUNITY_SCORE.c_IB_IMWCM_score);
            q431 = 1;
          } else {
            q431 = 0;
          }

          if (this.obj.q431a != null) {
            q431a = 1;
          } else {
            q431a = 0;
          }

          if (this.obj.q431b != null) {
            q431b = 1;
          } else {
            q431b = 0;
          }

          if (this.obj.q432 != null) {
            q432 = 1;
          } else {
            q432 = 0;
          }

          if (this.obj.q433 != null) {
            q433 = 1;
          } else {
            q433 = 0;
          }

          if (this.obj.q434 != null) {
            q434 = 1;
          } else {
            q434 = 0;
          }

          if (this.obj.q435 != null) {
            q435 = 1;
          } else {
            q435 = 0;
          }

          if (this.obj.q436 != null) {
            q436 = 1;
          } else {
            q436 = 0;
          }

          if (this.obj.q437 != null) {
            if (this.obj.q437.length > 0) {
              q437 = 1;
            } else {
              q437 = 0;
            }
          }else {
            q437 = 0;
          }

          if (this.obj.q437a != null) {
            q437a = 1;
          } else {
            q437a = 0;
          }

          if (this.obj.q437b != null) {
            q437b = 1;
          } else {
            q437b = 0;
          }

          if (this.obj.q437c != null) {
            q437c = 1;
          } else {
            q437c = 0;
          }

          if (this.obj.q437d != null) {
            q437d = 1;
          } else {
            q437d = 0;
          }

          if (this.obj.q437e != null) {
            q437e = 1;
          } else {
            q437e = 0;
          }

          if (this.obj.q437eI != null) {
            if (this.obj.q437eI.length > 0) {
              q437eI = 1;
            } else {
              q437eI = 0;
            }
          }else {
            q437eI = 0;
          }

          if(this.obj.q431 == 26 && this.obj.q437e == 26){
            let filledUp_IB_IMWCM = q431 + q431a + q431b + q432 + q433 + q434 + q435 + q436 + q437 + q437a + q437b + q437c + q437d + q437e + q437eI;
            this.progressBarObj.loadProgress_IB_IMWCM = Math.round(((filledUp_IB_IMWCM / total_IB_IMWCM_Other) * 100));
          }else if(this.obj.q431 == 26 && this.obj.q437e != 26){
            let filledUp_IB_IMWCM = q431 + q431a + q431b + q432 + q433 + q434 + q435 + q436 + q437 + q437a + q437b + q437c + q437d + q437e;
            this.progressBarObj.loadProgress_IB_IMWCM = Math.round(((filledUp_IB_IMWCM / total_IB_IMWCM) * 100));
          }else if(this.obj.q431 != 26 && this.obj.q437e == 26){
            let filledUp_IB_IMWCM = q431 + q431a + q432 + q433 + q434 + q435 + q436 + q437 + q437a + q437b + q437c + q437d + q437e + q437eI;
            this.progressBarObj.loadProgress_IB_IMWCM = Math.round(((filledUp_IB_IMWCM / total_IB_IMWCM) * 100));
          }else{
            let filledUp_IB_IMWCM = q431 + q431a + q432 + q433 + q434 + q435 + q436 + q437 + q437a + q437b + q437c + q437d + q437e;
            this.progressBarObj.loadProgress_IB_IMWCM = Math.round(((filledUp_IB_IMWCM / total_IB_IMWCM_hide) * 100));
          }
          this.setPercentCSS('ib_imwcm_id',this.progressBarObj.loadProgress_IB_IMWCM);
        break;
        case 55:

          let q441: number = 0;
          let q442: number = 0;
          let q443: number = 0;
          let q444: number = 0;
          let q445: number = 0;
          let q446a: number = 0;
          let q446b: number = 0;
          let q446c: number = 0;
          let q447: number = 0;
          let total_IB_IWBMPWPM: number = 1
          let total_IB_IWBMPWPM_other: number = 9;
        
          if (this.obj.q441 != null) {
            this.e11Score=(this.obj.q441==26?MessageProvider.COMMUNITY_SCORE.c_IB_IWBMPWPM_other_score:MessageProvider.COMMUNITY_SCORE.c_IB_IWBMPWPM_score);
            q441 = 1;
          } else {
            q441 = 0;
          }

          if (this.obj.q442 != null) {
            q442 = 1;
          } else {
            q442 = 0;
          }

          if (this.obj.q443 != null) {
            q443 = 1;
          } else {
            q443 = 0;
          }

          if (this.obj.q444 != null) {
            q444 = 1;
          } else {
            q444 = 0;
          }

          if (this.obj.q445 != null) {
            q445 = 1;
          } else {
            q445 = 0;
          }

          if (this.obj.q446a != null) {
            q446a = 1;
          } else {
            q446a = 0;
          }

          if (this.obj.q446b != null) {
            q446b = 1;
          } else {
            q446b = 0;
          }

          if (this.obj.q446c != null) {
            q446c = 1;
          } else {
            q446c = 0;
          }

          if (this.obj.q447 != null) {
            q447 = 1;
          } else {
            q447 = 0;
          }

          if(this.obj.q441==26){
            let filledUp_IB_IWBMPWPM = q441 + q442 + q443 + q444 + q445 + q446a + q446b + q446c + q447;
            this.progressBarObj.loadProgress_IB_IWBMPWPM = Math.round(((filledUp_IB_IWBMPWPM / total_IB_IWBMPWPM_other) * 100));
          } else {
            let filledUp_IB_IWBMPWPM = q441;
            this.progressBarObj.loadProgress_IB_IWBMPWPM = Math.round(((filledUp_IB_IWBMPWPM / total_IB_IWBMPWPM) * 100));
          }
          this.setPercentCSS('iwbmpwpm_id',this.progressBarObj.loadProgress_IB_IWBMPWPM);
        break;
        case 56:
         
          let q451: number = 0;
          let q452: number = 0;
          let q453: number = 0;
          let total_IB_IWFHA: number = 3;

          if (this.obj.q451 != null) {
            q451 = 1;
          } else {
            q451 = 0;
          }

          if (this.obj.q452 != null) {
            q452 = 1;
          } else {
            q452 = 0;
          }

          if (this.obj.q453 != null) {
            q453 = 1;
          } else {
            q453 = 0;
          }

          let filledUp_IB_IWFHA = q451 + q452 + q453;
          this.progressBarObj.loadProgress_IB_IWFHA = Math.round(((filledUp_IB_IWFHA / total_IB_IWFHA) * 100));
          this.setPercentCSS('ib_iwfha_id',this.progressBarObj.loadProgress_IB_IWFHA);
        break;
        case 57:

          let q461a: number = 0;
          let q461b: number = 0;
          let q461c: number = 0;
          let q461d: number = 0;
          let q461e: number = 0;
          let q461eI: number = 0;
          let q462a: number = 0;
          let q462b: number = 0;
          let q462c: number = 0;
          let q463: number = 0;
          let total_IB_IHHD: number = 9;
          let total_IB_IHHD_Other: number = 10;

          if (this.obj.q461a != null) {
            q461a = 1;
          } else {
            q461a = 0;
          }

          if (this.obj.q461b != null) {
            q461b = 1;
          } else {
            q461b = 0;
          }

          if (this.obj.q461c != null) {
            q461c = 1;
          } else {
            q461c = 0;
          }

          if (this.obj.q461d != null) {
            q461d = 1;
          } else {
            q461d = 0;
          }

          if (this.obj.q461e != null) {
            q461e = 1;
          } else {
            q461e = 0;
          }

          if (this.obj.q461eI != null) {
            if (this.obj.q461eI.length > 0) {
              q461eI = 1;
            } else {
              q461eI = 0;
            }
          }else {
            q461eI = 0;
          }

          if (this.obj.q462a != null) {
            q462a = 1;
          } else {
            q462a = 0;
          }

          if (this.obj.q462b != null) {
            q462b = 1;
          } else {
            q462b = 0;
          }

          if (this.obj.q462c != null) {
            q462c = 1;
          } else {
            q462c = 0;
          }

          if (this.obj.q463 != null) {
            q463 = 1;
          } else {
            q463 = 0;
          }

          if(this.obj.q461e == 26){
            let filledUp_IB_IHHD = q461a + q461b + q461c + q461d + q461e + q461eI + q462a + q462b + q462c + q463;
            this.progressBarObj.loadProgress_IB_IHHD = Math.round(((filledUp_IB_IHHD / total_IB_IHHD_Other) * 100));
          }else{
            let filledUp_IB_IHHD = q461a + q461b + q461c + q461d + q461e + q462a + q462b + q462c + q463;
            this.progressBarObj.loadProgress_IB_IHHD = Math.round(((filledUp_IB_IHHD / total_IB_IHHD) * 100));
          }
          this.setPercentCSS('ib_ihhd_id',this.progressBarObj.loadProgress_IB_IHHD);
        break;
        case 58:

          let q471: number = 0;
          let q471a: number = 0;
          let q472: number = 0;
          let q473: number = 0;
          let q474: number = 0;
          let q474a: number = 0;
          let q475: number = 0;
          let q476: number = 0;
          let total_IB_SAIWWNTA: number = 8;

          if (this.obj.q471 != null) {
            q471 = 1;
          } else {
            q471 = 0;
          }

          if (this.obj.q471a != null) {
            q471a = 1;
          } else {
            q471a = 0;
          }

          if (this.obj.q472 != null) {
            q472 = 1;
          } else {
            q472 = 0;
          }

          if (this.obj.q473 != null) {
            q473 = 1;
          } else {
            q473 = 0;
          }

          if (this.obj.q474 != null) {
            q474 = 1;
          } else {
            q474 = 0;
          }

          if (this.obj.q474a != null) {
            q474a = 1;
          } else {
            q474a = 0;
          }

          if (this.obj.q475 != null) {
            q475 = 1;
          } else {
            q475 = 0;
          }

          if (this.obj.q476 != null) {
            q476 = 1;
          } else {
            q476 = 0;
          }

          let filledUp_IB_SAIWWNTA = q471 + q471a + q472 + q473 + q474 + q474a + q475 + q476;
          this.progressBarObj.loadProgress_IB_SAIWWNTA = Math.round(((filledUp_IB_SAIWWNTA / total_IB_SAIWWNTA) * 100));
          this.setPercentCSS('ib_saiwwnta_id',this.progressBarObj.loadProgress_IB_SAIWWNTA);
        break;
        case 6:

          let q8: number = 0;
          let q9: number = 0;
          let q10: number = 0;
          let q11: number = 0;
          let q12: number = 0;
          let q13: number = 0;
          let q14: number = 0;
          let q15: number = 0;
          let total_Plan_Of_Action: number = 8;

          if (this.obj.q8 != null) {
            if (this.obj.q8.length > 0) {
              q8 = 1;
            } else {
              q8 = 0;
            }
          }else {
            q8 = 0;
          }

          if (this.obj.q9 != null) {
            if (this.obj.q9.length > 0) {
              q9 = 1;
            } else {
              q9 = 0;
            }
          }else {
            q9 = 0;
          }

          if (this.obj.q10 != null) {
            if (this.obj.q10.length > 0) {
              q10 = 1;
            } else {
              q10 = 0;
            }
          }else {
            q10 = 0;
          }

          if (this.obj.q11 != null) {
            if (this.obj.q11.length > 0) {
              q11 = 1;
            } else {
              q11 = 0;
            }
          }else {
            q11 = 0;
          }

          if (this.obj.q12 != null) {
            if (this.obj.q12.length > 0) {
              q12 = 1;
            } else {
              q12 = 0;
            }
          }else {
            q12 = 0;
          }

          if (this.obj.q13 != null) {
            if (this.obj.q13.length > 0) {
              q13 = 1;
            } else {
              q13 = 0;
            }
          }else {
            q13 = 0;
          }

          if (this.obj.q14 != null) {
            if (this.obj.q14.length > 0) {
              q14 = 1;
            } else {
              q14 = 0;
            }
          }else {
            q14 = 0;
          }

          if (this.obj.q15 != null) {
            if (this.obj.q15.length > 0) {
              q15 = 1;
            } else {
              q15 = 0;
            }
          }else {
            q15 = 0;
          }

          let filledUp_Plan_Of_Action = q8 + q9 + q10 + q11 + q12 + q13 + q14 + q15;
          this.progressBarObj.loadProgress_Plan_Of_Action = Math.round(((filledUp_Plan_Of_Action / total_Plan_Of_Action) * 100));
          this.setPercentCSS('ib_plan_of_action_id',this.progressBarObj.loadProgress_Plan_Of_Action);
        break;
        case 7:
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
            this.progressBarObj.loadProgress_Geo_coordinate = Math.round(( (geo_coordinate_filledUp /geo_coordinate_total) * 100));
            this.setPercentCSS('geo_coordinate_id',this.progressBarObj.loadProgress_Geo_coordinate); 
        break;
     }
}
    }
}
}