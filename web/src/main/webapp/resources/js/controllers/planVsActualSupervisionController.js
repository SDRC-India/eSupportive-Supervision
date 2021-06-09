
// @author Devikrushna Nanda (devikrushna@sdrc.co.in)
 

function reportController($scope, $http, $filter ,$timeout, $window,$compile) {
	
	// Pagination 
 	$scope.currentPage = 1;
    $scope.pageSize = 100;

    $scope.pageChangeHandler = function(num) {
       console.log('Pagination call ' + num);
    };
    // End Pagination 
    
	$scope.pageName = "Report > Planned Vs. Actual Supervision ";
	$scope.activeMenu = "planVsactual";
	$scope.sortReverse = true; 
	$scope.sortReverse1 = true;
	$scope.searchResultDiv = false;
	$scope.tableResultDiv = false;
	$scope.excelNameId = "";
	
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
		$("#loader-mask").hide();
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
		$("#loader-mask").hide();
	});
	
	// get checklist data
	$http.get("typeDetails").then(function(result) {
		$scope.checklists = result.data.Checklists;
		$scope.typeDetailsLoad= true;
		$scope.successLoad();
	}, function errorCallback(response) {
		$("#loader-mask").hide();
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
	
	
	$scope.monthPlanUnplan = [ {
		visitID : 1,
		visitName : 'Planned'
	}, {
		visitID : 2,
		visitName : 'Visit(Planned)'
	}, {
		visitID : 3,
		visitName : 'Visit(Unplanned)'
	}, {
		visitID : 4,
		visitName : 'Total Visit'
	}
	
	];
	
	
	$scope.closeModal = function(){
		$("#errorMessage").modal("hide");
		 if($scope.errorMsg == "Please Select From Timeperiod"){
			 document.getElementById('fromdate').focus();
		 } else if($scope.errorMsg == "Please Select To Timeperiod"){
			 document.getElementById('todate').focus();
		 }else if($scope.errorMsg == "Please Select State"){
			 document.getElementById('state').focus();
		 }else if($scope.errorMsg == "Please Select District"){
			 document.getElementById('district').focus();
		 }else if($scope.errorMsg == "Please Select Block"){
			 document.getElementById('block').focus();
		 }else if($scope.errorMsg == "Please Select Checklist"){
			 document.getElementById('checklist').focus();
		 }
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
			$scope.errorMsg = "Please Select Checklist";
			$("#errorMessage").modal("show");
		}
		else{
			$scope.savedSelectedState = JSON.parse(JSON.stringify($scope.selectedState));
			$scope.savedSelectedDistrict = JSON.parse(JSON.stringify($scope.selectedDist));
			$scope.savedSelectedChecklist = JSON.parse(JSON.stringify($scope.selectedCheckList));
			$scope.savedSelectedStartDate = JSON.parse(JSON.stringify($scope.selectedStartDate));
			$scope.savedSelectedEndDate = JSON.parse(JSON.stringify($scope.selectedEndDate));
			$scope.getTableData();
			$scope.searchResultDiv = true;
			$scope.tableResultDiv = true;
			$scope.monthPlanUnplanedVisit =[];
		}
		
	}
	
	//var searchDataMainTable = [];
	
	$scope.monthPlanUnplanedVisit =[];
	$scope.getTableData = function(){
		$("#loader-mask").show();
		
		// get all table data
		$http.post("report?checklistId=" + $scope.selectedCheckList.key
								+ "&districtId=" + $scope.selectedDist.areaNId
								+ "&stateId=" + $scope.selectedState.areaNId
								+ "&startDateId="
								+ $scope.selectedStartDate.timePeriodId
								+ "&endDateId="
								+ $scope.selectedEndDate.timePeriodId
								+ "&blockId="+ $scope.selectedBlock.areaNId)
				.then(function(result) {
			$scope.reportTableData = result.data;
			
			$scope.monthTableData = $scope.reportTableData['timeperiodModel'];
			$scope.planUnplanTableData = $scope.reportTableData['actualvsPlannedReportModel'];
			$scope.lastUpdateDate = $scope.reportTableData['lastUpdateOn'];
			
			$scope.planUnplanList = Object.keys($scope.planUnplanTableData);
			
			$scope.monthPlanUnplaned =[];
			var count=0;
			for (var i = 0; i < $scope.monthTableData.length; i++) {
				for(var j=0;j<$scope.monthPlanUnplan.length;j++) {
					count++;
					$scope.monthPlanUnplanedVisit.push({visitID: count, visitName: $scope.monthPlanUnplan[j].visitName,
						timePeriod:$scope.monthTableData[i].timePeriod});
					
				}	
			}	
			$("#loader-mask").hide();
		}, function errorCallback(response) {
			$("#loader-mask").hide();
		});
		
	};
	/*$("#searchTable").autocomplete({
	    source: searchDataMainTable
	});*/
	
	
	// downloadExcel for main table
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
        var tab_text = "<h2>Planned Vs. Actual Supervision</h2><h3>Checklist: "+$scope.savedSelectedChecklist.value+"</h3><h3>Location: " + $scope.savedSelectedDistrict.name + ", " +$scope.savedSelectedState.name +"</h3><h3>Time Period: "+ $scope.savedSelectedStartDate.timePeriod + "-" + $scope.savedSelectedEndDate.timePeriod + "</h3>";
        if(id == "dataTable"){
        	 tab_text=tab_text + "<table border='2px'><tr bgcolor='#87AFC6'>";
        }
        else
         tab_text=tab_text + "<table border='2px'><tr bgcolor='#87AFC6'>";
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
        link.download = "plan_vs_actual_" + $scope.savedSelectedState.name +"_" + new Date().toLocaleDateString() + ".xls";
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
    
	
 // modal table  column 1
	$scope.showPlanedColumn1 = function(rowData,data){
		$("#loader-mask").show();
		$scope.sortReverse1 = false;
		$scope.sortType1=undefined;
		$http.get(
				'getVisitPlanned?facilityId=' + rowData.facilityId
						+ '&facilityTypeId='
						+ rowData.facilityTypeId
						+ '&checklistId=' + $scope.selectedCheckList.key
						+ '&timeperiodId=' + data.timePeriodId )
				.then(function sucessCallback(response) {
					
					$scope.planedVisitModalData = response.data;
					$scope.excelNameId= 0;
					
					if ($scope.planedVisitModalData.length > 0){
						$("#planUnplanTable").modal('show');
					}
					$("#loader-mask").hide();
				}, function errorCallback(response) {
					$("#loader-mask").hide();
				});
	};
	
    
	// modal table  for plan visit data
	$scope.showPlanedVisit = function(rowData,data){
		$("#loader-mask").show();
		$scope.sortReverse1 = false;
		$scope.sortType1=undefined;
		
		// Code Added By Sourav Nath
		$scope.blockName = rowData['blockName'];
		$scope.facilityName = rowData['facilityName'];
		$scope.facilityType = rowData['facilityType'];
		// Code Ended
		$http.get(
				'getPlannedVisit?facilityId=' + rowData.facilityId
						+ '&facilityTypeId='
						+ rowData.facilityTypeId
						+ '&checklistId=' + $scope.selectedCheckList.key
						+ '&timeperiodId=' + data.timePeriodId )
				.then(function sucessCallback(response) {
					$("#loader-mask").hide();
					$scope.planedVisitModalData = response.data;
					$scope.excelNameId= 1;
					
					if ($scope.planedVisitModalData.length > 0){
						$("#planUnplanTable").modal('show');
					}
					$("#loader-mask").hide();	
				}, function errorCallback(response) {
					$("#loader-mask").hide();
				});
	};
	
	
	
	 // modal table  for unplaned visit data
	$scope.showUnPlanedVisit = function(rowData,data){
		$("#loader-mask").show();
		$scope.sortReverse1 = false;
		$scope.sortType1=undefined;
		// Code Added By Sourav Nath
		$scope.blockName = rowData['blockName'];
		$scope.facilityName = rowData['facilityName'];
		$scope.facilityType = rowData['facilityType'];
		// Code Ended
		$http.get(
				'getUnplannedVisitData?facilityId=' + rowData.facilityId
						+ '&facilityTypeId='
						+ rowData.facilityTypeId
						+ '&checklistId=' + $scope.selectedCheckList.key
						+ '&timeperiodId=' + data.timePeriodId )
				.then(function sucessCallback(response) {
					$("#loader-mask").hide();
					$scope.planedVisitModalData = response.data;
					$scope.excelNameId= 2;
					if ($scope.planedVisitModalData.length > 0){
						$("#planUnplanTable").modal('show');
					}
					$("#loader-mask").hide();
				}, function errorCallback(response) {
					$("#loader-mask").hide();
				});
				
	};
	 // modal table  for total visit data
	$scope.showTotalVisit = function(rowData,data){
		$("#loader-mask").show();
		$scope.sortReverse1 = false;
		$scope.sortType1=undefined;
		// Code Added By Sourav Nath
		$scope.blockName = rowData['blockName'];
		$scope.facilityName = rowData['facilityName'];
		$scope.facilityType = rowData['facilityType'];
		// Code Ended
		$http.get(
				'getPlannedAndUnplannedVisitData?facilityId=' + rowData.facilityId
						+ '&facilityTypeId='
						+ rowData.facilityTypeId
						+ '&checklistId=' + $scope.selectedCheckList.key
						+ '&timeperiodId='+data.timePeriodId)
				.then(function sucessCallback(response) {
					$("#loader-mask").hide();
					$scope.planedVisitModalData = response.data;
					$scope.excelNameId= 3;
					if ($scope.planedVisitModalData.length > 0){
						$("#planUnplanTable").modal('show');
					}
					$("#loader-mask").hide();	
				}, function errorCallback(response) {
					$("#loader-mask").hide();
				});
				
	};
    
	$scope.clearData = function(){
		$("#planUnplanTable").modal("hide");
		$("#searchPlanedVisitTable1").val("") ;
		$scope.plantableFilterWord = "";
	};
	// downloadExcel for PlanedVisit table
	$scope.exportPlanVisitTableData = function(id){
    	var htmls = "";
        var uri = 'data:application/vnd.ms-excel;base64,';
        var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'; 
        var base64 = function(s) {
            return window.btoa(unescape(encodeURIComponent(s)));
        };
        var tab_text = "<h2>Planned Vs. Actual Supervision</h2><h3>Checklist: "+$scope.savedSelectedChecklist.value+"</h3><h3>Facility: "+ $scope.facilityName + ", "+$scope.blockName +
        "</h3><h3>Location: " + $scope.savedSelectedDistrict.name + ", " +$scope.savedSelectedState.name +"</h3>";
        var format = function(s, c) {
            return s.replace(/{(\w+)}/g, function(m, p) {
                return c[p];
            });
        };
        if(id == "dataTable"){
        	 tab_text=tab_text + "<table border='2px'><tr bgcolor='#87AFC6'>";
        }
        else
         tab_text=tab_text + "<table border='2px'><tr bgcolor='#87AFC6'>";
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
        //Code Added By Sourav Nath
        if(id=="dataTable"){
        	link.download = "plan_action_report_" + $scope.savedSelectedState.name +"_" + new Date().toLocaleDateString() + ".xls";
        }else{
        	link.download = "plan_action_report_" + $scope.savedSelectedState.name +"_" + $scope.facilityName + "_" + new Date().toLocaleDateString() + ".xls";
        }
        //Code Ended By Sourav Nath
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
      
    // Coded by sourav nath
      $scope.filterType = function(val){
      	if(isNaN(parseInt(val[$scope.sortType])))
      		if(!$scope.sortType){
      			return true;
      		}else{
      			var sortName = $scope.sortType.split("_")[0];
      			if(sortName=="plannedVisit"|| sortName=="unplannedVisit" || sortName=="visitPlanned" || sortName=="total"){
      				var index = parseInt($scope.sortType.split("_")[1]);
          			var month = $scope.monthPlanUnplanedVisit[index].timePeriod;
      				//var childKey = Object.keys(val[sortName])[0];
          			if(val[sortName]!= null){
          				return isNaN(parseInt(val[sortName][month]))?-1:parseInt(val[sortName][month]);
          			}else{
          				return 0;
          			}
      				
      			}else{
      				return val[$scope.sortType];
      			}
      		}
      	else
      		return parseInt(val[$scope.sortType]);
      };
     // ended
      //-------------modal sorting-----------
      $scope.orderPlaned = function (sortType1) {  
          $scope.sortReverse1 = ($scope.sortType1 === sortType1) ? !$scope.sortReverse1 : false;  
          $scope.sortType1 = sortType1;  
      };
      $scope.filterType1 = function(val){
        	if(isNaN(parseInt(val[$scope.sortType1])))
        		if(!$scope.sortType1)
        			return true;
        		else
        			return val[$scope.sortType1];
        	else
        		return parseInt(val[$scope.sortType1]);
        };
};