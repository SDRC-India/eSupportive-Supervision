package org.sdrc.ess.domain;

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
import javax.persistence.Table;

@Entity
@Table(name = "designation_area_organization_role_mapping")
public class DesignationAreaOrganizationRoleMapping {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "designation_area_mapping_id_pk")
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "designation_id_fk")
	private Designation designation;

	@ManyToOne
	@JoinColumn(name = "area_id_fk")
	private Area area;

	@ManyToOne
	@JoinColumn(name = "organization_id_fk")
	private Organization organization;

	@ManyToOne
	@JoinColumn(name = "role_id_fk")
	private Role role;

	@Column(name = "is_responsible_facility")
	private Boolean isResponsibleFacility;

	@Column(name = "is_responsible_community")
	private Boolean isResponsibleCommunity;

	@Column(name = "is_facility_in_charge", columnDefinition = "boolean default FALSE")
	private Boolean isFacilityInCharge;

	@Column(name = "created_date")
	private Timestamp createdDate;

	@Column(name = "updated_date")
	private Timestamp updatedDate;

	@OneToMany(mappedBy = "designationAreaOrganizationRoleMapping")
	private List<EssUser> essUsers;

	@OneToMany(mappedBy = "responsibility")
	private List<PlanOfAction> responsibility;

	public DesignationAreaOrganizationRoleMapping() {

	}

	public DesignationAreaOrganizationRoleMapping(Integer designationId) {
		this.id = designationId;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Designation getDesignation() {
		return designation;
	}

	public void setDesignation(Designation designation) {
		this.designation = designation;
	}

	public Area getArea() {
		return area;
	}

	public void setArea(Area area) {
		this.area = area;
	}

	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public List<EssUser> getEssUsers() {
		return essUsers;
	}

	public void setEssUsers(List<EssUser> essUsers) {
		this.essUsers = essUsers;
	}

	public List<PlanOfAction> getResponsibility() {
		return responsibility;
	}

	public void setResponsibility(List<PlanOfAction> responsibility) {
		this.responsibility = responsibility;
	}

	public Boolean getIsResponsibleFacility() {
		return isResponsibleFacility;
	}

	public void setIsResponsibleFacility(Boolean isResponsibleFacility) {
		this.isResponsibleFacility = isResponsibleFacility;
	}

	public Boolean getIsResponsibleCommunity() {
		return isResponsibleCommunity;
	}

	public void setIsResponsibleCommunity(Boolean isResponsibleCommunity) {
		this.isResponsibleCommunity = isResponsibleCommunity;
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

	public Boolean getIsFacilityInCharge() {
		return isFacilityInCharge;
	}

	public void setIsFacilityInCharge(Boolean isFacilityInCharge) {
		this.isFacilityInCharge = isFacilityInCharge;
	}

}
