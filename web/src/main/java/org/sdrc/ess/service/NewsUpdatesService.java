package org.sdrc.ess.service;

import java.util.List;

import org.sdrc.ess.model.web.ErrorClass;
import org.sdrc.ess.model.web.NewsUpdatesModel;

public interface NewsUpdatesService {
	
	public ErrorClass saveNewsUpdates(NewsUpdatesModel obj);

	public ErrorClass editNewsUpdates(NewsUpdatesModel obj, Integer id);
	
	public List<NewsUpdatesModel> getAllNewsUpdates();
	
	public ErrorClass updatesNewsUpdatesIsLive(Integer id);
}
