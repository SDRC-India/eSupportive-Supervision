package org.sdrc.ess.web.controller;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.sdrc.ess.model.web.ActualvsPlannedReportTimeperiodModel;
import org.sdrc.ess.model.web.EssUserModel;
import org.sdrc.ess.model.web.MonitoringReportRequestModel;
import org.sdrc.ess.model.web.PlanningReportModel;
import org.sdrc.ess.model.web.SubmissionWiseDesignationReportModel;
import org.sdrc.ess.model.web.TimePeriodModel;
import org.sdrc.ess.model.web.UnSupervisedModel;
import org.sdrc.ess.service.MonitoringReportService;
import org.sdrc.ess.service.ReportService;
import org.sdrc.ess.util.Constants;
import org.sdrc.ess.util.StateManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author Debiprasad Parida(debiprasad@sdrc.co.in) Created on 09-10-2017
 */
@Controller
public class ReportController {
	@Autowired
	ReportService reportService;

	@Autowired
	private MonitoringReportService monitoringReportService;

	@Autowired
	private StateManager stateManager;

	@RequestMapping(value = "/planVsActualSupervision", method = RequestMethod.GET)
	public String getPlanVsActual() {
		EssUserModel essUserModel = (EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL);
		if (essUserModel != null)
			return "planVsActualSupervision";
		else
			return "exception";
	}

	@RequestMapping(value = "/rawDataReport", method = RequestMethod.GET)
	public String getRawData() {
		EssUserModel essUserModel = (EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL);
		if (essUserModel != null)
			return "rawDataReport";
		else
			return "exception";
	}

	@RequestMapping(value = "/designationWiseSubmission", method = RequestMethod.GET)
	public String getUnSupervised() {
		EssUserModel essUserModel = (EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL);
		if (essUserModel != null)
			return "designationWiseSubmission";
		else
			return "exception";
	}

	@RequestMapping(value = "/unsupervisedFacilityReport", method = RequestMethod.GET)
	public String getDesignationwise() {
		EssUserModel essUserModel = (EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL);
		if (essUserModel != null)
			return "unsupervisedFacilityReport";
		else
			return "exception";
	}

	@RequestMapping(value = "/getReport", method = RequestMethod.GET)
	@ResponseBody
	public void saveplannedVsActual() throws Exception {
		reportService.saveplannedVsActual();
	}

	@RequestMapping("/report")
	@ResponseBody
	public ActualvsPlannedReportTimeperiodModel createActualvsPlannedReport(
			@RequestParam(value = "checklistId", required = true) Integer checklistId,
			@RequestParam(value = "districtId", required = false) Integer districtId,
			@RequestParam(value = "stateId", required = false) Integer stateId,
			@RequestParam(value = "startDateId", required = true) Integer startDateId,
			@RequestParam(value = "endDateId", required = true) Integer endDateId,
			@RequestParam(value = "blockId", required = false) Integer blockId) throws Exception {
		// Integer facilityId=null, districtId=null, facilitypeId=null,
		// facilitysizeId=null, stateId=null, startDate=6,
		// endDate=16;

		return reportService.createActualvsPlannedReport(checklistId, districtId, stateId, startDateId, endDateId,
				blockId);
	}

	@RequestMapping(value = "/getPlannedVisit", method = RequestMethod.GET)
	@ResponseBody
	public List<PlanningReportModel> getPlannedVisitData(@RequestParam("facilityId") Integer facilityId,
			@RequestParam("facilityTypeId") Integer facilityTypeId, @RequestParam("checklistId") Integer checklistId,
			@RequestParam("timeperiodId") Integer timeperiodId) throws Exception {
		return reportService.getPlannedVisitData(facilityId, facilityTypeId, checklistId, timeperiodId);
	}

	@RequestMapping(value = "/getUnplannedVisitData", method = RequestMethod.GET)
	@ResponseBody
	public List<PlanningReportModel> getUnplannedVisitData(@RequestParam("facilityId") Integer facilityId,
			@RequestParam("facilityTypeId") Integer facilityTypeId, @RequestParam("checklistId") Integer checklistId,
			@RequestParam("timeperiodId") Integer timeperiodId) throws Exception {
		return reportService.getUnplannedVisitData(facilityId, facilityTypeId, checklistId, timeperiodId);
	}

	@RequestMapping(value = "/getPlannedAndUnplannedVisitData", method = RequestMethod.GET)
	@ResponseBody
	public List<PlanningReportModel> getPlannedAndUnplannedVisitData(@RequestParam("facilityId") Integer facilityId,
			@RequestParam("facilityTypeId") Integer facilityTypeId, @RequestParam("checklistId") Integer checklistId,
			@RequestParam("timeperiodId") Integer timeperiodId) throws Exception {
		return reportService.getPlannedAndUnplannedVisitData(facilityId, facilityTypeId, checklistId, timeperiodId);
	}

	@RequestMapping(value = "/getUnSupervisedFacilityData", method = RequestMethod.GET)
	@ResponseBody
	public List<UnSupervisedModel> getUnSupervisedFacilityData(@RequestParam("checklistId") Integer checklistId,
			@RequestParam("startdateId") String startdateId, @RequestParam("endDateId") String endDateId,
			@RequestParam("districtId") Integer districtId, @RequestParam("blockId") Integer blockId) {
		return reportService.getUnSupervisedFacilityData(checklistId, startdateId, endDateId, districtId, blockId);

	}

	@RequestMapping(value = "/getRawDataReport", method = RequestMethod.POST)
	public void getUnSupervisedFacilityData(@RequestParam("checklistId") Integer checklistId,
			@RequestParam("facilityTypeId") Integer facilityTypeId, @RequestParam("startdateId") String startdateId,
			@RequestParam("endDateId") String endDateId, @RequestParam("districtId") Integer districtId,
			@RequestParam(value = "blockId") Integer blockId, HttpServletResponse httpServletResponse)
			throws IOException {

		File file = reportService.generateRawDataExcel(startdateId, endDateId, blockId, districtId, checklistId,
				facilityTypeId);
		try {
			String mimeType;
			mimeType = "application/octet-stream";
			httpServletResponse.setContentType(mimeType);
			httpServletResponse.setHeader("Content-Disposition",
					String.format("attachment; filename=\"%s\"", file.getName()));
			httpServletResponse.setContentLength((int) file.length());
			InputStream inputStream = new BufferedInputStream(new FileInputStream(file));
			FileCopyUtils.copy(inputStream, httpServletResponse.getOutputStream());

		} finally {
			httpServletResponse.getOutputStream().close();
			if (file != null) {
				file.delete();
			}
		}
	}

	@RequestMapping(value = "/getTimePeriod", method = RequestMethod.GET)
	@ResponseBody
	public List<TimePeriodModel> getAllTimePeriod() {
		return reportService.getAllTimePeriod();
	}

	@RequestMapping(value = "/getVisitPlanned", method = RequestMethod.GET)
	@ResponseBody
	public List<PlanningReportModel> getPlannedData(@RequestParam("facilityId") Integer facilityId,
			@RequestParam("facilityTypeId") Integer facilityTypeId, @RequestParam("checklistId") Integer checklistId,
			@RequestParam("timeperiodId") Integer timeperiodId) throws Exception {
		return reportService.getPlannedData(facilityId, facilityTypeId, checklistId, timeperiodId);
	}

	@RequestMapping(value = "/tempUnplannedsave", method = RequestMethod.GET)
	@ResponseBody
	public String tempUnplannedsave() throws Exception {
		return reportService.tempUnplannedsave();
	}

	@RequestMapping(value = "/getDesignationReport", method = RequestMethod.GET)
	@ResponseBody
	public List<SubmissionWiseDesignationReportModel> getDesignationReport(
			@RequestParam(value = "levelId", required = false) Integer levelId,
			@RequestParam(value = "stateId", required = false) Integer stateId,
			@RequestParam(value = "districtId", required = false) Integer districtId,
			@RequestParam(value = "blockId", required = false) Integer blockId,
			@RequestParam(value = "organizationId", required = false) Integer organizationId,
			@RequestParam(value = "developmentPartnerId", required = false) Integer developmentPartnerId,
			@RequestParam(value = "designationId", required = false) Integer designationId,
			@RequestParam(value = "operatorId", required = false) Integer operatorId,
			@RequestParam(value = "numberOf", required = false) Integer numberOf,
			@RequestParam(value = "startDate", required = false) String startDate,
			@RequestParam(value = "endDate", required = false) String endDate) throws Exception {
		return reportService.getSubmissionWiseReport(levelId, stateId, districtId, blockId, organizationId,
				developmentPartnerId, designationId, operatorId, numberOf, startDate, endDate);
	}

	@RequestMapping("/getBasicDataForMonitoringReport")
	@ResponseBody
	public JSONObject getBasicDataForMonitoringReport() {
		return monitoringReportService.getBasicDataForMonitoringReport();
	}

	@RequestMapping(value = "/getUserMonitoringReportData", method = RequestMethod.POST)
	@ResponseBody
	public Object getUserMonitoringReportData(@RequestBody MonitoringReportRequestModel obj) {
		return monitoringReportService.getUserMonitoringReportData(obj);
	}
	
	@RequestMapping(value = "/getMonitoringReportDataFacility", method = RequestMethod.POST)
	@ResponseBody
	public Object getMonitoringReportDataFacility(@RequestBody MonitoringReportRequestModel obj) {
		return monitoringReportService.getMonitoringReportDataFacility(obj);
	}
}
