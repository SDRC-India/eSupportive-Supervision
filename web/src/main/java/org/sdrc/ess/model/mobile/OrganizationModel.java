package org.sdrc.ess.model.mobile;

public class OrganizationModel {

	private Integer id;
	private String organizationName;
	private Boolean isGovernmentOrg;

	// private Timestamp createdDate;
	// private Timestamp updatedDate;
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getOrganizationName() {
		return organizationName;
	}

	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
	}

	public Boolean getIsGovernmentOrg() {
		return isGovernmentOrg;
	}

	public void setIsGovernmentOrg(Boolean isGovernmentOrg) {
		this.isGovernmentOrg = isGovernmentOrg;
	}

}
