<!-- 
@author Devikrushna Nanda (devikrushna@sdrc.co.in),@author (sumansaurav@sdrc.co.in)
 -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%> --%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/tags/form"
	prefix="springForm"%>

<html ng-app="degMgmtApp">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Designation Management</title>
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
	src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript" charset="utf8"
	src="https://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js"></script>
<script src="resources/js/jquery-ui.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="resources/js/angular.min.js"></script>
<link rel="stylesheet" href="resources/css/jquery-ui.min.js">
<link rel="stylesheet" href="resources/css/jquery-ui.css">

<style>
.error {
	color: #ff0000;
	font-style: italic;
	font-weight: bold;
}

div#mymain {
	margin-top: 97px;
}

@media only screen and (max-device-width: 1020px) {
	div#mymain {
		margin-top: 118px !important;
	}
}

.ui-widget.ui-widget-content {
	overflow-y: scroll;
	max-height: 300px;
	overflow-x: hidden;
}

.table>thead:first-child>tr:first-child>th {
	background-color: #f0b569;
	text-align: center;
	border-right: 2px solid;
	border-right-color: #fff;
	width: 125px !important;
}

@media screen and (max-width: 767px) {
	.table-responsive {
		overflow-y: scroll !important;
	}
}
</style>
</head>
<body ng-controller="degMgmtController" class="deg-mgmt" ng-cloak>
	<style type="text/css">
.deg-mgmt input:focus {
	outline: none !important;
	border: 1px solid rgba(232, 13, 13, 0.27) !important;
	box-shadow: 0 0 10px #719ECE;
}
/*  .deg-mgmt .plan-of-action{
  	margin-top: -20px !important;
  } */
</style>
	<jsp:include page="fragments/header.jsp"></jsp:include>


	<div class="pageNameContainer deg-name-header">
		<h4>{{pageName}}</h4>
	</div>
	<div id="mymain" class="container">

		<div class="container">
			<div class="row">
				<div class="col-md-12 ">
					<div class="row">

						<div class="col-md-12 text-center"
							style="border-bottom: 1px solid;">
							<span ng-click="addDesignation()" class="adddeg">Add
								Designation <i class="fa fa-plus" aria-hidden="true"></i>
							</span>
						</div>
						<br>
						<br>

						<div ng-show="addDesignationDiv">

							<div class="form-group">
								<label class="col-md-3" for="textinput">User Level <span
									class="mandatory_star">&#42;</span></label>
								<div class="col-md-5 displayInline">
									<div class="input-group" style="margin: auto;">
										<input path="designationId" type="text"
											placeholder="Select User level" id="userlevel"
											class="form-control not-visible-input  inputBackground"
											name="userlevel" readonly=""
											ng-model="selectedLevel.role_name">
										<div class="input-group-btn" style="position: relative;">
											<button type="button"
												class="btn btn-danger dropdown-toggle user-button"
												data-toggle="dropdown">
												<span class="caret"></span>
											</button>
											<ul class="dropdown-menu level-dropdown drp-dwn-list"
												role="menu">
												<li ng-repeat="level in userLevel"
													ng-click="selectLevel(level);"><a href="">{{level.role_name}}</a></li>
											</ul>
										</div>
									</div>
									<!-- 										<div class="col-md-4 text-left"  ng-show="selectedLevel.role_id == 1 "> -->
									<!-- 										<button ng-model="submitbutton" id="buttonsubmit" name="buttonsubmit"  -->
									<!-- 											class="btn btn-info" ng-click="showState()" type="button">Add State Level Designation</button> -->
									<!-- 										</div> -->

								</div>
								<!-- 									<div class="col-md-4">&nbsp;</div> -->
							</div>
							<br class="tab-responsive-bottom"> <br
								class="tab-responsive-bottom">
							<br>
							<div class="form-group" ng-show="statediv">
								<label class="col-md-3" for="textinput"> State<span
									class="mandatory_star">&#42;</span>
								</label>
								<div class="col-md-5 displayInline">
									<div class="input-group" style="margin: auto;">
										<input path="designationId" type="text"
											placeholder="Select State" id="state"
											class="form-control not-visible-input  inputBackground"
											ng-disabled="stateDisabled" name="state" readonly=""
											ng-model="selectedState.name">
										<div class="input-group-btn" style="position: relative;">
											<button type="button" ng-disabled="stateDisabled"
												class="btn btn-danger dropdown-toggle user-button"
												data-toggle="dropdown">
												<span class="caret"></span>
											</button>
											<ul class="dropdown-menu level-dropdown drp-dwn-list"
												role="menu">
												<li ng-repeat="state in states | orderBy : 'name'"
													ng-click="selectState(state)"><a href="">{{state.name}}</a></li>
											</ul>
										</div>
									</div>
								</div>

							</div>
							<span ng-show="statediv"><br>
							<br></span>

							<div class="form-group">
								<label class="col-md-3" for="textinput"> Organization<span
									class="mandatory_star">&#42;</span>
								</label>
								<div class="col-md-5  displayInline">
									<div class="input-group" style="margin: auto;">
										<input path="designationId" type="text"
											placeholder="Select Organization" id="org"
											class="form-control not-visible-input  inputBackground"
											ng-disabled="orgDisabled" name="org" readonly=""
											ng-model="selectedOrganization.organization_name">
										<div class="input-group-btn" style="position: relative;">
											<button type="button" ng-disabled="orgDisabled"
												class="btn btn-danger dropdown-toggle user-button"
												data-toggle="dropdown">
												<span class="caret"></span>
											</button>
											<ul class="dropdown-menu level-dropdown drp-dwn-list"
												role="menu">
												<li
													ng-repeat="organization in organizations | orderBy : 'organization_name'"
													ng-click="selectOrganization(organization);"><a
													href="">{{organization.organization_name}}</a></li>
											</ul>
										</div>
									</div>
								</div>
								<!-- 									<div class="col-md-4">&nbsp;</div> -->
							</div>

							<br class="tab-responsive-bottom">
							<br>
							<div class="form-group ">
								<label class="col-md-3" for="textinput">Designation <span
									class="mandatory_star">&#42;</span></label>
								<div class="col-md-5 col-xs-12 col-sm-12">
									<input type="text" id="designationId"
										placeholder="Enter Designation " ng-model="designationName"
										hundred-characters-validation ng-disabled="degDisabled"
										class="form-control inputBackground width-input-tab" />
								</div>

							</div>
							<br>
							<br>
							<div class="form-group"
								ng-if="(selectedLevel.role_id==4 || selectedLevel.role_id==5) &&
								(selectedOrganization.organization_id==1 || selectedOrganization.organization_id==2 || 
								selectedOrganization.organization_id==3 || selectedOrganization.organization_id==4 ) ">
								<label class="col-md-3" for="textinput">This designation
									is a Facility In-Charge: </label>
								<div class="col-md-9">
									<div class="col-md-3 chk-deg facility-padd-left">
										<label class="community-deg1" for="textinput">Facility
											In-Charge </label> <input type="checkbox" name="facility"
											ng-model="facilityInCharge.selected">
									</div>
								</div>
							</div>

							<span
								ng-if="(selectedLevel.role_id==4 || selectedLevel.role_id==5) &&
								(selectedOrganization.organization_id==1 || selectedOrganization.organization_id==2 || 
								selectedOrganization.organization_id==3 || selectedOrganization.organization_id==4 ) "><br>
							<br></span>

							<div class="form-group"
								ng-if="(selectedLevel.role_id==4 || selectedLevel.role_id==5 || selectedLevel.role_id==2) &&
								(selectedOrganization.organization_id==1 || selectedOrganization.organization_id==2 || 
								selectedOrganization.organization_id==3 || selectedOrganization.organization_id==4 ) ">
								<label class="col-md-3" for="textinput">This designation
									can be assigned<br> open actions for:
								</label>
								<div class="col-md-9">
									<div class="col-md-3 chk-deg facility-padd-left">
										<label class="community-deg2" for="textinput">Facility
										</label> <input type="checkbox" name="facility"
											ng-model="facility.selected">
									</div>
									<div class="col-md-3 chk-deg facility-padd-left">
										<label class="community-deg" for="textinput">
											Community </label> <input type="checkbox" name="community"
											ng-model="community.selected">
									</div>
								</div>
							</div>

							<span
								ng-if="(selectedLevel.role_id==4 || selectedLevel.role_id==5) &&
								(selectedOrganization.organization_id==1 || selectedOrganization.organization_id==2 || 
								selectedOrganization.organization_id==3 || selectedOrganization.organization_id==4 ) "><br>
							<br></span>
							<div class="col-md-6 text-left col-md-offset-3 hint-deg"
								ng-if="(selectedLevel.role_id==4 || selectedLevel.role_id==5) &&
								(selectedOrganization.organization_id==1 || selectedOrganization.organization_id==2 || 
								selectedOrganization.organization_id==3 || selectedOrganization.organization_id==4 ) ">
								Hint: This designation shall appear in the drop down option for
								"Responsibility"<br> under plan of action section of
								facility and community checklist.
							</div>
							<br class="tab-responsive-bottom"> <br>


							<div class="col-md-12 text-center" style="margin-left: -44px;">
								<button ng-model="submitbutton" id="buttonsubmit"
									name="buttonsubmit" style="margin-bottom: 30px;"
									class="btn btn-info designation-add"
									ng-click="addNewDesignation()" type="button">ADD</button>
							</div>

							<br class="tab-responsive-bottom"> <br>
						</div>
					</div>
				</div>


				<div class="row" style="margin-bottom: 20px;">
					<div
						class="col-md-6 col-sm-6 col-xs-12 text-xs-center text-md-left text-sm-left deg-show-result">
						<b>Showing
							{{(designationTableData|filter:tableFilterWord).length}} out of
							{{designationTableData.length}}</b>
					</div>
					<div
						class="col-md-6 col-sm-6 col-xs-12 text-xs-center text-md-right text-sm-right">
						<section class="searchFacility">
						<div class="select-container text-center"
							style="margin: 0px !important;">
							<div class="input-group" style="margin: auto;">
								<input type="text" placeholder="Search the section below"
									ng-change="filterData(tableFilterWord)" id="searchDashboard"
									class="form-control not-visible-input ui-autocomplete-input ng-valid ng-dirty"
									name="searchFacility" ng-model="tableFilterWord"
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
			</div>
			<div class="row">

				<div class="table-responsive header-fixed-table designation-table"
					style="width: 100%; max-height: 400px;" sdrc-table-header-fix
					tableuniqueclass="'designation-table'"
					tabledata="filterDesTableData">
					<table items="tabledata" show-filter="true" cellpadding="0"
						cellspacing="0" border="0" class="dataTable table table-striped "
						id="dataTable">
						<thead>
							<tr>
								<th class="deg-mgmt-table-head" nowrap>User Level
									<div class="sorting1" ng-click="order('userLevel')">
										<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
											ng-class="{'hiding': sortReverse == true || (sortType != 'userLevel' &&  sortReverse == false)}"></i>
										<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
											ng-class="{'hiding': sortType == 'userLevel' &&  sortReverse == false}"></i>
									</div>
								</th>

								<th class="deg-mgmt-table-head" ng-show="is_country_admin"
									nowrap>Country/State
									<div class="sorting1" ng-click="order('stateName')">
										<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
											ng-class="{'hiding': sortReverse == true || (sortType != 'stateName' &&  sortReverse == false)}"></i>
										<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
											ng-class="{'hiding': sortType == 'stateName' &&  sortReverse == false}"></i>
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
								<th class="deg-mgmt-table-head" nowrap>Responsible for <br>
									Facility Plan of Action


									<div class="sorting1" ng-click="order('responsibleFacility')">
										<i class="plan-of-action fa fa-caret-up fa-lg asc"
											aria-hidden="true"
											ng-class="{'hiding': sortReverse == true || (sortType != 'responsibleFacility' &&  sortReverse == false)}"></i>
										<i class="plan-of-action fa fa-caret-down fa-lg dsc"
											aria-hidden="true"
											ng-class="{'hiding': sortType == 'responsibleFacility' &&  sortReverse == false}"></i>
									</div>
								</th>
								<th class="deg-mgmt-table-head" nowrap>Responsible for <br>
									Community Plan of Action
									<div class="sorting1" ng-click="order('responsibleCommunity')">
										<i class="plan-of-action fa fa-caret-up fa-lg asc"
											aria-hidden="true"
											ng-class="{'hiding': sortReverse == true || (sortType != 'responsibleCommunity' &&  sortReverse == false)}"></i>
										<i class="plan-of-action fa fa-caret-down fa-lg dsc"
											aria-hidden="true"
											ng-class="{'hiding': sortType == 'responsibleCommunity' &&  sortReverse == false}"></i>
									</div>
								</th>
								<th class="deg-mgmt-table-head" nowrap>Is a <br>
									Facility In-Charge
									<div class="sorting1" ng-click="order('responsibleCommunity')">
										<i class="plan-of-action fa fa-caret-up fa-lg asc"
											aria-hidden="true"
											ng-class="{'hiding': sortReverse == true || (sortType != 'responsibleCommunity' &&  sortReverse == false)}"></i>
										<i class="plan-of-action fa fa-caret-down fa-lg dsc"
											aria-hidden="true"
											ng-class="{'hiding': sortType == 'responsibleCommunity' &&  sortReverse == false}"></i>
									</div>
								</th>

							</tr>

						</thead>

						<tbody id="myTable">

							<tr
								dir-paginate="rowData in filterDesTableData|orderBy:filterType:sortReverse | filter:tableFilterWord|itemsPerPage: pageSize">

								<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.userLevel}}</td>
								<td ng-show="is_country_admin" class="pdsa-table"
									sortable="'{{rowData.column}}'">{{rowData.stateName}}</td>
								<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.organizationName
									}}</td>
								<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.designationName}}</td>
								<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.responsibleFacility}}</td>
								<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.responsibleCommunity}}</td>
								<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.isFacilityInCharge}}</td>

							</tr>

						</tbody>

					</table>

				</div>


				<div class="col-md-12 text-center"
					style="font-weight: bold; font-size: 24px; margin-top: 40px;"
					ng-show="(filterDesTableData|filter:tableFilterWord).length==0">
					No Result Found</div>
				<!--Pagination -->
				<div ng-controller="PaginationController"
					style="margin-bottom: 40px">
					<div class="text-right">
						<dir-pagination-controls boundary-links="true"
							on-page-change="pageChangeHandler(newPageNumber)"
							template-url="resources/html/pagination.html"></dir-pagination-controls>
					</div>
				</div>
				<!--End Pagination -->
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
	<div id="infoMessage1" class="modal fade" role="dialog"
		data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<!-- Modal content -->
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class="infohead">
						 <img alt="" src="resources/images/icons/Messages_info_icon.svg"
							style="width: 25px; margin-top: -5px;">&nbsp; 
						INFO
					</div>
					<div class="warnbody">Please confirm if you want to clear the
						data enterd.</div>

					<span><button type="button" class="btn errorOk"
							id="uploadModal" ng-click="reset()">Yes</button></span>
					<button type="button" class="btn errorOk" data-dismiss="modal">No</button>
				</div>
			</div>
		</div>
	</div>




	<div id="pop" class="modal fade" role="dialog" data-backdrop="static"
		data-keyboard="false">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class="successhead1"><img alt="" src="resources/images/icons/Messages_success_icon.svg" style="width: 25px; margin-top: -5px;">&nbsp;SUCCESS</div>
					<div class="successbody">{{errorMsg}}</div>
					<a class="btn btn-default" ng-click="resetDiv()">Ok</a>
				</div>
			</div>
		</div>
	</div>
	<div id="pop1" class="modal fade" role="dialog" data-backdrop="static"
		data-keyboard="false">
		<div class="modal-dialog">
			Modal content
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class=successhead1><img alt="" src="resources/images/icons/Messages_success_icon.svg" style="width: 25px; margin-top: -5px;">&nbsp;User Registration Submitted</div>
					<div class="successbody">
						<span style="color: #A8C0B9;">Registration Submitted
							Successfully </span><br> After approval, Your User ID and Password
						will be sent to your Primary Email ID and Mobile Number within 15
						days.

					</div>
					<a class="btn btn-default" ng-href="home">Ok</a>
				</div>
			</div>
		</div>
	</div>

	<jsp:include page="fragments/footer.jsp"></jsp:include>


	<script type="text/javascript"
		src="resources/js/controllers/designationManagementController.js"></script>

	<script type="text/javascript">
		var app = angular.module("degMgmtApp", []);
		var myAppConstructor = angular.module("degMgmtApp",
				[ 'angularUtils.directives.dirPagination' ]);
		myAppConstructor.controller("degMgmtController", degMgmtController);
	</script>
	<script type="text/javascript"
		src="resources/js/controllers/paginationController.js"></script>


	<script type="text/javascript" src="resources/js/pagination.js"></script>

	<script type="text/javascript"
		src="resources/js/angularDirective/directive.js"></script>




	<script type="text/javascript">
		$(document).ready(function() {
			
				$(".desg-view").addClass('active');
			
	
			$('input').blur(function() {
				var value = $.trim($(this).val());
				$(this).val(value);
			});

		});
	</script>
</body>
</html>