package org.sdrc.ess.repository.springdatajpa;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.sdrc.ess.domain.UtIndicatorEn;
import org.sdrc.ess.domain.UtTimeperiod;

/**
 * 
 * @author Azaruddin(azaruddin@sdrc.co.in) This interface is added because of some limited feature of Spring Data JPA
 */

public interface UtIndicatorEnRepositoryCustom {

	public String fetchAllValuesOfIndicatorsForFacilityData(String columnNames, Integer blockId, Timestamp startDateInTimePeriod, Timestamp endDateInTimePeriod, Integer facilityTypeId);

	public String fetchAllValuesOfIndicatorsForCommunityData(String columnNames, Integer blockId, Timestamp startDateInTimePeriod, Timestamp endDateInTimePeriod, Integer facilityTypeId);

	
	public String fetchAllValuesOfIndicatorsForFacilityDataForDistrict(String columnNames, Integer districtId, Timestamp startDateInTimePeriod, Timestamp endDateInTimePeriod, Integer facilityTypeId);

	public String fetchAllValuesOfIndicatorsForCommunityDataForDistrict(String columnNames, Integer districtId, Timestamp startDateInTimePeriod, Timestamp endDateInTimePeriod, Integer facilityTypeId);
    
	public String fetchAllValuesForIndicatorsAndSubmissionId(String scoreColomnName,String maxScoreColumn,Long submissionId);
	
	public String fetchAllValuesForIndicatorsAndSubmissionId2(String scoreColomnName,String maxScoreColumn,Long submissionId);
	
	public String fetchAllValuesOfIndicatorsForFacilityDataRawData(String string);

	public String fetchAllValuesOfIndicatorsForCommunityDataRawData(String columnNames);
	
	public String findAllInJsonStructure();
	
	public String findByStateInJsonStructure(int stateId);
	
	public List<String> findAllTheSubmissionForAllTheIndictorsForAFacility(List<UtIndicatorEn> indicators,int facilityId,Date  startDate,Date endDate);
	
	public String findAllSubmissionWiseDesignationReportFacilityWise(Integer levelId, String stateId, String districtId,
			String blockId, String organizationId, String developmentPartnerId, String designationId,
			String patern, String startDate, String endDate);
	
	public String findAllSubmissionWiseDesignationReportCommunityWise(Integer levelId, String stateId, String districtId,
			String blockId, String organizationId, String developmentPartnerId, String designationId,
			String patern, String startDate, String endDate);

	
	public void callAggregationForIndicators(UtTimeperiod timeperiod)  throws Exception;
	
	/**
	 * @author Naseem Akhtar (naseem@sdrc.co.in) on 6th January 2018 11:24
	 * The following queries have been added for monitoring report.
	 * Fetch total registered users, logged in users by area.
	 * Fetch community and facility total visits and visits planned.
	 */

	List<Object[]> findRegisteredUsersStateWise(String endDate);
	
	List<Object[]> findRegisteredUsersDistrictWise(Integer areaNId, String endDate);
	
	List<Object[]> findRegisteredUsersBlockWise(Integer areaNId, String endDate);
	
	List<Object[]> findRegisteredUsersForBlock(Integer areaNId, Integer parentId, String endDate);
	
	
	

	/**
	 * @author Naseem Akhtar
	 * @param areaNId (For which area the query is being fired)
	 * @param startDate (startDate and endDate are time period for which the result is returned)
	 * @param endDate
	 * @return
	 */
	
//	List<Object[]> findUniqueAndTotalCommunityVisitsStateWise(Integer areaNId, String startDate, String endDate);
//
//	List<Object[]> findUniqueAndTotalCommunityVisitsDistrictWise(Integer areaNId, String startDate, String endDate);
//
//	List<Object[]> findUniqueAndTotalCommunityVisitsBlockWise(Integer areaNId, String startDate, String endDate);
//
//	List<Object[]> findUniqueAndTotalCommunityVisitsForBlock(Integer areaNId, String startDate, String endDate);

	List<Object[]> findLoggedInUsersStateWise(String startDate, String endDate);

	List<Object[]> findLoggedInUsersDistrictWise(Integer areaNId, String startDate, String endDate);

	List<Object[]> findLoggedInUsersBlockWise(Integer areaNId, String startDate, String endDate);

	List<Object[]> findLoggedInUsersForBlock(Integer areaNId, Integer parentId, String startDate, String endDate);

}
