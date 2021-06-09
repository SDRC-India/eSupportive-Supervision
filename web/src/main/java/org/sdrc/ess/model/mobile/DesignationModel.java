package org.sdrc.ess.model.mobile;

public class DesignationModel {

	private Integer id;
	private String name;
	private Integer level;
	private Boolean isResponsibleFacility;
	private Boolean isResponsibleCommunity;
	private Integer areaId;
	private Integer organizationId;
	private Integer doarMappingId;

	public Integer getId() {
		return id;
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

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public Boolean getIsResponsibleFacility() {
		return isResponsibleFacility;
	}

	public void setIsResponsibleFacility(Boolean isResponsibleFacility) {
		this.isResponsibleFacility = isResponsibleFacility;
	}

	public Boolean getIsResponsibleCommunity() {
		return isResponsibleCommunity;
	}

	public void setIsResponsibleCommunity(Boolean isResponsibleCommunity) {
		this.isResponsibleCommunity = isResponsibleCommunity;
	}

	public Integer getAreaId() {
		return areaId;
	}

	public void setAreaId(Integer areaId) {
		this.areaId = areaId;
	}

	public Integer getOrganizationId() {
		return organizationId;
	}

	public void setOrganizationId(Integer organizationId) {
		this.organizationId = organizationId;
	}

	public Integer getDoarMappingId() {
		return doarMappingId;
	}

	public void setDoarMappingId(Integer doarMappingId) {
		this.doarMappingId = doarMappingId;
	}

}
