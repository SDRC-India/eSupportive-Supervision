package org.sdrc.ess.thread;

import org.sdrc.ess.model.mobile.SyncModel;
import org.sdrc.ess.service.MobileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

/**
* @author Sarita Panigrahi(sarita@sdrc.co.in)
* created on on 10-06-2017
* This thread will be called once the sync process is done, to send email for the submissions
*
*/
@Component
@Scope("prototype")
public class PostSyncThread extends Thread{
	
	private static final Logger logger = LoggerFactory
			.getLogger(PostSyncThread.class);
	
	@Autowired
	private MobileService mobileService;

	private SyncModel syncModel;

	public SyncModel getSyncModel() {
		return syncModel;
	}

	public void setSyncModel(SyncModel syncModel) {
		this.syncModel = syncModel;
	}
	
	@Override
	public void run() {
		
		try {
			mobileService.sendReportInEmail(getSyncModel());
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		
	}
	
	
}
