package org.sdrc.ess.repository;

import org.sdrc.ess.core.UtUnitType;
import org.sdrc.ess.domain.UtUnitEn;

/**
 * 
 * @author Azaruddin(azaruddin@sdrc.co.in)
 *
 */

public interface UtUnitEnRepository {

	UtUnitEn save(UtUnitEn utUnitEn);

	UtUnitEn findByUtUnitType(UtUnitType number);

}
