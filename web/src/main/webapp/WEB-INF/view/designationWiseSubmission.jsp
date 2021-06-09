<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/tags/form"
	prefix="springForm"%>

<html ng-app="designationWiseSubmissionApp">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Designation Wise Submission</title>
<link rel="icon" href="resources/images/icon.png" type="image/png"
	sizes="16x16">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<link rel="stylesheet" href="resources/css/font-awesome.min.css">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="resources/css/customLoader.css">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="resources/css/bootstrap-select.min.css">
<link rel="stylesheet" href="resources/css/styles.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<link rel="stylesheet" href="resources/css/jquery-ui.min.js">
<link rel="stylesheet" href="resources/css/jquery-ui.css">
<script src="resources/js/angular.min.js"></script>

<style>
.table>thead:first-child>tr:first-child>th {
	background-color: #f0b569;
	text-align: center;
	border-right: 2px solid;
	border-right-color: #fff;
	width: 125px !important;
}
</style>

</head>
<body ng-controller="designationWiseSubmissionController" ng-cloak >
	<jsp:include page="fragments/header.jsp"></jsp:include>


	<div class="pageNameContainer">
		<h4>{{pageName}}</h4>
	</div>
	<div id="mymain" class="container report-container"
		style="margin-top: 150px;">

		<div class="row report-container">
			<div class="col-md-12 col-sm-12 col-xs-12 indicator-mob text-center report-time">
				<div class="col-md-3 text-md-right text-xs-left">
					<label class="level-report" for="textinput">User Level<span style="color:red">*</span>&nbsp;:&nbsp;
					</label>
				</div>
				<div class="col-md-7 text-md-left text-xs-left">
					<div class="text-center ipad-margin">
						<div class="input-group">
							<input type="text" placeholder="Select User Level" id="userLevel"
								class="form-control not-visible-input inputBackground"
								name="userLevel" readonly="" ng-model="selectedLevel.levelName">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
									<li ng-repeat="level in userLevel"
										ng-click="selectLevel(level);"><a href="">{{level.levelName}}</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
            <div class="col-md-12 col-sm-12 col-xs-12 indicator-mob text-center report-time">
				<div class="col-md-3 text-md-right text-xs-left">
					<label class="level-report" for="textinput">Location&nbsp;:&nbsp;
					</label>
				</div>
				<div class="col-md-3 text-md-left text-xs-left">
					<div class="text-center ipad-margin">
						<div class="input-group">
							<input type="text" placeholder="Select State" id="state"
								class="form-control not-visible-input inputBackground"
								name="state" readonly="" ng-model="selectedState.name">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown" ng-disabled="disabledState">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
									<li ng-repeat="state in stateList"
										ng-click="selectState(state);"><a href="">{{state.name}}</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-2 text-left">
					<div class="text-center report-dist">
						<div class="input-group">
							<input type="text" placeholder="Select District" id="district"
								class="form-control not-visible-input inputBackground"
								name="district" readonly="" ng-model="selectedDist.name" ng-disabled="disabledDistrict">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown" ng-disabled="disabledDistrict">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
									<li ng-repeat="dist in districtList | orderBy : 'name'"
										ng-click="selectDistrict(dist);"><a href="">{{dist.name}}</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-2 text-left" ng-if="selectedFacilityType.id!=17">
					<div class="text-center report-dist">
						<div class="input-group">
							<input type="text" placeholder="Select Block" id="block"
								class="form-control not-visible-input inputBackground"
								name="block" readonly="" ng-model="selectedBlock.name" ng-disabled="disabledBlock">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown" ng-disabled="disabledBlock">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
									<li ng-repeat="block in blockList | orderBy : 'name'"
										ng-click="selectBlock(block);"><a href="">{{block.name}}</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-12 col-sm-12 col-xs-12 indicator-mob text-center report-time">
				<div class="col-md-3 text-md-right text-xs-left">
					<label class="level-report" for="textinput">Organization<span style="color:red">*</span>&nbsp;:&nbsp;
					</label>
				</div>
				<div class="col-md-7 text-md-left text-xs-left">
					<div class="text-center ipad-margin">
						<div class="input-group">
							<input type="text" placeholder="Select Organization" id="organization"
								class="form-control not-visible-input inputBackground"
								name="checklist" readonly="" ng-model="selectedOrganization.value">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
                                     <li ng-repeat="org in organizations | orderBy : 'value'"
										ng-click="selectOrganization(org);"><a href="">{{org.value}}</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-12 col-sm-12 col-xs-12 indicator-mob text-center report-time" ng-if="selectedOrganization.key == 5">
					<div class="col-md-3 text-md-right text-xs-left">
					<label class="level-report" for="textinput">Specify Development Partners<span style="color:red">*</span>&nbsp;:&nbsp;
					</label>
				</div>
				<div class="col-md-7 text-md-left text-xs-left">
					<div class="text-center ipad-margin">
						<div class="input-group">
							<input type="text" placeholder="Select Development Partners" id="devPartner"
								class="form-control not-visible-input inputBackground"
								name="devPartner" readonly="" ng-model="selectedDevPartner.value">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
									<li	ng-repeat="partner in developmentPartners"
										ng-click="selectPartner(partner);"><a href="">{{partner.value}}</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-12 col-sm-12 col-xs-12 indicator-mob text-center report-time">
				<div class="col-md-3 text-md-right text-xs-left">
					<label class="level-report" for="textinput">Designation<span style="color:red">*</span>&nbsp;:&nbsp;
					</label>
				</div>
				<div class="col-md-7 text-md-left text-xs-left">
					<div class="text-center ipad-margin">
						<div class="input-group">
							<input type="text" placeholder="Select Designation" id="designation"
								class="form-control not-visible-input inputBackground"
								name="designation" readonly="" ng-model="selectedDesignation.value" ng-disabled="designationDisable">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown" ng-disabled="designationDisable">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
									<li ng-repeat="deg in designations"
										ng-click="selectDesignation(deg);"><a href="">{{deg.value}}</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-12 col-sm-12 col-xs-12 indicator-mob text-center report-time">
				<div class="col-md-3 text-md-right text-xs-left">
					<label class="level-report" for="textinput">Time
						Period<span style="color:red">*</span>&nbsp;:&nbsp; </label>
				</div>
                <div class="col-md-3 text-md-left text-xs-left">
					<div class="text-center ipad-margin">
						<div class="input-group">
							<input type="text" placeholder="From" id="fromdate"
								class="form-control not-visible-input inputBackground"
								name="fromdate" readonly=""	ng-model="selectedStartDate.timePeriod">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
									<li ng-repeat="time in allTimePeriod | orderBy : 'name'"
										ng-click="selectStartDate(time)"><a href="">{{time.timePeriod}}</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-4 text-left">
					<div class="text-center ipad-margin">
						<div class="input-group">
							<input type="text" placeholder="To" id="todate"
								class="form-control not-visible-input inputBackground"
								name="todate" readonly="" ng-model="selectedEndDate.timePeriod">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
									<li ng-repeat="endTime in endTimePeriods"
										ng-click="selectEndDate(endTime)"
										style="padding-left: 11px; cursor: pointer;">{{endTime.timePeriod}}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-12 col-sm-12 col-xs-12 indicator-mob text-center report-time">
				<div class="col-md-3 text-md-right text-xs-left">
					<label class="level-report" for="textinput">Number Of Submissions<span style="color:red">*</span>&nbsp;:&nbsp;
					</label>
				</div>
				<div class="col-md-7 text-md-left text-xs-left">
					<div class="text-center ipad-margin">
						<div class="input-group">
							<input type="text" placeholder="Select Designation" id="designation"
								class="form-control not-visible-input inputBackground"
								name="designation" readonly="" ng-model="selectedNumberOfSubmission.value">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
									<li ng-repeat="numb in numberOfSubmission"
										ng-click="selectNumberOfSubmission(numb);"><a href="">{{numb.value}}</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-12 col-sm-12 col-xs-12 indicator-mob text-center report-time">
				<div class="col-md-3 text-md-right text-xs-left">
					<label class="level-report" for="textinput"></div>
                <div class="col-md-3 text-md-left text-xs-left">
					<div class="text-center ipad-margin">
						<div class="input-group">
							<input type="text" placeholder="Specify Type" id="operator"
								class="form-control not-visible-input inputBackground"
								name="operator" readonly=""	ng-model="selectedOperator.value" ng-show="customDisable">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown" ng-show="customDisable">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
									<li ng-repeat="operate in operators | orderBy : 'name'"
										ng-click="selectOperator(operate)"><a href="">{{operate.value}}</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-4 text-left">
					<div class="text-center ipad-margin">
						<div class="">
							<input type="text" placeholder="Number Of Submissions" id="operatorVal"
								class="form-control  inputBackground" ng-show="customDisable"
								name="operatorVal" ng-model="operatorVal" only-ten-digits autocomplete="off">
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-12 col-xs-12 col-sm-12 text-right excelPosition report-padding">
			    <div class="col-md-3 text-md-right text-xs-left">
				</div>
				<div class="col-md-7 text-md-center text-xs-center">
				
					
					<button id="buttonsubmit" name="buttonsubmit"
						class="btn btn-info report-indicatorwise-submit" ng-click="validateReport()"
						type="button">Submit</button>
				
				</div>
			</div>
		</div>
					
		 <div class="col-md-12 text-center"
				style="font-weight: bold; font-size: 24px; margin-top: 40px;" ng-show="reportTableData.length==0">
				No Data Available</div> 
		<div class="row" ng-show="reportTableData.length">
			<div
				class="col-md-12 col-xs-12 col-sm-12 report-search report-padding">
				<div class="col-md-2 data_res col-xs-12">
					<h5 style="font-weight: bold;">Data
						Search Result</h5>
				</div>
				<div class="col-md-4 col-xs-12 text-md-right text-sm-left">
<!-- 					<h5 style="font-weight: bold;">Total no. of Facilities : -->
<!-- 						{{reportTableData.length}}</h5> -->
				</div>
				<div class="col-md-6 col-xs-12 text-right actual-search">
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
		<div class="row" style="margin-top: 40px;" ng-show="reportTableData.length">

			<div class="tableMargin table-responsive plan-action-table header-fixed-table all-table-height"
							style="width: 100%; overflow: auto;"
							sdrc-table-header-fix tableuniqueclass="'plan-action-table'"
							tabledata="reportTableData" ng-show="reportTableData.length>0">
				<table items="tabledata" show-filter="true" cellpadding="0"
					cellspacing="0" border="0" class="dataTable table table-striped "
					id="dataTable">
					<thead>
						<tr>
							<th class="deg-mgmt-table-head" nowrap >Sl No.
							</th>
								
							<th class="deg-mgmt-table-head" nowrap>State
								<div class="sorting1" ng-click="order('stateName')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'stateName' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'stateName' &&  sortReverse == false}"></i>
								</div>
							</th>
							<th class="deg-mgmt-table-head" nowrap>District
								<div class="sorting1" ng-click="order('districtName')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'districtName' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'districtName' &&  sortReverse == false}"></i>
								</div>
							</th>
							<th class="deg-mgmt-table-head" nowrap>Block
								<div class="sorting1" ng-click="order('blockName')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'blockName' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'blockName' &&  sortReverse == false}"></i>
								</div>
							</th>
							<th class="deg-mgmt-table-head" nowrap>Organization
								<div class="sorting1" ng-click="order('organizationName')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'organizationName' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'organizationName' &&  sortReverse == false}"></i>
								</div>
							</th>
							<th class="deg-mgmt-table-head" nowrap>Designation
								<div class="sorting1" ng-click="order('designationName')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'designationName' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'designationName' &&  sortReverse == false}"></i>
								</div>
							</th>
							<th class="deg-mgmt-table-head" nowrap>Number Of Users Registered
								<div class="sorting1" ng-click="order('numberOfUsers')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'numberOfUsers' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'numberOfUsers' &&  sortReverse == false}"></i>
								</div>
							</th>
							<th class="deg-mgmt-table-head" nowrap>Number Of Users for Facility Submission
								<div class="sorting1" ng-click="order('numberOfFacilityUsers')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'numberOfFacilityUsers' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'numberOfFacilityUsers' &&  sortReverse == false}"></i>
								</div>
							</th>
							<th class="deg-mgmt-table-head" nowrap>Percentage
								<div class="sorting1" ng-click="order('percentageOfFacilityUsers')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'percentageOfFacilityUsers' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'percentageOfFacilityUsers' &&  sortReverse == false}"></i>
								</div>
							</th>
							<th class="deg-mgmt-table-head" nowrap>Number Of Users for Community Submission
								<div class="sorting1" ng-click="order('numberOfCommunityUsers')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'numberOfCommunityUsers' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'numberOfCommunityUsers' &&  sortReverse == false}"></i>
								</div>
							</th>
							<th class="deg-mgmt-table-head" nowrap>Percentage
								<div class="sorting1" ng-click="order('percentageOfCommunityUsers')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'percentageOfCommunityUsers' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'percentageOfCommunityUsers' &&  sortReverse == false}"></i>
								</div>
							</th>
						</tr>
					</thead>
                    <tbody id="myTable">
						<tr	ng-repeat="rowData in reportTableData | orderBy:filterType:sortReverse | filter:tableFilterWord">
							<td class="pdsa-table" sortable="'{{rowData.column}}'">
								{{$index+1}}</td>
							<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.stateName}}</td>
							<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.districtName}}</td>
							<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.blockName}}</td>
							<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.organizationName}}</td>
							<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.designationName}}</td>
							<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.numberOfUsers == undefined?0:rowData.numberOfUsers}}</td>
							<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.numberOfFacilityUsers == undefined?0:rowData.numberOfFacilityUsers}}</td>
							<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.percentageOfFacilityUsers == undefined?0:rowData.percentageOfFacilityUsers}}</td>
							<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.numberOfCommunityUsers == undefined?0:rowData.numberOfCommunityUsers}}</td>
							<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.percentageOfCommunityUsers == undefined?0:rowData.percentageOfCommunityUsers}}</td>
						</tr>
					</tbody>
				</table>

			</div>


			<div class="col-md-12 text-center"
				style="font-weight: bold; font-size: 24px; margin-top: 40px;"
				ng-show="(reportTableData|filter:tableFilterWord).length==0">
				No Data Available</div>
		</div>

		<!-- Modal for plan/unplan/total table -->
		
	</div>


	<div id="errorMessage" class="modal fade" role="dialog"
		data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<!-- Modal content -->
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class="errorhead"><img alt="" src="resources/images/icons/Messages_warning_caution_icon.svg" style="width: 25px; margin-top: -5px;">&nbsp;ERROR</div>
					<div class="errorbody">{{errorMsg}}</div>
					<button type="button" class="btn errorOk" ng-click="closeModal()">Close</button>
				</div>
			</div>
		</div>
	</div>

	<div id="pop2" class="modal fade" role="dialog" data-backdrop="static"
		data-keyboard="false">
		<div class="modal-dialog">
			Modal content
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class="successhead1"><img alt="" src="resources/images/icons/Messages_success_icon.svg" style="width: 25px; margin-top: -5px;">&nbsp;SUCCESS</div>
					<div class="successbody">{{msg}}</div>
					<a class="btn btn-default" data-dismiss="modal">Ok</a>
				</div>
			</div>
		</div>
	</div>

	<jsp:include page="fragments/footer.jsp"></jsp:include>
	<script src="resources/js/jquery-ui.js"></script>
	<script
		src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script type="text/javascript"
		src="resources/js/controllers/designationWiseSubmissionController.js"></script>
	<script type="text/javascript"
		src="resources/js/angularDirective/directive.js"></script>

	<script type="text/javascript">
		$(document).ready(function() {
			$(".report-desig").addClass('active');
		});
	</script>
</body>
</html>