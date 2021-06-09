/**
 * 
 */
package org.sdrc.ess.service;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.sdrc.ess.domain.Area;
import org.sdrc.ess.domain.CommunityData;
import org.sdrc.ess.domain.FacilityData;
import org.sdrc.ess.domain.TypeDetail;
import org.sdrc.ess.domain.UtIndicatorClassificationsEn;
import org.sdrc.ess.domain.UtTimeperiod;
import org.sdrc.ess.model.mobile.TypeDetailModel;
import org.sdrc.ess.model.web.IndicatorWiseGapReportDropDownModel;
import org.sdrc.ess.model.web.ReportInputDataModel;
import org.sdrc.ess.model.web.UtIndicatorClassificationModel;
import org.sdrc.ess.repository.AreaRepository;
import org.sdrc.ess.repository.CommunityDataRepository;
import org.sdrc.ess.repository.FacilityDataRepository;
import org.sdrc.ess.repository.TypeDetailRepository;
import org.sdrc.ess.repository.UtDataReporsitory;
import org.sdrc.ess.repository.UtIndicatorClassificationsEnRepository;
import org.sdrc.ess.repository.UtIndicatorEnRepository;
import org.sdrc.ess.repository.UtTimeperiodRepository;
import org.sdrc.ess.repository.springdatajpa.UtIndicatorEnRepository2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Harsh Pratyush (harsh@sdrc.co.in)
 *
 */
@Service
public class IndicatorWiseGapReportServiceImpl implements IndicatorWiseGapReportService {

	@Autowired
	private UtDataReporsitory utDataReporsitory;

	@Autowired
	private AreaRepository areaRepository;

	@Autowired
	private UtIndicatorClassificationsEnRepository utIndicatorClassificationsEnRepository;

	@Autowired
	private PlanningService planningService;

	@Autowired
	private TypeDetailRepository typeDetailRepository;

	@Autowired
	private FacilityDataRepository facilityDataRepository;

	@Autowired
	private CommunityDataRepository communityDataRepository;

	@Autowired
	private UtIndicatorEnRepository utIndicatorEnRepository;

	@Autowired
	UtIndicatorEnRepository2 utIndicatorEnRepository2;
	
	@Autowired
	private UtTimeperiodRepository utTimeperiodRepository;
	
	private DecimalFormat df = new DecimalFormat("0.0");

	private SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.sdrc.ess.service.IndicatorWiseGapReportService#getIndicatorWiseGapReport(org.sdrc.ess.model.web.
	 * ReportInputDataModel)
	 */
	@Override
	 public List<Map<String, String>> getIndicatorWiseGapReport(
	 ReportInputDataModel reportInputDataModel) {

		List<Map<String, String>> indicatorDataMapList = new ArrayList<Map<String, String>>();
		// code edited by sourav keshari nath
			int blockIdOrdistrictId = 0;
	        if(reportInputDataModel.getBlockId()==0){
	        	blockIdOrdistrictId = reportInputDataModel.getDistrictId();
	        }else{
	        	blockIdOrdistrictId = reportInputDataModel.getBlockId();
	        }
	    // code ended 
		 List<Object[]> indicatorWiseGapForSectors=utDataReporsitory.findLatestSubmissionforASectorofaArea(blockIdOrdistrictId,reportInputDataModel.getFacilityTypeId(), reportInputDataModel.getSectorId());
		indicatorWiseGapForSectors.addAll(utDataReporsitory.find2LatestSubmissionforASectorofaArea(blockIdOrdistrictId,reportInputDataModel.getFacilityTypeId(), reportInputDataModel.getSectorId()));
		indicatorWiseGapForSectors.addAll(utDataReporsitory.find3LatestSubmissionforASectorofaArea(blockIdOrdistrictId,reportInputDataModel.getFacilityTypeId(), reportInputDataModel.getSectorId()));
		indicatorWiseGapForSectors.addAll(utDataReporsitory.findLastSubmissionforASectorofaArea(blockIdOrdistrictId,reportInputDataModel.getFacilityTypeId(), reportInputDataModel.getSectorId()));
		Map<String, String> indicatorDataMap = new LinkedHashMap<String, String>();
		
		Collections.sort(indicatorWiseGapForSectors, new Comparator<Object[]>() {

			@Override
			public int compare(Object[] arg0, Object[] arg1) {

				int indicatorId = (Integer.compare(Integer.parseInt(arg0[1].toString()), Integer.parseInt(arg1[1].toString())));
				if (indicatorId != 0) {
					return indicatorId;
				}

				// Next by Timepeiod Ids
				return (Integer.compare(Integer.parseInt(arg0[3].toString()), Integer.parseInt(arg1[3].toString())));

			}
		});
		
		int indicatorId=0;
		int i = 0, j = 0;
		for (Object[] facilityData : indicatorWiseGapForSectors) {

			if (indicatorId != Integer.parseInt((facilityData[1].toString()))) {
				if (indicatorId != 0) {
					String t = null, t1 = null, t2 = null;
					if (indicatorDataMap.containsKey("T"))
						t = indicatorDataMap.get("T");

					if (indicatorDataMap.containsKey("T - 1"))
						t1 = indicatorDataMap.get("T - 1");

					if (indicatorDataMap.containsKey("T - 2")) {
						t2 = indicatorDataMap.get("T - 2");
						indicatorDataMap.put("T", t2);
						indicatorDataMap.put("T - 2", t);
					} else if (indicatorDataMap.containsKey("T - 1")) {
						indicatorDataMap.put("T", t1);
						indicatorDataMap.put("T - 1", t);
					}

					indicatorDataMapList.add(indicatorDataMap);
					indicatorId=0;
				}
				i = 0;
				if (facilityData[0] != null) {
					indicatorId = Integer.parseInt((facilityData[1].toString()));

					indicatorDataMap = new LinkedHashMap<>();

					indicatorDataMap.put("Indicator", facilityData[2].toString());
					indicatorDataMap.put("Baseline", facilityData[0].toString());
					indicatorDataMap.put("submissionIds", facilityData[3].toString());
				}
				
			} else {
				if (!Arrays.asList(indicatorDataMap.get("submissionIds").split(",")).contains(facilityData[3].toString()) && facilityData[0] != null) {
					if (i == 0)
						indicatorDataMap.put("T", facilityData[0].toString());
					else
						indicatorDataMap.put("T - " + i, facilityData[0].toString());
					i++;
			
					String ids = indicatorDataMap.get("submissionIds").concat("," + facilityData[3].toString());
					indicatorDataMap.put("submissionIds", ids);
				
				}
			}
		}
		j++;

		if (indicatorWiseGapForSectors.size() > 0 && !indicatorDataMap.isEmpty() && indicatorId != 0)
		{

			String t = null, t1 = null, t2 = null;
			if (indicatorDataMap.containsKey("T"))
				t = indicatorDataMap.get("T");

			if (indicatorDataMap.containsKey("T - 1"))
				t1 = indicatorDataMap.get("T - 1");

			if (indicatorDataMap.containsKey("T - 2")) {
				t2 = indicatorDataMap.get("T - 2");
				indicatorDataMap.put("T", t2);
				indicatorDataMap.put("T - 2", t);
			} else if (indicatorDataMap.containsKey("T - 1")) {
				indicatorDataMap.put("T", t1);
				indicatorDataMap.put("T - 1", t);
			}

			indicatorDataMapList.add(indicatorDataMap);
		
		}
		return indicatorDataMapList;
	}

	@Override
	@Transactional
	public IndicatorWiseGapReportDropDownModel getDropDownData() {

		IndicatorWiseGapReportDropDownModel indicatorWiseGapReportDropDownModel = new IndicatorWiseGapReportDropDownModel();

		List<UtIndicatorClassificationsEn> classificationsEns = utIndicatorClassificationsEnRepository.findByIC_Type("SC");

		List<TypeDetail> typeDetails = typeDetailRepository.findByTypeIdId(13);
		List<UtIndicatorClassificationModel> classificationModels = new ArrayList<>();

		for (UtIndicatorClassificationsEn classificationsEn : classificationsEns) {
			UtIndicatorClassificationModel classificationModel = new UtIndicatorClassificationModel();

			classificationModel.setSectorId(classificationsEn.getIC_NId());
			classificationModel.setSectorName(classificationsEn.getIC_Name());
			classificationModel.setParentId(classificationsEn.getIC_Parent_NId() == null ? -1 : classificationsEn.getIC_Parent_NId().getIC_NId());
			classificationModels.add(classificationModel);
		}

		List<TypeDetailModel> typeDetailModels = new ArrayList<>();
		for (TypeDetail typeDetail : typeDetails) {
			TypeDetailModel detailModel = new TypeDetailModel();
			detailModel.setId(typeDetail.getId());
			detailModel.setName(typeDetail.getName());
			detailModel.setOrderLevel(typeDetail.getOrderLevel()); //Added by sourav nath
			typeDetailModels.add(detailModel);
		}
		indicatorWiseGapReportDropDownModel.setUtIndicatorClassificationModel(classificationModels);
		indicatorWiseGapReportDropDownModel.setAreaList(planningService.getAllAreaLoginwise());
		indicatorWiseGapReportDropDownModel.setFacilityTypeDetailModels(typeDetailModels);
		return indicatorWiseGapReportDropDownModel;
	}

	@Override
	public List<Map<String, String>> getImprovementForFacility(ReportInputDataModel reportInputDataModel) {

		List<Map<String, String>> mapDataList = new ArrayList<Map<String, String>>();
		switch (reportInputDataModel.getChecklistType()) {

		case 121:
			mapDataList = getFacilityData(reportInputDataModel);
			break;
		case 122:
			mapDataList = getCommunityData(reportInputDataModel);
			break;
		}

		return mapDataList;
	}

	private List<Map<String, String>> getCommunityData(ReportInputDataModel reportInputDataModel) {
		List<Map<String, String>> facilityDataMapList = new ArrayList<Map<String, String>>();
		
		// code edited by sourav keshari nath
		List<Area> areas = areaRepository.findByAreaParentId(reportInputDataModel.getBlockId()==0?reportInputDataModel.getDistrictId():reportInputDataModel.getBlockId());
		areas.add(areaRepository.findByAreaNId(reportInputDataModel.getBlockId()==0?reportInputDataModel.getDistrictId():reportInputDataModel.getBlockId()));
		// code ended
		
		Map<Integer, String> areaNameMap = new LinkedHashMap<Integer, String>();
		for (Area area : areas) {
			areaNameMap.put(area.getAreaNId(), area.getName());
		}

		Map<String, String> facilityDataMap = new LinkedHashMap<String, String>();
		int facilityId = 0;
		
		// code edited by sourav keshari nath
		int blockId,districtId = 0;
        if(reportInputDataModel.getBlockId()==0){
        	districtId = reportInputDataModel.getDistrictId();
        	blockId = 0;
        }else{
        	districtId = 0;
        	blockId = reportInputDataModel.getBlockId();
        }

		List<Object[]> communityDatas = utDataReporsitory.findTheLatestSubmissionOfEachFacilityWithinADistrictOrBlock(districtId,blockId);
		communityDatas.addAll(utDataReporsitory.find2LatestSubmissionOfEachFacilityWithinADistrictOrBlock(districtId,blockId));
		communityDatas.addAll(utDataReporsitory.find3LatestSubmissionOfEachFacilityWithinADistrictOrBlock(districtId,blockId));
		communityDatas.addAll(utDataReporsitory.findLastSubmissionOfEachFacilityWithinADistrictOrBlock(districtId,blockId));
        // code ended
		Collections.sort(communityDatas, new Comparator<Object[]>() {

			@Override
			public int compare(Object[] arg0, Object[] arg1) {

				int areaId = (Integer.compare(Integer.parseInt(arg0[1].toString()), Integer.parseInt(arg1[1].toString())));
				if (areaId != 0) {
					return areaId;
				}

				// Next by Timepeiod Ids
				return (Integer.compare(Integer.parseInt(arg0[3].toString()), Integer.parseInt(arg1[3].toString())));

			}
		});

		int i = 0, j = 0;
		for (Object[] facilityData : communityDatas) {

			if (facilityId != Integer.parseInt((facilityData[1].toString()))) {
				if (facilityId != 0) {
					String t = null, t1 = null, t2 = null,tTime=null,t_1Time=null,t_2Time=null;
					if (facilityDataMap.containsKey("t"))
					{
						t = facilityDataMap.get("t");
						tTime=facilityDataMap.get("t_submissionIds");
					}
					if (facilityDataMap.containsKey("t-1"))
					{
						t1 = facilityDataMap.get("t-1");
						t_1Time=facilityDataMap.get("t-1_submissionIds");
					}
					if (facilityDataMap.containsKey("t-2")) {
						t2 = facilityDataMap.get("t-2");
						t_2Time=facilityDataMap.get("t-2_submissionIds");
						facilityDataMap.put("t", t2);
						facilityDataMap.put("t_submissionIds",t_2Time);
						facilityDataMap.put("t-2", t);
						facilityDataMap.put("t-2_submissionIds",tTime);
					} else if (facilityDataMap.containsKey("t-1")) {
						facilityDataMap.put("t", t1);
						facilityDataMap.put("t_submissionIds", t_1Time);
						facilityDataMap.put("t-1", t);
						facilityDataMap.put("t-1_submissionIds",tTime);
					}

					facilityDataMapList.add(facilityDataMap);
					facilityId=0;
				}
				i = 0;
				if (facilityData[5] != null) {
					facilityId = Integer.parseInt((facilityData[1].toString()));

					facilityDataMap = new LinkedHashMap<>();

					facilityDataMap.put("facility", facilityData[0].toString());
					facilityDataMap.put("facilityID", facilityData[1].toString());
					facilityDataMap.put("facilityType", facilityData[2].toString());
					facilityDataMap.put("baseline", facilityData[5].toString());
					facilityDataMap.put("submissionIds", facilityData[3].toString());
					facilityDataMap.put("baseline_submissionIds", facilityData[3].toString());
					facilityDataMap.put("area", areaNameMap.get(Integer.parseInt(facilityData[4].toString())));
				}
			} else {
				if (!Arrays.asList(facilityDataMap.get("submissionIds").split(",")).contains(facilityData[3].toString())&&facilityData[5] != null) {
					if (i == 0)
					{
						facilityDataMap.put("t", facilityData[5].toString());
						facilityDataMap.put("t_submissionIds", facilityData[3].toString());
					}
						else
						{
						facilityDataMap.put("t-" + i, facilityData[5].toString());
						facilityDataMap.put("t-"+i+"_submissionIds", facilityData[3].toString());
						}
					String ids = facilityDataMap.get("submissionIds").concat("," + facilityData[3].toString());
					facilityDataMap.put("submissionIds", ids);
					i++;
				}
			}
			j++;
		}
		if (communityDatas.size() > 0 && !facilityDataMap.isEmpty() && facilityId != 0)
		{
			String t = null, t1 = null, t2 = null,tTime=null,t_1Time=null,t_2Time=null;
			if (facilityDataMap.containsKey("t"))
			{
				t = facilityDataMap.get("t");
				tTime=facilityDataMap.get("t_submissionIds");
			}
			if (facilityDataMap.containsKey("t-1"))
			{
				t1 = facilityDataMap.get("t-1");
				t_1Time=facilityDataMap.get("t-1_submissionIds");
			}
			if (facilityDataMap.containsKey("t-2")) {
				t2 = facilityDataMap.get("t-2");
				t_2Time=facilityDataMap.get("t-2_submissionIds");
				facilityDataMap.put("t", t2);
				facilityDataMap.put("t_submissionIds",t_2Time);
				facilityDataMap.put("t-2", t);
				facilityDataMap.put("t-2_submissionIds",tTime);
			} else if (facilityDataMap.containsKey("t-1")) {
				facilityDataMap.put("t", t1);
				facilityDataMap.put("t_submissionIds", t_1Time);
				facilityDataMap.put("t-1", t);
				facilityDataMap.put("t-1_submissionIds",tTime);
			}

			facilityDataMapList.add(facilityDataMap);
		}
		return facilityDataMapList;
	}

	private List<Map<String, String>> getFacilityData(ReportInputDataModel reportInputDataModel) {
		List<Map<String, String>> facilityDataMapList = new ArrayList<Map<String, String>>();

		Map<String, String> facilityDataMap = new LinkedHashMap<String, String>();
		int facilityId = 0;
		
        // code edited by sourav keshari nath
		List<Area> areas = areaRepository.findByAreaParentId(reportInputDataModel.getBlockId()==0?reportInputDataModel.getDistrictId():reportInputDataModel.getBlockId());
		areas.add(areaRepository.findByAreaNId(reportInputDataModel.getBlockId()==0?reportInputDataModel.getDistrictId():reportInputDataModel.getBlockId()));
		// code ended
		
		Map<Integer, String> areaNameMap = new LinkedHashMap<Integer, String>();
		for (Area area : areas) {
			areaNameMap.put(area.getAreaNId(), area.getName());
		}
		
		// code edited by sourav keshari nath
		int blockId,districtId = 0;
        if(reportInputDataModel.getBlockId()==0){
        	districtId = reportInputDataModel.getDistrictId();
        	blockId = 0;
        }else{
        	districtId = 0;
        	blockId = reportInputDataModel.getBlockId();
        }
		
		List<Object[]> facilityDatas = facilityDataRepository.findLatestSubmissionOfEachFacilityWithinADistrict(districtId,blockId);
		facilityDatas.addAll(facilityDataRepository.find2LatestSubmissionOfEachFacilityWithinADistrict(districtId,blockId));
		facilityDatas.addAll(facilityDataRepository.find3LatestSubmissionOfEachFacilityWithinADistrict(districtId,blockId));
		facilityDatas.addAll(facilityDataRepository.findLastSubmissionOfEachFacilityWithinADistrict(districtId,blockId));
		// code ended
		Collections.sort(facilityDatas, new Comparator<Object[]>() {

			@Override
			public int compare(Object[] arg0, Object[] arg1) {

				int areaId = (Integer.compare(Integer.parseInt(arg0[1].toString()), Integer.parseInt(arg1[1].toString())));
				if (areaId != 0) {
					return areaId;
				}

				// Next by Ids
				return (Integer.compare(Integer.parseInt(arg0[6].toString()), Integer.parseInt(arg1[6].toString())));

			}
		});

		int i = 0, j = 0;
		for (Object[] facilityData : facilityDatas) {

			if (facilityId != Integer.parseInt((facilityData[1].toString()))) {
				if (facilityId != 0) {
					String t = null, t1 = null, t2 = null;
					if (facilityDataMap.containsKey("t"))
						t = facilityDataMap.get("t");

					if (facilityDataMap.containsKey("t-1"))
						t1 = facilityDataMap.get("t-1");

					if (facilityDataMap.containsKey("t-2")) {
						t2 = facilityDataMap.get("t-2");
						facilityDataMap.put("t", t2);
						facilityDataMap.put("t-2", t);
					} else if (facilityDataMap.containsKey("t-1")) {
						facilityDataMap.put("t", t1);
						facilityDataMap.put("t-1", t);
					}

					facilityDataMapList.add(facilityDataMap);
					facilityId=0;
				}
				i = 0;
				if (facilityData[4] != null) {
					facilityId = Integer.parseInt((facilityData[1].toString()));
					facilityDataMap = new LinkedHashMap<>();
					facilityDataMap.put("facility", facilityData[0].toString());
					facilityDataMap.put("facilityType", facilityData[5].toString());
					facilityDataMap.put("baseline", df.format(Double.parseDouble(facilityData[4].toString())));
					facilityDataMap.put("submissionIds", facilityData[6].toString());
					facilityDataMap.put("area", areaNameMap.get(Integer.parseInt(facilityData[7].toString())));

				}
				
			} else {
				if (!Arrays.asList(facilityDataMap.get("submissionIds").split(",")).contains(facilityData[6].toString())) {
					if (i == 0)
						facilityDataMap.put("t", df.format(Double.parseDouble(facilityData[4].toString())));
					else
						facilityDataMap.put("t-" + i, df.format(Double.parseDouble(facilityData[4].toString())));

					String ids = facilityDataMap.get("submissionIds").concat("," + facilityData[6].toString());
					facilityDataMap.put("submissionIds", ids);
					i++;
				}
			}
		}
		j++;

		if (facilityDatas.size() > 0 && !facilityDataMap.isEmpty() && facilityId != 0)
		{

			String t = null, t1 = null, t2 = null;
			if (facilityDataMap.containsKey("t"))
				t = facilityDataMap.get("t");

			if (facilityDataMap.containsKey("t-1"))
				t1 = facilityDataMap.get("t-1");

			if (facilityDataMap.containsKey("t-2")) {
				t2 = facilityDataMap.get("t-2");
				facilityDataMap.put("t", t2);
				facilityDataMap.put("t-2", t);
			} else if (facilityDataMap.containsKey("t-1")) {
				facilityDataMap.put("t", t1);
				facilityDataMap.put("t-1", t);
			}

			facilityDataMapList.add(facilityDataMap);
		
		}
		return facilityDataMapList;
	}

	@Override
	public List<Map<String, String>> getSubmisionData(int checklistId, List<String> submissionIds , int facilityId) {

		List<Map<String, String>> mapDataList = new ArrayList<Map<String, String>>();
		switch (checklistId) {

		case 121:
			mapDataList = getFacilitySubmissionData(submissionIds, checklistId);
			break;
		case 122:
			mapDataList = getCommunitySubmissionData(submissionIds, checklistId , facilityId);
			break;
		}

		return mapDataList;
	}

	private List<Map<String, String>> getCommunitySubmissionData(List<String> submissionIds, int checklistId,int facilityId) {

		List<Integer> timeperiodIds = submissionIds.stream().map(String::trim).map(Integer::parseInt).collect(Collectors.toList());
		
		List<Map<String, String>> communityDataMapList = new ArrayList<Map<String, String>>();
		
		int timeperiodId=0;
		if(timeperiodIds.size()>0)
		{
			timeperiodId=timeperiodIds.get(0);
		}
		else
		{
			return communityDataMapList;
		}
		UtTimeperiod timePeriod=utTimeperiodRepository.findByTimeperiodNid(timeperiodId);
		List<Object[]> indicatorEns = utIndicatorEnRepository.findScoreIndicator();
		
		Map<String, String> indMap = new HashMap<String, String>();;
		for (Object[] indicatorEn : indicatorEns) {
			indMap .put(indicatorEn[1].toString(), indicatorEn[0].toString());
			if (indicatorEn[2] != null)
				indMap.put(indicatorEn[2].toString(), indicatorEn[0].toString());
		}
		
		List<CommunityData> communityDatas = communityDataRepository.findByDateBetweenAndFacilityAreaNIdOrderByDateAsc(timePeriod.getStartDate(), timePeriod.getEndDate(),facilityId);
		Map<String,Map<String,String>> dataMap =new LinkedHashMap<String,Map<String,String>>();
		
		Map<String,String> communityDataMap=new LinkedHashMap<String, String>(); 
		
		communityDataMap=new LinkedHashMap<String, String>(); 
		
		for(CommunityData communityData:communityDatas)
		{
			communityDataMap=new LinkedHashMap<String, String>(); 
			
			communityDataMap.put(communityData.getQ4(),communityData.getUser().getFirstName()+ " ( " + sdf.format(communityData.getDate()) + " )");
			if(dataMap.containsKey("Name Of Supervisor"))
			{
				dataMap.get("Name Of Supervisor").put(communityData.getQ4(),communityData.getUser().getFirstName()+ " ( " + sdf.format(communityData.getDate()) + " )");
			}
			else
			{
				dataMap.put("Name Of Supervisor", communityDataMap);
			}
			
			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey(indMap.get("note5a")))
			{
				if (communityData.getNote5a() > 0)
					dataMap.get(indMap.get("note5a")).put(communityData.getQ4(), String.valueOf(df.format((Double.parseDouble(String.valueOf(communityData.getNote51a() * 100))) / communityData.getNote5a())));
				else
					dataMap.get( indMap.get("note5a")).put(communityData.getQ4(), "-");
			}
			else
			{
				if (communityData.getNote5a() > 0)
					communityDataMap.put(communityData.getQ4(), String.valueOf(df.format((Double.parseDouble(String.valueOf(communityData.getNote51a() * 100))) / communityData.getNote5a())));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("note5a"),communityDataMap);
			}
			
			
			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("note1")))
			{
				if (communityData.getNote1() > 0)
					dataMap.get(indMap.get("note1")).put(communityData.getQ4(), String.valueOf(df.format((Double.parseDouble(String.valueOf(communityData.getNote11() * 100))) / communityData.getNote1())));
				else
					dataMap.get( indMap.get("note1")).put(communityData.getQ4(), "-");
			}
			else
			{
				if (communityData.getNote1() > 0)
					communityDataMap.put(communityData.getQ4(), String.valueOf(df.format(Double.parseDouble(String.valueOf(communityData.getNote11() * 100)) / communityData.getNote1())));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("note1"),communityDataMap);
			}
			
			
			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("note2")))
			{
				if (communityData.getNote21() > 0)
					dataMap.get(indMap.get("note2")).put(communityData.getQ4(), df.format(((double)communityData.getNote21() * 100) / communityData.getNote2()));
				else
					dataMap.get( indMap.get("note2")).put(communityData.getQ4(), "-");
			}
			else
			{
				if (communityData.getNote21() > 0)
					communityDataMap.put(communityData.getQ4(), df.format(((double)communityData.getNote21() * 100) / communityData.getNote2()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("note2"),communityDataMap);
			}
			
			
			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("note3b")))
			{
				if (communityData.getNote3b() > 0)
					dataMap.get(indMap.get("note3b")).put(communityData.getQ4(), df.format(((double)communityData.getNote31b() * 100) / communityData.getNote3b()));
				else
					dataMap.get( indMap.get("note2")).put(communityData.getQ4(), "-");
			}
			else
			{
				if (communityData.getNote3b() > 0)
					communityDataMap.put(communityData.getQ4(), df.format(((double)communityData.getNote31b() * 100) / communityData.getNote3b()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("note3b"),communityDataMap);
			}

			
			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("c_ia_iasha_score")))
			{
				if (communityData.getC_IA_IASHA_score_max() > 0)
					dataMap.get(indMap.get("c_ia_iasha_score")).put(communityData.getQ4(), df.format(((double)communityData.getC_IA_IASHA_score() * 100) / communityData.getC_IA_IASHA_score_max()));
				else
					dataMap.get( indMap.get("c_ia_iasha_score")).put(communityData.getQ4(), "-");
			}
			else
			{
				if (communityData.getC_IA_IASHA_score_max() > 0)
					communityDataMap.put(communityData.getQ4(), df.format(((double)communityData.getC_IA_IASHA_score() * 100) / communityData.getC_IA_IASHA_score_max()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("c_ia_iasha_score"),communityDataMap);
			}

			
			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("c_ia_aoecwasa_score")))
			{
				if (communityData.getC_IA_AOECWASA_score_max() > 0)
					dataMap.get(indMap.get("c_ia_aoecwasa_score")).put(communityData.getQ4(), df.format(((double)communityData.getC_IA_AOECWASA_score() * 100) / communityData.getC_IA_AOECWASA_score_max()));
				else
					dataMap.get(indMap.get("c_ia_aoecwasa_score")).put(communityData.getQ4(), "-");
				
			}
			else
			{
				if (communityData.getC_IA_AOECWASA_score_max() > 0)
					communityDataMap.put(communityData.getQ4(), df.format(((double)communityData.getC_IA_AOECWASA_score() * 100) / communityData.getC_IA_AOECWASA_score_max()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("c_ia_aoecwasa_score"),communityDataMap);
			}
		

			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("c_ia_aiwa_score")))
			{
				if (communityData.getC_IA_AIWA_score_max() > 0)
					dataMap.get(indMap.get("c_ia_aiwa_score")).put(communityData.getQ4(), df.format(((double)communityData.getC_IA_AIWA_score() * 100) / communityData.getC_IA_AIWA_score_max()));
				else
					dataMap.get(indMap.get("c_ia_aiwa_score")).put(communityData.getQ4(), "-");
				
			}
			else
			{
				if (communityData.getC_IA_AIWA_score_max() > 0)
					communityDataMap.put(communityData.getQ4(), df.format(((double)communityData.getC_IA_AIWA_score() * 100) / communityData.getC_IA_AIWA_score_max()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("c_ia_aiwa_score"),communityDataMap);
			}

			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("c_ia_aisa_score")))
			{
				if (communityData.getC_IA_AISA_score_max() > 0)
					dataMap.get(indMap.get("c_ia_aisa_score")).put(communityData.getQ4(), df.format(((double)communityData.getC_IA_AISA_score() * 100) / communityData.getC_IA_AISA_score_max()));
				else
					dataMap.get(indMap.get("c_ia_aisa_score")).put(communityData.getQ4(), "-");
				
			}
			else
			{
				if (communityData.getC_IA_AISA_score_max() > 0)
					communityDataMap.put(communityData.getQ4(), df.format(((double)communityData.getC_IA_AISA_score() * 100) / communityData.getC_IA_AISA_score_max()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("c_ia_aisa_score"),communityDataMap);
			}
			
			
			
			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("note4a")))
			{
				if (communityData.getNote4a() > 0)
					dataMap.get(indMap.get("note4a")).put(communityData.getQ4(), df.format(((double)communityData.getNote41a() * 100) / communityData.getNote4a()));
				else
					dataMap.get(indMap.get("note4a")).put(communityData.getQ4(), "-");
				
			}
			else
			{
				if (communityData.getNote4a() > 0)
					communityDataMap.put(communityData.getQ4(), df.format(((double)communityData.getNote41a() * 100) / communityData.getNote4a()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("note4a"),communityDataMap);
			}
			
			
			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("c_ib_iwpw_score")))
			{
				if (communityData.getC_IB_IWPW_score_max() > 0)
					dataMap.get(indMap.get("c_ib_iwpw_score")).put(communityData.getQ4(), df.format(((double)communityData.getC_IB_IWPW_score() * 100) / communityData.getC_IB_IWPW_score_max()));
				else
					dataMap.get(indMap.get("c_ib_iwpw_score")).put(communityData.getQ4(), "-");
				
			}
			else
			{
				if (communityData.getC_IB_IWPW_score_max() > 0)
					communityDataMap.put(communityData.getQ4(), df.format(((double)communityData.getC_IB_IWPW_score() * 100) / communityData.getC_IB_IWPW_score_max()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("c_ib_iwpw_score"),communityDataMap);
			}
			
			
			
				communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("c_ib_iwlmwmb_score")))
			{
				if (communityData.getC_IB_IWLMWMB_score_max() > 0)
					dataMap.get(indMap.get("c_ib_iwlmwmb_score")).put(communityData.getQ4(), df.format(((double)communityData.getC_IB_IWLMWMB_score() * 100) / communityData.getC_IB_IWLMWMB_score_max()));
				else
					dataMap.get(indMap.get("c_ib_iwlmwmb_score")).put(communityData.getQ4(), "-");
				
			}
			else
			{
				if (communityData.getC_IB_IWLMWMB_score_max() > 0)
					communityDataMap.put(communityData.getQ4(), df.format(((double)communityData.getC_IB_IWLMWMB_score() * 100) / communityData.getC_IB_IWLMWMB_score_max()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("c_ib_iwlmwmb_score"),communityDataMap);
			}


			
			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("c_ib_aassrfwsd_score")))
			{
				if (communityData.getC_IB_AASSRFWSD_score_max() > 0)
					dataMap.get(indMap.get("c_ib_aassrfwsd_score")).put(communityData.getQ4(), df.format(((double)communityData.getC_IB_AASSRFWSD_score() * 100) / communityData.getC_IB_AASSRFWSD_score_max()));
				else
					dataMap.get(indMap.get("c_ib_aassrfwsd_score")).put(communityData.getQ4(), "-");
				
			}
			else
			{
				if (communityData.getC_IB_AASSRFWSD_score_max() > 0)
					communityDataMap.put(communityData.getQ4(), df.format(((double)communityData.getC_IB_AASSRFWSD_score() * 100) / communityData.getC_IB_AASSRFWSD_score_max()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("c_ib_aassrfwsd_score"),communityDataMap);
			}

			
			
			
			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("c_ib_imwcm_score")))
			{
				if (communityData.getC_IB_IMWCM_score_max() > 0)
					dataMap.get(indMap.get("c_ib_imwcm_score")).put(communityData.getQ4(), df.format((double)(communityData.getC_IB_IMWCM_score() * 100) / communityData.getC_IB_IMWCM_score_max()));
				else
					dataMap.get(indMap.get("c_ib_imwcm_score")).put(communityData.getQ4(), "-");
				
			}
			else
			{
				if (communityData.getC_IB_IMWCM_score_max() > 0)
					communityDataMap.put(communityData.getQ4(), df.format((double)(communityData.getC_IB_IMWCM_score() * 100) / communityData.getC_IB_IMWCM_score_max()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("c_ib_imwcm_score"),communityDataMap);
			}

			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("c_ib_iwbmpwpm_score")))
			{
				if (communityData.getC_IB_IWBMPWPM_score_max() > 0)
					dataMap.get(indMap.get("c_ib_iwbmpwpm_score")).put(communityData.getQ4(), df.format((double)(communityData.getC_IB_IWBMPWPM_score() * 100) / communityData.getC_IB_IWBMPWPM_score_max()));
				else
					dataMap.get(indMap.get("c_ib_iwbmpwpm_score")).put(communityData.getQ4(), "-");
				
			}
			else
			{
				if (communityData.getC_IB_IWBMPWPM_score_max() > 0)
					communityDataMap.put(communityData.getQ4(), df.format((double)(communityData.getC_IB_IWBMPWPM_score() * 100) / communityData.getC_IB_IWBMPWPM_score_max()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("c_ib_iwbmpwpm_score"),communityDataMap);
			}
			
			
			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("c_ib_iwfha_score")))
			{
				if (communityData.getC_IB_IWFHA_score_max() > 0)
					dataMap.get(indMap.get("c_ib_iwfha_score")).put(communityData.getQ4(), df.format((double)(communityData.getC_IB_IWFHA_score() * 100) / communityData.getC_IB_IWFHA_score_max()));
				else
					dataMap.get(indMap.get("c_ib_iwfha_score")).put(communityData.getQ4(), "-");
				
			}
			else
			{
				if (communityData.getC_IB_IWFHA_score_max() > 0)
					communityDataMap.put(communityData.getQ4(), df.format((double)(communityData.getC_IB_IWFHA_score() * 100) / communityData.getC_IB_IWFHA_score_max()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("c_ib_iwfha_score"),communityDataMap);
			}
			
		
			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("c_ib_ihhd_score")))
			{
				if (communityData.getC_IB_IHHD_score_max() > 0)
					dataMap.get(indMap.get("c_ib_ihhd_score")).put(communityData.getQ4(), df.format((double)(communityData.getC_IB_IHHD_score() * 100) / communityData.getC_IB_IHHD_score_max()));
				else
					dataMap.get(indMap.get("c_ib_ihhd_score")).put(communityData.getQ4(), "-");
				
			}
			else
			{
				if (communityData.getC_IB_IHHD_score_max() > 0)
					communityDataMap.put(communityData.getQ4(),df.format((double)(communityData.getC_IB_IHHD_score() * 100) / communityData.getC_IB_IHHD_score_max()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("c_ib_ihhd_score"),communityDataMap);
			}
			

			

			communityDataMap=new LinkedHashMap<String, String>(); 
			
			if(dataMap.containsKey( indMap.get("c_ib_saiwwnta_score")))
			{
				if (communityData.getC_IB_SAIWWNTA_score_max() > 0)
					dataMap.get(indMap.get("c_ib_saiwwnta_score")).put(communityData.getQ4(), df.format((double)(communityData.getC_IB_SAIWWNTA_score() * 100) / communityData.getC_IB_SAIWWNTA_score_max()));
				else
					dataMap.get(indMap.get("c_ib_saiwwnta_score")).put(communityData.getQ4(), "-");
				
			}
			else
			{
				if (communityData.getC_IB_SAIWWNTA_score_max() > 0)
					communityDataMap.put(communityData.getQ4(), df.format((double)(communityData.getC_IB_SAIWWNTA_score() * 100) / communityData.getC_IB_SAIWWNTA_score_max()));
				else
					communityDataMap.put(communityData.getQ4(), "-");
				
				dataMap.put(indMap.get("c_ib_saiwwnta_score"),communityDataMap);
			}
			
		}
		
		dataMap.forEach((k, v) -> {
			
			v.put("Section/Sub-Section", k);
			communityDataMapList.add(v);

		});
		
		return communityDataMapList;
	}

	private List<Map<String, String>> getFacilitySubmissionData(List<String> submissionIds, int checklistId) {
		List<Long> submissionIdsInteger = submissionIds.stream().map(String::trim).map(Long::parseLong).collect(Collectors.toList());
		List<Object[]> indicatorEns = utIndicatorEnRepository.findScoreIndicator();
		Map<String, String> indMap = new LinkedHashMap<String, String>();

		for (Object[] indicatorEn : indicatorEns) {
			indMap.put(indicatorEn[1].toString(), indicatorEn[0].toString());
			if (indicatorEn[2] != null)
				indMap.put(indicatorEn[2].toString(), indicatorEn[0].toString());
		}
		List<FacilityData> facilityDatas = facilityDataRepository.findByIdIsInOrderByC7Desc(submissionIdsInteger);
		List<Map<String, String>> facilityDataMapList = new ArrayList<Map<String, String>>();
		Map<String, String> facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("facilityName", "Name Of Supervisor");
		facilityDataMap.put("baseline", facilityDatas.get(facilityDatas.size() - 1).getUser().getFirstName() + " ( " + sdf.format(facilityDatas.get(facilityDatas.size() - 1).getC7()) + " )");
		if (facilityDatas.size() >= 2) {
			facilityDataMap.put("t", facilityDatas.get(0).getUser().getFirstName() + " ( " + sdf.format(facilityDatas.get(0).getC7()) + " )");
		}
		if (facilityDatas.size() >= 3) {
			facilityDataMap.put("t-1", facilityDatas.get(1).getUser().getFirstName() + " ( " + sdf.format(facilityDatas.get(1).getC7()) + " )");
		}
		if (facilityDatas.size() >= 4) {
			facilityDataMap.put("t-2", facilityDatas.get(2).getUser().getFirstName() + " ( " + sdf.format(facilityDatas.get(2).getC7()) + " )");
		}

		facilityDataMapList.add(facilityDataMap);

		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("facilityName", indMap.get("e_total_score"));
		if (facilityDatas.get(facilityDatas.size() - 1).getE_total_score_max() > 0)
			facilityDataMap.put("baseline", df.format((double)(facilityDatas.get(facilityDatas.size() - 1).getE_total_score() * 100) / facilityDatas.get(facilityDatas.size() - 1).getE_total_score_max()));
		else
			facilityDataMap.put("baseline", "-");
		if (facilityDatas.size() >= 2) {
			if (facilityDatas.get(0).getE_total_score_max() > 0)
				facilityDataMap.put("t", df.format((double)(facilityDatas.get(0).getE_total_score() * 100) / facilityDatas.get(0).getE_total_score_max()));
			else
				facilityDataMap.put("t", "-");
		}
		if (facilityDatas.size() >= 3) {
			if (facilityDatas.get(1).getE_total_score_max() > 0)
				facilityDataMap.put("t-1", df.format((double)(facilityDatas.get(1).getE_total_score() * 100) / facilityDatas.get(1).getE_total_score_max()));
			else
				facilityDataMap.put("t-1", "-");
		}
		if (facilityDatas.size() >= 4) {
			if (facilityDatas.get(2).getE_total_score_max() > 0)
				facilityDataMap.put("t-2", df.format((double)(facilityDatas.get(2).getE_total_score() * 100) / facilityDatas.get(2).getE_total_score_max()));
			else
				facilityDataMap.put("t-2", "-");
		}

		facilityDataMapList.add(facilityDataMap);

		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("facilityName", indMap.get("e_rh_score"));
		if (facilityDatas.get(facilityDatas.size() - 1).getE_RH_score_max() > 0)
			facilityDataMap.put("baseline", df.format((double)(facilityDatas.get(facilityDatas.size() - 1).getE_RH_score() * 100) / facilityDatas.get(facilityDatas.size() - 1).getE_RH_score_max()));
		else
			facilityDataMap.put("baseline", "-");
		if (facilityDatas.size() >= 2) {
			if (facilityDatas.get(0).getE_RH_score_max() > 0)
				facilityDataMap.put("t", df.format((double)(facilityDatas.get(0).getE_RH_score() * 100) / facilityDatas.get(0).getE_RH_score_max()));
			else
				facilityDataMap.put("t", "-");
		}
		if (facilityDatas.size() >= 3) {
			if (facilityDatas.get(1).getE_RH_score_max() > 0)
				facilityDataMap.put("t-1", df.format((double)(facilityDatas.get(1).getE_RH_score() * 100) / facilityDatas.get(1).getE_RH_score_max()));
			else
				facilityDataMap.put("t-1", "-");
		}
		if (facilityDatas.size() >= 4) {
			if (facilityDatas.get(2).getE_RH_score_max() > 0)
				facilityDataMap.put("t-2", df.format((double)(facilityDatas.get(2).getE_RH_score() * 100) / facilityDatas.get(2).getE_RH_score_max()));
			else
				facilityDataMap.put("t-2", "-");
		}

		facilityDataMapList.add(facilityDataMap);

		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("facilityName", indMap.get("e_mhds_score"));
		if (facilityDatas.get(facilityDatas.size() - 1).getE_MHDS_score_max() > 0)
			facilityDataMap.put("baseline", df.format((double)(facilityDatas.get(facilityDatas.size() - 1).getE_MHDS_score() * 100) / facilityDatas.get(facilityDatas.size() - 1).getE_MHDS_score_max()));
		else
			facilityDataMap.put("baseline", "-");
		if (facilityDatas.size() >= 2) {
			if (facilityDatas.get(0).getE_MHDS_score_max() > 0)
				facilityDataMap.put("t", df.format((double)(facilityDatas.get(0).getE_MHDS_score() * 100) / facilityDatas.get(0).getE_MHDS_score_max()));
			else
				facilityDataMap.put("t", "-");
		}
		if (facilityDatas.size() >= 3) {
			if (facilityDatas.get(1).getE_MHDS_score_max() > 0)
				facilityDataMap.put("t-1", df.format((double)(facilityDatas.get(1).getE_MHDS_score() * 100) / facilityDatas.get(1).getE_MHDS_score_max()));
			else
				facilityDataMap.put("t-1", "-");
		}
		if (facilityDatas.size() >= 4) {
			if (facilityDatas.get(2).getE_MHDS_score_max() > 0)
				facilityDataMap.put("t-2", df.format((double)(facilityDatas.get(2).getE_MHDS_score() * 100) / facilityDatas.get(2).getE_MHDS_score_max()));
			else
				facilityDataMap.put("t-2", "-");
		}

		facilityDataMapList.add(facilityDataMap);

		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("facilityName", indMap.get("e_nhds_score"));
		if (facilityDatas.get(facilityDatas.size() - 1).getE_NHDS_score_max() > 0)
			facilityDataMap.put("baseline", df.format((double)(facilityDatas.get(facilityDatas.size() - 1).getE_NHDS_score() * 100) / facilityDatas.get(facilityDatas.size() - 1).getE_NHDS_score_max()));
		else
			facilityDataMap.put("baseline", "-");
		if (facilityDatas.size() >= 2) {
			if (facilityDatas.get(0).getE_NHDS_score_max() > 0)
				facilityDataMap.put("t", df.format((double)(facilityDatas.get(0).getE_NHDS_score() * 100) / facilityDatas.get(0).getE_NHDS_score_max()));
			else
				facilityDataMap.put("t", "-");
		}
		if (facilityDatas.size() >= 3) {
			if (facilityDatas.get(1).getE_NHDS_score_max() > 0)
				facilityDataMap.put("t-1", df.format((double)(facilityDatas.get(1).getE_NHDS_score() * 100) / facilityDatas.get(1).getE_NHDS_score_max()));
			else
				facilityDataMap.put("t-1", "-");
		}
		if (facilityDatas.size() >= 4) {
			if (facilityDatas.get(1).getE_NHDS_score_max() > 0)
				facilityDataMap.put("t-2", df.format((double)(facilityDatas.get(2).getE_NHDS_score() * 100) / facilityDatas.get(2).getE_NHDS_score_max()));
			else
				facilityDataMap.put("t-2", "-");
		}

		facilityDataMapList.add(facilityDataMap);

		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("facilityName", indMap.get("e_chds_score"));
		if (facilityDatas.get(facilityDatas.size() - 1).getE_CHDS_score_max() > 0)
			facilityDataMap.put("baseline", df.format((double)(facilityDatas.get(facilityDatas.size() - 1).getE_CHDS_score() * 100) / facilityDatas.get(facilityDatas.size() - 1).getE_CHDS_score_max()));
		else
			facilityDataMap.put("baseline", "-");
		if (facilityDatas.size() >= 2) {
			if (facilityDatas.get(0).getE_CHDS_score_max() > 0)
				facilityDataMap.put("t", df.format((double)(facilityDatas.get(0).getE_CHDS_score() * 100) / facilityDatas.get(0).getE_CHDS_score_max()));
			else
				facilityDataMap.put("t", "-");
		}
		if (facilityDatas.size() >= 3) {
			if (facilityDatas.get(1).getE_CHDS_score_max() > 0)
				facilityDataMap.put("t-1", df.format((double)(facilityDatas.get(1).getE_CHDS_score() * 100) / facilityDatas.get(1).getE_CHDS_score_max()));
			else
				facilityDataMap.put("t-1", "-");
		}
		if (facilityDatas.size() >= 4) {
			if (facilityDatas.get(2).getE_CHDS_score_max() > 0)
				facilityDataMap.put("t-2", df.format((double)(facilityDatas.get(2).getE_CHDS_score() * 100) / facilityDatas.get(2).getE_CHDS_score_max()));
			else
				facilityDataMap.put("t-2", "-");
		}

		facilityDataMapList.add(facilityDataMap);

		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("facilityName", indMap.get("e_vaccines_score"));
		if (facilityDatas.get(facilityDatas.size() - 1).getE_Vaccines_score_max() > 0)
			facilityDataMap.put("baseline", df.format((double)(facilityDatas.get(facilityDatas.size() - 1).getE_Vaccines_score() * 100) / facilityDatas.get(facilityDatas.size() - 1).getE_Vaccines_score_max()));
		else
			facilityDataMap.put("baseline", "-");
		if (facilityDatas.size() >= 2) {
			if (facilityDatas.get(0).getE_Vaccines_score_max() > 0)
				facilityDataMap.put("t", df.format((double)(facilityDatas.get(0).getE_Vaccines_score() * 100) / facilityDatas.get(0).getE_Vaccines_score_max()));
			else
				facilityDataMap.put("t", "-");
		}
		if (facilityDatas.size() >= 3) {
			if (facilityDatas.get(1).getE_Vaccines_score_max() > 0)
				facilityDataMap.put("t-1", df.format((double)(facilityDatas.get(1).getE_Vaccines_score() * 100) / facilityDatas.get(1).getE_Vaccines_score_max()));
			else
				facilityDataMap.put("t-1", "-");
		}
		if (facilityDatas.size() >= 4) {
			if (facilityDatas.get(2).getE_Vaccines_score_max() > 0)
				facilityDataMap.put("t-2", df.format((double)(facilityDatas.get(2).getE_Vaccines_score() * 100) / facilityDatas.get(2).getE_Vaccines_score_max()));
			else
				facilityDataMap.put("t-2", "-");
		}

		facilityDataMapList.add(facilityDataMap);

		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("facilityName", indMap.get("e_antibiotics_score"));
		if (facilityDatas.get(facilityDatas.size() - 1).getE_Antibiotics_score_max() > 0)
			facilityDataMap.put("baseline", df.format((double)(facilityDatas.get(facilityDatas.size() - 1).getE_Antibiotics_score() * 100) / facilityDatas.get(facilityDatas.size() - 1).getE_Antibiotics_score_max()));
		else
			facilityDataMap.put("baseline", "-");
		if (facilityDatas.size() >= 2) {
			if (facilityDatas.get(0).getE_Antibiotics_score_max() > 0)
				facilityDataMap.put("t", df.format((double)(facilityDatas.get(0).getE_Antibiotics_score() * 100) / facilityDatas.get(0).getE_Antibiotics_score_max()));
			else
				facilityDataMap.put("t", "-");
		}
		if (facilityDatas.size() >= 3) {
			if (facilityDatas.get(1).getE_Antibiotics_score_max() > 0)
				facilityDataMap.put("t-1", df.format((double)(facilityDatas.get(1).getE_Antibiotics_score() * 100) / facilityDatas.get(1).getE_Antibiotics_score_max()));
			else
				facilityDataMap.put("t-1", "-");
		}
		if (facilityDatas.size() >= 4) {
			if (facilityDatas.get(2).getE_Antibiotics_score_max() > 0)
				facilityDataMap.put("t-2", df.format((double)(facilityDatas.get(2).getE_Antibiotics_score() * 100) / facilityDatas.get(2).getE_Antibiotics_score_max()));
			else
				facilityDataMap.put("t-2", "-");
		}

		facilityDataMapList.add(facilityDataMap);

		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("facilityName", indMap.get("e_infrastructure_score"));
		if (facilityDatas.get(facilityDatas.size() - 1).getE_Infrastructure_score_max() > 0)
			facilityDataMap.put("baseline", df.format((double)(facilityDatas.get(facilityDatas.size() - 1).getE_Infrastructure_score() * 100) / facilityDatas.get(facilityDatas.size() - 1).getE_Infrastructure_score_max()));
		else
			facilityDataMap.put("baseline", "-");
		if (facilityDatas.size() >= 2) {
			if (facilityDatas.get(0).getE_Infrastructure_score_max() > 0)
				facilityDataMap.put("t", df.format((double)(facilityDatas.get(0).getE_Infrastructure_score() * 100) / facilityDatas.get(0).getE_Infrastructure_score_max()));
			else
				facilityDataMap.put("t", "-");
		}
		if (facilityDatas.size() >= 3) {
			if (facilityDatas.get(1).getE_Infrastructure_score_max() > 0)
				facilityDataMap.put("t-1", df.format((double)(facilityDatas.get(1).getE_Infrastructure_score() * 100) / facilityDatas.get(1).getE_Infrastructure_score_max()));
			else
				facilityDataMap.put("t-1", "-");
		}
		if (facilityDatas.size() >= 4) {
			if (facilityDatas.get(2).getE_Infrastructure_score_max() > 0)
				facilityDataMap.put("t-2", df.format((double)(facilityDatas.get(2).getE_Infrastructure_score() * 100) / facilityDatas.get(2).getE_Infrastructure_score_max()));
			else
				facilityDataMap.put("t-2", "-");
		}

		facilityDataMapList.add(facilityDataMap);

		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("facilityName", indMap.get("e_ip_score"));
		if (facilityDatas.get(facilityDatas.size() - 1).getE_IP_score_max() > 0)
			facilityDataMap.put("baseline", df.format((double)(facilityDatas.get(facilityDatas.size() - 1).getE_IP_score() * 100) / facilityDatas.get(facilityDatas.size() - 1).getE_IP_score_max()));
		else
			facilityDataMap.put("baseline", "-");
		if (facilityDatas.size() >= 2) {
			if (facilityDatas.get(0).getE_IP_score_max() > 0)
				facilityDataMap.put("t", df.format((double)(facilityDatas.get(0).getE_IP_score() * 100) / facilityDatas.get(0).getE_IP_score_max()));
			else
				facilityDataMap.put("t", "-");
		}
		if (facilityDatas.size() >= 3) {
			if (facilityDatas.get(1).getE_IP_score_max() > 0)
				facilityDataMap.put("t-1", df.format((double)(facilityDatas.get(1).getE_IP_score() * 100) / facilityDatas.get(1).getE_IP_score_max()));
			else
				facilityDataMap.put("t-1", "-");
		}
		if (facilityDatas.size() >= 4) {
			if (facilityDatas.get(2).getE_IP_score_max() > 0)
				facilityDataMap.put("t-2", df.format((double)(facilityDatas.get(2).getE_IP_score() * 100) / facilityDatas.get(2).getE_IP_score_max()));
			else
				facilityDataMap.put("t-1", "-");
		}

		facilityDataMapList.add(facilityDataMap);

		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("facilityName", indMap.get("e_ahds_score"));
		if (facilityDatas.get(facilityDatas.size() - 1).getE_AHDS_score_max() > 0)
			facilityDataMap.put("baseline", df.format((double)(facilityDatas.get(facilityDatas.size() - 1).getE_AHDS_score() * 100) / facilityDatas.get(facilityDatas.size() - 1).getE_AHDS_score_max()));
		else
			facilityDataMap.put("baseline", "-");
		if (facilityDatas.size() >= 2) {
			if (facilityDatas.get(0).getE_AHDS_score_max() > 0)
				facilityDataMap.put("t", df.format((double)(facilityDatas.get(0).getE_AHDS_score() * 100) / facilityDatas.get(0).getE_AHDS_score_max()));
			else
				facilityDataMap.put("t", "-");
		}
		if (facilityDatas.size() >= 3) {
			if (facilityDatas.get(1).getE_AHDS_score_max() > 0)
				facilityDataMap.put("t-1", df.format((double)(facilityDatas.get(1).getE_AHDS_score() * 100) / facilityDatas.get(1).getE_AHDS_score_max()));
			else
				facilityDataMap.put("t-1", "-");
		}
		if (facilityDatas.size() >= 4) {
			if (facilityDatas.get(2).getE_AHDS_score_max() > 0)
				facilityDataMap.put("t-2", df.format((double)(facilityDatas.get(2).getE_AHDS_score() * 100) / facilityDatas.get(2).getE_AHDS_score_max()));
			else
				facilityDataMap.put("t-3", "-");
		}

		facilityDataMapList.add(facilityDataMap);

		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("facilityName", indMap.get("e_oe_score"));
		if (facilityDatas.get(facilityDatas.size() - 1).getE_OE_score_max() > 0)
			facilityDataMap.put("baseline", df.format((double)(facilityDatas.get(facilityDatas.size() - 1).getE_OE_score() * 100) / facilityDatas.get(facilityDatas.size() - 1).getE_OE_score_max()));
		else
			facilityDataMap.put("baseline", "-");
		if (facilityDatas.size() >= 2) {
			if (facilityDatas.get(0).getE_OE_score_max() > 0)
				facilityDataMap.put("t", df.format((double)(facilityDatas.get(0).getE_OE_score() * 100) / facilityDatas.get(0).getE_OE_score_max()));
			else
				facilityDataMap.put("t", "-");
		}
		if (facilityDatas.size() >= 3) {
			if (facilityDatas.get(1).getE_OE_score_max() > 0)
				facilityDataMap.put("t-1", df.format((double)(facilityDatas.get(1).getE_OE_score() * 100) / facilityDatas.get(1).getE_OE_score_max()));
			else
				facilityDataMap.put("t-1", "-");
		}
		if (facilityDatas.size() >= 4) {
			if (facilityDatas.get(2).getE_OE_score_max() > 0)
				facilityDataMap.put("t-2", df.format((double)(facilityDatas.get(2).getE_OE_score() * 100) / facilityDatas.get(2).getE_OE_score_max()));
			else
				facilityDataMap.put("t-2", "-");
		}

		facilityDataMapList.add(facilityDataMap);

		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("facilityName", indMap.get("f_total_score"));
		if (facilityDatas.get(facilityDatas.size() - 1).getF_total_score_max() > 0)
			facilityDataMap.put("baseline", df.format((double)(facilityDatas.get(facilityDatas.size() - 1).getF_total_score() * 100) / facilityDatas.get(facilityDatas.size() - 1).getF_total_score_max()));
		else
			facilityDataMap.put("baseline", "-");
		if (facilityDatas.size() >= 2) {
			if (facilityDatas.get(0).getF_total_score_max() > 0)
				facilityDataMap.put("t", df.format((double)(facilityDatas.get(0).getF_total_score() * 100) / facilityDatas.get(0).getF_total_score_max()));
			else
				facilityDataMap.put("t", "-");
		}
		if (facilityDatas.size() >= 3) {
			if (facilityDatas.get(1).getF_total_score_max() > 0)
				facilityDataMap.put("t-1", df.format((double)(facilityDatas.get(1).getF_total_score() * 100) / facilityDatas.get(1).getF_total_score_max()));
			else
				facilityDataMap.put("t-1", "-");
		}
		if (facilityDatas.size() >= 4) {
			if (facilityDatas.get(2).getF_total_score_max() > 0)
				facilityDataMap.put("t-2", df.format((double)(facilityDatas.get(2).getF_total_score() * 100) / facilityDatas.get(2).getF_total_score_max()));
			else
				facilityDataMap.put("t-2", "-");
		}

		facilityDataMapList.add(facilityDataMap);

		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("facilityName", indMap.get("f_anc_score"));
		if (facilityDatas.get(facilityDatas.size() - 1).getF_ANC_score_max() > 0)
			facilityDataMap.put("baseline", df.format((double)(facilityDatas.get(facilityDatas.size() - 1).getF_ANC_score() * 100) / facilityDatas.get(facilityDatas.size() - 1).getF_ANC_score_max()));
		else
			facilityDataMap.put("baseline", "-");
		if (facilityDatas.size() >= 2) {
			if (facilityDatas.get(0).getF_ANC_score_max() > 0)
				facilityDataMap.put("t", df.format((double)(facilityDatas.get(0).getF_ANC_score() * 100) / facilityDatas.get(0).getF_ANC_score_max()));
			else
				facilityDataMap.put("t", "-");
		}
		if (facilityDatas.size() >= 3) {
			if (facilityDatas.get(1).getF_ANC_score_max() > 0)
				facilityDataMap.put("t-1", df.format((double)(facilityDatas.get(1).getF_ANC_score() * 100) / facilityDatas.get(1).getF_ANC_score_max()));
			else
				facilityDataMap.put("t-1", "-");
		}
		if (facilityDatas.size() >= 4) {
			if (facilityDatas.get(2).getF_ANC_score_max() > 0)
				facilityDataMap.put("t-2", df.format((double)(facilityDatas.get(2).getF_ANC_score() * 100) / facilityDatas.get(2).getF_ANC_score_max()));
			else
				facilityDataMap.put("t-2", "-");
		}

		facilityDataMapList.add(facilityDataMap);

		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("facilityName", indMap.get("f_ipip_score"));
		if (facilityDatas.get(facilityDatas.size() - 1).getF_IPIP_score_max() > 0)
			facilityDataMap.put("baseline", df.format((double)(facilityDatas.get(facilityDatas.size() - 1).getF_IPIP_score() * 100) / facilityDatas.get(facilityDatas.size() - 1).getF_IPIP_score_max()));
		else
			facilityDataMap.put("baseline", "-");
		if (facilityDatas.size() >= 2) {
			if (facilityDatas.get(0).getF_IPIP_score_max() > 0)
				facilityDataMap.put("t", df.format((double)(facilityDatas.get(0).getF_IPIP_score() * 100) / facilityDatas.get(0).getF_IPIP_score_max()));
			else
				facilityDataMap.put("t", "-");
		}
		if (facilityDatas.size() >= 3) {
			if (facilityDatas.get(1).getF_IPIP_score_max() > 0)
				facilityDataMap.put("t-1", df.format((double)(facilityDatas.get(1).getF_IPIP_score() * 100) / facilityDatas.get(1).getF_IPIP_score_max()));
			else
				facilityDataMap.put("t-1", "-");
		}
		if (facilityDatas.size() >= 4) {
			if (facilityDatas.get(2).getF_IPIP_score_max() > 0)
				facilityDataMap.put("t-2", df.format((double)(facilityDatas.get(2).getF_IPIP_score() * 100) / facilityDatas.get(2).getF_IPIP_score_max()));
			else
				facilityDataMap.put("t-2", "-");

		}

		facilityDataMapList.add(facilityDataMap);

		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("facilityName", indMap.get("f_encr_score"));
		if (facilityDatas.get(facilityDatas.size() - 1).getF_ENCR_score_max() > 0)
			facilityDataMap.put("baseline", df.format((double)(facilityDatas.get(facilityDatas.size() - 1).getF_ENCR_score() * 100) / facilityDatas.get(facilityDatas.size() - 1).getF_ENCR_score_max()));
		else
			facilityDataMap.put("baseline", "-");
		if (facilityDatas.size() >= 2) {
			if (facilityDatas.get(0).getF_ENCR_score_max() > 0)
				facilityDataMap.put("t", df.format((double)(facilityDatas.get(0).getF_ENCR_score() * 100) / facilityDatas.get(0).getF_ENCR_score_max()));
			else
				facilityDataMap.put("t", "-");
		}
		if (facilityDatas.size() >= 3) {
			if (facilityDatas.get(1).getF_ENCR_score_max() > 0)
				facilityDataMap.put("t-1", df.format((double)(facilityDatas.get(1).getF_ENCR_score() * 100) / facilityDatas.get(1).getF_ENCR_score_max()));
			else
				facilityDataMap.put("t-1", "-");
		}
		if (facilityDatas.size() >= 4) {
			if (facilityDatas.get(2).getF_ENCR_score_max() > 0)
				facilityDataMap.put("t-2", df.format((double)(facilityDatas.get(2).getF_ENCR_score() * 100) / facilityDatas.get(2).getF_ENCR_score_max()));
			else
				facilityDataMap.put("t-2", "-");
		}

		facilityDataMapList.add(facilityDataMap);

		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("facilityName", indMap.get("f_fp_score"));
		if (facilityDatas.get(facilityDatas.size() - 1).getF_FP_score_max() > 0)
			facilityDataMap.put("baseline", df.format((double)(facilityDatas.get(facilityDatas.size() - 1).getF_FP_score() * 100) / facilityDatas.get(facilityDatas.size() - 1).getF_FP_score_max()));
		else
			facilityDataMap.put("baseline", "-");
		if (facilityDatas.size() >= 2) {
			if (facilityDatas.get(0).getF_FP_score_max() > 0)
				facilityDataMap.put("t", df.format((double)(facilityDatas.get(0).getF_FP_score() * 100) / facilityDatas.get(0).getF_FP_score_max()));
			else
				facilityDataMap.put("t", "-");
		}
		if (facilityDatas.size() >= 3) {
			if (facilityDatas.get(1).getF_FP_score_max() > 0)
				facilityDataMap.put("t-1", df.format((double)(facilityDatas.get(1).getF_FP_score() * 100) / facilityDatas.get(1).getF_FP_score_max()));
			else
				facilityDataMap.put("t-1", "-");
		}
		if (facilityDatas.size() >= 4) {
			if (facilityDatas.get(2).getF_FP_score_max() > 0)
				facilityDataMap.put("t-2", df.format((double)(facilityDatas.get(2).getF_FP_score() * 100) / facilityDatas.get(2).getF_FP_score_max()));
			else
				facilityDataMap.put("t-2", "-");
		}

		facilityDataMapList.add(facilityDataMap);

		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("facilityName", indMap.get("f_cs_score"));
		if (facilityDatas.get(facilityDatas.size() - 1).getF_CS_score_max() > 0)
			facilityDataMap.put("baseline", df.format((double)(facilityDatas.get(facilityDatas.size() - 1).getF_CS_score() * 100) / facilityDatas.get(facilityDatas.size() - 1).getF_CS_score_max()));
		else
			facilityDataMap.put("baseline", "-");
		if (facilityDatas.size() >= 2) {
			if (facilityDatas.get(0).getF_CS_score_max() > 0)
				facilityDataMap.put("t", df.format((double)(facilityDatas.get(0).getF_CS_score() * 100) / facilityDatas.get(0).getF_CS_score_max()));
			else
				facilityDataMap.put("t", "-");
		}
		if (facilityDatas.size() >= 3) {
			if (facilityDatas.get(1).getF_CS_score_max() > 0)
				facilityDataMap.put("t-1", df.format((double)(facilityDatas.get(1).getF_CS_score() * 100) / facilityDatas.get(1).getF_CS_score_max()));
			else
				facilityDataMap.put("t-1", "-");
		}
		if (facilityDatas.size() >= 4) {
			if (facilityDatas.get(2).getF_CS_score_max() > 0)
				facilityDataMap.put("t-2", df.format((double)(facilityDatas.get(2).getF_CS_score() * 100) / facilityDatas.get(2).getF_CS_score_max()));
			else
				facilityDataMap.put("t-2", "-");
		}

		facilityDataMapList.add(facilityDataMap);

		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("facilityName", indMap.get("f_fmo_score"));
		if (facilityDatas.get(facilityDatas.size() - 1).getF_FMO_score_max() > 0)
			facilityDataMap.put("baseline", df.format((double)(facilityDatas.get(facilityDatas.size() - 1).getF_FMO_score() * 100) / facilityDatas.get(facilityDatas.size() - 1).getF_FMO_score_max()));
		else
			facilityDataMap.put("baseline", "-");
		if (facilityDatas.size() >= 2) {
			if (facilityDatas.get(0).getF_FMO_score_max() > 0)
				facilityDataMap.put("t", df.format((double)(facilityDatas.get(0).getF_FMO_score() * 100) / facilityDatas.get(0).getF_FMO_score_max()));
			else
				facilityDataMap.put("t", "-");
		}
		if (facilityDatas.size() >= 3) {
			if (facilityDatas.get(1).getF_FMO_score_max() > 0)
				facilityDataMap.put("t-1", df.format((double)(facilityDatas.get(1).getF_FMO_score() * 100) / facilityDatas.get(1).getF_FMO_score_max()));
			else
				facilityDataMap.put("t-1", "-");
		}
		if (facilityDatas.size() >= 4) {
			if (facilityDatas.get(2).getF_FMO_score_max() > 0)
				facilityDataMap.put("t-2", df.format((double)(facilityDatas.get(2).getF_FMO_score() * 100) / facilityDatas.get(2).getF_FMO_score_max()));
			else
				facilityDataMap.put("t-2", "-");
		}

		facilityDataMapList.add(facilityDataMap);

		facilityDataMap = new LinkedHashMap<String, String>();
		facilityDataMap.put("facilityName", indMap.get("f_ah_score"));
		if (facilityDatas.get(facilityDatas.size() - 1).getF_AH_score_max() > 0)
			facilityDataMap.put("baseline", df.format((double)(facilityDatas.get(facilityDatas.size() - 1).getF_AH_score() * 100) / facilityDatas.get(facilityDatas.size() - 1).getF_AH_score_max()));
		else
			facilityDataMap.put("baseline", "-");
		if (facilityDatas.size() >= 2) {
			if (facilityDatas.get(0).getF_AH_score_max() > 0)
				facilityDataMap.put("t", df.format((double)(facilityDatas.get(0).getF_AH_score() * 100) / facilityDatas.get(0).getF_AH_score_max()));
			else
				facilityDataMap.put("t", "-");
		}
		if (facilityDatas.size() >= 3) {
			if (facilityDatas.get(1).getF_AH_score_max() > 0)
				facilityDataMap.put("t-1", df.format((double)(facilityDatas.get(1).getF_AH_score() * 100) / facilityDatas.get(1).getF_AH_score_max()));
			else
				facilityDataMap.put("t-1", "-");

		}
		if (facilityDatas.size() >= 4) {
			if (facilityDatas.get(2).getF_AH_score_max() > 0)
				facilityDataMap.put("t-2", df.format((double)(facilityDatas.get(2).getF_AH_score() * 100) / facilityDatas.get(2).getF_AH_score_max()));
			else
				facilityDataMap.put("t-2", "-");
		}

		facilityDataMapList.add(facilityDataMap);

		return facilityDataMapList;
	}

}
