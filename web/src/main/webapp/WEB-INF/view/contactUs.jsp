<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%> --%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/tags/form"
	prefix="springForm"%>

<html ng-app="resetpasswordApp" >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>User Registration</title>
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<!-- <link rel="stylesheet" href="resources/css/bootstrap.min.css"> -->
<link rel="stylesheet" href="resources/css/font-awesome.min.css">
<link rel="stylesheet" href="resources/css/customLoader.css">

 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
 <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.5.4/bootstrap-select.min.css">
 <link rel="stylesheet" href="resources/css/styles.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
 
  
<!--   <link rel="stylesheet" href="resources/js/angular.min.js"> -->
  

<link rel="stylesheet" href="resources/css/jquery-ui.min.js">

 <link rel="stylesheet" href="resources/css/jquery-ui.css"> 
<!-- <script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-sanitize.js"></script> -->

<style>
.error {
	color: #ff0000;
	font-style: italic;
	font-weight: bold;
}
</style>
</head>
<body  ng-controller="userPasswordController" class="resetpass">

<style type="text/css">
.resetpass input:focus { 
    outline: none !important;
    border:1px solid rgba(232, 13, 13, 0.27) !important;
    box-shadow: 0 0 10px #719ECE;

}
</style>


	<jsp:include page="fragments/header.jsp"></jsp:include>


	<!-- <div class="pageNameContainer">
		<h4>{{pageName}}</h4>
	</div> -->
	<div id="mymain" class="container">
		<!-- <div class="userSelection text-left">
			<h5 class="userBorder">Password Information</h5>
		</div> -->

		<p style="font-size: 36px;">Page under construction</p>
	</div>


<div id="errorMessage" class="modal fade" role="dialog"
		data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<!-- Modal content -->
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class="errorhead">
						 ERROR
					</div>
					<div class="errorbody">{{errorMsg}}</div>
					<button type="button" class="btn errorOk" ng-click="focusinput()">Close</button>
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
						SUCCESS
					</div>
					<div class="successbody">{{msg}}</div>
					<a class="btn btn-default" ng-href="register">Ok</a>
				</div>
			</div>
		</div>
	</div>
	
	<jsp:include page="fragments/footer.jsp"></jsp:include>

	<script src="resources/js/jquery-ui.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="resources/js/angular.min.js"></script>
	<script type="text/javascript">
		
		//myAppConstructor.service('allServices', allServices);
	</script>
	
	<!-- 	<script type="text/javascript" -->
	<!-- 		src="resources/js/angularService/services.js"></script> -->
	
	
	<script type="text/javascript"
		src="resources/js/controllers/resetUserPasswordController.js"></script>
	

<script type="text/javascript">
		$(document).ready(function() {
			
			
			$(".slideMenu").css("height", $(window).height() - 75);
			if($(window).width() <= 1024){
				$(".slideMenu").css("height", "auto");
			}
			$(".menuSlideBtn button").click(function(e) {
				$(".slideMenu").animate({
					left : 0
				}, 500);
				e.stopPropagation();
			});
			$('body').click(function(evt){    
			       if(evt.target.id == "slideMenu")
			          return;
			       //For descendants of menu_content being clicked, remove this check if you do not want to put constraint on descendants.
			       else if($(evt.target).closest('#slideMenu').length)
			          return;             

			      //Do processing of click event here for every element except with id menu_content
			       else{
			    	   $("#slideMenu").animate({
				   			left: "-250px"
				   		}, 500);
			       }
			});
			$(".slide-menu-icon").click(function(){
				$(".slideMenu").animate({
					left: "-250px"
				}, 500);
			});
		});
	</script>
</body>
</html>