package org.sdrc.ess.repository;

import java.sql.Date;
import java.util.Collection;
import java.util.List;

import org.sdrc.ess.domain.CommunityData;
import org.springframework.transaction.annotation.Transactional;

public interface CommunityDataRepository {

	@Transactional
	Iterable<CommunityData> save(Iterable<CommunityData> communityDatas);
	
	
	List<CommunityData> findTop5ByAreaAreaNIdOrderByDateDesc(int facilityId);
	
	List<CommunityData> findByDateBetween(Date startDate,Date endDate );


	List<Object []> findLatestSubmissionOfEachFacilityWithinADistrict(int districtId, int blockId);


	List< Object []> find2LatestSubmissionOfEachFacilityWithinADistrict(int districtId, int blockId);


	List< Object []> find3LatestSubmissionOfEachFacilityWithinADistrict(int districtId, int blockId);


	List< Object []> findLastSubmissionOfEachFacilityWithinADistrict(int districtId, int blockId);



	List<CommunityData> findByIdIsInOrderByDateDesc(List<Long> submissionIdsInteger);
	
	List<CommunityData> findByAreaAreaNIdAndDateBetween(int blockId,Date startDate,Date endDate);


	List<Object[]> findTheLatestSubmission(java.sql.Date startDate,
			java.sql.Date endDate);


	List<Object[]> findTheUnplannedLatestSubmission(java.sql.Date startDate,
			java.sql.Date endDate);


	void updateAggregationStatus(long id);




//	void updateAggregationStatus(int roleId, int areaId,
//			java.util.Date visitDate);
	
	List<CommunityData> findByAreaAreaNIdAndDateBetweenAndFacilityFacilityTypeId(int blockId,Date startDate,Date endDate, int facilityTypeId);


	void updateAggregationStatusForAll();
	
	List<CommunityData> findAll();
	
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
			
	
	


	List<CommunityData> findByDateBetweenAndFacilityAreaNId(
			java.util.Date startDate, java.util.Date endDate, int facilityId);


	List<CommunityData> findByDateBetweenAndFacilityAreaNIdOrderByDateAsc(
			java.util.Date startDate, java.util.Date endDate, int facilityId);

}
