package org.sdrc.ess.repository.springdatajpa;

import java.sql.Date;
import java.util.List;

import org.sdrc.ess.domain.Timeperiod;
import org.sdrc.ess.domain.UtTimeperiod;
import org.sdrc.ess.repository.TimeperiodRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.data.repository.query.Param;

/**
*
* @author Debiprasad Parida (debiprasad@sdrc.co.in) on 22-09-2017 05:30 am
*
*/

@RepositoryDefinition(domainClass=Timeperiod.class, idClass=Integer.class)
public interface SpringDataTimeperiodRepository extends TimeperiodRepository{
	
	@Override
	@Query("SELECT tm FROM Timeperiod tm WHERE tm.startDate=:startDate AND tm.endDate=:endDate")
	Timeperiod findByStartDateAndEndDate(@Param("startDate")Date startDate, @Param("endDate")Date endDate);
	
	
	@Override
	@Query(value = "SELECT * FROM timeperiod WHERE periodicity =:periodcity ORDER BY id DESC LIMIT 6 OFFSET 1", nativeQuery = true)
	List<Timeperiod> findByPeriodicityOrderByTimeperiodIdDesc(@Param("periodcity")String periodcity);
	
	
	@Override
	@Query(value = "SELECT * FROM timeperiod WHERE periodicity =:periodcity ORDER BY id DESC LIMIT 12 OFFSET 1", nativeQuery = true)
	List<Timeperiod> findTop12ByPeriodicityOrderByTimeperiodIdAsc(@Param("periodcity")String periodcity);

	
	
}
