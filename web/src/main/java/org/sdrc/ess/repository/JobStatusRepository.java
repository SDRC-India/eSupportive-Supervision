package org.sdrc.ess.repository;

import org.sdrc.ess.domain.JobStatus;
import org.springframework.transaction.annotation.Transactional;

/**
*
* @author Debiprasad Parida (debiprasad@sdrc.co.in) on 12-09-2017 07:30 pm
*
*/
public interface JobStatusRepository {
	
	@Transactional
	JobStatus save(JobStatus jobStatus);
	
	JobStatus findTop1StartDateIsNotNullAndEndDateIsNotNullAndJobNameAndStatusAndJobType(String jobName, String status, String jobType);

}
