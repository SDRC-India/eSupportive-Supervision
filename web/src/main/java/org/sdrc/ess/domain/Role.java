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
public class Role {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Role_Id")
	private int roleId;

	@Column(name = "Role_Code", nullable = false)
	private String roleCode;

	@Column(name = "RoleName")
	private String roleName;

	private String description;

	@Column(name = "Updated_Date")
	private Timestamp updatedDate;

	@Column(name = "Updated_By")
	private String updatedBy;

	@OneToMany(mappedBy = "designation")
	private List<DesignationFeaturePermissionScheme> roleFeaturePermissionSchemes;
	
	@OneToMany(mappedBy = "role")
	private List<DesignationAreaOrganizationRoleMapping> designationAreaOrganizationRoleMapping;


	public Role(){
		
	}
	
	public Role(Integer roleId){
		this.roleId = roleId;
	}
	
	public int getRoleId() {
		return roleId;
	}

	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}

	public String getRoleCode() {
		return roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Timestamp getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Timestamp updatedDate) {
		this.updatedDate = updatedDate;
	}

	public String getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	public List<DesignationFeaturePermissionScheme> getRoleFeaturePermissionSchemes() {
		return roleFeaturePermissionSchemes;
	}

	public void setRoleFeaturePermissionSchemes(
			List<DesignationFeaturePermissionScheme> roleFeaturePermissionSchemes) {
		this.roleFeaturePermissionSchemes = roleFeaturePermissionSchemes;
	}

}
