package org.sdrc.ess.model.web;


public class UserDesignationFeaturePermissionMappingModel {

	private int userRoleFeaturePermissionId;
	
	private RoleFeaturePermissionSchemeModel roleFeaturePermissionSchemeModel;
	
	private ValueObject userDetailModel;
	
	private String updatedDate;
	
	private String updatedBy;
	
	public int getUserRoleFeaturePermissionId() {
		return userRoleFeaturePermissionId;
	}

	public RoleFeaturePermissionSchemeModel getRoleFeaturePermissionSchemeModel() {
		return roleFeaturePermissionSchemeModel;
	}

	public ValueObject getUserDetailModel() {
		return userDetailModel;
	}

	public String getUpdatedDate() {
		return updatedDate;
	}

	public String getUpdatedBy() {
		return updatedBy;
	}

	public void setUserRoleFeaturePermissionId(int userRoleFeaturePermissionId) {
		this.userRoleFeaturePermissionId = userRoleFeaturePermissionId;
	}

	public void setRoleFeaturePermissionSchemeModel(RoleFeaturePermissionSchemeModel roleFeaturePermissionSchemeModel) {
		this.roleFeaturePermissionSchemeModel = roleFeaturePermissionSchemeModel;
	}

	public void setUserDetailModel(ValueObject userDetailModel) {
		this.userDetailModel = userDetailModel;
	}

	public void setUpdatedDate(String updatedDate) {
		this.updatedDate = updatedDate;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	
}
