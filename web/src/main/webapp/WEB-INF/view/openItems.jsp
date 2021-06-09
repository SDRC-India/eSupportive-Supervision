<!-- 
@author Sourav Keshari Nath
 -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%> --%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/tags/form"
	prefix="springForm"%>

<html ng-app="openItemsApp" >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>Open Item</title>
<link rel="icon" href="resources/images/icon.png" type="image/png" sizes="16x16">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<link rel="stylesheet" href="resources/css/font-awesome.min.css">
<link rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
 <link rel="stylesheet" href="resources/css/customLoader.css">
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
 <link rel="stylesheet" href="resources/css/bootstrap-select.min.css">
 <link rel="stylesheet" href="resources/css/styles.css">
 <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css"></script>
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
 <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js"></script>
 <script src="resources/js/jquery-ui.js"></script>
 <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
 <script src="resources/js/angular.min.js"></script>
 <link rel="stylesheet" href="resources/css/jquery-ui.min.js">
 <link rel="stylesheet" href="resources/css/jquery-ui.css"> 

<style>
.error {
	color: #ff0000;
	font-style: italic;
	font-weight: bold;
}
div#mymain{
margin-top:97px;
}
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
	
	.open-item-input{
	width:185%;	
	}
	.open-item-dropdwn-status{
	left:-149px !important;
	}
	div#statusModal button{
	margin-left:-37px;
	}
}
.table-mrg-tp{
margin-top:24px;
}
@media screen and (max-width: 767px){
.table-responsive{
border:1px solid #fff !important;
}
}
@media (max-width: 992px) and (min-width: 600px){
div#mymain {
    margin-top: 92px !important; 
}
@media only screen and (max-device-width: 1020px){
	div#mymain {
	    margin-top: 118px !important;
	}
}
.ui-widget.ui-widget-content {
    overflow-y: scroll;
    max-height: 300px;
    overflow-x: hidden;
}

.remarks1 input{
	border: 0 !important;
    outline: none !important;
    background: transparent !important;
    border-bottom: 1px solid black !important;
    padding: 0;
}

.deg-mgmt input:focus {
    outline: none !important;
    border:1px solid rgba(232, 13, 13, 0.27) !important;
    box-shadow: 0 0 10px #719ECE;
}

.remarks1 input:focus {
	border: 0 !important;
    outline: none !important;
    background: transparent !important;
    border-bottom: 1px solid black !important;
    padding: 0;
    box-shadow: none;
}

/*  .deg-mgmt .plan-of-action{
  	margin-top: -20px !important;
  } */

</style>
</head>

<body  ng-controller="OpenItemsController" class="deg-mgmt" ng-cloak>
	<jsp:include page="fragments/header.jsp"></jsp:include>
	<div class="pageNameContainer deg-name-header" >
		<h4>Open Item</h4>
	</div>
	<div id="mymain" class="container">
	
			<div class="container">
				<div class="row">
					<div class="col-md-12 ">
					<div class="container-fluid">
					<div class="userSelection text-left perinfotop">
						<h5>My Action <span class="status-notification">{{statusNotificationCount.length}}</span></h5>
					</div>
					<hr>
				</div>
				</div>
				
				</div>
				<div class="row">
                <div class="container" style="margin:10px" ng-show="openItemList.length">
					<div class="col-md-6 col-sm-6 col-xs-12 text-xs-center pull-left" style="padding-left : 0px !important;">
						<b class="col-md-12 text-left">Showing  {{(openItemList|filter:tableFilterWord).length}} out of  {{openItemList.length}}</b>
					</div> 
					<div class="col-md-6 col-sm-6 col-xs-12 text-xs-center text-right" style="padding-right : 0px !important;">
						<section class="searchFacility text-right">
							<div class="select-container text-center">
								<div class="input-group" style="margin: auto;">
									<input type="text" placeholder="Search the section below" ng-change="filterData(facilityName)"
										id="searchDashboard"
										class="form-control not-visible-input ui-autocomplete-input ng-valid ng-dirty"
										name="searchFacility" ng-model="tableFilterWord"
										 autocomplete="off" style="">
									<div class="input-group-btn" style="position: relative;">
										<button data-toggle="dropdown" class="btn btn-color" style="padding: 9px 12px;!important;"
											type="button" >
											<i class="fa fa-search"></i>
										</button>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
				<div class="table-responsive header-fixed-table designation-table table-mrg-tp"
					style="width: 100%; max-height:500px;" sdrc-table-header-fix
					tabledata="openItemList">
					<table items="tabledata" show-filter="true" cellpadding="0" ng-show="openItemList.length>0"
						cellspacing="0" border="0" class="dataTable table table-striped" id="dataTable">
						<thead>
							<tr>
								<th class="deg-mgmt-table-head" nowrap >Received on
									<div class="sorting1" ng-click="order('recievedDate')">
										<!-- <i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
											ng-class="{'hiding': sortReverse == true || (sortType != 'recievedDate' &&  sortReverse == false)}"></i>
										<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
											ng-class="{'hiding': sortType == 'recievedDate' &&  sortReverse == false}"></i> -->
									</div>
								</th>

								<th class="deg-mgmt-table-head" nowrap>Facility Name
									<div class="sorting1" ng-click="order('facilityName')">
										<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
											ng-class="{'hiding': sortReverse == true || (sortType != 'facilityName' &&  sortReverse == false)}"></i>
										<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
											ng-class="{'hiding': sortType == 'facilityName' &&  sortReverse == false}"></i>
									</div>
								</th>

								<th class="deg-mgmt-table-head" nowrap>Assigned by
									<div class="sorting1" ng-click="order('organizationName')">
										<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
											ng-class="{'hiding': sortReverse == true || (sortType != 'organizationName' &&  sortReverse == false)}"></i>
										<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
											ng-class="{'hiding': sortType == 'organizationName' &&  sortReverse == false}"></i>
									</div>
								</th>
								<th class="deg-mgmt-table-head" nowrap>Activities Identified
									<div class="sorting1" ng-click="order('intervention_activities')">
										<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
											ng-class="{'hiding': sortReverse == true || (sortType != 'intervention_activities' &&  sortReverse == false)}"></i>
										<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
											ng-class="{'hiding': sortType == 'intervention_activities' &&  sortReverse == false}"></i>
									</div>
								</th>
								<th class="deg-mgmt-table-head" nowrap>Timeline (In months)
									<div class="sorting1" ng-click="order('timeline')">
										<i class="plan-of-action fa fa-caret-up fa-lg asc"
											aria-hidden="true"
											ng-class="{'hiding': sortReverse == true || (sortType != 'timeline' &&  sortReverse == false)}"></i>
										<i class="plan-of-action fa fa-caret-down fa-lg dsc"
											aria-hidden="true"
											ng-class="{'hiding': sortType == 'timeline' &&  sortReverse == false}"></i>
									</div>
								</th>
								<th class="deg-mgmt-table-head" nowrap>Checklist
									<div class="sorting1" ng-click="order('checklistName')">
										<i class="plan-of-action fa fa-caret-up fa-lg asc"
											aria-hidden="true"
											ng-class="{'hiding': sortReverse == true || (sortType != 'timeline' &&  sortReverse == false)}"></i>
										<i class="plan-of-action fa fa-caret-down fa-lg dsc"
											aria-hidden="true"
											ng-class="{'hiding': sortType == 'timeline' &&  sortReverse == false}"></i>
									</div>
								</th>
								<th class="deg-mgmt-table-head" nowrap>Status
									<div class="sorting1" ng-click="order('status')">
										<!-- <i class="plan-of-action fa fa-caret-up fa-lg asc"
											aria-hidden="true"
											ng-class="{'hiding': sortReverse == true || (sortType != 'status' &&  sortReverse == false)}"></i>
										<i class="plan-of-action fa fa-caret-down fa-lg dsc"
											aria-hidden="true"
											ng-class="{'hiding': sortType == 'status' &&  sortReverse == false}"></i> -->
									</div>
								</th>

							</tr>

						</thead>
					
							<tbody id="myTable">
								<tr dir-paginate="rowData in openItemList|orderBy:filterType:sortReverse | filter:tableFilterWord|itemsPerPage: pageSize" 
								style="cursor: pointer;" ng-click="changeStatus(rowData)">
									<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.recievedDate}}</td>
									<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.facilityName}}</td>
									<td class="pdsa-table assign-col" sortable="'{{rowData.column}}'">{{rowData.assignedBy}}</td>
									<td class="pdsa-table activity-col" sortable="'{{rowData.column}}'">{{rowData.intervention_activities}}</td>
									<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.timeline}}</td>
									<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.checklistName}}</td>
									<td class="pdsa-table" sortable="'{{rowData.column}}'"><button id="buttonreset" name="buttonreset" class="btn btn-info" type="button" ng-class="rowData.status == 139 ? 'open-status' : 'closed-status'">
									<span ng-show="rowData.status == 139">Open</span>
									<span ng-show="rowData.status == 140">Closed</span>
									</button></td>
						
								</tr>
							
							</tbody>
							
						</table>
				</div>
				<div class="col-md-12 text-center"
					style="font-weight: bold; font-size: 24px; margin-top: 40px;"
					ng-show="(openItemList|filter:tableFilterWord).length==0">
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
	<div id="statusModal" class="modal fade" role="dialog" data-backdrop="static"
		data-keyboard="false">
		<div class="modal-dialog">
			Modal content
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class=successhead1>
						Action Item
					</div>
					
						<div class="row statusRowsHeader">
						  <div class="col-sm-3 col-md-3"><span class="statusHeader">Assigned By</span><br>{{statusObj.assignedBy}}</div>
						  <div class="col-sm-3 col-md-3"><span class="statusHeader">Target Month</span><br>{{statusObj.timeline}}</div>
						  <div class="col-sm-3 col-md-3"><span class="statusHeader">Date of Completion</span><br>{{statusObj.dateOfCompletion}}</div>
						  <div class="col-sm-3 col-md-3"><span class="statusHeader">Status</span><br>
			                    <div class="form-group">
											<div style="display: flex;">
											<input type="text" placeholder="Status"
												class="form-control not-visible-input open-item-input inputBackground "
												name="userlevel" ng-disabled="true"
												ng-model="selectedStatusName">
											<div class="input-group-btn" style="position: relative;">
												<button type="button" ng-disabled="statusObj.status==140"
													class="btn btn-danger dropdown-toggle user-button "
													data-toggle="dropdown">
													<span class="caret"></span>
												</button>
												<ul class="dropdown-menu open-item-dropdwn-status drpres" role="menu"  ng-disabled="statusObj.status==140">
													<li ng-repeat="item in statusList"
														ng-click="selectedStatus(item);"><a href="">{{item.name}}</a></li>
												</ul>
											</div>
										</div>
									</div>
						  </div>
						</div>
					    <hr>
						<div class="row statusRows">
						  <div class="col-sm-4 rowHead">Area of Observation</div>
						  <div class="col-sm-8">{{statusObj.sectionName}}</div>
						</div>
						
						<div class="row statusRows">
						  <div class="col-sm-4 rowHead">Level of Intervention:</div>
						  <div class="col-sm-8">{{statusObj.levelOfInterventionName}}</div>
						</div>
						<div class="row statusRows">
						  <div class="col-sm-4 rowHead">Organization:</div>
						   <div class="col-sm-8">{{statusObj.organizationName}}</div>
						</div>
						
						<div class="row statusRows">
						  <div class="col-sm-4 rowHead">Activities Identified:</div>
						  <div class="col-sm-8">{{statusObj.intervention_activities}}</div>
						</div>
						
						<div class="row statusRows">
						  <div class="col-sm-4 rowHead">Closing Remarks*:</div>
						  <div class="col-sm-8 remarks1">
						  	<input class="col-sm-10" id="closing-remark" type="text" ng-model="statusObj.remarks" maxlength="50" ng-readonly="remarksReadOnly">
						  </div>
						</div>
				
					<a class="btn btn-default" ng-click="isClosed == false ? saveConfirmation(statusObj.id, statusObj.remarks) : null"  ng-disabled="statusObj.status==140 || currentStatusId==139">Save</a>
					<a class="btn btn-default" data-dismiss="modal" ng-click="clearInput();">Close</a>
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
					<div class="errorbody">{{errorMessage}}</div>
					<button type="button" class="btn errorOk"  ng-click="closeModal()">Close</button>
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
									style="width: 25px; margin-top: -5px;">&nbsp;INFO</div>
					<div class="warnbody">{{infoMsg}}</div>
					<span><button type="button" class="btn errorOk" id="uploadModal" ng-click="saveStatus()" >Yes</button></span>
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
					<div class="successhead1">
						 <img alt="" src="resources/images/icons/Messages_success_icon.svg" style="width: 25px; margin-top: -5px;">&nbsp;SUCCESS
					</div>
					<div class="successbody">{{successMessage}}</div>
					<a class="btn btn-default" ng-click="reloadPage()">Ok</a>
				</div>
			</div>
		</div>
	</div>
  
	
<jsp:include page="fragments/footer.jsp"></jsp:include>
<script type="text/javascript" src="resources/js/controllers/openItemsController.js"></script>

<script type="text/javascript" src="resources/js/controllers/paginationController.js"></script>
<script type="text/javascript" src="resources/js/pagination.js"></script>
<script type="text/javascript" src="resources/js/angularDirective/directive.js"></script>
<script type="text/javascript">

$(document).ready(function() {
	 
	$('input').blur(function() {
		var value = $.trim($(this).val());
		$(this).val(value);
		});
	
	$(".open-item").addClass('active');
	
	
});

</script>
</body>
</html>