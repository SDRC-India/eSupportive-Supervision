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
@Table(name="feature_permission_mapping")
public class FeaturePermissionMapping {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="feature_permission_mapping_id")
	private int featurePermissionId;
	
	@ManyToOne
	@JoinColumn(name="feature_id_fk")
	private Feature feature;
	
	@ManyToOne
	@JoinColumn(name="permission_id_fk")
	private Permission permission;
	
	@Column(name="updated_date")
	private Timestamp updatedDate;
	
	@Column(name="updated_by")
	private String updatedBy;
	
	@OneToMany(mappedBy="featurePermissionMapping")
	private List<DesignationFeaturePermissionScheme> designationFeaturePermissionSchemes;

	public int getFeaturePermissionId() {
		return featurePermissionId;
	}

	public void setFeaturePermissionId(int featurePermissionId) {
		this.featurePermissionId = featurePermissionId;
	}

	public Feature getFeature() {
		return feature;
	}

	public void setFeature(Feature feature) {
		this.feature = feature;
	}

	public Permission getPermission() {
		return permission;
	}

	public void setPermission(Permission permission) {
		this.permission = permission;
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

	public List<DesignationFeaturePermissionScheme> getDesignationFeaturePermissionSchemes() {
		return designationFeaturePermissionSchemes;
	}

	public void setDesignationFeaturePermissionSchemes(
			List<DesignationFeaturePermissionScheme> designationFeaturePermissionSchemes) {
		this.designationFeaturePermissionSchemes = designationFeaturePermissionSchemes;
	}
	
	public FeaturePermissionMapping(){
		
	}
	
	public FeaturePermissionMapping(int id){
		this.featurePermissionId = id;
	}

}
