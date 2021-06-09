package org.sdrc.ess.model.web;

/**
 * 
 * @author Debiprasad Parida(debiprasad@sdrc.co.in) on 26/09/2017
 *
 */
public class DoughnutChartModel {
	
	private Integer key;
	private Integer numerator;
	private Integer denominator;
	private Integer percentageValue;
	private String timeperiod;
	
	
	public Integer getKey() {
		return key;
	}
	public void setKey(Integer key) {
		this.key = key;
	}
	public Integer getNumerator() {
		return numerator;
	}
	public void setNumerator(Integer numerator) {
		this.numerator = numerator;
	}
	public Integer getDenominator() {
		return denominator;
	}
	public void setDenominator(Integer denominator) {
		this.denominator = denominator;
	}
	public Integer getPercentageValue() {
		return percentageValue;
	}
	public void setPercentageValue(Integer percentageValue) {
		this.percentageValue = percentageValue;
	}
	public String getTimeperiod() {
		return timeperiod;
	}
	public void setTimeperiod(String timeperiod) {
		this.timeperiod = timeperiod;
	}
	
	
	

}
