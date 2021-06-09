/**
 * 
 */
package org.sdrc.ess.model.web;

import java.util.List;

import org.sdrc.ess.model.mobile.AreaModel;
import org.sdrc.ess.model.mobile.TypeDetailModel;

/**
 * @author Harsh Pratyush (harsh@sdrc.co.in)
 *
 */
public class IndicatorWiseGapReportDropDownModel {

	private List<UtIndicatorClassificationModel> utIndicatorClassificationModel;
	
	private List<TypeDetailModel> facilityTypeDetailModels;
	
	private List<AreaModel> areaList;

	public List<UtIndicatorClassificationModel> getUtIndicatorClassificationModel() {
		return utIndicatorClassificationModel;
	}

	public void setUtIndicatorClassificationModel(
			List<UtIndicatorClassificationModel> utIndicatorClassificationModel) {
		this.utIndicatorClassificationModel = utIndicatorClassificationModel;
	}

	public List<TypeDetailModel> getFacilityTypeDetailModels() {
		return facilityTypeDetailModels;
	}

	public void setFacilityTypeDetailModels(
			List<TypeDetailModel> facilityTypeDetailModels) {
		this.facilityTypeDetailModels = facilityTypeDetailModels;
	}

	public List<AreaModel> getAreaList() {
		return areaList;
	}

	public void setAreaList(List<AreaModel> areaList) {
		this.areaList = areaList;
	}
	
	
	
}
