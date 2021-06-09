package org.sdrc.ess.repository.springdatajpa;

import org.sdrc.ess.domain.UtIndicatorEn;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 
 * @author Azaruddin(azaruddin@sdrc.co.in)
 *	This interface is added because of some limited feature of Spring Fata JPA
 */

public interface UtIndicatorEnRepository2  extends JpaRepository<UtIndicatorEn,Integer>,UtIndicatorEnRepositoryCustom{

	
	
}
