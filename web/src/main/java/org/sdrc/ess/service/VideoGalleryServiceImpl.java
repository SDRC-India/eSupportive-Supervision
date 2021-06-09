package org.sdrc.ess.service;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.sdrc.ess.domain.VideoGallery;
import org.sdrc.ess.model.web.ErrorClass;
import org.sdrc.ess.model.web.VideoGalleryModel;
import org.sdrc.ess.repository.VideoGalleryRepository;
import org.sdrc.ess.util.Constants;
import org.sdrc.ess.util.ImageConverter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Service;

/**
 * 
 * @author Sourav Keshari Nath (souravnath@sdrc.co.in)
 *
 */
@Service
public class VideoGalleryServiceImpl implements VideoGalleryService {
	
	private static final Logger logger = LoggerFactory
			.getLogger(MobileServiceImpl.class);
	
	@Autowired
	private ResourceBundleMessageSource messages;
	
	@Autowired
	VideoGalleryRepository videoGalleryRepository;
	
	DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
	
	@Autowired
	private ImageConverter imageConverter;
	
	@Override
	public ErrorClass saveVideoGallery(VideoGalleryModel videoGalleryModel) {
		// TODO Auto-generated method stub
		ErrorClass errorClass = new ErrorClass();
		VideoGallery videoGallery =new VideoGallery();
		
		try {
			videoGallery.setTitle(videoGalleryModel.getTitle());
			videoGallery.setVideoUrl(videoGalleryModel.getVideoUrl());
			videoGallery.setCreatedDate(new Timestamp(System.currentTimeMillis()));
			videoGallery.setIsLive(true);
			videoGalleryRepository.save(videoGallery);
			logger.info("Image saved : " + videoGalleryModel.getTitle());
			errorClass.setValid(Constants.Web.TRUE_VALUE);
			errorClass.setErrorMessage(Constants.Web.VIDEO_GALLERY_SUCCESS);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return errorClass;
	}
	@Override
	public List<VideoGalleryModel> getAllVideoGallery() {
		List<VideoGallery> videoGallery = videoGalleryRepository.findByIsLive(true);
		List<VideoGalleryModel> imageGalleryModelList=new ArrayList<VideoGalleryModel>();
		for(VideoGallery videoGalleryObj:videoGallery)
		{
			VideoGalleryModel videoGalleryModel=new VideoGalleryModel();
			videoGalleryModel.setVideoId(videoGalleryObj.getVideoId());
			videoGalleryModel.setTitle(videoGalleryObj.getTitle());
			videoGalleryModel.setVideoUrl(videoGalleryObj.getVideoUrl());
			videoGalleryModel.setCreatedDate(videoGalleryObj.getCreatedDate()==null? null : df.format(videoGalleryObj.getCreatedDate().getTime()));
			imageGalleryModelList.add(videoGalleryModel);
		}
		return imageGalleryModelList;
	}
	@Override
	public ErrorClass editVideoGallery(VideoGalleryModel obj, Integer id) {
		ErrorClass errorClass = new ErrorClass();

		VideoGallery videoGallery = videoGalleryRepository.findByVideoId(id);
		VideoGallery duplicateImageGallery=new VideoGallery();
		/*
		 * Use for new row add corresponding update rows
		 */
		duplicateImageGallery.setTitle(videoGallery.getTitle());
		duplicateImageGallery.setVideoUrl(videoGallery.getVideoUrl());
		duplicateImageGallery.setCreatedDate(videoGallery.getCreatedDate());
		duplicateImageGallery.setIsLive(false);
	    videoGalleryRepository.save(duplicateImageGallery);
		
		/*
		 * Use for update
		 */
	    
	    try {
	    	videoGallery.setTitle(obj.getTitle());
	    	videoGallery.setVideoUrl(obj.getVideoUrl());
	    	videoGallery.setUpdatedDate(new Timestamp(System
						.currentTimeMillis()));
	    	videoGallery.setIsLive(true);
	    	videoGalleryRepository.save(videoGallery);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		logger.info("Image edited : " + obj.getTitle());
		errorClass.setValid(Constants.Web.TRUE_VALUE);
		errorClass.setErrorMessage(Constants.Web.VIDEO_GALLERY__SUCCESS_EDIT);
		// TODO Auto-generated method stub
		return errorClass;
	}
	@Override
	public ErrorClass updatesVideoGalleryIsLive(Integer id) {

     ErrorClass errorClass = new ErrorClass();
		
     VideoGallery videoGallery = videoGalleryRepository.findByVideoId(id);
		if(videoGallery!=null){
			videoGallery.setIsLive(false);
			videoGalleryRepository.save(videoGallery);
			logger.info("Image deleted : " + id);
		    errorClass.setValid(Constants.Web.TRUE_VALUE);
		    errorClass.setErrorMessage(Constants.Web.VIDEO_GALLERY_DELETE);
		}
		return errorClass;
	}
	
}
