
// @author Sourav Nath
 

function unsupervisedFacilityReportController($scope, $http, $filter ,$timeout, $window,$compile) {
	
	// Pagination 
 	$scope.currentPage = 1;
    $scope.pageSize = 100;

    $scope.pageChangeHandler = function(num) {
       console.log('Pagination call ' + num);
    };
    // End Pagination 
    
	$scope.pageName = "Report > Unsupervised Facility";
	$scope.activeMenu = "UnsupervisedFcility";
	$scope.sortReverse = true; 
	
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
			}
		else{
			for(var i=0;i<$scope.mainStateList.length;i++)
				{
				if($filter('filter')($scope.location, {parentAreaId : $scope.mainStateList[i].areaNId, level : 3}, true).length)
					{
					  $scope.stateList.push($scope.mainStateList[i]);
					}
				}
			}
		if($scope.stateList.length == 1){
			$scope.selectState($scope.stateList[0]);
		}
			
		$scope.areasLoginwiseLoad= true;
		$scope.successLoad();
		$scope.defaultDropdownValue(); // Added by Sourav Nath
	}, function errorCallback(response) {
		$("#loader-mask").fadeOut();
	});
	
	// get checklist data
	$http.get("typeDetails").then(function(result) {
		$scope.checklists = $filter('filter')(result.data.Checklists, {
			key : 121
		}, true);
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
    		$scope.selectedState = $scope.stateList[0];
    	}else if(userLevel=="4"){
    		$scope.disabledState=true;
    		$scope.disabledDistrict=true;
    		$scope.selectedState = $scope.stateList[0];
			$scope.selectDistrict($scope.districtList[0]);
		}else if(userLevel=="5"){
			$scope.disabledState=true;
			$scope.disabledDistrict=true;
			$scope.disabledBlock=true;
    		$scope.selectedState = $scope.stateList[0];
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
		if($scope.stateList.length == 1)
			$scope.selectedState = $scope.stateList[0];
		else
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
		$scope.blockList = $filter('filter')($scope.location, {
			parentAreaId : $scope.selectedDist.areaNId, level : 4
		}, true);
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
	
	// select checklist type
	$scope.checklistSelectedAction = function(checklist){
		$scope.selectedCheckList = checklist;
	};

	$scope.validateReport = function() {

		if ($scope.selectedStartDate == undefined) {
			$scope.errorMsg = "Please Select From Timeperiod";
			$("#errorMessage").modal("show");
		}else if ($scope.selectedEndDate == undefined) {
			$scope.errorMsg = "Please Select To Timeperiod";
			$("#errorMessage").modal("show");
		}else if ($scope.selectedState == undefined) {
			$scope.errorMsg = "Please Select State";
			$("#errorMessage").modal("show");
		}else if ($scope.selectedDist == undefined) {
			$scope.errorMsg = "Please Select District";
			$("#errorMessage").modal("show");
		}else if ($scope.selectedBlock == undefined) {
			$scope.errorMsg = "Please Select Block";
			$("#errorMessage").modal("show");
		}else if ($scope.selectedCheckList == undefined) {
			$scope.errorMsg = "Please Select CheckList";
			$("#errorMessage").modal("show");
		}
		else{
			$("#loader-mask").show();
	    	$('.header-fixed-table').animate({
				scrollTop : 0
			});
	    	$scope.savedSelectedState = JSON.parse(JSON.stringify($scope.selectedState));
			$scope.savedSelectedDistrict = JSON.parse(JSON.stringify($scope.selectedDist));
			$scope.savedSelectedChecklist = JSON.parse(JSON.stringify($scope.selectedCheckList));
			$scope.savedSelectedStartDate = JSON.parse(JSON.stringify($scope.selectedStartDate));
			$scope.savedSelectedEndDate = JSON.parse(JSON.stringify($scope.selectedEndDate));
			$scope.getTableData();
		}
		
	};
	
	var searchDataMainTable = [];
	
	$scope.monthPlanUnplanedVisit =[];
	$scope.getTableData = function(){
		$scope.tableFilterWord=undefined;
		$("#loader-mask").show();
		// get all table data
		$http.get("getUnSupervisedFacilityData?checklistId=" +$scope.selectedCheckList.key+
				"&startdateId="+$scope.selectedStartDate.startDate+
				"&endDateId="+$scope.selectedEndDate.endDate +
				"&districtId="+$scope.selectedDist.areaNId+
				"&blockId="+$scope.selectedBlock.areaNId).then(function(result) {
		        	$scope.unsupervisedTableData  = result.data;
			$("#loader-mask").hide();
		}, function errorCallback(response) {
			$("#loader-mask").hide();
		});
		
	};
	$("#searchTable").autocomplete({
	    source: searchDataMainTable
	});
	
	
	// downloadExcel
	$scope.exportTableData = function(id){
		var htmls = "";
        var uri = 'data:application/vnd.ms-excel;base64,';
        var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'; 
        var base64 = function(s) {
            return window.btoa(unescape(encodeURIComponent(s)));
        };

        var format = function(s, c) {
            return s.replace(/{(\w+)}/g, function(m, p) {
                return c[p];
            });
        };
        var tab_text = "<h2>Unsupervised Facility</h2><h3>Checklist: "+$scope.savedSelectedChecklist.value+"</h3><h3>Location: " + $scope.savedSelectedDistrict.name + ", " +$scope.savedSelectedState.name +"</h3><h3>Time Period: "+ $scope.savedSelectedStartDate.timePeriod + "-" + $scope.savedSelectedEndDate.timePeriod + "</h3>";
        if(id == "dataTable"){
        	 tab_text=tab_text+"<table border='2px'><tr bgcolor='#87AFC6'>";
        }
        else
        tab_text=tab_text+"<table border='2px'><tr bgcolor='#87AFC6'>";
        var textRange; var j=0;
        tab = document.getElementById(id); // id of table

        for(j = 0 ; j < tab.rows.length ; j++) 
        {     
            tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
            //tab_text=tab_text+"</tr>";
        }

        tab_text=tab_text+"</table>";
        tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
        tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
        tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params


        var ctx = {
            worksheet : 'Worksheet',
            table : tab_text
        };


        var link = document.createElement("a");
        link.download = "unsupervised_facility_report_" + $scope.savedSelectedState.name +"_" + new Date().toLocaleDateString() + ".xls";
        var exceldata = new Blob([(format(template, ctx))], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }); 
        if (window.navigator.msSaveBlob) { // IE 10+
            window.navigator.msSaveOrOpenBlob(exceldata, link.download);
        }
        
        else {
            link.href = window.URL.createObjectURL(exceldata); // set url for link download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
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