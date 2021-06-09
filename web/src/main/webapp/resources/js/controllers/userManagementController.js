/**
 * @author Devikrushna Nanda (devikrushna@sdrc.co.in)
 */

function userManagementController($scope, $http, $filter, $timeout,$compile) {
	
	
	$scope.pageName = "User Management";
	$scope.activeMenu = "user management";
	$scope.pendingUserListFilter = [];
	$scope.approveSection=true;
	$scope.pendinguserList=true;
	$scope.sortReverse=false;
	// variable declarations
	$scope.successMessage = "";
	$scope.selectedTab = 'Pending Users';
	
	// function declarations
	$scope.selectApprovedUser = function(val){
		$scope.selectedTab = val;
		$scope.approveSection=false;
		$scope.rejectuserList=false;
		$scope.pendinguserList=false;
		$scope.approveuserList=true;
		$scope.approvedfresh();
	};
	$scope.selectRejectedUser = function(val){
		
		$scope.selectedTab = val;
		$scope.approveSection=false;
		$scope.rejectuserList=true;
		$scope.pendinguserList=false;
		$scope.approveuserList=false;
		$scope.rejectedfresh();
	
	};
	$scope.selectPendingUser = function(val){
		$scope.selectedTab = val;
		$scope.approveSection=true;
		$scope.rejectuserList = false;
		$scope.pendinguserList=true;
		$scope.approveuserList=false;
	};
	
	// Pagination by @Devikrushna
 	$scope.currentPage = 1;
    $scope.pageSize = 50;

    $scope.pageChangeHandler = function(num) {
       console.log('Pagination call ' + num);
    };
// End Pagination by @Devikrushna
	
	// filter table by @Devikrushna
	$scope.pendingfilterData = function(tableFilterWord){
		 $scope.currentPage = 1;
		    $scope.pageSize = 50;
		 $scope.pageChangeHandler = function(num) {
		       console.log('Pagination call ' + num);
		    };

		};
		$scope.rejectUserFilter = function(rejectTableFilter){
			 $scope.currentPage = 1;
			    $scope.pageSize = 50;
			 $scope.pageChangeHandler = function(num) {
			       console.log('Pagination call ' + num);
			    };

			};
			$scope.approveUserFilter = function(approveTableFilter){
				 $scope.currentPage = 1;
				    $scope.pageSize = 50;
				 $scope.pageChangeHandler = function(num) {
				       console.log('Pagination call ' + num);
				    };

				};
				
		//end filter table by @Devikrushna	 
	
	
	$scope.getAllPendingUsers =function()
	{
		$("#loader-mask").show();
		$http.get("getAllPendingUsers").then(function(result) {
			$scope.pendingUserList = result.data;
			$scope.pendingUserListFilter = $scope.pendingUserList;
			$("#loader-mask").fadeOut();
		});
	};
	$scope.rejectedfresh= function(){
		$("#loader-mask").show();
		$http.get("getAllRejectedUsers").then(function(result) {
			$scope.rejectedUserList = result.data;
			//$scope.rejectUserListFilter = $scope.rejectedUserList;
			$("#loader-mask").fadeOut();
		});
	};
	$scope.approvedfresh= function(){
		$("#loader-mask").show();
		$http.get("getAllApprovalUsers").then(function(result) {
			$scope.approvedUserList = result.data;
			//$scope.approveUserListFilter = $scope.approvedUserList
			$("#loader-mask").fadeOut();
		});
	};
	$scope.getAllPendingUsers();
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
      
	$scope.approveUser= function(approve){
		$scope.selectedUserList=[];
		$scope.selectedUserModelList=[];
		$scope.errorList = [];
		for(var i=0; i<$scope.pendingUserList.length; i++){
    		if($scope.pendingUserList[i].checked){
    			$scope.selectedUserList.push($scope.pendingUserList[i].userId);
    			$scope.selectedUserModelList.push($scope.pendingUserList[i]);
    		}
    	}
		if($scope.selectedUserList.length==0)
		{
			$scope.errorMessage = "Please select atleast one user ID";
			$("#errorMessage").modal('show');
			$("#loader-mask").fadeOut();
		}
		else{
			$scope.aprroveVariable=approve;
			if(approve)
				{
				$("#infoMessage").modal("show");
				$scope.infoMsg="Please confirm if you want to approve the selected user(s)";
				}
			else
				{
			    $("#rejectionInfoMessage").modal("show");
				$scope.infoMsg="Please confirm if you want to reject the selected user(s)";
				}
		}
		$scope.rejctionUserValidate=function(){
			var counter=0;
			angular.forEach($scope.selectedUserModelList, function(userDetails, key) {
                console.log(userDetails.rejectionReason);
                if(userDetails.rejectionReason.length<50)
            	{
                  counter++;
            	}
			});
			if(counter>0){
				return true;
			}else{
				return false;
			}
			
		};
		$scope.approveSelected= function(approve)
			{$scope.errorList = [];
			if(!approve){
				if($scope.rejctionUserValidate()){
					$scope.errorMsg = "Please enter rejection reason (The reason should be minimum 50 characters).";
					$("#errorMessageForRejectionReason").modal("show");
					return;
				};
			}
			$("#infoMessage").modal("hide");
			$("#rejectionInfoMessage").modal("hide");
			$("#loader-mask").show();
		$http({
			url : "approveAnUser?approveOrReject="+approve ,	
			method : 'POST',
			data : JSON.stringify(angular.toJson( $scope.selectedUserModelList )),
			contentType : 'application/json'
		}).then(function successCallback(response) {
			$scope.errorList = [];
			if(response.data.valid=='true'){
				$scope.successMessage = response.data.errorMessage;
	    		$("#pop").modal("show");
				$("#loader-mask").fadeOut();
				$scope.getAllPendingUsers();
			}
			else{
				$scope.errorMessage = response.data.errorMessage;
				$scope.errorList = response.data.errorData;
				$("#errorMessage").modal('show');
				$("#loader-mask").fadeOut();
			}
			
			
		});
		};
	
	};
	
	$scope.clearData = function(){
		$("#rejectionInfoMessage").modal("hide");
		$("#rejection-reason").val("") ;
	};
	/*$scope.clearChecked = function(){
		
		for(var i=0; i<$scope.pendingUserList.length; i++){
    		if($scope.pendingUserList[i].checked){
    			$scope.pendingUserList[i].checked=false;
    		}
    	}
		$("#infoMessage").modal("hide");
	} */
	
	
	$scope.downloadFile = function (fileName) {
		$("#loader-mask").show();
		$.download = function(url, data, method) {
			// url and data options required
			if (url && data) {
				// data can be string of parameters or array/object
				data = typeof data == 'string' ? data : jQuery.param(data);
				// split params into form inputs
				var inputs = '';
				jQuery.each(data.split('&'), function() {
					var pair = this.split('=');
					inputs += '<input type="hidden" name="' + pair[0]
							+ '" value="' + pair[1] + '" />';
				});
				// send request
				jQuery(
						'<form action="' + url + '" method="'
								+ (method || 'post') + '">' + inputs
								+ '</form>').appendTo('body').submit().remove();
			}
			;
			$("#loader-mask").fadeOut();
		};

		var result = {
			"fileName" : fileName
		};
		$.download("downloadIDCards/", result, 'POST');

	};

}
