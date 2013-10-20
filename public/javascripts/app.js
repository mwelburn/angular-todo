var ngTodo = angular.module('ngTodo', []);

function todoCtrl($scope, $rootScope, $http)
{
  $http.get('todos').success(function(data)
  {
    $scope.todos = data;
  });

  $scope.addTodo = function(array)
  {
    $scope.todos.push(
    {
      'Name': '',
      'Status': false
    });
  }

  $scope.removeTodo = function(array, index)
  {
    $scope.todos.splice(index, 1);
  }
};