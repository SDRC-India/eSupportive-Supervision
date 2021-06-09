/**
 * @author Suman Saurav Das
 */

angular.module('VideoGalleryApp', [])

	.controller('VideoGalleryController', ['$scope', '$http', function($scope, $http){
		/**
		 *
		 * @author Suman Saurav Das
		 */
		$scope.sortReverse = true;
		$scope.pageName = "Video Gallery";
		$scope.getVideoId=function(url){
			  var urlId = '';
			  url =  url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
			  if(url[2] !== undefined) {
				  urlId = url[2].split(/[^0-9a-z_\-]/i);
				  urlId = urlId[0];
			  }
			  else {
				  urlId = url;
			  }
			  return urlId;
		};
		$scope.videonotavailable = false;
		$scope.videoGalleryList=[];
		$scope.loadImageGallery = function(){
			$("#loader-mask").show();
			$http.get("getVideoGallery").then(function(result) {
				$scope.videoList = result.data;
		        angular.forEach($scope.videoList,function(value,keys){
                    var videoUrl=$scope.getVideoId(value.videoUrl);
					$scope.videoGalleryList.push({title:value.title,videoUrl:videoUrl});
				});

				$("#loader-mask").fadeOut();
				if(!$scope.videoGalleryList.length>0){
					$scope.videonotavailable = true;
				}
				
			});
		};
		$scope.loadImageGallery();
		$scope.playVideo = function(obj){
			$("#loader-mask").show();
			$('#caption').html(obj.title)
			var url ="//www.youtube.com/embed/"+obj.videoUrl+"?enablejsapi=1";
			$("#myModal").modal("show");
	 		$("#myModal").find("iframe").attr("src", url);
	 		$("#loader-mask").fadeOut();
		};
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
	}])