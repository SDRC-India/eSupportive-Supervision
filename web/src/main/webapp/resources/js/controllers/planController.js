/**
 * @author Debiprasad Parida
 *  @ devikrushna
 * 
 */
var app = angular.module("planApp", []);
		var myAppConstructor = angular.module("planApp");
		myAppConstructor.controller("planController", planController);
		function planController($scope, $http, $filter ,$timeout) {

	$scope.pageName = "Plan";
	$scope.facilityNameDiv = false;
	$scope.showStatus = false;
	$scope.showAssessement = false;	
	$scope.endTimePeriods = [];	
	$scope.planLegends = false;
	$scope.release = false;
	$scope.next = false;
	$scope.showBlock = true;
	$scope.currentDate = new Date();
	$scope.areaFetched = false;
	$scope.timeperiodFetched =false;
	$scope.trendChartData= false;
	$scope.donutChartData = false;
	$scope.selectedState = null;
	$scope.masterFacilityTypeList = [];
	var userLevel = document.getElementById('userLevel').value;
	console.log(userLevel);
	$scope.userLevel=userLevel;

	$("#loader-mask").show();
	$http.get("typeDetails").then(function(result) {
		$scope.checklists = result.data.Checklists;
		$scope.masterFacilityTypeList = result.data.FacilityTypeForArea;
		$scope.facilityTypes = result.data.FacilityTypeForArea;
		$scope.checklistSelectedAction($scope.checklists[1]);
		
		// get all time period
		$http.get("getAllTimePeriod").then(function(result) {
			$scope.timeperiodFetched = true;
			$scope.allTimePeriod = result.data;
			$scope.selectStartDate($scope.allTimePeriod[0]);
			$scope.selectEndDate($scope.allTimePeriod[$scope.allTimePeriod.length-1]);
			
			if($scope.areaFetched){
					$("#loader-mask").hide();
			}
		}, function errorCallback(response) {
			$("#loader-mask").hide();
		});
		
	}, function errorCallback(response) {
		$("#loader-mask").hide();
	});
	
	// get planned data based on user login
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
		if($scope.timeperiodFetched){
				$("#loader-mask").hide();
		}
	}, function errorCallback(response) {
		$("#loader-mask").hide();
	});
	
	// trend chart data
	$scope.getLineChart = function(){
		$http.get("getTrendChartData?checkListId="+$scope.selectedCheckList.key).then(function(result) {
			$scope.trendChatData = result.data;
			$scope.trendChartData = true;
			if($scope.trendChatData.length==0){
	 			$scope.trendData= "No Data Available.";	 				 	
	 		}
			if($scope.donutChartData){
				$("#loader-mask").hide();
			}
		}, function errorCallback(response) {
			$("#loader-mask").hide();
		});
	};
	/**
	 * This following method will be called when user will select one checklist
	 */
	$scope.checklistSelectedAction = function(checklist){
		$scope.facilityTypes = [];
		$scope.selectedCheckList = checklist;
		
		if(checklist.key == 122){
			$scope.facilityTypes = $filter('filter')($scope.masterFacilityTypeList, {
				key : 102
			}, true);
		}else{
			$scope.facilityTypes = $scope.masterFacilityTypeList;
				
			
		}
		
		$("#loader-mask").show();
		$http.get("planningData?checkListId="+$scope.selectedCheckList.key).then(function(result) {
			$scope.planningDataList = result.data;
			$scope.facillityDetailsList = $scope.planningDataList['facilityPlanningModel'];
			setTimeout(function() {
				$('[data-toggle="tooltip"]').tooltip();

			}, 500);
			$scope.selectState($scope.stateList);
			if($scope.stateList.length != 1){
			 $scope.districtList = null;
			 $scope.blockList = null;	
			}
		});
		
		$scope.getLineChart();
		
		$http.get("getDataForDoughnutChart?checkListId="+$scope.selectedCheckList.key).then(function(result) {
			$scope.circlePlanData = result.data;
			$scope.donutChartData = true;
			$scope.actualPlanDataMonthly = $scope.circlePlanData[0].numerator+ " of ";
	 		$scope.totalPlanDataMonthly = $scope.circlePlanData[0].denominator;
	 		$scope.progressCircle1Monthly = $scope.circlePlanData[0].percentageValue;
	 		$scope.progressCircle1MonthlyData = $scope.circlePlanData[0].timeperiod;
	 		
	 		$scope.actualPlanDataQuart = $scope.circlePlanData[1].numerator+ " of ";
	 		$scope.totalPlanDataQuart = $scope.circlePlanData[1].denominator;
	 		$scope.progressCircle1Quart = $scope.circlePlanData[1].percentageValue;	
	 		$scope.progressCircle1QuartData = $scope.circlePlanData[1].timeperiod;
	 		 		
	 		$scope.progressCirclePlan = [$scope.progressCircle1Monthly];
	 		$scope.progressCircleQuart = [$scope.progressCircle1Quart];
	 		
	 		if($scope.progressCircle1Monthly == null){
	 			$scope.progressCircle1Monthly = 'N/A';
	 		}else{
	 			$scope.progressCircle1Monthly = $scope.circlePlanData[0].percentageValue + "%";
	 		}
	 		if($scope.progressCircle1Quart == null){
	 			$scope.progressCircle1Quart = 'N/A';
	 		}else{
	 			$scope.progressCircle1Quart = $scope.circlePlanData[1].percentageValue + "%";	
	 		}
	 		
	 		if($scope.trendChartData){
	 			 setTimeout(function () {
					 $("#loader-mask").hide();
				 }, 3000);
	 		}
		
		}, function errorCallback(response) {
			$("#loader-mask").hide();
		});
		
	};
	/*
	// select start date
	$scope.selectStartDate = function(time) {	
		$scope.selectedStartDate = time;
		$scope.selectedEndDate = undefined;
		$scope.endTimePeriods = [];		
		for (var i = 0; i < $scope.allTimePeriod.length; i++) {
			if ($scope.allTimePeriod[i].timePeriodId > $scope.selectedStartDate.timePeriodId) {
				$scope.endTimePeriods.push($scope.allTimePeriod[i]);
			}			
		}	
		if ($scope.allTimePeriod[$scope.allTimePeriod.length-1].timePeriodId  == $scope.selectedStartDate.timePeriodId) {
			$scope.endTimePeriods.push($scope.allTimePeriod[($scope.allTimePeriod.length)-1]);
		}
	};
	// select end date
	$scope.selectEndDate = function(endTime) {
		$scope.selectedEndDate = endTime;
		$scope.getLineChart();
	};*/
	
	// select state
	$scope.selectState = function(state) {	
		$scope.selectedState = state;
		$scope.districtList = $filter('filter')($scope.location, {
			parentAreaId : $scope.selectedState.areaNId, level : 3
		}, true);
		
		if($scope.stateList.length == 1){
			$scope.selectedState = $scope.stateList[0];
		  if(userLevel == 2){
				$scope.selectedDist = undefined;
				$scope.selectedBlock = undefined;
		  }
		  if(userLevel == 4 || userLevel == 5){
				 $scope.selectDistrict($scope.districtList[0]);	 
			if(userLevel == 4)
				 $scope.selectedBlock = undefined;
		  }
		 }else{
				$scope.selectedDist = undefined;
				$scope.selectedBlock = undefined;
		 }
		$scope.selectedFacility = undefined;
		$scope.selectedfacilityType = undefined; 
		$scope.selectedDeg = undefined;
		$scope.facilityNameDiv = false;		
		$scope.planCalender = false;
		$scope.showAssessement = false;
		$scope.release = false;
		$scope.next = false;
		$scope.planLegends = false;
		$scope.showBlock = true;
	};
	// select district type
	$scope.selectDistrict = function(dist) {	
		$scope.selectedDist = dist;
		$scope.blockList = $filter('filter')($scope.location, {
			parentAreaId : $scope.selectedDist.areaNId, level : 4
		}, true);
		$scope.facilityList = $filter('filter')($scope.location, {
			parentAreaId : $scope.selectedDist.areaNId, level : 5
		}, true);
		
		if(userLevel == 5){
			 $scope.selectBlock($scope.blockList[0]);	 
	 	}else
		$scope.selectedBlock = undefined;
		$scope.selectedFacility = undefined;
		$scope.selectedfacilityType = undefined;
		$scope.facilityNameDiv = false;
		$scope.planCalender = false;
		$scope.showAssessement = false;
		$scope.release = false;
		$scope.next = false;
		$scope.planLegends = false;
		$scope.showBlock = true;
	};
	// select facility type
	$scope.selectfacilityType = function(facilityType){
		$scope.planCalender = false;
		$scope.showAssessement = false;
		$scope.release = false;
		$scope.next = false;
		$scope.planLegends = false;
		$scope.selectedFacility = undefined;
		$scope.selectedfacilityType = facilityType;
		if(userLevel != 5)
		$scope.selectedBlock = undefined;
		
		if($scope.selectedfacilityType.key==105){
			$scope.facilityList = $filter('filter')($scope.location, {
				parentAreaId : $scope.selectedDist.areaNId, level : 5
			}, true);
			$scope.showBlock = false;
			var newFilterFacilityList = $scope.facilityList;
			$scope.facilityList = [];
			angular.forEach(newFilterFacilityList, function(value, key) {
				if(value.facilityType.id == facilityType.key){
					value.planned= $filter('filter')($scope.planningDataList.facilityPlanningModel, {
						facilityId : value.areaNId
					}, true)[0].planned;
					
					
					value.plannedHistory = $filter('filter')($scope.planningDataList.facilityPlanningModel, {
						facilityId : value.areaNId
					}, true)[0].plannedHistory;
					
					value.priority = $filter('filter')($scope.planningDataList.facilityPlanningModel, {
						facilityId : value.areaNId
					}, true)[0].priority;
					
					$scope.facilityList.push(value);
				}
			});
			$scope.facilityNameDiv = true;
			$scope.planLegends = true;
			
			setTimeout(function() {
				$('[data-toggle="tooltip"]').tooltip();

			}, 500);
		}
		else {
			 $scope.facilityNameDiv = false;
			 $scope.showBlock = true;
			}
		if(userLevel == 5){
			 $scope.selectBlock($scope.blockList[0]);	 
	 	}
	};
	
	// select block
	$scope.selectBlock = function(block) {	
		$scope.planLegends = true;
		$scope.planCalender = false;
		$scope.showAssessement = false;
		$scope.release = false;
		$scope.next = false;
		$scope.facilityNameDiv = true;
		$scope.selectedBlock = block;
		$scope.facilityList = $filter('filter')($scope.location, {
			parentAreaId : $scope.selectedBlock.areaNId, level : 5
		}, true);
		$scope.selectedFacility = undefined;
		var newFacilityList = $scope.facilityList;
		$scope.facilityList = [];
		$scope.planHistoryList =[];
			
		angular.forEach(newFacilityList, function(value, key) {
			if(value.facilityType.id == $scope.selectedfacilityType.key){
				
				value.planned= $filter('filter')($scope.planningDataList.facilityPlanningModel, {
					facilityId : value.areaNId
				}, true)[0].planned;
				
				
				value.plannedHistory = $filter('filter')($scope.planningDataList.facilityPlanningModel, {
					facilityId : value.areaNId
				}, true)[0].plannedHistory;
				
				value.priority = $filter('filter')($scope.planningDataList.facilityPlanningModel, {
					facilityId : value.areaNId
				}, true)[0].priority;
				
				$scope.facilityList.push(value);
				//$scope.planHistoryList.push(value);
			}
		});
			
		angular.forEach($scope.planningDataList.facilityPlanningModel, function(value, key) {
			
					$scope.planHistoryList = value.plannedHistory;
					$scope.selectedFacilityReleaseDate = value.realeaseDate;
					$scope.planned = value.planned;
					$scope.priority = value.priority;
		});
		setTimeout(function() {
			$('[data-toggle="tooltip"]').tooltip();

		}, 500);

	};
	
	// click on facility to show visit history and calendar for plan and release
	$scope.showFacility = function(facility) {
		$scope.selectedFacility = facility;
				
		angular.forEach($scope.planningDataList.facilityPlanningModel, function(value, key) {
			if(value.facilityId == facility.areaNId)	{
					$scope.planHistoryList = value.plannedHistory;
					$scope.selectedFacilityReleaseDate = value.realeaseDate;
					 /*if($scope.selectedFacility.areaNId == facility.areaNId){
						 $(".plan-fac-list").addClass("selectedDiv-plan");
					 }*/
			 }
		});
				
		$http.get("getLastVisitData?facilityId=" +$scope.selectedFacility.areaNId+"&checkListId="+$scope.selectedCheckList.key).then(function successCallback(response) {
			$scope.visitHistoryData = response.data;
		}, function errorCallback(response) {
		});	
		
		
		$scope.showAssessement = true;
		$scope.planCalender = true;
		$scope.plan = true;
		$scope.release = false;
		$scope.next = true;

		$scope.datePickerOpen = true;

		$("#datepicker").datepicker({
			dateFormat : "dd-mm-yy",
			autoclose : false,
			altField: "#alternate",
			beforeShow : function(input, inst) {
				setTimeout(function() {
					inst.dpDiv.css({
						top : $("#datepicker").offset().top + 35,
						left : $("#datepicker").offset().left
					});
				}, 0);
		},
			onSelect : function() {
				$(this).data('datepicker').inline = true;
			},
			onClose : function() {
				$(this).data('datepicker').inline = false;
			}
		});
		$('#datepicker').datepicker('setDate', null);
		//$scope.clearFile();
		
		$scope.planButtonClicked();
		setTimeout(function() {
			angular.element('#calendar-btn').triggerHandler('click');
			
			$("#calendar-btn").addClass('active');
			$("#release-btn").removeClass('active');
			// $("#plan-font").css({"color":"#f0a997","border":"none"});

		}, 20);
		
		 setTimeout(function() {
			$('html, body').animate({
			scrollTop : $("#calendertavView").offset().top
			},'slow');
		 }, 100);
		
	};
	
	// show planned history in tool tip
	$scope.showPlan = function(facility) {
		var dateList = facility.name;
		if(facility.plannedHistory !=undefined){
		for (var i = 0; i < facility.plannedHistory.length; i++) {
			dateList += '<p>' + facility.plannedHistory[i].value + " " + "-"
					+ " " + facility.plannedHistory[i].description + " " + '</p>';
		}
		}
		return dateList;

	};
	
	// plan Button Clicked
	$scope.planButtonClicked = function() {

		$scope.next = true;
		$scope.release = false;
		$('#calendar-btn').click(function() {
			$('#datepicker').click();
		});
		$("#datepicker").css("color", "rgb(101, 90, 215)");
		
		$('#datepicker').datepicker('setDate', null);
		
		var eventDatepicker = angular.element(document).find('#datepicker');
		
		eventDatepicker.datepicker('refresh');
		eventDatepicker.datepicker("option", "minDate",$scope.planningDataList.startDate);
		eventDatepicker.datepicker("option", "maxDate",$scope.planningDataList.endDate);

		var dates = [];
		
		if ($scope.selectedFacilityReleaseDate != null) {
			for (var i = 0; i < $scope.selectedFacilityReleaseDate.length; i++) {
				dates.push($scope.selectedFacilityReleaseDate[i].value);
			}
		}
	    $scope.plandates = dates;
		// disabling specific dates
		eventDatepicker.datepicker("option", "beforeShowDay", function(date) {
			var string = jQuery.datepicker.formatDate('dd-mm-yy', date);	
			return [ dates.indexOf(string) == -1 ];
		});
		
	};
	
	// release Button Clicked
	$scope.releaseButtonClicked = function() {
		
		$('#release-btn').click(function() {
			$('#datepicker').click();
		});
		$('#datepicker').datepicker('setDate', null);
		
		var eventDatepicker = angular.element(document).find('#datepicker');
		//console.log(eventDatepicker);
		eventDatepicker.datepicker('refresh');
		eventDatepicker.datepicker("option", "minDate",$scope.planningDataList.startDate);
		eventDatepicker.datepicker("option", "maxDate",$scope.planningDataList.endDate);

		var dates = [];
		if ($scope.selectedFacilityReleaseDate != null) {
			for (var i = 0; i < $scope.selectedFacilityReleaseDate.length; i++) {
				dates.push($scope.selectedFacilityReleaseDate[i].value);
			}
		}
		// enabling specific dates
		eventDatepicker.datepicker("option", "beforeShowDay", function(date) {
			var string = jQuery.datepicker.formatDate('dd-mm-yy', date);
			return [ dates.indexOf(string) >= 0 ];
		});

		$scope.release = true;
		$scope.plan = false;
		$scope.next = false;

	};	
	
	
	$scope.checkAvailablity = function(day){
	};
	$scope.closeModal= function(){
		$("#planConformation").modal("hide");		
	};
/****************** Function call on plan button click ***************************/
	$scope.submitPlan = function() {
			$scope.serverDate = $scope.planningDataList.serverDate;
			var selectDate = $('#datepicker').datepicker({
				dateFormat : 'dd,MM,yyyy'
			}).val();
			$scope.userSelectDate = $('#datepicker').datepicker({
				dateFormat : 'dd,MM,yyyy'
			}).val();
			
			
	    /***** User selected date from calender and server date had difference is > 3  *****/
		if (selectDate == null || selectDate == '') {
			$scope.errorMsg = 'Please select a date ';
			$("#errorMessage").modal("show");
		} else if ($scope.selectedCheckList == undefined
				|| $scope.selectedCheckList == '') {
			$scope.errorMsg = 'Please select a CheckList ';
			$("#errorMessage").modal("show");
		} else {
			var temp = $scope.serverDate;
			var format = temp.split('-').reverse().join('-');
			var serverDate = new Date(format);
			var lastDayOfCurrentMonth = new Date(serverDate.getFullYear(),
					serverDate.getMonth() + 1, 0);
			var difference = lastDayOfCurrentMonth.getDate()
					- serverDate.getDate();
			var format1 = selectDate.split('-').reverse().join('-');
			var selectedDate = new Date(format1);
			var plannedDay = selectedDate.getDate();
		
			/*************** Compairision between user system date and sever date. *************/
			var curDay = $scope.currentDate.getDate();
			var curMonth = $scope.currentDate.getMonth() + 1;
			if (curDay < 10) {
				curDay = '0' + curDay;
			}
			if (curMonth < 10) {
				curMonth = '0' + curMonth;
			}
			$scope.curDate= curDay + '-' + curMonth + '-' +$scope.currentDate.getFullYear() ;
	
			if ($scope.curDate != $scope.serverDate) {
					$scope.errorMsg = 'Please set your system date to current date ';
					$("#errorMessage").modal("show");				
			}
			
			else{
				if (difference > 3) {
					$scope.requestPlan(selectDate);
				 } else {
					switch (difference) {
					case 0:
					if (plannedDay > 3)
						$scope.requestPlan(selectDate);
					else {
						$scope.errorMsg = 'Difference between selected date and current date should be minimun 3 days.';
						$("#errorMessage").modal("show");
					}
					break;
				case 1:
					if (plannedDay > 2)
						$scope.requestPlan(selectDate);
					else {
						$scope.errorMsg = 'Difference between selected date and current date should be minimun 3 days.';
						$("#errorMessage").modal("show");
					}
					break;
				case 2:
					if (plannedDay > 1)
						$scope.requestPlan(selectDate);
					else {
						$scope.errorMsg = 'Difference between selected date and current date should be minimun 3 days. ';
						$("#errorMessage").modal("show");
					}
					break;
				case 3:
					$scope.requestPlan(selectDate);
					break;
				}
			}
		  }
		}
		
	};
    $scope.rePlan = function(userSelectDate){
    	$scope.addPlans($scope.userSelectDate);
    };
	
	$scope.requestPlan = function(selectDate){
		/********** Checking whether other user planned for the selected date *************/		
		$("#loader-mask").show();		
		$http.get("getPlanAvailable?facilityId=" +$scope.selectedFacility.areaNId+"&checklistId="+$scope.selectedCheckList.key+"&plannedDate="+selectDate).then(function successCallback(response) {
			$scope.planHistoryData = response.data;
			$("#loader-mask").hide();	
			 if($scope.planHistoryData === false){
					$scope.conformationmsg = "Selected date already planned by other user. Are you sure to plan on same date?";
					$("#planConformation").modal("show");					
					return false;
			  
			 }else {
				 $scope.addPlans(selectDate);
			 }
			 }, function errorCallback(response) {
				 $("#loader-mask").hide();
		});	
	};
	/********** Facility planned for selected date *************/		
	$scope.addPlans = function(selectDate){
		$scope.planningModel = {
				planningId : 0,
				planDate : selectDate,
				facilityId : $scope.selectedFacility.areaNId,
				checklistId:$scope.selectedCheckList.key
        };
		
		setTimeout(function() {
			$('[data-toggle="tooltip"]').tooltip();

		}, 500);

			$("#loader-mask").show();
			$http.post("addPlannings",$scope.planningModel).then(function successCallback(response) {
				if (response.data.valid == 'false') {
					$scope.errorMsg = response.data.errorMessage;
					$("#errorMessage").modal("show");
					
				} else {					
					var selecteddistrictList = $scope.selectedDist;
					var facilityType = $scope.selectedfacilityType;
					var blockListType = $scope.selectedBlock;
					var facilityPlanned=$scope.selectedFacility;
					
					$http.get("planningData?checkListId="+$scope.selectedCheckList.key).then(function(result) {
						$scope.planningDataList = result.data;
						$scope.facillityDetailsList = $scope.planningDataList['facilityPlanningModel'];
						$scope.selectState($scope.selectedState);
						$scope.selectDistrict(selecteddistrictList);
						$scope.selectfacilityType(facilityType);						
						if($scope.selectedfacilityType.key != 105){
						 $scope.selectBlock(blockListType);
						}
						$scope.showFacility(facilityPlanned);
						$("#loader-mask").hide();
						$scope.msg = response.data.errorMessage;
						$("#pop").modal("show");
						//$("#plan-clr").addClass("three-colrPlanned");	
						$(".plan-fac-list").removeClass("selectedDiv-plan");
					});					
				}
			}, function errorCallback(response) {
				$("#loader-mask").hide();
		 });
	};

	$scope.releasePlan = function(){
		var selectDate = $('#datepicker').datepicker({
			dateFormat : 'dd,MM,yyyy'
		}).val();
		if (selectDate == null || selectDate == '') {
			$scope.errorMsg = 'Please select a date ';
			$("#errorMessage").modal("show");
		} else {
			var planningId = null;
			for (var i = 0; i < $scope.selectedFacilityReleaseDate.length; i++) {
				// dates.push($scope.selectedFacility.realeaseDate[i].value)
				if ($scope.selectedFacilityReleaseDate[i].value == selectDate) {
					planningId = $scope.selectedFacilityReleaseDate[i].key;
					break;
				}
			}
		
		$("#loader-mask").show();
		$http.get("releasePlanning?planningId=" + planningId).then(function successCallback(response) {
			if (response.data.valid == 'false') {
				$scope.errorMsg = response.data.errorMessage;
				$("#errorMessage").modal("show");
				
			} else {
				var selecteddistrictList = $scope.selectedDist;
				var facilityType = $scope.selectedfacilityType;
				var blockListType = $scope.selectedBlock;
				var facilityReleased=$scope.selectedFacility;
				
				$http.get("planningData?checkListId="+$scope.selectedCheckList.key).then(function(result) {
					$scope.planningDataList = result.data;
					$scope.facillityDetailsList = $scope.planningDataList['facilityPlanningModel'];
					$scope.selectState($scope.selectedState);
					$scope.selectDistrict(selecteddistrictList);
					$scope.selectfacilityType(facilityType);
					if($scope.selectedfacilityType.key != 105){
						$scope.selectBlock(blockListType);
					}
					$scope.showFacility(facilityReleased);
					$("#loader-mask").hide();
					$scope.msg = response.data.errorMessage;
					$("#pop").modal("show");
					$(".plan-fac-list").removeClass("selectedDiv-plan");
				});				
			}
		}, function errorCallback(response) {
		});			
		}
	};	
	
};
