package org.sdrc.ess.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.ServletContext;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.sdrc.ess.domain.Area;
import org.sdrc.ess.domain.CommunityData;
import org.sdrc.ess.domain.DesignationAreaOrganizationRoleMapping;
import org.sdrc.ess.domain.EssUser;
import org.sdrc.ess.domain.FacilityData;
import org.sdrc.ess.domain.JobStatus;
import org.sdrc.ess.domain.Organization;
import org.sdrc.ess.domain.Planning;
import org.sdrc.ess.domain.PlanningReport;
import org.sdrc.ess.domain.Preodicity;
import org.sdrc.ess.domain.Timeperiod;
import org.sdrc.ess.domain.TypeDetail;
import org.sdrc.ess.domain.Unplanned;
import org.sdrc.ess.domain.UserAreaMapping;
import org.sdrc.ess.domain.UtTimeperiod;
import org.sdrc.ess.model.mobile.MailModel;
import org.sdrc.ess.model.web.ActualvsPlannedReportModel;
import org.sdrc.ess.model.web.ActualvsPlannedReportTimeperiodModel;
import org.sdrc.ess.model.web.EssUserModel;
import org.sdrc.ess.model.web.PlanningReportModel;
import org.sdrc.ess.model.web.SubmissionWiseDesignationReportModel;
import org.sdrc.ess.model.web.TimePeriodModel;
import org.sdrc.ess.model.web.UnSupervisedModel;
import org.sdrc.ess.repository.AreaRepository;
import org.sdrc.ess.repository.CommunityDataRepository;
import org.sdrc.ess.repository.DesignationAreaOrganizationRoleMappingRepository;
import org.sdrc.ess.repository.FacilityDataRepository;
import org.sdrc.ess.repository.JobStatusRepository;
import org.sdrc.ess.repository.OrganizationRepository;
import org.sdrc.ess.repository.PlanningReportRepository;
import org.sdrc.ess.repository.PlanningRepository;
import org.sdrc.ess.repository.TimeperiodRepository;
import org.sdrc.ess.repository.TypeDetailRepository;
import org.sdrc.ess.repository.UnplannedRepository;
import org.sdrc.ess.repository.UserAreaMappingRepository;
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
 * @author Debiprasad Parida(debiprasad@sdrc.co.in) Created on 09-10-2017
 */

@Service
public class ReportServiceImpl implements ReportService {

	@Autowired
	PlanningReportRepository planningReportRepository;

	@Autowired
	PlanningRepository planningRepository;

	@Autowired
	UnplannedRepository unplannedRepository;

	@Autowired
	AreaRepository areaRepository;

	@Autowired
	MailService mailService;

	@Autowired
	UserService userService;

	@Autowired
	TimeperiodRepository timeperiodRepository;

	@Autowired
	private ResourceBundleMessageSource messages;

	@Autowired
	private JobStatusRepository jobStatusRepository;

	@Autowired
	private UtIndicatorEnRepository utIndicatorEnRepository;

	@Autowired
	UtIndicatorEnRepository2 utIndicatorEnRepository2;

	@Autowired
	private ServletContext context;

	@Autowired
	TypeDetailRepository typeDetailRepository;

	@Autowired
	OrganizationRepository organizationRepository;
	
	@Autowired
	FacilityDataRepository facilityDataRepository;
	
	@Autowired
	CommunityDataRepository  communityDataRepository;
	
	@Autowired
	UserAreaMappingRepository userAreaMappingRepository;
	
	@Autowired
	DesignationAreaOrganizationRoleMappingRepository designationAreaOrganizationRoleMappingRepository;
	
	@Autowired
	private UtTimeperiodRepository utTimeperiodRepository;
	
	@Autowired
	private StateManager stateManager;
	


	/**
	 * This method will call daily 00:13 retrive data from planning table,unplanned table between last submission
	 * dateTime to current & insert into planning report
	 */
	@Transactional
	@Override
	public String saveplannedVsActual() throws Exception {
		JobStatus jobStatus = new JobStatus();
		try {
			Timestamp startDate = new Timestamp(System.currentTimeMillis());
			jobStatus.setStartDate(startDate);
			jobStatus.setJobType(messages.getMessage(Constants.Web.JOBSTATUS_DAILY_JOBTYPE, null, null));
			jobStatus.setJobName(messages.getMessage(Constants.Web.JOBSTATUS_PLANNINGREPORT_JOBNAME, null, null));

			Map<Integer, String> areaIdNameMap = new HashMap<>();
			Map<Integer, Integer> areaIdParentIdMap = new HashMap<>();
			List<Area> areaList = areaRepository.findAll();
			areaList.forEach(area1 -> areaIdNameMap.put(area1.getAreaNId(), area1.getName()));
			areaList.forEach(area2 -> areaIdParentIdMap.put(area2.getAreaNId(), area2.getParentAreaId()));
			JobStatus jobsatus = jobStatusRepository.findTop1StartDateIsNotNullAndEndDateIsNotNullAndJobNameAndStatusAndJobType(messages.getMessage(Constants.Web.JOBSTATUS_PLANNINGREPORT_JOBNAME, null, null), messages.getMessage(Constants.Web.JOBSTATUS_STATUS_SUCCESS, null, null), messages.getMessage(Constants.Web.JOBSTATUS_DAILY_JOBTYPE, null, null));

			List<Planning> listOfPlanning = new ArrayList<>();
			List<Unplanned> listOfUnplanned = new ArrayList<>();

			if (jobsatus != null) {
				listOfPlanning = planningRepository.findByUpdatedDateBetweenAndIsLiveTrue(jobsatus.getEndDate(), startDate);
				listOfUnplanned = unplannedRepository.findByCreatedDateBetween(jobsatus.getEndDate(), startDate);
			}
			List<PlanningReport> listOfPlanningReport = new ArrayList<>();
			Integer facilityTypeIdForDH=Integer
					.parseInt(messages.getMessage(Constants.Web.FACILITY_TYPE_ID_DH, null, null));
			for (Planning planning : listOfPlanning) {

				PlanningReport planningReport = new PlanningReport();

				planningReport.setBlockId(planning.getFacility().getFacilityType().getId()!= facilityTypeIdForDH ? planning.getFacility().getParentAreaId() : null );
				planningReport.setBlockName(planning.getFacility().getFacilityType().getId()!= facilityTypeIdForDH ? areaIdNameMap.get(planning.getFacility().getParentAreaId()) : null );
				planningReport.setChecklistId(planning.getCheckListType().getId());
				planningReport.setDesignationName(planning.getEssUser().getDesignationAreaOrganizationRoleMapping().getDesignation().getName());
				planningReport.setDistrictId(planning.getFacility().getFacilityType().getId()!= facilityTypeIdForDH ? areaIdParentIdMap.get(planning.getFacility().getParentAreaId()) : planning.getFacility().getParentAreaId() );
				planningReport.setDistrictName(planning.getFacility().getFacilityType().getId()!= facilityTypeIdForDH ? areaIdNameMap.get(areaIdParentIdMap.get(planning.getFacility().getParentAreaId())) : areaIdNameMap.get(planning.getFacility().getParentAreaId()) );
				planningReport.setFacilityId(planning.getFacility().getAreaNId());
				planningReport.setFacilityName(areaIdNameMap.get(planning.getFacility().getAreaNId()));
				planningReport.setFacilityTypeId(planning.getFacility().getFacilityType().getId());
				planningReport.setFacilityTypeName(planning.getFacility().getFacilityType().getName());
				planningReport.setOrganization_Name(planning.getEssUser().getDesignationAreaOrganizationRoleMapping().getOrganization().getOrganizationName());
				planningReport.setPlannedDate(planning.getPlanDate());
				planningReport.setStateId(planning.getFacility().getFacilityType().getId()!= facilityTypeIdForDH ? areaIdParentIdMap.get(areaIdParentIdMap.get(planning.getFacility().getParentAreaId())): areaIdParentIdMap.get(planning.getFacility().getParentAreaId()) );
				planningReport.setStateName(planning.getFacility().getFacilityType().getId()!= facilityTypeIdForDH ? areaIdNameMap.get(areaIdParentIdMap.get(areaIdParentIdMap.get(planning.getFacility().getParentAreaId()))) : areaIdNameMap.get(areaIdParentIdMap.get(planning.getFacility().getParentAreaId())) );
				planningReport.setSubmissionDate(new Timestamp(System.currentTimeMillis()));
				planningReport.setUserName(planning.getEssUser().getFirstName() + (planning.getEssUser().getMiddleName() == null ? " " : " " + planning.getEssUser().getMiddleName() + " ") + planning.getEssUser().getLastName());
				planningReport.setVisitDate(planning.getVisitedDate());

				listOfPlanningReport.add(planningReport);

			}
			for (Unplanned unplanned : listOfUnplanned) {

				PlanningReport planningReport = new PlanningReport();
				planningReport.setBlockId(unplanned.getFacility().getFacilityType().getId()!= facilityTypeIdForDH ? unplanned.getFacility().getParentAreaId() : null);
				planningReport.setBlockName(unplanned.getFacility().getFacilityType().getId()!= facilityTypeIdForDH ? areaIdNameMap.get(unplanned.getFacility().getParentAreaId()) : null);
				planningReport.setChecklistId(unplanned.getCheckListType().getId());
				planningReport.setDesignationName(unplanned.getEssUser().getDesignationAreaOrganizationRoleMapping().getDesignation().getName());
				planningReport.setDistrictId(unplanned.getFacility().getFacilityType().getId()!= facilityTypeIdForDH ? areaIdParentIdMap.get(unplanned.getFacility().getParentAreaId()) : unplanned.getFacility().getParentAreaId() );
				planningReport.setDistrictName(unplanned.getFacility().getFacilityType().getId()!= facilityTypeIdForDH ? areaIdNameMap.get(areaIdParentIdMap.get(unplanned.getFacility().getParentAreaId())) : areaIdNameMap.get(unplanned.getFacility().getParentAreaId()) );
				planningReport.setFacilityId(unplanned.getFacility().getAreaNId());
				planningReport.setFacilityName(areaIdNameMap.get(unplanned.getFacility().getAreaNId()));
				planningReport.setFacilityTypeId(unplanned.getFacility().getFacilityType().getId());
				planningReport.setFacilityTypeName(unplanned.getFacility().getFacilityType().getName());
				planningReport.setOrganization_Name(unplanned.getEssUser().getDesignationAreaOrganizationRoleMapping().getOrganization().getOrganizationName());
				planningReport.setStateId(unplanned.getFacility().getFacilityType().getId()!= facilityTypeIdForDH ? areaIdParentIdMap.get(areaIdParentIdMap.get(unplanned.getFacility().getParentAreaId())): areaIdParentIdMap.get(unplanned.getFacility().getParentAreaId()) );
				planningReport.setStateName(unplanned.getFacility().getFacilityType().getId()!= facilityTypeIdForDH ? areaIdNameMap.get(areaIdParentIdMap.get(areaIdParentIdMap.get(unplanned.getFacility().getParentAreaId()))) : areaIdNameMap.get(areaIdParentIdMap.get(unplanned.getFacility().getParentAreaId())) );
				planningReport.setSubmissionDate(new Timestamp(System.currentTimeMillis()));
				planningReport.setUserName(unplanned.getEssUser().getFirstName() + (unplanned.getEssUser().getMiddleName() == null ? " " : " " + unplanned.getEssUser().getMiddleName() + " ") + unplanned.getEssUser().getLastName());
				planningReport.setVisitDate(unplanned.getVisitedDate());
				listOfPlanningReport.add(planningReport);

			}
			if (!listOfPlanningReport.isEmpty())
				planningReportRepository.save(listOfPlanningReport);

			jobStatus.setStatus(messages.getMessage(Constants.Web.JOBSTATUS_STATUS_SUCCESS, null, null));
			jobStatus.setEndDate(new Timestamp(System.currentTimeMillis()));
			jobStatusRepository.save(jobStatus);

			return "success";

		} catch (Exception e) {
			jobStatus.setStatus(messages.getMessage(Constants.Web.JOBSTATUS_STATUS_FAIL, null, null));
			jobStatusRepository.save(jobStatus);

			MailModel mailmodel = new MailModel();
			mailmodel.setToEmailIds(Arrays.asList("ess@sdrc.co.in"));
			mailmodel.setFromUserName("Ess Mantainance");
			mailmodel.setToUserName("Dear Team");
			mailmodel.setSubject("eSS:Report Job Failed");
			mailmodel.setMessage("<div style='margin-left:30px;'><b>Daily report job failed due to:</b><p>" + e.toString() + "</p></div>");
			mailService.sendMail(mailmodel);
			return "Fail";
		}

	}

	private SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
	private SimpleDateFormat sdfr = new SimpleDateFormat("dd-MM-yyyy HH:MM:ss");

	/*
	 * Get all actual vs. planning report user level wise in case of Country level User can select any state &
	 * corresponding district incase of state level User can select district only
	 */
	@Override
	public ActualvsPlannedReportTimeperiodModel createActualvsPlannedReport(Integer checklistId, Integer districtId, Integer stateId, Integer startDateId, Integer endDateId,Integer blockId) throws Exception {

		EssUserModel essUserModel = userService.getUserDetails();

		List<Area> listOfAreas = new ArrayList<>();
		List<Integer> listOfFacilityNId = new ArrayList<>();
		List<ActualvsPlannedReportModel> actualvsPlannedReportModels = new ArrayList<>();
		List<TimePeriodModel> listOftimeperiodModel = new ArrayList<>();
		
        // Code Edited By Sourav Keshari Nath ***************/
		if (essUserModel.getUserLevel()==8) {
			listOfAreas.add(areaRepository.findByAreaNId(essUserModel.getFacilityId()));
		}else{
			if(blockId==0){
				listOfAreas = areaRepository.findByAreaParentIdAreaParentId(districtId);
			}else{
				listOfAreas = areaRepository.findByAreaParentId(blockId);
			}
		}
		// Code Ended ***************/
		
		List<Timeperiod> listOfTimePeriods = timeperiodRepository.findByTimeperiodIdBetweenAndPeriodicityOrderByTimeperiodIdAsc(startDateId, endDateId, messages.getMessage(Constants.Web.MONTHLY_PERIODICITY, null, null));

		if (!listOfAreas.isEmpty()) {
			for (Area area : listOfAreas) {
				listOfFacilityNId.add(area.getAreaNId());
			}
			Map<Integer, String> areaIdNameMap = new HashMap<>();
			Map<Integer, Integer> areaIdParentIdMap = new HashMap<>();
			List<Area> areaList = areaRepository.findAll();
			areaList.forEach(area1 -> areaIdNameMap.put(area1.getAreaNId(), area1.getName()));
			areaList.forEach(area2 -> areaIdParentIdMap.put(area2.getAreaNId(), area2.getParentAreaId()));
			
			Map<String, ActualvsPlannedReportModel> actualvsPlannedReportModelMap = new HashMap<>();

			for (Timeperiod timePeriod : listOfTimePeriods) {

				TimePeriodModel timePeriodModel = new TimePeriodModel();
				timePeriodModel.setEndDate(sdf.format(timePeriod.getEndDate()));
				timePeriodModel.setPeriodicity(timePeriod.getPeriodicity());
				timePeriodModel.setStartDate(sdf.format(timePeriod.getStartDate()));
				timePeriodModel.setTimePeriod(timePeriod.getTimeperiod());
				timePeriodModel.setTimePeriodId(timePeriod.getTimeperiodId());
				listOftimeperiodModel.add(timePeriodModel);
				
				

				List<Object[]> listOfPlanningReport2 = planningReportRepository.findByFacilityIdInAndVisitDateBetweenAndChecklistId(listOfFacilityNId, new Timestamp(timePeriod.getStartDate().getTime()), new Timestamp(timePeriod.getEndDate().getTime()), checklistId);
				
				List<Planning> listOfPlanningMain = planningRepository.
						findByFacilityAreaNIdAndPlanDateBetweenAndIsLiveIsTrue(listOfFacilityNId,  new Timestamp(timePeriod.getStartDate().getTime()), new Timestamp(timePeriod.getEndDate().getTime()), checklistId);
				
				for (Planning planning : listOfPlanningMain) {

					Map<String, Integer> plannedVisitMap = new HashMap<>();
					Map<String, Integer> unplannedVisitMap = new HashMap<>();
					Map<String, Integer> toalplannedUnplanned = new HashMap<>();
					Map<String, Integer> totalPlanned = new HashMap<>();
					
					ActualvsPlannedReportModel actualvsPlannedReportModel = null;
					if (actualvsPlannedReportModelMap.containsKey(areaIdNameMap.get(planning.getFacility().getParentAreaId())+ "_" + planning.getFacility().getName() + "_" + planning.getFacility().getFacilityType().getName())) {

						actualvsPlannedReportModel = actualvsPlannedReportModelMap.get(areaIdNameMap.get(planning.getFacility().getParentAreaId())+ "_" + planning.getFacility().getName() + "_" + planning.getFacility().getFacilityType().getName());
						Map<String, Integer> plannedVisitMap2 = actualvsPlannedReportModel.getPlannedVisit() == null ? new HashMap<>() : actualvsPlannedReportModel.getPlannedVisit();
						Map<String, Integer> unPlannedVisitMap2 = actualvsPlannedReportModel.getUnplannedVisit() == null ? new HashMap<>() : actualvsPlannedReportModel.getUnplannedVisit();
						Map<String, Integer> toalplannedUnplanned2 = actualvsPlannedReportModel.getTotal() == null ? new HashMap<>() : actualvsPlannedReportModel.getTotal();
						Map<String, Integer> totalPlanned2 = actualvsPlannedReportModel.getVisitPlanned() == null ? new HashMap<>() : actualvsPlannedReportModel.getVisitPlanned();
						totalPlanned2.put(timePeriod.getTimeperiod(),!totalPlanned2.containsKey(timePeriod.getTimeperiod()) ? 1	: totalPlanned2.get(timePeriod.getTimeperiod()) + 1);
						
						actualvsPlannedReportModel.setPlannedVisit(plannedVisitMap2);
						actualvsPlannedReportModel.setUnplannedVisit(unPlannedVisitMap2);
						actualvsPlannedReportModel.setTotal(toalplannedUnplanned2);
						actualvsPlannedReportModel.setVisitPlanned(totalPlanned2);
						

					} else {
						actualvsPlannedReportModel = new ActualvsPlannedReportModel();
						actualvsPlannedReportModel.setBlockName(areaIdNameMap.get(planning.getFacility().getParentAreaId()));
						actualvsPlannedReportModel.setFacilityName(planning.getFacility().getName());
						actualvsPlannedReportModel.setFacilityType(planning.getFacility().getFacilityType().getName());
						actualvsPlannedReportModel.setBlockId(planning.getFacility().getParentAreaId());
						actualvsPlannedReportModel.setFacilityId(planning.getFacility().getAreaNId());
						actualvsPlannedReportModel.setFacilityTypeId(planning.getFacility().getFacilityType().getId());
						totalPlanned.put(timePeriod.getTimeperiod(),1);
						actualvsPlannedReportModel.setPlannedVisit(plannedVisitMap);
						actualvsPlannedReportModel.setUnplannedVisit(unplannedVisitMap);
						actualvsPlannedReportModel.setTotal(toalplannedUnplanned);
						actualvsPlannedReportModel.setVisitPlanned(totalPlanned);
						actualvsPlannedReportModelMap.put(areaIdNameMap.get(planning.getFacility().getParentAreaId())+ "_" + planning.getFacility().getName() + "_" + planning.getFacility().getFacilityType().getName(), actualvsPlannedReportModel);
					}
				
					
				}
				for (Object[] planningReport : listOfPlanningReport2) {
					Map<String, Integer> plannedVisitMap = new HashMap<>();
					Map<String, Integer> unplannedVisitMap = new HashMap<>();
					Map<String, Integer> toalplannedUnplanned = new HashMap<>();
					Map<String, Integer> totalPlanned = new HashMap<>();
					
					ActualvsPlannedReportModel actualvsPlannedReportModel = null;
					if (actualvsPlannedReportModelMap.containsKey((planningReport[0]==null? planningReport[9].toString():planningReport[0].toString()) + "_" + planningReport[1].toString() + "_" + planningReport[2].toString())) {

						actualvsPlannedReportModel = actualvsPlannedReportModelMap.get((planningReport[0]==null? planningReport[9].toString():planningReport[0].toString()) + "_" + planningReport[1].toString() + "_" + planningReport[2].toString());
						Map<String, Integer> plannedVisitMap2 = actualvsPlannedReportModel.getPlannedVisit() == null ? new HashMap<>() : actualvsPlannedReportModel.getPlannedVisit();
						Map<String, Integer> unPlannedVisitMap2 = actualvsPlannedReportModel.getUnplannedVisit() == null ? new HashMap<>() : actualvsPlannedReportModel.getUnplannedVisit();
						Map<String, Integer> toalplannedUnplanned2 = actualvsPlannedReportModel.getTotal() == null ? new HashMap<>() : actualvsPlannedReportModel.getTotal();
						//Map<String, Integer> totalPlanned2 = actualvsPlannedReportModel.getVisitPlanned() == null ? new HashMap<>() : actualvsPlannedReportModel.getVisitPlanned();
						
						/*List<Planning> listOfPlanning = planningRepository.
								findByFacilityAreaNIdAndPlanDateBetweenAndIsLiveIsTrue(Arrays.asList(Integer.parseInt(planningReport[4].toString())),  new Timestamp(timePeriod.getStartDate().getTime()), new Timestamp(timePeriod.getEndDate().getTime()), checklistId);*/
						
						plannedVisitMap2.put(timePeriod.getTimeperiod(), Integer.parseInt(planningReport[6].toString()));
						unPlannedVisitMap2.put(timePeriod.getTimeperiod(), Integer.parseInt(planningReport[7].toString()));
						toalplannedUnplanned2.put(timePeriod.getTimeperiod(), Integer.parseInt(planningReport[8].toString()));
						//totalPlanned2.put(timePeriod.getTimeperiod(),listOfPlanning.size());
						
						actualvsPlannedReportModel.setPlannedVisit(plannedVisitMap2);
						actualvsPlannedReportModel.setUnplannedVisit(unPlannedVisitMap2);
						actualvsPlannedReportModel.setTotal(toalplannedUnplanned2);
						//actualvsPlannedReportModel.setVisitPlanned(totalPlanned2);
						

					} else {
						actualvsPlannedReportModel = new ActualvsPlannedReportModel();
						actualvsPlannedReportModel.setBlockName(planningReport[0]==null? planningReport[9].toString() :planningReport[0].toString());
						actualvsPlannedReportModel.setFacilityName(planningReport[1].toString());
						actualvsPlannedReportModel.setFacilityType(planningReport[2].toString());
						actualvsPlannedReportModel.setBlockId(planningReport[3]==null ?null :Integer.parseInt(planningReport[3].toString()));
						actualvsPlannedReportModel.setFacilityId(Integer.parseInt(planningReport[4].toString()));
						actualvsPlannedReportModel.setFacilityTypeId(Integer.parseInt(planningReport[5].toString()));
						plannedVisitMap.put(timePeriod.getTimeperiod(), Integer.parseInt(planningReport[6].toString()));
						unplannedVisitMap.put(timePeriod.getTimeperiod(), Integer.parseInt(planningReport[7].toString()));
						toalplannedUnplanned.put(timePeriod.getTimeperiod(), Integer.parseInt(planningReport[8].toString()));
						/*List<Planning> listOfPlanning = planningRepository.
								findByFacilityAreaNIdAndPlanDateBetweenAndIsLiveIsTrue(Arrays.asList(Integer.parseInt(planningReport[4].toString())),  new Timestamp(timePeriod.getStartDate().getTime()), new Timestamp(timePeriod.getEndDate().getTime()), checklistId);
						totalPlanned.put(timePeriod.getTimeperiod(),listOfPlanning.size());*/
						
						actualvsPlannedReportModel.setPlannedVisit(plannedVisitMap);
						actualvsPlannedReportModel.setUnplannedVisit(unplannedVisitMap);
						actualvsPlannedReportModel.setTotal(toalplannedUnplanned);
						//actualvsPlannedReportModel.setVisitPlanned(totalPlanned);
						actualvsPlannedReportModelMap.put((planningReport[0]==null? planningReport[9].toString():planningReport[0].toString()) + "_" + planningReport[1].toString() + "_" + planningReport[2].toString(), actualvsPlannedReportModel);
					}
				}
			}

			for (Entry<String, ActualvsPlannedReportModel> entry : actualvsPlannedReportModelMap.entrySet()) {
				actualvsPlannedReportModels.add(entry.getValue());
			}
		}

		ActualvsPlannedReportTimeperiodModel actualvsPlannedReportTimeperiodModel = new ActualvsPlannedReportTimeperiodModel();
		JobStatus jobsatus = jobStatusRepository.findTop1StartDateIsNotNullAndEndDateIsNotNullAndJobNameAndStatusAndJobType(messages.getMessage(Constants.Web.JOBSTATUS_PLANNINGREPORT_JOBNAME, null, null), messages.getMessage(Constants.Web.JOBSTATUS_STATUS_SUCCESS, null, null), messages.getMessage(Constants.Web.JOBSTATUS_DAILY_JOBTYPE, null, null));
		actualvsPlannedReportTimeperiodModel.setLastUpdateOn(sdfr.format(jobsatus.getEndDate()));
		actualvsPlannedReportTimeperiodModel.setActualvsPlannedReportModel(actualvsPlannedReportModels);
		actualvsPlannedReportTimeperiodModel.setTimeperiodModel(listOftimeperiodModel);

		return actualvsPlannedReportTimeperiodModel;
	}

	/*
	 * geting plannedVisit data according to single month
	 */
	@Override
	public List<PlanningReportModel> getPlannedVisitData(Integer facilityId, Integer facilityTypeId, Integer checklistId, Integer timeperiodId) {

		List<PlanningReportModel> listOfPlanningReportModel = new ArrayList<>();

		Timeperiod timeperiod = timeperiodRepository.findByTimeperiodId(timeperiodId);

		List<PlanningReport> listOfplanningReports = planningReportRepository.findByFacilityIdAndFacilityTypeIdAndChecklistIdAndVisitDateBetweenAndPlannedDateIsNotNull(facilityId, facilityTypeId, checklistId, new Timestamp(timeperiod.getStartDate().getTime()), new Timestamp(timeperiod.getEndDate().getTime()));

		for (PlanningReport planningReport : listOfplanningReports) {
			PlanningReportModel planningReportModel = setIntoPlanningReportModel(planningReport);
			listOfPlanningReportModel.add(planningReportModel);
		}

		return listOfPlanningReportModel;
	}

	/*
	 * geting unplannedVisit data according to single month
	 */
	@Override
	public List<PlanningReportModel> getUnplannedVisitData(Integer facilityId, Integer facilityTypeId, Integer checklistId, Integer timeperiodId) {

		List<PlanningReportModel> listOfPlanningReportModel = new ArrayList<>();

		Timeperiod timeperiod = timeperiodRepository.findByTimeperiodId(timeperiodId);

		List<PlanningReport> listOfplanningReports = planningReportRepository.findByFacilityIdAndFacilityTypeIdAndChecklistIdAndVisitDateBetweenAndPlannedDateIsNull(facilityId, facilityTypeId, checklistId, new Timestamp(timeperiod.getStartDate().getTime()), new Timestamp(timeperiod.getEndDate().getTime()));

		for (PlanningReport planningReport : listOfplanningReports) {
			PlanningReportModel planningReportModel = setIntoPlanningReportModel(planningReport);
			listOfPlanningReportModel.add(planningReportModel);
		}

		return listOfPlanningReportModel;
	}

	/*
	 * geting plannedVisit & unplannedVisit data according time period between
	 */

	@Override
	public List<PlanningReportModel> getPlannedAndUnplannedVisitData(Integer facilityId, Integer facilityTypeId, Integer checklistId, Integer timeperiodId) {

		List<PlanningReportModel> listOfPlanningReportModel = new ArrayList<>();
		//List<Timeperiod> listOfTimeperiod = timeperiodRepository.findByTimeperiodIdBetweenAndPeriodicityOrderByTimeperiodIdAsc(startDateId, endDateId, messages.getMessage(Constants.Web.MONTHLY_PERIODICITY, null, null));
		Timeperiod timeperiod = timeperiodRepository.findByTimeperiodId(timeperiodId);
		

			List<PlanningReport> listOfplanningReports = planningReportRepository.findByFacilityIdAndFacilityTypeIdAndChecklistIdAndVisitDateBetween(facilityId, facilityTypeId, checklistId, new Timestamp(timeperiod.getStartDate().getTime()), new Timestamp(timeperiod.getEndDate().getTime()));

			for (PlanningReport planningReport : listOfplanningReports) {

				PlanningReportModel planningReportModel = setIntoPlanningReportModel(planningReport);
				listOfPlanningReportModel.add(planningReportModel);
			}

		
		return listOfPlanningReportModel;
	}

	private PlanningReportModel setIntoPlanningReportModel(PlanningReport planningReport) {

		Date date = new Date();
		date.setTime(planningReport.getVisitDate().getTime());
		String visitDate = new SimpleDateFormat("dd-MM-yyyy").format(date);
		PlanningReportModel planningReportModel = new PlanningReportModel();

		planningReportModel.setDesignationName(planningReport.getDesignationName());
		planningReportModel.setOrganizationName(planningReport.getOrganization_Name());

		if (planningReport.getPlannedDate() != null) {
			date.setTime(planningReport.getPlannedDate().getTime());
			String plannedDate = new SimpleDateFormat("dd-MM-yyyy").format(date);
			planningReportModel.setPlannedDate(plannedDate);
		} else
			planningReportModel.setPlannedDate("-");

		planningReportModel.setUserName(planningReport.getUserName());
		planningReportModel.setVisitedDate(visitDate);

		return planningReportModel;
	}

	@Override
	public List<UnSupervisedModel> getUnSupervisedFacilityData(Integer checklistId, String startDateId, String endDateId, 
			Integer districtId, Integer blockId) {
		List<UnSupervisedModel> listOfUnSupervisedModel = new ArrayList<>();
		System.out.println("StartDate:::" + startDateId);
		System.out.println("StartDate:::" + endDateId);
		SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
		SimpleDateFormat sdfDbFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = null;
		try {
			startDate = sdfDbFormat.parse(startDateId);
		} catch (ParseException e1) {
			e1.printStackTrace();
		}
		Date endDate = null;
		try {
			endDate = sdfDbFormat.parse(endDateId);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		// List<Timeperiod> listOfTimeperiod =
		// timeperiodRepository.findByTimeperiodIdBetweenAndPeriodicityOrderByTimeperiodIdAsc(startDateId, endDateId,
		// messages.getMessage(Constants.Web.MONTHLY_PERIODICITY, null, null));
		// for (Timeperiod timeperiod : listOfTimeperiod) {
		
		// code edited by sourav keshari nath
		int blockid,districtid = 0;
//        if(blockId==0){
//        	districtid = districtId;
//        	blockid = 0;
//        }else{
//        	districtid = 0;
//        	blockid = blockId;
//        }
		Integer areaId;
		if(blockId == 0){
			areaId = districtId;
		}else{
			areaId = blockId;
		}
		
		List<Object[]> listOfplanningReports = null;
//		if(checklistId==121){
			listOfplanningReports = planningReportRepository.findByFacilityTypeAndCheckListTypeAndDateBetweenAnd(new Timestamp(startDate.getTime()), new Timestamp(endDate.getTime()), areaId, new java.sql.Date(startDate.getTime()));
//		}else{
//			listOfplanningReports = planningReportRepository.findByCommunityTypeAndCheckListTypeAndDateBetweenAnd(checklistId, new Timestamp(startDate.getTime()), new Timestamp(endDate.getTime()), districtid,blockid, new java.sql.Date(startDate.getTime()));
//		}
		
		for (Object[] arr : listOfplanningReports) {

			String blockName = (String) arr[1];
			String facilityName = (String) arr[0];
			String facilityType = (String) arr[2];
			String date = "-";
			Timestamp lastVisitDate = null;
			if (arr[4] != null) {
				lastVisitDate = (Timestamp) arr[4];
				date = sdf.format(lastVisitDate);
			}
			UnSupervisedModel model = new UnSupervisedModel();
			model.setBlockId(null);
			model.setBlockName(blockName);
			model.setFacilityId(null);
			model.setFacilityName(facilityName);
			model.setFacilityType(facilityType);
			model.setFacilityTypeId(null);
			model.setLastVisitDate(date);
			listOfUnSupervisedModel.add(model);
		}
		// }
		return listOfUnSupervisedModel;
	}

	@Override
	public File generateRawDataExcel(String startDate, String endDate, Integer blockId, Integer districtId, Integer checkListTypeId, Integer facilityTypeId) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		XSSFWorkbook workbook = null;
		File file = null;
		FileInputStream fis = null;
		FileOutputStream outputStream = null;
		File fileWritten = null;
		Area block = null;
		Area district = null;
		StringBuffer colNamesInQuery = new StringBuffer();
		List<String> columnNamesInList = new ArrayList<>();
		// List<String> headerNames = new ArrayList<>();
		List<String> tableName = new ArrayList<>();
		List<String> colNameOfOtherTable = new ArrayList<>();

		Map<Integer, String> organisationMap = new HashMap<>();

		Map<Integer, String> typeDetailMap = new HashMap<>();

		Map<Integer, String> areaMap = new HashMap<>();
		try {
			tableName.add(null);
			colNameOfOtherTable.add(null);
			// More code optimizations will be required if national level is implemented or in multiple states.
			List<Area> areas = areaRepository.findByLevelLessThan(5);
			for (Area area : areas) {
				areaMap.put(area.getAreaNId(), area.getName());
			}

			List<TypeDetail> typeDetails = typeDetailRepository.findAll();

			for (TypeDetail typeDetail : typeDetails) {
				typeDetailMap.put(typeDetail.getId(), typeDetail.getName());
			}
			List<Organization> organisations = organizationRepository.findAll();

			for (Organization organization : organisations) {
				organisationMap.put(organization.getId(), organization.getOrganizationName());
			}

			if (blockId != 0)
				block = areaRepository.findByAreaNId(blockId);
			else
				district = areaRepository.findByAreaNId(districtId);
			String commaSeparedIndicatorColumnNamesAndIndicatorNames = utIndicatorEnRepository.findAllIndicatorColumnNamesByCheckListType(checkListTypeId == 121 ? "FACILITY" : "COMMUNITY");
			System.out.println("Array ::" + commaSeparedIndicatorColumnNamesAndIndicatorNames);
			JSONArray jsonArray = (JSONArray) new JSONParser().parse(commaSeparedIndicatorColumnNamesAndIndicatorNames);

			// add Facility Name Header.
			// headerNames.add("Facility Names,");
			// this key is used to retrieve facility name in sql query
			columnNamesInList.add("name");

			colNamesInQuery = colNamesInQuery.append("facility.name,");

			for (Object object : jsonArray) {
				JSONObject json = (JSONObject) object;
				columnNamesInList.add(json.get("getter_name").toString());
				// headerNames.add(json.get("question_name").toString());
				System.out.println("from_table_name ::" + json.get("from_table_name"));
				tableName.add(String.valueOf(json.get("from_table_name")).equals("null") ? null : (String) json.get("from_table_name").toString());
				colNameOfOtherTable.add(String.valueOf(json.get("col_name_of_other_table")).equals("null") ? null : (String) json.get("col_name_of_other_table").toString());
				colNamesInQuery = colNamesInQuery.append(json.get("getter_name").toString()).append(",");
			}

			System.out.println("Column Names in QUery::" + colNamesInQuery);
			System.out.println("Json Array fetched::" + jsonArray);

			colNamesInQuery = colNamesInQuery.delete(colNamesInQuery.length() - 1, colNamesInQuery.length());

			System.out.println("Column Names generated from string buffer :" + colNamesInQuery);

			String dataRetrived = null;

			if (checkListTypeId == 121) {
				file = new File(context.getRealPath("resources/reports/rawdataFacilityTemplate.xlsx"));
				if (blockId != 0) {
					dataRetrived = utIndicatorEnRepository2.fetchAllValuesOfIndicatorsForFacilityData(colNamesInQuery.toString(), blockId, new java.sql.Timestamp(sdf.parse(startDate).getTime()), new java.sql.Timestamp(sdf.parse(endDate).getTime()), facilityTypeId);
				} else {
					// use district Id to retrieve data
					dataRetrived = utIndicatorEnRepository2.fetchAllValuesOfIndicatorsForFacilityDataForDistrict(colNamesInQuery.toString(), districtId, new java.sql.Timestamp(sdf.parse(startDate).getTime()), new java.sql.Timestamp(sdf.parse(endDate).getTime()), facilityTypeId);

				}
			} else if (checkListTypeId == 122) {
				file = new File(context.getRealPath("resources/reports/rawdataCommunityTemplate.xlsx"));
				if (blockId != 0) {
					dataRetrived = utIndicatorEnRepository2.fetchAllValuesOfIndicatorsForCommunityData(colNamesInQuery.toString(), blockId, new java.sql.Timestamp(sdf.parse(startDate).getTime()), new java.sql.Timestamp(sdf.parse(endDate).getTime()), facilityTypeId);
				} else {
					dataRetrived = utIndicatorEnRepository2.fetchAllValuesOfIndicatorsForCommunityDataForDistrict(colNamesInQuery.toString(), districtId, new java.sql.Timestamp(sdf.parse(startDate).getTime()), new java.sql.Timestamp(sdf.parse(endDate).getTime()), facilityTypeId);

				}
			} else {
				throw new IllegalArgumentException("Invalid checkList Id passed as method argument!");
			}

			fis = new FileInputStream(file);

			workbook = new XSSFWorkbook(fis);

			/* Create HSSFFont object from the workbook */
			Font boldFont = workbook.createFont();
			/* set the weight of the font */
			boldFont.setBoldweight(XSSFFont.BOLDWEIGHT_BOLD);
			/* attach the font to the style created earlier */

			// Top Left alignment
			CellStyle headerStyle = workbook.createCellStyle();
			headerStyle.setAlignment(XSSFCellStyle.ALIGN_LEFT);
			headerStyle.setVerticalAlignment(XSSFCellStyle.VERTICAL_TOP);
			headerStyle.setFont(boldFont);

			headerStyle.setBorderBottom(HSSFCellStyle.BORDER_MEDIUM);
			headerStyle.setBorderTop(HSSFCellStyle.BORDER_MEDIUM);
			headerStyle.setBorderRight(HSSFCellStyle.BORDER_MEDIUM);
			headerStyle.setBorderLeft(HSSFCellStyle.BORDER_MEDIUM);
			headerStyle.setFillForegroundColor((short) 200);
			headerStyle.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);

			XSSFCellStyle bindingCellStyle = workbook.createCellStyle();
			bindingCellStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(165, 165, 165)));
			bindingCellStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
			bindingCellStyle.setBorderTop(XSSFCellStyle.BORDER_THIN);
			bindingCellStyle.setBorderBottom(XSSFCellStyle.BORDER_THIN);
			bindingCellStyle.setBorderLeft(XSSFCellStyle.BORDER_THIN);
			bindingCellStyle.setBorderRight(XSSFCellStyle.BORDER_THIN);
			XSSFCellStyle planeCellStyle = workbook.createCellStyle();
			planeCellStyle.setBorderTop(XSSFCellStyle.BORDER_THIN);
			planeCellStyle.setBorderBottom(XSSFCellStyle.BORDER_THIN);
			planeCellStyle.setBorderLeft(XSSFCellStyle.BORDER_THIN);
			planeCellStyle.setBorderRight(XSSFCellStyle.BORDER_THIN);
			XSSFCellStyle tempstyles = null;

			XSSFSheet sheet = workbook.getSheetAt(0);

			Object[] columnArray = columnNamesInList.toArray();
			System.out.println("Column Names Array Size :" + Arrays.deepToString(columnArray));

			System.out.println("Data Retrievd :::" + dataRetrived);
			if (dataRetrived != null && !dataRetrived.isEmpty()) {
				JSONArray jsonArrayData = (JSONArray) new JSONParser().parse(dataRetrived);

				int rowCount = 4;

				for (Object object : jsonArrayData) {

					tempstyles = (rowCount % 2 == 0 ? planeCellStyle : bindingCellStyle);

					JSONObject json = (JSONObject) object;

					XSSFRow row = sheet.createRow(rowCount++);

					for (int col = 0; col < json.size(); col++) {
						Cell cell = row.createCell(col);

						//System.out.println("Column Index::" + col);
						//System.out.println("Column Name ::" + columnArray[col]);
						//System.out.println("Column Names Array :" + Arrays.deepToString(columnArray));
						//System.out.println("colNameOfOtherTable ::" + colNameOfOtherTable.get(col));

						Object obj = !columnArray[col].toString().equals("facility.facility_type_id_fk as  facility_type_id_fk") ? (Object) json.get(columnArray[col]) : (Object) json.get("facility_type_id_fk");
						//System.out.println("Column Value::" + obj);
						//System.out.println("Json Object Retrieved:" + object);
						//System.out.println("------------------------------------------------------------------\n");
						if (obj != null) {
							if (tableName.get(col) != null) {
								if (tableName.get(col).trim().equals("organization")) {
									cell.setCellValue(organisationMap.getOrDefault(((json.get(columnArray[col]).toString().equals("null") ? null : Integer.parseInt((String) json.get(columnArray[col]).toString()))), ""));
									cell.setCellStyle(tempstyles);
								} else if (tableName.get(col).trim().equals("area") && colNameOfOtherTable.get(col).trim().equals("facility_facility_name")) {
									// facility name can be fetched from area map,but we didnt want to load all
									// facilities into map,due to huge memory graph,so chose to retrieve from sql
									// query.so hard coded 'name' to retrieve from json,
									cell.setCellValue((String) json.get("name"));
									cell.setCellStyle(tempstyles);
								} else if (tableName.get(col).trim().equals("type_detail")) {
									if (columnArray[col].toString().equals("facility.facility_type_id_fk as  facility_type_id_fk")) {
										cell.setCellValue(typeDetailMap.get(Integer.valueOf(obj.toString())));
									} else
										cell.setCellValue(typeDetailMap.getOrDefault(((json.get(columnArray[col]).toString().equals("null") ? null : Integer.parseInt((String) json.get(columnArray[col]).toString()))), ""));
									cell.setCellStyle(tempstyles);
								} else if (tableName.get(col).trim().equals("area")) {
									cell.setCellValue(areaMap.getOrDefault(((json.get(columnArray[col]).toString().equals("null") ? null : Integer.parseInt((String) json.get(columnArray[col]).toString()))), ""));
									cell.setCellStyle(tempstyles);
								} else {
									cell.setCellValue((json.get(columnArray[col]).toString().equals("null") ? null : (String) json.get(columnArray[col]).toString()));
									cell.setCellStyle(tempstyles);
								}
							} else {
								cell.setCellValue((json.get(columnArray[col]).toString().equals("null") ? null : (String) json.get(columnArray[col]).toString()));
								cell.setCellStyle(tempstyles);
							}
						} else {
							cell.setCellValue((String) "");
							cell.setCellStyle(tempstyles);
						}
					}
				}
			}
			else
			{
				return null;
			}
			if (blockId != 0)
				fileWritten = File.createTempFile(block.getName(), ".xlsx");
			else {
				fileWritten = File.createTempFile(district.getName(), ".xlsx");
			}
			outputStream = new FileOutputStream(fileWritten);
			workbook.write(outputStream);

		} catch (IOException e) {
			e.printStackTrace();
			throw new RuntimeException("Unable to generate excel file.", e);
		} catch (ParseException e) {
			throw new RuntimeException("Unable to parse retrieved json.", e);
		} catch (org.json.simple.parser.ParseException e) {
			throw new RuntimeException("Unable to parse retrieved json.", e);
		} finally {
			if (fis != null) {
				try {
					fis.close();
				} catch (IOException e) {
					if (fileWritten.exists())
						fileWritten.delete();
					throw new RuntimeException("Stream couldn't be closed.File cannot be created.", e);
				}
			}
			if (outputStream != null) {
				try {
					outputStream.close();
				} catch (IOException e) {

				}
			}
			if (workbook != null) {
				try {
					workbook.close();
				} catch (IOException e) {
					if (fileWritten.exists())
						fileWritten.delete();
					throw new RuntimeException("IO error occured.File cannot be created.", e);
				}
			}
		}

		return fileWritten;
	}

	private SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	@Override
	public List<TimePeriodModel> getAllTimePeriod() {
		List<TimePeriodModel> listOfTimePeriodModel = new ArrayList<>();
		List<Timeperiod> listOfTimePeriod = timeperiodRepository.findTop6ByPeriodicityOrderByTimeperiodIdDesc(messages.getMessage(Constants.Web.MONTHLY_PERIODICITY, null, null));
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

	@Override
	public List<PlanningReportModel> getPlannedData(Integer facilityId, Integer facilityTypeId, Integer checklistId,
			Integer timeperiodId) {

		List<PlanningReportModel> listOfPlanningReportModel = new ArrayList<>();
		Timeperiod timeperiod = timeperiodRepository.findByTimeperiodId(timeperiodId);

		List<Planning> listOfplanning = planningRepository.findByFacilityAreaNIdAndPlanDateBetweenAndIsLiveIsTrue(
				Arrays.asList(facilityId), new Timestamp(timeperiod.getStartDate().getTime()),
				new Timestamp(timeperiod.getEndDate().getTime()), checklistId);

		for (Planning planning : listOfplanning) {

			Date date = new Date();
			
			PlanningReportModel planningReportModel = new PlanningReportModel();

			planningReportModel.setDesignationName(
					planning.getEssUser().getDesignationAreaOrganizationRoleMapping().getDesignation().getName());
			planningReportModel.setOrganizationName(planning.getEssUser().getDesignationAreaOrganizationRoleMapping()
					.getOrganization().getOrganizationName());

			if (planning.getPlanDate() != null) {
				date.setTime(planning.getPlanDate().getTime());
				String plannedDate = new SimpleDateFormat("dd-MM-yyyy").format(date);
				planningReportModel.setPlannedDate(plannedDate);
			} else
				planningReportModel.setPlannedDate("-");

			planningReportModel
					.setUserName(planning.getEssUser().getFirstName()
							+ (planning.getEssUser().getMiddleName() == null ? " "
									: " " + planning.getEssUser().getMiddleName() + " ")
							+ planning.getEssUser().getLastName());
			if(planning.getVisitedDate()!=null){
				date.setTime(planning.getVisitedDate().getTime());
				String visitDate = new SimpleDateFormat("dd-MM-yyyy").format(date);
				planningReportModel.setVisitedDate(visitDate);
			}else{
				planningReportModel.setVisitedDate("-");
			}
			

			listOfPlanningReportModel.add(planningReportModel);
		}

		return listOfPlanningReportModel;
	}
	private SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
	@Override
	public List<SubmissionWiseDesignationReportModel> getSubmissionWiseReport(Integer levelId, Integer stateId, Integer districtId, Integer blockId,
			Integer organizationId, Integer developmentPartnerId, Integer designationId, Integer operatorId,
			Integer numberOf,String startDate, String endDate) throws Exception {
		
		
		List<Object[]> listOfFacilityData = new ArrayList<>();
		List<Object[]> listOfCommunityData = new ArrayList<>();
		
		/*levelId=1;
		startDate="2017-10-01 00:00:00";
		endDate="2017-10-31 00:00:00";
		operatorId=145;
		numberOf=0;
		//stateId=2;
		organizationId = 0;*/
		
		Map<Integer, String> areaIdNameMap = new HashMap<>();
		Map<Integer, Integer> areaIdParentIdMap = new HashMap<>();
		List<Area> areaList = areaRepository.findAll();
		areaList.forEach(area1 -> areaIdNameMap.put(area1.getAreaNId(), area1.getName()));
		areaList.forEach(area2 -> areaIdParentIdMap.put(area2.getAreaNId(), area2.getParentAreaId()));
		
		String stateName = null;
		String districtName = null;
		String blockName = null;
		
		String facilityData = null;
		String communityData = null;
		  String operatorsymbol = null;
	    switch(operatorId){  
	    case 141:operatorsymbol="<" ;break;  
	    case 142:operatorsymbol=">" ;break;    
	    case 143:operatorsymbol="<=" ;break;  
	    case 144:operatorsymbol=">=" ;break;  
	    case 145:operatorsymbol="=" ;break;  }

		if (levelId == 1) { // Country level
			if (organizationId == 0) { //All organization
				facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, ">"+1, ">"+1, 
						">"+1, ">"+0, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
				communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, ">"+1, ">"+1, 
						">"+1, ">"+0, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
			} else {
				if (organizationId == 5) { //for Development Partner
					if (developmentPartnerId == 0) {
						//(levelId, stateId, districtId, blockId, organizationId, developmentPartnerId, designationId, patern, startDate, endDate)
						facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, ">"+1, ">"+1, 
								">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
						communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, ">"+1, ">"+1, 
								">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
					} else {
						facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, ">"+1, ">"+1, 
								">"+1, "="+organizationId, "and ess.develomentPartner_id_fk="+developmentPartnerId, ">"+0, operatorsymbol+numberOf, startDate, endDate);
						communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, ">"+1, ">"+1, 
								">"+1, "="+organizationId, "and ess.develomentPartner_id_fk="+developmentPartnerId, ">"+0, operatorsymbol+numberOf, startDate, endDate);
					}

				} else {
					if (designationId == 0) {
						facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, ">"+1, ">"+1, 
								">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
						communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, ">"+1, ">"+1, 
								">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
					} else {
						facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, ">"+1, ">"+1, 
								">"+1, "="+organizationId, "", "="+designationId, operatorsymbol+numberOf, startDate, endDate);
						communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, ">"+1, ">"+1, 
								">"+1, "="+organizationId, "", "="+designationId, operatorsymbol+numberOf, startDate, endDate);
					}
				}
			}

		} else if (levelId == 2) { // State level
			if (stateId == 0) {
				if (organizationId == 0) {
					facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, ">"+1, ">"+1, 
							">"+1, ">"+0, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
					communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, ">"+1, ">"+1, 
							">"+1, ">"+0, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
			} else {
				if (organizationId == 5) {
					if (developmentPartnerId == 0) {
						facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, ">"+1, ">"+1, 
								">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
						communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, ">"+1, ">"+1, 
								">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
					} else {
						facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, ">"+1, ">"+1, 
								">"+1, "="+organizationId, "and ess.develomentPartner_id_fk="+developmentPartnerId, ">"+0, operatorsymbol+numberOf, startDate, endDate);
						communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, ">"+1, ">"+1, 
								">"+1, "="+organizationId, "and ess.develomentPartner_id_fk="+developmentPartnerId, ">"+0, operatorsymbol+numberOf, startDate, endDate);
					}

				} else {
					if (designationId == 0) {
						facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, ">"+1, ">"+1, 
								">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
						communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, ">"+1, ">"+1, 
								">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
					} else {facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, ">"+1, ">"+1, 
							">"+1, "="+organizationId, "", "="+designationId, operatorsymbol+numberOf, startDate, endDate);
					communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, ">"+1, ">"+1, 
							">"+1, "="+organizationId, "", "="+designationId, operatorsymbol+numberOf, startDate, endDate);
					}
				}
			}

		} else {	
			stateName = areaIdNameMap.get(stateId);
			districtName = "-";
			blockName = "-";
			
			if (organizationId == 0) {
			facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, ">"+1, 
					">"+1, ">"+0, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
			communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, ">"+1, 
					">"+1, ">"+0, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
			} else {
			if (organizationId == 5) {
				if (developmentPartnerId == 0) {facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, ">"+1, 
						">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
				communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, ">"+1, 
						">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
				} else {facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, ">"+1, 
						">"+1, "="+organizationId, "and ess.develomentPartner_id_fk="+developmentPartnerId, ">"+0, operatorsymbol+numberOf, startDate, endDate);
				communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, ">"+1, 
						">"+1, "="+organizationId, "and ess.develomentPartner_id_fk="+developmentPartnerId, ">"+0, operatorsymbol+numberOf, startDate, endDate);
				}

			} else {
				if (designationId == 0) {facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, ">"+1, 
						">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
				communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, ">"+1, 
						">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
				} else {facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, ">"+1, 
						">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
				communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, ">"+1, 
						">"+1, "="+organizationId, "", "="+designationId, operatorsymbol+numberOf, startDate, endDate);
				}
			}
		}

	}

		} else if (levelId == 4) { // District level
			if (stateId == 0) {	
				if (organizationId == 0) {facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, ">"+1, ">"+1, 
						">"+1, ">"+0, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
				communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, ">"+1, ">"+1, 
						">"+1, ">"+0, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
				} else {
				if (organizationId == 5) {
					if (developmentPartnerId == 0) {facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, ">"+1, ">"+1, 
							">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
					communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, ">"+1, ">"+1, 
							">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
					} else {facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, ">"+1, ">"+1, 
							">"+1, "="+organizationId, "and ess.develomentPartner_id_fk="+developmentPartnerId, ">"+0, operatorsymbol+numberOf, startDate, endDate);
					communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, ">"+1, ">"+1, 
							">"+1, "="+organizationId, "and ess.develomentPartner_id_fk="+developmentPartnerId, ">"+0, operatorsymbol+numberOf, startDate, endDate);
					}

				} else {
					if (designationId == 0) {facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, ">"+1, ">"+1, 
							">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
					communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, ">"+1, ">"+1, 
							">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
					} else {facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, ">"+1, ">"+1, 
							">"+1, "="+organizationId, "", "="+designationId, operatorsymbol+numberOf, startDate, endDate);
					communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, ">"+1, ">"+1, 
							">"+1, "="+organizationId, "", "="+designationId, operatorsymbol+numberOf, startDate, endDate);
					}
				}
			}

		} else {
			
				if (districtId == -1) {
					stateName = areaIdNameMap.get(stateId);
					districtName = "-";
					blockName = "-";
					if (organizationId == 0) {
						facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, ">"+1, 
							">"+1, ">"+0, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
					communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, ">"+1, 
							">"+1, ">"+0, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
					} else {
						if (organizationId == 5) {
							if (developmentPartnerId == 0) {
								facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, ">"+1, 
										">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
							communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, ">"+1, 
									">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
							} else {
								facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, ">"+1, 
										">"+1, "="+organizationId, "and ess.develomentPartner_id_fk="+developmentPartnerId, ">"+0, operatorsymbol+numberOf, startDate, endDate);
							communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, ">"+1, 
									">"+1, "="+organizationId, "and ess.develomentPartner_id_fk="+developmentPartnerId, ">"+0, operatorsymbol+numberOf, startDate, endDate);
							}

						} else {
							if (designationId == 0) {facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, ">"+1, 
									">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
							communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, ">"+1, 
									">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
							} else {facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, ">"+1, 
									">"+1, "="+organizationId, "", "="+designationId, operatorsymbol+numberOf, startDate, endDate);
							communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, ">"+1, 
									">"+1, "="+organizationId, "", "="+designationId, operatorsymbol+numberOf, startDate, endDate);
							}
						}
					}

				} else {	
					stateName = areaIdNameMap.get(areaIdParentIdMap.get(districtId));
					districtName = areaIdNameMap.get(districtId);
					blockName = "-";
					if (organizationId == 0) {
						facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, "="+districtId, 
							">"+1, ">"+0, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
					communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, "="+districtId, 
							">"+1, ">"+0, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
					} else {
						if (organizationId == 5) {
							if (developmentPartnerId == 0) {
								facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, "="+districtId, 
										">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
							communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, "="+districtId, 
									">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
							} else {
								facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, "="+districtId, 
										">"+1, "="+organizationId, "and ess.develomentPartner_id_fk="+developmentPartnerId, ">"+0, operatorsymbol+numberOf, startDate, endDate);
							communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, "="+districtId, 
									">"+1, "="+organizationId, "and ess.develomentPartner_id_fk="+developmentPartnerId, ">"+0, operatorsymbol+numberOf, startDate, endDate);
							}

						} else {
							if (designationId == 0) {
								facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, "="+districtId, 
									">"+1, "="+organizationId, ">"+0, "", operatorsymbol+numberOf, startDate, endDate);
							communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, "="+districtId, 
									">"+1, "="+organizationId, ">"+0, "", operatorsymbol+numberOf, startDate, endDate);
							} else {facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, "="+districtId, 
									">"+1, "="+organizationId, "", "="+designationId, operatorsymbol+numberOf, startDate, endDate);
							communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, "="+districtId, 
									">"+1, "="+organizationId, "", "="+designationId, operatorsymbol+numberOf, startDate, endDate);
							}
						}
					}

				}
			}

		} else if (levelId == 5) { // Block Level
			if (stateId == 0) {	
				if (organizationId == 0) {
					facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, ">"+1, ">"+1, 
						">"+1, ">"+0, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
				communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, ">"+1, ">"+1, 
						">"+1, ">"+0, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
				} else {
				if (organizationId == 5) {
					if (developmentPartnerId == 0) {facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, ">"+1, ">"+1, 
							">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
					communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, ">"+1, ">"+1, 
							">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
					} else {facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, ">"+1, ">"+1, 
							">"+1, "="+organizationId, "and ess.develomentPartner_id_fk="+developmentPartnerId, ">"+0, operatorsymbol+numberOf, startDate, endDate);
					communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, ">"+1, ">"+1, 
							">"+1, "="+organizationId, "and ess.develomentPartner_id_fk="+developmentPartnerId, ">"+0, operatorsymbol+numberOf, startDate, endDate);
					}

				} else {
					if (designationId == 0) {facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, ">"+1, ">"+1, 
							">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
					communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, ">"+1, ">"+1, 
							">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
					} else {facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, ">"+1, ">"+1, 
							">"+1, "="+organizationId, "", "="+designationId, operatorsymbol+numberOf, startDate, endDate);
					communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, ">"+1, ">"+1, 
							">"+1, "="+organizationId, "", "="+designationId, operatorsymbol+numberOf, startDate, endDate);
					}
				}
			}

		} else {
			stateName = areaIdNameMap.get(stateId);
			districtName ="-";
			blockName = "-";
				if (districtId ==-1 || districtId ==0 ) {
					if (organizationId == 0) {
						facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, ">"+1, 
							">"+1, ">"+0, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
					communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, ">"+1, 
							">"+1, ">"+0, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
					} else {
						if (organizationId == 5) {
							if (developmentPartnerId == 0) {
								facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, ">"+1, 
										">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
							communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, ">"+1, 
									">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
							} else {
								facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, ">"+1, 
										">"+1, "="+organizationId,"and ess.develomentPartner_id_fk="+developmentPartnerId, ">"+0, operatorsymbol+numberOf, startDate, endDate);
							communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, ">"+1, 
									">"+1, "="+organizationId, "and ess.develomentPartner_id_fk="+developmentPartnerId, ">"+0, operatorsymbol+numberOf, startDate, endDate);
							}

						} else {
							if (designationId == 0) {facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, ">"+1, 
									">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
							communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, ">"+1, 
									">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
							} else {facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, ">"+1, 
									">"+1, "="+organizationId, "", "="+designationId, operatorsymbol+numberOf, startDate, endDate);
							communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, ">"+1, 
									">"+1, "="+organizationId, "", "="+designationId, operatorsymbol+numberOf, startDate, endDate);
							}
						}
					}

				} else {
					stateName =areaIdNameMap.get(areaIdParentIdMap.get(districtId));
					districtName =areaIdNameMap.get(districtId);
					blockName = "-";
					
					if(blockId==-1 || blockId==0){	
						if (organizationId == 0) {
							facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, "="+districtId, 
								">"+1, ">"+0, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
						communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, "="+districtId, 
								">"+1, ">"+0, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
						} else {
							if (organizationId == 5) {
								if (developmentPartnerId == 0) {
									facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, "="+districtId, 
											">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
								communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, "="+districtId, 
										">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
								} else {
									facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, "="+districtId, 
											">"+1, "="+organizationId, "and ess.develomentPartner_id_fk="+developmentPartnerId, ">"+0, operatorsymbol+numberOf, startDate, endDate);
								communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, "="+districtId, 
										">"+1, "="+organizationId, "and ess.develomentPartner_id_fk="+developmentPartnerId, ">"+0, operatorsymbol+numberOf, startDate, endDate);
								}

							} else {
								if (designationId == 0) {
									facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, "="+districtId, 
										">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
								communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, "="+districtId, 
										">"+1, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
								} else {facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, "="+districtId, 
										">"+1, "="+organizationId, "", "="+designationId, operatorsymbol+numberOf, startDate, endDate);
								communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, "="+districtId, 
										">"+1, "="+organizationId, "", "="+designationId, operatorsymbol+numberOf, startDate, endDate);
								}
							}
						}

					}else{	
						stateName = areaIdNameMap.get(areaIdParentIdMap.get(areaIdParentIdMap.get(blockId)));
						districtName =areaIdNameMap.get(areaIdParentIdMap.get(blockId));
						blockName = areaIdNameMap.get(blockId);
						
						
						if (organizationId == 0) {
							facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, "="+districtId, 
								"="+blockId, ">"+0, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
						communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, "="+districtId, 
								"="+blockId, ">"+0, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
						} else {
							if (organizationId == 5) {
								if (developmentPartnerId == 0) {
									facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, "="+districtId, 
											"="+blockId, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
								communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, "="+districtId, 
										"="+blockId, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
								} else {
									facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, "="+districtId, 
											"="+blockId, "="+organizationId, "and ess.develomentPartner_id_fk="+developmentPartnerId, ">"+0, operatorsymbol+numberOf, startDate, endDate);
								communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, "="+districtId, 
										"="+blockId, "="+organizationId, "and ess.develomentPartner_id_fk="+developmentPartnerId, ">"+0, operatorsymbol+numberOf, startDate, endDate);
								}

							} else {
								if (designationId == 0) {
									facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, "="+districtId, 
											"="+blockId, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
								communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, "="+districtId, 
										"="+blockId, "="+organizationId, "", ">"+0, operatorsymbol+numberOf, startDate, endDate);
								} else {facilityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportFacilityWise(levelId, "="+stateId, "="+districtId, 
										"="+blockId, "="+organizationId, "", "="+designationId, operatorsymbol+numberOf, startDate, endDate);
								communityData = utIndicatorEnRepository2.findAllSubmissionWiseDesignationReportCommunityWise(levelId, "="+stateId, "="+districtId, 
										"="+blockId, "="+organizationId, "", "="+designationId, operatorsymbol+numberOf, startDate, endDate);
								}
							}
						}

					}

				}
			}
		}
		
		//All resistered Users
		List<UserAreaMapping> userAreaMappingsList = new ArrayList<>();
		if (blockId != -1) {
			if (blockId == 0) {
				userAreaMappingsList = userAreaMappingRepository.findByAreaJson("\"district\":[" + districtId + "]");
			} else {
				userAreaMappingsList = userAreaMappingRepository.findByAreaJson("\"block\":[" + blockId + "]");
			}
		} else if (districtId != -1) {
			if (districtId == 0) {
				userAreaMappingsList = userAreaMappingRepository.findByAreaJson("\"state\":[" + stateId + "]");
			} else {
				userAreaMappingsList = userAreaMappingRepository.findByAreaJson("\"district\":[" + districtId + "]");
			}
		} else if (stateId != -1) {
			if (stateId == 0) {
				userAreaMappingsList = userAreaMappingRepository.findAll();
			} else {
				userAreaMappingsList = userAreaMappingRepository.findByAreaJson("\"state\":[" + stateId + "]");
			}

		} else {
			userAreaMappingsList = userAreaMappingRepository.findAll();
		}
		
		//All organization
		List<DesignationAreaOrganizationRoleMapping> designationAreaOrganizationRoleMappingLists = new ArrayList<>();
		if(stateId!=-1){
			if(organizationId==0){
				 designationAreaOrganizationRoleMappingLists = designationAreaOrganizationRoleMappingRepository.findByRoleRoleIdAndAreaAreaNId(levelId, stateId);
			}else if (designationId==0) {
				designationAreaOrganizationRoleMappingLists = designationAreaOrganizationRoleMappingRepository.findByRoleRoleIdAndOrganizationIdAndAreaAreaNId(levelId, organizationId,stateId);
			}else{
			 designationAreaOrganizationRoleMappingLists.add(designationAreaOrganizationRoleMappingRepository.findByRoleRoleIdAndAreaAreaNIdAndDesignationIdAndOrganizationId(levelId, stateId, designationId, organizationId));
			}
		}
		else{
			if(organizationId==0){
				 designationAreaOrganizationRoleMappingLists = designationAreaOrganizationRoleMappingRepository.findByRoleRoleIdAndAreaAreaNId(levelId, 1);
			}else if (designationId==0) {
				designationAreaOrganizationRoleMappingLists = designationAreaOrganizationRoleMappingRepository.findByRoleRoleIdAndOrganizationIdAndAreaAreaNId(levelId, organizationId,1);
			}else{
			 designationAreaOrganizationRoleMappingLists.add(designationAreaOrganizationRoleMappingRepository.findByRoleRoleIdAndAreaAreaNIdAndDesignationIdAndOrganizationId(levelId, 1, designationId, organizationId));
			}
		}
		
		List<EssUser> listOfUser = new ArrayList<>();
		for (UserAreaMapping userAreaMappings : userAreaMappingsList) {
			if(userAreaMappings.getEssUser().getDesignationAreaOrganizationRoleMapping().getRole().getRoleId()==levelId 
					&& !userAreaMappings.getEssUser().getDesignationAreaOrganizationRoleMapping().getDesignation().getName().equals("Super Admin")
					&& !userAreaMappings.getEssUser().getDesignationAreaOrganizationRoleMapping().getDesignation().getName().equals("State Admin")){
				if(developmentPartnerId!=0 && developmentPartnerId>=1) {
					if(userAreaMappings.getEssUser().getDevelomentpartner()!= null && userAreaMappings.getEssUser().getDevelomentpartner().getId()== developmentPartnerId  ){
					listOfUser.add(userAreaMappings.getEssUser());
					}
				}
				else{
				listOfUser.add(userAreaMappings.getEssUser());}
			}
		}
		
		Map<String,Integer> facilityCommunityMap = new LinkedHashMap<String,Integer>();
		Map<String,Integer> facilityMap = new LinkedHashMap<String,Integer>();
		Map<String,Integer> communityMap = new LinkedHashMap<String,Integer>();
		Map<String,Integer> designationMap = new LinkedHashMap<String,Integer>();
		
		for (DesignationAreaOrganizationRoleMapping designationAreaOrganizationRoleMapping : designationAreaOrganizationRoleMappingLists) {
			String orgName = designationAreaOrganizationRoleMapping.getOrganization().getOrganizationName();
			String degName = designationAreaOrganizationRoleMapping.getDesignation().getName();
			designationMap.put(orgName+"_"+degName,!designationMap.containsKey(orgName+"_"+degName)? 1 : designationMap.get(orgName+"_"+degName)+1 );
		}
		
		
		JSONParser parser = new JSONParser();
		if (facilityData != null) {
			JSONArray noOfFacilitySubmissionsArray = (JSONArray) parser.parse(facilityData);
			for (Object object : noOfFacilitySubmissionsArray) {
				JSONObject objects = (JSONObject) object;
				String orgName = (String) objects.get("organization_name");
				String degName = (String) objects.get("name");
				Long total = (Long) objects.get("count");
				facilityMap.put(orgName + "_" + degName, (int) (!facilityMap.containsKey(orgName + "_" + degName) ? total
						: facilityMap.get(orgName + "_" + degName) + total));

			}
		}
		if (communityData != null) {
			JSONArray noOfCommunitySubmissionsArray = (JSONArray) parser.parse(communityData);
			for (Object object : noOfCommunitySubmissionsArray) {
				JSONObject objects = (JSONObject) object;
				String orgName = (String) objects.get("organization_name");
				String degName = (String) objects.get("name");
				Long total = (Long)  objects.get("count");
				communityMap.put(orgName + "_" + degName, (int) (!communityMap.containsKey(orgName + "_" + degName) ? total
						: communityMap.get(orgName + "_" + degName) + total));

			}
		}
		
		for (EssUser essUser : listOfUser) {
			String orgName = essUser.getDesignationAreaOrganizationRoleMapping().getOrganization().getOrganizationName();
			String degName = essUser.getDesignationAreaOrganizationRoleMapping().getDesignation().getName();
			facilityCommunityMap.put(orgName+"_"+degName,!facilityCommunityMap.containsKey(orgName+"_"+degName)? 1 : facilityCommunityMap.get(orgName+"_"+degName)+1 );
			
		}
	
		
		List<SubmissionWiseDesignationReportModel> listOfSWDRMs = new ArrayList<>();
		for (Map.Entry<String, Integer> designationMapEntry : designationMap.entrySet()) {
			SubmissionWiseDesignationReportModel sWDRModel = new SubmissionWiseDesignationReportModel();
			sWDRModel.setBlockName(blockName);
			sWDRModel.setDesignationName(designationMapEntry.getKey().toString().split("_")[1]);
			sWDRModel.setOrganizationName(designationMapEntry.getKey().toString().split("_")[0]);
			sWDRModel.setDistrictName(districtName);
			sWDRModel.setStateName(stateName);
			
			for (Map.Entry<String, Integer> facilityCommunityMapEntry : facilityCommunityMap.entrySet()) {
				if (designationMapEntry.getKey().equals(facilityCommunityMapEntry.getKey())) {
					sWDRModel.setNumberOfUsers(facilityCommunityMapEntry.getValue());
				
				for (Map.Entry<String, Integer> facilityMapEntry : facilityMap.entrySet()) {
					if (facilityCommunityMapEntry.getKey().equals(facilityMapEntry.getKey())) {
						sWDRModel.setNumberOfFacilityUsers(facilityMapEntry.getValue());
						sWDRModel.setPercentageOfFacilityUsers(facilityCommunityMapEntry.getValue() != 0
								? facilityMapEntry.getValue() != 0 ? String.valueOf(
										(facilityMapEntry.getValue() * 100) / facilityCommunityMapEntry.getValue())
										: "0" : "-");
					}
				}
				for (Map.Entry<String, Integer> communityMapEntry : communityMap.entrySet()) {
					if (facilityCommunityMapEntry.getKey().equals(communityMapEntry.getKey())) {
						sWDRModel.setNumberOfCommunityUsers(communityMapEntry.getValue());
						sWDRModel.setPercentageOfCommunityUsers(facilityCommunityMapEntry.getValue() != 0
								? communityMapEntry.getValue() != 0 ? String.valueOf(
										(communityMapEntry.getValue() * 100) / facilityCommunityMapEntry.getValue())
										: "0" : "-");
					}
					
				}
			}
				
			}
			listOfSWDRMs.add(sWDRModel);
		
		}
		
		
		return listOfSWDRMs;
	}
	
	@Override
	public String tempUnplannedsave() {
		
		List<FacilityData> listOfFacilityData = facilityDataRepository.findAll();
		for (FacilityData facilityData : listOfFacilityData) {
			Unplanned unplanned = new Unplanned();

			unplanned.setCheckListType(new TypeDetail(121));
			unplanned.setCreatedDate(new Timestamp(System.currentTimeMillis()));
			unplanned.setEssUser(facilityData.getUser());
			unplanned.setFacility(facilityData.getArea());
			unplanned.setVisitedDate(new Timestamp(facilityData.getC7().getTime()));
			
			unplannedRepository.save(unplanned);
		}
		List<CommunityData> listOfCommunityData = communityDataRepository.findAll();
		for (CommunityData communityData : listOfCommunityData) {
			
			Unplanned unplanned = new Unplanned();

			unplanned.setCheckListType(new TypeDetail(122));
			unplanned.setCreatedDate(new Timestamp(System.currentTimeMillis()));
			unplanned.setEssUser(communityData.getUser());
			unplanned.setFacility(communityData.getFacility());
			unplanned.setVisitedDate(new Timestamp(communityData.getDate().getTime()));
			unplannedRepository.save(unplanned);
			
		}
		
		
		return "success";
	}
}
