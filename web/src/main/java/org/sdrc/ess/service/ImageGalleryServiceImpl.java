package org.sdrc.ess.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import org.apache.commons.codec.binary.Base64;
import org.imgscalr.Scalr;
import org.imgscalr.Scalr.Method;
import org.imgscalr.Scalr.Mode;
import org.sdrc.ess.domain.ImageGallery;
import org.sdrc.ess.domain.NewsUpdates;
import org.sdrc.ess.model.web.ErrorClass;
import org.sdrc.ess.model.web.ImageGalleryModel;
import org.sdrc.ess.model.web.NewsUpdatesModel;
import org.sdrc.ess.repository.ImageGalleryRepository;
import org.sdrc.ess.util.Constants;
import org.sdrc.ess.util.ImageConverter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * 
 * @author Sourav Keshari Nath (souravnath@sdrc.co.in)
 *
 */
@Service
public class ImageGalleryServiceImpl implements ImageGalleryService {
	
	private static final Logger logger = LoggerFactory
			.getLogger(MobileServiceImpl.class);
	
	@Autowired
	private ResourceBundleMessageSource messages;
	
	@Autowired
	ImageGalleryRepository imageGalleryRepository;
	
	DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
	
	@Autowired
	private ImageConverter imageConverter;
	
	@Override
	public ErrorClass saveImageGallery(ImageGalleryModel imageGalleryModel) {
		// TODO Auto-generated method stub
		ErrorClass errorClass = new ErrorClass();
		ImageGallery imageGallery =new ImageGallery();
		
		try {
			imageGallery.setTitle(imageGalleryModel.getTitle());
			imageGallery.setImageUrl(getFilePath(imageGalleryModel.getImages(), 1));
			imageGallery.setCreatedDate(new Timestamp(System.currentTimeMillis()));
			imageGallery.setIsLive(true);
			imageGalleryRepository.save(imageGallery);
			logger.info("Image saved : " + imageGalleryModel.getTitle());
			errorClass.setValid(Constants.Web.TRUE_VALUE);
			errorClass.setErrorMessage(Constants.Web.IMAGE_GALLERY_SUCCESS);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return errorClass;
	}
	private String getFilePath(String uploadedPhoto, int fileType) throws Exception {
		
	if(!uploadedPhoto.equals("") && uploadedPhoto!=null){
			String uploadsDir = messages.getMessage(Constants.Web.IMAGE_GALLERY_UPLOAD_PATH, null, null);
			File file = new File(uploadsDir);
			if (!file.exists()) {
				file.mkdirs();
			}
		    byte[] decodedBytes = Base64.decodeBase64(uploadedPhoto.split(",")[1]);
		    String finalPath = uploadsDir + new SimpleDateFormat("ddMMyyyyHHmmssSSS").format(new java.util.Date())+".jpg";
			return  makeThumbnail(finalPath, decodedBytes);
	       }else
	    	   return null;
	}

	private String makeThumbnail(String finalPath ,byte[] decodedBytes) throws IOException {
		BufferedImage img = ImageIO.read(new ByteArrayInputStream(decodedBytes));// load image
		BufferedImage thumbImg = Scalr.resize(img, Method.QUALITY,	Mode.AUTOMATIC, 800, 800, Scalr.OP_ANTIALIAS);
		ByteArrayOutputStream os = new ByteArrayOutputStream();
		ImageIO.write(thumbImg, "jpg", os);

		File writeFilePath = new File(finalPath);
		ImageIO.write(thumbImg, "jpg", writeFilePath);
		return finalPath;
	}
	@Override
	public List<ImageGalleryModel> getAllImageGallery() {
		List<ImageGallery> imageGallery = imageGalleryRepository.findByIsLive(true);
		List<ImageGalleryModel> imageGalleryModelList=new ArrayList<ImageGalleryModel>();
		for(ImageGallery imageGalleryObj:imageGallery)
		{
			ImageGalleryModel imageGalleryModel=new ImageGalleryModel();
			imageGalleryModel.setImageId(imageGalleryObj.getImageId());
			imageGalleryModel.setTitle(imageGalleryObj.getTitle());
			imageGalleryModel.setImages(imageGalleryObj.getImageUrl()==null?null:imageConverter.encodingPhoto(imageGalleryObj.getImageUrl()));
			imageGalleryModel.setCreatedDate(imageGalleryObj.getCreatedDate()==null? null : df.format(imageGalleryObj.getCreatedDate().getTime()));
			imageGalleryModelList.add(imageGalleryModel);
		}
		return imageGalleryModelList;
	}
	@Override
	public ErrorClass editImageGallery(ImageGalleryModel obj, Integer id) {
		ErrorClass errorClass = new ErrorClass();

		ImageGallery imageGallery = imageGalleryRepository.findByImageId(id);
		ImageGallery duplicateImageGallery=new ImageGallery();
		/*
		 * Use for new row add corresponding update rows
		 */
		duplicateImageGallery.setTitle(imageGallery.getTitle());
		duplicateImageGallery.setImageUrl(imageGallery.getImageUrl());
		duplicateImageGallery.setCreatedDate(imageGallery.getCreatedDate());
		duplicateImageGallery.setIsLive(false);
	    imageGalleryRepository.save(duplicateImageGallery);
		
		/*
		 * Use for update
		 */
	    
	    try {
	    	imageGallery.setTitle(obj.getTitle());
			imageGallery.setImageUrl(getFilePath(obj.getImages(), 1));
			imageGallery.setUpdatedDate(new Timestamp(System
						.currentTimeMillis()));
	        imageGallery.setIsLive(true);
		    imageGalleryRepository.save(imageGallery);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		logger.info("Image edited : " + obj.getTitle());
		errorClass.setValid(Constants.Web.TRUE_VALUE);
		errorClass.setErrorMessage(Constants.Web.IMAGE_GALLERY__SUCCESS_EDIT);
		// TODO Auto-generated method stub
		return errorClass;
	}
	@Override
	public ErrorClass updatesImageGalleryIsLive(Integer id) {

     ErrorClass errorClass = new ErrorClass();
		
     ImageGallery imageGallery = imageGalleryRepository.findByImageId(id);
		if(imageGallery!=null){
			imageGallery.setIsLive(false);
			imageGalleryRepository.save(imageGallery);
			logger.info("Image deleted : " + id);
		    errorClass.setValid(Constants.Web.TRUE_VALUE);
		    errorClass.setErrorMessage(Constants.Web.IMAGE_GALLERY_DELETE);
		}
		return errorClass;
	}
	
}
