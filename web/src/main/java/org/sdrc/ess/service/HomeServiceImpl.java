/**
 * 
 */
package org.sdrc.ess.service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.sdrc.ess.util.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in)
 *
 */
@Service
public class HomeServiceImpl implements HomeService{
	
	/**
	 * @author Ratikanta pradhan  (ratikanta@sdrc.co.in)
	 */
	private static final Logger logger = LoggerFactory.getLogger(HomeServiceImpl.class);
	
	DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");
	SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	
	/**
	 * @author Ratikanta pradhan (ratikanta@sdrc.co.in)
	 */
	@Autowired
	private ResourceBundleMessageSource messages;
	
	@Override
	@Transactional
	public void saveUserIpAddress() {
		// TODO Auto-generated method stub
		Timestamp dateTime = Timestamp.valueOf(dtf.format(LocalDateTime.now()));
		String currentTime = (LocalDateTime.now()).format(formatter);
		ServletRequestAttributes attr=(ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		HttpServletRequest request=attr.getRequest();
		String ipAddress=getIpAddr(request);		
		String sessionId=request.getSession().getId();
		
	}
	
	public String getIpAddr(HttpServletRequest request) {      
		   String ip = request.getHeader("x-forwarded-for");      
		   if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip))       
		       ip = request.getHeader("Proxy-Client-IP");      
		   if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip))       
		       ip = request.getHeader("WL-Proxy-Client-IP");      
		   if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip))       
		       ip = request.getRemoteAddr();      
		   return ip;      
	}

	/**
	 * 
	 * This method is going to return the log file name which will be downloaded
	 * @param liveORtest this is int type variable, the possible values are 0 and 1.
	 * When the value is 0, the app is a testing app. When the value is 1, the app is a production app.
	 * Testing app log file name is ess-test.log, production app log file name is ess.log  
	 * @param date, format of the date should be like ddMMyyyy
	 * @param logFileNumberOfTheDay, this is an int value. When the log file size exceeds 100mb, defined in logback.xml maxFileSize attribute,
	 * We make new file for the day. We number it also. This parameter is nothing but that number
	 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 23-Sep-2017 11:52:53 am
	 * @return The log file name
	 */
	@Override
	public String getFileName(int liveORtest, String date, int logFileNumberOfTheDay) {
		
		
    	SimpleDateFormat sdf = new SimpleDateFormat("ddMMyyyy");
    	
    	try{
    		sdf.parse(date);//checking for exception    		
    		String todayString = sdf.format(new Date());
    		
    		//Today and test app
    		if(todayString.equals(date) && liveORtest == 0){
    			
    			String name =  messages.getMessage(Constants.Web.LOG_PATH, null, null) + "/" + 
    			messages.getMessage(Constants.Web.LOG_FILE_NAME, null, null) + ".log";
    			logger.info("Today test app logfile URL :" + name);
    			return name;
    		
    			
    		//today and live app	
    		}else if(todayString.equals(date) && liveORtest == 1){
    			
    			String name = messages.getMessage(Constants.Web.LOG_PATH, null, null) + "/" + 
    	    			messages.getMessage(Constants.Web.LOG_FILE_NAME, null, null) + ".log";
    			logger.info("Today live app logfile URL :" + name);
    			return name;
    			
    			
    			//Not today test app
    		}else if(!(todayString.equals(date)) && liveORtest == 0){
    			
    			String name = messages.getMessage(Constants.Web.LOG_PATH, null, null) + "/" +
    					messages.getMessage(Constants.Web.LOG_ARCHIVED_FOLDER_NAME, null, null) +"/" +
    					"debug-test."+ date.substring(0, 2) + "-" + date.substring(2, 4) + "-" + date.substring(4) + "." + 
    					logFileNumberOfTheDay+ ".log";
    			logger.info("Not today test app logfile URL :" + name);
    			return name;
    			
    			//Not today live app
    		}else if(!(todayString.equals(date)) && liveORtest == 1){
    			
    			String name = messages.getMessage(Constants.Web.LOG_PATH, null, null) + "/" +
    					messages.getMessage(Constants.Web.LOG_ARCHIVED_FOLDER_NAME, null, null) +"/" +
    					"debug."+ date.substring(0, 2) + "-" + date.substring(2, 4) + "-" + date.substring(4) + "." + 
    					logFileNumberOfTheDay+ ".log";
    			
    			logger.info("Not today live app logfile URL :" + name);
    			return name;
    		}    		
    		
    		
    	}catch(Exception e){
    		logger.info("Wrong date has been given for log file down");
    	}	
		
		
		return null;
	}

}
