package org.sdrc.ess.util;

import java.io.File;
import java.io.FileInputStream;

import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Component;

/**
 * 
 * @author Sourav Keshari Nath (souravnath@sdrc.co.in)
 *
 */

@Component
public class ImageConverter {
	public String encodingPhoto(String photoPath) {

		FileInputStream fileInputStreamReader = null;
		File filePath = new File(photoPath);
		byte[] bytes = {};
		try {
			fileInputStreamReader = new FileInputStream(filePath);
			bytes = new byte[(int) filePath.length()];
			fileInputStreamReader.read(bytes);
			fileInputStreamReader.close();
		} catch (Exception e) {

			e.printStackTrace();
		}
		return "data:image/jpg;base64," + Base64.encodeBase64String(bytes);
	}
}
