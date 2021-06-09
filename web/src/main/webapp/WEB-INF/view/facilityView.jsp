<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%> --%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/tags/form"
	prefix="springForm"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Facility View</title>

<link rel="icon" href="resources/images/icon.png" type="image/png"
	sizes="16x16">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<link rel="stylesheet" href="resources/css/font-awesome.min.css">
<link rel="stylesheet" href="resources/css/customLoader.css">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
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
}
#ui-id-1{
    height: 150px;
    overflow-y: scroll;
    font-size: 12px;
    color: #5f5c5c;
}
#ui-id-1 li:hover {
   background-color: #333a3b !important;
}
/*** Hide the close(x) button from InfoBox Window in Google Map ***/
.gm-style-iw + div{ 
	display: none;
}
@media (max-width: 1024px){
.open ul.dropdown-menu {
    left: 0px !important;
}
}
@media ( max-width :768px) {
.sector-drop-down {
	width: 178px !important;
    margin-left: -143px ;
 }
}
@media (max-width: 360px){
.sector-drop-down {
	margin-left: -126px !important;
 }
 .open ul.dropdown-menu {
    left: auto !important;
 }
}
@media ( max-width : 1024px) and  ( max-height : 768px) {
.sector-drop-down {
	margin-left: -195px;
 }
}
@media (max-width: 480px) and (min-width: 320px){
 .open ul.dropdown-menu, .state-dropdown {
    min-width: 177px;
 }
}
</style>
</head>

<body ng-app="facilityViewApp" ng-controller="facilityViewController"
	ng-cloak>
	<jsp:include page="fragments/header.jsp"></jsp:include>
	<div class="pageNameContainer">
		<h4>{{pageName}}</h4>
	</div>
	<div class="container facility-container">

			<div class="container">
				<div class="row">

					<div class="col-md-12 faci-paddng">
						<div class="row selection-bar">
							<div class="col-md-3 col-sm-6 col-xs-12 indicator-mob"
								id="pushpin-count">
								<div class="facility-labels">Checklist Type</div>
								<div class="select-container text-center faci-mrng">
									<div class="input-group">
										<input type="text" placeholder="Select Checklist Type"
											id="checklist" class="form-control not-visible-input"
											name="checklist" readonly="" ng-model="selectedList.value">
										<div class="input-group-btn" style="position: relative;">
											<button data-toggle="dropdown"
												class="btn btn-facility dropdown-toggle" type="button" >
												<span class="caret"></span>
											</button>
											<ul class="dropdown-menu sector-drop-down" role="menu">
												<li ng-repeat="list in listDetails | orderBy: 'key' "
													ng-click="selectCheckList(list);">{{list.value}}</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div class="col-md-3 col-sm-6 col-xs-12 indicator-mob"
								ng-disabled="selectedSector.key == 1 ? true:false">
								<div class="facility-label">Facility Type</div>
								<div class="select-container text-center">
									<div class="input-group">
										<input type="text" placeholder="Select Facility Type"
											id="ftype" class="form-control not-visible-input"
											name="ftype" readonly=""
											ng-model="selectedFacilityType.value">
										<div class="input-group-btn" style="position: relative;">
											<button data-toggle="dropdown"
												class="btn btn-facility dropdown-toggle" type="button">
												<span class="caret"></span>
											</button>
											<ul class="dropdown-menu sector-drop-down" role="menu">
												<li ng-repeat="type in facilityTypeDetails | orderBy: 'orderLevel' "
													ng-click="selectFacilityType(type);">{{type.value}}</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div class="col-md-3 col-sm-6 col-xs-12 indicator-mob">
							<div class="facility-label">Section</div>
								<div class="select-container text-center">
									<div class="input-group">
										<input type="text" placeholder="Select Section" id="section"
											class="form-control not-visible-input" name="section"
											readonly="" ng-model="selectedSection.value"
											data-toggle="tooltip" data-original-title=""
											data-placement="bottom">
										<div class="input-group-btn" style="position: relative;">
											<button data-toggle="dropdown"
												class="btn btn-facility dropdown-toggle" type="button">
												<span class="caret"></span>
											</button>
											<ul class="dropdown-menu sector-drop-down" role="menu">
												<li ng-repeat="section in sectionData"
													ng-click="selectSection(section);">{{section.value}}</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div class="col-md-3 col-sm-6 col-xs-12 indicator-mob">
							<div class="facility-label">Sub Section</div>
								<div class="select-container text-center">
									<div class="input-group">
										<input type="text" placeholder="Select Sub-Section"
											id="subSec" class="form-control not-visible-input"
											name="subSec" readonly="" ng-model="selectedSubSection.value">
										<div class="input-group-btn" style="position: relative;">
											<button data-toggle="dropdown"
												class="btn btn-facility dropdown-toggle" type="button">
												<span class="caret"></span>
											</button>
											<ul class="dropdown-menu sector-drop-down" role="menu">
												<li ng-repeat="sub in subSectionData"
													ng-click="selectSubSection(sub);">{{sub.value}}</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						   <div class="col-md-3 col-sm-6 col-xs-12 indicator-mob" 
							style="margin-top: 20px;">
							<div class="facility-labels">State</div>
							<div class="select-container text-center faci-mrng">
								<div class="input-group">
									<input type="text" placeholder="State" id="state"
										class="form-control not-visible-input" name="indicator"
										readonly="" ng-model="selectedState.name">
									<div class="input-group-btn" style="position: relative;">
										<button data-toggle="dropdown"
											class="btn btn-facility dropdown-toggle" type="button">
											<span class="caret"></span>
										</button>
										<ul class="dropdown-menu sector-drop-down" role="menu">
											<li ng-repeat="state in stateList | orderBy: 'name'"
												ng-click="selectState(state)">{{state.name}}</li>
										</ul>
									</div>
								</div>
							</div>
						 </div>
						<div class="col-md-3 col-sm-6 col-xs-12 indicator-mob"
							style="margin-top: 20px;">
							<div class="facility-label">District</div>
							<div class="select-container text-center">
								<div class="input-group">
									<input type="text" placeholder="District" id="timeperiod"
										class="form-control not-visible-input" name="indicator"
										readonly="" ng-model="selectedDist.name">
									<div class="input-group-btn" style="position: relative;">
										<button data-toggle="dropdown"
											class="btn btn-facility dropdown-toggle" type="button">
											<span class="caret"></span>
										</button>
										<ul class="dropdown-menu sector-drop-down" role="menu">
											<li ng-repeat="dist in districtList | orderBy: 'name'"
												ng-click="selectDistrict(dist);">{{dist.name}}</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-3 col-sm-6 col-xs-12 indicator-mob"
							style="margin-top: 20px;">
							<div class="facility-label">Block</div>
							<div class="select-container text-center">
								<div class="input-group">
									<input type="text" placeholder="Block" id="timeperiod"
										class="form-control not-visible-input" name="indicator"
										readonly="" ng-model="selectedBlock.name">
									<div class="input-group-btn" style="position: relative;">
										<button data-toggle="dropdown"
											class="btn btn-facility dropdown-toggle" type="button">
											<span class="caret"></span>
										</button>
										<ul class="dropdown-menu sector-drop-down" role="menu">
											<li ng-repeat="blk in blockList" ng-click="selectBlock(blk);">{{blk.name}}</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-3 col-sm-6 col-xs-12 indicator-mob" style="margin-top: 20px;"
								ng-disabled="selectedSector.key == 1 ? true:false">
								<div class="facility-label">Time Period</div>
								<div class="select-container text-center">
									<div class="input-group">
										<input type="text" placeholder="Select Time-Period"
											id="timeperiod" class="form-control not-visible-input"
											name="timeperiod" readonly=""
											ng-model="selectedPeriod.timePeriod">
										<div class="input-group-btn" style="position: relative;">
											<button data-toggle="dropdown"
												class="btn btn-facility dropdown-toggle" type="button">
												<span class="caret"></span>
											</button>
											<ul class="dropdown-menu sector-drop-down" role="menu">
												<li ng-repeat="time in dashTimeData"
													ng-click="selectTimePeriod(time);">{{time.timePeriod}}</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row note-head">Note: Please select state, district and block to generate map view of facilities (Not
applicable for block level users)</div>
				<img ng-click="exportTableData('dataTable')" class="excelbtn-img"
						 title="Download Excel" data-placement="top"
						 src="resources/images/icon_download_excel.svg" ng-if="isEmpty==false">
				<div class="row tabl-top" ng-show="tabldata">
				<div class="table-responsive header-fixed-table thematic-table all-table-height"
						tabledata="tableData" style="width: 99%;">
				<table items="tableData" show-filter="true" cellpadding="0"
					cellspacing="0" border="0" class="dataTable table table-striped "
					id="dataTable">
					<thead>
						<tr>
						 <th class="deg-mgmt-table-head" nowrap ng-repeat="column in columns">
							<i ng-if="$index!=0" class="fa fa-info-circle" data-toggle="tooltip" data-html="true" title="No metadata available" data-placement="left" style="cursor: pointer; position:relative;"></i>&nbsp;{{column}}
							<div class="sorting1" ng-click="order(column)">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != column &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == column &&  sortReverse == false}"></i>
							</div>
						 </th>
						</tr>
					</thead>

					<tbody>
						<tr
							ng-repeat="rowData in tableData | orderBy:filterType:sortReverse">
							<td class="pdsa-table" ng-repeat="column in columns" ><!-- {{rowData[column]}}	 -->						
								{{!rowData[column] ? '-': rowData[column]}} </td>
						</tr>
					</tbody>
				</table>
			</div>
			</div> 
			<div class="row" style="position:relative;">
			<img class="fac-line"
						src="resources/images/horizontal_separator_yellow_svg_1.svg" ng-if="selectedBlock">
			<button id="buttonsubmit" class="btn btn-info mapview-btn" ng-show="selectedBlock && !showingMap" ng-click="showHideMap(true)">Show Map</button>
			<button id="buttonsubmit" class="btn btn-info mapview-btn" ng-show="selectedBlock && showingMap" ng-click="showHideMap(false)">Hide Map</button>
			</div>	
				<div class="row">
					<div class="facility_gMap" ng-class="{'show-map-height' : !(selectedBlock && showingMap)}">

						<section class="searchFacilityView">
						<div class="select-container text-center fac-search">
							<div class="input-group">
								<input type="text" placeholder="Search Facility"
									id="searchDashboard" class="form-control not-visible-input"
									name="searchFacility" ng-model="pushpinFilterWord"
									ng-keyup="searchNodeDashboard()">
								<div class="input-group-btn">
									<button data-toggle="dropdown" class="btn" type="button" style="padding: 8px 10px;">
										<i class="fa fa-search"></i>
									</button>
								</div>
							</div>
						</div>
						</section>
						
						<google-map center="map.center" zoom="map.zoom" draggable="true">
						<polygon static="true" ng-if="selectedState.areaNId == polygon.id" ng-repeat="polygon in map.polygons" ng-model="polygon" path="polygon.path"
							stroke="polygon.stroke" visible="polygon.visible"
							geodesic="polygon.geodesic" fill="polygon.fill" fit="false"
							editable="polygon.editable" draggable="polygon.draggable">
						</polygon> <markers class="pushpin" icon="'icon'" models="map.markers"
							coords="'self'" events="map.events"> <windows
							show="'showWindow'"  options='pixelOffset' ng-cloak>
						<p ng-non-bindable style="width: 150px; text-align: center;">
							{{facilityName}}
						</p>
						</windows> </markers> </google-map>
						
						<section class="fac_legends">
						<ul>
							<li class="fac_legend_list">
								<h4>Overall Score</h4>
							</li>
							<li class="fac_legend_list ng-scope"> <span
								class="fstslices fac_legnedblock"> </span>
								<span class="fac_legend_key">Above 75</span> (<span
									  style="color: green;">{{greenMarkers}}</span>)</li>

							<li class="fac_legend_list">
								<span class="scndslices fac_legnedblock"> </span>
								<span class="fac_legend_key ">50-75</span> (<span
									  style="color: orange;">{{orangeMarkers}}</span>)</li>

							<li class="fac_legend_list">
							 <span class="thrdslices fac_legnedblock"> </span>
							 <span class="fac_legend_key">Below	50</span> (<span
								   style="color: red;">{{redMarkers}}</span>)</li>
						</ul>
						</section>
					</div>
					
					<div class="chart-head col-sm-5 col-xs-12">
						<!-- <h5 class="text-center" style="display: inline-block;">
							{{selectedState.name}} &nbsp; &#x3e; &nbsp; Quater &nbsp; &#x3e;
							&nbsp; {{selectedPeriod.timePeriod}}</h5> -->
					</div>
				</div>
											
				
			<div id="facilityActionTable" class="modal fade report-data-modal" role="dialog"
			data-backdrop="static" data-keyboard="false">
			<div class="modal-dialog">
				<!-- Modal content -->
				<div class="modal-content">
					<div class="modal-body modal-body-padding">
						<button type="button" class="close close-indicator"
							data-dismiss="modal" style="display: block !important;">×</button>
						<div style="margin-bottom: 20px;">
						<div class="report-modal-title text-md-left">
								Score Overview
								</div>
							<div
								class="col-md-12 col-xs-12 col-sm-12 report-search-modal report-padding">
								<div class="col-md-6 col-xs-12 text-md-left text-xs-left">
									<h5 class="left-margin-search" style="font-weight: bold;">Data
										Search Result</h5>
								</div>

								<div class="col-md-6 col-xs-12 text-right">
									<img ng-click="exportTableData('community-action-table', pushPinFacility, selectedBlock.name)"
										class="excelbtn-img"
										title="Download Excel" data-placement="top"
										src="resources/images/icon_download_excel.svg">
									<section class="searchFacility temp-margin serch_area">
									<div class="select-container text-center"
										style="margin: 0px">
										<div class="input-group" style="margin: auto;">
											<input type="text" placeholder="Search the section below"
												ng-change="filterData(facilityTableFilterWord)" id="searchDashboard"
												class="form-control not-visible-input ui-autocomplete-input ng-valid ng-dirty"
												name="searchFacility" ng-model="facilityTableFilterWord"
												autocomplete="off" style="">
											<div class="input-group-btn" style="position: relative;">
												<button data-toggle="dropdown" class="btn btn-color"
													style="padding: 9px 12px;!important;" type="button">
													<i class="fa fa-search"></i>
												</button>
											</div>
										</div>
									</div>
									</section>
								</div>
							</div>
							<div
								class="col-md-12 col-xs-12 col-sm-12 text-center plan-modal-block">
								<h5 class="">
								<strong>State Name :</strong> {{selectedState.name}} &nbsp;&nbsp;
									<strong>District Name :</strong> {{selectedDist.name}} &nbsp;&nbsp; <strong>Block
										Name : </strong>{{selectedBlock.name}} &nbsp;&nbsp; <strong>Facility
										 Name :</strong> {{pushPinFacility}}
								</h5>
							</div>
						</div>
						<div class="report-modal-table" ng-show="facilityActionData.length>0">
						<div
							class="tableMargin table-responsive community-action-table header-fixed-table all-table-height"
							style="width: 100%; overflow: auto;"
							report-table-header-fix tableuniqueclass="'community-action-table'"
							tabledata="mapColumn"
							>
							<table items="tableData" show-filter="true" cellpadding="0"
								cellspacing="0" border="0"
								class="dataTable table  table-striped report"
								id="community-action-table">
								<thead>
									<tr>
										
										<th style="position: relative;" class="deg-mgmt-table-head" ng-repeat="coloumn in mapColumn ">{{coloumn}}
										</th>
										
									</tr>
								</thead>
								<tbody>
									<tr
										ng-repeat="rowData in facilityActionData | orderBy:filterType1:sortReverse1 | filter:facilityTableFilterWord">
							
								<td class="pdsa-table"  sortable="coloumn" ng-repeat="coloumn in mapColumn"
								>
								{{rowData[coloumn]}}</td>
									</tr>
								</tbody>
							</table>
							<div class="col-md-12 text-center" id="no-result"
								style="font-weight: bold; font-size: 24px; margin-top: 40px;"
								ng-show="(facilityActionData|filter:facilityTableFilterWord).length==0 && facilityActionData.length != 0">
								No Data Available</div>
						</div>
						</div>
					</div>
				</div>
			</div>
		</div>

			</div>

			<div id="facilityNoTableData" class="modal fade" role="dialog"
				data-backdrop="static" data-keyboard="false">
				<div class="modal-dialog fac-warn" style="width: 450px;">
					<div class="modal-content plan-modal">
						<div class="modal-body text-center"
							style="padding: 0px !important;">
							<div class="infohead">
								<img alt=""
									src="resources/images/icons/Messages_info_icon.svg"
									style="width: 25px; margin-top: -5px;"> INFO
							</div>
							<div class="planwarnbody">{{conformationmsg}}</div>
							<button type="button" class="btn errorOk" data-dismiss="modal"
							 style="margin-bottom: 20px;">Ok</button>							
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
	<jsp:include page="fragments/footer.jsp"></jsp:include>
	<script src="resources/js/jquery-ui.js"></script>
	<script
		src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
	<script data-require="moment.js@2.10.2" data-semver="2.10.2"
		src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script>
	<script src="resources/js/angular.min.js"></script>
	<script src="resources/js/dataTable.js"></script>

	<script
		src='https://maps.googleapis.com/maps/api/js?key=AIzaSyDCAt2fOQ7y1wujCYU8oDe31S4mGj4jMz4'></script>

	<script src="resources/js/lodash.min.js" type="text/javascript"></script>
	<script src='resources/js/angular-google-maps.min.js'></script>
	<script type="text/javascript"
		src="resources/js/controllers/facilityViewController.js"></script>

	<script type="text/javascript">
		var app = angular.module("facilityViewApp", [ 'google-maps' ]);
		var myAppConstructor = angular.module("facilityViewApp");
		myAppConstructor.controller("facilityViewController",facilityViewController);
	</script>

	<script type="text/javascript"
		src="resources/js/angularDirective/directive.js"></script>
	<script type="text/javascript"
		src="resources/js/allIndiaPolygons.js"></script>

	<script type="text/javascript">
		$(document).ready(function() {
			$(".facility-view").addClass('active');
		});
	</script>
	<script type="text/javascript">
	$('.thematic-table').scroll(function () {
        if ($(this).scrollTop() > 10) {
            $('.sorting1').css('display','none');
        } else {
        	 $('.sorting1').css('display','block');
        }
    });
	
	</script>
</body>
</html>