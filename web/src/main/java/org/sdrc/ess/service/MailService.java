package org.sdrc.ess.service;

import org.sdrc.ess.model.mobile.MailModel;


/**
 * @author Sarita Panigrahi(sarita@sdrc.co.in)
 *
 */
public interface MailService {
	
	
	String sendMail(MailModel mail) throws Exception;
	
}
