package org.sdrc.ess.controller;

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
import org.sdrc.ess.service.MobileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * This controller will deal with request from mobile device
 * 
 * @author Naseem Akhtar (naseem@sdrc.co.in) on 23-May-2017 1:35:51 am
 * @author Ratikanta
 */
@Controller
public class MobileController {

	@Autowired
	private MobileService mobileService;

	/**
	 * 
	 * @author Ratikanta
	 * @param loginModel
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "login", method = RequestMethod.POST)
	@ResponseBody
	public MasterDataModel submit(@RequestBody LoginModel loginModel, HttpServletRequest request) {
		return mobileService.getMasterData(loginModel, request);
	}

	@RequestMapping(value = "submit", method = RequestMethod.POST)
	@ResponseBody
	public SubmitResultModel submit(@RequestBody SubmitModel submitModel) {
		return mobileService.submitData(submitModel);
	}

	@RequestMapping(value = "sync", method = RequestMethod.POST)
	@ResponseBody
	public SyncResult sync(@RequestBody SyncModel syncModel, HttpServletRequest request) {
		return mobileService.sync(syncModel, request);
	}

	@RequestMapping(value = "forgotPassword", method = RequestMethod.POST)
	@ResponseBody
	public ForgotPasswordModel forgotPassword(@RequestBody String email) {
		return mobileService.forgotPassword(email);
	}

	@RequestMapping(value = "resetPassword", method = RequestMethod.GET)
	public String resetPassword(@RequestParam String kZiasLioeWhdn, Model model) {
		ResetPasswordModel resetPasswordModel = mobileService.resetPassword(kZiasLioeWhdn);
		if (resetPasswordModel.getUniqueKey() != null)
			model.addAttribute("shdjkfh", resetPasswordModel.getUniqueKey());
		return resetPasswordModel.getRedirectTo();
	}

	@RequestMapping(value = "changePassword", method = RequestMethod.POST)
	@ResponseBody
	public ForgotPasswordModel changePassword(@RequestBody LoginModel user) {
		return mobileService.changePassword(user);
	}

	@RequestMapping(value = "prefetchData", method = RequestMethod.POST)
	@ResponseBody
	public PrefetchResult prefetchData(@RequestBody PrefetchModel prefetchModel) {
		return mobileService.prefetchFacilityData(prefetchModel);
	}

	@RequestMapping("test")
	@ResponseBody
	public SyncResult demo() {
		return new SyncResult();
	}
}
