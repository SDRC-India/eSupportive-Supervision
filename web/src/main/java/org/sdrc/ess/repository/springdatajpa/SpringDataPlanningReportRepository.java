package org.sdrc.ess.repository.springdatajpa;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import org.sdrc.ess.domain.PlanningReport;
import org.sdrc.ess.repository.PlanningReportRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.data.repository.query.Param;

/**
 * @author Debiprasad Parida(debiprasad@sdrc.co.in) Created on 09-10-2017
 */

@RepositoryDefinition(domainClass = PlanningReport.class, idClass = Integer.class)
public interface SpringDataPlanningReportRepository extends
		PlanningReportRepository {
	
	
	@Query(value = "select a.name as area,parent.name as parent,type.name as type,a.area_nid_pk,(select max(c7) from facility_data f where f.facility_id=a.area_nid_pk and f.c7 < :dateLessThan) as date from area a " 
	+ "RIGHT JOIN (select area_nid_pk,parent_area_id from area where level=5 AND "
	+ "parent_area_id IN (select area_nid_pk from area where parent_area_id = :areaId OR area_nid_pk = :areaId) "
	+ "EXCEPT select DISTINCT(facility_id),block from facility_data fd WHERE fd.c7 BETWEEN :startDate AND :endDate) b ON a.area_nid_pk = b.area_nid_pk "
	+ "LEFT JOIN area parent ON parent.area_nid_pk = b.parent_area_id "
	+ "LEFT JOIN type_detail type ON type.id_pk = a.facility_type_id_fk ORDER BY type.order_level,parent.name,a.name", nativeQuery = true)
	List<Object[]> findByFacilityTypeAndCheckListTypeAndDateBetweenAnd(
	@Param("startDate") Timestamp startDate,
	@Param("endDate") Timestamp endDate,
	@Param("areaId") Integer areaId,@Param("dateLessThan") Date date);
	

	@Override
	@Query(value = "SELECT distinct(community.area_nid_pk),block.name as blockName,community.name as failityName,fType.name as typeName,community.area_nid_pk as facility_id,district.area_nid_pk as district_id,"
	+ "pr.checklist_id,block.area_nid_pk as block_id,pr.checklist_id as checklistid,(SELECT max(pr2.visit_date) from planning_report pr2  WHERE pr2.facility_id=community.area_nid_pk and pr2.checklist_id=pr.checklist_id and pr2.visit_date <= :dateLessThan) "
	+ "FROM area community INNER JOIN type_detail fType "
	+ "ON fType.id_pk = community.facility_type_id_fk INNER JOIN area block ON community.parent_area_id = block.area_nid_pk "
	+ "INNER JOIN area district ON district.area_nid_pk = block.parent_area_id "
	+ "LEFT JOIN planning_report pr ON pr.facility_id=community.area_nid_pk "
	+ "WHERE (district.area_nid_pk = :districtId or block.area_nid_pk = :blockId) AND fType.id_pk=102 AND community.area_nid_pk NOT IN (SELECT facility_id FROM planning_report P where (P.district_id = :districtId or P.block_id = :blockId) and P.checklist_id= :checklistId and P.visit_date between :startDate and :endDate)", nativeQuery = true)
	List<Object[]> findByCommunityTypeAndCheckListTypeAndDateBetweenAnd(
	@Param("checklistId") Integer checklistId,
	@Param("startDate") Timestamp startDate,
	@Param("endDate") Timestamp endDate,
	@Param("districtId") Integer districtId,
	@Param("blockId") Integer blockId,@Param("dateLessThan") Date date);
	
	@Override
	@Query("SELECT pr.blockName,pr.facilityName,pr.facilityTypeName,pr.blockId,pr.facilityId,pr.facilityTypeId,"
			+ " COUNT(CASE WHEN pr.plannedDate IS NOT NULL THEN 1 END ) AS plannedVisit,"
			+ " COUNT(CASE WHEN pr.plannedDate IS  NULL THEN 1 END ) AS unplannedVisit,"
			+ " (COUNT(CASE WHEN pr.plannedDate IS NOT NULL THEN 1 END )+COUNT(CASE WHEN pr.plannedDate IS  NULL THEN 1 END )) as total,pr.districtName "
			+ " FROM PlanningReport pr WHERE pr.facilityId IN(:facilityId) AND pr.checklistId=:checklistId  "
			+ " AND pr.visitDate BETWEEN :startDate AND :endDate GROUP BY pr.blockName,pr.facilityName,pr.facilityTypeName,pr.blockId,pr.facilityId,pr.facilityTypeId,pr.districtName")
	List<Object[]> findByFacilityIdInAndVisitDateBetweenAndChecklistId(@Param("facilityId")List<Integer> facilityId,@Param("startDate")Timestamp startDate,@Param("endDate") Timestamp endDate,@Param("checklistId") Integer checklistId);

	
}
