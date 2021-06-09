package org.sdrc.ess.repository;
/**
*
* @author Debiprasad Parida (debiprasad@sdrc.co.in) on 22-09-2017 05:26 am
*
*/

import java.sql.Date;
import java.util.List;

import org.sdrc.ess.domain.Timeperiod;
import org.springframework.transaction.annotation.Transactional;




public interface TimeperiodRepository {
	
	@Transactional
	Timeperiod save(Timeperiod timePeriod);
	
	Timeperiod findTop1ByPeriodicityOrderByTimeperiodIdDesc(String periodcity);
	
	List<Timeperiod> findByPeriodicityOrderByTimeperiodIdDesc(String periodcity);
	
	Timeperiod findByStartDateAndEndDate(Date startDate, Date endDate);
	
	List<Timeperiod> findByTimeperiodIdBetweenAndPeriodicityOrderByTimeperiodIdAsc(Integer startDateId, Integer endDateId, String periodcity);
	
	Timeperiod findByTimeperiodId(Integer timePeriodId);
	
	List<Timeperiod> findTop6ByPeriodicityOrderByTimeperiodIdDesc(String periodcity);
	
	List<Timeperiod> findTop12ByPeriodicityOrderByTimeperiodIdAsc(String periodcity);

}
