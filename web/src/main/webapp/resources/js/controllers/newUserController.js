/**
 * @author Devikrushna Nanda (devikrushna@sdrc.co.in)
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in)
 */

var app = angular.module("userApp", []);
		var myAppConstructor = angular.module("userApp");
		myAppConstructor.controller("newUserController", newUserController);
		function newUserController($scope, $http, $filter ,$timeout, $window) {
		
	$("#loader-mask").show();
	$scope.user	= $('#userId').val();
	//console.log($scope.user);
	$scope.salutationArray = {};
	$scope.genderArray = {};
	$scope.organizationArray = {};
	
	$scope.newuser = {};
	$scope.locationshow = false;
	$scope.locationshowbr =false;
	$scope.uploadText = " UPLOAD ";
	$scope.salutationUploadName = $scope.uploadText;
	$scope.adharUploadName = $scope.uploadText;
	$scope.panUploadName = $scope.uploadText;
	$scope.isError=false;
	$scope.otherDesignationId=7;
	$scope.typeDetails = {};
	$scope.emialOtpDiv = false;
	$scope.emialOtpDivbr = false;
	$scope.generateOtpbtn =false;
	$scope.verified =false;
	$scope.new_user = true;
	$scope.updateimage= false;
	//$scope.pageName = "User Registration";
	$scope.activeMenu = "updateProfile";
	$scope.areaFetched = false;
	$scope.typeDetailFetched = false;
	$scope.areaWiseFacilityType = null;
	$scope.emailOtp = null;
	$scope.verifiedUser = null;
	$scope.dataLoaded = false;
	$scope.showTimerText = false;
	$scope.blockListForFacilityInCharge =[];
	$scope.blockForFacilityInCharge = null;
	$scope.facilityListForFacilityInCharge =[];
	$scope.facilityFacilityInCharge =null;
	$scope.defaultIdImage = "resources/images/default_id.svg";
	$scope.showBlock = true;
	
	$scope.userLevel = [ {
		levelID : 1,
		levelName : 'Country Level'
	},{
		levelID : 2,
		levelName : 'State Level'
	},
	{
		levelID : 4,
		levelName : 'District Level'
	},{
		levelID : 5,
		levelName : 'Block Level'
	},{
		levelID : 8,
		levelName : 'Facility Level'
	}
	
	];
	
	$http.get("areas").then(function(result) {
		$scope.location = result.data;
		$scope.stateList = $filter('filter')($scope.location, {
			parentAreaId : 1
		}, true);
		
		$scope.areaFetched = true;
		
		if($scope.areaFetched && $scope.typeDetailFetched){
			$scope.changeToEdit();
			$timeout(function(){
				$scope.dataLoaded = true;
				$("#loader-mask").fadeOut();
			},800);
			
		}
	}, function errorCallback(response){
		
	});
	
	$scope.getDesignation=function(roleId){
		$http.get("designationsByRoleArea?roleId="+roleId).then(function(result) {
			$scope.designations = result.data;
		}, function errorCallback(response){
			
		});
	}
	
	$http.get("typeDetails").then(function(result) {
		$scope.typeDetails = result;
		$scope.salutationArray = result.data["Salutation"];
		$scope.genderArray = result.data["Gender"];
		$scope.developmentPartners = $scope.typeDetails.data["Development Partners"];
		$scope.facilityType = $scope.typeDetails.data["FacilityType"];
		$scope.facilityTypeForArea = $scope.typeDetails.data["FacilityTypeForArea"];
		$scope.newFacilityTypeForArea = $scope.typeDetails.data["FacilityTypeForArea"];
		$scope.dobStartDate = result.data["ServerStartDate"];
		$scope.dobEndDate = result.data["ServerEndDate"];
		$scope.startDate = $scope.dobStartDate[0].value;
		$scope.endDate = $scope.dobEndDate[0].value;
		$("#dob").datepicker({
			dateFormat : "dd-mm-yy",
			changeMonth : true,
			changeYear : true,
			minDate : $scope.startDate,
			yearRange : $scope.startDate.split('-')[2]+':'+$scope.endDate.split('-')[2],
			maxDate : $scope.endDate,
		}); 
		
		$scope.typeDetailFetched = true;
		
		if($scope.areaFetched && $scope.typeDetailFetched){
			$scope.dataLoaded = true;
			$scope.changeToEdit();
		}
	
	}, function errorCallback(response){
		
	});
	
	
	
	$scope.selectFacilityType = function(type){
		if($scope.selectedFacilityType !== type){
			$scope.selectedFacilityType = type;
			$scope.selectedFacility = undefined;
			
			if(type.key == 17 && ($scope.selectedDist !== null && $scope.selectedDist !== undefined)){
				$scope.filterFacilityByParentId($scope.selectedDist.areaNId);
				$scope.selectedBlock = undefined;
			}
			else if($scope.selectedBlock !== null && $scope.selectedBlock !== undefined){
				$scope.filterFacilityByParentId($scope.selectedBlock.areaNId);
			}
				
			$scope.facilityTypeSelected();
		}
	};
	
	$scope.filterFacilityByParentId = function(parentId){
		$scope.facilityList = $filter('filter')($scope.location, {
			parentAreaId : parentId, level : 5
		}, true);
	};
	
	$scope.facilityTypeSelected = function(){
		if($scope.selectedFacilityType.key == 105){
			$scope.showBlock = false;
		}else{
			$scope.showBlock = true;
		}
		$scope.areaWiseFacilityType = $scope.selectedFacilityType.key;
	};
	
	
	
	$scope.selectState = function(state) {
		$scope.selectedState = state;
		$scope.districtList = $filter('filter')($scope.location, {
			parentAreaId : $scope.selectedState.areaNId, level : 3
		}, true);
				
		$scope.selectedDist = undefined;
		$scope.selectedDeg = undefined;
		$scope.selectedBlock = undefined;
		$scope.blockList = undefined;
		$scope.selectedFacility = undefined;
		$scope.facilityList = undefined;
		$scope.designations=undefined;
		$scope.selectedOrganization = undefined;
		
		//reset the facility list for state selection
		$scope.blockListForFacilityInCharge =[];
		$scope.blockForFacilityInCharge = null;
		$scope.facilityListForFacilityInCharge =[];
		$scope.facilityFacilityInCharge =null;
		$scope.selectedFacilityTypeForIncharge=undefined;

	};
	$scope.selectfacilityTypeForDeg = function(facilityType) {
		$scope.selectedFacilityTypeForIncharge=facilityType;
		$scope.allfacilityByfacilityType = [];
		
		
		
		
		angular.forEach($scope.failityListforIncharge, function(value, key) {
			if(value.facilityType.id == facilityType.key)	{
				$scope.allfacilityByfacilityType.push(value);
					
				}
		});
		
		
		if($scope.selectedDist && facilityType.key == 105){
			$scope.facilityListForFacilityInCharge = $filter('filter')($scope.location, {
				parentAreaId : $scope.selectedDist.areaNId, level : 5
			}, true);
			$scope.blockListForFacilityInCharge =[];
		}else{
			$scope.blockListForFacilityInCharge = $filter('filter')($scope.location, {
				parentAreaId : $scope.selectedDist.areaNId, level : 4
			}, true);
			$scope.facilityListForFacilityInCharge = [];
		}
		
		if($scope.selectedBlock!=null){
			console.log($scope.selectedBlock);	
			$scope.facilityListForFacilityInCharge =  $filter('filter')($scope.location, {
				parentAreaId : $scope.selectedBlock.areaNId, level : 5
			}, true);
			
			
		/*	$scope.newfacilityListForFacilityInCharge  = $scope.facilityListForFacilityInCharge ;
			$scope.facilityListForFacilityInCharge=[];
			angular.forEach($scope.newfacilityListForFacilityInCharge, function(value, key) {
				if(value.facilityType.id == facilityType.key)	{
					$scope.facilityListForFacilityInCharge.push(value);
						
					}
			});*/
			
		}
		
		$scope.facilityFacilityInCharge =null;
		$scope.blockForFacilityInCharge = null;
		 		
	};
	
	$scope.selectBlockForInCharge = function(block){
		$scope.blockForFacilityInCharge=block;
		$scope.facilityListForFacilityInCharge =  $filter('filter')($scope.location, {
			parentAreaId : $scope.blockForFacilityInCharge.areaNId, level : 5
		}, true);
		$scope.facilityFacilityInCharge =null;
		
	};

	
	$scope.selectfacilityForIncharge = function(facility){
		$scope.facilityFacilityInCharge=facility;
	};

	$scope.selectDistrict = function(dist) {

		$scope.selectedDist = dist;
		$scope.blockList = $filter('filter')($scope.location, {
			parentAreaId : $scope.selectedDist.areaNId, level : 4
		}, true);
		
		$scope.facilityList = $filter('filter')($scope.location, {
			parentAreaId : $scope.selectedDist.areaNId, level : 5
		}, true);
		
	
		
		//reset block and facility selection for facility in-charge
		$scope.blockListForFacilityInCharge = $scope.blockList;
		$scope.blockForFacilityInCharge = null;
		$scope.facilityListForFacilityInCharge =$scope.facilityList;
		$scope.facilityFacilityInCharge =null;
		$scope.selectedOrganization = undefined;
		$scope.selectedDeg=undefined;
	    $scope.selectedFacilityTypeForIncharge=undefined;

		$scope.selectedBlock = undefined;
		$scope.selectedFacility = undefined;

	};
	$scope.selectBlock = function(block) {

		$scope.selectedBlock = block;
		$scope.facilityList = $filter('filter')($scope.location, {
			parentAreaId : $scope.selectedBlock.areaNId, level : 5
		}, true);
		$scope.selectedFacility = undefined;
		$scope.selectedOrganization = undefined;
		$scope.selectedDeg=undefined;
		$scope.selectedFacilityTypeForIncharge=undefined;
		
	};
	$scope.selectFacility = function(facility) {

		$scope.selectedFacility = facility;
	};
	$scope.selectDeg = function(deg) {
		$scope.selectedDeg = deg;
		if($scope.selectedDeg.isFacilityInCharge == true){
			
		}
		$scope.selectedFacilityTypeForIncharge=undefined;
	};

	$scope.selectSalutation = function(sal) {
		$scope.selectedSalutation = sal;
	if($scope.selectedSalutation.key==96){
		document.getElementById('m').checked = true;
		document.getElementById("m").disabled = false;
		$scope.gender1 = '98'; 
		
	}	
	else if($scope.selectedSalutation.key==97 || $scope.selectedSalutation.key==109 ){
		document.getElementById('f').checked = true;
		document.getElementById("f").disabled = false;
		$scope.gender1 = '99'; 
		
	}
	else if($scope.selectedSalutation.key==108){
		$scope.gender1 = undefined; 
	}
		
	};
	
	$scope.selectPartner = function(partner) {
		$scope.selectedDevSector = partner;
	};
	
	$scope.selectOrganization = function(org) {
		
		$scope.selectedOrganization = org;
		$scope.selectedDeg = undefined;
		$scope.selectedDevSector = undefined;
		
		var areaId = "";
		
		if($scope.selectedState == undefined ){
			areaId=1;
		}
		else{
			areaId = $scope.selectedState.areaNId;
		}
		
		$http.get("designationsByRoleAreaOrg?roleId="+$scope.selectedLevel.levelID+"&areaId="+areaId+"&orgId="+$scope.selectedOrganization.key).then(function(result) {
			$scope.designations = result.data;
		}, function errorCallback(response){
			
		});
		$scope.selectedFacilityTypeForIncharge=undefined;
	};
	
	
	$scope.selectLevel=function(level){
		var newFacilityTypeForArea = $scope.facilityTypeForArea;
		$scope.facilityTypeForArea = [];
		var facilityTypeForArea = [];
		if(level.levelID == 5){
			 angular.forEach(newFacilityTypeForArea, function(value, key){
				 if(value.key != 105){
					 $scope.facilityTypeForArea.push(value);
				 }
			 });
		}else
			$scope.facilityTypeForArea = $scope.newFacilityTypeForArea;
		
		
		$scope.selectedLevel=level;
		$http.get("getOrganization?roleId="+$scope.selectedLevel.levelID).then(function(result) {
			$scope.organizations = result.data;
		}, function errorCallback(response){
			
		});
		$scope.selectedFacilityType = undefined;
		$scope.selectedOrganization = undefined;
		$scope.selectedDevSector =undefined;
		$scope.designations=undefined;
		$scope.selectedState = undefined;
		$scope.selectedDist = undefined;
		$scope.selectedBlock = undefined;
		$scope.selectedFacility = undefined;
		$scope.selectedDeg = undefined;
		$scope.districtList=undefined;
		$scope.blockList=undefined;
		$scope.facilityList=undefined;
		$scope.selectedFacilityTypeForIncharge=undefined;
		$scope.facilityFacilityInCharge=undefined;
		if(level.levelID==2 || level.levelID==4 || level.levelID==5 || level.levelID==8 ){
			$scope.locationshow = true;
			$scope.locationshowbr =true;
			
		}
	};
	
	$scope.resetmodal = function(){
		$("#infoMessage1").modal("show");
	}
	
	
	
	$scope.showOtp = function(name, errorId){
		$scope.showTimerText = false;
		document.getElementById('timer').innerHTML = "";
		$scope.newuser.otp = undefined;
		document.getElementById('emailOtpError').innerHTML ="";
		document.getElementById('verifyOtpError').innerHTML ="";
		$scope.generateOtpbtn = true;
		
	
		/*document.getElementById('timer').innerHTML =
			  10 + ":" + 00;
			$scope.startTimer();*/
		 $("#loader-mask").show();
		$http.post("getEmailVarificationCode?email=" +name).then(function(result) {
			$scope.emailOtp = result.data;
			if($scope.emailOtp.valid=="true"){
				document.getElementById(errorId).innerHTML = $scope.emailOtp.errorMessage;
				 $("#loader-mask").fadeOut();
				 $scope.resendOtpbtn =true;
				 $scope.generateOtpbtn = false;
				 $scope.emialOtpDiv = true;
				 $scope.emialOtpDivbr =true;

				 
				 $scope.showTimerText = true;
					document.getElementById('timer').innerHTML =
						  10 + ":" + 00;
					if($scope.countTime)
					clearInterval($scope.countTime);
					$scope.countTime = setInterval(function(){
						$scope.startTimer(true);
					}, 1000);
			}
			else{
				document.getElementById(errorId).innerHTML = $scope.emailOtp.errorMessage;
				$("#loader-mask").fadeOut();
			}
		}, function errorCallback(response){
			
		});
		
	}
	$scope.resendOtp = function(name, errorId){
		
		$scope.showTimerText = false;
		document.getElementById('timer').innerHTML = "";
		$scope.newuser.otp = undefined;
		document.getElementById('emailOtpError').innerHTML ="";
		document.getElementById('verifyOtpError').innerHTML ="";
		$scope.generateOtpbtn = false;
		 $scope.emialOtpDiv = false;
		 $scope.emialOtpDivbr =false;
	
		/*document.getElementById('timer').innerHTML =
			  10 + ":" + 00;
			$scope.startTimer();*/
		 $("#loader-mask").show();
		$http.post("getEmailVarificationCode?email=" +name).then(function(result) {
			$scope.emailOtp = result.data;
			if($scope.emailOtp.valid=="true"){
					document.getElementById(errorId).innerHTML = $scope.emailOtp.errorMessage;
				 $("#loader-mask").fadeOut();
				 $scope.resendOtpbtn =true;
				 $scope.generateOtpbtn = false;
				 $scope.emialOtpDiv = true;
				 $scope.emialOtpDivbr =true;
				 
				 $scope.showTimerText = true;
					document.getElementById('timer').innerHTML =
						  10 + ":" + 00;
					if($scope.countTime)
					clearInterval($scope.countTime);
					$scope.countTime = setInterval(function(){
						$scope.startTimer(true);
					}, 1000);
			}
			else{
				document.getElementById(errorId).innerHTML = $scope.emailOtp.errorMessage;
				$("#loader-mask").fadeOut();
			}
		}, function errorCallback(response){
			
		});
	}
	
	$scope.clearOtpMsg = function(errorId){
		if($scope.newuser.otp == "" || $scope.newuser.otp == null || $scope.newuser.otp == undefined){
			document.getElementById(errorId).innerHTML = "";
		}
		
	};
	
	$scope.verifyOtp = function(name, errorId){
		if(name !== undefined && name !== null && !name.trim() == ""){
			$("#loader-mask").show();
			$http.post("getEmailOTPAvailability?email=" +$scope.newuser.emailID  +"&varificationCode=" +name ).then(function(result) {
				$scope.verifyOtpList = result.data;
				
				if($scope.verifyOtpList.valid=="false"){
					$timeout(function(){
						$("#loader-mask").fadeOut();
						document.getElementById(errorId).innerHTML = $scope.verifyOtpList.errorMessage;
					},1000)
				}
				else{
					document.getElementById(errorId).innerHTML = "";
					$scope.verifiedUser = $scope.newuser.emailID;
					$scope.emialOtpDiv = false;
					clearInterval($scope.countTime);
					$scope.emialOtpDivbr =false;
					$scope.generateOtpbtn = false;
					$scope.resendOtpbtn =false;
					document.getElementById('emailOtpError').innerHTML ="";
					$timeout(function(){
						$("#loader-mask").fadeOut();
						$scope.verified =true;
						$('#emilverifiedmsgDiv').fadeIn('fast').delay(7000).fadeOut('fast');
					},1000)
				}
			}, function errorCallback(response){
				$timeout(function(){
					$("#loader-mask").fadeOut();
				},1000)
			});
		}else{
			document.getElementById(errorId).innerHTML = "Invalid OTP! Please enter valid OTP";
		}
		
	}

	
	$scope.generateOtpEmail = function(){
		
			$scope.generateOtpbtn = false;
			$scope.resendOtpbtn =false;
			$scope.emialOtpDiv =false;
			$scope.emialOtpDivbr = false;
			document.getElementById('timer').innerHTML ="";
			document.getElementById('emailOtpError').innerHTML ="";
			document.getElementById('verifyOtpError').innerHTML ="";
		
	}
	
	$scope.enableGenerateOtp = function(){
			document.getElementById('emailOtpError').innerHTML ="OTP time expired. Try again...";
			$('#emailOtpError').fadeIn('fast');
			$timeout(function(){
				$('#emailOtpError').html('');
			},5000)
		$scope.generateOtpbtn = true;
		$scope.resendOtpbtn =false;
		$scope.emialOtpDiv = false;
		$scope.emialOtpDivbr = false;
		$scope.$apply();
		
	}
	
	
	
	// timer for email OTP.................................................................

		 $scope.startTimer = function() {
		  var presentTime = document.getElementById('timer').innerHTML;
		  var timeArray = presentTime.split(/[:]+/);
		  var m = timeArray[0];
		  var s = $scope.checkSecond((timeArray[1] - 1));
		  if(s==59){m=m-1
			if(m<0)
				{
				$scope.enableGenerateOtp();
				clearInterval($scope.countTime);
				return;
				}
		  }
		  document.getElementById('timer').innerHTML =
		    m + ":" + s;
		 
		}

	$scope.checkSecond	= function (sec) {
		  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
		  if (sec < 0) {sec = "59"};
		  return sec;
		}
		 // end timer............... 
	
	$scope.reset=function(){
		$scope.reseData=true;
		$("#infoMessage1").modal("hide");
		$("#update-profile-image").attr("src","");
		$("#image").attr("src","");
		$scope.saluationImage=undefined;
		$("#image1").attr("src","");
		$("#image2").attr("src","");
		$("#image3").attr("src","");
		$("#image4").attr("src","");
		$scope.selectedSalutation = undefined;
		$scope.selectedOrganization = undefined;
		$scope.files = undefined;
		angular.element("input[type='file']").val(null);
		$scope.salutationUploadName = $scope.uploadText;
		$scope.adharUploadName = $scope.uploadText;
		$scope.panUploadName = $scope.uploadText;
		$scope.newuser.firstname = undefined;
		$scope.newuser.middlename = undefined;
		$scope.newuser.lastname = undefined;
		$scope.gender1 = undefined;
		$scope.newuser.dob = undefined;
		$scope.newuser.mobileNum = undefined;		
		document.getElementById('phoneNoError').innerHTML = "";
		document.getElementById('checkNoError').innerHTML = "";	
		$scope.newuser.emailID = "";	
		$scope.newuser.secondaryemailID = "";
		//$scope.newuser.emailID = undefined;	
		//$scope.newuser.secondaryemailID = undefined;
		//$scope.stateList = undefined;
		//$scope.districtList=undefined;
		//$scope.blockList=undefined;
		//.facilityList=undefined
		$scope.organizations = undefined;
		$scope.selectedDevSector = undefined ;
		//$scope.developmentPartners = undefined ;
		$scope.selectedLevel = undefined;
		$scope.selectedState = undefined;
		$scope.selectedDist = undefined;
		$scope.selectedBlock = undefined;
		$scope.selectedFacility = undefined;
		$scope.selectedDeg = undefined;
		$scope.newuser.userID = undefined;
		$scope.newuser.idproof1 = undefined;
		document.getElementById('adharError').innerHTML = "";
		$scope.adharfiles = undefined;
		$scope.newuser.idproof2 = undefined;
		$scope.panfiles = undefined;
		document.getElementById('panError').innerHTML = "";
		$scope.agreecheckbox=undefined;
		$scope.suggestedUser = undefined;
		document.getElementById('usererror').innerHTML = "";	
		$scope.aval= false;
		$scope.isError= false;
		$scope.new_user= false;
		$scope.locationshow = false;
		$scope.locationshowbr = false;
		$scope.generateOtpbtn = false;
		$scope.resendOtpbtn = false;
		$scope.newuser.otp = undefined;
		$scope.selectedFacilityTypeForIncharge=undefined;
		$scope.emialOtpDiv = false;
		$scope.emialOtpDivbr = false;
		document.getElementById('timer').innerHTML = "";
		document.getElementById('emailOtpError').innerHTML = "";
		document.getElementById('emailError1').innerHTML = "";
		document.getElementById('emailError2').innerHTML = "";
		document.getElementById('checkEmailError').innerHTML = "";
		document.getElementById('emailError').innerHTML = "";
		document.getElementById('verifyOtpError').innerHTML = "";
		$scope.verifiedUser = null;
		
	}
	
	$scope.changeUser= function(){
		$scope.checkUser($scope.newuser.userID,'usererror');
		
	};
	
	$scope.checkUser =function(name, errorId){
		if(($scope.newuser.firstname == undefined || $scope.newuser.firstname == "") && ($scope.newuser.lastname == undefined || $scope.newuser.lastname == "") ){
			$scope.newuser.firstname = null;
			$scope.newuser.lastname = null;
			$scope.aval=true;
		}
		else if($scope.newuser.firstname == undefined ||  $scope.newuser.firstname == ""){
			$scope.newuser.firstname = null;
			$scope.aval=true;
		}
		else if($scope.newuser.lastname == undefined || $scope.newuser.lastname == ""){
			$scope.newuser.lastname = null;
			$scope.aval=true;
		}
		$http.get("userAvailabilitySuggest?firstName=" +$scope.newuser.firstname +"&middleName=" +$scope.newuser.middlename +"&lastName=" +$scope.newuser.lastname +"&userName=" +name ).then(function(result) {
			$scope.userAvailability = result.data;
			
			if($scope.newuser.firstname != undefined && $scope.newuser.lastname != undefined){
				$scope.aval=true;
			}
			if($scope.userAvailability.valid=="false"){
				$scope.isError=true;
				$scope.suggestedUser = $scope.userAvailability.errorData;
				document.getElementById(errorId).innerHTML = $scope.userAvailability.errorMessage;
			}else{
				$scope.isError=false;
				document.getElementById(errorId).innerHTML = "";
			}
		}, function errorCallback(response){
			
		});
	}
	
	$scope.setUserName = function(user)
	{
		$scope.newuser.userID=user;
		$scope.isError=false;
		document.getElementById('usererror').innerHTML = "";
	}
	$scope.checkPhoneNo =function(name, errorId){
		$http.get("mobileNumberAvailability?mobileNumber=" +name).then(function(result) {
			$scope.phoneNoAvailability = result.data;
			if($scope.phoneNoAvailability==true){
				if($scope.userDetails!=undefined && $scope.userDetails.phoneNo==$scope.newuser.mobileNum)
				{}
			else{
				
					document.getElementById(errorId).innerHTML = "Mobile number already exist, enter another number";
				}
				}
				
			else{
				document.getElementById(errorId).innerHTML = "";
			}
		}, function errorCallback(response){
			
		});
	}
	 $scope.validatePhone = function (name, errorId){
		 document.getElementById('checkNoError').innerHTML = "";
		 if(name != undefined){
			   if( name.length != 10 && name != ""  ){
		        	if(errorId=='phoneNoError') {
		        		document.getElementById(errorId).innerHTML = "Please enter 10 digit Mobile Number";
		        	
		        		document.getElementById('mobileNum').focus();
		        		// return false;
		        	}
		        	
		       }else{
		    	   document.getElementById(errorId).innerHTML = "";
		    	   return true;
		       }
		   }   
	 }
		 $scope.validateAdhar= function(name, errorId){
			 if(name != undefined){
				if( name.length != 12 && name != ""  ){
			        	if(errorId=='adharError') {
			        		document.getElementById(errorId).innerHTML = "Please enter 12 digit Aadhaar number";
			        	
			        		document.getElementById('location2').focus();
			        		return false;
			        	}
				     }	else{
					    	   document.getElementById(errorId).innerHTML = "";
					    	   return true;
					      }
			 }
			 
		 }
		 $scope.validatePan= function(name, errorId){
			 if(name != undefined){
				if( name.length != 10 && name != ""  ){
			        	if(errorId=='panError') {
			        		document.getElementById(errorId).innerHTML = "Please enter 10 digit alpha numeric PAN number";
			        	
			        		document.getElementById('panNo1').focus();
			        		return false;
			        	}
				     }	else{
					    	   document.getElementById(errorId).innerHTML = "";
					    	   return true;
					      }
			 }
			 
		 }
	 
		 $scope.checkEmailAvailablity =function(name, errorId){
			 if(name != undefined && name != null && name != ""){
				 name.trim();
				$http.get("primaryEmailAvailability?primaryEmailId=" +name).then(function(result) {
					$scope.emailIdAvailability = result.data;
					if($scope.emailIdAvailability==true){
						if($scope.userDetails!=undefined && $scope.userDetails.primaryEmailId==$scope.newuser.emailID){
							
						}
						else{
							document.getElementById(errorId).innerHTML = "Primary Email ID already exist, enter another Email ID";
							$scope.generateOtpbtn = false;
						}
					}else{
						if($scope.verifiedUser !== $scope.newuser.emailID){
							if(!$scope.resendOtpbtn){
								$scope.generateOtpbtn = true;
							}
							document.getElementById(errorId).innerHTML = "";
							$scope.checkprimary(name,errorId,2);
							//$scope.generateOtpEmail();
						}
					}
				}, function errorCallback(response){
					
				});
		 	}else{
		 		if(name == ""){
		 			document.getElementById('emailError').innerHTML = "";
		 			document.getElementById('emailError2').innerHTML = "";
		 			
		 		}
				$scope.generateOtpbtn = false;
		 	}
		}

		 $scope.validateEmail = function(name, errorId) {
			
			if (name == undefined || name == "") {
				if (errorId == 'emailError') {
					$scope.generateOtpbtn = false;
					document.getElementById('checkEmailError').innerHTML = "";
					document.getElementById(errorId).innerHTML = "Please Provide Correct Email ID";
//					document.getElementById('emailID').focus();
					$scope.newuser.otp = undefined;
					return false;
				}
				/*else if (errorId == 'emailError1') {
					document.getElementById('emailError2').innerHTML = "";
					document.getElementById(errorId).innerHTML = "Please provide correct email id";
					document.getElementById('secondaryemailID').focus();
					return false;
				}*/
			}else {
				document.getElementById(errorId).innerHTML = "";
				document.getElementById('emailError2').innerHTML = "";
				$scope.newuser.otp = undefined;
				return true;
			}
		 }
		$scope.validateSecEmail = function(name, errorId){
			if (name == undefined){
				if (errorId == 'emailError1') {
					document.getElementById('emailError2').innerHTML = "";
					document.getElementById(errorId).innerHTML = "Please Provide Correct Email ID";
					document.getElementById('secondaryemailID').focus();
					return false;
				}
			}else {
				 document.getElementById(errorId).innerHTML = "";
				 document.getElementById('emailError2').innerHTML = "";
				 return true;
				}
				
		}
			
			
		
		 $scope.checkprimary = function(name, errorId, type){
			switch(type){
			case 1:
				 if (name == $scope.newuser.emailID && (name != undefined && name !="")) {
					 
					 document.getElementById(errorId).innerHTML = "Primary and secondary email id can not be same";
					 document.getElementById('checkEmailError').innerHTML = "";
//					 document.getElementById('secondaryemailID').focus();
					 //return false;
				 }else if (name == undefined ||  $scope.newuser.emailID == undefined){
					 document.getElementById(errorId).innerHTML = "";
					 return true;
				 }else {
						document.getElementById(errorId).innerHTML = "";
						document.getElementById('checkEmailError').innerHTML = "";
						return true;
				 }
				 break;
			case 2:
				 if (name == $scope.newuser.secondaryemailID && (name != undefined && name !="")) {
					 
					 document.getElementById(errorId).innerHTML = "Primary and secondary email id can not be same";
					 document.getElementById('emailError2').innerHTML = "";
					// document.getElementById('checkEmailError').innerHTML = "";
					/* document.getElementById('emailID').focus();
					 if(errorId == 'checkEmailError')
						 document.getElementById('emailError2').innerHTML = "";
				 else if(errorId == 'emailError2')
					 document.getElementById('checkEmailError').innerHTML = "";*/
					 //document.getElementById('secondaryemailID').focus();
					// return false;
				 }else if (name == undefined ||  $scope.newuser.secondaryemailID == undefined){
					 document.getElementById(errorId).innerHTML = "";
					 return true;
				 }else {
						document.getElementById(errorId).innerHTML = "";
						return true;
				 }
				 break;
				 
			}
		 }
		 
		 
		 
		 setTimeout(function() {
			 
				$('#uploadsal-icon,#uploadsalfile1').click(function() {
					$('#uplodsal').click();
				});
				
				$('#adharbtnupload').click(function() {
					$('#adharFile').click();
				});
				$('#panButton').click(function() {
					$('#panNumber').click();
				});
				
				
			}, 500)
		 
		 $scope.focusinput = function (){
			 $("#errorMessageCorrupt").modal("hide");
			 $("#errorMessage").modal("hide");
			 if($scope.errorMsg == "Please upload image"){
				 document.getElementById('uploadsalfile1').focus();
			 }else if($scope.errorMsg == "Please select salutation"){
				 document.getElementById('salutation').focus();		
			 }else if($scope.errorMsg == "Image file must be of (jpg, jpeg, png) type"){
				 document.getElementById('uploadsalfile1').focus();
			 }else if($scope.errorMsg == "Image file must be less than 50kb"){
				 document.getElementById('uploadsalfile1').focus();
			 } else if($scope.errorMsg == "Please enter First Name"){
				 document.getElementById('firstname').focus();
			 } else if($scope.errorMsg == "Please enter Last Name"){
				 document.getElementById('lastname').focus();
			 }else if($scope.errorMsg == "Please select gender"){
				 document.getElementById('m').focus();
			 }else if($scope.errorMsg == "Please select Date of Birth"){
				 document.getElementById('dob').focus();
			 }else if($scope.errorMsg == "Please enter Mobile Number"){
				 document.getElementById('mobileNum').focus();
			 }else if($scope.errorMsg == "Please Enter 10 digit Mobile Number"){
				 document.getElementById('mobileNum').focus();
			 }else if($scope.errorMsg == "Mobile number already exist, enter another number"){
				 document.getElementById('mobileNum').focus();
			 } else if($scope.errorMsg == "Please Enter Primary Email ID"){
				 document.getElementById('emailID').focus();
			 }else if($scope.errorMsg == "Primary Email ID already exist, enter another Email ID"){
				 document.getElementById('emailID').focus();
			 }else if($scope.errorMsg == "Please generate OTP to verify Email ID"){
				 document.getElementById('generateOtp').focus();
			 }else if($scope.errorMsg == "Please Enter OTP to verify Email ID"){
				 document.getElementById('emailOtp').focus();
			 }else if( $scope.errorMsg == "Please validate OTP"){
				 document.getElementById('validateOtp').focus();
			 }else if( $scope.errorMsg == "Please enter valid OTP"){
				 document.getElementById('emailOtp').focus();
			 }else if($scope.errorMsg == "Primary and secondary Email ID can not be same"){
				 document.getElementById('secondaryemailID').focus();
			 }else if($scope.errorMsg == "Please select User Level"){
				 document.getElementById('userlevel').focus();
			 }else if($scope.errorMsg == "Please select Organisation"){
				 document.getElementById('organization').focus();
			 }else if($scope.errorMsg == "Please select facility type"){
				 document.getElementById('facilitytype').focus();
			 } else if($scope.errorMsg == "Please select state"){
				document.getElementById('state').focus();
			 }else if($scope.errorMsg == "Please select district"){
				 document.getElementById('district').focus();
			 }else if($scope.errorMsg == "Please select block"){
				 document.getElementById('block').focus();
			 }else if($scope.errorMsg == "Please select facility"){
				 document.getElementById('facility').focus();
			 }
//			 else if($scope.errorMsg == "Please select Organisation"){
//				 document.getElementById('organization').focus();
//			 }
			 else if($scope.errorMsg == "Please select development Partners"){
				 document.getElementById('devSector').focus();
			 }else if($scope.errorMsg == "Please select Designation"){
				 document.getElementById('designation2').focus();
			 }else if($scope.errorMsg == "Please enter user id"){
				 document.getElementById('userID').focus();
			 }else if($scope.errorMsg == "User ID already exists. Try another"){
				 document.getElementById('userID').focus();
			 }/*else if($scope.imageCorruptMsg == "Corrupted Image"){
				 document.getElementById('uplodsal').focus();
			 }*/
			/* else if($scope.errorMsg == "Please enter aadhaar number"){
				 document.getElementById('location2').focus();
			 }*//*else if($scope.errorMsg == "Please upload aadhaar"){
				 document.getElementById('adharbtnupload').focus();
			 }*/else if($scope.errorMsg == "Aadhaar file must be of (jpg, jpeg, png) type"){
				 document.getElementById('adharbtnupload').focus();
			  } else if($scope.errorMsg == "Aadhaar file must be less than 50kb"){
				 document.getElementById('adharbtnupload').focus();
			  } else if($scope.errorMsg == "PAN file must be of (jpg, jpeg, png) type"){
				 document.getElementById('panButton').focus();
			  }else if($scope.errorMsg == "PAN file must be less than 50kb"){
				 document.getElementById('panButton').focus();
			  }else if($scope.errorMsg == "Please Enter 12 digit Aadhaar number"){
				 document.getElementById('location2').focus();
			  }else if($scope.errorMsg == "Please Enter 10 digit alpha numeric PAN number"){
				 document.getElementById('panNo1').focus();
			 }
			
			 
		 }
		 
	 $scope.validateUser = function(){
		 $scope.vlidateSucess=true;
		 
		 if($scope.files == undefined && $scope.updatediv == undefined){
			 $scope.vlidateSucess=false;
			 $scope.errorMsg = "Please upload Profile photo";
			 $("#errorMessage").modal("show");
			 document.getElementById('uplodsal').focus();
		 }
		 else if($scope.updatediv != undefined && 
				 ($scope.userDetails == undefined || $scope.userDetails.photoFilePath == undefined)){
			 	$("#errorMessage").modal("show");
			 	$scope.vlidateSucess=false;
				$scope.errorMsg = "Please upload Profile photo";
				document.getElementById('uplodsal').focus();
		 }
//	 if ($scope.files == undefined) {
//			 if($scope.userDetails!=undefined &&  $scope.userDetails.photoFilePath == $scope.salutationUploadName1)
//				{}
//			 else{
//				$scope.vlidateSucess=false;
//				$scope.errorMsg = "Please upload image";
//				$("#errorMessage").modal("show");
//				document.getElementById('uplodsal').focus();
//			 }
//			}
	
	 
		 else if ($scope.selectedSalutation == undefined) {
			 $scope.vlidateSucess=false;
			 $scope.errorMsg = "Please select salutation";
			 $("#errorMessage").modal("show");
			 document.getElementById('image1').focus();
		 }else if ($scope.newuser.firstname == undefined || $scope.newuser.firstname.trim() =="") {
				$scope.vlidateSucess=false;
				$scope.errorMsg = "Please enter First Name";
				$("#errorMessage").modal("show");
				document.getElementById('firstname').focus();
		}else if ($scope.newuser.lastname == undefined || $scope.newuser.lastname.trim() =="") {
				$scope.vlidateSucess=false;
				$scope.errorMsg = "Please enter Last Name";
				$("#errorMessage").modal("show");
				document.getElementById('lastname').focus();
		}else if ($scope.gender1 == undefined) {
				$scope.vlidateSucess=false;
				document.getElementById('m').focus();
				$scope.errorMsg = "Please select gender";
				$("#errorMessage").modal("show");
		}else if ($scope.newuser.dob == undefined) {
				$scope.vlidateSucess=false;
				$scope.errorMsg = "Please select Date of Birth";
				$("#errorMessage").modal("show");
				// document.getElementById('dob').focus();
		}else if ($scope.newuser.mobileNum == undefined || $scope.newuser.mobileNum.trim() =="") {
				$scope.vlidateSucess=false;
				$scope.errorMsg = "Please enter Mobile Number";
				$("#errorMessage").modal("show");
				document.getElementById('mobileNum').focus();
		}else if (document.getElementById('phoneNoError').innerHTML != "") {
				$scope.vlidateSucess=false;
				$scope.errorMsg = "Please enter 10 digit mobile number";
				$("#errorMessage").modal("show");
				document.getElementById('mobileNum').focus();
		}else if (document.getElementById('checkNoError').innerHTML != "") {
				$scope.vlidateSucess=false;
				$scope.errorMsg = "Phone number already exist, enter another number";
				$("#errorMessage").modal("show");
				document.getElementById('mobileNum').focus();
		}else if ($scope.newuser.emailID == undefined || $scope.newuser.emailID.trim() =="") {
				$scope.vlidateSucess=false;
				$scope.errorMsg = "Please enter Primary Email ID";
				$("#errorMessage").modal("show");
				document.getElementById('emailID').focus();
		}else if (document.getElementById('checkEmailError').innerHTML != "") {
//				if($scope.userDetails!=undefined && $scope.userDetails.primaryEmailId==$scope.newuser.emailID)
//					{}
//				else
//					{
				$scope.vlidateSucess=false;
				$scope.errorMsg = "Primary Email ID already exist, enter another Email ID";
				$("#errorMessage").modal("show");
				document.getElementById('emailID').focus();
//					}
		}
//		else if ($scope.emialOtpDiv == false && ($scope.newuser.otp == undefined || $scope.newuser.otp.trim() =="") 
//					&& $scope.verifiedUser !== $scope.newuser.emailID && $scope.updatediv == undefined) {
//					$scope.vlidateSucess=false;
//					$scope.errorMsg = "Please generate OTP to verify Email ID";
//					$("#errorMessage").modal("show");
//					document.getElementById('generateOtp').focus();
//		} 
		else if($scope.generateOtpbtn != undefined && $scope.generateOtpbtn == true 
					&& $scope.verifiedUser !== $scope.newuser.emailID){
			$scope.vlidateSucess=false;
			$scope.errorMsg = "Please generate OTP to verify Email ID";
			$("#errorMessage").modal("show");
			document.getElementById('generateOtp').focus();
		} else if (($scope.newuser.otp == undefined || $scope.newuser.otp.trim() =="") && 
						$scope.verifiedUser !== $scope.newuser.emailID && $scope.updatediv == undefined) {
			
				$scope.vlidateSucess=false;
				$scope.errorMsg = "Please enter OTP to verify email ID";
				$("#errorMessage").modal("show");
				document.getElementById('emailOtp').focus();
		}else if (($scope.newuser.otp !== undefined) &&  $scope.verifiedUser !== $scope.newuser.emailID
					&& $scope.updatediv == undefined) {
				$scope.vlidateSucess=false;
				$scope.errorMsg = "Please validate OTP";
				$("#errorMessage").modal("show");
				document.getElementById('validateOtp').focus();
		}
	  /*else if (document.getElementById('emailOtpError').innerHTML != "") {
				$scope.vlidateSucess=false;
				$scope.errorMsg = "Please validate your OTP";
				$("#errorMessage").modal("show");
				document.getElementById('emailOtp').focus();
			}*/
		else if (document.getElementById('verifyOtpError').innerHTML != "") {
				$scope.vlidateSucess=false;
				$scope.errorMsg = "Please enter valid OTP";
				$("#errorMessage").modal("show");
				document.getElementById('emailOtp').focus();
		}else if (document.getElementById('emailError2').innerHTML != "") {
				$scope.vlidateSucess=false;
				$scope.errorMsg = "Primary and secondary Email ID can not be same";
				$("#errorMessage").modal("show");
				document.getElementById('secondaryemailID').focus();
		}else if ($scope.selectedLevel == undefined) {
				$scope.vlidateSucess=false;
				$scope.errorMsg = "Please select User Level";
				$("#errorMessage").modal("show");
				document.getElementById('userlevel').focus();
		} 
//		else if($scope.selectedOrganization == undefined){
//				$scope.vlidateSucess=false;
//				$scope.errorMsg = "Please select Organisation";
//				$("#errorMessage").modal("show");
//				document.getElementById('organization').focus();
//		}
//		 	{
		else if ($scope.selectedFacilityType == undefined
						&& $scope.selectedLevel.levelID == 8) {
					$scope.vlidateSucess = false;
					$scope.errorMsg = "Please select Facility type";
					$("#errorMessage").modal("show");
					document.getElementById('facilitytype').focus();
		} else if ($scope.selectedState == undefined
					&& $scope.selectedLevel.levelID != 1) {
				$scope.vlidateSucess = false;
				$scope.errorMsg = "Please select state";
				$("#errorMessage").modal("show");
				document.getElementById('state').focus();
		} else if ($scope.selectedDist == undefined
					&& $scope.selectedLevel.levelID > 2) {
				$scope.vlidateSucess = false;
				$scope.errorMsg = "Please select district";
				$("#errorMessage").modal("show");
				document.getElementById('district').focus();
		} else if ($scope.selectedBlock == undefined && $scope.selectedLevel.levelID == 5) {
			$scope.vlidateSucess = false;
			$scope.errorMsg = "Please select block";
			$("#errorMessage").modal("show");
			document.getElementById('block').focus();
		} else if ($scope.selectedBlock == undefined
					&& ($scope.selectedLevel.levelID == 8 && 
							($scope.selectedFacilityType != undefined && $scope.selectedFacilityType.key != 105))) {
				document.getElementById('block').focus();
				$scope.vlidateSucess = false;
				$scope.errorMsg = "Please select block";
				$("#errorMessage").modal("show");
		} else if ($scope.selectedFacility == undefined
					&& $scope.selectedLevel.levelID == 8) {
				$scope.vlidateSucess = false;
				$scope.errorMsg = "Please select facility";
				$("#errorMessage").modal("show");
				document.getElementById('facility').focus();
		} else if ($scope.selectedOrganization == undefined) {
				$scope.vlidateSucess = false;
				$scope.errorMsg = "Please select organisation";
				$("#errorMessage").modal("show");
				document.getElementById('organization').focus();
		} else if ($scope.selectedDevSector == undefined && $scope.selectedOrganization.key == 5) {
				$scope.vlidateSucess = false;
				$scope.errorMsg = "Please select development Partners";
				$("#errorMessage").modal("show");
				document.getElementById('devSector').focus();
		} else if ($scope.selectedDeg == undefined) {
				$scope.vlidateSucess = false;
				$scope.errorMsg = "Please select designation";
				$("#errorMessage").modal("show");
				document.getElementById('designation').focus();

		} 
			//Add Validation for facility type in case the selected designation is facility in-charge.
		 	//The facility type will not contain DH if the level is block level.
		else if ($scope.selectedDeg.isFacilityInCharge == true && ($scope.selectedFacilityTypeForIncharge == undefined
				|| $scope.selectedFacilityTypeForIncharge == null)) {
			$scope.vlidateSucess = false;
			$scope.errorMsg = "Please select Facility Type For In-Charge";
			$("#errorMessage").modal("show");
			document.getElementById('facilityTypeForIncharge').focus();
		}
		 	 // Add validation for block in case the selected designation is
				// facility in-charge and
		 	 //And the level of user is district level and facility type is not DH.
					 	 
		else if ($scope.selectedDeg.isFacilityInCharge == true && $scope.selectedLevel.levelID == 4
				&& $scope.selectedFacilityTypeForIncharge.key != 105
				&& ($scope.blockForFacilityInCharge == undefined || $scope.blockForFacilityInCharge == null)) {

			$scope.vlidateSucess = false;
			$scope.errorMsg = "Please select Block For In-Charge";
			$("#errorMessage").modal("show");
			document.getElementById('inChargeBlockId').focus();

		}
		 	 //
		 	 
		 	 //Add validation for facility for facility incharge, if the selected designation is facility in charge
		 	 
		else if($scope.selectedDeg.isFacilityInCharge==true 
				&& ($scope.facilityFacilityInCharge == undefined || $scope.facilityFacilityInCharge == null) ){
			$scope.vlidateSucess = false;
			$scope.errorMsg = "Please select Facility For In-Charge";
			$("#errorMessage").modal("show");
			document.getElementById('inChargeFacilityId').focus();
		}
		 	 
		 	 //
		 	 
		else if ($scope.newuser.userID == undefined	|| $scope.newuser.userID.trim() == "") {
			$scope.vlidateSucess = false;
			$scope.errorMsg = "Please enter User Name";
			$("#errorMessage").modal("show");
			document.getElementById('userID').focus();
		} else if($scope.new_user && document.getElementById('usererror').innerHTML != ""){
//				if (document.getElementById('usererror').innerHTML != "") {
					$scope.vlidateSucess = false;
					$scope.errorMsg = "User ID already exists. Try another";
					$("#errorMessage").modal("show");
					document.getElementById('userID').focus();
//				}
		}	
			
			 /*
				 * else if ($scope.newuser.idproof1 == undefined ||
				 * $scope.newuser.idproof1.trim() =="") {
				 * $scope.vlidateSucess=false; $scope.errorMsg = "Please enter
				 * aadhaar number"; $("#errorMessage").modal("show");
				 * document.getElementById('location2').focus(); }
				 */
		else if (document.getElementById('adharError').innerHTML != "") {
				$scope.vlidateSucess = false;
				$scope.errorMsg = "Please enter 12 digit Aadhaar number";
				$("#errorMessage").modal("show");
				document.getElementById('location2').focus();
		}
		 		/*
				 * else if ($scope.adharfiles == undefined) {
				 * $scope.vlidateSucess=false; $scope.errorMsg = "Please upload
				 * aadhaar"; $("#errorMessage").modal("show");
				 * document.getElementById('adharbtnupload').focus(); }
				 */
		else if (document.getElementById('panError').innerHTML != "") {
				$scope.vlidateSucess = false;
				$scope.errorMsg = "Please enter 10 digit alpha numeric PAN number";
				$("#errorMessage").modal("show");
				document.getElementById('panNo1').focus();
		}
//		}	
				
		else if($scope.vlidateSucess==true){
			//$("#loader-mask").show();
			$("#infoMessage-user").modal("show");
			//$scope.finalSubmit();
			// document.getElementById("userReg").submit();
		}
	 }
	 /**
	  * @author Ratikanta Pradhan (ratikanta@sdrc.co.in)
	  * Just added the trim function, checked and added in middle name too
	  */
	 $scope.finalSubmit = function(){
		$("#loader-mask").show();
		 $("#infoMessage-user").modal("hide");
		 if($scope.userDetails === null || $scope.userDetails === undefined || $scope.userDetails === '' ){
			 $window.onbeforeunload = null;
			 document.getElementById("userReg").submit();
		 }
		 else{
			 if($scope.newuser.middlename != undefined && $scope.newuser.middlename != null){
				 $scope.newuser.middlename = $scope.newuser.middlename.trim()
			 }			 
			 $scope.userModel = {
					 userId :  $scope.updatedUser,
					 salutationId : $scope.selectedSalutation.key,
					 photoFilePath :  $scope.saluationImage,
					 firstName :  $scope.newuser.firstname.trim(),
					 middleName :  $scope.newuser.middlename,
					 lastName :  $scope.newuser.lastname.trim(),
					 gender :  $scope.gender1,
					 birthday :  $scope.newuser.dob,
					 phoneNo :  $scope.newuser.mobileNum,
					 primaryEmailId :  $scope.newuser.emailID.trim(),
					 secondaryEmailId :  $scope.newuser.secondaryemailID,
					 username :  $scope.newuser.userID.trim(),
					};
			 
			 $http.post('updateUserDetails',$scope.userModel).then(function successCallback(response) {
							if (response.data.valid == 'false') {
								$scope.errorMsg = response.data.errorMessage;
								$("#errorMessage-update").modal("show");
								$("#loader-mask").fadeOut();
								
							} else {
								$scope.msg = response.data.errorMessage;
								$("#pop").modal("show");
								$("#loader-mask").fadeOut();
								$window.onbeforeunload = null;
//								$window.location.reload();
							}
							
//							return true;
				}, function errorCallback(response) {
					$("#loader-mask").fadeOut();
				});
		 }
	 }
	 
		 
	$scope.getSalutationFile = function(e) {

		if (e.files.length > 0) {
			$scope.files = [];
			$scope.$apply(function() {

				// STORE THE FILE OBJECT IN AN ARRAY.
				for (var i = 0; i < e.files.length; i++) {
					$scope.firstFileExt = e.files[i].name.split(".").pop();
					if ($scope.firstFileExt.toLowerCase() != "jpg"
							&& $scope.firstFileExt.toLowerCase() != "jpeg"
							&& $scope.firstFileExt.toLowerCase() != "png") {
						$scope.files = undefined;
						$scope.salutationUploadName = $scope.uploadText;
						$('#uplodsal').val(null);
						$scope.errorMsg = "Image file must be of (jpg, jpeg, png) type";
						$("#errorMessage").modal("show");
					} 
						 /*else if (e.files[i].size > 50000) {
							$scope.files =undefined
							 $scope.salutationUploadName = " UPLOAD ";
							$('#uplodsal').val(null);
							 $scope.errorMsg = "Image file must be less than 50kb";
							 $("#errorMessage").modal("show");
						 }*/
				 
					else {
						$scope.updateimage= true;
						$scope.files.push(e.files[i])
						$scope.getBase64($scope.files[0]);
						$scope.salutationUploadName = $scope.files[0].name;
					}
				}

			});
		}
	};
	$scope.imgError = function(id){
		if(!$scope.reseData)
			
		{
			
		$scope.files = undefined;
		if(id=='uplodsal')
		{	
		$scope.saluationImage = undefined;
		$scope.salutationUploadName = undefined;
		}
		else if(id=='adharFile')
			{
		$scope.adharfiles = undefined;
		$scope.aadharImage=undefined;
		$scope.salutationUploadName = undefined;
			}
/*		$scope.activemenu = undefined;*/
		else if(id=='panNumber')
			{
		$scope.panfiles = undefined;
		$scope.panImage=undefined;
		$scope.salutationUploadName = undefined;
			}
		
		$('#'+id).val(null);
		$("#errorMessageCorrupt").modal("show");		
			}
	
	}
	
	$scope.getBase64=function(file) {
		$scope.errorMsg = "Corrupted Image";
		$scope.reseData=false;
	 	var reader = new FileReader();
	 	reader.readAsDataURL(file);
	 	reader.onload = function () {
			$timeout(function() {
				$scope.saluationImage=reader.result;
		    }, 100);
	 	};
	 	reader.onerror = function (error) {
	 	};
	};
	
	$scope.getAdharFile = function(e) {

		if (e.files.length > 0) {
			$scope.adharfiles = [];
			$scope.$apply(function() {

				// STORE THE FILE OBJECT IN AN ARRAY.
				for (var i = 0; i < e.files.length; i++) {
					$scope.firstFileExt = e.files[i].name.split(".").pop();
					if ($scope.firstFileExt.toLowerCase() != "jpg"
							&& $scope.firstFileExt.toLowerCase() != "jpeg"
							&& $scope.firstFileExt.toLowerCase() != "png") {
						$scope.adharfiles = undefined;
						$scope.adharUploadName = $scope.uploadText;
						$('#adharFile').val(null);

						$scope.errorMsg = "Aadhaar file must be of (jpg, jpeg, png) type";
						$("#errorMessage").modal("show");
					}
						 /* else if (e.files[i].size > 50000) { 
							  $scope.files = undefined 
							  $scope.adharUploadName = " UPLOAD ";
							  $('#adharFile').val(null);
						 $scope.errorMsg = "Aadhar file must be less than 50kb";
						  $("#errorMessage").modal("show"); }*/
						 
					else {
						$scope.adharfiles.push(e.files[i])
						$scope.getBase64Aadhar($scope.adharfiles[0]);
						$scope.adharUploadName = $scope.adharfiles[0].name;

					}
				}

			});
		}
	};
	$scope.getBase64Aadhar=function(file) {
		$scope.errorMsg = "Corrupted Image";
		$scope.reseData=false;
	 	var reader = new FileReader();
	 	reader.readAsDataURL(file);
	 	reader.onload = function () {
			$timeout(function() {
				$scope.aadharImage=reader.result;
		    }, 100);
	 	};
	 	reader.onerror = function (error) {
	 	};
	};
	
	
	$scope.getPanFile = function(e) {

		if (e.files.length > 0) {
			$scope.panfiles = [];
			$scope.$apply(function() {

				// STORE THE FILE OBJECT IN AN ARRAY.
				for (var i = 0; i < e.files.length; i++) {
					$scope.firstFileExt = e.files[i].name.split(".").pop();
					if ($scope.firstFileExt.toLowerCase() != "jpg"
							&& $scope.firstFileExt.toLowerCase() != "jpeg"
							&& $scope.firstFileExt.toLowerCase() != "png") {
						$scope.panfiles = undefined;
						$scope.panUploadName = $scope.uploadText;
						$('#panNumber').val(null);
						$scope.errorMsg = "PAN file must be of (jpg, jpeg, png) type";
						$("#errorMessage").modal("show");
					}
						 /* else if (e.files[i].size > 50000) { 
							  $scope.files = undefined 
							  $scope.panUploadName = " UPLOAD ";
							  $('#panNumber').val(null);
						  $scope.errorMsg = "PAN file must be less than 50kb";
						  $("#errorMessage").modal("show"); }*/
						
					else {
						$scope.panfiles.push(e.files[i])
						$scope.getBase64Pan($scope.panfiles[0]);
						$scope.panUploadName = $scope.panfiles[0].name;

					}
				}

			});
		}
	};
	$scope.getBase64Pan=function(file) {
		$scope.errorMsg = "Corrupted Image";
		$scope.reseData=false;
	 	var reader = new FileReader();
	 	reader.readAsDataURL(file);
	 	reader.onload = function () {
			$timeout(function() {
				$scope.panImage=reader.result;
		    }, 100);
	 	};
	 	reader.onerror = function (error) {
	 	};
	};
	
	$scope.submitresetdiv = true;
	$scope.disableOtherDtls = false;
	
	$scope.changeToEdit = function(){
		if($scope.user != undefined && $scope.user != null){
			$scope.pageName = "Profile";
			$http.get("userDetails").then(function(result) {
				$scope.userDetails = result.data;
				$timeout(function(){
					$scope.dataLoaded = true;
				},200)
				
				//Following there lines are for saying the user has come for an update
				if(!($scope.userDetails.username === null || $scope.userDetails.username === undefined || $scope.userDetails.username === '')){
					$scope.new_user = false;
				}
				if($scope.userDetails != null || $scope.userDetails != undefined || $scope.userDetails != ""){
					//$scope.pageName = "User Update Profile";
					$scope.activeMenu = "updateProfile";
					$scope.disableOtherDtls = true;
					$scope.submitresetdiv = false;
					$scope.updatediv = true;
					$scope.updateimage= false;
					
				}
				
				$scope.updatedUser = $scope.userDetails.userId;
		//		$scope.selectedSalutation = $scope.userDetails.salutationId;
				$scope.salutationUploadName1 = $scope.userDetails.photoFilePath;
				$scope.newuser.firstname = $scope.userDetails.firstName;
				$scope.newuser.middlename = $scope.userDetails.middleName;
				$scope.newuser.lastname = $scope.userDetails.lastName;
				$scope.gender1 = $scope.userDetails.gender.toString();
				$scope.newuser.dob = $scope.userDetails.birthday;
				$scope.newuser.mobileNum = $scope.userDetails.phoneNo;
				$scope.newuser.emailID = $scope.userDetails.primaryEmailId;
				$scope.newuser.secondaryemailID = $scope.userDetails.secondaryEmailId;
				$scope.newuser.userID = $scope.userDetails.username;
				$scope.newuser.idproof1 = $scope.userDetails.adharCardPhotoNumber;
				$scope.newuser.idproof2 = $scope.userDetails.panCardPhotoNumber;
				$scope.degId = $scope.userDetails.designationId;
				$scope.aadharImage = $scope.userDetails.adharCardPhotoFilePath != null ? $scope.userDetails.adharCardPhotoFilePath:$scope.defaultIdImage ;
				$scope.panImage = $scope.userDetails.panCardPhotoFilePath != null ? $scope.userDetails.panCardPhotoFilePath:$scope.defaultIdImage ;
				
				for(var i= 0; i<$scope.salutationArray.length; i++){
					if($scope.userDetails.salutationId == $scope.salutationArray[i].key){
						$scope.selectedSalutation = $scope.salutationArray[i];
						break;
					}
				}
				
				for(var j= 0; j<$scope.developmentPartners.length; j++){
					if($scope.userDetails.develomentpartner == $scope.developmentPartners[j].key){
						$scope.selectedDevSector = $scope.developmentPartners[j];
						break;
					}
				}
				
				for(var i= 0; i<$scope.stateList.length; i++){
					if($scope.userDetails.stateId == $scope.stateList[i].areaNId){
						$scope.selectedState = $scope.stateList[i];
						$scope.districtList = $filter('filter')($scope.location, {
							parentAreaId : $scope.selectedState.areaNId, level : 3
						}, true);
						break;
					}
				}
				
				for(var i= 0; i<$scope.userLevel.length; i++){
					if($scope.userDetails.userLevel == $scope.userLevel[i].levelID){
						$scope.selectedLevel = $scope.userLevel[i];
						break;
					}
				}
				
				if($scope.districtList != undefined && $scope.districtList != null){
					for(var i= 0; i<$scope.districtList.length; i++){
						if($scope.userDetails.districtId == $scope.districtList[i].areaNId){
							$scope.selectedDist = $scope.districtList[i];
							$scope.blockList = $filter('filter')($scope.location, {
								parentAreaId : $scope.selectedDist.areaNId, level : 4
							}, true);
							$scope.facilityList = $filter('filter')($scope.location, {
								parentAreaId : $scope.selectedDist.areaNId, level : 5
							}, true);
							break;
						}
					}
				}
				
				if($scope.blockList != undefined && $scope.blockList != null){
					for(var i= 0; i<$scope.blockList.length; i++){
						if($scope.userDetails.blockId == $scope.blockList[i].areaNId){
							$scope.selectedBlock = $scope.blockList[i];
							$scope.facilityList = $filter('filter')($scope.location, {
								parentAreaId : $scope.selectedBlock.areaNId, level : 5
							}, true);
							break;
						}
					}
				}
				
				if($scope.userDetails.facilityId != undefined && $scope.userDetails.facilityId != null){
					for(var i= 0; i<$scope.facilityList.length; i++){
						if($scope.userDetails.facilityId == $scope.facilityList[i].areaNId){
							$scope.selectedFacility = $scope.facilityList[i];
							break;
						}
					}
					
					for(var j= 0; j<$scope.facilityTypeForArea.length; j++){
						if($scope.selectedFacility.facilityType.id == $scope.facilityTypeForArea[j].key){
							$scope.selectedFacilityType = $scope.facilityTypeForArea[j];
							break;
						}
					}
				}
				
				if($scope.userDetails.inChargeFacilityName != null){
					$scope.selectedFacilityTypeForIncharge = {
							value : $scope.userDetails.inChargeFacilityTypeName
					}
					
					$scope.facilityFacilityInCharge = {
							name : $scope.userDetails.inChargeFacilityName
					}
				}
				
				if($scope.userDetails.inChargeBlockId != null){
					for(var l=0; l<$scope.location.length; l++){
						if($scope.userDetails.inChargeBlockId == $scope.location[l].areaNId){
							$scope.blockForFacilityInCharge = $scope.location[l];
							break;
						}
					}
				}
				
				$scope.getOrganizationsForUpdate();
				
			}, function errorCallback(response){
				$("#loader-mask").fadeOut();
			});
			
		}
		else{
			$scope.pageName = "User Registration";
		}
		
	}
	
	$scope.getOrganizationsForUpdate = function(){
		$http.get("getOrganization?roleId="+$scope.selectedLevel.levelID).then(function(result) {
			$scope.organizations = result.data;
			var areaId = $scope.selectedState == undefined || $scope.selectedState == null ? 1 : $scope.selectedState.areaNId;
		
			for(var i= 0; i<$scope.organizations.length; i++){
				if($scope.userDetails.organizationId == $scope.organizations[i].key){
					$scope.selectedOrganization = $scope.organizations[i];
				}
			}
			
			$http.get("designationsByRoleAreaOrgForProfileUpdate?roleId="+$scope.selectedLevel.levelID+"&areaId="+areaId+"&orgId="+$scope.selectedOrganization.key).then(function(result) {
				$scope.designations = result.data;
				
				for(var i= 0; i<$scope.designations.length; i++){
					if($scope.degId == $scope.designations[i].designationId){
						$scope.selectedDeg = $scope.designations[i];
					}
				}
				
				$("#loader-mask").fadeOut();
			}, function errorCallback(response){
				$("#loader-mask").fadeOut();
				console.log("Error while fetching designation by role & area");
			});
		}, function errorCallback(response){
			$("#loader-mask").fadeOut();
			console.log("Error while fetching organization info.");
		});
	}
	
};