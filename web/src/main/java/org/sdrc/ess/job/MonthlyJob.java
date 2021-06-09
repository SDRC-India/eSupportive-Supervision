package org.sdrc.ess.job;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.sdrc.ess.service.AggregationService;
import org.springframework.scheduling.quartz.QuartzJobBean;

public class MonthlyJob extends QuartzJobBean {
	
	private AggregationService aggregationServiceImpl;

	public void setAggregationServiceImpl(AggregationService aggregationServiceImpl) {
		this.aggregationServiceImpl = aggregationServiceImpl;
	}

	//call every month on 1st 
	@Override
	protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
	
		try {
			aggregationServiceImpl.updateToLatestsSubmission();
			aggregationServiceImpl.createCurrentMonth();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
