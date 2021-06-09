package org.sdrc.ess.service;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.sdrc.ess.domain.TypeDetail;
import org.sdrc.ess.domain.UserAreaMapping;
import org.sdrc.ess.domain.EssUser;
import org.sdrc.ess.domain.PlanOfAction;
import org.sdrc.ess.domain.Type;
import org.sdrc.ess.model.mobile.PlanOfActionModel;
import org.sdrc.ess.model.mobile.TypeDetailModel;
import org.sdrc.ess.model.mobile.TypeModel;
import org.sdrc.ess.model.mobile.UserAreaMappingModel;
import org.sdrc.ess.model.web.ErrorClass;
import org.sdrc.ess.model.web.EssUserModel;
import org.sdrc.ess.repository.EssUserRepository;
import org.sdrc.ess.repository.PlanOfActionRepository;
import org.sdrc.ess.repository.TypeDetailRepository;
import org.sdrc.ess.repository.TypeRepository;
import org.sdrc.ess.util.Constants;
import org.sdrc.ess.util.StateManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author Naseem Akhtar (naseem@sdrc.co.in) on 29th September 2017 14:58 hrs.
 * This service impl will handle all the request for open items page like update open items, display of open items etc.
 */

@Service
public class OpenItemsServiceImpl implements OpenItemsService {
	
	private static final Logger logger = LoggerFactory.getLogger(MobileServiceImpl.class);

	@Autowired
	private TypeDetailRepository typeDetailRepository;
	
	@Autowired
	private TypeRepository typeRepository;
	
	@Autowired
	private PlanOfActionRepository planOfActionRepository;
	
	@Autowired
	private StateManager stateManager;
	
	@Autowired
	private EssUserRepository essUserRepository;
	
	/*@Autowired
	private AreaRepository areaRepository;*/
	
	@Autowired
	private ResourceBundleMessageSource messages;
	
	private SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
	
	/**
	 * @author Naseem Akhtar on 29th September 2017 14:58 hrs.
	 * This method will be called when an user is redirected to openItems page, this method will send all the data
	 * to front end for display and edit purpose.
	 */
	@Override
	public Map<String, Object> fetchOpenItems() {
		
		Map<String, Object> data = new HashMap<>();
		
		EssUserModel essUserModel = (EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL);
		
		if(essUserModel != null){
			
			ObjectMapper mapper = new ObjectMapper();
			EssUser essUser = essUserRepository.findByUsername(essUserModel.getUsername());
			
			UserAreaMapping areaMapping = essUser.getUserAreaMappings();
			try {
				/**
				 * @author Naseem Akhtar (naseem@sdrc.co.in) - The next block of code needs optimization, consult
				 * Harekrishna Sir and proceed further for optimization.
				 */
				
				String roleCode = essUser.getDesignationAreaOrganizationRoleMapping().getRole().getRoleCode();
				UserAreaMappingModel assignedAreas = null;
				if(essUser.getInChargeFacilityId() == null || !roleCode.equals(Constants.Web.BLOCK_CODE)){
					assignedAreas = mapper.readValue(areaMapping.getAreaJson(), UserAreaMappingModel.class);
					List<Integer> areaIdList = new ArrayList<>();
					areaIdList.add(assignedAreas.getCountry());
					if(assignedAreas.getState() != null && !assignedAreas.getState().isEmpty())
						areaIdList.addAll(assignedAreas.getState());
					if(assignedAreas.getDistrict() != null && !assignedAreas.getDistrict().isEmpty())
						areaIdList.addAll(assignedAreas.getDistrict());
					if(assignedAreas.getBlock() != null && !assignedAreas.getBlock().isEmpty())
						areaIdList.addAll(assignedAreas.getBlock());
					if(assignedAreas.getFacility() != null && !assignedAreas.getFacility().isEmpty())
						areaIdList.addAll(assignedAreas.getFacility());
				}
				
				List<Type> type = typeRepository.findAll();
				List<TypeModel> typeModels = new ArrayList<>();
				
				type.forEach(item -> {
					TypeModel typeModel = new TypeModel();
					
					typeModel.setId(item.getId());
					typeModel.setName(item.getName());
					
					typeModels.add(typeModel);
				});
				
				data.put("TypeList", typeModels);
				List<TypeDetail> typeDetails = typeDetailRepository.findAll();
				List<TypeDetailModel> typeDetailModels = new ArrayList<>();
				
				typeDetails.forEach(item -> {
					TypeDetailModel typeDetailModel = new TypeDetailModel();
					
					typeDetailModel.setId(item.getId());
					typeDetailModel.setName(item.getName());
					typeDetailModel.setOrderLevel(item.getOrderLevel());
					typeDetailModel.setTypeId(item.getTypeId());
					
					typeDetailModels.add(typeDetailModel);
				});
				
				data.put("TypeDetailList", typeDetailModels);
				List<PlanOfAction> planOfActions;
				if(essUser.getInChargeFacilityId() != null && roleCode.equals(Constants.Web.BLOCK_CODE)){
					planOfActions = planOfActionRepository.findByResponsibilityAndFacilityOrderByRecievedDateDesc
							(essUser.getDesignationAreaOrganizationRoleMapping(),essUser.getInChargeFacilityId());
				}else{
					/**
					 * @author Naseem Akhtar (naseem@sdrc.co.in) - The next block of code needs optimization, consult
					 * Harekrishna Sir and proceed further for optimization.
					 * To do - check if can manage through single code or query
					 */
					switch (roleCode) {
					case Constants.Web.DISTRICT_CODE:
						planOfActions = planOfActionRepository.findByResponsibilityAndDistrictAreaNIdOrderByRecievedDateDesc
						(essUser.getDesignationAreaOrganizationRoleMapping(), assignedAreas.getDistrict().get(0));
						break;
					case Constants.Web.BLOCK_CODE:
						planOfActions = planOfActionRepository.findByResponsibilityAndBlockAreaNIdOrderByRecievedDateDesc
						(essUser.getDesignationAreaOrganizationRoleMapping(), assignedAreas.getBlock().get(0));
						break;
					default:
						planOfActions = planOfActionRepository.findByResponsibilityOrderByRecievedDateDesc
						(essUser.getDesignationAreaOrganizationRoleMapping());
						break;
					}
				}
				List<PlanOfActionModel> planOfActionModels = new ArrayList<>();
				
				planOfActions.forEach(item -> {
					PlanOfActionModel planOfActionModel = new PlanOfActionModel();
					
					planOfActionModel.setId(item.getId());
					planOfActionModel.setDateOfCompletion(item.getDateOfCompletion() == null ? "NA" : 
						sdf.format(item.getDateOfCompletion()));
					planOfActionModel.setFacilityName(item.getFacility().getName());
					planOfActionModel.setChecklistName(item.getFormType().getName());
					planOfActionModel.setIntervention_activities(item.getIntervention_activities());
					planOfActionModel.setLevelOfInterventionName(item.getLevelOfIntervention().getRoleName());
					planOfActionModel.setRemarks(item.getRemarks());
					planOfActionModel.setSectionName(item.getSectionType().getName());
					planOfActionModel.setStatus(item.getStatus().getId());
					planOfActionModel.setTimeline(item.getTimeline());
					planOfActionModel.setAssignedBy(item.getUser().getMiddleName() == null ? 
						item.getUser().getSalutation().getName() + " " +item.getUser().getFirstName() + " " + item.getUser().getLastName()
						: item.getUser().getSalutation().getName() + " " + item.getUser().getFirstName() + " " + 
						item.getUser().getMiddleName() + " " + item.getUser().getLastName());
					planOfActionModel.setRecievedDate(item.getRecievedDate() == null ? null : sdf.format(item.getRecievedDate()));
					planOfActionModel.setDateOfVisit(item.getDateOfVisit().toString());
					planOfActionModel.setOrganizationName(item.getResponsibility().getOrganization().getOrganizationName());
					
					planOfActionModels.add(planOfActionModel);
				});
				
				data.put("ActionItems", planOfActionModels);
				return data;
			} catch (IOException e) {
				logger.error("Unable to parse the area json, insufficient memory \n");
				e.printStackTrace();
			} catch (Exception e){
				logger.error("Unknown error");
				e.printStackTrace();
			}
		}
		return null;
	}

	/**
	 * @author Naseem Akhtar (naseem@sdrc.co.in) on 29th September 2017 14:58 hrs.
	 * This method will be called when an user who is responsible for open items updates
	 * his/her open items.
	 */
	@Override
	@Transactional
	public ErrorClass updateOpenItems(PlanOfActionModel planOfActionModel) {
		ErrorClass errorClass = new ErrorClass();
		PlanOfAction planOfAction = null;
		if(planOfActionModel.getRemarks() != null && planOfActionModel.getRemarks().trim() != ""){
			EssUserModel essUserModel = (EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL);
			EssUser essUser = essUserRepository.findByUsernameAndIsActiveTrue(essUserModel.getUsername());
			planOfAction = planOfActionRepository.findByResponsibilityAndId(
					essUser.getDesignationAreaOrganizationRoleMapping(), planOfActionModel.getId());
			
			if(planOfAction != null){
				planOfAction.setStatus(new TypeDetail(new Integer (messages.getMessage(Constants.Web.PLAN_OF_ACTION_STATUS_CLOSED, null, null))));
				planOfAction.setUpdatedDate(new Timestamp(System.currentTimeMillis()));
				planOfAction.setRemarks(planOfActionModel.getRemarks());
				try {
					planOfAction.setDateOfCompletion(sdf.parse(sdf.format(new Date())));
				} catch (ParseException e) {
					logger.warn("Error in parsing date while updating open action items");
					e.printStackTrace();
				}
			}
		}
		errorClass.setErrorMessage(planOfAction == null ? "Update Failed" : "Updated Successfully");
		errorClass.setStatusCode(planOfAction == null ? 500 : 200);
		
		return errorClass;
	}

}
