package org.sdrc.ess.core;

/*
 * @author Azaruddin
 * 
 * This was created to be only used in dashboard thematic view
 */

public class ValueObjectForDashboard {

	private String key;
	private Object value;
	private String description;
	private Integer legendCount;

	public ValueObjectForDashboard(String key, Object value) {
		this.key = key;
		this.value = value;
	}
	
	public ValueObjectForDashboard(String key, Object value,Integer legendCount) {
		this.key = key;
		this.value = value;
		this.legendCount = legendCount;
	}

	public ValueObjectForDashboard(int key, String value) {
		this(new Integer(key).toString(), value);
	}

	public ValueObjectForDashboard() {
		// TODO Auto-generated constructor stub
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public Object getValue() {
		return value;
	}

	public void setValue(Object value) {
		this.value = value;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getLegendCount() {
		return legendCount;
	}

	public void setLegendCount(Integer legendCount) {
		this.legendCount = legendCount;
	}

	@Override
	public String toString() {
		return "ValueObjectForDashboard [key=" + key + ", value=" + value + ", description=" + description + "]";
	}

}
