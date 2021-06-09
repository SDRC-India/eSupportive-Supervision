package org.sdrc.ess.model.mobile;

public class PlanOfActionModel {

	/**
	 * for both web and mobile
	 */
	private Integer id;
	private String majorFindings;
	private String intervention_activities;
	private Integer timeline;

	/**
	 * for mobile
	 */
	private Integer responsibility;
	private Integer levelOfIntervention;
	private Integer sectionType;
	private Integer facilityId;
	private Integer formType;
	private Integer userId;
	private Integer organizationId;

	/**
	 * for web (open items)
	 */
	private String dateOfCompletion;
	private String recievedDate;
	private String dateOfVisit;
	private Integer status;
	private String remarks;
	private String facilityName;
	private String assignedBy;
	private String checklistName;
	private String levelOfInterventionName;
	private String sectionName;
	private String organizationName;

	public String getMajorFindings() {
		return majorFindings;
	}

	public void setMajorFindings(String majorFindings) {
		this.majorFindings = majorFindings;
	}

	public String getIntervention_activities() {
		return intervention_activities;
	}

	public void setIntervention_activities(String intervention_activities) {
		this.intervention_activities = intervention_activities;
	}

	public Integer getResponsibility() {
		return responsibility;
	}

	public void setResponsibility(Integer responsibility) {
		this.responsibility = responsibility;
	}

	public Integer getTimeline() {
		return timeline;
	}

	public void setTimeline(Integer timeline) {
		this.timeline = timeline;
	}

	public Integer getLevelOfIntervention() {
		return levelOfIntervention;
	}

	public void setLevelOfIntervention(Integer levelOfIntervention) {
		this.levelOfIntervention = levelOfIntervention;
	}

	public Integer getSectionType() {
		return sectionType;
	}

	public void setSectionType(Integer sectionType) {
		this.sectionType = sectionType;
	}

	public Integer getFacilityId() {
		return facilityId;
	}

	public void setFacilityId(Integer facilityId) {
		this.facilityId = facilityId;
	}

	public Integer getFormType() {
		return formType;
	}

	public void setFormType(Integer formType) {
		this.formType = formType;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getOrganizationId() {
		return organizationId;
	}

	public void setOrganizationId(Integer organizationId) {
		this.organizationId = organizationId;
	}

	public String getDateOfCompletion() {
		return dateOfCompletion;
	}

	public void setDateOfCompletion(String dateOfCompletion) {
		this.dateOfCompletion = dateOfCompletion;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getRecievedDate() {
		return recievedDate;
	}

	public void setRecievedDate(String recievedDate) {
		this.recievedDate = recievedDate;
	}

	public String getFacilityName() {
		return facilityName;
	}

	public void setFacilityName(String facilityName) {
		this.facilityName = facilityName;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDateOfVisit() {
		return dateOfVisit;
	}

	public void setDateOfVisit(String dateOfVisit) {
		this.dateOfVisit = dateOfVisit;
	}

	public String getAssignedBy() {
		return assignedBy;
	}

	public void setAssignedBy(String assignedBy) {
		this.assignedBy = assignedBy;
	}

	public String getChecklistName() {
		return checklistName;
	}

	public void setChecklistName(String checklistName) {
		this.checklistName = checklistName;
	}

	public String getLevelOfInterventionName() {
		return levelOfInterventionName;
	}

	public void setLevelOfInterventionName(String levelOfInterventionName) {
		this.levelOfInterventionName = levelOfInterventionName;
	}

	public String getSectionName() {
		return sectionName;
	}

	public void setSectionName(String sectionName) {
		this.sectionName = sectionName;
	}

	public String getOrganizationName() {
		return organizationName;
	}

	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
	}

}
