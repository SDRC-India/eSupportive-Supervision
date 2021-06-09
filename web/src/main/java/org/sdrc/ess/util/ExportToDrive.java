package org.sdrc.ess.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;

import org.apache.commons.codec.binary.Base64;

public class ExportToDrive {
	
//	@Autowired
//	private ResourceBundleMessageSource messageSource;
	/*
	 * @Author Naseem Akhtar
	 * Taking base64 and returning image path and storing image path in Database and saving file 
	 * @see org.sdrc.cpis.services.ExportPDFService#getChildPhoto(java.lang.String)
	 */
	
	 public String getPhotoPath(String image, String areaId, String type) throws Exception {
    	String path = null;
    	switch(type){
    		case "facility":
//    			path = messageSource.getMessage("store.facility", null, null,null);
    			path = "D:/ESS/Facility/";
    			break;
    		case "community":
//    			path = messageSource.getMessage("store.community", null, null,null);
    			path = "D:/ESS/Community/";
    			break;
    	}
    	
		File file = new File(path);
		if(!file.exists()){
			file.mkdirs();
		}
		
	    byte[] decodedBytes = Base64.decodeBase64(image.split(",")[1]);
	    String finalPath = path+""+areaId+"_"+new SimpleDateFormat("ddMMyyyyHHmmssS").format(new java.util.Date())+".png";
	    OutputStream out = new FileOutputStream(finalPath);
	    out.write(decodedBytes );
	    out.close();
		return finalPath;
	}

}
