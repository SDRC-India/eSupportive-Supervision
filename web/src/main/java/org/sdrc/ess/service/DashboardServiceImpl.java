/**
 * 
 */
package org.sdrc.ess.service;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.sdrc.ess.domain.Area;
import org.sdrc.ess.domain.CommunityData;
import org.sdrc.ess.domain.FacilityData;
import org.sdrc.ess.domain.Preodicity;
import org.sdrc.ess.domain.UtData;
import org.sdrc.ess.domain.UtIndicatorClassificationsEn;
import org.sdrc.ess.domain.UtIndicatorEn;
import org.sdrc.ess.domain.UtTimeperiod;
import org.sdrc.ess.model.web.BarChartModel;
import org.sdrc.ess.model.web.DashboardLandingPageData;
import org.sdrc.ess.model.web.EssUserModel;
import org.sdrc.ess.model.web.FacilityPushPinModel;
import org.sdrc.ess.model.web.FacilityViewModel;
import org.sdrc.ess.model.web.MultiLineChartData;
import org.sdrc.ess.model.web.TimePeriodModel;
import org.sdrc.ess.model.web.TopLineIndicatorDataModel;
import org.sdrc.ess.model.web.ValueObject;
import org.sdrc.ess.repository.AreaRepository;
import org.sdrc.ess.repository.CommunityDataRepository;
import org.sdrc.ess.repository.FacilityDataRepository;
import org.sdrc.ess.repository.PrediocityRepository;
import org.sdrc.ess.repository.UtDataReporsitory;
import org.sdrc.ess.repository.UtIndicatorClassificationsEnRepository;
import org.sdrc.ess.repository.UtIndicatorEnRepository;
import org.sdrc.ess.repository.UtTimeperiodRepository;
import org.sdrc.ess.repository.springdatajpa.UtIndicatorEnRepository2;
import org.sdrc.ess.util.Constants;
import org.sdrc.ess.util.StateManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Harsh Pratyush (harsh@sdrc.co.in)
 * @author Azaruddin (azaruddin@sdrc.co.in)
 *
 */
@Service
public class DashboardServiceImpl implements DashboardService {

	@Autowired
	private UtDataReporsitory utDataReporsitory;

	@Autowired
	private UtTimeperiodRepository utTimeperiodRepository;

	@Autowired
	private StateManager stateManager;

	@Autowired
	private ResourceBundleMessageSource messages;

	private DecimalFormat df = new DecimalFormat("#.##");

	@Autowired
	private PrediocityRepository prediocityRepository;

	@Autowired
	private UtIndicatorClassificationsEnRepository utIndicatorClassificationsEnRepository;

	@Autowired
	private FacilityDataRepository facilityDataRepository;

	@Autowired
	private CommunityDataRepository communityDataRepository;

	@Autowired
	UtIndicatorEnRepository utIndicatorEnRepository;

	@Autowired
	UtIndicatorEnRepository2 utIndicatorEnRepository2;
	
	@Autowired
	UserService userService;
	
	@Autowired
	AreaRepository areaRepository;

	private SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
	private SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");

	@Override
	public DashboardLandingPageData getLandingDashBoardData() {

		if (stateManager.getValue(Constants.Web.USER_PRINCIPAL) == null) {
			return null;
		} else {
			UtTimeperiod utTimeperiod = utTimeperiodRepository.findLatestTimePeriod();
			if (utTimeperiod == null) {
				return null;
			}
			List<UtTimeperiod> utTimeperiodList = utTimeperiodRepository.findTop6ByPeriodicityPreodicityIdOrderByStartDateDesc(1);

			UtTimeperiod utTimeperiod2 = utTimeperiodList.get(utTimeperiodList.size() - 1);

			String areaName;
			DashboardLandingPageData landingDashboardData = new DashboardLandingPageData();
			List<TopLineIndicatorDataModel> topLineIndicatorDataModels = new ArrayList<TopLineIndicatorDataModel>();
			//List<MultiLineChartData> rmnchaMultiLineChartDatas = new ArrayList<MultiLineChartData>();
			List<MultiLineChartData> femaleWithPPIUCDInsertedAtFacilities= new ArrayList<MultiLineChartData>();;
			List<MultiLineChartData> facilitiesWherePPIUCDForcepsAreAvailable= new ArrayList<MultiLineChartData>();;
			List<MultiLineChartData> maternalDeath= new ArrayList<MultiLineChartData>();;
			List<MultiLineChartData> facilitiesUsingPartograph= new ArrayList<MultiLineChartData>();;
			List<MultiLineChartData> childrenUnder5AdmittedWithDiarrhoea= new ArrayList<MultiLineChartData>();;
			List<MultiLineChartData> subcentersReportingMaternalChildDeathsInLast1Year= new ArrayList<MultiLineChartData>();;
			List<MultiLineChartData> vHNDSessionsAttendedBy75BeneficiariesAsPerDueList= new ArrayList<MultiLineChartData>();; 
			List<List<BarChartModel>> nchBarChart = new ArrayList<List<BarChartModel>>();
			List<List<BarChartModel>> cdNcd = new ArrayList<List<BarChartModel>>();
			List<List<BarChartModel>> hssBarChart = new ArrayList<List<BarChartModel>>();

			EssUserModel essUserModel = (EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL);

			List<Integer> numberLineChartsIds = Arrays.asList(messages.getMessage(Constants.Web.LINE_CHART_NUMBER_IDS, null, null).split(",")).stream().map(String::trim).map(Integer::parseInt).collect(Collectors.toList());
			List<Integer> percentLineChartsIds = Arrays.asList(messages.getMessage(Constants.Web.LINE_CHART_PERCENT_IDS, null, null).split(",")).stream().map(String::trim).map(Integer::parseInt).collect(Collectors.toList());
			List<Integer> nch = Arrays.asList(messages.getMessage(Constants.Web.NCH_BAR_CHART, null, null).split(",")).stream().map(String::trim).map(Integer::parseInt).collect(Collectors.toList());
			List<Integer> cdNcdIds = Arrays.asList(messages.getMessage(Constants.Web.CD_NCD_BAR_CHART_ID, null, null).split(",")).stream().map(String::trim).map(Integer::parseInt).collect(Collectors.toList());
			List<Integer> hsss = Arrays.asList(messages.getMessage(Constants.Web.HSS_BAR_CHART, null, null).split(",")).stream().map(String::trim).map(Integer::parseInt).collect(Collectors.toList());

			List<Integer> allDashboardIds = new ArrayList<Integer>();

			allDashboardIds.addAll(nch);
			allDashboardIds.addAll(cdNcdIds);
			allDashboardIds.addAll(hsss);

			int userLevel = essUserModel.getUserLevel();
			int stateId;
			List<BarChartModel> nchBarChartList = new ArrayList<BarChartModel>();
			List<BarChartModel> cdNcdList = new ArrayList<BarChartModel>();
			List<BarChartModel> hssBarChartList = new ArrayList<BarChartModel>();
			List<Object[]> utDatas = new ArrayList<Object[]>();
			List<Object[]> numberFormatMultiLineChartDataList = new ArrayList<Object[]>();
			List<Object[]> percentFormatMultiLineChartDataList = new ArrayList<Object[]>();
			// country level data
			if (userLevel == Integer.parseInt(messages.getMessage(Constants.Web.COUNTRY_LEVEL_ROLE_ID, null, null))
					|| userLevel == Integer.parseInt(messages.getMessage(Constants.Web.ADMIN_LEVEL_ROLE_ID, null, null))) {
				stateId = 1;
				areaName="India";
				utDatas = utDataReporsitory.findByIUSNIdsAndTimePeriodForCountry(allDashboardIds, utTimeperiod.getTimePeriod_NId());
				numberFormatMultiLineChartDataList = utDataReporsitory.findByIUSNIdsAndTimePeriodNumberCountryLevel(numberLineChartsIds, utTimeperiod.getTimePeriod_NId(), utTimeperiod2.getTimePeriod_NId());
				percentFormatMultiLineChartDataList =utDataReporsitory.findByIUSNIdsAndTimePeriodNumberCountryLevelForPercent(percentLineChartsIds, utTimeperiod.getTimePeriod_NId(), utTimeperiod2.getTimePeriod_NId());
			}

			// state level data of logged in user
			else {
				
				stateId = essUserModel.getStateId();
				if(userLevel == Integer.parseInt(messages.getMessage(Constants.Web.STATE_LEVEL_ROLE_ID, null, null)))
				{
					stateId = essUserModel.getStateId();
				}
				else if(userLevel == Integer.parseInt(messages.getMessage(Constants.Web.DISTRICT_LEVEL_ROLE_ID, null, null)))
				{
					stateId=essUserModel.getDistrictId();
				}
				else {
					stateId=essUserModel.getBlockId();
				}
				utDatas = utDataReporsitory.findByIUSNIdsAndTimePeriod(allDashboardIds, utTimeperiod.getTimePeriod_NId(), stateId);
				numberFormatMultiLineChartDataList = utDataReporsitory.findByIUSNIdsAndTimePeriodNumber(numberLineChartsIds, utTimeperiod.getTimePeriod_NId(), stateId, utTimeperiod2.getTimePeriod_NId());
				percentFormatMultiLineChartDataList=utDataReporsitory.findByIUSNIdsAndTimePeriodNumberForPercent(percentLineChartsIds, utTimeperiod.getTimePeriod_NId(), stateId, utTimeperiod2.getTimePeriod_NId());
				
				// if user is state level we will fetch secondary data for country level
				if(userLevel == Integer.parseInt(messages.getMessage(Constants.Web.STATE_LEVEL_ROLE_ID, null, null)))
					stateId = 1;
				
				// if user is level is less than state level we will fetch secondary data for respective state
				else
				stateId = essUserModel.getStateId();
			}
			List<Object[]> topLineIndicatorData = utDataReporsitory.findByIUSNIdsForLatestTimePeriod(stateId);
			
			List<Integer> stateIds =Arrays.asList(messages.getMessage(Constants.Web.U5MR_DESCRIPANCY_STATES_ID, null, null).split(",")).stream().map(String::trim).map(Integer::parseInt).collect(Collectors.toList());

			for (Object[] topLineData : topLineIndicatorData) {
				TopLineIndicatorDataModel indicatorDataModel = new TopLineIndicatorDataModel();

				indicatorDataModel.setDataValue(String.valueOf((int) Double.parseDouble(topLineData[0].toString()))+ (topLineData[2].toString().equalsIgnoreCase("MMR") &&stateIds.contains(stateId) ?" *":""));
				indicatorDataModel.setIndicator_Name(topLineData[2].toString());
				indicatorDataModel.setSourceName("Sample Registration System (SRS)");
				indicatorDataModel.setShort_Name(topLineData[2].toString());
				indicatorDataModel.setTimeperiod(topLineData[3].toString());
				indicatorDataModel.setUnit_Value("Number");
				if(stateIds.contains(stateId))
				{
					indicatorDataModel.setMessage(messages.getMessage("u5mr.message."+stateId, null,null));
				}
				
				topLineIndicatorDataModels.add(indicatorDataModel);
			}

			for (Object[] utData : utDatas) {

				if (nch.contains(Integer.parseInt(utData[1].toString()))) {
					BarChartModel barChartModel = new BarChartModel();

					
					barChartModel.setAxis(utData[2].toString());
					barChartModel.setIndicator_Name(utData[2].toString());
					barChartModel.setValue(df.format(Double.parseDouble(utData[0].toString())));

					nchBarChartList.add(barChartModel);
				} else if (cdNcdIds.contains(Integer.parseInt(utData[1].toString()))) {
					BarChartModel barChartModel = new BarChartModel();

					barChartModel.setAxis(utData[2].toString());
					barChartModel.setIndicator_Name(utData[2].toString());
					barChartModel.setValue(df.format(Double.parseDouble(utData[0].toString())));

					cdNcdList.add(barChartModel);
				} else if (hsss.contains(Integer.parseInt(utData[1].toString()))) {
					BarChartModel barChartModel = new BarChartModel();

					barChartModel.setAxis(utData[2].toString());
					barChartModel.setIndicator_Name(utData[2].toString());
					barChartModel.setValue(df.format(Double.parseDouble(utData[0].toString())));

					hssBarChartList.add(barChartModel);
				}

			}

			for (Object[] utData : numberFormatMultiLineChartDataList) {
				MultiLineChartData multiLineChartData = new MultiLineChartData();

				multiLineChartData.setIndicator_Name(utData[2].toString());
				multiLineChartData.setKey(utData[2].toString());
				multiLineChartData.setPercentageValue(utData[0].toString());
				multiLineChartData.setShort_Name(utData[2].toString());
				multiLineChartData.setTimeperiod(utData[3].toString());
				multiLineChartData.setUnit_Value("Number");
				
				if(Integer.parseInt(utData[1].toString())==Integer.parseInt(messages.getMessage(Constants.Web.FEMALES_WITH_PPIUCD_INSERTED_AT_FACILITIES, null,null)))
				{
					femaleWithPPIUCDInsertedAtFacilities.add(multiLineChartData);
				}
				
				else if(Integer.parseInt(utData[1].toString())==Integer.parseInt(messages.getMessage(Constants.Web.MATERNAL_DEATH_INDICATOR_ID, null,null)))
				{
					maternalDeath.add(multiLineChartData);
				}
				else if(Integer.parseInt(utData[1].toString())==Integer.parseInt(messages.getMessage(Constants.Web.CHILDREN_UNDER_5_YEARS_ADMITTED_WITH_DIARRHOEA, null,null)))
				{
					childrenUnder5AdmittedWithDiarrhoea.add(multiLineChartData);
				}
				

			}
			
			
			for (Object[] utData : percentFormatMultiLineChartDataList) {
				MultiLineChartData multiLineChartData = new MultiLineChartData();

				multiLineChartData.setIndicator_Name(utData[2].toString());
				multiLineChartData.setPercentageValue(df.format(Double.parseDouble(utData[0].toString())));
				multiLineChartData.setShort_Name(utData[2].toString());
				multiLineChartData.setTimeperiod(utData[3].toString());
				multiLineChartData.setUnit_Value("Percent");
				
				if(Integer.parseInt(utData[1].toString())==Integer.parseInt(messages.getMessage(Constants.Web.FACILITIES_WHERE_PPIUCD_FORCEPS_ARE_AVAILABLE, null,null)))
				{
					facilitiesWherePPIUCDForcepsAreAvailable.add(multiLineChartData);
				}
				
				else if(Integer.parseInt(utData[1].toString())==Integer.parseInt(messages.getMessage(Constants.Web.FACILITIES_WHERE_PARTOGRAPH_IS_USED_TO_MONITOR_PROGRESS_OF_LABOUR, null,null)))
				{
					facilitiesUsingPartograph.add(multiLineChartData);
				}
				
				else if(Integer.parseInt(utData[1].toString())==Integer.parseInt(messages.getMessage(Constants.Web.ANMS_REPORTING_COMMUNITIES_WHERE_MATERNAL_CHILD_DEATHS_ARE_REPORTED_FROM_THE_AREA_OF_SUB_CENTER_IN_LAST_1_YEAR, null,null)))
				{
					subcentersReportingMaternalChildDeathsInLast1Year.add(multiLineChartData);
				}
				else if(Integer.parseInt(utData[1].toString())==Integer.parseInt(messages.getMessage(Constants.Web.VHND_SESSIONS_THAT_WERE_ATTENDED_BY_75_OF_THE_BENEFICIARIES_AS_PER_DUE_LIST, null,null)))
				{
					vHNDSessionsAttendedBy75BeneficiariesAsPerDueList.add(multiLineChartData);
				}

			}

			nchBarChart.add(nchBarChartList);
			cdNcd.add(cdNcdList);
			hssBarChart.add(hssBarChartList);

			landingDashboardData.setKeyIndcators(topLineIndicatorDataModels);
			landingDashboardData.setTimePeriodName(utTimeperiod.getTimePeriod());
			//landingDashboardData.setAreaName(areaName);
//          Bar Charts
			landingDashboardData.setCdNcd(cdNcd);
			landingDashboardData.setHss(hssBarChart);
			landingDashboardData.setNch(nchBarChart);
			
//			Line charts
			landingDashboardData.setChildrenUnder5AdmittedWithDiarrhoea(childrenUnder5AdmittedWithDiarrhoea);
			landingDashboardData.setFacilitiesUsingPartograph(facilitiesUsingPartograph);
			landingDashboardData.setFacilitiesWherePPIUCDForcepsAreAvailable(facilitiesWherePPIUCDForcepsAreAvailable);
			landingDashboardData.setFemaleWithPPIUCDInsertedAtFacilities(femaleWithPPIUCDInsertedAtFacilities);
			landingDashboardData.setMaternalDeath(maternalDeath);
			landingDashboardData.setSubcentersReportingMaternalChildDeathsInLast1Year(subcentersReportingMaternalChildDeathsInLast1Year);
			landingDashboardData.setVHNDSessionsAttendedBy75BeneficiariesAsPerDueList(vHNDSessionsAttendedBy75BeneficiariesAsPerDueList);
			
			return landingDashboardData;
		}
	}

	@Override
	public DashboardLandingPageData getThematicViewData() {
		if (stateManager.getValue(Constants.Web.USER_PRINCIPAL) == null) {
			return null;
		} else {
			UtTimeperiod utTimeperiod = utTimeperiodRepository.findLatestTimePeriod();
			if (utTimeperiod == null) {
				return null;
			}
			// monthly timeperiods
			List<UtTimeperiod> utTimeperiodMonthlyList = utTimeperiodRepository.findTop6ByPeriodicityPreodicityIdOrderByStartDateDesc(1);
			List<UtTimeperiod> utTimeperiodQuaterlyList = utTimeperiodRepository.findTop6ByPeriodicityPreodicityIdOrderByStartDateDesc(2);
			List<UtTimeperiod> utTimeperiodYearlyList = utTimeperiodRepository.findTop6ByPeriodicityPreodicityIdOrderByStartDateDesc(3);

			JSONObject periodicityJson = new JSONObject();

			List<Preodicity> periodicity = prediocityRepository.findAll();

			for (Preodicity preodicity : periodicity) {

				JSONArray periodicityArray = new JSONArray();

			}

			return null;
		}

	}

	@Override
	public List<ValueObject> getSection(Integer checklistId) {
		List<ValueObject> listOfValueObject = new ArrayList<>();
		List<UtIndicatorClassificationsEn> listOfUtIndicatorClassificationsEn = utIndicatorClassificationsEnRepository.findByChecklist_Type_Detail_Id_FkAndIcSectorType(checklistId);
		for (UtIndicatorClassificationsEn utIndicatorClassificationsEn : listOfUtIndicatorClassificationsEn) {
			ValueObject valueObject = new ValueObject();
			valueObject.setKey(utIndicatorClassificationsEn.getIC_NId());
			valueObject.setValue(utIndicatorClassificationsEn.getIC_Name());
			valueObject.setDescription(utIndicatorClassificationsEn.getIC_Short_Name());
			valueObject.setOrderLevel(utIndicatorClassificationsEn.getIC_Order());
			listOfValueObject.add(valueObject);
		}
		return listOfValueObject;

	}

	@Override
	public List<ValueObject> getSubSection(Integer sectionId) {
		List<ValueObject> listOfValueObject = new ArrayList<>();
		List<Object[]> listOfObject = utIndicatorClassificationsEnRepository.findByIC_NId(sectionId);

		for (Object[] objects : listOfObject) {
			ValueObject valueObject = new ValueObject();
			valueObject.setKey(Integer.parseInt(objects[0].toString()));
			valueObject.setValue(objects[1].toString());
			/*
			 * valueObject.setDescription(utIndicatorClassificationsEn.getIC_Short_Name());
			 * valueObject.setOrderLevel(utIndicatorClassificationsEn.getIC_Order());
			 */
			listOfValueObject.add(valueObject);
		}
		return listOfValueObject;
	}

	private SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	@Override
	public List<TimePeriodModel> getTimeperiodForDashboard() {
		List<UtTimeperiod> listOfUtTimeperiod = utTimeperiodRepository.findByPeriodicityPreodicityIdOrderByStartDateAsc(1);
		List<TimePeriodModel> listOfTimePeriodModel = new ArrayList<>();
		for (UtTimeperiod utTimeperiod : listOfUtTimeperiod) {
			TimePeriodModel timePeriodModel = new TimePeriodModel();
			timePeriodModel.setEndDate(simpleDateFormat.format(utTimeperiod.getEndDate()));
			timePeriodModel.setStartDate(simpleDateFormat.format(utTimeperiod.getStartDate()));
			timePeriodModel.setTimePeriod(utTimeperiod.getTimePeriod());
			timePeriodModel.setTimePeriodId(utTimeperiod.getTimePeriod_NId());
			listOfTimePeriodModel.add(timePeriodModel);
		}

		return listOfTimePeriodModel;
	}

	@Override
	@Transactional
	public List<FacilityPushPinModel> getAllPushPinFacililityData(Integer blockId, Integer checklistId, Integer subsection, String startDate, String endDate, Integer facilityTypeId) throws Exception {

		UtIndicatorEn utindicator = utIndicatorEnRepository.findByIndicatornID(subsection);

		List<FacilityPushPinModel> listOffacilityPushPinModel = new ArrayList<>();
		if (checklistId == Integer.parseInt(messages.getMessage(Constants.Mobile.FORM_TYPE_FACILITY_CHECKLIST, null, null))) {
			List<FacilityData> listOfFacilityData = new ArrayList<>();
			if(facilityTypeId==null){
				listOfFacilityData = facilityDataRepository.findByBlockAndC7Between(blockId, new java.sql.Date(formatter.parse(startDate).getTime()), new java.sql.Date(formatter.parse(endDate).getTime()));
			}else{
				listOfFacilityData=facilityDataRepository.findByBlockAndC7BetweenAndAreaFacilityTypeId(blockId, new java.sql.Date(formatter.parse(startDate).getTime()), new java.sql.Date(formatter.parse(endDate).getTime()),facilityTypeId);
			}
			
			int i=1;
			for (FacilityData facilityData : listOfFacilityData) {
				if (facilityData.getGeopoint() != null) {
					FacilityPushPinModel facilityPushPinModel = new FacilityPushPinModel();
					facilityPushPinModel.setSubmissionId(facilityData.getId());
					facilityPushPinModel.setId(i++);
					facilityPushPinModel.setShowWindow(false);
					facilityPushPinModel.setFacilityId(facilityData.getArea().getAreaNId());
					//facilityPushPinModel.setFacilityName(facilityData.getArea().getName());
					facilityPushPinModel.setFacilityName(facilityData.getArea().getName()+" ("+facilityData.getArea().getFacilityType().getName()+")");
					facilityPushPinModel.setFacilityType(facilityData.getArea().getFacilityType().getName());

					facilityPushPinModel.setLatitude(facilityData.getGeopoint().split(",")[0]);
					facilityPushPinModel.setLongitude(facilityData.getGeopoint().split(",")[1]);
					String dataRetrived = utIndicatorEnRepository2.fetchAllValuesForIndicatorsAndSubmissionId(utindicator.getColumnName(), utindicator.getDenominatorOrMaxScore(), facilityData.getId());

					JSONArray jsonArrayData = (JSONArray) new JSONParser().parse(dataRetrived);
					JSONObject jsonObject = (JSONObject) jsonArrayData.get(0);
					Long nume = (Long) jsonObject.get(utindicator.getColumnName());
					Long deno = (Long) jsonObject.get(utindicator.getDenominatorOrMaxScore());

					if (nume == null)
						nume = (long) 0;
					if (deno == null)
						deno = (long) 0;

					int percentage = (int) ((nume == 0 || nume == null) ? 0 : deno == 0 ? 0 : (nume * 100) / deno);

					if (percentage > 75) {
						facilityPushPinModel.setIcon("resources/images/pushpins/l1.png");
						facilityPushPinModel.setLevelType("l1");

					} else if (percentage <= 75 && percentage >= 50) {
						facilityPushPinModel.setIcon("resources/images/pushpins/l2.png");
						facilityPushPinModel.setLevelType("l2");
					} else if (percentage < 50) {
						facilityPushPinModel.setIcon("resources/images/pushpins/l3.png");
						facilityPushPinModel.setLevelType("l3");
					}

					listOffacilityPushPinModel.add(facilityPushPinModel);
				}
			}

		} else if (checklistId == Integer
				.parseInt(messages.getMessage(Constants.Mobile.FORM_TYPE_COMMUNITY_CHECKLIST, null, null))) {
			/*if(facilityTypeId==null){
				listOfCommunityData = communityDataRepository.findByAreaAreaNIdAndDateBetween(blockId,
					new java.sql.Date(formatter.parse(startDate).getTime()),
					new java.sql.Date(formatter.parse(endDate).getTime()));
			}else{
				listOfCommunityData = communityDataRepository.findByAreaAreaNIdAndDateBetweenAndFacilityFacilityTypeId(blockId,
						new java.sql.Date(formatter.parse(startDate).getTime()),
						new java.sql.Date(formatter.parse(endDate).getTime()), facilityTypeId);
			}*/
			
			UtTimeperiod timeperiod=utTimeperiodRepository.findByStartDateAndEndDate(new java.sql.Date(formatter.parse(startDate).getTime()),
						new java.sql.Date(formatter.parse(endDate).getTime()));
				List<UtData> datas=utDataReporsitory.findCommunityDataForFacilityView(facilityTypeId,timeperiod.getTimePeriod_NId(),blockId,utindicator.getIndicator_NId());
			int i=1;
			for (UtData communityData : datas) {
				if (communityData.getArea_NId().getFacilityDatas().size()>0&&communityData.getArea_NId().getFacilityDatas()!=null&&communityData.getArea_NId().getFacilityDatas().get(0).getGeopoint() != null) {
					FacilityPushPinModel facilityPushPinModel = new FacilityPushPinModel();
					facilityPushPinModel.setSubmissionId((long)communityData.getTimePeriod_NId().getTimePeriod_NId());
					facilityPushPinModel.setId(i++);
					facilityPushPinModel.setShowWindow(false);
					facilityPushPinModel.setFacilityId(communityData.getArea_NId().getAreaNId());
					//facilityPushPinModel.setFacilityName(communityData.getFacility().getName());
					facilityPushPinModel.setFacilityName(communityData.getArea_NId().getName()+" ("+communityData.getArea_NId().getFacilityType().getName()+")");
					facilityPushPinModel.setFacilityType(communityData.getArea_NId().getFacilityType().getName());

					facilityPushPinModel.setLatitude(communityData.getArea_NId().getFacilityDatas().get(0).getGeopoint().split(",")[0]);
					facilityPushPinModel.setLongitude(communityData.getArea_NId().getFacilityDatas().get(0).getGeopoint().split(",")[1]);



					int percentage = communityData.getData_Value().intValue() ;

					if (percentage > 75) {
						facilityPushPinModel.setIcon("resources/images/pushpins/l1.png");
						facilityPushPinModel.setLevelType("l1");
					} else if (percentage <= 75 && percentage >= 50) {
						facilityPushPinModel.setIcon("resources/images/pushpins/l2.png");
						facilityPushPinModel.setLevelType("l2");
					} else if (percentage < 50) {
						facilityPushPinModel.setIcon("resources/images/pushpins/l3.png");
						facilityPushPinModel.setLevelType("l3");
					}

					listOffacilityPushPinModel.add(facilityPushPinModel);
				}
			}

		
	}
		return listOffacilityPushPinModel;
	}
	
	@Override
	public FacilityViewModel  getTabularDateForFacilityView(Integer stateId, Integer districtId, Integer blockId,
			Integer checkListId, Integer timeperiodId,Integer sesctionId, Integer facilityTypeId) {
		EssUserModel essUserModel = userService.getUserDetails();
		List<Area> listOfAreas = new ArrayList<>();
		List<Map<String, String>> listOfMapOfTabledata = new ArrayList<>();
		String keyId = null;
		String keyName = null;

		if (essUserModel.getUserLevel()==5) {
			listOfAreas.add(areaRepository.findByAreaNId(essUserModel.getBlockId()));
			keyName = "Block";
		} else if (essUserModel.getUserLevel()==4) {
			if (blockId != null) {
				listOfAreas.add(areaRepository.findByAreaNId(blockId));
				keyName = "Block";
			} else {
				keyName = "Block";
				listOfAreas = areaRepository.findByAreaParentId(essUserModel.getDistrictId());
			}

		} else if (essUserModel.getUserLevel()==2) {
			if (blockId != null) {
				listOfAreas.add(areaRepository.findByAreaNId(blockId));
				keyName = "Block";
			} else if (districtId != null) {
				keyName = "Block";
				listOfAreas = areaRepository.findByAreaParentId(districtId);
			} else {
				keyName = "District";
				listOfAreas = areaRepository.findByAreaParentId(essUserModel.getStateId());

			}
		} else if (essUserModel.getUserLevel()==1){
			if (blockId != null) {
				listOfAreas.add(areaRepository.findByAreaNId(blockId));
				keyName = "Block";
			} else if (districtId != null) {
				keyName = "Block";
				listOfAreas = areaRepository.findByAreaParentId(districtId);
			} else if (stateId != null) {
				keyName = "District";
				listOfAreas = areaRepository.findByAreaParentId(stateId);

			} else {
				keyName = "State";
				listOfAreas = areaRepository.findByAreaNIdIn(Arrays.asList(2, 32, 33, 35));

			}

		}
	
		for (Area area : listOfAreas) {
			if(area.getFacilityType()==null){
			Map<String, String> sectionMap = new LinkedHashMap<>();
			sectionMap.put("areaId", String.valueOf(area.getAreaNId()));
			sectionMap.put(keyName, area.getName());
			List<Object[]> listOfSubsectiondataValue = new ArrayList<>();
				if(facilityTypeId==null){
					listOfSubsectiondataValue = utDataReporsitory
							.findByAreaAndSubsectionIn(area.getAreaNId(), timeperiodId,sesctionId);
				}else{
					listOfSubsectiondataValue = utDataReporsitory
							.findByAreaAndSubsectionInAndFacilityTypeId(area.getAreaNId(), timeperiodId,sesctionId,facilityTypeId);
				}
				
			if(!listOfSubsectiondataValue.isEmpty()){
				for (Object[] objects : listOfSubsectiondataValue) {
					if (sectionMap.containsKey(objects[1].toString())) {
						sectionMap.put(objects[1].toString()+" ",objects[2]==null?"-":
							String.valueOf((float) (Math.round((Double) objects[2] * 10.0) / 10.0)));
						} else {
							
							sectionMap.put(objects[1].toString(), objects[2] == null ? "-"
									: String.valueOf((float) (Math.round((Double) objects[2] * 10.0) / 10.0)));
						}
				}
				
				listOfMapOfTabledata.add(sectionMap);
			}
			else{
				sectionMap.clear();
			}
				
		}}
		LinkedHashSet<String> tableHeader = new LinkedHashSet<>();
		tableHeader.add(keyName);
			List<Object[]> listOfObject = utIndicatorClassificationsEnRepository.findByIC_NId(sesctionId);
			for (Object[] objects : listOfObject) {
				tableHeader.add(objects[1].toString());
			}
		FacilityViewModel facilityViewModel = new FacilityViewModel();
		facilityViewModel.setTableData(listOfMapOfTabledata);
		facilityViewModel.setTableHeader(tableHeader);

		return facilityViewModel;
	}

	@Override
	public List<Map<String, String>> getSubmisionData(int checklistId, List<String> submissionIds,int facilityId) {


		List<Map<String, String>> mapDataList = new ArrayList<Map<String, String>>();
		switch (checklistId) {

		case 121:
			mapDataList = getFacilitySubmissionData(submissionIds, checklistId);
			break;
		case 122:
			mapDataList = getCommunitySubmissionData(submissionIds, checklistId,facilityId);
			break;
		}

		return mapDataList;
	
		
	}

	private List<Map<String, String>> getCommunitySubmissionData(List<String> submissionIds, int checklistId,int facilityId) {

		List<Integer> timeperiodIds = submissionIds.stream().map(String::trim).map(Integer::parseInt).collect(Collectors.toList());
		
		List<Map<String, String>> communityDataMapList = new ArrayList<Map<String, String>>();
		
		int timeperiodId=0;
		if(timeperiodIds.size()>0)
		{
			timeperiodId=timeperiodIds.get(0);
		}
		else
		{
			return communityDataMapList;
		}
		UtTimeperiod timePeriod=utTimeperiodRepository.findByTimeperiodNid(timeperiodId);
		List<Object[]> indicatorEns = utIndicatorEnRepository.findScoreIndicator();
		
		Map<String, String> indMap = new HashMap<String, String>();;
		for (Object[] indicatorEn : indicatorEns) {
			indMap .put(indicatorEn[1].toString(), indicatorEn[0].toString());
			if (indicatorEn[2] != null)
				indMap.put(indicatorEn[2].toString(), indicatorEn[0].toString());
		}
		
		List<CommunityData> communityDatas = communityDataRepository.findByDateBetweenAndFacilityAreaNIdOrderByDateAsc(timePeriod.getStartDate(), timePeriod.getEndDate(),facilityId);
		Map<String,Map<String,String>> dataMap =new LinkedHashMap<String,Map<String,String>>();
		
		Map<String,String> communityDataMap=new LinkedHashMap<String, String>(); 
		
		communityDataMap=new LinkedHashMap<String, String>(); 
		
		for(CommunityData communityData:communityDatas)
		{
			communityDataMap=new LinkedHashMap<String, String>(); 
			
			communityDataMap.put(communityData.getQ4(),communityData.getUser().getFirstName()+ " ( " + sdf.format(communityData.getDate()) + " )");
			if(dataMap.containsKey("Name Of Supervisor"))
			{
				dataMap.get("Name Of Supervisor").put(communityData.getQ4(),communityData.getUser().getFirstName()+ " ( " + sdf.format(communityData.getDate()) + " )");
			}
			else
			{
				dataMap.put("Name Of Supervisor", communityDataMap);
			}
			
			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey(indMap.get("note5a")))
			{
				if (communityData.getNote5a() > 0)
					dataMap.get(indMap.get("note5a")).put(communityData.getQ4(), String.valueOf(df.format((Double.parseDouble(String.valueOf(communityData.getNote51a() * 100))) / communityData.getNote5a())));
				else
					dataMap.get( indMap.get("note5a")).put(communityData.getQ4(), "-");
			}
			else
			{
				if (communityData.getNote5a() > 0)
					communityDataMap.put(communityData.getQ4(), String.valueOf(df.format((Double.parseDouble(String.valueOf(communityData.getNote51a() * 100))) / communityData.getNote5a())));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("note5a"),communityDataMap);
			}
			
			
			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("note1")))
			{
				if (communityData.getNote1() > 0)
					dataMap.get(indMap.get("note1")).put(communityData.getQ4(), String.valueOf(df.format((Double.parseDouble(String.valueOf(communityData.getNote11() * 100))) / communityData.getNote1())));
				else
					dataMap.get( indMap.get("note1")).put(communityData.getQ4(), "-");
			}
			else
			{
				if (communityData.getNote1() > 0)
					communityDataMap.put(communityData.getQ4(), String.valueOf(df.format(Double.parseDouble(String.valueOf(communityData.getNote11() * 100)) / communityData.getNote1())));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("note1"),communityDataMap);
			}
			
			
			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("note2")))
			{
				if (communityData.getNote21() > 0)
					dataMap.get(indMap.get("note2")).put(communityData.getQ4(), df.format(((double)communityData.getNote21() * 100) / communityData.getNote2()));
				else
					dataMap.get( indMap.get("note2")).put(communityData.getQ4(), "-");
			}
			else
			{
				if (communityData.getNote21() > 0)
					communityDataMap.put(communityData.getQ4(), df.format(((double)communityData.getNote21() * 100) / communityData.getNote2()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("note2"),communityDataMap);
			}
			
			
			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("note3b")))
			{
				if (communityData.getNote3b() > 0)
					dataMap.get(indMap.get("note3b")).put(communityData.getQ4(), df.format(((double)communityData.getNote31b() * 100) / communityData.getNote3b()));
				else
					dataMap.get( indMap.get("note2")).put(communityData.getQ4(), "-");
			}
			else
			{
				if (communityData.getNote3b() > 0)
					communityDataMap.put(communityData.getQ4(), df.format(((double)communityData.getNote31b() * 100) / communityData.getNote3b()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("note3b"),communityDataMap);
			}

			
			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("c_ia_iasha_score")))
			{
				if (communityData.getC_IA_IASHA_score_max() > 0)
					dataMap.get(indMap.get("c_ia_iasha_score")).put(communityData.getQ4(), df.format(((double)communityData.getC_IA_IASHA_score() * 100) / communityData.getC_IA_IASHA_score_max()));
				else
					dataMap.get( indMap.get("c_ia_iasha_score")).put(communityData.getQ4(), "-");
			}
			else
			{
				if (communityData.getC_IA_IASHA_score_max() > 0)
					communityDataMap.put(communityData.getQ4(), df.format(((double)communityData.getC_IA_IASHA_score() * 100) / communityData.getC_IA_IASHA_score_max()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("c_ia_iasha_score"),communityDataMap);
			}

			
			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("c_ia_aoecwasa_score")))
			{
				if (communityData.getC_IA_AOECWASA_score_max() > 0)
					dataMap.get(indMap.get("c_ia_aoecwasa_score")).put(communityData.getQ4(), df.format(((double)communityData.getC_IA_AOECWASA_score() * 100) / communityData.getC_IA_AOECWASA_score_max()));
				else
					dataMap.get(indMap.get("c_ia_aoecwasa_score")).put(communityData.getQ4(), "-");
				
			}
			else
			{
				if (communityData.getC_IA_AOECWASA_score_max() > 0)
					communityDataMap.put(communityData.getQ4(), df.format(((double)communityData.getC_IA_AOECWASA_score() * 100) / communityData.getC_IA_AOECWASA_score_max()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("c_ia_aoecwasa_score"),communityDataMap);
			}
		

			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("c_ia_aiwa_score")))
			{
				if (communityData.getC_IA_AIWA_score_max() > 0)
					dataMap.get(indMap.get("c_ia_aiwa_score")).put(communityData.getQ4(), df.format(((double)communityData.getC_IA_AIWA_score() * 100) / communityData.getC_IA_AIWA_score_max()));
				else
					dataMap.get(indMap.get("c_ia_aiwa_score")).put(communityData.getQ4(), "-");
				
			}
			else
			{
				if (communityData.getC_IA_AIWA_score_max() > 0)
					communityDataMap.put(communityData.getQ4(), df.format(((double)communityData.getC_IA_AIWA_score() * 100) / communityData.getC_IA_AIWA_score_max()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("c_ia_aiwa_score"),communityDataMap);
			}

			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("c_ia_aisa_score")))
			{
				if (communityData.getC_IA_AISA_score_max() > 0)
					dataMap.get(indMap.get("c_ia_aisa_score")).put(communityData.getQ4(), df.format(((double)communityData.getC_IA_AISA_score() * 100) / communityData.getC_IA_AISA_score_max()));
				else
					dataMap.get(indMap.get("c_ia_aisa_score")).put(communityData.getQ4(), "-");
				
			}
			else
			{
				if (communityData.getC_IA_AISA_score_max() > 0)
					communityDataMap.put(communityData.getQ4(), df.format(((double)communityData.getC_IA_AISA_score() * 100) / communityData.getC_IA_AISA_score_max()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("c_ia_aisa_score"),communityDataMap);
			}
			
			
			
			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("note4a")))
			{
				if (communityData.getNote4a() > 0)
					dataMap.get(indMap.get("note4a")).put(communityData.getQ4(), df.format(((double)communityData.getNote41a() * 100) / communityData.getNote4a()));
				else
					dataMap.get(indMap.get("note4a")).put(communityData.getQ4(), "-");
				
			}
			else
			{
				if (communityData.getNote4a() > 0)
					communityDataMap.put(communityData.getQ4(), df.format(((double)communityData.getNote41a() * 100) / communityData.getNote4a()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("note4a"),communityDataMap);
			}
			
			
			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("c_ib_iwpw_score")))
			{
				if (communityData.getC_IB_IWPW_score_max() > 0)
					dataMap.get(indMap.get("c_ib_iwpw_score")).put(communityData.getQ4(), df.format(((double)communityData.getC_IB_IWPW_score() * 100) / communityData.getC_IB_IWPW_score_max()));
				else
					dataMap.get(indMap.get("c_ib_iwpw_score")).put(communityData.getQ4(), "-");
				
			}
			else
			{
				if (communityData.getC_IB_IWPW_score_max() > 0)
					communityDataMap.put(communityData.getQ4(), df.format(((double)communityData.getC_IB_IWPW_score() * 100) / communityData.getC_IB_IWPW_score_max()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("c_ib_iwpw_score"),communityDataMap);
			}
			
			
			
				communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("c_ib_iwlmwmb_score")))
			{
				if (communityData.getC_IB_IWLMWMB_score_max() > 0)
					dataMap.get(indMap.get("c_ib_iwlmwmb_score")).put(communityData.getQ4(), df.format(((double)communityData.getC_IB_IWLMWMB_score() * 100) / communityData.getC_IB_IWLMWMB_score_max()));
				else
					dataMap.get(indMap.get("c_ib_iwlmwmb_score")).put(communityData.getQ4(), "-");
				
			}
			else
			{
				if (communityData.getC_IB_IWLMWMB_score_max() > 0)
					communityDataMap.put(communityData.getQ4(), df.format(((double)communityData.getC_IB_IWLMWMB_score() * 100) / communityData.getC_IB_IWLMWMB_score_max()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("c_ib_iwlmwmb_score"),communityDataMap);
			}


			
			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("c_ib_aassrfwsd_score")))
			{
				if (communityData.getC_IB_AASSRFWSD_score_max() > 0)
					dataMap.get(indMap.get("c_ib_aassrfwsd_score")).put(communityData.getQ4(), df.format(((double)communityData.getC_IB_AASSRFWSD_score() * 100) / communityData.getC_IB_AASSRFWSD_score_max()));
				else
					dataMap.get(indMap.get("c_ib_aassrfwsd_score")).put(communityData.getQ4(), "-");
				
			}
			else
			{
				if (communityData.getC_IB_AASSRFWSD_score_max() > 0)
					communityDataMap.put(communityData.getQ4(), df.format(((double)communityData.getC_IB_AASSRFWSD_score() * 100) / communityData.getC_IB_AASSRFWSD_score_max()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("c_ib_aassrfwsd_score"),communityDataMap);
			}

			
			
			
			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("c_ib_imwcm_score")))
			{
				if (communityData.getC_IB_IMWCM_score_max() > 0)
					dataMap.get(indMap.get("c_ib_imwcm_score")).put(communityData.getQ4(), df.format((double)(communityData.getC_IB_IMWCM_score() * 100) / communityData.getC_IB_IMWCM_score_max()));
				else
					dataMap.get(indMap.get("c_ib_imwcm_score")).put(communityData.getQ4(), "-");
				
			}
			else
			{
				if (communityData.getC_IB_IMWCM_score_max() > 0)
					communityDataMap.put(communityData.getQ4(), df.format((double)(communityData.getC_IB_IMWCM_score() * 100) / communityData.getC_IB_IMWCM_score_max()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("c_ib_imwcm_score"),communityDataMap);
			}

			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("c_ib_iwbmpwpm_score")))
			{
				if (communityData.getC_IB_IWBMPWPM_score_max() > 0)
					dataMap.get(indMap.get("c_ib_iwbmpwpm_score")).put(communityData.getQ4(), df.format((double)(communityData.getC_IB_IWBMPWPM_score() * 100) / communityData.getC_IB_IWBMPWPM_score_max()));
				else
					dataMap.get(indMap.get("c_ib_iwbmpwpm_score")).put(communityData.getQ4(), "-");
				
			}
			else
			{
				if (communityData.getC_IB_IWBMPWPM_score_max() > 0)
					communityDataMap.put(communityData.getQ4(), df.format((double)(communityData.getC_IB_IWBMPWPM_score() * 100) / communityData.getC_IB_IWBMPWPM_score_max()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("c_ib_iwbmpwpm_score"),communityDataMap);
			}
			
			
			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("c_ib_iwfha_score")))
			{
				if (communityData.getC_IB_IWFHA_score_max() > 0)
					dataMap.get(indMap.get("c_ib_iwfha_score")).put(communityData.getQ4(), df.format((double)(communityData.getC_IB_IWFHA_score() * 100) / communityData.getC_IB_IWFHA_score_max()));
				else
					dataMap.get(indMap.get("c_ib_iwfha_score")).put(communityData.getQ4(), "-");
				
			}
			else
			{
				if (communityData.getC_IB_IWFHA_score_max() > 0)
					communityDataMap.put(communityData.getQ4(), df.format((double)(communityData.getC_IB_IWFHA_score() * 100) / communityData.getC_IB_IWFHA_score_max()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("c_ib_iwfha_score"),communityDataMap);
			}
			
		
			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("c_ib_ihhd_score")))
			{
				if (communityData.getC_IB_IHHD_score_max() > 0)
					dataMap.get(indMap.get("c_ib_ihhd_score")).put(communityData.getQ4(), df.format((double)(communityData.getC_IB_IHHD_score() * 100) / communityData.getC_IB_IHHD_score_max()));
				else
					dataMap.get(indMap.get("c_ib_ihhd_score")).put(communityData.getQ4(), "-");
				
			}
			else
			{
				if (communityData.getC_IB_IHHD_score_max() > 0)
					communityDataMap.put(communityData.getQ4(),df.format((double)(communityData.getC_IB_IHHD_score() * 100) / communityData.getC_IB_IHHD_score_max()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("c_ib_ihhd_score"),communityDataMap);
			}
			

			

			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("c_ib_saiwwnta_score")))
			{
				if (communityData.getC_IB_SAIWWNTA_score_max() > 0)
					dataMap.get(indMap.get("c_ib_saiwwnta_score")).put(communityData.getQ4(), df.format((double)(communityData.getC_IB_SAIWWNTA_score() * 100) / communityData.getC_IB_SAIWWNTA_score_max()));
				else
					dataMap.get(indMap.get("c_ib_saiwwnta_score")).put(communityData.getQ4(), "-");
				
			}
			else
			{
				if (communityData.getC_IB_SAIWWNTA_score_max() > 0)
					communityDataMap.put(communityData.getQ4(), df.format((double)(communityData.getC_IB_SAIWWNTA_score() * 100) / communityData.getC_IB_SAIWWNTA_score_max()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("c_ib_saiwwnta_score"),communityDataMap);
			}
			
		}
		
		dataMap.forEach((k, v) -> {
			
			v.put("Section/Sub-Section", k);
			communityDataMapList.add(v);

		});
		
		return communityDataMapList;
	}

	private List<Map<String, String>> getFacilitySubmissionData(List<String> submissionIds, int checklistId) {
		List<Long> submissionIdsInteger = submissionIds.stream().map(String::trim).map(Long::parseLong).collect(Collectors.toList());
		List<Object[]> indicatorEns = utIndicatorEnRepository.findScoreIndicator();
		Map<String, String> indMap = new LinkedHashMap<String, String>();

		for (Object[] indicatorEn : indicatorEns) {
			indMap.put(indicatorEn[1].toString(), indicatorEn[0].toString());
			if (indicatorEn[2] != null)
				indMap.put(indicatorEn[2].toString(), indicatorEn[0].toString());
		}
		List<FacilityData> facilityDatas = facilityDataRepository.findByIdIsInOrderByC7Desc(submissionIdsInteger);
		
		
		List<Map<String, String>> facilityDataMapList = new ArrayList<Map<String, String>>();
		
		FacilityData facilityData=new FacilityData();
		
		if(facilityDatas.size()>0)
		facilityData=facilityDatas.get(0);
		else 
			return facilityDataMapList;
		
		Map<String, String> facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("Section/Sub-Section", "Name Of Supervisor");
		facilityDataMap.put("Score", facilityData.getUser().getFirstName() + " ( " + sdf.format(facilityData.getC7()) + " )");

		facilityDataMapList.add(facilityDataMap);

	// for overall score	
		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("Section/Sub-Section", indMap.get("checklist_score"));
		if (facilityDatas.get(facilityDatas.size() - 1).getChecklist_score_max() > 0)
			facilityDataMap.put("Score", df.format((double)(facilityData.getChecklist_score() * 100) / facilityData.getChecklist_score_max()));
		else
			facilityDataMap.put("Score", "-");			
		facilityDataMapList.add(facilityDataMap);
		
		
		
		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("Section/Sub-Section", indMap.get("e_total_score"));
		if (facilityDatas.get(facilityDatas.size() - 1).getE_total_score_max() > 0)
			facilityDataMap.put("Score", df.format((double)(facilityData.getE_total_score() * 100) / facilityData.getE_total_score_max()));
		else
			facilityDataMap.put("Score", "-");			
		facilityDataMapList.add(facilityDataMap);
		

		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("Section/Sub-Section", indMap.get("e_rh_score"));
		if (facilityDatas.get(facilityDatas.size() - 1).getE_total_score_max() > 0)
			facilityDataMap.put("Score", df.format((double)(facilityData.getE_MHDS_score() * 100) / facilityData.getE_MHDS_score_max()));
		else
			facilityDataMap.put("Score", "-");			
		facilityDataMapList.add(facilityDataMap);
		
		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("Section/Sub-Section", indMap.get("e_mhds_score"));
		if (facilityDatas.get(facilityDatas.size() - 1).getE_total_score_max() > 0)
			facilityDataMap.put("Score", df.format((double)(facilityData.getE_MHDS_score() * 100) / facilityData.getE_MHDS_score_max()));
		else
			facilityDataMap.put("Score", "-");			
		facilityDataMapList.add(facilityDataMap);
		

		
		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("Section/Sub-Section", indMap.get("e_nhds_score"));
		if (facilityData.getE_NHDS_score_max() > 0)
			facilityDataMap.put("Score", df.format((double)(facilityData.getE_NHDS_score() * 100) / facilityData.getE_NHDS_score_max()));
		else
			facilityDataMap.put("Score", "-");			
		facilityDataMapList.add(facilityDataMap);
		
		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("Section/Sub-Section", indMap.get("e_mhds_score"));
		if (facilityData.getE_MHDS_score_max() > 0)
			facilityDataMap.put("Score", df.format((double)(facilityData.getE_MHDS_score() * 100) / facilityData.getE_MHDS_score_max()));
		else
			facilityDataMap.put("Score", "-");			
		facilityDataMapList.add(facilityDataMap);
		
		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("Section/Sub-Section", indMap.get("e_chds_score"));
		if (facilityData.getE_CHDS_score_max() > 0)
			facilityDataMap.put("Score", df.format((double)(facilityData.getE_CHDS_score() * 100) / facilityData.getE_CHDS_score_max()));
		else
			facilityDataMap.put("Score", "-");			
		facilityDataMapList.add(facilityDataMap);
		
	
		
		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("Section/Sub-Section", indMap.get("e_vaccines_score"));
		if (facilityData.getE_Vaccines_score_max() > 0)
			facilityDataMap.put("Score", df.format((double)(facilityData.getE_Vaccines_score() * 100) / facilityData.getE_Vaccines_score_max()));
		else
			facilityDataMap.put("Score", "-");			
		facilityDataMapList.add(facilityDataMap);

		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("Section/Sub-Section", indMap.get("e_antibiotics_score"));
		if (facilityData.getE_Antibiotics_score_max() > 0)
			facilityDataMap.put("Score", df.format((double)(facilityData.getE_Antibiotics_score() * 100) / facilityData.getE_Antibiotics_score_max()));
		else
			facilityDataMap.put("Score", "-");			
		facilityDataMapList.add(facilityDataMap);
		

		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("Section/Sub-Section", indMap.get("e_infrastructure_score"));
		if (facilityData.getE_Infrastructure_score_max() > 0)
			facilityDataMap.put("Score", df.format((double)(facilityData.getE_Infrastructure_score() * 100) / facilityData.getE_Infrastructure_score_max()));
		else
			facilityDataMap.put("Score", "-");			
		facilityDataMapList.add(facilityDataMap);
		
		
		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("Section/Sub-Section", indMap.get("e_ip_score"));
		if (facilityData.getE_IP_score_max() > 0)
			facilityDataMap.put("Score", df.format((double)(facilityData.getE_IP_score() * 100) / facilityData.getE_IP_score_max()));
		else
			facilityDataMap.put("Score", "-");			
		facilityDataMapList.add(facilityDataMap);
		
		
		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("Section/Sub-Section", indMap.get("e_ahds_score"));
		if (facilityData.getE_AHDS_score_max() > 0)
			facilityDataMap.put("Score", df.format((double)(facilityData.getE_AHDS_score() * 100) / facilityData.getE_AHDS_score_max()));
		else
			facilityDataMap.put("Score", "-");			
		facilityDataMapList.add(facilityDataMap);
		

		
		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("Section/Sub-Section", indMap.get("e_oe_score"));
		if (facilityData.getE_OE_score_max() > 0)
			facilityDataMap.put("Score", df.format((double)(facilityData.getE_OE_score() * 100) / facilityData.getE_OE_score_max()));
		else
			facilityDataMap.put("Score", "-");			
		facilityDataMapList.add(facilityDataMap);
		

		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("Section/Sub-Section", indMap.get("f_total_score"));
		if (facilityData.getF_total_score_max() > 0)
			facilityDataMap.put("Score", df.format((double)(facilityData.getF_total_score() * 100) / facilityData.getF_total_score_max()));
		else
			facilityDataMap.put("Score", "-");			
		facilityDataMapList.add(facilityDataMap);
		
		
		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("Section/Sub-Section", indMap.get("f_anc_score"));
		if (facilityData.getF_ANC_score_max() > 0)
			facilityDataMap.put("Score", df.format((double)(facilityData.getF_ANC_score() * 100) / facilityData.getF_ANC_score_max()));
		else
			facilityDataMap.put("Score", "-");			
		facilityDataMapList.add(facilityDataMap);

		
		
		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("Section/Sub-Section", indMap.get("f_ipip_score"));
		if (facilityData.getF_IPIP_score_max() > 0)
			facilityDataMap.put("Score", df.format((double)(facilityData.getF_IPIP_score() * 100) / facilityData.getF_IPIP_score_max()));
		else
			facilityDataMap.put("Score", "-");			
		facilityDataMapList.add(facilityDataMap);
	

		
		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("Section/Sub-Section", indMap.get("f_encr_score"));
		if (facilityData.getF_ENCR_score_max() > 0)
			facilityDataMap.put("Score", df.format((double)(facilityData.getF_ENCR_score() * 100) / facilityData.getF_ENCR_score_max()));
		else
			facilityDataMap.put("Score", "-");			
		facilityDataMapList.add(facilityDataMap);
		

		
		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("Section/Sub-Section", indMap.get("f_fp_score"));
		if (facilityData.getF_FP_score_max() > 0)
			facilityDataMap.put("Score", df.format((double)(facilityData.getF_FP_score() * 100) / facilityData.getF_FP_score_max()));
		else
			facilityDataMap.put("Score", "-");			
		facilityDataMapList.add(facilityDataMap);
		
		
		
		
		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("Section/Sub-Section", indMap.get("f_cs_score"));
		if (facilityData.getF_CS_score_max() > 0)
			facilityDataMap.put("Score", df.format((double)(facilityData.getF_CS_score() * 100) / facilityData.getF_CS_score_max()));
		else
			facilityDataMap.put("Score", "-");			
		facilityDataMapList.add(facilityDataMap);
		
		
		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("Section/Sub-Section", indMap.get("f_fmo_score"));
		if (facilityData.getF_FMO_score_max() > 0)
			facilityDataMap.put("Score", df.format((double)(facilityData.getF_FMO_score() * 100) / facilityData.getF_FMO_score_max()));
		else
			facilityDataMap.put("Score", "-");			
		facilityDataMapList.add(facilityDataMap);
		

		
		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("Section/Sub-Section", indMap.get("f_ah_score"));
		if (facilityData.getF_AH_score_max() > 0)
			facilityDataMap.put("Score", df.format((double)(facilityData.getF_AH_score() * 100) / facilityData.getF_AH_score_max()));
		else
			facilityDataMap.put("Score", "-");			
		facilityDataMapList.add(facilityDataMap);
		
		

		return facilityDataMapList;
	}
	

}


