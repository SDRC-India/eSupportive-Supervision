// Pagination by @Devikrushna
myAppConstructor.controller('PaginationController', PaginationController);
function PaginationController($scope) {
  $scope.pageChangeHandler = function(num) {
    console.log('going to page ' + num);
  };
}
 