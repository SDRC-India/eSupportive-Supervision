package org.sdrc.ess.repository;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import org.sdrc.ess.domain.Area;
import org.sdrc.ess.domain.DesignationAreaOrganizationRoleMapping;
import org.sdrc.ess.domain.PlanOfAction;
import org.sdrc.ess.model.mobile.PlanOfActionModel;
import org.springframework.transaction.annotation.Transactional;
/**
 * @author  Naseem Akhtar (naseem@sdrc.co.in)
 * @author Harsh Pratyush (harsh@sdrc.co.in)
 *
 */
public interface PlanOfActionRepository {

	void updatePreviousData(List<Integer> poaFacilityList, Integer i);

	@Transactional
	Iterable<PlanOfAction> save(Iterable<PlanOfAction> planOfActionList);

	List<PlanOfAction> findByIsLatestTrueAndFacilityAreaNIdInAndFormTypeId(List<Integer> facilityList, Integer formId);

	List<PlanOfAction> findByUserIdOrderByIdDesc(Integer userId);

	PlanOfActionModel updateOpenItem(Timestamp updatedDate, Integer statusId, Integer id, String dateOfCompletion);

	List<PlanOfAction> findByResponsibilityAndFacilityOrderByRecievedDateDesc(
			DesignationAreaOrganizationRoleMapping designationAreaOrganizationRoleMapping, Area inChargeFacilityId);

	List<PlanOfAction> findByResponsibilityOrderByRecievedDateDesc(
			DesignationAreaOrganizationRoleMapping designationAreaOrganizationRoleMapping);

	List<PlanOfAction> findByResponsibilityAndDistrictAreaNIdOrderByRecievedDateDesc(
			DesignationAreaOrganizationRoleMapping designationAreaOrganizationRoleMapping, Integer integer);

	List<PlanOfAction> findByResponsibilityAndBlockAreaNIdOrderByRecievedDateDesc(
			DesignationAreaOrganizationRoleMapping designationAreaOrganizationRoleMapping, Integer integer);

	PlanOfAction findById(Integer pk);

	PlanOfAction findByResponsibilityAndId(
			DesignationAreaOrganizationRoleMapping designationAreaOrganizationRoleMapping, Integer pk);
	
	List<Object[]> getCountOfOpenAndClosedPlanofActionForDistrict(int districtId, int blockId, int checklistType);
	
	
	List<Object[]> getCountOfDelayedPlanofActionForDistrict(int districtId, int blockId, int checklistType , Date currentDate);

	List<PlanOfAction> findByFacilityAreaNIdOrderByStatusIdAscExcpectedDateOfCompletionAsc(
			int facilityId);

	List<PlanOfAction> findByFacilityAreaNIdAndExcpectedDateOfCompletionLessThanAndFormTypeIdOrderByStatusIdAscExcpectedDateOfCompletionAscDateOfVisitAsc(
			int facilityId, Date currentDate, int facilityType);

	List<PlanOfAction> findByFacilityAreaNIdAndFormTypeIdOrderByStatusIdAscExcpectedDateOfCompletionAscDateOfVisitAsc(
			int facilityId, int facilityType);

	List<PlanOfAction> findAll();

}
