<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%> --%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/tags/form"
	prefix="springForm"%>


<html ng-app="thematicViewApp">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Thematic View</title>
<link rel="icon" href="resources/images/icon.png" type="image/png"
	sizes="16x16">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<link rel="stylesheet" href="resources/css/font-awesome.min.css">
<link rel="stylesheet" href="resources/css/customLoader.css">
<link rel="stylesheet" href="resources/css/bootstrap.min.css">
<!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> -->
<link rel="stylesheet" href="resources/css/bootstrap-select.min.css">
<link rel="stylesheet" href="resources/css/styles.css">

<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<link rel="stylesheet" href="resources/css/jquery-ui.css">

<style>
.table>thead:first-child>tr:first-child>th {
	background-color: #f0b569;
	text-align: center;
	border-right: 2px solid;
	border-right-color: #fff;
	width: 125px !important;
	min-width: 200px;
}
@media(max-width: 786px){
#mymain{
	margin-top: 50px !important;
}
}



</style>

</head>
<body ng-controller="thematicViewController" ng-cloak>
	<jsp:include page="fragments/header.jsp"></jsp:include>


	<div class="pageNameContainer">
		<h4>{{pageName}}</h4>
	</div>
	<div id="mymain" class="container" style="margin-top: 150px;">
		<div class="row report-container">

			<div class="col-md-12 col-sm-12 col-xs-12 text-md-right">
				<div
					class="col-md-3 col-sm-6 col-xs-12 thematic-selection-container">
					
					<div class="select-container text-center ipad-margin">
						<div class="thematic-label">Checklist</div>
						<div class="input-group">
							<input type="text" placeholder="Select Checklist *"
								id="checklist"
								class="form-control not-visible-input inputBackground"
								name="checklist" readonly="" ng-model="selectedCheckList.value">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
									<li ng-repeat="checklist in checkListData | orderBy : 'key'"
										ng-click="selectCheckList(checklist);"><a href="">{{checklist.value}}</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div
					class="col-md-3 col-sm-6 col-xs-12 thematic-selection-container">
					<div class="select-container text-center ipad-margin">
						<div class="thematic-label">Facility Type</div>
						<div class="input-group">
							<input type="text" placeholder="Select Facility Type *"
								id="facilityType"
								class="form-control not-visible-input inputBackground" name=""
								indicator"" readonly="" ng-model="selectedFacilityType.name">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
									<li ng-repeat="facilityType in facilityTypes | orderBy:'orderLevel'"
										ng-click="selectFacilityType(facilityType);"><a href="">{{facilityType.name}}</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div
					class="col-md-3 col-sm-6 col-xs-12 text-md-center thematic-selection-container">
					<div class="select-container text-center ipad-margin">
						<div class="thematic-label">Section</div>
						<div class="input-group">
							<input type="text" placeholder="Select Section *" id="section"
								class="form-control not-visible-input inputBackground"
								name="section" readonly="" ng-model="selectedSection.value">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
									<li ng-repeat="section in sectionList | orderBy : 'name'"
										ng-click="selectSection(section);"><a href="">{{section.value}}</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div
					class="col-md-3 col-sm-6 col-xs-12 text-md-left thematic-selection-container"
					ng-hide="!subSectionList.length && selectedSection">
					<div class="select-container text-center ipad-margin">
						<div class="thematic-label">Subsection</div>
						<div class="input-group">
							<input type="text" placeholder="Select Sub-Section *"
								id="sub-section"
								class="form-control not-visible-input inputBackground"
								name="sub-section" readonly=""
								ng-model="selectedSubSection.value">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
									<li ng-repeat="subsec in subSectionList | orderBy : 'name'"
										ng-click="selectSubSection(subsec);"><a href="">{{subsec.value}}</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				
			</div>
			<div
				class="col-md-12 col-sm-12 col-xs-12 indicator-mob text-md-right">
				<div
					class="col-md-3 col-sm-6 col-xs-12 thematic-selection-container">
					<div class="select-container text-center ipad-margin ">
						<div class="thematic-label">Indicator</div>
						<div class="input-group">
							<input type="text" placeholder="Select Indicator *"
								id="indicator"
								class="form-control not-visible-input inputBackground" name=""
								indicator"" readonly="" ng-model="selectedIndicator.value">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
									<li ng-repeat="indicator in indicatorList"
										ng-click="selectIndicator(indicator);"><a href="">{{indicator.value}}</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div
					class="col-md-3 col-sm-6 col-xs-12 text-md-center thematic-selection-container">
					<div class="select-container text-center ipad-margin">
						<div class="thematic-label">Periodicity</div>
						<div class="input-group">
							<input type="text" placeholder="Select Periodicity *"
								id="quarter"
								class="form-control not-visible-input inputBackground"
								name="quarter" readonly="" ng-model="selectedQuarter.value">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
									<li ng-repeat="quarter in periodicityData"
										ng-click="selectQuarter(quarter);"><a href="">{{quarter.value}}</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div
					class="col-md-3 col-sm-6 col-xs-12 text-md-left thematic-selection-container">
					<div class="select-container text-center ipad-margin">
						<div class="thematic-label">Time Period</div>
						<div class="input-group">
							<input type="text" placeholder="Select Timeperiod *"
								id="timeperiod"
								class="form-control not-visible-input inputBackground"
								name="timeperiod" readonly=""
								ng-model="selectedTimeperiod.value">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
									<li ng-repeat="time in timePeriodData"
										ng-click="selectTimeperiod(time)"><a href="">{{time.value}}</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-12 col-sm-12 col-xs-12 text-md-right">
				<div class="col-md-3 col-sm-6 col-xs-12 text-md-left thematic-selection-container">
								<div class="select-container text-center ipad-margin">
									<div class="thematic-label">State</div>
									<div class="input-group">
										<input type="text" placeholder="Select State" id="state"
											class="form-control not-visible-input inputBackground"
											name="timeperiod" readonly="" ng-model="selectedState.name">
										<div class="input-group-btn" style="position: relative;">
											<button type="button"
												ng-disabled="!(selectedSection && (selectedSubSection || !subSectionList.length) && selectedIndicator && selectedQuarter && selectedTimeperiod)"
												class="btn btn-danger dropdown-toggle user-button"
												data-toggle="dropdown">
												<span class="caret"></span>
											</button>
											<ul class="dropdown-menu state-dropdown" role="menu">
												<li ng-repeat="state in stateList | orderBy : 'name'"
													ng-click="selectState(state)"><a href="">{{state.name}}</a></li>
											</ul>
										</div>
									</div>
								</div>
							</div>
				<div ng-show="selectedState.area_nid_pk != 1 || selectedState.children.length" class="col-md-3 col-sm-6 col-xs-12 text-md-left thematic-selection-container">
								<div class="select-container text-center ipad-margin">
									<div class="thematic-label">District</div>
									<div class="input-group">
										<input type="text" placeholder="Select District" id="district"
											class="form-control not-visible-input inputBackground"
											name="timeperiod" readonly="" ng-model="selectedDistrict.name">
										<div class="input-group-btn" style="position: relative;">
											<button type="button"
												ng-disabled="!(selectedSection && (selectedSubSection || !subSectionList.length) && selectedIndicator && selectedQuarter && selectedTimeperiod)"
												class="btn btn-danger dropdown-toggle user-button"
												data-toggle="dropdown">
												<span class="caret"></span>
											</button>
											<ul class="dropdown-menu state-dropdown" role="menu">
												<li ng-repeat="district in selectedState.children | orderBy : 'name'"
													ng-click="selectDistrict(district)"><a href="">{{district.name}}</a></li>
											</ul>
										</div>
									</div>
								</div>
							</div>
			</div>
			

		</div>
		<div class="row">
				<div class="col-md-12">
					<img ng-click="exportTableData('dataTable')"
						ng-show="thematicData.length" class="excelbtn-img-thematic"
						data-toggle="tooltip" title="Download table in Excel" data-placement="top"
						src="resources/images/icon_download_excel.svg">
				</div>
				<img class="plan-separator"
					src="resources/images/horizontal_separator_yellow_svg_1.svg">


			</div>
		<h3 class="text-center" ng-show="thematicData.length ==0">No records </h3>
		<div class="row thematic-table-margin"
			ng-show="thematicData.length !=0">
			<div class="table-responsive header-fixed-table thematic-table"
				style="width: 100%; max-height: 480px; margin-bottom: 80px;">
				<table items="thematicData" show-filter="true" cellpadding="0"
					cellspacing="0" border="0" class="dataTable table table-striped"
					id="dataTable">
					<thead>
						<tr>
							<th class="deg-mgmt-table-head" nowrap
								ng-repeat="column in columns">{{column}}
								<div class="sorting1" ng-click="order(column);">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"></i> <i
										class="fa fa-caret-down fa-lg dsc connect-sort thematic-sort-down"
										aria-hidden="true"></i>
								</div>
							</th>
						</tr>
					</thead>

					<tbody>
						<tr
							ng-repeat="rowData in thematicData | orderBy:filterType:sortReverse">
							<td class="pdsa-table" ng-repeat="column in columns">
								{{rowData[column] == undefined ? '-': rowData[column]}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Map loading portion -->
			<div class="row">
				<div class="col-md-12 text-right">
					<div class="showMap" ng-show="!mapShown" ng-click="showHideMap(true)">Show Map</div>
					<div class="hideMap" ng-show="mapShown" ng-click="showHideMap(false)">Hide Map</div>
					<div class="pdfBtnforTrend" ng-show="mapShown && selectedState && utdata.dataCollection.length" id="trendPdfButton"> 
										<button type="button" id="pdfDownloadBtn" style="margin-bottom: 0;"
											class="btn btn-link exporttoxl pdfdownloadTrend"
											title="Download PDF for Trend Chart of selected District"
											ng-click="sdrc_export()" >
											
											<i class="fa fa-file-pdf-o"></i>
										</button></div>
				</div>
				<img class="plan-separator" style="margin-top: 0;"
					src="resources/images/horizontal_separator_yellow_svg_1.svg">


			</div>
		<div class="row thematicMapSection" ng-class="{'hiddenMap': !mapShown}">
			<div
				class="col-md-12 col-sm-12 col-xs-12 text-left thematic-map-margin">
				<div class="row">
				<div class="col-md-12">
						<h5 class="theatic-indicator-title">{{selectedIndicator.value}}</h5>
					</div>
					</div>
				<div id="mapcontainerId" class="container-fluid thematic-map-container">
					<!---- loading portion -------->
					<div class="map_popover">
						<div class="map_popover_close"></div>
						<div class="map_popover_content"></div>
					</div>
					<!-- Map loading portion -->
					
					<div id="thematicMapBg"thematic-map-margin">

						<samiksha-map></samiksha-map>
						<!---- End of map loading portion -------->
					</div>

				</div>


				<div class="thematic_chart thmtic-line-chart" ng-show="thmtc_chrt" id="trendDiv">
					<button type="button" class="close close-hover"
						ng-click="thematic_close()">&times;</button>
					<div class="line_legends" id="map_line_legend">
						<ul class="map_line_legend">
							<li>
								<div class="linechart_legends_high"></div><span class="linechart_text">Highest</span>
							</li>
							<li>
								<div class="linechart_legends"></div><span class="linechart_text">{{selectedTrendArea}}</span>
							</li>
							<li>
								<div class="linechart_legends_low"></div><span class="linechart_text">Lowest</span>
							</li>
							<li>
								<div class="pdfBtnforTrend" id="trendPdfButton" style="margin-right: 30px;"> 
										<button type="button" id="pdfDownloadBtnForIndex"
											class="col-md-2 btn btn-link exporttoxl pdfdownloadTrend"
											title="Download PDF for Trend Chart of selected District"
											ng-click="sdrc_export()" >
											<i class="fa fa-download"></i>
										</button></div>
								</div>
							</li>
						</ul>
						
					<thematic-line-chart id='lineChart' dataprovider="lineChartData"></thematic-line-chart>
				</div>

				<section id="legendsection" class="legends">

				<div class="direction">
						<img class="img-responsive" src="resources/images/north_arrow_new.png">
					</div>
					<h4 class="legend-heading">LEGEND</h4>
					<ul>
					 <li ng-repeat="legend in legends" class="legend_list"><div
							class="{{legend.value}} legnedblock"> </div><span
							class="legend_key">{{legend.key}}</span><span ng-if="legend.value != 'fourthslices' && selectedState" class="legend-count"> (<span class="legend-count-color {{legend.value}}">{{legend.legendCount}}</span>)</span> </li> </ul>
					</section>
					<section id="tbsection" class="legends-left" ng-show="topPerformer[0] && bottomPerformer[0]">
					<ul class="top-performer">
					<li class="legend-li">
						<div>
							<h5 class="legend_text">
								<strong>Highest&nbsp;:&nbsp;</strong><span
									class="thematic-top-per">{{topPerformer[0]}}</span>
							</h5>
						</div>
					</li>
					<li class="legend-li">
						<div>
							<h5 class="legend_text">
								<strong>Lowest&nbsp;:&nbsp;</strong><span
									class="thematic-bottom-per">{{bottomPerformer[0]}}</span>
							</h5>
						</div>
					</li>

				</ul>
				</section>
			</div>


			

		</div>
		

	</div>

	<div id="thematicNoTableData" class="modal fade" role="dialog"
		data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog plan-warn">
			Modal content
			<div class="modal-content plan-modal">
				<div class="modal-body text-center" style="padding: 0px !important;">
					<div class="warnhead">
						<img alt=""
							src="resources/images/icons/Messages_warning_caution_icon.svg"
							style="width: 25px; margin-top: -5px;"> INFO
					</div>
					<div class="planwarnbody">{{conformationmsg}}</div>
					<button type="button" class="btn errorOk" data-dismiss="modal"
						style="margin-bottom: 20px;">Ok</button>
				</div>
			</div>
		</div>
	</div>

	<div id="errorMessage" class="modal fade" role="dialog"
		data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<!-- Modal content -->
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class="errorhead">
						<img alt=""
							src="resources/images/icons/Messages_warning_caution_icon.svg"
							style="width: 25px; margin-top: -5px;">&nbsp; ERROR
					</div>
					<div class="errorbody">{{errorMsg}}</div>
					<button type="button" class="btn errorOk" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<div id="pop2" class="modal fade" role="dialog" data-backdrop="static"
		data-keyboard="false">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class="successhead1">
						<img alt="" src="resources/images/icons/Messages_success_icon.svg"
							style="width: 25px; margin-top: -5px;">&nbsp;SUCCESS
					</div>
					<div class="successbody">{{msg}}</div>
					<a class="btn btn-default" data-dismiss="modal">Ok</a>
				</div>
			</div>
		</div>
	</div>



	<jsp:include page="fragments/footer.jsp"></jsp:include>
	<script type="text/javascript" src="resources/js/topojson.v1.min.js"></script>
	<script src="resources/js/jquery-ui.js"></script>
	<script
		src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
	<script src="resources/js/angular.js"></script>

	<script
		src='https://maps.googleapis.com/maps/api/js?key=AIzaSyDCAt2fOQ7y1wujCYU8oDe31S4mGj4jMz4'></script>

	<script src="resources/js/lodash.min.js" type="text/javascript"></script>
	<script src="resources/js/angular-google-maps.min.js"></script>
	<script type="text/javascript"
		src="resources/js/controllers/thematicViewController.js"></script>
	<script type="text/javascript" src="resources/js/d3.v3.min.js"></script>
		<script src="resources/js/html2canvas.js"></script>
		<script type="text/javascript" src="resources/js/sdrc.export.js"></script>
	<!-- <script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script> -->

	<script type="text/javascript">
		var app = angular.module("thematicViewApp", [ 'google-maps' ]);
		var myAppConstructor = angular.module("thematicViewApp");
		myAppConstructor.controller("thematicViewController",
				thematicViewController);
	</script>

	<script type="text/javascript"
		src="resources/js/angularDirective/thematic.directive.js"></script>
	<script type="text/javascript"
		src="resources/js/angularDirective/directive.js"></script>
	<script type="text/javascript"
		src="resources/js/angularDirective/dynamicTableHeaderFix.js"></script>
	<!-- <script type="text/javascript">
	$('.thematic-table').scroll(function () {
        if ($(this).scrollTop() > 10) {
            $('.sorting1').css('display','none');
        } else {
        	 $('.sorting1').css('display','block');
        }
    });
	
	</script> -->
	<script type="text/javascript">
		$(document).ready(function() {
			$(".thematic-view").addClass('active');
			sdrc_export.export_pdf("", "pdfDownloadBtn");
			sdrc_export.export_pdfLine("","pdfDownloadBtnForIndex");
		});
	</script>


</body>
</html>