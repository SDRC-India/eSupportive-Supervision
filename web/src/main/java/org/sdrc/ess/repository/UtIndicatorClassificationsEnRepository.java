package org.sdrc.ess.repository;

import java.util.List;

import org.sdrc.ess.domain.UtIndicatorClassificationsEn;

/**
 * 
 * @author Azaruddin(azaruddin@sdrc.co.in)
 *
 */
public interface UtIndicatorClassificationsEnRepository {

	UtIndicatorClassificationsEn save(UtIndicatorClassificationsEn utIndicatorClassificationsEn);

	public UtIndicatorClassificationsEn findByIC_NameAndIC_Parent(String stringCellValue, UtIndicatorClassificationsEn utIndicatorClassificationsEn);

	public UtIndicatorClassificationsEn findByIC_NameAndIC_Parent_NIdIsNull(String stringCellValue);

	List<UtIndicatorClassificationsEn> findByIC_Type(String IC_Type);

	//List<UtIndicatorClassificationsEn> findByIC_Parent_NId(int IC_Parent_NId);

	List<UtIndicatorClassificationsEn> findByIC_NId(int IC_NId);

	//int findIcNIdbySourceType(String IC_Type);

	List<UtIndicatorClassificationsEn> findByIUS_Nid(Integer iusNid);

	List<UtIndicatorClassificationsEn> findByIC_Parent_NIdIsNull();
	
	List<UtIndicatorClassificationsEn> findByChecklist_Type_Detail_Id_FkAndIcSectorType(Integer checklistId);
	
	List<Object[]> findByIC_NId(Integer icNid);
	
	
	

}
