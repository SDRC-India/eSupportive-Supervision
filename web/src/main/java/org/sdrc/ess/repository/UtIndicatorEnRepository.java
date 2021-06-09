package org.sdrc.ess.repository;

import java.util.List;



import org.sdrc.ess.core.UtUnitType;
import org.sdrc.ess.domain.UtIndicatorEn;
import org.springframework.dao.DataAccessException;

/**
 * 
 * @author Azaruddin(azaruddin@sdrc.co.in)
 *
 */

public interface UtIndicatorEnRepository {

	UtIndicatorEn save(UtIndicatorEn utIndicatorEn);

	public List<UtIndicatorEn> findAllIndicatorByCheckListType(Integer checklist_type_detail_id_fk);
	
	public String findAllIndicatorColumnNamesByCheckListType(String checklist_type_detail_id_fk);
	
	
	public List<Object []> findScoreIndicatorByCheckListType(Integer checklist_type_detail_id_fk);

	List<Object[]> findScoreIndicator();

	/*
	 * String fetchAllValuesOfIndicatorsForFacilityData(String columnNames,Integer blockId, Timestamp
	 * startDateInTimePeriod, Timestamp endDateInTimePeriod,Integer facilityTypeId);
	 * 
	 * String fetchAllValuesOfIndicatorsForCommunityData(String columnNames,Integer blockId, Timestamp
	 * startDateInTimePeriod, Timestamp endDateInTimePeriod,Integer facilityTypeId);
	 */

	public List<Object[]> fetchIndicatorFromSector(Integer sectorNid,UtUnitType utunittype) throws DataAccessException;

	public UtIndicatorEn findByIndicator_NId(int indicator_NId);
	
	public UtIndicatorEn findByIndicatornID(int indicatorNId);

	List<UtIndicatorEn> findScoreChecklistIndicator();

}
