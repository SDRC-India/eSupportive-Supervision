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
<link rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
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


<body ng-app="galleryApp" ng-controller ='GalleryController' ng-cloak >

	<jsp:include page="fragments/header.jsp"></jsp:include>

<div class="pageNameContainer newuser-pagename grp" >
		<h4>{{pageName}}</h4>
	</div>
	<div class="container contain-box row-slide gallery-top">
		<div class="row ">

			<div class="col-md-12" style="margin-bottom: 10%;">
<!-- 				<h2 class="page_title abt_us pge_gllry">Photo Gallery</h2>  -->

				<div class="content">
					<div class="row content gallery_mrgn_row">
						<div class="col-md-3 photo-gallery-ipad" ng-repeat="item in imageGalleryList | orderBy:filterType:sortReverse">
							<a class="example-image-link" href='{{item.images}}'
								data-lightbox="example-set" data-title="{{item.title}}"><img
								class="example-image img img-responsive gallery-img"
								src={{item.images}} alt="" />
								</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<p class="text-center vdo-gllery" ng-if="imagenotavailable">No
			Images Available</p>

	</div>

	<jsp:include page="fragments/footer.jsp"></jsp:include>
	<script type="text/javascript"
		src="resources/js/controllers/galleryController.js"></script>
	<script src="resources/js/jquery-ui.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="resources/js/lightbox-plus-jquery.min.js"></script>
	<script type="text/javascript">
		
		//myAppConstructor.service('allServices', allServices);
	</script>
	
	<!-- 	<script type="text/javascript" -->
	<!-- 		src="resources/js/angularService/services.js"></script> -->
	
	
	<script type="text/javascript"
		src="resources/js/controllers/resetUserPasswordController.js"></script>
	

<script type="text/javascript">
$(document).ready(function(){
		  $(".gallery-active").addClass('active');
	});
</script> 
</body>
</html>