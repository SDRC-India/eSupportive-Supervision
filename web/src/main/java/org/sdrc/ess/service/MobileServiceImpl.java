package org.sdrc.ess.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.Method;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.Calendar;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;
import java.util.UUID;

import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.joda.time.DateTime;
import org.sdrc.ess.domain.Area;
import org.sdrc.ess.domain.CommunityData;
import org.sdrc.ess.domain.Designation;
import org.sdrc.ess.domain.DesignationAreaOrganizationRoleMapping;
import org.sdrc.ess.domain.EssUser;
import org.sdrc.ess.domain.FacilityData;
import org.sdrc.ess.domain.Organization;
import org.sdrc.ess.domain.PlanOfAction;
import org.sdrc.ess.domain.Role;
import org.sdrc.ess.domain.Type;
import org.sdrc.ess.domain.TypeDetail;
import org.sdrc.ess.domain.UserAreaMapping;
import org.sdrc.ess.domain.UserCredentialsMetaData;
import org.sdrc.ess.domain.VersionManager;
import org.sdrc.ess.model.mobile.AreaModel;
import org.sdrc.ess.model.mobile.CommunityDataModel;
import org.sdrc.ess.model.mobile.CommunityErrorModel;
import org.sdrc.ess.model.mobile.DesignationModel;
import org.sdrc.ess.model.mobile.FacilityDataModel;
import org.sdrc.ess.model.mobile.FacilityErrorModel;
import org.sdrc.ess.model.mobile.ForgotPasswordModel;
import org.sdrc.ess.model.mobile.LoginModel;
import org.sdrc.ess.model.mobile.MailModel;
import org.sdrc.ess.model.mobile.MasterDataModel;
import org.sdrc.ess.model.mobile.OrganizationModel;
import org.sdrc.ess.model.mobile.PlanOfActionModel;
import org.sdrc.ess.model.mobile.PrefetchModel;
import org.sdrc.ess.model.mobile.PrefetchResult;
import org.sdrc.ess.model.mobile.ResetPasswordModel;
import org.sdrc.ess.model.mobile.SubmitModel;
import org.sdrc.ess.model.mobile.SubmitResultModel;
import org.sdrc.ess.model.mobile.SyncModel;
import org.sdrc.ess.model.mobile.SyncResult;
import org.sdrc.ess.model.mobile.TypeDetailModel;
import org.sdrc.ess.model.mobile.TypeModel;
import org.sdrc.ess.model.mobile.UserAreaMappingModel;
import org.sdrc.ess.model.mobile.UserModel;
import org.sdrc.ess.model.web.RoleModel;
import org.sdrc.ess.repository.AreaRepository;
import org.sdrc.ess.repository.CommunityDataRepository;
import org.sdrc.ess.repository.DesignationAreaOrganizationRoleMappingRepository;
import org.sdrc.ess.repository.EssUserRepository;
import org.sdrc.ess.repository.FacilityDataRepository;
import org.sdrc.ess.repository.OrganizationRepository;
import org.sdrc.ess.repository.PlanOfActionRepository;
import org.sdrc.ess.repository.RoleRepository;
import org.sdrc.ess.repository.TypeDetailRepository;
import org.sdrc.ess.repository.TypeRepository;
import org.sdrc.ess.repository.UserCredentialsMetaDataRepository;
import org.sdrc.ess.repository.VersionManagerRepository;
import org.sdrc.ess.thread.PostSyncThread;
import org.sdrc.ess.util.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.security.authentication.encoding.MessageDigestPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;


/**
 * The Implementation class
 * @author Naseem Akhtar (naseem@sdrc.co.in) on 23-May-2017 1:35:51 am
 * @author Sarita Panigrahi (sarita@sdrc.co.in) on 09-06-2017 19:45 pm
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 19-Aug-2017 7:31:04 am
 */

@Service
public class MobileServiceImpl implements MobileService {
	
	private static final Logger logger = LoggerFactory
			.getLogger(MobileServiceImpl.class);
	
	@Autowired
	private ResourceBundleMessageSource messages;
	
	@Autowired
	private EssUserRepository essUserRepository;
	
	@Autowired
	private AreaRepository areaRepository;
	
	@Autowired
	private MessageDigestPasswordEncoder messageDigest;
	
	@Autowired
	private TypeDetailRepository typeDetailRepository;
	
	@Autowired
	private TypeRepository typeRepository;
	
	@Autowired
	private FacilityDataRepository facilityDataRepository;
	
	@Autowired
	private CommunityDataRepository communityDataRepository;
	
	@Autowired
	private MailService mailService;
	
	@Autowired
	private ServletContext context;
	
	@Autowired
	private ApplicationContext appContext;
	
	@Autowired
	private ResourceBundleMessageSource applicationMessageSource;
	
	@Autowired
	private PlanOfActionRepository planOfActionRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private DesignationAreaOrganizationRoleMappingRepository designationAreaOrganizationRoleMappingRepository;
	
	@Autowired
	private OrganizationRepository organizationRepository;
	
	@Autowired
	private UserCredentialsMetaDataRepository userCredentialsMetaDataRepository;
	
	/**
	 * @author Sarita Panigrahi
	 */
	@Autowired
	private UserService userService;
	
	/**
	 * @author Debiprasad Parida
	 */
	@Autowired
    private PlanningService planningService;
	
	@Autowired
	private VersionManagerRepository versionManagerRepository;
	
	/**
	 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in)
	 */	
	private SimpleDateFormat sdfFull = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
	private SimpleDateFormat sdfPostSync = new SimpleDateFormat("dd-MM-yyyy HH.mm");

	public SubmitResultModel submitData(SubmitModel submitModel) {
		return null;
	}

	public MasterDataModel getMasterData(LoginModel loginModel, HttpServletRequest request) {
		
		MasterDataModel masterDataModel = new MasterDataModel();
		VersionManager versionManager =  versionManagerRepository.findById(1);
		
		
		Map<String, String> map1 = new HashMap<>();
		Enumeration headerNames = request.getHeaderNames();
		
		while(headerNames.hasMoreElements()){
			String key = (String) headerNames.nextElement();
            String value = request.getHeader(key);
            map1.put(key, value);
		}
		
		
		String appVersionName = null;
		try{
			appVersionName = new String(Base64.getDecoder().decode(map1.get("apitoken"))); 
		}catch(NullPointerException nullPointerException){
			logger.error("Login unsuccessfull, request has come from lower version or version name is missing");
			masterDataModel.setErrorCode(2);
			masterDataModel.setLatestAppVersionName(versionManager.getVersionName());
			masterDataModel.setErrorMessage(messages.getMessage(Constants.Mobile.INVALID_VERSION_NAME, null, null));
			return masterDataModel;
		}
		
		
		ObjectMapper mapper = new ObjectMapper();
		
		if(appVersionName != null && !(appVersionName.trim().equals("")) 
				&& appVersionName.equals(versionManager.getVersionName())){	
			
			if(loginModel != null && loginModel.getUsername() != null && 
					loginModel.getPassword() != null && !(loginModel.getUsername().equals("")) && 
					!(loginModel.getPassword().equals(""))){
				
				//Making facility in-charges ready so that we can put it against facilities(areas)
				Map<Integer, EssUser> facilityInChargesMap = getFacilityInChargesMap(essUserRepository.findByInChargeFacilityIdNotNull());
				
				//Now we got valid username and password
				EssUser user = essUserRepository.
						findByUsername(loginModel.getUsername());
				
				// encoding password using md5 to check the password as stored in the db.
				String encodedPassword = null;
				
				if(user != null && user.getIsApproved() != null && user.getIsApproved()
						&& user.getIsActive() != null && user.getIsActive() &&  user.getIsLive()){
					encodedPassword = messageDigest.encodePassword(user.getUsername(), loginModel.getPassword());
	//				System.out.println(encodedPassword);
					if(user.getDesignationAreaOrganizationRoleMapping().getDesignation().getId() != 93 && 
							user.getDesignationAreaOrganizationRoleMapping().getDesignation().getId() != 94){
						if(user.getPassword().equals(encodedPassword)){
							
							//sarita code
							//login meta code 
							//On successful login save UserLoginMeta information of that user.
							
							ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder
									.currentRequestAttributes();						
							
							String ipAddress = getIpAddr(request);
							String userAgent = request.getHeader("User-Agent");
							//when the user logs in from mobile concatenate userAgent with "Mobile-Login: " 
							Long userLoginMetaId = userService.saveUserLoginMeta(ipAddress, user.getId(), "Mobile-Login: "+userAgent);
							//end sarita code
						
							//Ratikanta
							if(!loginModel.isNewUser() && !loginModel.isInitialLogin()){
								
								UserModel model = new UserModel();
								model.setPassword(loginModel.getPassword());
								masterDataModel.setUserModel(model);
								masterDataModel.setAfter_forgot_password(1);
								
							}else{				
								if(user.getUserAreaMappings() != null){
								
									UserAreaMapping areaMapping = user.getUserAreaMappings();
									List<AreaModel> areaModelList = new ArrayList<>();
									
										try {
											/*
											 * @author Naseem Akhtar (naseem@sdrc.co.in)
											 * The following steps are to retrieve the area_json columnn from the user area mapping table and 
											 * then convert it into an java object by using object mapper, after that we fetch the data from the area
											 * table accordingly.
											 */
											
											UserAreaMappingModel uAMap = mapper.readValue(areaMapping.getAreaJson(), UserAreaMappingModel.class);
											
											List<Integer> areaIdList = new ArrayList<>();
											
											areaIdList.add(uAMap.getCountry());
											if(uAMap.getState() != null && !uAMap.getState().isEmpty())
												areaIdList.addAll(uAMap.getState());
											if(uAMap.getDistrict() != null && !uAMap.getDistrict().isEmpty())
												areaIdList.addAll(uAMap.getDistrict());
											if(uAMap.getBlock() != null && !uAMap.getBlock().isEmpty())
												areaIdList.addAll(uAMap.getBlock());
											if(uAMap.getFacility() != null && !uAMap.getFacility().isEmpty())
												areaIdList.addAll(uAMap.getFacility());
											
											List<Area> areaList;
											
											List<Integer> areaIds = new ArrayList<>(); // for finding responsible designation. see line 338
											Boolean countryAdmin = false;
											
											if(uAMap.getState() != null && !uAMap.getState().isEmpty()){
												areaIds = uAMap.getState();
												areaList = areaRepository.findByAreaNIdIn(areaIdList);
											}else{
												countryAdmin = true;
												areaIds.add(uAMap.getCountry());
												areaList = areaRepository.findAll();
											}
											
											for(Area area : areaList){
												AreaModel areaModel = new AreaModel();
												
												areaModel.setAreaId(area.getAreaId());
												areaModel.setAreaNId(area.getAreaNId());
												areaModel.setLevel(area.getLevel());
												areaModel.setName(area.getName());
												areaModel.setParentAreaId(area.getParentAreaId());
												areaModel.setnIN(area.getnIN());
												
												if(area.getFacilityType() != null && area.getFacilityType().getName() != null){
													TypeDetailModel typeDetailModel = new TypeDetailModel();
													typeDetailModel.setId(area.getFacilityType().getId());
													typeDetailModel.setName(area.getFacilityType().getName());
													typeDetailModel.setTypeId(area.getFacilityType().getTypeId());
													
													areaModel.setFacilityType(typeDetailModel);
													
												}else{
													areaModel.setFacilityType(null);
												}
												
												EssUser facilityIncharge = facilityInChargesMap.get(area.getAreaNId());											
												areaModel.setFacilityInchargeEmailId(facilityIncharge != null ?facilityIncharge.getPrimaryEmailId(): null);
												
												areaModelList.add(areaModel);
											}
											
											masterDataModel.setAreaDetails(areaModelList);
											
											// adding last sync date to keep a record of when the data has been last fetched from db
											Date date = new Date();
											String currentDate = sdfFull.format(date);
											
											masterDataModel.setLastSyncedDate(currentDate);
											
											// adding type details to the master data model
											List<TypeDetail> typeDetailList = typeDetailRepository.findAll();
											List<TypeDetailModel> tdList = new ArrayList<>();
											
											for(TypeDetail typeDetail : typeDetailList){
												TypeDetailModel typeDetailModel = new TypeDetailModel();
												
												typeDetailModel.setId(typeDetail.getId());
												typeDetailModel.setName(typeDetail.getName());
												typeDetailModel.setTypeId(typeDetail.getTypeId());
												typeDetailModel.setOrderLevel(typeDetail.getOrderLevel() == null ? null : typeDetail.getOrderLevel());
												
												tdList.add(typeDetailModel);
											}
											
											masterDataModel.setTypeDetails(tdList);
											
											// adding type to the master data table
											List<Type> types = typeRepository.findAll();
											List<TypeModel> typeModels = new ArrayList<>();
											
											for(Type type : types){
												TypeModel typeModel = new TypeModel();
												
												typeModel.setId(type.getId());
												typeModel.setName(type.getName());
												
												typeModels.add(typeModel);
											}
											
											masterDataModel.setTypeList(typeModels);
											
											List<Organization> organizations = organizationRepository.findAll();
											List<OrganizationModel> orgModels = new ArrayList<>();
											
											for(Organization organization : organizations){
												OrganizationModel orgModel = new OrganizationModel();
												
												orgModel.setId(organization.getId());
												orgModel.setOrganizationName(organization.getOrganizationName());
												orgModel.setIsGovernmentOrg(organization.getIsGovernmentOrg());
												
												orgModels.add(orgModel);
											}
											
											masterDataModel.setOrganizations(orgModels);
											
											List<String> roleCodeList = new ArrayList<>();
											roleCodeList.add(messages.getMessage(Constants.Mobile.ROLE_CODE_DISTRICT, null, null));
											roleCodeList.add(messages.getMessage(Constants.Mobile.ROLE_CODE_BLOCK, null, null));
											roleCodeList.add(messages.getMessage(Constants.Mobile.ROLE_CODE_STATE, null, null));
											
											List<Role> roles = roleRepository.findByRoleCodeIn(roleCodeList);
											List<RoleModel> roleModels = new ArrayList<>();
											List<Integer> roleIds = new ArrayList<>();
											
											for(Role role : roles){
												RoleModel roleModel = new RoleModel();
												roleModel.setDescription(role.getDescription());
												roleModel.setRoleCode(role.getRoleCode());
												roleModel.setRoleId(role.getRoleId());
												if(role.getRoleCode().equals(messages.getMessage(Constants.Mobile.ROLE_CODE_BLOCK, null, null))){
													roleModel.setRoleName("Facility level");
												}else{
													roleModel.setRoleName(role.getRoleName());
												}
												
												roleIds.add(role.getRoleId());
												roleModels.add(roleModel);
											}
											
											masterDataModel.setRoles(roleModels);
											
											List<DesignationAreaOrganizationRoleMapping> daor;
											if(countryAdmin){
												daor = designationAreaOrganizationRoleMappingRepository.findByIsResponsibleFacilityTrueOrIsResponsibleCommunityTrueAndRoleRoleIdIn(roleIds);
											}
											else{
												daor = designationAreaOrganizationRoleMappingRepository.findDesignationForPOA(areaIds, roleIds);
											}
											
											Set<DesignationModel> designationSet = new HashSet<>();
											
											if(daor != null && !daor.isEmpty()){
												for(DesignationAreaOrganizationRoleMapping map : daor){
													if(roleIds.contains(map.getRole().getRoleId())){
														Designation designation = map.getDesignation();
														DesignationModel designationModel = new DesignationModel();
														
														designationModel.setId(designation.getId());
														designationModel.setIsResponsibleCommunity(map.getIsResponsibleCommunity());
														designationModel.setIsResponsibleFacility(map.getIsResponsibleFacility());
														designationModel.setLevel(map.getRole().getRoleId());
														designationModel.setName(designation.getName());
														designationModel.setAreaId(map.getArea().getAreaNId());
														designationModel.setOrganizationId(map.getOrganization().getId());
														designationModel.setDoarMappingId(map.getId());
														
														designationSet.add(designationModel);
													}
												}
											}
											
											List<DesignationModel> designationModels = new ArrayList<>(designationSet);
											masterDataModel.setDesignations(designationModels);
											
											// adding areaId to user model of master data model for which the user has access. 
											
											UserModel model = new UserModel();
											model.setUserId(user.getId());
											model.setName(user.getMiddleName() == null ? user.getFirstName() +" "+ user.getLastName() : 
												user.getFirstName() +" "+ user.getMiddleName() + " " + user.getLastName());
											model.setUserName(user.getUsername());
											model.setPassword(loginModel.getPassword());
											model.setEmail(user.getPrimaryEmailId());
											
											Designation designation = user.getDesignationAreaOrganizationRoleMapping().getDesignation();
											DesignationModel designationModel = new DesignationModel();
											
											designationModel.setId(designation.getId());
											designationModel.setName(designation.getName());
											designationModel.setLevel(user.getDesignationAreaOrganizationRoleMapping().getRole().getRoleId());
											
											Organization organization = user.getDesignationAreaOrganizationRoleMapping().getOrganization();
											OrganizationModel organizationModel = new OrganizationModel();
											
											organizationModel.setId(organization.getId());
											organizationModel.setOrganizationName(organization.getOrganizationName());
											
											model.setDesignation(designationModel);
											model.setOrganization(organizationModel);
											masterDataModel.setUserModel(model);
											logger.info("Masterdata is going to " + masterDataModel.getUserModel().getUserId() + " UserId");
											
											
										} catch (JsonParseException e) {
											logger.error(messages.getMessage(Constants.Mobile.ERROR_PARSING_AREAMAPPING, null, null) + " for username " + loginModel.getUsername()
											+ " and password " + loginModel.getPassword());
											masterDataModel.setErrorCode(1);
											masterDataModel.setErrorMessage(messages.getMessage(Constants.Mobile.ERROR_PARSING_AREAMAPPING, null, null));
										} catch (JsonMappingException e) {
											logger.error(messages.getMessage(Constants.Mobile.ERROR_PARSING_AREAMAPPING, null, null) + " for username " + loginModel.getUsername()
											+ " and password " + loginModel.getPassword());
											masterDataModel.setErrorCode(1);
											masterDataModel.setErrorMessage(messages.getMessage(Constants.Mobile.ERROR_PARSING_AREAMAPPING, null, null));
										} catch (IOException e) {
											logger.error(messages.getMessage(Constants.Mobile.ERROR_PARSING_AREAMAPPING, null, null) + " for username " + loginModel.getUsername()
											+ " and password " + loginModel.getPassword());
											masterDataModel.setErrorCode(1);
											masterDataModel.setErrorMessage(messages.getMessage(Constants.Mobile.ERROR_PARSING_AREAMAPPING, null, null));
										}
									
									
									
								}else{
									logger.error(messages.getMessage(Constants.Mobile.INVALID_USER_AREA_MAPPING, null, null) + " for username " + loginModel.getUsername()
											+ " and password " + loginModel.getPassword());
									masterDataModel.setErrorCode(1);
									masterDataModel.setErrorMessage(messages.getMessage(Constants.Mobile.INVALID_USER_AREA_MAPPING, null, null));
								}
							}
							
							//sarita code for user login meta
							//update login meta information once the master data job is finished
							userService.updateLoggedOutStatus(userLoginMetaId);
							//end sarita code
						}else{
							logger.error(messages.getMessage(Constants.Mobile.INVALID_CREDENTIALS, null, null) + " for username " + loginModel.getUsername()
							+ " and password " + loginModel.getPassword());
							masterDataModel.setErrorCode(1);
							masterDataModel.setErrorMessage(messages.getMessage(Constants.Mobile.INVALID_CREDENTIALS, null, null));
						}
					}else{
						logger.error(messages.getMessage(Constants.Mobile.DATA_ENTRY_NOT_ALLOWED, null, null) + " for username " + loginModel.getUsername()
						+ " and password " + loginModel.getPassword());
						masterDataModel.setErrorCode(1);
						masterDataModel.setErrorMessage(messages.getMessage(Constants.Mobile.DATA_ENTRY_NOT_ALLOWED, null, null));
					}
				}else{
					masterDataModel.setErrorCode(1);
					if(user != null && user.getIsApproved() == null){
						logger.error(messages.getMessage(Constants.Mobile.ERROR_USER_NOT_APPROVED, null, null) + " for username " + loginModel.getUsername()
						+ " and password " + loginModel.getPassword());
						masterDataModel.setErrorMessage(messages.getMessage(Constants.Mobile.ERROR_USER_NOT_APPROVED, null, null));
					}else if(user != null && !user.getIsApproved()){
						logger.error(messages.getMessage(Constants.Mobile.ERROR_USER_REJECTED, null, null) + " for username " + loginModel.getUsername()
						+ " and password " + loginModel.getPassword());
						masterDataModel.setErrorMessage(messages.getMessage(Constants.Mobile.ERROR_USER_REJECTED, null, null));
					}else if(user != null && (user.getIsActive() == null || !user.getIsActive())){
						logger.error(messages.getMessage(Constants.Mobile.ERROR_USER_INACTIVE, null, null) + " for username " + loginModel.getUsername()
						+ " and password " + loginModel.getPassword());
						masterDataModel.setErrorMessage(messages.getMessage(Constants.Mobile.ERROR_USER_INACTIVE, null, null));
					}else{
						logger.error(messages.getMessage(Constants.Mobile.ERROR_USER_INVALID, null, null) + " for username " + loginModel.getUsername()
								+ " and password " + loginModel.getPassword());
						masterDataModel.setErrorMessage(messages.getMessage(Constants.Mobile.ERROR_USER_INVALID, null, null));
					}
				}	
				
			}else{
				logger.error(messages.getMessage(Constants.Mobile.INVALID_DATA_FROM_MOBILE, null, null));
				masterDataModel.setErrorCode(1);
				masterDataModel.setErrorMessage(messages.getMessage(Constants.Mobile.INVALID_DATA_FROM_MOBILE, null, null));
			}	
		} else {
			
			logger.error("Login unsuccessfull, request has come from lower version or version name is missing");
			masterDataModel.setErrorCode(2);
			masterDataModel.setLatestAppVersionName(versionManager.getVersionName());
			masterDataModel.setErrorMessage(messages.getMessage(Constants.Mobile.INVALID_VERSION_NAME, null, null));
		}
		return masterDataModel;
	}

	/**
	 * This method is going a create a map. In the key area id and value user will be there. This user will be facility in-charge for area 
	 * which is present in the key.
	 *  
	 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 28-Dec-2017 5:54:55 pm
	 */
	private Map<Integer, EssUser> getFacilityInChargesMap(
			List<EssUser> facilityInCharges) {
		
		Map<Integer, EssUser> facilityInChargeMap = new HashMap<Integer, EssUser>();		
		facilityInCharges.forEach(facilityInCharge->
		
			facilityInChargeMap.put(facilityInCharge.getInChargeFacilityId().getAreaNId(), facilityInCharge)
			
		);		
		return facilityInChargeMap;
		
	}

	/**
	 * This method will synchronize any new changes made in the back-end to the mobile.
	 * @author Naseem Akhtar (naseem@sdrc.co.in) on 21st May 17:11
	 * @author Ratikanta Pradhan
	 * @param request
	 * 
	 */
	@SuppressWarnings({ "rawtypes" })
	@Override
	@Transactional
	public SyncResult sync(SyncModel syncModel, HttpServletRequest request) {
		
		ObjectMapper mapper = new ObjectMapper();
		Map<String, String> map = new HashMap<>();
		Enumeration headerNames = request.getHeaderNames();
		
		while(headerNames.hasMoreElements()){
			String key = (String) headerNames.nextElement();
            String value = request.getHeader(key);
            map.put(key, value);
		}
		
		//fetching api token from header
		String apiToken = new String(Base64.getDecoder().decode(map.get("apitoken")));
		String apiTokenEncoded = messageDigest.encodePassword(apiToken.split("_")[0], apiToken.split("_")[1]);
		
		String appVersionName = apiToken.split("_").length == 3?apiToken.split("_")[2] : null;
		
		SyncResult syncResult = new SyncResult();
		
		try{
			VersionManager versionManager =  versionManagerRepository.findById(1);
			//Checking version name
			if(appVersionName != null && !(appVersionName.trim().equals("")) 
					&& appVersionName.equals(versionManager.getVersionName())){
				//checking whether data from mobile is null
				if(syncModel != null && syncModel.getLoginDataModel() != null && 
						syncModel.getLoginDataModel().getLastSyncDate() != null && syncModel.getLoginDataModel().getUsername() != null){
					
					Timestamp lastSyncDate =  Timestamp.valueOf(syncModel.getLoginDataModel().getLastSyncDate());
					MasterDataModel masterDataModel = new MasterDataModel();
					
					EssUser user = essUserRepository.findByUsernameWithLock(syncModel.getLoginDataModel().getUsername());
					if(user != null && user.getPassword().equals(apiTokenEncoded)){
						
						/*
						 * Setting email id to LoginDataModel, email id is not coming from mobile/pwa.
						 * We need the email id to sent submission report 
						 * Email id is not coming from mobile/pwa because if user has changed its primary email, update will go to mobile 
						 * only after sync.
						 */ 
						
						syncModel.getLoginDataModel().setEmail(user.getPrimaryEmailId());
						
						Designation designation = user.getDesignationAreaOrganizationRoleMapping().getDesignation();
						DesignationModel designationModel = new DesignationModel();
						
						designationModel.setId(designation.getId());
						designationModel.setName(designation.getName());
						designationModel.setLevel(user.getDesignationAreaOrganizationRoleMapping().getRole().getRoleId());
						
						Organization organization = user.getDesignationAreaOrganizationRoleMapping().getOrganization();
						OrganizationModel organizationModel = new OrganizationModel();
						
						organizationModel.setId(organization.getId());
						organizationModel.setOrganizationName(organization.getOrganizationName());
						
						UserModel userModel = new UserModel();
						userModel.setName(user.getMiddleName() == null ? user.getFirstName() +" "+ user.getLastName() : 
							user.getFirstName() +" "+ user.getMiddleName() + " " + user.getLastName());
						userModel.setEmail(user.getPrimaryEmailId());
						userModel.setUserName(user.getUsername());
						userModel.setUserId(user.getId());
						userModel.setDesignation(designationModel);
						userModel.setOrganization(organizationModel);
						userModel.setPassword(apiToken.split("_")[1]);
						
						
						masterDataModel.setUserModel(userModel);
						
						UserAreaMappingModel uAMap = mapper.readValue(user.getUserAreaMappings().getAreaJson(), UserAreaMappingModel.class);
						
						List<Integer> areaIdList = new ArrayList<>();
						List<Integer> areaIds = new ArrayList<>();
						
						areaIdList.add(uAMap.getCountry());
						if(uAMap.getState() != null && !uAMap.getState().isEmpty())
							areaIdList.addAll(uAMap.getState());
						if(uAMap.getDistrict() != null && !uAMap.getDistrict().isEmpty())
							areaIdList.addAll(uAMap.getDistrict());
						if(uAMap.getBlock() != null && !uAMap.getBlock().isEmpty())
							areaIdList.addAll(uAMap.getBlock());
						if(uAMap.getFacility() != null && !uAMap.getFacility().isEmpty())
							areaIdList.addAll(uAMap.getFacility());
						
						/*
						 * author - Naseem Akhtar (naseem@sdrc.co.in)
						 * The following code are going to retrieve the latest changes that are in the area table.
						 */
						
						List<AreaModel> areaModelList = new ArrayList<>();
						
						/*
						 * checking whether any update in its user area mapping, if yes then fetch the whole area table, if no then
						 * look for the latest area changes.
						 */
						if(user.getUserAreaMappings().isData_updated()){
							
							List<Area> areaList;
							
							if(uAMap.getState() != null && !uAMap.getState().isEmpty()){
								areaList = areaRepository.findByAreaNIdIn(areaIdList);
							}else{
								areaList = areaRepository.findAll();
							}
							
							for(Area area : areaList){
								AreaModel areaModel = new AreaModel();
								
								areaModel.setAreaId(area.getAreaId());
								areaModel.setAreaNId(area.getAreaNId());
								areaModel.setLevel(area.getLevel());
								areaModel.setName(area.getName());
								areaModel.setParentAreaId(area.getParentAreaId());
								areaModel.setnIN(area.getnIN());
								
								if(area.getFacilityType() != null && area.getFacilityType().getName() != null){
									TypeDetailModel typeDetailModel = new TypeDetailModel();
									typeDetailModel.setId(area.getFacilityType().getId());
									typeDetailModel.setName(area.getFacilityType().getName());
									typeDetailModel.setTypeId(area.getFacilityType().getTypeId());
									
									areaModel.setFacilityType(typeDetailModel);
									
								}else{
									areaModel.setFacilityType(null);
								}
								
								areaModelList.add(areaModel);
							}
							
							masterDataModel.setAreaDetails(areaModelList);
							masterDataModel.setUpdateCode(1);
							masterDataModel.setUpdateStatus("User Mapping Updated");
						}else{
							List<Area> areaList = areaRepository.findByCreatedDateGreaterThanOrUpdatedDateGreaterThanAndAreaNIdIn(lastSyncDate,lastSyncDate,areaIdList);
							
							if(areaList != null && !areaList.isEmpty()){
								for(Area area : areaList){
									AreaModel areaModel = new AreaModel();
									
									areaModel.setAreaId(area.getAreaId());
									areaModel.setAreaNId(area.getAreaNId());
									areaModel.setLevel(area.getLevel());
									areaModel.setName(area.getName());
									areaModel.setParentAreaId(area.getParentAreaId());
									
									areaModelList.add(areaModel);
								}
								masterDataModel.setAreaDetails(areaModelList);
							}
							masterDataModel.setUpdateCode(2);
							masterDataModel.setUpdateStatus("Areas Updated");
						}
						
						
						List<Type> types = typeRepository.findByCreatedDateGreaterThanOrUpdatedDateGreaterThan(lastSyncDate,lastSyncDate);
						List<TypeModel> typeModels = new ArrayList<>();
						
						if(types != null && !types.isEmpty()){
							for(Type type : types){
								TypeModel typeModel = new TypeModel();
								
								typeModel.setId(type.getId());
								typeModel.setName(type.getName());
								
								typeModels.add(typeModel);
							}
							masterDataModel.setTypeList(typeModels);
						}
						
						List<TypeDetail> typeDetails = typeDetailRepository.findByCreatedDateGreaterThanOrUpdatedDateGreaterThan(lastSyncDate,lastSyncDate);
						List<TypeDetailModel> typeDetailModels = new ArrayList<>();
						
						if(typeDetails != null && !typeDetails.isEmpty()){
							for(TypeDetail typeDetail : typeDetails){
								TypeDetailModel typeDetailModel = new TypeDetailModel();
								
								typeDetailModel.setId(typeDetail.getId());
								typeDetailModel.setName(typeDetail.getName());
								typeDetailModel.setTypeId(typeDetail.getTypeId());
								typeDetailModel.setOrderLevel(typeDetail.getOrderLevel() == null ? null : typeDetail.getOrderLevel());
								
								typeDetailModels.add(typeDetailModel);
							}
							masterDataModel.setTypeDetails(typeDetailModels);
						}
						
						List<Organization> organizations = organizationRepository.findByCreatedDateGreaterThanOrUpdatedDateGreaterThan(lastSyncDate,lastSyncDate);
						List<OrganizationModel> orgModels = new ArrayList<>();
						
						if(organizations != null && !organizations.isEmpty()){
							for(Organization org : organizations){
								OrganizationModel orgModel = new OrganizationModel();
								
								orgModel.setId(org.getId());
								orgModel.setOrganizationName(org.getOrganizationName());
								orgModel.setIsGovernmentOrg(org.getIsGovernmentOrg());
								
								orgModels.add(orgModel);
							}
							masterDataModel.setOrganizations(orgModels);
						}
						
						List<String> roleCodeList = new ArrayList<>();
						roleCodeList.add(messages.getMessage(Constants.Mobile.ROLE_CODE_DISTRICT, null, null));
						roleCodeList.add(messages.getMessage(Constants.Mobile.ROLE_CODE_BLOCK, null, null));
						roleCodeList.add(messages.getMessage(Constants.Mobile.ROLE_CODE_STATE, null, null));
						
						List<Role> roles = roleRepository.findByRoleCodeIn(roleCodeList);
						List<RoleModel> roleModels = new ArrayList<>();
						List<Integer> roleIds = new ArrayList<>();
						
						if(roles != null && !roles.isEmpty()){
							for(Role role : roles){
								if(roleCodeList.contains(role.getRoleCode())){
									roleIds.add(role.getRoleId());
									if(role.getUpdatedDate().compareTo(lastSyncDate) > 0){
										RoleModel roleModel = new RoleModel();
										roleModel.setDescription(role.getDescription());
										roleModel.setRoleCode(role.getRoleCode());
										roleModel.setRoleId(role.getRoleId());
										if(role.getRoleCode().equals(messages.getMessage(Constants.Mobile.ROLE_CODE_BLOCK, null, null))){
											roleModel.setRoleName("Facility level");
										}else{
											roleModel.setRoleName(role.getRoleName());
										}
										
										roleModels.add(roleModel);
									}
								}
							}
							masterDataModel.setRoles(roleModels);
						}
						
						Boolean isCountryAdmin = false;
						
						if(uAMap.getState() != null && !uAMap.getState().isEmpty()){
							areaIds = uAMap.getState();
						}else{
							isCountryAdmin = true;
							areaIds.add(uAMap.getCountry());
						}
						
						List<DesignationAreaOrganizationRoleMapping> daor;
						
						if(isCountryAdmin){
							daor = designationAreaOrganizationRoleMappingRepository.findDesignationForPOAByUpdateForCountryAdmin(roleIds, lastSyncDate);
						}
						else{
							daor = designationAreaOrganizationRoleMappingRepository.
									findDesignationForPOAByUpdate(areaIds, roleIds, lastSyncDate);
						}
						
						Set<DesignationModel> designationSet = new HashSet<>();
						
						if(daor != null && !daor.isEmpty()){
							for(DesignationAreaOrganizationRoleMapping daorMap : daor){
								if(roleCodeList.contains(daorMap.getRole().getRoleCode())
										&& daorMap.getOrganization().getIsGovernmentOrg()){
									Designation designationObj = daorMap.getDesignation();
									DesignationModel designationModelObj = new DesignationModel();
									
									designationModelObj.setId(designationObj.getId());
									designationModelObj.setIsResponsibleCommunity(daorMap.getIsResponsibleCommunity());
									designationModelObj.setIsResponsibleFacility(daorMap.getIsResponsibleFacility());
									designationModelObj.setLevel(daorMap.getRole().getRoleId());
									designationModelObj.setName(designationObj.getName());
									designationModelObj.setAreaId(daorMap.getArea().getAreaNId());
									designationModelObj.setOrganizationId(daorMap.getOrganization().getId());
									designationModelObj.setDoarMappingId(daorMap.getId());
									
									designationSet.add(designationModelObj);
								}
							}
							List<DesignationModel> designationModels = new ArrayList<>(designationSet);
							masterDataModel.setDesignations(designationModels);
						}
						
						Date date = new Date();
						DateTime datetime = new DateTime(date);
						Integer currentMonth = datetime.getMonthOfYear();
						Integer currentDay = datetime.getDayOfMonth();
						Integer currentYear = datetime.getYear();
						String lastSyncedDate = sdfFull.format(date); //this format is with hh:mm:ss to get latest updates from db
						masterDataModel.setLastSyncedDate(lastSyncedDate);
						
						syncResult.setMasterDataModel(masterDataModel); // setting master data in the sync result model, then proceeding further.
						
						List<FacilityDataModel> facilityDataList = syncModel.getFacilityDataList();
						List<FacilityData> facilityDatas = new ArrayList<>();
						List<FacilityErrorModel> facilityErrorModels = new ArrayList<>();
						List<CommunityDataModel> communityDataList = syncModel.getCommunityDataList();
						List<CommunityErrorModel> communityErrorModels = new ArrayList<>();
						
						List<Integer> facilityIdList = areaIdList;
						List<FacilityDataModel>  dummyFacilityList = new ArrayList<>();
						List<CommunityDataModel> dummyCommunityList = new ArrayList<>();
						
						if(facilityDataList != null && !facilityDataList.isEmpty()){
							for(FacilityDataModel facilityDataModel : facilityDataList){
								Date visitDate = sdf.parse(facilityDataModel.getC7());
								DateTime datetime1 = new DateTime(visitDate);
								int visitMonth = datetime1.getMonthOfYear();
								int monthDifference = currentMonth - visitMonth;
								int yearDifference = currentYear - datetime1.getYear();
								FacilityErrorModel errorModel = new FacilityErrorModel();
								
								if(!(facilityIdList.contains(facilityDataModel.getC5())) && !isCountryAdmin){
									errorModel.setId(facilityDataModel.getC5().toString());
									errorModel.setErrorMessage("Unauthorized Data Entry.");
									facilityErrorModels.add(errorModel);
									dummyFacilityList.add(facilityDataModel);
									
									logger.info("Facility checklist rejected! cause: Unauthorized Data Entry. user id: " + 
											user.getId() + ", facility: " + facilityDataModel.getC5());
								}else if(yearDifference < 0 || monthDifference < 0){
									errorModel.setId(facilityDataModel.getC5().toString());
									errorModel.setErrorMessage("Future date submissions not allowed.");
									facilityErrorModels.add(errorModel);
									dummyFacilityList.add(facilityDataModel);
									
									logger.info("Facility checklist rejected! cause: Future date submission. user id: " + 
											user.getId() + ", facility: " + facilityDataModel.getC5());
								}
								else if( (yearDifference > 0) || (monthDifference == 1 && currentDay > 7) || (monthDifference > 1)){
									errorModel.setId(facilityDataModel.getC5().toString());
									errorModel.setErrorMessage("Submission date exceeded.");
									facilityErrorModels.add(errorModel);
									dummyFacilityList.add(facilityDataModel);
									
									logger.info("Facility checklist rejected! cause: Submission date exceeded. user id: " + 
											user.getId() + ", facility: " + facilityDataModel.getC5());
								}
							}
							facilityDataList.removeAll(dummyFacilityList);
							dummyFacilityList = new ArrayList<>();
						}
						
						if(facilityDataList != null && !facilityDataList.isEmpty()){
							List<FacilityData> exisitingFacilityData = 
									facilityDataRepository.findByUserIdAndAreaAreaNIdIn(user.getId(),facilityIdList);
							if(exisitingFacilityData != null && !exisitingFacilityData.isEmpty()){
								for(FacilityData existingData : exisitingFacilityData){
									for(FacilityDataModel facilityDataModel : facilityDataList){
										if( (facilityDataModel.getC5().intValue() == existingData.getArea().getAreaNId().intValue())
												&& (facilityDataModel.getC7().equals(sdf.format(existingData.getC7()))) ){
											FacilityErrorModel errorModel = new FacilityErrorModel();
											errorModel.setId(facilityDataModel.getC5().toString());
											errorModel.setErrorMessage("Data exist");
											facilityErrorModels.add(errorModel);
											dummyFacilityList.add(facilityDataModel);
										}
									}
								}
								facilityDataList.removeAll(dummyFacilityList);
							}
						}
						
						if(communityDataList != null && !communityDataList.isEmpty()){
							for(CommunityDataModel communityDataModel : communityDataList){
								Date visitDate = sdf.parse(communityDataModel.getDate());
								DateTime datetime1 = new DateTime(visitDate);
								int visitMonth = datetime1.getMonthOfYear();
								int monthDifference = currentMonth - visitMonth;
								int yearDifference = currentYear - datetime1.getYear();
								CommunityErrorModel errorModel = new CommunityErrorModel();
								
								if(!(facilityIdList.contains(communityDataModel.getFacilityId())) && !isCountryAdmin){
									errorModel.setId(communityDataModel.getFacilityId().toString());
									errorModel.setErrorMessage("Unauthorized Data Entry.");
									communityErrorModels.add(errorModel);
									dummyCommunityList.add(communityDataModel);
									
									logger.info("Commmunity checklist rejected! cause: Unauthorized Data Entry. user id: " + 
											user.getId() + ", facility: " + communityDataModel.getFacilityId());
								}else if(yearDifference < 0 || monthDifference < 0){
									errorModel.setId(communityDataModel.getFacilityId().toString());
									errorModel.setErrorMessage("Future date submissions not allowed.");
									communityErrorModels.add(errorModel);
									dummyCommunityList.add(communityDataModel);
									
									logger.info("Community checklist rejected! cause: Future date. user id: " + 
											user.getId() + ", facility: " + communityDataModel.getFacilityId());
								}
								else if( (yearDifference > 0) || (monthDifference == 1 && currentDay > 7) || (monthDifference > 1 )){
									errorModel.setId(communityDataModel.getFacilityId().toString());
									errorModel.setErrorMessage("Submission date exceeded.");
									communityErrorModels.add(errorModel);
									dummyCommunityList.add(communityDataModel);
									
									logger.info("Community checklist rejected! cause: Submission date exceeded. user id: " + 
											user.getId() + ", facility: " + communityDataModel.getFacilityId());
								}
							}
							communityDataList.removeAll(dummyCommunityList);
						}
						
						syncResult.setFacilityErrorModels(facilityErrorModels);
						syncResult.setFacilityRecordsSynced(facilityDataList.size());
						
						List<PlanOfAction> planOfActionList = new ArrayList<>();
						
						Integer facilityFormId = Integer.parseInt(messages.getMessage(Constants.Mobile.FORM_TYPE_FACILITY_CHECKLIST, null, null));
						Integer communityFormId = Integer.parseInt(messages.getMessage(Constants.Mobile.FORM_TYPE_COMMUNITY_CHECKLIST, null, null));
						
						if(facilityDataList != null && !facilityDataList.isEmpty()){
							
							List<Integer> poaFacilityList = new ArrayList<>(); // to make previous records in plan of action false.
							
							for(FacilityDataModel facilityDataModel : facilityDataList){
								FacilityData facilityData = new FacilityData();
								
								if(facilityDataModel.getC43() != null){
									facilityData.setArea(new Area(facilityDataModel.getC5()));
									facilityData.setStateName(facilityDataModel.getState() == null ? null : facilityDataModel.getState());
									facilityData.setC1(facilityDataModel.getC1() == null ? null : facilityDataModel.getC1());
									facilityData.setC11	(facilityDataModel.getC11() == null ? null : facilityDataModel.getC11());
									facilityData.setC13(facilityDataModel.getC13() == null ? null : facilityDataModel.getC13());
									facilityData.setC2(facilityDataModel.getC2() == null ? null : facilityDataModel.getC2());
									facilityData.setC3(facilityDataModel.getC3() == null ? null : facilityDataModel.getC3());
									facilityData.setC31(facilityDataModel.getC31() == null ? null : facilityDataModel.getC31());
									facilityData.setDistrict(facilityDataModel.getDistrict() == null ? null : facilityDataModel.getDistrict());
									facilityData.setBlock(facilityDataModel.getBlock() == null ? null : facilityDataModel.getBlock());
									facilityData.setC43(new TypeDetail(facilityDataModel.getC43()));
									facilityData.setC51(facilityDataModel.getC51() == null ? null : facilityDataModel.getC51());
									facilityData.setC6(facilityDataModel.getC6() == null ? null : facilityDataModel.getC6());
									facilityData.setC7(facilityDataModel.getC7() == null ? null : sdf.parse(facilityDataModel.getC7()));
									facilityData.setC8(facilityDataModel.getC8() == null ? null : facilityDataModel.getC8());
									facilityData.setC9(facilityDataModel.getC9() == null ? null : facilityDataModel.getC9());								
									facilityData.setD1(facilityDataModel.getD1() == null ? null : facilityDataModel.getD1());
									facilityData.setD2(facilityDataModel.getD2() == null ? null : facilityDataModel.getD2());
									facilityData.setD3(facilityDataModel.getD3() == null ? null : facilityDataModel.getD3());
									facilityData.setD41(facilityDataModel.getD41() == null ? null : facilityDataModel.getD41());
									facilityData.setD42(facilityDataModel.getD42() == null ? null : facilityDataModel.getD42());
									facilityData.setD43(facilityDataModel.getD43() == null ? null : facilityDataModel.getD43());
									facilityData.setD44	(facilityDataModel.getD44() == null ? null : facilityDataModel.getD44());
									facilityData.setD51(facilityDataModel.getD51() == null ? null : facilityDataModel.getD51());
									facilityData.setD52(facilityDataModel.getD52() == null ? null : facilityDataModel.getD52());
									facilityData.setD53(facilityDataModel.getD53() == null ? null : facilityDataModel.getD53());
									facilityData.setD54(facilityDataModel.getD54() == null ? null : facilityDataModel.getD54());
									facilityData.setD55(facilityDataModel.getD55() == null ? null : facilityDataModel.getD55());
									facilityData.setD56(facilityDataModel.getD56() == null ? null : facilityDataModel.getD56());
									facilityData.setD57(facilityDataModel.getD57() == null ? null : facilityDataModel.getD57());
									facilityData.setD58(facilityDataModel.getD58() == null ? null : facilityDataModel.getD58());
									facilityData.setD61(facilityDataModel.getD61() == null ? null : facilityDataModel.getD61());
									facilityData.setD62(facilityDataModel.getD62() == null ? null : facilityDataModel.getD62());
									facilityData.setD71(facilityDataModel.getD71() == null ? null : facilityDataModel.getD71());
									facilityData.setD72(facilityDataModel.getD72() == null ? null : facilityDataModel.getD72());
									facilityData.setD73(facilityDataModel.getD73() == null ? null : facilityDataModel.getD73());
									facilityData.setD74(facilityDataModel.getD74() == null ? null : facilityDataModel.getD74());
									facilityData.setD8(facilityDataModel.getD8() == null ? null : facilityDataModel.getD8());
									facilityData.setD91(facilityDataModel.getD91() == null ? null : facilityDataModel.getD91());
									facilityData.setD92(facilityDataModel.getD92() == null ? null : facilityDataModel.getD92());
									facilityData.setD93(facilityDataModel.getD93() == null ? null : facilityDataModel.getD93());
									facilityData.setD94(facilityDataModel.getD94() == null ? null : facilityDataModel.getD94());
									facilityData.setD101(facilityDataModel.getD101() == null ? null : facilityDataModel.getD101());
									facilityData.setD102(facilityDataModel.getD102() == null ? null : facilityDataModel.getD102());
									facilityData.setD103(facilityDataModel.getD103() == null ? null : facilityDataModel.getD103());
									facilityData.setD104(facilityDataModel.getD104() == null ? null : facilityDataModel.getD104());
									facilityData.setD11(facilityDataModel.getD11() == null ? null : facilityDataModel.getD11());
									facilityData.setD121(facilityDataModel.getD121() == null ? null : facilityDataModel.getD121());
									facilityData.setD122(facilityDataModel.getD122() == null ? null : facilityDataModel.getD122());
									facilityData.setD131(facilityDataModel.getD131() == null ? null : facilityDataModel.getD131());
									facilityData.setD132(facilityDataModel.getD132() == null ? null : facilityDataModel.getD132());
									facilityData.setD133(facilityDataModel.getD133() == null ? null : facilityDataModel.getD133());
									facilityData.setD134(facilityDataModel.getD134() == null ? null : facilityDataModel.getD134());
									facilityData.setD135(facilityDataModel.getD135() == null ? null : facilityDataModel.getD135());
									facilityData.setD136(facilityDataModel.getD136() == null ? null : facilityDataModel.getD136());
									facilityData.setD137(facilityDataModel.getD137() == null ? null : facilityDataModel.getD137());
									facilityData.setD138(facilityDataModel.getD138() == null ? null : facilityDataModel.getD138());
									facilityData.setD141(facilityDataModel.getD141() == null ? null : facilityDataModel.getD141());
									facilityData.setD142(facilityDataModel.getD142() == null ? null : facilityDataModel.getD142());
									facilityData.setD143(facilityDataModel.getD143() == null ? null : facilityDataModel.getD143());
									facilityData.setD144(facilityDataModel.getD144() == null ? null : facilityDataModel.getD144());
									facilityData.setD145(facilityDataModel.getD145() == null ? null : facilityDataModel.getD145());
									facilityData.setD146(facilityDataModel.getD146() == null ? null : facilityDataModel.getD146());
									facilityData.setD151(facilityDataModel.getD151() == null ? null : facilityDataModel.getD151());
									facilityData.setD152(facilityDataModel.getD152() == null ? null : facilityDataModel.getD152());
									facilityData.setD153(facilityDataModel.getD153() == null ? null : facilityDataModel.getD153());
									facilityData.setD161(facilityDataModel.getD161() == null ? null : facilityDataModel.getD161());
									facilityData.setD162(facilityDataModel.getD162() == null ? null : facilityDataModel.getD162());
									facilityData.setD171(facilityDataModel.getD171() == null ? null : facilityDataModel.getD171());
									facilityData.setD172(facilityDataModel.getD172() == null ? null : facilityDataModel.getD172());
									facilityData.setE111(facilityDataModel.getE111() == null ? null : facilityDataModel.getE111());
									facilityData.setE112(facilityDataModel.getE112() == null ? null : facilityDataModel.getE112());
									facilityData.setE121(facilityDataModel.getE121() == null ? null : facilityDataModel.getE121());
									facilityData.setE122(facilityDataModel.getE122() == null ? null : facilityDataModel.getE122());
									facilityData.setE13(facilityDataModel.getE13() == null ? null : facilityDataModel.getE13());
									facilityData.setE14(facilityDataModel.getE14() == null ? null : facilityDataModel.getE14());
									facilityData.setE15(facilityDataModel.getE15() == null ? null : facilityDataModel.getE15());
									facilityData.setE16(facilityDataModel.getE16() == null ? null : facilityDataModel.getE16());
									facilityData.setE17(facilityDataModel.getE17() == null ? null : facilityDataModel.getE17());
									facilityData.setE21(facilityDataModel.getE21() == null ? null : facilityDataModel.getE21());
									facilityData.setE22(facilityDataModel.getE22() == null ? null : facilityDataModel.getE22());
									facilityData.setE23(facilityDataModel.getE23() == null ? null : facilityDataModel.getE23());
									facilityData.setE24(facilityDataModel.getE24() == null ? null : facilityDataModel.getE24());
									facilityData.setE25(facilityDataModel.getE25() == null ? null : facilityDataModel.getE25());
									facilityData.setE26(facilityDataModel.getE26() == null ? null : facilityDataModel.getE26());
									facilityData.setE27(facilityDataModel.getE27() == null ? null : facilityDataModel.getE27());
									facilityData.setE28(facilityDataModel.getE28() == null ? null : facilityDataModel.getE28());
									facilityData.setE29(facilityDataModel.getE29() == null ? null : facilityDataModel.getE29());
									facilityData.setE210(facilityDataModel.getE210() == null ? null : facilityDataModel.getE210());
									facilityData.setE211(facilityDataModel.getE211() == null ? null : facilityDataModel.getE211());
									facilityData.setE212(facilityDataModel.getE212() == null ? null : facilityDataModel.getE212());
									facilityData.setE213(facilityDataModel.getE213() == null ? null : facilityDataModel.getE213());
									facilityData.setE214(facilityDataModel.getE214() == null ? null : facilityDataModel.getE214());
									facilityData.setE215(facilityDataModel.getE215() == null ? null : facilityDataModel.getE215());
									facilityData.setE216(facilityDataModel.getE216() == null ? null : facilityDataModel.getE216());
									facilityData.setE217(facilityDataModel.getE217() == null ? null : facilityDataModel.getE217());
									facilityData.setE218(facilityDataModel.getE218() == null ? null : facilityDataModel.getE218());
									facilityData.setE219(facilityDataModel.getE219() == null ? null : facilityDataModel.getE219());
									facilityData.setE220(facilityDataModel.getE220() == null ? null : facilityDataModel.getE220());
									facilityData.setE221(facilityDataModel.getE221() == null ? null : facilityDataModel.getE221());
									facilityData.setE222(facilityDataModel.getE222() == null ? null : facilityDataModel.getE222());
									facilityData.setE223(facilityDataModel.getE223() == null ? null : facilityDataModel.getE223());
									facilityData.setE224(facilityDataModel.getE224() == null ? null : facilityDataModel.getE224());
									facilityData.setE225(facilityDataModel.getE225() == null ? null : facilityDataModel.getE225());
									facilityData.setE226(facilityDataModel.getE226() == null ? null : facilityDataModel.getE226());
									facilityData.setE227(facilityDataModel.getE227() == null ? null : facilityDataModel.getE227());
									facilityData.setE228(facilityDataModel.getE228() == null ? null : facilityDataModel.getE228());
									facilityData.setE229(facilityDataModel.getE229() == null ? null : facilityDataModel.getE229());
									facilityData.setE230(facilityDataModel.getE230() == null ? null : facilityDataModel.getE230());
									facilityData.setE231(facilityDataModel.getE231() == null ? null : facilityDataModel.getE231());
									facilityData.setE232(facilityDataModel.getE232() == null ? null : facilityDataModel.getE232());
									facilityData.setE233(facilityDataModel.getE233() == null ? null : facilityDataModel.getE233());
									facilityData.setE234(facilityDataModel.getE234() == null ? null : facilityDataModel.getE234());
									facilityData.setE235(facilityDataModel.getE235() == null ? null : facilityDataModel.getE235());
									facilityData.setE236(facilityDataModel.getE236() == null ? null : facilityDataModel.getE236());
									facilityData.setE31(facilityDataModel.getE31() == null ? null : facilityDataModel.getE31());
									facilityData.setE32(facilityDataModel.getE32() == null ? null : facilityDataModel.getE32());
									facilityData.setE33(facilityDataModel.getE33() == null ? null : facilityDataModel.getE33());
									facilityData.setE341(facilityDataModel.getE341() == null ? null : facilityDataModel.getE341());
									facilityData.setE342(facilityDataModel.getE342() == null ? null : facilityDataModel.getE342());
									facilityData.setE351(facilityDataModel.getE351() == null ? null : facilityDataModel.getE351());
									facilityData.setE352(facilityDataModel.getE352() == null ? null : facilityDataModel.getE352());
									facilityData.setE36(facilityDataModel.getE36() == null ? null : facilityDataModel.getE36());
									facilityData.setE37(facilityDataModel.getE37() == null ? null : facilityDataModel.getE37());
									facilityData.setE38(facilityDataModel.getE38() == null ? null : facilityDataModel.getE38());
									facilityData.setE39(facilityDataModel.getE39() == null ? null : facilityDataModel.getE39());
									facilityData.setE310(facilityDataModel.getE310() == null ? null : facilityDataModel.getE310());
									facilityData.setE311(facilityDataModel.getE311() == null ? null : facilityDataModel.getE311());
									facilityData.setE312(facilityDataModel.getE312() == null ? null : facilityDataModel.getE312());
									facilityData.setE313(facilityDataModel.getE313() == null ? null : facilityDataModel.getE313());
									facilityData.setE41(facilityDataModel.getE41() == null ? null : facilityDataModel.getE41());
									facilityData.setE42(facilityDataModel.getE42() == null ? null : facilityDataModel.getE42());
									facilityData.setE43(facilityDataModel.getE43() == null ? null : facilityDataModel.getE43());
									facilityData.setE44(facilityDataModel.getE44() == null ? null : facilityDataModel.getE44());
									facilityData.setE45(facilityDataModel.getE45() == null ? null : facilityDataModel.getE45());
									facilityData.setE46(facilityDataModel.getE46() == null ? null : facilityDataModel.getE46());
									facilityData.setE47(facilityDataModel.getE47() == null ? null : facilityDataModel.getE47());
									facilityData.setE51(facilityDataModel.getE51() == null ? null : facilityDataModel.getE51());
									facilityData.setE52(facilityDataModel.getE52() == null ? null : facilityDataModel.getE52());
									facilityData.setE53(facilityDataModel.getE53() == null ? null : facilityDataModel.getE53());
									facilityData.setE54(facilityDataModel.getE54() == null ? null : facilityDataModel.getE54());
									facilityData.setE55(facilityDataModel.getE55() == null ? null : facilityDataModel.getE55());
									facilityData.setE56(facilityDataModel.getE56() == null ? null : facilityDataModel.getE56());
									facilityData.setE57(facilityDataModel.getE57() == null ? null : facilityDataModel.getE57());
									facilityData.setE58(facilityDataModel.getE58() == null ? null : facilityDataModel.getE58());
									facilityData.setE59(facilityDataModel.getE59() == null ? null : facilityDataModel.getE59());
									facilityData.setE510(facilityDataModel.getE510() == null ? null : facilityDataModel.getE510());
									facilityData.setE511(facilityDataModel.getE511() == null ? null : facilityDataModel.getE511());
									facilityData.setE512(facilityDataModel.getE512() == null ? null : facilityDataModel.getE512());
									facilityData.setE513(facilityDataModel.getE513() == null ? null : facilityDataModel.getE513());
									facilityData.setE61(facilityDataModel.getE61() == null ? null : facilityDataModel.getE61());
									facilityData.setE62(facilityDataModel.getE62() == null ? null : facilityDataModel.getE62());
									facilityData.setE63(facilityDataModel.getE63() == null ? null : facilityDataModel.getE63());
									facilityData.setE64(facilityDataModel.getE64() == null ? null : facilityDataModel.getE64());
									facilityData.setE65(facilityDataModel.getE65() == null ? null : facilityDataModel.getE65());
									facilityData.setE66(facilityDataModel.getE66() == null ? null : facilityDataModel.getE66());
									facilityData.setE67(facilityDataModel.getE67() == null ? null : facilityDataModel.getE67());
									facilityData.setE71(facilityDataModel.getE71() == null ? null : facilityDataModel.getE71());
									facilityData.setE72(facilityDataModel.getE72() == null ? null : facilityDataModel.getE72());
									facilityData.setE73(facilityDataModel.getE73() == null ? null : facilityDataModel.getE73());
									facilityData.setE74(facilityDataModel.getE74() == null ? null : facilityDataModel.getE74());
									facilityData.setE75(facilityDataModel.getE75() == null ? null : facilityDataModel.getE75());
									facilityData.setE76(facilityDataModel.getE76() == null ? null : facilityDataModel.getE76());
									facilityData.setE77(facilityDataModel.getE77() == null ? null : facilityDataModel.getE77());
									facilityData.setE81(facilityDataModel.getE81() == null ? null : facilityDataModel.getE81());
									facilityData.setE82(facilityDataModel.getE82() == null ? null : facilityDataModel.getE82());
									facilityData.setE83(facilityDataModel.getE83() == null ? null : facilityDataModel.getE83());
									facilityData.setE84(facilityDataModel.getE84() == null ? null : facilityDataModel.getE84());
									facilityData.setE85(facilityDataModel.getE85() == null ? null : facilityDataModel.getE85());
									facilityData.setE86(facilityDataModel.getE86() == null ? null : facilityDataModel.getE86());
									facilityData.setE87(facilityDataModel.getE87() == null ? null : facilityDataModel.getE87());
									facilityData.setE88(facilityDataModel.getE88() == null ? null : facilityDataModel.getE88());
									facilityData.setE91(facilityDataModel.getE91() == null ? null : facilityDataModel.getE91());
									facilityData.setE92(facilityDataModel.getE92() == null ? null : facilityDataModel.getE92());
									facilityData.setE93(facilityDataModel.getE93() == null ? null : facilityDataModel.getE93());
									facilityData.setE94(facilityDataModel.getE94() == null ? null : facilityDataModel.getE94());
									facilityData.setE101(facilityDataModel.getE101() == null ? null : facilityDataModel.getE101());
									facilityData.setE102(facilityDataModel.getE102() == null ? null : facilityDataModel.getE102());
									facilityData.setE103(facilityDataModel.getE103() == null ? null : facilityDataModel.getE103());
									facilityData.setE104(facilityDataModel.getE104() == null ? null : facilityDataModel.getE104());
									facilityData.setE105(facilityDataModel.getE105() == null ? null : facilityDataModel.getE105());
									facilityData.setE106(facilityDataModel.getE106() == null ? null : facilityDataModel.getE106());
									facilityData.setE107(facilityDataModel.getE107() == null ? null : facilityDataModel.getE107());
									facilityData.setE108(facilityDataModel.getE108() == null ? null : facilityDataModel.getE108());
									facilityData.setE109(facilityDataModel.getE109() == null ? null : facilityDataModel.getE109());
									facilityData.setE1010(facilityDataModel.getE1010() == null ? null : facilityDataModel.getE1010());
									facilityData.setE1011(facilityDataModel.getE1011() == null ? null : facilityDataModel.getE1011());
									facilityData.setE11g1(facilityDataModel.getE11g1() == null ? null : facilityDataModel.getE11g1());
									facilityData.setE1111(facilityDataModel.getE1111() == null ? null : facilityDataModel.getE1111());
									facilityData.setE1112(facilityDataModel.getE1112() == null ? null : facilityDataModel.getE1112());
									facilityData.setE1113(facilityDataModel.getE1113() == null ? null : facilityDataModel.getE1113());
									facilityData.setE1114(facilityDataModel.getE1114() == null ? null : facilityDataModel.getE1114());
									facilityData.setE1115(facilityDataModel.getE1115() == null ? null : facilityDataModel.getE1115());
									facilityData.setE11g2(facilityDataModel.getE11g2() == null ? null : facilityDataModel.getE11g2());
									facilityData.setE1121(facilityDataModel.getE1121() == null ? null : facilityDataModel.getE1121());
									facilityData.setE1122(facilityDataModel.getE1122() == null ? null : facilityDataModel.getE1122());
									facilityData.setE1123(facilityDataModel.getE1123() == null ? null : facilityDataModel.getE1123());
									facilityData.setE1124(facilityDataModel.getE1124() == null ? null : facilityDataModel.getE1124());
									facilityData.setE1125(facilityDataModel.getE1125() == null ? null : facilityDataModel.getE1125());
									facilityData.setE11g3(facilityDataModel.getE11g3() == null ? null : facilityDataModel.getE11g3());
									facilityData.setE1131(facilityDataModel.getE1131() == null ? null : facilityDataModel.getE1131());
									facilityData.setE1132(facilityDataModel.getE1132() == null ? null : facilityDataModel.getE1132());
									facilityData.setE1133(facilityDataModel.getE1133() == null ? null : facilityDataModel.getE1133());
									facilityData.setE1134(facilityDataModel.getE1134() == null ? null : facilityDataModel.getE1134());
									facilityData.setE1135(facilityDataModel.getE1135() == null ? null : facilityDataModel.getE1135());
									facilityData.setE11g4(facilityDataModel.getE11g4() == null ? null : facilityDataModel.getE11g4());
									facilityData.setE1141(facilityDataModel.getE1141() == null ? null : facilityDataModel.getE1141());
									facilityData.setE1145(facilityDataModel.getE1145() == null ? null : facilityDataModel.getE1145());
									facilityData.setNote_SC_1(facilityDataModel.getNote_SC_1() == null ? null : facilityDataModel.getNote_SC_1());
									facilityData.setNote_Non_24x7_PHC_1(facilityDataModel.getNote_Non_24x7_PHC_1() == null ? null : facilityDataModel.getNote_Non_24x7_PHC_1());
									facilityData.setNote_24x7_PHC_1(facilityDataModel.getNote_24x7_PHC_1() == null ? null : facilityDataModel.getNote_24x7_PHC_1());
									facilityData.setNote_Non_FRU_CHC_1(facilityDataModel.getNote_Non_FRU_CHC_1() == null ? null : facilityDataModel.getNote_Non_FRU_CHC_1());
									facilityData.setNote_FRU_CHC_1(facilityDataModel.getNote_FRU_CHC_1() == null ? null : facilityDataModel.getNote_FRU_CHC_1());
									facilityData.setNote_SDH_1(facilityDataModel.getNote_SDH_1() == null ? null : facilityDataModel.getNote_SDH_1());
									facilityData.setNote_DH_1(facilityDataModel.getNote_DH_1() == null ? null : facilityDataModel.getNote_DH_1());
									facilityData.setNote_Area_Hospital_1(facilityDataModel.getNote_Area_Hospital_1() == null ? null : facilityDataModel.getNote_Area_Hospital_1());
									facilityData.setNote_MC_1(facilityDataModel.getNote_MC_1() == null ? null : facilityDataModel.getNote_MC_1());
									facilityData.setF11(facilityDataModel.getF11() == null ? null : facilityDataModel.getF11());
									facilityData.setF12(facilityDataModel.getF12() == null ? null : facilityDataModel.getF12());
									facilityData.setF13(facilityDataModel.getF13() == null ? null : facilityDataModel.getF13());
									facilityData.setF14(facilityDataModel.getF14() == null ? null : facilityDataModel.getF14());
									facilityData.setF15(facilityDataModel.getF15() == null ? null : facilityDataModel.getF15());
									facilityData.setF16(facilityDataModel.getF16() == null ? null : facilityDataModel.getF16());
									facilityData.setF17(facilityDataModel.getF17() == null ? null : facilityDataModel.getF17());
									facilityData.setF18(facilityDataModel.getF18() == null ? null : facilityDataModel.getF18());
									facilityData.setF19(facilityDataModel.getF19() == null ? null : facilityDataModel.getF19());
									facilityData.setF110(facilityDataModel.getF110() == null ? null : facilityDataModel.getF110());
									facilityData.setF111(facilityDataModel.getF111() == null ? null : facilityDataModel.getF111());
									facilityData.setF21(facilityDataModel.getF21() == null ? null : facilityDataModel.getF21());
									facilityData.setF22(facilityDataModel.getF22() == null ? null : facilityDataModel.getF22());
									facilityData.setF23(facilityDataModel.getF23() == null ? null : facilityDataModel.getF23());
									facilityData.setF24(facilityDataModel.getF24() == null ? null : facilityDataModel.getF24());
									facilityData.setF25(facilityDataModel.getF25() == null ? null : facilityDataModel.getF25());
									facilityData.setF26(facilityDataModel.getF26() == null ? null : facilityDataModel.getF26());
									facilityData.setF27(facilityDataModel.getF27() == null ? null : facilityDataModel.getF27());
									facilityData.setF28(facilityDataModel.getF28() == null ? null : facilityDataModel.getF28());
									facilityData.setF29(facilityDataModel.getF29() == null ? null : facilityDataModel.getF29());
									facilityData.setF210(facilityDataModel.getF210() == null ? null : facilityDataModel.getF210());
									facilityData.setF31(facilityDataModel.getF31() == null ? null : facilityDataModel.getF31());
									facilityData.setF32(facilityDataModel.getF32() == null ? null : facilityDataModel.getF32());
									facilityData.setF33(facilityDataModel.getF33() == null ? null : facilityDataModel.getF33());
									facilityData.setF34(facilityDataModel.getF34() == null ? null : facilityDataModel.getF34());
									facilityData.setF35(facilityDataModel.getF35() == null ? null : facilityDataModel.getF35());
									facilityData.setF36(facilityDataModel.getF36() == null ? null : facilityDataModel.getF36());
									facilityData.setF37(facilityDataModel.getF37() == null ? null : facilityDataModel.getF37());
									facilityData.setF38(facilityDataModel.getF38() == null ? null : facilityDataModel.getF38());
									facilityData.setF39(facilityDataModel.getF39() == null ? null : facilityDataModel.getF39());
									facilityData.setF310(facilityDataModel.getF310() == null ? null : facilityDataModel.getF310());
									facilityData.setF41(facilityDataModel.getF41() == null ? null : facilityDataModel.getF41());
									facilityData.setF42(facilityDataModel.getF42() == null ? null : facilityDataModel.getF42());
									facilityData.setF43(facilityDataModel.getF43() == null ? null : facilityDataModel.getF43());
									facilityData.setF44(facilityDataModel.getF44() == null ? null : facilityDataModel.getF44());
									facilityData.setF45(facilityDataModel.getF45() == null ? null : facilityDataModel.getF45());
									facilityData.setF51(facilityDataModel.getF51() == null ? null : facilityDataModel.getF51());
									facilityData.setF52(facilityDataModel.getF52() == null ? null : facilityDataModel.getF52());
									facilityData.setF53(facilityDataModel.getF53() == null ? null : facilityDataModel.getF53());
									facilityData.setF54(facilityDataModel.getF54() == null ? null : facilityDataModel.getF54());
									facilityData.setF55(facilityDataModel.getF55() == null ? null : facilityDataModel.getF55());
									facilityData.setF56(facilityDataModel.getF56() == null ? null : facilityDataModel.getF56());
									facilityData.setF57(facilityDataModel.getF57() == null ? null : facilityDataModel.getF57());
									facilityData.setF58(facilityDataModel.getF58() == null ? null : facilityDataModel.getF58());
									facilityData.setF61(facilityDataModel.getF61() == null ? null : facilityDataModel.getF61());
									facilityData.setF62(facilityDataModel.getF62() == null ? null : facilityDataModel.getF62());
									facilityData.setF63(facilityDataModel.getF63() == null ? null : facilityDataModel.getF63());
									facilityData.setF64(facilityDataModel.getF64() == null ? null : facilityDataModel.getF64());
									facilityData.setF65(facilityDataModel.getF65() == null ? null : facilityDataModel.getF65());
									facilityData.setF66(facilityDataModel.getF66() == null ? null : facilityDataModel.getF66());
									facilityData.setF71(facilityDataModel.getF71() == null ? null : facilityDataModel.getF71());
									facilityData.setF72(facilityDataModel.getF72() == null ? null : facilityDataModel.getF72());
									facilityData.setF73(facilityDataModel.getF73() == null ? null : facilityDataModel.getF73());
									facilityData.setF74(facilityDataModel.getF74() == null ? null : facilityDataModel.getF74());
									facilityData.setF75(facilityDataModel.getF75() == null ? null : facilityDataModel.getF75());
									facilityData.setF76(facilityDataModel.getF76() == null ? null : facilityDataModel.getF76());
									facilityData.setF77(facilityDataModel.getF77() == null ? null : facilityDataModel.getF77());
									facilityData.setF78(facilityDataModel.getF78() == null ? null : facilityDataModel.getF78());
									facilityData.setF79(facilityDataModel.getF79() == null ? null : facilityDataModel.getF79());
									facilityData.setF710(facilityDataModel.getF710() == null ? null : facilityDataModel.getF710());
									facilityData.setF711(facilityDataModel.getF711() == null ? null : facilityDataModel.getF711());
									facilityData.setNote_SC_2(facilityDataModel.getNote_SC_2() == null ? null : facilityDataModel.getNote_SC_2());
									facilityData.setNote_Non_24x7_PHC_2(facilityDataModel.getNote_Non_24x7_PHC_2() == null ? null : facilityDataModel.getNote_Non_24x7_PHC_2());
									facilityData.setNote_24x7_PHC_2(facilityDataModel.getNote_24x7_PHC_2() == null ? null : facilityDataModel.getNote_24x7_PHC_2());
									facilityData.setNote_Non_FRU_CHC_2(facilityDataModel.getNote_Non_FRU_CHC_2() == null ? null : facilityDataModel.getNote_Non_FRU_CHC_2());
									facilityData.setNote_FRU_CHC_2(facilityDataModel.getNote_FRU_CHC_2() == null ? null : facilityDataModel.getNote_FRU_CHC_2());
									facilityData.setNote_SDH_2(facilityDataModel.getNote_SDH_2() == null ? null : facilityDataModel.getNote_SDH_2());
									facilityData.setNote_DH_2(facilityDataModel.getNote_DH_2() == null ? null : facilityDataModel.getNote_DH_2());
									facilityData.setNote_Area_Hospital_2(facilityDataModel.getNote_Area_Hospital_2() == null ? null : facilityDataModel.getNote_Area_Hospital_2());
									facilityData.setNote_MC_2(facilityDataModel.getNote_MC_2() == null ? null : facilityDataModel.getNote_MC_2());
									facilityData.setNote_SC(facilityDataModel.getNote_SC() == null ? null : facilityDataModel.getNote_SC());
									facilityData.setNote_Non_24x7_PHC(facilityDataModel.getNote_Non_24x7_PHC() == null ? null : facilityDataModel.getNote_Non_24x7_PHC());
									facilityData.setNote_24x7_PHC(facilityDataModel.getNote_24x7_PHC() == null ? null : facilityDataModel.getNote_24x7_PHC());
									facilityData.setNote_Non_FRU_CHC(facilityDataModel.getNote_Non_FRU_CHC() == null ? null : facilityDataModel.getNote_Non_FRU_CHC());
									facilityData.setNote_FRU_CHC(facilityDataModel.getNote_FRU_CHC() == null ? null : facilityDataModel.getNote_FRU_CHC());
									facilityData.setNote_SDH(facilityDataModel.getNote_SDH() == null ? null : facilityDataModel.getNote_SDH());
									facilityData.setNote_DH(facilityDataModel.getNote_DH() == null ? null : facilityDataModel.getNote_DH());
									facilityData.setNote_Area_Hospital(facilityDataModel.getNote_Area_Hospital() == null ? null : facilityDataModel.getNote_Area_Hospital());
									facilityData.setNote_MC(facilityDataModel.getNote_MC() == null ? null : facilityDataModel.getNote_MC());
									facilityData.setMajor(facilityDataModel.getMajor() == null ? null : facilityDataModel.getMajor());
									facilityData.setAction(facilityDataModel.getAction() == null ? null : facilityDataModel.getAction());
									facilityData.setF_img(facilityDataModel.getF_img() == null ? null : getPhotoPath(facilityDataModel.getF_img(), 
											facilityDataModel.getC5().toString() , messages.getMessage(Constants.Web.FACILITY_CHECKLIST_NAME, null, null)));
									facilityData.setS_img(facilityDataModel.getS_img() == null ? null : getPhotoPath(facilityDataModel.getS_img(), 
											facilityDataModel.getC5().toString() , messages.getMessage(Constants.Web.FACILITY_CHECKLIST_NAME, null, null)));
									facilityData.setGeopoint(facilityDataModel.getGeopoint() == null ? null : facilityDataModel.getGeopoint());
									facilityData.setImg1(facilityDataModel.getImg1() == null ? null : getPhotoPath(facilityDataModel.getImg1(), 
											facilityDataModel.getC5().toString() , messages.getMessage(Constants.Web.FACILITY_CHECKLIST_NAME, null, null)));
									facilityData.setImg2(facilityDataModel.getImg2() == null ? null : getPhotoPath(facilityDataModel.getImg2(), 
											facilityDataModel.getC5().toString() , messages.getMessage(Constants.Web.FACILITY_CHECKLIST_NAME, null, null)));
									facilityData.setImg3(facilityDataModel.getImg3() == null ? null : getPhotoPath(facilityDataModel.getImg3(), 
											facilityDataModel.getC5().toString() , messages.getMessage(Constants.Web.FACILITY_CHECKLIST_NAME, null, null)));
									facilityData.setDeviceid(facilityDataModel.getDeviceId() == null ? null : facilityDataModel.getDeviceId());
									facilityData.setE_RH_score(facilityDataModel.getE_RH_score() == null ? null : facilityDataModel.getE_RH_score());
									facilityData.setE_MHDS_score(facilityDataModel.getE_MHDS_score() == null ? null : facilityDataModel.getE_MHDS_score());
									facilityData.setE_NHDS_score(facilityDataModel.getE_NHDS_score() == null ? null : facilityDataModel.getE_NHDS_score());
									facilityData.setE_CHDS_score(facilityDataModel.getE_CHDS_score() == null ? null : facilityDataModel.getE_CHDS_score());
									facilityData.setE_Vaccines_score(facilityDataModel.getE_Vaccines_score() == null ? null : facilityDataModel.getE_Vaccines_score());
									facilityData.setE_Antibiotics_score(facilityDataModel.getE_Antibiotics_score() == null ? null : facilityDataModel.getE_Antibiotics_score());
									facilityData.setE_Infrastructure_score(facilityDataModel.getE_Infrastructure_score() == null ? null : facilityDataModel.getE_Infrastructure_score());
									facilityData.setE_IP_score(facilityDataModel.getE_IP_score() == null ? null : facilityDataModel.getE_IP_score());
									facilityData.setE_AHDS_score(facilityDataModel.getE_AHDS_score() == null ? null : facilityDataModel.getE_AHDS_score());
									facilityData.setE_OE_score(facilityDataModel.getE_OE_score() == null ? null : facilityDataModel.getE_OE_score());
									facilityData.setF_ANC_score(facilityDataModel.getF_ANC_score() == null ? null : facilityDataModel.getF_ANC_score());
									facilityData.setF_IPIP_score(facilityDataModel.getF_IPIP_score() == null ? null : facilityDataModel.getF_IPIP_score());
									facilityData.setF_ENCR_score(facilityDataModel.getF_ENCR_score() == null ? null : facilityDataModel.getF_ENCR_score());
									facilityData.setF_FP_score(facilityDataModel.getF_FP_score() == null ? null : facilityDataModel.getF_FP_score());
									facilityData.setF_CS_score(facilityDataModel.getF_CS_score() == null ? null : facilityDataModel.getF_CS_score());
									facilityData.setF_FMO_score(facilityDataModel.getF_FMO_score() == null ? null : facilityDataModel.getF_FMO_score());
									facilityData.setF_AH_score(facilityDataModel.getF_AH_score() == null ? null : facilityDataModel.getF_AH_score());
									facilityData.setE_total_score(facilityDataModel.getE_total_score() == null ? null : facilityDataModel.getE_total_score());
									facilityData.setF_total_score(facilityDataModel.getF_total_score() == null ? null : facilityDataModel.getF_total_score());
									facilityData.setUser(user);
									
									facilityData.sethA1(facilityDataModel.gethA1() == null ? null : facilityDataModel.gethA1());
									facilityData.sethA2(facilityDataModel.gethA2() == null ? null : facilityDataModel.gethA2());
									facilityData.sethA2p1(facilityDataModel.gethA2p1() == null ? null : facilityDataModel.gethA2p1());
									facilityData.sethA2p2(facilityDataModel.gethA2p2() == null ? null : facilityDataModel.gethA2p2());
									facilityData.sethA3(facilityDataModel.gethA3() == null ? null : facilityDataModel.gethA3());
									facilityData.sethA3p1(facilityDataModel.gethA3p1() == null ? null : facilityDataModel.gethA3p1());
									facilityData.sethB1(facilityDataModel.gethB1() == null ? null : facilityDataModel.gethB1());
									facilityData.sethB2(facilityDataModel.gethB2() == null ? null : facilityDataModel.gethB2());
									facilityData.sethC1(facilityDataModel.gethC1() == null ? null : facilityDataModel.gethC1());
									facilityData.sethC2(facilityDataModel.gethC2() == null ? null : facilityDataModel.gethC2());
									facilityData.sethD1(facilityDataModel.gethD1() == null ? null : facilityDataModel.gethD1());
									facilityData.sethE1(facilityDataModel.gethE1() == null ? null : facilityDataModel.gethE1());
									facilityData.sethE2p1(facilityDataModel.gethE2p1() == null ? null : facilityDataModel.gethE2p1());
									facilityData.sethE2p2(facilityDataModel.gethE2p2() == null ? null : facilityDataModel.gethE2p2());
									facilityData.sethE2p3(facilityDataModel.gethE2p3() == null ? null : facilityDataModel.gethE2p3());
									facilityData.sethE2p4(facilityDataModel.gethE2p4() == null ? null : facilityDataModel.gethE2p4());
									facilityData.sethE2p5(facilityDataModel.gethE2p5() == null ? null : facilityDataModel.gethE2p5());
									facilityData.sethE3p1(facilityDataModel.gethE3p1() == null ? null : facilityDataModel.gethE3p1());
									facilityData.sethE3p2(facilityDataModel.gethE3p2() == null ? null : facilityDataModel.gethE3p2());
									facilityData.sethE3p3(facilityDataModel.gethE3p3() == null ? null : facilityDataModel.gethE3p3());
									facilityData.sethE3p4(facilityDataModel.gethE3p4() == null ? null : facilityDataModel.gethE3p4());
									facilityData.sethE3p5(facilityDataModel.gethE3p5() == null ? null : facilityDataModel.gethE3p5());
									facilityData.sethF1(facilityDataModel.gethF1() == null ? null : facilityDataModel.gethF1());
									facilityData.sethF1p1(facilityDataModel.gethF1p1() == null ? null : facilityDataModel.gethF1p1());
									facilityData.sethF1p2(facilityDataModel.gethF1p2() == null ? null : facilityDataModel.gethF1p2());
									facilityData.sethF1p2p1(facilityDataModel.gethF1p2p1() == null ? null : facilityDataModel.gethF1p2p1());
									facilityData.sethF2(facilityDataModel.gethF2() == null ? null : facilityDataModel.gethF2());
									facilityData.setiA1(facilityDataModel.getiA1() == null ? null : facilityDataModel.getiA1());
									facilityData.setiA2(facilityDataModel.getiA2() == null ? null : facilityDataModel.getiA2());
									facilityData.setiB1(facilityDataModel.getiB1() == null ? null : facilityDataModel.getiB1());
									facilityData.setiB2(facilityDataModel.getiB2() == null ? null : facilityDataModel.getiB2());
									facilityData.setiB3(facilityDataModel.getiB3() == null ? null : facilityDataModel.getiB3());
									facilityData.setiB4(facilityDataModel.getiB4() == null ? null : facilityDataModel.getiB4());
									facilityData.setiB4p1(facilityDataModel.getiB4p1() == null ? null : facilityDataModel.getiB4p1());
									facilityData.setiC1(facilityDataModel.getiC1() == null ? null : facilityDataModel.getiC1());
									facilityData.setiC2(facilityDataModel.getiC2() == null ? null : facilityDataModel.getiC2());
									facilityData.setiC3(facilityDataModel.getiC3() == null ? null : facilityDataModel.getiC3());
									// for new checklist adding setter and getter
									facilityData.setiDA1(facilityDataModel.getiDA1() == null ? null : facilityDataModel.getiDA1());
									facilityData.setiDA2(facilityDataModel.getiDA2() == null ? null : facilityDataModel.getiDA2());
									facilityData.setiDA3(facilityDataModel.getiDA3() == null ? null : facilityDataModel.getiDA3());
									facilityData.setiDA3p1(facilityDataModel.getiDA3p1() == null ? null : facilityDataModel.getiDA3p1());
									facilityData.setiDA3p2(facilityDataModel.getiDA3p2() == null ? null : facilityDataModel.getiDA3p2());
									facilityData.setiDA3p3(facilityDataModel.getiDA3p3() == null ? null : facilityDataModel.getiDA3p3());
									facilityData.setiDA3p4(facilityDataModel.getiDA3p4() == null ? null : facilityDataModel.getiDA3p4());
									facilityData.setiDA3p5(facilityDataModel.getiDA3p5() == null ? null : facilityDataModel.getiDA3p5());
									facilityData.setiDA3p6(facilityDataModel.getiDA3p6() == null ? null : facilityDataModel.getiDA3p6());
									facilityData.setiDA3p7(facilityDataModel.getiDA3p7() == null ? null : facilityDataModel.getiDA3p7());
									facilityData.setiDB1(facilityDataModel.getiDB1() == null ? null : facilityDataModel.getiDB1());
									facilityData.setiDB2(facilityDataModel.getiDB2() == null ? null : facilityDataModel.getiDB2());
									facilityData.setiDB3(facilityDataModel.getiDB3() == null ? null : facilityDataModel.getiDB3());
									facilityData.setiDC1(facilityDataModel.getiDC1() == null ? null : facilityDataModel.getiDC1());
									facilityData.setiDC2(facilityDataModel.getiDC2() == null ? null : facilityDataModel.getiDC2());
									facilityData.setiDC3(facilityDataModel.getiDC3() == null ? null : facilityDataModel.getiDC3());
									facilityData.setiDD1(facilityDataModel.getiDD1() == null ? null : facilityDataModel.getiDD1());
									facilityData.setiDD2(facilityDataModel.getiDD2() == null ? null : facilityDataModel.getiDD2());
									facilityData.setiDD3(facilityDataModel.getiDD3() == null ? null : facilityDataModel.getiDD3());
									facilityData.setiDE1(facilityDataModel.getiDE1() == null ? null : facilityDataModel.getiDE1());
									facilityData.setiDE2(facilityDataModel.getiDE2() == null ? null : facilityDataModel.getiDE2());
									facilityData.setiDE3(facilityDataModel.getiDE3() == null ? null : facilityDataModel.getiDE3());
									facilityData.setiDE4(facilityDataModel.getiDE4() == null ? null : facilityDataModel.getiDE4());
									facilityData.setiDE5(facilityDataModel.getiDE5() == null ? null : facilityDataModel.getiDE5());
									facilityData.setiDE6(facilityDataModel.getiDE6() == null ? null : facilityDataModel.getiDE6());
									facilityData.setiE1(facilityDataModel.getiE1() == null ? null : facilityDataModel.getiE1());
									facilityData.setiE2(facilityDataModel.getiE2() == null ? null : facilityDataModel.getiE2());
									facilityData.setiE3(facilityDataModel.getiE3() == null ? null : facilityDataModel.getiE3());
									facilityData.setiE4(facilityDataModel.getiE4() == null ? null : facilityDataModel.getiE4());
									facilityData.setiE5(facilityDataModel.getiE5() == null ? null : facilityDataModel.getiE5());
									facilityData.setiE6(facilityDataModel.getiE6() == null ? null : facilityDataModel.getiE6());
									facilityData.setiF1(facilityDataModel.getiF1() == null ? null : facilityDataModel.getiF1());
									facilityData.setiF2(facilityDataModel.getiF2() == null ? null : facilityDataModel.getiF2());
									facilityData.setiF3(facilityDataModel.getiF3() == null ? null : facilityDataModel.getiF3());
									facilityData.setiF4(facilityDataModel.getiF4() == null ? null : facilityDataModel.getiF4());
									facilityData.setiG1(facilityDataModel.getiG1() == null ? null : facilityDataModel.getiG1());
									facilityData.setiG2(facilityDataModel.getiG2() == null ? null : facilityDataModel.getiG2());
									facilityData.setiG3(facilityDataModel.getiG3() == null ? null : facilityDataModel.getiG3());
									facilityData.setiG3p1(facilityDataModel.getiG3p1() == null ? null : facilityDataModel.getiG3p1());
									facilityData.setiG4(facilityDataModel.getiG4() == null ? null : facilityDataModel.getiG4());
									facilityData.setiG4p1(facilityDataModel.getiG4p1() == null ? null : facilityDataModel.getiG4p1());
									facilityData.setiG5(facilityDataModel.getiG5() == null ? null : facilityDataModel.getiG5());
									facilityData.setiG6(facilityDataModel.getiG6() == null ? null : facilityDataModel.getiG6());
									facilityData.setiH1(facilityDataModel.getiH1() == null ? null : facilityDataModel.getiH1());
									facilityData.setiH1p1(facilityDataModel.getiH1p1() == null ? null : facilityDataModel.getiH1p1());
									facilityData.setiH2(facilityDataModel.getiH2() == null ? null : facilityDataModel.getiH2());
									
									facilityData.setE_RH_score_max(facilityDataModel.getE_RH_score_max() == null ? null : facilityDataModel.getE_RH_score_max());
									facilityData.setE_MHDS_score_max(facilityDataModel.getE_MHDS_score_max() == null ? null : facilityDataModel.getE_MHDS_score_max());
									facilityData.setE_NHDS_score_max(facilityDataModel.getE_NHDS_score_max() == null ? null : facilityDataModel.getE_NHDS_score_max());
									facilityData.setE_CHDS_score_max(facilityDataModel.getE_CHDS_score_max() == null ? null : facilityDataModel.getE_CHDS_score_max());
									facilityData.setE_Vaccines_score_max(facilityDataModel.getE_Vaccines_score_max() == null ? null : facilityDataModel.getE_Vaccines_score_max());
									facilityData.setE_Antibiotics_score_max(facilityDataModel.getE_Antibiotics_score_max() == null ? null : facilityDataModel.getE_Antibiotics_score_max());
									facilityData.setE_Infrastructure_score_max(facilityDataModel.getE_Infrastructure_score_max() == null ? null : facilityDataModel.getE_Infrastructure_score_max());
									facilityData.setE_IP_score_max(facilityDataModel.getE_IP_score_max() == null ? null : facilityDataModel.getE_IP_score_max());
									facilityData.setE_AHDS_score_max(facilityDataModel.getE_AHDS_score_max() == null ? null : facilityDataModel.getE_AHDS_score_max());
									facilityData.setE_OE_score_max(facilityDataModel.getE_OE_score_max() == null ? null : facilityDataModel.getE_OE_score_max());
									facilityData.setF_ANC_score_max(facilityDataModel.getF_ANC_score_max() == null ? null : facilityDataModel.getF_ANC_score_max());
									facilityData.setF_IPIP_score_max(facilityDataModel.getF_IPIP_score_max() == null ? null : facilityDataModel.getF_IPIP_score_max());
									facilityData.setF_ENCR_score_max(facilityDataModel.getF_ENCR_score_max() == null ? null : facilityDataModel.getF_ENCR_score_max());
									facilityData.setF_FP_score_max(facilityDataModel.getF_FP_score_max() == null ? null : facilityDataModel.getF_FP_score_max());
									facilityData.setF_CS_score_max(facilityDataModel.getF_CS_score_max() == null ? null : facilityDataModel.getF_CS_score_max());
									facilityData.setF_FMO_score_max(facilityDataModel.getF_FMO_score_max() == null ? null : facilityDataModel.getF_FMO_score_max());
									facilityData.setF_AH_score_max(facilityDataModel.getF_AH_score_max() == null ? null : facilityDataModel.getF_AH_score_max());
									facilityData.setE_total_score(facilityDataModel.getE_total_score() == null ? null : facilityDataModel.getE_total_score());
									facilityData.setF_total_score(facilityDataModel.getF_total_score() == null ? null : facilityDataModel.getF_total_score());
									facilityData.setE_total_score_max(facilityDataModel.getE_total_score_max() == null ? null : facilityDataModel.getE_total_score_max());
									facilityData.setF_total_score_max(facilityDataModel.getF_total_score_max() == null ? null : facilityDataModel.getF_total_score_max());
									facilityData.setfSterilizationTotal(facilityDataModel.getfSterilizationTotal() == null ? null : facilityDataModel.getfSterilizationTotal());
									facilityData.setSterilizationTotal(facilityDataModel.getSterilizationTotal() == null ? null : facilityDataModel.getSterilizationTotal());
									facilityData.setChecklist_score(facilityDataModel.getChecklist_score() == null ? null : facilityDataModel.getChecklist_score());
									facilityData.setChecklist_score_max(facilityDataModel.getChecklist_score_max() == null ? null : facilityDataModel.getChecklist_score_max());
									facilityData.setIsAggregated(false);
									facilityData.setCreatedDate(new Timestamp(System.currentTimeMillis()));
									facilityData.setAppVersionName(appVersionName);
									
									facilityDatas.add(facilityData);
									
									if(facilityDataModel.getPlanOfAction() != null && !facilityDataModel.getPlanOfAction().isEmpty()){
										List<PlanOfActionModel> planOfActionModelList = facilityDataModel.getPlanOfAction();
										Date dateOfVisit = sdf.parse(facilityDataModel.getC7());
										
										for(PlanOfActionModel planOfActionModel : planOfActionModelList){
											
											Calendar calendar = Calendar.getInstance();
											calendar.setTime(dateOfVisit);
											calendar.add(Calendar.MONTH, planOfActionModel.getTimeline());
											
											PlanOfAction planOfAction = new PlanOfAction();
											
											planOfAction.setCreatedDate(new Timestamp(System.currentTimeMillis()));
											planOfAction.setFacility(new Area(facilityDataModel.getC5()));
											planOfAction.setIntervention_activities(planOfActionModel.getIntervention_activities());
											planOfAction.setIsLatest(true);
											planOfAction.setLevelOfIntervention(new Role(planOfActionModel.getLevelOfIntervention()));
											planOfAction.setMajorFinding(planOfActionModel.getMajorFindings());
											planOfAction.setResponsibility(new DesignationAreaOrganizationRoleMapping(planOfActionModel.getResponsibility()));
											planOfAction.setSectionType(new TypeDetail(planOfActionModel.getSectionType()));
											planOfAction.setTimeline(planOfActionModel.getTimeline());
											planOfAction.setFormType(new TypeDetail(facilityFormId));
											planOfAction.setUser(user);
											planOfAction.setRecievedDate(new Date());
											planOfAction.setDateOfVisit(dateOfVisit);
											planOfAction.setDistrict(new Area(facilityDataModel.getDistrict()));
											planOfAction.setBlock(facilityDataModel.getBlock() == null ? null : new Area(facilityDataModel.getBlock()));
											planOfAction.setStatus(new TypeDetail(new Integer (messages.getMessage(Constants.Web.PLAN_OF_ACTION_STATUS_OPEN, null, null))));
											planOfAction.setExcpectedDateOfCompletion(calendar.getTime());
											
											planOfActionList.add(planOfAction);
											
											if(!poaFacilityList.contains(facilityDataModel.getC5())){
												poaFacilityList.add(facilityDataModel.getC5());
											}
										}
										
										planOfActionRepository.updatePreviousData(poaFacilityList, facilityFormId);
										planOfActionRepository.save(planOfActionList);
									}
								}
							}
							
							Iterable<FacilityData> listOfFacilityData = facilityDataRepository.save(facilityDatas);
							/**
							 * Debiprasad
							 */
							for (FacilityData facilityData : listOfFacilityData) {
								planningService.saveVisitedDate(facilityData.getUser().getId(),
										facilityData.getArea().getAreaNId(), Integer
										.parseInt(messages.getMessage(Constants.Mobile.FORM_TYPE_FACILITY_CHECKLIST, null, null)), facilityData.getC7(),
										facilityData.getId());
							}
						}
						
						List<CommunityDataModel> commList = syncModel.getCommunityDataList();
						List<CommunityData> communityDatas = new ArrayList<>();
						
						syncResult.setCommunityRecordsSynced(commList.size());
						syncResult.setCommunityErrorModels(communityErrorModels);
						
						if(commList != null && !commList.isEmpty()){
							
							List<Integer> poaFacilityList = new ArrayList<>(); // to make previous records in plan of action false.
							
							for(CommunityDataModel comModel : commList){
								CommunityData communityData = new CommunityData();
								
								if(comModel.getQ3() != null){
									communityData.setArea(new Area(comModel.getQ3()));
									communityData.setFacility(new Area(comModel.getFacilityId()));
									communityData.setFacilityType(new TypeDetail(comModel.getFacilityType()));
									
									communityData.setQ1(comModel.getQ1() == null ? null : comModel.getQ1());
									communityData.setQ2(comModel.getQ2() == null ? null : comModel.getQ2());
									communityData.setQ4(comModel.getQ4() == null ? null : comModel.getQ4());
									communityData.setQ5(comModel.getQ5() == null ? null : comModel.getQ5());
									communityData.setQ5a(comModel.getQ5a() == null ? null : comModel.getQ5a());
									communityData.setQ5b(comModel.getQ5b() == null ? null : comModel.getQ5b());
									communityData.setQ6(comModel.getQ6() == null ? null : comModel.getQ6());
									communityData.setQ7(comModel.getQ7() == null ? null : comModel.getQ7());
									communityData.setQ7_a(comModel.getQ7_a() == null ? null : comModel.getQ7_a());
									communityData.setDate(comModel.getDate() == null ? null : sdf.parse(comModel.getDate()));
									communityData.setQ1p1(comModel.getQ1p1() == null ? null : comModel.getQ1p1());
									communityData.setQ11a(comModel.getQ11a() == null ? null : comModel.getQ11a());
									communityData.setQ11b(comModel.getQ11b() == null ? null : comModel.getQ11b());
									communityData.setQ11c(comModel.getQ11c() == null ? null : comModel.getQ11c());
									communityData.setQ11d(comModel.getQ11d() == null ? null : comModel.getQ11d());
									communityData.setQ11e(comModel.getQ11e() == null ? null : comModel.getQ11e());
									communityData.setQ1p2(comModel.getQ1p2() == null ? null : comModel.getQ1p2());
									communityData.setQ1p3(comModel.getQ1p3() == null ? null : comModel.getQ1p3());
									communityData.setQ1p4(comModel.getQ1p4() == null ? null : comModel.getQ1p4());
									communityData.setQ1p5(comModel.getQ1p5() == null ? null : comModel.getQ1p5());
									communityData.setQ21(comModel.getQ21() == null ? null : comModel.getQ21());
									communityData.setQ22(comModel.getQ22() == null ? null : comModel.getQ22());
									communityData.setQ23(comModel.getQ23() == null ? null : comModel.getQ23());
									communityData.setQ24(comModel.getQ24() == null ? null : comModel.getQ24());
									communityData.setQ25(comModel.getQ25() == null ? null : comModel.getQ25());
									communityData.setQ251(comModel.getQ251() == null ? null : comModel.getQ251());
									communityData.setQ26(comModel.getQ26() == null ? null : comModel.getQ26());
									communityData.setQ27(comModel.getQ27() == null ? null : comModel.getQ27());
									communityData.setQ31(comModel.getQ31() == null ? null : comModel.getQ31());
									communityData.setQ31a(comModel.getQ31a() == null ? null : comModel.getQ31a());
									communityData.setQ31b(comModel.getQ31b() == null ? null : comModel.getQ31b());
									communityData.setQ31c(comModel.getQ31c() == null ? null : comModel.getQ31c());
									communityData.setQ31d(comModel.getQ31d() == null ? null : comModel.getQ31d());
									communityData.setQ311(comModel.getQ311() == null ? null : comModel.getQ311());
									communityData.setQ32(comModel.getQ32() == null ? null : comModel.getQ32());
									communityData.setQ321(comModel.getQ321() == null ? null : comModel.getQ321());
									communityData.setQ33(comModel.getQ33() == null ? null : comModel.getQ33());
									communityData.setQ331(comModel.getQ331() == null ? null : comModel.getQ331());
									communityData.setQ34(comModel.getQ34() == null ? null : comModel.getQ34());
									communityData.setQ35(comModel.getQ35() == null ? null : comModel.getQ35());
									communityData.setQ36(comModel.getQ36() == null ? null : comModel.getQ36());
	//								communityData.setCal3(comModel.getCal3() == null ? null : comModel.getCal3());
									communityData.setQ37a(comModel.getQ37a() == null ? null : comModel.getQ37a());
									communityData.setQ37b(comModel.getQ37b() == null ? null : comModel.getQ37b());
									communityData.setQ37c(comModel.getQ37c() == null ? null : comModel.getQ37c());
									communityData.setQ37d(comModel.getQ37d() == null ? null : comModel.getQ37d());
									communityData.setQ37e(comModel.getQ37e() == null ? null : comModel.getQ37e());
									communityData.setQ37fi(comModel.getQ37fi() == null ? null : comModel.getQ37fi());
									communityData.setQ37fii(comModel.getQ37fii() == null ? null : comModel.getQ37fii());
									communityData.setQ37gi(comModel.getQ37gi() == null ? null : comModel.getQ37gi());
									communityData.setQ37gii(comModel.getQ37gii() == null ? null : comModel.getQ37gii());
									communityData.setQ37h(comModel.getQ37h() == null ? null : comModel.getQ37h());
									communityData.setQ37i(comModel.getQ37i() == null ? null : comModel.getQ37i());
									communityData.setQ37j(comModel.getQ37j() == null ? null : comModel.getQ37j());
									communityData.setQ37k(comModel.getQ37k() == null ? null : comModel.getQ37k());
									communityData.setQ37l(comModel.getQ37l() == null ? null : comModel.getQ37l());
	//								communityData.setCal3a(comModel.getCal3a() == null ? null : comModel.getCal3a());
									communityData.setQ411(comModel.getQ411() == null ? null : comModel.getQ411());
									communityData.setQ412(comModel.getQ412() == null ? null : comModel.getQ412());
									communityData.setQ413(comModel.getQ413() == null ? null : comModel.getQ413());
	//								communityData.setCal4(comModel.getCal4() == null ? null : comModel.getCal4());
									communityData.setQ421(comModel.getQ421() == null ? null : comModel.getQ421());
									communityData.setQ422(comModel.getQ422() == null ? null : comModel.getQ422());
									communityData.setQ423a(comModel.getQ423a() == null ? null : comModel.getQ423a());
									communityData.setQ423b(comModel.getQ423b() == null ? null : comModel.getQ423b());
									communityData.setQ423c(comModel.getQ423c() == null ? null : comModel.getQ423c());
									communityData.setQ423d(comModel.getQ423d() == null ? null : comModel.getQ423d());
									communityData.setQ423e(comModel.getQ423e() == null ? null : comModel.getQ423e());
									communityData.setQ423I(comModel.getQ423I() == null ? null : comModel.getQ423I());
	//								communityData.setCal4a(comModel.getCal4a() == null ? null : comModel.getCal4a());
									communityData.setQ424a(comModel.getQ424a() == null ? null : comModel.getQ424a());
									communityData.setQ424b(comModel.getQ424b() == null ? null : comModel.getQ424b());
									communityData.setQ424c(comModel.getQ424c() == null ? null : comModel.getQ424c());
									communityData.setQ424d(comModel.getQ424d() == null ? null : comModel.getQ424d());
									communityData.setQ424e(comModel.getQ424e() == null ? null : comModel.getQ424e());
									communityData.setQ424f(comModel.getQ424f() == null ? null : comModel.getQ424f());
									communityData.setQ424g(comModel.getQ424g() == null ? null : comModel.getQ424g());
									communityData.setQ424h(comModel.getQ424h() == null ? null : comModel.getQ424h());
									communityData.setQ424i(comModel.getQ424i() == null ? null : comModel.getQ424i());
									communityData.setQ424j(comModel.getQ424j() == null ? null : comModel.getQ424j());
	//								communityData.setCal4b(comModel.getCal4b() == null ? null : comModel.getCal4b());
									communityData.setQ431(comModel.getQ431() == null ? null : comModel.getQ431());
									communityData.setQ431a(comModel.getQ431a() == null ? null : comModel.getQ431a());
									communityData.setQ431b(comModel.getQ431b() == null ? null : comModel.getQ431b());
									communityData.setQ432(comModel.getQ432() == null ? null : comModel.getQ432());
									communityData.setQ433(comModel.getQ433() == null ? null : comModel.getQ433());
									communityData.setQ434(comModel.getQ434() == null ? null : comModel.getQ434());
									communityData.setQ435(comModel.getQ435() == null ? null : comModel.getQ435());
									communityData.setQ436(comModel.getQ436() == null ? null : comModel.getQ436());
									communityData.setQ437(comModel.getQ437() == null ? null : comModel.getQ437());
									communityData.setQ437a(comModel.getQ437a() == null ? null : comModel.getQ437a());
									communityData.setQ437b(comModel.getQ437b() == null ? null : comModel.getQ437b());
									communityData.setQ437c(comModel.getQ437c() == null ? null : comModel.getQ437c());
									communityData.setQ437d(comModel.getQ437d() == null ? null : comModel.getQ437d());
									communityData.setQ437e(comModel.getQ437e() == null ? null : comModel.getQ437e());
									communityData.setQ437eI(comModel.getQ437eI() == null ? null : comModel.getQ437eI());
	//								communityData.setCal4c(comModel.getCal4c() == null ? null : comModel.getCal4c());
									communityData.setQ441(comModel.getQ441() == null ? null : comModel.getQ441());
									communityData.setQ442(comModel.getQ442() == null ? null : comModel.getQ442());
									communityData.setQ443(comModel.getQ443() == null ? null : comModel.getQ443());
									communityData.setQ444(comModel.getQ444() == null ? null : comModel.getQ444());
									communityData.setQ445(comModel.getQ445() == null ? null : comModel.getQ445());
	//								communityData.setCal4d(comModel.getCal4d() == null ? null : comModel.getCal4d());
									communityData.setQ446a(comModel.getQ446a() == null ? null : comModel.getQ446a());
									communityData.setQ446b(comModel.getQ446b() == null ? null : comModel.getQ446b());
									communityData.setQ446c(comModel.getQ446c() == null ? null : comModel.getQ446c());
	//								communityData.setCal4e(comModel.getCal4e() == null ? null : comModel.getCal4e());
									communityData.setQ447(comModel.getQ447() == null ? null : comModel.getQ447());
	//								communityData.setCal4f(comModel.getCal4f() == null ? null : comModel.getCal4f());
									communityData.setQ451(comModel.getQ451() == null ? null : comModel.getQ451());
									communityData.setQ452(comModel.getQ452() == null ? null : comModel.getQ452());
									communityData.setQ453(comModel.getQ453() == null ? null : comModel.getQ453());
	//								communityData.setCal4g(comModel.getCal4g() == null ? null : comModel.getCal4g());
									communityData.setQ461a(comModel.getQ461a() == null ? null : comModel.getQ461a());
									communityData.setQ461b(comModel.getQ461b() == null ? null : comModel.getQ461b());
									communityData.setQ461c(comModel.getQ461c() == null ? null : comModel.getQ461c());
									communityData.setQ461d(comModel.getQ461d() == null ? null : comModel.getQ461d());
									communityData.setQ461e(comModel.getQ461e() == null ? null : comModel.getQ461e());
									communityData.setQ461eI(comModel.getQ461eI() == null ? null : comModel.getQ461eI());
	//								communityData.setCal4h(comModel.getCal4h() == null ? null : comModel.getCal4h());
									communityData.setQ462a(comModel.getQ462a() == null ? null : comModel.getQ462a());
									communityData.setQ462b(comModel.getQ462b() == null ? null : comModel.getQ462b());
									communityData.setQ462c(comModel.getQ462c() == null ? null : comModel.getQ462c());
	//								communityData.setCal4i(comModel.getCal4i() == null ? null : comModel.getCal4i());
									communityData.setQ463(comModel.getQ463() == null ? null : comModel.getQ463());
	//								communityData.setCal4j(comModel.getCal4j() == null ? null : comModel.getCal4j());
									communityData.setQ471(comModel.getQ471() == null ? null : comModel.getQ471());
									communityData.setQ471a(comModel.getQ471a() == null ? null : comModel.getQ471a());
									communityData.setQ472(comModel.getQ472() == null ? null : comModel.getQ472());
									communityData.setQ473(comModel.getQ473() == null ? null : comModel.getQ473());
									communityData.setQ474(comModel.getQ474() == null ? null : comModel.getQ474());
									communityData.setQ474a(comModel.getQ474a() == null ? null : comModel.getQ474a());
	//								communityData.setCal4k(comModel.getCal4k() == null ? null : comModel.getCal4k());
									communityData.setQ475(comModel.getQ475() == null ? null : comModel.getQ475());
									communityData.setQ476(comModel.getQ476() == null ? null : comModel.getQ476());
	//								communityData.setCal4l(comModel.getCal4l() == null ? null : comModel.getCal4l());
									communityData.setImg(comModel.getImg() == null ? null : comModel.getImg());
									communityData.setGeopoint(comModel.getGeopoint() == null ? null : comModel.getGeopoint());
									communityData.setImg1(comModel.getImg1() == null ? null : getPhotoPath(comModel.getImg1(), 
											comModel.getQ3().toString() , messages.getMessage(Constants.Web.COMMUNITY_CHECKLIST_NAME, null, null)));
									communityData.setImg2(comModel.getImg2() == null ? null : getPhotoPath(comModel.getImg2(), 
											comModel.getQ3().toString() , messages.getMessage(Constants.Web.COMMUNITY_CHECKLIST_NAME, null, null)));
									communityData.setImg3(comModel.getImg3() == null ? null : getPhotoPath(comModel.getImg3(), 
											comModel.getQ3().toString() , messages.getMessage(Constants.Web.COMMUNITY_CHECKLIST_NAME, null, null)));
									communityData.setDeviceid(comModel.getDeviceid() == null ? null : comModel.getDeviceid());
									communityData.setC_VHNDA_score(comModel.getC_VHNDA_score() == null ? null : comModel.getC_VHNDA_score());
									communityData.setC_IWANM_score(comModel.getC_IWANM_score() == null ? null : comModel.getC_IWANM_score());
									communityData.setC_IA_IASHA_score(comModel.getC_IA_IASHA_score() == null ? null : comModel.getC_IA_IASHA_score());
									communityData.setC_IA_AOECWASA_score(comModel.getC_IA_AOECWASA_score() == null ? null : comModel.getC_IA_AOECWASA_score());
									communityData.setC_IA_AIWA_score(comModel.getC_IA_AIWA_score() == null ? null : comModel.getC_IA_AIWA_score());
									communityData.setC_IA_AISA_score(comModel.getC_IA_AISA_score() == null ? null : comModel.getC_IA_AISA_score());
									communityData.setC_IB_IWPW_score(comModel.getC_IB_IWPW_score() == null ? null : comModel.getC_IB_IWPW_score());
									communityData.setC_IB_IWLMWMB_score(comModel.getC_IB_IWLMWMB_score() == null ? null : comModel.getC_IB_IWLMWMB_score());
									communityData.setC_IB_AASSRFWSD_score(comModel.getC_IB_AASSRFWSD_score() == null ? null : comModel.getC_IB_AASSRFWSD_score());
									communityData.setC_IB_IMWCM_score(comModel.getC_IB_IMWCM_score() == null ? null : comModel.getC_IB_IMWCM_score());
									communityData.setC_IB_IWBMPWPM_score(comModel.getC_IB_IWBMPWPM_score() == null ? null : comModel.getC_IB_IWBMPWPM_score());
									communityData.setC_IB_IWFHA_score(comModel.getC_IB_IWFHA_score() == null ? null : comModel.getC_IB_IWFHA_score());
									communityData.setC_IB_IHHD_score(comModel.getC_IB_IHHD_score() == null ? null : comModel.getC_IB_IHHD_score());
									communityData.setC_IB_SAIWWNTA_score(comModel.getC_IB_SAIWWNTA_score() == null ? null : comModel.getC_IB_SAIWWNTA_score());
									communityData.setF_img(comModel.getF_img() == null ? null : getPhotoPath(comModel.getF_img(), 
											comModel.getQ3().toString() , messages.getMessage(Constants.Web.COMMUNITY_CHECKLIST_NAME, null, null)));
									communityData.setS_img(comModel.getS_img() == null ? null : getPhotoPath(comModel.getS_img(), 
											comModel.getQ3().toString() , messages.getMessage(Constants.Web.COMMUNITY_CHECKLIST_NAME, null, null)));
									communityData.setUser(user);
									communityData.setC_IA_IASHA_score_max(comModel.getC_IA_IASHA_score_max() == null ? null : comModel.getC_IA_IASHA_score_max());
									communityData.setC_IA_AOECWASA_score_max(comModel.getC_IA_AOECWASA_score_max() == null ? null : comModel.getC_IA_AOECWASA_score_max());
									communityData.setC_IA_AIWA_score_max(comModel.getC_IA_AIWA_score_max() == null ? null : comModel.getC_IA_AIWA_score_max());
									communityData.setC_IA_AISA_score_max(comModel.getC_IA_AISA_score_max() == null ? null : comModel.getC_IA_AISA_score_max());
									communityData.setC_IB_IWPW_score_max(comModel.getC_IB_IWPW_score_max() == null ? null : comModel.getC_IB_IWPW_score_max());
									communityData.setC_IB_IWLMWMB_score_max(comModel.getC_IB_IWLMWMB_score_max() == null ? null : comModel.getC_IB_IWLMWMB_score_max());
									communityData.setC_IB_AASSRFWSD_score_max(comModel.getC_IB_AASSRFWSD_score_max() == null ? null : comModel.getC_IB_AASSRFWSD_score_max());
									communityData.setC_IB_IMWCM_score_max(comModel.getC_IB_IMWCM_score_max() == null ? null : comModel.getC_IB_IMWCM_score_max());
									communityData.setC_IB_IWBMPWPM_score_max(comModel.getC_IB_IWBMPWPM_score_max() == null ? null : comModel.getC_IB_IWBMPWPM_score_max());
									communityData.setC_IB_IWFHA_score_max(comModel.getC_IB_IWFHA_score_max() == null ? null : comModel.getC_IB_IWFHA_score_max());
									communityData.setC_IB_IHHD_score_max(comModel.getC_IB_IHHD_score_max() == null ? null : comModel.getC_IB_IHHD_score_max());
									communityData.setC_IB_SAIWWNTA_score_max(comModel.getC_IB_SAIWWNTA_score_max() == null ? null : comModel.getC_IB_SAIWWNTA_score_max());
									communityData.setNote11(comModel.getNote11() == null ? null : comModel.getNote11());
									communityData.setNote1(comModel.getNote1() == null ? null : comModel.getNote1());
									communityData.setNote21(comModel.getNote21() == null ? null : comModel.getNote21());
									communityData.setNote2(comModel.getNote2() == null ? null : comModel.getNote2());
									communityData.setNote31b(comModel.getNote31b() == null ? null : comModel.getNote31b());
									communityData.setNote3b(comModel.getNote3b() == null ? null : comModel.getNote3b());
									communityData.setNote41a(comModel.getNote41a() == null ? null : comModel.getNote41a());
									communityData.setNote4a(comModel.getNote4a() == null ? null : comModel.getNote4a());
									communityData.setNote51a(comModel.getNote51a() == null ? null : comModel.getNote51a());
									communityData.setNote5a(comModel.getNote5a() == null ? null : comModel.getNote5a());
									communityData.setIsAggregated(false);
									communityData.setCreatedDate(new Timestamp(System.currentTimeMillis()));
									communityData.setAppVersionName(appVersionName);
									
									communityDatas.add(communityData);
									
									if(comModel.getPlanOfAction() != null && !comModel.getPlanOfAction().isEmpty()){
										List<PlanOfActionModel> planOfActionModelList = comModel.getPlanOfAction();
										Date dateOfVisit = sdf.parse(comModel.getDate());
										
										for(PlanOfActionModel planOfActionModel : planOfActionModelList){
											Calendar calendar = Calendar.getInstance();
											calendar.setTime(dateOfVisit);
											calendar.add(Calendar.MONTH, planOfActionModel.getTimeline());
											PlanOfAction planOfAction = new PlanOfAction();
											
											planOfAction.setCreatedDate(new Timestamp(System.currentTimeMillis()));
											planOfAction.setMajorFinding(planOfActionModel.getMajorFindings());
											planOfAction.setFacility(new Area(comModel.getFacilityId()));
											planOfAction.setIntervention_activities(planOfActionModel.getIntervention_activities());
											planOfAction.setIsLatest(true);
											planOfAction.setLevelOfIntervention(new Role(planOfActionModel.getLevelOfIntervention()));
											planOfAction.setResponsibility(new DesignationAreaOrganizationRoleMapping(planOfActionModel.getResponsibility()));
											planOfAction.setSectionType(new TypeDetail(planOfActionModel.getSectionType()));
											planOfAction.setTimeline(planOfActionModel.getTimeline());
											planOfAction.setFormType(new TypeDetail(communityFormId));
											planOfAction.setUser(user);
											planOfAction.setRecievedDate(new Date());
											planOfAction.setDateOfVisit(dateOfVisit);
											planOfAction.setDistrict(new Area(comModel.getQ2()));
											planOfAction.setBlock(comModel.getQ3() == null ? null : new Area(comModel.getQ3()));
											planOfAction.setStatus(new TypeDetail(new Integer (messages.getMessage(Constants.Web.PLAN_OF_ACTION_STATUS_OPEN, null, null))));
											planOfAction.setExcpectedDateOfCompletion(calendar.getTime());
											
											planOfActionList.add(planOfAction);
											
											if(!poaFacilityList.contains(comModel.getFacilityId())){
												poaFacilityList.add(comModel.getFacilityId());
											}
										}
										
										planOfActionRepository.updatePreviousData(poaFacilityList, communityFormId);
										planOfActionRepository.save(planOfActionList);
									}
								}
							}
							Iterable<CommunityData> listOfCommunityData = communityDataRepository.save(communityDatas);
							/**
							 * Debiprasad
							 */
							for (CommunityData communityData : listOfCommunityData) {
								
								planningService.saveVisitedDate(communityData.getUser().getId(),
										communityData.getFacility().getAreaNId(), Integer
										.parseInt(messages.getMessage(Constants.Mobile.FORM_TYPE_COMMUNITY_CHECKLIST, null, null)), communityData.getDate(),
										communityData.getId());
							}
						}
						
						//sarita code
						//login meta code 
						//On successful sync, save UserLoginMeta login and logout both information of that user.
						String ipAddress = getIpAddr(request);
						String userAgent = request.getHeader("User-Agent");
						//when the user sync in mobile concatenate userAgent with "Mobile-Sync: " 
						Long userLoginMetaId = userService.saveUserLoginMeta(ipAddress, user.getId(), "Mobile-Sync: "+userAgent);
						userService.updateLoggedOutStatus(userLoginMetaId);
						//end sarita code
						
						//start e-mail thread if no exception occurs 		
						PostSyncThread postSyncThread = (PostSyncThread) appContext.getBean("postSyncThread");
						postSyncThread.setSyncModel(syncModel);
						postSyncThread.start();
					}else{
						//throw error as credentials are not correct or null
						logger.error("Sync unsuccessfull, bad apiToken");
						syncResult.setErrorCode(1);			
						syncResult.setErrorMessage(messages.getMessage(Constants.Mobile.ERROR_UNAUTHORIZED_ACCESS, null, null));
					}
				}else{
					//throw error as credentials are not correct or null
					logger.error("Sync unsuccessfull, bad credentials or null pointer");
					syncResult.setErrorCode(1);			
					syncResult.setErrorMessage(messages.getMessage(Constants.Mobile.ERROR_UNAUTHORIZED_ACCESS, null, null));
				}
			} else{
				//throw error as credentials are not correct or null
				logger.error("Sync unsuccessfull, sync has come from version 1 or version name is missing");
				syncResult.setErrorCode(2);
				syncResult.setLatestAppVersionName(versionManager.getVersionName());
				syncResult.setErrorMessage(messages.getMessage(Constants.Mobile.INVALID_VERSION_NAME, null, null));
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error("Exception : " + e);
			syncResult.setErrorCode(1);
			syncResult.setErrorMessage("Server error : " + messages.getMessage(Constants.Mobile.ERROR_SERVER_ERROR, null, null));
			return syncResult;
		}
		return syncResult;
	}
	
	/**
	 * This method will convert the base64 to image and store it in a path
	 * @author Naseem Akhtar (naseem@sdrc.co.in)
	 */
	 public String getPhotoPath(String image, String areaId, String type) throws Exception {
	    	String path = null;
	    	switch(type){
	    		case "facility":
	    			path = applicationMessageSource.getMessage("store.facility", null, null,null);
	    			break;
	    		case "community":
	    			path = applicationMessageSource.getMessage("store.community", null, null,null);
	    			break;
	    		default :
	    			logger.info("Error in storing image and getting file path method");
	    			break;
	    	}
	    	
			File file = new File(path);
			if(!file.exists()){
				file.mkdirs();
			}
			
		    byte[] decodedBytes = org.apache.commons.codec.binary.Base64.decodeBase64(image.split(",")[1]);
		    String finalPath = path+""+areaId+"_"+new SimpleDateFormat("ddMMyyyyHHmmssS").format(new java.util.Date())+".png";
		    OutputStream out = new FileOutputStream(finalPath);
		    out.write(decodedBytes );
		    out.close();
			return finalPath;
		}

	/**
	 * This method will reset password of a existing user.
	 */
	@Override
	@Transactional
	public ForgotPasswordModel forgotPassword(String email) {
		ForgotPasswordModel response = new ForgotPasswordModel();
		List<EssUser> userList = essUserRepository.findByPrimaryEmailId(email);
		EssUser user = null;
		
		if(userList != null && !userList.isEmpty()){
			
			for(EssUser userObject : userList){
				if(userObject.getIsApproved() == null || userObject.getIsApproved())
					user = userObject;
			}
			
			if(user != null && user.getIsApproved() != null && 
					user.getIsActive() != null && user.getIsActive() && user.getIsLive()){
				
				List<UserCredentialsMetaData> userCredentialsMetaDataList = userCredentialsMetaDataRepository.findByEssUserIdAndIsActiveTrue(user.getId());
				
				if(userCredentialsMetaDataList != null && !userCredentialsMetaDataList.isEmpty()){
					for(UserCredentialsMetaData userCredentialsMetaData : userCredentialsMetaDataList){
						userCredentialsMetaData.setIsActive(false);
					}
				}
				
				UUID uniqueKey = UUID.randomUUID();
				byte[] byt = uniqueKey.toString().getBytes();
				String api = Base64.getEncoder().encodeToString(byt);
				
				UserCredentialsMetaData userCredentialsMetaData = new UserCredentialsMetaData();
				userCredentialsMetaData.setActivationCode(uniqueKey.toString());
				userCredentialsMetaData.setEssUser(user);
				userCredentialsMetaData.setCreatedDate(new Timestamp(System.currentTimeMillis()));
				userCredentialsMetaData.setIsActive(true);
				
				userCredentialsMetaDataRepository.save(userCredentialsMetaData);
				
				try {
					String actIp = applicationMessageSource.getMessage("domain.name", null, null) + 
									"resetPassword?kZiasLioeWhdn="+api;
					
					Properties props = new Properties();
					props.setProperty("mail.transport.protocol", "smtp");
					props.put("mail.smtp.host", "smtp.gmail.com");
					props.put("mail.smtp.socketFactory.port", "587");
					props.put("mail.smtp.socketFactory.class", "avax.net.ssl.SSLSocketFactory");
					props.put("mail.smtp.auth", "true");
					props.put("mail.smtp.port", "587");
					props.put("mail.smtp.starttls.enable", "true");
					
					javax.mail.Session session = javax.mail.Session.getDefaultInstance(
						props, new javax.mail.Authenticator() {
							@Override
							protected PasswordAuthentication getPasswordAuthentication() {
								return new PasswordAuthentication(
								messages.getMessage(Constants.Web.FORGOT_PASS_EMAIL_ID, null, null),
								messages.getMessage(Constants.Web.FORGOT_PASS_EMAIL_PASS, null, null));
							}
					});
					
					Message message = new MimeMessage(session);
					message.setFrom(new InternetAddress());
					message.setRecipients(Message.RecipientType.TO,InternetAddress.parse(user.getPrimaryEmailId()));
					message.setSubject("Reset Password");
					
					String msg = "Dear "+user.getFirstName()+",<br><br>Please click on the link below to reset your password :-<br><br><a href="+actIp+">"
							+actIp+"</a><br><br> <b>Note : Link will expire after 30 minutes<b> <br><br>Regards,<br>ESS Support";
					
					BodyPart messageBodyPart;
					
			        MimeMultipart multipart = new MimeMultipart("related");
			        messageBodyPart = new MimeBodyPart();
			        String htmlText = msg;
			        messageBodyPart.setContent(htmlText, "text/html");
			        multipart.addBodyPart(messageBodyPart);
			        
					message.setContent(multipart);
					Transport.send(message);
					response.setHasError(false);
					response.setMessage("successfull");
					
				}catch (Exception e) {
					e.printStackTrace();
					logger.error("Exception :" + e);
					response.setHasError(true);
					response.setMessage("Failed");
					return response;
				}
			}else if(user != null && user.getIsApproved() == null){
				response.setHasError(true);
				response.setMessage(messages.getMessage(Constants.Mobile.ERROR_USER_NOT_APPROVED, null, null));
			}else if(user != null && (user.getIsActive() == null || !user.getIsActive())){
				response.setHasError(true);
				response.setMessage(messages.getMessage(Constants.Mobile.ERROR_USER_INACTIVE, null, null));
			}else{
				response.setHasError(true);
				response.setMessage(messages.getMessage(Constants.Mobile.ERROR_USER_REJECTED, null, null));
			}
		}else{
			response.setHasError(true);
			response.setMessage(messages.getMessage(Constants.Mobile.ERROR_USER_INVALID, null, null));
		}
		
		return response;
	}

	@Transactional
	@Override
	public ResetPasswordModel resetPassword(String ecrypt) {
		byte[] decode = Base64.getDecoder().decode(ecrypt);
		String byteToString = new String(decode);
		ResetPasswordModel resetPasswordModel = new ResetPasswordModel();
		
		UserCredentialsMetaData userCredentialsMetaData = userCredentialsMetaDataRepository.findByActivationCodeAndIsActiveTrue(byteToString);
		
		if(userCredentialsMetaData != null && userCredentialsMetaData.getIsActive() 
				&& userCredentialsMetaData.getEssUser() != null && userCredentialsMetaData.getEssUser().getIsActive()){
			Timestamp currentDate = new Timestamp(System.currentTimeMillis());
			long difference = currentDate.getTime() - userCredentialsMetaData.getCreatedDate().getTime();
			long minuteDifference = difference / (60 * 1000) % 60;
			long hourDifference = difference / (60 * 60 * 1000) % 24;
			long dayDifference = difference / (24 * 60 * 60 * 1000);
			
			if(dayDifference > 1 || hourDifference > 1 || minuteDifference >  30){
				userCredentialsMetaData.setIsActive(false);
				resetPasswordModel.setRedirectTo("linkExpired");
			}else{
					resetPasswordModel.setRedirectTo("resetPassword");
					resetPasswordModel.setUniqueKey(byteToString);
			}
				
		}else{
			resetPasswordModel.setRedirectTo("linkExpired");
		}
			
		return resetPasswordModel;
	}

	/**
	 * This method will be called when user enters new password and hits on reset.
	 * @author Naseem Akhtar(naseem@sdrc.co.in)
	 * @param changePassword
	 */
	@Transactional
	@Override
	public ForgotPasswordModel changePassword(LoginModel user) {
		ForgotPasswordModel response = new ForgotPasswordModel();
		UserCredentialsMetaData metaData = userCredentialsMetaDataRepository.findByActivationCode(user.getuKey());
		
		if(metaData != null && metaData.getIsActive() 
				&& metaData.getEssUser() != null && metaData.getEssUser().getIsActive()){
			Timestamp currentDate = new Timestamp(System.currentTimeMillis());
			long difference = currentDate.getTime() - metaData.getCreatedDate().getTime();
			long minuteDifference = difference / (60 * 1000) % 60;
			long hourDifference = difference / (60 * 60 * 1000) % 24;
			long dayDifference = difference / (24 * 60 * 60 * 1000);
			
			if(dayDifference < 1 && hourDifference < 1 && minuteDifference < 30){
				EssUser userDetails = metaData.getEssUser();
				
					String encodedPassword = messageDigest.encodePassword(userDetails.getUsername(), user.getPassword());
					metaData.setIsActive(false);
					userDetails.setPassword(encodedPassword);
					
					response.setHasError(false);
					response.setMessage(messages.getMessage(Constants.Mobile.SUCCESS_RESETPASSWORD, null, null));
			}else{
				response.setHasError(true);
				response.setMessage(messages.getMessage(Constants.Mobile.ERROR_RESETPASSWORD_LINK_EXPIRED, null, null));
			}
		}else{
			response.setHasError(true);
			if(metaData == null || metaData.getEssUser() == null){
				response.setMessage(messages.getMessage(Constants.Mobile.ERROR_RESETPASSWORD_UNAUTHORIZED, null, null));
			}else if(!metaData.getIsActive() || !metaData.getEssUser().getIsActive()){
				response.setMessage(messages.getMessage(Constants.Mobile.ERROR_RESETPASSWORD_LINK_EXPIRED, null, null));
			}
		}
		
		return response;
	}

	/**
	 * This method will concurrently called by a thread from sync method to 
	 * send an attachment of the checklist submissions to the respective user  
	 * @author Sarita Panigrahi(sarita@sdrc.co.in)
	 * @param syncModel
	 */
	
	//CHECK FOR THE DRIVE FOLDER (C:/ OR D:/) WHERE THE FOLDER CREATES 
	//ALL NESTED DIRECTORY WILL CREATE AUTOMATICALLY FROM SessionStateManager onApplicationEvent IF THE DRIVE FOLDER IS PRESENT
	//messages.properties excel.checklist.generate.path
	
	@Override
	public void sendReportInEmail(SyncModel syncModel) {

		long startTime = new Date().getTime();
//		FileInputStream inputStream = null;
//		XSSFWorkbook workbook = null;
//		XSSFCellStyle cellStyle = null;
//		XSSFCellStyle titleCellStyle = null;
//		XSSFFont font = null;
//		XSSFFont titleFont = null;
		
//		FileInputStream inputStream1 = null;
//		XSSFWorkbook workbook1 = null;
//		XSSFCellStyle cellStyle1 = null;
//		XSSFCellStyle titleCellStyle1 = null;
//		XSSFFont font1 = null;
//		XSSFFont titleFont1 = null;
		
		try {
			
			String ccEmailId = syncModel.getLoginDataModel().getEmail();
			String[] checklistTemplateFilePaths = {
					context.getRealPath(messages.getMessage(Constants.Mobile.EXCEL_FACILITY_CHECKLIST_TEMPLATE_PATH, null, null)) ,
					context.getRealPath(messages.getMessage(Constants.Mobile.EXCEL_COMMUNITY_CHECKLIST_TEMPLATE_PATH, null, null))
			};
//			String oldExcelFacilityFilePath = context.getRealPath(messages.getMessage(
//					Constants.Mobile.EXCEL_FACILITY_CHECKLIST_OLD_TEMPLATE_PATH, null, null));

			String outputFilePath = messages.getMessage(Constants.Mobile.EXCEL_CHECKLIST_GENERATE_PATH, null, null);

//			int getterMthodColumnNumber = 1; // from template getter method column is "B", index 1
//			int dataValColumn = 5; // from template Response column is "F", index 5

			//area detail and type detail in a map
			Map<Integer, String> areaIdNameMap = new HashMap<>();
			Map<Integer, String> typeIdNameMap = new HashMap<>();
			Map<Integer, String> organizationIdMap = new HashMap<>();
			
			List<Area> areas = areaRepository.findAll();
			areas.forEach(area-> areaIdNameMap.put(area.getAreaNId(), area.getName()));
			
			List<TypeDetail> typeDetailList = typeDetailRepository.findAll();
			typeDetailList.forEach(typeDetail -> typeIdNameMap.put(typeDetail.getId(), typeDetail.getName()));
			
			List<Organization> organizationList = organizationRepository.findAll();
			organizationList.forEach(organization -> organizationIdMap.put(organization.getId(), organization.getOrganizationName()));
			
			for (String checklistTemplateFilePath : checklistTemplateFilePaths) {

				//if there is no FacilityData then we do not want to iterate the template also
				if (syncModel.getFacilityDataList().isEmpty() && checklistTemplateFilePath.equals(
						messages.getMessage(Constants.Mobile.EXCEL_FACILITY_CHECKLIST_TEMPLATE_PATH, null, null)))
					continue;
				
				//if there is no CommunityData then we do not want to iterate the template also
				if (syncModel.getCommunityDataList().isEmpty() && checklistTemplateFilePath.equals(
						messages.getMessage(Constants.Mobile.EXCEL_COMMUNITY_CHECKLIST_TEMPLATE_PATH, null, null)))
					continue;

//				try {
//					inputStream = new FileInputStream(checklistTemplateFilePath);
//					workbook = new XSSFWorkbook(inputStream);
//					
//					cellStyle = workbook.createCellStyle();
//					cellStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
//					cellStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
//					cellStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
//					cellStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
//					cellStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
//					
//					font = workbook.createFont();
//					font.setFontName("Arial");
//					font.setFontHeightInPoints((short) 11);
//					
//					cellStyle.setFont(font);
//					
//					//style for title
//					titleCellStyle = workbook.createCellStyle();
//					titleCellStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
//					titleCellStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
//					titleCellStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
//					titleCellStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
//					titleCellStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
//					
//					titleFont = workbook.createFont();
//					titleFont.setFontName("Arial");
//					titleFont.setBold(true);
//					titleFont.setFontHeightInPoints((short) 11);
//					
//					titleCellStyle.setFont(titleFont);
////					inputStream.close();
//					
//				} catch (Exception e) {	
//					logger.error("Exception : " + e);
//					e.printStackTrace();
//				}
//				Map<String, Integer> getterMethodNameAndRowNumMap = new HashMap<>();
//				XSSFSheet xssfSheet = workbook.getSheet(messages.getMessage(Constants.Mobile.EXCEL_SHEET_NAME, null, null)); //survey sheet

//				Iterator<Row> iterator = xssfSheet.rowIterator();
//
//				while (iterator.hasNext()) {
//					Row nextRow = iterator.next();
//					int rowNum = nextRow.getRowNum();
//
//					// starts from 3rd row, index is 2
//					if (rowNum > 1) {
//
//						// we will read the rows and store getter methods
//						// from template and their respective row numbers for later
//						// use
//
//						Cell methodNameCell = nextRow.getCell(getterMthodColumnNumber);
//
//						// only if value is present
//						if (null != methodNameCell && methodNameCell.getCellType() == Cell.CELL_TYPE_STRING) {
//							getterMethodNameAndRowNumMap.put(methodNameCell.getStringCellValue(), rowNum);
//						}
//
//					}
//				}
				
//				int getterMthodColumnNumber1 = 1; // from template getter method column is "B", index 1
//				int dataValColumn1 = 5; // from template Response column is "F", index 5
				
//				Map<String, Integer> getterMethodNameAndRowNumMap1 = new HashMap<>();
//				XSSFSheet xssfSheet1 = workbook1.getSheet(messages.getMessage(Constants.Mobile.EXCEL_SHEET_NAME, null, null)); //survey sheet
				
//				Iterator<Row> iterator1 = xssfSheet1.rowIterator();

//				while (iterator1.hasNext()) {
//					Row nextRow = iterator1.next();
//					int rowNum = nextRow.getRowNum();
//
//					// starts from 3rd row, index is 2
//					if (rowNum > 1) {
//
//						// we will read the rows and store getter methods
//						// from template and their respective row numbers for later
//						// use
//
//						Cell methodNameCell = nextRow.getCell(getterMthodColumnNumber1);
//
//						// only if value is present
//						if (null != methodNameCell && methodNameCell.getCellType() == Cell.CELL_TYPE_STRING) {
//							getterMethodNameAndRowNumMap1.put(methodNameCell.getStringCellValue(), rowNum);
//						}
//
//					}
//				}
				
				// we will now iterate the map and put its corresponding value
				// against
				// the required row
				// by using reflection

				Method method = null;
				Object object = null;
				Row dataValRow = null;
				Cell typeCell = null;
				Cell datavalCell = null;

				//send e-mail for each submission
				
				if(checklistTemplateFilePath.contains(messages.getMessage(Constants.Mobile.EXCEL_FACILITY_CHECKLIST_NAME, null, null))){
					for (FacilityDataModel facilityDataModel : syncModel.getFacilityDataList()) {
//						if(facilityDataModel.getIsUpdatedAPK() != null){
//							workbook = new XSSFWorkbook(inputStream);
//							xssfSheet = workbook.getSheet(messages.getMessage(Constants.Mobile.EXCEL_SHEET_NAME, null, null));
//							sendEmailSubmissionWise(getterMethodNameAndRowNumMap, object, method, facilityDataModel,
//									workbook, xssfSheet, dataValRow, datavalCell, typeCell, dataValColumn, outputFilePath,
//									areaIdNameMap, typeIdNameMap, ccEmailId, cellStyle, titleCellStyle, organizationIdMap);
							
							sendEmailSubmissionWise(object, method, facilityDataModel,
									dataValRow, datavalCell, typeCell, outputFilePath,
									areaIdNameMap, typeIdNameMap, ccEmailId, organizationIdMap,checklistTemplateFilePath);
//						}else{
//							workbook1 = new XSSFWorkbook(inputStream1);
//							xssfSheet1 = workbook1.getSheet(messages.getMessage(Constants.Mobile.EXCEL_SHEET_NAME, null, null));
//							sendEmailSubmissionWise(getterMethodNameAndRowNumMap1, object, method, facilityDataModel,
//									workbook1, xssfSheet1, dataValRow, datavalCell, typeCell, dataValColumn1, outputFilePath,
//									areaIdNameMap, typeIdNameMap, ccEmailId, cellStyle1, titleCellStyle1, organizationIdMap);
//						}
					}
				}else if(checklistTemplateFilePath.contains(messages.getMessage(Constants.Mobile.EXCEL_COMMUNITY_CHECKLIST_NAME, null, null))){
					for (CommunityDataModel communityDataModel : syncModel.getCommunityDataList()) {
//						sendEmailSubmissionWise(getterMethodNameAndRowNumMap, object, method, communityDataModel,
//								workbook, xssfSheet, dataValRow, datavalCell, typeCell, dataValColumn, outputFilePath,
//								areaIdNameMap, typeIdNameMap, ccEmailId, cellStyle, titleCellStyle, organizationIdMap);
						
						sendEmailSubmissionWise(object, method, communityDataModel, dataValRow, datavalCell, typeCell, 
								outputFilePath, areaIdNameMap, typeIdNameMap, ccEmailId, organizationIdMap,
								checklistTemplateFilePath);
					}
				}
			}
		} catch (Exception e) {
			logger.error("Exception : " + e);
			e.printStackTrace();
		}finally{
//			try {
//				workbook.close();
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
		}
		
		long endTime = new Date().getTime();
		System.out.println(endTime-startTime);

	}
	
	//send email for each checklist submission
//	private void sendEmailSubmissionWise(Map<String, Integer> getterMethodNameAndRowNumMap, Object object,
//			Method method, Object checklistWiseDataModel, XSSFWorkbook workbook, XSSFSheet xssfSheet, 
//			Row dataValRow, Cell datavalCell, Cell typeCell, int dataValColumn, String outputFilePath, 
//			Map<Integer, String> areaIdNameMap, Map<Integer, String> typeIdNameMap, String ccEmailId, XSSFCellStyle cellStyle, 
//			XSSFCellStyle titleCellStyle, Map<Integer, String> organizationIdMap){
	private void sendEmailSubmissionWise(Object object,	Method method, Object checklistWiseDataModel,Row dataValRow, 
			Cell datavalCell, Cell typeCell, String outputFilePath, Map<Integer, String> areaIdNameMap, 
			Map<Integer, String> typeIdNameMap, String ccEmailId, Map<Integer, String> organizationIdMap,
			String checklistTemplateFilePath){
		
		/**
		 * @author Naseem Akhtar (naseem@sdrc.co.in)
		 * For solving the issue which is happening while sending email.
		 */
		
		FileInputStream inputStream = null;
		XSSFWorkbook workbook = null;
		XSSFCellStyle cellStyle = null;
		XSSFCellStyle titleCellStyle = null;
		XSSFFont font = null;
		XSSFFont titleFont = null;
		
		try {
			inputStream = new FileInputStream(checklistTemplateFilePath);
			workbook = new XSSFWorkbook(inputStream);
			
			cellStyle = workbook.createCellStyle();
			cellStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
			cellStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
			cellStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
			cellStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
			cellStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
			
			font = workbook.createFont();
			font.setFontName("Arial");
			font.setFontHeightInPoints((short) 11);
			
			cellStyle.setFont(font);
			
			//style for title
			titleCellStyle = workbook.createCellStyle();
			titleCellStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
			titleCellStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
			titleCellStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
			titleCellStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
			titleCellStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
			
			titleFont = workbook.createFont();
			titleFont.setFontName("Arial");
			titleFont.setBold(true);
			titleFont.setFontHeightInPoints((short) 11);
			
			titleCellStyle.setFont(titleFont);
		} catch (Exception e) {	
			logger.error("Exception : " + e);
			e.printStackTrace();
		}
		Map<String, Integer> getterMethodNameAndRowNumMap = new HashMap<>();
		XSSFSheet xssfSheet = workbook.getSheet(messages.getMessage(Constants.Mobile.EXCEL_SHEET_NAME, null, null)); //survey sheet
		
		int getterMthodColumnNumber = 1; // from template getter method column is "B", index 1
		int dataValColumn = 5; // from template Response column is "F", index 5

		Iterator<Row> iterator = xssfSheet.rowIterator();

		while (iterator.hasNext()) {
			Row nextRow = iterator.next();
			int rowNum = nextRow.getRowNum();

			// starts from 3rd row, index is 2
			if (rowNum > 1) {

				// we will read the rows and store getter methods
				// from template and their respective row numbers for later
				// use

				Cell methodNameCell = nextRow.getCell(getterMthodColumnNumber);

				// only if value is present
				if (null != methodNameCell && methodNameCell.getCellType() == Cell.CELL_TYPE_STRING) {
					getterMethodNameAndRowNumMap.put(methodNameCell.getStringCellValue(), rowNum);
				}

			}
		}
		
		/**
		 * extra codes ends here
		 */
		
		int typeColumn = 0;// from template type column is "A", index 0
		String toName = null;
		String toEmail = null;
		String areaName = null;
		String areaType = null;
		String fileName = null;
		FileOutputStream outputStream = null;
		File outputfile = null;
		String checklistName = null;
		
		Date date = new Date();
		String currentDate = sdfPostSync.format(date);
		
		try {
			if(checklistWiseDataModel instanceof FacilityDataModel){
				areaType = "facility";
				checklistName = messages.getMessage(Constants.Mobile.EXCEL_FACILITY_CHECKLIST_NAME, null, null);
				fileName = checklistName+"_"+currentDate
						+messages.getMessage(Constants.Mobile.EXCEL_CHECKLIST_EXTENSION, null, null);
			}
			if(checklistWiseDataModel instanceof CommunityDataModel){
				areaType = "village";
				checklistName = messages.getMessage(Constants.Mobile.EXCEL_COMMUNITY_CHECKLIST_NAME, null, null);
				fileName = checklistName+"_"+currentDate
						+messages.getMessage(Constants.Mobile.EXCEL_CHECKLIST_EXTENSION, null, null);
			}
			for (Entry<String, Integer> entry : getterMethodNameAndRowNumMap.entrySet()) {

				int dataValRowNum = entry.getValue();
				String getterMethodName = entry.getKey();
				
				try {
					method = checklistWiseDataModel.getClass().getMethod(getterMethodName);
				} catch (NoSuchMethodException | SecurityException e) {
					logger.error("Exception : " + e);
					e.printStackTrace();
				}

				try {
					object = method.invoke(checklistWiseDataModel);
				} catch (Exception e) {
					logger.error("Exception : " + e);
					e.printStackTrace();
				}
				
				if (null != object) {
					dataValRow = xssfSheet.getRow(dataValRowNum);
					datavalCell = dataValRow.getCell(dataValColumn);
					typeCell = dataValRow.getCell(typeColumn);

					// if cell is null then create it
					if (null == datavalCell)
						datavalCell = dataValRow.createCell(dataValColumn);
						
					datavalCell.setCellValue((String)"");
					// if it is a type detail type then put the typedetail name
					// if it is a area type put area name instead of id

					// we need to check the method names here
					if (null != typeCell && (typeCell.getStringCellValue().equals("select_one state")
							|| typeCell.getStringCellValue().equals("select_one district")
							|| typeCell.getStringCellValue().equals("select_one block")
							|| typeCell.getStringCellValue().equals("select_one facility"))) {

						// we know this cannot be null
						datavalCell.setCellValue(areaIdNameMap.get((Integer) object));
						
//						if(typeCell.getStringCellValue().equals("select_one state"))
//								fileName = checklistName+"_"+areaIdNameMap.get((Integer) object)+"_"+currentDate
//								+messages.getMessage(Constants.Mobile.EXCEL_CHECKLIST_EXTENSION, null, null);
						
						if(getterMethodName.equals("getC5") || getterMethodName.equals("getFacilityId")) //getC4-facility name //from type detail
							areaName = areaIdNameMap.get((Integer) object);

						// if it is select type then get the value from typedetail
					} else if(null != typeCell && (typeCell.getStringCellValue().equals("select_one organisation") || 
							typeCell.getStringCellValue().equals("select_one org"))){
						
						datavalCell.setCellValue(organizationIdMap.get((Integer) object));
						
					} else if (null != typeCell && typeCell.getStringCellValue().contains("select_")) {
						if(typeCell.getStringCellValue().equals("select_one designation") || 
								typeCell.getStringCellValue().equals("select_one level")){
							datavalCell.setCellValue(!(object.toString().isEmpty() &&
									object.toString().trim().equals("")) ? object.toString().trim() : "");
						}else{
							datavalCell.setCellValue(!(object.toString().isEmpty() &&
								object.toString().trim().equals("")) ? typeIdNameMap.get((Integer) object) : "");
						}
						
					} else{
						datavalCell.setCellValue(object.toString());
						
//						facility checklist -- name of the supervisor
						if(getterMethodName.equals("getQ5"))
							toName = "User";
						else if(getterMethodName.equals("getC1"))
							toName = "Facility In-Charge";
//						community checklist -- name of the supervisor
						else if(getterMethodName.equals("getQ5a") || getterMethodName.equals("getC9"))
							toEmail = object.toString();
						else if(getterMethodName.equals("getQ4"))// getQ4-village name
							areaName = object.toString();
					 }
				}
//				else{
//					datavalCell.setCellValue("N/A");
//				}

			}
			
			
			
			//Write for plan of action(Assigned to Pratyush)
			List<PlanOfActionModel> paModels;
			List<PlanOfActionModel> lvdPOAModels;
			List<String> paModelKey = new ArrayList<>();
			int rowValue = 0;
			if(checklistWiseDataModel instanceof FacilityDataModel){
				paModels  = ((FacilityDataModel) checklistWiseDataModel).getPlanOfAction();
				lvdPOAModels = ((FacilityDataModel) checklistWiseDataModel).getLastVisitPlanOfAction();
				rowValue = 514;
			}
			else{
				paModels  = ((CommunityDataModel) checklistWiseDataModel).getPlanOfAction();
				lvdPOAModels = ((CommunityDataModel) checklistWiseDataModel).getLastVisitPlanOfAction();//
				rowValue = 219;
			}
			paModelKey.add(messages.getMessage(Constants.Mobile.PLAN_OF_ACTION_Q1, null, null));
			paModelKey.add(messages.getMessage(Constants.Mobile.PLAN_OF_ACTION_Q2, null, null));
			paModelKey.add(messages.getMessage(Constants.Mobile.PLAN_OF_ACTION_Q3, null, null));
			paModelKey.add(messages.getMessage(Constants.Mobile.PLAN_OF_ACTION_Q4, null, null));
			paModelKey.add(messages.getMessage(Constants.Mobile.PLAN_OF_ACTION_Q5, null, null));
			paModelKey.add(messages.getMessage(Constants.Mobile.PLAN_OF_ACTION_Q6, null, null));
			
			List<List<String>> paModelvalues = new ArrayList<>();
			List<List<String>> lvdPAModelvalues = new ArrayList<>();//
			for(PlanOfActionModel paModel : paModels){
				List<String> paModelvalue = new ArrayList<>();
					paModelvalue.add(paModel.getMajorFindings());
					paModelvalue.add(paModel.getIntervention_activities());
					paModelvalue.add(getRoleName(paModel.getLevelOfIntervention(), 
							messages.getMessage(Constants.Mobile.PLAN_OF_ACTION, null, null)));
					paModelvalue.add(getOrganizationName(paModel.getOrganizationId()));
					paModelvalue.add(getDesignationName(paModel.getResponsibility()));
					paModelvalue.add(paModel.getTimeline().toString());
					paModelvalues.add(paModelvalue);
			}
			for(PlanOfActionModel paModel : lvdPOAModels){//
				List<String> lvdPAModelvalue = new ArrayList<>();
					lvdPAModelvalue.add(paModel.getMajorFindings());
					lvdPAModelvalue.add(paModel.getIntervention_activities());
					lvdPAModelvalue.add(getRoleName(paModel.getLevelOfIntervention(), 
							messages.getMessage(Constants.Mobile.PLAN_OF_ACTION, null, null)));
					lvdPAModelvalue.add(getOrganizationName(paModel.getOrganizationId()));
					lvdPAModelvalue.add(getDesignationName(paModel.getResponsibility()));
					lvdPAModelvalue.add(paModel.getTimeline().toString());
					lvdPAModelvalues.add(lvdPAModelvalue);
			}//
			//border style for null column 
			
			if(null!=dataValRow)
				dataValRow = xssfSheet.createRow(rowValue);
			else
				dataValRow = xssfSheet.getRow(rowValue);
			datavalCell = dataValRow.createCell(dataValColumn);
			datavalCell.setCellStyle(cellStyle);
			
//			dataValRow = xssfSheet.getRow(rowValue);
			datavalCell = dataValRow.createCell(dataValColumn-1);
			datavalCell.setCellStyle(cellStyle);
			
//			dataValRow = xssfSheet.getRow(rowValue);
			datavalCell = dataValRow.createCell(dataValColumn-2);
			datavalCell.setCellStyle(cellStyle);
			
			for(int i=0; i<paModelvalues.size(); i++){
				rowValue++;
				dataValRow = xssfSheet.getRow(rowValue);
				
				//if data value row is null then create the row
				if(null==dataValRow){
					dataValRow = xssfSheet.createRow(rowValue);
				}
				
				datavalCell = dataValRow.getCell(dataValColumn-2);
				
				//if data value cell is null then create the cell
				if(null==datavalCell){
					datavalCell = dataValRow.createCell(dataValColumn-2);
				}
				//if the middle data value cell is null then create the cell
				if(null==datavalCell){
					datavalCell = dataValRow.createCell(dataValColumn-1);
					datavalCell.setCellValue("");
					datavalCell.setCellStyle(cellStyle);
				}
				
				typeCell = dataValRow.getCell(typeColumn);
//				if (null == datavalCell)
//					datavalCell = dataValRow.createCell(dataValColumn);
				datavalCell.setCellValue("Plan of Action ("+(i+1)+")");
				
				datavalCell.setCellStyle(titleCellStyle);
				
				//for null cell
				datavalCell = dataValRow.createCell(dataValColumn-1);
				datavalCell.setCellValue("");
				datavalCell.setCellStyle(cellStyle);
				
				datavalCell = dataValRow.createCell(dataValColumn);
				datavalCell.setCellValue("");
				datavalCell.setCellStyle(cellStyle);
				
				for(int j=0; j<paModelvalues.get(i).size(); j++){
					
					rowValue++;
					dataValRow = xssfSheet.getRow(rowValue);
					
					//if data value row is null then create the row
					if(null==dataValRow){
						dataValRow = xssfSheet.createRow(rowValue);
					}
					
					datavalCell = dataValRow.getCell(dataValColumn-2);
					
					//if data value cell is null then create the cell
					if(null==datavalCell){
						datavalCell = dataValRow.createCell(dataValColumn-2);
					}
					
					typeCell = dataValRow.getCell(typeColumn);
					if (null == datavalCell)
						datavalCell = dataValRow.createCell(dataValColumn);
					datavalCell.setCellValue(paModelKey.get(j));
					datavalCell.setCellStyle(cellStyle);
					
					dataValRow = xssfSheet.getRow(rowValue) != null ? xssfSheet.getRow(rowValue) : xssfSheet.createRow(rowValue);
					//for null cell
					datavalCell = dataValRow.createCell(dataValColumn-1);
					datavalCell.setCellValue("");
					datavalCell.setCellStyle(cellStyle);
//					if(null==dataValRow){
//						dataValRow = xssfSheet.createRow(rowValue);
//					}
					datavalCell = dataValRow.getCell(dataValColumn);
					typeCell = dataValRow.getCell(typeColumn);
					if (null == datavalCell)
						datavalCell = dataValRow.createCell(dataValColumn);
					datavalCell.setCellValue(paModelvalues.get(i).get(j));
					datavalCell.setCellStyle(cellStyle);
				}
			}
			
			//--------------------------------------------------------------
			for(int i=0; i<lvdPAModelvalues.size(); i++){
				rowValue++;
				dataValRow = xssfSheet.getRow(rowValue);
				
				//if data value row is null then create the row
				if(null==dataValRow){
					dataValRow = xssfSheet.createRow(rowValue);
				}
				
				datavalCell = dataValRow.getCell(dataValColumn-2);
				
				//if data value cell is null then create the cell
				if(null==datavalCell){
					datavalCell = dataValRow.createCell(dataValColumn-2);
				}
				//if the middle data value cell is null then create the cell
				if(null==datavalCell){
					datavalCell = dataValRow.createCell(dataValColumn-1);
					datavalCell.setCellValue("");
					datavalCell.setCellStyle(cellStyle);
				}
				
				typeCell = dataValRow.getCell(typeColumn);
//				if (null == datavalCell)
//					datavalCell = dataValRow.createCell(dataValColumn);
				datavalCell.setCellValue("Last Visit Plan of Action ("+(i+1)+")");
				
				datavalCell.setCellStyle(titleCellStyle);
				
				//for null cell
				datavalCell = dataValRow.createCell(dataValColumn-1);
				datavalCell.setCellValue("");
				datavalCell.setCellStyle(cellStyle);
				
				datavalCell = dataValRow.createCell(dataValColumn);
				datavalCell.setCellValue("");
				datavalCell.setCellStyle(cellStyle);
				
				for(int j=0; j<lvdPAModelvalues.get(i).size(); j++){
					
					rowValue++;
					dataValRow = xssfSheet.getRow(rowValue);
					
					//if data value row is null then create the row
					if(null==dataValRow){
						dataValRow = xssfSheet.createRow(rowValue);
					}
					
					datavalCell = dataValRow.getCell(dataValColumn-2);
					
					//if data value cell is null then create the cell
					if(null==datavalCell){
						datavalCell = dataValRow.createCell(dataValColumn-2);
					}
					
					typeCell = dataValRow.getCell(typeColumn);
					if (null == datavalCell)
						datavalCell = dataValRow.createCell(dataValColumn);
					datavalCell.setCellValue(paModelKey.get(j));
					datavalCell.setCellStyle(cellStyle);
					
					dataValRow = xssfSheet.getRow(rowValue) != null ? xssfSheet.getRow(rowValue) : xssfSheet.createRow(rowValue);
					//for null cell
					datavalCell = dataValRow.createCell(dataValColumn-1);
					datavalCell.setCellValue("");
					datavalCell.setCellStyle(cellStyle);
//					if(null==dataValRow){
//						dataValRow = xssfSheet.createRow(rowValue);
//					}
					datavalCell = dataValRow.getCell(dataValColumn);
					typeCell = dataValRow.getCell(typeColumn);
					if (null == datavalCell)
						datavalCell = dataValRow.createCell(dataValColumn);
					datavalCell.setCellValue(lvdPAModelvalues.get(i).get(j));
					datavalCell.setCellStyle(cellStyle);
				}
			}
			
			try {
				outputfile = new File(outputFilePath+fileName);
				outputStream = new FileOutputStream(outputfile);
				workbook.write(outputStream);
			} catch (IOException e) {
				logger.error("Exception : " + e);
				e.printStackTrace();
			}
			//send e-mail
			Map<String, String> fileNamePathMap = new HashMap<>();
			fileNamePathMap.put(fileName, outputFilePath);
			
			MailModel mailModel = new MailModel();
			mailModel.setFromUserName(messages.getMessage(Constants.Mobile.SUBMISSION_MESSAGE_FROM_NAME, null, null));
			mailModel.setToUserName(toName);
			mailModel.setToEmailIds(Arrays.asList(toEmail.split(",")));
			if(null!=ccEmailId)
				mailModel.setCcEmailIds(Arrays.asList(ccEmailId));
			mailModel.setMessage("Please find attached the submission file - "
				+checklistName.replaceAll("_", " ")+", for "+areaType+", "+areaName+"."); //replace  _  of checklistName with space
			mailModel.setSubject(messages.getMessage(Constants.Mobile.SUBMISSION_MESSAGE_SUBJECT, null, null));
			mailModel.setAttachments(fileNamePathMap);
			
			mailService.sendMail(mailModel);
			
		} catch (Exception e) {
			logger.error("Exception : " + e);
			e.printStackTrace();
		}
		finally {
			try {
				workbook.close();
				inputStream.close();
				outputStream.close();
			} catch (IOException e) {
				logger.error("Exception : " + e);
				e.printStackTrace();
			}
			/*if(null!=outputfile)
				outputfile.delete();*/  //uncomment later
		}
		
	}

	List<PlanOfActionModel> planOfActionModelsForExcel = new ArrayList<>();
	
	@Override
	public PrefetchResult prefetchFacilityData(PrefetchModel prefetchModel) {
		Integer facilityFormId = Integer.parseInt(messages.getMessage(Constants.Mobile.FORM_TYPE_FACILITY_CHECKLIST, null, null));
		Integer communityFormId = Integer.parseInt(messages.getMessage(Constants.Mobile.FORM_TYPE_COMMUNITY_CHECKLIST, null, null));
		PrefetchResult prefetchResult = new PrefetchResult();
		List<PlanOfActionModel> planOfActionModels = new ArrayList<>();
		planOfActionModelsForExcel = new ArrayList<>();
		if(prefetchModel.getFacilityList() != null){
			if(!prefetchModel.getFacilityList().isEmpty()){
				List<PlanOfAction> preFetchData = planOfActionRepository.findByIsLatestTrueAndFacilityAreaNIdInAndFormTypeId(prefetchModel.getFacilityList(), facilityFormId);
				
				if(preFetchData != null && !preFetchData.isEmpty()){
					for(PlanOfAction planOfAction : preFetchData){
						PlanOfActionModel planOfActionModel = new PlanOfActionModel();
						
						planOfActionModel.setFacilityId(planOfAction.getFacility().getAreaNId());
						planOfActionModel.setIntervention_activities(planOfAction.getIntervention_activities());
						planOfActionModel.setLevelOfIntervention(planOfAction.getLevelOfIntervention().getRoleId());
						planOfActionModel.setMajorFindings(planOfAction.getMajorFinding());
						planOfActionModel.setResponsibility(planOfAction.getResponsibility().getId());
						planOfActionModel.setSectionType(planOfAction.getSectionType().getId());
						planOfActionModel.setTimeline(planOfAction.getTimeline());
						planOfActionModel.setFormType(planOfAction.getFormType().getId());
						planOfActionModel.setUserId(planOfAction.getUser().getId());
						planOfActionModel.setOrganizationId(planOfAction.getResponsibility().getOrganization().getId());
						
						planOfActionModels.add(planOfActionModel);
						planOfActionModelsForExcel.add(planOfActionModel);
					}
					prefetchResult.setHasError(false);
					prefetchResult.setErrorCode(0);
				}
			}
			
			if(!prefetchModel.getCommunityList().isEmpty()){
				List<PlanOfAction> preFetchData = planOfActionRepository.findByIsLatestTrueAndFacilityAreaNIdInAndFormTypeId(prefetchModel.getCommunityList(), communityFormId);
				
				if(preFetchData != null && !preFetchData.isEmpty()){
					for(PlanOfAction planOfAction : preFetchData){
						PlanOfActionModel planOfActionModel = new PlanOfActionModel();
						
						planOfActionModel.setFacilityId(planOfAction.getFacility().getAreaNId());
						planOfActionModel.setIntervention_activities(planOfAction.getIntervention_activities());
						planOfActionModel.setLevelOfIntervention(planOfAction.getLevelOfIntervention().getRoleId());
						planOfActionModel.setMajorFindings(planOfAction.getMajorFinding());
						planOfActionModel.setResponsibility(planOfAction.getResponsibility().getId());
						planOfActionModel.setSectionType(planOfAction.getSectionType().getId());
						planOfActionModel.setTimeline(planOfAction.getTimeline());
						planOfActionModel.setFormType(planOfAction.getFormType().getId());
						planOfActionModel.setUserId(planOfAction.getUser().getId());
						planOfActionModel.setOrganizationId(planOfAction.getResponsibility().getOrganization().getId());
						
						planOfActionModels.add(planOfActionModel);
						planOfActionModelsForExcel.add(planOfActionModel);
					}
					prefetchResult.setHasError(false);
					prefetchResult.setErrorCode(0);
				}
			}
				
			if(planOfActionModels.isEmpty()){
				prefetchResult.setHasError(true);
				prefetchResult.setErrorCode(1);
				prefetchResult.setErrorMessage("No last visit data found for selected facilities");
			}
		}
		
		prefetchResult.setPrefetchData(planOfActionModels);
		return prefetchResult;
	}
	public String getRoleName(Integer roleId, String name){
		Role role = roleRepository.findByRoleId(roleId);
		String roleName = "";
		if(role != null){
			roleName = role.getRoleCode().equalsIgnoreCase(messages.getMessage(Constants.Mobile.ROLE_CODE_BLOCK, null, null))
					&& name.equals(messages.getMessage(Constants.Mobile.PLAN_OF_ACTION, null, null)) ? "Facility" 
							: role.getRoleName();
		}
		return roleName;
	}
	
	public String getOrganizationName(Integer organizationId){
		Organization organization = organizationRepository.findById(organizationId);
		String organizationName = "";
		if(organization != null){
			organizationName = organization.getOrganizationName();
		}
		return organizationName;
	}

	public String getDesignationName(Integer designationId){
	DesignationAreaOrganizationRoleMapping daorMapping = designationAreaOrganizationRoleMappingRepository.findById(designationId);
		String designationName = "";
		if(daorMapping != null){
			designationName = daorMapping.getDesignation().getName();
		}
		return designationName;
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

//	@Override
//	@Transactional
//	public String correctPlanOfAction() {
//		
//		List<PlanOfAction> planOfActions = planOfActionRepository.findAll();
//		List<EssUser> essUsers = essUserRepository.findAll();
//		List<FacilityData> facilityDataList = facilityDataRepository.findAll();
//		List<CommunityData> communityDataList = communityDataRepository.findAll();
//		try{
//			for(PlanOfAction poa : planOfActions){
//				Calendar calendar = Calendar.getInstance();
//				calendar.setTime(poa.getCreatedDate());
//				calendar.add(Calendar.MONTH, poa.getTimeline());
//				
//				try{
//					poa.setRecievedDate(sdf.parse(sdf.format(poa.getCreatedDate())));
//					poa.setDateOfVisit(sdf.parse(sdf.format(poa.getCreatedDate())));
//				}catch (Exception e) {
//					poa.setRecievedDate(sdfFull.parse(sdfFull.format(poa.getCreatedDate())));
//					poa.setDateOfVisit(sdfFull.parse(sdfFull.format(poa.getCreatedDate())));
//				}
//				poa.setExcpectedDateOfCompletion(calendar.getTime());
//				
//				if(poa.getFacility().getFacilityType().getId()==105)
//					poa.setDistrict(areaRepository.findByAreaNId(poa.getFacility().getParentAreaId()));
//
//				else{
//					poa.setBlock(areaRepository.findByAreaNId(poa.getFacility().getParentAreaId()));
//					poa.setDistrict(areaRepository.findByAreaNId(poa.getBlock().getParentAreaId()));
//				}
//
//			}
//			essUsers.forEach(user -> {
//				user.setPrimaryEmailId(RandomStringUtils.random(10, true, true) + "@sdrc.co.in");
//				user.setSecondaryEmailId("");
//				user.setPassword(messageDigest.encodePassword(user.getUsername(), "test@123#!"));
//			});
//			facilityDataList.forEach(facilityRecord -> {
//				facilityRecord.setCreatedDate(new Timestamp (facilityRecord.getC7().getTime()));
//			});
//			communityDataList.forEach(communityRecord -> {
//				communityRecord.setCreatedDate(new Timestamp (communityRecord.getDate().getTime()));
//			});
//		}catch (Exception e) {
//			logger.error(e.getMessage() + "Error while correcting plan of action");
//			e.printStackTrace();
//		}
//		return "Success";
//	}
}
