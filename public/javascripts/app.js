var ngTodo = angular.module('ngTodo', []);

function todoCtrl($scope, $rootScope, $http)
{
  $http.get('/todos').success(function(data)
  {
    $scope.todos = data;
  });

  $scope.newTodo = {
    Name: '',
    Status: false
  }

  $scope.addTodo = function(array)
  {
    $http.post('/todos', $scope.newTodo).success(function(data)
    {
      //TODO
      $scope.todos.push(data.todo);  
    });
  };

  $scope.removeTodo = function(array, index)
  {
    var todo = $scope.todos.splice(index, 1);
    $http.delete('todos/' + todo._id).success(function(data)
    {
      console.log('deleted');
    }).error(function(data)
    {
      console.log('Error deleting: ' + data);
    });
  };

  $scope.update = function(todo)
  {
    $http.put('/todos/' + todo._id, todo).success(function(data){
      //TODO
      console.log(data);
    });
  };
};