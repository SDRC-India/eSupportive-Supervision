package org.sdrc.ess.service;

import java.util.List;

import org.sdrc.ess.model.web.ErrorClass;
import org.sdrc.ess.model.web.ImageGalleryModel;
import org.sdrc.ess.model.web.NewsUpdatesModel;
import org.springframework.web.multipart.MultipartFile;

/**
 * 
 * @author Sourav Keshari Nath (souravnath@sdrc.co.in)
 *
 */

public interface ImageGalleryService {

	public ErrorClass saveImageGallery(ImageGalleryModel obj);

	public List<ImageGalleryModel> getAllImageGallery();
	
	public ErrorClass editImageGallery(ImageGalleryModel obj, Integer id);
	
	public ErrorClass updatesImageGalleryIsLive(Integer id);
}
