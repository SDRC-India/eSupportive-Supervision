/*
* -----------------------------------
* 	@author Sourav Keshari  Nath 
* -----------------------------------
*/
var myAppConstructor = angular.module('designationWiseSubmissionApp', []);
myAppConstructor.controller('designationWiseSubmissionController', function($scope, $http, $filter ,$timeout, $window,$compile) {
	// Pagination 
 	$scope.currentPage = 1;
    $scope.pageSize = 100;

    $scope.pageChangeHandler = function(num) {
       console.log('Pagination call ' + num);
    };
    // End Pagination 
    
	$scope.pageName = "Report > Designation Wise Submission";
	$scope.activeMenu = "designationWiseSubmission";
	$scope.sortReverse = false; 
	$scope.sortReverse1 = false;
	
	$scope.areasLoginwiseLoad= false;
	$scope.typeDetailsLoad = false;
	$("#loader-mask").show();
	var userLevel = document.getElementById('userLevel').value; // Added by Sourav Nath
    $scope.operatorVal="";
    $scope.designationDisable=false;
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
		else
			{
			for(var i=0;i<$scope.mainStateList.length;i++)
			{
				if($filter('filter')($scope.location, {parentAreaId : $scope.mainStateList[i].areaNId, level : 3}, true).length)
					{
					$scope.stateList.push($scope.mainStateList[i]);
					}
				}
			}
		$scope.stateList = $filter('orderBy')($scope.stateList, 'name');
		$scope.areasLoginwiseLoad= true;
		$scope.successLoad();
		$scope.defaultDropdownValue(); // Added by Sourav Nath
	}, function errorCallback(response) {
		$("#loader-mask").hide();
	});
	
	// get checklist data
	$http.get("typeDetails").then(function(result) {
		$scope.checklists = result.data.Checklists;
		
		$scope.developmentPartnersData = result.data["Development Partners"];
		var dp1,dp2 = [];
		dp1 = $filter('orderBy')($scope.developmentPartnersData, 'value');
		if(dp1.length)
		{      
			var allDesignations={value :"All Development Partners",key:0,designationId:0,orderLevel:null};
			dp2.push(allDesignations);
		}
		$scope.developmentPartners=angular.merge(dp1,dp2);

		$scope.operators = result.data["Operators"];
		$scope.typeDetailsLoad= true;
		$scope.successLoad();
		
	}, function errorCallback(response) {
		$("#loader-mask").hide();
	});
	$scope.successLoad = function(){
		if($scope.areasLoginwiseLoad == true && $scope.typeDetailsLoad == true){
			$("#loader-mask").hide();
		};
	};
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
	}
	
	];
	$scope.userLevelFilteration= function(id){
		$scope.tempUserLevel=[];
		angular.forEach($scope.userLevel, function(value, key) {
			  if(id<=value.levelID){
				  $scope.tempUserLevel.push($scope.userLevel[key])
			  }
		});
		$scope.userLevel=$scope.tempUserLevel;
	};
	$scope.getIndexforDefaultSelection = function(obj){
		var index=-1;
		angular.forEach(obj, function(value, key) {
			  if(value.areaNId == 0){
				  index = key;
			  }
		});
		return index;
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
    	if(userLevel=="1"){
    		$scope.selectLevel($scope.userLevel[0]);
			$scope.disabledState = true;
			$scope.disabledDistrict = true;
			$scope.disabledBlock = true;
			$scope.selectedState = undefined;
			$scope.selectedDist = undefined;
			$scope.selectedBlock = undefined;
    	}else if(userLevel=="2"){
			$scope.disabledState=true;
    		$scope.userLevelFilteration(2);
			$scope.selectLevel($scope.userLevel[0]);
    		$scope.selectState($scope.stateList[0]);
		}else if(userLevel=="4"){
			$scope.disabledState=true;
			$scope.disabledDistrict=true;
			$scope.userLevelFilteration(4);
			$scope.selectLevel($scope.userLevel[0]);
    		$scope.selectState($scope.stateList[0]);
			$scope.selectDistrict($scope.districtList[0]);
		}else if(userLevel=="5"){
			$scope.disabledState=true;
			$scope.disabledDistrict=true;
			$scope.disabledBlock=true;
			$scope.userLevelFilteration(5);
			$scope.selectLevel($scope.userLevel[0]);
    		$scope.selectState($scope.stateList[0]);
			$scope.selectDistrict($scope.districtList[0]);
			$scope.selectBlock($scope.blockList[0]);
		}
    };
    $scope.defaultSelectedLevel= function(level){
    	if(level.levelID=="1"){
    		$scope.disabledState=true;
    		$scope.disabledDistrict=true;
    		$scope.disabledBlock=true;
    		$scope.selectedState = undefined;
    		$scope.selectedDist = undefined;
    		$scope.selectedBlock = undefined;
    	}else if(level.levelID=="2"){
			$scope.disabledState=false;
			$scope.disabledDistrict=true;
			$scope.disabledBlock=true;
			//var index = $scope.getIndexforDefaultSelection($scope.stateList);
    		$scope.selectState($scope.stateList[0]);
		}else if(level.levelID=="4"){
			$scope.disabledState=false;
			$scope.disabledDistrict=false;
			$scope.disabledBlock=true;
			var index = $scope.getIndexforDefaultSelection($scope.districtList);
    		$scope.selectState($scope.stateList[0]);
			//$scope.selectDistrict($scope.districtList[index]);
		}else if(level.levelID=="5"){
			$scope.disabledState=false;
			$scope.disabledDistrict=false;
			$scope.disabledBlock=false;
			//var index = $scope.getIndexforDefaultSelection($scope.blockList);
    		$scope.selectState($scope.stateList[0]);
			//$scope.selectDistrict($scope.districtList[0]);
			//$scope.selectBlock($scope.blockList[index]);
		}
    };
	// get all time period
	$http.get("getAllTimePeriod").then(function(result) {
		$scope.timeperiodFetched = true;
		$scope.allTimePeriod = result.data;
		$scope.getTimePeriodLoad= true;
		$scope.successLoad();
	}, function errorCallback(response) {
		$("#loader-mask").hide();
	});
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
	var count=0;
	$scope.selectLevel=function(level){
		$scope.selectedLevel=level;
//		if($scope.stateList.length && userLevel=="1" && count==0)
//		{
//			var allState={name :"All State", areaNId: 0,level :2};
//			$scope.stateList.push(allState);
//			count=1;
//		}
		$scope.selectedOrganization = undefined;
		$scope.selectedDesignation = undefined;
		$scope.selectedDevPartner = undefined;
		$http.get("getOrganization?roleId="+$scope.selectedLevel.levelID).then(function(result) {
			$scope.organizations = result.data;
			if($scope.organizations.length)
			{      
				var allOrganizations={value :"All Organization",key:0,orderLevel:null};
				$scope.organizations.push(allOrganizations);
			}
		}, function errorCallback(response){
			
		});
		$scope.defaultSelectedLevel($scope.selectedLevel);
//		if(userLevel=="5"){
//		    $scope.disabledState=true;
//		}else{
//			$scope.disabledState=false;
//		}
	};
	// select state
	$scope.selectState = function(state) {		
		$scope.selectedState = state;
		$scope.districtList = $filter('filter')($scope.location, {
			parentAreaId : $scope.selectedState.areaNId, level : 3
		}, true);
		if($scope.districtList.length && userLevel!="4" && userLevel!="5")
		{
			var allDistrict={	name :"All District", areaNId: 0,level :3};
			$scope.districtList.push(allDistrict);
		}
//		if(userLevel=="5"){
//			$scope.disabledDistrict=true;
//		}else{
//			$scope.disabledDistrict=false;
//		}
		
		
		$scope.selectedDist = undefined;
		$scope.selectedBlock = undefined;
		$scope.selectedOrganization = undefined;
		$scope.selectedDesignation = undefined;
		$scope.selectedDevPartner = undefined;
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
		//$scope.disabledBlock = false;
	};
	// select block 
	$scope.selectBlock = function(block) {	
		$scope.selectedBlock = block;
	};
	$scope.extend = function(obj, src) {
		obj[0] = obj[0];
	    for (var key in src) {
	    	var index =  parseInt(key)+1;
	        if (src.hasOwnProperty(key)) obj[index] = src[key];
	    }
	    return obj;
	};
    $scope.selectOrganization = function(org) {
		
		$scope.selectedOrganization = org;
		$scope.selectedDesignation = undefined;
		$scope.selectedDevPartner = undefined;
		var areaId = "";
		
		if($scope.selectedState == undefined ){
			areaId=1;
		}
		else{
			areaId = $scope.selectedState.areaNId;
		}
		$http.get("designationsByRoleAreaOrg?roleId="+$scope.selectedLevel.levelID+"&areaId="+areaId+"&orgId="+$scope.selectedOrganization.key).then(function(result) {
			//$scope.designations = result.data;
			var d1,d2 = [];
			d1 = $filter('orderBy')(result.data, 'value');
			if(d1.length)
			{      
				var allDesignations={value :"All Designation",key:0,designationId:0,orderLevel:null};
				d2.push(allDesignations);
			}
			$scope.designations=$scope.extend(d2,d1);
		}, function errorCallback(response){
			
		});
        if($scope.selectedOrganization.key==0){
        	$scope.designationDisable=true;
        }else{
        	$scope.designationDisable=false;
        }
	};
 	$scope.selectPartner = function(partner) {
		$scope.selectedDevPartner = partner;
		if($scope.selectedState == undefined ){
			areaId=1;
		}
		else{
			areaId = $scope.selectedState.areaNId;
		}
		$http.get("designationsByRoleAreaOrg?roleId="+$scope.selectedLevel.levelID+"&areaId="+areaId+"&orgId="+$scope.selectedOrganization.key).then(function(result) {
			//$scope.designations = result.data;
			var d1 = $filter('orderBy')(result.data, 'value');
			$scope.designations=d1;
		}, function errorCallback(response){
			
		});
	};
	$scope.selectDesignation = function(deg) {
		$scope.selectedDesignation = deg;
	};
	$scope.numberOfSubmission = [ {
		key : 1,
		value : 'All Submission'
	},{
		key : 2,
		value : 'Custom'
	}
	];
	$scope.selectedNumberOfSubmission =$scope.numberOfSubmission[0];
	$scope.customDisable = false;
	$scope.selectNumberOfSubmission = function(numb) {
		$scope.selectedNumberOfSubmission = numb;
		if($scope.selectedNumberOfSubmission.key == 1){
			$scope.customDisable = false;
			$scope.selectedOperator = undefined;
			$scope.operatorVal = "";
		}else{
			$scope.customDisable = true;
		}
	};
	$scope.selectOperator = function(operator) {
		$scope.selectedOperator = operator;
	};

	$scope.closeModal = function(){
		$("#errorMessage").modal("hide");
		 if($scope.errorMsg = "Please Select User Level"){
			 document.getElementById('userLevel').focus();
		 }else if($scope.errorMsg == "Please Select Organization"){
			 document.getElementById('organization').focus();
		 }else if($scope.errorMsg == "Please Select Development Partners"){
			 document.getElementById('devPartner').focus();
		 }else if($scope.errorMsg == "Please Select Designation"){
			 document.getElementById('designation').focus();
		 }else if($scope.errorMsg == "Please Select Form Timeperiod"){
			 document.getElementById('fromdate').focus();
		 }else if($scope.errorMsg == "Please Select To Timeperiod"){
			 document.getElementById('todate').focus();
		 }else if($scope.errorMsg == "Please Select Type"){
			 document.getElementById('operator').focus();
		 }else if($scope.errorMsg == "Please Enter Number Of Submissions"){
			 document.getElementById('operatorVal').focus();
		 }
	};
	
	$scope.validateReport = function() {
	   if($scope.selectedLevel == undefined) {
			$scope.errorMsg = "Please Select User Level";
			$("#errorMessage").modal("show");
		}else if ($scope.selectedOrganization == undefined) {
			$scope.errorMsg = "Please Select Organization";
			$("#errorMessage").modal("show");
		}else if ($scope.selectedDevPartner == undefined && $scope.selectedOrganization.key == 5) {
			$scope.errorMsg = "Please Select Development Partners";
			$("#errorMessage").modal("show");
		}else if ($scope.selectedDesignation == undefined  && $scope.selectedOrganization.key != 0) {
			$scope.errorMsg = "Please Select Designation";
			$("#errorMessage").modal("show");
		}else if ($scope.selectedStartDate == undefined) {
			$scope.errorMsg = "Please Select From Timeperiod";
			$("#errorMessage").modal("show");
		}else if ($scope.selectedEndDate == undefined) {
			$scope.errorMsg = "Please Select To Timeperiod";
			$("#errorMessage").modal("show");
		}else if ($scope.selectedOperator == undefined && $scope.selectedNumberOfSubmission.key == 2) {
			$scope.errorMsg = "Please Select Type";
			$("#errorMessage").modal("show");
		}else if ($scope.operatorVal == "" && $scope.selectedNumberOfSubmission.key == 2) {
			$scope.errorMsg = "Please Enter Number Of Submissions";
			$("#errorMessage").modal("show");
		}else if ($scope.operatorVal == "0" &&
				$scope.selectedNumberOfSubmission.key == 2 &&
				$scope.selectedOperator.key == 141) {
			$scope.errorMsg = "Please Enter a Valid Condition";
			$("#errorMessage").modal("show");
		}else if ($scope.operatorVal == "0" &&
				$scope.selectedNumberOfSubmission.key == 2 &&
				$scope.selectedOperator.key == 143) {
			$scope.errorMsg = "Please Enter a Valid Condition";
			$("#errorMessage").modal("show");
		}
		else{
			$scope.savedSelectedState = JSON.parse(JSON.stringify($scope.selectedState!=undefined?$scope.selectedState:{}));
			$scope.savedSelectedDistrict = JSON.parse(JSON.stringify($scope.selectedDist!=undefined?$scope.selectedDist:{}));
			$scope.savedSelectedOrganization = JSON.parse(JSON.stringify($scope.selectedOrganization!=undefined?$scope.selectedOrganization:{}));
			$scope.getTableData();
		}
		
	};
	$scope.locationName = "";
	$scope.excelTitle = "";
	$scope.monthPlanUnplanedVisit =[];
	$scope.getTableData = function(){
		$("#loader-mask").show();
		
		if($scope.selectedDevPartner!=undefined){
			$scope.devId = $scope.selectedDevPartner.key;
		}else{
			$scope.devId = 0;
		}
		if($scope.selectedState!=undefined){
			$scope.locationName = $scope.selectedState.name;
			$scope.excelTitle = $scope.selectedState.name;
			$scope.stateId = $scope.selectedState.areaNId;
		}else{
			$scope.locationName = "India";
			$scope.excelTitle = "India";
			$scope.stateId = -1;
		}
		if($scope.selectedDist!=undefined){
			$scope.locationName = $scope.locationName+", "+$scope.selectedDist.name;
			$scope.excelTitle = $scope.excelTitle+"_"+$scope.selectedDist.name;
			$scope.districtId = $scope.selectedDist.areaNId;
		}else{
			$scope.locationName = $scope.locationName;
			$scope.excelTitle = $scope.excelTitle;
			$scope.districtId = -1;
		}
		if($scope.selectedBlock!=undefined){
			$scope.locationName = $scope.locationName+", "+$scope.selectedBlock.name;
			$scope.excelTitle = $scope.excelTitle+"_"+$scope.selectedBlock.name;
			$scope.blockId = $scope.selectedBlock.areaNId;
		}else{
			$scope.locationName = $scope.locationName;
			$scope.excelTitle = $scope.excelTitle;
			$scope.blockId = -1;
		}
		if($scope.selectedDesignation!=undefined){
			$scope.designationName = $scope.selectedDesignation.value;
			$scope.designationId = $scope.selectedDesignation.designationId;
		}else{
			$scope.designationName = "All Designation";
			$scope.designationId = 0;
		}
		if($scope.selectedNumberOfSubmission.key == 1){
			$scope.operatorId = 144;
			$scope.operatorName = ">= (Greater than or equals)";
			$scope.operaValue = 0;
		}else{
			$scope.operatorId = $scope.selectedOperator.key;
			$scope.operatorName = $scope.selectedOperator.value;
			$scope.operaValue = $scope.operatorVal;
		}
		// get all table data
		$http.get("getDesignationReport?levelId=" +$scope.selectedLevel.levelID+
			"&stateId="+$scope.stateId+
			"&districtId="+$scope.districtId +
			"&blockId="+$scope.blockId+
			"&organizationId="+$scope.selectedOrganization.key+
			"&developmentPartnerId="+$scope.devId+
			"&designationId="+$scope.designationId+
			"&operatorId="+$scope.operatorId+
			"&numberOf="+$scope.operaValue+
			"&startDate="+$scope.selectedStartDate.startDate+
			"&endDate="+$scope.selectedEndDate.endDate).then(function(result) {
			$scope.tableFilterWord=undefined;
			$scope.reportTableData =[];
			
			if(result.data.length>0)
			{	
				$scope.reportTableData = result.data;
			}
			$("#loader-mask").hide();
		}, function errorCallback(response) {
			$("#loader-mask").hide();
		});
		
	};
	

	// downloadExcel
	$scope.exportTableData = function(id, facility, block){
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
        var tab_text = "<h2>Designation Wise Submission</h2>"
        	+"<h3>Location: "+ $scope.locationName + "</h3>"
        	+"<h3>Organization: "+ $scope.savedSelectedOrganization.value+"</h3>"
			+"<h3>Designation: "+$scope.designationName+"</h3>"
			+"<h3>TimePeriod From: "+$scope.selectedStartDate.timePeriod+" To: "+$scope.selectedEndDate.timePeriod+"</h3>"
			+"<h3>Number of Submission: "+$scope.operatorName+" "+$scope.operaValue+"</h3>";
			
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
        //Code Added By Sourav Nath
        link.download = "designation_wise_submission_" + $scope.excelTitle +"_" + new Date().toLocaleDateString() + ".xls";
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
      $scope.filterType = function(val){
      	if(isNaN(parseInt(val[$scope.sortType])))
      		if(!$scope.sortType)
      			return true;
      		else
      			return val[$scope.sortType];
      	else
      		return parseInt(val[$scope.sortType]);
      };
});