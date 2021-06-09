package org.sdrc.ess.service;

import java.util.List;
import org.json.simple.JSONObject;
import org.sdrc.ess.core.ValueObjectForDashboard;
import org.sdrc.ess.model.mobile.AreaModel;
import org.sdrc.ess.model.web.DataCollectionModel;
import org.sdrc.ess.model.web.LineChartData;

public interface ThematicDashboardViewService {

	List<ValueObjectForDashboard> fetchIndicators(String sector);

	List<ValueObjectForDashboard> fetchSources(String iusnid);

	JSONObject fetchUtTimeperiod(Integer parseInt, Integer parseInt2);

	JSONObject fetchAllSectors(String string);

	DataCollectionModel fetchData(String indicatorId, String sourceNid, String areaId, String timeperiodId, Integer childLevel);


	List<AreaModel> fetchAreasAreaWise();

	List<LineChartData> getLineChartData(Integer area_NId, Integer indicator_NId, Integer periodicity, Integer timePeriod_NId, Integer facilityTypeId);

	JSONObject getThematicTableViewData(Integer sectorNid, Integer timePeriod_NId,Integer areaNid, Integer facilityTypeId);

	JSONObject fetchAreasRoleWise();

	DataCollectionModel fetchMapData(String indicatorId, String sourceNid, String areaId, String timeperiodId, Integer parentAreaId, Integer facilityTypeId);
	
}
