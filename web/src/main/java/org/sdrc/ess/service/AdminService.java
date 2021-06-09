package org.sdrc.ess.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.sdrc.ess.model.mobile.AreaModel;
import org.sdrc.ess.model.web.DesignationAreaOrganizationRoleMappingWebModel;
import org.sdrc.ess.model.web.ErrorClass;
import org.sdrc.ess.model.web.EssUserModel;
import org.sdrc.ess.model.web.designation.DesignationMgmtModel;

public interface AdminService {

	String updateAreas(List<AreaModel> areaList);

	List<EssUserModel> getAllPendingUsers();
	
    ErrorClass approveAUser(List<EssUserModel> userDetails,String url,Boolean approveOrReject);
	
	//String rejectAUser(Integer userId);
	
	List<EssUserModel>  getAllApprovalUsers();
	
	List<EssUserModel>  getAllRejectedUsers();
	
	String activeAndDeactive(Integer id);
	
	ErrorClass getActivate(String activationCode,HttpServletRequest request);
	
	ErrorClass getReActive (String activationCode,HttpServletRequest request);
	
	DesignationAreaOrganizationRoleMappingWebModel getDesignationInfo();
	
	ErrorClass saveDesignation(DesignationMgmtModel designationMgmtModel);
}
