package org.sdrc.ess.service;

import java.util.List;

import org.sdrc.ess.model.web.ErrorClass;
import org.sdrc.ess.model.web.VideoGalleryModel;

/**
 * 
 * @author Sourav Keshari Nath (souravnath@sdrc.co.in)
 *
 */

public interface VideoGalleryService {

	public ErrorClass saveVideoGallery(VideoGalleryModel obj);

	public List<VideoGalleryModel> getAllVideoGallery();
	
	public ErrorClass editVideoGallery(VideoGalleryModel obj, Integer id);
	
	public ErrorClass updatesVideoGalleryIsLive(Integer id);
}
