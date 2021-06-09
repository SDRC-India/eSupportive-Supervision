package org.sdrc.ess.repository.springdatajpa;

import java.sql.Timestamp;
import java.util.List;

import org.sdrc.ess.domain.DesignationAreaOrganizationRoleMapping;
import org.sdrc.ess.repository.DesignationAreaOrganizationRoleMappingRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.data.repository.query.Param;

@RepositoryDefinition(domainClass = DesignationAreaOrganizationRoleMapping.class, idClass = Integer.class)
public interface SpringDataDesignationAreaOrganizationRoleMappingRepository
		extends DesignationAreaOrganizationRoleMappingRepository {

	@Modifying
	@Query("update DesignationAreaOrganizationRoleMapping u set u.isResponsibleFacility = :isResponsibleFacility, u.isResponsibleCommunity =:isResponsibleCommunity,u.updatedDate=:updatedDate where u.id =:id")
	void updateDesignationAreaOrganizationRoleMapping(
			@Param(value = "isResponsibleFacility") Boolean isResponsibleFacility,
			@Param(value = "isResponsibleCommunity") Boolean isResponsibleCommunity,
			@Param(value = "updatedDate") Timestamp updatedDate, @Param(value = "id") Integer id);

	@Override
	@Query("select daor from DesignationAreaOrganizationRoleMapping daor where (daor.area.areaNId IN (:areaIds) AND "
			+ "daor.role.roleId IN (:roleIds)) AND (daor.isResponsibleFacility = TRUE OR daor.isResponsibleCommunity = TRUE)")
	List<DesignationAreaOrganizationRoleMapping> findDesignationForPOA(@Param("areaIds") List<Integer> areaIds,
			@Param("roleIds") List<Integer> roleIds);

	@Override
	@Query(value = "select * from designation_area_organization_role_mapping daor WHERE "
			+ "(daor.created_date > :syncDate OR daor.updated_date > :syncDate) AND "
			+ "daor.area_id_fk IN (:areaIds) AND daor.role_id_fk IN (:roleIds) AND "
			+ "(daor.is_responsible_facility = TRUE OR daor.is_responsible_community = TRUE)", nativeQuery = true)
	List<DesignationAreaOrganizationRoleMapping> findDesignationForPOAByUpdate(@Param("areaIds") List<Integer> areaIds,
			@Param("roleIds") List<Integer> roleIds, @Param("syncDate") Timestamp lastSyncDate);

	@Override
	@Query(value = "select * from designation_area_organization_role_mapping daor WHERE "
			+ "(daor.created_date > :syncDate OR daor.updated_date > :syncDate) AND "
			+ "daor.role_id_fk IN (:roleIds) AND "
			+ "(daor.is_responsible_facility = TRUE OR daor.is_responsible_community = TRUE)", nativeQuery = true)
	List<DesignationAreaOrganizationRoleMapping> findDesignationForPOAByUpdateForCountryAdmin(
			@Param("roleIds") List<Integer> roleIds, @Param("syncDate") Timestamp lastSyncDate);
}
