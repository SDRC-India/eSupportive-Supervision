<!-- 
@author Sarita Panigrahi (sarita@sdrc.co.in)
@author Devikrushna  (devikrushna@sdrc.co.in)
@autor  suman	(sumansaurav@sdrc.co.in)
 -->
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@page import="org.sdrc.ess.model.web.EssUserModel"%>
<%@page import="org.sdrc.ess.util.Constants"%>
<%@taglib prefix="datatables"
	uri="http://github.com/dandelion/datatables"%>

<html ng-app="userManagementApp" ng-cloak>
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>User Management</title>
<link rel="icon" href="resources/images/icon.png" type="image/png"
	sizes="16x16">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="resources/css/font-awesome.min.css">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="resources/css/customLoader.css">
<link rel="stylesheet" href="resources/css/bootstrap-select.min.css">
<link rel="stylesheet" href="resources/css/styles.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<link rel="stylesheet" href="resources/css/jquery-ui.min.js">
<link rel="stylesheet" href="resources/css/jquery-ui.css">
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="resources/css/jquery-ui.css">
<script src="resources/js/jquery-ui.js"></script>
<script src="resources/js/angular.min.js"></script>
<script src="resources/js/dataTable.js"></script>
<style type="text/css">
.table>thead:first-child>tr:first-child>th {
	background-color: #f0b569;
	text-align: center;
	border-right: 2px solid;
	border-right-color: #fff;
	width: 190px;
}
@media (max-width: 818px){
.menuSlideBtn{
top:100px;
}
}


@media screen and (max-width: 767px) {
	.table-responsive {
		overflow-y: scroll !important;
	}
}
@media all and (-ms-high-contrast: none) , ( -ms-high-contrast : active)
	{
	.table>thead:first-child>tr:first-child>th {
		width: 190px;
	}
	.table>tbody>tr>td {
		padding: 0 39px !important;
	}
	.sorting_1 input[type=checkbox] {
		margin-top: 40px !important;
	}
}

td.highlight {
	background-color: whitesmoke !important;
}

.table>tbody>tr>td {
	text-align: center;
}

@media only screen and (max-device-width: 580px) {
	section.bottomfooter {
		position: fixed;
	}
	.navbar-fixed-top {
		position: fixed;
	}
}

div#mymain {
	margin-top: 111px;
}

@media only screen and (max-device-width: 1020px) {
	div#mymain {
		margin-top: 118px !important;
	}
}
</style>

<body ng-controller="userManagementController" ng-cloak>

	<jsp:include page="fragments/header.jsp"></jsp:include>

	<div class="pageNameContainer pagename-tab ">
		<h4>{{pageName}}</h4>
	</div>

	<div id="mymain" class="container user-mgmt-tab">
		<div class="container user-page">
			<div id="wrapper">
				<div class="content container-fluid" id="containerId">
					<div class="alert alert-success formDataSucessAlert"
						id="sucessAlert">
						<label id="alertModalLabel"></label>
					</div>
					<div class="alert alert-danger formDataSucessAlert"
						id="dangerAlert">
						<label id="alertDangerModalLabel"></label>
					</div>
					<div class="row">
						<div class="col-md-12 margin-top-10 news-image-padding">
							<!-- <div class="user-mgt">
						<h3 class="user-head">User Management</h3>
					</div> -->
							<ul class="nav nav-tabs user-mngmnt-nav border-input">
								<li class="pointerCursor"
									ng-class="{active:selectedTab=='Pending Users'}"
									ng-click="selectPendingUser('Pending Users')"
									style="cursor: pointer;"><a>Pending Users</a></li>

								<li class="pointerCursor"
									ng-class="{active:selectedTab=='Rejected Users'}"
									ng-click="selectRejectedUser('Rejected Users')"
									style="cursor: pointer;"><a>Rejected Users</a></li>

								<li class="pointerCursor"
									ng-class="{active:selectedTab=='User List'}"
									ng-click="selectApprovedUser('User List')"
									style="cursor: pointer;"><a>Approved Users </a></li>

							</ul>
						</div>
					</div>
					<!-- table  -->

					<div ng-show="pendinguserList" class="row">
						<div style="margin-top: 10px" ng-show="pendingUserList.length">
							<div class="col-md-6 text-left news-image-padding deg-show-result">
								<b>Showing
									{{(pendingUserList|filter:tableFilterWord).length}} out of
									{{pendingUserList.length}}</b>
							</div>
							<div class="col-md-6 text-right news-image-padding">
								<section class="searchFacility">
									<div class="select-container text-center"
										style="margin: 0px !important;">
										<div class="input-group" style="margin: auto;">
											<input type="text" placeholder="Search the section below" id="searchDashboard"
												ng-change="pendingfilterData(tableFilterWord)"
												class="form-control not-visible-input ui-autocomplete-input ng-valid ng-dirty"
												name="searchFacility" ng-model="tableFilterWord"
												autocomplete="off" style="">
											<div class="input-group-btn" style="position: relative;">
												<button data-toggle="dropdown" class="btn btn-color"
													type="button" ng-click="search(tableFilterWord)">
													<i class="fa fa-search"></i>
												</button>
											</div>
										</div>
									</div>
								</section>
							</div>
						</div>
					</div>


					<div ng-show="pendinguserList" class="row"
						style="margin-top: 20px;">
						<div class="table-responsive  header-fixed-table  pending-table all-table-height"
							style="width: 100%;"   sdrc-table-header-fix
							tableuniqueclass="'pending-table'" tabledata="pendingUserListFilter">
							<table items="tableData" show-filter="true" cellpadding="0"
								cellspacing="0" border="0"
								class="dataTable table table-striped " id="dataTable"
								ng-show="pendingUserListFilter.length>0">
								<thead>
									<th nowrap>Select</th>
									<th nowrap>User Name
										<div class="sorting1" ng-click="order('username')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'username' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'username' &&  sortReverse == false}"></i>
										</div>
									</th>

									<th nowrap>Name
										<div class="sorting1" ng-click="order('fullName')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'fullName' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'fullName' &&  sortReverse == false}"></i>
										</div>
									</th>
									<th nowrap>Email ID
										<div class="sorting1" ng-click="order('primaryEmailId')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'primaryEmailId' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'primaryEmailId' &&  sortReverse == false}"></i>
										</div>
									</th>
									<th nowrap>Date of Birth
										<div class="sorting1" ng-click="order('birthday')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'birthday' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'birthday' &&  sortReverse == false}"></i>
										</div>
									</th>
									<th nowrap>Location
										<div class="sorting1" ng-click="order('location')" nowrap>
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'location' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'location' &&  sortReverse == false}"></i>
										</div>
									</th>
									<th nowrap>Designation
										<div class="sorting1" ng-click="order('designationName')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'designationName' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'designationName' &&  sortReverse == false}"></i>
										</div>
									</th>
									<th nowrap>Mobile Number
										<div class="sorting1" ng-click="order('phoneNo')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'phoneNo' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'phoneNo' &&  sortReverse == false}"></i>
										</div>
									</th>
									<th nowrap>Aadhaar No.
										<div class="sorting1" ng-click="order('adharCardPhotoNumber')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'adharCardPhotoNumber' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'adharCardPhotoNumber' &&  sortReverse == false}"></i>
										</div>
									</th>
									<th nowrap>Aadhaar Card</th>
									<th nowrap>Pan No.
										<div class="sorting1" ng-click="order('panCardPhotoNumber')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'panCardPhotoNumber' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'panCardPhotoNumber' &&  sortReverse == false}"></i>
										</div>
									</th>
									<th nowrap>Pan Card</th>
									<th nowrap>Submitted On
										<div class="sorting1" ng-click="order('createdDate')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'createdDate' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'createdDate' &&  sortReverse == false}"></i>
										</div>
									</th>
									<!-- <th nowrap>In charge Facility Name
										<div class="sorting1" ng-click="order('inChargeFacilityName')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'inChargeFacilityName' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'inChargeFacilityName' &&  sortReverse == false}"></i>
										</div>
									</th> -->
								</thead>

								<tbody id="myTable">
									<tr
										dir-paginate="rowData in pendingUserListFilter | orderBy:filterType:sortReverse | filter:tableFilterWord|itemsPerPage: pageSize">
										<td class=" sorting_1"><input type="checkbox" value="22"
											name="checkbox" style="cursor: pointer;"
											class="checkbox_check ckeck" ng-model="rowData.checked"></td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.username}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.fullName}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.primaryEmailId
											}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.birthday}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.location}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.designationName}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.phoneNo}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.adharCardPhotoNumber}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'"><img
											ng-if="rowData.adharCardPhotoFilePathName!=null" alt=""
											ng-click=downloadFile(rowData.adharCardPhotoFilePathName)
											style="width: 20px; cursor: pointer;"
											src="resources/images/icons/svg_first_last_doc.svg"> <img
											ng-if="rowData.adharCardPhotoFilePathName==null" alt=""
											style="width: 20px; cursor: pointer;"
											src="resources/images/icons/svg_upload_doc.svg"></td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.panCardPhotoNumber}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'"><img
											ng-if="rowData.panCardPhotoFilePathName!=null" alt=""
											ng-click=downloadFile(rowData.panCardPhotoFilePathName)
											style="width: 20px; cursor: pointer;"
											src="resources/images/icons/svg_first_last_doc.svg"> <img
											ng-if="rowData.panCardPhotoFilePathName==null" alt=""
											style="width: 20px; cursor: pointer;"
											src="resources/images/icons/svg_upload_doc.svg"></td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.createdDate}}</td>
										<!-- <td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.inChargeFacilityName}}</td> -->

									</tr>

								</tbody>


							</table>
							<div class="col-md-12 text-center no-data"
								ng-show="pendingUserListFilter.length == 0">No Pending
								User</div>
							<div class="col-md-12 text-center no-result fire-width"
								ng-show="(pendingUserListFilter|filter:tableFilterWord).length == 0 && pendingUserListFilter.length != 0">
								No Result Found</div>
						</div>

						<!--Pagination -->
						<div ng-controller="PaginationController" class="pending-list"
							ng-show="(pendingUserListFilter|filter:tableFilterWord).length==0">
							<div class="text-right">
								<dir-pagination-controls boundary-links="true"
									on-page-change="pageChangeHandler(newPageNumber)"
									template-url="resources/html/pagination.html"></dir-pagination-controls>
							</div>
						</div>

					</div>





					<!--------------------------------------- end Pending users------------------------------- -->
					<!---------------------------------------approve Section ------------------------------- -->

					<div
						ng-show="approveSection && pendingUserList.length && (pendingUserList|filter:tableFilterWord).length">

						<div class="approveOrReject text-center row">
						<div class="col-md-6 col-sm-6 col-xs-12 text-md-right text-sm-right text-xs-center">
							<button class="submitSCSL" style="background-color: #f0b569;"
								ng-click="approveUser(true)">Approve</button></div>
								<div class="col-md-6 col-sm-6 col-xs-12 text-md-left text-sm-left text-xs-center">
							<button class="submitSCSL" ng-click="approveUser(false)">Reject</button></div>
						</div>
					</div>
					<!---------------------------------------end approve Section------------------------------- -->

					<!------------------------ 	Rejected user list ----------------------------------------------->
					<div ng-show="rejectuserList" class="row">
						<div style="margin-top: 10px" ng-show="rejectedUserList.length">
							<div class="col-md-6 text-left news-image-padding deg-show-result">
								<b>Showing
									{{(rejectedUserList|filter:rejectTableFilter).length}} out of
									{{rejectedUserList.length}}</b>
							</div>
							<div class="col-md-6 text-right news-image-padding">
								<section class="searchFacility">
									<div class="select-container text-center" style="margin: 0px !important;">
										<div class="input-group" style="margin: auto;">
											<input type="text" placeholder="Search the section below" id="searchDashboard"
												ng-change="rejectUserFilter(rejectTableFilter)"
												class="form-control not-visible-input ui-autocomplete-input ng-valid ng-dirty"
												name="searchFacility" ng-model="rejectTableFilter"
												autocomplete="off" style="">
											<div class="input-group-btn" style="position: relative;">
												<button data-toggle="dropdown" class="btn btn-color"
													type="button">
													<i class="fa fa-search"></i>
												</button>
											</div>
										</div>
									</div>
								</section>
							</div>
						</div>
					</div>
					<div ng-show="rejectuserList" class="row" style="margin-top: 20px;">
						<div class="table-responsive all-table-height header-fixed-table reject-table"
							style="width: 100%;" sdrc-table-header-fix
							tableuniqueclass="'reject-table'" tabledata="rejectedUserList">
							<table items="tableData" show-filter="true" cellpadding="0"
								cellspacing="0" border="0"
								class="dataTable table table-striped " id="dataTable"
								ng-show="rejectedUserList.length > 0">
								<thead>
									<th nowrap>User Name
										<div class="sorting1" ng-click="order('username')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'username' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'username' &&  sortReverse == false}"></i>
										</div>
									</th>

									<th nowrap>Name
										<div class="sorting1" ng-click="order('fullName')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'fullName' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'fullName' &&  sortReverse == false}"></i>
										</div>
									</th>
									<th nowrap>Email ID
										<div class="sorting1" ng-click="order('primaryEmailId')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'primaryEmailId' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'primaryEmailId' &&  sortReverse == false}"></i>
										</div>
									</th>
									<th nowrap>Date of Birth
										<div class="sorting1" ng-click="order('birthday')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'birthday' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'birthday' &&  sortReverse == false}"></i>
										</div>
									</th>
									<th nowrap>Location
										<div class="sorting1" ng-click="order('location')" nowrap>
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'location' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'location' &&  sortReverse == false}"></i>
										</div>
									</th>
									<th nowrap>Designation
										<div class="sorting1" ng-click="order('designationName')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'designationName' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'designationName' &&  sortReverse == false}"></i>
										</div>
									</th>
									<th nowrap>Mobile Number
										<div class="sorting1" ng-click="order('phoneNo')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'phoneNo' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'phoneNo' &&  sortReverse == false}"></i>
										</div>
									</th>
									<th nowrap>Aadhaar No.
										<div class="sorting1" ng-click="order('adharCardPhotoNumber')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'adharCardPhotoNumber' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'adharCardPhotoNumber' &&  sortReverse == false}"></i>
										</div>
									</th>
									<th nowrap>Aadhaar Card</th>
									<th nowrap>Pan No.
										<div class="sorting1" ng-click="order('panCardPhotoNumber')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'panCardPhotoNumber' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'panCardPhotoNumber' &&  sortReverse == false}"></i>
										</div>
									</th>
									<th nowrap>Pan Card</th>
									<th nowrap>Submitted On
										<div class="sorting1" ng-click="order('createdDate')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'createdDate' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'createdDate' &&  sortReverse == false}"></i>
										</div>
									</th>

									<th nowrap>Rejected On
										<div class="sorting1" ng-click="order('approveRejectDate')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'approveRejectDate' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'approveRejectDate' &&  sortReverse == false}"></i>
										</div>
									</th>
									<th nowrap>Rejection Reason
										<div class="sorting1" ng-click="order('rejectionReason')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'rejectionReason' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'rejectionReason' &&  sortReverse == false}"></i>
										</div>
									</th>
									<!-- <th nowrap>In charge Facility Name
										<div class="sorting1" ng-click="order('inChargeFacilityName')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'inChargeFacilityName' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'inChargeFacilityName' &&  sortReverse == false}"></i>
										</div>
									</th> -->
								</thead>

								<tbody id="myTable1">
									<tr
										dir-paginate="rowData in rejectedUserList | orderBy:filterType:sortReverse | filter:rejectTableFilter|itemsPerPage: pageSize">

										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.username}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.fullName}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.primaryEmailId
											}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.birthday}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.location}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.designationName}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.phoneNo}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.adharCardPhotoNumber}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'"><img
											ng-if="rowData.adharCardPhotoFilePathName!=null" alt=""
											ng-click=downloadFile(rowData.adharCardPhotoFilePathName)
											style="width: 20px; cursor: pointer;"
											src="resources/images/icons/svg_first_last_doc.svg"> <img
											ng-if="rowData.adharCardPhotoFilePathName==null" alt=""
											style="width: 20px; cursor: pointer;"
											src="resources/images/icons/svg_upload_doc.svg"></td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.panCardPhotoNumber}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'"><img
											ng-if="rowData.panCardPhotoFilePathName!=null" alt=""
											ng-click=downloadFile(rowData.panCardPhotoFilePathName)
											style="width: 20px; cursor: pointer;"
											src="resources/images/icons/svg_first_last_doc.svg"> <img
											ng-if="rowData.panCardPhotoFilePathName==null" alt=""
											style="width: 20px; cursor: pointer;"
											src="resources/images/icons/svg_upload_doc.svg"></td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.createdDate}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.approveRejectDate}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.rejectionReason}}</td>
										<!-- <td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.inChargeFacilityName}}</td> -->
									</tr>
								</tbody>

							</table>
							<div class="col-md-12 text-center no-result fire-width"
								ng-show="(rejectedUserList|filter:rejectTableFilter).length==0 && rejectedUserList.length != 0">
								No Result Found</div>
							<div class="col-md-12 text-center no-data fire-width"
								ng-if="rejectedUserList.length == 0">No Rejected User</div>

						</div>
						<div ng-controller="PaginationController" class="reject-list" style="margin-bottom: 40px">
							<div class="text-right">
								<dir-pagination-controls boundary-links="true"
									on-page-change="pageChangeHandler(newPageNumber)"
									template-url="resources/html/pagination.html"></dir-pagination-controls>
							</div>
						</div>
					</div>

					<!-- end -->

					<!-- ----------------------- approved user list --------------------- -->
					<div ng-show="approveuserList" class="row">
						<div class="col-md-12 text-center no-data fire-width"
							ng-if="approvedUserList.length == 0">No Approved User</div>
						<div style="margin-top: 10px"
							ng-show="approvedUserList.length">
							<div class="col-md-6 text-left news-image-padding deg-show-result">
								<b>Showing
									{{(approvedUserList|filter:approveTableFilter).length}} out of
									{{approvedUserList.length}}</b>
							</div>
							<div class="col-md-6 text-right news-image-padding">
								<section class="searchFacility">
									<div class="select-container text-center" style="margin: 0px !important;">
										<div class="input-group" style="margin: auto;">
											<input type="text" placeholder="Search the section below" id="searchDashboard"
												ng-change="approveUserFilter(approveTableFilter)"
												class="form-control not-visible-input ui-autocomplete-input ng-valid ng-dirty"
												name="searchFacility" ng-model="approveTableFilter"
												autocomplete="off" style="">
											<div class="input-group-btn" style="position: relative;">
												<button data-toggle="dropdown" class="btn btn-color"
													type="button">
													<i class="fa fa-search"></i>
												</button>
											</div>
										</div>
									</div>
								</section>
							</div>
						</div>
					</div>
					<div ng-show="approveuserList" class="row" style="margin-top: 20px;">
						<div
							class="table-responsive all-table-height header-fixed-table approve-table table-height-approved"
							style="width: 100%;" sdrc-table-header-fix 
							tableuniqueclass="'approve-table'" tabledata="approvedUserList">
							<table items="tableData" show-filter="true" cellpadding="0"
								cellspacing="0" border="0"
								class="dataTable table table-striped " id="dataTable"
								ng-show="approvedUserList.length>0">
								<thead>

									<th nowrap>User Name
										<div class="sorting1" ng-click="order('username')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'username' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'username' &&  sortReverse == false}"></i>
										</div>
									</th>

									<th nowrap>Name
										<div class="sorting1" ng-click="order('fullName')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'fullName' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'fullName' &&  sortReverse == false}"></i>
										</div>
									</th>
									<th nowrap>Email ID
										<div class="sorting1" ng-click="order('primaryEmailId')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'primaryEmailId' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'primaryEmailId' &&  sortReverse == false}"></i>
										</div>
									</th>
									<th nowrap>Date of Birth
										<div class="sorting1" ng-click="order('birthday')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'birthday' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'birthday' &&  sortReverse == false}"></i>
										</div>
									</th>
									<th nowrap>Location
										<div class="sorting1" ng-click="order('location')" nowrap>
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'location' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'location' &&  sortReverse == false}"></i>
										</div>
									</th>
									<th nowrap>Designation
										<div class="sorting1" ng-click="order('designationName')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'designationName' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'designationName' &&  sortReverse == false}"></i>
										</div>
									</th>
									<th nowrap>Mobile Number
										<div class="sorting1" ng-click="order('phoneNo')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'phoneNo' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'phoneNo' &&  sortReverse == false}"></i>
										</div>
									</th>
									<th nowrap>Aadhaar No.
										<div class="sorting1" ng-click="order('adharCardPhotoNumber')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'adharCardPhotoNumber' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'adharCardPhotoNumber' &&  sortReverse == false}"></i>
										</div>
									</th>
									<th nowrap>Aadhaar Card 
									</th>
									<th nowrap>Pan No.
										<div class="sorting1" ng-click="order('panCardPhotoNumber')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'panCardPhotoNumber' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'panCardPhotoNumber' &&  sortReverse == false}"></i>
										</div>
									</th>
									<th nowrap>Pan Card</th>

									<th nowrap>Submitted On
										<div class="sorting1" ng-click="order('createdDate')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'createdDate' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'createdDate' &&  sortReverse == false}"></i>
										</div>
									</th>
									<th nowrap>Approved On
										<div class="sorting1" ng-click="order('approveRejectDate')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'approveRejectDate' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'approveRejectDate' &&  sortReverse == false}"></i>
										</div>
									</th>
									<!-- <th nowrap>In charge Facility Name
										<div class="sorting1" ng-click="order('inChargeFacilityName')">
											<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
												ng-class="{'hiding': sortReverse == true || (sortType != 'inChargeFacilityName' &&  sortReverse == false)}"></i>
											<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
												ng-class="{'hiding': sortType == 'inChargeFacilityName' &&  sortReverse == false}"></i>
										</div>
									</th> -->
								</thead>

								<tbody id="myTable2">
									<tr
										dir-paginate="rowData in approvedUserList | orderBy:filterType:sortReverse | filter:approveTableFilter|itemsPerPage: pageSize">

										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.username}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.fullName}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.primaryEmailId
											}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.birthday}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.location}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.designationName}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.phoneNo}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.adharCardPhotoNumber}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'"><img
											ng-if="rowData.adharCardPhotoFilePathName!=null" alt=""
											ng-click=downloadFile(rowData.adharCardPhotoFilePathName)
											style="width: 20px; cursor: pointer;"
											src="resources/images/icons/svg_first_last_doc.svg"> <img
											ng-if="rowData.adharCardPhotoFilePathName==null" alt=""
											style="width: 20px; cursor: pointer;"
											src="resources/images/icons/svg_upload_doc.svg"></td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.panCardPhotoNumber}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'"><img
											ng-if="rowData.panCardPhotoFilePathName!=null" alt=""
											ng-click=downloadFile(rowData.panCardPhotoFilePathName)
											style="width: 20px; cursor: pointer;"
											src="resources/images/icons/svg_first_last_doc.svg"> <img
											ng-if="rowData.panCardPhotoFilePathName==null" alt=""
											style="width: 20px; cursor: pointer;"
											src="resources/images/icons/svg_upload_doc.svg"></td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.createdDate}}</td>
										<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.approveRejectDate}}</td>
										<!-- <td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.inChargeFacilityName}}</td> -->
									</tr>
								</tbody>

							</table>
							<div class="col-md-12 text-center no-result fire-width1"
								ng-show="(approvedUserList|filter:approveTableFilter).length==0 && approvedUserList.length != 0">
								No Result Found</div>
							<div class="col-md-12 text-center no-data"
								ng-if="approvedUserList.length == 0">No Rejected User</div>

						</div>

						<div ng-controller="PaginationController"
							style="margin-bottom: 40px">
							<div class="text-right">
								<dir-pagination-controls boundary-links="true"
									on-page-change="pageChangeHandler(newPageNumber)"
									template-url="resources/html/pagination.html"></dir-pagination-controls>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


	<!-- <div class="text-right scroll-left-right" 
	ng-show="pendinguserList && pendingUserList.length ? true: approveuserList && approvedUserList .length?true: rejectuserList && rejectedUserList.length?true:false "
		style="margin-bottom: spx; margin-top: 5px;">
		<span class="go-left"> <i class="fa fa-chevron-circle-left"
			aria-hidden="true"
			style="font-size: 40px; color: #333a3b; cursor: pointer;"></i>
		</span> <span class="go-right"><i class="fa fa-chevron-circle-right"
			aria-hidden="true"
			style="font-size: 40px; color: #333a3b; cursor: pointer;"></i> </span>
	</div> -->
	<div id="errorMessage" class="modal fade" role="dialog"
		data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<!-- Modal content -->
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class="errorhead"><img alt="" src="resources/images/icons/Messages_warning_caution_icon.svg" style="width: 25px; margin-top: -5px;">&nbsp;ERROR</div>
					<div ng-if="!errorList || (errorList && errorList.length == 0)"
						class="errorbody">Please select at least one user</div>
					<div class="errorbody"
						ng-repeat="users in errorList track by $index">
						<ul>
							<li style="text-align: left;">{{users}}</li>
						</ul>
					</div>
					<button type="button" class="btn errorOk" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
	<div id="pop" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class="successhead1"><img alt="" src="resources/images/icons/Messages_success_icon.svg" style="width: 25px; margin-top: -5px;">&nbsp;SUCCESS</div>
					<div class="successbody">{{successMessage}}</div>
					<a class="btn btn-default" data-dismiss="modal"
						ng-href="getAllPendingUsers()">Ok</a>
				</div>
			</div>
		</div>
	</div>
	<div id="infoMessage" class="modal fade" role="dialog"
		data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<!-- Modal content -->
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class="infohead">
						<img alt="" src="resources/images/icons/Messages_info_icon.svg"
							style="width: 25px; margin-top: -5px;">&nbsp; INFO
					</div>
					<div class="warnbody">{{infoMsg}}</div>
					<div class="warnbody"
						ng-repeat="users in selectedUserModelList track by $index">
						<div class="col-md-12" style="margin-left: 120px;">
							<ul class="apo-md">
								<li style="text-align: left;">{{users.username}}</li>
							</ul>
						</div>
					</div>
					<span><button type="button" class="btn errorOk"
							id="uploadModal" ng-click="approveSelected(aprroveVariable)">Yes</button></span>
					<button type="button" class="btn errorOk" data-dismiss="modal">No</button>
				</div>
			</div>
		</div>
	</div>
	<div id="rejectionInfoMessage" class="modal fade" role="dialog"
		data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<!-- Modal content -->
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class="infohead">&nbsp; Rejection Reason</div>

					<div class="container-fluid">
						<div ng-repeat="users in selectedUserModelList track by $index"
							class="rejmaindiv">
							<div class="row rejection-row">
								<div class="col-sm-3 col-md-6 col-lg-4 bold-letter">
									<label class="label-username labl_crscr"> User Name<span
										class="mandatory_star">&#42;</span></label>
								</div>
								<div
									class="col-sm-9 col-md-6 col-lg-8 bold-letter text-md-left text-sm-center text-xs-center">
									<span>{{users.username}}</span>
								</div>
							</div>
							<div class="row rejection-row">
								<div class="col-sm-3 col-md-6 col-lg-4 bold-letter">
									<label class="label-username labl_crscr">Rejection
										Reason<span class="mandatory_star">&#42;</span>
									</label>
								</div>
								<div class="col-sm-9 col-md-6 col-lg-8 ">
									<textarea name="name" cols="40" id="rejection-reason"
										style="resize: none; width: 100%;" maxlength="200"
										ng-model="users.rejectionReason"></textarea>
									<span class="char-info">{{200-users.rejectionReason.length}}
										characters left</span>
								</div>
							</div>
						</div>
					</div>
					<div class="btn_can_sub">
						<button type="button" class="btn errorOk" id="uploadModal"
							ng-click="approveSelected(aprroveVariable)">Submit</button>
						<button type="button" class="btn errorOk" data-dismiss="modal" ng-click="clearData()">Cancel</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="errorMessageForRejectionReason" class="modal fade"
		role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<!-- Modal content -->
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class="errorhead"><img alt="" src="resources/images/icons/Messages_warning_caution_icon.svg" style="width: 25px; margin-top: -5px;">&nbsp;ERROR</div>
					<div class="errorbody">{{errorMsg}}</div>
					<button type="button" class="btn errorOk" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<jsp:include page="fragments/footer.jsp"></jsp:include>


	<script type="text/javascript"
		src="resources/js/controllers/userManagementController.js"></script>

	<script type="text/javascript">
		var app = angular.module("userManagementApp", []);
		var myAppConstructor = angular.module("userManagementApp",
				[ 'angularUtils.directives.dirPagination' ]);
		myAppConstructor.controller("userManagementController",
				userManagementController);
	</script>
	<script type="text/javascript"
		src="resources/js/controllers/paginationController.js"></script>


	<script type="text/javascript" src="resources/js/pagination.js"></script>

	<script type="text/javascript"
		src="resources/js/angularDirective/directive.js"></script>

<script type="text/javascript">
		$(document).ready(function() {
			$(".user-mgmt").addClass('active');
		});
	</script>

</body>
</html>