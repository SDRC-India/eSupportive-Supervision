package org.sdrc.ess.web.controller;

import java.io.IOException;
import java.util.List;

import org.sdrc.ess.core.Authorize;
import org.sdrc.ess.model.web.ErrorClass;
import org.sdrc.ess.model.web.NewsUpdatesModel;
import org.sdrc.ess.service.NewsUpdatesService;
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

@Controller
public class NewsUpdatesController {

	@Autowired
	NewsUpdatesService newsUpdatesService;
	
	@Authorize(feature="newsUpdates",permission="view")
	@RequestMapping("newsUpdates")
	public String newsUpdates() {
		return "newsUpdates";
	}

	@RequestMapping(value = "/saveNewsUpdates", method = RequestMethod.POST)
	@ResponseBody
	public ErrorClass saveNewsUpdates(@RequestBody String newsUpdates) {

			NewsUpdatesModel obj = new NewsUpdatesModel();
			ObjectMapper mapper = new ObjectMapper();
			try {
				 obj = mapper.readValue(newsUpdates, NewsUpdatesModel.class);
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
		return newsUpdatesService.saveNewsUpdates(obj);
	}
	
	@RequestMapping("getAllNewsUpdates")
	@ResponseBody
	public List<NewsUpdatesModel> getAllNewsUpdates() {
		return newsUpdatesService.getAllNewsUpdates();
	}
	
	@RequestMapping("updatesNewsUpdatesIsLive")
	@ResponseBody
	public ErrorClass updatesNewsUpdatesIsLive(@RequestParam("Id") Integer id) {
		return newsUpdatesService.updatesNewsUpdatesIsLive(id);
	}
	
	@RequestMapping(value = "/editNewsUpdates", method = RequestMethod.POST)
	@ResponseBody
	public ErrorClass editNewsUpdates(@RequestBody String newsUpdates,
			@RequestParam("id") Integer id) {

			NewsUpdatesModel obj = new NewsUpdatesModel();
			ObjectMapper mapper = new ObjectMapper();
			try {
				 obj = mapper.readValue(newsUpdates, NewsUpdatesModel.class);
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
		return newsUpdatesService.editNewsUpdates(obj,id);
	}
}
