package org.sdrc.ess.model.mobile;

import java.util.List;

public class PrefetchModel {

	List<Integer> communityList;
	List<Integer> facilityList;

	public List<Integer> getCommunityList() {
		return communityList;
	}

	public void setCommunityList(List<Integer> communityList) {
		this.communityList = communityList;
	}

	public List<Integer> getFacilityList() {
		return facilityList;
	}

	public void setFacilityList(List<Integer> facilityList) {
		this.facilityList = facilityList;
	}

}
