package org.sdrc.ess.domain;

import java.sql.Timestamp;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "plan_of_action")
public class PlanOfAction {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_pk")
	private Integer id;

	private String majorFinding;
	private String intervention_activities;

	@ManyToOne
	@JoinColumn(name = "responsibility_id_fk")
	private DesignationAreaOrganizationRoleMapping responsibility;

	private Integer timeline;

	@ManyToOne
	@JoinColumn(name = "level_of_intervention_id_fk")
	private Role levelOfIntervention;

	@ManyToOne
	@JoinColumn(name = "type_id_fk")
	private TypeDetail sectionType;

	@Column(name = "created_date")
	private Timestamp createdDate;

	@Column(name = "updated_date")
	private Timestamp updatedDate;

	@Column(name = "is_latest")
	private Boolean isLatest;

	@ManyToOne
	@JoinColumn(name = "facility_id", nullable = false)
	private Area facility;

	@ManyToOne
	@JoinColumn(name = "form_type_id_fk", nullable = false)
	private TypeDetail formType;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private EssUser user;

	@Column(name = "date_of_completion", columnDefinition = "Date default Null")
	private Date dateOfCompletion;

	@ManyToOne
	@JoinColumn(name = "status", columnDefinition = "int default 139")
	private TypeDetail status;

	private String remarks;

	@Column(name = "recieved_date")
	private Date recievedDate;

	@Column(name = "date_of_visit")
	private Date dateOfVisit;

	@ManyToOne
	@JoinColumn(name = "district_id_fk")
	private Area district;

	@ManyToOne
	@JoinColumn(name = "block_id_fk")
	private Area block;
	
	@Column(name="excpected_date_completion")
	private Date excpectedDateOfCompletion;

	public Integer getId() {
		return id;
	}

	public String getMajorFinding() {
		return majorFinding;
	}

	public void setMajorFinding(String majorFinding) {
		this.majorFinding = majorFinding;
	}

	public String getIntervention_activities() {
		return intervention_activities;
	}

	public void setIntervention_activities(String intervention_activities) {
		this.intervention_activities = intervention_activities;
	}

	public Role getLevelOfIntervention() {
		return levelOfIntervention;
	}

	public void setLevelOfIntervention(Role levelOfIntervention) {
		this.levelOfIntervention = levelOfIntervention;
	}

	public DesignationAreaOrganizationRoleMapping getResponsibility() {
		return responsibility;
	}

	public void setResponsibility(DesignationAreaOrganizationRoleMapping responsibility) {
		this.responsibility = responsibility;
	}

	public Integer getTimeline() {
		return timeline;
	}

	public void setTimeline(Integer timeline) {
		this.timeline = timeline;
	}

	public TypeDetail getSectionType() {
		return sectionType;
	}

	public void setSectionType(TypeDetail sectionType) {
		this.sectionType = sectionType;
	}

	public Timestamp getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Timestamp createdDate) {
		this.createdDate = createdDate;
	}

	public Boolean getIsLatest() {
		return isLatest;
	}

	public void setIsLatest(Boolean isLatest) {
		this.isLatest = isLatest;
	}

	public Area getFacility() {
		return facility;
	}

	public void setFacility(Area facility) {
		this.facility = facility;
	}

	public TypeDetail getFormType() {
		return formType;
	}

	public void setFormType(TypeDetail formType) {
		this.formType = formType;
	}

	public EssUser getUser() {
		return user;
	}

	public void setUser(EssUser user) {
		this.user = user;
	}

	public Date getDateOfCompletion() {
		return dateOfCompletion;
	}

	public void setDateOfCompletion(Date dateOfCompletion) {
		this.dateOfCompletion = dateOfCompletion;
	}

	public TypeDetail getStatus() {
		return status;
	}

	public void setStatus(TypeDetail status) {
		this.status = status;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public Date getRecievedDate() {
		return recievedDate;
	}

	public void setRecievedDate(Date recievedDate) {
		this.recievedDate = recievedDate;
	}

	public Date getDateOfVisit() {
		return dateOfVisit;
	}

	public void setDateOfVisit(Date dateOfVisit) {
		this.dateOfVisit = dateOfVisit;
	}

	public Timestamp getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Timestamp updatedDate) {
		this.updatedDate = updatedDate;
	}

	public Area getDistrict() {
		return district;
	}

	public void setDistrict(Area district) {
		this.district = district;
	}

	public Area getBlock() {
		return block;
	}

	public void setBlock(Area block) {
		this.block = block;
	}

	public Date getExcpectedDateOfCompletion() {
		return excpectedDateOfCompletion;
	}

	public void setExcpectedDateOfCompletion(Date excpectedDateOfCompletion) {
		this.excpectedDateOfCompletion = excpectedDateOfCompletion;
	}

}
