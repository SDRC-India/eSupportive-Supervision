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
<title>Improvement In Community</title>
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
@media (max-width:1024px){
#planUnplanTable .modal-dialog, #facilityActionTable .modal-dialog{
width:100%;
}
}
 .improvement-search{
    right:-62px;
    }
</style>

</head>
<body ng-controller="reportController" ng-cloak class="plan-action">
<style type="text/css">
.plan-action input:focus {
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
			<!-- <div class="col-md-12 col-sm-12 col-xs-12 indicator-mob text-center report-time">
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
			</div> -->
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
				style="font-weight: bold; font-size: 24px; margin-top: 40px;" ng-show="reportTableData.length==0">
				No Data Available</div>
		</div> 
		
		
		<div class="row" ng-show="reportTableData.length">
			<div
				class="col-md-12 col-xs-12 col-sm-12 report-search report-padding">
				<div class="col-md-2 col-xs-12">
					<h5 style="font-weight: bold;">Data
						Search Result</h5>
				</div>
				<div class="col-md-4 col-xs-12 text-md-right text-sm-left">
					<h5 style="font-weight: bold;">&nbsp; &nbsp; &nbsp; &nbsp;</h5>
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

			<div class="tableMargin table-responsive plan-action-table all-table-height header-fixed-table"
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
								
							<th class="deg-mgmt-table-head" nowrap>Block
								<div class="sorting1" ng-click="order('area')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'area' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'area' &&  sortReverse == false}"></i>
								</div>
							</th>
							<th class="deg-mgmt-table-head" nowrap>Facility Name
								<div class="sorting1" ng-click="order('facility')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'facility' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'facility' &&  sortReverse == false}"></i>
								</div>
							</th>
							<th class="deg-mgmt-table-head" nowrap>Facility Type
								<div class="sorting1" ng-click="order('facilityType')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'facilityType' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'facilityType' &&  sortReverse == false}"></i>
								</div>
							</th>
							<th class="deg-mgmt-table-head" nowrap>Baseline
								<div class="sorting1" ng-click="order('baseline')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 'baseline' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 'baseline' &&  sortReverse == false}"></i>
								</div>
							</th>
							<th class="deg-mgmt-table-head" nowrap>T - 2
								<div class="sorting1" ng-click="order('t-2')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 't-2' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 't-2' &&  sortReverse == false}"></i>
								</div>
							</th>
							<th class="deg-mgmt-table-head" nowrap>T - 1
								<div class="sorting1" ng-click="order('t-1')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 't-1' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 't-1' &&  sortReverse == false}"></i>
								</div>
							</th>
							<th class="deg-mgmt-table-head" nowrap>T (Most Recent)
								<div class="sorting1" ng-click="order('t')">
									<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
										ng-class="{'hiding': sortReverse == true || (sortType != 't' &&  sortReverse == false)}"></i>
									<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
										ng-class="{'hiding': sortType == 't' &&  sortReverse == false}"></i>
								</div>
							</th>
							
						</tr>
					</thead>

					<tbody id="myTable">
						<tr
							ng-repeat="rowData in reportTableData | orderBy:filterType:sortReverse | filter:tableFilterWord">
							<td class="pdsa-table" 
								>
								{{$index+1}}</td>
								<td class="pdsa-table"  sortable="'area'"
								>
								{{rowData['area']}}</td>
								<td class="pdsa-table"  sortable="'facility'" >
								{{rowData['facility']}}</td>
								<td class="pdsa-table"  sortable="'facilityType'" >
								{{rowData['facilityType']}}</td>
								
								<td class="pdsa-table report-table-span" sortable="'baseline'" ng-click="getFacilityData(rowData,rowData['baseline_submissionIds'])"
								>
								{{rowData['baseline']}}</td>
								
								<td class="pdsa-table " ng-class="rowData['t-2']?'report-table-span':''" sortable="'t-2'" ng-click="rowData['t-2']?getFacilityData(rowData,rowData['t-2_submissionIds']):''"
								>
								{{rowData['t-2']?rowData['t-2']:'-'}}</td>
								
								<td class="pdsa-table " ng-class="rowData['t-1']?'report-table-span':''" sortable="'t-1'" ng-click="rowData['t-1']?getFacilityData(rowData,rowData['t-1_submissionIds']):''"
								>
								{{rowData['t-1']?rowData['t-1']:'-'}}</td>
								
								<td class="pdsa-table " sortable="'t'" ng-class="rowData['t']?'report-table-span':''" ng-click="rowData['t']?getFacilityData(rowData,rowData['t_submissionIds']):''"
								>
								{{rowData['t']?rowData['t']:'-'}}</td>
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
								{{pageName}}
								</div>
							<div
								class="col-md-12 col-xs-12 col-sm-12 report-search-modal report-padding">
								<div class="col-md-6 col-xs-12 text-md-left text-xs-left">
									<h5 class="left-margin-search" style="font-weight: bold;">Data
										Search Result</h5>
								</div>

								<div class="col-md-6 col-xs-12 text-right">
									<img ng-click="exportTableData('community-action-table', facility, block)"
										class="excelbtn-img" data-toggle="tooltip"
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
									<strong>District Name :</strong> {{areaData}} &nbsp;&nbsp; <strong>Block
										Name : </strong>{{block}} &nbsp;&nbsp; <strong>Facility
										 Name :</strong> {{facility}}&nbsp;&nbsp; <strong>Facility
										Type :</strong> {{level}}
								</h5>
							</div>
						</div>
						<div class="report-modal-table" ng-show="facilityActionData.length>0">
						<div
							class="tableMargin table-responsive community-action-table header-fixed-table all-table-height"
							style="width: 100%; overflow: auto;"
							report-table-header-fix tableuniqueclass="'community-action-table'"
							tabledata="columnKeys"
							>
							<table items="tableData" show-filter="true" cellpadding="0"
								cellspacing="0" border="0"
								class="dataTable table  table-striped report"
								id="community-action-table">
								<thead>
									<tr>
										
										<th style="position: relative;" class="deg-mgmt-table-head" ng-repeat="coloumn in columnKeys ">{{coloumn}}
										</th>
										
									</tr>
								</thead>
								<tbody>
									<tr
										ng-repeat="rowData in facilityActionData | orderBy:filterType1:sortReverse1 | filter:facilityTableFilterWord">
							
								<td class="pdsa-table"  sortable="coloumn" ng-repeat="coloumn in columnKeys"
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
		src="resources/js/controllers/improvementInCommunityController.js"></script>
	<script type="text/javascript">
		var app = angular.module("reportApp", []);
		var myAppConstructor = angular.module("reportApp");
		myAppConstructor.controller("reportController", reportController);
	</script>
	
	<script type="text/javascript"
		src="resources/js/angularDirective/directive.js"></script>
<script type="text/javascript">
		$(document).ready(function() {
			$(".report-imprcmn").addClass('active');
		});
	</script>
	
</body>
</html>