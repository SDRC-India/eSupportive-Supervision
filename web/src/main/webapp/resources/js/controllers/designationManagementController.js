/**
 * @author Devikrushna Nanda (devikrushna@sdrc.co.in)
 * @author Pratyush Kumar Rath (pratyush@sdrc.co.in)
 */

		function degMgmtController($scope, $http, $filter ,$timeout, $window,$compile) {
			
			// Pagination by @Devikrushna
			 	$scope.currentPage = 1;
			    $scope.pageSize = 100;

			    $scope.pageChangeHandler = function(num) {
			       console.log('Pagination call ' + num);
			    };
			// End Pagination by @Devikrushna
			    
			$scope.pageName = "Designation Management";
			$scope.activeMenu = "designationManagement";
			$scope.filterDesTableData = [];
			$scope.sortReverse = true; 
			$scope.addDesignationDiv = false;
			$scope.addbtn = false;
			$scope.facilityDiv = false;
			$scope.statediv = false;
			var loginMsg = "Please login to access this page.";
			$scope.facility = {
				selected : false
			};
			$scope.community = {
				selected : false	
			};
			$scope.facilityInCharge = {
					selected : false
			};
			$scope.orgDisabled = true;
			$scope.stateDisabled = true;
			$scope.degDisabled = true;
			$scope.organizations = [];
			
			$scope.selectLevel = function(level) {
				$scope.organizations = [];
				$scope.stateDisabled = false;
				$scope.orgDisabled = false;
				$scope.degDisabled = true;
				$scope.selectedOrganization = null;
				$scope.designationName = undefined;
				$scope.selectedState = undefined;
				$scope.facility.selected = undefined;
				$scope.community.selected = undefined;
				$scope.facilityInCharge.selected = undefined;
				
				$scope.selectedLevel = level;
				if(((level.role_id==2 && $scope.is_country_admin) || level.role_id==4 || level.role_id==5 || level.role_id==8)
						&& !$scope.is_state_admin){
					$scope.statediv = true;
					$scope.orgDisabled = true;
				}
				else{
					$scope.statediv = false;
					$scope.selectedState = null;
				}
				for(var i=0; i<$scope.desigMgmtForm.o_for_d_model.length; i++){
					$scope.organizations.push($scope.desigMgmtForm.o_for_d_model[i]);
				}
				
			};

			$scope.selectState = function(state) {
				$scope.organizations = [];
				$scope.orgDisabled = false;
				$scope.degDisabled = true;
				$scope.selectedState = state;
				$scope.selectedOrganization = undefined;
				$scope.designationName = undefined;
				for(var i=0; i<$scope.desigMgmtForm.o_for_d_model.length; i++){
					$scope.organizations.push($scope.desigMgmtForm.o_for_d_model[i]);
				}
			};
			
			$scope.selectOrganization = function(organization){
				$scope.selectedOrganization = organization;
				$scope.degDisabled = false;
				$scope.designationName = undefined;
				$scope.facility.selected = undefined;
				$scope.community.selected = undefined;
				$scope.facilityInCharge.selected = undefined;
			};
			
			$scope.addDesignation = function() {
				$scope.addDesignationDiv = true;
				$scope.addbtn = true;
			};
			
			// filter table by @Devikrushna
			$scope.filterData = function(tableFilterWord){
				 $scope.currentPage = 1;
				    $scope.pageSize = 100;
				 $scope.pageChangeHandler = function(num) {
				       console.log('Pagination call ' + num);
				    };

				};
				//end filter table by @Devikrushna	 
				
			var designations = [];
			$("#loader-mask").show();
			$http.get("designation").then(function(result){
				if(result.data != "")
					$scope.desigMgmtForm = result.data;
				
				console.log($scope.desigMgmtForm);
				
				$scope.designationTableData = $scope.desigMgmtForm.designationMangementTableModel;
				 $scope.filterDesTableData = $scope.designationTableData;
				//$("#loader-mask").fadeOut();
				$scope.is_state_admin = result.data.stateAdmin;
				$scope.is_country_admin = result.data.countryAdmin;
				
				if($scope.is_state_admin)
					$scope.userLevel = result.data.role_state;
				else if($scope.is_country_admin)
					$scope.userLevel = result.data.role_country;
					
				$scope.states = $scope.desigMgmtForm.states;
				
				for(var i=0; i<$scope.desigMgmtForm.d_for_d_model.length; i++){
					designations.push($scope.desigMgmtForm.d_for_d_model[i].designation_name);
				}
					$("#loader-mask").fadeOut();
				
			},function(error){
				//console.log(error);
				$("#loader-mask").fadeOut();
				$scope.errorMsg = loginMsg;
				$('#errorMessage').modal('show');
			});
			
			$("#designationId").autocomplete({
			    source: designations
			});
			
			
			
			var designationObj = {};
			$scope.addNewDesignation = function(){
				if($scope.selectedLevel == undefined){
					$scope.errorMsg = "Please select User Level";
					$('#errorMessage').modal('show');
				}
				else if((($scope.selectedState == undefined && $scope.selectedLevel.role_id != 2 && $scope.is_state_admin)
						|| ($scope.selectedState == undefined && $scope.selectedLevel.role_id != 1 && $scope.is_country_admin))
						&& $scope.statediv){
					$scope.errorMsg = "Please select State";
					$('#errorMessage').modal('show');
				}
				else if($scope.selectedOrganization == undefined){
					$scope.errorMsg = "Please select Organization";
					$('#errorMessage').modal('show');
				}
				else if($scope.designationName == undefined || $scope.designationName == ""){
					$scope.errorMsg = "Please enter Designation";
					$('#errorMessage').modal('show');
				}else{
					$("#loader-mask").show();
					designationObj.organizationId = $scope.selectedOrganization.organization_id;
					if(($scope.is_country_admin && ($scope.selectedState == null || $scope.selectedState == undefined)||
							$scope.is_state_admin))
						designationObj.areaNId = $scope.desigMgmtForm.area.areaNId;
					else		
						designationObj.areaNId = $scope.selectedState != null ?  $scope.selectedState.areaNId : null;
					
					designationObj.roleId = $scope.selectedLevel.role_id;
					designationObj.designationName = $scope.designationName;
					designationObj.isResponsibleFacility = $scope.facility.selected;
					designationObj.isResponsibleCommunity = $scope.community.selected;
					designationObj.isFacilityInCharge = $scope.facilityInCharge.selected;
					console.log(designationObj);
					$http.post('saveDesignation', designationObj).
					then(function(response){
						if(response.status == 200){
							$scope.errorMsg = response.data.errorMessage;
							if(response.data.errorMessage == "Designation already exists!"){
								$('#errorMessage').modal('show');
							}
							else if(response.data.errorMessage == "Designation added successfully"
									|| response.data.errorMessage == "Designation updated successfully"){
								$('#pop').modal('show');
							}
							$http.get("designation").then(function(result){
								if(result.data != "")
									$scope.designationTableData = result.data.designationMangementTableModel;
							});
							$("#loader-mask").fadeOut();
						}
					},function(error){
						$("#loader-mask").fadeOut();
						$scope.errorMsg = "Server Error. Please contact admin.";
						$('#errorMessage').modal('show');
						console.log(error);
					});
				}
			};
			$scope.closeModal = function(){
				$("#errorMessage").modal("hide");
				 if($scope.errorMsg == "Please select User Level"){
					 document.getElementById('userlevel').focus();
				 } else if($scope.errorMsg == "Please select State"){
					 document.getElementById('state').focus();
				 } else if($scope.errorMsg == "Please select Organization"){
					 document.getElementById('org').focus();
				 }else if($scope.errorMsg == "Please enter Designation"){
					 document.getElementById('designationId').focus();
				 }else if($scope.errorMsg == loginMsg){
					 $window.location='home';
				 }
			};
			
	//------------------------Sorting  @Devi-----------------------------		
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
		      
		      $scope.resetDiv = function () {
		          $window.location.reload();
		      };
			
};



