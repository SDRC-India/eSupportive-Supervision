/**
 * 
 */
package org.sdrc.ess.service;

import java.util.List;
import java.util.Map;

import org.sdrc.ess.model.web.ReportInputDataModel;

/**
 * @author Harsh Pratyush (harsh@sdrc.co.in)
 *
 */
public interface PlanOfActionReportService {

	/**
	 * 
	 * @param reportModel {@link ReportInputDataModel}
	 * @return
	 */
	public List<Map<String,String>> getPlanofActionForDistrict(ReportInputDataModel reportModel);	
	
	
	/**
	 * 
	 * @param reportModel {@link ReportInputDataModel}
	 * @return
	 */
	public List<Map<String,String>> getDelayedPlanofActionForDistrict(ReportInputDataModel reportModel);
	
	
	/**
	 * 
	 * @param facilityId
	 * @param facilityType
	 * @return
	 */
	public List<Map<String,String>> getPlanOfActionForAFacility(int facilityId,int facilityType);
	
	/**
	 * 
	 * @param facilityId
	 * @param facilityType
	 * @return
	 */
	public List<Map<String,String>> getDelayedPlanOfActionForAFacility(int facilityId,int facilityType);
}
