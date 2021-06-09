/**
 * 
 */
package org.sdrc.ess.service;

import java.util.List;
import java.util.Map;

import org.sdrc.ess.model.web.IndicatorWiseGapReportDropDownModel;
import org.sdrc.ess.model.web.ReportInputDataModel;

/**
 * @author Harsh Pratyush (harsh@sdrc.co.in)
 *
 */
public interface IndicatorWiseGapReportService {
	
	/**
	 * This method will return the table data for the report page of Indicator Wise gap
	 * 
	 * @param reportInputDataModel {@link ReportInputDataModel}
	 * @return
	 */
	public List<Map<String, String>> getIndicatorWiseGapReport(ReportInputDataModel reportInputDataModel);

	/**
	 * 
	 * @return IndicatorWiseGapReportDropDownModel
	 */ 
	
	public IndicatorWiseGapReportDropDownModel getDropDownData();
	
	
	public List<Map<String,String>> getImprovementForFacility(ReportInputDataModel reportInputDataModel);
	
	public List<Map<String,String>> getSubmisionData(int checklistId,List<String> submissionIds, int facilityId);
}
