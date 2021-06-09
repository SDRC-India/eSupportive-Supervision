package org.sdrc.ess.service;

import java.util.List;
import java.util.Map;

import org.sdrc.ess.model.mobile.AreaModel;
import org.sdrc.ess.model.web.ChangePasswordModel;
import org.sdrc.ess.model.web.ErrorClass;
import org.sdrc.ess.model.web.EssUserModel;
import org.sdrc.ess.model.web.ValueObject;

/** 
 * @author Sarita Panigrahi, created on: 21-Jul-2017
 */
public interface UserService {

	Map<String, List<ValueObject>> getAllMasterTypeDetails();

//	List<ValueObject> getDesignationsByArea(Integer areaId);

	List<AreaModel> getAllArea();
	
    String saveUsers(EssUserModel essUserModel)throws Exception;
	
	Boolean userAvailibility(String userId);

	EssUserModel findByUsernameAndPassword(String username, String password);

	/*  if userId available then suggest userId by user's FirstName,Lastname & middlename */
	ErrorClass userAvailabilitySuggest(String firstName, String middleName, String lastName, String userName);
	
	 /*logedin user reset password  */
	ErrorClass resetPassword(ChangePasswordModel obj);

	 /* Get designation by RoleId & AreaId */
	List<ValueObject> getDesignationsByRoleArea(Integer roleId, Integer areaId, Integer orgId);

	 /* get designation by designationId*/
    List<ValueObject> getDesignations(Integer designationId);
	
    /* check whether primary EmailId  already exists or not */
	Boolean primaryEmailIdAvailibility(String primaryEmailId);
	
	/*check whether mobile number already exists or not */
	Boolean mobileNumberAvailibility(String mobileNumber);
	
	/*send otp to corresponding primary emailId */
	ErrorClass getEmailVarificationCode(String email);
	
	/* validate Email with otp within 10 minutes  */
	ErrorClass OTPAndEmailAvailibility(String email,Integer varificationCode);
	
	/*get loged in user details*/
	EssUserModel getUserDetails();
	
	/* getAll organization by Role(user Level) */
	List<ValueObject> getAllOrganizationByRole(Integer roleId);
	
	/*user can update details  after activation */
	ErrorClass updateUserDetails(EssUserModel essUserModel)throws Exception;
	
	List<ValueObject> getAllUserLevel();

	/*For saving user meta information while login*/
	Long saveUserLoginMeta(String ipAddress, Integer userId, String userAgent);

	/*For updating the user logout info while logging out*/
	void updateLoggedOutStatus(long userLoginMetaId);

	List<ValueObject> getDesignationsByAreaForProfileUpdate(Integer roleId, Integer areaId, Integer orgId);
	
}
