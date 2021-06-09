package org.sdrc.ess.repository;

import org.sdrc.ess.domain.UtSubgroupValsEn;

/**
 * 
 * @author Azaruddin(azaruddin@sdrc.co.in)
 *
 */
public interface UtSubgroupValsEnRepository {

	UtSubgroupValsEn save(UtSubgroupValsEn UtSubgroupValsEn);

	UtSubgroupValsEn findBySubgroup_Val_NId(int subgroup_Val_NId);

	
	
	
}
