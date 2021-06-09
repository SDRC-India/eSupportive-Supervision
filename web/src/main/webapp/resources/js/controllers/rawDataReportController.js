
// @author Sourav Nath
 

function rawDataReportController($scope, $http, $filter ,$timeout, $window,$compile) {
	
	// Pagination 
 	$scope.currentPage = 1;
    $scope.pageSize = 100;

    $scope.pageChangeHandler = function(num) {
       console.log('Pagination call ' + num);
    };
    // End Pagination 
    
	$scope.pageName = "Report > Raw Data";
	$scope.activeMenu = "rawData";
	$scope.sortReverse = true; 
	
	$scope.rawDataReportTableData  = [];
	$scope.facilityTypeListDetails = [];
	$scope.blockList = [];
	
	$scope.areasLoginwiseLoad= false;
	$scope.typeDetailsLoad = false;
	$scope.getTimePeriodLoad =false;
	$("#loader-mask").show();
	var userLevel = document.getElementById('userLevel').value; // Added by Sourav Nath
	// get all time period
	$http.get("getTimePeriod").then(function(result) {
		$scope.timeperiodFetched = true;
		$scope.allTimePeriod = result.data;
		$scope.getTimePeriodLoad= true;
		$scope.successLoad();
	}, function errorCallback(response) {
		$("#loader-mask").fadeOut();
	});
	
	
	// get data based on user login
	$http.get("areasLoginwise").then(function(result) {
		$scope.areaFetched =true;
		$scope.showBlock = true;
		$scope.location = result.data;
		$scope.mainStateList = $filter('filter')($scope.location, {
			parentAreaId : 1
		}, true);
	    $scope.stateList=[];
		if($scope.mainStateList.length == 1)
		{
	      $scope.stateList=$scope.mainStateList;
		}else{
			for(var i=0;i<$scope.mainStateList.length;i++)
				{
				
				if($filter('filter')($scope.location, {parentAreaId : $scope.mainStateList[i].areaNId, level : 3}, true).length)
					{
					  $scope.stateList.push($scope.mainStateList[i]);
					}
				}
		    }	

		$scope.areasLoginwiseLoad= true;
		$scope.successLoad();
		$scope.defaultDropdownValue(); // Added by sourav nath
	}, function errorCallback(response) {
		$("#loader-mask").fadeOut();
	});
	
	// get checklist data
	$http.get("typeDetails").then(function(result) {
		$scope.checklists = result.data.Checklists;
		$scope.facilityTypeListDetails = result.data["FacilityTypeForArea"];
		if(userLevel==5){
			var index=$scope.facilityTypeListDetails.indexOf($filter('filter')($scope.facilityTypeListDetails, {key:105}, true)[0]);
    		$scope.facilityTypeListDetails.splice(index,1);
		}
		$scope.typeDetailsLoad= true;
		$scope.successLoad();
	}, function errorCallback(response) {
		$("#loader-mask").fadeOut();
	});
	$scope.successLoad = function(){
		if($scope.areasLoginwiseLoad == true && $scope.typeDetailsLoad == true && $scope.getTimePeriodLoad == true){
			$("#loader-mask").hide();
		};
	};
	// select start date
	$scope.selectStartDate = function(time) {	
		$scope.selectedStartDate = time;
		$scope.selectedEndDate = undefined;
		$scope.endTimePeriods = [];		
		for (var i = 0; i < $scope.allTimePeriod.length; i++) {
			if ($scope.allTimePeriod[i].timePeriodId >= $scope.selectedStartDate.timePeriodId) {
				$scope.endTimePeriods.push($scope.allTimePeriod[i]);
			}			
		}	
	};
	// select end date
	$scope.selectEndDate = function(endTime) {
		$scope.selectedEndDate = endTime;
		
	};
	// select checklist type
	$scope.checklistSelectedAction = function(checklist){
		$scope.selectedCheckList = checklist;
		$scope.selectedFacilityType = undefined;
		if($scope.selectedCheckList.key == 121){
			$scope.facilityTypelist = $scope.facilityTypeListDetails;
		}else{
			$scope.facilityTypelist = $filter('filter')($scope.facilityTypeListDetails, {
				key : 102
			}, true);
		}
	};
	// select facility type
	$scope.selectFacilityType = function(facility){
		$scope.selectedFacilityType = facility;
        if($scope.selectedFacilityType.key==105){
    		$scope.blockList = [];
    		$scope.selectedBlock = undefined;
        }
        if(userLevel=="5"){
        	$scope.selectDistrict($scope.districtList[0]);
        	$scope.selectBlock($scope.blockList[0]);
        }else{
        	$scope.selectDistrict($scope.districtList[0]);
        }
	};
   /*
    * ------------------------------
    * 	@author Sourav Nath 
    * ------------------------------
    */
	$scope.disabledState=false;
	$scope.disabledDistrict=false;
	$scope.disabledBlock=false;
    $scope.defaultDropdownValue= function(){
    	if(userLevel=="2"){
    		$scope.disabledState=true;
    		$scope.selectState($scope.stateList[0]);
    	}else if(userLevel=="4"){
    		$scope.disabledState=true;
    		$scope.disabledDistrict=true;
    		$scope.selectState($scope.stateList[0]);
			$scope.selectDistrict($scope.districtList[0]);
		}else if(userLevel=="5"){
			$scope.disabledState=true;
			$scope.disabledDistrict=true;
			$scope.disabledBlock=true;
    		$scope.selectState($scope.stateList[0]);
			$scope.selectDistrict($scope.districtList[0]);
			$scope.selectBlock($scope.blockList[0]);
		}
    };
    /*
     * ------------------------------
     * 	Code Ended 
     * ------------------------------
     */
	// select state
	$scope.selectState = function(state) {		
		$scope.selectedState = state;
		$scope.districtList = $filter('filter')($scope.location, {
			parentAreaId : $scope.selectedState.areaNId, level : 3
		}, true);
		$scope.selectedDist = undefined;
		$scope.selectedBlock = undefined;
	};
	// select district 
	$scope.selectDistrict = function(dist) {	
		$scope.selectedDist = dist;
		$scope.blockList = [];
		if(!$scope.selectedFacilityType || $scope.selectedFacilityType.key!=105){
			$scope.blockList = $filter('filter')($scope.location, {
				parentAreaId : $scope.selectedDist.areaNId, level : 4
			}, true);
		}
		
		if($scope.blockList.length && userLevel!="5")
		{
			var allBlock={	name :"All Block", areaNId: 0,level :4};
			$scope.blockList.push(allBlock);
		}
		$scope.selectedBlock = undefined;
	};
	// select block 
	$scope.selectBlock = function(block) {	
		$scope.selectedBlock = block;
	};
	
	var searchDataMainTable = [];
	$scope.getTableData = function(){
		// get all table data
		$scope.bId=0;
		if($scope.selectedBlock!=undefined){
			$scope.bId = $scope.selectedBlock.areaNId;
		}else{
			$scope.bId=0;
		}
		var allBlock=$scope.bId==-1?true:false
       $("#loader-mask").show();
		$http(
				{
					url : "getRawDataReport?checklistId=" +$scope.selectedCheckList.key+
					"&facilityTypeId="+$scope.selectedFacilityType.key+
					"&startdateId="+$scope.selectedStartDate.startDate+
					"&endDateId="+$scope.selectedEndDate.endDate +
					"&districtId="+$scope.selectedDist.areaNId +
					"&blockId="+$scope.bId
					+"&isAllBlock="+allBlock,
					method : 'POST',
					contentType : 'application/json',
					responseType:'arraybuffer'
				}).then(function(result) {
					
				    jsonData = result.data;
				    
				    if($scope.selectedBlock != undefined)
				    	var fName = $scope.selectedBlock.name+".xlsx";
				    else
				    	var fName = $scope.selectedDist.name+".xlsx";
					var file =new Blob([jsonData], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
					if(file.size>0)
						{
					var fileURL = (window.URL || window.webkitURL).createObjectURL(file);
					var downloadLink = document.createElement("a");

					document.body.appendChild(downloadLink);
					downloadLink.style = "display: none";
					$("#loader-mask").fadeOut();
					downloadLink.href = fileURL;
					downloadLink.download = fName;
					downloadLink.click();
					deferred.resolve(jsonData);
						}
						else
						{
						$("#loader-mask").fadeOut();
						$scope.errorMsg = "Data Not Available";
						$("#errorMessage").modal("show");
						}
						
					
		}, function(error) {
			$("#loader-mask").fadeOut();
			jsonData = error;
			deferred.reject(error);
		});
	};
	$("#searchTable").autocomplete({
	    source: searchDataMainTable
	});
	$scope.closeModal = function(){
		$("#errorMessage").modal("hide");
		 if($scope.errorMsg == "Please Select Form Timeperiod"){
			 document.getElementById('fromdate').focus();
		 } else if($scope.errorMsg == "Please Select To Timeperiod"){
			 document.getElementById('todate').focus();
		 }else if($scope.errorMsg == "Please Select Checklist"){
			 document.getElementById('checklist').focus();
		 }else if($scope.errorMsg == "Please Select Facility Type"){
			 document.getElementById('facilitytype').focus();
		 }else if($scope.errorMsg == "Please Select State"){
			 document.getElementById('state').focus();
		 } else if($scope.errorMsg == "Please Select District"){
			 document.getElementById('district').focus();
		 }else if($scope.errorMsg == "Please Select Block"){
			 document.getElementById('block').focus();
		 }
	};
	// downloadExcel
	$scope.exportTableData = function(id){
		
		if ($scope.selectedStartDate == undefined) {
			$scope.errorMsg = "Please Select From Timeperiod";
			$("#errorMessage").modal("show");
		}else if ($scope.selectedEndDate == undefined) {
			$scope.errorMsg = "Please Select To Timeperiod";
			$("#errorMessage").modal("show");
		}else if ($scope.selectedCheckList == undefined) {
			$scope.errorMsg = "Please Select Checklist";
			$("#errorMessage").modal("show");
		}else if ($scope.selectedFacilityType == undefined) {
			$scope.errorMsg = "Please Select Facility Type";
			$("#errorMessage").modal("show");
		}else if ($scope.selectedState == undefined) {
			$scope.errorMsg = "Please Select State";
			$("#errorMessage").modal("show");
		}else if ($scope.selectedDist == undefined) {
			$scope.errorMsg = "Please Select District";
			$("#errorMessage").modal("show");
		}else if ($scope.selectedBlock == undefined && $scope.selectedFacilityType.key!=105) {
			$scope.errorMsg = "Please Select Block";
			$("#errorMessage").modal("show");
		}
		else{
			$scope.getTableData();
		}
    };
	//------------------------Sorting -----------------------------		
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
	
};