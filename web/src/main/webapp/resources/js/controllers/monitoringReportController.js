/**
 * @author Naseem Akhtar (naseem@sdrc.co.in)
 * 
 * Created on 2017-11-30 18:36.
 */

function monitoringReportController($scope, $http, $filter, $timeout,
		$rootScope, $window) {

	$scope.pageName = "Monitoring Report User";
	$scope.activeMenu = "monitoringReportUser";
	var obj = {
		periodicityId : -1,
		periodicityName : "Date"
	};
	$scope.sortReverse = false;
	$scope.sortType = 'areaName';
	$("#loader-mask").show();
	$http.get("getBasicDataForMonitoringReport").then(function(result) {
		$scope.dataObj = result.data;
		$scope.stateList = $scope.dataObj['areaJson'];
		$scope.selectState($scope.stateList[0]);
//		$scope.periodicityList = $scope.dataObj.periodicty;
//		$scope.periodicityList.push(obj);
		$scope.timePeriodList = $scope.dataObj.timePeriod;

		$("#loader-mask").hide();
	}, function errorCallback(response) {
		$("#loader-mask").hide();
	});

	$scope.selectState = function(state) {
		$scope.selectedState = state;
		$scope.selectedBlock = undefined;
		if ($scope.selectedState.children.length) {
			$scope.selectDistrict($scope.selectedState.children[0]);
		} else {
			$scope.selectedDistrict = undefined;
		}
	};

	$scope.selectDistrict = function(district) {
		$scope.selectedDistrict = district;
		$scope.selectedBlock = undefined;
		if ($scope.selectedDistrict.children.length) {
			$scope.selectBlock($scope.selectedDistrict.children[0]);
		}
	};

	$scope.selectBlock = function(block) {
		$scope.selectedBlock = block;
	};

//	$scope.selectQuarter = function(quarter) {
//		if ($scope.selectedQuarter != undefined
//				&& ($scope.selectedQuarter.periodicityId != quarter.periodicityId)) {
//			$scope.selectedDate = undefined;
//			$scope.selectedTimeperiod = undefined;
//		}
//
//		$scope.selectedQuarter = quarter;
//		$scope.timePeriodData = $filter('filter')($scope.timePeriodList, {
//			periodicity : parseInt($scope.selectedQuarter.periodicityId)
//		}, true);
//		$scope.timePeriodData = $scope.timePeriodData.sort(function(a, b) {
//			return (a.key < b.key) ? 1 : ((b.key < a.key) ? -1 : 0);
//		});
//	};

	
	$scope.validateInput = function(){
		if(!$scope.selectedState){
			$scope.errorMessage = "Please select state";
			$("#errorMessage").modal("show");
		}
		else if(!$scope.selectedDistrict && !$scope.dataObj.isNationalUser){
			$scope.errorMessage = "Please select district";
			$("#errorMessage").modal("show");
		}
//		else if(!$scope.selectedBlock){
//			errorMessage = "Please select block";
//			$("#errorMessage").modal("show");
//		}
		else if(!$scope.selectedFromDate){
			$scope.errorMessage = "Please select from Date";
			$("#errorMessage").modal("show");
		}
		else if(!$scope.selectedToDate){
			$scope.errorMessage = "Please select to Date";
			$("#errorMessage").modal("show");
		}
		else{
			$scope.fetchTableData();
		}
};

	$scope.fetchTableData = function() {
		var areaObj = $scope.selectedBlock != null ? $scope.selectedBlock
				: $scope.selectedDistrict !== undefined ? $scope.selectedDistrict
						: $scope.selectedState;

		var stateId = ($scope.selectedState !== undefined && $scope.selectedState !== null) ? $scope.selectedState.area_nid_pk
				: null;
		var districtId = ($scope.selectedDistrict !== undefined && $scope.selectedDistrict !== null) ? $scope.selectedDistrict.area_nid_pk
				: null;
		var blockId = ($scope.selectedBlock !== undefined && $scope.selectedBlock !== null) ? $scope.selectedBlock.area_nid_pk
				: null;
		var fromDate = $scope.selectedFromDate !== undefined ? $scope.selectedFromDate
				: null;
		var toDate = $scope.selectedToDate !== undefined ? $scope.selectedToDate
				: null;
		
		var obj = {
			stateId : stateId,
			districtId : districtId,
			blockId : blockId,
			startDate : fromDate,
			endDate : toDate
		};

		$("#loader-mask").show();
		$http.post('getUserMonitoringReportData', obj).then(function(result) {
			console.log(result);
			customizeForTableView(result.data);
		}, function errorCallback(response) {
			$("#loader-mask").hide();
		});
	};

	function customizeForTableView(obj) {
		$scope.data = [];
		if(obj.registeredUsersList.length > 0){
			for (var i = 0; i < obj.registeredUsersList.length; i++) {
				var object = {};
				object.areaId = obj.registeredUsersList[i].areaId;
				var loggedInUserObject = $filter('filter')(obj.loggedInUsersList, {
					areaId : object.areaId
				}, true)[0];
				var areaObject = $filter('filter')(obj.areaList, {
					areaNId : object.areaId
				}, true)[0];
	
				object.registeredUsers = obj.registeredUsersList[i].registeredUsers;
				object.loggedInUsers = loggedInUserObject === undefined ? 0 : loggedInUserObject.loggedInUsers;
				object.areaName = areaObject === undefined ? "-" : areaObject.name; 
				object.level = areaObject === undefined ? "-" : areaObject.level; 
				$scope.data.push(object);
			}
		}
		$("#loader-mask").hide();
	};

	/*------------------------Sorting -----------------------------	*/
	$scope.order = function(sortType) {
		$scope.sortReverse = ($scope.sortType === sortType) ? !$scope.sortReverse
				: false;
		$scope.sortType = sortType;
	};

	$scope.filterType = function(val) {
		var minLevel = Math.min.apply(Math,$scope.data.map(function(item){return item.level;}));
		if(val.level == minLevel){
			if(isNaN(parseInt(val[$scope.sortType]))){
	    		if($scope.sortReverse == true)
	    			return "";
	    		else
	    			return "zzz";
    		}	
    		else{
    			if($scope.sortReverse == true)
	    			return -1;
	    		else
	    			return 9e12;
    		}
		}
		if (isNaN(parseInt(val[$scope.sortType])))
			if (!$scope.sortType)
				return true;
			else
				return val[$scope.sortType];
		else
			return parseInt(val[$scope.sortType]);
		
	};

	// downloadExcel for main table
	$scope.exportTableData = function(id) {
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
		var tab_text = "<h2>Monitoring Report</h2><h3>State: "
			+ $scope.selectedState.name + "</h3>"
			+($scope.selectedDistrict? $scope.selectedDistrict.name != "All"? "<h3>District: "+ $scope.selectedDistrict.name + "</h3>" : "":"")
			+($scope.selectedBlock?$scope.selectedBlock.name != "All"?"<h3>Block: "+ $scope.selectedBlock.name + "</h3>" : ""	: "")
			+ "</h3><h3>Time Period: "
			+ $scope.selectedFromDate + " to " + $scope.selectedToDate + "</h3>";
		
		if (id == "dataTable") {
			tab_text = tab_text + "<table border='2px'><tr bgcolor='#87AFC6'>";
		} else
			tab_text = tab_text + "<table border='2px'><tr bgcolor='#87AFC6'>";
		var textRange;
		var j = 0;
		tab = document.getElementById(id); // id of table

		for (j = 0; j < tab.rows.length; j++) {
			tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
			//tab_text=tab_text+"</tr>";
		}

		tab_text = tab_text + "</table>";
		tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
		tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
		tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

		var ctx = {
			worksheet : 'Worksheet',
			table : tab_text
		};

		var link = document.createElement("a");
		link.download = "monitoring_report_" + $scope.selectedState.name + "_"
				+ new Date().toLocaleDateString() + ".xls";
		var exceldata = new Blob(
				[ (format(template, ctx)) ],
				{
					type : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
				});
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

};