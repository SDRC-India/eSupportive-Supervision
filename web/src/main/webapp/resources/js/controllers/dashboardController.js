/**
 * @author Sasmita Rani
 *  
 */

function dashboardController($scope, $http, $filter ,$timeout) {
	$scope.pageName = "Dashboard";
	$scope.dashChartData = false;
	$scope.distDashChartData = false;
	
	$("#loader-mask").show();
	$http.get('getLandingPageData').then(function(response) {
		$scope.result = response.data;
		$scope.dashChartData = true;
		
		$scope.dashIndicators = $scope.result['keyIndcators'];
		$scope.ppAtFacilityLineChart = $scope.result['femaleWithPPIUCDInsertedAtFacilities'];
		$scope.forcesLineChart = $scope.result['facilitiesWherePPIUCDForcepsAreAvailable'];
		$scope.maternalDeathLineChart = $scope.result['maternalDeath'];
		$scope.patoLineChart = $scope.result['facilitiesUsingPartograph'];
		$scope.childDireLineChart = $scope.result['childrenUnder5AdmittedWithDiarrhoea'];
		$scope.maternalChildDeathsData= $scope.result['subcentersReportingMaternalChildDeathsInLast1Year'];
		$scope.beneficiaryData= $scope.result['vhndsessionsAttendedBy75BeneficiariesAsPerDueList'];
		$scope.cdNcdBarChart = [$scope.result['cdNcd']];
		$scope.newBornBarChart = [$scope.result['nch']];
		$scope.hssBarChart = [$scope.result['hss']];
		$scope.timePeriodName = $scope.result['timePeriodName'];
		
		if($scope.dashChartData){
			$("#loader-mask").hide();
		}
	},function errorCallback(response) {
		$("#loader-mask").hide();
	});
	
	/* $http.get("userDetails").then(function(result) {
		 $scope.userDetailsData = result.data;
		 if($scope.userDetailsData.userLevel == 4){
			 $scope.getDistrictData();
		 }else{
			 $scope.getDashboardData();
		 }
		 console.log($scope.userDetailsData.userLevel);
	 });
	 
	$scope.getDashboardData =  function(){ 
	$http.get('resources/json/dashboardjson.json').then(function(response) {
		$scope.result = response.data;
		$scope.dashChartData = true;
		
		$scope.dashIndicators = $scope.result['keyIndcators'];
		$scope.trendChatData = $scope.result['maternalDeaths'];
		$scope.diarrTrendChatData = $scope.result['diarrhoea'];
		$scope.ppiucdTrendChatData = $scope.result['ppiucd'];
		$scope.serviceDeliveryData = [$scope.result['serviceRmncha']];
		$scope.cdNcdData = [$scope.result['cdNcd']];
		$scope.communityData = [$scope.result['community']];
		
		if($scope.dashChartData){
			$("#loader-mask").hide();
		}
	},function errorCallback(response) {
		$("#loader-mask").hide();
	});
	};

	$scope.getDistrictData = function(){
	$http.get('resources/json/districtDashboard.json').then(function(response) {
		$scope.result = response.data;
		$scope.distDashChartData = true;
		
		$scope.dashIndicators = $scope.result['keyIndcators'];
		$scope.trendChatData = $scope.result['maternalDeaths'];
		$scope.diarrTrendChatData = $scope.result['diarrhoea'];
		$scope.ppiucdTrendChatData = $scope.result['ppiucd'];
		$scope.serviceDeliveryData = [$scope.result['serviceRmncha']];
		$scope.cdNcdData = [$scope.result['cdNcd']];
		$scope.communityData = [$scope.result['community']];
		
		if($scope.distDashChartData){
			$("#loader-mask").hide();
		}
	},function errorCallback(response) {
		$("#loader-mask").hide();
	});
  }	;*/
};
