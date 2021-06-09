/**
 * 
 */
package org.sdrc.ess.model.web;

import java.util.List;

/**
 * @author Harsh Pratyush (harsh@sdrc.co.in)
 *
 */
public class UtIndicatorClassificationModel {

	private int sectorId;
	
	private String sectorName;
	
	private int parentId;
	

	public int getSectorId() {
		return sectorId;
	}

	public void setSectorId(int sectorId) {
		this.sectorId = sectorId;
	}

	public String getSectorName() {
		return sectorName;
	}

	public void setSectorName(String sectorName) {
		this.sectorName = sectorName;
	}

	public int getParentId() {
		return parentId;
	}

	public void setParentId(int parentId) {
		this.parentId = parentId;
	}

	
	
	
}
