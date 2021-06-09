package org.sdrc.ess.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 * This class is going to help us keep mapping data of user and area
 * 
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 14-May-2017 11:15:57 am
 * @author Naseem Akhtar (naseem@sdrc.co.in) on 10th July 2017 13:28
 */
@Entity
@Table(name = "user_area_mapping")
public class UserAreaMapping {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_pk")
	private Integer id;

	// @ManyToOne
	// @JoinColumn(name = "area_id_fk")
	@Column(name = "area_json", nullable = true, columnDefinition = "text", length = 65556)
	private String areaJson;

	@OneToOne
	@JoinColumn(name = "user_id_fk", unique = true)
	private EssUser essUser;

	@OneToMany(mappedBy = "userAreaMapping")
	private List<UserDesignationFeaturePermissionMapping> userDesignationFeaturePermissionMappings;
	
	private boolean data_updated;

	public List<UserDesignationFeaturePermissionMapping> getUserDesignationFeaturePermissionMappings() {
		return userDesignationFeaturePermissionMappings;
	}

	public void setUserDesignationFeaturePermissionMappings(
			List<UserDesignationFeaturePermissionMapping> userDesignationFeaturePermissionMappings) {
		this.userDesignationFeaturePermissionMappings = userDesignationFeaturePermissionMappings;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAreaJson() {
		return areaJson;
	}

	public void setAreaJson(String areaJson) {
		this.areaJson = areaJson;
	}

	public EssUser getEssUser() {
		return essUser;
	}

	public void setEssUser(EssUser essUser) {
		this.essUser = essUser;
	}

	public boolean isData_updated() {
		return data_updated;
	}

	public void setData_updated(boolean data_updated) {
		this.data_updated = data_updated;
	}

}
