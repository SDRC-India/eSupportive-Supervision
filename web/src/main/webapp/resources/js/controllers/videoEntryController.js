/**
 * @author Sourav Nath (souravnath@sdrc.co.in)
 */
var myAppConstructor = angular.module('videoEntryApp', ['angularUtils.directives.dirPagination']);
myAppConstructor.controller("videoEntryController", function($scope, $http, $timeout, $window){
	$scope.errorMessage = "";
	$scope.activeMenu = "videoentry";
    $scope.selectedId = null;
	$scope.sortReverse=true;
	$scope.foreButton = "SUBMIT";
	$scope.currentPage = 1;
    $scope.pageSize = 5;
    $scope.pageName = "Manage Video Gallery";
    $scope.imageUploadName =null;
    $scope.videoGalleryList=[];
    
    $scope.pageChangeHandler = function(num) {
       console.log('Pagination call ' + num);
    };
	// filter table 
	$scope.videoGalleryData = function(tableFilterWord){
		 $scope.currentPage = 1;
		    $scope.pageSize = 5;
		 $scope.pageChangeHandler = function(num) {
		       console.log('Pagination call ' + num);
		    };

		};
	// get section and theme
	$scope.videoDetails={
		title:"",
		videoUrl:""
	};
	$scope.loadVideoGallery = function(){
		$("#loader-mask").show();
		$http.get("getVideoGallery").then(function(result) {
			$scope.videoGalleryList = result.data;
			$("#loader-mask").fadeOut();
		});
	};
	$scope.order = function (sortType) {  
        $scope.sortReverse = ($scope.sortType === sortType) ? !$scope.sortReverse : false;  
        $scope.sortType = sortType;  
    };
    $scope.filterType = function(val){
      	if(isNaN(parseInt(val[$scope.sortType])))
      		if(!$scope.sortType)
      			return true;
      		else
      			return val[$scope.sortType];
      	else
      		return parseInt(val[$scope.sortType]);
      };
	$scope.loadVideoGallery();
	$scope.focusinput = function (){
		 $("#errorMessage").modal("hide");
		 if($scope.errorMsg == "Please Enter Title"){
			 document.getElementById('videoTitle').focus();
		 }else if($scope.errorMsg == "Please Enter Video URL"){
			 document.getElementById('videoUrl').focus();
		 }
		 
	};
	$scope.validate=function(){
		if($scope.videoDetails.title.trim() == "") {
			$scope.errorMsg = "Please Enter Title";
			$("#errorMessage").modal("show");
			return;
		}else if($scope.videoDetails.videoUrl == ""){
			$scope.errorMsg = "Please Enter Video URL";
			$("#errorMessage").modal("show");
			return;
		}else if($scope.videoDetails.videoUrl !=""){
			var re = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
			var userUrl=$scope.videoDetails.videoUrl;
			if (re.test(userUrl) == false) { 
				$scope.errorMsg = "Please Enter a Correct URL";
				$("#errorMessage").modal("show");
			    return;
			}
		}
		return true;
	};
    $scope.submit=function(){
    	$("#loader-mask").show();
    	if($scope.validate()){
    		if($scope.selectedId != null){
        		$http({
        			url : "editVideoGallery?id=" + $scope.selectedId,	
        			method : 'POST',
        			data : JSON.stringify(angular.toJson( $scope.videoDetails )),
        			contentType : 'application/json'
        		}).then(function successCallback(response) {
        			if(response.data.valid=='True'){
        				$scope.successMessage = response.data.errorMessage;
        	    		$("#pop").modal("show");
        				$("#loader-mask").fadeOut();
        				$scope.loadVideoGallery();
        				$scope.selectedId = null;
        				$scope.reset();
        			}
        			else{
        				$scope.errorMessage = response.data.errorMessage;
        				$("#errorMessage").modal('show');
        				$("#loader-mask").fadeOut();
        				$scope.selectedId = null;
        			}
        		});
        		$("#infoMessage").modal("hide");
        	}else{
        		$http({
        			url : "saveVideoGallery",	
        			method : 'POST',
        			data : JSON.stringify(angular.toJson( $scope.videoDetails )),
        			contentType : 'application/json'
        		}).then(function successCallback(response) {
        			if(response.data.valid=='True'){
        				$scope.successMessage = response.data.errorMessage;
        	    		$("#pop").modal("show");
        				$("#loader-mask").fadeOut();
        				$scope.loadVideoGallery();
        				$scope.reset();
        			}
        			else{
        				$scope.errorMessage = response.data.errorMessage;
        				$("#errorMessage").modal('show');
        				$("#loader-mask").fadeOut();
        			}
        		});
        	}
    		
    	}else{
    		$("#loader-mask").fadeOut();
    	}
    };
    $scope.reset=function(){
    	$scope.videoDetails={
			title:"",
			videoUrl:""
    	};
    	$scope.foreButton = "SUBMIT";
    	$scope.selectedId = null;
    };

    $scope.editEarmark=function(id){
    	$scope.selectedId = id;
    	$scope.filteredVideoGallery = $scope.videoGalleryList.filter(function (video) {
    	    return (video.videoId == id);
    	});
    	$scope.videoDetails.title=$scope.filteredVideoGallery[0].title;
    	$scope.videoDetails.videoUrl=$scope.filteredVideoGallery[0].videoUrl;
    	if( $scope.filteredVideoGallery[0].videoUrl == ""){
    		$scope.videoUploadName = null;
    	}
    	$scope.foreButton = "UPDATE";
    	document.getElementById('videoTitle').focus();
    	$('html, body').animate({
			scrollTop : 0
		}, 1000);
    };
    $scope.deleteConfirmation=function(id){
    	$scope.infoMsg="Do you want to delete this row?";
    	$("#infoMessage").modal('show');
    	$scope.selectedId = id;
    };
    $scope.deleteVideoGallery=function(){
    	$("#loader-mask").show();
    	if($scope.selectedId != null){
     		$http({
    			url : "updatesVideoGalleryIsLive?Id=" + $scope.selectedId,	
    			method : 'POST',
    			contentType : 'application/json'
    		}).then(function successCallback(response) {
    			if(response.data.valid=='True'){
    				$scope.successMessage = response.data.errorMessage;
    	    		$("#pop").modal("show");
    				$("#loader-mask").fadeOut();
    				$scope.loadVideoGallery();
    				$scope.reset();
    			}
    			else{
    				$scope.errorMessage = response.data.errorMessage;
    				$("#errorMessage").modal('show');
    				$("#loader-mask").fadeOut();
    				$scope.reset();
    			}
    		});
    		$("#infoMessage").modal("hide");
    	}else{
    		$("#loader-mask").fadeOut();
    	}
    };

});
