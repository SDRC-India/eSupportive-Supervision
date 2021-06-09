package org.sdrc.ess.model.web;

public class MonitoringReportRequestModel {

	private Integer stateId;
	private Integer districtId;
	private Integer blockId;
	private String startDate;
	private String endDate;
	private Integer facilityTypeId;

	public Integer getStateId() {
		return stateId;
	}

	public void setStateId(Integer stateId) {
		this.stateId = stateId;
	}

	public Integer getDistrictId() {
		return districtId;
	}

	public void setDistrictId(Integer districtId) {
		this.districtId = districtId;
	}

	public Integer getBlockId() {
		return blockId;
	}

	public void setBlockId(Integer blockId) {
		this.blockId = blockId;
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

	public Integer getFacilityTypeId() {
		return facilityTypeId;
	}

	public void setFacilityTypeId(Integer facilityTypeId) {
		this.facilityTypeId = facilityTypeId;
	}

}
