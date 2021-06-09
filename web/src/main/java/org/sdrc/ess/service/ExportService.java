/**
 * 
 */
package org.sdrc.ess.service;

import java.util.List;

/**
 * @author Harsh Pratyush (harsh@sdrc.co.in)
 *
 */
public interface ExportService {

	/**
	 * This method will return the path of PDF generated containing map and its
	 * tabular data
	 * 
	 * @param svgs
	 * @param indicatorId
	 * @param sourceNid
	 * @param areaId
	 * @param timeperiodId
	 * @param childLevel
	 * @return
	 */
	public String exportMapChartData(List<String> svgs, String indicatorId,
			String sourceNid, String areaId, String timeperiodId,
			Integer parentAreaId, Integer facilityTypeId);

	/**
	 * This method will return the path of PDF generated containing the map and
	 * trend chart and thier respective tabular data
	 * 
	 * @param svgs
	 * @param indicatorId
	 * @param sourceNid
	 * @param areaId
	 * @param timeperiodId
	 * @param childLevel
	 * @param area_NId
	 * @return
	 */
	public String exportLineChartData(List<String> svgs, String indicatorId,
			String sourceNid, String areaId, String timeperiodId,
			Integer childLevel, Integer area_NId,int preodicity, Integer facilityTypeId);
}
