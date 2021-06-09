package org.sdrc.ess.job;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.sdrc.ess.domain.UtTimeperiod;
import org.sdrc.ess.service.AggregationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.quartz.QuartzJobBean;

/**
 * 
 * @author Azaruddin(azaruddin@sdrc.co.in)
 *
 */

public class MonthlyAggregationJob extends QuartzJobBean {

	private AggregationService aggregationServiceImpl;

	private final Logger _log = LoggerFactory.getLogger(MonthlyAggregationJob.class);
	
	public void setAggregationServiceImpl(AggregationService aggregationServiceImpl) {
		this.aggregationServiceImpl = aggregationServiceImpl;
	}

	// call every month on 1st
	@Override
	protected void executeInternal(JobExecutionContext context) throws JobExecutionException {

		try {
			// creating current month in UT Timeperiod
			// LocalDateTime date = LocalDateTime.now();
			// int day = date.getDayOfMonth();
		System.out.println("Starting monthly indicator aggreation");
			
			UtTimeperiod timeperiod = aggregationServiceImpl.createCurrentMonthUtTimePeriod();
			
			aggregationServiceImpl.callAggregationForIndicators(timeperiod);
			
			// calling all functions sequentially
			System.out.println("Finished monthly indicator aggreation");
		}catch(RuntimeException e) {
			_log.error("Critical: Monthly indicator aggregation cron job failed.{}",e);
		} catch (Exception e) {
			_log.error("Critical: Monthly indicator aggregation cron job failed.{}",e);
		}

	}

}