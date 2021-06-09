package org.sdrc.ess.repository.springdatajpa;

import java.sql.Timestamp;
import java.util.List;

import org.sdrc.ess.domain.Planning;
import org.sdrc.ess.repository.PlanningRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.data.repository.query.Param;

/**
*
* @author Debiprasad Parida (debiprasad@sdrc.co.in) on 05-08-2017 01:23 am
*
*/

@RepositoryDefinition(domainClass=Planning.class, idClass=Integer.class)
public interface SpringDataPlanningRepository extends PlanningRepository {
	
	@Override
	@Query(value="SELECT COUNT(*) AS totalPlan,COUNT(CASE WHEN visited_date IS NOT NULL THEN 1 END ) AS totalvisit "
			+ "FROM planning where facility_id_fk IN (:facilityId) AND checklist_id_fk=:checklistid and plan_date "
			+ "BETWEEN :startDate AND :endDate AND is_live = 'true'", nativeQuery = true)
	List<Object[]>  findByFacilityAreaNIdInAndPlanDateBetweenAndIsLiveIsTrue(@Param("facilityId")List<Integer> facilityId,
			@Param("startDate")Timestamp startDate, @Param("endDate")Timestamp endDate,@Param("checklistid")int checklistid);
	
	
	@Override
	@Query(value="SELECT COUNT(*) AS totalPlan,COUNT(CASE WHEN visited_date IS NOT NULL THEN 1 END ) AS totalvisit"
			+ " FROM planning where checklist_id_fk=:checklistid and plan_date BETWEEN :startDate AND :endDate AND is_live = true", nativeQuery = true)
	List<Object[]>  findByPlanDateBetweenAndIsLiveIsTrue(@Param("startDate")Timestamp startDate, @Param("endDate")Timestamp endDate,@Param("checklistid")int checklistid);
	
	
	@Override
	@Query("SELECT plan FROM Planning plan WHERE plan.checkListType.id=:checklistid AND plan.planDate BETWEEN :startDate AND :endDate AND plan.isLive=true")
    List<Planning> findByPlanDateAndIsLiveIsTrue(@Param("startDate")Timestamp startDate, @Param("endDate")Timestamp endDate,@Param("checklistid")int checklistid);
	
	@Override
	@Query("SELECT plan FROM Planning plan WHERE plan.checkListType.id=:checklistid AND plan.facility.areaNId IN (:facilityId) AND plan.planDate BETWEEN :startDate AND :endDate AND plan.isLive=true")
	 List<Planning> findByFacilityAreaNIdAndPlanDateBetweenAndIsLiveIsTrue(@Param("facilityId")List<Integer> facilityId,
				@Param("startDate")Timestamp startDate, @Param("endDate")Timestamp endDate,@Param("checklistid")int checklistid);
}
