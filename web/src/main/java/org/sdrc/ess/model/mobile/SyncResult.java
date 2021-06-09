package org.sdrc.ess.model.mobile;

import java.util.List;

/**
 * This model class is going to take sync result to mobile phone from server.
 * 
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 24-Apr-2017 4:31:28 pm
 */
public class SyncResult {

	private Integer errorCode;
	private String errorMessage;
	private MasterDataModel masterDataModel;
	private List<FacilityErrorModel> facilityErrorModels;
	private List<CommunityErrorModel> communityErrorModels;
	private Integer facilityRecordsSynced;
	private Integer communityRecordsSynced;
	private String latestAppVersionName;

	public Integer getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(Integer errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public MasterDataModel getMasterDataModel() {
		return masterDataModel;
	}

	public void setMasterDataModel(MasterDataModel masterDataModel) {
		this.masterDataModel = masterDataModel;
	}

	public List<FacilityErrorModel> getFacilityErrorModels() {
		return facilityErrorModels;
	}

	public void setFacilityErrorModels(List<FacilityErrorModel> facilityErrorModels) {
		this.facilityErrorModels = facilityErrorModels;
	}

	public List<CommunityErrorModel> getCommunityErrorModels() {
		return communityErrorModels;
	}

	public void setCommunityErrorModels(List<CommunityErrorModel> communityErrorModels) {
		this.communityErrorModels = communityErrorModels;
	}

	public Integer getFacilityRecordsSynced() {
		return facilityRecordsSynced;
	}

	public void setFacilityRecordsSynced(Integer facilityRecordsSynced) {
		this.facilityRecordsSynced = facilityRecordsSynced;
	}

	public Integer getCommunityRecordsSynced() {
		return communityRecordsSynced;
	}

	public void setCommunityRecordsSynced(Integer communityRecordsSynced) {
		this.communityRecordsSynced = communityRecordsSynced;
	}

	public String getLatestAppVersionName() {
		return latestAppVersionName;
	}

	public void setLatestAppVersionName(String latestAppVersionName) {
		this.latestAppVersionName = latestAppVersionName;
	}
	
}
