package org.sdrc.ess.job;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.sdrc.ess.service.ReportService;
import org.springframework.scheduling.quartz.QuartzJobBean;

/**
 * @author Debiprasad Parida(debiprasad@sdrc.co.in) Created on 09-10-2017 
 */

public class ActualVsPlannedReportJob extends QuartzJobBean {
	
	private ReportService reportServiceImpl;
	
	

	public void setReportServiceImpl(ReportService reportServiceImpl) {
		this.reportServiceImpl = reportServiceImpl;
	}



	//call every day on when site goes maintainance
	@Override
	protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
	
		try {
			Thread.sleep(1*60*1000);		
			reportServiceImpl.saveplannedVsActual();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}


}
