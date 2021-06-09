/**
 * @author Naseem Akhtar (naseem@sdrc.co.in)
 * This controller will send the request for a particular user to change his or her password
 */

appConstructor.controller("resetPasswordController", function($scope, $http, $timeout, $window){
	
	$scope.modalMessage = null;
	$scope.user = {
			uKey : $('#shdjkfh').val(),
			password : undefined
	};
	
	$scope.type = "password";
	
	$scope.changeToText = function(id){
		document.getElementById(id).type = "text";
	};
	
	$scope.changeToPass = function(id){
		document.getElementById(id).type = "password";
	};

	//Pratyush
	var pwMatchedFlag = false;
	$scope.matchPasswords = function(password, confirmPassword){
		if(password != undefined && confirmPassword != undefined && password != confirmPassword){
			document.getElementById('confirmPass').innerHTML = "Passwords don't match";
			pwMatchedFlag = false;
		}else{
			document.getElementById('confirmPass').innerHTML = "";
			pwMatchedFlag = true;
		}
	};
	
	$scope.resetPassword = function(){
		if(pwMatchedFlag){
			$("#loader-mask").show();
			$http.post("changePassword", $scope.user)
			.then(function(result){
				$scope.modalMessage = result.data.message;
				if(result.data.hasError == false){
					$("#successPopUp").modal("show");
				}else if(result.data.hasError == true){
					$scope.failFlag = true;
					$("#errorPopup").modal("show");
				}
				console.log(result);
				$("#loader-mask").fadeOut();
			}, function(err){
				$("#loader-mask").fadeOut();
			});
		}	
	};
});