package org.sdrc.ess.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.InetAddress;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.TimeUnit;

import javax.imageio.ImageIO;
import javax.servlet.ServletContext;

import org.apache.commons.codec.binary.Base64;
import org.imgscalr.Scalr;
import org.imgscalr.Scalr.Method;
import org.imgscalr.Scalr.Mode;
import org.sdrc.ess.domain.Area;
import org.sdrc.ess.domain.Designation;
import org.sdrc.ess.domain.DesignationAreaOrganizationRoleMapping;
import org.sdrc.ess.domain.EssUser;
import org.sdrc.ess.domain.RegistrationOTP;
import org.sdrc.ess.domain.Role;
import org.sdrc.ess.domain.TypeDetail;
import org.sdrc.ess.domain.UserAreaMapping;
import org.sdrc.ess.domain.UserLoginMeta;
import org.sdrc.ess.model.mobile.AreaModel;
import org.sdrc.ess.model.mobile.MailModel;
import org.sdrc.ess.model.mobile.TypeDetailModel;
import org.sdrc.ess.model.mobile.UserAreaMappingModel;
import org.sdrc.ess.model.web.ChangePasswordModel;
import org.sdrc.ess.model.web.ErrorClass;
import org.sdrc.ess.model.web.EssUserModel;
import org.sdrc.ess.model.web.ValueObject;
import org.sdrc.ess.repository.AreaRepository;
import org.sdrc.ess.repository.DesignationAreaOrganizationRoleMappingRepository;
import org.sdrc.ess.repository.DesignationRepository;
import org.sdrc.ess.repository.EssUserRepository;
import org.sdrc.ess.repository.RegistrationOTPRepository;
import org.sdrc.ess.repository.RoleRepository;
import org.sdrc.ess.repository.TypeDetailRepository;
import org.sdrc.ess.repository.UserAreaMappingRepository;
import org.sdrc.ess.repository.UserLoginMetaRepository;
import org.sdrc.ess.util.Constants;
import org.sdrc.ess.util.DomainToModelConverter;
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
 * @author Sarita Panigrahi, created on: 21-Jul-2017, updated on: 20-Sep-2017
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 19-Aug-2017 7:45:17 am(Only done the old password thing little bit)
 */
@Service
public class UserServiceImpl implements UserService {
	
	private static final Logger logger = LoggerFactory
			.getLogger(UserServiceImpl.class);

	DateFormat df = new SimpleDateFormat("dd-MM-yyyy");

	@Autowired
	private TypeDetailRepository typeDetailRepository;

	@Autowired
	private AreaRepository areaRepository;

	@Autowired
	EssUserRepository essUserRepository;

	@Autowired
	private UserAreaMappingRepository userAreaMappingrepository;

	@Autowired
	private MailService mailService;

	@Autowired
	private MessageDigestPasswordEncoder messageDigest;

	@Autowired
	private ResourceBundleMessageSource messages;

	@Autowired
	private StateManager stateManager;

	@Autowired
	RegistrationOTPRepository registrationOTPRepository;

	@Autowired
	DesignationAreaOrganizationRoleMappingRepository designationAreaOrganizationRoleMappingRepository;

	@Autowired
	private ServletContext servletContext;
	
	/*@Autowired
	private ResourceBundleMessageSource errorMessageSource;*/
	
	@Autowired
	private DesignationRepository designationRepository;
	
	@Autowired
	RoleRepository roleRepository;
	
	@Autowired
	private UserLoginMetaRepository userLoginMetaRepository;

	@Override
	public Map<String, List<ValueObject>> getAllMasterTypeDetails() {

		List<ValueObject> valueObjects = new ArrayList<>();
		List<TypeDetail> salutationAndGenderTypeDetails = typeDetailRepository.findByTypeIdIdIn(
				Arrays.asList(Integer.parseInt(messages.getMessage(Constants.Web.SALUTATION_TYPE_ID, null, null)),
						Integer.parseInt(messages.getMessage(Constants.Web.GENDER_TYPE_ID, null, null)),
						Integer.parseInt(messages.getMessage(Constants.Web.FACILITYTYPE_TYPE_ID, null, null)),
						Integer.parseInt(messages.getMessage(Constants.Web.FACILITYTYPEFORAREA_TYPE_ID, null, null)),
						Integer.parseInt(messages.getMessage(Constants.Web.DEVELOPMENTPARTNERS_TYPE_ID, null, null)),
						Integer.parseInt(messages.getMessage(Constants.Web.CHECKLIST_TYPE_ID, null, null)),
						Integer.parseInt(messages.getMessage(Constants.Web.OPERATOR_TYPE_ID, null, null)))); // get
		// it
		// from
		// properties
		// file

		// design the map with typeid and type details
		Map<String, List<ValueObject>> keyValueObject = new HashMap<>();

		String key = "";

		for (TypeDetail typeDetail : salutationAndGenderTypeDetails) {

			valueObjects = new ArrayList<>();
			if (typeDetail.getTypeId().getId() == Integer.parseInt(messages.getMessage(Constants.Web.SALUTATION_TYPE_ID, null, null))) // Salutation id = 11
				key = "Salutation";
			else if (typeDetail.getTypeId().getId() == Integer.parseInt(messages.getMessage(Constants.Web.GENDER_TYPE_ID, null, null)))// Gender id = 12
				key = "Gender";
			else if (typeDetail.getTypeId().getId() == Integer.parseInt(messages.getMessage(Constants.Web.FACILITYTYPE_TYPE_ID, null, null)))// Facility Type
				key = "FacilityType";
			else if (typeDetail.getTypeId().getId() == Integer.parseInt(messages.getMessage(Constants.Web.FACILITYTYPEFORAREA_TYPE_ID, null, null)))// Facility Type for Area
				key = "FacilityTypeForArea";
			else if (typeDetail.getTypeId().getId() == Integer.parseInt(messages.getMessage(Constants.Web.CHECKLIST_TYPE_ID, null, null)))// Facility Type for Area
				key = "Checklists";
			else if (typeDetail.getTypeId().getId() == Integer.parseInt(messages.getMessage(Constants.Web.OPERATOR_TYPE_ID, null, null)))// operator type
				key = "Operators";
			else // Development Partners id =15
				key = "Development Partners";

			if (keyValueObject.containsKey(key)) {
				keyValueObject.get(key).add(new ValueObject(typeDetail.getId(), typeDetail.getName(), typeDetail.getOrderLevel()));
			} else {
				ValueObject valueObject = new ValueObject(typeDetail.getId(), typeDetail.getName(), typeDetail.getOrderLevel());
				valueObjects.add(valueObject);
				keyValueObject.put(key, valueObjects);
			}

		}
		ValueObject serverTimeValueObject = null;
		Calendar now = Calendar.getInstance();
	    now.add(Calendar.YEAR, -18);
		serverTimeValueObject = new ValueObject(1, df.format(now.getTime()));
		keyValueObject.put("ServerEndDate", Arrays.asList(serverTimeValueObject));
		 now = Calendar.getInstance();
		 now.add(Calendar.YEAR, -100);
		 serverTimeValueObject = new ValueObject(1, df.format(now.getTime()));
			keyValueObject.put("ServerStartDate", Arrays.asList(serverTimeValueObject));
		 
		return keyValueObject;

	}

	@Override
	public List<ValueObject> getDesignationsByRoleArea(Integer roleId, Integer areaId, Integer orgId) {

		List<DesignationAreaOrganizationRoleMapping> designationAreas = areaId != null
				? designationAreaOrganizationRoleMappingRepository
						.findByRoleRoleIdAndOrganizationIdAndAreaAreaNId(roleId, orgId, areaId)
				: designationAreaOrganizationRoleMappingRepository.findByRoleRoleIdAndOrganizationId(roleId, orgId);

		Map<String, ValueObject> designationMap = new HashMap<>();
		ValueObject valueObject = null;
		for (DesignationAreaOrganizationRoleMapping designationAreaMapping : designationAreas) {
			if(!designationAreaMapping.getDesignation().getName().equalsIgnoreCase("Super Admin") && !designationAreaMapping.getDesignation().getName().equalsIgnoreCase("State Admin") ){
			valueObject = new ValueObject();
			valueObject.setKey(designationAreaMapping.getId());
			valueObject.setValue(designationAreaMapping.getDesignation().getName());
			valueObject.setIsFacilityInCharge(designationAreaMapping.getIsFacilityInCharge());
			valueObject.setDesignationId(designationAreaMapping.getDesignation().getId());
			designationMap.put(designationAreaMapping.getDesignation().getName(), valueObject);
			}
		}
		List<ValueObject> finallist = new ArrayList<>();
		for (Map.Entry<String, ValueObject> entry : designationMap.entrySet()) {
			finallist.add(entry.getValue());
		}

		return finallist;
	}
	
	@Override
	@Transactional(readOnly = true)
	public List<ValueObject> getDesignationsByAreaForProfileUpdate(Integer roleId, Integer areaId, Integer orgId) {

		List<DesignationAreaOrganizationRoleMapping> designationAreas = areaId != null
				? designationAreaOrganizationRoleMappingRepository
						.findByRoleRoleIdAndOrganizationIdAndAreaAreaNId(roleId, orgId, areaId)
				: designationAreaOrganizationRoleMappingRepository.findByRoleRoleIdAndOrganizationId(roleId, orgId);

		Map<String, ValueObject> designationMap = new HashMap<>();
		ValueObject valueObject = null;
		for (DesignationAreaOrganizationRoleMapping designationAreaMapping : designationAreas) {
			valueObject = new ValueObject();
			valueObject.setKey(designationAreaMapping.getId());
			valueObject.setValue(designationAreaMapping.getDesignation().getName());
			valueObject.setIsFacilityInCharge(designationAreaMapping.getIsFacilityInCharge());
			valueObject.setDesignationId(designationAreaMapping.getDesignation().getId());
			designationMap.put(designationAreaMapping.getDesignation().getName(), valueObject);
		}
		List<ValueObject> finallist = new ArrayList<>();
		for (Map.Entry<String, ValueObject> entry : designationMap.entrySet()) {
			finallist.add(entry.getValue());
		}

		return finallist;
	}

	@Override
	public List<AreaModel> getAllArea() {
		List<AreaModel> areaModels = new ArrayList<>();

		for (Area area : areaRepository.findAll()) {
			AreaModel areaModel = new AreaModel();
			areaModel.setAreaId(area.getAreaId());
			areaModel.setAreaNId(area.getAreaNId());
			areaModel.setName(area.getName());
			// areaModel.setFacilityType(area.getFacilityType());
			areaModel.setParentAreaId(area.getParentAreaId());
			areaModel.setLevel(area.getLevel());

			if (null != area.getFacilityType() && area.getFacilityType().getName() != null) {
				TypeDetailModel typeDetailModel = new TypeDetailModel();
				typeDetailModel.setId(area.getFacilityType().getId());
				typeDetailModel.setName(area.getFacilityType().getName());
				typeDetailModel.setTypeId(area.getFacilityType().getTypeId());

				areaModel.setFacilityType(typeDetailModel);

			} else {
				areaModel.setFacilityType(null);
			}

			areaModels.add(areaModel);
		}

		return areaModels;
	}

	/**
	 * @author Debiprasad Parida(debiprasad@sdrc.co.in) saveUser
	 * @throws ParseException
	 */
	@Transactional
	@Override
	public String saveUsers(EssUserModel essUserModel) throws Exception {
		EssUser checkUser = essUserModel.getInChargeFacilityId()!= null?
				essUserRepository.findByInChargeFacilityIdAreaNIdAndIsApprovedIsTrueAndIsLiveIsTrue(essUserModel.getInChargeFacilityId()):
					null;
		if(checkUser==null){
		try {
			
			EssUser essUser = new EssUser();

			essUser.setSalutation(new TypeDetail(essUserModel.getSalutationId()));
			essUser.setFirstName(Character.toString(essUserModel.getFirstName().charAt(0)).toUpperCase()
					+ essUserModel.getFirstName().substring(1));
			essUser.setMiddleName(essUserModel.getMiddleName() != null && !essUserModel.getMiddleName().isEmpty()
					? Character.toString(essUserModel.getMiddleName().charAt(0)).toUpperCase()
							+ essUserModel.getMiddleName().substring(1)
					: null);
			essUser.setLastName(Character.toString(essUserModel.getLastName().charAt(0)).toUpperCase()
					+ essUserModel.getLastName().substring(1));
			essUser.setGender(new TypeDetail(essUserModel.getGender()));
			essUser.setBirthday(
					new java.sql.Date(new SimpleDateFormat("dd-MM-yyyy").parse(essUserModel.getBirthday()).getTime()));
			essUser.setPhoneNo(essUserModel.getPhoneNo());
			essUser.setPrimaryEmailId(essUserModel.getPrimaryEmailId().trim().toLowerCase());
			essUser.setSecondaryEmailId(essUserModel.getSecondaryEmailId() == null ? null
					: essUserModel.getSecondaryEmailId().trim().toLowerCase());
			essUser.setPhotoFilePath(getFilePath(essUserModel.getPhotoFilePath(), essUserModel.getUsername(), 1));
			essUser.setDesignationAreaOrganizationRoleMapping(
					new DesignationAreaOrganizationRoleMapping(essUserModel.getDesignationId()));
			essUser.setUsername(essUserModel.getUsername().trim().toLowerCase());
			essUser.setAdharCardPhotoFilePath(
					getFilePath(essUserModel.getAdharCardPhotoFilePath(), essUserModel.getUsername(), 2));
			essUser.setAdharCardPhotoNumber(essUserModel.getAdharCardPhotoNumber());
			essUser.setPanCardPhotoFilePath(
					getFilePath(essUserModel.getPanCardPhotoFilePath(), essUserModel.getUsername(), 3));
			essUser.setPanCardPhotoNumber(essUserModel.getPanCardPhotoNumber().trim().toUpperCase());
			essUser.setCreatedDate(new Timestamp(System.currentTimeMillis()));
			essUser.setDevelomentpartner(essUserModel.getDevelomentpartner() == null ? null
					: new TypeDetail(essUserModel.getDevelomentpartner()));
			essUser.setIsLive(false);
			essUser.setIsApproved(null);
			essUser.setIsActive(null);
			essUser.setApproveOrRejectDate(null);
			essUser.setInChargeFacilityId(essUserModel.getInChargeFacilityId()==null ? null : new Area(essUserModel.getInChargeFacilityId()));
			EssUser userForUserAreaMapping = essUserRepository.save(essUser);
			
			/* inserting areaJson into user_area mapping table */
			ObjectMapper mapper = new ObjectMapper();
			UserAreaMappingModel uaMappingModel = new UserAreaMappingModel();
			List<Integer> stateIdList = new ArrayList<>();
			List<Integer> districtIdList = new ArrayList<>();
			List<Integer> blockIdList = new ArrayList<>();
			List<Integer> facilityIdList = new ArrayList<>();
			List<Area> areaList = null;

			uaMappingModel.setCountry(1);

			if (essUserModel.getStateId() != null) {
				stateIdList.add(essUserModel.getStateId());
			}

			if (essUserModel.getDistrictId() == null && essUserModel.getBlockId() == null
					&& essUserModel.getFacilityId() == null) {
				areaList = areaRepository.findByAreaParentId(essUserModel.getStateId());
				districtIdList.addAll(getListOfData(areaList));
				areaList = areaRepository.findByAreaParentIdAreaParentId(essUserModel.getStateId());
				blockIdList.addAll(getListOfData(areaList));
				areaList = areaRepository.findByAreaParentIdAreaParentIdAreaParentId(essUserModel.getStateId());
				facilityIdList.addAll(getListOfData(areaList));
			} else if (essUserModel.getDistrictId() != null && essUserModel.getBlockId() == null
					&& essUserModel.getFacilityId() == null) {
				districtIdList.add(essUserModel.getDistrictId());
				areaList = areaRepository.findByAreaParentId(essUserModel.getDistrictId());
				blockIdList.addAll(getListOfData(areaList));
				areaList = areaRepository.findByAreaParentIdAreaParentId(essUserModel.getDistrictId());
				facilityIdList.addAll(getListOfData(areaList));
			} else if (essUserModel.getDistrictId() != null && essUserModel.getBlockId() != null
					&& essUserModel.getFacilityId() == null) {
				districtIdList.add(essUserModel.getDistrictId());
				blockIdList.add(essUserModel.getBlockId());
				areaList = areaRepository.findByAreaParentId(essUserModel.getBlockId());
				facilityIdList.addAll(getListOfData(areaList));
			} else {
				districtIdList.add(essUserModel.getDistrictId());
				if (essUserModel.getBlockId() != null)
					blockIdList.add(essUserModel.getBlockId());
				facilityIdList.add(essUserModel.getFacilityId());
			}

			uaMappingModel.setState(stateIdList);
			uaMappingModel.setDistrict(districtIdList);
			uaMappingModel.setBlock(blockIdList);
			uaMappingModel.setFacility(facilityIdList);

			String jsonInString = mapper.writeValueAsString(uaMappingModel);
			UserAreaMapping userAreaMapping = new UserAreaMapping();

			userAreaMapping.setAreaJson(jsonInString);
			userAreaMapping.setEssUser(userForUserAreaMapping);
			UserAreaMapping userAreaMappingId = userAreaMappingrepository.save(userAreaMapping);
			userForUserAreaMapping.setUserAreaMappings(userAreaMappingId);
			essUserRepository.save(userForUserAreaMapping);
			return "success";
			
			} catch (Exception e) {
			 e.printStackTrace();
			return "Fail";
		}
		 }
		return "inchargeExists";

	}

	private List<Integer> getListOfData(List<Area> areaList) {
		List<Integer> areaIdList = new ArrayList<>();
		for (Area area : areaList) {
			areaIdList.add(area.getAreaNId());

		}
		return areaIdList;
	}
	
	
	@Override
	// Check whether userId Exists (if exists then return true else false
	public Boolean userAvailibility(String userName) {
		EssUser essUser = essUserRepository.findByUsername(userName);
		if (essUser != null) {
			return essUser.getUsername().equalsIgnoreCase(userName);
		} else {
			return false;
		}
	}

	@Override
	@Transactional
	public EssUserModel findByUsernameAndPassword(String username, String password) {

		EssUser essUser = essUserRepository.findByUsernameAndPasswordAndIsActiveTrue(username, password);

		if (null != essUser) {
			Map<Integer, String> areaNidNameMap = new HashMap<>();
			List<Area> areaList = areaRepository.findAll();
			areaList.forEach(area -> areaNidNameMap.put(area.getAreaNId(), area.getName()));

			ObjectMapper mapper = new ObjectMapper();

			UserAreaMappingModel uAMap = null;

			try {
				uAMap = mapper.readValue(essUser.getUserAreaMappings().getAreaJson(), UserAreaMappingModel.class);
			} catch (JsonParseException e) {
				e.printStackTrace();
			} catch (JsonMappingException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}

			String roleLevel = essUser.getDesignationAreaOrganizationRoleMapping().getRole().getRoleName();
			String loc = "";
			if (uAMap.getFacility() != null && uAMap.getFacility().size() == 1 && roleLevel.equals("Facility level")) // facility
																														// level
				loc = areaNidNameMap.get(uAMap.getFacility().get(0)) + ", "
						+ (uAMap.getBlock().isEmpty() ? " " :areaNidNameMap.get(uAMap.getBlock().get(0))+", " )
						+ areaNidNameMap.get(uAMap.getDistrict().get(0)) + ", "
						+ areaNidNameMap.get(uAMap.getState().get(0)) + ", " + areaNidNameMap.get(uAMap.getCountry());
			else if (uAMap.getBlock() != null && uAMap.getBlock().size() == 1 && roleLevel.equals("Block level")) // block
																													// level
				loc = areaNidNameMap.get(uAMap.getBlock().get(0)) + ", "
						+ areaNidNameMap.get(uAMap.getDistrict().get(0)) + ", "
						+ areaNidNameMap.get(uAMap.getState().get(0)) + ", " + areaNidNameMap.get(uAMap.getCountry());
			else if (uAMap.getDistrict() != null && uAMap.getDistrict().size() == 1
					&& roleLevel.equals("District level")) // if district level
				loc = areaNidNameMap.get(uAMap.getDistrict().get(0)) + ", "
						+ areaNidNameMap.get(uAMap.getState().get(0)) + ", " + areaNidNameMap.get(uAMap.getCountry());
			else if (uAMap.getState() != null && uAMap.getState().size() == 1 && roleLevel.equals("State level")) // if
																													// state
																													// level
				loc = areaNidNameMap.get(uAMap.getState().get(0)) + ", " + areaNidNameMap.get(uAMap.getCountry());
			else
				loc = areaNidNameMap.get(uAMap.getCountry());

			EssUserModel essUserModel = new EssUserModel();
			essUserModel.setIsActive(essUser.getIsActive());
			essUserModel.setIsApproved(essUser.getIsActive());
			essUserModel.setUserId(essUser.getId());
			essUserModel.setUsername(essUser.getUsername());
			essUserModel.setBirthday(new SimpleDateFormat("dd-MM-YYYY").format(essUser.getBirthday()));
			essUserModel
					.setDesignationName(essUser.getDesignationAreaOrganizationRoleMapping().getDesignation().getName());
			essUserModel.setFirstName(essUser.getFirstName());
			essUserModel.setMiddleName(essUser.getMiddleName());
			essUserModel.setLastName(essUser.getLastName());
			essUserModel.setAdharCardPhotoNumber(essUser.getAdharCardPhotoNumber());
			essUserModel.setPanCardPhotoNumber(essUser.getPanCardPhotoNumber());
			essUserModel.setPhoneNo(essUser.getPhoneNo());
			essUserModel.setPrimaryEmailId(essUser.getPrimaryEmailId());
			essUserModel.setSecondaryEmailId(essUser.getSecondaryEmailId());
			essUserModel.setFullName(essUser.getMiddleName() == null
					? essUser.getSalutation().getName() + " " + essUser.getFirstName() + " " + essUser.getLastName()
					: essUser.getSalutation().getName() + " " + essUser.getFirstName() + " " + essUser.getMiddleName()
							+ " " + essUser.getLastName());
			essUserModel.setLocation(loc);
			essUserModel.setPassword(essUser.getPassword());
			if (essUser.getPhotoFilePath() != null) {
				essUserModel.setPhotoFilePath(encodingPhoto(essUser.getPhotoFilePath()));
			} else {
				essUserModel.setPhotoFilePath(encodingPhoto(servletContext.getRealPath("/resources/img/photo.jpg")));
			}
			if (uAMap.getState().size() == 1)
				essUserModel.setStateId(uAMap.getState().get(0));
			essUserModel.setDesignationId(essUser.getDesignationAreaOrganizationRoleMapping().getDesignation().getId());
			essUserModel.setUserDesignationFeaturePermissionMappingModels(
					DomainToModelConverter.toUserRoleFeaturePermissionMappingModels(
							essUser.getUserAreaMappings().getUserDesignationFeaturePermissionMappings()));
			essUserModel.setSalutation(essUser.getSalutation().getName());
			essUserModel.setUserLevel(essUser.getDesignationAreaOrganizationRoleMapping().getRole().getRoleId());
			if(uAMap.getBlock() != null && uAMap.getBlock().size() == 1 && roleLevel.equals("Block level")){
				essUserModel.setBlockId(uAMap.getBlock().get(0));
			}
			if(uAMap.getDistrict() != null && uAMap.getDistrict().size() == 1 && roleLevel.equals("District level")){
				essUserModel.setDistrictId(uAMap.getDistrict().get(0));
			}
			
			return essUserModel;
		}

		return null;

	}

	@Override
	//Login User can change there password 
	public ErrorClass resetPassword(ChangePasswordModel obj) {
		ErrorClass errorClass = new ErrorClass();
		EssUserModel essUserModel = (EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL);
		EssUser essUser = essUserRepository.findByUsernameAndPassword(essUserModel.getUsername(),
				messageDigest.encodePassword(essUserModel.getUsername(), obj.getCurrentPassword()));

		if (essUser != null) {
			try {
				essUser.setPassword(messageDigest.encodePassword(essUserModel.getUsername(), obj.getNewPassword()));
				essUserRepository.save(essUser);
				MailModel mailModel = new MailModel();
				mailModel.setToEmailIds(Arrays.asList(essUser.getPrimaryEmailId()));
				if (essUser.getSecondaryEmailId() != null)
					mailModel.setCcEmailIds(Arrays.asList(essUser.getSecondaryEmailId()));
				mailModel.setFromUserName("eSS Admin" + "<br><br><p style=" + "font-size:10px" + ">"
						+ messages.getMessage(Constants.Web.EMAIL_DISCLAIRER, null, null) + "</p>");
				mailModel.setSubject("e Supportive Supervision: Password changed");
				mailModel.setMessage(
						"<p style='color:#2d3e50;font-size:14px;font-weight:normal;margin:10px 0'>Your  <span class='il'>password</span>  has been changed."
								+ "</p>" + "<p style='margin:30px 0 0 0'>");
				mailModel.setToUserName(essUser.getFirstName());
				mailService.sendMail(mailModel);
				errorClass.setValid("true");
				errorClass.setErrorMessage(" Password has been updated successfully. Please login again.");
			} catch (Exception e) {
				e.printStackTrace();
				errorClass.setValid("false");
				errorClass.setErrorMessage("Reset failed");
			}
		} else {
			errorClass.setValid("false");
			errorClass.setErrorMessage("The current password is incorrect.");
		}
		return errorClass;
	}

	@Override
	// Check whether userId Exists, if exits then give available userids
	public ErrorClass userAvailabilitySuggest(String firstName, String middleName, String lastName, String userName) {

		ErrorClass errorClass = new ErrorClass();
		String firstLastName = firstName + lastName;
		String lastFirstName = lastName + firstName;

		List<String> userNames = essUserRepository.findByUsernameLike(userName, firstLastName, lastFirstName);

		// if the user name is already present then suggest availability
		if (userNames.contains(userName)) {
			Random rand = new Random();
			// first Last Name + random number

			while (userNames.contains(firstLastName)) {
				firstLastName = firstName + lastName;
				firstLastName = firstLastName + rand.nextInt(999);
			}

			// last first name + random number
			while (userNames.contains(lastFirstName)) {
				lastFirstName = lastName + firstName;
				lastFirstName = lastFirstName + rand.nextInt(999);
			}
			if(firstName.equals("null") && lastName.equals("null"))
				errorClass.setErrorData(Arrays.asList(userName+rand.nextInt(999), userName+rand.nextInt(999)));
			else if(!firstName.equals("null") && lastName.equals("null"))
				errorClass.setErrorData(Arrays.asList(firstName+userName+rand.nextInt(99), userName+firstName));
			else if(firstName.equals("null") && !lastName.equals("null"))
				errorClass.setErrorData(Arrays.asList(lastName+userName, userName+lastName+rand.nextInt(99)));
			else
			errorClass.setErrorData(Arrays.asList(firstLastName, lastFirstName));
			errorClass.setErrorMessage("This User ID already exists. Try another.");
			errorClass.setValid("false");

		} else
			errorClass.setValid("true");

		return errorClass;
	}

	@Override
	public Boolean primaryEmailIdAvailibility(String primaryEmailId) {
		List<EssUser> essUsers = essUserRepository.findByPrimaryEmailIdAndIsApprovedTrueOrIsApprovedIsNull(primaryEmailId);
		if (!essUsers.isEmpty()) {
			if(essUsers.size() > 1){
				logger.error("Duplicate primary email id : " + primaryEmailId);
			}			
			return true;
		} else {
			return false;
		}
	}

	@Override
	public Boolean mobileNumberAvailibility(String mobileNumber) {
		EssUser essUser = essUserRepository.findByPhoneNo(mobileNumber);
		if (essUser != null) {
			return essUser.getPhoneNo().equals(mobileNumber);
		} else {
			return false;
		}

	}

	@Transactional
	@Override
	public ErrorClass getEmailVarificationCode(String email) {
		ErrorClass errorClass = new ErrorClass();
		try {
			Random random = new Random();
			int otp = random
					.nextInt(Integer.parseInt(messages.getMessage(Constants.Web.GENERATE_OTP_MAX_DIGIT, null, null))
							- Integer.parseInt(messages.getMessage(Constants.Web.GENERATE_OTP_MIN_DIGIT, null, null))
							+ 1)
					+ Integer.parseInt(messages.getMessage(Constants.Web.GENERATE_OTP_MIN_DIGIT, null, null));

			RegistrationOTP reOtp = registrationOTPRepository.findByEmailIdAndIsActiveTrue(email);
//			System.out.println(otp);
			if (reOtp == null) {
				createNewOTPAndSendMail(email, String.valueOf(otp));

			} else {
				reOtp.setIsActive(false);
				registrationOTPRepository.save(reOtp);
				createNewOTPAndSendMail(email, String.valueOf(otp));

			}

			errorClass.setValid("true");
			errorClass.setErrorMessage(" Generated OTP sent to your email");
		} catch (Exception e) {
			e.printStackTrace();
			errorClass.setValid("false");
			errorClass.setErrorMessage("  OTP generation failed");
		}

		return errorClass;
	}

	private void createNewOTPAndSendMail(String email, String varificationCode) throws Exception {
		RegistrationOTP registrationOTP = new RegistrationOTP();
		registrationOTP.setEmailId(email);
		registrationOTP.setIpAddress(InetAddress.getLocalHost().getHostAddress());
		// registrationOTP.setIpAddress(request.getRemoteAddr());
		registrationOTP.setIsActive(true);
		registrationOTP.setCreatedDateAndTime(new Timestamp(System.currentTimeMillis()));
		registrationOTP.setVarificationCode(Integer.parseInt(varificationCode));
		registrationOTPRepository.save(registrationOTP);

		MailModel mailModel = new MailModel();
		mailModel.setToEmailIds(Arrays.asList(email));
		mailModel.setFromUserName("eSS Admin" + "<br><br><p style=" + "font-size:10px" + ">"
				+ messages.getMessage(Constants.Web.EMAIL_DISCLAIRER, null, null) + "</p>");
		mailModel.setSubject("e Supportive Supervision: One Time Password");
		mailModel
				.setMessage("Your OTP for e Supportive Supervision application: " + Integer.parseInt(varificationCode));
		mailModel.setToUserName("User");
		mailService.sendMail(mailModel);

	}

	@Override
	public ErrorClass OTPAndEmailAvailibility(String email, Integer varificationCode) {
		ErrorClass errorClass = new ErrorClass();
		RegistrationOTP registrationOTP = registrationOTPRepository
				.findByEmailIdAndVarificationCodeAndIsActiveTrue(email, varificationCode);
		if (registrationOTP != null) {
			long minutes = TimeUnit.MILLISECONDS
					.toMinutes(System.currentTimeMillis() - registrationOTP.getCreatedDateAndTime().getTime());
			if (minutes <= 10) {
				registrationOTP.setIsActive(false);
				registrationOTPRepository.save(registrationOTP);
				errorClass.setValid("true");
				errorClass.setErrorMessage("OTP verified");

			} else {
				registrationOTP.setIsActive(false);
				registrationOTPRepository.save(registrationOTP);
				errorClass.setValid("false");
				errorClass.setErrorMessage("OTP expired! Try another.");
			}
		} else {
			errorClass.setValid("false");
			errorClass.setErrorMessage("Invalid OTP! Please enter valid OTP");
		}

		return errorClass;
	}

	@Override
	public EssUserModel getUserDetails() {
		EssUserModel logedUser = (EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL);
		EssUser essUser = essUserRepository.findByUsername(logedUser.getUsername());

		EssUserModel essUserModel = new EssUserModel();
		essUserModel.setUserId(essUser.getId());
		essUserModel.setSalutationId(essUser.getSalutation().getId());
		essUserModel.setFirstName(essUser.getFirstName());
		essUserModel.setMiddleName(essUser.getMiddleName());
		essUserModel.setLastName(essUser.getLastName());
		essUserModel.setGender(essUser.getGender().getId());
		essUserModel.setBirthday(df.format(essUser.getBirthday()));
		essUserModel.setPhoneNo(essUser.getPhoneNo());
		essUserModel.setPrimaryEmailId(essUser.getPrimaryEmailId());
		essUserModel.setSecondaryEmailId(essUser.getSecondaryEmailId());
		essUserModel.setUserLevel(essUser.getDesignationAreaOrganizationRoleMapping().getRole().getRoleId());
		//essUserModel.setStateId(essUser.getDesignationAreaOrganizationRoleMapping().getArea().getAreaNId());
		
		if(essUser.getInChargeFacilityId() != null){
			essUserModel.setInChargeFacilityId(essUser.getInChargeFacilityId().getAreaNId());
			essUserModel.setInChargeFacilityName(essUser.getInChargeFacilityId().getName());
			essUserModel.setInChargeFacilityTypeName(essUser.getInChargeFacilityId().getFacilityType().getName());
			
//			if(essUser.getInChargeFacilityId().getFacilityType().getId() != 105 && 
//					essUser.getDesignationAreaOrganizationRoleMapping().getRole().getRoleCode() == 
//					messages.getMessage(Constants.Mobile.ROLE_CODE_DISTRICT, null, null)){
				essUserModel.setInChargeBlockId(essUser.getInChargeFacilityId().getParentAreaId());
//			}
		}
		
		/*
		 * =====================================================================
		 */
		Map<Integer, String> areaNidNameMap = new HashMap<>();
		List<Area> areaList = areaRepository.findAll();
		areaList.forEach(area -> areaNidNameMap.put(area.getAreaNId(), area.getName()));
		ObjectMapper mapper = new ObjectMapper();
		UserAreaMappingModel uAMap = null;
		try {
			uAMap = mapper.readValue(essUser.getUserAreaMappings().getAreaJson(), UserAreaMappingModel.class);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		String roleLevel = essUser.getDesignationAreaOrganizationRoleMapping().getRole().getRoleName();

		if (uAMap.getFacility() != null && uAMap.getFacility().size() == 1 && roleLevel.equals("Facility level")) {
			essUserModel.setFacilityId(uAMap.getFacility().get(0));
			essUserModel.setBlockId(uAMap.getBlock().isEmpty() ? null : uAMap.getBlock().get(0));
			essUserModel.setDistrictId(uAMap.getDistrict().get(0));
			essUserModel.setStateId(uAMap.getState().get(0));
		}

		else if (uAMap.getBlock() != null && uAMap.getBlock().size() == 1 && roleLevel.equals("Block level")) {
			essUserModel.setBlockId(uAMap.getBlock().get(0));
			essUserModel.setDistrictId(uAMap.getDistrict().get(0));
			essUserModel.setStateId(uAMap.getState().get(0));
		} else if (uAMap.getDistrict() != null && uAMap.getDistrict().size() == 1
				&& roleLevel.equals("District level")) {
			essUserModel.setDistrictId(uAMap.getDistrict().get(0));
			essUserModel.setStateId(uAMap.getState().get(0));
		} else if (uAMap.getState() != null && uAMap.getState().size() == 1 && roleLevel.equals("State level")) {
			essUserModel.setStateId(uAMap.getState().get(0));
		} 

		/* ======================================================== */

		DesignationAreaOrganizationRoleMapping daorMapping = designationAreaOrganizationRoleMappingRepository
				.findById(essUser.getDesignationAreaOrganizationRoleMapping().getId());

		essUserModel.setOrganizationId(daorMapping.getOrganization().getId());
		essUserModel.setDesignationId(daorMapping.getDesignation().getId());
		essUserModel.setDevelomentpartner(
				essUser.getDevelomentpartner() == null ? null : essUser.getDevelomentpartner().getId());

		essUserModel.setUsername(essUser.getUsername());
		essUserModel.setAdharCardPhotoNumber(
				essUser.getAdharCardPhotoNumber() != null ? essUser.getAdharCardPhotoNumber() : null);
		essUserModel.setPanCardPhotoNumber(
				essUser.getPanCardPhotoNumber() != null ? essUser.getPanCardPhotoNumber() : null);

		/**
		 * Code added by Sourav Keshari nath
		 */
		if (essUser.getAdharCardPhotoFilePath() != null) {
			essUserModel.setAdharCardPhotoFilePath(encodingPhoto(essUser.getAdharCardPhotoFilePath()));
		} 
		if (essUser.getPanCardPhotoFilePath() != null) {
			essUserModel.setPanCardPhotoFilePath(encodingPhoto(essUser.getPanCardPhotoFilePath()));
		} 
		/**
		 * End
		 */
		if (essUser.getPhotoFilePath() != null) {
			essUserModel.setPhotoFilePath(encodingPhoto(essUser.getPhotoFilePath()));
		} else {
			essUserModel.setPhotoFilePath(encodingPhoto(servletContext.getRealPath("/resources/img/photo.jpg")));
		}

		return essUserModel;
	}

	private String encodingPhoto(String photoPath) {

		FileInputStream fileInputStreamReader = null;
		File filePath = new File(photoPath);
		byte[] bytes = {};
		try {
			fileInputStreamReader = new FileInputStream(filePath);
			bytes = new byte[(int) filePath.length()];
			fileInputStreamReader.read(bytes);
			fileInputStreamReader.close();
		} catch (Exception e) {

			e.printStackTrace();
		}
		return "data:image/jpg;base64," + Base64.encodeBase64String(bytes);
	}

	@Override
	public List<ValueObject> getAllOrganizationByRole(Integer roleId) {
		List<DesignationAreaOrganizationRoleMapping> dAORLists = designationAreaOrganizationRoleMappingRepository
				.findByRoleRoleId(roleId);
		Map<String, ValueObject> orgMap = new HashMap<>();
		ValueObject valueObject = null;
		for (DesignationAreaOrganizationRoleMapping dAOR : dAORLists) {
			valueObject = new ValueObject();
			valueObject.setKey(dAOR.getOrganization().getId());
			valueObject.setValue(dAOR.getOrganization().getOrganizationName());
			orgMap.put(dAOR.getOrganization().getOrganizationName(), valueObject);

		}
		List<ValueObject> finallist = new ArrayList<>();
		for (Map.Entry<String, ValueObject> entry : orgMap.entrySet()) {
			finallist.add(entry.getValue());
		}

		return finallist;
	}

	@Override
	public ErrorClass updateUserDetails(EssUserModel essUserModel) throws Exception {

		ErrorClass errorClass = new ErrorClass();
		try {
			EssUser essUser = essUserRepository.findByUsername(essUserModel.getUsername());
			EssUser essUserOld = (EssUser) essUser.clone();
			
			essUser.setUpdatedDate(new Timestamp(System.currentTimeMillis()));
			essUser.setSalutation(new TypeDetail(essUserModel.getSalutationId()));
			essUser.setFirstName(Character.toString(essUserModel.getFirstName().charAt(0)).toUpperCase()
					+ essUserModel.getFirstName().substring(1));
			essUser.setMiddleName(essUserModel.getMiddleName() != null && !essUserModel.getMiddleName().isEmpty()
					? Character.toString(essUserModel.getMiddleName().charAt(0)).toUpperCase()
							+ essUserModel.getMiddleName().substring(1)
					: null);
			essUser.setLastName(Character.toString(essUserModel.getLastName().charAt(0)).toUpperCase()
					+ essUserModel.getLastName().substring(1));
			essUser.setGender(essUserModel.getGender() == null ? essUserOld.getGender() : new TypeDetail(essUserModel.getGender()));
			essUser.setBirthday(
					new java.sql.Date(new SimpleDateFormat("dd-MM-yyyy").parse(essUserModel.getBirthday()).getTime()));
			essUser.setPhoneNo(essUserModel.getPhoneNo());
			essUser.setPrimaryEmailId(essUserModel.getPrimaryEmailId().trim().toLowerCase());
			essUser.setSecondaryEmailId(essUserModel.getSecondaryEmailId() == null ? essUser.getSecondaryEmailId()
					: essUserModel.getSecondaryEmailId().trim().toLowerCase());
			essUser.setPhotoFilePath(essUserModel.getPhotoFilePath() == null ? essUser.getPhotoFilePath()
					: getFilePath(essUserModel.getPhotoFilePath(), essUserModel.getUsername(),1));

			essUserRepository.save(essUser);
			
			MailModel mailModel = new MailModel();
			mailModel.setToEmailIds(Arrays.asList(essUser.getPrimaryEmailId()));
		    mailModel.setCcEmailIds(Arrays.asList(essUserOld.getPrimaryEmailId()));
			mailModel.setFromUserName("eSS Admin" + "<br><br><p style=" + "font-size:10px" + ">"
					+ messages.getMessage(Constants.Web.EMAIL_DISCLAIRER, null, null) + "</p>");
			mailModel.setSubject("e Supportive Supervision: profile updated");
			mailModel.setMessage(
					"<p style='color:#2d3e50;font-size:14px;font-weight:normal;margin:10px 0'>Your  <span class='il'>profile</span>  has been updated."
							+ "</p>" + "<p style='margin:30px 0 0 0'>");
			mailModel.setToUserName(essUser.getFirstName());
			mailService.sendMail(mailModel);
			
			errorClass.setValid("true");
			errorClass.setErrorMessage("Update successful");
		} catch (Exception e) {
			e.printStackTrace();
			errorClass.setValid("false");
			errorClass.setErrorMessage("Update failed");
		}

		return errorClass;
	}


	private String getFilePath(String uploadedPhoto, String username, int fileType) throws Exception {
		
if(!uploadedPhoto.equals("") && uploadedPhoto!=null){
		String uploadsDir = null;
		if (fileType == 1)
			uploadsDir = messages.getMessage(Constants.Web.PHOTO_UPLOAD_PATH, null, null);
		else if (fileType == 2)
			uploadsDir = messages.getMessage(Constants.Web.AADHAAR_UPLOAD_PATH, null, null);
		else
			uploadsDir = messages.getMessage(Constants.Web.PANCARD_UPLOAD_PATH, null, null);
		

		File file = new File(uploadsDir);
		if (!file.exists()) {
			file.mkdirs();
		}
	    byte[] decodedBytes = Base64.decodeBase64(uploadedPhoto.split(",")[1]);
	    String finalPath = uploadsDir+""+username+"_"+new SimpleDateFormat("ddMMyyyyHHmmssSSS").format(new java.util.Date())+".jpg";
		return  makeThumbnail(finalPath, decodedBytes);
       }else
    	   return null;
	}

	private String makeThumbnail(String finalPath ,byte[] decodedBytes) throws IOException {
		BufferedImage img = ImageIO.read(new ByteArrayInputStream(decodedBytes));// load image
		BufferedImage thumbImg = Scalr.resize(img, Method.QUALITY,	Mode.AUTOMATIC, 350, 450, Scalr.OP_ANTIALIAS);
		ByteArrayOutputStream os = new ByteArrayOutputStream();
		ImageIO.write(thumbImg, "jpg", os);

		File writeFilePath = new File(finalPath);
		ImageIO.write(thumbImg, "jpg", writeFilePath);
		return finalPath;
	}

	@Override
	public List<ValueObject> getDesignations(Integer designationId) {
		Designation designation = designationRepository.findById(designationId);
		List<ValueObject> valueObjectLists = new ArrayList<>();
		ValueObject valueObject = new ValueObject();
       if(designation!=null){
		valueObject.setKey(designation.getId());
		valueObject.setValue(designation.getName());
		valueObjectLists.add(valueObject);
		return valueObjectLists;
       }else
		return valueObjectLists;
	}

	@Override
	public List<ValueObject> getAllUserLevel() {
		List<ValueObject> valueObjectList = new ArrayList<>();
		
		List<String> country_level_role_ids = new ArrayList<>();
		String country_level_role_ids_string = messages.getMessage(
				Constants.Web.COUNTY_LEVEL_ROLE_IDS, null, null);
		for (String role_id : country_level_role_ids_string.split(",")) {
			country_level_role_ids.add(role_id);
		}
		
		List<Role> roleLists = roleRepository.findByRoleCodeIn(country_level_role_ids);
		for (Role role : roleLists) {
			ValueObject valueObject = new ValueObject();
			valueObject.setKey(role.getRoleId());
			valueObject.setValue(role.getRoleName());
			valueObjectList.add(valueObject);
		}
		return valueObjectList;
	}

	/*@Override
	public String getFullNameOfUser() {
		EssUserModel logedUser = (EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL);
		EssUser essUser = essUserRepository.findByUsername(logedUser.getUsername());
		String fullName = essUser.getMiddleName() == null
				? essUser.getSalutation().getName() + " " + essUser.getFirstName() + " " + essUser.getLastName()
				: essUser.getSalutation().getName() + " " + essUser.getFirstName() + " " + essUser.getMiddleName()
						+ " " + essUser.getLastName();
		
		return fullName;
	}*/
	
		/** 
		 * @author Sarita Panigrahi, created on: 20-Sep-2017
		 * @param ipAddress
		 * @param userId
		 * @param userAgent
		 * @return
		 * save login meta of user while logs in to the system
		 */
		@Override
		@Transactional
		public Long saveUserLoginMeta(String ipAddress, Integer userId, String userAgent) {
			UserLoginMeta userLoginMeta = new UserLoginMeta();
			userLoginMeta.setUserIpAddress(ipAddress);
			userLoginMeta.setEssUser(new EssUser(userId));
			userLoginMeta.setLoggedInDateTime(new Timestamp(new Date().getTime()));
			userLoginMeta.setUserAgent(userAgent);
			userLoginMeta.setLoggedIn(true);
			return userLoginMetaRepository.save(userLoginMeta).getUserLogInMetaId();
		}

		/** 
		 * @author Sarita Panigrahi, created on: 20-Sep-2017
		 * @param userLoginMetaId
		 * @param loggedOutDateTime
		 * update login meta while signing out- logout time
		 */
		@Override
		@Transactional
		public void updateLoggedOutStatus(long userLoginMetaId) {

			// while server start up parameter is -1
			if (userLoginMetaId == -1) {
				userLoginMetaRepository.updateStatusForAll(new Timestamp(new Date().getTime()));
			} else //while user clicks on log out or while session destroys
				userLoginMetaRepository.updateStatus(new Timestamp(new Date().getTime()), userLoginMetaId);
		}

}
