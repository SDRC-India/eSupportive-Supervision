package org.sdrc.ess.service;

import java.io.IOException;
import java.math.BigInteger;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.time.DateUtils;
import org.sdrc.ess.domain.Area;
import org.sdrc.ess.domain.CommunityData;
import org.sdrc.ess.domain.EssUser;
import org.sdrc.ess.domain.FacilityData;
import org.sdrc.ess.domain.Planning;
import org.sdrc.ess.domain.Timeperiod;
import org.sdrc.ess.domain.TypeDetail;
import org.sdrc.ess.domain.Unplanned;
import org.sdrc.ess.domain.UserAreaMapping;
import org.sdrc.ess.model.mobile.AreaModel;
import org.sdrc.ess.model.mobile.TypeDetailModel;
import org.sdrc.ess.model.mobile.UserAreaMappingModel;
import org.sdrc.ess.model.web.DoughnutChartModel;
import org.sdrc.ess.model.web.ErrorClass;
import org.sdrc.ess.model.web.EssUserModel;
import org.sdrc.ess.model.web.FacilityPlanningModel;
import org.sdrc.ess.model.web.PlanningFacilityAssessmentHistory;
import org.sdrc.ess.model.web.PlanningModel;
import org.sdrc.ess.model.web.TimePeriodModel;
import org.sdrc.ess.model.web.ValueObject;
import org.sdrc.ess.repository.AreaRepository;
import org.sdrc.ess.repository.CommunityDataRepository;
import org.sdrc.ess.repository.EssUserRepository;
import org.sdrc.ess.repository.FacilityDataRepository;
import org.sdrc.ess.repository.PlanningRepository;
import org.sdrc.ess.repository.TimeperiodRepository;
import org.sdrc.ess.repository.UnplannedRepository;
import org.sdrc.ess.repository.UserAreaMappingRepository;
import org.sdrc.ess.util.Constants;
import org.sdrc.ess.util.StateManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 *
 * @author Debiprasad Parida (debiprasad@sdrc.co.in) on 05-08-2017 01:23 am
 *
 */

@Service
public class PlanningServiceImpl implements PlanningService {
	
	private static final Logger logger = LoggerFactory
			.getLogger(PlanningServiceImpl.class);

	@Autowired
	EssUserRepository essUserRepository;

	@Autowired
	private StateManager stateManager;

	@Autowired
	PlanningRepository planningRepository;
	
	@Autowired
	AreaRepository areaRepository;
	
	@Autowired
	UserAreaMappingRepository userAreaMappingRepository;
	
	@Autowired
	private ResourceBundleMessageSource messages;
	
	@Autowired
	FacilityDataRepository facilityDataRepository;
	
	@Autowired
	CommunityDataRepository communityDataRepository;
	
	@Autowired
	TimeperiodRepository timeperiodRepository;
	
	@Autowired
	UserService userService;
	
	@Autowired
	UnplannedRepository unplannedRepository;

	private SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
	private SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	@Override
	public ErrorClass planFacility(PlanningModel planningModel) {

		ErrorClass errorClass = new ErrorClass();
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MONTH, 1);
		calendar.set(Calendar.DATE, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));
		Date nextMonthFirstDay = calendar.getTime();
		calendar.set(Calendar.DATE, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		Date nextMonthLastDay = calendar.getTime();

		try {
			if(DateUtils.isSameDay(sdf.parse(planningModel.getPlanDate()), nextMonthFirstDay)
					|| DateUtils.isSameDay(sdf.parse(planningModel.getPlanDate()), nextMonthLastDay)
					|| (sdf.parse(planningModel.getPlanDate()).after(nextMonthFirstDay) && sdf.parse(planningModel.getPlanDate()).before(nextMonthLastDay))){
				
				EssUserModel essUserModel = (EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL);
				EssUser essUser = essUserRepository.findByUsername(essUserModel.getUsername());

				Planning planning = new Planning();
				planning.setCreatedDate(new Timestamp(System.currentTimeMillis()));
				planning.setEssUser(essUser);
				planning.setFacility(new Area(planningModel.getFacilityId()));
				planning.setIsLive(true);
				planning.setPlanDate(new Timestamp(sdf.parse(planningModel.getPlanDate()).getTime()));
				planning.setCheckListType(new TypeDetail(planningModel.getChecklistId()));
				planningRepository.save(planning);

				errorClass.setValid("true");
				logger.info("Plan successful for the area id: " + planningModel.getFacilityId() + ", by username: "+ essUser.getUsername());
				errorClass.setErrorMessage("Planning successful. ");
			}
				
			

		} catch (Exception e) {
			e.printStackTrace();
			errorClass.setValid("false");
			logger.error("Plan unsuccessful for the area id: " + planningModel.getFacilityId() + ", error message " + e.getMessage());
			errorClass.setErrorMessage("Planning failed. ");
		}

		return errorClass;
	}

	@Override
	public ErrorClass releasePlanning(Integer planningId) throws Exception {
		ErrorClass errorClass = new ErrorClass();
		Planning planning = planningRepository.findByPlanningId(planningId);

		if (planning != null) {

			
			Calendar calendar = Calendar.getInstance();         
			calendar.add(Calendar.MONTH, 1);
			calendar.set(Calendar.DATE, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));
			Date nextMonthFirstDay = calendar.getTime();
			calendar.set(Calendar.DATE, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
			Date nextMonthLastDay = calendar.getTime();

			if (DateUtils.isSameDay(planning.getPlanDate(), nextMonthFirstDay)
					|| DateUtils.isSameDay(planning.getPlanDate(), nextMonthLastDay)
					|| (planning.getPlanDate().after(nextMonthFirstDay) && planning.getPlanDate().before(nextMonthLastDay))) {
				planning.setIsLive(false);
				planning.setUpdatedDate(new Timestamp(System.currentTimeMillis()));
				planningRepository.save(planning);

				errorClass.setValid("true");
				errorClass.setErrorMessage("Release successful. ");
				return errorClass;
			} else {

				errorClass.setValid("true");
				errorClass.setErrorMessage("Release failed. ");
				return errorClass;
			}

			/*
			 * planning.setIsLive(false); planning.setUpdatedDate(new
			 * Timestamp(System.currentTimeMillis()));
			 * planningRepository.save(planning);
			 * 
			 * errorClass.setValid("true");
			 * errorClass.setErrorMessage("Release successful. "); return
			 * errorClass;
			 */
		} else {
			errorClass.setValid("false");
			errorClass.setErrorMessage("Release failed. ");
			return errorClass;
		}

	}

	@Override
	public PlanningFacilityAssessmentHistory getPlanningData(Integer checklistId) throws ParseException {
		PlanningFacilityAssessmentHistory planningFacilityAssessmentHistory = new PlanningFacilityAssessmentHistory();
		EssUserModel essUserModel = (EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL);
		List<Area> areas = areaRepository.findAllByOrderByNameAsc();
		List<FacilityPlanningModel> facilityPlanningModels = new ArrayList<FacilityPlanningModel>();

		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MONTH, 1);
		calendar.set(Calendar.DATE, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));
		Date nextMonthFirstDay = calendar.getTime();
		calendar.set(Calendar.DATE, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		Date nextMonthLastDay = calendar.getTime();
		Date todayDate = new Date();

		planningFacilityAssessmentHistory.setServerDate(sdf.format(todayDate));
		planningFacilityAssessmentHistory.setStartDate(sdf.format(nextMonthFirstDay));
		planningFacilityAssessmentHistory.setEndDate(sdf.format(nextMonthLastDay));

		List<Planning> plannings = new ArrayList<>();
		// List<Integer> pendingFacilities = new ArrayList<Integer>();
		plannings = planningRepository.findByCheckListTypeIdAndPlanDateBetweenAndIsLiveTrueOrderByFacilityNameAsc(checklistId,
				new Timestamp(new SimpleDateFormat("yyyy-MM-dd").parse(simpleDateFormat.format(nextMonthFirstDay)).getTime()),
				new Timestamp(nextMonthLastDay.getTime()));

		List<Integer> priorityList = new ArrayList<>();
		Timeperiod time = timeperiodRepository.findTop1ByPeriodicityOrderByTimeperiodIdDesc(messages.getMessage(Constants.Web.QUARTERLY_PERIODICITY, null, null));
		// to do change the date-range to start of last quarter to today date.
		if (checklistId == Integer
				.parseInt(messages.getMessage(Constants.Mobile.FORM_TYPE_FACILITY_CHECKLIST, null, null))) {
			List<FacilityData> listOffacilityData = facilityDataRepository.findByC7Between(time.getStartDate(),
					new java.sql.Date(todayDate.getTime()));
			for (FacilityData facilityData : listOffacilityData) {
				priorityList.add(facilityData.getArea().getAreaNId());
			}
		} else if (checklistId == Integer
				.parseInt(messages.getMessage(Constants.Mobile.FORM_TYPE_COMMUNITY_CHECKLIST, null, null))) {
			List<CommunityData> listOfCommunityData = communityDataRepository.findByDateBetween(time.getStartDate(),
					new java.sql.Date(todayDate.getTime()));
			for (CommunityData communityData : listOfCommunityData) {
				priorityList.add(communityData.getFacility().getAreaNId());
			}

		}

		Map<Integer, List<Planning>> planningMap = new HashMap<Integer, List<Planning>>();

		for (Planning planning : plannings) {
			if (planningMap.containsKey(planning.getFacility().getAreaNId())) {
				planningMap.get(planning.getFacility().getAreaNId()).add(planning);
			} else {
				List<Planning> planningList = new ArrayList<Planning>();
				planningList.add(planning);
				planningMap.put(planning.getFacility().getAreaNId(), planningList);
			}
		}

		List<Area> listOfAreas = areaRepository.findAll();
		Map<Integer, Area> areaMap = new HashMap<>();
		for (Area area : listOfAreas) {
			areaMap.put(area.getAreaNId(), area);
		}
		for (Area area : areas) {
			if (area.getLevel() == 5) {

				FacilityPlanningModel facilityPlanningModel = new FacilityPlanningModel();
				List<ValueObject> valueObjects = new ArrayList<ValueObject>();
				List<ValueObject> releaseDates = new ArrayList<ValueObject>();
				facilityPlanningModel.setFacilityId(area.getAreaNId());
				facilityPlanningModel.setFacilityName(area.getName());
				facilityPlanningModel.setParentId(area.getParentAreaId());
				facilityPlanningModel.setStateId(areaMap.get(area.getParentAreaId()).getParentAreaId());
				facilityPlanningModel
						.setPriority(priorityList.contains(area.getAreaNId()) ? false : true);

				if (planningMap.containsKey(area.getAreaNId())) {
					facilityPlanningModel.setPlanned(true);
					for (Planning planning : planningMap.get(area.getAreaNId())) {
						ValueObject valueObject = new ValueObject();
						valueObject.setValue(sdf.format(planning.getPlanDate()));
						valueObject.setDescription(planning.getEssUser().getUsername());
						valueObjects.add(valueObject);
						if (essUserModel.getUserId() == planning.getEssUser().getId().intValue()
								&& planning.getVisitedDate() == null) {
							ValueObject realeaseDate = new ValueObject(planning.getPlanningId(),
									sdf.format(planning.getPlanDate()));
							releaseDates.add(realeaseDate);
						}
					}
				} else {
					facilityPlanningModel.setPlanned(false);
				}
				facilityPlanningModel.setPlannedHistory(valueObjects);

				// if atleast one facility planned then only we will set
				// releaseDates
				if (releaseDates.size() > 0) {
					facilityPlanningModel.setRealeaseDate(releaseDates);
				}

				facilityPlanningModels.add(facilityPlanningModel);

			}
		}

		planningFacilityAssessmentHistory.setFacilityPlanningModel(facilityPlanningModels);
		// planningFacilityAssessmentHistory.setAreaModel(areaWebModels);

		return planningFacilityAssessmentHistory;
	}
	
	/**
	 * At the time of data sync through mobile visitedDate persist into planning table visitedDate is same as plannedDate
	 * @throws ParseException 
	 */
	@Override
	public void saveVisitedDate(int userId, int facilityId, int checklistId, Date visitedDate, Long submissionId) {

		Planning planningdata = planningRepository
				.findByEssUserIdAndFacilityAreaNIdAndCheckListTypeIdAndPlanDateAndVisitedDateIsNullAndIsLiveTrue(userId,
						facilityId, checklistId, new Timestamp(visitedDate.getTime()));
		if (planningdata != null) {
			planningdata.setVisitedDate(new Timestamp(visitedDate.getTime()));
			/* planningdata.setSubmissionId(submissionId.intValue()); */
			planningdata.setUpdatedDate(new Timestamp(System.currentTimeMillis()));
			planningRepository.save(planningdata);
		} else {
			Unplanned unplanned = new Unplanned();

			unplanned.setCheckListType(new TypeDetail(checklistId));
			unplanned.setCreatedDate(new Timestamp(System.currentTimeMillis()));
			unplanned.setEssUser(new EssUser(userId));
			unplanned.setFacility(new Area(facilityId));
			unplanned.setVisitedDate(new Timestamp(visitedDate.getTime()));

			unplannedRepository.save(unplanned);

		}
	}

	
	
	@Override
	public List<AreaModel> getAllAreaLoginwise() {
		EssUserModel essUserModel = (EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL);
		List<AreaModel> areaModelList = new ArrayList<>();
		ObjectMapper mapper = new ObjectMapper();
		EssUser user = essUserRepository.findByUsername(essUserModel.getUsername());
		UserAreaMapping areaMapping = user.getUserAreaMappings();
		UserAreaMappingModel uAMap = null;
		try {
			uAMap = mapper.readValue(areaMapping.getAreaJson(), UserAreaMappingModel.class);
		} catch (JsonParseException e) {

			e.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}

		List<Integer> areaIdList = new ArrayList<>();

		areaIdList.add(uAMap.getCountry());
		if (uAMap.getState() != null && !uAMap.getState().isEmpty())
			areaIdList.addAll(uAMap.getState());
		if (uAMap.getDistrict() != null && !uAMap.getDistrict().isEmpty())
			areaIdList.addAll(uAMap.getDistrict());
		if (uAMap.getBlock() != null && !uAMap.getBlock().isEmpty())
			areaIdList.addAll(uAMap.getBlock());
		if (uAMap.getFacility() != null && !uAMap.getFacility().isEmpty())
			areaIdList.addAll(uAMap.getFacility());

		List<Area> areaList;

		List<Integer> areaIds = new ArrayList<>(); // for finding responsible
													// designation. see line 338
		Boolean countryAdmin = false;

		if (uAMap.getState() != null && !uAMap.getState().isEmpty()) {
			areaIds = uAMap.getState();
			areaList = areaRepository.findByAreaNIdIn(areaIdList);
		} else {
			countryAdmin = true;
			areaIds.add(uAMap.getCountry());
			areaList = areaRepository.findAll();
		}
		for (Area area : areaList) {
			AreaModel areaModel = new AreaModel();

			areaModel.setAreaId(area.getAreaId());
			areaModel.setAreaNId(area.getAreaNId());
			areaModel.setLevel(area.getLevel());
			areaModel.setName(area.getName());
			areaModel.setParentAreaId(area.getParentAreaId());
			areaModel.setnIN(area.getnIN());

			if (area.getFacilityType() != null && area.getFacilityType().getName() != null) {
				TypeDetailModel typeDetailModel = new TypeDetailModel();
				typeDetailModel.setId(area.getFacilityType().getId());
				typeDetailModel.setName(area.getFacilityType().getName());
				typeDetailModel.setTypeId(area.getFacilityType().getTypeId());

				areaModel.setFacilityType(typeDetailModel);

			}

			areaModelList.add(areaModel);
		}
		return areaModelList;}

	/**
	 * Get Value for DoughnutChart, One is for current month & other is for last financial Quater
	 * @throws ParseException 
	 */
	@Override
	public List<DoughnutChartModel> getDataForDoughnutChart(int checklistId) throws ParseException {

		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MONTH, 0);
		calendar.set(Calendar.DATE, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));
		Date curentMonthFirstDay = calendar.getTime();
		calendar.set(Calendar.DATE, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		Date curentMonthLastDay = calendar.getTime();

		

		Timeperiod timeperiod = timeperiodRepository.findTop1ByPeriodicityOrderByTimeperiodIdDesc(messages.getMessage(Constants.Web.QUARTERLY_PERIODICITY, null, null));

		List<Object[]> currentMonthPlannings = null;
		List<Object[]> lastQuaterMonthPlannings = null;
		DoughnutChartModel doughnutChartModel = null;
		
		Calendar calendar1 = Calendar.getInstance();
		calendar1.add(Calendar.MONTH, 0);

		EssUserModel essUserModel = userService.getUserDetails();
		List<Area> listOfAreas = new ArrayList<>();
		List<Integer> listOfFacilityNId = new ArrayList<>();
		List<DoughnutChartModel> listOfDoughnutChartModel = new ArrayList<>();
		if(essUserModel.getUserLevel()==8){
			listOfAreas.add(areaRepository.findByAreaNId(essUserModel.getFacilityId()));
		}else if (essUserModel.getUserLevel()==5) {
			listOfAreas = areaRepository.findByAreaParentId(essUserModel.getBlockId());
		} else if (essUserModel.getUserLevel()==4) {
			listOfAreas = areaRepository.findByAreaParentIdAreaParentId(essUserModel.getDistrictId());
		} else if (essUserModel.getUserLevel()==2) {
			listOfAreas = areaRepository.findByAreaParentIdAreaParentIdAreaParentId(essUserModel.getStateId());
		} else if(essUserModel.getUserLevel()==1) {
			currentMonthPlannings = planningRepository.findByPlanDateBetweenAndIsLiveIsTrue(
					new Timestamp(new SimpleDateFormat("yyyy-MM-dd").parse(simpleDateFormat.format(curentMonthFirstDay)).getTime()),
					new Timestamp(new SimpleDateFormat("yyyy-MM-dd").parse(simpleDateFormat.format(curentMonthLastDay)).getTime()),checklistId);

			doughnutChartModel = setIntoDoughnutChartModel(currentMonthPlannings, 1,new SimpleDateFormat("MMM yyyy").format(calendar1.getTime()));
			listOfDoughnutChartModel.add(doughnutChartModel);

			lastQuaterMonthPlannings = planningRepository.findByPlanDateBetweenAndIsLiveIsTrue(
					new Timestamp(timeperiod.getStartDate().getTime()),
					new Timestamp(timeperiod.getEndDate().getTime()),checklistId);
			doughnutChartModel = setIntoDoughnutChartModel(lastQuaterMonthPlannings, 2, timeperiod.getTimeperiod());
			listOfDoughnutChartModel.add(doughnutChartModel);
		}

		if (!listOfAreas.isEmpty()) {
			for (Area area : listOfAreas) {
				listOfFacilityNId.add(area.getAreaNId());
			}
			currentMonthPlannings = planningRepository.findByFacilityAreaNIdInAndPlanDateBetweenAndIsLiveIsTrue(
					listOfFacilityNId,
					new Timestamp(new SimpleDateFormat("yyyy-MM-dd").parse(simpleDateFormat.format(curentMonthFirstDay)).getTime()),
					new Timestamp(new SimpleDateFormat("yyyy-MM-dd").parse(simpleDateFormat.format(curentMonthLastDay)).getTime()),checklistId);

			doughnutChartModel = setIntoDoughnutChartModel(currentMonthPlannings, 1,
					new SimpleDateFormat("MMM yyyy").format(calendar1.getTime()));
			listOfDoughnutChartModel.add(doughnutChartModel);
			lastQuaterMonthPlannings = planningRepository.findByFacilityAreaNIdInAndPlanDateBetweenAndIsLiveIsTrue(
					listOfFacilityNId, new Timestamp(timeperiod.getStartDate().getTime()),
					new Timestamp(timeperiod.getEndDate().getTime()),checklistId);
			doughnutChartModel = setIntoDoughnutChartModel(lastQuaterMonthPlannings, 2, timeperiod.getTimeperiod());
			listOfDoughnutChartModel.add(doughnutChartModel);

		}

		return listOfDoughnutChartModel;
	}

	private DoughnutChartModel setIntoDoughnutChartModel(List<Object[]> currentMonthPlannings, int i, String timeperiod) {
		DoughnutChartModel doughnutChartModel = new DoughnutChartModel();
		doughnutChartModel.setKey(i);
        doughnutChartModel.setTimeperiod(timeperiod);
		if (!currentMonthPlannings.isEmpty()) {
			//for (Object[] objects : currentMonthPlannings) {
			int numerator = ((BigInteger) currentMonthPlannings.get(0)[1]).intValue();
			int denominator = ((BigInteger) currentMonthPlannings.get(0)[0]).intValue();
				doughnutChartModel.setNumerator(numerator);
				doughnutChartModel.setDenominator(denominator);
				
				doughnutChartModel.setPercentageValue(denominator == 0 ? null : (numerator == 0 ? 0 : (numerator* 100)/denominator));
			//}
		}
		return doughnutChartModel;
	}

	/**
	 * To get Top 5 record (from faility_data & community_data) of last Visit irrespective of planned & visit
	 */
	@Override
	public List<ValueObject> getLastVisitData(int facilityId, int checkListId) {
		List<ValueObject> valueObjects = new ArrayList<>();
		
		ValueObject valueObject = null;

		if (checkListId == Integer
				.parseInt(messages.getMessage(Constants.Mobile.FORM_TYPE_FACILITY_CHECKLIST, null, null))) {
			List<FacilityData> listOfFacilityData = facilityDataRepository
					.findTop5ByAreaAreaNIdOrderByC7Desc(facilityId);
			for (FacilityData facilityData : listOfFacilityData) {
				valueObject = new ValueObject();
				valueObject.setKey(facilityData.getArea().getAreaNId());
				valueObject.setValue(sdf.format(facilityData.getC7()));
				valueObject.setDescription(facilityData.getUser().getFirstName()
						+ (facilityData.getUser().getMiddleName() == null ? " "
								: " " + facilityData.getUser().getMiddleName() + " ")
						+ facilityData.getUser().getLastName());
				valueObjects.add(valueObject);
			}

		} else if (checkListId == Integer
				.parseInt(messages.getMessage(Constants.Mobile.FORM_TYPE_COMMUNITY_CHECKLIST, null, null))) {
			List<CommunityData> listOfCommunityData = communityDataRepository.findTop5ByAreaAreaNIdOrderByDateDesc(facilityId);
			for (CommunityData communityData : listOfCommunityData) {
				valueObject = new ValueObject();
				valueObject.setKey(communityData.getArea().getAreaNId());
				valueObject.setValue(sdf.format(communityData.getDate()));
				valueObject.setDescription(communityData.getUser().getFirstName()
						+ (communityData.getUser().getMiddleName() == null ? " "
								: " " + communityData.getUser().getMiddleName() + " ")
						+ communityData.getUser().getLastName());
				valueObjects.add(valueObject);
			}
		}

		return valueObjects;
	}
	 //SimpleDateFormat sdfr = new SimpleDateFormat("yyyy-MM-dd");
	
	@Override
	public List<DoughnutChartModel> getTrendChartData(Integer checklistId)
			throws ParseException {

		List<DoughnutChartModel> listOfDoughnutChartModel = new ArrayList<>();
		EssUserModel essUserModel = userService.getUserDetails();
		List<Timeperiod> listOfTimePeriods = timeperiodRepository.findTop12ByPeriodicityOrderByTimeperiodIdAsc(messages.getMessage(Constants.Web.MONTHLY_PERIODICITY, null, null));
		Collections.reverse(listOfTimePeriods);
		
		List<Area> listOfAreas = new ArrayList<>();
		List<Integer> listOfFacilityNId = new ArrayList<>();
		List<Planning> listOfPlanning = new ArrayList<>();
		
		if(essUserModel.getUserLevel()==8){
			listOfAreas.add(areaRepository.findByAreaNId(essUserModel.getFacilityId()));
		}else if (essUserModel.getUserLevel()==5) {
			listOfAreas = areaRepository.findByAreaParentId(essUserModel.getBlockId());
		} else if (essUserModel.getUserLevel()==4) {
			listOfAreas = areaRepository.findByAreaParentIdAreaParentId(essUserModel.getDistrictId());
		} else if (essUserModel.getUserLevel()==2) {
			listOfAreas = areaRepository.findByAreaParentIdAreaParentIdAreaParentId(essUserModel.getStateId());
		} else if(essUserModel.getUserLevel()==1) {
			for (Timeperiod timePeriod : listOfTimePeriods) {
				listOfPlanning = planningRepository.findByPlanDateAndIsLiveIsTrue(
						new Timestamp(timePeriod.getStartDate().getTime()),
						new Timestamp(timePeriod.getEndDate().getTime()), checklistId);

				DoughnutChartModel doughnutChartModel = setValueForTrendChart(listOfPlanning, timePeriod);
				listOfDoughnutChartModel.add(doughnutChartModel);
			}

		}

		if (!listOfAreas.isEmpty()) {
			for (Area area : listOfAreas) {
				listOfFacilityNId.add(area.getAreaNId());
			}
			for (Timeperiod timePeriod : listOfTimePeriods) {

				listOfPlanning = planningRepository.findByFacilityAreaNIdAndPlanDateBetweenAndIsLiveIsTrue(
						listOfFacilityNId, new Timestamp(timePeriod.getStartDate().getTime()),
						new Timestamp(timePeriod.getEndDate().getTime()), checklistId);
				DoughnutChartModel doughnutChartModel = setValueForTrendChart(listOfPlanning, timePeriod);
				listOfDoughnutChartModel.add(doughnutChartModel);
			}
		}
		return listOfDoughnutChartModel;

	}

	@Override
	public List<TimePeriodModel> getAllTimePeriod() {
	List<TimePeriodModel> listOfTimePeriodModel = new ArrayList<>();
	List<Timeperiod> listOfTimePeriod = timeperiodRepository.findByPeriodicityOrderByTimeperiodIdDesc(messages.getMessage(Constants.Web.MONTHLY_PERIODICITY, null, null));
	Collections.reverse(listOfTimePeriod);
	for (Timeperiod timeperiod : listOfTimePeriod) {
		TimePeriodModel timePeriodModel = new TimePeriodModel();
		timePeriodModel.setEndDate(simpleDateFormat.format(timeperiod.getEndDate()));
		timePeriodModel.setPeriodicity(timeperiod.getPeriodicity());
		timePeriodModel.setStartDate(simpleDateFormat.format(timeperiod.getStartDate()));
		timePeriodModel.setTimePeriod(timeperiod.getTimeperiod());
		timePeriodModel.setTimePeriodId(timeperiod.getTimeperiodId());
		listOfTimePeriodModel.add(timePeriodModel);	
	}
		return listOfTimePeriodModel;
	}

	private DoughnutChartModel setValueForTrendChart(List<Planning> listOfPlanning, Timeperiod timePeriod) {

		DoughnutChartModel doughnutChartModel = new DoughnutChartModel();
		int visitcount = 0;
		for (Planning planning : listOfPlanning) {
			if (planning.getVisitedDate() != null)
				visitcount++;

		}
		doughnutChartModel.setTimeperiod(timePeriod.getTimeperiod());
		doughnutChartModel.setDenominator(listOfPlanning.size());
		doughnutChartModel.setNumerator(visitcount);
		doughnutChartModel.setPercentageValue(listOfPlanning.size() == 0 ? null
				: visitcount == 0 ? 0 : visitcount * 100 / listOfPlanning.size());
		
		return doughnutChartModel;
	}

	@Override
	public Boolean checkPlanavailablity(Integer facilityId, Integer checklistId, String plannedDate) throws ParseException {
		return (planningRepository.findByFacilityAreaNIdAndCheckListTypeIdAndPlanDateAndIsLiveTrue(facilityId,
				checklistId, new Timestamp(sdf.parse(plannedDate).getTime())).isEmpty());
	}

}
