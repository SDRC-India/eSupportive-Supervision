package org.sdrc.ess.service;

/**
 * @author Debiprasad Parida (Debiprasad@sdrc.co.in) on 02-Oct-2017 4:00:00 pm
 *
 */

import org.sdrc.ess.domain.Timeperiod;
import org.sdrc.ess.domain.UtTimeperiod;

public interface AggregationService {
	
	Timeperiod createCurrentMonth() throws Exception;

	Timeperiod createPreviousThreeMonth() throws Exception;
	
	boolean updateToLatestsSubmission() throws Exception;
	
	
	//azaruddin
	UtTimeperiod createCurrentMonthUtTimePeriod() throws Exception;
	
	//azaruddin
	UtTimeperiod createQuaterlyFinancialUtTimePeriod() throws Exception;
	


	//author : azaruddin.
	public boolean callAggregationForIndicators(UtTimeperiod timeperiod)  throws Exception;

}
