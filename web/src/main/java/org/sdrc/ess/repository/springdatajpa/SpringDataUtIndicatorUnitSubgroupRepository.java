package org.sdrc.ess.repository.springdatajpa;

import org.sdrc.ess.domain.UtIndicatorEn;
import org.sdrc.ess.domain.UtIndicatorUnitSubgroup;
import org.sdrc.ess.domain.UtSubgroupValsEn;
import org.sdrc.ess.domain.UtUnitEn;
import org.sdrc.ess.repository.UtIndicatorUnitSubgroupRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.data.repository.query.Param;

/**
 * 
 * @author Azaruddin(azaruddin@sdrc.co.in)
 *
 */

@RepositoryDefinition(domainClass = UtIndicatorUnitSubgroup.class, idClass = Integer.class)
public interface SpringDataUtIndicatorUnitSubgroupRepository extends UtIndicatorUnitSubgroupRepository {

	@Override
	@Query("select ius from UtIndicatorUnitSubgroup ius where ius.indicator_NId = :in and ius.unit_NId = :un and ius.subgroup_Val_NId = :sub")
	UtIndicatorUnitSubgroup findByIndicator_NIdUnit_NIdSubgroup_Val_NId(@Param("in")UtIndicatorEn in,@Param("un")UtUnitEn un,@Param("sub")UtSubgroupValsEn sub);

	@Override
	@Query("select ius from UtIndicatorUnitSubgroup ius where ius.IUSNId = :iusId")
	UtIndicatorUnitSubgroup findByIndicator_NId(@Param("iusId")Integer iusId); 
	
}
