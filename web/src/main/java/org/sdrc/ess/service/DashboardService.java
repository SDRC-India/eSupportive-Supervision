/**
 * 
 */
package org.sdrc.ess.service;

import java.util.List;
import java.util.Map;

import org.sdrc.ess.model.web.DashboardLandingPageData;
import org.sdrc.ess.model.web.FacilityPushPinModel;
import org.sdrc.ess.model.web.FacilityViewModel;
import org.sdrc.ess.model.web.TimePeriodModel;
import org.sdrc.ess.model.web.ValueObject;

/**
 * @author Harsh Pratyush (harsh@sdrc.co.in)
 *
 */
public interface DashboardService {

	
	DashboardLandingPageData getLandingDashBoardData();

	DashboardLandingPageData getThematicViewData();
	
	List<ValueObject> getSection(Integer checklistId);
	
	List<ValueObject> getSubSection(Integer sectionId);
	
	List<TimePeriodModel> getTimeperiodForDashboard();
	
	List<FacilityPushPinModel> getAllPushPinFacililityData(Integer blockId,Integer checklistId, Integer subsection,String startDate, String endDate, Integer facilityTypeId) throws Exception;
	
	FacilityViewModel  getTabularDateForFacilityView(Integer stateId,Integer districtId,Integer blockId,Integer checkListId,Integer timeperiodId,Integer sesctionId, Integer facilityTypeId);
	
	public List<Map<String,String>> getSubmisionData(int checklistId,List<String> submissionIds,int facilityId);
	
}
