package org.sdrc.ess.model.mobile;

import org.sdrc.ess.model.web.RoleModel;

public class DesignationAreaOrganizationRoleMappingModel {

	private Integer id;
	private DesignationModel designation;
	private AreaModel area;
	private OrganizationModel organization;
	private RoleModel role;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public DesignationModel getDesignation() {
		return designation;
	}

	public void setDesignation(DesignationModel designation) {
		this.designation = designation;
	}

	public AreaModel getArea() {
		return area;
	}

	public void setArea(AreaModel area) {
		this.area = area;
	}

	public OrganizationModel getOrganization() {
		return organization;
	}

	public void setOrganization(OrganizationModel organization) {
		this.organization = organization;
	}

	public RoleModel getRole() {
		return role;
	}

	public void setRole(RoleModel role) {
		this.role = role;
	}

}
