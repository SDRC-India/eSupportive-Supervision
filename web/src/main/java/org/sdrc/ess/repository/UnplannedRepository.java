package org.sdrc.ess.repository;

import java.sql.Timestamp;
import java.util.List;

import org.sdrc.ess.domain.Unplanned;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Debiprasad Parida(debiprasad@sdrc.co.in) Created on 09-10-2017 
 */

public interface UnplannedRepository {
	
	@Transactional
	Unplanned save(Unplanned unplanning);
	
	List<Unplanned> findByCreatedDateBetween(Timestamp startDate, Timestamp endDate);

}
