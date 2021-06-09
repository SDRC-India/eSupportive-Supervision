/**
 * 
 */
package org.sdrc.ess.service;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.PNGTranscoder;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.sdrc.ess.domain.Area;
import org.sdrc.ess.domain.UtIndicatorEn;
import org.sdrc.ess.domain.UtTimeperiod;
import org.sdrc.ess.model.web.DataCollectionModel;
import org.sdrc.ess.model.web.DataModel;
import org.sdrc.ess.model.web.LineChartData;
import org.sdrc.ess.repository.AreaRepository;
import org.sdrc.ess.repository.UtIndicatorEnRepository;
import org.sdrc.ess.repository.UtIndicatorUnitSubgroupRepository;
import org.sdrc.ess.repository.UtTimeperiodRepository;
import org.sdrc.ess.util.HeaderFooter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Service;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.html.WebColors;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

/**
 * @author Harsh Pratyush (harsh@sdrc.co.in)
 *
 */

@Service
public class ExportServiceImpl implements ExportService {

	@Autowired
	private ThematicDashboardViewService thematicDashboardViewService;

	@Autowired
	private ServletContext context;

	@Autowired
	private ResourceBundleMessageSource messages;

	@Autowired
	private UtIndicatorEnRepository utIndicatorEnRepository;

	@Autowired
	private UtTimeperiodRepository utTimeperiodRepository;

	@Autowired
	private AreaRepository areaRepository;

	@Autowired
	private UtIndicatorUnitSubgroupRepository utIndicatorUnitSubgroupRepository;
	
	private SimpleDateFormat sdf=new SimpleDateFormat("dd-MM-yyyy-HH-mm-ss-SSS");
	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.sdrc.ess.service.ExportService#exportMapChartData(java.util.List,
	 * java.lang.String, java.lang.String, java.lang.String, java.lang.String,
	 * java.lang.Integer)
	 */
	@Override
	@SuppressWarnings(value={"resource" })
	public String exportMapChartData(List<String> svgs, String indicatorId,
			String sourceNid, String areaId, String timeperiodId,
			Integer parentAreaId, Integer facilityTypeId) {

		DataCollectionModel dataCollectionModel = thematicDashboardViewService
				.fetchMapData(indicatorId, sourceNid, areaId, timeperiodId,
						parentAreaId, facilityTypeId);

		Area area = areaRepository.findByAreaId(areaId);
		
		UtIndicatorEn indicatorEn=utIndicatorUnitSubgroupRepository.findByIndicator_NId(Integer.parseInt(indicatorId)).getIndicator_NId();
		
		UtTimeperiod timeperiod = utTimeperiodRepository.findByTimeperiodNid(Integer.parseInt(timeperiodId));

		String file = null;
		try {

			new FileOutputStream(new File(context.getRealPath("")
					+ "/resources/map.svg")).write(svgs.get(2).getBytes());

			
			Font dataFont = new Font(Font.FontFamily.HELVETICA, 10);

			Document document = new Document(PageSize.A4.rotate());

			String outputPath = messages.getMessage("output.path", null, null)
					+ area.getName()+"_"+timeperiod.getTimePeriod()+"_"+sdf.format(new java.util.Date())+ ".pdf";
			String domainName = messages
					.getMessage(
							org.sdrc.ess.util.Constants.Web.WEB_DOMAIN_NAME,
							null, null);
			PdfWriter writer = PdfWriter.getInstance(document,
					new FileOutputStream(outputPath));
			/**
			 *  @see{org.sdrc.ess.util.HeaderFooter}
			 */
			HeaderFooter headerFooter = new HeaderFooter(context, domainName);
			writer.setPageEvent(headerFooter);

			document.open();

			BaseColor cellColor = WebColors.getRGBColor("#E8E3E2");
			BaseColor headerCOlor = WebColors.getRGBColor("#f0b569");
			BaseColor siNoColor = WebColors.getRGBColor("#333a3b");
			
			Font smallBold = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD,
					 WebColors.getRGBColor("#333a3b"));
			Font siNoBold=new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD,
					 WebColors.getRGBColor("#f0b569"));

			Paragraph dashboardTitle = new Paragraph();
			dashboardTitle.setAlignment(Element.ALIGN_CENTER);
			dashboardTitle.setSpacingAfter(10);
			Chunk dashboardChunk = new Chunk("Score Card");
			dashboardTitle.add(dashboardChunk);

			Paragraph blankSpace = new Paragraph();
			blankSpace.setAlignment(Element.ALIGN_CENTER);
			blankSpace.setSpacingAfter(10);
			Chunk blankSpaceChunk = new Chunk("          ");
			blankSpace.add(blankSpaceChunk);

			Paragraph numberOfFacility = new Paragraph();
			numberOfFacility.setAlignment(Element.ALIGN_CENTER);
			Chunk numberOfFacilityChunk = new Chunk();
			numberOfFacility.add(numberOfFacilityChunk);

			Paragraph spiderDataParagraph = new Paragraph();
			spiderDataParagraph.setAlignment(Element.ALIGN_CENTER);
			spiderDataParagraph.setSpacingAfter(10);
			Chunk spiderChunk = new Chunk("Section : "+svgs.get(4)+"    Sub-Section : "+svgs.get(5)+"    \t  Indicator : "
					+ indicatorEn.getIndicator_Name()
					+ " \n    Area : " + area.getName()+ "     Timeperiod : " + timeperiod.getTimePeriod());
			spiderDataParagraph.add(spiderChunk);

			// legendImageInstance.scalePercent(scalerMap);
			/* googleMapImage.setAbsolutePosition(40,5); */
			byte[] topBottomImage =svgs.get(0).split(",").length<2?null: Base64
					.decodeBase64(svgs.get(0).split(",")[1]);
			Image topImage = topBottomImage==null?null:Image.getInstance(topBottomImage);
			
		
			
			
			int indentationMap = 0;
			float scalerMap = 0;
			
			if(topBottomImage!=null)
			{
				scalerMap=((document.getPageSize().getWidth()
						- document.leftMargin() - document.rightMargin() - indentationMap) / topImage
						.getWidth()) * 100;
			
		
				int indentation1 = 0;
				float scaler1 = ((document.getPageSize().getWidth()
						- document.leftMargin() - document.rightMargin() - indentation1) / topImage
						.getWidth()) * 18;
				if(Integer.parseInt(svgs.get(3))>1024)
				{	
				topImage.scalePercent(70);
				topImage.setAbsolutePosition(20, 80);	
				}
				else if(Integer.parseInt(svgs.get(3))>1000)
				{	
				topImage.scalePercent(70);
				topImage.setAbsolutePosition(20, 80);	
				}
				else
				{
					topImage.scalePercent(50);
					topImage.setAbsolutePosition(20,-280);	
				}
				
			}
				byte[] legendImage = Base64
						.decodeBase64(svgs.get(1).split(",")[1]);
				Image legendImageInstance = Image.getInstance(legendImage);
				
			//topImage.scalePercent(scalerMap);
			scalerMap=((document.getPageSize().getWidth()
					- document.leftMargin() - document.rightMargin() - indentationMap) / legendImageInstance
					.getWidth()) * 100;
			
			
			int indentation2 = 0;
			float scaler2 = ((document.getPageSize().getWidth()
					 - document.rightMargin() - indentation2) / legendImageInstance
					.getWidth()) * 18;
			
			if(Integer.parseInt(svgs.get(3))>1024)
			{	
			legendImageInstance.setAbsolutePosition(650, 80);
			legendImageInstance.scalePercent(70);
			}
			else if(Integer.parseInt(svgs.get(3))>1000)
			{	
			legendImageInstance.setAbsolutePosition(650, 80);
			legendImageInstance.scalePercent(70);
			}
			else
			{
				
				legendImageInstance.setAbsolutePosition(650, -280);
				legendImageInstance.scalePercent(50);
				
			}
			
			Paragraph googleMapParagraph = new Paragraph();
			googleMapParagraph.setAlignment(Element.ALIGN_CENTER);
			googleMapParagraph.setSpacingAfter(10);
			Chunk googleMapChunk = new Chunk();
			googleMapParagraph.add(googleMapChunk);

			String css = "svg {" + "shape-rendering: geometricPrecision;"
					+ "text-rendering:  geometricPrecision;"
					+ "color-rendering: optimizeQuality;"
					+ "image-rendering: optimizeQuality;" + "}";
			File cssFile = File.createTempFile("batik-default-override-",
					".css");
			FileUtils.writeStringToFile(cssFile, css);

			String svg_URI_input = Paths
					.get(new File(context.getRealPath("")
							+ "/resources/map.svg").getPath()).toUri().toURL()
					.toString();
			TranscoderInput input_svg_image = new TranscoderInput(svg_URI_input);
			// Step-2: Define OutputStream to PNG Image and attach to
			// TranscoderOutput
			ByteArrayOutputStream png_ostream = new ByteArrayOutputStream();
			TranscoderOutput output_png_image = new TranscoderOutput(
					png_ostream);
			// Step-3: Create PNGTranscoder and define hints if required
			PNGTranscoder my_converter = new PNGTranscoder();
			// Step-4: Convert and Write output
			my_converter.transcode(input_svg_image, output_png_image);
			png_ostream.flush();

			Image mapImage = Image.getInstance(png_ostream.toByteArray());

			int indentation = 0;
			float scaler = 0;
			if (Integer.parseInt(svgs.get(3)) > 1024) {
				scaler = ((document.getPageSize().getWidth()
						- document.leftMargin() - document.rightMargin() - indentation) / mapImage
						.getWidth()) * 130;
				mapImage.setAbsolutePosition(-50, 80);
			}

			else if (Integer.parseInt(svgs.get(3)) > 1000) {
				scaler = ((document.getPageSize().getWidth()
						- document.leftMargin() - document.rightMargin() - indentation) / mapImage
						.getWidth()) * 100;
				mapImage.setAbsolutePosition(-10, 80);
			}

			else {
				scaler = ((document.getPageSize().getWidth()
						- document.leftMargin() - document.rightMargin() - indentation) / mapImage
						.getWidth()) * 60;
				mapImage.setAbsolutePosition(160, 20);
			}
			mapImage.scalePercent(scaler);

			PdfPTable mapDataTable = new PdfPTable(4);

			float[] mapDatacolumnWidths = new float[] { 8f, 30f, 30f, 30f };
			mapDataTable.setWidths(mapDatacolumnWidths);
			String areaType="";
			switch(area.getLevel())
			{
			case 1:
				areaType="State";
				break;
			case 2:
				areaType="District";
				break;
			case 3:
				areaType="Block";
				break;
			}
			PdfPCell mapDataCell0 = new PdfPCell(new Paragraph("Sl.No.",
					siNoBold));
			PdfPCell mapDataCell1 = new PdfPCell(new Paragraph(areaType,
					smallBold));

			PdfPCell mapDataCell3 = new PdfPCell(new Paragraph("Percent",
					smallBold));
			PdfPCell mapDataCell4 = new PdfPCell(new Paragraph("Rank",
					smallBold));

			mapDataCell0.setBackgroundColor(siNoColor);
			mapDataCell1.setBackgroundColor(headerCOlor);

			mapDataCell3.setBackgroundColor(headerCOlor);
			mapDataCell4.setBackgroundColor(headerCOlor);

			mapDataCell1.setHorizontalAlignment(Element.ALIGN_CENTER);
			mapDataCell0.setHorizontalAlignment(Element.ALIGN_CENTER);
			mapDataCell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			mapDataCell4.setHorizontalAlignment(Element.ALIGN_CENTER);

			mapDataCell0.setBorderColor(BaseColor.WHITE);
			mapDataCell1.setBorderColor(BaseColor.WHITE);
			mapDataCell3.setBorderColor(BaseColor.WHITE);
			mapDataCell4.setBorderColor(BaseColor.WHITE);

			mapDataTable.addCell(mapDataCell0);
			mapDataTable.addCell(mapDataCell1);

			mapDataTable.addCell(mapDataCell3);
			mapDataTable.addCell(mapDataCell4);

			int i = 1;
			for (DataModel mapData : dataCollectionModel.getDataCollection()) {

				PdfPCell data0 = new PdfPCell(new Paragraph(
						Integer.toString(i), dataFont));
				data0.setHorizontalAlignment(Element.ALIGN_CENTER);
				data0.setBorderColor(BaseColor.WHITE);
				PdfPCell data1 = new PdfPCell(new Paragraph(
						mapData.getAreaName(), dataFont));
				data1.setHorizontalAlignment(Element.ALIGN_LEFT);
				data1.setBorderColor(BaseColor.WHITE);

				PdfPCell data3 = new PdfPCell(new Paragraph(mapData.getValue(),
						dataFont));
				data3.setHorizontalAlignment(Element.ALIGN_CENTER);
				data3.setBorderColor(BaseColor.WHITE);

				PdfPCell data4 = new PdfPCell(new Paragraph(mapData.getRank(),
						dataFont));
				data4.setHorizontalAlignment(Element.ALIGN_CENTER);
				data4.setBorderColor(BaseColor.WHITE);

				if (i % 2 == 0) {
					data0.setBackgroundColor(cellColor);
					data1.setBackgroundColor(cellColor);
					data3.setBackgroundColor(cellColor);
					data4.setBackgroundColor(cellColor);
				} else {
					data0.setBackgroundColor(BaseColor.LIGHT_GRAY);
					data1.setBackgroundColor(BaseColor.LIGHT_GRAY);
					data3.setBackgroundColor(BaseColor.LIGHT_GRAY);
					data4.setBackgroundColor(BaseColor.LIGHT_GRAY);
				}

				mapDataTable.addCell(data0);
				mapDataTable.addCell(data1);

				mapDataTable.addCell(data3);
				mapDataTable.addCell(data4);

				i++;

			}
			// Spider Data Table

			document.add(blankSpace);

			document.add(spiderDataParagraph);

			document.add(blankSpace);
			
			document.add(mapDataTable);
			
			document.newPage();
			if(dataCollectionModel.getBottomPerformers()!=null&&dataCollectionModel.getBottomPerformers().size()>0)
			{	
			document.add(topImage);
			}
			document.add(legendImageInstance);
			document.add(mapImage);

			document.close();
			file = outputPath;
		}

		catch (Exception e) {

			e.printStackTrace();
		}

		return file;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.sdrc.ess.service.ExportService#exportLineChartData(java.util.List,
	 * java.lang.String, java.lang.String, java.lang.String, java.lang.String,
	 * java.lang.Integer, java.lang.Integer)
	 */
	@Override
	public String exportLineChartData(List<String> svgs, String indicatorId,
			String sourceNid, String areaId, String timeperiodId,
			Integer parentAreaId, Integer area_NId, int preodicity, Integer facilityTypeId) {
		DataCollectionModel dataCollectionModel = thematicDashboardViewService
				.fetchMapData(indicatorId, sourceNid, areaId, timeperiodId,
						parentAreaId,facilityTypeId);

	List<LineChartData> lineChartData=thematicDashboardViewService.getLineChartData(area_NId,
				Integer.parseInt(indicatorId), preodicity,
				Integer.parseInt(timeperiodId),facilityTypeId);
//Area area = areaRepository.findByAreaId(areaId);
		
	UtIndicatorEn indicatorEn=utIndicatorUnitSubgroupRepository.findByIndicator_NId(Integer.parseInt(indicatorId)).getIndicator_NId();
	Area area = areaRepository.findByAreaId(areaId);
		UtTimeperiod timeperiod = utTimeperiodRepository.findByTimeperiodNid(Integer.parseInt(timeperiodId));

		String file = null;
		try {

			new FileOutputStream(new File(context.getRealPath("")
					+ "/resources/map.svg")).write(svgs.get(2).getBytes());
			new FileOutputStream(new File(context.getRealPath("")
					+ "/resources/trend.svg")).write(svgs.get(7).getBytes());

			
			Font dataFont = new Font(Font.FontFamily.HELVETICA, 10);

			Document document = new Document(PageSize.A4.rotate());

			String outputPath = messages.getMessage("output.path", null, null)
					+ svgs.get(5)+"_"+timeperiod.getTimePeriod()+"_Trend _"+sdf.format(new java.util.Date())+ ".pdf";
			String domainName = messages
					.getMessage(
							org.sdrc.ess.util.Constants.Web.WEB_DOMAIN_NAME,
							null, null);
			PdfWriter writer = PdfWriter.getInstance(document,
					new FileOutputStream(outputPath));
			/**
			 *  @see{org.sdrc.ess.util.HeaderFooter}
			 */
			HeaderFooter headerFooter = new HeaderFooter(context, domainName);
			writer.setPageEvent(headerFooter);

			document.open();

			BaseColor cellColor = WebColors.getRGBColor("#E8E3E2");
			BaseColor headerCOlor = WebColors.getRGBColor("#f0b569");
			BaseColor siNoColor = WebColors.getRGBColor("#333a3b");
			
			Font smallBold = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD,
					 WebColors.getRGBColor("#333a3b"));
			Font siNoBold=new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD,
					 WebColors.getRGBColor("#f0b569"));

			Paragraph dashboardTitle = new Paragraph();
			dashboardTitle.setAlignment(Element.ALIGN_CENTER);
			dashboardTitle.setSpacingAfter(10);
			Chunk dashboardChunk = new Chunk("Score Card");
			dashboardTitle.add(dashboardChunk);

			Paragraph blankSpace = new Paragraph();
			blankSpace.setAlignment(Element.ALIGN_CENTER);
			blankSpace.setSpacingAfter(10);
			Chunk blankSpaceChunk = new Chunk("          ");
			blankSpace.add(blankSpaceChunk);

			Paragraph numberOfFacility = new Paragraph();
			numberOfFacility.setAlignment(Element.ALIGN_CENTER);
			Chunk numberOfFacilityChunk = new Chunk();
			numberOfFacility.add(numberOfFacilityChunk);

			Paragraph spiderDataParagraph = new Paragraph();
			spiderDataParagraph.setAlignment(Element.ALIGN_CENTER);
			spiderDataParagraph.setSpacingAfter(10);
			Chunk spiderChunk = new Chunk("Section : "+svgs.get(8)+"    Sub-Section : "+svgs.get(9)+"     \t Indicator : "
					+ indicatorEn.getIndicator_Name()
					+ " \n    Area : " + area.getName()+ "     Timeperiod : " + timeperiod.getTimePeriod());
			spiderDataParagraph.add(spiderChunk);
			
			
			Paragraph lineDataParagraph = new Paragraph();
			lineDataParagraph.setAlignment(Element.ALIGN_CENTER);
			lineDataParagraph.setSpacingAfter(10);
			Chunk lineChunk = new Chunk("Indicator : " + svgs.get(6) +"  Area : "+svgs.get(5));
			lineDataParagraph.add(lineChunk);

			// legendImageInstance.scalePercent(scalerMap);
			/* googleMapImage.setAbsolutePosition(40,5); */
			byte[] topBottomImage =svgs.get(0).split(",").length<2?null: Base64
					.decodeBase64(svgs.get(0).split(",")[1]);
			Image topImage = topBottomImage==null?null:Image.getInstance(topBottomImage);
			
		
			
			
			int indentationMap = 0;
			float scalerMap = 0;
			
			if(topBottomImage!=null)
			{
				scalerMap=((document.getPageSize().getWidth()
						- document.leftMargin() - document.rightMargin() - indentationMap) / topImage
						.getWidth()) * 100;
			
		
				int indentation1 = 0;
				float scaler1 = ((document.getPageSize().getWidth()
						- document.leftMargin() - document.rightMargin() - indentation1) / topImage
						.getWidth()) * 18;
				if(Integer.parseInt(svgs.get(3))>1024)
				{	
				topImage.scalePercent(70);
				topImage.setAbsolutePosition(20, 80);	
				}
				else if(Integer.parseInt(svgs.get(3))>1000)
				{	
				topImage.scalePercent(70);
				topImage.setAbsolutePosition(20, 80);	
				}
				else
				{
					topImage.scalePercent(50);
					topImage.setAbsolutePosition(20,-280);	
				}
				
			}
				byte[] legendImage = Base64
						.decodeBase64(svgs.get(1).split(",")[1]);
				Image legendImageInstance = Image.getInstance(legendImage);
				
			//topImage.scalePercent(scalerMap);
			scalerMap=((document.getPageSize().getWidth()
					- document.leftMargin() - document.rightMargin() - indentationMap) / legendImageInstance
					.getWidth()) * 100;
			
			
			int indentation2 = 0;
			float scaler2 = ((document.getPageSize().getWidth()
					 - document.rightMargin() - indentation2) / legendImageInstance
					.getWidth()) * 18;
			
			if(Integer.parseInt(svgs.get(3))>1024)
			{	
			legendImageInstance.setAbsolutePosition(650, 80);
			legendImageInstance.scalePercent(70);
			}
			else if(Integer.parseInt(svgs.get(3))>1000)
			{	
			legendImageInstance.setAbsolutePosition(650, 80);
			legendImageInstance.scalePercent(70);
			}
			else
			{
				
				legendImageInstance.setAbsolutePosition(650, -280);
				legendImageInstance.scalePercent(50);
				
			}
			
				//line data
			byte[] lineChartImage = Base64
					.decodeBase64(svgs.get(4).split(",")[1]);
			Image lineTrendChartImage = Image.getInstance(lineChartImage);
			
		
			
			
			if(Integer.parseInt(svgs.get(3))>1024)
			{
				lineTrendChartImage.scalePercent(100);
				lineTrendChartImage.setAbsolutePosition(170, 115);	
			}
			else if(Integer.parseInt(svgs.get(3))>1000)
			{
				lineTrendChartImage.scalePercent(80);
				lineTrendChartImage.setAbsolutePosition(200, 115);	
			}
			else
			{
				lineTrendChartImage.scalePercent(90);
				lineTrendChartImage.setAbsolutePosition(180, 100);	
			}
			//
			
			Paragraph googleMapParagraph = new Paragraph();
			googleMapParagraph.setAlignment(Element.ALIGN_CENTER);
			googleMapParagraph.setSpacingAfter(10);
			Chunk googleMapChunk = new Chunk();
			googleMapParagraph.add(googleMapChunk);

			String css = "svg {" + "shape-rendering: geometricPrecision;"
					+ "text-rendering:  geometricPrecision;"
					+ "color-rendering: optimizeQuality;"
					+ "image-rendering: optimizeQuality;" + "}";
			File cssFile = File.createTempFile("batik-default-override-",
					".css");
			FileUtils.writeStringToFile(cssFile, css);

			String svg_URI_input = Paths
					.get(new File(context.getRealPath("")
							+ "/resources/map.svg").getPath()).toUri().toURL()
					.toString();
			TranscoderInput input_svg_image = new TranscoderInput(svg_URI_input);
			// Step-2: Define OutputStream to PNG Image and attach to
			// TranscoderOutput
			ByteArrayOutputStream png_ostream = new ByteArrayOutputStream();
			TranscoderOutput output_png_image = new TranscoderOutput(
					png_ostream);
			// Step-3: Create PNGTranscoder and define hints if required
			PNGTranscoder my_converter = new PNGTranscoder();
			// Step-4: Convert and Write output
			my_converter.transcode(input_svg_image, output_png_image);
			png_ostream.flush();

			Image mapImage = Image.getInstance(png_ostream.toByteArray());

			int indentation = 0;
			float scaler = 0;
			if (Integer.parseInt(svgs.get(3)) > 1024) {
				scaler = ((document.getPageSize().getWidth()
						- document.leftMargin() - document.rightMargin() - indentation) / mapImage
						.getWidth()) * 130;
				mapImage.setAbsolutePosition(-50, 80);
			}

			else if (Integer.parseInt(svgs.get(3)) > 1000) {
				scaler = ((document.getPageSize().getWidth()
						- document.leftMargin() - document.rightMargin() - indentation) / mapImage
						.getWidth()) * 100;
				mapImage.setAbsolutePosition(-10, 80);
			}

			else {
				scaler = ((document.getPageSize().getWidth()
						- document.leftMargin() - document.rightMargin() - indentation) / mapImage
						.getWidth()) * 60;
				mapImage.setAbsolutePosition(160, 20);
			}
			mapImage.scalePercent(scaler);
			
			
			
			 svg_URI_input = Paths
					.get(new File(context.getRealPath("")
							+ "/resources/trend.svg").getPath()).toUri().toURL()
					.toString();
			 input_svg_image = new TranscoderInput(svg_URI_input);
			// Step-2: Define OutputStream to PNG Image and attach to
			// TranscoderOutput
			 png_ostream = new ByteArrayOutputStream();
			 output_png_image = new TranscoderOutput(png_ostream);
			// Step-3: Create PNGTranscoder and define hints if required
			 my_converter = new PNGTranscoder();
			// Step-4: Convert and Write output
			my_converter.transcode(input_svg_image, output_png_image);
			png_ostream.flush();

			Image spiderImage = Image.getInstance(png_ostream.toByteArray());
	
			 indentation = 0;
			 scaler = ((document.getPageSize().getWidth()
					- document.leftMargin() - document.rightMargin() - indentation) / spiderImage
					.getWidth()) * 60;
			 if(Integer.parseInt(svgs.get(3))>1024)
			 {
			spiderImage.scalePercent(scaler);
			spiderImage.setAbsolutePosition(155, 145);
			 }
				else if(Integer.parseInt(svgs.get(3))>1000)
				{
					scaler = ((document.getPageSize().getWidth()
							- document.leftMargin() - document.rightMargin() - indentation) / spiderImage
							.getWidth()) * 45;
					spiderImage.scalePercent(scaler);
					spiderImage.setAbsolutePosition(200, 160);
					 }
				else
				{
					scaler = ((document.getPageSize().getWidth()
							- document.leftMargin() - document.rightMargin() - indentation) / spiderImage
							.getWidth()) * 45;
					spiderImage.scalePercent(scaler);
					spiderImage.setAbsolutePosition(200, 150);
					 }

				String areaType="";
				switch(area.getLevel())
				{
				case 1:
					areaType="State";
					break;
				case 2:
					areaType="District";
					break;
				case 3:
					areaType="Block";
					break;
				}
			PdfPTable mapDataTable = new PdfPTable(4);

			float[] mapDatacolumnWidths = new float[] { 8f, 30f, 30f, 30f };
			mapDataTable.setWidths(mapDatacolumnWidths);

			PdfPCell mapDataCell0 = new PdfPCell(new Paragraph("Sl.No.",
					siNoBold));
			PdfPCell mapDataCell1 = new PdfPCell(new Paragraph(areaType,
					smallBold));

			PdfPCell mapDataCell3 = new PdfPCell(new Paragraph("Percent",
					smallBold));
			PdfPCell mapDataCell4 = new PdfPCell(new Paragraph("Rank",
					smallBold));

			mapDataCell0.setBackgroundColor(siNoColor);
			mapDataCell1.setBackgroundColor(headerCOlor);

			mapDataCell3.setBackgroundColor(headerCOlor);
			mapDataCell4.setBackgroundColor(headerCOlor);

			mapDataCell1.setHorizontalAlignment(Element.ALIGN_CENTER);
			mapDataCell0.setHorizontalAlignment(Element.ALIGN_CENTER);
			mapDataCell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			mapDataCell4.setHorizontalAlignment(Element.ALIGN_CENTER);

			mapDataCell0.setBorderColor(BaseColor.WHITE);
			mapDataCell1.setBorderColor(BaseColor.WHITE);
			mapDataCell3.setBorderColor(BaseColor.WHITE);
			mapDataCell4.setBorderColor(BaseColor.WHITE);

			mapDataTable.addCell(mapDataCell0);
			mapDataTable.addCell(mapDataCell1);

			mapDataTable.addCell(mapDataCell3);
			mapDataTable.addCell(mapDataCell4);

			int i = 1;
			for (DataModel mapData : dataCollectionModel.getDataCollection()) {

				PdfPCell data0 = new PdfPCell(new Paragraph(
						Integer.toString(i), dataFont));
				data0.setHorizontalAlignment(Element.ALIGN_CENTER);
				data0.setBorderColor(BaseColor.WHITE);
				PdfPCell data1 = new PdfPCell(new Paragraph(
						mapData.getAreaName(), dataFont));
				data1.setHorizontalAlignment(Element.ALIGN_LEFT);
				data1.setBorderColor(BaseColor.WHITE);

				PdfPCell data3 = new PdfPCell(new Paragraph(mapData.getValue(),
						dataFont));
				data3.setHorizontalAlignment(Element.ALIGN_CENTER);
				data3.setBorderColor(BaseColor.WHITE);

				PdfPCell data4 = new PdfPCell(new Paragraph(mapData.getRank(),
						dataFont));
				data4.setHorizontalAlignment(Element.ALIGN_CENTER);
				data4.setBorderColor(BaseColor.WHITE);

				if (i % 2 == 0) {
					data0.setBackgroundColor(cellColor);
					data1.setBackgroundColor(cellColor);
					data3.setBackgroundColor(cellColor);
					data4.setBackgroundColor(cellColor);
				} else {
					data0.setBackgroundColor(BaseColor.LIGHT_GRAY);
					data1.setBackgroundColor(BaseColor.LIGHT_GRAY);
					data3.setBackgroundColor(BaseColor.LIGHT_GRAY);
					data4.setBackgroundColor(BaseColor.LIGHT_GRAY);
				}

				mapDataTable.addCell(data0);
				mapDataTable.addCell(data1);

				mapDataTable.addCell(data3);
				mapDataTable.addCell(data4);

				i++;

			}
			
			
			
			// Line Data table
			
			PdfPTable lineDataTable = new PdfPTable(5);

			float[] lineDataTableWidths = new float[] { 8f, 30f, 20f, 20f, 20f };
			lineDataTable.setWidths(lineDataTableWidths);

			PdfPCell lineDataCell0 = new PdfPCell(new Paragraph("Sl.No.",
					siNoBold));
			PdfPCell lineDataCell1 = new PdfPCell(new Paragraph("Time Period ",
					smallBold));
			
			PdfPCell lineDataCell2 = new PdfPCell(new Paragraph("Highest",
					smallBold));

			PdfPCell lineDataCell3 = new PdfPCell(new Paragraph(svgs.get(5),
					smallBold));
			PdfPCell lineDataCell4 = new PdfPCell(new Paragraph("Lowest",
					smallBold));

			lineDataCell0.setBackgroundColor(siNoColor);
			lineDataCell1.setBackgroundColor(headerCOlor);
			lineDataCell2.setBackgroundColor(headerCOlor);
			lineDataCell3.setBackgroundColor(headerCOlor);
			lineDataCell4.setBackgroundColor(headerCOlor);

			lineDataCell1.setHorizontalAlignment(Element.ALIGN_CENTER);
			lineDataCell2.setHorizontalAlignment(Element.ALIGN_CENTER);
			lineDataCell0.setHorizontalAlignment(Element.ALIGN_CENTER);
			lineDataCell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			lineDataCell4.setHorizontalAlignment(Element.ALIGN_CENTER);

			lineDataCell0.setBorderColor(BaseColor.WHITE);
			lineDataCell2.setBorderColor(BaseColor.WHITE);
			lineDataCell1.setBorderColor(BaseColor.WHITE);
			lineDataCell3.setBorderColor(BaseColor.WHITE);
			lineDataCell4.setBorderColor(BaseColor.WHITE);

			lineDataTable.addCell(lineDataCell0);

			lineDataTable.addCell(lineDataCell1);
			lineDataTable.addCell(lineDataCell2);
			lineDataTable.addCell(lineDataCell3);
			lineDataTable.addCell(lineDataCell4);

			Map<String,Map<String,String>> lineDataMap=new HashMap<String,Map<String,String>>();
			String areaName=null;
			for(LineChartData lineData:lineChartData)
			{
				if(lineDataMap.containsKey(lineData.getTimeperiod()))
				{
					lineDataMap.get(lineData.getTimeperiod()).put(lineData.getKey(), String.valueOf(lineData.getDataValue()));
					if(lineData.getKey()!="UCL" && lineData.getKey()!="LCL")
					{
						areaName=lineData.getKey();
					}
				}
				else
				{
					Map<String,String> mapData=new HashMap<String, String>();
					mapData.put(lineData.getKey(), String.valueOf(lineData.getDataValue()));
					if(lineData.getKey()!="UCL" && lineData.getKey()!="LCL")
					{
						areaName=lineData.getKey();
					}
					lineDataMap.put(lineData.getTimeperiod(),mapData);
				}
				
			}
			 i = 1;
			 
			for (String mapData :lineDataMap.keySet()) {

				PdfPCell data0 = new PdfPCell(new Paragraph(
						Integer.toString(i), dataFont));
				data0.setHorizontalAlignment(Element.ALIGN_CENTER);
				data0.setBorderColor(BaseColor.WHITE);
				PdfPCell data1 = new PdfPCell(new Paragraph(
						mapData, dataFont));
				data1.setHorizontalAlignment(Element.ALIGN_LEFT);
				data1.setBorderColor(BaseColor.WHITE);

				PdfPCell data2 = new PdfPCell(new Paragraph(
						!lineDataMap.get(mapData).containsKey("UCL")?"-":lineDataMap.get(mapData).get("UCL"), dataFont));
				data2.setHorizontalAlignment(Element.ALIGN_CENTER);
				data2.setBorderColor(BaseColor.WHITE);
				
				PdfPCell data3 = new PdfPCell(new Paragraph(lineDataMap.get(mapData).get(areaName),
						dataFont));
				data3.setHorizontalAlignment(Element.ALIGN_CENTER);
				data3.setBorderColor(BaseColor.WHITE);

				PdfPCell data4 = new PdfPCell(new Paragraph(!lineDataMap.get(mapData).containsKey("LCL")?"-":lineDataMap.get(mapData).get("LCL"),
						dataFont));
				data4.setHorizontalAlignment(Element.ALIGN_CENTER);
				data4.setBorderColor(BaseColor.WHITE);

				if (i % 2 == 0) {
					data0.setBackgroundColor(cellColor);
					data1.setBackgroundColor(cellColor);
					data2.setBackgroundColor(cellColor);
					data3.setBackgroundColor(cellColor);
					data4.setBackgroundColor(cellColor);
				} else {
					data0.setBackgroundColor(BaseColor.LIGHT_GRAY);
					data1.setBackgroundColor(BaseColor.LIGHT_GRAY);
					data2.setBackgroundColor(BaseColor.LIGHT_GRAY);
					data3.setBackgroundColor(BaseColor.LIGHT_GRAY);
					data4.setBackgroundColor(BaseColor.LIGHT_GRAY);
				}

				lineDataTable.addCell(data0);
				lineDataTable.addCell(data1);
				lineDataTable.addCell(data2);
				lineDataTable.addCell(data3);
				lineDataTable.addCell(data4);

				i++;

			}

			document.add(blankSpace);

			document.add(spiderDataParagraph);

			document.add(blankSpace);
			
			document.add(lineDataTable);
			
			
			
			document.newPage();
			document.add(lineTrendChartImage);
			document.add(spiderImage);
			
			document.newPage();	
			
			document.add(mapDataTable);
			
			document.newPage();
			if(dataCollectionModel.getBottomPerformers()!=null&&dataCollectionModel.getBottomPerformers().size()>0)
			{	
			document.add(topImage);
			}
			document.add(legendImageInstance);
			document.add(mapImage);
			
			
			
		
			
			document.close();
			file = outputPath;
		}

		catch (Exception e) {

			e.printStackTrace();
		}

		return file;
	}

}
