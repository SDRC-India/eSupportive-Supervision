package org.sdrc.ess.repository.springdatajpa;

import java.sql.Date;
import java.util.Collection;
import java.util.List;

import org.sdrc.ess.domain.CommunityData;
import org.sdrc.ess.repository.CommunityDataRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

@RepositoryDefinition(domainClass=CommunityData.class, idClass=Long.class)
public interface SpringDataCommunityDataRepository extends CommunityDataRepository{
	
	@Override
	@Query(value="SELECT * FROM community_data cd WHERE cd.facility_id_fk=:facilityId ORDER BY cd.date DESC LIMIT 5", nativeQuery = true)
	List<CommunityData> findTop5ByAreaAreaNIdOrderByDateDesc(@Param("facilityId")int facilityId);
	
	
	
	@Override
	@Query("select cd from CommunityData cd where cd.date BETWEEN :startDate And :endDate")
	List<CommunityData> findByDateBetween(@Param("startDate")Date startDate, @Param("endDate")Date endDate);

	
	@Override
	@Query("SELECT facility.facility.name,facility.facility.areaNId,facility.note51a,facility.note5a,(facility.note51a*100)/facility.note5a,facility.facility.facilityType.name , facility.id "
			+ " ,facility.facility.parentAreaId FROM CommunityData facility where facility.isAggregated IS TRUE AND"
			+ "  facility.id IN "
			+ " (SELECT MAX(facility1.id) FROM CommunityData facility1 where facility1.isAggregated IS TRUE AND facility1.id NOT IN ("
			+ " SELECT MAX(facility2.id) FROM CommunityData facility2 where facility2.isAggregated IS TRUE"
			+ "  GROUP BY facility2.facility )"
			+ "   GROUP BY facility1.facility) "
			+ "  AND (facility.q2 =:districtId or facility.area.areaNId =:blockId)"
			)
	public List< Object []> find2LatestSubmissionOfEachFacilityWithinADistrict(@Param("districtId")int districtId, @Param("blockId")int blockId);
	
	
	@Override
	@Query("SELECT facility.facility.name,facility.facility.areaNId,facility.note51a,facility.note5a,(facility.note51a*100)/facility.note5a,facility.facility.facilityType.name , facility.id ,facility.facility.parentAreaId "
			+ " FROM CommunityData facility where isAggregated IS TRUE AND"
			+ "  facility.id IN "
			+ " (SELECT MAX(facility1.id) FROM CommunityData facility1 where facility1.isAggregated IS TRUE AND facility1.id NOT IN ("
			+ " SELECT MAX(facility2.id) FROM CommunityData facility2 where facility2.isAggregated IS TRUE AND facility1.id NOT IN ("
			+ " (SELECT MAX(facility3.id) FROM CommunityData facility3 where facility3.isAggregated IS TRUE GROUP BY facility3.facility) ) "
			+ "	GROUP BY facility2.facility )"
			+ " GROUP BY facility1.facility )"
			+ " AND (facility.q2 =:districtId or facility.area.areaNId =:blockId)"
			)
	public List< Object []> find3LatestSubmissionOfEachFacilityWithinADistrict(@Param("districtId")int districtId, @Param("blockId")int blockId);
	
	
	@Override
	@Query("SELECT facility.facility.name,facility.facility.areaNId,facility.note51a,facility.note5a,(facility.note51a*100)/facility.note5a ,facility.facility.facilityType.name, facility.id ,facility.facility.parentAreaId "
			+ "FROM CommunityData facility where facility.isAggregated IS TRUE "
			+ " AND facility.id IN "
			+ " (SELECT MAX(facility1.id) FROM CommunityData facility1 where "
			+ " facility1.isAggregated IS TRUE AND facility1.id NOT IN (SELECT MIN(facility2.id) "
			+ " FROM CommunityData facility2 where facility2.isAggregated IS TRUE GROUP BY facility2.facility ) GROUP BY facility1.facility)"
			+ " AND (facility.q2 =:districtId or facility.area.areaNId =:blockId)"
			)
	public List<Object []> findLatestSubmissionOfEachFacilityWithinADistrict(@Param("districtId")int districtId, @Param("blockId")int blockId);
	
	@Override
	@Query("SELECT facility.facility.name,facility.facility.areaNId,facility.note51a,facility.note5a,(facility.note51a*100)/facility.note5a ,facility.facility.facilityType.name , facility.id ,facility.facility.parentAreaId "
			+ "FROM CommunityData facility where facility.isAggregated IS TRUE AND"
			+ "  facility.id IN "
			+ " (SELECT MIN(facility1.id) FROM CommunityData facility1 where facility1.isAggregated IS TRUE GROUP BY facility1.facility )"
			+ " AND (facility.q2 =:districtId or facility.area.areaNId =:blockId)"
			)
	public List< Object []> findLastSubmissionOfEachFacilityWithinADistrict(@Param("districtId")int districtId, @Param("blockId")int blockId);
	
	@Override
	@Query("select cd from CommunityData cd where cd.area.areaNId=:blockId And cd.date BETWEEN :startDate And :endDate and cd.isAggregated IS TRUE")
	List<CommunityData> findByAreaAreaNIdAndDateBetween(@Param("blockId")int blockId,@Param("startDate")Date startDate, @Param("endDate")Date endDate);

	
	@Override
	@Query(" SELECT fd.id,fd.user.designationAreaOrganizationRoleMapping.role.roleId,fd.date,fd.facility.areaNId FROM  CommunityData fd , Planning pl"
			+ " WHERE fd.date  BETWEEN :startDate AND :endDate "
			+ " AND fd.user.id = pl.essUser.id "
			+ " AND DATE(fd.date)=DATE(pl.visitedDate)"
			+ "	AND fd.facility.areaNId=pl.facility.areaNId"
			+ " AND pl.isLive = true"
			+ " ORDER BY fd.facility.areaNId ASC,fd.user.designationAreaOrganizationRoleMapping.role.roleId ASC,fd.date DESC"
			 )
	public List<Object[]> findTheLatestSubmission(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
	
	@Override
	@Query(" SELECT fd.id,fd.user.designationAreaOrganizationRoleMapping.role.roleId,fd.date,fd.facility.areaNId FROM  CommunityData fd "
			+ " WHERE fd.date  BETWEEN :startDate AND :endDate "
			+ "	AND fd.facility.areaNId NOT IN (SELECT   pl.facility.areaNId  from Planning pl WHERE pl.visitedDate IS NOT NULL AND pl.visitedDate BETWEEN :startDate AND :endDate)"

			+ " ORDER BY fd.facility.areaNId ASC,fd.user.designationAreaOrganizationRoleMapping.role.roleId ASC,fd.date DESC"
			 )
	public List<Object[]> findTheUnplannedLatestSubmission(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

	
	@Override
	@Transactional
	@Modifying
	@Query("UPDATE CommunityData cd SET cd.isAggregated=TRUE WHERE cd.id=:id")
	public void updateAggregationStatus(@Param("id")long id);
	
	@Override
	@Transactional
	@Modifying
	@Query("UPDATE CommunityData cd SET cd.isAggregated=TRUE")
	public void updateAggregationStatusForAll();
	
	@Override
	@Query("select cd from CommunityData cd where cd.area.areaNId=:blockId AND facility.facilityType.id=:fcilityTypeId And cd.date BETWEEN :startDate And :endDate and cd.isAggregated IS TRUE")
	List<CommunityData> findByAreaAreaNIdAndDateBetweenAndFacilityFacilityTypeId(@Param("blockId")int blockId,@Param("startDate")Date startDate, @Param("endDate")Date endDate, @Param("fcilityTypeId")int fcilityTypeId);
	
	@Override
	@Query(value = "select org.organization_name, de.name, count(cd.user_id) from ess_user usr "
			+ " right join designation_area_organization_role_mapping daorm on"
			+ " daorm.designation_area_mapping_id_pk = usr.desig_area_org_role_map_id_fk "
			+ " right join designation de on daorm.designation_id_fk=de.id_pk "
			+ " right join organization org on daorm.organization_id_fk = org.organization_id_pk "
			+ " left join community_data cd on usr.id_pk=cd.user_id and cd.date between :startDate and :endDate"
			+ " group by daorm.area_id_fk, daorm.role_id_fk, org.organization_name, de.name "
			+ " having daorm.role_id_fk=:roleId order by org.organization_name, de.name", nativeQuery = true)
	List<Object[]> findByAllOrganization(@Param("roleId")Integer roleId, @Param("startDate")Date startDate,@Param("endDate")Date endDate);
	
	@Override
	@Query(value = " select org.organization_name, de.name, count(cd.user_id) from ess_user usr "
			+ "right join designation_area_organization_role_mapping daorm on "
			+ "daorm.designation_area_mapping_id_pk = usr.desig_area_org_role_map_id_fk"
			+ " right join designation de on daorm.designation_id_fk=de.id_pk "
			+ "right join organization org on daorm.organization_id_fk = org.organization_id_pk "
			+ "left join community_data cd on usr.id_pk=cd.user_id and cd.date between :startDate and :endDate"
			+ " group by daorm.area_id_fk, daorm.role_id_fk, org.organization_name, de.name,daorm.organization_id_fk "
			+ "having daorm.role_id_fk=:roleId and daorm.organization_id_fk =:organizationId order by org.organization_name, de.name", nativeQuery = true)
	List<Object[]> findByAllOrganizationId(@Param("roleId")Integer roleId, @Param("organizationId")Integer organizationId, @Param("startDate")Date startDate,@Param("endDate")Date endDate);
	
	
	@Override
	@Query(value = " select org.organization_name, de.name, count(cd.user_id) from ess_user usr "
			+ "right join designation_area_organization_role_mapping daorm on "
			+ "daorm.designation_area_mapping_id_pk = usr.desig_area_org_role_map_id_fk and usr.develomentpartner_id_fk=:developmentPartnerId"
			+ " right join designation de on daorm.designation_id_fk=de.id_pk "
			+ "right join organization org on daorm.organization_id_fk = org.organization_id_pk "
			+ "left join community_data cd on usr.id_pk=cd.user_id and cd.date between :startDate and :endDate"
			+ " group by daorm.area_id_fk, daorm.role_id_fk, org.organization_name, de.name,daorm.organization_id_fk "
			+ "having daorm.role_id_fk=:roleId and daorm.organization_id_fk =:organizationId order by org.organization_name, de.name", nativeQuery = true)
	List<Object[]> findByAllOrganizationIdAndDevelopmentPartnerId(@Param("roleId")Integer roleId, @Param("organizationId")Integer organizationId, @Param("developmentPartnerId")Integer developmentPartnerId, @Param("startDate")Date startDate,@Param("endDate")Date endDate);
	
	@Override
	@Query(value = " select org.organization_name, de.name, count(cd.user_id) from ess_user usr "
			+ "right join designation_area_organization_role_mapping daorm on "
			+ "daorm.designation_area_mapping_id_pk = usr.desig_area_org_role_map_id_fk"
			+ " right join designation de on daorm.designation_id_fk=de.id_pk "
			+ "right join organization org on daorm.organization_id_fk = org.organization_id_pk "
			+ "left join community_data cd on usr.id_pk=cd.user_id and cd.date between :startDate and :endDate"
			+ " group by daorm.area_id_fk, daorm.role_id_fk, org.organization_name, de.name,daorm.organization_id_fk,daorm.designation_id_fk "
			+ "having daorm.role_id_fk=:roleId and daorm.organization_id_fk =:organizationId and daorm.designation_id_fk =:designationId order by org.organization_name, de.name", nativeQuery = true)
	List<Object[]> findByAllOrganizationIdAndDesignationId(@Param("roleId")Integer roleId, @Param("organizationId")Integer organizationId,@Param("designationId")Integer designationId, @Param("startDate")Date startDate,@Param("endDate")Date endDate);
	
	@Override
	@Query(value = "select org.organization_name, de.name, count(cd.user_id) from ess_user usr "
			+ " right join designation_area_organization_role_mapping daorm on"
			+ " daorm.designation_area_mapping_id_pk = usr.desig_area_org_role_map_id_fk "
			+ " right join designation de on daorm.designation_id_fk=de.id_pk "
			+ " right join organization org on daorm.organization_id_fk = org.organization_id_pk "
			+ " left join community_data cd on usr.id_pk=cd.user_id and cd.date between :startDate and :endDate and (cd.area_id_fk=:blockId or cd.q2=:districtId or cd.q2=:stateId)"
			+ " group by daorm.area_id_fk, daorm.role_id_fk, org.organization_name, de.name "
			+ " having daorm.role_id_fk=:roleId order by org.organization_name, de.name", nativeQuery = true)
	List<Object[]> findByAllOrganizationAndAreaId(@Param("roleId")Integer roleId,@Param("stateId")Integer stateId,@Param("districtId")Integer districtId,@Param("blockId") Integer blockId, @Param("startDate")Date startDate,@Param("endDate")Date endDate);
	
	
	@Override
	@Query(value = " select org.organization_name, de.name, count(cd.user_id) from ess_user usr "
			+ "right join designation_area_organization_role_mapping daorm on "
			+ "daorm.designation_area_mapping_id_pk = usr.desig_area_org_role_map_id_fk"
			+ " right join designation de on daorm.designation_id_fk=de.id_pk "
			+ "right join organization org on daorm.organization_id_fk = org.organization_id_pk "
			+ "left join community_data cd on usr.id_pk=cd.user_id and cd.date between :startDate and :endDate and (cd.area_id_fk=:blockId or cd.q2=:districtId or cd.q2=:stateId)"
			+ " group by daorm.area_id_fk, daorm.role_id_fk, org.organization_name, de.name,daorm.organization_id_fk "
			+ "having daorm.role_id_fk=:roleId and daorm.organization_id_fk =:organizationId order by org.organization_name, de.name", nativeQuery = true)
	List<Object[]> findByAllOrganizationIdAndAreaId(@Param("roleId")Integer roleId,@Param("stateId")Integer stateId,@Param("districtId")Integer districtId,@Param("blockId") Integer blockId, @Param("organizationId")Integer organizationId, @Param("startDate")Date startDate,@Param("endDate")Date endDate);
	
	
	@Override
	@Query(value = " select org.organization_name, de.name, count(cd.user_id) from ess_user usr "
			+ "right join designation_area_organization_role_mapping daorm on "
			+ "daorm.designation_area_mapping_id_pk = usr.desig_area_org_role_map_id_fk and usr.develomentpartner_id_fk=:developmentPartnerId"
			+ " right join designation de on daorm.designation_id_fk=de.id_pk "
			+ "right join organization org on daorm.organization_id_fk = org.organization_id_pk "
			+ "left join community_data cd on usr.id_pk=cd.user_id and cd.date between :startDate and :endDate and (cd.area_id_fk=:blockId or cd.q2=:districtId or cd.q2=:stateId)"
			+ " group by daorm.area_id_fk, daorm.role_id_fk, org.organization_name, de.name,daorm.organization_id_fk "
			+ "having daorm.role_id_fk=:roleId and daorm.organization_id_fk =:organizationId order by org.organization_name, de.name", nativeQuery = true)
	List<Object[]> findByAllOrganizationIdAndDevelopmentPartnerIdAndAreaId(@Param("roleId")Integer roleId,@Param("stateId")Integer stateId,@Param("districtId")Integer districtId,@Param("blockId") Integer blockId, @Param("organizationId")Integer organizationId, @Param("developmentPartnerId")Integer developmentPartnerId, @Param("startDate")Date startDate,@Param("endDate")Date endDate);
	
	@Override
	@Query(value = " select org.organization_name, de.name, count(cd.user_id) from ess_user usr "
			+ "right join designation_area_organization_role_mapping daorm on "
			+ "daorm.designation_area_mapping_id_pk = usr.desig_area_org_role_map_id_fk"
			+ " right join designation de on daorm.designation_id_fk=de.id_pk "
			+ "right join organization org on daorm.organization_id_fk = org.organization_id_pk "
			+ "left join community_data cd on usr.id_pk=cd.user_id and cd.date between :startDate and :endDate and (cd.area_id_fk=:blockId or cd.q2=:districtId or cd.q2=:stateId)"
			+ " group by daorm.area_id_fk, daorm.role_id_fk, org.organization_name, de.name,daorm.organization_id_fk,daorm.designation_id_fk "
			+ "having daorm.role_id_fk=:roleId and daorm.organization_id_fk =:organizationId and daorm.designation_id_fk =:designationId order by org.organization_name, de.name", nativeQuery = true)
	List<Object[]> findByAllOrganizationIdAndDesignationIdAndAreaId(@Param("roleId")Integer roleId,@Param("stateId")Integer stateId,@Param("districtId")Integer districtId,@Param("blockId") Integer blockId, @Param("organizationId")Integer organizationId,@Param("designationId")Integer designationId, @Param("startDate")Date startDate,@Param("endDate")Date endDate);

	
	
	
	


}
