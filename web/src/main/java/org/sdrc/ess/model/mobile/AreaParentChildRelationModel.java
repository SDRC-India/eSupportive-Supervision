package org.sdrc.ess.model.mobile;

import java.util.List;

public class AreaParentChildRelationModel {

	private Integer id;
	private String name;
	private Integer parent_id;
	private Integer level;
	private String facilityType;
	private List<AreaParentChildRelationModel> children;

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

	public Integer getParent_id() {
		return parent_id;
	}

	public void setParent_id(Integer parent_id) {
		this.parent_id = parent_id;
	}

	public List<AreaParentChildRelationModel> getChildren() {
		return children;
	}

	public void setChildren(List<AreaParentChildRelationModel> children) {
		this.children = children;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public String getFacilityType() {
		return facilityType;
	}

	public void setFacilityType(String facilityType) {
		this.facilityType = facilityType;
	}

}
