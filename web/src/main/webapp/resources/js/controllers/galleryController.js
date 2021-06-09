var app = angular.module( 'galleryApp', [] )
.config( ['$compileProvider',
    function( $compileProvider )
    {   
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
]);
app.controller('GalleryController', ['$scope', '$http', function($scope, $http){
		/**
		 * 
		 * @author Suman Saurav Das
		 */
		$scope.imagenotavailable =false;
		$scope.pageName = "Photo Gallery";
		$scope.imageGalleryList = [];
		$scope.sortReverse=true;
		$scope.loadImageGallery = function(){
			$("#loader-mask").show();
		
			$http.get("getGalleryImages").then(function(result) {
				$scope.imageGalleryList = result.data;			
				$("#loader-mask").fadeOut();
				if(!$scope.imageGalleryList.length>0){
					$scope.imagenotavailable = true;
				}
			});
			
		};
		$scope.loadImageGallery();
		$scope.openImage = function(){
			
			
		};
		
		$(".open_fancybox").click(function() {
		    
		    $.fancybox.open($scope.imageGalleryList);
		});
		/**
		 * ----------------------------
		 * @author Sourav  Nath
		 * ----------------------------
		 */
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
	}]);