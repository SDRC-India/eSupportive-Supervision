package org.sdrc.ess.repository;

import java.sql.Date;
import java.util.List;

import org.sdrc.ess.domain.UtTimeperiod;

/**
 * 
 * @author Azaruddin(azaruddin@sdrc.co.in)
 * @author Harsh Pratyush(harsh@sdrc.co.in)
 */

public interface UtTimeperiodRepository {

	UtTimeperiod save(UtTimeperiod utTimeperiod);

	UtTimeperiod findLatestTimePeriod();

	List<UtTimeperiod> findTop6ByPeriodicityPreodicityIdOrderByStartDateDesc(int i);

	
	
	List<Object[]> findBySource_Nid(Integer iusNid, Integer sourceNid);
	
	List<UtTimeperiod> findByPeriodicityPreodicityIdOrderByStartDateAsc(int i);

	UtTimeperiod findByStartDateAndEndDate(Date date, Date date2);

	UtTimeperiod findByTimeperiodNid(Integer integer);
	
	
}
