package org.sdrc.ess.service;

import java.io.File;
import java.util.List;

import org.json.simple.JSONObject;
import org.sdrc.ess.model.web.ActualvsPlannedReportTimeperiodModel;
import org.sdrc.ess.model.web.PlanningReportModel;
import org.sdrc.ess.model.web.SubmissionWiseDesignationReportModel;
import org.sdrc.ess.model.web.TimePeriodModel;
import org.sdrc.ess.model.web.UnSupervisedModel;

/**
 * @author Debiprasad Parida(debiprasad@sdrc.co.in) Created on 09-10-2017
 */
public interface ReportService {

	public String saveplannedVsActual() throws Exception;

	public ActualvsPlannedReportTimeperiodModel createActualvsPlannedReport(Integer checklistId, Integer districtId, Integer stateId, Integer startDateId, Integer endDateId,Integer blockId) throws Exception;

	public List<PlanningReportModel> getPlannedVisitData(Integer facilityId, Integer facilityTypeId, Integer checklistId, Integer timeperiodId);

	public List<PlanningReportModel> getUnplannedVisitData(Integer facilityId, Integer facilityTypeId, Integer checklistId, Integer timeperiodId);

	public List<PlanningReportModel> getPlannedAndUnplannedVisitData(Integer facilityId, Integer facilityTypeId, Integer checklistId, Integer timeperiodId);

	public List<UnSupervisedModel> getUnSupervisedFacilityData(Integer checklistId, String startDateId, String endDateId, Integer districtId,Integer blockId);

	public File generateRawDataExcel(String startDate, String endDate,Integer blockId,Integer districtId,Integer checkListTypeId,Integer facilityTypeId);
	
	public List<TimePeriodModel> getAllTimePeriod();
	
	public List<PlanningReportModel> getPlannedData(Integer facilityId, Integer facilityTypeId, Integer checklistId, Integer timeperiodId);
	
	public List<SubmissionWiseDesignationReportModel> getSubmissionWiseReport(Integer levelId, Integer stateId, Integer districtId, Integer blockId,
			Integer organizationId, Integer developmentPartnerId, Integer designationId, Integer operatorId, Integer numberOf,String startDate, String endDate)throws Exception;
	
	public String tempUnplannedsave();
	
}
