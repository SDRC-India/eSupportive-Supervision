package org.sdrc.ess.web.controller;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.sdrc.ess.model.mobile.AreaModel;
import org.sdrc.ess.model.web.ChangePasswordModel;
import org.sdrc.ess.model.web.ErrorClass;
import org.sdrc.ess.model.web.EssUserModel;
import org.sdrc.ess.model.web.ValueObject;
import org.sdrc.ess.service.UserService;
import org.sdrc.ess.util.Constants;
import org.sdrc.ess.util.StateManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * @author Sarita Panigrahi
 * @author Jagat Bandhu Sahoo created on: 20-07-2017 UserController for the CRUD
 *         operations of user
 *         @author Harsh Pratyush
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 22-Sep-2017 4:51:12 pm
 *
 */
@Controller
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private StateManager stateManager;

	private static final Logger logger = LoggerFactory
			.getLogger(UserController.class);
	@Autowired
	private ResourceBundleMessageSource messages;

	// @Authorize(feature="resetUserPassword", permission="edit")
	@RequestMapping(value = "/resetUserPassword", method = RequestMethod.GET)
	public String getResetUserPassWord() {
		EssUserModel essUserModel = (EssUserModel) stateManager
				.getValue(Constants.Web.USER_PRINCIPAL);
		if (essUserModel != null)
			return "resetUserPassword";
		else
			return "exception";
	}

	@RequestMapping(value = "/register", method = RequestMethod.GET)
	public String getRegisterPage(Model model,
			RedirectAttributes redirectAttributes) {
		model.addAttribute("newUser", new EssUserModel());
		// condition added by harsh depending on the session the url will
		// changes
		if (stateManager.getValue(Constants.Web.USER_PRINCIPAL) == null) {
			return "newUser";
		} else {
			return "redirect:profile";
		}
	}

	// added by harsh on devikrushna system
	/**
	 * 
	 * @author Harsh Pratyush (From devikrushna system)
	 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 22-Sep-2017 4:51:12 pm
	 * 
	 */
	@RequestMapping(value = "/profile", method = RequestMethod.GET)
	public String getProfilePage(Model model,
			RedirectAttributes redirectAttributes) {

		if (stateManager.getValue(Constants.Web.USER_PRINCIPAL) == null) {
			throw new org.springframework.security.access.AccessDeniedException(
					"unauthorized");
		} else {
			model.addAttribute("newUser", new EssUserModel());
			return "newUser";
		}
	}

	@RequestMapping(value = "/register.do", method = RequestMethod.POST)
	public String saveRegistrationAction(
			@ModelAttribute("newUser") @Valid EssUserModel userModel,
			BindingResult bindingResult, Model model,
			RedirectAttributes redirectAttributes) throws Exception {

		List<String> errMessgs = new ArrayList<String>();

		try {
			if (bindingResult.hasErrors()) {
				return "/newUser";
			}
			model.addAttribute("newUser", userModel);
			String sucssesmessage = userService.saveUsers(userModel);
			
            if(sucssesmessage.equals("success")){
			errMessgs.add("Success");
			redirectAttributes.addFlashAttribute("modalformError", errMessgs);
			redirectAttributes
					.addFlashAttribute("modalclassName", "modal show");
			return "redirect:/";
            }
			else if (sucssesmessage.equals("inchargeExists")) {
				errMessgs.add("inchargeExists");
				redirectAttributes.addFlashAttribute("modalfacilityinchargeList", errMessgs);
				redirectAttributes.addFlashAttribute("modalclassName", "modal show");

				return "redirect:/register";
			}
            else{
            	errMessgs.add("Fail");
    			redirectAttributes.addFlashAttribute("modalfailError", errMessgs);
    			redirectAttributes
    					.addFlashAttribute("modalclassName", "modal show");
    			return "redirect:/register";
            }
			
		} catch (Exception e) {
			errMessgs.add("Fail");
			redirectAttributes.addFlashAttribute("modalformfail", errMessgs);
			redirectAttributes
					.addFlashAttribute("modalclassName", "modal show");
			return "redirect:/register";
		}

	}

	@RequestMapping(value = "/designations", method = RequestMethod.GET)
	@ResponseBody
	public List<ValueObject> getDesignationsByArea(
			@RequestParam("designationId") Integer designationId) {
		return userService.getDesignations(designationId);
	}

	@RequestMapping(value = "/designationsByRoleAreaOrg", method = RequestMethod.GET)
	@ResponseBody
	public List<ValueObject> getDesignationsByArea(
			@RequestParam(value = "roleId") Integer roleId,
			@RequestParam(value = "areaId", required = false) Integer areaId,
			@RequestParam(value = "orgId") Integer orgId) {
		return userService.getDesignationsByRoleArea(roleId, areaId, orgId);
	}
	
	@RequestMapping(value = "/designationsByRoleAreaOrgForProfileUpdate", method = RequestMethod.GET)
	@ResponseBody
	public List<ValueObject> getDesignationsByAreaForProfileUpdate(
			@RequestParam(value = "roleId") Integer roleId,
			@RequestParam(value = "areaId", required = false) Integer areaId,
			@RequestParam(value = "orgId") Integer orgId) {
		return userService.getDesignationsByAreaForProfileUpdate(roleId, areaId, orgId);
	}

	@RequestMapping(value = "/areas", method = RequestMethod.GET)
	@ResponseBody
	public List<AreaModel> getAllArea() {
		return userService.getAllArea();
	}

	@RequestMapping(value = "/typeDetails", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, List<ValueObject>> getAllTypeDetails() {
		return userService.getAllMasterTypeDetails();
	}

	@RequestMapping(value = "/userAvailibility", method = RequestMethod.GET)
	@ResponseBody
	public Boolean userAvailibility(@RequestParam("userName") String userName) {
		return userService.userAvailibility(userName.trim().toLowerCase());
	}

	@RequestMapping(value = "/saveEssUser", method = RequestMethod.POST)
	@ResponseBody
	public String saveUsers(@RequestParam("userModel") EssUserModel userModel)
			throws Exception {
		return userService.saveUsers(userModel);
	}

	// @Authorize(feature="resetUserPassword", permission="edit")
	@RequestMapping(value = "/resetPwd", method = RequestMethod.POST)
	@ResponseBody
	public ErrorClass resetPassword(@RequestBody ChangePasswordModel obj) {

		return userService.resetPassword(obj);
	}

	@RequestMapping(value = "/userAvailabilitySuggest", method = RequestMethod.GET)
	@ResponseBody
	public ErrorClass userAvailabilitySuggest(
			@RequestParam("firstName") String firstName,
			@RequestParam("middleName") String middleName,
			@RequestParam("lastName") String lastName,
			@RequestParam("userName") String userName) {
		return userService.userAvailabilitySuggest(firstName.trim()
				.toLowerCase(), middleName.trim().toLowerCase(), lastName
				.trim().toLowerCase(), userName.trim().toLowerCase());
	}

	@RequestMapping(value = "/primaryEmailAvailability", method = RequestMethod.GET)
	@ResponseBody
	public Boolean primaryEmailIdAvailibility(
			@RequestParam("primaryEmailId") String primaryEmailId) {
		return userService.primaryEmailIdAvailibility(primaryEmailId);
	}

	@RequestMapping(value = "/mobileNumberAvailability", method = RequestMethod.GET)
	@ResponseBody
	public Boolean mobileNumberAvailibility(
			@RequestParam("mobileNumber") String mobileNumber) {
		return userService.mobileNumberAvailibility(mobileNumber);
	}

	@RequestMapping(value = "/getEmailVarificationCode", method = RequestMethod.POST)
	@ResponseBody
	public ErrorClass getEmailVarificationCode(
			@RequestParam("email") String email) {
		return userService.getEmailVarificationCode(email);
	}

	@RequestMapping(value = "/getEmailOTPAvailability", method = RequestMethod.POST)
	@ResponseBody
	public ErrorClass OTPAndEmailAvailibility(
			@RequestParam("email") String email,
			@RequestParam("varificationCode") Integer varificationCode) {
		return userService.OTPAndEmailAvailibility(email, varificationCode);
	}

	@RequestMapping(value = "/userDetails", method = RequestMethod.GET)
	@ResponseBody
	public EssUserModel getUserDetails() {
		return userService.getUserDetails();
	}

	@RequestMapping(value = "/getOrganization", method = RequestMethod.GET)
	@ResponseBody
	public List<ValueObject> getOrganizationByRole(
			@RequestParam("roleId") Integer roleId) {
		return userService.getAllOrganizationByRole(roleId);

	}

	@RequestMapping(value = "/updateUserDetails", method = RequestMethod.POST)
	public String updateUserDetails(@RequestBody EssUserModel userModel,
			HttpServletRequest request) throws Exception {
		ErrorClass errorClass = userService.updateUserDetails(userModel);
		request.setAttribute("errorClass", errorClass);
		return "forward:/updateLoginModel";

	}

	@RequestMapping(value = "/getAllUserLevel", method = RequestMethod.GET)
	@ResponseBody
	public List<ValueObject> getOrganizationByRole() {
		return userService.getAllUserLevel();

	}

	@RequestMapping(value = "/downloadresources", method = RequestMethod.POST)
	public void downLoad(@RequestParam("fileName") String name,
			HttpServletResponse response) throws IOException {

		InputStream inputStream;
		String fileName = name;
		try {
			fileName = messages.getMessage(Constants.Web.USER_MANUAL_PATH,
					null, null) + fileName;
			inputStream = new FileInputStream(fileName);
			String headerKey = "Content-Disposition";
			String headerValue = String.format("attachment; filename=\"%s\"",
					new java.io.File(fileName).getName());
			response.setHeader(headerKey, headerValue);
			response.setContentType("application/octet-stream"); // for all file
																	// type
			ServletOutputStream outputStream = response.getOutputStream();
			FileCopyUtils.copy(inputStream, outputStream);
			outputStream.close();

		} catch (FileNotFoundException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}
	}

}
