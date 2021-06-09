package org.sdrc.ess.model.web;

/**
*
* @author Debiprasad Parida (debiprasad@sdrc.co.in) on 05-08-2017 01:23 am
*
*/

public class PlanningModel {
	
	private int planningId;
	
	private String planDate; 
	
	private int facilityId;
	
	private int checklistId;
	
	private int visitPercentage;
	
	//GETTER SETTER **********************

	public int getPlanningId() {
		return planningId;
	}

	public void setPlanningId(int planningId) {
		this.planningId = planningId;
	}

	
	public String getPlanDate() {
		return planDate;
	}

	public void setPlanDate(String planDate) {
		this.planDate = planDate;
	}

	public int getFacilityId() {
		return facilityId;
	}

	public void setFacilityId(int facilityId) {
		this.facilityId = facilityId;
	}

	public int getChecklistId() {
		return checklistId;
	}

	public void setChecklistId(int checklistId) {
		this.checklistId = checklistId;
	}

	public int getVisitPercentage() {
		return visitPercentage;
	}

	public void setVisitPercentage(int visitPercentage) {
		this.visitPercentage = visitPercentage;
	}
	
	

}
