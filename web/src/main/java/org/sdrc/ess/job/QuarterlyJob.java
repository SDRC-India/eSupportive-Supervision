package org.sdrc.ess.job;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.sdrc.ess.service.AggregationService;
import org.springframework.scheduling.quartz.QuartzJobBean;

public class QuarterlyJob extends QuartzJobBean {

	private AggregationService aggregationServiceImpl;

	public void setAggregationServiceImpl(AggregationService aggregationServiceImpl) {
		this.aggregationServiceImpl = aggregationServiceImpl;
	}


	@Override
	protected void executeInternal(JobExecutionContext context) throws JobExecutionException {

		try {
			aggregationServiceImpl.createPreviousThreeMonth();
			

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
