package org.sdrc.ess.model.mobile;


/**
 * This class will help us take areas to mobile device
 * 
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 14-May-2017 11:29:30 am
 * @author Azaruddin (azaruddin@sdrc.co.in) on 19-Oct-2017 02:06 pm
 */
public class AreaModel {

	private Integer areaNId;
	private String areaId;
	private String name;
	private Integer parentAreaId;
	private Integer level;
	private TypeDetailModel facilityType;
	private String nIN;
	private Integer childLevel;
	
	
	/**
	 * This property will help us set(auto populate) facility in charge email id in data entry module.
	 * If this area is a facility, and it has a facility in charge, this property has the value of facility in charge email id.
	 * If it does not have a facility in charge, this property has the value of 'null'.     
	 * @author Ratikanta
	 * @since 2.1.0
	 */
	
	private String facilityInchargeEmailId;

	// added by Azar
	private String mapName;

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

	public TypeDetailModel getFacilityType() {
		return facilityType;
	}

	public void setFacilityType(TypeDetailModel facilityType) {
		this.facilityType = facilityType;
	}

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

	public Integer getChildLevel() {
		return childLevel;
	}

	public void setChildLevel(Integer childLevel) {
		this.childLevel = childLevel;
	}

	public String getFacilityInchargeEmailId() {
		return facilityInchargeEmailId;
	}

	public void setFacilityInchargeEmailId(String facilityInchargeEmailId) {
		this.facilityInchargeEmailId = facilityInchargeEmailId;
	}
	
}
