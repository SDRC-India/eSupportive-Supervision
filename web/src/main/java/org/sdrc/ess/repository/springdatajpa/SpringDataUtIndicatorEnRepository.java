package org.sdrc.ess.repository.springdatajpa;

import java.util.List;

import org.sdrc.ess.core.UtUnitType;
import org.sdrc.ess.domain.UtIndicatorEn;
import org.sdrc.ess.repository.UtIndicatorEnRepository;
import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.data.repository.query.Param;

/**
 * 
 * @author Azaruddin(azaruddin@sdrc.co.in)
 *
 */

@RepositoryDefinition(domainClass = UtIndicatorEn.class, idClass = Integer.class)
public interface SpringDataUtIndicatorEnRepository extends UtIndicatorEnRepository {

	@Override
	@Query(value = "select *  from ut_ic_ius icius INNER JOIN ut_indicator_unit_subgroup ius ON ius.iusnid = icius.iusnid INNER JOIN ut_indicator_en indicator ON indicator.indicator_nid = ius.indicator_nid  WHERE icius.checklist_type_detail_id_fk = :checkListType", nativeQuery = true)
	public List<UtIndicatorEn> findAllIndicatorByCheckListType(@Param("checkListType") Integer checkListType);

	@Override
	@Query(value = "select cast (array_to_json(array_agg(row_to_json(d))) as varchar) from "
			+ "(select rdq.getter_name,rdq.question_name,rdq.col_name_of_other_table,from_table_name from raw_data_question_getter_mapping rdq "
			+ "WHERE rdq.type = :checkListType order by rdq.id asc) as d", nativeQuery = true)
	public String findAllIndicatorColumnNamesByCheckListType(@Param("checkListType") String checkListType);

	// @Override
	// @Query(value = "select cast (array_to_json(array_agg(row_to_json(d))) as varchar) from (select :columnNames from
	// facility_data f inner join area facility on f.facility_id=facility.area_nid_pk where block = :blockId and f.c7
	// between :startDateInTimePeriod and :endDateInTimePeriod and facility.facility_type_id_fk = :facilityTypeId ) as
	// d", nativeQuery = true)
	// public String fetchAllValuesOfIndicatorsForFacilityData(@Param("columnNames") String columnNames,
	// @Param("blockId") Integer blockId, @Param("startDateInTimePeriod") Timestamp startDateInTimePeriod,
	// @Param("endDateInTimePeriod") Timestamp endDateInTimePeriod, @Param("facilityTypeId") Integer facilityTypeId);
	
	// @Override
	// @Query(value = "select cast (array_to_json(array_agg(row_to_json(d))) as varchar) from (select :columnNames from
	// facility_data f inner join area facility on f.facility_id=facility.area_nid_pk where block = :blockId and f.c7
	// between :startDateInTimePeriod and :endDateInTimePeriod and facility.facility_type_id_fk = :facilityTypeId ) as
	// d", nativeQuery = true)
	// public String fetchAllValuesOfIndicatorsForCommunityData(@Param("columnNames") String columnNames,
	// @Param("blockId") Integer blockId, @Param("startDateInTimePeriod") Timestamp startDateInTimePeriod,
	// @Param("endDateInTimePeriod") Timestamp endDateInTimePeriod, @Param("facilityTypeId") Integer facilityTypeId);

	@Query("SELECT utius, utUnit, " + "  utIn, " + "  subEn   "
			+ " FROM UtIcIus uticius JOIN uticius.IUSNId utius "
			+ " JOIN utius.indicator_NId utIn JOIN  utius.unit_NId utUnit JOIN utius.subgroup_Val_NId subEn "
			+ " WHERE uticius.IC_NId.IC_NId = :sectorNid and utUnit.utUnitType = :utunittype Order by uticius.IUSNId   ")
	@Override
	public List<Object[]> fetchIndicatorFromSector(@Param("sectorNid") Integer sectorNid,@Param("utunittype") UtUnitType utunittype) throws DataAccessException;

	@Override
	@Query("SELECT  utIndicatorEn FROM UtData utData, UtIndicatorEn utIndicatorEn" + " WHERE utData.indicator_NId = utIndicatorEn.indicator_NId AND " + " utData.IUSNId = :iusNID ")
	public UtIndicatorEn findByIndicator_NId(@Param("iusNID") int indicator_NId);

	
	@Override
	@Query("SELECT ind.indicator_Name,ind.columnName  FROM UtIndicatorEn ind , UtIndicatorUnitSubgroup ius , UtIcIus icus  WHERE "
			+ " icus.IC_NId.typeDetail.id = :checklistType "
			+ " AND icus.IUSNId = ius.IUSNId "
		
			+ " AND ind.indicator_NId = ius.indicator_NId "
			+ " ")
	public List<Object []> findScoreIndicatorByCheckListType(
			@Param("checklistType")Integer checklist_type_detail_id_fk);
	
	@Override
	@Query("SELECT ind.indicator_Name,ind.columnName,ind.denominatorOrMaxScore  FROM UtIndicatorEn ind  WHERE "
			+ " ind.indicatorType ='score'")
	public List<Object[]> findScoreIndicator();
	
	@Override
	@Query("SELECT ind FROM UtIndicatorUnitSubgroup ius join ius.indicator_NId ind , UtIcIus icIus WHERE "
			+ " icIus.IUSNId.IUSNId = ius.IUSNId  "
			+ " AND icIus.IC_NId.typeDetail.id = 122 "
			+ " AND ius.unit_NId.unit_NId = 2 "
			+ " AND ind.indicatorType ='score'")
	public List<UtIndicatorEn> findScoreChecklistIndicator();
	

	@Override
	@Query("SELECT ind FROM UtIndicatorEn ind WHERE ind.indicator_NId=:indicatorNId")
	 UtIndicatorEn findByIndicatornID(@Param("indicatorNId")int indicatorNId);
}
