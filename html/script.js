'use strict';

angular.module('app', ['ui.router'])
.config(function($urlRouterProvider, $stateProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/table');

  $stateProvider
  .state('table', {
    url: '/table',
    templateUrl: 'table.html',
    controller: 'TableCtrl'
  })
  .state('table.activeRow', {
    url: '/table/:row',
    templateUrl: 'table.html',
    controller: 'TableCtrl'
  });
})
.controller('TableCtrl', function($scope, $state, TableService){
  var loadTable = function(){
    TableService.getAllData()
    .success(function(data){
      $scope.data = data;
      $scope.headers = Object.keys(data[0]);
      $scope.CellColor = TableService.CellColor;
    })
    .catch(function(error){
      console.log(error);
    });
  }
  loadTable();

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

  $scope.setActiveRow = function(row){
    return $scope.activeRow = row;
  }

  $scope.isActiveRow = function(row){
    return $scope.activeRow === row;
  }
})
.factory('TableService', function($http){
  return {
    getAllData: function(){
      return $http.get('/data');
    },
    CellColor: {
      'Yes': 'green',
      'No': 'red',
      'Partial': 'orange'
    }
  };
});
