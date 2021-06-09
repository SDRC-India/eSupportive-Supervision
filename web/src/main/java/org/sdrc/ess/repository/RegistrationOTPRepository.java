package org.sdrc.ess.repository;

import org.sdrc.ess.domain.RegistrationOTP;
import org.springframework.transaction.annotation.Transactional;

/**
*
* @author Debiprasad Parida (debiprasad@sdrc.co.in) on 04-08-2017 01:23 am
*
*/

public interface RegistrationOTPRepository {
	
	@Transactional
	RegistrationOTP save(RegistrationOTP registrationOTP);
	
	RegistrationOTP findByEmailIdAndIsActiveTrue(String emailId);
	
	RegistrationOTP findByEmailIdAndVarificationCodeAndIsActiveTrue(String emailId,Integer otpId);

}
