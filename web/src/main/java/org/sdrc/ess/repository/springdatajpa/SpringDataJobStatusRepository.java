package org.sdrc.ess.repository.springdatajpa;

import org.sdrc.ess.domain.JobStatus;
import org.sdrc.ess.repository.JobStatusRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.data.repository.query.Param;

@RepositoryDefinition(domainClass = JobStatus.class, idClass = Integer.class)
public interface SpringDataJobStatusRepository extends JobStatusRepository {

	
	@Override
	@Query(value="SELECT * FROM job_status WHERE end_date IS NOT NULL AND start_date IS NOT NULL "
			+ "AND job_name = :jobName AND status=:status AND job_type=:jobType ORDER BY id DESC LIMIT 1 ", nativeQuery = true)
	JobStatus findTop1StartDateIsNotNullAndEndDateIsNotNullAndJobNameAndStatusAndJobType(@Param("jobName")String jobName ,@Param("status")String status,
			@Param("jobType")String jobType);
	
}
