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
<title>Data Entry</title>
<link rel="icon" href="resources/images/icon.png" type="image/png" sizes="16x16">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<!-- <link rel="stylesheet" href="resources/css/bootstrap.min.css"> -->
<link rel="stylesheet" href="resources/css/font-awesome.min.css">
<link rel="stylesheet" href="resources/css/customLoader.css">

 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
 <link rel="stylesheet" href="resources/css/bootstrap-select.min.css">
 <link rel="stylesheet" href="resources/css/styles.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
 
  
<!--   <link rel="stylesheet" href="resources/js/angular.min.js"> -->
  

<link rel="stylesheet" href="resources/css/jquery-ui.min.js">

 <link rel="stylesheet" href="resources/css/jquery-ui.css"> 
<!-- <script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-sanitize.js"></script> -->


</head>
<body background="resources/images/under construction.jpg" style="background-size: 100%;" class="resetpass">




	<jsp:include page="fragments/header.jsp"></jsp:include>


	<!-- <div class="pageNameContainer">
		<h4>{{pageName}}</h4>
	</div> -->
	<div id="mymain" class="container">
		<!-- <div class="userSelection text-left">
			<h5 class="userBorder">Password Information</h5>
		</div> -->

		
	</div>


<div id="errorMessage" class="modal fade" role="dialog"
		data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<!-- Modal content -->
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class="errorhead">
						 <img alt="" src="resources/images/icons/Messages_warning_caution_icon.svg" style="width: 25px; margin-top: -5px;">&nbsp;ERROR
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
						<img alt="" src="resources/images/icons/Messages_success_icon.svg" style="width: 25px; margin-top: -5px;">&nbsp;SUCCESS
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
	


</body>
</html>