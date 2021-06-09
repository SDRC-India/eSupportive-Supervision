package org.sdrc.ess.model.mobile;

import org.json.simple.JSONObject;
import org.sdrc.ess.model.web.RoleModel;

/**
 * This class is going to help us take user data to mobile device
 * 
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 14-May-2017 11:31:49 am
 */
public class UserModel {

	private Integer userId;
	private String name;
	private String email;
	private JSONObject areas;
	private String userName;
	private String password;
	private DesignationModel designation;
	private RoleModel role;
	private OrganizationModel organization;
	// private DesignationAreaOrganizationRoleMappingModel
	// designationAreaOrganizationRoleMappingModel;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public JSONObject getAreas() {
		return areas;
	}

	public void setAreas(JSONObject areas) {
		this.areas = areas;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public DesignationModel getDesignation() {
		return designation;
	}

	public void setDesignation(DesignationModel designation) {
		this.designation = designation;
	}

	public RoleModel getRole() {
		return role;
	}

	public void setRole(RoleModel role) {
		this.role = role;
	}

	public OrganizationModel getOrganization() {
		return organization;
	}

	public void setOrganization(OrganizationModel organization) {
		this.organization = organization;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

}
