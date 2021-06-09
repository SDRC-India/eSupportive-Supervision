package org.sdrc.ess.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.transaction.Transactional;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.sdrc.ess.core.UtUnitType;
import org.sdrc.ess.domain.Area;
import org.sdrc.ess.domain.Organization;
import org.sdrc.ess.domain.TypeDetail;
import org.sdrc.ess.domain.UtIcIus;
import org.sdrc.ess.domain.UtIndicatorClassificationsEn;
import org.sdrc.ess.domain.UtIndicatorEn;
import org.sdrc.ess.domain.UtIndicatorUnitSubgroup;
import org.sdrc.ess.domain.UtSubgroupValsEn;
import org.sdrc.ess.domain.UtUnitEn;
import org.sdrc.ess.repository.AreaRepository;
import org.sdrc.ess.repository.OrganizationRepository;
import org.sdrc.ess.repository.TypeDetailRepository;
import org.sdrc.ess.repository.UtIcIusRepository;
import org.sdrc.ess.repository.UtIndicatorClassificationsEnRepository;
import org.sdrc.ess.repository.UtIndicatorEnRepository;
import org.sdrc.ess.repository.UtIndicatorUnitSubgroupRepository;
import org.sdrc.ess.repository.UtSubgroupValsEnRepository;
import org.sdrc.ess.repository.UtUnitEnRepository;
import org.sdrc.ess.repository.springdatajpa.UtIndicatorEnRepository2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConfigurationServiceImpl implements ConfigurationService {

	@Autowired
	private UtIndicatorEnRepository utIndicatorEnRepository;

	@Autowired
	private UtUnitEnRepository utUnitEnRepository;

	@Autowired
	private UtSubgroupValsEnRepository utSubgroupValsEnRepository;

	@Autowired
	private UtIndicatorUnitSubgroupRepository utIndicatorUnitSubgroupRepository;

	@Autowired
	private UtIndicatorClassificationsEnRepository utIndicatorClassificationsEnRepository;

	@Autowired
	private UtIcIusRepository utIcIusRepository;

	@Autowired
	UtIndicatorEnRepository2 utIndicatorEnRepository2;

	@Autowired
	private ServletContext context;

	@Autowired
	TypeDetailRepository typeDetailRepository;

	@Autowired
	OrganizationRepository organizationRepository;

	@Autowired
	AreaRepository areaRepository;

	@SuppressWarnings("resource")
	@Override
	@Transactional
	public boolean configureIndicatorsUnitSubgroups() {
		FileInputStream fis = null;
		XSSFWorkbook workbook = null;
		try {
			fis = new FileInputStream(new File("E:\\ess\\checklist indicators final\\Consolidated_Indicator Template_r7_26.10.2017.xlsx"));
			workbook = new XSSFWorkbook(fis);

			XSSFSheet sheet = workbook.getSheetAt(0);

			int rows = sheet.getLastRowNum();

			// System.out.println("Rows::" + rows);

			int cols = 0;

			String sector = null;
			String subsector = null;
			String indicatorName = null;
			String unit = null, metadata = null, indicatorType = null, type = null, columnName = null, highIsGood = null, denominatorColumnName = null;
			String checkList = null;
			int sectorOrder = 0, indicatorOrder = 0;
			UtIndicatorClassificationsEn ic_sector, ic_subsector;
			UtSubgroupValsEn subgroup = utSubgroupValsEnRepository.findBySubgroup_Val_NId(1);
			UtUnitEn numberUnit = null;
			UtUnitEn percentUnit = null;
			numberUnit = utUnitEnRepository.findByUtUnitType(UtUnitType.NUMBER);
			percentUnit = utUnitEnRepository.findByUtUnitType(UtUnitType.PERCENT);
			if (numberUnit == null) {
				numberUnit = new UtUnitEn();
				numberUnit.setUnit_Name("Number");
				numberUnit.setUtUnitType(UtUnitType.NUMBER);
				numberUnit = utUnitEnRepository.save(numberUnit);
			}

			if (percentUnit == null) {
				percentUnit = new UtUnitEn();
				percentUnit.setUnit_Name("Percent");
				percentUnit.setUtUnitType(UtUnitType.PERCENT);
				percentUnit = utUnitEnRepository.save(numberUnit);
			}

			UtIndicatorClassificationsEn facilitySector = new UtIndicatorClassificationsEn();
			facilitySector.setIC_Name("Facility Checklist");
			facilitySector.setIC_Order(++sectorOrder);
			facilitySector.setIC_Parent_NId(null);
			facilitySector.setIC_Short_Name("Facility Checklist");
			facilitySector.setIC_Type("SC");

			TypeDetail typeDetailFacility = new TypeDetail(121);
			facilitySector.setTypeDetail(typeDetailFacility);

			facilitySector = utIndicatorClassificationsEnRepository.save(facilitySector);

			UtIndicatorClassificationsEn communitySector = new UtIndicatorClassificationsEn();
			communitySector.setIC_Name("Community Checklist");
			communitySector.setIC_Order(++sectorOrder);
			communitySector.setIC_Parent_NId(null);
			communitySector.setIC_Short_Name("Community Checklist");
			communitySector.setIC_Type("SC");

			TypeDetail typeDetailComm = new TypeDetail(122);
			communitySector.setTypeDetail(typeDetailComm);

			communitySector = utIndicatorClassificationsEnRepository.save(communitySector);

			Iterator<Row> iterator = sheet.iterator();

			while (iterator.hasNext()) {

				Row row = iterator.next();

				denominatorColumnName = null;
				sector = null;
				subsector = null;
				indicatorName = null;
				unit = null;
				metadata = null;
				indicatorType = null;
				type = null;
				columnName = null;
				highIsGood = null;
				checkList = null;

				Iterator<Cell> cellIterator = row.cellIterator();

				while (cellIterator.hasNext()) {

					Cell cell = cellIterator.next();

					switch (cell.getColumnIndex()) {

					case 0:
						sector = cell.getStringCellValue();
						break;

					case 1:
						subsector = cell.getStringCellValue();
						break;

					case 2:
						indicatorName = cell.getStringCellValue();
						break;

					case 4:
						unit = cell.getStringCellValue();
						break;

					case 5:
						metadata = cell.getStringCellValue();
						break;

					case 6:
						checkList = cell.getStringCellValue().trim();
						break;

					case 7:
						indicatorType = cell.getStringCellValue().toLowerCase();
						break;

					case 8:
						type = cell.getStringCellValue();
						break;

					case 9:
						columnName = cell.getStringCellValue();
						break;

					case 11:
						denominatorColumnName = cell.getStringCellValue();
						break;

					case 12:

						highIsGood = cell.getStringCellValue();

						break;

					}

				}

				if (sector.isEmpty()) {
					throw new NullPointerException("Sector Cannot be null indicator Name ::" + indicatorName);
				}
				if (checkList.equalsIgnoreCase("facility")) {
					ic_sector = utIndicatorClassificationsEnRepository.findByIC_NameAndIC_Parent(sector.trim(), facilitySector);

				} else {
					ic_sector = utIndicatorClassificationsEnRepository.findByIC_NameAndIC_Parent(sector.trim(), communitySector);

				}
				if (ic_sector == null) {
					ic_sector = new UtIndicatorClassificationsEn();
					ic_sector.setIC_Name(sector);
					ic_sector.setIC_Order(++sectorOrder);
					if (checkList.equalsIgnoreCase("Facility")) {
						ic_sector.setIC_Parent_NId(facilitySector);
					} else {
						ic_sector.setIC_Parent_NId(communitySector);
					}
					ic_sector.setIC_Short_Name(sector);
					ic_sector.setIC_Type("SC");

					ic_sector.setTypeDetail(checkList.equalsIgnoreCase("facility") ? typeDetailFacility : typeDetailComm);

					ic_sector = utIndicatorClassificationsEnRepository.save(ic_sector);
				}
				if (subsector != null && !subsector.isEmpty()) {
					ic_subsector = utIndicatorClassificationsEnRepository.findByIC_NameAndIC_Parent(subsector, ic_sector);
					if (ic_subsector == null) {
						ic_subsector = new UtIndicatorClassificationsEn();
						ic_subsector.setIC_Name(subsector);
						ic_subsector.setIC_Order(++sectorOrder);
						ic_subsector.setIC_Parent_NId(ic_sector);
						ic_subsector.setIC_Short_Name(subsector);
						ic_subsector.setIC_Type("SC");
						ic_subsector.setTypeDetail(checkList.equalsIgnoreCase("facility") ? typeDetailFacility : typeDetailComm);
						ic_subsector = utIndicatorClassificationsEnRepository.save(ic_subsector);
						indicatorOrder = 0;
					}
				} else {
					ic_subsector = ic_sector;
					indicatorOrder = 0;
				}

				System.out.println("High is good Column index:::" + highIsGood);
				UtIndicatorEn indicator = new UtIndicatorEn();
				byte value = 0;
				switch (highIsGood.toLowerCase()) {
				case "high is good":
					value = 1;
					break;

				case "neutral indicator":
					value = 1;
					break;

				case "low is good":
					value = 0;
					break;
				}
				System.out.println("Indicator Metadata :" + metadata);

				indicator.setIndicator_Info(metadata);
				indicator.setIndicator_Name(indicatorName);
				indicator.setIndicator_Order(++indicatorOrder);
				System.out.println("Column Name retrieved :::" + columnName);
				indicator.setColumnName(columnName.replace("get", "").trim().toLowerCase());

				indicator.setHighIsGood(value);
				System.out.println("denominatorColumn Name :" + denominatorColumnName);
				indicator.setDenominatorOrMaxScore(denominatorColumnName == null || denominatorColumnName.isEmpty() ? null : denominatorColumnName.replace("get", "").trim().toLowerCase());
				indicator.setShort_Name(indicatorName);
				indicator.setIndicatorType(indicatorType);

				indicator = utIndicatorEnRepository.save(indicator);

				// create ius mapping

				switch (unit.toLowerCase().trim()) {
				case "number, per cent": {
					UtIndicatorUnitSubgroup ius = new UtIndicatorUnitSubgroup();
					ius.setMax_Value(0);
					ius.setMin_Value(0);
					ius.setIndicator_NId(indicator);
					ius.setSubgroup_Val_NId(subgroup);
					ius.setUnit_NId(numberUnit);

					ius = utIndicatorUnitSubgroupRepository.save(ius);

					UtIcIus utIcIus = new UtIcIus();
					utIcIus.setIC_NId(ic_subsector);
					utIcIus.setIUSNId(ius);

					utIcIus = utIcIusRepository.save(utIcIus);

				}

				{
					UtIndicatorUnitSubgroup ius = new UtIndicatorUnitSubgroup();
					ius.setMax_Value(0);
					ius.setMin_Value(0);
					ius.setIndicator_NId(indicator);
					ius.setSubgroup_Val_NId(subgroup);
					ius.setUnit_NId(percentUnit);

					ius = utIndicatorUnitSubgroupRepository.save(ius);

					UtIcIus utIcIus = new UtIcIus();
					utIcIus.setIC_NId(ic_subsector);
					utIcIus.setIUSNId(ius);

					utIcIus = utIcIusRepository.save(utIcIus);
				}

					break;

				case "number": {
					UtIndicatorUnitSubgroup ius = new UtIndicatorUnitSubgroup();
					ius.setMax_Value(0);
					ius.setMin_Value(0);
					ius.setSubgroup_Val_NId(subgroup);
					ius.setIndicator_NId(indicator);
					ius.setUnit_NId(numberUnit);

					ius = utIndicatorUnitSubgroupRepository.save(ius);

					UtIcIus utIcIus = new UtIcIus();
					utIcIus.setIC_NId(ic_subsector);
					utIcIus.setIUSNId(ius);

					utIcIus = utIcIusRepository.save(utIcIus);
				}
					break;

				case "per cent":
				case "score": {
					UtIndicatorUnitSubgroup ius = new UtIndicatorUnitSubgroup();
					ius.setMax_Value(0);
					ius.setMin_Value(0);
					ius.setIndicator_NId(indicator);
					ius.setSubgroup_Val_NId(subgroup);
					ius.setUnit_NId(percentUnit);

					ius = utIndicatorUnitSubgroupRepository.save(ius);

					UtIcIus utIcIus = new UtIcIus();
					utIcIus.setIC_NId(ic_subsector);
					utIcIus.setIUSNId(ius);

					utIcIus = utIcIusRepository.save(utIcIus);

				}

					break;
				}

			}

			UtIndicatorClassificationsEn sourceFacility = new UtIndicatorClassificationsEn();
			sourceFacility.setIC_Name("F_SOURCE");
			sourceFacility.setIC_Order(1);
			sourceFacility.setIC_Parent_NId(null);
			sourceFacility.setIC_Short_Name("F_SOURCE");
			sourceFacility.setIC_Type("SR");

			sourceFacility.setTypeDetail(typeDetailFacility);

			sourceFacility = utIndicatorClassificationsEnRepository.save(sourceFacility);

			UtIndicatorClassificationsEn sourceCommunity = new UtIndicatorClassificationsEn();
			sourceCommunity.setIC_Name("C_SOURCE");
			sourceCommunity.setIC_Order(2);
			sourceCommunity.setIC_Parent_NId(null);
			sourceCommunity.setIC_Short_Name("C_SOURCE");
			sourceCommunity.setIC_Type("SR");

			sourceCommunity.setTypeDetail(typeDetailComm);

			sourceCommunity = utIndicatorClassificationsEnRepository.save(sourceCommunity);

		} catch (

		FileNotFoundException e) {
			if (fis != null) {
				try {
					fis.close();
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}

			e.printStackTrace();
		} catch (IOException e) {
			if (fis != null) {
				try {
					fis.close();
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}
			e.printStackTrace();
		}

		return true;
	}

	@Override
	public File generateRawDataExcel(int checkListTypeId) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		XSSFWorkbook workbook = null;
		File file = null;
		FileInputStream fis = null;
		FileOutputStream outputStream = null;
		File fileWritten = null;
		// Area block = null;
		// Area district = null;
		StringBuffer colNamesInQuery = new StringBuffer();
		List<String> columnNamesInList = new ArrayList<>();
		// List<String> headerNames = new ArrayList<>();
		List<String> tableName = new ArrayList<>();
		List<String> colNameOfOtherTable = new ArrayList<>();
		Map<Integer, String> organisationMap = new HashMap<>();

		Map<Integer, String> typeDetailMap = new HashMap<>();

		Map<Integer, String> areaMap = new HashMap<>();
		try {
			tableName.add(null);
			colNameOfOtherTable.add(null);
			// More code optimizations will be required if national level is implemented or in multiple states.
			List<Area> areas = areaRepository.findByLevelLessThan(5);
			for (Area area : areas) {
				areaMap.put(area.getAreaNId(), area.getName());
			}

			List<TypeDetail> typeDetails = typeDetailRepository.findAll();

			for (TypeDetail typeDetail : typeDetails) {
				typeDetailMap.put(typeDetail.getId(), typeDetail.getName());
			}
			List<Organization> organisations = organizationRepository.findAll();

			for (Organization organization : organisations) {
				organisationMap.put(organization.getId(), organization.getOrganizationName());
			}

			String commaSeparedIndicatorColumnNamesAndIndicatorNames = utIndicatorEnRepository.findAllIndicatorColumnNamesByCheckListType(checkListTypeId == 121 ? "FACILITY" : "COMMUNITY");
			System.out.println("Array ::" + commaSeparedIndicatorColumnNamesAndIndicatorNames);
			JSONArray jsonArray = (JSONArray) new JSONParser().parse(commaSeparedIndicatorColumnNamesAndIndicatorNames);

			// add Facility Name Header.
			// headerNames.add("Facility Names,");
			// this key is used to retrieve facility name in sql query
			columnNamesInList.add("name");

			colNamesInQuery = colNamesInQuery.append("facility.name,");

			for (Object object : jsonArray) {
				JSONObject json = (JSONObject) object;
				columnNamesInList.add(json.get("getter_name").toString());
				tableName.add(String.valueOf(json.get("from_table_name")).equals("null") ? null : (String) json.get("from_table_name").toString());
				colNameOfOtherTable.add(String.valueOf(json.get("col_name_of_other_table")).equals("null") ? null : (String) json.get("col_name_of_other_table").toString());
				colNamesInQuery = colNamesInQuery.append(json.get("getter_name").toString()).append(",");
			}

			// System.out.println("Column Names in QUery::" + Arrays);
			// System.out.println("Json Array fetched::" + jsonArray);

			colNamesInQuery = colNamesInQuery.delete(colNamesInQuery.length() - 1, colNamesInQuery.length());

			// System.out.println("Column Names generated from string buffer :" + colNamesInQuery);

			String dataRetrived = null;

			if (checkListTypeId == 121) {
				file = new File(context.getRealPath("resources/reports/rawdataFacilityTemplate.xlsx"));
				// if (blockId != 0) {
				// dataRetrived =
				// utIndicatorEnRepository2.fetchAllValuesOfIndicatorsForFacilityData(colNamesInQuery.toString(),
				// blockId, new java.sql.Timestamp(sdf.parse(startDate).getTime()), new
				// java.sql.Timestamp(sdf.parse(endDate).getTime()), facilityTypeId);
				// } else {
				// // use district Id to retrieve data
				// dataRetrived =
				// utIndicatorEnRepository2.fetchAllValuesOfIndicatorsForFacilityDataForDistrict(colNamesInQuery.toString(),
				// districtId, new java.sql.Timestamp(sdf.parse(startDate).getTime()), new
				// java.sql.Timestamp(sdf.parse(endDate).getTime()), facilityTypeId);
				//
				// }
				dataRetrived = utIndicatorEnRepository2.fetchAllValuesOfIndicatorsForFacilityDataRawData(colNamesInQuery.toString());

			} else if (checkListTypeId == 122) {
				file = new File(context.getRealPath("resources/reports/rawdataCommunityTemplate.xlsx"));
				// if (blockId != 0) {
				// dataRetrived =
				// utIndicatorEnRepository2.fetchAllValuesOfIndicatorsForCommunityData(colNamesInQuery.toString(),
				// blockId, new java.sql.Timestamp(sdf.parse(startDate).getTime()), new
				// java.sql.Timestamp(sdf.parse(endDate).getTime()), facilityTypeId);
				// } else {
				// dataRetrived =
				// utIndicatorEnRepository2.fetchAllValuesOfIndicatorsForCommunityDataForDistrict(colNamesInQuery.toString(),
				// districtId, new java.sql.Timestamp(sdf.parse(startDate).getTime()), new
				// java.sql.Timestamp(sdf.parse(endDate).getTime()), facilityTypeId);
				//
				// }
				dataRetrived = utIndicatorEnRepository2.fetchAllValuesOfIndicatorsForCommunityDataRawData(colNamesInQuery.toString());

			} else {
				throw new IllegalArgumentException("Invalid checkList Id passed as method argument!");
			}

			fis = new FileInputStream(file);

			workbook = new XSSFWorkbook(fis);

			/* Create HSSFFont object from the workbook */
			Font boldFont = workbook.createFont();
			/* set the weight of the font */
			boldFont.setBoldweight(XSSFFont.BOLDWEIGHT_BOLD);
			/* attach the font to the style created earlier */

			// Top Left alignment
			CellStyle headerStyle = workbook.createCellStyle();
			headerStyle.setAlignment(XSSFCellStyle.ALIGN_LEFT);
			headerStyle.setVerticalAlignment(XSSFCellStyle.VERTICAL_TOP);
			headerStyle.setFont(boldFont);

			headerStyle.setBorderBottom(HSSFCellStyle.BORDER_MEDIUM);
			headerStyle.setBorderTop(HSSFCellStyle.BORDER_MEDIUM);
			headerStyle.setBorderRight(HSSFCellStyle.BORDER_MEDIUM);
			headerStyle.setBorderLeft(HSSFCellStyle.BORDER_MEDIUM);
			headerStyle.setFillForegroundColor((short) 200);
			headerStyle.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);

			XSSFCellStyle bindingCellStyle = workbook.createCellStyle();
			bindingCellStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(165, 165, 165)));
			bindingCellStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
			bindingCellStyle.setBorderTop(XSSFCellStyle.BORDER_THIN);
			bindingCellStyle.setBorderBottom(XSSFCellStyle.BORDER_THIN);
			bindingCellStyle.setBorderLeft(XSSFCellStyle.BORDER_THIN);
			bindingCellStyle.setBorderRight(XSSFCellStyle.BORDER_THIN);
			XSSFCellStyle planeCellStyle = workbook.createCellStyle();
			planeCellStyle.setBorderTop(XSSFCellStyle.BORDER_THIN);
			planeCellStyle.setBorderBottom(XSSFCellStyle.BORDER_THIN);
			planeCellStyle.setBorderLeft(XSSFCellStyle.BORDER_THIN);
			planeCellStyle.setBorderRight(XSSFCellStyle.BORDER_THIN);
			XSSFCellStyle tempstyles = null;

			XSSFSheet sheet = workbook.getSheetAt(0);

			Object[] columnArray = columnNamesInList.toArray();

			// System.out.println("Data Retrievd :::" + dataRetrived);
			if (dataRetrived != null && !dataRetrived.isEmpty()) {
				JSONArray jsonArrayData = (JSONArray) new JSONParser().parse(dataRetrived);

				// --------------------Data testing module starts-----------------------//
				int rowsCount = 4;
				for (Object object : jsonArrayData) {

					tempstyles = (rowsCount % 2 == 0 ? planeCellStyle : bindingCellStyle);

					JSONObject json = (JSONObject) object;

					XSSFRow row = sheet.createRow(rowsCount);

					for (int col = 0; col < json.size(); col++) {
						Cell cell = row.createCell(col);

						// System.out.println("Column Index::" + col);
						// System.out.println("Column Name ::" + columnArray[col]);
						// System.out.println("Column Names Array :" + Arrays.deepToString(columnArray));

						Object obj = (Object) json.get(columnArray[col]);
						// System.out.println("Json Object Retrieved:" + obj);
						// System.out.println("------------------------------------------------------------------\n");
						if (obj != null) {
							if (tableName.get(col) != null) {
								if (tableName.get(col).trim().equals("organization")) {
									cell.setCellValue(columnArray[col].toString());
									cell.setCellStyle(tempstyles);
								} else if (tableName.get(col).trim().equals("type_detail")) {

									cell.setCellValue(columnArray[col].toString());

									// cell.setCellValue(typeDetailMap.get((json.get(columnArray[col]).toString().equals("null")
									// ? null : (String) json.get(columnArray[col]).toString())));
									cell.setCellStyle(tempstyles);
								} else if (tableName.get(col).trim().equals("area")) {
									cell.setCellValue(columnArray[col].toString());

									// cell.setCellValue(areaMap.get((json.get(columnArray[col]).toString().equals("null")
									// ? null : (String) json.get(columnArray[col]).toString())));
									cell.setCellStyle(tempstyles);
								} else {
									cell.setCellValue(columnArray[col].toString());
									cell.setCellStyle(tempstyles);

								}

							} else {
								cell.setCellValue((columnArray[col].toString()));
								cell.setCellStyle(tempstyles);
								// System.out.println("Column Value ::" +
								// (json.get(columnArray[col]).toString().equals("null") ? null : (String)
								// json.get(columnArray[col]).toString()));

							}
						} else {
							cell.setCellValue(col != 0 ? columnArray[col].toString() : "");
							cell.setCellStyle(tempstyles);
						}
					}
				}
				// -----------------Data testing module ends----------------------//
				int rowCount = 5;
				// int facility
				for (Object object : jsonArrayData) {

					tempstyles = (rowCount % 2 == 0 ? planeCellStyle : bindingCellStyle);

					JSONObject json = (JSONObject) object;

					XSSFRow row = sheet.createRow(rowCount++);

					for (int col = 0; col < json.size(); col++) {
						Cell cell = row.createCell(col);

						// System.out.println("Column Index::" + col);
						//
						// System.out.println("Column Name ::" + columnArray[col]);
						// System.out.println("Column Names Array :" + Arrays.deepToString(columnArray));
						// System.out.println("colNameOfOtherTable ::" + colNameOfOtherTable.get(col));

						Object obj = !columnArray[col].toString().equals("facility.facility_type_id_fk as  facility_type_id_fk") ? (Object) json.get(columnArray[col]) : (Object) json.get("facility_type_id_fk");
						// System.out.println("Column Value::" + obj);
						// System.out.println("Json Object Retrieved:" + object);
						// System.out.println("------------------------------------------------------------------\n");

						if (obj != null) {
							if (tableName.get(col) != null) {
								if (tableName.get(col).trim().equals("organization")) {
									cell.setCellValue(organisationMap.getOrDefault(((json.get(columnArray[col]).toString().equals("null") ? null : Integer.parseInt((String) json.get(columnArray[col]).toString()))), ""));
									cell.setCellStyle(tempstyles);
								} else if (tableName.get(col).trim().equals("area") && colNameOfOtherTable.get(col).trim().equals("facility_facility_name")) {
									cell.setCellValue((String) json.get("name"));
									cell.setCellStyle(tempstyles);
								} else if (tableName.get(col).trim().equals("type_detail")) {
									if (columnArray[col].toString().equals("facility.facility_type_id_fk as  facility_type_id_fk")) {
										cell.setCellValue(typeDetailMap.get(Integer.valueOf(obj.toString())));
									} else
										cell.setCellValue(typeDetailMap.getOrDefault(((json.get(columnArray[col]).toString().equals("null") ? null : Integer.parseInt((String) json.get(columnArray[col]).toString()))), ""));
									cell.setCellStyle(tempstyles);
								} else if (tableName.get(col).trim().equals("area")) {

									cell.setCellValue(areaMap.getOrDefault(((json.get(columnArray[col]).toString().equals("null") ? null : Integer.parseInt((String) json.get(columnArray[col]).toString()))), ""));
									cell.setCellStyle(tempstyles);
									if (checkListTypeId == 121) {

										if (columnArray[col].toString().equals("statename")) {

											Cell cellState = row.createCell(395);
											cellState.setCellValue((Integer) (Integer.valueOf(obj.toString())));
										} else if (columnArray[col].toString().equals("district")) {
											Cell districtCell = row.createCell(396);
											districtCell.setCellValue((Integer) (Integer.valueOf(obj.toString())));
										} else if (columnArray[col].toString().equals("block")) {
											Cell blockCell = row.createCell(397);
											blockCell.setCellValue((Integer) (Integer.valueOf(obj.toString())));
										}
									} else if (checkListTypeId == 122) {

										if (columnArray[col].toString().equals("q1")) {
											// stateid
											Cell cellState = row.createCell(162);
											cellState.setCellValue((Integer) (Integer.valueOf(obj.toString())));
										} else if (columnArray[col].toString().equals("q2")) {
											// districtid
											Cell districtCell = row.createCell(163);
											districtCell.setCellValue((Integer) (Integer.valueOf(obj.toString())));

										} else if (columnArray[col].toString().equals("area_id_fk")) {
											// block id
											Cell blockCell = row.createCell(164);
											blockCell.setCellValue((Integer) (Integer.valueOf(obj.toString())));
										}
									}
								} else {
									cell.setCellValue((json.get(columnArray[col]).toString().equals("null") ? null : (String) json.get(columnArray[col]).toString()));
									cell.setCellStyle(tempstyles);
								}
							} else {
								cell.setCellValue((json.get(columnArray[col]).toString().equals("null") ? null : (String) json.get(columnArray[col]).toString()));
								cell.setCellStyle(tempstyles);
							}
						} else {
							cell.setCellValue((String) "");
							cell.setCellStyle(tempstyles);
						}
					}
				}
			}

			fileWritten = File.createTempFile((checkListTypeId == 121 ? "FACILITY RAW DATA.xlsx" : "COMMUNITY"), ".xlsx");

			outputStream = new FileOutputStream(fileWritten);
			workbook.write(outputStream);

		} catch (IOException e) {
			e.printStackTrace();
			throw new RuntimeException("Unable to generate excel file.", e);
		} catch (org.json.simple.parser.ParseException e) {
			throw new RuntimeException("Unable to parse retrieved json.", e);
		} finally {
			if (fis != null) {
				try {
					fis.close();
				} catch (IOException e) {
					if (fileWritten.exists())
						fileWritten.delete();
					throw new RuntimeException("Stream couldn't be closed.File cannot be created.", e);
				}
			}
			if (outputStream != null) {
				try {
					outputStream.close();
				} catch (IOException e) {

				}
			}
			if (workbook != null) {
				try {
					workbook.close();
				} catch (IOException e) {
					if (fileWritten.exists())
						fileWritten.delete();
					throw new RuntimeException("IO error occured.File cannot be created.", e);
				}
			}
		}

		return fileWritten;
	}

}
