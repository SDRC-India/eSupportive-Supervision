package org.sdrc.ess.web.controller;

import java.io.IOException;
import java.util.List;

import org.sdrc.ess.core.Authorize;
import org.sdrc.ess.model.web.ErrorClass;
import org.sdrc.ess.model.web.VideoGalleryModel;
import org.sdrc.ess.service.VideoGalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 
 * @author Sourav Keshari Nath (souravnath@sdrc.co.in)
 *
 */
@Controller
public class VideoGalleryController {
    
	@Autowired
	VideoGalleryService videoGalleryService;
	
	@Authorize(feature="videoEntry",permission="view")
	@RequestMapping("videoEntry")
	public String videoEntry() {
		return "videoEntry";
	}
	
	@RequestMapping(value = "/saveVideoGallery", method = RequestMethod.POST)
	@ResponseBody
	public ErrorClass saveReport(@RequestBody String videoDetails) {
		VideoGalleryModel obj = new VideoGalleryModel();
		ObjectMapper mapper = new ObjectMapper();
		try {
			 obj = mapper.readValue(videoDetails, VideoGalleryModel.class);
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
		return videoGalleryService.saveVideoGallery(obj);
	}

	@RequestMapping("getVideoGallery")
	@ResponseBody
	public List<VideoGalleryModel> getVideoGallery() {
		return videoGalleryService.getAllVideoGallery();
	}
	@RequestMapping("updatesVideoGalleryIsLive")
	@ResponseBody
	public ErrorClass updatesVideoGalleryIsLive(@RequestParam("Id") Integer id) {
		return videoGalleryService.updatesVideoGalleryIsLive(id);
	}
	
	@RequestMapping(value = "/editVideoGallery", method = RequestMethod.POST)
	@ResponseBody
	public ErrorClass editVideoGallery(@RequestBody String newsUpdates,
			@RequestParam("id") Integer id) {

		    VideoGalleryModel obj = new VideoGalleryModel();
			ObjectMapper mapper = new ObjectMapper();
			try {
				 obj = mapper.readValue(newsUpdates, VideoGalleryModel.class);
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
		return videoGalleryService.editVideoGallery(obj,id);
	}
}
