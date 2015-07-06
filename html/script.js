'use strict';

angular.module('app', ['ui.router'])

.controller('TableCtrl', function($scope, TableService){
  var loadTable = function(){
    TableService.getAllData()
    .success(function(data){
      $scope.data = data;
      $scope.headers = Object.keys(data[0]);
    })
    .catch(function(error){
      console.log(error);
    });
  }
  loadTable();

  $scope.CellColor = {
    'Yes': 'green',
    'No': 'red',
    'Partial': 'orange'
  };
  $scope.highlight = function(col, row){
    if(this.column !== 'Feature/Engine'){
      $scope.colHover = col;
    }
    $scope.rowHover = row;
  }
  $scope.resetHighlighting = function(){
    $scope.rowHover = false;
    $scope.colHover = false;
  }
})
.factory('TableService', function($http){
  return {
    getAllData: function(){
      return $http.get('http://localhost:3000/data');
    }
  };
});
