/**
 * @author Sourav Keshari Nath
 */

var myAppConstructor = angular.module('openItemsApp', ['angularUtils.directives.dirPagination']);
myAppConstructor.controller('OpenItemsController', ['$scope', '$http', function($scope, $http){
		
		$scope.remarks = null;
		$scope.remarksReadOnly = false;
		$scope.openItemList = [];
		$scope.statusObj = {};
		$scope.statusNotificationCount ={};
		$scope.statusName="";
		$scope.selectedId = "";
		$scope.selectedStatusObj = {};
	 	$scope.currentPage = 1;
	    $scope.pageSize = 5;
	    $scope.sortReverse = true;
	    $scope.pageChangeHandler = function(num) {
	       console.log('Pagination call ' + num);
	    };
		$scope.filterData = function(tableFilterWord){
			 $scope.currentPage = 1;
			    $scope.pageSize = 5;
			 $scope.pageChangeHandler = function(num) {
			       console.log('Pagination call ' + num);
			    };

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
		
		$scope.clearInput = function(){
			if($scope.statusObj.status != 140){
				$scope.statusObj.remarks = null;
			}
		}
		
		$scope.statusObject= [];
		$("#loader-mask").show();
		
		$http.get("openItemData").then(function(result){
			console.log(result.data);
			if(result.data != ""){
				$scope.openItemList = result.data.ActionItems;
				$scope.statusNotificationCount = $scope.openItemList.filter(function (obj) {
					return (obj.status == 139);
				});
				$scope.statusObject = result.data.TypeDetailList;
				$scope.statusList = $scope.statusObject.filter(function (status) {
					return (status.typeId.id == 18);
				});
			}
			$("#loader-mask").fadeOut();
		},function(error){
			//console.log(error);
			$("#loader-mask").fadeOut();
			$scope.errorMsg = loginMsg;
			$('#errorMessage').modal('show');
		});
			
		$scope.selectedStatus = function(statusObj){
			$scope.selectedStatusName = statusObj.name;
			$scope.currentStatusId = statusObj.id;
		};
		 
		$scope.changeStatus = function(actionItemObj){
			$scope.isClosed = actionItemObj.status == 139 ? false : true;
			$scope.statusObj = actionItemObj;
			$scope.currentStatusId = actionItemObj.status;
			$scope.remarksReadOnly = actionItemObj.remarks == null ? false : true;
			 
			$scope.filteredObj = $scope.statusList.filter(function (st) {
				    return (st.id == actionItemObj.status);
			});
			$scope.selectedStatusName = $scope.filteredObj[0].name;
			 
			$('#statusModal').modal('show');
		};
		$scope.saveConfirmation=function(id, remarks){
			if(remarks != null && remarks.trim() != "" && $scope.currentStatusId == 140){
				$scope.infoMsg="Do you want to save to this status?";
				$("#infoMessage1").modal('show');
				$scope.selectedId = id;
				$scope.remarks = remarks;
			}else{
				if($scope.currentStatusId == 140){
					$scope.errorMessage = "Please enter remarks";
					$("#errorMessage").modal('show');
				}
			}
		};
		 
		 $scope.validate=function(){
				if($scope.newsUpdates.newsTitle.trim() =="") {
					$scope.errorMsg = "Please select status";
					$("#errorMessage").modal("show");
					return;
				}
				return true;
		 };
		 $scope.saveStatus = function(){
			 if($scope.selectedId && $scope.selectedId != null && $scope.selectedId!=""){
				 if($scope.remarks != null && $scope.remarks.trim() != ""){
					 var obj = { id : $scope.selectedId, remarks : $scope.remarks };
					 $http.post("updateOpenItems", obj)
					 .then(function successCallback(response) {
		     			if(response.data.statusCode == 200){
		     				$scope.successMessage = response.data.errorMessage;
		     	    		$("#pop").modal("show");
		     				$("#loader-mask").fadeOut();
		     				$scope.selectedId = "";
		     			}
		     			else{
		     				$scope.errorMessage = response.data.errorMessage;
		     				$("#errorMessage").modal('show');
		     				$("#loader-mask").fadeOut();
		     				$scope.selectedId = null;
		     			}
		     		 });
				 }else{
					 $scope.errorMessage = "Please enter remarks";
					 $("#errorMessage").modal('show');
				 }
			 }

		 };
		 
		 $scope.reloadPage = function(){
			 window.location.reload();
		 };
		 
		 $scope.closeModal = function(){
			 $("#errorMessage").modal("hide");
			 if($scope.errorMessage == "Please enter remarks"){
				 document.getElementById('remarks').focus();
			 } 
		 };
		
}]);