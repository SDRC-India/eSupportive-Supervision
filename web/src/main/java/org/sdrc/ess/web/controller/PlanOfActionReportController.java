/**
 * 
 */
package org.sdrc.ess.web.controller;

import java.util.List;
import java.util.Map;

import org.sdrc.ess.model.web.EssUserModel;
import org.sdrc.ess.model.web.ReportInputDataModel;
import org.sdrc.ess.service.PlanOfActionReportService;
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
public class PlanOfActionReportController {

	
	@Autowired
	private PlanOfActionReportService planOfActionReportService;
	
	@Autowired
	private StateManager stateManager;
	
	
	@RequestMapping(value="getPlanofActionForDistrict",method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String,String>> getPlanofActionForDistrict(@RequestBody ReportInputDataModel reportModel)	
	{
		return planOfActionReportService.getPlanofActionForDistrict(reportModel);
	}
	
	/**
	 * 
	 * @param reportModel {@link ReportInputDataModel}
	 * @return
	 */
	@RequestMapping(value="getDelayedPlanofActionForDistrict",method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String,String>> getDelayedPlanofActionForDistrict(@RequestBody ReportInputDataModel reportModel)
	{
		return planOfActionReportService.getDelayedPlanofActionForDistrict(reportModel);
	}
	
	/**
	 * 
	 * @param facilityId
	 * @param facilityType
	 * @return
	 */
	@RequestMapping(value="getPlanOfActionForAFacility",method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String,String>> getPlanOfActionForAFacility(@RequestParam("facilityId")int facilityId,@RequestParam("facilityType")int facilityType)
	
	{
		return planOfActionReportService.getPlanOfActionForAFacility(facilityId, facilityType);
	}
	/**
	 * 
	 * @param facilityId
	 * @param facilityType
	 * @return
	 */
	@RequestMapping(value="getDelayedPlanOfActionForAFacility",method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String,String>> getDelayedPlanOfActionForAFacility(@RequestParam("facilityId")int facilityId,@RequestParam("facilityType")int facilityType)
	{
		return planOfActionReportService.getDelayedPlanOfActionForAFacility(facilityId, facilityType);
	}
	
	
	@RequestMapping("actionItemReport")
	public String getactionItemReportPage()
	{
	EssUserModel essUserModel = (EssUserModel) stateManager
	.getValue(Constants.Web.USER_PRINCIPAL);
		if(essUserModel != null)
		return "planOfActionReport";
		else
			return "exception";
	}
	
	@RequestMapping("delayActionItemReport")
	public String getDelayactionItemReportPage()
	{
		EssUserModel essUserModel = (EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL);
		if (essUserModel != null)
			return "delayInAction";
		else
			return "exception";
	}
}
