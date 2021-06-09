<!-- 
@author Suman Saurav Das (sumansaurav.das@sdrc.co.in)
 -->
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
<title>Gallery</title>
<link rel="icon" href="resources/images/icon.png" type="image/png" sizes="16x16">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<!-- <link rel="stylesheet" href="resources/css/bootstrap.min.css"> -->
<link rel="stylesheet" href="resources/css/font-awesome.min.css">
<link rel="stylesheet" href="resources/css/customLoader.css">

 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
 <link rel="stylesheet" href="resources/css/bootstrap-select.min.css">
 <link rel="stylesheet" type="text/css" href="resources/css/lightbox.css">
 <link rel="stylesheet" href="resources/css/styles.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
 
  
<!--   <link rel="stylesheet" href="resources/js/angular.min.js"> -->
  

<link rel="stylesheet" href="resources/css/jquery-ui.min.js">

 <link rel="stylesheet" href="resources/css/jquery-ui.css"> 
<!-- <script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-sanitize.js"></script> -->
<script src="resources/js/angular.min.js"></script>
<style>
.error {
	color: #ff0000;
	font-style: italic;
	font-weight: bold;
}
</style>
</head>
<body class="resetpass">


<body ng-app="VideoGalleryApp" ng-controller ='VideoGalleryController' ng-cloak >

	<jsp:include page="fragments/header.jsp"></jsp:include>

<div class="pageNameContainer newuser-pagename grp" >
		<h4>{{pageName}}</h4>
	</div>
	<div class="container contain-box row-slide gallery-top">
  <div class="row ">
   
    <div class="col-md-12" style="margin-bottom:10%;">
<!--      <h2 class="page_title abt_us pge_gllry">Video Gallery</h2> -->

				<div class="row row_first">
					<div class="col-md-3  bs-example "
						ng-repeat="item in videoGalleryList | orderBy:filterType:sortReverse">
						<a href="#" ng-click="playVideo(item)"
							data-toggle="modal"><img
							src="https://img.youtube.com/vi/{{item.videoUrl}}/default.jpg"
							class="img_gallery vdo-glly-img">
							<span class="videocaption">{{item.title}}</span>
							</a>
							
					</div>
					<div id="myModal" class="modal fade vdo-modal">
						<div class="modal-dialog">
							<div class="modal-content gallery-modal-content">
								<div class="modal-header">
                                   <span class="close" data-dismiss="modal" style="margin-top: -12px;font-size: 35px;">&times;</span>
									<h4 class="modal-title" id="caption">Gallery Videos</h4>
								</div>
								<div class="modal-body">
									<iframe id="video" width="560" height="315" src=""
										frameborder="0" allowfullscreen></iframe>
								</div>
							</div>
						</div>
					</div>
				</div>

  </div>
</div>
<p class="text-center vdo-gllery" ng-show="videonotavailable">No Video Available</p>
</div>
	<jsp:include page="fragments/footer.jsp"></jsp:include>
	<script type="text/javascript"
		src="resources/js/controllers/videoGalleryController.js"></script>
	<script src="resources/js/jquery-ui.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="resources/js/jquery.cubeportfolio.min.js"></script> 
	<script type="text/javascript">
		
		//myAppConstructor.service('allServices', allServices);
	</script>
	
	<!-- 	<script type="text/javascript" -->
	<!-- 		src="resources/js/angularService/services.js"></script> -->
	
	
	<script type="text/javascript"
		src="resources/js/controllers/resetUserPasswordController.js"></script>
		
 <script>
  	$("#myModal").on('hidden.bs.modal', function (e) { $("#myModal iframe").attr("src", "")});
 </script>
 
	

<script type="text/javascript">
$(document).ready(function(){
		  $(".gallery-active").addClass('active');
	});
</script> 
</body>
</html>