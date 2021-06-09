package org.sdrc.ess.repository;

import java.sql.Timestamp;
import java.util.List;

import javax.persistence.LockModeType;

import org.sdrc.ess.domain.Planning;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.transaction.annotation.Transactional;

/**
*
* @author Debiprasad Parida (debiprasad@sdrc.co.in) on 05-08-2017 01:23 am
*
*/

public interface PlanningRepository {

	@Transactional
	Planning save(Planning planning);
	
	Planning findByPlanningId(Integer planningId);
	
	List<Planning> findByCheckListTypeIdAndPlanDateBetweenAndIsLiveTrueOrderByFacilityNameAsc(int checklistid, Timestamp startDate, Timestamp endDate);
	
	List<Planning> findByCheckListTypeIdAndIsLiveTrue(int checklistid);
	
	Planning findByEssUserIdAndFacilityAreaNIdAndCheckListTypeIdAndPlanDateAndVisitedDateIsNullAndIsLiveTrue(int userId, int facilityId, int checklistId,Timestamp plannedDate);
	
	/**
	 * For DoughtChart
	 */
	List<Object[]>  findByFacilityAreaNIdInAndPlanDateBetweenAndIsLiveIsTrue(List<Integer> facilityId,Timestamp startDate, Timestamp endDate, int checklistid );
	
	List<Object[]>  findByPlanDateBetweenAndIsLiveIsTrue(Timestamp startDate, Timestamp endDate, int checklistid);
	
	/**
	 * For TrendChart
	 */
	List<Planning> findByPlanDateAndIsLiveIsTrue(Timestamp startDate, Timestamp endDate,int checklistid);
	
	List<Planning>  findByFacilityAreaNIdAndPlanDateBetweenAndIsLiveIsTrue(List<Integer> facilityId,Timestamp startDate, Timestamp endDate, int checklistid);
	
	@Transactional
	@Lock(LockModeType.PESSIMISTIC_WRITE)
	List<Planning> findByFacilityAreaNIdAndCheckListTypeIdAndPlanDateAndIsLiveTrue(int facilityId,int checklistId, Timestamp startDate);
	
	List<Planning> findByUpdatedDateBetweenAndIsLiveTrue(Timestamp startDate, Timestamp endDate);

}
