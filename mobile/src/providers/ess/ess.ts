/*
 * @Author: Ratikanta Pradhan 
 * @email:   ratikanta@sdrc.co.in 
 * @Date: 2017-12-01 14:32:32 
 * @Last Modified by: Ratikanta Pradhan
 * @Last Modified time: 2018-01-07 23:41:22
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { MessageProvider } from '../message/message';

/**
 * This provider will be used to common data sharing accross components
 * @author Ratikanta Pradhan
 * @since 2.0.0
 */
@Injectable()
export class EssProvider {

  /**
   * This prperty will tell us version name of the app. It is set to '2.1.0' becuase the current version is 
   * '2.1.0'.
   * We have to change the it accordingly. Yes we can get it from android device, when it comes to PWA, 
   * the default will help us.
   */
  private appVersionName : string = '2.1.0'

  /**
   * This property will give us the maximum possible score or respective sub section.
   * Later we will decrease according to dependency
   * 
   * @author Ratikanta
   * @since 2.1.0
   */
  private subSectionMaxscores : any = {
    ANCSubSectionMaxScore: 10,
    IPIPPP : 10,
    ENBCRC : 10,
    FAMILY_PLANNING : 5,
    CLIENT_SATISFACTION : 8,
    FMO : 6,
    ADOLESCENT_HEALTH : 11

  }

  /**
   * This property holds the string value of score names of sub sections
   * It will help us in switch cases
   * 
   * @author Ratikanta
   * @since 2.1.0
   */
  static SCORE_NAMES : any = {
    ANC_SUB_SECTION_SCORE: 'anteNatalCareSubSectionMaxScore'
  }


  /**
   * This property will help us know the sub sector number.
   * We can use it in switch cases
   * 
   * @author Ratikanta
   * @since 2.1.0
   */
  static SUB_SECTOR_NUMBER : any = {
      ANC_SUB_SECTOR_NUMBER : 41,
      IPIPPP : 42,
      ENBCRC : 43,
      FAMILY_PLANNING : 44,
      CLIENT_SATISFACTION : 45,
      FMO : 46,
      ADOLESCENT_HEALTH: 47
  }

  /**
   * This property contains the yes/no/don't know type details id in string
   * 
   * @author Ratikanta
   * @since 2.1.0
   */
  static BOOLEAN_RESPONSE : any = {
    YES: '26'
  }

  


  /**
   * This property contains the yes/no/don't know type details id in number
   * 
   * @author Ratikanta
   * @since 2.1.0
   */
  static BOOLEAN_RESPONSE_NUMBER : any = {
    YES: 26
  }


  /**
   * This property contains total no. of question we have in a sub section.
   * This will denominator in percentage calculation
   * 
   * @author Ratikanta
   * @since 2.1.0
   */
  static TOTAL_NO_OF_QUESTION_FOR_PROGRESSBAR: any = {
    ANC_SUB_SECTOR: 11,
    IPIPPP: 10,
    ENBCRC : 10,
    FAMILY_PLANNING : 5,
    CLIENT_SATISFACTION : 8,
    FMO : 6,
    ADOLESCENT_HEALTH: 11
  }

  static TypeDetailIds : any = {
    facilityLevelL1 : "30",
    facilityLevelL2 : "31",
    facilityLevelL3 : "32",
    facilityLevelL4 : "48"
  }

  /**
   * It defines the ess data entry platform
   * @author Ratikanta
   * @since 2.1.0
   */
  private platform: ESSPlatform

  constructor(public http: Http) {}

  setAppVersionName(appVersionName: string){
    this.appVersionName = appVersionName
  }

  getAppVersionName() : string{
    return this.appVersionName
  }

  getSubSectionMaxscores(){
    return this.subSectionMaxscores
  }

  getPlatform(){
    return this.platform
  }

  setPlatform(platform: ESSPlatform){
    this.platform = platform
  }

  /**
   * This method is going to calculate the percentage of progress bar
   * 
   * @param {number} subSectorNumber the subsector number of which we will calculate the percentage
   * @param {any} object The facilty/ community global object(for now ony facility)
   * @return {number} the percentage
   * @author Ratikanta
   * @since 2.1.0
   * 
   */
  calculateProgressBarPercentage(subSectorNumber: number, object: any): number{
    let totalNumberOfQuestion = 0
    let respondedQuestions = 0
    switch(subSectorNumber){
      case EssProvider.SUB_SECTOR_NUMBER.ANC_SUB_SECTOR_NUMBER:      
      if(object.f11 != null){
        try{
          if(parseInt(object.f11) === 0)
            return 100
        }catch(err){
          return 0
        }
        totalNumberOfQuestion = EssProvider.TOTAL_NO_OF_QUESTION_FOR_PROGRESSBAR.ANC_SUB_SECTOR
        //checking blood presure question visible or not
      if(!(object.e233 === EssProvider.BOOLEAN_RESPONSE.YES && object.e234 === EssProvider.BOOLEAN_RESPONSE.YES)){
        totalNumberOfQuestion--
      }

      //checking Blood glucose measured is Dependent on availability of Glucometer
        if(!(object.e104 === EssProvider.BOOLEAN_RESPONSE.YES)){
          totalNumberOfQuestion--
        }

        //checking Urine albumin estimate is Dependent on availability of Urine albumin kit
        if(!(object.e231 === EssProvider.BOOLEAN_RESPONSE.YES)){
          totalNumberOfQuestion--
        }

        //checking Universal HIV screening is Dependent on availability of HIV testing kit
        if(!(object.e229 === EssProvider.BOOLEAN_RESPONSE.YES)){
          totalNumberOfQuestion--
        }

        //checking Hypothyroidism screening done for high risk ANC cases  is Dependent on availability of Auto analyzer
        if(!(
        
           (object.c43 === MessageProvider.FACILITY_TYPE_IDS.DH_TYPE_ID || 
            object.c43 === MessageProvider.FACILITY_TYPE_IDS.AREA_HOSPITAL_TYPE_ID)

            && (object.e108 === EssProvider.BOOLEAN_RESPONSE.YES || object.e109 === EssProvider.BOOLEAN_RESPONSE.YES) 
        
        
        
        )){
          totalNumberOfQuestion--
        }

        //checking Malaria testing (for malaria endemic areas only) is Dependent on availability of Rapid Diagnostic Test kit for Malaria
        if(!(object.e217 === EssProvider.BOOLEAN_RESPONSE.YES)){
          totalNumberOfQuestion--
        } 


      if(object.f11 != null && object.f11.length > 0)
        respondedQuestions++      
      if(object.f12 != null)
        respondedQuestions++
      if (object.f13 != null)
        respondedQuestions++
      if (object.f14 != null)
        respondedQuestions++
      if(object.f15 != null)
        respondedQuestions++
      if (object.f16 != null)
        respondedQuestions++
      if (object.f17 != null)
        respondedQuestions++
      if(object.f18 != null)
        respondedQuestions++
      if (object.f19 != null)
        respondedQuestions++
      if (object.f110 != null)
        respondedQuestions++
      if(object.f111 != null)
        respondedQuestions++




      }else{
        totalNumberOfQuestion = 1
      }
      

      
      

      

      break;





      case EssProvider.SUB_SECTOR_NUMBER.IPIPPP:
      totalNumberOfQuestion = EssProvider.TOTAL_NO_OF_QUESTION_FOR_PROGRESSBAR.IPIPPP  

      //Foetal heart rate (FHR) recorded at time of admission is Dependent on availability of Foetoscope/Foetal doppler
      if(!(object.e236 === EssProvider.BOOLEAN_RESPONSE.YES)){
        totalNumberOfQuestion--
      }

      //Mothers BP recorded at the time of admission is Dependent on availability of BP apparatus
      if(!(object.e233 === EssProvider.BOOLEAN_RESPONSE.YES && object.e234 === EssProvider.BOOLEAN_RESPONSE.YES)){
        totalNumberOfQuestion--
      }

      //Partograph used to monitor progress of labour is Dependent on availability of partograph
      if(!(object.e223 === EssProvider.BOOLEAN_RESPONSE.YES)){
        totalNumberOfQuestion--
      }

      //Antenatal corticosteroids used for preterm delivery is Dependent on availability of Inj. Dexamethasone
      if(!(object.e26 === EssProvider.BOOLEAN_RESPONSE.YES)){
        totalNumberOfQuestion--
      }

      //Magnesium sulphate used for eclampsia management is Dependent on availability of Inj. Mag sulphate
      if(!(object.e25 === EssProvider.BOOLEAN_RESPONSE.YES)){
        totalNumberOfQuestion--
      }

      //Active Management of third stage of labor being performed is Dependent on availability of oxytocin available
      //OR
      //Active Management of third stage of labor being performed is Dependent on availability of Tab. Misoprostol
      if(!(object.e21 === EssProvider.BOOLEAN_RESPONSE.YES || object.e23 === EssProvider.BOOLEAN_RESPONSE.YES)){
        totalNumberOfQuestion--
      }

      if(object.f21 != null)
        respondedQuestions++      
      if(object.f22 != null)
        respondedQuestions++
      if (object.f23 != null)
        respondedQuestions++
      if (object.f24 != null)
        respondedQuestions++
      if(object.f25 != null)
        respondedQuestions++
      if (object.f26 != null)
        respondedQuestions++
      if (object.f27 != null)
        respondedQuestions++
      if(object.f28 != null)
        respondedQuestions++
      if (object.f29 != null)
        respondedQuestions++
      if (object.f210 != null)
        respondedQuestions++


      break;






      case EssProvider.SUB_SECTOR_NUMBER.ENBCRC:
      totalNumberOfQuestion = EssProvider.TOTAL_NO_OF_QUESTION_FOR_PROGRESSBAR.ENBCRC  

      //Babies dried with clean/sterile towels just after delivery is Dependent on availability of Clean Towels/drape
      if(!(object.e39 === EssProvider.BOOLEAN_RESPONSE.YES)){
        totalNumberOfQuestion--
      }

      //Delayed cord cutting (1-3 mins) practiced is Dependent on availability of cord tie/clamps
      if(!(object.e310 === EssProvider.BOOLEAN_RESPONSE.YES)){
        totalNumberOfQuestion--
      }

      //baby weighed is Dependent on availability of Newborn weighing machine
      if(!(object.e311 === EssProvider.BOOLEAN_RESPONSE.YES)){
        totalNumberOfQuestion--
      }

      //Vitamin K1 administered to all newborns (within 24 hours of birth) is Dependent on availability of Vitamin K1
      if(!(object.e31 === EssProvider.BOOLEAN_RESPONSE.YES)){
        totalNumberOfQuestion--
      }

      //Newborns given BCG, OPV, Hep B within 24 hours of birth is Dependent on availability of BCG and OPV and HEP B
      if(!(object.e51 === EssProvider.BOOLEAN_RESPONSE.YES && object.e52 === EssProvider.BOOLEAN_RESPONSE.YES && object.e53 === EssProvider.BOOLEAN_RESPONSE.YES)){
        totalNumberOfQuestion--
      }

      //Question F.3.10. KMC practiced for Low birth Weight in Post-natal ward:, is not application to following facility types
      if(!(object.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID && 
            object.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID && 
            object.c43 != MessageProvider.FACILITY_TYPE_IDS.PHC_247_TYPE_ID && 
            object.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_PRU_CHC_TYPE_ID )){
        totalNumberOfQuestion--
      }

      if(object.f31 != null)
        respondedQuestions++      
      if(object.f32 != null)
        respondedQuestions++
      if (object.f33 != null)
        respondedQuestions++
      if (object.f34 != null)
        respondedQuestions++
      if(object.f35 != null)
        respondedQuestions++
      if (object.f36 != null)
        respondedQuestions++
      if (object.f37 != null)
        respondedQuestions++
      if(object.f38 != null)
        respondedQuestions++
      if (object.f39 != null)
        respondedQuestions++
      if (object.f310 != null)
        respondedQuestions++


      break;






      case EssProvider.SUB_SECTOR_NUMBER.FAMILY_PLANNING:
      totalNumberOfQuestion = EssProvider.TOTAL_NO_OF_QUESTION_FOR_PROGRESSBAR.FAMILY_PLANNING  

      
        //PPIUCD insertions is Dependent on availability of 380A/375
        if(!(object.e111 === EssProvider.BOOLEAN_RESPONSE.YES || object.e112 === EssProvider.BOOLEAN_RESPONSE.YES)){
          totalNumberOfQuestion--
        }

        //Interval IUCD insertions is Dependent on availability of 380A/375
        if(!(object.e111 === EssProvider.BOOLEAN_RESPONSE.YES || object.e112 === EssProvider.BOOLEAN_RESPONSE.YES)){
          totalNumberOfQuestion--
        }

        //Question F.4.4. Sterilization procedures (Fixed Day Static Services):, is not application to following facility types
        if(!(object.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID && 
          object.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID && 
          object.c43 != MessageProvider.FACILITY_TYPE_IDS.PHC_247_TYPE_ID && 
          object.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_PRU_CHC_TYPE_ID ))
          {
          totalNumberOfQuestion--
        }

        //Question F.4.5. Sterilization procedures (Fixed Day Camps):, is only application to following facility types
        if(!(object.c43 === MessageProvider.FACILITY_TYPE_IDS.PHC_247_TYPE_ID ||
          object.c43 === MessageProvider.FACILITY_TYPE_IDS.NON_PRU_CHC_TYPE_ID )) {
          totalNumberOfQuestion--
        }

      if(object.f41 != null)
        respondedQuestions++      
      if(object.f42 != null)
        respondedQuestions++
      if (object.f43 != null)
        respondedQuestions++
      if (object.f44 != null)
        respondedQuestions++
      if(object.f45 != null)
        respondedQuestions++
      break;






      case EssProvider.SUB_SECTOR_NUMBER.CLIENT_SATISFACTION:
      totalNumberOfQuestion = EssProvider.TOTAL_NO_OF_QUESTION_FOR_PROGRESSBAR.CLIENT_SATISFACTION  

      
      if(object.f51 != null)
        respondedQuestions++      
      if(object.f52 != null)
        respondedQuestions++
      if (object.f53 != null)
        respondedQuestions++
      if (object.f54 != null)
        respondedQuestions++
      if(object.f55 != null)
        respondedQuestions++
      if (object.f56 != null)
        respondedQuestions++
      if (object.f57 != null)
        respondedQuestions++
      if(object.f58 != null)
        respondedQuestions++
      break;





      case EssProvider.SUB_SECTOR_NUMBER.FMO:
      totalNumberOfQuestion = EssProvider.TOTAL_NO_OF_QUESTION_FOR_PROGRESSBAR.FMO  

      //Infection prevention being practiced and segregation being followed is Dependent on availability of Color coded bins
      if(!(object.e84 === EssProvider.BOOLEAN_RESPONSE.YES)){
        totalNumberOfQuestion--
      }

      //Disinfection practices being followed is Dependent on availability of Bleaching powder and (boiler or autoclave)
      if(!(object.e82 === EssProvider.BOOLEAN_RESPONSE.YES && (object.e88 === EssProvider.BOOLEAN_RESPONSE.YES || object.e87 === EssProvider.BOOLEAN_RESPONSE.YES))){
        totalNumberOfQuestion--
      }

      if(object.f61 != null)
        respondedQuestions++      
      if(object.f62 != null)
        respondedQuestions++
      if (object.f63 != null)
        respondedQuestions++
      if (object.f64 != null)
        respondedQuestions++
      if(object.f65 != null)
        respondedQuestions++
      if (object.f66 != null)
        respondedQuestions++
      break;





      case EssProvider.SUB_SECTOR_NUMBER.ADOLESCENT_HEALTH:
      totalNumberOfQuestion = EssProvider.TOTAL_NO_OF_QUESTION_FOR_PROGRESSBAR.ADOLESCENT_HEALTH  

      //Question F.7.1. Contraceptive available at AFHC:, not application for following facilities
      if(!(object.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
        object.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
        totalNumberOfQuestion--
      }

      //Question F.7.2. Contraceptive being given to client:, not application for following facilities
      if(!(object.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
        object.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
        totalNumberOfQuestion--
      }

      //Question F.7.3. Height Scale available:, not application for following facilities
      if(!(object.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
        object.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
        totalNumberOfQuestion--
      }

      //Question F.7.4. Height measured:, not application for following facilities
      if(!(object.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
        object.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
        totalNumberOfQuestion--
      }

      //Question F.7.5. Weighing Machine available:, not application for following facilities
      if(!(object.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
        object.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
        totalNumberOfQuestion--
      }

      //Question F.7.6. Weight measured:, not application for following facilities
      if(!(object.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
        object.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
        totalNumberOfQuestion--
      }

      //Question F.7.7. BP apparatus available at AFHC:, not application for following facilities
      if(!(object.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
        object.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
        totalNumberOfQuestion--
      }

      //Question F.7.8. BP Apparatus being used:, not application for following facilities
      if(!(object.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
        object.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
        totalNumberOfQuestion--
      }

      //Question F.7.9. BMI Calculated:, not application for following facilities
      if(!(object.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
        object.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
        totalNumberOfQuestion--
      }

      //Question F.7.10. Counselling conducted at AFHC:, not application for following facilities
      if(!(object.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
        object.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
        totalNumberOfQuestion--
      }

      //Question F.7.11. Vision being checked with Snellen chart:, not application for following facilities
      if(!(object.c43 != MessageProvider.FACILITY_TYPE_IDS.SC_TYPE_ID &&
        object.c43 != MessageProvider.FACILITY_TYPE_IDS.NON_247_PHC_TYPE_ID)){
        totalNumberOfQuestion--
      }


      //Vision being checked with snellen chart is Dependent on availability of Snellen chart
      if(!(object.e1011 === EssProvider.BOOLEAN_RESPONSE.YES)){
        totalNumberOfQuestion--
      }

      if(object.f71 != null)
        respondedQuestions++      
      if(object.f72 != null)
        respondedQuestions++
      if (object.f73 != null)
        respondedQuestions++
      if (object.f74 != null)
        respondedQuestions++
      if(object.f75 != null)
        respondedQuestions++
      if (object.f76 != null)
        respondedQuestions++
      if (object.f77 != null)
        respondedQuestions++
      if(object.f78 != null)
        respondedQuestions++
      if (object.f79 != null)
        respondedQuestions++
      if (object.f710 != null)
        respondedQuestions++
      if (object.f711 != null)
        respondedQuestions++


      break;
    }
    return Math.round(( (respondedQuestions / totalNumberOfQuestion) * 100))
  }

}
