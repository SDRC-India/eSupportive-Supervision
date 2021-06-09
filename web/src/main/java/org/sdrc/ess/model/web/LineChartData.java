package org.sdrc.ess.model.web;

public class LineChartData {

	private Integer areaNid;

	private Double dataValue;

	private String timeperiod;

	private String key;

	private String areaName;

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getAreaName() {
		return areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	public Integer getAreaNid() {
		return areaNid;
	}

	public void setAreaNid(Integer areaNid) {
		this.areaNid = areaNid;
	}

	public Double getDataValue() {
		return dataValue;
	}

	public void setDataValue(Double dataValue) {
		this.dataValue = dataValue;
	}

	public String getTimeperiod() {
		return timeperiod;
	}

	public void setTimeperiod(String timeperiod) {
		this.timeperiod = timeperiod;
	}

}
