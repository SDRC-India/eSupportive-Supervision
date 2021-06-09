/**
 * 
 */
package org.sdrc.ess.model.web;

import java.util.List;

/**
 * @author Harsh Pratyush (harsh@sdrc.co.in)
 *
 *         This class will contain the data for landing page of dashboard
 */
public class DashboardLandingPageData {

	// top line indicators of dashboard
	List<TopLineIndicatorDataModel> keyIndcators;
	
	// bar chart datas
	List<List<BarChartModel>> nch;
	List<List<BarChartModel>> cdNcd;
	List<List<BarChartModel>> hss;
	
	// line chart datas
	List<MultiLineChartData> femaleWithPPIUCDInsertedAtFacilities;
	List<MultiLineChartData> facilitiesWherePPIUCDForcepsAreAvailable;
	List<MultiLineChartData> maternalDeath;
	List<MultiLineChartData> facilitiesUsingPartograph;
	List<MultiLineChartData> childrenUnder5AdmittedWithDiarrhoea;
	List<MultiLineChartData> subcentersReportingMaternalChildDeathsInLast1Year;
	List<MultiLineChartData> VHNDSessionsAttendedBy75BeneficiariesAsPerDueList; 
	
	// timeperiod for which data is fetched
	String timePeriodName;
	
/*	//Name of area for which data is fetched 
	String primaryAreaName;
	
	// 
	String secondaryAreaName;*/

	public List<TopLineIndicatorDataModel> getKeyIndcators() {
		return keyIndcators;
	}

	public void setKeyIndcators(List<TopLineIndicatorDataModel> keyIndcators) {
		this.keyIndcators = keyIndcators;
	}

	public List<List<BarChartModel>> getNch() {
		return nch;
	}

	public void setNch(List<List<BarChartModel>> nch) {
		this.nch = nch;
	}

	public List<List<BarChartModel>> getCdNcd() {
		return cdNcd;
	}

	public void setCdNcd(List<List<BarChartModel>> cdNcd) {
		this.cdNcd = cdNcd;
	}

	public List<List<BarChartModel>> getHss() {
		return hss;
	}

	public void setHss(List<List<BarChartModel>> hss) {
		this.hss = hss;
	}

	public List<MultiLineChartData> getFemaleWithPPIUCDInsertedAtFacilities() {
		return femaleWithPPIUCDInsertedAtFacilities;
	}

	public void setFemaleWithPPIUCDInsertedAtFacilities(
			List<MultiLineChartData> femaleWithPPIUCDInsertedAtFacilities) {
		this.femaleWithPPIUCDInsertedAtFacilities = femaleWithPPIUCDInsertedAtFacilities;
	}

	public List<MultiLineChartData> getFacilitiesWherePPIUCDForcepsAreAvailable() {
		return facilitiesWherePPIUCDForcepsAreAvailable;
	}

	public void setFacilitiesWherePPIUCDForcepsAreAvailable(
			List<MultiLineChartData> facilitiesWherePPIUCDForcepsAreAvailable) {
		this.facilitiesWherePPIUCDForcepsAreAvailable = facilitiesWherePPIUCDForcepsAreAvailable;
	}

	public List<MultiLineChartData> getMaternalDeath() {
		return maternalDeath;
	}

	public void setMaternalDeath(List<MultiLineChartData> maternalDeath) {
		this.maternalDeath = maternalDeath;
	}

	public List<MultiLineChartData> getFacilitiesUsingPartograph() {
		return facilitiesUsingPartograph;
	}

	public void setFacilitiesUsingPartograph(
			List<MultiLineChartData> facilitiesUsingPartograph) {
		this.facilitiesUsingPartograph = facilitiesUsingPartograph;
	}

	public List<MultiLineChartData> getChildrenUnder5AdmittedWithDiarrhoea() {
		return childrenUnder5AdmittedWithDiarrhoea;
	}

	public void setChildrenUnder5AdmittedWithDiarrhoea(
			List<MultiLineChartData> childrenUnder5AdmittedWithDiarrhoea) {
		this.childrenUnder5AdmittedWithDiarrhoea = childrenUnder5AdmittedWithDiarrhoea;
	}

	public List<MultiLineChartData> getSubcentersReportingMaternalChildDeathsInLast1Year() {
		return subcentersReportingMaternalChildDeathsInLast1Year;
	}

	public void setSubcentersReportingMaternalChildDeathsInLast1Year(
			List<MultiLineChartData> subcentersReportingMaternalChildDeathsInLast1Year) {
		this.subcentersReportingMaternalChildDeathsInLast1Year = subcentersReportingMaternalChildDeathsInLast1Year;
	}

	public List<MultiLineChartData> getVHNDSessionsAttendedBy75BeneficiariesAsPerDueList() {
		return VHNDSessionsAttendedBy75BeneficiariesAsPerDueList;
	}

	public void setVHNDSessionsAttendedBy75BeneficiariesAsPerDueList(
			List<MultiLineChartData> vHNDSessionsAttendedBy75BeneficiariesAsPerDueList) {
		VHNDSessionsAttendedBy75BeneficiariesAsPerDueList = vHNDSessionsAttendedBy75BeneficiariesAsPerDueList;
	}

	public String getTimePeriodName() {
		return timePeriodName;
	}

	public void setTimePeriodName(String timePeriodName) {
		this.timePeriodName = timePeriodName;
	}
	
}
