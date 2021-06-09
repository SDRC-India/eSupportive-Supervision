package org.sdrc.ess.util;

import org.sdrc.ess.model.web.EssUserModel;
import org.springframework.stereotype.Component;

/**
 * This class will be used for some common functionality
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 24-Sep-2017 2:19:50 pm
 */
@Component
public class Ess {
	
	/**
	 * 
	 * This following method will give full name of a user
	 * @param essUserModel, the user model
	 * @return full name of the user
	 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 24-Sep-2017 2:22:34 pm
	 */
	public String getFullNameOfTheUser(EssUserModel essUserModel){
		
		String middleName = essUserModel.getMiddleName() != null ? essUserModel.getMiddleName() + " ": ""; 
		return essUserModel.getFirstName() + " " 
				+ middleName + essUserModel.getLastName();	
		
	}

}
