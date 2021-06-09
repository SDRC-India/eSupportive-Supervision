package org.sdrc.ess.repository.springdatajpa;

import java.sql.Date;
import java.util.List;

import org.sdrc.ess.domain.FacilityData;
import org.sdrc.ess.repository.FacilityDataRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
/**
 *
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 14-May-2017 10:13:16 am
 * @author Naseem Akhtar (naseem@sdrc.co.in) on 14th June 2017 12:15:00 pm
 */
@RepositoryDefinition(domainClass=FacilityData.class, idClass=Long.class)
public interface SpringDataFacilityDataRepository extends FacilityDataRepository {
	
	@Override
	@Query(value="select d.facility_id, d.c7, d.district, d.g11, d.g12, d.g13, d.g14, d.g15, d.g21, d.g22, " +
			"d.g23, d.g24, d.g25, d.g31, d.g32, d.g33, d.g34, d.g35, d.g41, d.g42, d.g43, d.g44, d.g45, d.g51, d.g52, d.g53, " +
			"d.g54, d.g55 from "+
			"facility_data d where id_pk in (select max(id_pk) "+
			"from facility_data where facility_id IN (:facilityIds) group by facility_id)", nativeQuery = true)
	List<Object[]> findLatestByFacility(@Param("facilityIds") List<Integer> facilityList);

/**
 * Debiprasad
 */
			@Override
			@Query(value="SELECT * FROM facility_data fd WHERE fd.facility_id=:facilityId ORDER BY fd.c7 DESC LIMIT 5", nativeQuery = true)
			List<FacilityData> findTop5ByAreaAreaNIdOrderByC7Desc( @Param("facilityId")int facilityId) ;
			
			
			@Override
			@Query("select fd from FacilityData fd where fd.c7 BETWEEN :startDate And :endDate")
			List<FacilityData> findByC7Between(@Param("startDate")Date startDate, @Param("endDate")Date endDate);


			@Override
			@Query("SELECT facility.area.name,facility.area.areaNId,facility.checklist_score_max,facility.checklist_score,(facility.checklist_score*100.00)/facility.checklist_score_max ,facility.area.facilityType.name , facility.id ,facility.area.parentAreaId  FROM FacilityData facility where facility.isAggregated IS TRUE AND"
					+ "  facility.id IN "
					+ " (SELECT MAX(facility1.id) FROM FacilityData facility1 where facility1.isAggregated IS TRUE AND facility1.id NOT IN ("
					+ " SELECT MAX(facility2.id) FROM FacilityData facility2 where facility2.isAggregated IS TRUE AND facility2.id NOT IN ("
					+ " (SELECT MAX(facility3.id) FROM FacilityData facility3 where facility3.isAggregated IS TRUE  AND facility3.id NOT IN (SELECT MIN(facility4.id) FROM FacilityData facility4 where facility4.isAggregated IS TRUE GROUP BY  facility4.area) GROUP BY  facility3.district)"
					+ " ) GROUP BY  facility2.area )"
					+ " GROUP BY  facility1.area )"
					+ "  AND (facility.district =:districtId or facility.block =:blockId )"
					)
			public List<Object []> find3LatestSubmissionOfEachFacilityWithinADistrict(@Param("districtId")int districtId,@Param("blockId")int blockId);
			
			@Override
			@Query("SELECT facility.area.name,facility.area.areaNId,facility.checklist_score_max,facility.checklist_score,(facility.checklist_score*100.00)/facility.checklist_score_max ,facility.area.facilityType.name , facility.id ,facility.area.parentAreaId   FROM FacilityData facility where facility.isAggregated IS TRUE AND"
					+ "  facility.id IN "
					+ " (SELECT MAX(facility1.id) FROM FacilityData facility1 where facility1.isAggregated IS TRUE AND facility1.id NOT IN ("
					+ " SELECT MAX(facility2.id) FROM FacilityData facility2 where facility2.isAggregated IS TRUE AND facility2.id NOT IN (SELECT MIN(facility4.id) FROM FacilityData facility4 where facility4.isAggregated IS TRUE GROUP BY  facility4.area) GROUP BY  facility2.district) GROUP BY  facility1.area)"
					+ " AND (facility.district =:districtId or facility.block =:blockId )"
					)
			public List<Object []> find2LatestSubmissionOfEachFacilityWithinADistrict(@Param("districtId")int districtId,@Param("blockId")int blockId);
			
			
			@Override
			@Query("SELECT facility.area.name,facility.area.areaNId,facility.checklist_score_max,facility.checklist_score,(facility.checklist_score*100.00)/facility.checklist_score_max ,facility.area.facilityType.name , facility.id ,facility.area.parentAreaId   FROM FacilityData facility where facility.isAggregated IS TRUE AND"
					+ "  facility.id IN "
					+ " (SELECT MIN(facility1.id) FROM FacilityData facility1 where facility1.isAggregated IS TRUE GROUP BY  facility1.area)"
					+ " AND (facility.district =:districtId or facility.block =:blockId ) "
					)
			public List<Object []> findLastSubmissionOfEachFacilityWithinADistrict(@Param("districtId")int districtId,@Param("blockId")int blockId);
			
			
			@Override
			@Query("SELECT facility.area.name,facility.area.areaNId,facility.checklist_score_max,facility.checklist_score,(facility.checklist_score*100.00)/facility.checklist_score_max ,facility.area.facilityType.name , facility.id ,facility.area.parentAreaId   FROM FacilityData facility where facility.isAggregated IS TRUE "
					+ " AND facility.id IN "
					+ " (SELECT MAX(facility1.id) FROM FacilityData facility1 where "
					+ " facility1.isAggregated IS TRUE AND facility1.id NOT IN (SELECT MIN(facility2.id) "
					+ " FROM FacilityData facility2 where facility2.isAggregated IS TRUE "
					+ " GROUP BY  facility2.area)"
					+ "  GROUP BY  facility1.area ) AND (facility.district =:districtId or facility.block =:blockId )"
					)
			public List<Object []> findLatestSubmissionOfEachFacilityWithinADistrict(@Param("districtId")int districtId,@Param("blockId")int blockId);
			
			
			@Override
			@Query("select fd from FacilityData fd where fd.block=:blockId And fd.c7 BETWEEN :startDate And :endDate AND fd.isAggregated IS TRUE")
			 List<FacilityData> findByBlockAndC7Between(@Param("blockId")int blockId,@Param("startDate")Date startDate, @Param("endDate")Date endDate);
			
			
			
			@Override
			@Query(" SELECT fd.id,fd.user.designationAreaOrganizationRoleMapping.role.roleId,fd.c7,fd.area.areaNId FROM  FacilityData fd , Planning pl"
					+ " WHERE fd.c7  BETWEEN :startDate AND :endDate "
					+ " AND fd.user.id = pl.essUser.id "
					+ " AND DATE(fd.c7)=DATE(pl.visitedDate)"
					+ " AND pl.isLive = true"
					+ " AND fd.area.areaNId=pl.facility.areaNId"
			
					+ " ORDER BY fd.area.areaNId ASC,fd.user.designationAreaOrganizationRoleMapping.role.roleId ASC ,fd.c7 DESC"
					 )
			public List<Object[]> findTheLatestSubmission(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

			
			
			@Override
			@Query(" SELECT fd.id,fd.user.designationAreaOrganizationRoleMapping.role.roleId,fd.c7,fd.area.areaNId FROM  FacilityData fd "
					+ " WHERE fd.c7  BETWEEN :startDate AND :endDate "
					+ "	AND fd.area.areaNId NOT IN (SELECT   pl.facility.areaNId  From Planning pl WHERE pl.visitedDate IS NOT NULL AND pl.visitedDate BETWEEN :startDate AND :endDate)"
				
					+ " ORDER BY fd.area.areaNId ASC,fd.user.designationAreaOrganizationRoleMapping.role.roleId ASC ,fd.c7 DESC"
					 )
			public List<Object[]> findTheUnplannedLatestSubmission(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
			
			
			
		@Override
		@Transactional
		@Modifying
		@Query("UPDATE FacilityData cd SET cd.isAggregated=TRUE WHERE cd.id=:id")
		public void updateAggregationStatus(@Param("id")long id);
		
		
		@Override
		@Query("Select fd FROM FacilityData fd where fd.id in :submissionIdsInteger "
				+ " ORDER BY fd.c7 DESC")
		public List<FacilityData> findByIdIsInOrderByC7Desc(
				@Param("submissionIdsInteger")List<Long> submissionIdsInteger);
		
		@Override
		@Query("SELECT fd FROM FacilityData fd WHERE fd.block=:blockId AND area.facilityType.id=:fcilityTypeId  AND fd.c7 BETWEEN :startDate AND :endDate AND fd.isAggregated IS TRUE ")
		 List<FacilityData> findByBlockAndC7BetweenAndAreaFacilityTypeId(@Param("blockId")int blockId,@Param("startDate")Date startDate, @Param("endDate")Date endDate, @Param("fcilityTypeId")int fcilityTypeId);
		
		@Override
		@Query(value = "select org.organization_name, de.name, count(fd.user_id) from ess_user usr "
				+ " right join designation_area_organization_role_mapping daorm on"
				+ " daorm.designation_area_mapping_id_pk = usr.desig_area_org_role_map_id_fk "
				+ " right join designation de on daorm.designation_id_fk=de.id_pk "
				+ " right join organization org on daorm.organization_id_fk = org.organization_id_pk "
				+ " left join facility_data fd on usr.id_pk=fd.user_id and fd.c7 between :startDate and :endDate"
				+ " group by daorm.area_id_fk, daorm.role_id_fk, org.organization_name, de.name "
				+ " having daorm.role_id_fk=:roleId order by org.organization_name, de.name", nativeQuery = true)
		List<Object[]> findByAllOrganization(@Param("roleId")Integer roleId, @Param("startDate")Date startDate,@Param("endDate")Date endDate);
		
		
		@Override
		@Query(value = " select org.organization_name, de.name, count(fd.user_id) from ess_user usr "
				+ "right join designation_area_organization_role_mapping daorm on "
				+ "daorm.designation_area_mapping_id_pk = usr.desig_area_org_role_map_id_fk"
				+ " right join designation de on daorm.designation_id_fk=de.id_pk "
				+ "right join organization org on daorm.organization_id_fk = org.organization_id_pk "
				+ "left join facility_data fd on usr.id_pk=fd.user_id and fd.c7 between :startDate and :endDate"
				+ " group by daorm.area_id_fk, daorm.role_id_fk, org.organization_name, de.name,daorm.organization_id_fk "
				+ "having daorm.role_id_fk=:roleId and daorm.organization_id_fk =:organizationId order by org.organization_name, de.name", nativeQuery = true)
		List<Object[]> findByAllOrganizationId(@Param("roleId")Integer roleId, @Param("organizationId")Integer organizationId, @Param("startDate")Date startDate,@Param("endDate")Date endDate);
		
		
		@Override
		@Query(value = " select org.organization_name, de.name, count(fd.user_id) from ess_user usr "
				+ "right join designation_area_organization_role_mapping daorm on "
				+ "daorm.designation_area_mapping_id_pk = usr.desig_area_org_role_map_id_fk and usr.develomentpartner_id_fk=:developmentPartnerId"
				+ " right join designation de on daorm.designation_id_fk=de.id_pk "
				+ "right join organization org on daorm.organization_id_fk = org.organization_id_pk "
				+ "left join facility_data fd on usr.id_pk=fd.user_id and fd.c7 between :startDate and :endDate"
				+ " group by daorm.area_id_fk, daorm.role_id_fk, org.organization_name, de.name,daorm.organization_id_fk "
				+ "having daorm.role_id_fk=:roleId and daorm.organization_id_fk =:organizationId order by org.organization_name, de.name", nativeQuery = true)
		List<Object[]> findByAllOrganizationIdAndDevelopmentPartnerId(@Param("roleId")Integer roleId, @Param("organizationId")Integer organizationId, @Param("developmentPartnerId")Integer developmentPartnerId, @Param("startDate")Date startDate,@Param("endDate")Date endDate);
		
		@Override
		@Query(value = " select org.organization_name, de.name, count(fd.user_id) from ess_user usr "
				+ "right join designation_area_organization_role_mapping daorm on "
				+ "daorm.designation_area_mapping_id_pk = usr.desig_area_org_role_map_id_fk"
				+ " right join designation de on daorm.designation_id_fk=de.id_pk "
				+ "right join organization org on daorm.organization_id_fk = org.organization_id_pk "
				+ "left join facility_data fd on usr.id_pk=fd.user_id and fd.c7 between :startDate and :endDate"
				+ " group by daorm.area_id_fk, daorm.role_id_fk, org.organization_name, de.name,daorm.organization_id_fk,daorm.designation_id_fk "
				+ "having daorm.role_id_fk=:roleId and daorm.organization_id_fk =:organizationId and daorm.designation_id_fk =:designationId order by org.organization_name, de.name", nativeQuery = true)
		List<Object[]> findByAllOrganizationIdAndDesignationId(@Param("roleId")Integer roleId, @Param("organizationId")Integer organizationId,@Param("designationId")Integer designationId, @Param("startDate")Date startDate,@Param("endDate")Date endDate);
		
		@Override
		@Query(value = "select org.organization_name, de.name, count(fd.user_id) from ess_user usr "
				+ " right join designation_area_organization_role_mapping daorm on"
				+ " daorm.designation_area_mapping_id_pk = usr.desig_area_org_role_map_id_fk "
				+ " right join designation de on daorm.designation_id_fk=de.id_pk "
				+ " right join organization org on daorm.organization_id_fk = org.organization_id_pk "
				+ " left join facility_data fd on usr.id_pk=fd.user_id and fd.c7 between :startDate and :endDate and (fd.block=:blockId or fd.district=:districtId or fd.statename=:stateId)"
				+ " group by daorm.area_id_fk, daorm.role_id_fk, org.organization_name, de.name "
				+ " having daorm.role_id_fk=:roleId order by org.organization_name, de.name", nativeQuery = true)
		List<Object[]> findByAllOrganizationAndAreaId(@Param("roleId")Integer roleId,@Param("stateId")Integer stateId,@Param("districtId")Integer districtId,@Param("blockId") Integer blockId, @Param("startDate")Date startDate,@Param("endDate")Date endDate);
		
		
		@Override
		@Query(value = " select org.organization_name, de.name, count(fd.user_id) from ess_user usr "
				+ "right join designation_area_organization_role_mapping daorm on "
				+ "daorm.designation_area_mapping_id_pk = usr.desig_area_org_role_map_id_fk"
				+ " right join designation de on daorm.designation_id_fk=de.id_pk "
				+ "right join organization org on daorm.organization_id_fk = org.organization_id_pk "
				+ "left join facility_data fd on usr.id_pk=fd.user_id and fd.c7 between :startDate and :endDate and (fd.block=:blockId or fd.district=:districtId or fd.statename=:stateId)"
				+ " group by daorm.area_id_fk, daorm.role_id_fk, org.organization_name, de.name,daorm.organization_id_fk "
				+ "having daorm.role_id_fk=:roleId and daorm.organization_id_fk =:organizationId order by org.organization_name, de.name", nativeQuery = true)
		List<Object[]> findByAllOrganizationIdAndAreaId(@Param("roleId")Integer roleId,@Param("stateId")Integer stateId,@Param("districtId")Integer districtId,@Param("blockId") Integer blockId, @Param("organizationId")Integer organizationId, @Param("startDate")Date startDate,@Param("endDate")Date endDate);
		
		
		@Override
		@Query(value = " select org.organization_name, de.name, count(fd.user_id) from ess_user usr "
				+ "right join designation_area_organization_role_mapping daorm on "
				+ "daorm.designation_area_mapping_id_pk = usr.desig_area_org_role_map_id_fk and usr.develomentpartner_id_fk=:developmentPartnerId"
				+ " right join designation de on daorm.designation_id_fk=de.id_pk "
				+ "right join organization org on daorm.organization_id_fk = org.organization_id_pk "
				+ "left join facility_data fd on usr.id_pk=fd.user_id and fd.c7 between :startDate and :endDate and (fd.block=:blockId or fd.district=:districtId or fd.statename=:stateId)"
				+ " group by daorm.area_id_fk, daorm.role_id_fk, org.organization_name, de.name,daorm.organization_id_fk "
				+ "having daorm.role_id_fk=:roleId and daorm.organization_id_fk =:organizationId order by org.organization_name, de.name", nativeQuery = true)
		List<Object[]> findByAllOrganizationIdAndDevelopmentPartnerIdAndAreaId(@Param("roleId")Integer roleId,@Param("stateId")Integer stateId,@Param("districtId")Integer districtId,@Param("blockId") Integer blockId, @Param("organizationId")Integer organizationId, @Param("developmentPartnerId")Integer developmentPartnerId, @Param("startDate")Date startDate,@Param("endDate")Date endDate);
		
		@Override
		@Query(value = " select org.organization_name, de.name, count(fd.user_id) from ess_user usr "
				+ "right join designation_area_organization_role_mapping daorm on "
				+ "daorm.designation_area_mapping_id_pk = usr.desig_area_org_role_map_id_fk"
				+ " right join designation de on daorm.designation_id_fk=de.id_pk "
				+ "right join organization org on daorm.organization_id_fk = org.organization_id_pk "
				+ "left join facility_data fd on usr.id_pk=fd.user_id and fd.c7 between :startDate and :endDate and (fd.block=:blockId or fd.district=:districtId or fd.statename=:stateId)"
				+ " group by daorm.area_id_fk, daorm.role_id_fk, org.organization_name, de.name,daorm.organization_id_fk,daorm.designation_id_fk "
				+ "having daorm.role_id_fk=:roleId and daorm.organization_id_fk =:organizationId and daorm.designation_id_fk =:designationId order by org.organization_name, de.name", nativeQuery = true)
		List<Object[]> findByAllOrganizationIdAndDesignationIdAndAreaId(@Param("roleId")Integer roleId,@Param("stateId")Integer stateId,@Param("districtId")Integer districtId,@Param("blockId") Integer blockId, @Param("organizationId")Integer organizationId,@Param("designationId")Integer designationId, @Param("startDate")Date startDate,@Param("endDate")Date endDate);
		
		
		@Override
		@Query(value = "select  fd.statename,count(fd.facility_id) as total_submission,count(distinct fd.facility_id) as "
					+ "uniqueSubmission from facility_data fd LEFT JOIN area ar on ar.area_nid_pk = fd.facility_id "
					+ "WHERE fd.created_date BETWEEN cast(:startDate as timestamp) AND cast(:endDate as timestamp) "
					+ "AND ar.facility_type_id_fk IN (:facilityTypeIdList) "
					+ "group by fd.statename order by fd.statename", nativeQuery = true)
		List<Object []> findUniqueAndTotalFacilityVisitsStateWise(@Param("startDate") String startDate,
				@Param("endDate") String endDate,@Param("facilityTypeIdList") List<Integer> facilityTypeId);
		
		@Override
		@Query(value = "select fd.district,count(fd.facility_id) as total_submission,count(distinct fd.facility_id) as "
					+ "uniqueSubmission from facility_data fd LEFT JOIN area ar on ar.area_nid_pk = fd.facility_id "
					+ "WHERE fd.statename =:areaId AND fd.created_date "
					+ "BETWEEN cast(:startDate as timestamp) AND cast(:endDate as timestamp) "
					+ "AND ar.facility_type_id_fk IN (:facilityTypeIdList) "
					+ "group by fd.district order by fd.district", nativeQuery = true)
		List<Object []> findUniqueAndTotalFacilityVisitsDistrictWise(@Param("areaId") Integer areaNId, 
				@Param("startDate") String startDate, @Param("endDate") String endDate,
				@Param("facilityTypeIdList") List<Integer> facilityTypeId);
		
		@Override
		@Query(value = "select fd.block,count(fd.facility_id) as total_submission,count(distinct fd.facility_id) as "
					+ "uniqueSubmission from facility_data fd LEFT JOIN area ar on ar.area_nid_pk = fd.facility_id "
					+ "WHERE fd.district =:areaId AND fd.created_date "
					+ "BETWEEN cast(:startDate as timestamp) AND cast(:endDate as timestamp) "
					+ "AND ar.facility_type_id_fk IN (:facilityTypeIdList) "
					+ "group by fd.block order by fd.block", nativeQuery = true)
		public List<Object []> findUniqueAndTotalFacilityVisitsBlockWise(@Param("areaId") Integer areaNId, 
				@Param("startDate") String startDate, @Param("endDate") String endDate,
				@Param("facilityTypeIdList") List<Integer> facilityTypeId);
		
		@Override
		@Query(value = "select fd.block,count(fd.facility_id) as total_submission,count(distinct fd.facility_id) as "
					+ "uniqueSubmission from facility_data fd LEFT JOIN area ar on ar.area_nid_pk = fd.facility_id "
					+ "WHERE fd.block =:areaId AND fd.created_date "
					+ "BETWEEN cast(:startDate as timestamp) AND cast(:endDate as timestamp) "
					+ "AND ar.facility_type_id_fk IN (:facilityTypeIdList) "
					+ "group by fd.block order by fd.block", nativeQuery = true)
		public List<Object []> findUniqueAndTotalFacilityVisitsForBlock(@Param("areaId") Integer areaNId, 
				@Param("startDate") String startDate, @Param("endDate") String endDate,
				@Param("facilityTypeIdList") List<Integer> facilityTypeId);

}
