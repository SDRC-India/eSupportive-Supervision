package org.sdrc.ess.model.web;

import java.util.List;
/**
 * @author Debiprasad Parida(debiprasad@sdrc.co.in) Created on 09-10-2017 
 */
public class ActualvsPlannedReportTimeperiodModel {
	
	private List<TimePeriodModel> timeperiodModel;
	private List<ActualvsPlannedReportModel> actualvsPlannedReportModel;
	private String lastUpdateOn;
	
	public List<TimePeriodModel> getTimeperiodModel() {
		return timeperiodModel;
	}
	public void setTimeperiodModel(List<TimePeriodModel> timeperiodModel) {
		this.timeperiodModel = timeperiodModel;
	}
	public List<ActualvsPlannedReportModel> getActualvsPlannedReportModel() {
		return actualvsPlannedReportModel;
	}
	public void setActualvsPlannedReportModel(List<ActualvsPlannedReportModel> actualvsPlannedReportModel) {
		this.actualvsPlannedReportModel = actualvsPlannedReportModel;
	}
	public String getLastUpdateOn() {
		return lastUpdateOn;
	}
	public void setLastUpdateOn(String lastUpdateOn) {
		this.lastUpdateOn = lastUpdateOn;
	}
	
	

}
