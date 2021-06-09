package org.sdrc.ess.model.web;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;

public class FacilityViewModel {
	
	private List<Map<String,String>> tableData;
	
	private LinkedHashSet<String> tableHeader;
	

	public List<Map<String, String>> getTableData() {
		return tableData;
	}

	public void setTableData(List<Map<String, String>> tableData) {
		this.tableData = tableData;
	}

	public LinkedHashSet getTableHeader() {
		return tableHeader;
	}

	public void setTableHeader(LinkedHashSet tableHeader) {
		this.tableHeader = tableHeader;
	}
	
	

}
