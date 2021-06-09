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

/**
 * This class will help to persist area data in to database
 * 
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 14-May-2017 10:41:25 am
 * @author Azaruddin (azaruddin@sdrc.co.in) on 19-Oct-2017 02:06 pm
 */
@Entity
@Table(name = "area")
public class Area {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "area_nid_pk")
	private Integer areaNId;

	@Column(name = "area_id", nullable = false)
	private String areaId;

	@Column(nullable = false)
	private String name;

	@Column(name = "parent_area_id", nullable = false)
	private Integer parentAreaId;

	@Column(nullable = false)
	private Integer level;

//	@Column(name = "facility_type")
//	private String facilityType;
	
	//added by Azar
	@Column(name = "map_name")
	private String mapName;
	
	@ManyToOne
	@JoinColumn(name = "facility_type_id_fk")
	private TypeDetail facilityType;

	@Column(name = "created_date")
	private Timestamp createdDate;

	@Column(name = "updated_date")
	private Timestamp updatedDate;

	private String nIN;

	@OneToMany(mappedBy = "area")
	private List<FacilityData> facilityDatas;

	@OneToMany(mappedBy = "area")
	private List<CommunityData> communityDatas;
	
	@OneToMany(mappedBy = "facility")
	private List<CommunityData> facilityCommunity;
	
//	@OneToMany(mappedBy = "area")
//	private List<UserAreaMapping> userAreaMappings;
	
	@OneToMany(mappedBy="area")
	private List<DesignationAreaOrganizationRoleMapping> designationAreaMappings;
	
	@OneToMany(mappedBy="facility")
	private List<PlanOfAction> facility;
	
	@OneToMany(mappedBy="inChargeFacilityId")
	private List<EssUser> inChargeFacilityId;
	
	@OneToMany(mappedBy="district")
	private List<PlanOfAction> district;
	
	@OneToMany(mappedBy="block")
	private List<PlanOfAction> block;
	
	public Area(){
		
	}
	
	public Area(int facilityId) {
		this.areaNId = facilityId;
	}

	public List<DesignationAreaOrganizationRoleMapping> getDesignationAreaMappings() {
		return designationAreaMappings;
	}

	public void setDesignationAreaMappings(List<DesignationAreaOrganizationRoleMapping> designationAreaMappings) {
		this.designationAreaMappings = designationAreaMappings;
	}

	public Integer getAreaNId() {
		return areaNId;
	}

	public void setAreaNId(Integer areaNId) {
		this.areaNId = areaNId;
	}

	public String getAreaId() {
		return areaId;
	}

	public void setAreaId(String areaId) {
		this.areaId = areaId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getParentAreaId() {
		return parentAreaId;
	}

	public void setParentAreaId(Integer parentAreaId) {
		this.parentAreaId = parentAreaId;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public TypeDetail getFacilityType() {
		return facilityType;
	}

	public void setFacilityType(TypeDetail facilityType) {
		this.facilityType = facilityType;
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

	public List<FacilityData> getFacilityDatas() {
		return facilityDatas;
	}

	public void setFacilityDatas(List<FacilityData> facilityDatas) {
		this.facilityDatas = facilityDatas;
	}

	public List<CommunityData> getCommunityDatas() {
		return communityDatas;
	}

	public void setCommunityDatas(List<CommunityData> communityDatas) {
		this.communityDatas = communityDatas;
	}

//	public List<UserAreaMapping> getUserAreaMappings() {
//		return userAreaMappings;
//	}
//
//	public void setUserAreaMappings(List<UserAreaMapping> userAreaMappings) {
//		this.userAreaMappings = userAreaMappings;
//	}

	public String getnIN() {
		return nIN;
	}

	public void setnIN(String nIN) {
		this.nIN = nIN;
	}

	public String getMapName() {
		return mapName;
	}

	public void setMapName(String mapName) {
		this.mapName = mapName;
	}
	
	

}
