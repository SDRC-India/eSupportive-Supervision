/**
 * @author Sourav Nath (souravnath@sdrc.co.in)
 * @author Ratikanta pradhan (ratikanta@sdrc.co.in)
 */
var myAppConstructor = angular.module('newsUpdatesApp', ['angularUtils.directives.dirPagination']);
myAppConstructor.controller("newsUpdatesController", function($scope, $http, $timeout, $window){
	$scope.errorMessage = "";
	$scope.activeMenu = "newsupdate";
    $scope.selectedId = null;
	$scope.sortReverse=true;
	$scope.newsUpdatesList=[];
	$scope.foreButton = "SUBMIT";
	$scope.currentPage = 1;
    $scope.pageSize = 5;

    $scope.pageChangeHandler = function(num) {
       console.log('Pagination call ' + num);
    };
	// filter table 
	$scope.newsUpdatesData = function(tableFilterWord){
		 $scope.currentPage = 1;
		    $scope.pageSize = 5;
		 $scope.pageChangeHandler = function(num) {
		       console.log('Pagination call ' + num);
		    };

		};
	// get section and theme
	$scope.newsUpdates={
		newsTitle:"",
		newsLinks:""
	};
	$scope.loadNewsUpdates = function(){
		$("#loader-mask").show();
		$http.get("getAllNewsUpdates").then(function(result) {
			$scope.newsUpdatesList = result.data;
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
	$scope.loadNewsUpdates();
	$scope.focusinput = function (){
		 $("#errorMessage").modal("hide");
		 if($scope.errorMsg == "Please Enter Title"){
			 document.getElementById('newsTitle').focus();
		 }else if($scope.errorMsg == "Please Enter a Correct URL"){
			 document.getElementById('newsLinks').focus();
		 }  
	};
	$scope.validate=function(){
		if($scope.newsUpdates.newsTitle.trim() =="") {
			$scope.errorMsg = "Please Enter Title";
			$("#errorMessage").modal("show");
			return;
		}else if($scope.newsUpdates.newsLinks !=""){
			var re = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
			var userUrl=$scope.newsUpdates.newsLinks;
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
        			url : "editNewsUpdates?id=" + $scope.selectedId,	
        			method : 'POST',
        			data : JSON.stringify(angular.toJson( $scope.newsUpdates )),
        			contentType : 'application/json'
        		}).then(function successCallback(response) {
        			if(response.data.valid=='True'){
        				$scope.successMessage = response.data.errorMessage;
        	    		$("#pop").modal("show");
        				$("#loader-mask").fadeOut();
        				$scope.loadNewsUpdates();
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
        			url : "saveNewsUpdates",	
        			method : 'POST',
        			data : JSON.stringify(angular.toJson( $scope.newsUpdates )),
        			contentType : 'application/json'
        		}).then(function successCallback(response) {
        			if(response.data.valid=='True'){
        				$scope.successMessage = response.data.errorMessage;
        	    		$("#pop").modal("show");
        				$("#loader-mask").fadeOut();
        				$scope.loadNewsUpdates();
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
    	$scope.newsUpdates={
			newsTitle:"",
			newsLinks:""
    	};
    	$scope.foreButton = "SUBMIT";
    	$scope.selectedId = null;
    };

    $scope.editEarmark=function(id){
    	$scope.selectedId = id;
    	$scope.filteredNewsUpdates = $scope.newsUpdatesList.filter(function (news) {
    	    return (news.newsUpdatesId == id);
    	});
    	$scope.newsUpdates.newsTitle=$scope.filteredNewsUpdates[0].newsTitle;
    	$scope.newsUpdates.newsLinks=$scope.filteredNewsUpdates[0].newsLinks;
    	$scope.foreButton = "UPDATE";
    	document.getElementById('newsTitle').focus();
    	$('html, body').animate({
			scrollTop : 0
		}, 1000);
    };
    /**
     * @author Ratikanta pradhan (ratikanta@sdrc.co.in)
     * just changed the message
     */
    $scope.deleteConfirmation=function(id){
    	$scope.infoMsg="Do you want to delete this row?";
    	$("#infoMessage").modal('show');
    	$scope.selectedId = id;
    };
    $scope.deleteNewsUpdates=function(){
    	$("#loader-mask").show();
    	if($scope.selectedId != null){
     		$http({
    			url : "updatesNewsUpdatesIsLive?Id=" + $scope.selectedId,	
    			method : 'POST',
    			contentType : 'application/json'
    		}).then(function successCallback(response) {
    			if(response.data.valid=='True'){
    				$scope.successMessage = response.data.errorMessage;
    	    		$("#pop").modal("show");
    				$("#loader-mask").fadeOut();
    				$scope.loadNewsUpdates();
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
