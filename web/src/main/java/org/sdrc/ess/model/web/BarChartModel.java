/**
 * 
 */
package org.sdrc.ess.model.web;

/**
 * @author Harsh Pratyush (harsh@sdrc.co.in) This class will contain the data
 *         for the bar chart in landing page
 */
public class BarChartModel {

	String indicator_Name;
	String axis;
	String value;

	public String getIndicator_Name() {
		return indicator_Name;
	}

	public void setIndicator_Name(String indicator_Name) {
		this.indicator_Name = indicator_Name;
	}

	public String getAxis() {
		return axis;
	}

	public void setAxis(String axis) {
		this.axis = axis;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}
