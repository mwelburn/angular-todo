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
        Status: false
      },
      {
        Name: 'Test 2',
        Status: false,
      },
      {
        Name: 'Test 3',
        Status: true
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
  });
});