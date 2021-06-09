import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * @Author: Ratikanta Pradhan 
 * @email: ratikanta@sdrc.co.in 
 * @Last Modified by: Ratikanta Pradhan
 * @Last Modified time: 09-10-2017 15:19
 */
@Injectable()
export class HintProvider {

  /**
   * 
   * @Author: Ratikanta Pradhan 
   * @email: ratikanta@sdrc.co.in 
   * @Last Modified by: Ratikanta Pradhan
   * @Last Modified time: 09-10-2017 15:19
   * @param {Http} http 
   * @memberof HintProvider
   */
constructor(public http: Http) {
  }
  getHintsJson(){
    let hints = [
        {id: '1', title: 'C. General Information', details: [
        {question:"C.1. Name of the Supervisor:",hint:"Name of the person who is assessing the Site."},
        {question:"C.1.1. Designation of the Supervisor:",hint:"DLM or government supervisor Designation of the Supervisor."},
        {question:"C.2. Name of the Organisation:",hint:"Select one Organisation"},
        {question:"C.3. Level (Supervisor posted at):",hint:"Supervisor posted at- Mention the level Block/District/State/National/Other."},
        {question:"C.4.1. State:",hint:"Name of the State"},
        {question:"C.4.2. District:",hint:"Name of the District"},
        {question:"C.4.3. Select Facility Type:",hint:"SC = Sub Center (Normal delivery, initial management and referrals),"+
                    " Non 24*7 PHC -  (Normal delivery, initial management and referrals),"+
                    " 24*7 PHC - 24-hour Basic emergency obstetric care services are available,"+
                    " Non FRU CHC-24-hour - Basic emergency obstetric care services are available,"+
                    " FRU (First Referral Unit) CHC - Availability of CEmOC services,"+
                    " SDH – (Sub- Divisional Hospital) - Availability of CEmOC services,"+
                    " DH – (District Hospital) - Availability of CEmOC services,"+
                    " AREA HOSP – Area Hospital, Availability of CEmOC services,"+
                    " Medical college/medical hospital - (identified as District Hospital)."},
        {question:"C.4.4. Block:", hint: "Name of the Block" },
        {question:"C.5. Select Facility:",hint:"Name of the Facility"},
        {question:"C.6. Facility Level:",hint:"The level of facility as per MNH tool kit (GoI classification)"+
                    " L1- Level 1: All sub-centres and non 24*7 PHCs where deliveries are conducted by a skilled-birth attendant (SBA)."+
                    " L2- Level 2: All 24x7 facilities (PHC/Non-FRU CHC) where BEmOC services are available; which conduct deliveries and manage medical complications - not requiring surgery or blood transfusion."+
                    " L3- Level 3: All FRU-CHC/SDH/DH/Area Hosp. where CEmOC services are available."+
                    " Select facility level for mentioned facility type."},
        {question:"C.7. Date of visit:",hint:"Date when the visit done in dd/mm/yy format e.g. 05/07/2014"},
        {question:"C.8. Name and Designation of Facility In-Charge/Nodal Officer:",hint:"Name & Designation of facility In-charge/Nodal officer of facility in-charge."},
        {question:"C.9. Facility In-Charge E-Mail ID (For sending filled checklist):",hint:"For multiple Email IDs use ONLY comma as separator."}
        ]},
        {id: '2', title: 'D. Data of last reported month from facility', details: [
          {question:"D.1. OPD Load:",hint:"Check for number of outdoor patients registered in facility in the previous month, as per OPD record/pharmacist."},
          {question:"D.2. IPD Load:",hint:"Check the number of in door patients registered in facility in the previous month as per IPD record."},
          {question:"D.3. ANC registered/Attended:",hint:"Check the number of pregnant mothers availed ANC services in facility in the previous month as per ANC register."},
          {question:"D.4.1. Total number of Normal deliveries conducted at the facility in the previous month:",hint:"Total number of Normal deliveries conducted at the facility in the previous month. Check from the labour Room register."},
          {question:"D.4.2. Total number of Assisted deliveries conducted at the facility in the previous month:",hint:"An assisted vaginal birth is where a doctor or midwife uses specially designed instruments (Ventouse or forceps) to help deliver the baby during the last part of labour Check from the labour Room register."},
          {question:"D.4.3. Total number of C-section deliveries conducted at the facility in the previous month:",hint:"C-sections are done only in MCH L3/CEmOC centers; Number can be obtained from OT register/LR register for previous month."},
          {question:"D.4.4. Total number of deliveries conducted in the facility in the previous month:",hint:"Total no. of deliveries conducted in the facility in the previous month."},
          { question: "D.5. Delivery outcome:", hint: "Mention total live births, Still Births, Low birth weight, Neonatal deaths and Maternal deaths Check from Labour room and OT register."},
          {question:"D.5.1. Low Birth Weight:",hint:"Low Birth Weight baby defined as weight at birth less than 2500 gms. Which can be a consequence of preterm birth or due to small size for gestational age or both."},
          {question:"D.5.2. Live births:",hint:"Live birth refers to the complete expulsion or extraction from its mother of a product of conception, irrespective of the duration of the pregnancy, which, after such separation, breathes or shows any other evidence of life. Check number of live births from Labour room and OT register."},
          {question:"D.5.3. Fresh Still Birth:",hint:" \"Fresh stillbirths\" with skin still intact, implying death occurred less than 12 hours before delivery, weighing more than 1,000 grams and more than 28 weeks of gestation. (Intrapartum) Check from Labour room and OT register."},
          {question:"D.5.4. Macerated Still Birth:",hint:"Macerated stillbirth or Antepartum stillbirth is a baby born with all the changes which occur in a fetus retained in utero after death and the death occurred before the initiation of labour. A \"macerated\" fetus shows skin and soft-tissue changes (skin discoloration or darkening, redness, peeling, and breakdown)."},
          {question:"D.5.5. Still Birth:", hint: "Under India's HMIS a stillbirth has been defined as \"complete expulsion or extraction of baby from its mother where the fetus does not breathe or show any evidence of life, such as beating of the heart or a cry or movement of the limbs.\""+
          " Early fetal deaths: An early fetal death is death of a fetus weighing at least 500 grams (or, if birth weight is unavailable, after 20 completed weeks gestation, or with a crownheel length of 25 centimeters or more)."+
          " Late fetal deaths (stillbirths): A late fetal death is defined as a fetal death weighing at least 1000 grams (or a gestational age of 28 completed weeks or a crown-heel length of 35 centimeters or more). For further details refer Stillbirth Surveillance guidelines."},
          {question:"D.5.6. Neonatal Deaths:",hint:"Neonatal deaths refers to the death of a liveborn infant during the first 28 days after birth. Check from Labour Room/OT Register/SNCU Register/Block monthly report (Wherever applicable)"},
          {question:"D.5.7. Maternal Deaths:",hint:"Maternal death is defined as \"The death of a woman while pregnant or within 42 days of termination of pregnancy, irrespective of the duration and the site of the pregnancy, from any cause related to or aggravated by the pregnancy or its management."},
          {question:"D.6. Referred out cases:",hint:"All high risk deliveries/complicated intrapartum cases (mothers/newborns/both) those were referred to higher facilities. Check from labour room Records/Refer out register in Labour room/Emergency register." },
          {question:"D.7.1. BCG:",hint:"Check from labour room register/immunization register/Birth dose register."},
          {question:"D.7.2. OPV:",hint:"Check from labour room register/immunization register/Birth dose register."},
          {question:"D.7.3. Hep.B:",hint:"Check from labour room register/immunization register/Birth dose register."},
          {question:"D.7.4. All three:",hint:"Check from labour room register/immunization register/Birth dose register."+
                      " Write total number of newborns who were given all three vaccines (BCG+ OPV+ Hepatitis B) in the facility in last month."+
                      " Check for appropriate record and note and interview at least one mother to counter check."},
          {question:"D.8. Mothers discharged after 48 hours:",hint:"Check from labour room register/discharge register."},
          {question:"D.9. IUCD insertion:",hint:"Check the total number of IUCD insertions in the previous month. Check from the Family Planning/PPIUCD Register/OT register for all of the following." },
          {question:"D.9.1. PPIUCD:",hint:"Post-partum IUCD (PPIUCD) insertions should be inclusive of Post placental/Postpartum/Intra caesarean. Post placental - when inserted within 10 mins. of the delivery of placenta."+
                      " PPIUCD- when inserted within 48 hrs. of birth of baby."+
                      " Intra-caesarean - when inserted during Csection, after the delivery of placenta."},
          {question:"D.9.2. Interval:",hint:"Interval IUCD - when inserted any time after 6 weeks post-partum."},
          {question:"D.9.3. Post-abortion:",hint:"Post-abortion: Insertion following an abortion, if there is no infection, bleeding or any other contraindications."},
          {question:"D.10. Female sterilization",hint:"Female interval sterilization means sterilization done any time 6 weeks or more after childbirth if it is reasonably certain she is not pregnant or is not in post abortion stage." },
          {question:"D.10.1. Minilap:",hint:"Minilap sterilizationcan be performed postpartum, post abortion or at any time (interval procedure Supra pubic approach) after ruling out pregnancy."},
          {question:"D.10.2. Laparoscopy:",hint:"Laparoscopy can be performed only for interval and after first-trimester abortion procedures."},
          {question:"D.10.3. Post-Partum Sterilization:",hint:"Post-partum sterilization: should be done within 7 days of delivery (Sub-umbilical approach)."},
          {question:"D.10.4. Post Abortion Sterilization:",hint:"Post Abortion Sterilization can be performed through both Minilap and Laparoscopy. Minilap can be performed post abortion in any trimester and Laparoscopy can be performed only after first-trimester abortion."},
          {question:"D.11. Male sterilizaiton:",hint:"Male sterilization performed by closing off each vas deferens, keeping sperm out of semen. Semen is ejaculated, but it cannot cause pregnancy. It can be done at any convenient time on healthy and eligible clients."},
          {question:"D.12. Clients received Comprehensive Abortion Care (CAC) services:",hint: "CAC services includes MMA/MVA/EVA; Post abortion contraceptive counselling, treatment of incomplete/inevitable/spontaneous abortion. Check CAC Register." },
          {question:"D.12.1. MTP:",hint:"MTP- It is a procedure intended to terminate a suspected or known intra uterine pregnancy and to produce nonviable fetus at any gestational age. MTP can be performed through MMA, MVA and EVA"+
                      " MTP = Medical termination of pregnancy;"+
                      " MMA = Medical methods of abortion;"+
                      " MVA = Manual vacuum aspiration;"+
                      " EVA = Electric vacuum aspiration."},
          {question:"D.12.2. Spontaneous Abortion:",hint:"Spontaneous Abortion - It is non-induced embryonic or fetal death or passage of products of conception before 20 wk. of gestation."},
          {question:"D.13.1. Severe Anaemia:",hint:"Pregnant women is said to be severely Anaemic if her haemoglobin level is less than 7g/dl."},
          {question:"D.13.2. Hyper­tension:",hint:"Hypertension is diagnosed when two consecutive readings taken four hours or more apart show the systolic blood pressure to be 140 mmHg or more and/or the diastolic blood pressure to be 90 mmHg or more."},
          {question:"D.13.3. HIV:",hint:"Pregnant women tested positive for HIV."},
          {question:"D.13.4. Syphilis:",hint:"Pregnant women found syphilis positive by Venereal Disease Research laboratory (VDRL)/Rapid Plasma Reagin (RPR) test."},
          {question:"D.13.5. Gestational Diabetes Mellitus:", hint: "Gestational Diabetes Mellitus (GDM) is defined as Impaired Glucose Tolerance (IGT) with onset or first recognition during pregnancy Single step testing using 75 g oral glucose & measuring plasma glucose 2 hour after ingestion. The threshold plasma glucose level of≥140 mg/dL (more than or equal to 140) is taken as cut off for diagnosis of GDM." },
          {question:"D.13.6. Hypothyroidism:", hint: "Primary maternal hypothyroidism is defined as the presence of elevated Thyroid Stimulating Hormone (TSH) levels during pregnancy. Hypothyroidism can be Overt (OH) or Subclinical (SCH). In overt hypothyroidism, S.TSH levels are elevated and S.T4/Free T4 (FT4) levels are low. S.TSH≥10mIU/l is taken as OH irrespective of FT4 levels. In SCH, the TSH level is elevated (≤ 10mIU/l) with normal Serum T4/FT4. Hence, in pregnancy, SCH is defined as a serum TSH between 2.5 and 10mIU/L with normal FT4 concentration and OH is defined as serum TSH>2.5-3mIU/l with low FT4 levels." },
          {question:"D.13.7. Previous C-section:",hint:"It is essential to ask a woman about her previous pregnancies or obstetric history during ANC visit. Ascertain whether the woman has had any obstetrical operations (caesarean sections). A bad obstetric history is an indication for referral to a higher health facility, where further antenatal check-ups and the delivery can be conducted."},
          {question:"D.13.8. Mal - presentation:",hint:"Fetal lie and presentation may be ascertained in palpation during the third trimester. The normal lie at term in the majority is longitudinal, with a cephalic presentation. Any other lie/presentation (Breech, Transverse) is abnormal and the woman must be referred to a higher facility for delivery care."},
          {question:"D.14. Number of high risk mothers referred/managed at facility",hint:"Write down number of mothers referred out as well as referred in the facility."},
          {question:"D.14.1. Severe Anaemia:",hint:"Pregnant women is said to be severely Anaemic if her haemoglobin level is less than 7g/dl. Severe anaemia can be managed by blood transfusion or Iron Sucrose therapy."},
          {question:"D.14.2. Hyper­tension:",hint:"Hypertension is diagnosed when two consecutive readings taken four hours or more apart show the systolic blood pressure to be 140 mmHg or more and/or the diastolic blood pressure to be 90 mmHg or more."},
          {question:"D.14.3. Pre-Eclampsia:",hint:"The combination of a raised blood pressure (more than 140/90 mmHg) and proteinuria is sufficient to categories the woman as having pre-eclampsia."},
          {question:"D.14.4. Eclampsia:",hint:"Eclampsia is characterized by: > Convulsions, > High blood pressure (more than 140/90 mmHg ) Proteinuria +2 or more."},
          {question:"D.14.5. PPH:",hint:"Post-partum Hemorrhage(PPH) is defined as the loss of 500 ml or more of blood during or within 24 hours of the birth and up to six weeks after delivery."},
          {question:"D.14.6. Pre-term Deliveries:",hint:"Preterm delivery is defined as a baby who is born alive before 37 weeks of pregnancy are completed. Preterm newborns are classified as: Extremely Preterm - Less than 28 weeks Very Preterm - 28 to <32 weeks Late & Moderate Preterm - 32 to <37 weeks Single course of injection of Dexamethasone to be administered to women with preterm labour (between 24 and 34 weeks of gestation)."},
          {question:"D.15.1. Counselling:",hint:"Check for the number of adolescents who Attended AFHC clinic for counselling in the previous month Check from monthly AFHC report, Client registration register, counselling register."},
          {question:"D.15.2. Treatment:",hint:"Check for the number of adolescents who Attended AFHC clinic for treatment (provided medicines) in the previous month Check from monthly AFHC report, Client registration register."},
          {question:"D.15.3. Referral:",hint:"Check for the number of adolescents who attended AFHC clinic and further referred to higher facility in the previous month Check from monthly AFHC report and referral register."},
          {question:"D.16.1. Diagnosed:",hint:"Check from OPD register for children under 5 year diagnosed with diarrhea."},
          {question:"D.16.2. Admitted:",hint:"Check from IPD register for diarrhea admitted under 5 year children. Check for the cases treated with ORS, Zinc/Antibiotics."},
          {question:"D.17.1. Diagnosed:",hint:"Check from OPD register for pneumonia diagnosed under 5 year children."},
          {question:"D.17.2. Admitted:",hint:"Check from IPD register for pneumonia admitted under 5 year children. Check cases treated with Gentamicine and Amoxicillin."}
        ]},
        {id: '31', title: 'E.1. Reproductive Health', details: [
          {question:"E.1.1.1. 380 A:",hint:"Ask for availability of \'IUCD(380A)\' in labour room/ANC OPD/FP clinic and check physically."},
      { question: "E.1.1.2. 375:", hint: "Ask for availability of \'IUCD(375)\' in labour room/ANC OPD/FP clinic and check physically." },
    { question: "E.1.2.1. Mala N:", hint: "Ask for availability of \'OCP Mala-N\' in ANC OPD/FP clinic and check physically." },
  { question: "E.1.2.2. Centchroman:", hint: "Ask for availability of newly introduced Non - Steroidal Contraceptive Oral Pill \"Chhaya\" pack of 8 tablets and check physically in ANC OPD/FP clinic." },
  { question: "E.1.3. Male Condom:", hint: "Ask for availability of \'Condoms\' Pharmacy/FP clinic/counter and check physically." },
  { question: "E.1.4. Pregnancy Testing Kit:", hint: "Ask for availability of \'Pregnancy Test Kit\' in labour room/ANC OPD/FP clinic and check physically." },
  { question: "E.1.5. Injectable Contraceptive:", hint: "Ask for availability of newly introduced \"Antara\" Contraceptive Depot Injection  in labour room/ANC OPD/FP clinic and check physically." },
  { question: "E.1.6. Emergency Contraceptive Pill (ECP):", hint: "Ask for availability of new pack of one tablet \'ezy pill\' in ANC OPD/FP clinic and check physically." },
  { question: "E.1.7. PPIUCD Forceps:", hint: "Ask for availability of \'PPIUCD For ceps\' in labour room and check physically. It\'s facility specific equipment (L2 & L3), for L1 facility, mention NA." }

        ]},
        {id: '32', title: 'E.2. Maternal Health: Drugs and Supplies', details: [
      { question: "E.2.1. Oxytocin Available:", hint: "Ask for availability of \'Oxytocin\' and check physically in the labour room." },
          {question:"E.2.2. Stored as per guidelines:",hint:"Check whether inj. oxytocin is stored in refrigerator or cold box, If not please ensure to shift them in refrigerator/cold box. Specify it in your Plan Of Action on the last page."},
      { question: "E.2.3. Tab. Misoprostol:", hint: "Ask for availability of \'Tablets Misoprostol\' and check physically in the labour room." },
    { question: "E.2.4. Alpha Methyldopa:", hint: "Ask for availability of \'Tablets Alpha Methyldopa\' and check physically in the labour room." },
  { question: "E.2.5. Inj. Mag. Sulphate:", hint: "Ask for availability of \'Injection Magnesium sulphate\' and check physically in the labour room." },
  { question: "E.2.6. Inj. Dexamethasone:", hint: "Ask for availability of \'Injection dexamethasone\' and check Physically in the labour room." },
  { question: "E.2.7. Nifedepine:", hint: "Ask for availability of \'Capsule Nifedepine\' and check physically in the labour room." },
          {question:"E.2.8. Labetalol:",hint:"Ask for availability of Inj. Labetalol and check physically in the labour room."},
      { question: "E.2.9. Ca Tab. With Vit. D3:", hint: "Ask for availability of \'Tab Calcium with Vitamin D3\' in Pharmacy/ANC OPD and check physically in facility." },
    { question: "E.2.10. MMA kit (Mifepristone+ Misoprostol):", hint: "Ask for availability of \'Mifepristone + Misoprostol\' in labour room/FP clinic/pharmacy and check physically. It\'s a facility level specific drug, so if not applicable for visited facility please mention NA." },
  { question: "E.2.11. RTI/STI Drugs kit:", hint: "Ask for availability of \'RTI/STI drug or kit\' in pharmacy/ICTC and check physically." },
  { question: "E.2.12. Protocol posters displayed in LR:", hint: "Ask for availability of \'SBA Protocol posters\' and check physically their availability and appropriate placement in the labour room." },
  { question: "E.2.13. Sterile Pads:", hint: "Ask for availability of \'Sterile pads\' and check physically in the labour room." },
  { question: "E.2.14. MCP Card:", hint: "Ask for availability of \'MCP cards\' in ANC OPD/labour room and check physically." },
  { question: "E.2.15. Safe Motherhood Booklet:", hint: "Ask for availability of \'Safe Motherhood Booklet\' in ANC OPD and check physically." },
          {question:"E.2.16. Number of delivery trays in proportion to number of deliveries:",hint:"Delivery tray contains Scissor, Artery forcep, Sponge holding forceps, Speculum, Urinary catheter, Bowl for antiseptic lotion, kidney tray, Gauze pieces, Cotton swabs, Sanitary pads, Gloves. According to MNH toolkit number of delivery trays as per delivery load is as follows: <100 deliveries- 4 trays, 100-200 deliveries- 8 trays, 200-500 deliveries- 16 trays, > 500 deliveries - 20 trays."},
          {question:"E.2.17. Rapid Diagnostic Kit for Malaria:",hint:"Ask for availability of Rapid Diagnostic kit for malaria and check physically in the laboratory/Facility. Please also check whether Health Workers (HWs) are able to use the kit."},
          {question:"E.2.18. Point of Care testing for Syphilis:",hint:"Ask for availability of Point of Care test for Syphilis and check physically availability Please also check whether HWs are able to do Syphilis screening. In the laboratory/Facility."},
      { question: "E.2.19. IFA Tab. (Red):", hint: "Ask for availability of \'Red IFA tablets\' and check physically. In Pharmacy/ANC OPD." },
    { question: "E.2.20. Triple Regimen (TDF+3TC+EFV):", hint: "Under PPTCT programme if woman Found HIV positive using Whole Blood Finger Prick testing in labour room/delivery ward the recommended ARV prophylaxis is to Initiate maternal ART (TDF+3TC+EFV). Ask for availability of \'Triple Regimen\' and check physically in the labour room (TDF Tenofovir Disoproxil Fumarate (TDF); Lamivudine (3TC); Efavirenz (EFV). Ask for availability of Triple Regimen in labour room, check physically." },
  { question: "E.2.21. Syp. Nevirapine:", hint: "Single dose of Syp. Nevirapine to the infant at birth and provision of Syrup Nevirapine 15mg once daily from birth till 6 weeks of age. Ask for availability of \'Syp. Nevirapine\' and check physically in the labour room." },
  { question: "E.2.22. Glucose sachet 75 gm:", hint: "It is used in testing for Gestational Diabetes Mellitus. Single step testing using 75 g oral glucose & measuring plasma glucose 2 hour after ingestion. Ask for availability of \'Glucose Sachet 75 gm\' and check physically in laboratory." },
      { question: "E.2.23. Partograph:", hint: "Ask for availability of \'Partograph sheets\' and check physically in the labour room." },
    { question: "E.2.24. Tab. Albendazole:", hint: "Ask for availability of \'Tab. Albendazole\' in Pharmacy/ANC OPD and check whether it is distributed in pregnant women." },
  { question: "E.2.25. Inj. Tetanus Toxoid:", hint: "Ask for availability of \'Inj. Tetanus Toxoid\' and check physically its availability and storage in cold chain point/refrigerator/cold box." },
          {question:"E.2.26. Autoclaved instruments in LR:",hint:"Autoclaved instruments must be stored in clean and dry area. Sterile packs and containers should be dated and rotated, using a first in, first out approach. Wrapped packages may be used up to one week, and wrapped packages sealed in plastic up to one month. It should have a tag which will indicate status of sterilization after autoclaving. Check the availability in labour room."},
      { question: "E.2.27. Manual Vacuum Aspiration (MVA) Kit:", hint: "Ask for availability of \'MVA kit\' in labour room/OT and check physically. It\'s a facility level specific procedure, so if not applicable for visited facility please mention NA." },
    { question: "E.2.28. Electric Vacuum Aspiration (EVA) Kit:", hint: "Ask for availability of \'EVA kit\' in labour room/OT and check physically. It\'s a facility level specific procedure, so if not applicable for visited facility please mention NA." },
          {question:"E.2.29. HIV testing kit:",hint:"Ask for availability of HIV Testing kit and check physically in the labour room/ICTC/Laboratory. Please also check whether HWs are able to do HIV screening at LR/facility."},
          {question:"E.2.30. Blood group typing:",hint:"Ask for availability of Blood grouping and Rh typing Test and check physically in the facility/Laboratory."},
          {question:"E.2.31. Urine Albumin kit:",hint:"Ask for availability of \'Urine albumin kit\' (dipsticks/test tube method) and check physically in the labour room/Laboratory/ANC OPD. Please also check whether HWs are able to do Albumin check in LR/facility."},
          {question:"E.2.32. Haemoglobinometer:",hint:"Ask for availability of \'Haemoglobinometer\' and check physically in the labour room/Laboratory/ANC OPD. Please also check whether HWs are able to do Hb check in LR/facility."},
          {question:"E.2.33. BP Apparatus:",hint:"Ask for availability of \'BP apparatus\' in the labour room/ANC OPD and check physically and verify its working condition."},
          {question:"E.2.34. Stethoscope:",hint:"Ask for availability of \'Stethoscope\' in the labour room/ANC OPD and check physically and verify its working condition."},
          {question:"E.2.35. Normal Saline/Ringer Lactate/D 5%:",hint:"Ask for availability of \'IV fluids (NS/RL/D5)\', check physically in the labour room."},
          {question:"E.2.36. Foetal Doppler/Fetoscope:",hint:"Ask for availability of \'Foetal Doppler/Fetoscope\' and check physically in labour room/ANC OPD and verify its working condition."}
        ]},
        {id: '33', title: 'E.3. Newborn Health: Drugs and Supplies', details: [
          {question:"E.3. Newborn Health: Drugs and Supplies:",hint:"All the mentioned supplies need to be available in labour room itself. If any thing is not Available in LR and present in the store, please ensure its availability in LR."},
          {question:"E.3.1. Vitamin K1:",hint:"Ask for availability of \'Injection Vitamin K1\' (1mg/ml) and check physically in the labour room."+
                      " Vitamin K1 dosage provided IM: Birth weight ≥ 1000 gm: 1mg"+
                      " Birth weight <1000gm: 0.5mg"+
                      " K3 won\'t be considered as an alternative to K1."},
          {question:"E.3.2. Sterile cord cutting equipment:",hint:"Ask for availability of  \'Sterile cord Cutting equipment\' for cord cutting and check physically in the labour room."},
          {question:"E.3.3. Radiant warmer:",hint:"Ask for availability of  \'Radiant Warmer\' and check physically in the labour room and verify its functionality."},
          {question:"E.3.4.1. 500 ml:",hint:"Ask for availability of  \'Bag size 500 ml\' and check physically in the labour room and verify its functionality."},
          {question:"E.3.4.2. 240 ml:",hint:"Ask for availability of  \'Bag size 240 ml\' and check physically in the labour room and verify its functionality."},
          {question:"E.3.5.1. Size 0:",hint:"Ask for availability of size 0 mask for premature newborns and check physically in the labour room."},
          {question:"E.3.5.2. Size 1:",hint:"Ask for availability of size 1 mask for term newborns and check physically in the labour room."},
          {question:"E.3.6. Mucus extractor:",hint:"Ask for availability of  \'Mucus extractor\' and check physically in the labour room."},
          {question:"E.3.8. Functional Oxygen cylinder:",hint:"Ask for availability of  \'Oxygen Cylinder\' and check physically in the labour room and verify its functionality."},
          {question:"E.3.9. Clean Towel/Drape:",hint:"Ask for availability of  \'Sterile Clean Towels/Drape\' for receiving newborn and check physically in the labour room."},
          {question:"E.3.10. Cord tie or clamp:",hint:"Ask for availability of  \'Sterile Cord tie or clamp\' fortying cord before cutting cord and check physically in the labour room."},
          {question:"E.3.11. Newborn weighing machine:",hint:"Ask for availability of  \'Newborn Weighing machine\' and check physically and verify its working condition in labour room."},
          {question:"E.3.12. Designated NBCC:",hint:"Look for presence of a dedicated space for new born care in the Labour room (New Born Care Corner (NBCC))."},
          {question:"E.3.13. Thermometer:",hint:"Ask for availability of  \'Thermometer\' at labour room and check physically and verify its working condition."}
        ]},
        {id: '34', title: 'E.4. Child Health: Drugs and Supplies', details: [
          {question:"E.4.1. ORS:",hint:"Ask for availability of packets of  \'ORS\'  in Pharmacy/OPD and check physically."},
          {question:"E.4.2. Zinc:",hint:"Ask for availability of  \'Tab. Zinc (10mg & 20mg) tablets\'  and check physically in Pharmacy/OPD."},
          {question:"E.4.3. Salbutamol Nebulizing Solution:",hint:"Ask for availability of  \'Salbutamol Nebulizing Solution\'  in Pharmacy and check physically."},
          {question:"E.4.4. Anti -Malarial Drugs:",hint:"Ask for availability of  \'Anti-Malarial drugs\'  in Pharmacy and check physically."},
          {question:"E.4.5. Syp. Salbutamol:",hint:"Ask for availability of  \'Syp Salbutamol\'  in Pharmacy and check physically."},
          {question:"E.4.6. Tab. Albendazole:",hint:"Ask for availability of  \'tablet Albendazole\'  both 200 and 400 mg in Pharmacy and check physically."},
          {question:"E.4.7. IFA Syp.:",hint:"Ask for availability of  \'IFA Syrup\'  in Pharmacy and check physically."}
        ]},
        {id: '35', title: 'E.5. Vaccines', details: [
          {question:"E.5.1. BCG:",hint:"Ask for availability of  \'BCG vaccine\'  and check physically either at immunization section or at cold chain points."},
          {question:"E.5.2. OPV:",hint:"Ask for availability of  \'OPV\'  and check physically either at immunization section or at cold chain points."},
          {question:"E.5.3. Hep. B:",hint:"Ask for availability of  \'Hepatitis B vaccine\'  and check physically either at immunization section or at cold chain points."},
          {question:"E.5.4. DPT:",hint:"Ask for availability of  \'DPT vaccine\'  and check physically either at immunization section or at cold chain points."},
          {question:"E.5.5. Measles:",hint:"Ask for availability of  \'Measles vaccine\'  and check physically either at immunization section or at cold chain points."},
          {question:"E.5.6. TT:",hint:"Ask for availability of  \'TT\'  and check physically it is stored in refrigerator/cold box or at cold chain points."},
          {question:"E.5.7. Rotavirus:",hint:"Ask for availability of  \'Rotavirus vaccine\'  and check physically either at immunization section or at cold chain points. Applicable only for 4 states: Haryana, HP, AP & Odisha."},
          {question:"E.5.8. IPV:",hint:"Ask for availability of  \'IPV\'  and check physically either at immunization section or at cold chain points."},
          {question:"E.5.9. Vit. A:",hint:"Ask for availability of  \'Vitamin A syrup\'  and check physically either at immunization section or at cold chain points."},
          {question:"E.5.10. Pentavalent:",hint:"Ask for availability of  \'Pentavalent vaccine\'  and check physically either at immunization section or at cold chain points."},
          {question:"E.5.11. JE Vaccine:",hint:"Ask for availability of  \'Japanese Encephalitis\'  and check physically vaccine' and check physically either at immunization section or at cold chain points. Not applicable for all states."},
          {question:"E.5.12. Routine Immunization Microplan:",hint:"Ask for availability of  \'Routine immunization Plan\' and check physically at facility."},
          {question:"E.5.13. Alternate Vaccine Delivery plan:",hint:"Ask for availability of  \'Alternate Vaccine Delivery Plan\'  and check physically at cold chain points."}
        ]},
        {id: '36', title: 'E.6. Antibiotics', details: [
          {question:"E.6. Antibiotics",hint:"If any medicines not available at labour room add in major findings and prepare plan of action."},
          {question:"E.6.1. Amoxicillin:",hint:"Ask for availability of  \'Amoxicillin\'  and check physically at labour room."},
          {question:"E.6.2. Metronidazole:",hint:"Ask for availability of  \'Metronidazole\'  and check physically at labour room."},
          {question:"E.6.3. Ampicillin:",hint:"Ask for availability of  \'Ampicillin\'  and check physically at labour room."},
          {question:"E.6.4. Cotrimaxazole:",hint:"Ask for availability of  \'Cotrimaxazole\'  and check physically at labour room."},
          {question:"E.6.5. Gentamycin:",hint:"Ask for availability of  \'Gentamycin\'  and check physically at labour room."},
          {question:"E.6.6. Ceftriaxone:",hint:"Ask for availability of  \'Ceftriaxone\'  and check physically at labour room."},
          {question:"E.6.7. Ciprofloxacin:",hint:"Ask for availability of  \'Ciprofloxacin\'  and check physically at labour room."}
        ]},
        {id: '37', title: 'E.7. Infrastructure', details: [
          {question:"E.7.1. Running water 24X7:",hint:"Ask for availability of  \'Running Water 24X7\'  and check physically within labour room."},
          {question:"E.7.2. Hand washing area:",hint:"Check availability of  \'Hand Washing Area\'  near Labour Room and physically verify."},
          {question:"E.7.3. Toilet near or within Delivery Room:",hint:"Check availability of  \'Toilet\'  near labour room and physically verify."},
          {question:"E.7.4. Designated space for AFH Clinic:",hint:"Ask for availability of  \'Designated space for Adolescent Friendly Health Clinic\'  and check physically privacy is ensured."},
          {question:"E.7.5. Blood Bank:",hint:"Ask for availability of  \'Functional Blood Bank\'  in facility."},
          {question:"E.7.6. Electricity backup 24X7:",hint:"Ask for availability of  \'Electricity backup 24X7\'  and check physically."},
          {question:"E.7.7. Blood Storage Unit:",hint:"Ask for availability of  \'Functional Blood Storage Unit\'  in facility. (This is for FRU level)"}
        ]},
        {id: '38', title: 'E.8. Infection Prevention', details: [
          {question:"E.8.1. Soap:",hint:"Ask for availability of  \'Soap\'  for washing hands in labour room and check physically."},
          {question:"E.8.2. Bleaching Powder:",hint:"Ask for availability of  \'Bleaching Powder\' in labour room and check physically. In the absence of bleaching powder, if something else like hypochlorite solution is being used, please specify."},
          {question:"E.8.3. Cidex (Glutaldehyde):",hint:"Ask for availability of Cidex Solution to be used for cleaning of laparoscope and bag & mask in labour room."},
          {question:"E.8.4. Color Coded Bins:",hint:"Ask for availability of  \'Color Coded bins and bags\'  for Bio medical waste disposal in labour room and check physically."},
          {question:"E.8.5. Pre-sterilized instruments available in LR:",hint:"Check the availability of Pre-sterilized instruments in labour room."},
          {question:"E.8.6. Sterile gloves:",hint:"Ask for availability of  \'Sterile gloves\'  in labour room and check physically."},
          {question:"E.8.7. Autoclave:",hint:"Ask for availability of  \'Autoclave\'  and check physically. Some facilities might have Boiler so please specify. If none of these available then draw POA with facility in charge and write down on last page."},
          {question:"E.8.8. Boiler:",hint:"Ask for availability of  \'Boiler\'  and check physically. If none of these two available then draw POA with facility in charge and write down on last page."}
        ]},
        {id: '39', title: 'E.9. Adolescent Health: Drugs and Supplies', details: [
          {question:"E.9.1. Tab. Dicyclomine:",hint:"Ask for availability of  \'Dicyclomine tablet\'  and check physically."},
          {question:"E.9.2. Tab. Albendazole:",hint:"Ask for availability of  \'Albendazole tablets\'  400 mg and check physically."},
          {question:"E.9.3. Tab IFA (Blue):",hint:"Ask for availability of  \'Weekly Iron and Folic Acid Supplementation tablets\'  (blue) and check physically."},
          {question:"E.9.4. IEC for AH at AFHC:",hint:"Ask for availability of  \'IEC material for Adolescent Health\'  and check physically at AFHC clinic."}
        ]},
        {id: '310', title: 'E.10. Other Equipment', details: [
          {question:"E.10.1. Digital Thermometer:",hint:"Ask for availability of  \'Digital Thermometer\'  and check physically and verify its working condition."},
          {question:"E.10.2. Suction Machine (Low Pressure=<100 mm hg):",hint:"Ask for availability of  \'Suction Machine\'  Check physically in LR and verify its working condition."},
          {question:"E.10.3. Hub cutter/Needle destroyer:",hint:"Ask for availability of  \'Hub Cutter\'  with needle destroyer in labour room/immunization section and check physically and verify its working condition."},
          {question:"E.10.4. Glucometer:",hint:"Ask for availability of  \'Glucometer\'  in laboratory and check physically and verify its working condition."},
          {question:"E.10.5. Room thermometer:",hint:"Check the availability and functionality of  \'Room Thermometer\'  in Labour room."},
          {question:"E.10.6. Adult weighing machine:",hint:"Ask for availability of  \'Adult Weighing machine\'  and check physically in ANC OPD and verify its working condition."},
          {question:"E.10.7. Refrigerator:",hint:"Ask for availability of  \'Refrigerator\'  and check physically in LR and verify its working condition."},
          {question:"E.10.8. Auto Analyzer (DH):",hint:"Ask for availability of  \'Auto Analyzer at DH level\'  and check physically in laboratory and verify its working condition."},
          {question:"E.10.9. Semi Auto Analyzer (CHC/PHC):",hint:"Ask for availability of  \'Semi Auto Analyzer at CHC/PHC level\'  and check physically in laboratory and verify its working condition."},
          {question:"E.10.10. BMI Chart:",hint:"Ask for availability of  \'BMI Chart\'  check physically at AFHC."},
          {question:"E.10.11. Snellen Chart:",hint:"Ask for availability of  \'Snellen Chart\'  check physically at AFHC."}
        ]},
        {id: '311', title: 'E.11. HR deployed/posted in facility', details: [
          {question:"E.11.1. Number of MO posted:",hint:"Total number of Mos working in labour rooms. In some states AYUSH MOs are conducting deliveries after SBA training."},
          {question:"E.11.2. Number of SN posted:",hint:"Total number of Staff Nurses working in labour rooms."},
          {question:"E.11.3. Number of ANM posted:",hint:"Total number of ANMs working in labour rooms."},
          {question:"E.11.4. Number of AH counsellor posted:",hint:"Total number of AH counsellor working in facility."}
        ]},
        {id: '41', title: 'F.1. Antenatal Care', details: [
          {question:"F.1.1. Number of days ANC being conducted at facility in a week:",hint:"ANC day/Clinic is specified day in a facility where exclusive ANC services provided to pregnant women."},
          {question:"F.1.2. Blood Pressure measured:",hint:"a. Ask the available providers in ANC clinic (doctor/Nurse) if blood pressure is measured during ANC visit."+
                      " b. Check for a functional BP apparatus and stethoscope in the ANC clinic."+
                      " c. Ask at least one available mother if her BP was checked during her checkup."+
                      " d. Verify response from ANC register."},
          {question:"F.1.3. Hemoglobin measured:",hint:"a. Ask the available providers in ANC clinic (doctor/Nurse) if haemoglobin is measured during ANC visit."+
                      " b. Check for a functional Haemoglobinometer in the ANC clinic/facility or a 24-hour laboratory."+
                      " c. Verify response from ANC register/laboratory register."+
                      " Additional inputs:"+
                      " (i) The functionality of the instrument will also take into account the availability of consumables such as N/10 HCl, micropipette and lancets."+
                      " (ii) Hb estimation may be done using color strip method."+
                      " At CHC & Above levels Hb estimation may be done using Auto and semi auto analyzer."},
          {question:"F.1.4. Blood Glucose measured:",hint:"a. Ask the available providers in ANC clinic (doctor/Nurse) if blood glucose is measured during ANC visit."+
                      " b. Check for a functional equipment of measuring blood glucose in the ANC clinic/facility."+
                      " c. Verify response from ANC register/laboratory register."+
                      " Additional inputs:"+
                      " Glucometer is used in peripheral facilities. Where available the standard biochemistry test will be used for measuring PPPG."+
                      " A plasma standardized Glucometer should be available."},
          {question:"F.1.5. Urine Albumin estimation:",hint:"a. Ask the available providers in ANC clinic (doctor/Nurse) if urine albumin is measured during ANC visit."+
                      " b. Check for urine dipsticks in the ANC clinic/facility."+
                      " c. Verify response from ANC register/laboratory register."+
                      " Additional input:"+
                      " Availability of Dipsticks important in facilities with no dedicated laboratory. If laboratory available, the test can be performed there."},
          {question:"F.1.6. Appropriate management or referral of high risk clients:",hint:"a. Ask service providers what are the criteria for identification of high risk pregnancy. (identified on the basis of High BP/Blood Sugar/Hemoglobin)."+
                      " b. Check the line list of high risk cases prepared in the last quarter on the basis of complications like: Pre-eclampsia/eclampsia/previous caesarian section/gestational diabetes mellitus/Anemia complicating pregnancy/bad obstetric history/antepartum hemorrhage."+
                      " c. Verify the data from high risk register/ANC register/referral register."},
          {question:"F.1.7. Family Planning Counselling:",hint:"a. Ask the available providers in ANC clinic (doctor/Nurse) if they counsel women on family planning during ANC visit."+
                      " b. Ask at least one available mother if she was counselled on family planning during her check up."+
                      " Verify response from ANC register."},
          {question:"F.1.8. Universal HIV screening:",hint:"a. Ask the available providers in ANC clinic (doctor/Nurse) if HIV screening done during ANC visit."+
                      " b. Check for availability of HIV kit in the ANC clinic/laboratory/ICTC."+
                      " c. Verify response from ANC register/laboratory register/ICTC register."},
          {question:"F.1.9. Hypothyroidism screening done for high risk ANC cases (DH/MC):",hint:"a. Ask the available providers in ANC clinic(doctor/Nurse)if Hypothyroidism screening (TSH level) done for high risk ANC cases."+
                      " b. Check for availability of Auto Analyzer/Semi Auto-analyzer in the laboratory."+
                      " c. Verify response from ANC register/laboratory register."},
          {question:"F.1.10. Universal Syphilis screening:",hint:"a. Ask the available providers in ANC clinic (doctor/Nurse) if Syphilis screening done during ANC visit."+
                      " b. Check for availability of POC test kit in the ANC clinic/facility or laboratory."+
                      " c. Verify response from ANC register/laboratory register."},
          {question:"F.1.11. Malaria testing (For Malaria Endemic areas only):",hint:"a. Ask the available providers in ANC clinic (doctor/Nurse) if Malaria screening done during ANC visit."+
                      " b. Check for availability of Rapid Diagnostic Kit in the ANC clinic/facility or laboratory."+
                      " c. Verify response from ANC register/laboratory register."}
        ]},
        {id: '42', title: 'F.2. Intra-partum and Immediate post-partum practices', details: [
          {question:"F.2.1. Fetal Heart Rate (FHR) recorded at the time of admission:",hint:"a. Ask the available providers at labour room for practice on FHR recorded at the time of admission."+
                      " b. Check for functional Fetoscope/Doppler in labour room."+
                      " Check the case sheet for recording of FHR during admission."},
          {question:"F.2.2. Mother's temperature recorded at the time of admission:",hint:"a. Ask the available providers in the labour room for practice on mother's Temperature recorded at the time of admission."+
                      " b. Check for functional thermometer at labour room."+
                      " Ask mothers if her temperature was checked during admission (check one of the case sheet in random if no mother is available)."},
          {question:"F.2.3. Mother's BP recorded at the time of admission:",hint:"a. Ask the available providers at labour room for practice on mother's BP recorded at the time of admission."+
                      " b. Check for functional BP apparatus/stethoscope in labour room."+
                      " Ask mothers if her BP was checked during admission (check one of the case sheet in random if none of mothers are available)."},
          {question:"F.2.4. Partograph used to monitor progress of labor:",hint:"a. Check Partograph use for labour in a random case sheet."+
                      " b. Ask the available providers about how and when to fill partograph."+
                      " c. Check correctness of filled partograph."+
                      " Standard protocols for filling partograph:"+
                      " (i) Fetal heart rate, maternal pulse and uterine contractions monitored and charted every 30 minutes."+
                      " (ii) Cervical dilatation, temperature and blood pressure monitored every four hours."+
                      " Indications for referral to the FRU on the basis of the partograph:"+
                      " (i) If the FHR is <120 beats/minute or >160 beats/minute."+
                      " (ii) If there is meconium- and/or blood stained amniotic fluid."+
                      " (iii) When the cervical dilatation plotting crosses the Alert line (moves towards the right side of the Alert line)."+
                      " (iv) If the contractions do not increase in duration, intensity and frequency."+
                      " If the maternal vital signs, i.e. the pulse (more than 100/min), BP (>140/90 mmHg) and temperature (>38º C), cross the normal limits."},
          {question:"F.2.5. Antenatal Corticosteroids used for preterm delivery:",hint:"a. Check for availability of corticosteroids in the labour room."+
                      " b. Ask the available providers about practice of giving Antenatal corticosteroids in case of preterm deliveries."+
                      " c. Check any case sheet (if available) where corticosteroids used for preterm delivery."},
          {question:"F.2.6. Magnessium Sulphate used for eclampsia management:",hint:"a. Look for availability of magnesium sulphate in the labour room."+
                      " b. Ask providers what are criteria and dose they are following in facility to give Magnesium Sulphate."+
                      " Check any case sheet (if available) where Magnesium Sulphate used for eclampsia management."},
          {question:"F.2.7. Active Management of third stage of labor being performed:",hint:"a. Check for availability of oxytocin/misoprostol in the labour room."+
                      " b. Ask provider about steps of Active Management of third stage of labour and practice to give oxytocin/misoprostol in facility."+
                      " Check any case sheet randomly for use of oxytocin/misoprostol after delivery."},
          {question:"F.2.8. Management of postpartum hemorrhage:",hint:"a. Ask provider about protocols of PPH management."+
                      " b. Ask providers what are criteria they are following in facility to manage PPH."+
                      " c. Check any case sheet (if available) where PPH was managed."},
          {question:"F.2.9. Monitoring for vaginal bleeding upto 6 hrs. after delivery:",hint:"a. Ask the available providers at labour room for practice of monitoring of vaginal bleeding during post-partum period."+
                      " Ask one mother if her vaginal bleeding was checked during post-partum (check one of the case sheet in random if none of mothers are available)."},
          {question:"F.2.10. Recording of vital parameters(Temp, pulse, BP, R R) at time of discharge:",hint:"a. Ask the available providers at labour room for practice of recording of vital parameters during post-partum/at time of discharge."+
                      " b. Ask one mother if her vital parameters was recorded during post-partum."+
                      " c. Check one of the case sheet/discharge summary in random."}
        ]},
        {id: '43', title: 'F.3. Essential Newborn Care (ENBC), Resuscitation and Child Health', details: [
          {question:"F.3.1. Babies delivered on mother's abdomen:",hint:"a. Ask the providers where they deliver the newborn."+
                    " b. Ask at least one newly delivered mother to verify."},
          {question:"F.3.2. Babies dried with clean and sterile/towels just after delivery:",hint:"a. Look for availability of dry and clean towels in the labour room."+
                    " b. Ask the available provider show how they are drying newborn immediately after birth."},
          {question:"F.3.3. Delayed cord cutting (1-3 mins) practiced:",hint:"a. Look for availability of cord tie or clamp in the labour room."+
                    " b. Ask the available providers when they are cutting the cord (except emergency cases which includes Asphyxia)."},
          {question:"F.3.4. Practice of skin to skin care:",hint:"a. Ask the available providers when skin tosk in contact is started at facility in case of newly delivered mother."+
                    " Ask at least one delivered mother as to when she initiated skin to skin care."},
          {question:"F.3.5. Early initiation of breastfeeding practiced within one hour:",hint:"a. Ask the available providers when breast feeding is started at facility in case of newly delivered mother."+
                    " Ask at least one delivered mother, did service provider counselled her for early initiation of breast feeding and when she initiated breast feeding."},
          {question:"F.3.6. Baby weighed:",hint:"a. Check for the availability of functional baby weighing scale."+
                    " b. Check any case sheet randomly whether baby weight mentioned or not."+
                    " Ask at least one delivered mother when staff weighed her baby."},
          {question:"F.3.7. Vitamin K1 administered to all newborns (within 24 hrs. of birth):",hint:"a. Look for availability of vitamin K1 in the facility."+
                    " b. Ask the available providers about protocols for Vitamin K1 administration to newborns."},
          {question:"F.3.8. Newborns given BCG,OPV, Hep-B within 24 hours of birth:",hint:"a. Look for availability of vaccines in the facility."+
                    " b. Ask providers when and how BCG, Hep B and OPV administered to newborn."},
          {question:"F.3.9. Provider aware about the steps of newborn resuscitation (Positioning, suctioning, stimulation, repositioning and PPV using Ambu bag):",hint:"a. Ask the available providers about various steps of New Born Resuscitation."+
                    " Which includes positioning, suctioning, stimulation, repositioning and positive air pressure using Ambu bag."+
                    " Check any case sheet (if available) where new-born resuscitation done by the provider."},
          {question:"F.3.10. KMC practiced for Low birth Weight in Post-natal ward:",hint:"a. Ask the available providers about protocol for Kangaroo mother care for low birth weight newborn."+
                    " b. If any low birth weight new-born available then check with mother whether she was counselled for KMC."+
                    " If yes , when and how she initiated KMC on new born."}
        ]},
        {id: '44', title: 'F.4. Family Planning', details: [
          {question:"F.4.1. Family planning counselling:",hint:"a. Ask the available providers/counsellors about the steps in family planning counselling."+
                      " b. Ask the provider to show the counseling material (FP counselling tray in particular)."+
                      " c. Ask a delivered mother in the facility if they were counselled on Family Planning."+
                      " Key topics to be covered in FP counselling:"+
                      " (i) Basket of choices"+
                      " (ii) Healthy timing & spacing of pregnancy"+
                      " (iii) Principles of informed choice"+
                      " (iv) Effectiveness & benefits"+
                      " (v) Limitations & side effects."},
          {question:"F.4.2. Postpartum IUCD insertions:",hint:"a. Check for availability of PPIUCD insertion tray in labour room."+
                      " b. Observe/Ask the available providers for steps of postpartum IUCD insertions."+
                      " c. Check whether the client was counsel for the same."+
                      " d. Check the available records for correctness, completeness and consistency."+
                      " e. Check if there is any mechanism for follow up of clients."+
                      " f. Check for the implementation of PPIUCD compensation scheme."},
          {question:"F.4.3. lnterval IUCD insertions:",hint:"a. Check for availability IUCD insertion tray in facility."+
                      " b. Ask the available providers for steps of interval IUCD insertions."+
                      " c. Check the available records for correctness, completeness and consistency."+
                      " d. Check if there is any mechanism for follow up of clients."+
                      " e. Check for the infection prevention practices followed (physically verify the supplies of IP material)."},
          {question:"F.4.4. Sterilization procedures (Fixed Day Static Services):",hint:"a. Ask a provider whether facility for fixed day sterilization services are available at facility."+
                      " b. Check for availability of functional OT and surgical instruments."},
          {question:"F.4.5. Sterilization procedures (Fixed Day Camps):",hint:"a. Ask a provider whether facility identified for fixed day sterilization camp services."+
                      " b. For PHC level check availability of functional OT."}
        ]},
        {id: '45', title: 'F.5. Client Satisfaction', details: [
          {question:"F.5.1. Diet provided?",hint:"a. Ask a mother in postpartum ward in the facility whether she received free diet during her stay?"+
                      " b. Verify the same from the JSSK registers."},
          {question:"F.5.2. Drug Provided?",hint:"a. Ask a mother in postpartum ward in the facility whether she received free drug during her stay?"+
                      " b. (Confirm the same from the JSSK registers)."},
          {question:"F.5.3. Free Referral transport provided?",hint:"a. Ask a facility In-charge if transport is provided."+
                      " b. Verify the same by interaction with beneficiary and from the last month's JSSK record register/log book."},
          {question:"F.5.4. Privacy during delivery?",hint:"a. Ask a mother in postpartum ward in the facility whether privacy was provided to her during her delivery."+
                      " b. Observe if adequate privacy is maintained in the labour room through use of curtains/screen."},
          {question:"F.5.5. Staff was well behaved with you during your stay?",hint:"Ask a mother in postpartum ward in the facility whether staff behaved well (No abuse, responded well when asked ) with her during her admission, delivery and stay."},
          {question:"F.5.6. Were you informed about the procedures before they were undertaken?",hint:"Ask a mother/relative in postpartum ward in the facility whether staff informed her about the procedures before performing it on her?"},
          {question:"F.5.7. Would you suggest visiting this facility to your relatives/friends?",hint:"Ask a mother in postpartum ward in the facility whether she would recommend it her relatives/friends?"},
          {question:"F.5.8. Did you get the services you were looking for?",hint:"Ask a mother in postpartum ward in the facility whether she get the services she was looking for."}
        ]},
        {id: '46', title: 'F.6. Facility mechanism and others', details: [
          {question:"F.6.1. Is utilization of untied fund adequate?",hint:"a. Assess this based on your interaction with facility in charge and the facility records/untied register."+
                      " Check, If quarterly spend is equal to or more than: Q-1 10% or more, Q-2 40% or more, Q-3 70% or more, Q-4 100% or more."},
          {question:"F.6.2. Awareness generation (use of IEC/BCC) - Posters, audio visual aids, display of citizen charter? RH, MH, NH, CH AH & others:",hint:"Assess this based on your observation of the facility (The posters/AV aids and citizen charter)"},
          {question:"F.6.3. Is grievance redressal mechanism in place?",hint:"a. Assess this based on your observation of the facility, Suggestions/Complaint boxes should be provided at a prominent place in the facility preferably near enquiry counter."+
                      " Name, designation and telephone number of the nodal officer for Grievance redressal should be displayed prominently."},
          {question:"F.6.4. Infection prevention being practiced & segregation followed:",hint:"a. Check for availability of color coded bins/bags."+
                      " b. Check whether Segregation of biomedical waste is performed or not."+
                      " c. Check availability waste disposal mechanism in facility."},
          {question:"F.6.5. Disinfection practices being followed:",hint:"a. Check for availability of bleaching powder, boiler, Autoclave."+
                      " b. Check whether bleaching solution prepared as per guidelines and disinfection practices followed or not."},
          {question:"F.6.6. Availability of ANC/PNC register, case sheet, discharge sheet etc. as per Maternal and Newborn Health tool kit:",hint:"a. Check for availability of ANC/PNC register, case sheet, discharge sheet, referral register as per MNH toolkit."}
        ]},
        {id: '47', title: 'F.7. Adolescent Health', details: [
          {question:"F.7.1. Contraceptive available at AFHC:",hint:"a. Ask the AH counsellor/MO for availability of contraceptives."+
                    " b. Check physical availability."+
                    " Check Stock Register."},
          {question:"F.7.2. Contraceptive being given to client:",hint:"a. Ask the service provider if the adolescent have been provided Contraceptives."+
                    " b. Check the Client record Register/Stock register."+
                    " c. Ask any adolescent client in the facility (If available)."},
          {question:"F.7.3. Height Scale available:",hint:"Check physically for its availability in AFHC."},
          {question:"F.7.4. Height measured:",hint:"a. Check client register in AFHC if the height has been measured."+
                    " b. Ask any adolescent client in the AFHC (If available)."},
          {question:"F.7.5. Weighing Machine available:",hint:"Check physically for its availability and verify its working condition."},
          {question:"F.7.6. Weight measured:",hint:"a. Check Client register if the weight has been measured and noted."+
                    " b. Ask any adolescent client in the AFHC (If available)."},
          {question:"F.7.7. BP apparatus available at AFHC:",hint:"Check physically for its availability and verify its working condition."},
          {question:"F.7.8. BP Apparatus being used:",hint:"a. Check Client register if the BP has been measured and noted."+
                    " b. Ask any adolescent client in the AFHC (If available)."},
          {question:"F.7.9. BMI Calculated:",hint:"a. Ask the service provider if BMI is calculated for Adolescent Clients."+
                    " b. Check in record register if the BMI is calculated."+
                    " c. Ask any adolescent client in the AFHC (If available)."},
          {question:"F.7.10. Counselling conducted at AFHC:",hint:"a. Check the records in Counselling Register. Ask any adolescent who has attended the AFHC clinic."},
          {question:"F.7.11. Vision being checked with Snellen chart:",hint:"a. Ask the service provider if Vision is being checked with Snellen chart in AFHC clinic."+
                    " b. Check in record register if the Vision has been checked."+
                    " Ask any adolescent client in the facility."}
        ]},
        {id: '6', title: 'Geo co-ordinate', details: [
          {question:"Image 1:",hint:"Please take an appropriate image."},
          {question:"Image 2:",hint:"Please take an appropriate image."}
        ]}
    ]
    return hints;
  }
    getCommunityHintsJson(){
    let hints = [
        {id: '1', title: 'General Information', details: [
           {question:"E-Mail ID:",hint:"For multiple Email IDs use ONLY comma as separator."}
        ]},
        {id: '2', title: '1. VHND Assessment', details: [
        {question:"1.1. Whether ANM Provides following services during VHND?",hint:"DLM needs to attend a VHND to verify the provision of all the mentioned services."},
        {question:"1.1.a. Routine Immunization:",hint:"a. Look for RI session being conducted at VHND site."+
                    " b. Look for availability of vaccines and essential consumables as per due list."+
                    " c. Ask providers when and how different vaccines are administered."+
                    " d. Interview mothers with eligible infants to check whether RI services are rendered."},
        {question:"1.1.b. Family planning services and counselling:",hint:"a. Availability of FP commodities. b. Interview beneficiaries to identify whether FP counselling especially for ANC/PNC clients are being conducted."},
        {question:"1.1.c. Ante-natal care:",hint:"a. Check from registers or records General examination (Pulse, BP, Hb, Weight, Temperature Abdominal examination). b. Monitor can verify the services through direct observation."},
        {question:"1.1.d. Post-natal care:",hint:"a. Check from records the availability of PNC services. Monitor can verify the services through direct observation. PNC services includes General examination pulse, BP, weight, and temperature. Address if any complaints like excessive bleeding, abdominal pain, convulsions, loss of consciousness, pain in legs, fever, urinary retention, Difficulty in breathing, foul smelling discharge."},
        {question:"1.1.e. Nutrition and Health promotion to children and Adolescents:",hint:"a. Check whether adolescents are approached for counselling and/or are present for VHND session. b. Counselling regarding: Diet and Nutrition, IFA supplementation etc."},
        {question:"1.2. Is Growth monitoring done at Anganwadi center/VHNDs?",hint:"a. Check for Growth monitoring chart filled in MCP card at AWC/VHND session."},
        {question:"1.3. Is Routine Immunization micro-plan available at VHND session?",hint:"a. Ask ASHA/ANM for the availability of Routine Immunization micro plan at VHND session."},
        {question:"1.4. Is Due list for Routine Immunization, ANC, PNC available with ASHA/ANM?",hint:"a. Check for MCTS/RCH portal generated/manual due-list RI, ANC, PNC beneficiaries with ASHA/ANM."},
        {question:"1.5. As per due list did 75% of the beneficiaries attend the VHND session?",hint:"a. Check from due-list of whether 75% of total due beneficiaries attended the session (ANC, PNC, RI etc.)."},
        ]},
        {id: '3', title: '2. Interview with ANM', details: [
          {question:"2.1. Is Community distribution of Misoprostol for home deliveries implemented?",hint:"a. Ask the ANM about practice of providing misoprostol for home deliveries."+
                    " b. Check for availability of tab. Misoprostol with the ANM"+
                    " c. It is applicable only to notified villages. Selection criteria for pregnant women for misoprostol distribution: The villages having home delivery rate more than 20%."+
                    " d. Interact with the beneficiary (if available) who has received misoprostol about counselling she received from ANM, how & when she consume the tablet."},
          {question:"2.2. Are high risk pregnancies line-listed at the health facility?",hint:"a. Ask the ANM for availability of linelisting with appropriate management, referrals along with follow-up of high risk cases."+
           " High Risk Pregnancy (HRP) includes Elderly prim gravida, Multigravida, Previous C- section, Pre-eclampsia/eclampsia, Severe anemia, Twin pregnancy, Abnormal lie or presentation, Gestational diabetes, Syphilis during pregnancy etc."},
          {question:"2.3. Were maternal/child deaths reported from the area of the sub-center in last 1 year?",hint:"a. Whether any maternal/child death was reported from the catchment area in last one year."},
          {question:"2.4. If death reviewed, were corrective actions taken for the probable community causes?",hint:"a. Ask ANM whether Corrective action were taken for reviewed cases at any level (Community, Block, District)"+
                    " b. If yes, Note the response in details (add in major findings column). The main purpose of CBMDR is to identify various delays and causes leading to maternal deaths, to enable the health system to take corrective measures at various levels. Identifying maternal deaths would be the first step in the process, the second step would be the investigation of the factors/causes which led to the maternal death – whether medical, socio-economic or systemic, and the third step would be to take appropriate and corrective measures on these, depending on their amenability to various demand side and communication interventions."},
          {question:"2.5. Number of SAM children identified in the community:",hint:"a. Check records for collecting the data related to total number of identified SAM children in previous month."+
            " Severe Acute Malnutrition is defined by a very low weight for height (below -3 z scores 1 of the median WHO growth standards), or Mid-upper arm circumference < 115 mm or by visible severe wasting or by the presence of nutritional oedema."},
          {question:"2.5.1. Number of SAM children referred to Nutritional Rehabilitation Centre (NRCs)/higher centre?",hint:"a. Validate the list of SAM children and referral date from AWC records."},
          {question:"2.6. Has the ANM been trained on RKSK?",hint:"a. Ask ANM about her RKSK training status (including Peer Educator component)."},
          {question:"2.7. Has the ASHA been trained on RKSK?",hint:"a. Ask ASHA about her RKSK training status (including Peer Educator component)."}
        ]},
        {id: '41', title: '3.1. Incentives to ASHA', details: [
           {question:"3.1.a.  Was ASHA paid incentives for ANC services & accompanying mother for Institutional delivery?",hint:"a. Ask the ASHA for payment of incentives (it would reflect whether she is rendering thedelivery services)"+
            " For Low performing states: Rs.600 for Rural & Rs. 200 for Urban area."},
          {question:"3.1.b. Was ASHA paid incentives for delaying and spacing of births?",hint:"a. Ask the ASHA for payment of incentives (it would reflect whether she is rendering Family Planning methods for spacing and Counselling for Limiting)"+
            " Incentive for Delaying/Spacing: Rs.500, Incentive for Limiting: Rs.1000"},
          {question:"3.1.c. Was ASHA paid incentives for escorting clients for PPIUCD insertions?",hint:"a. Ask the ASHA for payment of incentives, (it would reflect whether she is rendering PPIUCD services)"+
           " Incentive for motivating pregnant women/mothers to uptake PPIUCD Rs.150"},
          {question:"3.1.d. Was ASHA paid incentive for immunization of children below 1 year and 1 to 2 year?",hint:"a. Ask the ASHA for payment of incentives, (it would reflect whether she is rendering RI services)"+
            " Incentive for mobilizing children on immunization day- Rs. 150,"+
            " Incentive for Immunization below 1 year – Rs. 100,"+
            " Incentive for Immunization upto 2 year –Rs. 50."},
          {question:"3.1.1. Is there any delay in last six months in payments to ASHA?",hint:"a. Ask for delay in payments to ASHA (it would reflect if the mechanism of reimbursement to ASHA is established or not) If Yes, gaps/issues can be identified in Plan of Action."},
          {question:"3.2. Is the ASHA trained on module 6 & 7 for HBNC?",hint:"a. Ask whether ASHA received training on module 6 & 7 for HBNC."},
          {question:"3.2.1. If yes, does she perform HH visits for HBNC?",hint:"a. Check the records of home visit forms filled by ASHA.  b. Check from records whether following services are being offered under HBNC (Essential care and newborn examination of new-born, early recognition of danger signs, stabilization and referral. Counselling of mother on breast feeding, warmth, care of baby etc.)"+
            " HBNC visits: Care of new-born and mother through regular home visits on 3rd, 7th, 14th, 21st, 28th and 42nd day (for home deliveries: day 1 is additional to the above)."},
          {question:"3.3. Number of sick new-born or newborns with danger signs identified in community by ASHA:",hint:"a. Check the number of sick newborn/newborns with danger signs enlisted in records with ASHA/ANMs."+
            " Danger signs in new born to be identified during Home visit by ASHA/ANM. Danger signs include: sepsis, Pallor, Reduced activity, not feeding well, difficulty in breathing, fever, hypothermia, low birth weight, Not gaining weight, Fits/convulsions."},
          {question:"3.3.1. Whether sick new-born or newborns with danger signs referred to Higher facilities?",hint:"a. Check whether identified sick new born have been referred to higher facility and this referral is enlisted in ASHA dairy If feasible this can be validated through household visits."},
          {question:"3.4. Whether follow-up visit to LBW Babies & SNCU discharged babies done by ASHA?",hint:"a. Confirmation of Follow Up visits to Low Birth Weight babies & SNCU discharged babies will be done through ASHA dairy. b.If feasible this can be validated through household visits For Low Birth Weight babies follow up will be done through HBNC visits & additional 4 visits will be conducted at 3, 6, 9 & 12 months by ASHA."},
          {question:"3.5. Is ASHA aware about incentive given under RKSK?",hint:"a. Check whether ASHA is aware about following incentives:"+
            " (i) Incentives for holding MHS meeting Rs. 50"+
            " (ii) Facilitating PE selection Rs. 100"+
            " (iii) Organizing Adolescent Health Day Rs. 200"},
          {question:"3.6. Has ASHA referred any Adolescents to the nearest AFHC last month?",hint:"(i)  Ask ASHA whether she referred any adolescent to AFHC/Facility (ii) Check ASHA diary for verification (iii) If feasible this can be validated through household visits"}

        ]},
        {id: '42', title: '3.7. Availability of essential commodities with ASHA/School/AWCs', details: [
          {question:"3.7. Availability of essential commodities with ASHA/School/AWCs:",hint:"Check for availability of all these commodities with ASHA Physically verify each commodity."}
        ]},
        {id: '51', title: '4.1. Interview with Pregnant woman', details: [
          {question:"4.1.1. Is the pregnant woman registered in the first trimester?",hint:"a. Check the MCP card for date of LMP and 1st ANC visit (date of registration) If MCP card not available then this can be validated from ANC register with ANM."},
          {question:"4.1.2. Did the PW receive all services under Antenatal care?",hint:"a. Check MCP card for following services (Pulse, BP, Urine Albumin, Hb., Weight, ANC visits, IFA & TT)."},
          {question:"4.1.3. Is the PW counseled for Post-partum FP choices Including PPIUCD by ASHA/ANM during ANC?",hint:"a. Ask whether the Pregnant Women were counselled during ANC for FP choices (including information on PPIUCD). b. Ask whether she was informed about all the available FP options."}
        ]},
        {id: '52', title: '4.2. Interview with Lactating mother with 0-6 months baby (based on recall)', details: [
          {question:"4.2.1. Did she deliver at Public Health facility?",hint:"a. Ask whether beneficiary has delivered at the public health facility, b. Can be validated through discharge slip."},
          {question:"4.2.2. If yes, Did she receive entitlements under JSY?",hint:"a. Ask whether the beneficiary received JSY entitlement? (if applicable)."},
          {question:"4.2.3.a. Was she provided with free drugs and consumables?",hint:"Did the pregnant women and new-born receive free drugs and consumables from ANC to PNC."},
          {question:"4.2.3.b. Was she provided free-diet at the facility?",hint:"Did the Pregnant Women receive free diet during her stay at the health facility?"},
          {question:"4.2.3.c. Was she given Blood transfusion free of cost?",hint:"Did the Pregnant Women receive free blood transfusion (if indicated for C-section or for severe anemia) from ANC to PNC?"},
          {question:"4.2.3.d. Was she provided free diagnostics?",hint:"Did the PW and new-born receive free diagnostics (incl. Blood/urine tests and USG) from rom ANC to PNC phase?"},
          {question:"4.2.3.e. Did she avail free transportation and drop-back facility?",hint:"Did the PW and new-born receive freetransportation (to and fro from residence/inter-facility in case of referral)."},
          {question:"4.2.3.f. Did she receive entitlements under JSSK?",hint:"a. Ask whether the beneficiary received all the entitlements under JSSK"+
            " Entitlements under JSSK:"+
            " (i) Free and cashless delivery"+
            " (ii) Free C-Section"+
            " (iii) Free drugs and consumables"+
            " (iv) Free diagnostics"+
            " (v) Free diet during stay in the health institutions"+
            " (vi) Free provision of blood"+
            " (vii) Exemption from user charges"+
            " (viii) Free transport from home to health institutions, between facilities and drop back."}
        ]},
        {id: '53', title: '4.2.4. Ask about services she received at the facility where she delivered', details: [
          {question:"4.2.4.a. Was the privacy during delivery maintained?",hint:"a. Ask whether privacy during delivery was maintained through use of curtains/partitions in labour room."},
          {question:"4.2.4.b. Was staff at the health facility well behaved during stay?",hint:"a. Ask whether the staff was courteous and well behaved during entire stay at the health facility?(staff may include all health staff and not only the clinical staff) b. Confirm for any grievances, if yes, whether it is reported under grievance or not."},
          {question:"4.2.4.c. Was the new-born dried with clean and sterile sheets/towels just after delivery?",hint:"a. Ask mother whether new-born was immediately dried using clean towel/sterile sheet after birth."},
          {question:"4.2.4.d. Was the new-born weighed at birth?",hint:"a. Ask mother whether the new-born weight was conveyed to her at the time of birth? b. Can be validated through MCP card."},
          {question:"4.2.4.e. Was breast feeding initiated within one hour after delivery?",hint:"a. Ask mother whether breast feeding was initiated within one hour?"},
          {question:"4.2.4.f. Was the new-born given birth dose immunization in the health facility within 24hrs of birth?",hint:"a. Whether BCG, Hepatitis- B and Polio doses were administered within 24 hrs. Of delivery? b. Can be validated through BCG scar on left deltoid/MCP card."},
          {question:"4.2.4.g. Has she exclusively breast-fed the infant for 6 months?",hint:"a. Ask mother for how long she have exclusively breast fed her infant or for how long she will continue the exclusive breast feeding?"},
          {question:"4.2.4.h. Was she advised about maternal & newborn danger signs before discharge from the facility?",hint:"a. Did the ANM/ASHA or any other health staff advise her about danger signs in the postpartum period. Danger Signs: Heavy vaginal bleeding, convulsions, fever, Head-ache, weight loss, baby not passing urine or stool, bluish/flaccid body etc."},
          {question:"4.2.4.i. Check the MCP card for completeness:",hint:"a. Response will be based on observations of the supervisor b. Check the MCP card for record of services in ANC, PNC and immunization."},
          {question:"4.2.4.j. Was she satisfied with all the services provided during ANC,delivery and PNC?",hint:"a. Ask whether the beneficiary was satisfied with all the services from ANC to PNC including stay at the health facility? b. If she has any grievances at any level of healthcare, it should be noted on the last page of checklist."},
        ]},
        {id: '54', title: '4.3. Interview mother with a child of 6 months - 2 years', details: [
          {question:"4.3.1. Was ORS and Zinc used when child had last diarrhea episode?",hint:"a. Ask the mother on her practices in the family in case of a diarrhoeal episode? b. Did she use ORS and Zinc in the last diarrhoeal episode to her child?"},
          {question:"4.3.1.a. Is mother aware about ORS preparation and use?",hint:"a. Is she aware of ORS and Zinc use in diarrhoea? (Ask about dose and duration of Zinc use) b. Can she elicit steps of preparation of ORS?"},
          {question:"4.3.1.b. If yes, did ASHA replenish ORS/Zinc during her visit?",hint:"a. If she had used ORS/Zinc or whether it was misplaced/expired, was the stock replenished by ASHA/ANM. b. Verify physical availability."},
          {question:"4.3.2. Was Syp. IFA available at Household?",hint:"a. Check for availability of syrup IFA at the household. b. Ask if she is aware on when and how to use the syrup?"},
          {question:"4.3.3. Did ASHA perform home visits during first six weeks of life?",hint:"a. Ask whether ASHA had performed home based new-born care visits during first six weeks of life."},
          {question:"4.3.4. Does mother practice Complementary feeding?",hint:"a. Ask the mother whether she knows about complementary feeding. b. Ask the mother whether she is practicing complementary feeding."},
          {question:"4.3.5. Was Family planning counseling provided by ASHA?",hint:"a. Ask the mother whether ASHA provided counselling on various FP methods."},
          {question:"4.3.6. Was Family planning commodities (Condoms/OCP and ECP) provided by ASHA?",hint:"a. Ask the mother whether Family Planning commodities (Mala- N/Centchroman/Condoms and ECP) were provided by ASHA?"},
          {question:"4.3.7. Did any IEC/BCC/IPC activity initiate or enhance family's health seeking behavior?",hint:"What promoted her and her family members to avail health care services from a health facility or from community based healthcare services?"},
          {question:"4.3.7.a. IPC by ASHA/ANM or other health staff:",hint:"a. Ask whether any health staff promoted the importance of a health facility visit for seeking services from health care staff."},
          {question:"4.3.7.b. Hand out/Booklets:",hint:"a. Did she received any handout/booklet to enhance health seeking behaviour of her and her family."},
          {question:"4.3.7.c. Audio visual aids:",hint:"a. Did any A/V aids (TV or radio spots/AVaids seen at a health facility or at any other place) enhance health seeking behaviour of her and her family."},
          {question:"4.3.7.d. Hoardings/Wall paintings/Banner/Poster:",hint:"a. Did she observe any Banner/Poster/Hoardings/wall paintings at health facility for enhancing health seeking behavior of her and her family."},
          {question:"4.3.7.e. Any other IEC/BCC activity:",hint:"a. If there is any other IEC/BCC medium (like Nukkad Natak, street plays etc.) for enhancing the health seeking behaviour."}
        ]},
        {id: '55', title: '4.4. Interview with beneficiaries (Mothers & Pregnant women) pertaining to MCTFC', details: [
          {question:"4.4.1. Did she receive a call from Mother and Child Tracking Facilitation Centre, Govt of India, Delhi?",hint:"a. Ask beneficiary whether she received a call from Mother and Child Tracking Facilitation Centre, Govt. of India, Delhi."},
          {question:"4.4.2. Was the caller courteous to her during the call?",hint:"a. Ask the beneficiary if the caller was courteous during the call."},
          {question:"4.4.3. Whether the caller was clear in communication with her:",hint:"a. Ask the beneficiary if she could clearly understand the questions being asked and the advice was provided by the caller."},
          {question:"4.4.4. Was she satisfied by the resolution on her query provided by the caller?",hint:"a. Ask the beneficiary whether caller was able to resolve her query satisfactorily."},
          {question:"4.4.5. Whether a doctor spoke with her to resolve her query?",hint:"a. If the beneficiary asked some health related query to the caller, whether the call was transferred to a doctor who imparted nonclinical advice. Ask the beneficiary whether she spoke with doctor and he/she resolved her query."},
          {question:"4.4.6.a. During her pregnancy:",hint:"a. MCTFC informs pregnant women regarding antenatal care services, government programmes and schemes and makes them aware about the care that they should take during pregnancy."},
          {question:"4.4.6.b. Taking care of her child:",hint:"a. MCTFC informs mother of children regarding immunization details, government programmes and schemes, other child related information and makes them aware about their child care up to the age of 1 year."},
          {question:"4.4.6.c. Family planning:",hint:"a. MCTFC asks family planning related questions and provides advice to pregnant women and mothers of children. For pregnant women, the questions and advice pertains to various measures that needs to be adopted by pregnant women after their pregnancy. For mothers of children, the questions and advice pertains to various measures that were taken and needs to be taken by mothers after their delivery."},
          {question:"4.4.7. Has she received recorded voice messages over phone related to maternal health, Child care, immunization and family planning?",hint:"a. Total 18 voice recorded messages related to maternal health, Child care, immunization and family planning are being sent to pregnant women and parents of children to spread awareness among them."}
        ]},
        {id: '56', title: '4.5. Interview with family having Adolescents', details: [
          {question:"4.5.1. Did the Adolescent in the family receive IFA supplementation?",hint:"a. If the adolescent is school going did he/she receive weekly Blue IFA supplementation under WIFS from the school. b. If the adolescent in not school going/drop out does he/she received weekly IFA supplementation under WIFS through AWCs."},
          {question:"4.5.2. Was the mother/adolescent girl counseled on Menstrual hygiene?",hint:"a. Did the adolescent girl receive counselling from ASHA/ANM or any other health staff on menstrual hygiene?"},
          {question:"4.5.3. Has the adolescent ever visited AFHC?",hint:"a. Have adolescent visited any Adolescent Friendly Health Clinic?"},
        ]},
        {id: '57', title: '4.6. Interview with Household with Home delivery', details: [
          {question:"4.6.1.a. Traditional attitude:",hint:"a. Ask whether in the past there has been any home deliveries or there is a custom to be delivered at home."},
          {question:"4.6.1.b. Accessibility issues:",hint:"a. Ask whether the family was willing to deliver at the health facility, but only because of roads/terrain/any reason conveyance couldn’t be arranged/govt. transport couldn’t reach on time."},
          {question:"4.6.1.c. Economic reasons:",hint:"a. They assume that lot of expenses will be incurred at the public health facility since they are unaware of JSSK benefits."},
          {question:"4.6.1.d. Benefits of institutional delivery unknown:",hint:"a. They did not know the importance of delivering at a public facility. No health staff ever counselled them on importance of institutional delivery."},
          {question:"4.6.1.e. Any other causes:",hint:"a. Any other causes than the ones mentioned above."},
          {question:"4.6.2.a. Skilled Birth Attendant (i.e. assisted by doctor/nurse/ANM):",hint:"a. Was the delivery conducted by a trained personnel like MO, SN or ANM."},
          {question:"4.6.2.b. Traditional Birth Attendant (TBA)",hint:"a. Ask whether TBA/local Dai conducted the home delivery?"},
          {question:"4.6.2.c. Family or Relatives:",hint:"a. Was the home delivery conducted by family members or relatives?"},
          {question:"4.6.3. Is mother/child availing any post-natal services from a health facility?",hint:"a. Ask mother if she/child availing post-natal services from a health facility/ANM."}
        ]},
        {id: '58', title: '4.7. School/AWC visit- Interview with WIFS Nodal teacher/AWW', details: [
          {question:"4.7.1. Are IFA tabs under WIFS currently available?",hint:"a. Physically check the stock of IFA tablets at School/AWCs."},
          {question:"4.7.1.a. Any Stock-out in last 6 months?",hint:"a. Ask WIFS nodal teacher/AWW about stock and check register at school/AWC for any stock-outs in the last 6 months."},
          {question:"4.7.2. Was deworming done in the last six months?",hint:"a. Ask nodal person/AWW whether deworming round conducted in last six months."},
          {question:"4.7.3. Whether WIFS report submitted for last month?",hint:"a. Check for reports of WIFS at the school/AWC. b. Monitor can also address any issue related to WIFS reporting mechanism (school to the district level)."},
          {question:"4.7.4. Whether screening of children under RBSK done?",hint:"a. Ask nodal officer whether screening of children under RBSK have been done. b. Check the filled RBSK formats about the last screening at the school."},
          {question:"4.7.4.a. Are referrals of children done?",hint:"a. Ask the teacher about referral of children from school to DEIC. b. Can be verified through the list of children referred for 4Ds."},
          {question:"4.7.5. Are they given IFA tab every week?",hint:"a. Ask children whether any specific day has been assigned for IFA consumption at the school? b. Ask the students whether IFA are distributed or asked to be consumed in the class?"},
          {question:"4.7.6. Has RBSK screening done by health team in last one year?",hint:"a. Ask children when was the last RBSK screening done? b. If any children diagnosed with 4 Ds and referred to health facility. Interview them on further interventions advised/done by the health staff?"}
        ]},
        {id: '7', title: 'Geo co-ordinate', details: [
          {question:"Image 1:",hint:"Please take an appropriate image."},
          {question:"Image 2:",hint:"Please take an appropriate image."}]
        }
    ]
    return hints;
    }
}

