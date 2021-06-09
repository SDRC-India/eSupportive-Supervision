/**
 * 
 */
package org.sdrc.ess.repository;

import java.util.List;

import org.sdrc.ess.domain.UtData;

/**
 * @author Harsh Pratyush (harsh@sdrc.co.in)
 *
 */
public interface UtDataReporsitory {

	List<Object []> findByIUSNIdsAndTimePeriod(
			List<Integer> allDashboardIds, int utTimeperiodId , int areaId);

	List<Object []> findByIUSNIdsAndTimePeriodNumber(
			List<Integer> rmnchaMultiLineChartDatasIds, int timePeriod_NId,
			int stateId , int timperiodEnd);




	List<Object []> findByIUSNIdsAndTimePeriodForCountry(
			List<Integer> allDashboardIds, int utTimeperiodId);

	List<Object []> findByIUSNIdsAndTimePeriodNumberCountryLevel(
			List<Integer> allDashboardIds, int utTimeperiodId,
			int timePeriod2);

	List<Object[]> findByIUSNIdsForLatestTimePeriod(
			 int stateId);


	List<Object[]> findIndicatorWiseGapForAsectorAndBlockAndFacilityType(
			int blockId, int facilityTypeId, int sectorId);


	List<Object[]> findDataByTimePeriodForAllFacilityType(Integer indicatorId, Integer timeperiodId, Integer sourceNid, Integer[] areaNid);

	List<Object[]> findChartDataForAllFaciltyType(Integer iusNid, Integer areaNid,Integer periodicity);

	List<Object[]> thematicTableData(Integer sectorNid, Integer timePeriod_NId,Integer areaNid);
	
	//List<Object[]> findDataByTimePeriod(Integer indicatorId, Integer timeperiodId, Integer sourceNid, Integer[] areaNid);
	
	//Object[] findByAreaAreanidAndSectionId(Integer areaId,Integer timeperiodId,Integer sectionId);
	
	List<Object[]> findByAreaAndSubsectionIn(Integer areaId,Integer timeperiodId,Integer sectionId);

	List<Object[]> thematicTableDataForBlockLevelUser(Integer sectorNid, Integer timePeriod_NId, Integer areaNid);

	List<Object[]> findByIUSNIdsAndTimePeriodNumberCountryLevelForPercent(
			List<Integer> percentLineChartsIds, int timePeriod_NId,
			int timePeriod_NId2);

	List<Object[]> findByIUSNIdsAndTimePeriodNumberForPercent(
			List<Integer> percentLineChartsIds, int timePeriod_NId,
			int stateId, int timePeriod_NId2);
	List<Object[]> findByAreaAndSubsectionInAndFacilityTypeId(Integer areaId,Integer timeperiodId,Integer sectionId,int facilityTypeId);

	List<Object[]> findDataByTimePeriodAndFacilityType(Integer indicatorId, Integer timeperiodId, Integer sourceNid, Integer[] areaNids,
			Integer facilityTypeId);

	List<Object[]>   findTheLatestSubmissionOfEachFacilityWithinADistrictOrBlock(
			int districtId, int blockId);

	List<Object[]> find2LatestSubmissionOfEachFacilityWithinADistrictOrBlock(
			int districtId, int blockId);

	List<Object[]> find3LatestSubmissionOfEachFacilityWithinADistrictOrBlock(
			int districtId, int blockId);

	List<Object[]> findLastSubmissionOfEachFacilityWithinADistrictOrBlock(
			int districtId, int blockId);

	List<Object[]> findByTimeperiodIdsAndScoreIndicatorForCommunity(
			int facilityId, List<Integer> timeperiodIds);

	List<Object[]> findChartDataForFaciltyType(Integer indicator_NId, Integer area_NId, Integer periodicity,
			Integer facilityTypeId);

	List<Object[]> thematicTableDataFacilityTypeWise(Integer sectorNid, Integer timePeriod_NId, Integer areaNid,
			Integer facilityTypeId);

	List<Object[]> thematicTableDataForBlockLevelUserFacilityTypeWise(Integer ic_NId, Integer timePeriod_NId,
			Integer areaNid, Integer facilityTypeId);

	List<Object[]> findLatestSubmissionforASectorofaArea(
			int blockIdOrdistrictId, int facilityTypeId, int sectorId);

	List<Object[]> find2LatestSubmissionforASectorofaArea(
			int blockIdOrdistrictId, int facilityTypeId, int sectorId);

	List<Object[]> find3LatestSubmissionforASectorofaArea(
			int blockIdOrdistrictId, int facilityTypeId, int sectorId);

	List<Object[]> findLastSubmissionforASectorofaArea(int blockIdOrdistrictId,
			int facilityTypeId, int sectorId);

	List<UtData> findCommunityDataForFacilityView(Integer facilityTypeId,
			int timePeriod_NId, Integer blockId, int indicator_NId);

}
