package org.sdrc.ess.web.controller;

import java.text.ParseException;
import java.util.List;

import org.sdrc.ess.model.mobile.AreaModel;
import org.sdrc.ess.model.web.DoughnutChartModel;
import org.sdrc.ess.model.web.ErrorClass;
import org.sdrc.ess.model.web.EssUserModel;
import org.sdrc.ess.model.web.PlanningFacilityAssessmentHistory;
import org.sdrc.ess.model.web.PlanningModel;
import org.sdrc.ess.model.web.TimePeriodModel;
import org.sdrc.ess.model.web.ValueObject;
import org.sdrc.ess.service.PlanningService;
import org.sdrc.ess.util.Constants;
import org.sdrc.ess.util.StateManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class PlanningController {

	@Autowired
	PlanningService planningService;
	
	@Autowired
	private StateManager stateManager;
	
	
	@RequestMapping(value = "/plan", method = RequestMethod.GET)
	public String getResetUserPassWord() {
		EssUserModel essUserModel = (EssUserModel) stateManager
				.getValue(Constants.Web.USER_PRINCIPAL);
		if (essUserModel != null)
			return "plan";
		else
			return "exception";
	}

	// @Authorize(feature="planning",permission="edit")
	@RequestMapping(value = "addPlannings", method = RequestMethod.POST)
	@ResponseBody
	public ErrorClass addPlanning(@RequestBody PlanningModel planningModel) {
		return planningService.planFacility(planningModel);
	}

	// @Authorize(feature="planning",permission="edit")
	@RequestMapping(value = "releasePlanning", method = RequestMethod.GET)
	@ResponseBody
	public ErrorClass releasePlanning(@RequestParam("planningId") Integer planningId) throws Exception {
		return planningService.releasePlanning(planningId);
	}
	
	// @Authorize(feature="planning",permission="edit")
		@RequestMapping(value = "planningData", method = RequestMethod.GET)
		@ResponseBody
		public PlanningFacilityAssessmentHistory getPlanningData(@RequestParam("checkListId") Integer checkListId) throws Exception {
			return planningService.getPlanningData(checkListId);
		}
		
		@RequestMapping(value = "/areasLoginwise", method = RequestMethod.GET)
		@ResponseBody
		public List<AreaModel> getAllArea() {
			return planningService.getAllAreaLoginwise();
		}
		
		@RequestMapping(value = "/getLastVisitData", method = RequestMethod.GET)
		@ResponseBody
		public List<ValueObject> getLastVisitData(@RequestParam("facilityId")Integer facilityId,@RequestParam("checkListId")Integer checkListId){
			return planningService.getLastVisitData(facilityId, checkListId);
			
		}
		
		@RequestMapping(value = "/getDataForDoughnutChart", method = RequestMethod.GET)
		@ResponseBody
		public List<DoughnutChartModel> getDataForDoughnutChart(@RequestParam("checkListId")Integer checkListId)throws Exception {
			return planningService.getDataForDoughnutChart(checkListId);
		}
		
		@RequestMapping(value = "/getTrendChartData", method = RequestMethod.GET)
		@ResponseBody
		public List<DoughnutChartModel> getTrendChartData(@RequestParam("checkListId")Integer checkListId) throws ParseException{
			return planningService.getTrendChartData(checkListId);
			
		}
		
		@RequestMapping(value = "/getAllTimePeriod", method = RequestMethod.GET)
		@ResponseBody
		public List<TimePeriodModel> getAllTimePeriod() {
			return planningService.getAllTimePeriod();
		}
		
		@RequestMapping(value = "/getPlanAvailable", method = RequestMethod.GET)
		@ResponseBody
		public Boolean checkPlanavailablity(@RequestParam("facilityId")Integer facilityId,@RequestParam("checklistId")Integer checklistId, @RequestParam("plannedDate")String plannedDate) throws Exception {
			return planningService.checkPlanavailablity(facilityId, checklistId,plannedDate);
		}
		
}
