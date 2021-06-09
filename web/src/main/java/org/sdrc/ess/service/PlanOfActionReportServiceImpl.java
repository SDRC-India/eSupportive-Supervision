/**
 * 
 */
package org.sdrc.ess.service;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.sdrc.ess.domain.Area;
import org.sdrc.ess.domain.PlanOfAction;
import org.sdrc.ess.model.web.ReportInputDataModel;
import org.sdrc.ess.repository.AreaRepository;
import org.sdrc.ess.repository.PlanOfActionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Harsh Pratyush (harsh@sdrc.co.in)
 *
 */

@Service
public class PlanOfActionReportServiceImpl implements PlanOfActionReportService {

	
	@Autowired
	private PlanOfActionRepository planOfActionRepository;

	

	private SimpleDateFormat sdf=new SimpleDateFormat("dd/MM/yyyy");
	/* (non-Javadoc)
	 * @see org.sdrc.ess.service.PlanOfActionReportService#getPlanofActionForDistrict(org.sdrc.ess.model.web.ReportInputDataModel)
	 */
	@Override
	public List<Map<String, String>> getPlanofActionForDistrict(
			ReportInputDataModel reportModel) {
		

/*		List<PlanOfAction> allPlans=planOfActionRepository.findAll();
		List<PlanOfAction> planUpdate=new ArrayList<PlanOfAction>();
		
		for(PlanOfAction plan:allPlans)
		{
			Calendar calendar=Calendar.getInstance();
			
			calendar.setTime(plan.getDateOfVisit());
			
			calendar.add(Calendar.MONTH, plan.getTimeline());
			plan.setExcpectedDateOfCompletion(calendar.getTime());
			planUpdate.add(plan);
		}
		
		planOfActionRepository.save(planUpdate);*/
		
		List<Map<String,String>> planActionReportData=new ArrayList<Map<String,String>>();
		
		Map<String,String> planOfActionDataMap=new LinkedHashMap<String,String>();
		// code edited by sourav keshari nath
		int blockId,districtId = 0;
        if(reportModel.getBlockId()==0){
        	districtId = reportModel.getDistrictId();
        	blockId = 0;
        }else{
        	districtId = 0;
        	blockId = reportModel.getBlockId();
        }
		List<Object []> planOfActionDatas=planOfActionRepository.getCountOfOpenAndClosedPlanofActionForDistrict(districtId,blockId,reportModel.getChecklistType());
		int i=1;
		for(Object[] planOfActionData : planOfActionDatas)
		{
			planOfActionDataMap=new LinkedHashMap<String,String>();
			planOfActionDataMap.put("SI No.", String.valueOf(i++));
			planOfActionDataMap.put("District/Block",planOfActionData[0].toString());
			planOfActionDataMap.put("Facility Name", planOfActionData[1].toString());
			planOfActionDataMap.put("Facility Type", planOfActionData[2].toString());
			planOfActionDataMap.put("No.of action open", planOfActionData[3].toString());
			planOfActionDataMap.put("No. of action closed", planOfActionData[4].toString());
			planOfActionDataMap.put("facilityId", planOfActionData[5].toString());
			
			planActionReportData.add(planOfActionDataMap);
		}
		
		
		return planActionReportData;
	}

	/* (non-Javadoc)
	 * @see org.sdrc.ess.service.PlanOfActionReportService#getDelayedPlanofActionForDistrict(org.sdrc.ess.model.web.ReportInputDataModel)
	 */
	@Override
	public List<Map<String, String>> getDelayedPlanofActionForDistrict(
			ReportInputDataModel reportModel) {
		
		
		List<Map<String,String>> planActionReportData=new ArrayList<Map<String,String>>();
		
		Map<String,String> planOfActionDataMap=new LinkedHashMap<String,String>();
		Date currentDate = new Date(new java.util.Date().getTime());
		// code edited by sourav keshari nath
		int blockId,districtId = 0;
        if(reportModel.getBlockId()==0){
        	districtId = reportModel.getDistrictId();
        	blockId = 0;
        }else{
        	districtId = 0;
        	blockId = reportModel.getBlockId();
        }
		List<Object []> planOfActionDatas=planOfActionRepository.getCountOfDelayedPlanofActionForDistrict(districtId, blockId, reportModel.getChecklistType(), currentDate);
		int i=1;
		for(Object[] planOfActionData : planOfActionDatas)
		{
			planOfActionDataMap=new LinkedHashMap<String,String>();
			planOfActionDataMap.put("SI No.", String.valueOf(i++));
			planOfActionDataMap.put("District/Block",planOfActionData[0].toString());
			planOfActionDataMap.put("Facility Name", planOfActionData[1].toString());
			planOfActionDataMap.put("Facility Type", planOfActionData[2].toString());
			planOfActionDataMap.put("No.of action delayed", String.valueOf(Integer.parseInt(planOfActionData[3].toString())+Integer.parseInt(planOfActionData[4].toString())));
			planOfActionDataMap.put("facilityId", planOfActionData[5].toString());
			
			planActionReportData.add(planOfActionDataMap);
		}
		
		
		return planActionReportData;
	}

	@Override
	public List<Map<String, String>> getPlanOfActionForAFacility(
			int facilityId, int facilityType) {
		
		List<Map<String,String>> planActionReportData=new ArrayList<Map<String,String>>();
		Map<String,String> planOfActionDataMap=new LinkedHashMap<String,String>();
		
		List<PlanOfAction> planOfActions=planOfActionRepository.findByFacilityAreaNIdAndFormTypeIdOrderByStatusIdAscExcpectedDateOfCompletionAscDateOfVisitAsc(facilityId,facilityType);
		int i=1;
		for(PlanOfAction planOfAction : planOfActions)
		{
			planOfActionDataMap=new LinkedHashMap<String,String>();
			planOfActionDataMap.put("SI No.", String.valueOf(i++));
			planOfActionDataMap.put("Name of Person",planOfAction.getUser().getFirstName()+" "+planOfAction.getUser().getLastName());
			planOfActionDataMap.put("Visit Date", planOfAction.getDateOfVisit()==null?"-":sdf.format(planOfAction.getDateOfVisit()));
			planOfActionDataMap.put("Major Finding", planOfAction.getMajorFinding());
			planOfActionDataMap.put("Intervention Identified", planOfAction.getIntervention_activities());
			planOfActionDataMap.put("Responsibility",planOfAction.getResponsibility().getDesignation().getName());
			planOfActionDataMap.put("Timeline (in months)", String.valueOf(planOfAction.getTimeline()));
			planOfActionDataMap.put("Status", planOfAction.getStatus().getName());
			planActionReportData.add(planOfActionDataMap);
		}
		
		return planActionReportData;
	}

	@Override
	public List<Map<String, String>> getDelayedPlanOfActionForAFacility(
			int facilityId, int facilityType) {
		List<Map<String,String>> planActionReportData=new ArrayList<Map<String,String>>();
		Map<String,String> planOfActionDataMap=new LinkedHashMap<String,String>();
		Date currentDate = new Date(new java.util.Date().getTime());
		List<PlanOfAction> planOfActions=planOfActionRepository.findByFacilityAreaNIdAndExcpectedDateOfCompletionLessThanAndFormTypeIdOrderByStatusIdAscExcpectedDateOfCompletionAscDateOfVisitAsc(facilityId,currentDate,facilityType);
		int i=1;
		for(PlanOfAction planOfAction : planOfActions)
		{
			planOfActionDataMap=new LinkedHashMap<String,String>();
			planOfActionDataMap.put("SI No.", String.valueOf(i++));
			planOfActionDataMap.put("Name of Person",planOfAction.getUser().getFirstName()+" "+planOfAction.getUser().getLastName());
			planOfActionDataMap.put("Visit Date", sdf.format(planOfAction.getDateOfVisit()));
			planOfActionDataMap.put("Major Finding", planOfAction.getMajorFinding());
			planOfActionDataMap.put("Intervention Identified", planOfAction.getIntervention_activities());
			planOfActionDataMap.put("Responsibility",planOfAction.getResponsibility().getDesignation().getName());
			planOfActionDataMap.put("Timeline (in months)", String.valueOf(planOfAction.getTimeline()));
			planOfActionDataMap.put("Status", planOfAction.getStatus().getName());
			planActionReportData.add(planOfActionDataMap);
		}
		
		return planActionReportData;
	}

}
