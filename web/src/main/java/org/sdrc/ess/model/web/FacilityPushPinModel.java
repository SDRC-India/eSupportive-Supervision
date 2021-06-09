package org.sdrc.ess.model.web;

import java.util.Map;

public class FacilityPushPinModel {
	
	private Long submissionId;
	private Integer facilityId;
	private String facilityName;
	private String latitude;
	private String longitude;
	private String icon;
	private String levelType;
	private String facilityType;
	private String section;
	private String sub_Section;
	private Map<String,String> levelScore;
	private int id;
	private boolean showWindow;
	
	
	
	public Long getSubmissionId() {
		return submissionId;
	}
	public void setSubmissionId(Long submissionId) {
		this.submissionId = submissionId;
	}
	public Integer getFacilityId() {
		return facilityId;
	}
	public void setFacilityId(Integer facilityId) {
		this.facilityId = facilityId;
	}
	public String getFacilityName() {
		return facilityName;
	}
	public void setFacilityName(String facilityName) {
		this.facilityName = facilityName;
	}
	public String getLatitude() {
		return latitude;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	public String getLongitude() {
		return longitude;
	}
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public String getLevelType() {
		return levelType;
	}
	public void setLevelType(String levelType) {
		this.levelType = levelType;
	}
	public String getFacilityType() {
		return facilityType;
	}
	public void setFacilityType(String facilityType) {
		this.facilityType = facilityType;
	}
	public String getSection() {
		return section;
	}
	public void setSection(String section) {
		this.section = section;
	}
	public String getSub_Section() {
		return sub_Section;
	}
	public void setSub_Section(String sub_Section) {
		this.sub_Section = sub_Section;
	}
	public Map<String, String> getLevelScore() {
		return levelScore;
	}
	public void setLevelScore(Map<String, String> levelScore) {
		this.levelScore = levelScore;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public boolean isShowWindow() {
		return showWindow;
	}
	public void setShowWindow(boolean showWindow) {
		this.showWindow = showWindow;
	}
	
	

}
