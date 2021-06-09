package org.sdrc.ess.model.web;

import java.sql.Timestamp;
import java.util.List;

import org.sdrc.ess.domain.CommunityData;
import org.sdrc.ess.domain.FacilityData;
import org.sdrc.ess.domain.TypeDetail;

/**
*
* @author Debiprasad Parida (debiprasad@sdrc.co.in) on 06-08-2017 02:20 am
*
*/
public class AreaWebModel {
	
	private Integer areaNId;
	private String areaId;
	private String name;
	private Integer parentAreaId;
	private Integer level;
	private TypeDetail facilityType;
	private Timestamp createdDate;
	private Timestamp updatedDate;
	private List<FacilityData> facilityDatas;
	private List<CommunityData> communityDatas;
	
	
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
	
	

}
