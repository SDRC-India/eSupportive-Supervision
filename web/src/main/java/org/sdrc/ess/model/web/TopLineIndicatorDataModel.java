/**
 * 
 */
package org.sdrc.ess.model.web;

/**
 * @author Harsh Pratyush (harsh@sdrc.co.in) This class will hold the data for
 *         the dashboard landing page key indicator
 */
public class TopLineIndicatorDataModel {

	String dataValue;
	String indicator_Name;
	String short_Name;
	String sourceName;
	String timeperiod;
	String unit_Value;
	String message;
	
	public String getDataValue() {
		return dataValue;
	}
	public void setDataValue(String dataValue) {
		this.dataValue = dataValue;
	}
	public String getIndicator_Name() {
		return indicator_Name;
	}
	public void setIndicator_Name(String indicator_Name) {
		this.indicator_Name = indicator_Name;
	}
	public String getShort_Name() {
		return short_Name;
	}
	public void setShort_Name(String short_Name) {
		this.short_Name = short_Name;
	}
	public String getSourceName() {
		return sourceName;
	}
	public void setSourceName(String sourceName) {
		this.sourceName = sourceName;
	}
	public String getTimeperiod() {
		return timeperiod;
	}
	public void setTimeperiod(String timeperiod) {
		this.timeperiod = timeperiod;
	}
	public String getUnit_Value() {
		return unit_Value;
	}
	public void setUnit_Value(String unit_Value) {
		this.unit_Value = unit_Value;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}

}
