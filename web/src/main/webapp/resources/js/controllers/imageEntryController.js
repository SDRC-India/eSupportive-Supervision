/**
 * @author Sourav Nath (souravnath@sdrc.co.in)
 */
var myAppConstructor = angular.module('imageEntryApp', ['angularUtils.directives.dirPagination']);
myAppConstructor.controller("imageEntryController", function($scope, $http, $timeout, $window){
	$scope.errorMessage = "";
	$scope.activeMenu = "imageentry";
    $scope.selectedId = null;
	$scope.sortReverse=true;
	$scope.foreButton = "SUBMIT";
	$scope.currentPage = 1;
    $scope.pageSize = 5;
    $scope.pageName = "Manage Image Gallery";
    $scope.imageUploadName =null;
    $scope.imageGalleryList=[];
    
    $scope.pageChangeHandler = function(num) {
       console.log('Pagination call ' + num);
    };
	// filter table 
	$scope.imageGalleryData = function(tableFilterWord){
		 $scope.currentPage = 1;
		    $scope.pageSize = 5;
		 $scope.pageChangeHandler = function(num) {
		       console.log('Pagination call ' + num);
		    };

	};
	 setTimeout(function() {
			$('#uploadsal-icon,#uploadsalfile1').click(function() {
				$('#uplodsal').click();
			});
	 },500);
	 $scope.getUploadFile = function(e) {
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
						$scope.imageUploadName = $scope.uploadText;
						$('#uplodsal').val(null);
						$scope.errorMsg = "Image file must be of (jpg, jpeg, png) type";
						$("#errorMessage").modal("show");
					} 
					else {
						$scope.files.push(e.files[i]);
						$scope.getBase64($scope.files[0]);
						$scope.imageUploadName = $scope.files[0].name;
					}
				}

			});
		}
	};
	$scope.getBase64=function(file) {
	 	var reader = new FileReader();
	 	reader.readAsDataURL(file);
	 	reader.onload = function () {
			$timeout(function() {
				$scope.imageDetails.images=reader.result;
		    }, 100);
	 	};
	 	reader.onerror = function (error) {
	 	};
	};
	// get section and theme
	$scope.imageDetails={
		title:"",
		images:null
	};
	$scope.loadImageGallery = function(){
		$("#loader-mask").show();
		$http.get("getGalleryImages").then(function(result) {
			$scope.imageGalleryList = result.data;
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
	$scope.loadImageGallery();
	$scope.focusinput = function (){
		 $("#errorMessage").modal("hide");
		 if($scope.errorMsg == "Please Enter Title"){
			 document.getElementById('imageTitle').focus();
		 } 
	};
	$scope.validate=function(){
		if($scope.imageDetails.title.trim() == "") {
			$scope.errorMsg = "Please Enter Title";
			$("#errorMessage").modal("show");
			return;
		}else if($scope.imageDetails.images == null){
			$scope.errorMsg = "Please Upload Image";
			$("#errorMessage").modal("show");
			return;
		}
		return true;
	};
    $scope.submit=function(){
    	$("#loader-mask").show();
    	if($scope.validate()){
    		if($scope.selectedId != null){
        		$http({
        			url : "editImageGallery?id=" + $scope.selectedId,	
        			method : 'POST',
        			data : JSON.stringify(angular.toJson( $scope.imageDetails )),
        			contentType : 'application/json'
        		}).then(function successCallback(response) {
        			if(response.data.valid=='True'){
        				$scope.successMessage = response.data.errorMessage;
        	    		$("#pop").modal("show");
        				$("#loader-mask").fadeOut();
        				$scope.loadImageGallery();
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
        			url : "saveImageGallery",	
        			method : 'POST',
        			data : JSON.stringify(angular.toJson( $scope.imageDetails )),
        			contentType : 'application/json'
        		}).then(function successCallback(response) {
        			if(response.data.valid=='True'){
        				$scope.successMessage = response.data.errorMessage;
        	    		$("#pop").modal("show");
        				$("#loader-mask").fadeOut();
        				$scope.loadImageGallery();
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
    	$scope.imageDetails={
			title:"",
			images:null
    	};
    	$scope.foreButton = "SUBMIT";
    	$scope.selectedId = null;
    };

    $scope.editEarmark=function(id){
    	$scope.selectedId = id;
    	$scope.filteredImageGallery = $scope.imageGalleryList.filter(function (img) {
    	    return (img.imageId == id);
    	});
    	$scope.imageDetails.title=$scope.filteredImageGallery[0].title;
    	$scope.imageDetails.images=$scope.filteredImageGallery[0].images;
    	if( $scope.filteredImageGallery[0].images == ""){
    		$scope.imageUploadName = null;
    	}
    	document.getElementById('imageTitle').focus();
    	$scope.foreButton = "UPDATE";
    	$('html, body').animate({
			scrollTop : 0
		}, 1000);
    };
    $scope.deleteConfirmation=function(id){
    	$scope.infoMsg="Do you want to delete this row?";
    	$("#infoMessage").modal('show');
    	$scope.selectedId = id;
    };
    $scope.deleteImageGallery=function(){
    	$("#loader-mask").show();
    	if($scope.selectedId != null){
     		$http({
    			url : "updatesImageGalleryIsLive?Id=" + $scope.selectedId,	
    			method : 'POST',
    			contentType : 'application/json'
    		}).then(function successCallback(response) {
    			if(response.data.valid=='True'){
    				$scope.successMessage = response.data.errorMessage;
    	    		$("#pop").modal("show");
    				$("#loader-mask").fadeOut();
    				$scope.loadImageGallery();
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
