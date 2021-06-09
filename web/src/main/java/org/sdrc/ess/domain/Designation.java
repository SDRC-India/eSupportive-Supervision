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
@Table(name = "designation")
public class Designation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_pk")
	private Integer id;

	@Column(nullable = false)
	private String name;

	@Column(name = "created_date")
	private Timestamp createdDate;

	@Column(name = "updated_date")
	private Timestamp updatedDate;

	@OneToMany(mappedBy = "designation")
	private List<DesignationAreaOrganizationRoleMapping> designationAreaOrganizationRoleMapping;

	public Integer getId() {
		return id;
	}

	public List<DesignationAreaOrganizationRoleMapping> getDesignationAreaOrganizationRoleMapping() {
		return designationAreaOrganizationRoleMapping;
	}

	public void setDesignationAreaOrganizationRoleMapping(
			List<DesignationAreaOrganizationRoleMapping> designationAreaOrganizationRoleMapping) {
		this.designationAreaOrganizationRoleMapping = designationAreaOrganizationRoleMapping;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public Designation() {

	}

	public Designation(Integer designationId) {
		this.id = designationId;
	}

}
