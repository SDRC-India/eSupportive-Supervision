<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/tags/form"
	prefix="springForm"%>


<html ng-app="monitoringReportFacilityApp">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Monitoring Report</title>
<link rel="icon" href="resources/images/icon.png" type="image/png"
	sizes="16x16">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<link rel="stylesheet" href="resources/css/font-awesome.min.css">
<link rel="stylesheet" href="resources/css/customLoader.css">
<link rel="stylesheet" href="resources/css/bootstrap.min.css">
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
.calender-icon {
    position: absolute;
    right: 7px;
    /* left: 249px; */
    margin-top: -8px;
    /* margin-left: 221px; */
    cursor: pointer;
    font-size: 16px;
}
@media ( max-width : 786px) {
	#mymain {
		margin-top: 50px !important;
	}
}
</style>
</head>
<body ng-controller="MonitoringReportFacilityController" ng-cloak>
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
						<div class="thematic-label">State :</div>
						<div class="input-group">
							<input type="text" placeholder="Select State" id="state"
								class="form-control not-visible-input inputBackground"
								name="timeperiod" readonly="" ng-model="selectedState.name">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
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

				<div
					class="col-md-3 col-sm-6 col-xs-12 thematic-selection-container">
					<div class="select-container text-center ipad-margin">
						<div class="thematic-label">District :</div>
						<div class="input-group">
							<input type="text" placeholder="Select District" id="district"
								class="form-control not-visible-input inputBackground"
								name="timeperiod" readonly="" ng-model="selectedDistrict.name">
							<div class="input-group-btn" style="position: relative;">
								<button type="button" ng-disabled="!(selectedState.area_nid_pk != 1 || selectedState.children.length)"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
									<li
										ng-repeat="district in selectedState.children | orderBy : 'name'"
										ng-click="selectDistrict(district)"><a href="">{{district.name}}</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div
					
					class="col-md-3 col-sm-6 col-xs-12 thematic-selection-container">
					<div class="select-container text-center ipad-margin">
						<div class="thematic-label">Block :</div>
						<div class="input-group">
							<input type="text" placeholder="Select Block" id="district"
								class="form-control not-visible-input inputBackground"
								name="timeperiod" readonly ng-model="selectedBlock.name">
							<div class="input-group-btn" style="position: relative;">
								<button type="button" ng-disabled="!selectedDistrict.children.length"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
									<li
										ng-repeat="block in selectedDistrict.children | orderBy : 'name'"
										ng-click="selectBlock(block)"><a href="">{{block.name}}</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				class="col-md-12 col-sm-12 col-xs-12 indicator-mob text-md-right">
				
				<!-- <div
					class="col-md-3 col-sm-6 col-xs-12 text-md-center thematic-selection-container">
					<div class="select-container text-center ipad-margin">
						<div class="thematic-label">Periodicity :</div>
						<div class="input-group">
							<input type="text" placeholder="Select Periodicity *"
								id="quarter"
								class="form-control not-visible-input inputBackground"
								name="quarter" readonly="" ng-model="selectedQuarter.periodicityName">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
									<li ng-repeat="quarter in periodicityList | orderBy:'periodicityName'"
										ng-click="selectQuarter(quarter);"><a href="">{{quarter.periodicityName}}</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div> -->
				<div class="col-md-3 col-sm-6 col-xs-12 indicator-mob">
								
								<div class="select-container text-center">
									<div class="thematic-label">Facility Type : </div>
									<div class="input-group">
										<input type="text" placeholder="Select Facility Type *"
											id="ftype" class="form-control inputBackground  not-visible-input"
											name="ftype" readonly=""
											ng-model="selectedFacilityType.value">
										<div class="input-group-btn" style="position: relative;">
											<button data-toggle="dropdown"
												class="btn btn-danger dropdown-toggle user-button" type="button">
												<span class="caret"></span>
											</button>
											<ul class="dropdown-menu sector-drop-down" role="menu">
												<li ng-show="!(selectedBlock && selectedBlock.name != 'All' && type.id == 105)" ng-repeat="type in facilityTypes | orderBy: 'orderLevel' "
													ng-click="selectFacilityType(type);">{{type.value}}</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
				<div class="col-md-3 col-sm-6 col-xs-12 text-md-center thematic-selection-container">
					<div class="select-container text-center ipad-margin">
						<div class="thematic-label">From :</div>
						<div class="input-group">
							<input type="text" placeholder="Select Date *"
								id="fromDate"
								class="form-control not-visible-input inputBackground"
								name="fromDate" readonly="" disabled="true"
								ng-model="selectedFromDate">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle calender-btn1 user-button"
									data-toggle="dropdown">
									<i id="calenderIcon" class="fa fa-calendar fa-2x calender-icon" aria-hidden="true"></i>
								</button>
								
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-3 col-sm-6 col-xs-12 text-md-center thematic-selection-container">
					<div class="select-container text-center ipad-margin">
						<div class="thematic-label">To :</div>
						<div class="input-group">
							<input type="text" placeholder="Select Date *"
								id="toDate"
								class="form-control not-visible-input inputBackground"
								name="toDate" readonly="" disabled="true"
								ng-model="selectedToDate">
							<div class="input-group-btn" style="position: relative;">
								<button type="button" ng-disabled="!selectedFromDate"
									class="btn btn-danger dropdown-toggle calender-btn2 user-button"
									data-toggle="dropdown">
									<i id="calenderIcon" class="fa fa-calendar fa-2x calender-icon" aria-hidden="true"></i>
								</button>
								
							</div>
						</div>
					</div>
				</div>

				
				
				<div class="col-md-3 text-left">
					<button class="btn btn-primary input-lg submit-monitoring-report"
						id="uploadsalfile1" type="button" ng-click="validateInput()">Submit</button>
				</div>

			</div>
		</div>
	</div>
	<div class="container">
	<div class="row" ng-show="data.length">
			<div
				class="col-md-12 col-xs-12 col-sm-12 report-search report-padding">
				<div class="col-md-2 col-xs-6 col-sm-2">
					<h5 style="font-weight: bold;">Data
						Search Result</h5>
				</div>
				
				<div class="col-md-6 col-md-offset-4 col-xs-12 col-sm-6 text-right actual-search search-section-planact">
					<img ng-click="exportTableData('dataTable')" class="excelbtn-img"
						data-toggle="tooltip" title="Download Excel" data-placement="top"
						 src="resources/images/icon_download_excel.svg">
					<section class="searchFacility temp-margin">
					<div class="select-container text-center"
						style="margin: 0 !important;">
						<div class="input-group" style="margin: auto;">
							<input type="text" placeholder="Search the section below" id="searchTable"
								ng-change="filterData(tableFilterWord)"
								class="form-control not-visible-input ui-autocomplete-input ng-valid ng-dirty"
								name="searchTable" ng-model="tableFilterWord">
							<div class="input-group-btn" style="position: relative;">
								<button data-toggle="dropdown" class="btn btn-color"
									ng-click="search(tableFilterWord)"
									style="padding: 9px 12px;!important;" type="button">
									<i class="fa fa-search"></i>
								</button>
							</div>
						</div>
					</div>
					</section>
				</div>
			</div>
		</div>
	<div class="row" style="margin-top: 40px; margin-bottom: 70px;" ng-show="data.length">

			<!-- <div class="table-responsive header-fixed-table plan-actual-table monitoring-facility-table table-height-all all-table-height" sdrc-table-header-fix tableuniqueclass="'monitoring-facility-table'" tabledata="data"> -->
			<div class="table-responsive header-fixed-table monitoring-facility-table table-height-all all-table-height"
							style="width: 100%; overflow: auto;"
							tableuniqueclass="'monitoring-facility-table'"
							tabledata="data">
			<table items="tabledata" show-filter="true" cellpadding="0" 
					cellspacing="0" border="0" class="dataTable table table-striped"
					id="dataTable">
					<thead>
						<tr>
							<th class="deg-mgmt-table-head" nowrap
								style="font-size: 14px; font-weight: bold; width: 20%; vertical-align: middle;"
								>Sl No.
							</th>

							<th class="deg-mgmt-table-head" nowrap
								style="font-size: 14px; font-weight: bold; width: 20%; vertical-align: middle;"
								>Area
								<div class="sorting1" ng-click="order('areaName')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'areaName' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'areaName' &&  sortReverse == false}"></i>
								</div>
							</th>

							<th class="deg-mgmt-table-head" nowrap
								style="font-size: 14px; font-weight: bold; width: 20%; vertical-align: middle;"
								>Total No of Facilities 
								
								<div class="sorting1" ng-click="order('totalFacilities')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'totalFacilities' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'totalFacilities' &&  sortReverse == false}"></i>
								</div>
							</th>
							
							<th class="deg-mgmt-table-head visit-column" nowrap>
								Total Visits
								<div class="sorting1" ng-click="order('totalFacilityVisits')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'totalFacilityVisits' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'totalFacilityVisits' &&  sortReverse == false}"></i>
								</div>
							</th>
							
							<th class="deg-mgmt-table-head visit-column" nowrap>
								Unique Visits
								<div class="sorting1" ng-click="order('uniqueFacilityVisits')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'uniqueFacilityVisits' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'uniqueFacilityVisits' &&  sortReverse == false}"></i>
								</div>
							</th>
							
							<th class="deg-mgmt-table-head visit-column" nowrap>
								Unsupervised Facility
								<div class="sorting1" ng-click="order('unsupervisedFacility')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'unsupervisedFacility' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'unsupervisedFacility' &&  sortReverse == false}"></i>
								</div>
							</th>
						</tr>
					</thead>

					<tbody id="myTable">
						<tr	ng-repeat="rowData in data | orderBy:filterType:sortReverse | filter:tableFilterWord">
							<td class="pdsa-table" sortable="'{{rowData.column}}'">
								{{$index+1}}</td>
							<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.areaName}}</td>
							<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.totalFacilities}}</td>
							<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.totalFacilityVisits}}</td>
							<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.uniqueFacilityVisits}}</td>
							<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.unsupervisedFacility}}</td>
						</tr>

					</tbody>

				</table>
	</div>
	</div>
	<h3 ng-show="data && !data.length" class="text-center">No Data Available</h3>
	</div>
	
	<div id="fieldSelection" class="modal fade" role="dialog"
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
					<div class="planwarnbody">{{infoMessage}}</div>
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
					<div class="errorbody">{{errorMessage}}</div>
					<button type="button" class="btn errorOk" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<jsp:include page="fragments/footer.jsp"></jsp:include>
	<script src="resources/js/jquery-ui.js"></script>
	<script	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
	<script src="resources/js/angular.js"></script>
	<script src="resources/js/lodash.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="resources/js/controllers/monitoringReportFacilityController.js"></script>
	<!-- 	<script type="text/javascript" src="resources/js/sdrc.export.js"></script> -->
	<script>
	$(document).ready(function(){
		var from = $("#fromDate").datepicker({
	        dateFormat: 'yy-mm-dd',
	        changeMonth : true,
	        changeYear: true,
	        maxDate: -1,
	        minDate: new Date(2017, 8, 1)
	    }).on( "change", function() {
          to.datepicker( "option", "minDate", $.datepicker.parseDate( 'yy-mm-dd', this.value ) );
        });
		var to = $("#toDate").datepicker({
	        dateFormat: 'yy-mm-dd',
	        changeMonth : true,
	        changeYear: true,
	        maxDate: -1,
	    }).on( "change", function() {
	        from.datepicker( "option", "maxDate", $.datepicker.parseDate( 'yy-mm-dd', this.value ) );
	      });
		$(".calender-btn1").click(function() {
			/* var currentDate = new Date(); */
			$("#fromDate").datepicker("show")
			 /* $("#timeperiod").datepicker("setDate", currentDate); */
		});
		$(".calender-btn2").click(function() {
			/* var currentDate = new Date(); */
			$("#toDate").datepicker("show")
			 /* $("#timeperiod").datepicker("setDate", currentDate); */
		});
	})
	
	</script>

	<script type="text/javascript">
		var app = angular.module("monitoringReportFacilityApp", []);
		var myAppConstructor = angular.module("monitoringReportFacilityApp");
		myAppConstructor.controller("MonitoringReportFacilityController",
				monitoringReportFacilityController);
	</script>
	<script type="text/javascript"
		src="resources/js/angularDirective/directive.js"></script>
	<!-- <script type="text/javascript">
		$(document).ready(function() {
			$(".thematic-view").addClass('active');
			sdrc_export.export_pdf("", "pdfDownloadBtn");
			sdrc_export.export_pdfLine("","pdfDownloadBtnForIndex");
		});
	</script> -->

</body>
</html>