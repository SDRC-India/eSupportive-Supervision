<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%> --%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/tags/form"
	prefix="springForm"%>

<html ng-app="reportApp">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Planned Vs. Actual Supervision</title>
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
.visit-column{
	border-right: 2px solid;
    border-right-color: #fff;
    width: 125px !important;
}
.margin-cont-select{
margin:0 36px;
}
.static-header-container .static-header table .deg-mgmt-table-head .sorting1{
	visibility: hidden;
}
</style>

</head>
<body ng-controller="reportController" ng-cloak class="report-plan">
<style type="text/css">
.report-plan input:focus {
	outline: none !important;
	border: 1px solid rgba(232, 13, 13, 0.27) !important;
	box-shadow: 0 0 10px #719ECE;
}   
</style>
	<jsp:include page="fragments/header.jsp"></jsp:include>


	<div class="pageNameContainer">
		<h4>{{pageName}}</h4>
	</div>
	<div id="mymain" class="container report-container"
		style="margin-top: 150px;">

		<div class="row report-container">
			
            <div class="col-md-12 col-sm-12 col-xs-12 indicator-mob text-center report-time">
				<div class="col-md-3 text-md-right text-xs-left">
					<label class="level-report" for="textinput">Time
						Period<span style="color:red">*</span>&nbsp;:&nbsp; </label>
				</div>
                <div class="col-md-3 text-md-left text-xs-left">
					<div class="text-center">
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
					<div class="text-center">
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
					<label class="level-report" for="textinput">Location<span style="color:red">*</span>&nbsp;:&nbsp;
					</label>
				</div>
				<div class="col-md-3 text-md-left text-xs-left">
					<div class="text-center ipad-margin">
						<div class="input-group">
							<input type="text" placeholder="Select State" id="state"
								class="form-control not-visible-input inputBackground"
								name="state" readonly="" ng-model="selectedState.name" ng-disabled="disabledState">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown" ng-disabled="disabledState">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
									<li ng-repeat="state in stateList | orderBy : 'name'"
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
					<label class="level-report" for="textinput">Checklist<span style="color:red">*</span>&nbsp;:&nbsp;
					</label>
				</div>
				<div class="col-md-7 text-md-left text-xs-left">
					<div class="text-center ipad-margin">
						<div class="input-group">
							<input type="text" placeholder="Select Checklist" id="checklist"
								class="form-control not-visible-input inputBackground"
								name="checklist" readonly="" ng-model="selectedCheckList.value">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
									<li ng-repeat="checklist in checklists | orderBy : 'key'"
										ng-click="checklistSelectedAction(checklist);"><a href="">{{checklist.value}}</a></li>
								</ul>
							</div>
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
		 <div class="col-md-12 text-center"
				style="font-weight: bold; font-size: 24px; margin-top: 40px;" ng-show="planUnplanTableData.length==0">
				No Data Available</div> 
		</div>
		<div class="row" ng-show="searchResultDiv && planUnplanTableData.length">
			<div
				class="col-md-12 col-xs-12 col-sm-12 report-search report-padding">
				<div class="col-md-2 col-xs-6 col-sm-2">
					<h5 style="font-weight: bold;">Data
						Search Result</h5>
				</div>
				<div class="col-md-4 col-xs-6 text-md-right text-sm-left">
					<h5 style="font-weight: bold;">Total no. of Facilities :
						{{planUnplanTableData.length}}</h5>
				</div>
				<div class="col-md-6 col-xs-12 col-sm-6 text-right actual-search search-section-planact">
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
		<div class="row" style="margin-top: 40px;" ng-show="tableResultDiv && planUnplanTableData.length">

			
				
				<div class="table-responsive header-fixed-table plan-actual-table table-height-all all-table-height" >
				<table items="tabledata" show-filter="true" cellpadding="0"
					cellspacing="0" border="0" class="dataTable table table-striped "
					id="dataTable">
					<thead>
						<tr>
							<th class="deg-mgmt-table-head" nowrap
								style="font-size: 14px; font-weight: bold; width: 20%; vertical-align: middle;"
								rowspan="2">Sl No.
								</th>

							<th class="deg-mgmt-table-head" nowrap
								style="font-size: 14px; font-weight: bold; width: 20%; vertical-align: middle;"
								rowspan="2"> District/Block
								<div class="sorting1 sorting-plan" ng-click="order('blockName')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'blockName' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'blockName' &&  sortReverse == false}"></i>
								</div>
							</th>

							<th class="deg-mgmt-table-head" nowrap
								style="font-size: 14px; font-weight: bold; width: 20%; vertical-align: middle;"
								rowspan="2">Facility Name
								<div class="sorting1 sorting-plan" ng-click="order('facilityName')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'facilityName' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'facilityName' &&  sortReverse == false}"></i>
								</div>
							</th>
							<th class="deg-mgmt-table-head" nowrap
								style="font-size: 14px; font-weight: bold; width: 20%; vertical-align: middle;"
								rowspan="2">Facility Type
								<div class="sorting1 sorting-plan" ng-click="order('facilityType')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'facilityType' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'facilityType' &&  sortReverse == false}"></i>
								</div>
							</th>
							<th class="deg-mgmt-table-head" colspan="4" nowrap
								ng-repeat="month in monthTableData">{{month.timePeriod}}</th>
						</tr>
						<tr>
							<th class="deg-mgmt-table-head visit-column" nowrap
								ng-repeat="visit in monthPlanUnplanedVisit track by $index">
								{{visit.visitName}}
								<div class="sorting1" ng-click="order(visit.visitName=='Planned'?'visitPlanned_'+$index:(visit.visitName=='Visit(Planned)')?
								'plannedVisit_'+$index:(visit.visitName=='Visit(Unplanned)')?'unplannedVisit_'+$index:'total_'+$index)">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != '{{visit.visitName=='Planned'?'visitPlanned_'+$index:(visit.visitName=='Visit(Planned)')?
								'plannedVisit_'+$index:(visit.visitName=='Visit(Unplanned)')?'unplannedVisit_'+$index:'total_'+$index}}' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == '{{visit.visitName=='Planned'?'visitPlanned_'+$index:(visit.visitName=='Visit(Planned)')?
								'plannedVisit_'+$index:(visit.visitName=='Visit(Unplanned)')?'unplannedVisit_'+$index:'total_'+$index}}' &&  sortReverse == false}"></i>
								</div>
								
								
								</th>
						</tr>
						</tr>

					</thead>

					<tbody id="myTable">
						<tr	ng-repeat="rowData in planUnplanTableData | orderBy:filterType:sortReverse | filter:tableFilterWord">
							<td class="pdsa-table" sortable="'{{rowData.column}}'">
								{{$index+1}}</td>
							<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.blockName}}</td>
							<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.facilityName}}</td>

							<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.facilityType}}</td>

							<td class="pdsa-table" sortable="'{{rowData.column}}'"
								ng-repeat-start="data in monthTableData"
								><span ng-click="showPlanedColumn1(rowData,data)"
								ng-class="{'report-table-span':(rowData.visitPlanned[data.timePeriod]==0 || rowData.visitPlanned[data.timePeriod]=='-')}">
								{{rowData.visitPlanned[data.timePeriod]==undefined?'0':rowData.visitPlanned[data.timePeriod]}}</span></td>

							<td class="pdsa-table" sortable="'{{rowData.column}}'"
								 ><span ng-click="showPlanedVisit(rowData,data)"
								ng-class="{'report-table-span':(rowData.plannedVisit[data.timePeriod] && rowData.plannedVisit[data.timePeriod]!='-')}">
								{{rowData.plannedVisit[data.timePeriod]==undefined?'0':rowData.plannedVisit[data.timePeriod]}}</span></td>
							<td class="pdsa-table" sortable="'{{rowData.column}}'"
								 ><span ng-click="showUnPlanedVisit(rowData,data)"
								ng-class="{'report-table-span':(rowData.unplannedVisit[data.timePeriod] && rowData.unplannedVisit[data.timePeriod]!='-')}">
								{{rowData.unplannedVisit[data.timePeriod]==undefined?'0':rowData.unplannedVisit[data.timePeriod]}}</span></td>
							<td class="pdsa-table" sortable="'{{rowData.column}}'"
								ng-repeat-end ><span ng-click="showTotalVisit(rowData,data)"
								ng-class="{'report-table-span':(rowData.total[data.timePeriod] && rowData.total[data.timePeriod]!='-')}">
								{{rowData.total[data.timePeriod]==undefined?'0':rowData.total[data.timePeriod]}}</span></td>

						</tr>

					</tbody>

				</table>
				<div class="col-md-12 text-center"
				style="font-weight: bold; font-size: 24px; margin-top: 40px;"
				ng-show="(planUnplanTableData|filter:tableFilterWord).length==0 && planUnplanTableData.length != 0">
				No Data Available</div>
				</div>
				<div class="last-update"><strong>Last Update On : </strong>{{lastUpdateDate}}</div>
			</div>
			
		</div>

		<!-- Modal for plan/unplan/total table -->
		<div id="planUnplanTable" class="modal fade report-data-modal" role="dialog"
			data-backdrop="static" data-keyboard="false">
			<div class="modal-dialog">
				<!-- Modal content -->
				<div class="modal-content">
					<div class="modal-body modal-body-padding">
						<button type="button" class="close close-indicator"
							data-dismiss="modal" ng-click="clearData()" style="display: block !important;">×</button>
						<div style="margin-bottom: 20px;">
							<div class="report-modal-title text-md-left">
								{{pageName}}
								</div>
							<div
								class="col-md-12 col-xs-12 col-sm-12 report-search-modal report-padding">
								<div class="col-md-6 col-xs-12 col-sm-6 text-md-left text-xs-left">
									<h5 class="left-margin-search" style="font-weight: bold;">Data
										Search Result</h5>
								</div>
								
								<div class="col-md-6 col-xs-12 col-sm-6 text-right search-section-planact">
									<img ng-click="exportPlanVisitTableData('planVisitModalTable')"
										class="excelbtn-img" data-toggle="tooltip"
										title="Download Excel" data-placement="top"
										src="resources/images/icon_download_excel.svg">
									<section class="searchFacility">
									<div class="select-container text-center"
										style="margin: 0px;">
										<div class="input-group" style="margin: auto;">
											<input type="text" placeholder="Search" id="searchPlanedVisitTable1"
												ng-change="filterData(plantableFilterWord)" autocomplete="off"
												class="form-control not-visible-input ui-autocomplete-input ng-valid ng-dirty"
												name="searchPlanedVisitTable" ng-model="plantableFilterWord">
											<div class="input-group-btn" style="position: relative;">
												<button data-toggle="dropdown" class="btn btn-color"
													ng-click="search(plantableFilterWord)"
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
									<strong>District Name :</strong> {{selectedDist.name}} &nbsp;&nbsp; <strong>Block
										Name : </strong>{{blockName}} &nbsp;&nbsp; <strong>Facility Name : </strong>
										{{facilityName}}  &nbsp;&nbsp; <strong>Facility
										Type :</strong> {{facilityType}}
								</h5>
							</div>
						</div>
						<div
							class="tableMargin table-responsive plan-unplan-table header-fixed-table all-table-height"
							style="overflow: auto; width:100%;"
							sdrc-table-header-fix tableuniqueclass="'plan-unplan-table'"
							tabledata="planedVisitModalData">
							
							<table items="tableData" show-filter="true" cellpadding="0"
								cellspacing="0" border="0"
								class="dataTable table table-striped report"
								id="planVisitModalTable">
								<thead>
									<tr>
										<th style="position: relative;">Sl. No.
										
										</th>
										<th style="position: relative;">Name of Person
											<div class="sorting1" ng-click="orderPlaned('userName')">
												<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
													ng-class="{'hiding': sortReverse1 == true || (sortType1 != 'userName' &&  sortReverse1 == false)}"></i>
												<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
													ng-class="{'hiding': sortType1 == 'userName' &&  sortReverse1 == false}"></i>
											</div>
										</th>
										<th style="position: relative;">Organization
											<div class="sorting1" ng-click="orderPlaned('organizationName')">
												<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
													ng-class="{'hiding': sortReverse1 == true || (sortType1 != 'organizationName' &&  sortReverse1 == false)}"></i>
												<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
													ng-class="{'hiding': sortType1 == 'organizationName' &&  sortReverse1 == false}"></i>
											</div>
										</th>
										<th style="position: relative;">Designation
											<div class="sorting1" ng-click="orderPlaned('designationName')">
												<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
													ng-class="{'hiding': sortReverse1 == true || (sortType1 != 'designationName' &&  sortReverse1 == false)}"></i>
												<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
													ng-class="{'hiding': sortType1 == 'designationName' &&  sortReverse1 == false}"></i>
											</div>
										</th>
										<th style="position: relative;">Planned Date
											<div class="sorting1" ng-click="orderPlaned('plannedDate')">
												<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
													ng-class="{'hiding': sortReverse1 == true || (sortType1 != 'plannedDate' &&  sortReverse1 == false)}"></i>
												<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
													ng-class="{'hiding': sortType1 == 'plannedDate' &&  sortReverse1 == false}"></i>
											</div>
										</th>
										<th style="position: relative;">Visit Date
											<div class="sorting1" ng-click="orderPlaned('visitedDate')">
												<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
													ng-class="{'hiding': sortReverse1 == true || (sortType1 != 'visitedDate' &&  sortReverse1 == false)}"></i>
												<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
													ng-class="{'hiding': sortType1 == 'visitedDate' &&  sortReverse1 == false}"></i>
											</div>
										</th>
									</tr>
								</thead>
								<tbody>
									<tr
										ng-repeat="rowData in planedVisitModalData | orderBy:filterType1:sortReverse1 | filter:plantableFilterWord">
										<td class="pdsa-table" sortable="'{{rowData.column}}'">
											{{$index+1}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'" ng-click="openModal()">{{rowData.userName}}</td>
										<td class="pdsa-table" class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.organizationName}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'" ng-click="openModal()">{{rowData.designationName}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.plannedDate}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'" ng-click="openModal()">{{rowData.visitedDate}}</td>

									</tr>
								</tbody>
							</table>
							<div class="col-md-12 text-center" id="no-result"
								style="font-weight: bold; font-size: 24px; margin-top: 40px;"
								ng-show="(planedVisitModalData|filter:plantableFilterWord).length==0 && planedVisitModalData.length != 0">
								No Data Available</div>
						</div>
					</div>
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
							style="width: 25px; margin-top: -5px;">&nbsp;ERROR
					</div>
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
	<script src="resources/js/jquery-ui.js"></script>
	<script
		src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script type="text/javascript"
		src="resources/js/controllers/planVsActualSupervisionController.js"></script>
	<script type="text/javascript">
		var app = angular.module("reportApp", []);
		var myAppConstructor = angular.module("reportApp");
		myAppConstructor.controller("reportController", reportController);
	</script>
	
	<script type="text/javascript"
		src="resources/js/angularDirective/directive.js"></script>
		<script type="text/javascript"
		src="resources/js/angularDirective/dynamicTableHeaderFix.js"></script>

	<script type="text/javascript">
	$('.plan-actual-table').scroll(function () {
        if ($(this).scrollTop() > 10) {
            $('.sorting-plan').css('display','none');
        } else {
        	 $('.sorting-plan').css('display','block');
        }
    });
	
	</script>
	<script type="text/javascript">
		$(document).ready(function() {
			$(".report-planactual").addClass('active');
		});
	</script>
</body>
</html>