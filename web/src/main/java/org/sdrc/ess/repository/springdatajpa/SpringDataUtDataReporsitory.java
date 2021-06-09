/**
 * 
 */
package org.sdrc.ess.repository.springdatajpa;

import java.util.List;

import org.sdrc.ess.domain.UtData;
import org.sdrc.ess.repository.UtDataReporsitory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.data.repository.query.Param;

/**
 * @author Harsh Pratyush (harsh@sdrc.co.in)
 *
 */
@RepositoryDefinition(domainClass = UtData.class, idClass = Integer.class)
public interface SpringDataUtDataReporsitory extends UtDataReporsitory {

	@Override
	@Query("SELECT AVG(data.data_Value) ,ius.indicator_NId.indicator_NId,ius.indicator_NId.indicator_Name  FROM UtData data RIGHT JOIN data.IUSNId ius" + " WHERE ius.indicator_NId.indicator_NId IN  :allDashboardIds " + " AND ius.unit_NId.unit_NId = 2 " + " AND ius.subgroup_Val_NId.subgroup_Val_NId = 1" + 
				" AND data.timePeriod_NId.timePeriod_NId =:utTimeperiodId "
			+ " AND data.area_NId.areaNId =:areaId "
			+ " AND data.typeDetail IS NULL" + 
				"	GROUP BY ius.indicator_NId.indicator_NId,ius.indicator_NId.indicator_Name")
	public List<Object[]> findByIUSNIdsAndTimePeriod(@Param("allDashboardIds") List<Integer> allDashboardIds, @Param("utTimeperiodId") int utTimeperiodId, @Param("areaId") int areaId);

	@Override
	@Query("SELECT AVG(data.data_Value),ius.indicator_NId.indicator_NId,ius.indicator_NId.indicator_Name FROM UtData data RIGHT JOIN data.IUSNId ius  " + " WHERE data.timePeriod_NId.timePeriod_NId =:utTimeperiodId "
			+ " AND data.area_NId.level=2 " + " "
			+ " AND ius.indicator_NId.indicator_NId IN  :allDashboardIds " + " AND data.typeDetail IS NULL AND ius.unit_NId.unit_NId = 2 " + " AND ius.subgroup_Val_NId.subgroup_Val_NId = 1" 
			+ "	GROUP BY ius.indicator_NId.indicator_NId,ius.indicator_NId.indicator_Name")
	public List<Object[]> findByIUSNIdsAndTimePeriodForCountry(@Param("allDashboardIds") List<Integer> allDashboardIds, @Param("utTimeperiodId") int utTimeperiodId);

	@Override
	@Query("SELECT SUM(data.data_Value),data.IUSNId.indicator_NId.indicator_NId,data.IUSNId.indicator_NId.indicator_Name,data.timePeriod_NId.timePeriod FROM UtData data" + " WHERE data.IUSNId.indicator_NId.indicator_NId IN  :allDashboardIds " + " AND data.typeDetail IS NULL AND data.IUSNId.unit_NId.unit_NId = 1 " + " AND data.IUSNId.subgroup_Val_NId.subgroup_Val_NId = 1"
			+ " AND data.timePeriod_NId.timePeriod_NId <=:utTimeperiodId " + " AND  data.timePeriod_NId.timePeriod_NId >=:timePeriod2  " + " AND data.area_NId.areaNId =:areaId " + " AND data.timePeriod_NId.periodicity.preodicityId=1" + " GROUP BY data.IUSNId.indicator_NId.indicator_NId,data.IUSNId.indicator_NId.indicator_Name,data.timePeriod_NId.timePeriod ORDER By data.timePeriod_NId.timePeriod DESC")
	public List<Object[]> findByIUSNIdsAndTimePeriodNumber(@Param("allDashboardIds") List<Integer> allDashboardIds, @Param("utTimeperiodId") int utTimeperiodId, @Param("areaId") int areaId, @Param("timePeriod2") int timePeriod2);
	

	@Override
	@Query("SELECT SUM(data.data_Value),data.IUSNId.indicator_NId.indicator_NId,data.IUSNId.indicator_NId.indicator_Name,data.timePeriod_NId.timePeriod FROM UtData data" + " WHERE data.IUSNId.indicator_NId.indicator_NId IN  :allDashboardIds " + " AND data.typeDetail IS NULL AND data.IUSNId.unit_NId.unit_NId = 1 " + " AND data.IUSNId.subgroup_Val_NId.subgroup_Val_NId = 1"
			+ " AND data.timePeriod_NId.timePeriod_NId <=:utTimeperiodId " + 
			"  AND data.area_NId.level=2 "
					+ "AND  data.timePeriod_NId.timePeriod_NId >=:timePeriod2  " + " AND data.timePeriod_NId.periodicity.preodicityId=1" + " GROUP BY data.IUSNId.indicator_NId.indicator_NId,data.IUSNId.indicator_NId.indicator_Name,data.timePeriod_NId.timePeriod" + " ORDER BY data.timePeriod_NId.timePeriod DESC")

	public List<Object[]> findByIUSNIdsAndTimePeriodNumberCountryLevel(@Param("allDashboardIds") List<Integer> allDashboardIds, @Param("utTimeperiodId") int utTimeperiodId, @Param("timePeriod2") int timePeriod2);

	
	
	@Override
	@Query("SELECT AVG(data.data_Value),data.IUSNId.indicator_NId.indicator_NId,data.IUSNId.indicator_NId.indicator_Name,data.timePeriod_NId.timePeriod FROM UtData data" + " WHERE data.IUSNId.indicator_NId.indicator_NId IN  :allDashboardIds " + " AND data.typeDetail IS NULL AND data.IUSNId.unit_NId.unit_NId = 2 " + " AND data.IUSNId.subgroup_Val_NId.subgroup_Val_NId = 1"
			+ " AND data.timePeriod_NId.timePeriod_NId <=:utTimeperiodId " + " AND  data.area_NId.level=2  "
					+ " AND data.timePeriod_NId.timePeriod_NId >=:timePeriod2  " + " AND data.timePeriod_NId.periodicity.preodicityId=1" + " GROUP BY data.IUSNId.indicator_NId.indicator_NId,data.IUSNId.indicator_NId.indicator_Name,data.timePeriod_NId.timePeriod" + " ORDER BY data.timePeriod_NId.timePeriod DESC")
	public List<Object[]> findByIUSNIdsAndTimePeriodNumberCountryLevelForPercent(@Param("allDashboardIds") List<Integer> allDashboardIds, @Param("utTimeperiodId") int utTimeperiodId, @Param("timePeriod2") int timePeriod2);
	
	
	@Override@Query("SELECT AVG(data.data_Value),data.IUSNId.indicator_NId.indicator_NId,data.IUSNId.indicator_NId.indicator_Name,data.timePeriod_NId.timePeriod FROM UtData data" + " WHERE data.IUSNId.indicator_NId.indicator_NId IN  :allDashboardIds " + " AND data.typeDetail IS NULL AND data.IUSNId.unit_NId.unit_NId = 2 " + " AND data.IUSNId.subgroup_Val_NId.subgroup_Val_NId = 1"
			+ " AND data.timePeriod_NId.timePeriod_NId <=:utTimeperiodId " + " AND  data.timePeriod_NId.timePeriod_NId >=:timePeriod2  " + " AND data.area_NId.areaNId =:areaId " + " AND data.timePeriod_NId.periodicity.preodicityId=1" + " GROUP BY data.IUSNId.indicator_NId.indicator_NId,data.IUSNId.indicator_NId.indicator_Name,data.timePeriod_NId.timePeriod ORDER By data.timePeriod_NId.timePeriod DESC")
	public List<Object[]> findByIUSNIdsAndTimePeriodNumberForPercent(@Param("allDashboardIds") List<Integer> allDashboardIds, @Param("utTimeperiodId") int utTimeperiodId, @Param("areaId") int areaId, @Param("timePeriod2") int timePeriod2);
	
	
	
	@Override
	@Query("SELECT data.data_Value,data.IUSNId.indicator_NId.indicator_NId,data.IUSNId.indicator_NId.indicator_Name,data.timePeriod_NId.timePeriod "
			+ "FROM UtData data JOIN data.IUSNId ius" +
			" WHERE  data.timePeriod_NId.timePeriod.periodicity IS NULL " 
			+ " AND data.area_NId.areaNId =:areaId "
			+ " AND data.typeDetail IS NULL "
			+ " GROUP BY data.data_Value,data.IUSNId.indicator_NId.indicator_NId,data.IUSNId.indicator_NId.indicator_Name,data.timePeriod_NId.timePeriod "
			+ " ORDER BY data.IUSNId.indicator_NId.indicator_NId ASC")
	public List<Object[]> findByIUSNIdsForLatestTimePeriod(@Param("areaId") int stateId);

	@Override
	@Query(" SELECT data.data_Value,data.IUSNId.indicator_NId.indicator_NId" + ",data.IUSNId.indicator_NId.indicator_Name," + " data.timePeriod_NId.timePeriod FROM UtData data , UtIcIus icius" + " WHERE data.area_NId.areaNId =:areaId " + " AND data.IUSNId.unit_NId.unit_NId = 2 " + " AND icius.IC_NId.IC_NId=:sector" + " AND data.IUSNId.IUSNId=icius.IUSNId "
			+ "  AND data.timePeriod_NId.periodicity.preodicityId=1 " + " AND data.typeDetail.id=:facilityType " + " ORDER BY data.IUSNId.indicator_NId.indicator_NId ASC,data.timePeriod_NId.timePeriod DESC ")
	public List<Object[]> findIndicatorWiseGapForAsectorAndBlockAndFacilityType(@Param("areaId") int blockIdOrdistrictId, @Param("facilityType") int facilityTypeId, @Param("sector") int sectorId);

	@Override
	@Query("SELECT utData , utArea , utTimePeriod FROM UtData utData JOIN utData.area_NId utArea "
			+ " JOIN utData.timePeriod_NId utTimePeriod "
			+ " WHERE  utTimePeriod.timePeriod_NId = :timeperiodId AND "
			+ " utData.source_NId.IC_NId = :sourceNid AND "
			+ " utData.IUSNId.IUSNId = :indicatorUnitSubgroupId "
			+ " AND utData.typeDetail IS NULL  AND utArea.areaNId   IN (:areaNid)  "
			+ " ORDER BY utData.data_Value ASC")
	public List<Object[]> findDataByTimePeriodForAllFacilityType(@Param("indicatorUnitSubgroupId") Integer indicatorId, @Param("timeperiodId") Integer timeperiodId, @Param("sourceNid") Integer sourceNid, @Param("areaNid") Integer[] areaNid);

	//@Override
	/*
	 * @Query("SELECT utData , utArea , utTimePeriod , sourceObj,  "
	 * 
	 * + "(SELECT utDataMax from UtData utDataMax JOIN utDataMax.area_NId utMaxArea " + " WHERE " +
	 * " utMaxArea.level=utArea.level and utDataMax.timePeriod_NId=utData.timePeriod_NId  " +
	 * " AND utDataMax.IUSNId.IUSNId = utData.IUSNId.IUSNId AND utDataMax.typeDetail IS NULL ORDER BY utDataMax.data_Value DESC), "
	 * 
	 * + "(SELECT utDataMin from UtData utDataMin JOIN utDataMin.area_Nid utMinArea " + " WHERE " +
	 * " utMinArea.level=utArea.level and utDataMin.timePeriod_NId=utData.timePeriod_NId  " +
	 * " AND utData.IUSNId.IUSNId = utDataMin.IUSNId.IUSNId AND utDataMin.typeDetail IS NULL ORDER BY utDataMin.data_Value ASC) "
	 * 
	 * + " from UtData utData " +
	 * " JOIN utData.area_NId as utArea JOIN utData.timePeriod_NId as utTimePeriod JOIN utData.source_NId as sourceObj "
	 * 
	 * + "WHERE " + "utArea.areaNId = :areaNid AND " +
	 * "utData.IUSNId.IUSNId = :indicatorId AND utData.typeDetail IS NULL  " +
	 * "ORDER BY utArea.areaId,utTimePeriod.timePeriod")
	 */
	

	@Override
	@Query(value = "SELECT ar.area_nid_pk,utdata.data_value,utdata.timeperiod_nid,ar.name AS actual_area,ar.level AS act_level, (SELECT CAST(row_to_json(d) AS varchar) AS MAXJ1 FROM (SELECT * FROM ut_data utDataMax JOIN area utMaxArea ON utMaxArea.area_nid_pk=utDataMax.area_nid "
			+ " WHERE utdata.area_nid IN (SELECT areaparent.area_nid_pk FROM area areaparent WHERE areaparent.parent_area_id=utMaxArea.parent_area_id) AND utDataMax.timeperiod_nid=utdata.timeperiod_nid AND utDataMax.IUSNId = utData.IUSNId AND utDataMax.type_detail_id_fk IS NULL "
			+ " ORDER BY utDataMax.data_value DESC LIMIT 1) AS d), (SELECT CAST(row_to_json(d) AS varchar) AS MINJ2  FROM (SELECT * FROM ut_data utDataMax  JOIN area utMaxArea ON utMaxArea.area_nid_pk=utDataMax.area_nid  WHERE utdata.area_nid IN (SELECT areaparent.area_nid_pk "
			+ " FROM area areaparent  WHERE areaparent.parent_area_id=utMaxArea.parent_area_id) AND utDataMax.timeperiod_nid=utdata.timeperiod_nid AND utDataMax.IUSNId = utData.IUSNId  AND utDataMax.type_detail_id_fk IS NULL ORDER BY utDataMax.data_value ASC  LIMIT 1) AS d) FROM ut_data utdata "
			+ "	INNER JOIN area ar ON ar.area_nid_pk=utdata.area_nid JOIN ut_timeperiod t ON utdata.timeperiod_nid=t.timeperiod_nid WHERE utdata.iusnid=:indicatorId  AND utdata.area_nid=:areaNid AND utdata.type_detail_id_fk IS NULL AND t.periodicity=:periodicity  ORDER BY t.enddate DESC "
			+ "	LIMIT 6", nativeQuery = true)
	public List<Object[]> findChartDataForAllFaciltyType(@Param("indicatorId") Integer indicatorId, @Param("areaNid") Integer areaNid, @Param("periodicity") Integer periodicity);
	
	@Override
	@Query(value = "SELECT ar.area_nid_pk,utdata.data_value,utdata.timeperiod_nid,ar.name AS actual_area,ar.level AS act_level, (SELECT CAST(row_to_json(d) AS varchar) AS MAXJ1 FROM (SELECT * FROM ut_data utDataMax JOIN area utMaxArea ON utMaxArea.area_nid_pk=utDataMax.area_nid "
			+ " WHERE utdata.area_nid IN (SELECT areaparent.area_nid_pk FROM area areaparent WHERE areaparent.parent_area_id=utMaxArea.parent_area_id) AND utDataMax.timeperiod_nid=utdata.timeperiod_nid AND utDataMax.IUSNId = utData.IUSNId AND utDataMax.type_detail_id_fk =:facilityTypeId "
			+ " ORDER BY utDataMax.data_value DESC LIMIT 1) AS d), (SELECT CAST(row_to_json(d) AS varchar) AS MINJ2  FROM (SELECT * FROM ut_data utDataMax  JOIN area utMaxArea ON utMaxArea.area_nid_pk=utDataMax.area_nid  WHERE utdata.area_nid IN (SELECT areaparent.area_nid_pk "
			+ " FROM area areaparent  WHERE areaparent.parent_area_id=utMaxArea.parent_area_id) AND utDataMax.timeperiod_nid=utdata.timeperiod_nid AND utDataMax.IUSNId = utData.IUSNId  AND utDataMax.type_detail_id_fk =:facilityTypeId ORDER BY utDataMax.data_value ASC  LIMIT 1) AS d) FROM ut_data utdata "
			+ "	INNER JOIN area ar ON ar.area_nid_pk=utdata.area_nid JOIN ut_timeperiod t ON utdata.timeperiod_nid=t.timeperiod_nid WHERE utdata.iusnid=:indicatorId  AND utdata.area_nid=:areaNid AND utdata.type_detail_id_fk =:facilityTypeId AND t.periodicity=:periodicity  ORDER BY t.enddate DESC "
			+ "	LIMIT 6", nativeQuery = true)
	public List<Object[]> findChartDataForFaciltyType(@Param("indicatorId") Integer indicatorId, 
			@Param("areaNid") Integer areaNid, @Param("periodicity") Integer periodicity,
			@Param("facilityTypeId")Integer facilityTypeId);

	

	@Override
	@Query(value="select icius.ic_iusnid,ius.iusnid,"
			+ "un.unit_nid,indi.indicator_nid,indi.indicator_name," + 
			"ar.area_nid_pk,ar.name,data.data_value,data.data_nid " + 
			"from ut_ic_ius icius " + 
			"JOIN ut_indicator_unit_subgroup ius ON ius.iusnid = icius.iusnid " + 
			"JOIN ut_unit_en un ON un.unit_nid=ius.unit_nid " + 
			"JOIN ut_indicator_en indi ON indi.indicator_nid = ius.indicator_nid " + 
			"LEFT JOIN ut_data data ON data.iusnid = ius.iusnid " + 
			"JOIN area ar ON ar.area_nid_pk=data.area_nid " + 
			"WHERE un.utunittype='PERCENT' and " +
			"data.timeperiod_nid=:timePeriod_NId and icius.ic_nid=:ic_NId  and data.type_detail_id_fk IS NULL " + 
			"AND ar.parent_area_id =:areaNid " + 
			"ORDER BY indi.indicator_nid ",nativeQuery
			=true)
	List<Object[]> thematicTableData(@Param("ic_NId") Integer ic_NId, @Param("timePeriod_NId") Integer timePeriod_NId, @Param("areaNid") Integer areaNid);
	
	@Override
	@Query(value="select icius.ic_iusnid,ius.iusnid,"
			+ "un.unit_nid,indi.indicator_nid,indi.indicator_name," + 
			"ar.area_nid_pk,ar.name,data.data_value,data.data_nid " + 
			"from ut_ic_ius icius " + 
			"JOIN ut_indicator_unit_subgroup ius ON ius.iusnid = icius.iusnid " + 
			"JOIN ut_unit_en un ON un.unit_nid=ius.unit_nid " + 
			"JOIN ut_indicator_en indi ON indi.indicator_nid = ius.indicator_nid " + 
			"LEFT JOIN ut_data data ON data.iusnid = ius.iusnid " + 
			"JOIN area ar ON ar.area_nid_pk=data.area_nid " + 
			"WHERE un.utunittype='PERCENT' and " +
			"data.timeperiod_nid=:timePeriod_NId and icius.ic_nid=:ic_NId  and data.type_detail_id_fk =:facilityTypeId " + 
			"AND ar.parent_area_id =:areaNid " + 
			"ORDER BY indi.indicator_nid ", nativeQuery=true)
	public List<Object[]> thematicTableDataFacilityTypeWise(@Param("ic_NId") Integer ic_NId, 
			@Param("timePeriod_NId") Integer timePeriod_NId, @Param("areaNid") Integer areaNid,
			@Param("facilityTypeId") Integer facilityTypeId);
	
	/*@Override
	@Query(value="select dt.data_value from ut_data dt where dt.iusnid in "
			+ "(select ius.iusnid from ut_ic_ius  ici inner join ut_indicator_unit_subgroup ius on ius.iusnid= ici.iusnid "
			+ "inner join ut_unit_en un on ius.unit_nid= un.unit_nid where ici.ic_nid=:sectionId and un.utunittype='PERCENT')"
			+ " and dt.timeperiod_nid =:timeperiodId and dt.area_nid=:areaId and type_detail_id_fk is null", nativeQuery = true)
	Object[] findByAreaAreanidAndSectionId(@Param("areaId")Integer areaId, @Param("timeperiodId")Integer timeperiodId,@Param("sectionId") Integer sectionId);
*/
	@Override
	@Query(value="select ius.indicator_nid,indi.indicator_name,data.data_value  from ut_ic_ius icius JOIN ut_indicator_unit_subgroup ius "
			+ "ON ius.iusnid = icius.iusnid JOIN ut_unit_en un ON un.unit_nid=ius.unit_nid  LEFT JOIN ut_indicator_en indi "
			+ "ON indi.indicator_nid = ius.indicator_nid JOIN ut_data data ON data.iusnid = ius.iusnid JOIN area ar ON "
			+ "ar.area_nid_pk=data.area_nid WHERE un.utunittype='PERCENT' and  data.timeperiod_nid=:timeperiodId and icius.ic_nid=:sectionId"
			+ "  and data.type_detail_id_fk IS NULL AND ar.area_nid_pk =:areaId ORDER BY indi.indicator_nid ", nativeQuery = true)
	List<Object[]> findByAreaAndSubsectionIn(@Param("areaId")Integer areaId, @Param("timeperiodId")Integer timeperiodId,@Param("sectionId") Integer sectionId);
	
	@Override
	@Query(value="select icius.ic_iusnid,ius.iusnid,"
			+ "un.unit_nid,indi.indicator_nid,indi.indicator_name," + 
			"ar.area_nid_pk,ar.name,data.data_value,data.data_nid " + 
			"from ut_ic_ius icius " + 
			"JOIN ut_indicator_unit_subgroup ius ON ius.iusnid = icius.iusnid " + 
			"JOIN ut_unit_en un ON un.unit_nid=ius.unit_nid " + 
			"JOIN ut_indicator_en indi ON indi.indicator_nid = ius.indicator_nid " + 
			"LEFT JOIN ut_data data ON data.iusnid = ius.iusnid " + 
			"JOIN area ar ON ar.area_nid_pk=data.area_nid " + 
			"WHERE un.utunittype='PERCENT' and " +
			"data.timeperiod_nid=:timePeriod_NId and icius.ic_nid=:ic_NId  and data.type_detail_id_fk IS NULL " + 
			"AND data.area_nid =:areaNid " + 
			"ORDER BY indi.indicator_nid ",nativeQuery=true)
	List<Object[]> thematicTableDataForBlockLevelUser(@Param("ic_NId") Integer ic_NId, @Param("timePeriod_NId") Integer timePeriod_NId, @Param("areaNid") Integer areaNid);
	
	@Override
	@Query(value="select icius.ic_iusnid,ius.iusnid,"
			+ "un.unit_nid,indi.indicator_nid,indi.indicator_name," + 
			"ar.area_nid_pk,ar.name,data.data_value,data.data_nid " + 
			"from ut_ic_ius icius " + 
			"JOIN ut_indicator_unit_subgroup ius ON ius.iusnid = icius.iusnid " + 
			"JOIN ut_unit_en un ON un.unit_nid=ius.unit_nid " + 
			"JOIN ut_indicator_en indi ON indi.indicator_nid = ius.indicator_nid " + 
			"LEFT JOIN ut_data data ON data.iusnid = ius.iusnid " + 
			"JOIN area ar ON ar.area_nid_pk=data.area_nid " + 
			"WHERE un.utunittype='PERCENT' and " +
			"data.timeperiod_nid=:timePeriod_NId and icius.ic_nid=:ic_NId  and data.type_detail_id_fk =:facilityTypeId " + 
			"AND data.area_nid =:areaNid " + 
			"ORDER BY indi.indicator_nid ",nativeQuery=true)
	public List<Object[]> thematicTableDataForBlockLevelUserFacilityTypeWise(@Param("ic_NId") Integer ic_NId, 
			@Param("timePeriod_NId") Integer timePeriod_NId, @Param("areaNid") Integer areaNid,
			@Param("facilityTypeId") Integer facilityTypeId);
	
	@Override
	@Query(value="select ius.indicator_nid,indi.indicator_name,data.data_value  from ut_ic_ius icius JOIN ut_indicator_unit_subgroup ius "
			+ "ON ius.iusnid = icius.iusnid JOIN ut_unit_en un ON un.unit_nid=ius.unit_nid  LEFT JOIN ut_indicator_en indi "
			+ "ON indi.indicator_nid = ius.indicator_nid JOIN ut_data data ON data.iusnid = ius.iusnid JOIN area ar ON "
			+ "ar.area_nid_pk=data.area_nid WHERE un.utunittype='PERCENT' and  data.timeperiod_nid=:timeperiodId and icius.ic_nid=:sectionId"
			+ "  and data.type_detail_id_fk=:facilityTypeId AND ar.area_nid_pk =:areaId ORDER BY indi.indicator_nid ", nativeQuery = true)
	List<Object[]> findByAreaAndSubsectionInAndFacilityTypeId(@Param("areaId")Integer areaId, @Param("timeperiodId")Integer timeperiodId,@Param("sectionId") Integer sectionId, @Param("facilityTypeId")int facilityTypeId);
	
	@Override
	@Query("SELECT utData , utArea , utTimePeriod FROM UtData utData JOIN utData.area_NId utArea "
			+ " JOIN utData.timePeriod_NId utTimePeriod "
			+ " WHERE  utTimePeriod.timePeriod_NId = :timeperiodId AND "
			+ " utData.source_NId.IC_NId = :sourceNid AND "
			+ " utData.IUSNId.IUSNId = :indicatorUnitSubgroupId "
			+ " AND utData.typeDetail.id = :facilityTypeId  AND utArea.areaNId   IN (:areaNid)  "
			+ " ORDER BY utData.data_Value ASC")
	public List<Object[]> findDataByTimePeriodAndFacilityType(@Param("indicatorUnitSubgroupId") Integer indicatorId, 
			@Param("timeperiodId") Integer timeperiodId, @Param("sourceNid") Integer sourceNid, 
			@Param("areaNid") Integer[] areaNid,@Param("facilityTypeId")Integer facilityTypeId);
	

	@Override
	@Query("SELECT data.area_NId.name,data.area_NId.areaNId,data.area_NId.facilityType.name , data.timePeriod_NId.timePeriod_NId ,data.area_NId.parentAreaId , data.data_Value "
			+ " FROM UtData data  where"
			+ "  data.timePeriod_NId.periodicity.preodicityId=1"
			+ " AND  data.timePeriod_NId.timePeriod_NId IN "
			+ " (SELECT MAX(data1.timePeriod_NId.timePeriod_NId) FROM UtData data1 WHERE  data1.timePeriod_NId.periodicity.preodicityId=1 AND data1.timePeriod_NId.timePeriod_NId NOT IN  (SELECT MAX(data2.timePeriod_NId.timePeriod_NId)  FROM UtData data2 WHERE data2.timePeriod_NId.timePeriod_NId NOT IN(SELECT MIN(data3.timePeriod_NId.timePeriod_NId) FROM UtData data3 WHERE data3.timePeriod_NId.periodicity.preodicityId=1 GROUP BY data3.area_NId.areaNId) AND data2.timePeriod_NId.periodicity.preodicityId=1 GROUP BY data2.area_NId.areaNId) GROUP BY data1.area_NId.areaNId )"
			+ " AND (data.area_NId.parentAreaId IN(Select area.areaNId from Area area where area.parentAreaId=:districtId) or data.area_NId.parentAreaId =:blockId)"
			+ " AND data.IUSNId.IUSNId=878"
			)
	public List<Object[]> find2LatestSubmissionOfEachFacilityWithinADistrictOrBlock(
			@Param("districtId")int districtId,@Param("blockId")int blockId);
	
	@Override
	@Query("SELECT data.area_NId.name,data.area_NId.areaNId,data.area_NId.facilityType.name , data.timePeriod_NId.timePeriod_NId ,data.area_NId.parentAreaId , data.data_Value "
			+ " FROM UtData data  where"
			+ "  data.timePeriod_NId.periodicity.preodicityId=1"
			+ " AND  data.timePeriod_NId.timePeriod_NId IN "
			+ " (SELECT MAX(data1.timePeriod_NId.timePeriod_NId) FROM UtData data1 WHERE  data1.timePeriod_NId.periodicity.preodicityId=1 AND data1.timePeriod_NId.timePeriod_NId NOT IN "
			+ " (SELECT MAX(data2.timePeriod_NId.timePeriod_NId)  FROM UtData data2 WHERE data2.timePeriod_NId.timePeriod_NId NOT IN"
			+ " (SELECT MAX(data3.timePeriod_NId.timePeriod_NId) FROM UtData data3 WHERE data3.timePeriod_NId.periodicity.preodicityId=1 AND data3.timePeriod_NId.timePeriod_NId NOT IN(SELECT MIN(data4.timePeriod_NId.timePeriod_NId) FROM UtData data4 WHERE data4.timePeriod_NId.periodicity.preodicityId=1 GROUP BY data4.area_NId.areaNId )  GROUP BY data3.area_NId.areaNId) AND data2.timePeriod_NId.periodicity.preodicityId=1 GROUP BY data2.area_NId.areaNId) GROUP BY data1.area_NId.areaNId )"
			+ " AND (data.area_NId.parentAreaId IN(Select area.areaNId from Area area where area.parentAreaId=:districtId) or data.area_NId.parentAreaId =:blockId)"
			+ " AND data.IUSNId.IUSNId=878"
			)
	public List<Object[]> find3LatestSubmissionOfEachFacilityWithinADistrictOrBlock(
			@Param("districtId")int districtId,@Param("blockId")int blockId);
	
	@Override
	@Query("SELECT data.area_NId.name,data.area_NId.areaNId,data.area_NId.facilityType.name , data.timePeriod_NId.timePeriod_NId ,data.area_NId.parentAreaId , data.data_Value "
			+ " FROM UtData data  where "
			+ " data.timePeriod_NId.periodicity.preodicityId=1 "
			+ " AND  data.timePeriod_NId.timePeriod_NId IN "
			+ " (SELECT MIN(data1.timePeriod_NId.timePeriod_NId) FROM UtData data1 WHERE data1.timePeriod_NId.periodicity.preodicityId=1 GROUP BY data1.area_NId.areaNId )"
			+ " AND (data.area_NId.parentAreaId IN(Select area.areaNId from Area area where area.parentAreaId=:districtId) or data.area_NId.parentAreaId =:blockId)"
			+ " AND data.IUSNId.IUSNId=878"
			)
	public List<Object[]> findLastSubmissionOfEachFacilityWithinADistrictOrBlock(
			@Param("districtId")int districtId,@Param("blockId")int blockId);
	
	@Override
	@Query("SELECT data.area_NId.name,data.area_NId.areaNId,data.area_NId.facilityType.name , data.timePeriod_NId.timePeriod_NId ,data.area_NId.parentAreaId , data.data_Value "
			+ " FROM UtData data  where data.timePeriod_NId.periodicity.preodicityId=1 "
			+ "  AND data.timePeriod_NId.timePeriod_NId IN "
			+ " (SELECT MAX(data1.timePeriod_NId.timePeriod_NId)FROM UtData data1 WHERE data1.timePeriod_NId.periodicity.preodicityId=1 AND data1.timePeriod_NId.timePeriod_NId NOT IN (SELECT MIN(data2.timePeriod_NId.timePeriod_NId) FROM UtData data2 WHERE data2.timePeriod_NId.periodicity.preodicityId=1 GROUP BY data2.area_NId.areaNId) GROUP BY data1.area_NId.areaNId )"
			+ " AND (data.area_NId.parentAreaId IN(Select area.areaNId from Area area where area.parentAreaId=:districtId) or data.area_NId.parentAreaId =:blockId)"
			+ " AND data.IUSNId.IUSNId=878"
			)
	public List<Object[]> findTheLatestSubmissionOfEachFacilityWithinADistrictOrBlock(
			@Param("districtId")int districtId,@Param("blockId")int blockId);
	
	
	@Override
	@Query("SELECT data.data_Value,ius.indicator_NId.indicator_Name  , data.timePeriod_NId.timePeriod_NId , ius.indicator_NId.indicator_NId FROM UtData data "
			+ "join data.IUSNId ius "
			+ "WHERE ius.indicator_NId.indicatorType ='score' "
			+ " AND data.timePeriod_NId.timePeriod_NId IN :timeperiodIds "
			+ " AND data.area_NId.areaNId = :facilityId "
			+ " ORDER BY data.IUSNId.IUSNId ASC,data.timePeriod_NId.timePeriod_NId ASC")
	public List<Object[]> findByTimeperiodIdsAndScoreIndicatorForCommunity(
			@Param("facilityId")int facilityId,@Param("timeperiodIds") List<Integer> timeperiodIds);
	
	
	@Override
	@Query(" SELECT data.data_Value,data.IUSNId.indicator_NId.indicator_NId," 
			+ " data.IUSNId.indicator_NId.indicator_Name, data.timePeriod_NId.timePeriod_NId"
			+ ", data.timePeriod_NId.timePeriod FROM UtData data , UtIcIus icius" + 
			"   WHERE data.area_NId.areaNId =:areaId " + " AND data.IUSNId.unit_NId.unit_NId = 2 " +
			"   AND icius.IC_NId.IC_NId=:sector" + 
			" 	AND data.IUSNId.IUSNId=icius.IUSNId "
			+ "  AND data.timePeriod_NId.timePeriod_NId = (SELECT MAX(data1.timePeriod_NId.timePeriod_NId) FROM UtData data1,UtIcIus icius1 "
			+ "  WHERE data1.area_NId.areaNId =:areaId " + " AND data1.IUSNId.unit_NId.unit_NId = 2 " +
			"   AND icius1.IC_NId.IC_NId=:sector" + 
			" 	AND data1.IUSNId.IUSNId=icius.IUSNId "
			+ "  AND data1.timePeriod_NId.periodicity.preodicityId=1"
			+ " AND data1.typeDetail.id=:facilityType "
			+ " AND data1.timePeriod_NId.timePeriod_NId !=(SELECT MAX(data2.timePeriod_NId.timePeriod_NId) FROM UtData data2,UtIcIus icius2 "
			+ "  WHERE data2.area_NId.areaNId =:areaId " + " AND data2.IUSNId.unit_NId.unit_NId = 2 " +
			"   AND icius2.IC_NId.IC_NId=:sector" + 
			" 	AND data2.IUSNId.IUSNId=icius.IUSNId "
			+ "  AND data2.timePeriod_NId.periodicity.preodicityId=1 AND data2.typeDetail.id=:facilityType AND data2.timePeriod_NId.timePeriod_NId !="
			+ "	(SELECT MIN(data3.timePeriod_NId.timePeriod_NId) FROM UtData data3,UtIcIus icius3 "
			+ "  WHERE data3.area_NId.areaNId =:areaId " + " AND data3.IUSNId.unit_NId.unit_NId = 2 " +
			"   AND icius3.IC_NId.IC_NId=:sector" + 
			" 	AND data3.IUSNId.IUSNId=icius.IUSNId "
			+ "  AND data3.timePeriod_NId.periodicity.preodicityId=1 AND data3.typeDetail.id=:facilityType)))"
			+" 	AND data.typeDetail.id=:facilityType " 
			+ " ORDER BY data.IUSNId.indicator_NId.indicator_NId ASC,data.timePeriod_NId.timePeriod ASC ")
	public List<Object[]> find2LatestSubmissionforASectorofaArea(@Param("areaId") int blockIdOrdistrictId, @Param("facilityType") int facilityTypeId, @Param("sector") int sectorId);
	
	@Override
	@Query(" SELECT data.data_Value,data.IUSNId.indicator_NId.indicator_NId," 
			+ " data.IUSNId.indicator_NId.indicator_Name, data.timePeriod_NId.timePeriod_NId"
			+ ", data.timePeriod_NId.timePeriod FROM UtData data , UtIcIus icius" + 
			"   WHERE data.area_NId.areaNId =:areaId " + " AND data.IUSNId.unit_NId.unit_NId = 2 " +
			"   AND icius.IC_NId.IC_NId=:sector" + 
			" 	AND data.IUSNId.IUSNId=icius.IUSNId "
			+ "  AND data.timePeriod_NId.timePeriod_NId = (SELECT MAX(data1.timePeriod_NId.timePeriod_NId) FROM UtData data1,UtIcIus icius1 "
			+ "  WHERE data1.area_NId.areaNId =:areaId " + " AND data1.IUSNId.unit_NId.unit_NId = 2 " +
			"   AND icius1.IC_NId.IC_NId=:sector" + 
			" 	AND data1.IUSNId.IUSNId=icius.IUSNId "
			+ "  AND data1.timePeriod_NId.periodicity.preodicityId=1"
			+ " AND data1.typeDetail.id=:facilityType "
			+ " AND data1.timePeriod_NId.timePeriod_NId !=(SELECT MAX(data2.timePeriod_NId.timePeriod_NId) FROM UtData data2,UtIcIus icius2 "
			+ "  WHERE data2.area_NId.areaNId =:areaId " + " AND data2.IUSNId.unit_NId.unit_NId = 2 " +
			"   AND icius2.IC_NId.IC_NId=:sector" + 
			" 	AND data2.IUSNId.IUSNId=icius.IUSNId "
			+ "  AND data2.timePeriod_NId.periodicity.preodicityId=1 AND data2.typeDetail.id=:facilityType AND data2.timePeriod_NId.timePeriod_NId !="
			+ "	(SELECT MAX(data3.timePeriod_NId) FROM UtData data3,UtIcIus icius3 "
			+ "  WHERE data3.area_NId.areaNId =:areaId " + " AND data3.IUSNId.unit_NId.unit_NId = 2 " +
			"   AND icius3.IC_NId.IC_NId=:sector" + 
			" 	AND data3.IUSNId.IUSNId=icius.IUSNId "
			+ "  AND data3.timePeriod_NId.periodicity.preodicityId=1 AND data3.typeDetail.id=:facilityType AND data3.timePeriod_NId.timePeriod_NId !=("
			+ "	SELECT MIN(data2.timePeriod_NId.timePeriod_NId) FROM UtData data2,UtIcIus icius2 "
			+ "  WHERE data2.area_NId.areaNId =:areaId " + " AND data2.IUSNId.unit_NId.unit_NId = 2 " +
			"   AND icius2.IC_NId.IC_NId=:sector" + 
			" 	AND data2.IUSNId.IUSNId=icius.IUSNId "
			+ "  AND data2.timePeriod_NId.periodicity.preodicityId=1 AND data2.typeDetail.id=:facilityType))))"
			+" 	AND data.typeDetail.id=:facilityType " 
			+ " ORDER BY data.IUSNId.indicator_NId.indicator_NId ASC,data.timePeriod_NId.timePeriod ASC ")
	public List<Object[]> find3LatestSubmissionforASectorofaArea(@Param("areaId") int blockIdOrdistrictId, @Param("facilityType") int facilityTypeId, @Param("sector") int sectorId);
	
	@Override
	@Query(" SELECT data.data_Value,data.IUSNId.indicator_NId.indicator_NId," 
			+ " data.IUSNId.indicator_NId.indicator_Name, data.timePeriod_NId.timePeriod_NId"
			+ " , data.timePeriod_NId.timePeriod FROM UtData data , UtIcIus icius" + 
			"   WHERE data.area_NId.areaNId =:areaId " + " AND data.IUSNId.unit_NId.unit_NId = 2 " +
			"   AND icius.IC_NId.IC_NId=:sector" + 
			" 	AND data.IUSNId.IUSNId=icius.IUSNId "
			+ "  AND data.timePeriod_NId.timePeriod_NId= (SELECT MIN(data1.timePeriod_NId.timePeriod_NId) FROM UtData data1,UtIcIus icius1 "
			+ "  WHERE data1.area_NId.areaNId =:areaId " + " AND data1.IUSNId.unit_NId.unit_NId = 2 " +
			"   AND icius1.IC_NId.IC_NId=:sector" + 
			" 	AND data1.IUSNId.IUSNId=icius.IUSNId "
			+ "  AND data1.timePeriod_NId.periodicity.preodicityId=1 AND data1.typeDetail.id=:facilityType)"
			+" 	AND data.typeDetail.id=:facilityType " 
			+ " ORDER BY data.IUSNId.indicator_NId.indicator_NId ASC,data.timePeriod_NId.timePeriod ASC ")
	public List<Object[]> findLastSubmissionforASectorofaArea(@Param("areaId") int blockIdOrdistrictId, @Param("facilityType") int facilityTypeId, @Param("sector") int sectorId);
	
	@Override
	@Query(" SELECT data.data_Value,data.IUSNId.indicator_NId.indicator_NId," 
			+ " data.IUSNId.indicator_NId.indicator_Name, data.timePeriod_NId.timePeriod_NId"
			+ " ,data.timePeriod_NId.timePeriod FROM UtData data , UtIcIus icius" + 
			"   WHERE data.area_NId.areaNId =:areaId " + " AND data.IUSNId.unit_NId.unit_NId = 2 " +
			"   AND icius.IC_NId.IC_NId=:sector" + 
			" 	AND data.IUSNId.IUSNId=icius.IUSNId "
			+ "  AND data.timePeriod_NId.timePeriod_NId = (SELECT MAX(data1.timePeriod_NId.timePeriod_NId) FROM UtData data1,UtIcIus icius1 "
			+ "  WHERE data1.area_NId.areaNId =:areaId " + " AND data1.IUSNId.unit_NId.unit_NId = 2 " +
			"   AND icius1.IC_NId.IC_NId=:sector" + 
			" 	AND data1.IUSNId.IUSNId=icius.IUSNId "
			+ "  AND data1.timePeriod_NId.periodicity.preodicityId=1"
			+ " AND data1.typeDetail.id=:facilityType "
			+ " AND data1.timePeriod_NId.timePeriod_NId !=(SELECT MIN(data2.timePeriod_NId.timePeriod_NId) FROM UtData data2,UtIcIus icius2 "
			+ "  WHERE data2.area_NId.areaNId =:areaId " + " AND data2.IUSNId.unit_NId.unit_NId = 2 " +
			"   AND icius2.IC_NId.IC_NId=:sector" + 
			" 	AND data2.IUSNId.IUSNId=icius.IUSNId "
			+ "  AND data2.timePeriod_NId.periodicity.preodicityId=1 AND data2.typeDetail.id=:facilityType))"
			+" 	AND data.typeDetail.id=:facilityType " 
			+ " ORDER BY data.IUSNId.indicator_NId.indicator_NId ASC,data.timePeriod_NId.timePeriod ASC ")
	public List<Object[]> findLatestSubmissionforASectorofaArea(@Param("areaId") int blockIdOrdistrictId, @Param("facilityType") int facilityTypeId, @Param("sector") int sectorId);

	@Override
	@Query("SELECT data FROM UtData data WHERE"
			+ " data.area_NId.parentAreaId =:blockId"
			+ "  AND data.timePeriod_NId.timePeriod_NId =:timePeriod_Nid "
			+ "  AND data.typeDetail.id=:facilityType "
			+ "  AND  data.IUSNId.indicator_NId.indicator_NId =:indicator_NId"
			+ " AND data.IUSNId.unit_NId.unit_NId = 2 ")
	public List<UtData> findCommunityDataForFacilityView(
			@Param("facilityType")Integer facilityTypeId,
			@Param("timePeriod_Nid") int timePeriod_NId,
			@Param("blockId") Integer blockId,
			@Param("indicator_NId")int indicator_NId);

}
