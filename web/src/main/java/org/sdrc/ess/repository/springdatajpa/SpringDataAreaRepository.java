package org.sdrc.ess.repository.springdatajpa;

import java.util.List;

import org.sdrc.ess.domain.Area;
import org.sdrc.ess.repository.AreaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.data.repository.query.Param;

/**
 * This is the spring data repository for Area domain class
 * 
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 16-May-2017 11:40:14 am
 * @author Naseem Akhtar (naseem@sdrc.co.in) on 6th June 2017 15.13
 */
@RepositoryDefinition(domainClass = Area.class, idClass = Integer.class)
public interface SpringDataAreaRepository extends AreaRepository {

	@Override
	@Query(value = "select " + "country.area_nid_pk as country_id, country.name as country, country.level as country_level, country.parent_area_id as country_parent_id, " + "state.area_nid_pk as state_id, state.name as state, state.level as state_level, state.parent_area_id as state_parent_id, "
			+ "district.area_nid_pk as district_id, district.name as district, district.level as district_level, district.parent_area_id as district_parent_id, " + "block.area_nid_pk as block_id, block.name as block, block.level as block_level, block.parent_area_id as block_parent_id, "
			+ "facility.area_nid_pk as facility_id, facility.name as facility, facility.level as facility_level, facility.parent_area_id as facility_parent_id, facility.facility_type as ftype " +

			"from area country, area state, area district, area block, area facility, area n " + "WHERE " + "country.area_nid_pk = n.area_nid_pk and " + "state.parent_area_id = n.area_nid_pk and " + "district.parent_area_id = state.area_nid_pk and " + "block.parent_area_id = district.area_nid_pk and "
			+ "(facility.parent_area_id = block.area_nid_pk or facility.parent_area_id = district.area_nid_pk and facility.level = 5)and " + "n.area_nid_pk IN (:userMap) ORDER BY country.name, state.name, district.name, block.name, facility.name", nativeQuery = true)
	List<Object[]> findByCountryMapping(@Param("userMap") List<Integer> userAssignedArea);

	@Override
	@Query(value = "select " + "country.area_nid_pk as country_id, country.name as country, country.level as country_level, country.parent_area_id as country_parent_id, " + "state.area_nid_pk as state_id, state.name as state, state.level as state_level, state.parent_area_id as state_parent_id, "
			+ "district.area_nid_pk as district_id, district.name as district, district.level as district_level, district.parent_area_id as district_parent_id, " + "block.area_nid_pk as block_id, block.name as block, block.level as block_level, block.parent_area_id as block_parent_id, "
			+ "facility.area_nid_pk as facility_id, facility.name as facility, facility.level as facility_level, facility.parent_area_id as facility_parent_id, facility.facility_type as ftype " +

			"from area country, area state, area district, area block, area facility, area n " + "WHERE " + "country.area_nid_pk = n.parent_area_id and " + "state.area_nid_pk = n.area_nid_pk and " + "district.parent_area_id = state.area_nid_pk and " + "block.parent_area_id = district.area_nid_pk and "
			+ "(facility.parent_area_id = block.area_nid_pk or facility.parent_area_id = district.area_nid_pk and facility.level = 5)and " + "n.area_nid_pk IN (:userMap) ORDER BY country.name, state.name, district.name, block.name, facility.name", nativeQuery = true)
	List<Object[]> findByStateMapping(@Param("userMap") List<Integer> userAssignedArea);

	@Override
	@Query(value = "select " + "country.area_nid_pk as country_id, country.name as country, country.level as country_level, country.parent_area_id as country_parent_id, " + "state.area_nid_pk as state_id, state.name as state, state.level as state_level, state.parent_area_id as state_parent_id, "
			+ "district.area_nid_pk as district_id, district.name as district, district.level as district_level, district.parent_area_id as district_parent_id, " + "block.area_nid_pk as block_id, block.name as block, block.level as block_level, block.parent_area_id as block_parent_id, "
			+ "facility.area_nid_pk as facility_id, facility.name as facility, facility.level as facility_level, facility.parent_area_id as facility_parent_id, facility.facility_type as ftype " +

			"from area country, area state, area district, area block, area facility, area n " + "WHERE " + "country.area_nid_pk = state.parent_area_id and " + "state.area_nid_pk = district.parent_area_id and " + "district.area_nid_pk = n.area_nid_pk and " + "block.parent_area_id = district.area_nid_pk and "
			+ "(facility.parent_area_id = block.area_nid_pk or facility.parent_area_id = district.area_nid_pk and facility.level = 5)and " + "n.area_nid_pk IN (:userMap) ORDER BY country.name, state.name, district.name, block.name, facility.name", nativeQuery = true)
	List<Object[]> findByDistrictMapping(@Param("userMap") List<Integer> userAssignedArea);

	@Override
	@Query(value = "select " + "country.area_nid_pk as country_id, country.name as country, country.level as country_level, country.parent_area_id as country_parent_id, " + "state.area_nid_pk as state_id, state.name as state, state.level as state_level, state.parent_area_id as state_parent_id, "
			+ "district.area_nid_pk as district_id, district.name as district, district.level as district_level, district.parent_area_id as district_parent_id, " + "block.area_nid_pk as block_id, block.name as block, block.level as block_level, block.parent_area_id as block_parent_id, "
			+ "facility.area_nid_pk as facility_id, facility.name as facility, facility.level as facility_level, facility.parent_area_id as facility_parent_id, facility.facility_type as ftype " +

			"from area country, area state, area district, area block, area facility, area n " + "WHERE " + "country.area_nid_pk = state.parent_area_id and " + "state.area_nid_pk = district.parent_area_id and " + "district.area_nid_pk = block.parent_area_id and " + "block.area_nid_pk = n.area_nid_pk and "
			+ "(facility.parent_area_id = block.area_nid_pk or facility.parent_area_id = district.area_nid_pk and facility.level = 5)and " + "n.area_nid_pk IN (:userMap) ORDER BY country.name, state.name, district.name, block.name, facility.name", nativeQuery = true)
	List<Object[]> findByBlockMapping(@Param("userMap") List<Integer> userAssignedArea);

	@Override
	@Query(value = "select " + "country.area_nid_pk as country_id, country.name as country, country.level as country_level, country.parent_area_id as country_parent_id, " + "state.area_nid_pk as state_id, state.name as state, state.level as state_level, state.parent_area_id as state_parent_id, "
			+ "district.area_nid_pk as district_id, district.name as district, district.level as district_level, district.parent_area_id as district_parent_id, " + "block.area_nid_pk as block_id, block.name as block, block.level as block_level, block.parent_area_id as block_parent_id, "
			+ "facility.area_nid_pk as facility_id, facility.name as facility, facility.level as facility_level, facility.parent_area_id as facility_parent_id, facility.facility_type as ftype " +

			"from area country, area state, area district, area block, area facility, area n " + "WHERE " + "country.area_nid_pk = state.parent_area_id and " + "state.area_nid_pk = district.parent_area_id and " + "district.area_nid_pk = block.parent_area_id and " + "block.area_nid_pk = facility.parent_area_id and "
			+ "(facility.area_nid_pk = n.area_nid_pk or facility.parent_area_id = district.area_nid_pk and facility.level = 5)and " + "n.area_nid_pk IN (:userMap) ORDER BY country.name, state.name, district.name, block.name, facility.name", nativeQuery = true)
	List<Object[]> findByFacilityMapping(@Param("userMap") List<Integer> userAssignedArea);

	@Override
	@Query(value = "select a5.area_nid_pk " + "from area a1, area a2, area a3, area a4, area a5 " + "WHERE " + "a1.area_nid_pk IN (:areaList) and " + "( (a2.area_nid_pk = a1.area_nid_pk and a2.level = 5) or (a2.parent_area_id = a1.area_nid_pk) ) and " + "( (a3.area_nid_pk = a2.area_nid_pk and a3.level = 5) or (a3.parent_area_id = a2.area_nid_pk) ) and "
			+ "( (a4.area_nid_pk = a3.area_nid_pk and a4.level = 5) or (a4.parent_area_id = a3.area_nid_pk) ) and " + "( (a5.area_nid_pk = a4.area_nid_pk and a5.level = 5) or (a5.parent_area_id = a4.area_nid_pk) )", nativeQuery = true)
	List<Integer> findFacilityIdByUser(@Param("areaList") List<Integer> areaIdList);

	@Override
	@Query("SELECT ar from Area ar WHERE ar.parentAreaId =:areaId")
	List<Area> findByAreaParentId(@Param("areaId") Integer areaId);

	@Override
	@Query("SELECT arr FROM Area arr WHERE arr.parentAreaId in (SELECT ar FROM Area ar WHERE ar.parentAreaId =:areaId) "
			+ " OR arr.parentAreaId=:areaId and arr.facilityType.id IS NOT NULL")
	List<Area> findByAreaParentIdAreaParentId(@Param("areaId") Integer areaId);

	@Override
	@Query("SELECT are FROM Area are WHERE are.parentAreaId in " + "(SELECT arr FROM Area arr where arr.parentAreaId in (SELECT ar FROM Area ar WHERE ar.parentAreaId =:areaId))")
	List<Area> findByAreaParentIdAreaParentIdAreaParentId(@Param("areaId") Integer areaId);

	/**
	 * Fetches UtAreaEns between two levels of area i.e childLevel as 2nd parameter and areaLevel for areaCode(parent)
	 * as 1st parameter. Both the levels are inclusive. So this method results child areas for given areaCode and their
	 * parent area.
	 */
	@Override
	@Query("SELECT ar FROM Area ar WHERE ar.level <= :childLevel AND ar.level >=   (SELECT parArea.level FROM Area parArea WHERE parArea.areaId = :areaId)")
	public Area[] getAreaNid(@Param("areaId") String areaCode, @Param("childLevel") Integer childLevel);

	@Override
	@Query("SELECT DISTINCT(ar) FROM UtData utData JOIN utData.area_NId as ar WHERE ar.level <= :level ")
	List<Area> findByAggregatedDataFoundAndByAreaLevel( @Param("level")Integer level);
	
	@Override
	@Query(value = "select block.parent_area_id,block.area_nid_pk,count(facility.area_nid_pk) from area facility "
			+ "LEFT JOIN area block on block.area_nid_pk = facility.parent_area_id "
			+ "WHERE block.parent_area_id =:areaId and facility.level = 5  and facility.facility_type_id_fk IN (:facilityTypeList) "
			+ "group by block.area_nid_pk", nativeQuery = true)
	List<Object[]> findTotalFacilitiesBlockWise(@Param("areaId") Integer areaNId, 
			@Param("facilityTypeList") List<Integer> facilityTypeIdList);
	
	@Override
	@Query(value = "select district.parent_area_id,district.area_nid_pk,count(distinct facility.area_nid_pk) from area district "
			+ "LEFT JOIN area block on block.parent_area_id = district.area_nid_pk "
			+ "LEFT JOIN area facility on facility.parent_area_id = block.area_nid_pk OR "
			+ "facility.parent_area_id = district.area_nid_pk WHERE district.parent_area_id =:areaId "
			+ "and facility.level = 5 and facility.facility_type_id_fk IN (:facilityTypeList) "
			+ "group by district.area_nid_pk" , nativeQuery = true)
	List<Object[]> findTotalFacilitiesDistrictWise(@Param("areaId") Integer areaNId,
			@Param("facilityTypeList") List<Integer> facilityTypeIdList);
	
	@Override
	@Query(value = "select state.parent_area_id,state.area_nid_pk,count(distinct facility.area_nid_pk) from area state "
			+ "LEFT JOIN area district on district.parent_area_id = state.area_nid_pk "
			+ "LEFT JOIN area block on block.parent_area_id = district.area_nid_pk "
			+ "LEFT JOIN area facility on facility.parent_area_id = block.area_nid_pk OR "
			+ "facility.parent_area_id = district.area_nid_pk "
			+ "WHERE state.parent_area_id =:areaId and facility.level = 5 and facility.facility_type_id_fk IN (:facilityTypeList) "
			+ "group by state.area_nid_pk ", nativeQuery = true)
	List<Object[]> findTotalFacilitiesStateWise(@Param("areaId") Integer areaNId,
			@Param("facilityTypeList") List<Integer> facilityTypeIdList);
	
	@Override
	@Query(value = "select parent_area_id as pid,parent_area_id as pid1,count(area_nid_pk) from area where parent_area_id =:areaId "
			+ "and facility_type_id_fk IN (:facilityTypeList) "
			+ "group by parent_area_id", nativeQuery = true)
	List<Object[]> findTotalFacilitiesForBlock(@Param("areaId") Integer areaNId,
			@Param("facilityTypeList") List<Integer> facilityTypeIdList);
	
	@Override
	@Query(value = "select ar.area_nid_pk,ar.name,ar.level from area ar where area_nid_pk =:areaId "
			+ "UNION "
			+ "select ar2.area_nid_pk,ar2.name,ar2.level from area ar2 where "
			+ "parent_area_id =:areaId and facility_type_id_fk IS NULL", nativeQuery = true)
	List<Object[]> findAreaAndChildByAreaId(@Param("areaId") Integer areaNId);

	@Override
	@Query(value = "select ar.area_nid_pk,ar.name,ar.level from area ar "
			+ "where ar.area_nid_pk =:areaId OR ar.area_nid_pk =:parentId", nativeQuery = true)
	List<Object[]> findAreaAndParentByAreaId(@Param("areaId") Integer areaNId, @Param("parentId") Integer parentId);
	
	@Override
	@Query(value = "select ar.area_nid_pk,ar.name,ar.level from area ar "
			+ "where ar.area_nid_pk IN (1,2,32,33,35)", nativeQuery = true)
	List<Object[]> findAreaAndChildCountryWise();
	
	
}
