package org.sdrc.ess.job;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.sdrc.ess.domain.UtTimeperiod;
import org.sdrc.ess.service.AggregationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.quartz.QuartzJobBean;

public class QuaterlyAggreationJob extends QuartzJobBean {

	private AggregationService aggregationServiceImpl;
	

	private final Logger _log = LoggerFactory.getLogger(QuaterlyAggreationJob.class);
	
	public void setAggregationServiceImpl(AggregationService aggregationServiceImpl) {
		this.aggregationServiceImpl = aggregationServiceImpl;
	}

	// call every financial quarter on 8th of month
	@Override
	protected void executeInternal(JobExecutionContext context) throws JobExecutionException {

		try {

			UtTimeperiod timeperiod = aggregationServiceImpl.createQuaterlyFinancialUtTimePeriod();
			
			aggregationServiceImpl.callAggregationForIndicators(timeperiod);
			
			// calling all functions sequentially

		} catch (Exception e) {
			_log.error("Critical: Quaterly indicator aggregation cron job failed.{}",e);
		}

	}

}