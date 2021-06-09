package org.sdrc.ess.model.web;

import java.util.List;

public class PlanningFacilityAssessmentHistory {
	
	//private List<AreaWebModel> areaModel;
	
	private List<FacilityPlanningModel> facilityPlanningModel;
	
	private String startDate;

	private String endDate;

	private String serverDate;

	/*public List<AreaWebModel> getAreaModel() {
		return areaModel;
	}

	public void setAreaModel(List<AreaWebModel> areaModel) {
		this.areaModel = areaModel;
	}*/

	public List<FacilityPlanningModel> getFacilityPlanningModel() {
		return facilityPlanningModel;
	}

	public void setFacilityPlanningModel(List<FacilityPlanningModel> facilityPlanningModel) {
		this.facilityPlanningModel = facilityPlanningModel;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getServerDate() {
		return serverDate;
	}

	public void setServerDate(String serverDate) {
		this.serverDate = serverDate;
	}
	
	

}
