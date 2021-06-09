package org.sdrc.ess.model.web;


import java.util.ArrayList;
import java.util.List;

import org.sdrc.ess.core.ValueObjectForDashboard;

public class DataCollectionModel {

	public List<DataModel> dataCollection;
	// private static final long serialVersionUID = 1L;
	private List<ValueObjectForDashboard> legends;
	private List<String> topPerformers;
	private List<String> bottomPerformers;

	public List<DataModel> getDataCollection() {
		return dataCollection;
	}

	public void setDataCollection(List<DataModel> dataCollection) {
		this.dataCollection = dataCollection;
	}

	public List<ValueObjectForDashboard> getLegends() {
		return legends;
	}

	public void setLegends(List<ValueObjectForDashboard> legends) {
		this.legends = legends;
	}

	public List<String> getTopPerformers() {
		return topPerformers;
	}

	public void setTopPerformers(List<String> topPerformers) {
		this.topPerformers = topPerformers;
	}

	public List<String> getBottomPerformers() {
		return bottomPerformers;
	}

	public void setBottomPerformers(List<String> bottomPerformers) {
		this.bottomPerformers = bottomPerformers;
	}

	public DataCollectionModel() {
		dataCollection = new ArrayList<DataModel>();
	}

	@Override
	public String toString() {
		return "UtDataCollection [dataCollection=" + dataCollection + ", legends=" + legends + ", topPerformers=" + topPerformers + ", bottomPerformers=" + bottomPerformers + "]";
	}

}
