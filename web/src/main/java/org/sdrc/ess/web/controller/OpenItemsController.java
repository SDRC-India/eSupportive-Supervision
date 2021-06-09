package org.sdrc.ess.web.controller;

import org.sdrc.ess.model.mobile.PlanOfActionModel;
import org.sdrc.ess.model.web.ErrorClass;
import org.sdrc.ess.service.OpenItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 
 * @author Naseem Akhtar (naseem@sdrc.co.in)
 * 
 * This controller will handle all the request for open items page.
 *
 */

@Controller
public class OpenItemsController {
	
	@Autowired
	private OpenItemsService openItemsService;
	
	@RequestMapping(value = "openItemData", method = RequestMethod.GET)
	@ResponseBody
	public Object fetchOpenItems(){
		return openItemsService.fetchOpenItems();
	}
	
	@RequestMapping(value = "updateOpenItems", method = RequestMethod.POST)
	@ResponseBody
	public ErrorClass updateOpenItems(@RequestBody PlanOfActionModel planOfActionModel){
		return openItemsService.updateOpenItems(planOfActionModel);
	}

}
