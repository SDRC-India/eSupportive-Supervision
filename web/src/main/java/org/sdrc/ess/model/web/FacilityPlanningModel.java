package org.sdrc.ess.model.web;

import java.util.List;
import java.util.Map;

/**
*
* @author Debiprasad Parida (debiprasad@sdrc.co.in) on 06-08-2017 02:20 am
*
*/

public class FacilityPlanningModel {
	
	private int facilityId;
	
	private String facilityName;
	
	private List<ValueObject> plannedHistory;
	
	//private Map<String,List<AssessmentHistory>> assessmentHistory;
	
	private boolean isPlanned;
	
	private List<ValueObject> realeaseDate;
	
	private int parentId;
	
	private int stateId;
	
	//private boolean isPending;
	
	//private int checklistId;
	
	private boolean isPriority;

	
	public int getFacilityId() {
		return facilityId;
	}

	public void setFacilityId(int facilityId) {
		this.facilityId = facilityId;
	}

	public String getFacilityName() {
		return facilityName;
	}

	public void setFacilityName(String facilityName) {
		this.facilityName = facilityName;
	}

	public List<ValueObject> getPlannedHistory() {
		return plannedHistory;
	}

	public void setPlannedHistory(List<ValueObject> plannedHistory) {
		this.plannedHistory = plannedHistory;
	}

	/*public Map<String, List<AssessmentHistory>> getAssessmentHistory() {
		return assessmentHistory;
	}

	public void setAssessmentHistory(Map<String, List<AssessmentHistory>> assessmentHistory) {
		this.assessmentHistory = assessmentHistory;
	}*/

	public boolean isPlanned() {
		return isPlanned;
	}

	public void setPlanned(boolean isPlanned) {
		this.isPlanned = isPlanned;
	}

	public List<ValueObject> getRealeaseDate() {
		return realeaseDate;
	}

	public void setRealeaseDate(List<ValueObject> realeaseDate) {
		this.realeaseDate = realeaseDate;
	}

	public int getParentId() {
		return parentId;
	}

	public void setParentId(int parentId) {
		this.parentId = parentId;
	}

	public int getStateId() {
		return stateId;
	}

	public void setStateId(int stateId) {
		this.stateId = stateId;
	}

	/*public boolean isPending() {
		return isPending;
	}

	public void setPending(boolean isPending) {
		this.isPending = isPending;
	}*/

	/*public int getChecklistId() {
		return checklistId;
	}

	public void setChecklistId(int checklistId) {
		this.checklistId = checklistId;
	}*/

	public boolean isPriority() {
		return isPriority;
	}

	public void setPriority(boolean isPriority) {
		this.isPriority = isPriority;
	}
	
	
	

}
