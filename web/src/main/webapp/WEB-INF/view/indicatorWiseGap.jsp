<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%> --%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/tags/form"
	prefix="springForm"%>

<html ng-app="rawDataReportApp">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Indicator Wise Gap</title>
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
<body ng-controller="reportController" class="indicator-wise" ng-cloak>
<style type="text/css">
.indicator-wise input:focus {
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
					<label class="level-report" for="textinput">Checklist<span style="color:red">*</span>&nbsp;:&nbsp;
					</label>
				</div>
				<div class="col-md-7 text-md-left text-xs-left">
					<div class="text-center ipad-margin">
						<div class="input-group">
							<input type="text" placeholder="Select Checklist" id="checklist"
								class="form-control not-visible-input inputBackground"
								name="checklist" readonly="" ng-model="selectedCheckList.sectorName">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
									<li ng-repeat="checklist in checklists | orderBy : 'sectorId'"
										ng-click="checklistSelectedAction(checklist);"><a href="">{{checklist.sectorName}}</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			
					<div class="col-md-12 col-sm-12 col-xs-12 indicator-mob text-center report-time">
				<div class="col-md-3 text-md-right text-xs-left">
					<label class="level-report" for="textinput">Facility Type<span style="color:red">*</span>&nbsp;:&nbsp;
					</label>
				</div>
				<div class="col-md-7 text-md-left text-xs-left">
					<div class="text-center ipad-margin">
						<div class="input-group">
							<input type="text" placeholder="Select Facility Type" id="facilitytype"
								class="form-control not-visible-input inputBackground"
								name="facilitytype" readonly="" ng-model="selectedFacilityType.name">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
									<li ng-repeat="facility in facilityTypelist | orderBy : 'orderLevel'"
										ng-click="selectFacilityType(facility);"><a href="">{{facility.name}}</a></li>
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
				<div class="col-md-2 text-left">
					<div class="text-center report-dist">
						<div class="input-group">
							<input type="text" placeholder="Select Block" id="block"
								class="form-control not-visible-input inputBackground"
								name="block" readonly="" ng-model="selectedBlock.name" ng-disabled="selectedFacilityType.id==105||disabledBlock">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown" ng-disabled="selectedFacilityType.id==105||disabledBlock">
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
					<label class="level-report" for="textinput">Sector<span style="color:red">*</span>&nbsp;:&nbsp;
					</label>
				</div>
				<div class="col-md-7 text-md-left text-xs-left">
					<div class="text-center ipad-margin">
						<div class="input-group">
							<input type="text" placeholder="Select Sector" id="sector"
								class="form-control not-visible-input inputBackground"
								name="checklist" readonly="" ng-model="selectedSector.sectorName">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown" >
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
									<li ng-repeat="checklist in sectors | orderBy : 'sectorId'"
										ng-click="selectSector(checklist);"><a href="">{{checklist.sectorName}}</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			
						<div class="col-md-12 col-sm-12 col-xs-12 indicator-mob text-center report-time">
				<div class="col-md-3 text-md-right text-xs-left">
					<label class="level-report" for="textinput">Sub-Sector<span style="color:red">*</span>&nbsp;:&nbsp;
					</label>
				</div>
				<div class="col-md-7 text-md-left text-xs-left">
					<div class="text-center ipad-margin">
						<div class="input-group">
							<input type="text" placeholder="Select Sub-Sector" id="sub-sector"
								class="form-control not-visible-input inputBackground"
								name="checklist" readonly="" ng-model="selectedSubSector.sectorName" ng-disabled="selectedSector && subSectors.length==0">
							<div class="input-group-btn" style="position: relative;">
								<button type="button"
									class="btn btn-danger dropdown-toggle user-button"
									data-toggle="dropdown" ng-disabled="selectedSector && subSectors.length==0">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu state-dropdown" role="menu">
									<li ng-repeat="checklist in subSectors | orderBy : 'sectorId'"
										ng-click="selectSubSector(checklist);"><a href="">{{checklist.sectorName}}</a></li>
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
		</div>
		 <div class="col-md-12 text-center left-result-mrgn"
				style="font-weight: bold; font-size: 24px; margin-top: 40px;" ng-show="reportTableData.length==0">
				No Data Available</div> 
		
			<div class="row" ng-show="reportTableData.length">
			<div
				class="col-md-12 col-xs-12 col-sm-12 report-search report-padding">
				<div class="col-md-2 col-xs-2">
					<h5 style="font-weight: bold;">Data
						Search Result</h5>
				</div>
				<div class="col-md-4 col-xs-12 text-md-right text-sm-left">
 <!-- 					<h5 style="font-weight: bold;">Total no. of Facilities :
						{{reportTableData.length}}</h5>  -->
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

			<div class="tableMargin all-table-height table-responsive plan-action-table header-fixed-table"
							style="width: 100%;overflow: auto;"
							sdrc-table-header-fix tableuniqueclass="'plan-action-table'"
							tabledata="reportTableData" ng-show="reportTableData.length>0">
				<table items="tabledata" show-filter="true" cellpadding="0"
					cellspacing="0" border="0" class="dataTable table table-striped "
					id="dataTable">
					<thead>
						<tr>
							<th class="deg-mgmt-table-head" nowrap >Sl No.
							</th>
								
							<th class="deg-mgmt-table-head" nowrap>Indicator Name
								<div class="sorting1" ng-click="order('Indicator')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'Indicator' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'Indicator' &&  sortReverse == false}"></i>
								</div>
							</th>
							<th class="deg-mgmt-table-head" nowrap>Baseline
								<div class="sorting1" ng-click="order('Baseline')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'Baseline' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'Baseline' &&  sortReverse == false}"></i>
								</div>
							</th>
							<th class="deg-mgmt-table-head" nowrap>T - 2
								<div class="sorting1" ng-click="order('T - 2')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'T - 2' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'T - 2' &&  sortReverse == false}"></i>
								</div>
							</th>
							<th class="deg-mgmt-table-head" nowrap>T - 1
								<div class="sorting1" ng-click="order('T - 1')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'T - 1' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'T - 1' &&  sortReverse == false}"></i>
								</div>
							</th>
							<th class="deg-mgmt-table-head" nowrap>T (Most Recent)
								<div class="sorting1" ng-click="order('T')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'T' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'T' &&  sortReverse == false}"></i>
								</div>
							</th>
							
						</tr>
					</thead>

					<tbody id="myTable">
						<tr
							ng-repeat="rowData in reportTableData | orderBy:filterType:sortReverse | filter:tableFilterWord">
							<td class="pdsa-table" >
							{{$index+1}}
							
								<td class="pdsa-table" 
								sortable="'Indicator'"
								>
								{{rowData['Indicator']}}</td>
								
								
								<td class="pdsa-table" 
								sortable="'Baseline'"
								>
								{{rowData['Baseline'] | number:1}}</td>
								
								<td class="pdsa-table" 
								sortable="'T - 2'"
								>
								{{rowData['T - 2']?rowData['T - 2']:'-'}}</td>
								
								
									<td class="pdsa-table" 
								sortable="'T - 1'"
								>
								{{rowData['T - 1']?rowData['T - 1']:'-'}}</td>
								
									<td class="pdsa-table" 
								sortable="'T'"
								>
								{{rowData['T']?rowData['T']:'-'}}</td>
						</tr>
					</tbody>
				</table>

			</div>


			<div class="col-md-12 text-center"
				style="font-weight: bold; font-size: 24px; margin-top: 40px;"
				ng-show="(reportTableData|filter:tableFilterWord).length==0">
				No Data Available</div>
		</div>
		
	</div>
	<div id="errorMessage" class="modal fade" role="dialog"
		data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<!-- Modal content -->
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class="errorhead"><img alt="" src="resources/images/icons/Messages_warning_caution_icon.svg" style="width: 25px; margin-top: -5px;">&nbsp;ERROR</div>
					<div class="errorbody">{{errorMsg}}</div>
					<button type="button" class="btn errorOk" data-dismiss="modal" ng-click="closeModal()">Close</button>
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="fragments/footer.jsp"></jsp:include>
	<script src="resources/js/jquery-ui.js"></script>
	<script
		src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script type="text/javascript"
		src="resources/js/controllers/indicatorWiseGapController.js"></script>
	<script type="text/javascript">
		var app = angular.module("rawDataReportApp", []);
		var myAppConstructor = angular.module("rawDataReportApp",[]);
		myAppConstructor.controller("reportController", reportController);
	</script>
	<script type="text/javascript"
		src="resources/js/angularDirective/directive.js"></script>

	<script type="text/javascript">
		$(document).ready(function() {
			$(".report-indicator").addClass('active');
		});
	</script>
</body>
</html>