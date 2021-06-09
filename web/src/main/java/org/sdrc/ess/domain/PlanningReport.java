package org.sdrc.ess.domain;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author Debiprasad Parida(debiprasad@sdrc.co.in) Created on 09-10-2017 this entity
 *         will hold the planningReport module related informations
 */
@Entity
@Table(name = "planning_report")
public class PlanningReport {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer planningReportId;

	@Column(name = "planned_date")
	private Timestamp plannedDate;

	@Column(name = "visit_date")
	private Timestamp visitDate;

	@Column(name = "submission_date")
	private Timestamp submissionDate;

	@Column(name = "checklist_id")
	private Integer checklistId;
	
	@Column(name = "facility_id")
	private Integer facilityId;

	@Column(name="facility_type_id")
	private Integer facilityTypeId;
	
	@Column(name = "facility_name")
	private String facilityName;
	
	@Column(name="facility_type_name")
	private String facilityTypeName;
	
	@Column(name = "block_name")
	private String blockName;
	
	@Column(name = "block_id")
	private Integer blockId;
	
	@Column(name = "district_name")
	private String districtName;
	
	@Column(name = "district_id")
	private Integer districtId;
	
	@Column(name= "state_name")
	private String stateName;
	
	@Column(name = "state_id")
	private Integer stateId;
	
	@Column(name = "organization_name")
	private String organization_Name;
	
	@Column(name = "designation_name")
	private String designationName;
	
	@Column(name = "user_name")
	private String userName;

	public Integer getPlanningReportId() {
		return planningReportId;
	}

	public void setPlanningReportId(Integer planningReportId) {
		this.planningReportId = planningReportId;
	}

	public Timestamp getPlannedDate() {
		return plannedDate;
	}

	public void setPlannedDate(Timestamp plannedDate) {
		this.plannedDate = plannedDate;
	}

	public Timestamp getVisitDate() {
		return visitDate;
	}

	public void setVisitDate(Timestamp visitDate) {
		this.visitDate = visitDate;
	}

	public Timestamp getSubmissionDate() {
		return submissionDate;
	}

	public void setSubmissionDate(Timestamp submissionDate) {
		this.submissionDate = submissionDate;
	}

	public Integer getChecklistId() {
		return checklistId;
	}

	public void setChecklistId(Integer checklistId) {
		this.checklistId = checklistId;
	}

	public Integer getFacilityId() {
		return facilityId;
	}

	public void setFacilityId(Integer facilityId) {
		this.facilityId = facilityId;
	}

	public Integer getFacilityTypeId() {
		return facilityTypeId;
	}

	public void setFacilityTypeId(Integer facilityTypeId) {
		this.facilityTypeId = facilityTypeId;
	}

	public String getFacilityName() {
		return facilityName;
	}

	public void setFacilityName(String facilityName) {
		this.facilityName = facilityName;
	}

	public String getFacilityTypeName() {
		return facilityTypeName;
	}

	public void setFacilityTypeName(String facilityTypeName) {
		this.facilityTypeName = facilityTypeName;
	}

	public String getBlockName() {
		return blockName;
	}

	public void setBlockName(String blockName) {
		this.blockName = blockName;
	}

	public Integer getBlockId() {
		return blockId;
	}

	public void setBlockId(Integer blockId) {
		this.blockId = blockId;
	}

	public String getDistrictName() {
		return districtName;
	}

	public void setDistrictName(String districtName) {
		this.districtName = districtName;
	}

	public Integer getDistrictId() {
		return districtId;
	}

	public void setDistrictId(Integer districtId) {
		this.districtId = districtId;
	}

	public String getStateName() {
		return stateName;
	}

	public void setStateName(String stateName) {
		this.stateName = stateName;
	}

	public Integer getStateId() {
		return stateId;
	}

	public void setStateId(Integer stateId) {
		this.stateId = stateId;
	}

	public String getOrganization_Name() {
		return organization_Name;
	}

	public void setOrganization_Name(String organization_Name) {
		this.organization_Name = organization_Name;
	}

	public String getDesignationName() {
		return designationName;
	}

	public void setDesignationName(String designationName) {
		this.designationName = designationName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	
	
	
	

}
