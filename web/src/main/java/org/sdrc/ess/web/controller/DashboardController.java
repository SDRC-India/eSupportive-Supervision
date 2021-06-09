/**
 * 
 */
package org.sdrc.ess.web.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.sdrc.ess.core.ValueObjectForDashboard;
import org.sdrc.ess.model.mobile.AreaModel;
import org.sdrc.ess.model.web.DashboardLandingPageData;
import org.sdrc.ess.model.web.DataCollectionModel;
import org.sdrc.ess.model.web.EssUserModel;
import org.sdrc.ess.model.web.FacilityPushPinModel;
import org.sdrc.ess.model.web.FacilityViewModel;
import org.sdrc.ess.model.web.LineChartData;
import org.sdrc.ess.model.web.ReportInputDataModel;
import org.sdrc.ess.model.web.TimePeriodModel;
import org.sdrc.ess.model.web.ValueObject;
import org.sdrc.ess.service.DashboardService;
import org.sdrc.ess.service.ThematicDashboardViewService;
import org.sdrc.ess.util.Constants;
import org.sdrc.ess.util.StateManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author Harsh Pratyush (harsh@sdrc.co.in)
 *
 */

@Controller
public class DashboardController {

	@Autowired
	DashboardService dashboardService;

	@Autowired
	ThematicDashboardViewService thematicDashboardViewService;
	
	@Autowired
	private StateManager stateManager;
	
	@RequestMapping(value = "/dashboard", method = RequestMethod.GET)
	public String getDashboardView() {
		EssUserModel essUserModel = (EssUserModel) stateManager
				.getValue(Constants.Web.USER_PRINCIPAL);
		if (essUserModel != null)
			return "dashboard";
		else
			return "exception";
	}
	
	@RequestMapping(value = "/thematicView", method = RequestMethod.GET)
	public String getThimaticView() {
		EssUserModel essUserModel = (EssUserModel) stateManager
				.getValue(Constants.Web.USER_PRINCIPAL);
		if (essUserModel != null)
			return "thematicView";
		else
			return "exception";
	}
	
	@RequestMapping(value = "/facilityView", method = RequestMethod.GET)
	public String getFacilityView() {
		EssUserModel essUserModel = (EssUserModel) stateManager
				.getValue(Constants.Web.USER_PRINCIPAL);
		if (essUserModel != null)
			return "facilityView";
		else
			return "exception";
	}
	
	

	@RequestMapping("/getLandingPageData")
	@ResponseBody
	public DashboardLandingPageData getLandingPageData() {
		return dashboardService.getLandingDashBoardData();
	}

	@RequestMapping("/getThematicView")
	@ResponseBody
	public DashboardLandingPageData getThematicView() {
		return dashboardService.getThematicViewData();
	}

	@RequestMapping("/getSection")
	@ResponseBody
	public List<ValueObject> getSection(@RequestParam("checklistId") Integer checklistId) {
		return dashboardService.getSection(checklistId);
	}

	@RequestMapping("/getSubSection")
	@ResponseBody
	public List<ValueObject> getSubSection(@RequestParam("sectionId") Integer sectionId) {
		return dashboardService.getSubSection(sectionId);
	}

	@RequestMapping(value = "/getDashboardTimeperiod", method = RequestMethod.GET)
	@ResponseBody
	public List<TimePeriodModel> getTimeperiodForDashboard() {
		return dashboardService.getTimeperiodForDashboard();
	}

	@RequestMapping(value = { "/api/indicators" }, method = { RequestMethod.GET })
	@ResponseBody
	public List<ValueObjectForDashboard> fetchIndicators(@RequestParam(required = false) String sector) throws Exception {
		List<ValueObjectForDashboard> valueObjects = new ArrayList<>();
		if (sector != null) {
			valueObjects = thematicDashboardViewService.fetchIndicators(sector);
		}
		return valueObjects;
	}

	@RequestMapping(value = { "/api/sources" }, method = { RequestMethod.GET })
	@ResponseBody
	public List<ValueObjectForDashboard> fetchSources(@RequestParam(required = false) String iusnid) throws Exception {
		List<ValueObjectForDashboard> valueObjects = new ArrayList<>();
		if (iusnid != null) {
			valueObjects = thematicDashboardViewService.fetchSources(iusnid);
		}
		return valueObjects;
	}


	@RequestMapping(value = { "/api/timeperiod" }, method = { RequestMethod.GET })
	@ResponseBody
	public JSONObject fetchUtTimeperiod(@RequestParam(required = false) String iusnid, @RequestParam(required = false) String sourceNid) throws Exception {

		if (iusnid != null && sourceNid != null) {
			return thematicDashboardViewService.fetchUtTimeperiod(Integer.parseInt(iusnid), Integer.parseInt(sourceNid));
		}
		return new JSONObject();
	}

	@RequestMapping(value = { "/api/sectors" }, method = { RequestMethod.GET })
	@ResponseBody
	public JSONObject fetchAllSectors() throws Exception {
		return thematicDashboardViewService.fetchAllSectors("SC");
	}

	@RequestMapping(value = "/api/data", method = RequestMethod.GET)
	@ResponseBody
	public DataCollectionModel fetchData(@RequestParam(required = false) String indicatorId, 
			@RequestParam(required = false) String sourceNid, @RequestParam(required = false) String areaId, 
			@RequestParam(required = false) String timeperiodId, @RequestParam(required = false) Integer parentAreaId, 
			@RequestParam("facilityTypeId") Integer facilityTypeId) throws Exception {

		DataCollectionModel valList = new DataCollectionModel();
		if (indicatorId != null && sourceNid != null && timeperiodId != null) {
			valList = thematicDashboardViewService.fetchMapData(indicatorId, sourceNid, areaId, timeperiodId, 
					parentAreaId,facilityTypeId);
		}

		return valList;
	}
	
	@RequestMapping(value = "/getAllPushPinFacililityData", method = RequestMethod.GET)
	@ResponseBody
	public List<FacilityPushPinModel> getAllPushPinFacililityData(@RequestParam("blockId")Integer blockId,@RequestParam("checklistId")Integer checklistId,@RequestParam("subsection") Integer subsection,@RequestParam("startDate")String startDate,@RequestParam("endDate") String endDate,@RequestParam("facilityTypeId")Integer facilityTypeId) throws Exception {
		return dashboardService.getAllPushPinFacililityData(blockId, checklistId, subsection, startDate, endDate,facilityTypeId);
	}
	

	@ResponseBody
	@RequestMapping(value="/api/getLineChartData",method=RequestMethod.GET)
	public List<LineChartData> getLineChartData(@RequestParam("area_NId") Integer area_NId,
			@RequestParam("indicator_NId") Integer indicator_NId, @RequestParam("periodicity") Integer periodicity,
			@RequestParam("timePeriod_NId") Integer timePeriod_NId, @RequestParam("facilityTypeId") Integer facilityTypeId) {
		try {
		return thematicDashboardViewService.getLineChartData(area_NId,indicator_NId,periodicity,timePeriod_NId,facilityTypeId);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
		}
	
	
	@ResponseBody
	@RequestMapping(value="/api/getThematicTableViewData",method=RequestMethod.GET)
	public JSONObject getThematicTableViewData(@RequestParam("sectorNid") Integer sectorNid,
			@RequestParam("timePeriod_NId") Integer timePeriod_NId,
			@RequestParam("areaNid") Integer areaNid,@RequestParam("facilityTypeId") Integer facilityTypeId) throws Exception {
		
		return thematicDashboardViewService.getThematicTableViewData(sectorNid,timePeriod_NId,areaNid,facilityTypeId);
	}

	@RequestMapping(value = "/api/areaList", method = RequestMethod.GET)
	@ResponseBody
	public List<AreaModel> fetchAreasAreaWise(@RequestParam(required = false) Integer iusNid, @RequestParam(required = false) Integer areaNid) throws Exception {

		return thematicDashboardViewService.fetchAreasAreaWise();
	}
	
	@RequestMapping(value = "/api/areaRoleWise", method = RequestMethod.GET)
	@ResponseBody
	public JSONObject fetchAreasRoleWise() throws Exception {

		return thematicDashboardViewService.fetchAreasRoleWise();
	}
	
	@RequestMapping(value = "/getTabularDateForFacilityView", method = RequestMethod.GET)
	@ResponseBody
	public FacilityViewModel getTabularDateForFacilityView(@RequestParam(value = "stateId", required = false)Integer stateId,
			@RequestParam(value = "districtId", required = false)Integer districtId
			,@RequestParam(value = "blockId", required = false)Integer blockId,
			@RequestParam(value = "checklistId", required = true)Integer checklistId,
			@RequestParam(value = "timeperiodId", required = true)Integer timeperiodId,
			@RequestParam(value = "sesctionId", required = true)Integer sesctionId,
			@RequestParam(value = "facilityTypeId", required = false)Integer facilityTypeId) throws Exception {
		return dashboardService.getTabularDateForFacilityView(stateId, districtId, blockId, checklistId, timeperiodId,sesctionId, facilityTypeId);
	}
		
		@RequestMapping(value="getPushpinScore",method=RequestMethod.POST)
		@ResponseBody
		public List<Map<String,String>> getPushpinScore(@RequestBody ReportInputDataModel reportInputDataModel)
		{
			List<String> submissionIds=Arrays.asList(reportInputDataModel.getSubmisionIDs().split(","));
			return dashboardService.getSubmisionData(reportInputDataModel.getChecklistType(), submissionIds,reportInputDataModel.getFacilityId());
		}
		
		/*@RequestMapping(value="getPushpinScore",method=RequestMethod.GET)
		@ResponseBody
		public List<Map<String,String>> getPushpinScore()
		{
			//List<String> submissionIds=Arrays.asList(reportInputDataModel.getSubmisionIDs().split(","));
			return dashboardService.getSubmisionData(122, Arrays.asList("46"));
		}*/
	
	
}
