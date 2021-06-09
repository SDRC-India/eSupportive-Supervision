package org.sdrc.ess.service;

import java.util.Map;

import org.sdrc.ess.model.mobile.PlanOfActionModel;
import org.sdrc.ess.model.web.ErrorClass;

/**
 * @author Naseem Akhtar (naseem@sdrc.co.in) on 30th September 2017 14:58 hrs.
 * This service class will handle all the request for open items page like 
 * update open items, display of open items etc.
 */
public interface OpenItemsService {

	Map<String, Object> fetchOpenItems();

	ErrorClass updateOpenItems(PlanOfActionModel planOfActionModel);

}
