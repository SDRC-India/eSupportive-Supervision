package org.sdrc.ess.service;

import org.sdrc.ess.repository.AreaRepository;
import org.sdrc.ess.repository.EssUserRepository;
import org.sdrc.ess.repository.PrediocityRepository;
import org.sdrc.ess.repository.TypeDetailRepository;
import org.sdrc.ess.repository.UtDataReporsitory;
import org.sdrc.ess.repository.UtIndicatorClassificationsEnRepository;
import org.sdrc.ess.repository.UtIndicatorEnRepository;
import org.sdrc.ess.repository.UtIndicatorUnitSubgroupRepository;
import org.sdrc.ess.repository.UtTimeperiodRepository;
import org.sdrc.ess.repository.springdatajpa.UtIndicatorEnRepository2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.sdrc.ess.core.UtUnitType;
import org.sdrc.ess.core.ValueObjectForDashboard;
import org.sdrc.ess.domain.Area;
import org.sdrc.ess.domain.Preodicity;
import org.sdrc.ess.domain.Type;
import org.sdrc.ess.domain.TypeDetail;
import org.sdrc.ess.domain.UtData;
import org.sdrc.ess.domain.UtIndicatorClassificationsEn;
import org.sdrc.ess.domain.UtIndicatorEn;
import org.sdrc.ess.domain.UtIndicatorUnitSubgroup;
import org.sdrc.ess.domain.UtSubgroupValsEn;
import org.sdrc.ess.domain.UtTimeperiod;
import org.sdrc.ess.domain.UtUnitEn;
import org.sdrc.ess.model.mobile.AreaModel;
import org.sdrc.ess.model.mobile.TypeDetailModel;
import org.sdrc.ess.model.web.DataCollectionModel;
import org.sdrc.ess.model.web.DataModel;
import org.sdrc.ess.model.web.EssUserModel;
import org.sdrc.ess.model.web.LineChartData;
import org.sdrc.ess.util.Constants;
import org.sdrc.ess.util.StateManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ThematicDashboardViewServiceImpl implements ThematicDashboardViewService {

	@Autowired
	private UtIndicatorEnRepository utIndicatorEnRepository;

	@Autowired
	private UtIndicatorClassificationsEnRepository utIndicatorClassificationsEnRepository;

	@Autowired
	private UtIndicatorUnitSubgroupRepository utIndicatorUnitSubgroupRepository;

	@Autowired
	private UtTimeperiodRepository utTimeperiodRepository;

	@Autowired
	private AreaRepository areaRepository;

	@Autowired
	private UtDataReporsitory utDataReporsitory;

	@Autowired
	private PrediocityRepository prediocityRepository;

	@Autowired
	private StateManager stateManager;
	
	@Autowired
	private TypeDetailRepository typeDetailRepository;
	
	@Autowired
	private ResourceBundleMessageSource messages;
	
	@Autowired
	private UtIndicatorEnRepository2 utIndicatorEnRepository2;

	private final Logger _log = LoggerFactory.getLogger(ThematicDashboardViewServiceImpl.class);

	@Override
	@Transactional
	public List<ValueObjectForDashboard> fetchIndicators(String sector) {
		Integer sectorNid = Integer.parseInt(sector);
		// Fething all indicator of PERCENT TYPE
		List<Object[]> listofIndicators = utIndicatorEnRepository.fetchIndicatorFromSector(sectorNid, UtUnitType.PERCENT);

		List<ValueObjectForDashboard> list = new ArrayList<ValueObjectForDashboard>();

		for (int i = 0; i < listofIndicators.size(); i++) {
			Object[] objects = listofIndicators.get(i);

			ValueObjectForDashboard vObject = new ValueObjectForDashboard();
			String indName = "";
			String unitName = "";
			String subName = "";
			for (Object obj : objects) {

				if (obj instanceof UtIndicatorEn) {
					UtIndicatorEn utIUS = (UtIndicatorEn) obj;
					_log.debug("Indicator NID  ===>" + utIUS.getIndicator_NId() + "  Indicator Name  ====  " + utIUS.getIndicator_Name() + " ==== ");
					indName = utIUS.getIndicator_Name();
					vObject.setKey(Integer.toString(utIUS.getIndicator_NId()));
				} else if (obj instanceof UtUnitEn) {
					UtUnitEn unitEn = (UtUnitEn) obj;
					unitName = unitEn.getUnit_Name();
				} else if (obj instanceof UtSubgroupValsEn) {
					UtSubgroupValsEn subgroupValsEn = (UtSubgroupValsEn) obj;
					subName = subgroupValsEn.getSubgroup_Val();
				} else if (obj instanceof UtIndicatorUnitSubgroup) {
					UtIndicatorUnitSubgroup utIUS = (UtIndicatorUnitSubgroup) obj;
					_log.debug("IUS NID  ===>" + utIUS.getIUSNId());
					vObject.setDescription(Integer.toString(utIUS.getIUSNId()));
				}
			}
			vObject.setValue(indName + ", " + subName + " (" + unitName + ")");
			list.add(vObject);
		}
		return list;

	}

	@Override
	@SuppressWarnings("unchecked")
	@Transactional(readOnly = true)
	public JSONObject fetchAllSectors(String ic_type) {
		
		EssUserModel essUserModel = (EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL);
		
		List<UtIndicatorClassificationsEn> indicatorClassifications = utIndicatorClassificationsEnRepository.findByIC_Type(ic_type);
		List<TypeDetail> typeDetails = typeDetailRepository.findByTypeIdId(Integer.parseInt(messages.getMessage(Constants.Web.FACILITYTYPEFORAREA_TYPE_ID, null, null)));
		List<TypeDetailModel> typeDetailModels = new ArrayList<>();
		JSONObject parentObject = new JSONObject();
		JSONArray allSectorArr = new JSONArray();
		
		for (UtIndicatorClassificationsEn indicatorClassification : indicatorClassifications) {
			JSONObject sectorObj = new JSONObject();
			if (null == indicatorClassification.getIC_Parent_NId()) {
				sectorObj.put("key", indicatorClassification.getIC_NId());
				sectorObj.put("value", indicatorClassification.getIC_Name());
				sectorObj.put("description", -1);
				sectorObj.put("level", indicatorClassification.getLevel());
			} else {
				sectorObj.put("key", indicatorClassification.getIC_NId());
				sectorObj.put("value", indicatorClassification.getIC_Name());
				sectorObj.put("description", indicatorClassification.getIC_Parent_NId().getIC_NId());
				sectorObj.put("level", indicatorClassification.getLevel());
			}
			allSectorArr.add(sectorObj);
		}
		
		TypeDetailModel allType = new TypeDetailModel();
		allType.setId(0);
		allType.setName("All");
		allType.setOrderLevel(1);
		allType.setTypeId(typeDetails.get(0).getTypeId());
		typeDetailModels.add(allType);
		
		typeDetails.forEach(typeDetail -> {
			TypeDetailModel typeDetailModel = new TypeDetailModel();
			
			typeDetailModel.setId(typeDetail.getId());
			typeDetailModel.setName(typeDetail.getName());
			typeDetailModel.setOrderLevel(typeDetail.getOrderLevel());
			typeDetailModel.setTypeId(typeDetail.getTypeId());
			
			typeDetailModels.add(typeDetailModel);
		});
		
		parentObject.put("userLevel", essUserModel.getUserLevel());
		parentObject.put("sectors", allSectorArr);
		parentObject.put("facilityTypes", typeDetailModels);
		
		return parentObject;
	}

	@Override
	public List<ValueObjectForDashboard> fetchSources(String param) {
		System.out.println("IusNid==>" + Integer.parseInt(param));
		List<UtIndicatorClassificationsEn> classificationsEns = utIndicatorClassificationsEnRepository.findByIUS_Nid(Integer.parseInt(param));
		List<ValueObjectForDashboard> valueObjects = new ArrayList<>();
		for (UtIndicatorClassificationsEn classificationsEn : classificationsEns) {
			ValueObjectForDashboard object = new ValueObjectForDashboard();
			object.setKey(new Integer(classificationsEn.getIC_NId()).toString());
			object.setValue(classificationsEn.getIC_Name());
			valueObjects.add(object);
		}
		return valueObjects;
	}

	@SuppressWarnings("unchecked")
	@Override
	@Transactional
	public JSONObject fetchUtTimeperiod(Integer iusNid, Integer SourceNid) {
		List<Object[]> utTimeperiods = null;
		List<ValueObjectForDashboard> valueObjects = new ArrayList<>();

		// fetch all timeperiod for commisioner
		utTimeperiods = utTimeperiodRepository.findBySource_Nid(iusNid, SourceNid);

		JSONObject periodicityJson = new JSONObject();

		JSONArray arrTimePeriods = new JSONArray();
		JSONArray periodicityArray = new JSONArray();

		Map<Integer, Preodicity> periodicityMap = new HashMap<>();
		for (Object[] utTimeperiodObject : utTimeperiods) {
			UtTimeperiod utTimeperiod = (UtTimeperiod) utTimeperiodObject[0];
			Preodicity pre = (Preodicity) utTimeperiodObject[1];
			JSONObject timeJson = new JSONObject();
			timeJson.put("key", Integer.toString(utTimeperiod.getTimePeriod_NId()));
			timeJson.put("value", utTimeperiod.getTimePeriod());
			timeJson.put("periodicity", utTimeperiod.getPeriodicity().getPreodicityId());
			arrTimePeriods.add(timeJson);
			periodicityMap.put(pre.getPreodicityId(), pre);
		}

		periodicityMap.forEach((periodicityId, pre) -> {
			JSONObject periodJson = new JSONObject();
			periodJson.put("key", Integer.toString(pre.getPreodicityId()));
			periodJson.put("value", pre.getPreodicityName());
			periodicityArray.add(periodJson);
		});

		periodicityJson.put("periodicities", periodicityArray);
		periodicityJson.put("timeperiods", arrTimePeriods);

		return periodicityJson;
	}

	@Override
	@Transactional
	public DataCollectionModel fetchData(String iusId, String sourceId, String parentAreaCode, String timeperiodId, Integer childLevel) {
		System.out.println("Fetch Data of DashBoard Controller is called");

		// get all areas less than or equal to the selected level

		EssUserModel model = (EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL);

		System.out.println("User Level :::" + model.getUserLevel());

		if (model.getUserLevel() == 2 || model.getUserLevel() == 3 || model.getUserLevel() == 4 || model.getUserLevel() == 5) {
			childLevel = 3;
		}

		Area[] utAreas = areaRepository.getAreaNid(parentAreaCode, childLevel);

		System.out.println("Areas retrived::" + Arrays.deepToString(utAreas));

		// get parentArea from the area list
		Area area = getParentUtArea(utAreas, parentAreaCode);

		System.out.println("Parent Areas retrived::" + area);

		ArrayList<Area> list = new ArrayList<Area>();
		// get children of the select area.
		getChildren(utAreas, childLevel, area.getAreaNId(), list);

		Integer[] areaNids = new Integer[list.size()];

		UtIndicatorUnitSubgroup ius = utIndicatorUnitSubgroupRepository.findByIndicator_NId(Integer.parseInt(iusId));

		boolean isIndicatorPositive = ius.getIndicator_NId().getHighIsGood() == 1 ? true : false;

		int i = 0;
		for (Area utAreaEn : list) {
			areaNids[i] = utAreaEn.getAreaNId();
			i++;
		}

		DataCollectionModel utDataCollection = null;
		try {
			utDataCollection = getUtdataCollection(iusId, timeperiodId, sourceId, areaNids, isIndicatorPositive);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return utDataCollection;
	}

	private Area getParentUtArea(Area[] utAreas, String areaId) {
		Area utAreaen = null;
		for (Area utAreaEn : utAreas) {
			if (utAreaEn.getAreaId().equalsIgnoreCase(areaId)) {
				utAreaen = utAreaEn;
				break;
			}
		}
		return utAreaen;
	}

	private void getChildren(Area[] utAreas, int i, int parentNid, ArrayList<Area> list) {

		for (Area utAreaEn : utAreas) {
			if (utAreaEn.getParentAreaId() == parentNid) {
				if (utAreaEn.getLevel() == i)
					list.add(utAreaEn);
				else
					getChildren(utAreas, i, utAreaEn.getAreaNId(), list);
			}
		}

	}

	@Transactional(readOnly = true)
	public DataCollectionModel getUtdataCollection(String indicatorId, String timePeriodNid, String sourceId, Integer[] areaNid, boolean isIndicatorPositive) throws ParseException {

		Map<String, Integer> ranks = null;

		List<String> topPerformers = null;

		List<String> bottomPerformers = null;

		ranks = new HashMap<String, Integer>();
		topPerformers = new ArrayList<String>();
		bottomPerformers = new ArrayList<String>();

		DataCollectionModel collection = new DataCollectionModel();

		// this will fetch the data for the selected time-period
		// fetch the data for the selected time-period

		List<Object[]> data = utDataReporsitory.findDataByTimePeriodForAllFacilityType(Integer.parseInt(indicatorId), Integer.parseInt(timePeriodNid), Integer.parseInt(sourceId), areaNid);

		_log.info("Ius Nid :{}", indicatorId);
		_log.info("TimePeriod Nid :{}", timePeriodNid);
		_log.info("source nid :{}", sourceId);
		_log.info("Indicator type :{}", isIndicatorPositive);

		if (data != null && !data.isEmpty()) {
			List<ValueObjectForDashboard> list = new ArrayList<ValueObjectForDashboard>();

			// this will fetch the data for the selected time-period and
			// populate the legend

			list = populateLegends(data, isIndicatorPositive, ranks, topPerformers, bottomPerformers);
			collection.setLegends(list);
			if ((((UtData) data.get(0)[0]).getData_Value() - ((UtData) data.get(data.size() - 1)[0]).getData_Value()) == 0) {
				List<String> blankList = new ArrayList<>();
				collection.setTopPerformers(blankList);
				collection.setBottomPerformers(blankList);
			} else {
				collection.setTopPerformers(topPerformers);
				collection.setBottomPerformers(bottomPerformers);
			}

			UtData utData = null;
			Area utAreaEn = null;
			Double value = null;

			for (Object[] dataObject : data) {
				DataModel utDataModel = new DataModel();

				utData = (UtData) dataObject[0];
				utAreaEn = (Area) dataObject[1];

				value = utData.getData_Value();

				utDataModel.setValue(Double.valueOf(utData.getData_Value()).toString());
				utDataModel.setAreaCode(utAreaEn.getAreaId());
				utDataModel.setAreaName(utAreaEn.getName());
				utDataModel.setAreaNid(utAreaEn.getAreaNId());

				utDataModel.setRank(ranks != null && ranks.get(utAreaEn.getAreaId()) != null ? Integer.toString(ranks.get(utAreaEn.getAreaId())) : null);
				if (list != null) {
					setCssForDataModel(list, utDataModel, value, indicatorId, sourceId, isIndicatorPositive);
				}
				utDataModel.setUnit("percent");

				collection.dataCollection.add(utDataModel);
			}
		}
		return collection;
	}

	private void setCssForDataModel(List<ValueObjectForDashboard> list, DataModel data, Double value, String indicatorId, String sourceId, boolean isIndicatorPositive) {

		for (int index = 0; index < list.size() - 1; index++) {
			ValueObjectForDashboard vObject = list.get(index);
			String[] vArray = vObject != null ? ((String) vObject.getKey()).split(" - ") : null;

			if (list.size() == 1) {
				if (isIndicatorPositive) {
					data.setCssClass(Constants.Slices.THIRD_SLICE);
				} else {
					data.setCssClass(Constants.Slices.FIRST_SLICE);
				}
			}

			else if (index == 4 || (vArray != null && new Double(vArray[0]).doubleValue() <= value && value <= new Double(vArray[1]).doubleValue())) {

				if (isIndicatorPositive) {
					switch (index) {
					case 0:
						data.setCssClass(Constants.Slices.FIRST_SLICE);
						break;
					case 1:
						data.setCssClass(Constants.Slices.SECOND_SLICE);
						break;
					case 2:
						data.setCssClass(Constants.Slices.THIRD_SLICE);
						break;
					case 3:
						data.setCssClass(Constants.Slices.FOUTRH_SLICE);
						break;

					}
				} else {
					switch (index) {
					case 0:
						data.setCssClass(Constants.Slices.THIRD_SLICE);
						break;
					case 1:
						data.setCssClass(Constants.Slices.SECOND_SLICE);
						break;
					case 2:
						data.setCssClass(Constants.Slices.FIRST_SLICE);
						break;
					case 3:
						data.setCssClass(Constants.Slices.FOUTRH_SLICE);
						break;

					}
				}

			}

		}

	}

	private void populateRank(List<Object[]> data, boolean isIndicatorPositive, Map<String, Integer> ranks, List<String> topPerformers, List<String> bottomPerformers) {

		if (data != null && !data.isEmpty()) {
			int rank = 0;
			double dataValue = 0.0;
			Area utArea = null;
			UtData utData = null;
			if (isIndicatorPositive) {
				for (int index = data.size() - 1; index >= 0; index--) {
					utData = (UtData) data.get(index)[0];
					utArea = (Area) data.get(index)[1];

					// populate the performance by area list
					if (((UtData) data.get(0)[0]).getData_Value() == ((UtData) data.get(data.size() - 1)[0]).getData_Value()) {
						ranks.put(utArea.getAreaId(), 1);

						topPerformers.clear();
						bottomPerformers.clear();
					} else {

						if (index == data.size() - 1) {
							topPerformers.add(utArea.getName() + " - " + utData.getData_Value());

						} else if (index == 0) {
							bottomPerformers.add(utArea.getName() + " - " + utData.getData_Value());
						}

						if (dataValue == utData.getData_Value() && index != data.size() - 1) {
							ranks.put(utArea.getAreaId(), rank);
							continue;
						}
						rank++;
						dataValue = utData.getData_Value();

						ranks.put(utArea.getAreaId(), rank);
					}

				}
			} else {
				for (int index = 0; index < data.size(); index++) {
					utData = (UtData) data.get(index)[0];
					utArea = (Area) data.get(index)[1];

					// populate the performance by area list

					if (((UtData) data.get(0)[0]).getData_Value() == ((UtData) data.get(data.size() - 1)[0]).getData_Value()) {
						ranks.put(utArea.getAreaId(), 1);
						topPerformers.clear();
						bottomPerformers.clear();
					} else {

						if (index == 0) {
							bottomPerformers.add(utArea.getName() + " - " + utData.getData_Value());

						} else if (index == data.size() - 1) {
							topPerformers.add(utArea.getName() + " - " + utData.getData_Value());
						}
						if (dataValue == utData.getData_Value() && index != 0) {
							ranks.put(utArea.getAreaId(), rank);
							continue;
						}
						rank++;
						dataValue = utData.getData_Value();

						ranks.put(utArea.getAreaId(), rank);

					}

				}
			}

		}
	}

	@Transactional(readOnly = true)
	private List<ValueObjectForDashboard> populateLegends(List<Object[]> data, boolean isIndicatorPositive, Map<String, Integer> ranks, List<String> topPerformers, List<String> bottomPerformers) throws ParseException {
		String firstslices = Constants.Slices.FIRST_SLICE;
		String secondslices = Constants.Slices.SECOND_SLICE;
		String thirdslices = Constants.Slices.THIRD_SLICE;
		String fourthslices = Constants.Slices.FOUTRH_SLICE;

		List<ValueObjectForDashboard> list = new ArrayList<ValueObjectForDashboard>();
		String thirdSliceValue = "75.0 - 100.0";
		String secondSliceValue = "50.0 - 74.9";
		String firstSliceValue = "0 - 49.9";
		if (data != null && !data.isEmpty()) {
			if (isIndicatorPositive) {
				list.add(new ValueObjectForDashboard(firstSliceValue, firstslices));
				list.add(new ValueObjectForDashboard(secondSliceValue, secondslices));
				list.add(new ValueObjectForDashboard(thirdSliceValue, thirdslices));
				list.add(new ValueObjectForDashboard("Not Available", fourthslices));
			} else {
				list.add(new ValueObjectForDashboard(firstSliceValue, thirdSliceValue));
				list.add(new ValueObjectForDashboard(secondSliceValue, secondSliceValue));
				list.add(new ValueObjectForDashboard(thirdSliceValue, firstslices));
				list.add(new ValueObjectForDashboard("Not Available", fourthslices));
			}
		}

		// calculates the rank for the area codes for the selected time-period
		populateRank(data, isIndicatorPositive, ranks, topPerformers, bottomPerformers);
		return list != null && !list.isEmpty() ? list : null;
	}

	public Double getFormattedDouble(Double value) {
		Double formattedValue = value != null ? new BigDecimal(value).setScale(1, BigDecimal.ROUND_HALF_UP).doubleValue() : null;
		return formattedValue;
	}

	public String getFormattedTP(String timePeriod) throws ParseException {
		Date date = null;
		try {
			date = timePeriod != null ? new SimpleDateFormat("yyyy.MM").parse(timePeriod) : null;
		} catch (ParseException e) {
			e.printStackTrace();
			date = timePeriod != null ? new SimpleDateFormat("yyyy.MMM").parse(timePeriod) : null;
		}
		String formattedTP = date != null ? new SimpleDateFormat("MMM yyyy").format(date) : null;
		return formattedTP;
	}

	@Override
	public List<AreaModel> fetchAreasAreaWise() {

		return null;

	}

	@Override
	public List<LineChartData> getLineChartData(Integer area_NId, Integer indicator_NId, Integer periodicity, 
			Integer timePeriod_NId, Integer facilityTypeId) {
		
		List<Object[]> listData = null;
		if(facilityTypeId == 0)
			listData = utDataReporsitory.findChartDataForAllFaciltyType(indicator_NId, area_NId, periodicity);
		else
			listData = utDataReporsitory.findChartDataForFaciltyType(indicator_NId, area_NId, periodicity,facilityTypeId);
			
		List<LineChartData> lineCharts = new ArrayList<>();
		JSONParser parser = new JSONParser();
		for (Object[] objects : listData) {

			Integer areaNidActual = (Integer) objects[0];
			Double dataValueActual = (Double) objects[1];
			
			UtTimeperiod timep = utTimeperiodRepository.findByTimeperiodNid((Integer) objects[2]);
			
			String areaName = (String) objects[3];

			String jsonTopValue = (String) objects[5];
			String jsonLowValue = (String) objects[6];

			JSONObject topValueJSON = null;
			JSONObject bottomValueJSON = null;

			try {
				topValueJSON = (JSONObject) parser.parse(jsonTopValue);
			} catch (org.json.simple.parser.ParseException e) {
				throw new IllegalArgumentException("Unable to parse top json :" + topValueJSON);
			}
			try {
				bottomValueJSON = (JSONObject) parser.parse(jsonLowValue);
			} catch (org.json.simple.parser.ParseException e) {
				throw new IllegalArgumentException("Unable to parse buttom json :" + bottomValueJSON);
			}

			LineChartData topLine = new LineChartData();
			topLine.setAreaNid(Integer.valueOf(topValueJSON.get("area_nid_pk").toString()));
			topLine.setDataValue(Double.valueOf(topValueJSON.get("data_value").toString()));
			topLine.setTimeperiod(timep.getTimePeriod());
			topLine.setKey("UCL");
			topLine.setAreaName(topValueJSON.get("name").toString());

			LineChartData bottomLine = new LineChartData();
			bottomLine.setAreaNid(Integer.valueOf(bottomValueJSON.get("area_nid_pk").toString()));
			bottomLine.setDataValue(Double.valueOf(bottomValueJSON.get("data_value").toString()));
			bottomLine.setTimeperiod(timep.getTimePeriod());
			bottomLine.setKey("LCL");
			bottomLine.setAreaName(bottomValueJSON.get("name").toString());

			LineChartData actualAreaLine = new LineChartData();
			actualAreaLine.setAreaNid(areaNidActual);
			actualAreaLine.setDataValue(dataValueActual);
			actualAreaLine.setTimeperiod(timep.getTimePeriod());
			actualAreaLine.setKey(areaName);
			actualAreaLine.setAreaName(areaName);

			lineCharts.add(topLine);
			lineCharts.add(actualAreaLine);
			lineCharts.add(bottomLine);
		}
		
		Collections.reverse(lineCharts);
		return lineCharts;
	}

	@SuppressWarnings("unchecked")
	@Override
	public JSONObject getThematicTableViewData(Integer sectorNid, Integer timePeriod_NId, Integer areaNid, Integer facilityTypeId) {
		EssUserModel essUserModel = (EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL);

		String keyName = "";
		List<Object[]> list = null;
		Area area = areaRepository.findByAreaNId(areaNid);
		if (essUserModel.getUserLevel() == 5) {
			// BLOCK LEVEL USER
			keyName = "Block";
			areaNid = essUserModel.getBlockId();
			if(facilityTypeId == 0)
				list = utDataReporsitory.thematicTableDataForBlockLevelUser(sectorNid, timePeriod_NId, areaNid);
			else
				list = utDataReporsitory.thematicTableDataForBlockLevelUserFacilityTypeWise(sectorNid, timePeriod_NId, 
						areaNid, facilityTypeId);
		}else{
			switch (essUserModel.getUserLevel()) {
			case 4:
				keyName = "Block";
				areaNid = essUserModel.getDistrictId();
//				list = utDataReporsitory.thematicTableData(sectorNid, timePeriod_NId, areaNid);
				System.out.println("District Level User Called Thematic View.........");

//				if (list != null) {
//					System.out.println("Data With Indicators retrieved::::::::::" + Arrays.deepToString(list.toArray()));
//				}
				break;
				
			case 2:
				if(area.getLevel() == 2)
					keyName = "District";
				else
					keyName = "Block";
//				list = utDataReporsitory.thematicTableData(sectorNid, timePeriod_NId, areaNid);
				break;
			
			case 1:
				if (area.getLevel() == 1)
					keyName = "State";
				else if(area.getLevel() == 2)
					keyName = "District";
				else
					keyName = "Block";
				
//				list = utDataReporsitory.thematicTableData(sectorNid, timePeriod_NId, areaNid);
				break;
			}
			
			if(facilityTypeId == 0)
				list = utDataReporsitory.thematicTableData(sectorNid, timePeriod_NId, areaNid);
			else
				list = utDataReporsitory.thematicTableDataFacilityTypeWise(sectorNid, timePeriod_NId, areaNid, facilityTypeId);
		}
//		else if (essUserModel.getUserLevel() == 4) {
//			keyName = "Block";
//			areaNid = essUserModel.getDistrictId();
//			list = utDataReporsitory.thematicTableData(sectorNid, timePeriod_NId, areaNid);
//			System.out.println("District Level User Called Thematic View.........");
//
//			if (list != null) {
//				System.out.println("Data With Indicators retrieved::::::::::" + Arrays.deepToString(list.toArray()));
//			}
//
//		} else if (essUserModel.getUserLevel() == 2) {
//			keyName = "District";
//			list = utDataReporsitory.thematicTableData(sectorNid, timePeriod_NId, areaNid);
//		} else if (essUserModel.getUserLevel() == 1) {
//			if (area.getLevel() == 1)
//				keyName = "State";
//			else if(area.getLevel() == 2)
//				keyName = "District";
//			else
//				keyName = "Block";
//			
//			list = utDataReporsitory.thematicTableData(sectorNid, timePeriod_NId, areaNid);
//		}

		LinkedHashSet<String> tableHeader = new LinkedHashSet<>();
		tableHeader.add(keyName);

		List<Object[]> indicators = utIndicatorEnRepository.fetchIndicatorFromSector(sectorNid, UtUnitType.PERCENT);

		for (int i = 0; i < indicators.size(); i++) {
			Object[] objects = indicators.get(i);
			for (Object obj : objects) {
				if (obj instanceof UtIndicatorEn) {
					UtIndicatorEn utIUS = (UtIndicatorEn) obj;
					tableHeader.add(utIUS.getIndicator_Name());
				}
			}
		}

		List<Map<String, String>> listData = new ArrayList<>();
		Map<String, String> map = null;
		Map<String, Map<String, String>> mapData = new LinkedHashMap<>();

		if (list != null) {
			for (Object[] objects : list) {
				if (mapData.containsKey(objects[5].toString())) {
					Map<String, String> mapTwo = mapData.get(objects[5].toString());
					mapTwo.put(objects[4].toString(), String.format("%.1f",new Float(objects[7].toString())));
				} else {
					map = new LinkedHashMap<>();
					switch (essUserModel.getUserLevel()) {
					case 1:// national level user
						switch (area.getLevel()) {
						case 1:
							map.put("State", objects[6].toString());
							break;
						case 2:
							map.put("District", objects[6].toString());
							break;
						case 3:
							map.put("Block", objects[6].toString());
							break;
						}
						map.put(objects[4].toString(),String.format("%.1f",new Float(objects[7].toString())));
						mapData.put(objects[5].toString(), map);
						break;
					case 2: // state level user will always only view districts
						map.put("District", objects[6].toString());
						map.put(objects[4].toString(),String.format("%.1f",new Float(objects[7].toString())));
						mapData.put(objects[5].toString(), map);
					case 4:// district level user will only view blocks
						map.put("Block", objects[6].toString());
						map.put(objects[4].toString(),String.format("%.1f",new Float(objects[7].toString())));
						mapData.put(objects[5].toString(), map);
					case 5:// level user only sees his/her block
						map.put("Block", objects[6].toString());
						map.put(objects[4].toString(), String.format("%.1f",new Float(objects[7].toString())));
						mapData.put(objects[5].toString(), map);
						break;
					}

				}
			}
			for (Map.Entry<String, Map<String, String>> entry : mapData.entrySet()) {
				listData.add(entry != null ? entry.getValue() : null);
			}

			JSONObject headerAndData = new JSONObject();
			headerAndData.put("headers", tableHeader);
			headerAndData.put("data", listData);

			return headerAndData;
		}
		return null;

	}

	
	/**
	 * @author Naseem Akhtar
	 * 
	 * This method is used to fetch area according to the logged in users role.
	 * We are fetching in json format from the DB.
	 * "All" option is added for state list as well as the districts.
	 * 'area_nid_pk' for all option in case of districts is equivalent to the 'area_nid_pk' of it's respective state.
	 * This is done to fetch the table data and map data for the state when 'All' option is selected in district drop-down.
	 */
	@SuppressWarnings("unchecked")
	@Override
	@Transactional(readOnly = true)
	public JSONObject fetchAreasRoleWise() {
		EssUserModel user = (EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL);
		
		JSONParser parser = new JSONParser();
		JSONArray areaArray = null;
		String areaString;
		JSONObject json = new JSONObject();

		switch (user.getUserLevel()) {
		case 1:
			json.put("isNationalUser", true);
			// country level user
			
			areaString =  utIndicatorEnRepository2.findAllInJsonStructure();
			
			try {
				areaArray = (JSONArray) parser.parse(areaString);
				
				for(Object o : areaArray)
				{
					JSONObject state = (JSONObject) o;
					
					JSONArray stateChildren = (JSONArray) state.get("children");
					
					JSONObject allDistrict = new JSONObject();
					allDistrict.put("area_nid_pk", state.get("area_nid_pk"));
					allDistrict.put("level", 3);
					allDistrict.put("name", "All");
					allDistrict.put("parent_area_id", state.get("area_nid_pk"));
					allDistrict.put("children", new JSONArray());
					allDistrict.put("map_name", state.get("map_name"));
					allDistrict.put("area_id", state.get("area_id"));
					
					stateChildren.add(0,allDistrict);
				}
				
				JSONObject allState = new JSONObject();
				allState.put("area_nid_pk", 1);
				allState.put("level", 2);
				allState.put("name", "All");
				allState.put("parent_area_id", 1);
				allState.put("children", new JSONArray());
				allState.put("map_name", "india.json");
				allState.put("area_id", "IND");
				
				areaArray.add(0,allState);
				
				
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
			
			areaString =  utIndicatorEnRepository2.findByStateInJsonStructure(stateId);
			
			try {
				areaArray = (JSONArray) parser.parse(areaString);
			} catch (org.json.simple.parser.ParseException e) {
				e.printStackTrace();
			}
			break;
		}
		
		if(user.getUserLevel() == 2){
			for(Object o : areaArray)
			{
				JSONObject state = (JSONObject) o;
				
				JSONArray stateChildren = (JSONArray) state.get("children");
				
				JSONObject allDistrict = new JSONObject();
				allDistrict.put("area_nid_pk", state.get("area_nid_pk"));
				allDistrict.put("level", 3);
				allDistrict.put("name", "All");
				allDistrict.put("parent_area_id", state.get("area_nid_pk"));
				allDistrict.put("children", new JSONArray());
				allDistrict.put("map_name", state.get("map_name"));
				allDistrict.put("area_id", state.get("area_id"));
				
				stateChildren.add(0,allDistrict);
			}
		}
		
		json.put("areaJson", areaArray);

		return json;

	}

	@Transactional
	@Override
	public DataCollectionModel fetchMapData(String iusId, String sourceId, String parentAreaCode, String timePeriodNid, 
			Integer parentId, Integer facilityTypeId) {

		EssUserModel model = (EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL);

		System.out.println("User Level :::" + model.getUserLevel());

//		if (model.getUserLevel() == 2 || model.getUserLevel() == 3 || model.getUserLevel() == 4 || model.getUserLevel() == 5) {
//			childLevel = 3;
//		}

//		Area[] utAreas = (Area[]) areaRepository.findByAreaParentId(parentId).toArray();
//
//		System.out.println("Areas retrived::" + Arrays.deepToString(utAreas));

		// get parentArea from the area list
		// Area area = getParentUtArea(utAreas, parentAreaCode);

		Area area = areaRepository.findByAreaId(parentAreaCode);
		System.out.println("Parent Areas retrived::" + area);

		ArrayList<Area> list = new ArrayList<Area>();
		// get children of the select area.
		// getChildren(utAreas, childLevel, area.getAreaNId(), list);

		List<Area> children = areaRepository.findByAreaParentId(area.getAreaNId());

		Integer[] areaNids = new Integer[children.size()];

		for (int index = 0; index < children.size(); index++) {
			areaNids[index] = children.get(index).getAreaNId();
		}

		UtIndicatorUnitSubgroup ius = utIndicatorUnitSubgroupRepository.findByIndicator_NId(Integer.parseInt(iusId));

		boolean isIndicatorPositive = ius.getIndicator_NId().getHighIsGood() == 1 ? true : false;

		// 1) find the parent and its children
		// 2) fetch all datas of children for the indicator and source for a timeperiod
		// 3) for indicator type : +ve or -ve find the highest and lowest performer.Also rank them for 1st to last
		// 4) set the legends for the indicator type.
		// 5)

		Map<String, Integer> ranks = null;

		List<String> topPerformers = null;

		List<String> bottomPerformers = null;

		ranks = new HashMap<String, Integer>();
		topPerformers = new ArrayList<String>();
		bottomPerformers = new ArrayList<String>();

		DataCollectionModel collection = new DataCollectionModel();

		// this will fetch the data for the selected time-period
		// fetch the data for the selected time-period
		List<Object[]> data = null;

		if(facilityTypeId == 0)
			data = utDataReporsitory.findDataByTimePeriodForAllFacilityType(Integer.parseInt(iusId), Integer.parseInt(timePeriodNid), Integer.parseInt(sourceId), areaNids);
		else
			data = utDataReporsitory.findDataByTimePeriodAndFacilityType(Integer.parseInt(iusId), Integer.parseInt(timePeriodNid), Integer.parseInt(sourceId), areaNids, facilityTypeId);

		_log.info("Ius Nid :{}", iusId);
		_log.info("TimePeriod Nid :{}", timePeriodNid);
		_log.info("source nid :{}", sourceId);
		_log.info("Indicator type :{}", isIndicatorPositive);

//		if (data != null && !data.isEmpty()) {
			// List<ValueObjectForDashboard> list = new ArrayList<ValueObjectForDashboard>();

			String firstslices = Constants.Slices.FIRST_SLICE;
			String secondslices = Constants.Slices.SECOND_SLICE;
			String thirdslices = Constants.Slices.THIRD_SLICE;
			String fourthslices = Constants.Slices.FOUTRH_SLICE;

			List<ValueObjectForDashboard> legends = new ArrayList<ValueObjectForDashboard>();
			String thirdSliceValue = "Above 75";
			String secondSliceValue = "50 - 75";
			String firstSliceValue = "Below 50";
			
			int firstSliceCount = 0;
			int secondSliceCount = 0;
			int thirdSliceCount = 0;
			
			if (data != null && !data.isEmpty()) {
				
				for (Object[] objects : data) {
					System.out.println("Area - Data   :{}" + ((Area) objects[1]).getAreaId() + " - " + ((Area) objects[1]).getName() + " - " + ((UtData) objects[0]).getData_Value());
				}
				
				if (isIndicatorPositive) {
					// populate ranks

					List<DataModel> dataModels = new ArrayList<>();
					int rankIndex = 1;
					for (int index = data.size() - 1; index >= 0; index--) {

						UtData utdata = (UtData) data.get(index)[0];
						Area utarea = (Area) data.get(index)[1];
						DataModel dataModel = new DataModel();
						dataModel.setAreaCode(utarea.getAreaId());
						dataModel.setAreaName(utarea.getName());
						dataModel.setAreaCode(utarea.getAreaId());
						dataModel.setAreaName(utarea.getName());
						dataModel.setAreaNid(utarea.getAreaNId());
						dataModel.setUnit("percent");
						dataModel.setValue(String.format("%.1f", utdata.getData_Value()));

						dataModel.setRank(new Integer(rankIndex++).toString());

						if (utdata.getData_Value() < 50.0) {
							dataModel.setCssClass(firstslices);
							dataModels.add(dataModel);
							firstSliceCount++;
						} else if (utdata.getData_Value() >= 50.0 && utdata.getData_Value() <= 75.0) {
							dataModel.setCssClass(secondslices);
							dataModels.add(dataModel);
							secondSliceCount++;
						} else if (utdata.getData_Value() > 75.0) {
							dataModel.setCssClass(thirdslices);
							dataModels.add(dataModel);
							thirdSliceCount++;
						}

					}

					collection.setDataCollection(dataModels);
					// setting top performers and buttom performers
					if (data.size() > 1) {
						int top = data.size() - 1;
						int buttom = 0;
						UtData utdataTopPerformer = (UtData) data.get(top)[0];
						Area utareaTopPerformer = (Area) data.get(top)[1];

						UtData utdataButtomPerformer = (UtData) data.get(buttom)[0];
						Area utareaButtomPerformer = (Area) data.get(buttom)[1];

						String topPerformer = new String(utareaTopPerformer.getName() + " - " + String.format("%.1f", utdataTopPerformer.getData_Value()));
						String buttomPerformer = new String(utareaButtomPerformer.getName() + " - " + String.format("%.1f", utdataButtomPerformer.getData_Value()));

						topPerformers.add(topPerformer);
						bottomPerformers.add(buttomPerformer);
					}
					collection.setTopPerformers(topPerformers);
					collection.setBottomPerformers(bottomPerformers);

				} else {
					// populate ranks

					List<DataModel> dataModels = new ArrayList<>();

					for (int index = 0; index < data.size(); index++) {

						UtData utdata = (UtData) data.get(index)[0];
						Area utarea = (Area) data.get(index)[1];
						DataModel dataModel = new DataModel();
						dataModel.setAreaCode(utarea.getAreaId());
						dataModel.setAreaName(utarea.getName());
						dataModel.setAreaCode(utarea.getAreaId());
						dataModel.setAreaName(utarea.getName());
						dataModel.setAreaNid(utarea.getAreaNId());
						dataModel.setUnit("percent");
						dataModel.setValue(String.format("%.1f", utdata.getData_Value()));
						dataModel.setRank(new Integer(index + 1).toString());
						if (utdata.getData_Value() < 50.0) {
							dataModel.setCssClass(thirdslices);
							dataModels.add(dataModel);
							thirdSliceCount++;
						} else if (utdata.getData_Value() >= 50.0 && utdata.getData_Value() <= 75.0) {
							dataModel.setCssClass(secondslices);
							dataModels.add(dataModel);
							secondSliceCount++;
						} else if (utdata.getData_Value() > 75.0) {
							dataModel.setCssClass(firstslices);
							dataModels.add(dataModel);
							firstSliceCount++;
						}

					}
					collection.setDataCollection(dataModels);
					// setting top performers and buttom performers
					if (data.size() > 1) {
						int top = 0;
						int buttom = data.size() - 1;
						UtData utdataTopPerformer = (UtData) data.get(top)[0];
						Area utareaTopPerformer = (Area) data.get(top)[1];

						UtData utdataButtomPerformer = (UtData) data.get(buttom)[0];
						Area utareaButtomPerformer = (Area) data.get(buttom)[1];

						String topPerformer = new String(utareaTopPerformer.getName() + " - " + String.format("%.1f", utdataTopPerformer.getData_Value()));
						String buttomPerformer = new String(utareaButtomPerformer.getName() + " - " + String.format("%.1f", utdataButtomPerformer.getData_Value()));

						topPerformers.add(topPerformer);
						bottomPerformers.add(buttomPerformer);
					}
					collection.setTopPerformers(topPerformers);
					collection.setBottomPerformers(bottomPerformers);
				}
			}
			
			if (isIndicatorPositive) {
				legends.add(new ValueObjectForDashboard(thirdSliceValue, thirdslices, thirdSliceCount));
				legends.add(new ValueObjectForDashboard(secondSliceValue, secondslices, secondSliceCount));
				legends.add(new ValueObjectForDashboard(firstSliceValue, firstslices, firstSliceCount));
				legends.add(new ValueObjectForDashboard("Not Available", fourthslices, null));

				collection.setLegends(legends);
			}else{
				// indicator is negative
				legends.add(new ValueObjectForDashboard(thirdSliceValue, firstslices, thirdSliceCount));
				legends.add(new ValueObjectForDashboard(secondSliceValue, secondslices, secondSliceCount));
				legends.add(new ValueObjectForDashboard(firstSliceValue, thirdslices, firstSliceCount));
				legends.add(new ValueObjectForDashboard("Not Available", fourthslices, null));

				collection.setLegends(legends);
			}
//		}

		return collection;

	}
}
