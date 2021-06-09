package org.sdrc.ess.service;

import org.json.simple.JSONObject;
import org.sdrc.ess.model.web.MonitoringReportRequestModel;

public interface MonitoringReportService {

	public JSONObject getBasicDataForMonitoringReport();

	public Object getUserMonitoringReportData(MonitoringReportRequestModel obj);

	public Object getMonitoringReportDataFacility(MonitoringReportRequestModel obj);

}
