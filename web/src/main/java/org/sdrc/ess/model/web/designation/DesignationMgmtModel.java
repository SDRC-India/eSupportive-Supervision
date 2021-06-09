package org.sdrc.ess.model.web.designation;

public class DesignationMgmtModel {

	private Integer organizationId;
	private Integer areaNId;
	private Integer roleId;
	private String designationName;
	private Boolean isResponsibleFacility;
	private Boolean isResponsibleCommunity;
	private Boolean isFacilityInCharge;

	public Integer getOrganizationId() {
		return organizationId;
	}

	public void setOrganizationId(Integer organizationId) {
		this.organizationId = organizationId;
	}

	public Integer getAreaNId() {
		return areaNId;
	}

	public void setAreaNId(Integer areaNId) {
		this.areaNId = areaNId;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public String getDesignationName() {
		return designationName;
	}

	public void setDesignationName(String designationName) {
		this.designationName = designationName;
	}

	public Boolean getIsResponsibleFacility() {
		return isResponsibleFacility;
	}

	public void setIsResponsibleFacility(Boolean isResponsibleFacility) {
		this.isResponsibleFacility = isResponsibleFacility;
	}

	public Boolean getIsResponsibleCommunity() {
		return isResponsibleCommunity;
	}

	public void setIsResponsibleCommunity(Boolean isResponsibleCommunity) {
		this.isResponsibleCommunity = isResponsibleCommunity;
	}

	public Boolean getIsFacilityInCharge() {
		return isFacilityInCharge;
	}

	public void setIsFacilityInCharge(Boolean isFacilityInCharge) {
		this.isFacilityInCharge = isFacilityInCharge;
	}

}
