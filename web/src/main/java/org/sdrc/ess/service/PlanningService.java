package org.sdrc.ess.service;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

import org.sdrc.ess.model.mobile.AreaModel;
import org.sdrc.ess.model.web.DoughnutChartModel;
import org.sdrc.ess.model.web.ErrorClass;
import org.sdrc.ess.model.web.PlanningFacilityAssessmentHistory;
import org.sdrc.ess.model.web.PlanningModel;
import org.sdrc.ess.model.web.TimePeriodModel;
import org.sdrc.ess.model.web.ValueObject;

/**
*
* @author Debiprasad Parida (debiprasad@sdrc.co.in) on 05-08-2017 01:23 am
*
*/

public interface PlanningService {
	
	public ErrorClass planFacility(PlanningModel planningModel);
	
	public ErrorClass releasePlanning(Integer planningId)throws Exception ;
	
	public PlanningFacilityAssessmentHistory getPlanningData(Integer checklistId)  throws ParseException;
	
	public void saveVisitedDate(int userId,int facilityId, int checklistId, Date visitedDate,Long submissionId)throws ParseException;
	
	public List<AreaModel> getAllAreaLoginwise();
	
	public List<DoughnutChartModel> getDataForDoughnutChart(int checklistId)throws ParseException;
	
	public List<ValueObject> getLastVisitData(int facilityId,int checkListId);
	
	public List<DoughnutChartModel> getTrendChartData(Integer checklistId) throws ParseException;
	
	
	public List<TimePeriodModel> getAllTimePeriod();
	
	public Boolean checkPlanavailablity(Integer facilityId, Integer checklistId, String plannedDate)throws ParseException;
	

}
