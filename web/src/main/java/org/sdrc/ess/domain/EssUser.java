package org.sdrc.ess.domain;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 * This class is going to help us manage user data
 * 
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 14-May-2017 11:11:41 am
 * @author Sarita Panigrahi (sarita@sdrc.co.in) updated on 13-June-2017 05:11:41
 *         pm
 * @author Naseem Akhtar (naseem@sdrc.co.in) updated on 7th August 2017 1916
 *         Ratikanta added old password
 * 
 */
@Entity
@Table(name = "ess_user")
public class EssUser implements Cloneable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_pk")
	private Integer id;

	// *************************personal information starts here
	// *************************
	@ManyToOne
	@JoinColumn(name = "salutation_id_fk")
	private TypeDetail salutation;

	@Column(name = "first_name", nullable = false)
	private String firstName;

	@Column(name = "middle_name")
	private String middleName;

	@Column(name = "last_name", nullable = false)
	private String lastName;

	@ManyToOne
	@JoinColumn(name = "gender_id_fk", nullable = false)
	private TypeDetail gender;

	@ManyToOne
	@JoinColumn(name = "develomentPartner_id_fk")
	private TypeDetail develomentpartner;

	@Column(nullable = false)
	private Date birthday;

	@Column(name = "phoneNo", length = 10, nullable = false)
	private String phoneNo; // ask for confirmation to keep as String or Integer

	@Column(name = "primary_email_id", nullable = false)
	private String primaryEmailId;

	@Column(name = "secondary_email_id")
	private String secondaryEmailId;

	@Column(name = "photo_file_path", length = 1000)
	private String photoFilePath;

	@Column(name = "reporting_to")
	private Integer reportingToUserId;

	@Column(nullable = false, unique = true)
	private String username; // user id

	@Column(nullable = true)
	private String password;

	@Column(name = "adhar_card_photo_file_path")
	private String adharCardPhotoFilePath;

	@Column(name = "adhar_card_number")
	private String adharCardPhotoNumber;

	@Column(name = "pan_card_photo_file_path")
	private String panCardPhotoFilePath;

	@Column(name = "pan_card_number")
	private String panCardPhotoNumber;

	@Column(name = "created_date")
	private Timestamp createdDate;

	@Column(name = "updated_date")
	private Timestamp updatedDate;

	@Column(name = "approve_reject_date")
	private Timestamp approveOrRejectDate;

	@Column(name = "rejection_reason")
	private String rejectionReason;

	@OneToOne
	@JoinColumn(name = "area_mapping_fk")
	private UserAreaMapping userAreaMappings;

	@Column(name = "is_live")
	private Boolean isLive;

	@Column(name = "is_active")
	private Boolean isActive;

	@Column(name = "is_approved")
	private Boolean isApproved;

	@OneToOne
	@JoinColumn(name = "desig_area_org_role_map_id_fk")
	private DesignationAreaOrganizationRoleMapping designationAreaOrganizationRoleMapping;

	@OneToMany(mappedBy = "essUser")
	private List<UserRegistrationMetaData> userRegistrationMetaDatas;

	@OneToMany(mappedBy = "user")
	private List<PlanOfAction> user;

	@OneToMany(mappedBy = "essUser")
	private List<UserCredentialsMetaData> userCredentialsMetaData;

	@OneToMany(mappedBy = "user")
	private List<FacilityData> facilityData;

	@OneToMany(mappedBy = "user")
	private List<CommunityData> communityData;

	@OneToMany(mappedBy = "essUser")
	private List<UserLoginMeta> userLoginMetas;

	@ManyToOne
	@JoinColumn(name = "in_charge_facility_id_fk")
	private Area inChargeFacilityId;

	public EssUser() {

	}

	public EssUser(Integer id) {
		this.id = id;
	}
	// getter setter starts here

	public TypeDetail getDevelomentpartner() {
		return develomentpartner;
	}

	public void setDevelomentpartner(TypeDetail develomentpartner) {
		this.develomentpartner = develomentpartner;
	}

	public Integer getId() {
		return id;
	}

	public Boolean getIsLive() {
		return isLive;
	}

	public void setIsLive(Boolean isLive) {
		this.isLive = isLive;
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

	public TypeDetail getSalutation() {
		return salutation;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public TypeDetail getGender() {
		return gender;
	}

	public Date getBirthday() {
		return birthday;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public String getPrimaryEmailId() {
		return primaryEmailId;
	}

	public String getSecondaryEmailId() {
		return secondaryEmailId;
	}

	public String getPhotoFilePath() {
		return photoFilePath;
	}

	public String getAdharCardPhotoFilePath() {
		return adharCardPhotoFilePath;
	}

	public String getAdharCardPhotoNumber() {
		return adharCardPhotoNumber;
	}

	public String getPanCardPhotoFilePath() {
		return panCardPhotoFilePath;
	}

	public String getPanCardPhotoNumber() {
		return panCardPhotoNumber;
	}

	public void setSalutation(TypeDetail salutation) {
		this.salutation = salutation;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public void setGender(TypeDetail gender) {
		this.gender = gender;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public void setPrimaryEmailId(String primaryEmailId) {
		this.primaryEmailId = primaryEmailId;
	}

	public void setSecondaryEmailId(String secondaryEmailId) {
		this.secondaryEmailId = secondaryEmailId;
	}

	public void setPhotoFilePath(String photoFilePath) {
		this.photoFilePath = photoFilePath;
	}

	public void setAdharCardPhotoFilePath(String adharCardPhotoFilePath) {
		this.adharCardPhotoFilePath = adharCardPhotoFilePath;
	}

	public void setAdharCardPhotoNumber(String adharCardPhotoNumber) {
		this.adharCardPhotoNumber = adharCardPhotoNumber;
	}

	public void setPanCardPhotoFilePath(String panCardPhotoFilePath) {
		this.panCardPhotoFilePath = panCardPhotoFilePath;
	}

	public void setPanCardPhotoNumber(String panCardPhotoNumber) {
		this.panCardPhotoNumber = panCardPhotoNumber;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public Timestamp getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Timestamp createdDate) {
		this.createdDate = createdDate;
	}

	public Timestamp getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Timestamp updatedDate) {
		this.updatedDate = updatedDate;
	}

	public UserAreaMapping getUserAreaMappings() {
		return userAreaMappings;
	}

	public void setUserAreaMappings(UserAreaMapping userAreaMappings) {
		this.userAreaMappings = userAreaMappings;
	}

	public boolean isLive() {
		return isLive;
	}

	public void setLive(boolean isLive) {
		this.isLive = isLive;
	}

	public Integer getReportingToUserId() {
		return reportingToUserId;
	}

	public void setReportingToUserId(Integer reportingToUserId) {
		this.reportingToUserId = reportingToUserId;
	}

	public List<UserRegistrationMetaData> getUserRegistrationMetaDatas() {
		return userRegistrationMetaDatas;
	}

	public void setUserRegistrationMetaDatas(List<UserRegistrationMetaData> userRegistrationMetaDatas) {
		this.userRegistrationMetaDatas = userRegistrationMetaDatas;
	}

	public DesignationAreaOrganizationRoleMapping getDesignationAreaOrganizationRoleMapping() {
		return designationAreaOrganizationRoleMapping;
	}

	public void setDesignationAreaOrganizationRoleMapping(
			DesignationAreaOrganizationRoleMapping designationAreaOrganizationRoleMapping) {
		this.designationAreaOrganizationRoleMapping = designationAreaOrganizationRoleMapping;
	}

	public List<UserCredentialsMetaData> getUserCredentialsMetaData() {
		return userCredentialsMetaData;
	}

	public void setUserCredentialsMetaData(List<UserCredentialsMetaData> userCredentialsMetaData) {
		this.userCredentialsMetaData = userCredentialsMetaData;
	}

	public Object clone() throws CloneNotSupportedException {
		return super.clone();
	}

	public Timestamp getApproveOrRejectDate() {
		return approveOrRejectDate;
	}

	public void setApproveOrRejectDate(Timestamp approveOrRejectDate) {
		this.approveOrRejectDate = approveOrRejectDate;
	}

	public String getRejectionReason() {
		return rejectionReason;
	}

	public void setRejectionReason(String rejectionReason) {
		this.rejectionReason = rejectionReason;
	}

	public Area getInChargeFacilityId() {
		return inChargeFacilityId;
	}

	public void setInChargeFacilityId(Area inChargeFacilityId) {
		this.inChargeFacilityId = inChargeFacilityId;
	}

}
