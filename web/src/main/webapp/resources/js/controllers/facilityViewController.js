/**
 * @author Sasmita Rani
 * @param $scope
 * @param $http
 * @param $filter
 * @param $timeout
 */

function facilityViewController($scope, $http, $filter ,$timeout, $rootScope, $window) {
	$scope.pageName = "Facility View";
	$scope.sortReverse=false;
	
	$scope.checkBlkDataStatus = false;
	$scope.subSectionStatus = false;
	$scope.timeDataStatus = false;
	$scope.pushpinDataStatus = false;
	$scope.tableDataStatus =false;
	$scope.showingMap = false;
	 $scope.selectSortColumn = function(column){
    	if($scope.sortSelectedColumn != column){
    		$(".sortSelected").removeClass("sortSelected");
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
    
    $scope.filterFloat = function(value) {
        if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/
        	      .test(value))
        	      return Number(value);
        	  return value;
    };
    
	/*$scope.removeRowId = function(item){
		 return item != 'DistrictId';
	};*/
    //console.log(d);
	
    $("#loader-mask").show();
    
    /******************* Get user details **************/
    $http.get("userDetails").then(function(result) {
		 $scope.userDetailsData = result.data;
		 console.log($scope.userDetailsData.userLevel);
	 });
    /******************* Select checklist **************/	
	   $http.get("typeDetails").then(function(result) {
		   $scope.checkListDetails = result.data;
		   $scope.listDetails =  $scope.checkListDetails['Checklists'];
		   $scope.facilityTypeData =  $scope.checkListDetails['FacilityTypeForArea'];
		   $scope.facilityTypeDataDetails = $scope.facilityTypeData;
		   $scope.facilityTypeDetails =[];
		   
		   /******************* Select area based on user login **************/	
		   $http.get("areasLoginwise").then(function(result) {
		 	   $scope.area = result.data;
		 	   $scope.mainStateList = $filter('filter')($scope.area, {
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
						
						if($filter('filter')($scope.area, {parentAreaId : $scope.mainStateList[i].areaNId, level : 3}, true).length)
							{
							 $scope.stateList.push($scope.mainStateList[i]);
							}
						}
					}	
				   var addNewVal = {key: "", value: "All", orderLevel: 1};
				   $scope.facilityTypeDetails = $scope.facilityTypeData;
				   $scope.facilityTypeDetails.unshift(addNewVal);
				   $scope.selectCheckList($scope.listDetails[1]);	 
		 	 /* if($scope.stateList.length == 1 && $scope.selectedSubSection != undefined){
					 $scope.selectState($scope.stateList[0]);
			  }	*/
		 	  $("#loader-mask").hide();
		 	
		    }, function errorCallback(response) {
				$("#loader-mask").hide();
		   });
		   	 	  
	    },function errorCallback(response) {
	    	$("#loader-mask").hide();
	   });
    
   /******************* Select Section **************/	
   $scope.sectionDetails = function(param){
   $http.get("getSection?checklistId=" + param.key).then(function(result) {
	   $scope.sectionData = result.data;
	   //if($scope.stateList.length == 1)
			   $scope.selectSection($scope.sectionData[0]);
     },function errorCallback(response) {
    });
   };
   
   /******************* Select Sub Section **************/	
   $scope.subSectionDetails = function(par){
   $http.get("getSubSection?sectionId=" + par.key).then(function(result) {
	   $scope.subSectionData = result.data;
	   //if($scope.stateList.length == 1)
	   $scope.selectSubSection($scope.subSectionData[0]);
    });
   };
   
   /******************* Select time period **************/	
   $scope.timePeriod = function(){
   $http.get("getDashboardTimeperiod").then(function(result) {
	   $scope.dashTimeData = $filter('orderBy')(result.data, 'timePeriodId',true); // Added by sourav nath
	   $scope.selectTimePeriod( $scope.dashTimeData[0]);
   });
  };
   
    /******************* Table Data **************/	
   $scope.tableDataDetails = function(){
	   $scope.columns = [];
	  if($scope.selectedState == undefined){
		   var stateId = '';
	  } else
	  {
		   var stateId=$scope.selectedState.areaNId;
	  } 
	  if($scope.selectedDist==undefined)
	   {
	       var districtId='';
	   }
	   else
	   {
		   var districtId=$scope.selectedDist.areaNId;
	   }
	   if($scope.selectedBlock==undefined)
	   {
	       var blockId='';
	   }
	   else
	   {
		   var blockId=$scope.selectedBlock.areaNId;
	   }
	  // $("#loader-mask").show();
     $http.get("getTabularDateForFacilityView?checklistId="+ $scope.selectedList.key + "&timeperiodId=" + $scope.selectedPeriod.timePeriodId + "&stateId=" + stateId + "&districtId=" + districtId + "&blockId=" + blockId+ "&sesctionId="+$scope.selectedSection.key+ "&facilityTypeId="+$scope.selectedFacilityType.key).then(function(result) {
      $scope.tableData = result.data['tableData'];
      $scope.tableDataStatus = true;
      $scope.statTablData = true;
      $scope.distTablData = true;
      $scope.blkTablData = true;
	
      if($scope.tableData.length > 0){
    	  $scope.columns = result.data['tableHeader'];
      }
      $scope.isEmpty = true;
      for(var i=0; i<$scope.tableData.length; i++){
    	  if(Object.keys($scope.tableData[i]) != 0){
    		  $scope.isEmpty = false;
    		  break;
    	  }
      }
     /* if(stateId=='' && districtId =='' && blockId=='' && $scope.isEmpty){
    	  $scope.tabldata = false;
      }else */
      if($scope.isEmpty){
    	  $("#facilityNoTableData").modal("show");		
    	  $scope.conformationmsg = 'No data found. Please revise the selections.';
      	  $scope.tabldata = false;
      }else
    	  $scope.tabldata = true;
      
       setTimeout(function() {
 		 $('[data-toggle="tooltip"]').tooltip();
 	   }, 500);	
       
       if($scope.statTablData)
           $("#loader-mask").hide();
         
         if($scope.distTablData)
             $("#loader-mask").hide();
         
         if($scope.blkTablData)
            $("#loader-mask").hide();
    		
	  },function errorCallback(response) {
	});
   };
    
   $scope.selectCheckList = function(list){
	   $scope.selectedList = list;
	   $scope.tabldata = false;
	   $scope.selectedFacilityType = undefined;
	   $scope.selectedSection = undefined;
	   $scope.selectedSubSection = undefined;
	   if($scope.stateList.length != 1){
		  $scope.sectionData = []; 
		  $scope.subSectionData = [];
		  $scope.dashTimeData  = [];
		  $scope.districtList = [];
		  $scope.blockList  =[];   
		  $scope.selectedState = undefined;
	      $scope.selectedPeriod = undefined;
	      $scope.selectedBlock = undefined;
		  $scope.selectedDist = undefined;
   	   }else if($scope.stateList.length == 1){
   		  if($scope.userDetailsData.userLevel == 4){
	    	  $scope.selectedBlock = undefined;
	      }else if($scope.userDetailsData.userLevel == 2){
	    	  $scope.selectedBlock = undefined;
		  	  $scope.selectedDist = undefined;
		  	  $scope.blockList  =[];
	      }
	   }
	   if($scope.selectedList.key == 122){
		   $scope.facilityTypeDetails = $filter('filter')($scope.facilityTypeDataDetails, {
											key : 102
										}, true);	
	   }else{
		   $scope.facilityTypeDetails = $scope.facilityTypeData;
	   }
	   $scope.selectFacilityType($scope.facilityTypeDetails[0]);
   };
   $scope.selectFacilityType = function(type){
	   $scope.selectedFacilityType = type;
	   $scope.tabldata = false;
	   $scope.selectedSection = undefined;
	   $scope.selectedSubSection = undefined;
	   $scope.selectedPeriod = undefined;
	   if($scope.stateList.length != 1){
		   $scope.selectedState = undefined;
		   $scope.selectedBlock = undefined;
		   $scope.selectedDist = undefined;
		   $scope.subSectionData = [];
		   $scope.dashTimeData  = [];
		   $scope.districtList = [];
		   $scope.blockList  =[];
	    }else if($scope.stateList.length == 1){
	      if($scope.userDetailsData.userLevel == 4){
	    	  $scope.selectedBlock = undefined;
	      }else if($scope.userDetailsData.userLevel == 2){
		      $scope.selectedBlock = undefined;
		  	  $scope.selectedDist = undefined;
		  	  $scope.blockList  =[];
	      }
	    }
	   $scope.sectionDetails($scope.selectedList);
   };
   $scope.selectSection = function(section){
	   $scope.selectedSection = section;
	   $scope.tabldata = false;
	   $scope.selectedSubSection = undefined;
	   $scope.selectedPeriod = undefined;
	   if($scope.stateList.length != 1){
		   $scope.selectedState = undefined;
		   $scope.selectedBlock = undefined;
		   $scope.selectedDist = undefined;
		   $scope.dashTimeData  = [];
		   $scope.districtList = [];
		   $scope.blockList  =[];
	    }else if($scope.stateList.length == 1){
	      if($scope.userDetailsData.userLevel == 4){
	    	  $scope.selectedBlock = undefined;
	      }else if($scope.userDetailsData.userLevel == 2){
		      $scope.selectedBlock = undefined;
		  	  $scope.selectedDist = undefined;
		  	  $scope.blockList  =[];
	      }
	    }
	   $scope.subSectionDetails(section);
   };
   
   $scope.selectSubSection = function(sub){
	   $scope.selectedSubSection = sub;
	   $scope.subSectionStatus = true;
	   $scope.tabldata = false;
	   $scope.selectedPeriod = undefined;
	   if($scope.stateList.length != 1){
		    $scope.selectedState = undefined;
		    $scope.selectedBlock = undefined;
			$scope.selectedDist = undefined;
			$scope.districtList = [];
		    $scope.blockList  =[];
	    }else if($scope.stateList.length == 1){
	      if($scope.userDetailsData.userLevel == 4){
		     $scope.selectedBlock = undefined;
		  }else if($scope.userDetailsData.userLevel == 2){
			 $scope.selectedBlock = undefined;
			 $scope.selectedDist = undefined;
			 $scope.blockList  =[];
		  }
	    }
	   $scope.timePeriod(); 
   };
   
   $scope.selectTimePeriod = function(time){
	   $scope.selectedPeriod = time;
	   $scope.timeDataStatus = true;
	   $scope.tabldata = true;
	   $("#loader-mask").hide();
	   if($scope.stateList.length == 1 && $scope.selectedSubSection != undefined){
			 $scope.selectState($scope.stateList[0]);
	   }
	   if($scope.stateList.length != 1)
		   $scope.tableDataDetails();
   };
   $scope.selectState = function(state){
	   $scope.selectedState = state;
	   $scope.districtList = $filter('filter')($scope.area, {
			parentAreaId : $scope.selectedState.areaNId, level : 3
	   }, true);
	   $scope.selectedBlock = undefined;
	   $scope.showingMap = false;
	  /* $("#loader-mask").show();
	   $scope.statTablData =false;*/
	    if($scope.userDetailsData.userLevel == 4 || $scope.userDetailsData.userLevel == 5){
			 $scope.selectDistrict($scope.districtList[0]);	 
		}else if($scope.userDetailsData.userLevel == 2){
			 $scope.selectedDist = undefined;
			 $scope.blockList  =[];
			 $scope.tableDataDetails();
		}else {
			 $scope.statTablData =false;
			 $("#loader-mask").show();
			 $scope.selectedDist = undefined;
			 $scope.blockList  =[];
			 $scope.tableDataDetails();
		}
   };
   $scope.selectDistrict = function(dist) {
	   $scope.selectedDist = dist;
	   if(dist != undefined){
		   $scope.blockList = $filter('filter')($scope.area, {
				parentAreaId : $scope.selectedDist.areaNId, level : 4
			}, true);
	   }  
	   $scope.selectedBlock = undefined;
	   $scope.showingMap = false;
	   if($scope.userDetailsData.userLevel == 5){
			 $scope.selectBlock($scope.blockList[0]);	 
		}else if($scope.userDetailsData.userLevel == 4){
			 $scope.tableDataDetails();
		}else{
			 $scope.distTablData =false;
			 $("#loader-mask").show();
			 $scope.tableDataDetails();
		}
   };
   $scope.selectBlock = function(blk){
	   $scope.selectedBlock = blk;
	   $scope.checkBlkDataStatus = true;
	   if($scope.userDetailsData.userLevel != 5){
		   $scope.blkTablData = false;
		   $("#loader-mask").show();
	   }
	   $scope.columns = [];
	   $scope.map.markers =[];
	   $scope.markersArray = [];
	   $scope.facilityList = $filter('filter')($scope.area, {
			parentAreaId : $scope.selectedBlock.areaNId, level : 5
		}, true);	 
	   $scope.getMapData();	 
	   $scope.getPushpins();	
	   $scope.tableDataDetails();
   };
   
   /***************** Google map and push pin data ***************/
	$scope.map = {
			bounds : {},
			clickMarkers : [],
			
			events : {
				"mouseover" : function(mapModel, eventName,
						originalEventArgs) {
					for (var i = 0; i < $scope.map.markers.length; i++) {
						if ($scope.map.markers[i].id == originalEventArgs.id) {
							$scope.map.markers[i].showWindow = true;
							break;
						}
					}
					$scope.$apply();
				},
				"mouseout" : function(mapModel, eventName,
						originalEventArgs) {
					for (var i = 0; i < $scope.map.markers.length; i++) {
						if ($scope.map.markers[i].id == originalEventArgs.id) {
							$scope.map.markers[i].showWindow = false;
							break;
						}
					}
					$scope.$apply();
				},
				"click" : function(mapModel, eventName,
						originalEventArgs) {
					$scope.getFacilityData(originalEventArgs);
				}
			}
		};
	 $scope.map.markers=[];
	$scope.map.center = {
			latitude :  21.7679,
			longitude : 78.8718
	};

	$scope.map.zoom = 5;
	$scope.show = true;
	$scope.map.polygons =  polygons;
	$scope.getMapData = function(){
		if($scope.selectedState){
			for(var i=0; i<$scope.map.polygons.length; i++){
				if($scope.selectedState.areaNId == $scope.map.polygons[i].id){
					$scope.map.center = $scope.map.polygons[i].center;
					$scope.map.zoom = $scope.map.polygons[i].zoom;
				}
			}
			
			$scope.show = true;
		}	
	};
	$scope.pixelOffset = {
		pixelOffset : new google.maps.Size(0, -28)
	};
	
	/*************** Get all push pins here *******************/
	$scope.getPushpins = function() {	
	 $scope.markersArray = [];
	 $scope.map.markers = [];
	 $scope.greenMarkers = 0;
	 $scope.redMarkers = 0;
	 $scope.orangeMarkers = 0;
	 //$("#loader-mask").show();
	 //$scope.pushpinDataLoad = false;
	 if($scope.selectedSubSection != undefined){	
	  $http.get('getAllPushPinFacililityData?blockId=' + $scope.selectedBlock.areaNId + '&checklistId=' + $scope.selectedList.key
						+ '&subsection=' + $scope.selectedSubSection.key 
						+ '&facilityTypeId=' + $scope.selectedFacilityType.key 
						+ '&startDate=' + moment($scope.selectedPeriod.startDate).format("YYYY-MM-DD HH:mm:ss")
						+ '&endDate=' + moment($scope.selectedPeriod.endDate).format("YYYY-MM-DD HH:mm:ss")).then(function(response) {
			
				$scope.data=response.data;
			
			$scope.map.markers = $scope.data;
			$scope.markersArray = $scope.map.markers;
			$scope.pushpinDataStatus = true;
			for(var i=0; i < $scope.map.markers.length; i++){
				if($scope.map.markers[i].latitude!=null && $scope.map.markers[i].longitude!=null){
				 if($scope.map.markers[i].levelType == "l1"){
					 $scope.greenMarkers++;
				 }else if($scope.map.markers[i].levelType == "l2"){
					$scope.orangeMarkers++;
				 }else if($scope.map.markers[i].levelType == "l3"){
					$scope.redMarkers++;
				 }
			    }
				//$scope.pushpinDataLoad = true;
			  }
			/*if($scope.pushpinDataLoad){
				 $("#loader-mask").hide();
			}*/
			if($scope.checkBlkDataStatus || $scope.subSectionStatus || 	$scope.timeDataStatus || $scope.tableDataStatus || $scope.pushpinDataStatus){
				 setTimeout(function () {
					 $("#loader-mask").hide();
				 }, 1000);
			}
			
			//console.log($scope.map.markers);
	 },function errorCallback(response) { $("#loader-mask").hide();});
	}else
		$("#loader-mask").hide();
  };
  
  /********* Toggle the map (show and hide map on button click) **************/
	$scope.showHideMap = function(option){
		$scope.showingMap = option;
	};
	
 /************* Get the push pin raw data on modal **************/ 	
	$scope.getFacilityData = function(rowData){
	 $("#loader-mask").show();
	 $scope.pushPinFacility = rowData.facilityName;
	 $scope.pushPinFacilityType = rowData.facilityType;
	 var reportInputDataModel=
	  {
		checklistType:$scope.selectedList.key,
		submisionIDs:rowData.submissionId,
		facilityId:rowData.facilityId
      };
		$http.post('getPushpinScore',reportInputDataModel)
				.then(function sucessCallback(response) {
					$scope.facilityActionData = response.data;
					
					if($scope.facilityActionData.length)
					{
					$scope.mapColumn = Object.keys($scope.facilityActionData[0]);
					if($scope.selectedList.key==122)
						{
						$scope.mapColumn.reverse();
						}
					$("#facilityActionTable").modal();
					}
					else
						{
					   	  $("#facilityNoTableData").modal("show");		
				    	  $scope.conformationmsg = 'No data found';
						}
					$("#loader-mask").hide();
		});
	}; 
	
 /******************* Auto search of push pins on map *******************/ 	
/*	$("#searchDashboard").autocomplete({
		source : $scope.optArrayDashboard,
		appendTo : "#searchDivDashboard",
		select: function(event, ui) {
			document.getElementById('searchDashboard').value = ui.item.value;
			$scope.searchNodeDashboard();
			$scope.$apply();
	    }
	});*/
	$scope.searchNodeDashboard= function() {
		$scope.optArrayDashboard = [];
		$scope.nooptArrayDashboard = [];
		var selectedVal = document.getElementById('searchDashboard').value;
		var node = [];
		var colorChange = [];
			$scope.optArrayDashboard = [];
			for(var i = 0; i<$scope.markersArray.length; i++){
				//var searchData = $scope.markersArray[i].facilityName +"(" + $scope.markersArray[i].facilityType + ")";
				node.push($scope.markersArray[i].facilityName);
				colorChange.push($scope.markersArray[i].facilityId);
			}
			
			if (selectedVal == "") {
				for (var i = 0; i < $scope.map.markers.length; i++) {
//					var iconPath = $scope.map.markers[i].path;
					var icon = $scope.map.markers[i].icon;
					var replacedIcon = icon.replace(".png", "").replace("_op", "");
					$scope.map.markers[i].icon = replacedIcon+".png";
				}
			} else {
				for(var i = 0; i<$scope.markersArray.length; i++){
					if (node[i].toUpperCase().indexOf(selectedVal.toUpperCase()) != -1) {
						$scope.optArrayDashboard.push(node[i]);
					}else{
						$scope.nooptArrayDashboard.push(node[i]);
					}
				}
				
				$("#searchDashboard").autocomplete({
					source : $scope.optArrayDashboard,
					appendTo : "#searchDivDashboard",
					select: function(event, ui) {
						document.getElementById('searchDashboard').value = ui.item.value;
						$scope.searchNodeDashboard();
						$scope.$apply();
				    }
				});
				
				for(var j=0;j<$scope.optArrayDashboard.length;j++){
					for (var i = 0; i < $scope.map.markers.length; i++) {
						if ($scope.markersArray[i].facilityName == $scope.optArrayDashboard[j]) {
//							var iconPath = $scope.map.markers[i].path;
							var icon = $scope.map.markers[i].icon;
							var replacedIcon = icon.replace(".png", "").replace("_op", "");
							$scope.map.markers[i].icon = replacedIcon+".png";
						}
					}
				}
				for(var j=0;j<$scope.nooptArrayDashboard.length;j++){
					for (var i = 0; i < $scope.map.markers.length; i++) {
						if ($scope.markersArray[i].facilityName == $scope.nooptArrayDashboard[j]) {
//							var iconPath = $scope.map.markers[i].path;
							var icon = $scope.map.markers[i].icon;
							var replacedIcon = icon.replace(".png", "").replace("_op", "");
							$scope.map.markers[i].icon = replacedIcon+"_op.png";
						}
					}
				}
			}
		};
	
 /************* Download the raw data in to excel ***************/	
		
		$scope.exportTableData = function(id, facility, block){
	    	var htmls = "";
	        var uri = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
	        var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'; 
	        var base64 = function(s) {
	            return window.btoa(unescape(encodeURIComponent(s)));
	        };

	        var format = function(s, c) {
	            return s.replace(/{(\w+)}/g, function(m, p) {
	                return c[p];
	            });
	        };
	        if(id == "community-action-table"){
	        	var tab_text = "<h3>Facility Name: "+$scope.pushPinFacility+"</h3>"+(facility?"<h3>Checklist Type: "+$scope.selectedList.value+"</h3>":"")+"<h3>State: " + $scope.selectedState.name +"</h3>"+"<h3>District: " + $scope.selectedDist.name +"</h3>"+"<h3>Block: " + $scope.selectedBlock.name +"</h3>";
	        }else{
	        	var tab_text = "<h3>Checklist Type: " + $scope.selectedList.value +"</h3>"+"<h3>Facility Type: "+$scope.selectedFacilityType.value+"</h3>"+"<h3>Section: " + $scope.selectedSection.value +"</h3>"+"<h3>Sub-Section: " + $scope.selectedSubSection.value +"</h3>"+"<h3>Time Period: " + $scope.selectedPeriod.timePeriod +"</h3>"
	        				   +"</h3>"+($scope.selectedState?"<h3>State: "+$scope.selectedState.name+"</h3>":"")+"</h3>"+($scope.selectedDist?"<h3>District: "+$scope.selectedDist.name+"</h3>":"")+"</h3>"+($scope.selectedBlock?"<h3>Block: "+$scope.selectedBlock.name+"</h3>":"");
	        }
	        if(id == "community-action-table"){
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
	        if(id == 'community-action-table'){
	        	link.download = $scope.pushPinFacility+"_Score Overview"+ "_" +new Date().toLocaleDateString()+ ".xls";
	        }else{
	        	if($scope.selectedState != undefined)
	        		link.download = $scope.selectedState.name+ "_" + $scope.selectedPeriod.timePeriod + "_" + new Date().toLocaleDateString()+ ".xls";
	        	else
	        		link.download = "India"+ "_" + $scope.selectedPeriod.timePeriod + "_" + new Date().toLocaleDateString()+ ".xls";
	        }
	     // code by harsh
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
	
};