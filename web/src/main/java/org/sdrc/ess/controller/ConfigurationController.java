package org.sdrc.ess.controller;

import org.sdrc.ess.repository.UtTimeperiodRepository;
import org.sdrc.ess.service.AggregationService;
import org.sdrc.ess.service.ConfigurationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;

@Controller
public class ConfigurationController {

	@Autowired
	private ConfigurationService configurationService;

	@Autowired
	private AggregationService aggregationServiceImpl;
	
	@Autowired
	private UtTimeperiodRepository utTimeperiodRepository;
	
	
	@Autowired
	ApplicationContext applicationContext;

//	@RequestMapping(value = "/importExcel")
//	@ResponseBody
//	public boolean importExcel() {
//		return configurationService.configureIndicatorsUnitSubgroups();
//	}
	

//	@RequestMapping(value = "/getRawDataReportDataTeam", method = RequestMethod.GET)
//	public void getUnSupervisedFacilityData(@RequestParam("facilityTypeId") Integer facilityTypeId, HttpServletResponse httpServletResponse) throws IOException {
//		File file = configurationService.generateRawDataExcel(facilityTypeId);
//		try {
//			String mimeType;
//			mimeType = "application/octet-stream";
//			httpServletResponse.setContentType(mimeType);
//			httpServletResponse.setHeader("Content-Disposition", String.format("attachment; filename=\"%s\"", file.getName()));
//			httpServletResponse.setContentLength((int) file.length());
//			InputStream inputStream = new BufferedInputStream(new FileInputStream(file));
//			FileCopyUtils.copy(inputStream, httpServletResponse.getOutputStream());
//
//		} finally {
//			httpServletResponse.getOutputStream().close();
//			if (file != null) {
//				file.delete();
//			}
//		}
//	}

//	@RequestMapping(value = "/execPrioritizeSubmissionsMonthlyJob")
//	@ResponseBody
//	public boolean execPrioritizeSubmissionsMonthlyJob() {
//		try {
//			aggregationServiceImpl.updateToLatestsSubmission();
//			aggregationServiceImpl.createCurrentMonth();
//
//		} catch (Exception e) {
//			e.printStackTrace();
//			return false;
//		}
//		return true;
//	}
//
//	@RequestMapping(value = "/execPrioritizeSubmissionsQuaterlyJob")
//	@ResponseBody
//	public boolean execPrioritizeSubmissionsQuaterlyJob() {
//		try {
//			aggregationServiceImpl.createPreviousThreeMonth();
//		} catch (Exception e) {
//			e.printStackTrace();
//			return false;
//		}
//		return true;
//	}

//	@RequestMapping(value = "/monjob")
//	@ResponseBody
//	public boolean fireMonthlyJob() {
//		try {
//			UtTimeperiod t = utTimeperiodRepository.findByTimeperiodNid(1);
//			aggregationServiceImpl.callAggregationForIndicators(t);
//		} catch (Exception e) {
//			e.printStackTrace();
//			return false;
//		}
//		return true;
//	}
}
