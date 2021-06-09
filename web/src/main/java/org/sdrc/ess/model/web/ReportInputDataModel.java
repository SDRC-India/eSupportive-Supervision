/**
 * 
 */
package org.sdrc.ess.model.web;

/**
 * @author Harsh Pratyush (harsh@sdrc.co.in)
 * This model will receive the input parameters for the report page
 */
public class ReportInputDataModel {

	private int checklistType;
	
	private int startTimePeriodId;
	
	private int endTimePeriodId;
	
	private int districtId;
	
	private int blockId;
	
	private int facilityTypeId;
	
	private int sectorId;
	
	private String submisionIDs;
	
	private int facilityId;

	public String getSubmisionIDs() {
		return submisionIDs;
	}

	public void setSubmisionIDs(String submisionIDs) {
		this.submisionIDs = submisionIDs;
	}

	public int getChecklistType() {
		return checklistType;
	}

	public void setChecklistType(int checklistType) {
		this.checklistType = checklistType;
	}

	public int getStartTimePeriodId() {
		return startTimePeriodId;
	}

	public void setStartTimePeriodId(int startTimePeriodId) {
		this.startTimePeriodId = startTimePeriodId;
	}

	public int getEndTimePeriodId() {
		return endTimePeriodId;
	}

	public void setEndTimePeriodId(int endTimePeriodId) {
		this.endTimePeriodId = endTimePeriodId;
	}

	public int getDistrictId() {
		return districtId;
	}

	public void setDistrictId(int districtId) {
		this.districtId = districtId;
	}

	public int getBlockId() {
		return blockId;
	}

	public void setBlockId(int blockId) {
		this.blockId = blockId;
	}

	public int getFacilityTypeId() {
		return facilityTypeId;
	}

	public void setFacilityTypeId(int facilityTypeId) {
		this.facilityTypeId = facilityTypeId;
	}

	public int getSectorId() {
		return sectorId;
	}

	public void setSectorId(int sectorId) {
		this.sectorId = sectorId;
	}

	public int getFacilityId() {
		return facilityId;
	}

	public void setFacilityId(int facilityId) {
		this.facilityId = facilityId;
	}
	
	
}
