describe('Controllers', function(){
    // load the controller's module
    beforeEach(module('starter.controllers'));
    var $controller;
    

    beforeEach(inject(function(_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
  }));
    //test her
        describe('$scope.grade', function() {
    it('Tester om points er', function() {
      var $scope = {};
      var controller = $controller('starter.controllers', { $scope: $scope });
      $scope.points = [[3,7],[10,0],[8,2],[8,1],[10,0],[3,4],[7,0],[5,5],[3,2],[2,5]];
      expect($scope.newScore).toEqual(123);
    });
  });
});
   