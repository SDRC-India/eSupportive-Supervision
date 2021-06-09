package org.sdrc.ess.repository;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import org.sdrc.ess.domain.PlanningReport;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Debiprasad Parida(debiprasad@sdrc.co.in) Created on 09-10-2017 
 */

public interface PlanningReportRepository {

	@Transactional
	Iterable<PlanningReport> save(Iterable<PlanningReport> planningReport);

	
	List<Object[]> findByFacilityIdInAndVisitDateBetweenAndChecklistId(List<Integer> facilityId,
			Timestamp startDate, Timestamp endDate, Integer checklistId);

	List<PlanningReport> findByFacilityIdAndFacilityTypeIdAndChecklistIdAndVisitDateBetweenAndPlannedDateIsNotNull
	                    (Integer facilityId,Integer facilityTypeId,Integer checklistId,Timestamp startDate,Timestamp endDate);
	
	List<PlanningReport> findByFacilityIdAndFacilityTypeIdAndChecklistIdAndVisitDateBetweenAndPlannedDateIsNull
    (Integer facilityId,Integer facilityTypeId,Integer checklistId,Timestamp startDate,Timestamp endDate);
	
	List<PlanningReport> findByFacilityIdAndFacilityTypeIdAndChecklistIdAndVisitDateBetween
    (Integer facilityId,Integer facilityTypeId,Integer checklistId,Timestamp startDate,Timestamp endDate);

	
	List<Object[]> findByFacilityTypeAndCheckListTypeAndDateBetweenAnd(Timestamp startDate,Timestamp endDate,Integer areaId,Date date);
	
	List<Object[]> findByCommunityTypeAndCheckListTypeAndDateBetweenAnd(Integer checklistId,Timestamp startDate,Timestamp endDate,Integer districtId,Integer blockId,Date date);
}
