package org.sdrc.ess.service;

import java.io.IOException;
import java.net.InetAddress;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.hashids.Hashids;
import org.sdrc.ess.domain.Area;
import org.sdrc.ess.domain.Designation;
import org.sdrc.ess.domain.DesignationAreaOrganizationRoleMapping;
import org.sdrc.ess.domain.DesignationFeaturePermissionScheme;
import org.sdrc.ess.domain.EssUser;
import org.sdrc.ess.domain.FeaturePermissionMapping;
import org.sdrc.ess.domain.Organization;
import org.sdrc.ess.domain.Role;
import org.sdrc.ess.domain.TypeDetail;
import org.sdrc.ess.domain.UserDesignationFeaturePermissionMapping;
import org.sdrc.ess.domain.UserRegistrationMetaData;
import org.sdrc.ess.model.mobile.AreaModel;
import org.sdrc.ess.model.mobile.MailModel;
import org.sdrc.ess.model.mobile.UserAreaMappingModel;
import org.sdrc.ess.model.web.AreaWebModel;
import org.sdrc.ess.model.web.DesignationAreaOrganizationRoleMappingWebModel;
import org.sdrc.ess.model.web.ErrorClass;
import org.sdrc.ess.model.web.EssUserModel;
import org.sdrc.ess.model.web.designation.DesignationForDesignationModel;
import org.sdrc.ess.model.web.designation.DesignationMangementTableModel;
import org.sdrc.ess.model.web.designation.DesignationMgmtModel;
import org.sdrc.ess.model.web.designation.OrganizationForDesignationModel;
import org.sdrc.ess.model.web.designation.RoleModelForDesignationCountry;
import org.sdrc.ess.model.web.designation.RoleModelForDesignationState;
import org.sdrc.ess.repository.AreaRepository;
import org.sdrc.ess.repository.DesignationAreaOrganizationRoleMappingRepository;
import org.sdrc.ess.repository.DesignationFeaturePermissionSchemeRepository;
import org.sdrc.ess.repository.DesignationRepository;
import org.sdrc.ess.repository.EssUserRepository;
import org.sdrc.ess.repository.OrganizationRepository;
import org.sdrc.ess.repository.RoleRepository;
import org.sdrc.ess.repository.TypeDetailRepository;
import org.sdrc.ess.repository.UserDesignationFeaturePermissionMappingRepository;
import org.sdrc.ess.repository.UserRegistrationMetaDataRepository;
import org.sdrc.ess.util.Constants;
import org.sdrc.ess.util.DomainToModelConverter;
import org.sdrc.ess.util.Ess;
import org.sdrc.ess.util.StateManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.security.authentication.encoding.MessageDigestPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 
 *
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in)
 */
@Service
public class AdminServiceImpl implements AdminService {

	/**
	 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in)
	 */
	private static final Logger logger = LoggerFactory
			.getLogger(AdminServiceImpl.class);

	@Autowired
	private AreaRepository areaRepository;

	@Autowired
	private EssUserRepository essUserRepository;

	@Autowired
	private MailService mailService;

	@Autowired
	UserRegistrationMetaDataRepository userRegistrationMetaDataRepository;

	@Autowired
	private MessageDigestPasswordEncoder messageDigest;

	@Autowired
	private ResourceBundleMessageSource errorMessageSource;

	@Autowired
	private TypeDetailRepository typeDetailRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private StateManager stateManager;

	@Autowired
	private DesignationAreaOrganizationRoleMappingRepository designationAreaOrganizationRoleMappingRepository;

	@Autowired
	private DesignationRepository designationRepository;

	@Autowired
	private OrganizationRepository organizationRepository;

	@Autowired
	private ResourceBundleMessageSource messages;
	
	/**
	 * @author Naseem Akhtar (naseem@sdrc.co.in) on 3rd October 2017 0012 hrs
	 */
	@Autowired
	private DesignationFeaturePermissionSchemeRepository designationFeaturePermissionSchemeRepository;
	
	@Autowired
	private UserDesignationFeaturePermissionMappingRepository userDesignationFeaturePermissionMappingRepository;

	/**
	 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in)
	 */
	@Autowired
	private Ess ess;

	/**
	 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in)
	 */
	@Autowired
	private DomainToModelConverter domainToModelConverter;

	@Override
	public String updateAreas(List<AreaModel> areaModelList) {

		Map<Integer, TypeDetail> typeIdNameMap = new HashMap<>();

		List<TypeDetail> typeDetailList = typeDetailRepository.findAll();
		typeDetailList.forEach(typeDetail -> typeIdNameMap.put(
				typeDetail.getId(), typeDetail));

		if (areaModelList != null && areaModelList.size() > 0) {
			for (AreaModel areaModel : areaModelList) {
				Area area = new Area();

				area.setAreaId(areaModel.getAreaId());
				area.setAreaNId(areaModel.getAreaNId());
				area.setLevel(areaModel.getLevel());
				area.setName(areaModel.getName());
				area.setnIN(areaModel.getnIN());
				area.setFacilityType(typeIdNameMap.get((Integer) areaModel
						.getFacilityType().getId()));
			}
		}

		return null;
	}

	@Override
	public List<EssUserModel> getAllPendingUsers() {
		EssUserModel essUserModel = (EssUserModel) stateManager
				.getValue(Constants.Web.USER_PRINCIPAL);
		List<EssUser> essUsers = new ArrayList<>();

		String areaJson = "\"state\":[" + essUserModel.getStateId() + "]";
		// the pending users must have islive false and isapprove null
		if (essUserModel.getDesignationName().equals("Super Admin"))
			essUsers = essUserRepository
					.findByIsLiveFalseAndIsApprovedIsNullOrderByCreatedDateAsc();
		else
			essUsers = essUserRepository
					.findByAreaJsonLikeAndIsLiveFalseAndIsApprovedIsNull(areaJson);

		List<EssUserModel> essUserModels = setUserToUserModel(essUsers);
		return essUserModels;
	}

	private List<EssUserModel> setUserToUserModel(List<EssUser> essUsers) {

		ObjectMapper mapper = new ObjectMapper();

		UserAreaMappingModel uAMap = null;

		List<EssUserModel> essUserModels = new ArrayList<>();

		Map<Integer, String> areaNidNameMap = new HashMap<>();
		List<Area> areaList = areaRepository.findAll();
		areaList.forEach(area -> areaNidNameMap.put(area.getAreaNId(),
				area.getName()));

		for (EssUser essUser : essUsers) {

			try {
				uAMap = mapper.readValue(essUser.getUserAreaMappings()
						.getAreaJson(), UserAreaMappingModel.class);
			} catch (JsonParseException e) {
				e.printStackTrace();
			} catch (JsonMappingException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}

			String roleLevel = essUser
					.getDesignationAreaOrganizationRoleMapping().getRole()
					.getRoleName();
			String loc = "";
			if (uAMap.getFacility() != null && uAMap.getFacility().size() == 1
					&& roleLevel.equals("Facility level")) // facility level
			// loc = areaNidNameMap.get(uAMap.getCountry()) +", "+
			// areaNidNameMap.get(uAMap.getState().get(0))
			// +", " +areaNidNameMap.get(uAMap.getDistrict().get(0))+", "
			// +areaNidNameMap.get(uAMap.getBlock().get(0)) +", "
			// +areaNidNameMap.get(uAMap.getFacility().get(0));
				loc = areaNidNameMap.get(uAMap.getFacility().get(0))
						+ ", "
						+ (uAMap.getBlock().isEmpty() ? " " : areaNidNameMap
								.get(uAMap.getBlock().get(0)) + ", ")
						+ areaNidNameMap.get(uAMap.getDistrict().get(0)) + ", "
						+ areaNidNameMap.get(uAMap.getState().get(0)) + ", "
						+ areaNidNameMap.get(uAMap.getCountry());
			else if (uAMap.getBlock() != null && uAMap.getBlock().size() == 1
					&& roleLevel.equals("Block level")) // block level
			// loc = areaNidNameMap.get(uAMap.getCountry()) +", "+
			// areaNidNameMap.get(uAMap.getState().get(0))
			// +", " +areaNidNameMap.get(uAMap.getDistrict().get(0))+", "
			// +areaNidNameMap.get(uAMap.getBlock().get(0));
				loc = (essUser.getInChargeFacilityId()==null?"":(essUser.getInChargeFacilityId().getName()+"("+essUser.getInChargeFacilityId().getFacilityType().getName()+")"+","))+areaNidNameMap.get(uAMap.getBlock().get(0)) + ", "
						+ areaNidNameMap.get(uAMap.getDistrict().get(0)) + ", "
						+ areaNidNameMap.get(uAMap.getState().get(0)) + ", "
						+ areaNidNameMap.get(uAMap.getCountry());
			else if (uAMap.getDistrict() != null
					&& uAMap.getDistrict().size() == 1
					&& roleLevel.equals("District level")) // if district level
			// loc = areaNidNameMap.get(uAMap.getCountry()) +", "+
			// areaNidNameMap.get(uAMap.getState().get(0))
			// +", " +areaNidNameMap.get(uAMap.getDistrict().get(0));
				loc = (essUser.getInChargeFacilityId()==null?"":(essUser.getInChargeFacilityId().getName()+"("+essUser.getInChargeFacilityId().getFacilityType().getName()+")"+","))+areaNidNameMap.get(uAMap.getDistrict().get(0)) + ", "
						+ areaNidNameMap.get(uAMap.getState().get(0)) + ", "
						+ areaNidNameMap.get(uAMap.getCountry());
			else if (uAMap.getState() != null
					&& uAMap.getState().size() == 1
					&& (roleLevel.equals("State level") || roleLevel
							.equals("Admin level"))) // if state level
			// loc = areaNidNameMap.get(uAMap.getCountry()) +", "+
			// areaNidNameMap.get(uAMap.getState().get(0));
				loc = areaNidNameMap.get(uAMap.getState().get(0)) + ", "
						+ areaNidNameMap.get(uAMap.getCountry());
			else
				loc = areaNidNameMap.get(uAMap.getCountry());

			EssUserModel essUserModel = new EssUserModel();
			essUserModel.setIsActive(essUser.getIsActive());
			essUserModel.setIsApproved(essUser.getIsActive());
			essUserModel.setUserId(essUser.getId());
			essUserModel.setUsername(essUser.getUsername());
			essUserModel.setBirthday(new SimpleDateFormat("dd-MM-YYYY")
					.format(essUser.getBirthday()));
			essUserModel.setDesignationName(essUser
					.getDesignationAreaOrganizationRoleMapping()
					.getDesignation().getName());
			essUserModel.setFirstName(essUser.getFirstName());
			essUserModel.setMiddleName(essUser.getMiddleName());
			essUserModel.setLastName(essUser.getLastName());
			essUserModel.setAdharCardPhotoNumber(essUser
					.getAdharCardPhotoNumber() != null ? essUser
					.getAdharCardPhotoNumber() : "-");
			essUserModel
					.setPanCardPhotoNumber(essUser.getPanCardPhotoNumber() != null ? essUser
							.getPanCardPhotoNumber() : "-");
			essUserModel.setPhoneNo(essUser.getPhoneNo());
			essUserModel.setPrimaryEmailId(null == essUser
					.getSecondaryEmailId()
					|| essUser.getSecondaryEmailId().isEmpty() ? essUser
					.getPrimaryEmailId() : essUser.getPrimaryEmailId() + ", "
					+ essUser.getSecondaryEmailId()); // primary +secondary
			essUserModel.setFullName(essUser.getMiddleName() == null ? essUser
					.getSalutation().getName()
					+ " "
					+ essUser.getFirstName()
					+ " " + essUser.getLastName() : essUser.getSalutation()
					.getName()
					+ " "
					+ essUser.getFirstName()
					+ " "
					+ essUser.getMiddleName() + " " + essUser.getLastName());
			essUserModel.setLocation(loc);
			essUserModel.setAdharCardPhotoFilePathName(essUser
					.getAdharCardPhotoFilePath());
			essUserModel.setPanCardPhotoFilePathName(essUser
					.getPanCardPhotoFilePath());
			essUserModel.setCreatedDate(new SimpleDateFormat(
					"dd-MM-YYYY HH:mm:ss").format(essUser.getCreatedDate()));
			essUserModel
					.setUpdatedDate(null != essUser.getUpdatedDate() ? new SimpleDateFormat(
							"dd-MM-YYYY HH:mm:ss").format(essUser
							.getUpdatedDate()) : "-");
			essUserModel.setApproveRejectDate(null != essUser
					.getApproveOrRejectDate() ? new SimpleDateFormat(
					"dd-MM-YYYY HH:mm:ss").format(essUser
					.getApproveOrRejectDate()) : "-");
			essUserModel.setRejectionReason(essUser.getRejectionReason());
			essUserModel.setInChargeFacilityName(essUser.getInChargeFacilityId()==null ? "N/A" : essUser.getInChargeFacilityId().getName());
			essUserModels.add(essUserModel);
		}
		return essUserModels;
	}

	/**
	 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in)
	 */
	@Transactional
	@Override
	// When admin approves an User -- send Activation E-mail
	public ErrorClass approveAUser(List<EssUserModel> userDetails, String url,
			Boolean approveOrReject) {

		// Have to check session expiry
		ErrorClass errorClass = new ErrorClass();
		String actualURL = url;
		List<Integer> userIds = new ArrayList<>();
		List<String> rejectionReason = new ArrayList<>();
		for (EssUserModel essUsers : userDetails) {
			userIds.add(essUsers.getUserId());
			rejectionReason.add(essUsers.getRejectionReason());
		}
       List<Integer> inchargeId = new ArrayList<>();
		if (approveOrReject) {
			List<String> rejectList = new ArrayList<>();
			try {
				List<EssUser> essUserLists = essUserRepository.findByIdAndIsLiveFalseAndIsApprovedIsNull(userIds);
				for (EssUser essUser : essUserLists) {
					EssUser checkUser = essUser.getInChargeFacilityId()!= null?
							essUserRepository.findByInChargeFacilityIdAreaNIdAndIsApprovedIsTrueAndIsLiveIsTrue(
									essUser.getInChargeFacilityId().getAreaNId()):
								null;
					if ((essUser.getInChargeFacilityId() == null) || 
							(essUser.getInChargeFacilityId() != null && 
							!inchargeId.contains(essUser.getInChargeFacilityId().getAreaNId()) 
							&& checkUser == null)) {
						
						if(essUser.getInChargeFacilityId() != null){
							inchargeId.add(essUser.getInChargeFacilityId().getAreaNId());
						}
						essUser.setIsLive(true);
						essUser.setIsApproved(approveOrReject);
						essUser.setApproveOrRejectDate(new Timestamp(System.currentTimeMillis()));

						essUserRepository.save(essUser);
						if(essUser.getDesignationAreaOrganizationRoleMapping().getIsResponsibleFacility() ||
								essUser.getDesignationAreaOrganizationRoleMapping().getIsResponsibleCommunity()){
							DesignationFeaturePermissionScheme desigFeatPermScheme = 
									designationFeaturePermissionSchemeRepository.
									findByDesignationAndFeaturePermissionMapping(
											essUser.getDesignationAreaOrganizationRoleMapping().getDesignation(),
											new FeaturePermissionMapping(Integer.parseInt(
													messages.getMessage(Constants.Web.OPEN_ITEMS_FEAT_PERM_ID, null, null))));
							
							if(desigFeatPermScheme != null){
								UserDesignationFeaturePermissionMapping userDesgFeatPerm = 
										new UserDesignationFeaturePermissionMapping();
								
								userDesgFeatPerm.setDesignationFeaturePermissionScheme(desigFeatPermScheme);
								userDesgFeatPerm.setUserAreaMapping(essUser.getUserAreaMappings());
								userDesgFeatPerm.setUpdatedDate(new Timestamp(System.currentTimeMillis()));
								userDesgFeatPerm.setUpdatedBy(ess.getFullNameOfTheUser(
										(EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL)));
								userDesignationFeaturePermissionMappingRepository.save(userDesgFeatPerm);
							}
//							designationId.add(essUser.getDesignationAreaOrganizationRoleMapping().getDesignation().getId());
						}

						logger.info("User approved! name : "
								+ ess.getFullNameOfTheUser(domainToModelConverter.toEssUserModel(essUser))
								+ ", approved by : " + ess.getFullNameOfTheUser(
										(EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL)));

						String userCode = new Hashids(essUser.getPrimaryEmailId() + essUser.getId()).encode(570, 748,
								160);
						url = actualURL + "activationLink?confirmValidation=" + userCode;

						String msg = "<table width='600'  cellspacing='0' cellpadding='0' >" +

								"<td height='230' align='center' valign='middle' bgcolor='#ffffff' style='font-family:Arial,Helvetica,sans-serif'>"
								+

								"<p style='font-size:18px'><span style='color:#2d3e50'>Valid for </span> <span style='color:#313B09;font-weight:bold'>"
								+ " 15 Days" + "," + "</span></p>" +

								"<p style='color:#2d3e50;font-size:20px;font-weight:normal;margin:10px 0'>Your <span class='il'>registration for e Supportive Supervision </span> application has been confirmed by the admin."
								+ " Please verify your account by clicking the link below.</p>"
								+ "<p style='margin:30px 0 0 0'>"
								+ "<span style='width:263px;line-height:30px;background-color:#313B09;display:block'>"
								+ "<a href=" + url
								+ " style='text-align:center;text-decoration:none;color:#fff;font-weight:bold;font-size:16px;display:block' target='_blank'>"
								+ "<span class='il'>Verify</span> my email address </a> </span></p> </td></table>";

						// save Activation details in UserRegistrationMetaData
						// Table
						UserRegistrationMetaData userRegistrationMetaData = new UserRegistrationMetaData();
						userRegistrationMetaData.setActivationCode(
								new Hashids(essUser.getPrimaryEmailId() + essUser.getId()).encode(570, 748, 160));
						userRegistrationMetaData.setCreatedDate(new Timestamp(System.currentTimeMillis()));
						userRegistrationMetaData.setIpAddress(InetAddress.getLocalHost().getHostAddress());
						userRegistrationMetaData.setEssUser(essUser);
						userRegistrationMetaDataRepository.save(userRegistrationMetaData);

						MailModel mailModel = new MailModel();
						mailModel.setToEmailIds(Arrays.asList(essUser.getPrimaryEmailId()));
						if (essUser.getSecondaryEmailId() != null)
							mailModel.setCcEmailIds(Arrays.asList(essUser.getSecondaryEmailId()));
						mailModel.setFromUserName("eSS Admin" + "<br><br><p style=" + "font-size:10px" + ">"
								+ messages.getMessage(Constants.Web.EMAIL_DISCLAIRER, null, null) + "</p>");
						mailModel.setSubject("e Supportive Supervision: Registration request approved ");
						mailModel.setMessage(msg);
						mailModel.setToUserName(essUser.getSalutation().getName() +" "+ essUser.getFirstName());
						mailService.sendMail(mailModel);

						

					}
					else
					rejectList.add(essUser.getUsername()+":- Facility incharge for the facility, "+ essUser.getInChargeFacilityId().getName() +" already exists");
				}
				if(rejectList.isEmpty()){
				errorClass.setErrorMessage("Approval successful.");
				errorClass.setValid("true");
				}else{
					errorClass.setErrorMessage("The approval for the below mentioned users failed.");
					errorClass.setValid("false");
					errorClass.setErrorData(rejectList);
				}
				
			} catch (Exception e) {
				e.printStackTrace();
				errorClass.setValid("false");
				errorClass.setErrorMessage("Failed");
			}
		} else {
			try {
				List<EssUser> essUserLists = essUserRepository
						.findByIdAndIsLiveFalseAndIsApprovedIsNull(userIds);
				for (EssUser essUser : essUserLists) {
					essUser.setIsApproved(approveOrReject);
					essUser.setApproveOrRejectDate(new Timestamp(System
							.currentTimeMillis()));
					essUser.setRejectionReason(rejectionReason.get(essUserLists
							.indexOf(essUser)));
					essUserRepository.save(essUser);

					logger.info("User rejected! name : "
							+ ess.getFullNameOfTheUser(domainToModelConverter
									.toEssUserModel(essUser))
							+ ", rejected by : "
							+ ess.getFullNameOfTheUser((EssUserModel) stateManager
									.getValue(Constants.Web.USER_PRINCIPAL)));
					

					MailModel mailModel = new MailModel();
					mailModel.setToEmailIds(Arrays.asList(essUser
							.getPrimaryEmailId()));
					if (essUser.getSecondaryEmailId() != null)
						mailModel.setCcEmailIds(Arrays.asList(essUser
								.getSecondaryEmailId()));
					mailModel.setFromUserName("eSS Admin"
							+ "<br><br><p style="
							+ "font-size:10px"
							+ ">"
							+ messages.getMessage(
									Constants.Web.EMAIL_DISCLAIRER, null, null)
							+ "</p>");
					mailModel
							.setSubject("e Supportive Supervision: Registration request rejected");
					mailModel
							.setMessage("<p style='color:#2d3e50;font-size:14px;font-weight:normal;margin:10px 0'>Your <span class='il'>registration request</span> has been rejected by the admin."
									+ " Please get in touch with the admin for e Supportive Supervision application if you might require any further information.<br><br>Click below link for go to eSS home page.<br><a href=" + url + ">"
										+ url + "</a> </p>"
									+ "<p style='margin:30px 0 0 0'>");
					mailModel.setToUserName(essUser.getSalutation().getName() +" "+ essUser.getFirstName());
					mailService.sendMail(mailModel);
					errorClass.setValid("true");
					errorClass.setErrorMessage("Rejection  successful.");
				}
			} catch (Exception e) {
				e.printStackTrace();
				errorClass.setValid("false");
				errorClass.setErrorMessage("Failed");
			}

		}
		return errorClass;
	}

	@Override
	public List<EssUserModel> getAllApprovalUsers() {
		EssUserModel essUserModel = (EssUserModel) stateManager
				.getValue(Constants.Web.USER_PRINCIPAL);
		List<EssUser> essUsers = new ArrayList<>();

		String areaJson = "\"state\":[" + essUserModel.getStateId() + "]";

		if (essUserModel.getDesignationName().equals("Super Admin"))
			essUsers = essUserRepository
					.findByIsLiveTrueAndIsApprovedTrueOrderByApproveOrRejectDateDesc();
		else
			essUsers = essUserRepository
					.findByAreaJsonLikeAndIsLiveTrueAndIsApprovedIsTrue(areaJson);
		List<EssUserModel> essUserModels = setUserToUserModel(essUsers);
		return essUserModels;
	}

	@Override
	public List<EssUserModel> getAllRejectedUsers() {
		EssUserModel essUserModel = (EssUserModel) stateManager
				.getValue(Constants.Web.USER_PRINCIPAL);
		List<EssUser> essUsers = new ArrayList<>();

		String areaJson = "\"state\":[" + essUserModel.getStateId() + "]";

		if (essUserModel.getDesignationName().equals("Super Admin"))
			essUsers = essUserRepository
					.findByIsLiveFalseAndIsApprovedFalseOrderByApproveOrRejectDateDesc();
		else
			essUsers = essUserRepository
					.findByAreaJsonLikeAndIsLiveFalseAndIsApprovedIsFalse(areaJson);
		List<EssUserModel> essUserModels = setUserToUserModel(essUsers);
		return essUserModels;
	}

	@Override
	public String activeAndDeactive(Integer id) {
		if (id == 1) {
			return null;
		} else
			return null;

	}

	/**
	 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 24-Sep-2017 12:17:57
	 *         pm
	 */
	@Transactional
	@Override
	public ErrorClass getActivate(String activationCode,
			HttpServletRequest request) {
		ErrorClass errorClass = new ErrorClass();
		try {
			String url = request.getScheme() + "://" + request.getServerName() + ":"
					+ request.getServerPort()
					+ request.getRequestURI()
							.replaceFirst("activationLink?confirmValidation=" + activationCode, "")
							.replaceFirst("activationLink", "");
			
			
			UserRegistrationMetaData userRegistrationMetaData = userRegistrationMetaDataRepository
					.findByActivationCode(activationCode);
			if (userRegistrationMetaData != null) {
				if (userRegistrationMetaData.getEssUser().getIsActive() != null) {

					logger.info("Account already activated for activation code " + activationCode);
					errorClass.setValid("false");
					errorClass.setErrorMessage(
							"This account is already active. Please get in touch with the technical support group if you might require any additional information.");
					errorClass.setErrorType(errorMessageSource.getMessage("bootstrap.alert.warning", null, null));

				} else {
					Date toDayDate = new Date();
					Calendar cdate = Calendar.getInstance();
					cdate.setTime(toDayDate);
					// hard code value, need to bring from properties file
					cdate.add(Calendar.DATE, -14);
					toDayDate = cdate.getTime();

					if (toDayDate.before(userRegistrationMetaData.getCreatedDate())) {

						EssUser essUser = essUserRepository
								.findByUsername(userRegistrationMetaData.getEssUser().getUsername());
						essUser.setPassword(
								messageDigest.encodePassword(essUser.getUsername().toLowerCase(), activationCode));
						essUser.setIsActive(true);
						essUserRepository.save(essUser);

						logger.info("Account activated for user "
								+ ess.getFullNameOfTheUser(domainToModelConverter.toEssUserModel(essUser)));

						MailModel mailModel = new MailModel();
						mailModel.setToEmailIds(Arrays.asList(essUser.getPrimaryEmailId()));
						if (essUser.getSecondaryEmailId() != null)
							mailModel.setCcEmailIds(Arrays.asList(essUser.getSecondaryEmailId()));
						mailModel.setFromUserName("eSS Admin" + "<br><br><p style=" + "font-size:10px" + ">"
								+ messages.getMessage(Constants.Web.EMAIL_DISCLAIRER, null, null) + "</p>");
						mailModel.setSubject("e Supportive Supervision: Account Activation");
						mailModel.setMessage(
								"<p style='color:#2d3e50;font-size:14px;font-weight:normal;margin:10px 0'>Please <span class='il'>find below</span> credentials for accessing "
										+ "the e Supportive Supervision application.<br> Username: "
										+ essUser.getUsername() + "<br> Password: " + activationCode
										+ "<br><br>Click below link for go to eSS home page.<br><a href=" + url + ">"
										+ url + "</a>  </p>" + "<p style='margin:30px 0 0 0'>" + ""
										+ "<p style='color:#2d3e50;font-size:14px;font-weight:normal;margin:10px 0'>Please  <span class='il'>note:</span> We would strongly recommend you to create a "
										+ "new password. </p>" + "<p style='margin:30px 0 0 0'>");
						mailModel.setToUserName(essUser.getSalutation().getName() +" "+ essUser.getFirstName());
						mailService.sendMail(mailModel);

						errorClass.setValid("true");
						errorClass.setErrorMessage(
								"The account has been activated successfully. Please sign in using the credentials configured.");
						errorClass.setErrorType(errorMessageSource.getMessage("bootstrap.alert.success", null, null));

					} else {
						logger.info("Activation link expired!!! for activation code " + activationCode);
						errorClass.setValid("false");

						String reactiveURL = url + "reActivationLink?confirmValidation=" + activationCode;
						errorClass.setErrorMessage(
								"Your activation link has expired. Please request a new one by clicking the link mentioned  bellow.<div><a href="
										+ reactiveURL + ">Re-Active</a></div");
						errorClass.setErrorType(errorMessageSource.getMessage("bootstrap.alert.warning", null, null));
					}
				}
			} else {
				logger.info("Invalid activation link!!! for activation code " + activationCode);
				errorClass.setValid("false");
				errorClass.setErrorMessage("Invalid activation link!!!");
				errorClass.setErrorType(errorMessageSource.getMessage("bootstrap.alert.danger", null, null));
			}
		   } catch (Exception e) {
			logger.info("Exception in verifying email id for activation code " + activationCode);
			e.printStackTrace();
			errorClass.setValid("false");
			errorClass.setErrorMessage("Something went wrong!!!");
			errorClass.setErrorType(errorMessageSource.getMessage("bootstrap.alert.danger", null, null));
		}

		return errorClass;
	}

	/**
	 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 25-Sep-2017 15:17:57
	 *         pm
	 */
	@Transactional
	@Override
	public ErrorClass getReActive(String activationCode,
			HttpServletRequest request) {
		logger.info("Inside getReActive method for activationCode = "
				+ activationCode);
		ErrorClass errorClass = new ErrorClass();
		try {
			UserRegistrationMetaData uRMD = userRegistrationMetaDataRepository
					.findByActivationCode(activationCode);
			if (uRMD != null) {
				String userCode = new Hashids(uRMD.getEssUser()
						.getPrimaryEmailId()
						+ uRMD.getEssUser().getId()
						+ uRMD.getId()).encode(570, 748, 160);

				UserRegistrationMetaData uRegMD = new UserRegistrationMetaData();
				uRegMD.setActivationCode(userCode);
				uRegMD.setCreatedDate(new Timestamp(System.currentTimeMillis()));
				uRegMD.setEssUser(uRMD.getEssUser());
				uRegMD.setIpAddress(InetAddress.getLocalHost().getHostAddress());
				userRegistrationMetaDataRepository.save(uRegMD);

				logger.info("Account activated for user "
						+ ess.getFullNameOfTheUser(domainToModelConverter
								.toEssUserModel(uRMD.getEssUser())));

				String actualURL = request.getScheme()
						+ "://"
						+ request.getServerName()
						+ ":"
						+ request.getServerPort()
						+ request
								.getRequestURI()
								.replaceFirst(
										"reActivationLink?confirmValidation="
												+ activationCode, "")
								.replaceFirst("reActivationLink", "");

				String url = actualURL + "activationLink?confirmValidation="
						+ userCode;
				String msg = "<table width='600'  cellspacing='0' cellpadding='0' >"
						+

						"<td height='230' align='center' valign='middle' bgcolor='#ffffff' style='font-family:Arial,Helvetica,sans-serif'>"
						+ "<p style='font-size:18px'><span style='color:#2d3e50'>Valid for </span> <span style='color:#313B09;font-weight:bold'>"
						+ " 15 Days"
						+ ","
						+ "</span></p>"
						+ "<p style='color:#2d3e50;font-size:20px;font-weight:normal;margin:10px 0'>Please <span class='il'>verify your </span> account by clicking the link below."
						+ "</p>"
						+ "<p style='margin:30px 0 0 0'>"
						+ "<span style='width:263px;line-height:30px;background-color:#313B09;display:block'>"
						+ "<a href="
						+ url
						+ " style='text-align:center;text-decoration:none;color:#fff;font-weight:bold;font-size:16px;display:block' target='_blank'>"
						+ "<span class='il'>Verify</span> my email address </a> </span></p> </td></table>";

				MailModel mailModel = new MailModel();
				mailModel.setToEmailIds(Arrays.asList(uRMD.getEssUser()
						.getPrimaryEmailId()));
				if (uRMD.getEssUser().getSecondaryEmailId() != null)
					mailModel.setCcEmailIds(Arrays.asList(uRMD.getEssUser()
							.getSecondaryEmailId()));
				mailModel.setFromUserName("eSS Admin"
						+ "<br><br><p style="
						+ "font-size:10px"
						+ ">"
						+ messages.getMessage(Constants.Web.EMAIL_DISCLAIRER,
								null, null) + "</p>");
				mailModel
						.setSubject("e Supportive Supervision:Account Activation");
				mailModel.setMessage(msg);
				mailModel.setToUserName(uRMD.getEssUser().getSalutation().getName() +" "+ uRMD.getEssUser().getFirstName());
				mailService.sendMail(mailModel);

				errorClass.setValid("true");
				errorClass
						.setErrorMessage("Activation link has been sent to the registered email id.");
				errorClass.setErrorType(errorMessageSource.getMessage(
						"bootstrap.alert.success", null, null));
			} else {
				logger.info("Invalid activation link!!! for activation code (in reactivation link) "
						+ activationCode);
				errorClass.setValid("false");
				errorClass.setErrorMessage("Invalid activation link!!!");
				errorClass.setErrorType(errorMessageSource.getMessage(
						"bootstrap.alert.danger", null, null));
			}

		} catch (Exception e) {
			logger.info("Exception in verifying email id for activation code (in reactivate)"
					+ activationCode);
			e.printStackTrace();
			errorClass.setValid("false");
			errorClass.setErrorMessage("Something went wrong!!!");
			errorClass.setErrorType(errorMessageSource.getMessage(
					"bootstrap.alert.danger", null, null));
		}

		return errorClass;
	}

	// Designation Info Starts

	@Override
	public DesignationAreaOrganizationRoleMappingWebModel getDesignationInfo() {
		EssUserModel essUserModel = (EssUserModel) stateManager
				.getValue(Constants.Web.USER_PRINCIPAL);
		EssUser essUser = essUserRepository.findByUsername(essUserModel
				.getUsername());

		DesignationAreaOrganizationRoleMappingWebModel daormModel = new DesignationAreaOrganizationRoleMappingWebModel();
		List<RoleModelForDesignationCountry> role_countrys = new ArrayList<>();
		List<RoleModelForDesignationState> role_states = new ArrayList<>();
		List<OrganizationForDesignationModel> o_for_d_models = new ArrayList<>();
		List<DesignationForDesignationModel> d_for_d_models = new ArrayList<>();
		List<AreaWebModel> states = new ArrayList<>();
		List<DesignationMangementTableModel> designationMangementTableModels = new ArrayList<>();

		// Organization work
		List<Organization> organizations = organizationRepository.findAll();

		for (Organization organization : organizations) {
			OrganizationForDesignationModel o_for_d_model = new OrganizationForDesignationModel();
			o_for_d_model.setOrganization_id(organization.getId().intValue());
			o_for_d_model.setOrganization_name(organization
					.getOrganizationName());
			o_for_d_models.add(o_for_d_model);
		}

		// Designation work
		List<Designation> designations = designationRepository.findAll();
		for (Designation designation : designations) {
			DesignationForDesignationModel d_for_d_model = new DesignationForDesignationModel();
			d_for_d_model.setDesignation_id(designation.getId().intValue());
			d_for_d_model.setDesignation_name(designation.getName());
			d_for_d_models.add(d_for_d_model);
		}

		// Role work
		List<Role> roles = roleRepository.findAll();

		List<String> country_level_role_ids = new ArrayList<>();
		List<String> state_level_role_ids = new ArrayList<>();

		String country_level_role_ids_string = messages.getMessage(
				Constants.Web.COUNTY_LEVEL_ROLE_IDS, null, null);
		String state_level_role_ids_string = messages.getMessage(
				Constants.Web.STATE_LEVEL_ROLE_IDS, null, null);

		for (String role_id : country_level_role_ids_string.split(",")) {
			country_level_role_ids.add(role_id);
		}

		for (String role_id : state_level_role_ids_string.split(",")) {
			state_level_role_ids.add(role_id);
		}

		for (Role role : roles) {

			if (country_level_role_ids.contains(role.getRoleCode())) {
				RoleModelForDesignationCountry role_country = new RoleModelForDesignationCountry();
				role_country.setRole_id(role.getRoleId());
				role_country.setRole_name(role.getRoleName());
				role_countrys.add(role_country);

			}

			if (state_level_role_ids.contains(role.getRoleCode())) {
				RoleModelForDesignationState role_state = new RoleModelForDesignationState();
				role_state.setRole_id(role.getRoleId());
				role_state.setRole_name(role.getRoleName());
				role_states.add(role_state);
			}
		}

		// State work
		List<Area> statesFromDB = areaRepository.findByLevel(Integer
				.parseInt(messages.getMessage(Constants.Web.STATE_AREA_LEVEL,
						null, null)));

		for (Area stateFromDB : statesFromDB) {

			AreaWebModel state = new AreaWebModel();
			state.setAreaNId(stateFromDB.getAreaNId());
			state.setName(stateFromDB.getName());
			states.add(state);

		}

		daormModel.setRole_country(role_countrys);
		daormModel.setRole_state(role_states);
		// daormModel.setAreaModelForDesignation(areaModelForDesignations);
		daormModel.setO_for_d_model(o_for_d_models);
		daormModel.setD_for_d_model(d_for_d_models);
		daormModel.setStates(states);

		AreaWebModel areaWebModel = new AreaWebModel();
		areaWebModel.setAreaId(essUser
				.getDesignationAreaOrganizationRoleMapping().getArea()
				.getAreaId());
		areaWebModel.setAreaNId(essUser
				.getDesignationAreaOrganizationRoleMapping().getArea()
				.getAreaNId());
		areaWebModel.setName(essUser
				.getDesignationAreaOrganizationRoleMapping().getArea()
				.getName());
		daormModel.setArea(areaWebModel);

		if (essUser.getDesignationAreaOrganizationRoleMapping().getRole()
				.getRoleId() == 2) {
			daormModel.setStateAdmin(true);

			List<DesignationAreaOrganizationRoleMapping> statewiseData = designationAreaOrganizationRoleMappingRepository
					.findByAreaAreaNId(essUser
							.getDesignationAreaOrganizationRoleMapping()
							.getArea().getAreaNId());

			for (DesignationAreaOrganizationRoleMapping designationAreaOrganizationRoleMapping : statewiseData) {
				DesignationMangementTableModel designationMangementTableModel = new DesignationMangementTableModel();
				designationMangementTableModel
						.setUserLevel(designationAreaOrganizationRoleMapping
								.getRole().getRoleName());
				designationMangementTableModel
						.setStateName(designationAreaOrganizationRoleMapping
								.getArea().getName());
				designationMangementTableModel
						.setOrganizationName(designationAreaOrganizationRoleMapping
								.getOrganization().getOrganizationName());
				designationMangementTableModel
						.setDesignationName(designationAreaOrganizationRoleMapping
								.getDesignation().getName());

				if (designationAreaOrganizationRoleMapping
						.getIsResponsibleFacility() == true) {
					designationMangementTableModel
							.setResponsibleFacility(Constants.Web.YES_VALUE);
				} else {
					designationMangementTableModel
							.setResponsibleFacility(Constants.Web.NO_VALUE);
				}
				if (designationAreaOrganizationRoleMapping
						.getIsResponsibleCommunity() == true) {
					designationMangementTableModel
							.setResponsibleCommunity(Constants.Web.YES_VALUE);
				} else {
					designationMangementTableModel
							.setResponsibleCommunity(Constants.Web.NO_VALUE);
				}
				if (designationAreaOrganizationRoleMapping
						.getIsFacilityInCharge() == true) {
					designationMangementTableModel
							.setIsFacilityInCharge(Constants.Web.YES_VALUE);
				} else {
					designationMangementTableModel
							.setIsFacilityInCharge(Constants.Web.NO_VALUE);
				}
				designationMangementTableModels
						.add(designationMangementTableModel);

			}
		} else if (essUser.getDesignationAreaOrganizationRoleMapping()
				.getRole().getRoleId() == 1) {
			daormModel.setCountryAdmin(true);

			List<DesignationAreaOrganizationRoleMapping> countrywiseData = designationAreaOrganizationRoleMappingRepository
					.findAll();
			for (DesignationAreaOrganizationRoleMapping designationAreaOrganizationRoleMapping : countrywiseData) {
				DesignationMangementTableModel designationMangementTableModel = new DesignationMangementTableModel();
				designationMangementTableModel
						.setUserLevel(designationAreaOrganizationRoleMapping
								.getRole().getRoleName());
				designationMangementTableModel
						.setStateName(designationAreaOrganizationRoleMapping
								.getArea().getName());
				designationMangementTableModel
						.setOrganizationName(designationAreaOrganizationRoleMapping
								.getOrganization().getOrganizationName());
				designationMangementTableModel
						.setDesignationName(designationAreaOrganizationRoleMapping
								.getDesignation().getName());
				if (designationAreaOrganizationRoleMapping
						.getIsResponsibleFacility() == true) {
					designationMangementTableModel
							.setResponsibleFacility(Constants.Web.YES_VALUE);
				} else {
					designationMangementTableModel
							.setResponsibleFacility(Constants.Web.NO_VALUE);
				}
				if (designationAreaOrganizationRoleMapping
						.getIsResponsibleCommunity() == true) {
					designationMangementTableModel
							.setResponsibleCommunity(Constants.Web.YES_VALUE);
				} else {
					designationMangementTableModel
							.setResponsibleCommunity(Constants.Web.NO_VALUE);
				}
				if (designationAreaOrganizationRoleMapping
						.getIsFacilityInCharge() == true) {
					designationMangementTableModel
							.setIsFacilityInCharge(Constants.Web.YES_VALUE);
				} else {
					designationMangementTableModel
							.setIsFacilityInCharge(Constants.Web.NO_VALUE);
				}
				designationMangementTableModels
						.add(designationMangementTableModel);

			}
		}

		daormModel
				.setDesignationMangementTableModel(designationMangementTableModels);
		return daormModel;

	}

	@Transactional
	@Override
	public ErrorClass saveDesignation(DesignationMgmtModel designationMgmtModel) {
		ErrorClass errorClass = new ErrorClass();
		designationMgmtModel.setIsResponsibleCommunity(designationMgmtModel.getIsResponsibleCommunity() == null ? false : 
			designationMgmtModel.getIsResponsibleCommunity());
		designationMgmtModel.setIsResponsibleFacility(designationMgmtModel.getIsResponsibleFacility() == null ? false : 
			designationMgmtModel.getIsResponsibleFacility());
		designationMgmtModel.setIsFacilityInCharge(designationMgmtModel.getIsFacilityInCharge() == null ? false : 
			designationMgmtModel.getIsFacilityInCharge());
		
		try {

			Designation designationExists = new Designation();
			boolean testVal = false;
			String fromDbName = "";

			for (Designation dnameList : designationRepository.findAll()) {
				testVal = designationMgmtModel.getDesignationName()
						.equalsIgnoreCase(dnameList.getName());
				if (testVal == true) {
					designationExists = dnameList;
					fromDbName = dnameList.getName();
				}

			}

			/*
			 * if (designationRepository.findByName(designationMgmtModel
			 * .getDesignationName()) == null) {
			 */
			if (testVal == false
					&& designationRepository.findByName(fromDbName) == null) {

				Designation designation = new Designation();
				designation.setName(designationMgmtModel.getDesignationName());
				designation.setCreatedDate(new Timestamp(System
						.currentTimeMillis()));
				designation.setUpdatedDate(new Timestamp(System
						.currentTimeMillis()));
				designation = designationRepository.save(designation);

				DesignationAreaOrganizationRoleMapping designationAreaOrganizationRoleMapping = new DesignationAreaOrganizationRoleMapping();
				designationAreaOrganizationRoleMapping.setArea(new Area(
						designationMgmtModel.getAreaNId()));
				designationAreaOrganizationRoleMapping
						.setDesignation(new Designation(designation.getId()));
				designationAreaOrganizationRoleMapping
						.setOrganization(new Organization(designationMgmtModel
								.getOrganizationId()));
				designationAreaOrganizationRoleMapping.setRole(new Role(
						designationMgmtModel.getRoleId()));
				designationAreaOrganizationRoleMapping
						.setIsResponsibleCommunity(designationMgmtModel.getIsResponsibleCommunity());
				designationAreaOrganizationRoleMapping
						.setIsResponsibleFacility(designationMgmtModel.getIsResponsibleFacility());
				designationAreaOrganizationRoleMapping
						.setIsFacilityInCharge(designationMgmtModel.getIsFacilityInCharge());
				designationAreaOrganizationRoleMapping
						.setCreatedDate(new Timestamp(System
								.currentTimeMillis()));
				designationAreaOrganizationRoleMapping
						.setUpdatedDate(new Timestamp(System
								.currentTimeMillis()));

				designationAreaOrganizationRoleMappingRepository
						.save(designationAreaOrganizationRoleMapping);
				
				if(designationMgmtModel.getIsResponsibleCommunity() || 
						designationMgmtModel.getIsResponsibleFacility()){
					DesignationFeaturePermissionScheme desgScheme = new DesignationFeaturePermissionScheme();
					
					desgScheme.setDesignation(designation);
					desgScheme.setFeaturePermissionMapping(new FeaturePermissionMapping(
							Integer.parseInt(messages.getMessage(Constants.Web.OPEN_ITEMS_FEAT_PERM_ID, null, null))));
					desgScheme.setSchemeName("open items scheme");
					desgScheme.setUpdatedDate(new Timestamp(System.currentTimeMillis()));
					desgScheme.setUpdatedBy(ess.getFullNameOfTheUser(
							(EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL)));
					
					designationFeaturePermissionSchemeRepository.save(desgScheme);
				}
				
				errorClass.setValid(Constants.Web.TRUE_VALUE);
				errorClass.setErrorMessage(Constants.Web.DESIGNATION_SUCCESS);
			} else {

				Designation designationExist = designationRepository
						.findByName(fromDbName);

				if (designationAreaOrganizationRoleMappingRepository
						.findByRoleRoleIdAndAreaAreaNIdAndDesignationIdAndOrganizationId(
								designationMgmtModel.getRoleId(),
								designationMgmtModel.getAreaNId(),
								designationExist.getId(),
								designationMgmtModel.getOrganizationId()) == null) {
					DesignationAreaOrganizationRoleMapping designationAreaOrganizationRoleMapping = new DesignationAreaOrganizationRoleMapping();
					designationAreaOrganizationRoleMapping.setArea(new Area(
							designationMgmtModel.getAreaNId()));
					designationAreaOrganizationRoleMapping
							.setDesignation(new Designation(designationExist
									.getId()));
					designationAreaOrganizationRoleMapping
							.setOrganization(new Organization(
									designationMgmtModel.getOrganizationId()));
					designationAreaOrganizationRoleMapping.setRole(new Role(
							designationMgmtModel.getRoleId()));
					designationAreaOrganizationRoleMapping
							.setIsResponsibleCommunity(designationMgmtModel
									.getIsResponsibleCommunity() == null || designationMgmtModel
										.getIsResponsibleCommunity() == false ? false : true);
					designationAreaOrganizationRoleMapping
							.setIsResponsibleFacility(designationMgmtModel
									.getIsResponsibleFacility() == null || designationMgmtModel
										.getIsResponsibleFacility() == false ? false : true);
					designationAreaOrganizationRoleMapping
							.setIsFacilityInCharge(designationMgmtModel
									.getIsFacilityInCharge() == null || designationMgmtModel
										.getIsFacilityInCharge() == false ? false : true);
					designationAreaOrganizationRoleMapping
							.setCreatedDate(new Timestamp(System
									.currentTimeMillis()));
					designationAreaOrganizationRoleMapping
							.setUpdatedDate(new Timestamp(System
									.currentTimeMillis()));

					designationAreaOrganizationRoleMappingRepository
							.save(designationAreaOrganizationRoleMapping);
					
					if(designationMgmtModel.getIsResponsibleCommunity() || 
							designationMgmtModel.getIsResponsibleFacility()){
						DesignationFeaturePermissionScheme desgScheme = new DesignationFeaturePermissionScheme();
						
						desgScheme.setDesignation(designationExists);
						desgScheme.setFeaturePermissionMapping(new FeaturePermissionMapping(
								Integer.parseInt(messages.getMessage(Constants.Web.OPEN_ITEMS_FEAT_PERM_ID, null, null))));
						desgScheme.setSchemeName("open items scheme");
						desgScheme.setUpdatedDate(new Timestamp(System.currentTimeMillis()));
						desgScheme.setUpdatedBy(ess.getFullNameOfTheUser(
								(EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL)));
						
						designationFeaturePermissionSchemeRepository.save(desgScheme);
					}
					
					errorClass.setValid(Constants.Web.TRUE_VALUE);
					errorClass.setErrorMessage(Constants.Web.DESIGNATION_SUCCESS);
				}	else {
					errorClass.setValid(Constants.Web.TRUE_VALUE);
					errorClass.setErrorMessage(Constants.Web.DESIGNATION_EXITS);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			errorClass.setValid(Constants.Web.FALSE_VALUE);
			errorClass.setErrorMessage(Constants.Web.TRY_AGAIN);
		}

		return errorClass;
	}

	// Designation Info ends

}
