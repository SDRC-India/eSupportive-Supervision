package org.sdrc.ess.model.mobile;

import java.util.List;

import org.sdrc.ess.model.web.RoleModel;

/**
 * 
 * This model class will help us to send master data to mobile
 * 
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 14-May-2017 11:28:29 am
 * @author Naseem Akhtar (naseem@sdrc.co.in) on 6th June 2017
 */
public class MasterDataModel {

	private UserModel userModel;
	private Integer errorCode;
	private String errorMessage;
	private List<TypeDetailModel> typeDetails;
	private List<TypeModel> typeList;
	private List<AreaModel> areaDetails;
	private List<RoleModel> roles;
	private List<DesignationModel> designations;
	private List<OrganizationModel> organizations;
	private Integer updateCode;
	private String updateStatus;
	private String lastSyncedDate;
	private int after_forgot_password;
	private String latestAppVersionName;

	public UserModel getUserModel() {
		return userModel;
	}

	public void setUserModel(UserModel userModel) {
		this.userModel = userModel;
	}
	
	public Integer getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(Integer errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public List<TypeDetailModel> getTypeDetails() {
		return typeDetails;
	}

	public void setTypeDetails(List<TypeDetailModel> typeDetails) {
		this.typeDetails = typeDetails;
	}

	public List<TypeModel> getTypeList() {
		return typeList;
	}

	public void setTypeList(List<TypeModel> typeList) {
		this.typeList = typeList;
	}

	public List<AreaModel> getAreaDetails() {
		return areaDetails;
	}

	public void setAreaDetails(List<AreaModel> areaDetails) {
		this.areaDetails = areaDetails;
	}

	public String getLastSyncedDate() {
		return lastSyncedDate;
	}

	public void setLastSyncedDate(String lastSyncedDate) {
		this.lastSyncedDate = lastSyncedDate;
	}

	public Integer getUpdateCode() {
		return updateCode;
	}

	public void setUpdateCode(Integer updateCode) {
		this.updateCode = updateCode;
	}

	public String getUpdateStatus() {
		return updateStatus;
	}

	public void setUpdateStatus(String updateStatus) {
		this.updateStatus = updateStatus;
	}

	public List<RoleModel> getRoles() {
		return roles;
	}

	public void setRoles(List<RoleModel> roles) {
		this.roles = roles;
	}

	public List<DesignationModel> getDesignations() {
		return designations;
	}

	public void setDesignations(List<DesignationModel> designations) {
		this.designations = designations;
	}

	public List<OrganizationModel> getOrganizations() {
		return organizations;
	}

	public void setOrganizations(List<OrganizationModel> organizations) {
		this.organizations = organizations;
	}

	public int getAfter_forgot_password() {
		return after_forgot_password;
	}

	public void setAfter_forgot_password(int after_forgot_password) {
		this.after_forgot_password = after_forgot_password;
	}

	public String getLatestAppVersionName() {
		return latestAppVersionName;
	}

	public void setLatestAppVersionName(String latestAppVersionName) {
		this.latestAppVersionName = latestAppVersionName;
	}	

}
