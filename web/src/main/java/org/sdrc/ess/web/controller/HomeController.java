package org.sdrc.ess.web.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import javax.servlet.http.HttpServletResponse;

import org.sdrc.ess.service.HomeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 23-Sep-2017 10:48:15 am
 *
 */

@Controller
public class HomeController {
	
	/**
	 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in)
	 */
	private static final Logger logger = LoggerFactory
			.getLogger(HomeController.class);
	
	@Autowired
	private HomeService homeService;
	
	@RequestMapping(value ={ "/", "/home"}, method = RequestMethod.GET)
	public String home() {
		/*
		 * @Subrata
		 * Save User ip address in Database.
		 * Here  we are calculating one user in one day as 1 count and we are storing user ip address, session id.
		 * If a user ip is not our database then save the user ip with session id and count 1.
		 * If user ip is already in database and in different date increasing "count" of that user ip address 
		 */
		homeService.saveUserIpAddress();
		return "home";
	}
	
	
	
	
	
	
	
	/**
	 * 
	 * This following method will help developers to download the log file of a particular date or a date range.
	 * @param liveORtest this is int type variable, the possible values are 0 and 1.
	 * When the value is 0, the app is a testing app. When the value is 1, the app is a production app.
	 * Testing app log file name is ess-test.log, production app log file name is ess.log  
	 * @param date format of the date should be like ddMMyyyy
	 * @param logFileNumberOfTheDay, this is an int value. When the log file size exceeds 100mb, defined in logback.xml maxFileSize attribute,
	 * We make new file for the day. We number it also. This parameter is nothing but that number
	 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 23-Sep-2017 10:48:40 am
	 */
	@RequestMapping(value = "/logfile/{liveORtest}/{date}/{logFileNumberOfTheDay}", method = RequestMethod.GET)	
	public void getFile(@PathVariable("liveORtest") int liveORtest, @PathVariable("date") String date,
			@PathVariable("logFileNumberOfTheDay") int logFileNumberOfTheDay,
			HttpServletResponse response) {
	    try {

	    	String fileName = homeService.getFileName(liveORtest, date, logFileNumberOfTheDay);
	    	logger.info("Log file name : " + fileName);
	    	if(fileName != null){
	    		InputStream is = new FileInputStream(new File (fileName));
	  	      // copy it to response's OutputStream
	  	      org.apache.commons.io.IOUtils.copy(is, response.getOutputStream());
	  	      response.flushBuffer();
	    	}else{
	    		logger.info("Log file NOT FOUND for date " + date + ", app " + liveORtest + ", number " + logFileNumberOfTheDay);
	    	}
	    }catch(FileNotFoundException e){
	    	logger.info("Log file NOT FOUND for date " + date + ", app " + liveORtest + ", number " + logFileNumberOfTheDay);
	    } catch (IOException ex) {
	      logger.info("Error writing file to output stream. date was '{}'", date, ex);
	      throw new RuntimeException("IOError writing file to output stream");
	    }

	}
	
	
}
