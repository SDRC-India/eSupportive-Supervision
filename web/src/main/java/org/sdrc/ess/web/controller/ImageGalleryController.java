package org.sdrc.ess.web.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.sdrc.ess.core.Authorize;
import org.sdrc.ess.model.web.ErrorClass;
import org.sdrc.ess.model.web.ImageGalleryModel;
import org.sdrc.ess.model.web.NewsUpdatesModel;
import org.sdrc.ess.repository.ImageGalleryRepository;
import org.sdrc.ess.service.ImageGalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 
 * @author Sourav Keshari Nath (souravnath@sdrc.co.in)
 *
 */
@Controller
public class ImageGalleryController {
    
	@Autowired
	ImageGalleryService imageGalleryService;
	
	@Authorize(feature="imageEntry",permission="view")
	@RequestMapping("imageEntry")
	public String imageEntry() {
		return "imageEntry";
	}
	
	@RequestMapping(value = "/saveImageGallery", method = RequestMethod.POST)
	@ResponseBody
	public ErrorClass saveReport(@RequestBody String imageDetails) {
		ImageGalleryModel obj = new ImageGalleryModel();
		ObjectMapper mapper = new ObjectMapper();
		try {
			 obj = mapper.readValue(imageDetails, ImageGalleryModel.class);
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return imageGalleryService.saveImageGallery(obj);
	}

	@RequestMapping("getGalleryImages")
	@ResponseBody
	public List<ImageGalleryModel> getGalleryImages() {
		return imageGalleryService.getAllImageGallery();
	}
	@RequestMapping("updatesImageGalleryIsLive")
	@ResponseBody
	public ErrorClass updatesImageGalleryIsLive(@RequestParam("Id") Integer id) {
		return imageGalleryService.updatesImageGalleryIsLive(id);
	}
	
	@RequestMapping(value = "/editImageGallery", method = RequestMethod.POST)
	@ResponseBody
	public ErrorClass editImageGallery(@RequestBody String newsUpdates,
			@RequestParam("id") Integer id) {

		    ImageGalleryModel obj = new ImageGalleryModel();
			ObjectMapper mapper = new ObjectMapper();
			try {
				 obj = mapper.readValue(newsUpdates, ImageGalleryModel.class);
			} catch (JsonParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (JsonMappingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		return imageGalleryService.editImageGallery(obj,id);
	}
}
