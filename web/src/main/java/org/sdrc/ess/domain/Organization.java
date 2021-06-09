package org.sdrc.ess.domain;

import java.sql.Timestamp;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table
public class Organization {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "organization_id_pk")
	private Integer id;

	@Column(name = "organization_name", nullable = false)
	private String organizationName;

	@Column(name = "created_date")
	private Timestamp createdDate;

	@Column(name = "updated_date")
	private Timestamp updatedDate;

	@Column(name = "is_government_org")
	private Boolean isGovernmentOrg;

	@OneToMany(mappedBy = "organization")
	private List<DesignationAreaOrganizationRoleMapping> designationAreaOrganizationRoleMapping;

	public Organization() {

	}

	public Organization(Integer organizationId) {
		this.id = organizationId;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getOrganizationName() {
		return organizationName;
	}

	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
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

	public Boolean getIsGovernmentOrg() {
		return isGovernmentOrg;
	}

	public void setIsGovernmentOrg(Boolean isGovernmentOrg) {
		this.isGovernmentOrg = isGovernmentOrg;
	}

}
