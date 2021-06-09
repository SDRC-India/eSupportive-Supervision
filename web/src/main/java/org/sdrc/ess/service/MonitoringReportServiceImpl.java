package org.sdrc.ess.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.sdrc.ess.domain.Area;
import org.sdrc.ess.domain.TypeDetail;
import org.sdrc.ess.model.mobile.AreaModel;
import org.sdrc.ess.model.web.EssUserModel;
import org.sdrc.ess.model.web.MonitoringReportRequestModel;
import org.sdrc.ess.repository.AreaRepository;
import org.sdrc.ess.repository.FacilityDataRepository;
import org.sdrc.ess.repository.TypeDetailRepository;
import org.sdrc.ess.repository.springdatajpa.UtIndicatorEnRepository2;
import org.sdrc.ess.util.Constants;
import org.sdrc.ess.util.StateManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MonitoringReportServiceImpl implements MonitoringReportService {

	@Autowired
	private UtIndicatorEnRepository2 utIndicatorEnRepository2;
	
	@Autowired
	private ResourceBundleMessageSource messages;

//	@Autowired
//	private UtTimeperiodRepository utTimeperiodRepository;
//	
//	@Autowired
//	private UserAreaMappingRepository userAreaMappingRepository;
	
	@Autowired
	private AreaRepository areaRepository;
	
	@Autowired
	private TypeDetailRepository typeDetailRepository;
	
	@Autowired
	private FacilityDataRepository facilityDataRepository;

	@Autowired
	private StateManager stateManager;
	
	private SimpleDateFormat sdfFull = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	@SuppressWarnings("unchecked")
	@Override
	@Transactional(readOnly = true)
	public JSONObject getBasicDataForMonitoringReport() {
		EssUserModel user = (EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL);

		JSONParser parser = new JSONParser();
		JSONArray areaArray = null;
		String areaString;
		JSONObject json = new JSONObject();

		switch (user.getUserLevel()) {
		case 1:
			json.put("isNationalUser", true);
			// country level user

			areaString = utIndicatorEnRepository2.findAllInJsonStructure();

			try {
				areaArray = (JSONArray) parser.parse(areaString);

				for (Object o : areaArray) {
					JSONObject state = (JSONObject) o;

					JSONArray districtList = (JSONArray) state.get("children");

					JSONObject allDistrict = new JSONObject();
					allDistrict.put("area_nid_pk", state.get("area_nid_pk"));
					allDistrict.put("level", 3);
					allDistrict.put("name", "All");
					allDistrict.put("parent_area_id", state.get("area_nid_pk"));
					allDistrict.put("children", new JSONArray());
					allDistrict.put("map_name", state.get("map_name"));
					allDistrict.put("area_id", state.get("area_id"));

					for (Object d : districtList) {
						JSONObject district = (JSONObject) d;
						JSONArray blockList = (JSONArray) district.get("children");

						JSONObject allBlock = new JSONObject();
						allBlock.put("area_nid_pk", district.get("area_nid_pk"));
						allBlock.put("level", 4);
						allBlock.put("name", "All");
						allBlock.put("parent_area_id", district.get("area_nid_pk"));
						allBlock.put("children", new JSONArray());
						allBlock.put("map_name", district.get("map_name"));
						allBlock.put("area_id", district.get("area_id"));

						blockList.add(0, allBlock);
					}

					districtList.add(0, allDistrict);
				}

				JSONObject allState = new JSONObject();
				allState.put("area_nid_pk", 1);
				allState.put("level", 2);
				allState.put("name", "All");
				allState.put("parent_area_id", 1);
				allState.put("children", new JSONArray());
				allState.put("map_name", "india.json");
				allState.put("area_id", "IND");

				areaArray.add(0, allState);

			} catch (org.json.simple.parser.ParseException e) {
				e.printStackTrace();
			}
			break;
		case 2:
		case 3:
		case 4:
		case 5:
			int stateId = user.getStateId();
			json.put("isNationalUser", false);

			areaString = utIndicatorEnRepository2.findByStateInJsonStructure(stateId);

			try {
				areaArray = (JSONArray) parser.parse(areaString);
			} catch (org.json.simple.parser.ParseException e) {
				e.printStackTrace();
			}
			break;
		}

		if (user.getUserLevel() == 2) {
			for (Object o : areaArray) {
				JSONObject state = (JSONObject) o;

				JSONArray stateChildren = (JSONArray) state.get("children");
				stateChildren.forEach(district -> {
					JSONObject dist = (JSONObject) district;
					JSONArray blockList = (JSONArray) dist.get("children");
					JSONObject allBlock = new JSONObject();
					allBlock.put("area_nid_pk", dist.get("area_nid_pk"));
					allBlock.put("level", 4);
					allBlock.put("name", "All");
					allBlock.put("parent_area_id", dist.get("area_nid_pk"));
					allBlock.put("children",  new JSONArray());
					allBlock.put("area_id",  dist.get("area_id"));
					blockList.add(0, allBlock);
				});

				JSONObject allDistrict = new JSONObject();
				allDistrict.put("area_nid_pk", state.get("area_nid_pk"));
				allDistrict.put("level", 3);
				allDistrict.put("name", "All");
				allDistrict.put("parent_area_id", state.get("area_nid_pk"));
				allDistrict.put("children", new JSONArray());
				allDistrict.put("map_name", state.get("map_name"));
				allDistrict.put("area_id", state.get("area_id"));

				stateChildren.add(0, allDistrict);
			}
		}

//		List<UtTimeperiod> timePeriodList = utTimeperiodRepository.findByPeriodicityPreodicityIdOrderByStartDateAsc(1);
//		Map<Integer, Preodicity> periodicityMap = new HashMap<>();
//		JSONArray periodictiyArray = new JSONArray();
//		JSONArray timePeriodArray = new JSONArray();
//
//		timePeriodList.forEach(timePeriod -> {
//			JSONObject timePeriodObj = new JSONObject();
//			timePeriodObj.put("timePeriod_NId", timePeriod.getTimePeriod_NId());
//			timePeriodObj.put("timePeriod", timePeriod.getTimePeriod());
//			timePeriodObj.put("periodicity", timePeriod.getPeriodicity().getPreodicityId());
//
//			timePeriodArray.add(timePeriodObj);
//			periodicityMap.put(timePeriod.getPeriodicity().getPreodicityId(), timePeriod.getPeriodicity());
//		});
//
//		periodicityMap.forEach((periodicityId, periodicityObject) -> {
//			JSONObject periodicity = new JSONObject();
//			periodicity.put("periodicityId", periodicityObject.getPreodicityId());
//			periodicity.put("periodicityName", periodicityObject.getPreodicityName());
//			periodictiyArray.add(periodicity);
//		});
		JSONArray facilityTypes = new JSONArray();
		List<TypeDetail> facilityTypeList = typeDetailRepository.
				findByTypeIdId(new Integer (messages.getMessage(Constants.Web.FACILITYTYPEFORAREA_TYPE_ID, null, null)));
		
		JSONObject object = new JSONObject();
		object.put("id", 0);
		object.put("value", "All");
		object.put("orderLevel", 1);
		object.put("typeId", 13);
		facilityTypes.add(object);
		facilityTypeList.forEach(facilityTypeObject -> {
			JSONObject facilityType = new JSONObject();
			facilityType.put("id", facilityTypeObject.getId());
			facilityType.put("value", facilityTypeObject.getName());
			facilityType.put("orderLevel", facilityTypeObject.getOrderLevel());
			facilityType.put("typeId", facilityTypeObject.getTypeId());
			
			facilityTypes.add(facilityType);
		});

		json.put("areaJson", areaArray);
		json.put("facilityTypeList", facilityTypes);
//		json.put("timePeriod", timePeriodArray);
//		json.put("periodicty", periodictiyArray);

		return json;
	}

//	@SuppressWarnings("unchecked")
	@Override
	@Transactional(readOnly = true)
	public Object getUserMonitoringReportData(MonitoringReportRequestModel obj) {
		
		Map<Integer, AreaModel> areaMap = new HashMap<>();
//		List<AreaModel> areaList = new ArrayList<>();
		AreaModel areaForReference = new AreaModel();
		String startDate = obj.getStartDate().concat(" 00:00:00");
		String endDate = obj.getEndDate().concat(" 23:59:59");
		
		List<Area> areas = areaRepository.findAll();
		areas.forEach(area-> {
			AreaModel areaModel = new AreaModel();
			areaModel.setAreaNId(area.getAreaNId());
			areaModel.setLevel(area.getLevel());
			areaModel.setName(area.getName());
			areaModel.setParentAreaId(area.getParentAreaId());
			
			areaMap.put(area.getAreaNId(), areaModel);
		});
		
//		if(obj.getPeriodicityId() != -1){
//			UtTimeperiod timePeriod = utTimeperiodRepository.findByTimeperiodNid(obj.getTimeperiodId());
//			startDate = timePeriod.getStartDate().toString();
//			endDate = timePeriod.getEndDate().toString();
//		}else{
//			try {
//				String recievedDate = obj.getToDate().concat(" 00:00:00");
//				Date date = sdfFull.parse(recievedDate);
//				Calendar cal = Calendar.getInstance();
//				cal.setTime(date);
//				cal.set(Calendar.DATE, 1);
//				startDate = sdfFull.format(cal.getTime());
//				endDate = obj.getDate();
//			} catch (ParseException e) {
//				e.printStackTrace();
//			}
//		}
		
		
		if(obj.getBlockId() != null){
			areaForReference = areaMap.get(obj.getBlockId());
		}else if(obj.getDistrictId() != null){
			areaForReference = areaMap.get(obj.getDistrictId());
		}else{
			areaForReference = areaMap.get(obj.getStateId());
		}
		
//		Integer areaIdSelected = areaForReference.getAreaNId();
//		Integer parentId = areaForReference.getParentAreaId();
//		areas.forEach(area -> {
//			if(areaIdSelected.intValue() == area.getParentAreaId().intValue() || areaIdSelected.intValue() == area.getAreaNId().intValue()
//					|| parentId.intValue() == area.getAreaNId().intValue()){
//				AreaModel areaModel = new AreaModel();
//				areaModel.setAreaNId(area.getAreaNId());
//				areaModel.setLevel(area.getLevel());
//				areaModel.setName(area.getName());
//				areaModel.setParentAreaId(area.getParentAreaId());
//				areaList.add(areaModel);
//			}
//		});
		
		JSONObject object = getRegisteredAndLoggedInUsers(areaForReference, startDate, endDate);
//		JSONObject plannedAndActualFacilityVisits = getPlannedAndActualVisits(areaForReference, startDate, endDate);
		
		JSONObject data = object;
//		data.put("registeredUsersList", userList.get("registeredUsersList"));
//		data.put("loggedInUsersList", userList.get("loggedInUsersList"));
//		data.put("areaList", areaList);
		
		return data;
	}
	
	@SuppressWarnings("unchecked")
	public JSONObject getRegisteredAndLoggedInUsers(AreaModel area, String startDate, String endDate){
		List<Object[]> usersRegisteredList = null;
		List<Object[]> usersLoggedInListList = null;
		List<Object[]> areaList = null;
		JSONArray registeredUsersList = new JSONArray();
		JSONArray loggedInUsersList = new JSONArray();
		JSONArray jsonAreaList = new JSONArray();
		JSONObject obj = new JSONObject();
		
		switch(area.getLevel()){
		case 1 :
			usersRegisteredList = utIndicatorEnRepository2.findRegisteredUsersStateWise(endDate);
			usersLoggedInListList = utIndicatorEnRepository2.findLoggedInUsersStateWise(startDate,endDate);
			areaList = areaRepository.findAreaAndChildCountryWise();
			break;
		case 2 :
			usersRegisteredList = utIndicatorEnRepository2.findRegisteredUsersDistrictWise(area.getAreaNId(), endDate);
			usersLoggedInListList = utIndicatorEnRepository2.findLoggedInUsersDistrictWise(area.getAreaNId(),startDate,endDate);
			areaList = areaRepository.findAreaAndChildByAreaId(area.getAreaNId());
			break;
		case 3 :
			usersRegisteredList = utIndicatorEnRepository2.findRegisteredUsersBlockWise(area.getAreaNId(), endDate);
			usersLoggedInListList = utIndicatorEnRepository2.findLoggedInUsersBlockWise(area.getAreaNId(),startDate,endDate);
			areaList = areaRepository.findAreaAndChildByAreaId(area.getAreaNId());
			break;
		case 4 :
			usersRegisteredList = utIndicatorEnRepository2.findRegisteredUsersForBlock(area.getAreaNId(), area.getParentAreaId(), endDate);
			usersLoggedInListList = utIndicatorEnRepository2.findLoggedInUsersForBlock(area.getAreaNId(), area.getParentAreaId(),startDate,endDate);
			areaList = areaRepository.findAreaAndParentByAreaId(area.getAreaNId(), area.getParentAreaId());
			break;
		}
		
		if(usersRegisteredList != null && (!usersRegisteredList.isEmpty())){
			usersRegisteredList.forEach(object -> {
				JSONObject jObject = new JSONObject();
				jObject.put("areaId", object[0]);
				jObject.put("registeredUsers", object[2]);
				
				registeredUsersList.add(jObject);
			});
		}
		
		if(usersLoggedInListList != null && (!usersLoggedInListList.isEmpty())){
			usersLoggedInListList.forEach(object -> {
				JSONObject jObject = new JSONObject();
				jObject.put("areaId", object[0]);
				jObject.put("loggedInUsers", object[2]);
				
				loggedInUsersList.add(jObject);
			});
		}
		
		areaList.forEach(areaObj -> {
			JSONObject areaObject = new JSONObject();
			areaObject.put("area_nid_pk", areaObj[0]);
			areaObject.put("name", areaObj[1]);
			areaObject.put("level", areaObj[2]);
			jsonAreaList.add(areaObject);
		});
		
		obj.put("registeredUsersList", registeredUsersList);
		obj.put("loggedInUsersList", loggedInUsersList);
		obj.put("areaList", jsonAreaList);
		
		return obj;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Object getMonitoringReportDataFacility(MonitoringReportRequestModel obj) {
		
		Map<Integer, AreaModel> areaMap = new HashMap<>();
		List<AreaModel> areaList = new ArrayList<>();
		List<Integer> facilityTypeIdList = new ArrayList<>();
		AreaModel areaForReference = new AreaModel();
		List<Area> areas = areaRepository.findAll();
		areas.forEach(area-> {
			AreaModel areaModel = new AreaModel();
			areaModel.setAreaNId(area.getAreaNId());
			areaModel.setLevel(area.getLevel());
			areaModel.setName(area.getName());
			areaModel.setParentAreaId(area.getParentAreaId());
			
			areaMap.put(area.getAreaNId(), areaModel);
		});
		
		if(obj.getFacilityTypeId() == 0){
			List<TypeDetail> typeDetailObjectList = typeDetailRepository.
					findByTypeIdId(new Integer (messages.getMessage(Constants.Web.FACILITYTYPEFORAREA_TYPE_ID, null, null)));
			typeDetailObjectList.forEach(object ->{
				facilityTypeIdList.add(object.getId());
			});
		}else{
			facilityTypeIdList.add(obj.getFacilityTypeId());
		}
		
		if(obj.getBlockId() != null){
			areaForReference = areaMap.get(obj.getBlockId());
		}else if(obj.getDistrictId() != null){
			areaForReference = areaMap.get(obj.getDistrictId());
		}else{
			areaForReference = areaMap.get(obj.getStateId());
		}
		
		String startDateReceived = obj.getStartDate().concat(" 00:00:00");
		String endDateReceived = obj.getEndDate().concat(" 23:59:59");
		
		Integer areaIdSelected = areaForReference.getAreaNId();
		areas.forEach(area -> {
			if(areaIdSelected.intValue() == area.getParentAreaId().intValue() || areaIdSelected.intValue() == area.getAreaNId().intValue()){
				AreaModel areaModel = new AreaModel();
				areaModel.setAreaNId(area.getAreaNId());
				areaModel.setLevel(area.getLevel());
				areaModel.setName(area.getName());
				areaModel.setParentAreaId(area.getParentAreaId());
				areaList.add(areaModel);
			}
		});
		
		JSONObject object = getTotalFacilityAndVisitsByArea(areaForReference, startDateReceived,
				endDateReceived, areaMap, facilityTypeIdList);
		object.put("areaList", areaList);
		
		return object;
	}
	
	@SuppressWarnings("unchecked")
	public JSONObject getTotalFacilityAndVisitsByArea(AreaModel area, String startDate, String endDate, 
			Map<Integer, AreaModel> areaMap, List<Integer> facilityTypeIdList){
		
		List<Object []> totalFacilitiesByArea;
		List<Object []> actualAndUniqueFacilityVisitList;
//		List<Object []> actualAndUniqueCommunityVisitList;
		JSONObject object = new JSONObject();
		JSONArray totalFacilitiesByAreaArray = new JSONArray();
		JSONArray facilityVisits = new JSONArray();
//		JSONArray communityVisits = new JSONArray();
		
		switch(area.getLevel()){
		case 1:
			totalFacilitiesByArea = areaRepository.findTotalFacilitiesStateWise(area.getAreaNId(), facilityTypeIdList);
//			actualAndUniqueFacilityVisitList = utIndicatorEnRepository2.findUniqueAndTotalFacilityVisitsStateWise(area.getAreaNId(),startDate,endDate);
			actualAndUniqueFacilityVisitList = facilityDataRepository.findUniqueAndTotalFacilityVisitsStateWise(startDate,endDate,facilityTypeIdList);
//			actualAndUniqueCommunityVisitList = utIndicatorEnRepository2.findUniqueAndTotalCommunityVisitsStateWise(area.getAreaNId(),startDate,endDate);
			break;
		case 2:
			totalFacilitiesByArea = areaRepository.findTotalFacilitiesDistrictWise(area.getAreaNId(), facilityTypeIdList);
//			actualAndUniqueFacilityVisitList = utIndicatorEnRepository2.findUniqueAndTotalFacilityVisitsDistrictWise(area.getAreaNId(),startDate,endDate);
			actualAndUniqueFacilityVisitList = facilityDataRepository.findUniqueAndTotalFacilityVisitsDistrictWise(area.getAreaNId(),startDate,endDate,facilityTypeIdList);
//			actualAndUniqueCommunityVisitList = utIndicatorEnRepository2.findUniqueAndTotalCommunityVisitsDistrictWise(area.getAreaNId(),startDate,endDate);
			break;
		case 3:
			totalFacilitiesByArea = areaRepository.findTotalFacilitiesBlockWise(area.getAreaNId(), facilityTypeIdList);
//			actualAndUniqueFacilityVisitList = utIndicatorEnRepository2.findUniqueAndTotalFacilityVisitsBlockWise(area.getAreaNId(),startDate,endDate);
			actualAndUniqueFacilityVisitList = facilityDataRepository.findUniqueAndTotalFacilityVisitsBlockWise(area.getAreaNId(),startDate,endDate,facilityTypeIdList);
//			actualAndUniqueCommunityVisitList = utIndicatorEnRepository2.findUniqueAndTotalCommunityVisitsBlockWise(area.getAreaNId(),startDate,endDate);
			break;
		case 4:
			totalFacilitiesByArea = areaRepository.findTotalFacilitiesForBlock(area.getAreaNId(), facilityTypeIdList);
//			actualAndUniqueFacilityVisitList = utIndicatorEnRepository2.findUniqueAndTotalFacilityVisitsForBlock(area.getAreaNId(),startDate,endDate);
			actualAndUniqueFacilityVisitList = facilityDataRepository.findUniqueAndTotalFacilityVisitsForBlock(area.getAreaNId(),startDate,endDate,facilityTypeIdList);
//			actualAndUniqueCommunityVisitList = utIndicatorEnRepository2.findUniqueAndTotalCommunityVisitsForBlock(area.getAreaNId(),startDate,endDate);
			break;
			default :
				totalFacilitiesByArea = null;
				actualAndUniqueFacilityVisitList = null;
//				actualAndUniqueCommunityVisitList = null;
					break;
		
		}
		
		if(totalFacilitiesByArea != null && (!totalFacilitiesByArea.isEmpty())){
			totalFacilitiesByArea.forEach(result -> {
				JSONObject jObject = new JSONObject();
				jObject.put("areaId", result[1]);
				jObject.put("totalFacilities", result[2]);
				
				totalFacilitiesByAreaArray.add(jObject);
			});
		}
		
		if(actualAndUniqueFacilityVisitList != null && (!actualAndUniqueFacilityVisitList.isEmpty())){
			actualAndUniqueFacilityVisitList.forEach(result -> {
				JSONObject jObject = new JSONObject();
				jObject.put("areaId", result[0]);
				jObject.put("totalVists", result[1]);
				jObject.put("uniqueVisits", result[2]);
				
				facilityVisits.add(jObject);
			});
		}
	
//		if(actualAndUniqueCommunityVisitList != null && (!actualAndUniqueCommunityVisitList.isEmpty())){
//			actualAndUniqueCommunityVisitList.forEach(result -> {
//				JSONObject jObject = new JSONObject();
//				jObject.put("areaId", result[0]);
//				jObject.put("totalVists", result[1]);
//				jObject.put("uniqueVisits", result[2]);
//				
//				communityVisits.add(jObject);
//			});
//		}
	
		object.put("totalFacilities", totalFacilitiesByAreaArray);
		object.put("actualAndUniqueFacilityVisits", facilityVisits);
//		object.put("actualAndUniqueCommunityVisits", communityVisits);
		
		return object;
		
	}

}
