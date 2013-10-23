var ngTodo = angular.module('ngTodo', []);

function TodoCtrl($scope, $rootScope, $http)
{
  $scope.todos = [];

  // Initialize with existing items in the database
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
      console.log('created');
      $scope.todos.push(data);  
    }).error(function(data)
    {
      console.log('Error creating: ' + data);
    });
  };

  $scope.removeTodo = function(array, index)
  {
    var todo = $scope.todos.splice(index, 1);
    $http.delete('todos/' + todo[0]._id).success(function(data)
    {
      console.log('deleted');
    }).error(function(data)
    {
      console.log('Error deleting: ' + data);
    });
  };

  // Currently this is called on every keypress
  $scope.update = function(todo)
  {
    $http.put('/todos/' + todo._id, todo).success(function(data)
    {
      console.log('updated');
    }).error(function(data)
    {
      console.log('Error saving: ' + data);
    });
  };
};