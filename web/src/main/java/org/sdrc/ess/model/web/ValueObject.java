package org.sdrc.ess.model.web;

/**
 * @author Sarita Panigrahi created on: 20-07-2017 For miscellaneous use
 *
 *
 */
public class ValueObject {

	private Integer key;
	private String value;
	private String description;
	private String metaData;
	private Integer orderLevel;
	private Integer designationId;

	private Boolean isFacilityInCharge;

	public Integer getKey() {
		return key;
	}

	public void setKey(Integer key) {
		this.key = key;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getMetaData() {
		return metaData;
	}

	public void setMetaData(String metaData) {
		this.metaData = metaData;
	}

	public ValueObject(Integer key, String value) {
		super();
		this.key = key;
		this.value = value;
	}

	public ValueObject(Integer key, String value, Integer orderLevel) {
		super();
		this.key = key;
		this.value = value;
		this.orderLevel = orderLevel;
	}

	public ValueObject() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Integer getOrderLevel() {
		return orderLevel;
	}

	public void setOrderLevel(Integer orderLevel) {
		this.orderLevel = orderLevel;
	}

	public Boolean getIsFacilityInCharge() {
		return isFacilityInCharge;
	}

	public void setIsFacilityInCharge(Boolean isFacilityInCharge) {
		this.isFacilityInCharge = isFacilityInCharge;
	}

	public Integer getDesignationId() {
		return designationId;
	}

	public void setDesignationId(Integer designationId) {
		this.designationId = designationId;
	}

}
