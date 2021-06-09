package org.sdrc.ess.model.web;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

//@NotBlank: The string is not null and the trimmed length is greater than zero.
/**
 * @author Sarita Panigrahi created on: 20-07-2017 For user registration
 *
 */

@JsonIgnoreProperties(ignoreUnknown = true)
public class EssUserModel {

	private Integer userId;

	// *************************personal information starts here
	// *************************
	@NotNull
	private Integer salutationId;

	private String salutation;

	@NotBlank
	private String firstName;

	private String middleName;

	@NotBlank
	private String lastName;

	private String fullName;

	@NotNull
	private Integer gender;

	// @Past
	// @DateTimeFormat(pattern="dd-MM-yyyy")
	// private Date birthday;

	@NotNull
	private String birthday;

	@NotBlank
	private String phoneNo; // ask for confirmation to keep as String or Integer

	@NotBlank
	@Email
	private String primaryEmailId;

	@Email
	private String secondaryEmailId;

	private String photoFilePath;

	// **************************personal information ends here
	// *************************

	// *************************professional information starts here
	// *************************

	@NotNull
	private Integer designationId;

	private String designationName;

	private Integer organizationId;

	private String organizationName;

	private Integer reportingToUserId;

	private String reportingToUserName;

	// *************************professional information ends here
	// *************************

	// *************************identical information starts here
	// *************************

	@NotBlank
	private String username; // user id

	private String password;

	// @NotBlank
	private String adharCardPhotoFilePath;

	private String adharCardPhotoFilePathName;

	// @NotBlank
	private String adharCardPhotoNumber;

	private String panCardPhotoFilePath;

	private String panCardPhotoFilePathName;

	private String panCardPhotoNumber;

	private Boolean isLive;

	private Boolean isActive;

	private Boolean isApproved;

	// *************************identical information ends here
	// *************************

	private Integer stateId;

	private Integer districtId;

	private Integer blockId;

	private Integer facilityId;

	private String location;

	private String createdDate;

	private String updatedDate;

	private List<UserDesignationFeaturePermissionMappingModel> userDesignationFeaturePermissionMappingModels;

	private Integer develomentpartner;

	private Integer userLevel;

	private String approveRejectDate;

	private String rejectionReason;

	private Integer inChargeFacilityId;

	private String inChargeFacilityName;

	private String inChargeFacilityTypeName;

	private Integer inChargeBlockId;

	/**
	 * @author Sarita Panigrahi for login meta info
	 */
	private Long userLoginMetaId;
	// getter and setter

	public Integer getUserLevel() {
		return userLevel;
	}

	public void setUserLevel(Integer userLevel) {
		this.userLevel = userLevel;
	}

	public Integer getDevelomentpartner() {
		return develomentpartner;
	}

	public void setDevelomentpartner(Integer develomentpartner) {
		this.develomentpartner = develomentpartner;
	}

	public Integer getSalutationId() {
		return salutationId;
	}

	public Integer getOrganizationId() {
		return organizationId;
	}

	public void setOrganizationId(Integer organizationId) {
		this.organizationId = organizationId;
	}

	public String getOrganizationName() {
		return organizationName;
	}

	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
	}

	public List<UserDesignationFeaturePermissionMappingModel> getUserDesignationFeaturePermissionMappingModels() {
		return userDesignationFeaturePermissionMappingModels;
	}

	public void setUserDesignationFeaturePermissionMappingModels(
			List<UserDesignationFeaturePermissionMappingModel> userDesignationFeaturePermissionMappingModels) {
		this.userDesignationFeaturePermissionMappingModels = userDesignationFeaturePermissionMappingModels;
	}

	public String getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	public String getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(String updatedDate) {
		this.updatedDate = updatedDate;
	}

	public String getAdharCardPhotoFilePathName() {
		return adharCardPhotoFilePathName;
	}

	public void setAdharCardPhotoFilePathName(String adharCardPhotoFilePathName) {
		this.adharCardPhotoFilePathName = adharCardPhotoFilePathName;
	}

	public String getPanCardPhotoFilePathName() {
		return panCardPhotoFilePathName;
	}

	public void setPanCardPhotoFilePathName(String panCardPhotoFilePathName) {
		this.panCardPhotoFilePathName = panCardPhotoFilePathName;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getSalutation() {
		return salutation;
	}

	public void setSalutation(String salutation) {
		this.salutation = salutation;
	}

	public String getDesignationName() {
		return designationName;
	}

	public void setDesignationName(String designationName) {
		this.designationName = designationName;
	}

	public String getReportingToUserName() {
		return reportingToUserName;
	}

	public void setReportingToUserName(String reportingToUserName) {
		this.reportingToUserName = reportingToUserName;
	}

	public Boolean getIsLive() {
		return isLive;
	}

	public void setIsLive(Boolean isLive) {
		this.isLive = isLive;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

	public Boolean getIsApproved() {
		return isApproved;
	}

	public void setIsApproved(Boolean isApproved) {
		this.isApproved = isApproved;
	}

	public void setSalutationId(Integer salutationId) {
		this.salutationId = salutationId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Integer getGender() {
		return gender;
	}

	public void setGender(Integer gender) {
		this.gender = gender;
	}

	public String getBirthday() {
		return birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getPrimaryEmailId() {
		return primaryEmailId;
	}

	public void setPrimaryEmailId(String primaryEmailId) {
		this.primaryEmailId = primaryEmailId;
	}

	public String getSecondaryEmailId() {
		return secondaryEmailId;
	}

	public void setSecondaryEmailId(String secondaryEmailId) {
		this.secondaryEmailId = secondaryEmailId;
	}

	public Integer getDesignationId() {
		return designationId;
	}

	public void setDesignationId(Integer designationId) {
		this.designationId = designationId;
	}

	public Integer getReportingToUserId() {
		return reportingToUserId;
	}

	public void setReportingToUserId(Integer reportingToUserId) {
		this.reportingToUserId = reportingToUserId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAdharCardPhotoNumber() {
		return adharCardPhotoNumber;
	}

	public void setAdharCardPhotoNumber(String adharCardPhotoNumber) {
		this.adharCardPhotoNumber = adharCardPhotoNumber;
	}

	public String getPanCardPhotoNumber() {
		return panCardPhotoNumber;
	}

	public void setPanCardPhotoNumber(String panCardPhotoNumber) {
		this.panCardPhotoNumber = panCardPhotoNumber;
	}

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

	public Integer getFacilityId() {
		return facilityId;
	}

	public void setFacilityId(Integer facilityId) {
		this.facilityId = facilityId;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getPhotoFilePath() {
		return photoFilePath;
	}

	public void setPhotoFilePath(String photoFilePath) {
		this.photoFilePath = photoFilePath;
	}

	public String getAdharCardPhotoFilePath() {
		return adharCardPhotoFilePath;
	}

	public void setAdharCardPhotoFilePath(String adharCardPhotoFilePath) {
		this.adharCardPhotoFilePath = adharCardPhotoFilePath;
	}

	public String getPanCardPhotoFilePath() {
		return panCardPhotoFilePath;
	}

	public void setPanCardPhotoFilePath(String panCardPhotoFilePath) {
		this.panCardPhotoFilePath = panCardPhotoFilePath;
	}

	public String getApproveRejectDate() {
		return approveRejectDate;
	}

	public void setApproveRejectDate(String approveRejectDate) {
		this.approveRejectDate = approveRejectDate;
	}

	public String getRejectionReason() {
		return rejectionReason;
	}

	public void setRejectionReason(String rejectionReason) {
		this.rejectionReason = rejectionReason;
	}

	public Long getUserLoginMetaId() {
		return userLoginMetaId;
	}

	public void setUserLoginMetaId(Long userLoginMetaId) {
		this.userLoginMetaId = userLoginMetaId;
	}

	public Integer getInChargeFacilityId() {
		return inChargeFacilityId;
	}

	public void setInChargeFacilityId(Integer inChargeFacilityId) {
		this.inChargeFacilityId = inChargeFacilityId;
	}

	public String getInChargeFacilityName() {
		return inChargeFacilityName;
	}

	public void setInChargeFacilityName(String inChargeFacilityName) {
		this.inChargeFacilityName = inChargeFacilityName;
	}

	public String getInChargeFacilityTypeName() {
		return inChargeFacilityTypeName;
	}

	public void setInChargeFacilityTypeName(String inChargeFacilityTypeName) {
		this.inChargeFacilityTypeName = inChargeFacilityTypeName;
	}

	public Integer getInChargeBlockId() {
		return inChargeBlockId;
	}

	public void setInChargeBlockId(Integer inChargeBlockId) {
		this.inChargeBlockId = inChargeBlockId;
	}

}
