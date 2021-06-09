package org.sdrc.ess.repository;

import java.sql.Timestamp;
import java.util.List;

import org.sdrc.ess.domain.Designation;
import org.sdrc.ess.domain.DesignationAreaOrganizationRoleMapping;

public interface DesignationAreaOrganizationRoleMappingRepository {

	List<DesignationAreaOrganizationRoleMapping> findByRoleRoleId(Integer roleId);

	List<DesignationAreaOrganizationRoleMapping> findByRoleRoleIdAndOrganizationId(Integer roleId, Integer orgId);

	List<DesignationAreaOrganizationRoleMapping> findByRoleRoleIdAndOrganizationIdAndAreaAreaNId(Integer roleId,
			Integer orgId, Integer areaNId);

	DesignationAreaOrganizationRoleMapping findById(Integer id);

	DesignationAreaOrganizationRoleMapping save(DesignationAreaOrganizationRoleMapping dmodel);

	List<DesignationAreaOrganizationRoleMapping> findAll();

	List<DesignationAreaOrganizationRoleMapping> findByRoleRoleIdAndAreaAreaNId(Integer roleId, Integer areaNId);

	List<Designation> findByRoleRoleIdIn(List<Integer> roleIds);

	DesignationAreaOrganizationRoleMapping findByRoleRoleIdAndAreaAreaNIdAndDesignationIdAndOrganizationId(
			Integer roleId, Integer areaNId, Integer desgId, Integer orgId);

	DesignationAreaOrganizationRoleMapping findByRoleRoleIdAndAreaAreaNIdAndDesignationIdAndOrganizationIdAndIsResponsibleFacilityAndIsResponsibleCommunityAndId(
			Integer roleId, Integer areaNId, Integer desgId, Integer orgId, Boolean isResponsibleFacility,
			Boolean isResponsibleCommunity, Integer id);

	List<DesignationAreaOrganizationRoleMapping> findByAreaAreaNId(Integer areaId);

	void updateDesignationAreaOrganizationRoleMapping(Boolean isResponsibleFacility, Boolean isResponsibleCommunity,
			Timestamp updatedDate, Integer id);

	List<DesignationAreaOrganizationRoleMapping> findDesignationForPOA(List<Integer> areaIds, List<Integer> roleIds);

	List<DesignationAreaOrganizationRoleMapping> findDesignationForPOAByUpdate(List<Integer> areaIds,
			List<Integer> roleIds, Timestamp lastSyncDate);

	List<DesignationAreaOrganizationRoleMapping> findByIsResponsibleFacilityTrueOrIsResponsibleCommunityTrueAndRoleRoleIdIn(
			List<Integer> roleIds);

	List<DesignationAreaOrganizationRoleMapping> findDesignationForPOAByUpdateForCountryAdmin(List<Integer> roleIds,
			Timestamp lastSyncDate);

}
