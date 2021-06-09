package org.sdrc.ess.controller;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.sdrc.ess.core.Authorize;
import org.sdrc.ess.model.mobile.AreaModel;
import org.sdrc.ess.model.web.DesignationAreaOrganizationRoleMappingWebModel;
import org.sdrc.ess.model.web.ErrorClass;
import org.sdrc.ess.model.web.EssUserModel;
import org.sdrc.ess.model.web.designation.DesignationMgmtModel;
import org.sdrc.ess.service.AdminService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fasterxml.jackson.databind.ObjectMapper;
/**
 * 
 *
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 22-Sep-2017 4:58:53 pm
 */
@Controller
public class AdminController {
	
	/**
	 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in)
	 */
	private static final Logger logger = LoggerFactory
			.getLogger(AdminController.class);
	
	@Autowired
	private AdminService adminService;
	
	@Authorize(feature="userManagement", permission="view")
	@RequestMapping(value = "/userManagement", method = RequestMethod.GET)
	public String getUserManagementPage() {
		return "userManagement";
	}
	
	@Authorize(feature="designationManagement", permission="view")
	@RequestMapping(value = "/designationManagement", method = RequestMethod.GET)
	public String getDesignationManagementPage() {
		return "designationManagement";
	}
	
	@RequestMapping(value = "updateArea", method = RequestMethod.POST)
	@ResponseBody
	public String updateArea(@RequestBody List<AreaModel> areaList){
		
		return adminService.updateAreas(areaList);
		
	}
	
	@Authorize(feature="userManagement", permission="view")
	@RequestMapping(value = "getAllPendingUsers", method = RequestMethod.GET)
	@ResponseBody
	public List<EssUserModel> getAllPendingUsers(){
		return adminService.getAllPendingUsers();
		
	}
	
	@Authorize(feature="userManagement", permission="view")
	@RequestMapping(value = "getAllRejectedUsers", method = RequestMethod.GET)
	@ResponseBody
	public List<EssUserModel> getAllRejectedUsers(){
		return adminService.getAllRejectedUsers();
	}
	
	@Authorize(feature="userManagement", permission="view")
	@RequestMapping(value = "getAllApprovalUsers", method = RequestMethod.GET)
	@ResponseBody
	public List<EssUserModel> getAllApprovalUsers(){
		return adminService.getAllApprovalUsers();
	}
	
	@Authorize(feature="userManagement", permission="edit")
	@RequestMapping(value = "approveAnUser", method = RequestMethod.POST)
	@ResponseBody
	public ErrorClass approveAnUser(HttpServletRequest request,@RequestBody String userDetails,@RequestParam("approveOrReject") boolean approveOrReject) throws Exception {
		String url = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
				+ request.getRequestURI().replaceFirst("approveAnUser", "");
	
		ObjectMapper mapper = new ObjectMapper();
		EssUserModel[] dataModelList = mapper.readValue(userDetails, EssUserModel[].class);
		List<EssUserModel> iusDataModelList= new ArrayList<EssUserModel>();
		iusDataModelList=java.util.Arrays.asList(dataModelList);
	
		return adminService.approveAUser(iusDataModelList, url, approveOrReject);

	}
	
	/**
	 * 
	 * 
	 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 24-Sep-2017 12:17:57 pm
	 * Just added try block
	 */
	@RequestMapping(value = "activationLink", method = RequestMethod.GET)
	public String getActivate(@RequestParam("confirmValidation") String confirmValidation,
			RedirectAttributes redirectAttributes,HttpServletRequest request) {
		
		try{
			ErrorClass errorClass = adminService.getActivate(confirmValidation,request);
			redirectAttributes.addFlashAttribute("formError", Arrays.asList(errorClass.getErrorMessage()));
			redirectAttributes.addFlashAttribute("className", errorClass.getErrorType());
		}catch(Exception e){
			logger.info("Exception in verifying email id(activationLink) : " + e.getMessage());
			e.printStackTrace();
		}

		return "redirect:/";
	}
	
	
	@RequestMapping(value = "/downloadIDCards", method = RequestMethod.POST)
	public void downLoad(@RequestParam("fileName") String name,
			HttpServletResponse response) throws IOException {

		InputStream inputStream;
		String fileName = "";
		try {
			fileName = name.replaceAll("%3A", ":").replaceAll("%2F", "/")
					.replaceAll("%5C", "/").replaceAll("%2C", ",")
					.replaceAll("\\+", " ").replaceAll("%22", "")
					.replaceAll("%3F", "?").replaceAll("%3D", "=").replaceAll("%20", " ");
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
	
	
	/**
	 * 
	 * 
	 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) 
	 * Just added the try block
	 */
	@RequestMapping(value = "reActivationLink", method = RequestMethod.GET)
	public String getReActive(@RequestParam("confirmValidation") String confirmValidation,
			RedirectAttributes redirectAttributes,HttpServletRequest request) {
		try{
			ErrorClass errorClass = adminService.getReActive(confirmValidation,request);
			redirectAttributes.addFlashAttribute("formError", Arrays.asList(errorClass.getErrorMessage()));
			redirectAttributes.addFlashAttribute("className", errorClass.getErrorType());
		}catch(Exception e){
			logger.info("Exception in verifying email id(reActivationLink): " + e.getMessage());
			e.printStackTrace();			
		}

		return "redirect:/";
	}
	
	//DesignationManagement Starts

	@Authorize(feature="designationManagement", permission="view")
	@RequestMapping(value = "/designation", method = RequestMethod.GET)
	@ResponseBody
	public DesignationAreaOrganizationRoleMappingWebModel getDesignationInfo(){
		return adminService.getDesignationInfo();
	}
	
	
	@Authorize(feature="designationManagement", permission="edit")
	@RequestMapping(value="saveDesignation", method=RequestMethod.POST)
	@ResponseBody
	public ErrorClass saveDesignationData(@RequestBody DesignationMgmtModel designationMgmtModel){
		
		return adminService.saveDesignation(designationMgmtModel);
		
	}
	
	//DesignationManagement Ends
	
	/**
	 * @author Naseem Akhtar
	 */
	@Authorize(feature="openItems", permission="edit")
	@RequestMapping(value = "/openItems", method = RequestMethod.GET)
	public String getOpenItemsPage() {
		return "openItems";
	}
	
	@Authorize(feature="monitoringReportUser", permission="edit")
	@RequestMapping(value = "/monitoringReportUser", method = RequestMethod.GET)
	public String getMonitoringReport() {
		return "monitoringReportUser";
	}
	
	@Authorize(feature="monitoringReportFacility", permission="edit")
	@RequestMapping(value = "/monitoringReportFacility", method = RequestMethod.GET)
	public String getMonitoringReportFacility() {
		return "monitoringReportFacility";
	}
}
