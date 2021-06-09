package org.sdrc.ess.repository;

import java.sql.Timestamp;
import java.util.List;

import org.sdrc.ess.domain.Area;

/**
 * This repository interface contains methods that help us fetch data from database
 * 
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 16-May-2017 11:39:03 am
 * @author Naseem Akhtar (naseem@sdrc.co.in) on 6th June 2017 16.50
 */
public interface AreaRepository {

	List<Area> findAll();

	Area findByAreaNId(Integer integer);

	List<Area> findAllByOrderByNameAsc();

	List<Object[]> findByCountryMapping(List<Integer> userAssignedArea);

	List<Object[]> findByStateMapping(List<Integer> userAssignedArea);

	List<Object[]> findByDistrictMapping(List<Integer> userAssignedArea);

	List<Object[]> findByBlockMapping(List<Integer> userAssignedArea);

	List<Object[]> findByFacilityMapping(List<Integer> userAssignedArea);

	List<Integer> findFacilityIdByUser(List<Integer> areaIdList);

	List<Area> findByCreatedDateGreaterThanOrUpdatedDateGreaterThan(Timestamp lastSyncDate, Timestamp lastSyncDate2);

	List<Area> findByAreaNIdIn(List<Integer> areaIdList);

	List<Area> findByCreatedDateGreaterThanOrUpdatedDateGreaterThanAndAreaNIdIn(Timestamp lastSyncDate, Timestamp lastSyncDate2, List<Integer> areaIdList);

	List<Area> findByAreaParentId(Integer areaId);

	List<Area> findByAreaParentIdAreaParentId(Integer areaId);

	List<Area> findByAreaParentIdAreaParentIdAreaParentId(Integer areaId);

	List<Area> findByLevel(Integer areaId);

	Area[] getAreaNid(String areaCode, Integer childLevel);

	List<Area> findByAggregatedDataFoundAndByAreaLevel(Integer level);

	List<Area> findByLevelLessThan(int level);

	Area findByAreaId(String parentAreaCode);

	List<Object[]> findTotalFacilitiesBlockWise(Integer areaNId, List<Integer> facilityTypeIdList);

	List<Object[]> findTotalFacilitiesDistrictWise(Integer areaNId, List<Integer> facilityTypeIdList);

	List<Object[]> findTotalFacilitiesStateWise(Integer areaNId, List<Integer> facilityTypeIdList);

	List<Object[]> findTotalFacilitiesForBlock(Integer areaNId, List<Integer> facilityTypeIdList);

	List<Object[]> findAreaAndChildByAreaId(Integer areaNId);

	List<Object[]> findAreaAndParentByAreaId(Integer areaNId, Integer parentId);
	
	List<Object[]> findAreaAndChildCountryWise();
}
