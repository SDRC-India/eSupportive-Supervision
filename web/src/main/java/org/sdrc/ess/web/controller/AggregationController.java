package org.sdrc.ess.web.controller;

import org.sdrc.ess.service.AggregationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author Debiprasad Parida (Debiprasad@sdrc.co.in) on 02-Oct-2017 4:00:00 pm
 *
 */
@Controller
public class AggregationController {
	
	@Autowired
	AggregationService aggregationService;
	
	//By debi as discussed with Harsh
	@RequestMapping(value = "/getAggregate", method = RequestMethod.GET)
	@ResponseBody
	public boolean saveplannedVsActual() throws Exception {
		return aggregationService.updateToLatestsSubmission();
	}
	

}
