package org.sdrc.ess.repository.springdatajpa;

import java.util.List;

import org.sdrc.ess.domain.UtIndicatorClassificationsEn;
import org.sdrc.ess.repository.UtIndicatorClassificationsEnRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.data.repository.query.Param;

/**
 * 
 * @author Azaruddin(azaruddin@sdrc.co.in)
 *
 */

@RepositoryDefinition(domainClass = UtIndicatorClassificationsEn.class, idClass = Integer.class)
public interface SpringDataUtIndicatorClassificationsEnRepository extends UtIndicatorClassificationsEnRepository {
	
	
	@Override
	@Query("select en from UtIndicatorClassificationsEn en where en.IC_Name = :icName and en.IC_Parent_NId = :parent")
	public UtIndicatorClassificationsEn findByIC_NameAndIC_Parent(@Param("icName")String icName,@Param("parent")UtIndicatorClassificationsEn utIndicatorClassificationsEn);

	@Override
	@Query("select en from UtIndicatorClassificationsEn en where en.IC_Name = :icName and en.IC_Parent_NId = null")
	public UtIndicatorClassificationsEn findByIC_NameAndIC_Parent_NIdIsNull(@Param("icName")String icName);


	@Override
	@Query("SELECT en from UtIndicatorClassificationsEn en WHERE"
			+ " en.IC_Parent_NId IS NULL")
	public List<UtIndicatorClassificationsEn> findByIC_Parent_NIdIsNull();
	
	
	@Override
	@Query("SELECT en from UtIndicatorClassificationsEn en WHERE"
			+ " en.IC_Type =:ic_Type")
	public List<UtIndicatorClassificationsEn> findByIC_Type(@Param("ic_Type")String ic_Type);

	@Override
	@Query("SELECT ic FROM UtIndicatorClassificationsEn ic WHERE ic.IC_NId " +
	" in (SELECT distinct data.source_NId FROM UtData data JOIN data.IUSNId ius "
	+ "   WHERE ius.IUSNId = :iusNid)")
	public List<UtIndicatorClassificationsEn> findByIUS_Nid(@Param("iusNid") Integer iusNid);


	@Override
	@Query("SELECT uice FROM UtIndicatorClassificationsEn uice where uice.IC_NId = :IC_NId")
	public List<UtIndicatorClassificationsEn> findByIC_NId(@Param("IC_NId") int IC_Parent_NId);
	
	
	@Override
	@Query("SELECT utindc FROM UtIndicatorClassificationsEn utindc WHERE utindc.IC_Parent_NId IN "
			+ "( SELECT utin.IC_NId FROM UtIndicatorClassificationsEn utin WHERE utin.icSectorType='SCORE' AND utin.typeDetail.id=:checklistId)"
			+ " ORDER BY utindc.IC_Order DESC")
	public List<UtIndicatorClassificationsEn> findByChecklist_Type_Detail_Id_FkAndIcSectorType(@Param("checklistId")Integer checklistId);
	
	
	@Override
	@Query("SELECT DISTINCT(ind.indicator_NId),ind.indicator_Name FROM "
			+ "UtIndicatorClassificationsEn utind,UtIcIus uii,UtIndicatorUnitSubgroup ius,UtIndicatorEn ind "
			+ "WHERE utind.IC_NId=uii.IC_NId.IC_NId AND uii.IUSNId.IUSNId = ius.IUSNId AND ius.indicator_NId.indicator_NId = ind.indicator_NId "
			+ "AND utind.IC_NId=:icNid ORDER BY ind.indicator_NId")
	 List<Object[]> findByIC_NId(@Param("icNid")Integer icNid);
	


}
