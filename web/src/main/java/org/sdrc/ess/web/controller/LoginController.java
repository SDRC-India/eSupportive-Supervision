package org.sdrc.ess.web.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.sdrc.ess.model.web.ErrorClass;
import org.sdrc.ess.model.web.EssUserModel;
import org.sdrc.ess.service.UserService;
import org.sdrc.ess.util.Constants;
import org.sdrc.ess.util.Ess;
import org.sdrc.ess.util.StateManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.encoding.MessageDigestPasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


/** 
 * @author Sarita Panigrahi, created on: 26-Jul-2017
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in)
 */
@Controller
public class LoginController implements AuthenticationProvider{
	
	/**
	 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in)
	 */
	private static final Logger logger = LoggerFactory
			.getLogger(LoginController.class);
	
	@Autowired
	private ResourceBundleMessageSource errorMessageSource;
	
	@Autowired
	private ResourceBundleMessageSource messages;
	
	private final StateManager stateManager;
	
	@Autowired
	private MessageDigestPasswordEncoder passwordEncoder;
	
	@Autowired
	public LoginController(StateManager stateManager){
		this.stateManager = stateManager;
	}
	
	@Autowired
	private UserService userService;
	
	/**
	 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in)
	 */
	@Autowired
	private Ess ess;
	
	/** 
	 * @author Sarita Panigrahi
	 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in)
	 * @param request
	 * @param redirectAttributes
	 * @param username
	 * @param password
	 * @param model
	 * @return
	 * @throws IOException
	 * This method will called while an user logs in the system from web application
	 */
	@RequestMapping(value="/webLogin", method = RequestMethod.POST)
	public String authorize(HttpServletRequest request, 
							RedirectAttributes redirectAttributes,
							@RequestParam("username") String username,
							@RequestParam("password") String password,
							Model model) throws IOException{
		List<String> errMessgs = new ArrayList<String>();
		try {
			UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username.trim().toLowerCase(), password);
			token.setDetails(new WebAuthenticationDetails(request));
			Authentication authentication = this.authenticate(token);
			SecurityContextHolder.getContext().setAuthentication(authentication);
		} catch (BadCredentialsException e) {
			logger.info("Login failure for username : " + username);
			e.printStackTrace();
			SecurityContextHolder.getContext().setAuthentication(null);
			errMessgs.add(messages.getMessage(Constants.Web.INVALID_USERNAME_PASSWORD, null, null));
			redirectAttributes.addFlashAttribute("formError", errMessgs);
			redirectAttributes.addFlashAttribute("className",errorMessageSource.getMessage("bootstrap.alert.danger",null, null));
			return "redirect:/";
		}
		logger.info("Login successful for User : " + ess.getFullNameOfTheUser((EssUserModel)stateManager.getValue(Constants.Web.USER_PRINCIPAL)));
		model.addAttribute("userDetail",((EssUserModel)stateManager.getValue(Constants.Web.USER_PRINCIPAL)));
		return "redirect:/";
	}

	/* (non-Javadoc)
	 * @see org.springframework.security.authentication.AuthenticationProvider#authenticate(org.springframework.security.core.Authentication)
	 * @author Sarita Panigrahi
	 * authenticate the valid user
	 */
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		
		String encodedPassword = passwordEncoder.encodePassword(authentication.getName(),(String)authentication.getCredentials());
		EssUserModel userModel = userService.findByUsernameAndPassword(authentication.getName(), encodedPassword); 
		if (userModel == null || !userModel.getPassword().equals(encodedPassword)) 
			throw new BadCredentialsException("Invalid User!");
		
		//new code for login meta
		ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder
				.currentRequestAttributes();
		HttpServletRequest request = attr.getRequest();
		
		String ipAddress = getIpAddr(request);
		String userAgent = request.getHeader("User-Agent");
		//when the user logs in web concatenate userAgent with "Web-Login: " 
		Long loginMetaId = userService.saveUserLoginMeta(ipAddress, userModel.getUserId(), "Web-Login: "+userAgent);
		userModel.setUserLoginMetaId(loginMetaId);
		stateManager.setValue(Constants.Web.LOGIN_META_ID, loginMetaId);
		//end of new code for login meta
		stateManager.setValue(Constants.Web.USER_PRINCIPAL, userModel);
		
		return new UsernamePasswordAuthenticationToken(authentication.getName(), (String)authentication.getCredentials(), null);
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return false;
	}
	
	/** 
	 * @author Sarita Panigrahi, created on: 20-Sep-2017
	 * @param request
	 * @param resp
	 * @param redirectAttributes
	 * @return
	 * @throws IOException
	 * @throws ServletException
	 * This method will logout the user and will invalidate the session
	 */
	@RequestMapping(value = "/webLogout", method = RequestMethod.GET)
	public String logout(HttpServletRequest request, HttpServletResponse resp, RedirectAttributes redirectAttributes)
			throws IOException, ServletException {
		
		HttpSession session=request.getSession(false);
		if(session !=null){
			//new code for login meta
			long userLoginMetaId = (long) stateManager.getValue(Constants.Web.LOGIN_META_ID);
			userService.updateLoggedOutStatus(userLoginMetaId);
			stateManager.setValue(Constants.Web.LOGIN_META_ID, null);
			//end of new code for login meta
			stateManager.setValue(Constants.Web.USER_PRINCIPAL, null);
			request.getSession().setAttribute(Constants.Web.USER_PRINCIPAL, null);
//			request.getSession().invalidate();
			ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder
					.currentRequestAttributes();
			attr.getRequest().getSession(true)
					.removeAttribute(Constants.Web.USER_PRINCIPAL);
			attr.getRequest().getSession(true).invalidate();
	
			request.logout();
	
			List<String> errMessgs = new ArrayList<>();
			
			errMessgs.add(messages.getMessage(Constants.Web.SUCCESS_LOGGED_OUT, null, null));
			redirectAttributes.addFlashAttribute("formError", errMessgs);
			redirectAttributes.addFlashAttribute("className",errorMessageSource.getMessage("bootstrap.alert.success",null, null));
			return "redirect:/";
		}
		else{
			request.getSession().invalidate();
			return "redirect:/";
		}
	}
	
	//updated by Sarita Panigrahi, on 20/09/2017
	//while user updates his/her profile, call this url which will update all the updated info in state manager user model
	@RequestMapping(value="/updateLoginModel", method = RequestMethod.POST)
	@ResponseBody
	public ErrorClass updateLoginModel(HttpServletRequest request, 
							RedirectAttributes redirectAttributes,
							Model model) throws IOException{
		List<String> errMessgs = new ArrayList<String>();
		redirectAttributes.addFlashAttribute("errorMessage", request.getAttribute("errorClass"));
		ErrorClass errorClass = (ErrorClass) request.getAttribute("errorClass");
		try {
			EssUserModel existingUserModel = (EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL);
			EssUserModel updatedUserModel = userService.findByUsernameAndPassword(existingUserModel.getUsername(), existingUserModel.getPassword()); 
			stateManager.setValue(Constants.Web.USER_PRINCIPAL, updatedUserModel);
			return errorClass;
		} catch (BadCredentialsException e) {
			e.printStackTrace();
			SecurityContextHolder.getContext().setAuthentication(null);
			errMessgs.add(messages.getMessage(Constants.Web.INVALID_USERNAME_PASSWORD, null, null));
			redirectAttributes.addFlashAttribute("formError", errMessgs);
			redirectAttributes.addFlashAttribute("className",errorMessageSource.getMessage("bootstrap.alert.danger",null, null));
			return errorClass;
		} 
		
	}
	
	/** 
	 * @author Sarita Panigrahi, created on: 20-Sep-2017
	 * @param request
	 * @return
	 * This method will return the ip details of the logged in user
	 */
	private String getIpAddr(HttpServletRequest request) {      
		   String ip = request.getHeader("x-forwarded-for");      
		   if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {      
		       ip = request.getHeader("Proxy-Client-IP");      
		   }      
		   if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {      
		       ip = request.getHeader("WL-Proxy-Client-IP");      
		   }      
		   if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {      
		       ip = request.getRemoteAddr();      
		   }      
		   return ip;      
		}
}
