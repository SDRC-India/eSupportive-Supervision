package org.sdrc.ess.model.mobile;

import java.util.List;

public class UserAreaMappingModel {

	private Integer country;
	private List<Integer> state;
	private List<Integer> district;
	private List<Integer> block;
	private List<Integer> facility;

	public Integer getCountry() {
		return country;
	}

	public void setCountry(Integer country) {
		this.country = country;
	}

	public List<Integer> getState() {
		return state;
	}

	public void setState(List<Integer> state) {
		this.state = state;
	}

	public List<Integer> getDistrict() {
		return district;
	}

	public void setDistrict(List<Integer> district) {
		this.district = district;
	}

	public List<Integer> getBlock() {
		return block;
	}

	public void setBlock(List<Integer> block) {
		this.block = block;
	}

	public List<Integer> getFacility() {
		return facility;
	}

	public void setFacility(List<Integer> facility) {
		this.facility = facility;
	}

}
