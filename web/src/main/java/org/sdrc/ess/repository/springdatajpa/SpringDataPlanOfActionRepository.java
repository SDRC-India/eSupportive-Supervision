package org.sdrc.ess.repository.springdatajpa;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import org.sdrc.ess.domain.PlanOfAction;
import org.sdrc.ess.model.mobile.PlanOfActionModel;
import org.sdrc.ess.repository.PlanOfActionRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.data.repository.query.Param;

@RepositoryDefinition(domainClass = PlanOfAction.class, idClass = Integer.class)
public interface SpringDataPlanOfActionRepository extends
		PlanOfActionRepository {

	@Override
	@Modifying
	@Query(value = "UPDATE plan_of_action SET is_latest = FALSE where facility_id IN (:facilityId) and "
			+ "form_type_id_fk = :formType", nativeQuery = true)
	void updatePreviousData(@Param("facilityId") List<Integer> poaFacilityList,
			@Param("formType") Integer id);

	@Override
	@Modifying
	@Query(value = "UPDATE plan_of_action SET status = :sId, updated_date = :ud, date_of_completion = :doc "
			+ "where id_pk = :id", nativeQuery = true)
	PlanOfActionModel updateOpenItem(@Param("ud") Timestamp updatedDate,
			@Param("sId") Integer statusId, @Param("id") Integer id,
			@Param("doc") String dateOfCompletion);

	@Override
	@Query("SELECT area.name,plan.facility.name , plan.facility.facilityType.name , "
			+ "COUNT(CASE WHEN plan.status.id=140 AND plan.dateOfCompletion > plan.excpectedDateOfCompletion "
			+ "THEN 1 END),"
			+ "COUNT(CASE WHEN plan.status.id=139 THEN 1 END),plan.facility.areaNId "
			+ "FROM PlanOfAction plan , Area area "
			+ "WHERE (plan.district.areaNId=:districtId or plan.block.areaNId=:blockId)"
			+ "AND area.areaNId=plan.facility.parentAreaId "
			+ "AND plan.excpectedDateOfCompletion < :currentDate "
			+ "AND plan.formType.id = :checklistType "
			+ "GROUP BY plan.facility.areaNId , "
			+ "area.name,plan.facility.name , plan.facility.facilityType.name")
	public List<Object[]> getCountOfDelayedPlanofActionForDistrict(
			@Param("districtId") int districtId,
			@Param("blockId") int blockId,
			@Param("checklistType") int checklistType,
			@Param("currentDate") Date currentDate);

	@Override
	@Query("SELECT area.name,plan.facility.name , plan.facility.facilityType.name , "
			+ "COUNT(CASE WHEN plan.status.id=139"
			+ "THEN 1 END),"
			+ "COUNT(CASE WHEN plan.status.id=140 THEN 1 END),plan.facility.areaNId "
			+ "FROM PlanOfAction plan , Area area "
			+ "WHERE (plan.district.areaNId=:districtId or plan.block.areaNId=:blockId) "
			+ "AND area.areaNId=plan.facility.parentAreaId "
			+ "AND plan.formType.id = :checklistType "
			+ "GROUP BY plan.facility.areaNId , "
			+ "area.name,plan.facility.name , plan.facility.facilityType.name "
			+ "ORDER BY COUNT(CASE WHEN plan.status.id=139"
			+ "THEN 1 END) DESC ")
	public List<Object[]> getCountOfOpenAndClosedPlanofActionForDistrict(
			@Param("districtId") int districtId,
			@Param("blockId") int blockId,
			@Param("checklistType") int checklistType);

}
