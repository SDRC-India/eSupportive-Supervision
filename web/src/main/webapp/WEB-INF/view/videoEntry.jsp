 <%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Manage Video Gallery</title>
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
<script type="text/javascript" src="resources/js/controllers/videoEntryController.js"></script>
<style type="text/css">
 .table>thead:first-child>tr:first-child>th {
	background-color: #f0b569;
	text-align: center;
	border-right: 2px solid;
	border-right-color: #fff;
	width: 190px !important; 
} 
td.highlight {
	background-color: whitesmoke !important;
}
.table>tbody>tr>td {
	text-align: center;
}
@media (max-width:360px){
.image-entry-button{
    margin-left: -83px !important;
}
}
@media (max-width:320px){
.image-entry-button{
    margin-left: -45px !important;
}
}
@media screen and (max-width: 767px){
.table-responsive{
border:1px solid #fff !important;
}
}
@media only screen and (max-device-width: 580px){
	section.bottomfooter{
	position:fixed;
	}
	.navbar-fixed-top{
	position:fixed;
	}
}
@media screen and (max-width: 767px) {
	.table-responsive {
		overflow-y: scroll !important;
	}
	.static-header-container{
			height:60px;
	}
}

</style>
</head>
<body ng-app="videoEntryApp" ng-controller="videoEntryController" ng-cloak>
<jsp:include page="fragments/header.jsp" />
    <div class="pageNameContainer">
		<h4>{{pageName}}</h4>
	</div>
	<div id="spinner" class="loader" style="display: none;"></div>
	<div id="loader-mask" class="loader" style="display: none;"></div>
    <div id="mymain" class="container">
		<div class="container entry-content">
			<div class="row newsupadates-row">
				<div class="container-fluid">
					<div class="col-md-12">
						<div class="col-md-4 text-xs-left text-md-right">
							<label for="textinput">Video Title <span class="mandatory_star">&#42;</span></label>
						</div>
						<div class="col-md-5">
							<input id="videoTitle" placeholder="Enter Video Title"
								ng-model="videoDetails.title"
								class="form-control inputBackground" autocomplete="off"
								maxlength="50" />
						</div>
					</div>
				</div>
			</div>
			<div class="row newsupadates-row">
				<div class="container-fluid">
					<div class="col-md-12">
						<div class="col-md-4 text-xs-left text-md-right">
							<label for="textinput">Video URL <span class="mandatory_star">&#42;</span></label>
						</div>
						<div class="col-md-5">
							<input id="videoUrl" placeholder="Enter Video URL"
								ng-model="videoDetails.videoUrl"
								class="form-control inputBackground" autocomplete="off"
								maxlength="100" />
						</div>
					</div>
				</div>
			</div>
			<div class="row newsupadates-row">
				<div class="container-fluid">
						<div class="col-md-12 text-center video_btn">
							<button ng-model="submitbutton" id="buttonsubmit"
								name="buttonsubmit" class="btn btn-info image-entry-button" ng-click="submit()"
								type="button">{{foreButton}}</button>
							<button id="buttonreset" name="buttonreset" ng-click="reset()"
								class="btn btn-info" type="button">RESET</button>
						</div>
				</div>
			</div>
			<div class="userSelection text-left perinfotop row">
				<h5 class="userBorder"></h5>
			</div>
			<div ng-show="videoGalleryList" class="row" style="margin-bottom: 20px;">
				<div class="col-md-12 news-image-padding"
					ng-show="videoGalleryList.length">
					<div
						class="col-md-6 col-sm-6 col-xs-12 text-md-left text-sm-left text-xs-center 
						deg-show-result news-image-padding">
						<b>Showing
							{{(videoGalleryList|filter:tableFilterWord).length}} out of
							{{videoGalleryList.length}}</b>
					</div>
					<div
						class="col-md-6 col-sm-6 col-xs-12 text-md-right text-sm-right news-image-padding">
						<section class="searchFacility">
						<div class="select-container text-center" style="margin: 0px !important;">
							<div class="input-group" style="margin: auto;">
								<input type="text" placeholder="Search the section below" id="searchDashboard"
									ng-change="videoGalleryData(title)"
									class="form-control not-visible-input ui-autocomplete-input ng-valid ng-dirty"
									name="searchFacility" ng-model="tableFilterWord"
									autocomplete="off" style="">
								<div class="input-group-btn" style="position: relative;">
									<button data-toggle="dropdown" class="btn btn-color"
									style="padding: 9px 12px;!important;" 
										type="button" ng-click="search(title)">
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
			<div class="table-responsive header-fixed-table video-table"
					style="width: 100%;" sdrc-table-header-fix
					tableuniqueclass="'video-table'"
					tabledata="videoGalleryList">
			<table items="tableData" show-filter="true" cellpadding="0"
						cellspacing="0" border="0" class="dataTable table table-striped image-bottom"
						id="dataTable" ng-show="videoGalleryList.length>0">
				<thead>
					<th>Title
					<div class="sorting1" ng-click="order('title')">
							<!-- <i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
								ng-class="{'hiding': sortReverse == true || (sortType != 'title' &&  sortReverse == false)}"></i>
							<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
								ng-class="{'hiding': sortType == 'title' &&  sortReverse == false}"></i> -->
						</div>
					</th>
					<th>Video URL
					<!-- <div class="sorting1" ng-click="order('videoUrl')">
							<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
								ng-class="{'hiding': sortReverse == true || (sortType != 'videoUrl' &&  sortReverse == false)}"></i>
							<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
								ng-class="{'hiding': sortType == 'videoUrl' &&  sortReverse == false}"></i>
						</div> -->
					</th>
					<th>Created Date
					<div class="sorting1" ng-click="order('createdDate')">
							<i class="fa fa-caret-up fa-lg asc" aria-hidden="true"
								ng-class="{'hiding': sortReverse == true || (sortType != 'createdDate' &&  sortReverse == false)}"></i>
							<i class="fa fa-caret-down fa-lg dsc" aria-hidden="true"
								ng-class="{'hiding': sortType == 'createdDate' &&  sortReverse == false}"></i>
						</div>
					</th>
					<th>Edit/Delete</th>
			    </thead>
				<tbody>
					<tr dir-paginate="rowData in videoGalleryList | orderBy:filterType:sortReverse | filter:tableFilterWord |itemsPerPage: pageSize">
						<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.title}}</td>
						<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.videoUrl}}</td>
						<td class="pdsa-table" sortable="'{{rowData.column}}'">{{rowData.createdDate}}</td>
						<td class="pdsa-table"><button id="buttonreset" name="buttonreset" ng-click="editEarmark(rowData.videoId)"
					class="btn btn-info" type="button">Edit</button><button id="buttonreset" name="buttonreset" ng-click="deleteConfirmation(rowData.videoId)"
					class="btn btn-info" type="button">Delete</button></td>
					</tr>
				</tbody>
			</table>
			</div>
		    <div class="col-md-12 text-center no-result no-result-bottom"
					ng-show="(videoGalleryList|filter:tableFilterWord).length == 0">
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
		</div>
		</div>
		<div id="pop" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class="successhead1">
						<img alt="" src="resources/images/icons/Messages_success_icon.svg" style="width: 25px; margin-top: -5px;">&nbsp;  SUCCESS
					</div>
					<div class="successbody">{{successMessage}}</div>
					<a class="btn btn-default" data-dismiss="modal">Ok</a>
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
							<span><button type="button" class="btn errorOk" id="uploadModal" ng-click="deleteVideoGallery()" >Yes</button></span>
							<button type="button" class="btn errorOk" data-dismiss="modal"  >No</button>
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
					<button type="button" class="btn errorOk" ng-click="focusinput()">Close</button>
				</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
		$(document).ready(function() {
			$(".video-entry").addClass('active');
		});
	</script>
</body>
<jsp:include page="fragments/footer.jsp" />
<script type="text/javascript" src="resources/js/zooming.min.js"></script>
<script type="text/javascript" src="resources/js/controllers/paginationController.js"></script>	
<script type="text/javascript" src="resources/js/pagination.js"></script>
<script type="text/javascript"
		src="resources/js/angularDirective/directive.js"></script>
</html>