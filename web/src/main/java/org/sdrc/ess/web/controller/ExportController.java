/**
 * 
 */
package org.sdrc.ess.web.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.sdrc.ess.model.web.EssUserModel;
import org.sdrc.ess.service.AggregationService;
import org.sdrc.ess.service.ExportService;
import org.sdrc.ess.util.Constants;
import org.sdrc.ess.util.StateManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author Harsh Pratyush (harsh@sdrc.co.in)
 *
 *         This class will be used for exporting the data in a PDF or Excel
 *         format
 */

@Controller
public class ExportController {
	
	@Autowired
	private ExportService exportService;
	
	@Autowired
	private AggregationService aggregationService;
	
	@Autowired
	private StateManager stateManager;

	@RequestMapping(value = "/exportMapData", method = RequestMethod.POST)
	@ResponseBody
	public String exportMapChartData(@RequestBody List<String> svgs,
			@RequestParam(required = false) String indicatorId,
			@RequestParam(required = false) String sourceNid,
			@RequestParam(required = false) String areaId,
			@RequestParam(required = false) String timeperiodId,
			@RequestParam(required = false) Integer parentAreaId,
			@RequestParam(required = false) Integer facilityTypeId)
			throws Exception {

		EssUserModel essUserModel = (EssUserModel) stateManager
				.getValue(Constants.Web.USER_PRINCIPAL);
		if (essUserModel == null)
			return "";
		else
		return exportService.exportMapChartData(svgs, indicatorId, sourceNid, 
				areaId, timeperiodId, parentAreaId, facilityTypeId);
	}
	
	
	@RequestMapping(value = "/exportLineData", method = RequestMethod.POST)
	@ResponseBody
	public String exportLineChartData(@RequestBody List<String> svgs,
			@RequestParam(value="indicatorId",required = false) String indicatorId,
			@RequestParam(value="sourceNid",required = false) String sourceNid,
			@RequestParam(value="areaId",required = false) String areaId,
			@RequestParam(value="timeperiodId",required = false) String timeperiodId,
			@RequestParam(value="parentAreaId",required = false) Integer parentAreaId,
			@RequestParam(value="facilityTypeId",required = false) Integer facilityTypeId,
			@RequestParam("periodicity") Integer preodicity,
			@RequestParam("area_NId") Integer area_NId)
			throws Exception {

		EssUserModel essUserModel = (EssUserModel) stateManager
				.getValue(Constants.Web.USER_PRINCIPAL);
		if (essUserModel == null)
			return "";
		else
		return exportService.exportLineChartData(svgs, indicatorId, sourceNid, areaId, timeperiodId, 
				parentAreaId, area_NId, preodicity,facilityTypeId);
	}
	
	
	/**
	 * This method will be used to download the file
	 * 
	 * @param name
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping(value = "/downloadFile", method = RequestMethod.POST)
	public void downLoad(@RequestParam("fileName") String name,
			HttpServletResponse response) throws IOException {
		InputStream inputStream;
		String fileName = "";
		try {
			fileName = name.replaceAll("%3A", ":").replaceAll("%2F", "/")
					.replaceAll("%5C", "/").replaceAll("%2C", ",")
					.replaceAll("\\+", " ").replaceAll("%22", "")
					.replaceAll("%3F", "?").replaceAll("%3D", "=").replaceAll("%20", " ");
			inputStream = new FileInputStream(fileName);
			String headerKey = "Content-Disposition";
			String headerValue = String.format("attachment; filename=\"%s\"",
					new java.io.File(fileName).getName());
			response.setHeader(headerKey, headerValue);
			response.setContentType("application/octet-stream"); // for all file
																	// type
			ServletOutputStream outputStream = response.getOutputStream();
			FileCopyUtils.copy(inputStream, outputStream);
			outputStream.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			new File(fileName).delete();
		}
	}
	
	@RequestMapping("aggregationService")
	public boolean aggregationService() throws Exception
	{
		return aggregationService.updateToLatestsSubmission();
	}
}
