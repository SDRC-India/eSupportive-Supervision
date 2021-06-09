/**
 * @author Ratikanta pradhan 
 * @author Jagat Bandhu Sahoo
 * @author Sourav keshari nath
 */

angular.module("ESSHomeApp", [])
.controller("HomeController", ['$scope', '$http', function($scope, $http){
	/**
	 * @author sourav keshari nath
	 */
	$scope.sortReverse = true;
	$scope.sortType = "createdDate";  
	$scope.loadNewsUpdates = function(){
		$("#loader-mask").show();
		$http.get("getAllNewsUpdates").then(function(result) {
			$scope.newsUpdatesList = result.data;
			$("#loader-mask").fadeOut();
		});
	};
	$scope.loadNewsUpdates();
	
	$scope.forgotPassword = function(){
		$("#homeEmail").modal("show");
				$(".loginPopForm").animate({
					right : "-251px"
				}, 500);
	};
	/**
	 * @author sourav keshari nath
	 */
    $scope.filterType = function(val){};
	
//	
//	$scope.hideemailerror=function()
//	{
//		$("#verifyEmail").hide();
//	};
	
	$scope.validateEmail = function(name, errorId){
		
		$("#verifyEmail").show();
		if (name == undefined){
			if (errorId == 'verifyEmail') {
				document.getElementById(errorId).innerHTML = "Please provide correct email id";
				document.getElementById('email').focus();
				return false;
			}
		}else {
//			 document.getElementById(errorId).innerHTML = "";
			 return true;
			}
	};
	
	$scope.checkEmail = function(){
		
		if($scope.regEmail == undefined || $scope.regEmail.trim() == ''){
			$scope.errorMsg = "Please enter registered Email ID";
			$("#errorMessage").modal("show");
		}
		else{
			$scope.send($scope.regEmail);
		}
	};
	
	$scope.send = function(regEmail){
		$("#loader-mask").show();
		$http.post('forgotPassword', JSON.stringify(regEmail))
		.then(function(result){
			if(result.data.hasError == true){
				$scope.errorMsg = result.data.message;
				$("#errorMessage").modal("show");
				
				
			}else{
				$scope.modalMessage = "Password reset link has been sent to your Email ID.";
				$("#homeEmail").modal("hide");
				$("#pop").modal("show");
			}
			$("#loader-mask").fadeOut();
			$scope.regEmail = undefined;
		}),function(err){
			$("#loader-mask").fadeOut();
			$scope.regEmail = undefined;
		};
	};
	
	$scope.clear = function(){
		$("#homeEmail").modal("hide");
		$scope.regEmail = "";
		document.getElementById('verifyEmail').innerHTML = "";
	}
	$("#email").keypress(function (evt) {
		  var keycode = evt.charCode || evt.keyCode;
		  if (keycode  == 32) { 
		    return false;
		  }
		});
	$scope.showLoader = function(){
		var userName = document.getElementById('username').value;
		var password = document.getElementById('password').value;
		if(userName != "" && password != "")
			$("#loader-mask").show();
	};
	/* for not allowing space, back slash, forward slash(Pratyush) */
	$(document).ready(function() {
		$(".pwd").keypress(function (evt) {
		  var keycode = evt.charCode || evt.keyCode;
		  if (keycode  == 32 || keycode  == 47 || keycode  == 92) { 
		    return false;
		  };
		});
	});
}]);