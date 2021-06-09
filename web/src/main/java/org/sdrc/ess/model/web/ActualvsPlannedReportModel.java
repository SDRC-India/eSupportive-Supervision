package org.sdrc.ess.model.web;

import java.util.List;
import java.util.Map;

import org.sdrc.ess.domain.Timeperiod;
/**
 * @author Debiprasad Parida(debiprasad@sdrc.co.in) Created on 09-10-2017 
 */
public class ActualvsPlannedReportModel {

	private String blockName;
	private Integer blockId;
	private String facilityName;
	private Integer facilityId;
	private String facilityType;
	private Integer facilityTypeId;
	private Map<String,Integer> plannedVisit;
	private Map<String,Integer> unplannedVisit;
	private Map<String,Integer> total;
	private Map<String,Integer> visitPlanned;
	
	
	
	public String getBlockName() {
		return blockName;
	}
	public void setBlockName(String blockName) {
		this.blockName = blockName;
	}
	public Integer getBlockId() {
		return blockId;
	}
	public void setBlockId(Integer blockId) {
		this.blockId = blockId;
	}
	public String getFacilityName() {
		return facilityName;
	}
	public void setFacilityName(String facilityName) {
		this.facilityName = facilityName;
	}
	public Integer getFacilityId() {
		return facilityId;
	}
	public void setFacilityId(Integer facilityId) {
		this.facilityId = facilityId;
	}
	public String getFacilityType() {
		return facilityType;
	}
	public void setFacilityType(String facilityType) {
		this.facilityType = facilityType;
	}
	public Integer getFacilityTypeId() {
		return facilityTypeId;
	}
	public void setFacilityTypeId(Integer facilityTypeId) {
		this.facilityTypeId = facilityTypeId;
	}
	public Map<String, Integer> getPlannedVisit() {
		return plannedVisit;
	}
	public void setPlannedVisit(Map<String, Integer> plannedVisit) {
		this.plannedVisit = plannedVisit;
	}
	public Map<String, Integer> getUnplannedVisit() {
		return unplannedVisit;
	}
	public void setUnplannedVisit(Map<String, Integer> unplannedVisit) {
		this.unplannedVisit = unplannedVisit;
	}
	public Map<String, Integer> getTotal() {
		return total;
	}
	public void setTotal(Map<String, Integer> total) {
		this.total = total;
	}
	public Map<String, Integer> getVisitPlanned() {
		return visitPlanned;
	}
	public void setVisitPlanned(Map<String, Integer> visitPlanned) {
		this.visitPlanned = visitPlanned;
	}
	
	
	
	
	
	
}
