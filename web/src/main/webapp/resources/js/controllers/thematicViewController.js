// @author Devikrushna(devikrushna@sdrc.co.in)
function ValueObject(key, value) {
	this.key = key;
	this.value = value;
}
function thematicViewController($scope, $http, $filter ,$timeout, $rootScope, $window) {
	
	$scope.pageName = "Thematic View";
	$scope.activeMenu = "thematic-view";
	$scope.thmtc_chrt = false;
	$scope.firstLoad = true;
	$scope.mapShown = false;
	//$scope.sortReverse = false; 

	
	$("#loader-mask").show();
	$http.get("api/sectors").then(function(result) {
	
		$scope.allSectorList = result.data.sectors;
		$scope.facilityTypeList = result.data.facilityTypes;
		$scope.checkListData = $filter('filter')($scope.allSectorList, {
			description : -1
		}, true);	
			
			$scope.selectCheckList($scope.checkListData[0]);
			$scope.selectFacilityType($scope.facilityTypeList[0]);
			
			//Default section overall score
			for(var i=0; i<$scope.sectionList.length; i++){
				if($scope.sectionList[i].key == 4){
					$scope.selectSection($scope.sectionList[i]);
				}
			}
			if(!$scope.selectedSection){ //if in case score not available
				$scope.selectSection($scope.sectionList[0])
			}
			
			//Default subsection overall score
			for(var i=0; i<$scope.subSectionList.length; i++){
				if($scope.subSectionList[i].key == 63){
					$scope.selectSubSection($scope.subSectionList[i]);
				}
			}
			if(!$scope.selectedSubSection){ //if in case score not available
				$scope.selectSubSection($scope.selectSubSection[0])
			}
			
			if($scope.stateList)
			$scope.selectState($scope.stateList[0]);
		
	}, function errorCallback(response) {
		$("#loader-mask").hide();
	});
	
	$scope.selectCheckList = function(checklist){
		$scope.selectedCheckList = checklist;
		if(checklist.key == 2){
			$scope.facilityTypes = $filter('filter')($scope.facilityTypeList, {
				id : 102
			}, true);
		}else{
			$scope.facilityTypes = $scope.facilityTypeList;
		}
		$scope.sectionList = [];
		$scope.subSectionList = [];
		$scope.selectedFacilityType = undefined;
		$scope.selectedSection = undefined;
		$scope.selectedSubSection = undefined;
		$scope.selectedIndicator = undefined;
		$scope.selectedQuarter = undefined;
		$scope.selectedTimeperiod = undefined;	
		$scope.selectedState = undefined;
		$scope.selectedDistrict = undefined;
		$scope.thmtc_chrt = false;
		if($scope.utdata){
			$scope.utdata.dataCollection = [];
			$scope.topPerformer = [];
			$scope.bottomPerformer = [];
		}
		if($scope.thematicTableData){
			$scope.thematicTableData = {};
			$scope.columns = [];
			$scope.thematicData = [];
		}
	};
	$scope.selectFacilityType = function(facilityType){
		$scope.selectedFacilityType = facilityType;
		$scope.sectionList=$filter('filter')($scope.allSectorList, {description:$scope.selectedCheckList.key}, true);	
		$scope.subSectionList = [];
		$scope.selectedSection = undefined;
		$scope.selectedSubSection = undefined;
		$scope.selectedIndicator = undefined;
		$scope.selectedQuarter = undefined;
		$scope.selectedTimeperiod = undefined;	
		$scope.selectedState = undefined;
		$scope.selectedDistrict = undefined;
		$scope.thmtc_chrt = false;
		if($scope.utdata){
			$scope.utdata.dataCollection = [];
			$scope.topPerformer = [];
			$scope.bottomPerformer = [];
		}
		if($scope.thematicTableData){
			$scope.thematicTableData = {};
			$scope.columns = [];
			$scope.thematicData = [];
		}
	};
	$scope.selectSection = function(section){
		$scope.selectedSection = section;
		$scope.subSectionList=$filter('filter')($scope.allSectorList, {description:$scope.selectedSection.key}, true);	
		$scope.indicatorList = [];
		$scope.selectedSubSection = undefined;
		$scope.selectedIndicator = undefined;
		$scope.selectedQuarter = undefined;
		$scope.selectedTimeperiod = undefined;	
		$scope.selectedState = undefined;	
		$scope.selectedDistrict = undefined;
		$scope.thmtc_chrt = false;
		if(!$scope.subSectionList.length)
			$scope.getIndicatorList($scope.selectedSection.key);
		if($scope.utdata){
			$scope.utdata.dataCollection = [];
			$scope.topPerformer = [];
			$scope.bottomPerformer = [];
		}
		if($scope.thematicTableData){
			$scope.thematicTableData = {};
			$scope.columns = [];
			$scope.thematicData = [];
		}
	};
	
	
	$scope.selectSubSection = function(subsec){
		$scope.selectedSubSection = subsec;
		$scope.selectedIndicator = undefined;
		$scope.selectedQuarter = undefined;
		$scope.selectedTimeperiod = undefined;	
		$scope.selectedState = undefined;
		$scope.selectedDistrict = undefined;
		$scope.thmtc_chrt = false;
//		$scope.getIndicatorList($scope.selectedSubSection.key);
		if($scope.utdata){
			$scope.utdata.dataCollection = [];
			$scope.topPerformer = [];
			$scope.bottomPerformer = [];
		}
		if($scope.thematicTableData){
			$scope.thematicTableData = {};
			$scope.columns = [];
			$scope.thematicData = [];
		}
		
		$scope.getIndicatorList($scope.selectedSubSection.key);
		
	};
	
	 $scope.getIndicatorList = function(subSecId){
		 
		 $http.get('api/indicators?sector='+subSecId).then(function(result) {
				$scope.indicatorList = result.data;
				if($scope.firstLoad){
				$scope.selectIndicator($scope.indicatorList[0]);
				}
			}, function errorCallback(response) {
				$("#loader-mask").hide();
			});
			
		 
	 };
	
	
	$scope.selectIndicator = function(indicator){
		$scope.selectedIndicator = indicator;
		$scope.selectedQuarter = undefined;
		$scope.selectedTimeperiod = undefined;	
		$scope.selectedState = undefined;	
		$scope.thmtc_chrt = false;
		if($scope.utdata){
			$scope.utdata.dataCollection = [];
			$scope.topPerformer = [];
			$scope.bottomPerformer = [];
		}
		if($scope.thematicTableData){
			$scope.thematicTableData = {};
			$scope.columns = [];
			$scope.thematicData = [];
		}
		$http.get('api/sources?iusnid='+$scope.selectedIndicator.description).then(function(result) {
			$scope.sourceData = result.data;
			$scope.sourceId = $scope.sourceData[0].key;
			
			$http.get('api/timeperiod?iusnid='+$scope.selectedIndicator.description +'&sourceNid='+$scope.sourceId).then(function(result) {
				$scope.allTimeperiod = result.data;
				
				$scope.periodicityData = $scope.allTimeperiod['periodicities'];
				$scope.alltimePeriodData = $scope.allTimeperiod['timeperiods'].reverse();
				if($scope.firstLoad){
					$scope.selectQuarter($scope.periodicityData[0]);
					$scope.timePeriodData = $scope.timePeriodData.sort(function(a,b) {return (a.key < b.key) ? 1 : ((b.key < a.key) ? -1 : 0);} );
					$scope.selectTimeperiod($scope.timePeriodData[0]);
				}
				
				
			}, function errorCallback(response) {
				$("#loader-mask").hide();
			});
			
		}, function errorCallback(response) {
			$("#loader-mask").hide();
		});
	
	};
	$scope.selectQuarter = function(quarter){
		$scope.selectedQuarter = quarter;
		$scope.timePeriodData = $filter('filter')($scope.alltimePeriodData, {periodicity:parseInt($scope.selectedQuarter.key)}, true);	
		$scope.timePeriodData = $scope.timePeriodData.sort(function(a,b) {return (a.key < b.key) ? 1 : ((b.key < a.key) ? -1 : 0);} );
		$scope.selectedTimeperiod = undefined;	
		$scope.selectedState = undefined;	
		$scope.thmtc_chrt = false;
		if($scope.utdata){
			$scope.utdata.dataCollection = [];
			$scope.topPerformer = [];
			$scope.bottomPerformer = [];
		}
		if($scope.thematicTableData){
			$scope.thematicTableData = {};
			$scope.columns = [];
			$scope.thematicData = [];
		}
	};
	$scope.selectTimeperiod = function(time){
		$scope.selectedTimeperiod = time;	
		$scope.selectedState = undefined;
		$scope.thmtc_chrt = false;
		if($scope.utdata){
			$scope.utdata.dataCollection = [];
			$scope.topPerformer = [];
			$scope.bottomPerformer = [];
		}
		if($scope.thematicTableData){
			$scope.thematicTableData = {};
			$scope.columns = [];
			$scope.thematicData = [];
		}
		$http.get('api/areaRoleWise').then(function(result) {
			$scope.allstateList = result.data;
			$scope.stateList = $scope.allstateList['areaJson'];
			if($scope.firstLoad)
			$scope.selectState($scope.stateList[0]);
			$scope.firstLoad = false;
			
		}, function errorCallback(response) {
			$("#loader-mask").hide();
		});
	};
	
	$scope.getThematicMapData = function(){
		$scope.utdata = [];
//		$("#loader-mask").show();
		$http
		.get(
				'api/data?indicatorId=' + $scope.selectedIndicator.description
						+ '&sourceNid=' + $scope.sourceId
						+ '&areaId=' + $scope.selectedState.area_id
						+ '&timeperiodId=' + $scope.selectedTimeperiod.key
						+ '&parentAreaId=' + $scope.selectedState.parent_area_id
						+ '&facilityTypeId=' + $scope.selectedFacilityType.id)
		.then(
				function(result) {
					
		$scope.utdata = result.data;
		$scope.legends = result.data.legends;
		$scope.topPerformer = result.data.topPerformers;
		$scope.bottomPerformer = result.data.bottomPerformers;
//		if($scope.utdata.dataCollection.length==0){
//			 $("#thematicNoTableData").modal("show");		
//	    	  $scope.conformationmsg = 'No map data available';
//		}
		//console.log($scope.utdata);
		$("#loader-mask").hide();
		}, function errorCallback(response) {
			$("#loader-mask").hide();
		});
	};
	
	$scope.getTableData = function(areaId){
		$("#loader-mask").show();
		var subSectionId = "";
		if($scope.selectedSubSection == undefined ){
			subSectionId = $scope.selectedSection.key ;
		}
		else{
			subSectionId = $scope.selectedSubSection.key;
		}
		// get table data
		$http.get(
				'api/getThematicTableViewData?sectorNid=' + subSectionId
						+ '&timePeriod_NId=' + $scope.selectedTimeperiod.key
						+ '&areaNid=' + areaId
						+ '&facilityTypeId=' + $scope.selectedFacilityType.id).then(
				function(result) {
					$("#loader-mask").hide();
					$scope.thematicTableData = result.data;
		
					$scope.columns = $scope.thematicTableData['headers'];
					$scope.thematicData = $scope.thematicTableData['data'];
		
					/*if ($scope.thematicData.length == 0) {
						$("#thematicNoTableData").modal("show");
						$scope.conformationmsg = 'No table data found';
		
					}*/
		
				}, function errorCallback(response) {
					$("#loader-mask").hide();
				});
	}

	
	$scope.selectState = function(state){
//		$("#loader-mask").show();
		$scope.selectedState = state;	
		$scope.savedSelectedIndicator = JSON.parse(JSON.stringify($scope.selectedIndicator))
		if($scope.selectedState.children.length){
			$scope.selectDistrict($scope.selectedState.children[0]);
		}
		else
			$scope.selectedDistrict = undefined;
		$scope.mapNameData = $scope.selectedState.map_name;
		$scope.primary_url = "resources/json/"+$scope.mapNameData;
		$scope.mapSetup($scope.primary_url,true);
		$scope.thematicTableData = [];
		
				// get line chart data
				
		if(!$scope.selectedState.children.length)
			$scope.getTableData($scope.selectedState.area_nid_pk);		
				
	};
	$scope.showViz = function(areaName, selectedTrndArea){
		if(areaName.properties.utdata == null){
			return true;
		}
		$("#loader-mask").show();
		$scope.selectedTrendArea = selectedTrndArea;	
		$scope.selectedTrend=areaName;
		$http.get(
		'api/getLineChartData?area_NId=' + areaName.properties.utdata.areaNid
				+ '&indicator_NId=' + $scope.selectedIndicator.description + '&periodicity='
				+ $scope.selectedQuarter.key + '&timePeriod_NId='
				+ $scope.selectedTimeperiod.key +
				'&facilityTypeId=' + $scope.selectedFacilityType.id).then(function(result) {
					$scope.lineChartData = result.data;
					$scope.thmtc_chrt = true;
					$("#loader-mask").hide();
		}, function errorCallback(response) {
			$("#loader-mask").hide();
		});
	};
	$scope.selectDistrict = function(district){
		$scope.selectedDistrict = district;	
		$scope.getTableData($scope.selectedDistrict.area_nid_pk);
	};
	$scope.thematic_close = function(){
		  $scope.thmtc_chrt = false;	
		  
	  };
	$scope.showHideMap = function(show){
		if(show){
			$scope.mapShown = true;
			setTimeout(function(){
				$('html, body').animate({
					scrollTop : $(".thematicMapSection").offset().top - 50
				}, 300);
			}, 100)
			
		}
		else{
			$scope.mapShown = false;
		}
	}
	//sorting
			
			$scope.selectSortColumn = function(column){
		    	if($scope.sortSelectedColumn != column){
		    		
		        	$scope.sortSelectedColumn = column;
		    	}
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
		        var tab_text="<h2>Thematic View</h2><h3>Checklist: "+$scope.selectedCheckList.value+"</h3><h3>Facility Type: "+$scope.selectedFacilityType.name+"</h3><h3>Section: "+$scope.selectedSection.value+ ($scope.selectedSubSection?"</h3><h3>Subsection: "+ $scope.selectedSubSection.value:"") +"</h3><h3>Indicator: "+$scope.selectedIndicator.value+"</h3><h3>Periodicity: " + $scope.selectedQuarter.value + "</h3><h3>Timeperiod: " +$scope.selectedTimeperiod.value +"</h3><h3>State: "+($scope.selectedState.area_nid_pk != 1 ? $scope.selectedState.name:"All states")+($scope.selectedDistrict && $scope.selectedDistrict.name != 'All'?"</h3><h3>District: "+($scope.selectedDistrict.name != 'All' ? $scope.selectedDistrict.name:""):"")+"</h3>";
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
		        link.download = "thematic_view_" + ($scope.selectedState.areaNId != 1 ? $scope.selectedState.name:"India") +"_" + new Date().toLocaleDateString() + ".xls";
		        link.href = uri + base64(format(template, ctx));
		        if(typeof InstallTrigger === 'undefined'){
		           	link.click();
		           }
		           else{
		           	window.location.href = link.href;
		           }
		    };
		     
	// for map
	var w = angular.element($window);
	$scope.getWindowDimensions = function() {
		return {
			"h" : 500,
			"w" : w.width()
		};
	};
	// this is to make sure that scope gets changes as window get resized.
	w.on("resize", function() {
		if(!$scope.$$phase)
		$scope.$apply();
	});
	
	//$scope.selectedGranularity = new ValueObject("IND", "India");
	
	
};
	

	
	