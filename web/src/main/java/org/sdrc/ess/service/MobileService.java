package org.sdrc.ess.service;

import javax.servlet.http.HttpServletRequest;

import org.sdrc.ess.model.mobile.ForgotPasswordModel;
import org.sdrc.ess.model.mobile.LoginModel;
import org.sdrc.ess.model.mobile.MasterDataModel;
import org.sdrc.ess.model.mobile.PrefetchModel;
import org.sdrc.ess.model.mobile.PrefetchResult;
import org.sdrc.ess.model.mobile.ResetPasswordModel;
import org.sdrc.ess.model.mobile.SubmitModel;
import org.sdrc.ess.model.mobile.SubmitResultModel;
import org.sdrc.ess.model.mobile.SyncModel;
import org.sdrc.ess.model.mobile.SyncResult;

/**
 * This service interface is going to deal with buisness logic of mobile data 
 * @author Naseem Akhtar (naseem@sdrc.co.in) on 23-May-2017 1:35:51 am
 */
public interface MobileService {

	/**
	 * 
	 * This method is going to submit data into database
	 * @author Naseem Akhtar (naseem@sdrc.co.in) on 23-May-2017 1:35:51 am
	 */
	SubmitResultModel submitData(SubmitModel submitModel);

	/**
	 * This method will return master data to mobile device in successful login
	 * @author Naseem Akhtar (naseem@sdrc.co.in) on 23-May-2017 1:35:51 am
	 */
	MasterDataModel getMasterData(LoginModel loginModel, HttpServletRequest request);

	/**
	 * This method will synchronize any new changes made in the back-end to the mobile.
	 * @author Naseem Akhtar (naseem@sdrc.co.in) on 21st May 17:11
	 * @param request 
	 */
	SyncResult sync(SyncModel syncModel, HttpServletRequest request);

	/**
	 * This method will send an email with a link to an existing user.
	 * @author Naseem Akhtar (naseem@sdrc.co.in) on 28th May 14:02
	 * @param email
	 */
	ForgotPasswordModel forgotPassword(String email);

	/**
	 * This method will decrypt the user mail from the link and send it to reset
	 * password page.
	 * @author Naseem Akhtar (naseem@sdrc.co.in) on 29th May 14:10
	 */
	ResetPasswordModel resetPassword(String ecrypt);

	/**
	 * This method will reset the password of an user
	 * @author Naseem Akhtar (naseem@sdrc.co.in)
	 */
	ForgotPasswordModel changePassword(LoginModel user);

	void sendReportInEmail(SyncModel syncModel);

	PrefetchResult prefetchFacilityData(PrefetchModel prefetchModel);

//	String correctPlanOfAction();
	

}
