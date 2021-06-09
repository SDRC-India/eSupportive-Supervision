
// @author Devikrushna Nanda (devikrushna@sdrc.co.in)
 

function reportController($scope, $http, $filter ,$timeout, $window,$compile) {
	
	// Pagination 
 	$scope.currentPage = 1;
    $scope.pageSize = 100;

    $scope.pageChangeHandler = function(num) {
       console.log('Pagination call ' + num);
    };
    // End Pagination 
    
	$scope.pageName = "Report > Action Item Status";
	$scope.activeMenu = "actionitem";
	$scope.sortReverse = false; 
	$scope.sortReverse1 = false;
	
	$scope.areasLoginwiseLoad= false;
	$scope.typeDetailsLoad = false;
	$("#loader-mask").show();
	var userLevel = document.getElementById('userLevel').value; // Added by Sourav Nath
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
		if($scope.areasLoginwiseLoad == true && $scope.typeDetailsLoad == true){
			$("#loader-mask").hide();
		};
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
		//$("#loader-mask").show();
		
	};
	

	$scope.closeModal = function(){
		$("#errorMessage").modal("hide");
		 if($scope.errorMsg == "Please Select State"){
			 document.getElementById('state').focus();
		 }else if($scope.errorMsg == "Please Select District"){
			 document.getElementById('district').focus();
		 }else if($scope.errorMsg == "Please Select Block"){
			 document.getElementById('block').focus();
		 }else if($scope.errorMsg = "Please Select Checklist"){
			 document.getElementById('checklist').focus();
		 }
	};
	
	$scope.validateReport = function() {

	 if ($scope.selectedState == undefined) {
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
			$scope.getTableData();
		}
		
	};

	$scope.monthPlanUnplanedVisit =[];
	$scope.getTableData = function(){
		$("#loader-mask").show();
		$scope.areaData=$scope.selectedDist.name;
		$scope.coloumns=[];
		var reportInputDataModel=
			{
				checklistType:$scope.selectedCheckList.key,
				districtId:$scope.selectedDist.areaNId,
				blockId:$scope.selectedBlock.areaNId
				
			}
		// get all table data
		$http.post("getPlanofActionForDistrict",reportInputDataModel).then(function(result) {
			$scope.tableFilterWord=undefined
			$scope.reportTableData =[];
			
			if(result.data.length>0)
			{	
				$scope.reportTableData = result.data;
				$scope.coloumns = Object.keys($scope.reportTableData[0]);
				$scope.coloumns.splice($scope.coloumns.length-1, 1);
			}
			$("#loader-mask").hide();
		}, function errorCallback(response) {
			$("#loader-mask").hide();
		});
		
	};
	
	$scope.getFacilityData = function(rowData){
		$("#loader-mask").show();
		$scope.facilityTableFilterWord=undefined;
		$scope.sortReverse1 = false;
		$scope.sortType1=undefined;
		$scope.block=rowData['District/Block'];
		$scope.facility=rowData['Facility Name'];
		$scope.level=rowData['Facility Type'];
		$http.post(
				'getPlanOfActionForAFacility?facilityId=' + rowData['facilityId']
						+ '&facilityType=' + $scope.selectedCheckList.key)
				.then(function sucessCallback(response) {
					
					$scope.facilityActionData = response.data;
					if ($scope.facilityActionData.length > 0)
						{
							$scope.columnKeys= Object.keys($scope.facilityActionData[0]);
							$("#facilityActionTable").modal('show');
						}
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
        var tab_text = "<h2>Action Item Status</h2><h3>Checklist: "+$scope.savedSelectedChecklist.value+"</h3>"+ (facility?"<h3>Facility: "+facility+", "+ block +"</h3>":"")+"<h3>Location: " + $scope.savedSelectedDistrict.name + ", " +$scope.savedSelectedState.name +"</h3>";
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
        if(id=="dataTable"){
        	link.download = "plan_action_report_" + $scope.savedSelectedState.name +"_" + new Date().toLocaleDateString() + ".xls";
        }else{
        	link.download = "plan_action_report_" + $scope.savedSelectedState.name +"_" + $scope.facility + "_" + new Date().toLocaleDateString() + ".xls";
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
    
	
	
	// modal table  for plan and unplanned data

	
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
     //-------------modal sorting-----------
      $scope.orderFacilityModal = function (sortType1) {  
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