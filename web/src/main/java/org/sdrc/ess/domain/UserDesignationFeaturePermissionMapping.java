package org.sdrc.ess.domain;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="user_designation_feature_permission")
public class UserDesignationFeaturePermissionMapping {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="user_designation_feature_permission_id")
	private int userDesignationFeaturePermissionId;
	
	@ManyToOne
	@JoinColumn(name="designation_feature_permission_scheme_id", nullable = false)
	private DesignationFeaturePermissionScheme designationFeaturePermissionScheme;
	
	@ManyToOne
	@JoinColumn(name="user_area_mapping_id_fk")
	private UserAreaMapping userAreaMapping;
	
	@Column(name="updated_date")
	private Timestamp updatedDate;
	
	@Column(name="updated_by")
	private String updatedBy;

	public int getUserDesignationFeaturePermissionId() {
		return userDesignationFeaturePermissionId;
	}

	public void setUserDesignationFeaturePermissionId(int userDesignationFeaturePermissionId) {
		this.userDesignationFeaturePermissionId = userDesignationFeaturePermissionId;
	}

	public DesignationFeaturePermissionScheme getDesignationFeaturePermissionScheme() {
		return designationFeaturePermissionScheme;
	}

	public void setDesignationFeaturePermissionScheme(
			DesignationFeaturePermissionScheme designationFeaturePermissionScheme) {
		this.designationFeaturePermissionScheme = designationFeaturePermissionScheme;
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

	public UserAreaMapping getUserAreaMapping() {
		return userAreaMapping;
	}

	public void setUserAreaMapping(UserAreaMapping userAreaMapping) {
		this.userAreaMapping = userAreaMapping;
	}

}
