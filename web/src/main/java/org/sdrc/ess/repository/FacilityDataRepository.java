package org.sdrc.ess.repository;

import java.sql.Date;
import java.util.List;

import org.sdrc.ess.domain.FacilityData;
import org.springframework.transaction.annotation.Transactional;

/**
 * This is th repository interface
 * 
 * @author Naseem Akhtar (naseem@sdrc.co.in) on 23-May-2017 2:04:00 am
 */
public interface FacilityDataRepository {

	@Transactional
	Iterable<FacilityData> save(Iterable<FacilityData> facilityDatas);

//	List<FacilityData> findByAreaAreaNIdIn(List<Integer> areaIdList);

	List<Object[]> findLatestByFacility(List<Integer> facilityList);

	List<FacilityData> findByUserIdAndAreaAreaNIdIn(Integer id, List<Integer> facilityIdList);
	
//	List<FacilityData> findByAreaAreaNIdInAndC7(List<Integer> areaIdList, Date parse);
	
	List<FacilityData> findTop5ByAreaAreaNIdOrderByC7Desc(int facilityId);
	
	List<FacilityData> findByC7Between(Date startDate,Date endDate );

	List<Object []> find3LatestSubmissionOfEachFacilityWithinADistrict(int districtId,int blockId);

	List<Object []> findLatestSubmissionOfEachFacilityWithinADistrict(int districtId,int blockId);
	
	List<Object []> find2LatestSubmissionOfEachFacilityWithinADistrict(int districtId,int blockId);
	
	List<Object []> findLastSubmissionOfEachFacilityWithinADistrict(int districtId,int blockId);

	List<FacilityData> findByIdIsIn(List<Long> submissionIdsInteger);
	
	List<FacilityData> findByBlockAndC7Between(int blockId,Date startDate,Date endDate);

	List<Object[]> findTheLatestSubmission(java.sql.Date startDate,
			java.sql.Date endDate);

	List<Object[]> findTheUnplannedLatestSubmission(java.sql.Date startDate,
			java.sql.Date endDate);

	void updateAggregationStatus(long id);

	List<FacilityData> findByIdIsInOrderByC7Desc(List<Long> submissionIdsInteger);

//	void updateAggregationStatus(int roleId, int areaId,
//			java.util.Date visitDate);
	
	List<FacilityData> findByBlockAndC7BetweenAndAreaFacilityTypeId(int blockId,Date startDate,Date endDate,int facilityTypeId);
	
	List<FacilityData> findAll();
	
	//All Organization
	List<Object[]> findByAllOrganization(Integer roleId, Date startDate,Date endDate);
	
	//By OrganizationId
	List<Object[]> findByAllOrganizationId(Integer roleId, Integer organizationId , Date startDate,Date endDate);
	
	//By OrganizationId & developmentPartnerId
	List<Object[]> findByAllOrganizationIdAndDevelopmentPartnerId(Integer roleId, Integer organizationId, Integer developmentPartnerId , Date startDate,Date endDate);
	
	//By OrganizationId & DesignationId 
	List<Object[]> findByAllOrganizationIdAndDesignationId(Integer roleId, Integer organizationId , Integer designationId , Date startDate,Date endDate);
	
	//All Organization
	List<Object[]> findByAllOrganizationAndAreaId(Integer roleId,Integer stateId,Integer districtId, Integer blockId, Date startDate,Date endDate);
		
	//By OrganizationId
	List<Object[]> findByAllOrganizationIdAndAreaId(Integer roleId,Integer stateId,Integer districtId, Integer blockId, Integer organizationId , Date startDate,Date endDate);
		
	//By OrganizationId & developmentPartnerId
	List<Object[]> findByAllOrganizationIdAndDevelopmentPartnerIdAndAreaId(Integer roleId,Integer stateId,Integer districtId, Integer blockId, Integer organizationId, Integer developmentPartnerId , Date startDate,Date endDate);
		
	//By OrganizationId & DesignationId 
	List<Object[]> findByAllOrganizationIdAndDesignationIdAndAreaId(Integer roleId,Integer stateId,Integer districtId, Integer blockId, Integer organizationId , Integer designationId , Date startDate,Date endDate);

	//All States
	List<Object[]> findUniqueAndTotalFacilityVisitsStateWise(String startDate, String endDate,
			List<Integer> facilityTypeIdList);

	//All Districts of a block
	List<Object[]> findUniqueAndTotalFacilityVisitsDistrictWise(Integer areaNId, String startDate, String endDate,
			List<Integer> facilityTypeIdList);

	//All Blocks of a district
	List<Object[]> findUniqueAndTotalFacilityVisitsBlockWise(Integer areaNId, String startDate, String endDate,
			List<Integer> facilityTypeIdList);

	// Particular block of a district
	List<Object[]> findUniqueAndTotalFacilityVisitsForBlock(Integer areaNId, String startDate, String endDate,
			List<Integer> facilityTypeIdList);
		
	
}
