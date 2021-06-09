/**
 * 
 */
package org.sdrc.ess.web.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.sdrc.ess.model.web.EssUserModel;
import org.sdrc.ess.model.web.IndicatorWiseGapReportDropDownModel;
import org.sdrc.ess.model.web.ReportInputDataModel;
import org.sdrc.ess.service.IndicatorWiseGapReportService;
import org.sdrc.ess.util.Constants;
import org.sdrc.ess.util.StateManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author Harsh Pratyush (harsh@sdrc.co.in)
 *
 */

@Controller
public class IndicatorWiseGapReportController {

	
	@Autowired
	IndicatorWiseGapReportService  indicatorWiseGapReportService;
	
	@Autowired
	private StateManager stateManager;
	
	
	
	@RequestMapping(value="/getIndicatorWiseGapReport",method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, String>> getIndicatorWiseGapReport(@RequestBody ReportInputDataModel reportInputDataModel)
	{
		return indicatorWiseGapReportService.getIndicatorWiseGapReport(reportInputDataModel);
	}
	
	
	@RequestMapping(value="getDropDownData",method=RequestMethod.GET)
	@ResponseBody
	public IndicatorWiseGapReportDropDownModel getDropDownData()
	{
		return indicatorWiseGapReportService.getDropDownData();
	}
	
	@RequestMapping("indicatorWiseGap")
	public String getindicatorWiseGapPage()
	{
		EssUserModel essUserModel = (EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL);
		if (essUserModel != null)
			return "indicatorWiseGap";
		else
			return "exception";

	}
	
	
	@RequestMapping("improvementInFacility")
	public String getimprovementInFacilityPage()
	{
		EssUserModel essUserModel = (EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL);
		if (essUserModel != null)
			return "improvementInFacility";
		else
			return "exception";
	}
	
	@RequestMapping(value="getImprovementInFacilityReport",method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String,String>> getImprovementInFacilityReport(@RequestBody ReportInputDataModel reportInputDataModel)
	{
		return indicatorWiseGapReportService.getImprovementForFacility(reportInputDataModel);
	}
	
	@RequestMapping(value="getImprovementInFacilitySubmissionReport",method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String,String>> getImprovementInFacilitySubmissionReport(@RequestBody ReportInputDataModel reportInputDataModel)
	{
		List<String> submissionIds=Arrays.asList(reportInputDataModel.getSubmisionIDs().split(","));
		return indicatorWiseGapReportService.getSubmisionData(reportInputDataModel.getChecklistType(), submissionIds , reportInputDataModel.getFacilityId());
	}
	
	
	@RequestMapping("improvementInCommunity")
	public String getimprovementInCommunityPage()
	{
		EssUserModel essUserModel = (EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL);
		if (essUserModel != null)
			return "improvementInCommunity";
		else
			return "exception";
	}
	
}
