package org.sdrc.ess.model.mobile;

import java.util.List;

/**
 * This model class is going to get transaction data from mobile device to
 * server
 *
 * @author Naseem Akhtar (naseem@sdrc.co.in) on 23-May-2017 1:35:51 am
 */
public class SyncModel {

	private LoginDataModel loginDataModel;
	private List<FacilityDataModel> facilityDataList;
	private List<CommunityDataModel> communityDataList;

	public LoginDataModel getLoginDataModel() {
		return loginDataModel;
	}

	public void setLoginDataModel(LoginDataModel loginDataModel) {
		this.loginDataModel = loginDataModel;
	}

	public List<FacilityDataModel> getFacilityDataList() {
		return facilityDataList;
	}

	public void setFacilityDataList(List<FacilityDataModel> facilityDataList) {
		this.facilityDataList = facilityDataList;
	}

	public List<CommunityDataModel> getCommunityDataList() {
		return communityDataList;
	}

	public void setCommunityDataList(List<CommunityDataModel> communityDataList) {
		this.communityDataList = communityDataList;
	}

}
