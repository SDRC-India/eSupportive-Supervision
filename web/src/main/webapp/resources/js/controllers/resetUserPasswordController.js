var app = angular.module("resetpasswordApp", []);
		var myAppConstructor = angular.module("resetpasswordApp");
		myAppConstructor.controller("userPasswordController", userPasswordController);
		function userPasswordController($scope, $http, $filter) {
			$scope.pageName = "Change Password";
			$scope.activeMenu = "change password";
			
			 $scope.validatePassword = function(){
				 	if ($scope.oldPassword == undefined || $scope.oldPassword.trim() =="") {
						$scope.errorMsg = "Please enter current password";
						$("#errorMessage").modal("show");
					}else if ($scope.newPassword == undefined || $scope.newPassword.trim() =="") {
						$scope.errorMsg = "Please enter new password";
						$("#errorMessage").modal("show");
					}else if($scope.oldPassword == $scope.newPassword){	
						$scope.errorMsg = "Your current password should not be your new password";
						$("#errorMessage").modal("show");
					}else if ($scope.confirmPassword == undefined || $scope.confirmPassword.trim() =="") {
						$scope.errorMsg = "Please enter confirm password";
						$("#errorMessage").modal("show");
					}else if($scope.confirmPassword != $scope.newPassword ){
						$scope.errorMsg = "Passwords don't match";
						$("#errorMessage").modal("show");
					}else{
						$("#loader-mask").show();
						var obj = {
								currentPassword : $scope.oldPassword,
								newPassword : $scope.newPassword
						};
						
						$http.post("resetPwd",obj).then(function(result) {
							if (result.data.valid == 'false') {
								$scope.errorMsg = result.data.errorMessage;
								$("#errorMessage").modal("show");
							} else {
								$scope.msg = result.data.errorMessage;
								$("#pop").modal("show");
							}
							$("#loader-mask").fadeOut();
						}, function errorCallback(response){
							$scope.errorMsg = "Error! Please login and try again";
							$("#loader-mask").fadeOut();
							$("#errorMessage").modal("show");
						});
					}
				};
			
			 $scope.validateConfirmPassword = function(confirmPassword){
				 if($scope.newPassword != undefined){
						if(confirmPassword.trim() != "" && $scope.newPassword != confirmPassword){
//							document.getElementById('newpass').innerHTML = "";
							document.getElementById('confirmpass').innerHTML = "Passwords don't match";
						}else{
							document.getElementById('confirmpass').innerHTML = "";
//							document.getElementById('newpass').innerHTML = "";
						}
					}
					
					
				};
				
				$scope.validateNewPassword = function(newPassword, oldPassword){
					 if($scope.confirmPassword != undefined){
							if($scope.confirmPassword.trim() != "" && $scope.newPassword.trim() != "" && $scope.confirmPassword != newPassword){
								document.getElementById('confirmpass').innerHTML = "Passwords don't match";
								document.getElementById('newpass').innerHTML = "";
							}else{
								document.getElementById('newpass').innerHTML = "";
								document.getElementById('confirmpass').innerHTML = "";
							}
						}
						if(oldPassword != undefined && oldPassword.trim() != "" && oldPassword == newPassword){
							document.getElementById('newpass').innerHTML = "Your current password should not be your new password";
						}
						else
							document.getElementById('newpass').innerHTML = "";
					};
				
					 $scope.focusinput = function (){
						 $("#errorMessage").modal("hide");
						 if($scope.errorMsg == "Please enter current password"){
							 document.getElementById('oldPassword').focus();
						 } else if($scope.errorMsg == "Please enter new password"){
							 document.getElementById('newPassword').focus();
						 }else if($scope.errorMsg == "Please enter confirm password"){
							 document.getElementById('confirmPassword').focus();
						 }else if($scope.errorMsg == "Passwords don't match"){
							 document.getElementById('confirmPassword').focus();
						 }else if($scope.errorMsg == 'Error! Please login and try again'){
							 $scope.oldPassword = "";
							 $scope.newPassword = "";
							 $scope.confirmPassword = "";
						 }
					 }
					 
					 $scope.changeToText = function(id){
						 document.getElementById(id).type = "text";
					 };
						
					 $scope.changeToPass = function(id){
						 document.getElementById(id).type = "password";
					 };
			
		}