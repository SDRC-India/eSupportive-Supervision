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
<title>Change Password</title>
<link rel="icon" href="resources/images/icon.png" type="image/png" sizes="16x16">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<!-- <link rel="stylesheet" href="resources/css/bootstrap.min.css"> -->
<link rel="stylesheet" href="resources/css/font-awesome.min.css">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
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

<style>
.error {
	color: #ff0000;
	font-style: italic;
	font-weight: bold;
}
@media only screen and (max-device-width: 1020px){
div#mymain{
	margin-top:120px !important;
	}
}
@media (max-width: 992px){

.pdsa-main-margin {
    margin-bottom: 398px !important;
}
</style>
</head>
<body  ng-controller="userPasswordController" class="resetpass" ng-cloak>

<style type="text/css">
.resetpass input:focus { 
    outline: none !important;
    border:1px solid rgba(232, 13, 13, 0.27) !important;
    box-shadow: 0 0 10px #719ECE;

}
</style>


	<jsp:include page="fragments/header.jsp"></jsp:include>


	<div class="pageNameContainer">
		<h4>{{pageName}}</h4>
	</div>
	<div id="mymain" class="container change-pass ">
		<div class="userSelection text-left">
			<h5 class="userBorder">Password Information</h5>
		</div>

		<form method="POST"  action="resetPwd" enctype="multipart/form-data" id="resetpassword" name="resetpassword">
		<fieldset>
			<div class="container">
				<div class="row">
					<div class="col-md-12 pdsa-main-margin">
					<div class="container-fluid">

									<!-- ---------------------New user details  @swarna--- -->
									<input type="hidden" id="salutationArray" value="${Salutation}">

								
									

									<!-- <div class="form-group">
										<label class="col-md-3" for="textinput"> User ID <span class="mandatory_star">&#42;</span></label>
										<div class="col-md-9">
										
											<input type="text" id="userName" placeholder="Enter user name"
												ng-model="userName" name="userName"
												class="form-control inputBackground" autocomplete="off" />
										</div>
									</div><br><br> -->
									
									<div class="form-group">
										<label class="col-md-3" for="textinput"> Current Password <span class="mandatory_star">&#42;</span></label>
										<div class="col-md-7">
										
											<input type="password" id="oldPassword" placeholder="Enter Current Password" onpaste="return false"
												ng-model="oldPassword" name="oldPassword" ng-keyup="validateNewPassword(newPassword, oldPassword)"
												class="form-control inputBackground pwd" autocomplete="off" maxlength="30" />
										</div>
									</div><br class="tab-responsive-bottom"><br>
									<div class="form-group">
										<label class="col-md-3" for="textinput"> New Password <span class="mandatory_star">&#42;</span></label>
										<div class="col-md-7">
											
											<input type="password" id="newPassword" placeholder="Enter New Password" onpaste="return false"
												ng-model="newPassword" ng-keyup="validateNewPassword(newPassword, oldPassword)" 
												class="form-control inputBackground pwd" autocomplete="off" maxlength="30" password-validation />
<!-- 											<span class="input-group-addon view" ng-mouseenter="changeToText('newPassword')" ng-mouseleave="changeToPass('newPassword')"> -->
<!-- 												<i class="fa fa-eye" aria-hidden="true"></i> -->
<!-- 											</span> -->
											
											<div id="newpass" class="error-style"></div>
										</div>
									</div><br class="tab-responsive-bottom"><br>
									<div class="form-group">
										<label class="col-md-3" for="textinput"> Confirm Password <span class="mandatory_star">&#42;</span></label>
										<div class="col-md-7">
												
											<input type="text" id="confirmPassword" placeholder="Enter Confirm Password" name="conformPassWord" 
												onpaste="return false" ng-model="confirmPassword" ng-keyup="validateConfirmPassword(confirmPassword)"
												class="form-control inputBackground pwd" autocomplete="off" maxlength="30" password-validation />
<!-- 											<span class="input-group-addon view" ng-mouseenter="changeToText('confirmPassword')" ng-mouseleave="changeToPass('confirmPassword')"> -->
<!-- 												<i class="fa fa-eye" aria-hidden="true"></i> -->
<!-- 											</span> -->
											
											<div id="confirmpass" class="error-style"></div>
										</div>
									</div><br class="tab-responsive-bottom"><br>
								
								<div class="form-group">
										
									<div class="col-md-6 col-md-offset-6 col-sm-4 displayInline text-center" >
										
											<button ng-model="submitbutton" id="buttonsubmit1" name="buttonsubmit"
											class="btn btn-info" ng-click="validatePassword()" type="button">SUBMIT</button>
											
									</div>
								</div>
								
							</div>
				</div>
			</div>
			</div>
			</fieldset>
		</form>
	</div>


<div id="errorMessage" class="modal fade" role="dialog"
		data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<!-- Modal content -->
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class="errorhead">
						 <img alt="" src="resources/images/icons/Messages_warning_caution_icon.svg" style="width: 25px; margin-top: -5px;">&nbsp; ERROR
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
	<div id="logoutUserModal" class="modal fade" role="dialog" data-backdrop="static"
		data-keyboard="false">
		<div class="modal-dialog">
			Modal content
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class="successhead1">
						<img alt="" src="resources/images/icons/Messages_success_icon.svg" style="width: 25px; margin-top: -5px;">&nbsp;SUCCESS
					</div>
					<div class="successbody">{{msg}}</div>
					<a class="btn btn-default" ng-href="webLogout">Ok</a>
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
						<img alt="" src="resources/images/icons/Messages_success_icon.svg" style="width: 25px; margin-top: -5px;">&nbsp; SUCCESS
					</div>
					<div class="successbody">{{msg}}</div>
					<a class="btn btn-default"  ng-href="webLogout">Ok</a>
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
		<script type="text/javascript"
		src="resources/js/angularDirective/directive.js"></script>
	<script type="text/javascript">
	
</script>
<script type="text/javascript">
/* for not allowing space(Pratyush) */
$(document).ready(function() {
	$(".pwd").keypress(function (evt) {
	  var keycode = evt.charCode || evt.keyCode;
	  if (keycode  == 32 || keycode  == 47 || keycode  == 92) { 
	    return false;
	  }
	});
});

</script>
<!-- <script type="text/javascript">
		$(document).ready(function() {
			$(".change-pass").addClass('active');
		});
	</script> -->

<script type="text/javascript">
		$(document).ready(function() {
			$(".change-password").addClass('active');
		});
	</script>
</body>
</html>