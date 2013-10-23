'use strict';

describe('ngTodo controllers', function() {

  beforeEach(function() {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  describe('TodoCtrl', function() {
    var scope, $httpBackend, ctrl;
    var todosData = function() {
      return [
      {
        Name: 'Test 1',
        Status: false,
        _id: '111'
      },
      {
        Name: 'Test 2',
        Status: false,
        _id: '222'
      },
      {
        Name: 'Test 3',
        Status: true,
        _id: '333'
      }];
    };

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/todos').respond(todosData());
      
      scope = $rootScope.$new();
      ctrl = $controller('TodoCtrl', { $scope: scope });
    }))

    it ('should retrieve existing todos', inject(function($controller) {
      expect(scope.todos).toEqualData([]);
      $httpBackend.flush();

      expect(scope.todos).toEqualData(todosData());
    }));

    describe('methods', function() {

      var emptyTodo = { 
        Name: '',
        Status: false
      };

      var newTodo = {
        Name: '',
        Status: false,
        _id: '444'
      }

      beforeEach(inject(function($controller) {
        $httpBackend.flush();
      }));

      it ('should hold an empty todo', inject(function($controller) {
        expect(scope.newTodo).toEqualData(emptyTodo);
      }));

      it ('should add new todos', inject(function($controller) {
        $httpBackend.expectPOST('/todos').respond(newTodo);
        var newData = todosData();
        newData.push(emptyTodo);

        scope.addTodo();
        $httpBackend.flush();

        var todoFromServer = scope.todos[scope.todos.length - 1];
        expect(todoFromServer).toEqualData(newTodo);
      }));

      it ('should not add new todos if save fails', inject(function($controller) {
        $httpBackend.expectPOST('/todos').respond(400);

        scope.addTodo();
        $httpBackend.flush();

        expect(scope.todos).toEqualData(todosData());
      }));

      it ('should remove a todo', inject(function($controller) {
        $httpBackend.expectDELETE('/todos/222').respond('deleted');
        var newData = todosData();
        newData.splice(1, 1);

        scope.removeTodo(scope.todos, 1);
        $httpBackend.flush();

        expect(scope.todos).toEqualData(newData);
      }));
/*
      it ('should not remove a todo if save fails', inject(function($controller) {
        $httpBackend.expectPUT('/todos/222').respond(400);

        scope.removeTodo(1);
        $httpBackend.flush();

        expect(scope.todos).toEqualData(todosData());
      }));

      it ('should update a todo', inject(function($controller) {
        $httpBackend.expectPUT('/todos/222').respond('updated');

        // This isn't a great test because there is no check in the code if the 
        // request fails to revert...

        var newData = todosData();
        newData[1].Name = 'New Name';
        newData[1].Status = true;

        scope.updateTodo(newData[1]);
        $httpBackend.flush();

        expect(scope.todos).toEqualData(newData);
      }));

      it ('should not update a todo if save fails', inject(function($controller) {
        // TODO
      }));
*/
    });
  });
});