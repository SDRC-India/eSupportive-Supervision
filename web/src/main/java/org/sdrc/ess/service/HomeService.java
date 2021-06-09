/**
 * 
 */
package org.sdrc.ess.service;

/**
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 23-Sep-2017 11:52:24 am
 */

public interface HomeService {
	
	void saveUserIpAddress();

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
	String getFileName(int liveORtest, String date, int logFileNumberOfTheDay);

}
