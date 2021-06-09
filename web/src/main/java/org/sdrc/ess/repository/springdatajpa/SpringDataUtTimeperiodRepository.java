package org.sdrc.ess.repository.springdatajpa;

import java.util.List;

import org.sdrc.ess.domain.UtTimeperiod;
import org.sdrc.ess.repository.UtTimeperiodRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.data.repository.query.Param;

/**
 * 
 * @author Azaruddin(azaruddin@sdrc.co.in)
 * @author Harsh Pratyush (harsh@sdrc.co.in)
 */

@RepositoryDefinition(domainClass=UtTimeperiod.class,idClass=Integer.class)
public interface SpringDataUtTimeperiodRepository extends UtTimeperiodRepository{

	@Override
	@Query("SELECT tp FROM UtTimeperiod tp WHERE tp.timePeriod_NId =(SELECT "
			+ "MAX(tmp.timePeriod_NId) FROM UtTimeperiod tmp where tmp.periodicity.preodicityId = 1)")
	public UtTimeperiod findLatestTimePeriod();
	
	@Override
	@Query("SELECT time,p FROM UtTimeperiod  time JOIN time.periodicity as p  WHERE time.timePeriod_NId " +
			" IN (SELECT distinct data.timePeriod_NId FROM UtData data  WHERE data.IUSNId.IUSNId = :iusNid "
			+ "AND data.source_NId.IC_NId = :sourceNid)")
	List<Object[]> findBySource_Nid(@Param("iusNid") Integer iusNid,@Param("sourceNid") Integer sourceNid);
	
	
	@Override
	@Query(value = "SELECT t FROM UtTimeperiod t WHERE  timePeriod_NId = :timePeriod_NId")
	UtTimeperiod findByTimeperiodNid(@Param("timePeriod_NId") Integer timePeriod_NId);
}
