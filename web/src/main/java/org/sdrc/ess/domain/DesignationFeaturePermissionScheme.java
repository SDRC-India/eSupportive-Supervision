package org.sdrc.ess.domain;

import java.sql.Timestamp;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="designation_feature_permission_scheme")
public class DesignationFeaturePermissionScheme {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="designation_feature_permission_scheme_id")
	private int designationFeaturePermissionSchemeId;
	
	@Column(name="scheme_name")
	private String schemeName;
	
	@ManyToOne
	@JoinColumn(name="designation_id_fk", nullable = false)
	private Designation designation;
	
	@ManyToOne
	@JoinColumn(name="feature_permission_id_fk")
	private FeaturePermissionMapping featurePermissionMapping;
	
	@Column(name="updated_date")
	private Timestamp updatedDate;
	
	@Column(name="updated_by")
	private String updatedBy;
	
	@OneToMany(mappedBy="designationFeaturePermissionScheme", fetch=FetchType.EAGER)
	private List<UserDesignationFeaturePermissionMapping> userDesignationFeaturePermissionMappings;

	public int getDesignationFeaturePermissionSchemeId() {
		return designationFeaturePermissionSchemeId;
	}

	public void setDesignationFeaturePermissionSchemeId(int designationFeaturePermissionSchemeId) {
		this.designationFeaturePermissionSchemeId = designationFeaturePermissionSchemeId;
	}

	public List<UserDesignationFeaturePermissionMapping> getUserDesignationFeaturePermissionMappings() {
		return userDesignationFeaturePermissionMappings;
	}

	public void setUserDesignationFeaturePermissionMappings(
			List<UserDesignationFeaturePermissionMapping> userDesignationFeaturePermissionMappings) {
		this.userDesignationFeaturePermissionMappings = userDesignationFeaturePermissionMappings;
	}

	public String getSchemeName() {
		return schemeName;
	}

	public void setSchemeName(String schemeName) {
		this.schemeName = schemeName;
	}

	public Designation getDesignation() {
		return designation;
	}

	public void setDesignation(Designation designation) {
		this.designation = designation;
	}

	public FeaturePermissionMapping getFeaturePermissionMapping() {
		return featurePermissionMapping;
	}

	public void setFeaturePermissionMapping(FeaturePermissionMapping featurePermissionMapping) {
		this.featurePermissionMapping = featurePermissionMapping;
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

}
