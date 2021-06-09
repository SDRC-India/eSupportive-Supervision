package org.sdrc.ess.repository;

import org.sdrc.ess.domain.UtIndicatorEn;
import org.sdrc.ess.domain.UtIndicatorUnitSubgroup;
import org.sdrc.ess.domain.UtSubgroupValsEn;
import org.sdrc.ess.domain.UtUnitEn;

/**
 * 
 * @author Azaruddin(azaruddin@sdrc.co.in)
 *
 */

public interface UtIndicatorUnitSubgroupRepository {

	UtIndicatorUnitSubgroup save(UtIndicatorUnitSubgroup utIndicatorUnitSubgroup);

	UtIndicatorUnitSubgroup findByIndicator_NIdUnit_NIdSubgroup_Val_NId(UtIndicatorEn in, UtUnitEn un, UtSubgroupValsEn sub);

	UtIndicatorUnitSubgroup findByIndicator_NId(Integer iusId);

}
