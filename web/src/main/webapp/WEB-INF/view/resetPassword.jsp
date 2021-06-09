<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>e Supportive Supervision</title>
<link rel="icon" href="resources/images/icon.png" type="image/png" sizes="16x16">
<link rel="stylesheet" href="resources/css/bootstrap.min.css">
<link rel="stylesheet" href="resources/css/font-awesome.min.css">
<link rel="stylesheet" href="resources/css/customLoader.css">
<link rel="stylesheet" href="resources/css/styles.css">
<script type="text/javascript" src="resources/js/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="resources/js/bootstrap.min.js"></script>

</head>
<body ng-app="essApp" ng-controller="resetPasswordController" ng-cloak>
<jsp:include page="fragments/header.jsp"></jsp:include>

	<div class="container">
		<input type="hidden" id="shdjkfh" value="${shdjkfh}">
		<div class="row">
			<div class="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
				<form role="form" class="sign_up_form" name="resPass" id="resPass">
					<h2 class="sign_up_title">Reset password</h2>
					<p>Please enter your new password and click on reset.</p>
					<div class="input-group form-group reset-moz" style="display: -webkit-box !important">
						<input type="password" id="password" ng-model="user.password" required 
							class="form-control input-lg pwd" placeholder="New Password" onpaste="return false"
							ng-keyup="matchPasswords(user.password, confirmPassword)" password-validation
							tabindex="4">
							<div id="newpass" class="error-style"></div>
<!-- 						<span class="input-group-addon"> -->
<!-- 							<i class="fa fa-eye" aria-hidden="true" ng-mouseenter="changeToText('password')" ng-mouseleave="changeToPass('password')"></i> -->
<!-- 						</span> -->
					</div>
					<div class="input-group form-group reset-moz" style="display: -webkit-box !important">
						<input type="text" id="confirmPassword" ng-model="confirmPassword" required
							class="form-control input-lg pwd" placeholder="Confirm Password" onpaste="return false"
							ng-keyup="matchPasswords(user.password, confirmPassword)" password-validation
							tabindex="4">
							
<!-- 						<span class="input-group-addon" > -->
<!-- 							<i class="fa fa-eye" aria-hidden="true" ng-mouseenter="changeToText('confirmPassword')" ng-mouseleave="changeToPass('confirmPassword')"></i> -->
<!-- 						</span> -->
						
					</div>
					<div id="confirmPass" class="error-style" style="display:block; margin-top:-10px !important;"></div>
					<div class="row">
						<div class="col-xs-12 col-md-12" style="padding-top:10px !important;">
							<button class="btn btn-block btn-lg btn-ess" ng-click="resPass.$invalid ? '' : resetPassword()">Reset</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	
	<div id="successPopUp" class="modal fade" role="dialog" data-backdrop="static" style="margin: 100px auto;
    z-index: 12000;"
		data-keyboard="false">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class="successhead1">
						 SUCCESS
					</div>
					<div class="successbody">{{modalMessage}}</div>
					<a class="btn btn-default" href="home">Ok</a>
				</div>
			</div>
		</div>
	</div>
	
	<div id="errorPopup" class="modal fade" role="dialog" style="margin: 100px auto; z-index: 12000;"
		data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<!-- Modal content -->
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class="errorhead">INFO</div>
					<div class="errorbody">{{modalMessage}}</div>
					<a class="btn btn-default" href="home">Ok</a>
				</div>
			</div>
		</div>
	</div>
	
<jsp:include page="fragments/footer.jsp"></jsp:include>
</body>

<script src="resources/js/jquery-ui.js"></script>
<script type="text/javascript" src="resources/js/angular.min.js"></script>
<script>
		var app = angular.module('essApp', []);
		var appConstructor = angular.module('essApp');
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
<script type="text/javascript" src="resources/js/controllers/resetPasswordController.js"></script>
<script type="text/javascript"
		src="resources/js/angularDirective/directive.js"></script>
</html>