// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('BowlingController', function($scope, $http) {
  $scope.dummydatas = [
        {
        "points":[[5,4],[10,0],[8,0],[5,5],[2,7],[10,0],[5,2],[10,0],[1,6]],
        "token":"9ndP4Vkv5U91INRNNcA4VJrbLpowC4vh",
        },];

  $scope.test = function() {
//this is the entire points array in the dummydatas array, seen above
  framePoints = $scope.dummydatas[0].points //scope.
//logs round one scores in array form
    console.log(framePoints[0]);
    console.log("Round 1 shot 1: ",framePoints[0][0],"pins down. Round 1 shot 2: ",framePoints[0][1]," pins down");
//score is calculated
  roundOne = framePoints[0][0] + framePoints[0][1]
    console.log("points: ", roundOne)

//recognize strike
console.log("write out specific round and determine if it is a strike or spare")
rundSomSkalTestes = framePoints[0] //3 = spare, 1 = strike, 0 = miss
console.log("test runden", rundSomSkalTestes, "om det er en strike eller spare")
  if(rundSomSkalTestes[0] == 10)
  {
    console.log("Det er en Strike! :D")
  }
  else
  {
    if(rundSomSkalTestes[0] + rundSomSkalTestes[1] == 10)
    {
      console.log("Det er en Spare! :)")
    }
    else
    {
    console.log("hverken en strike eller en spare :(",
    rundSomSkalTestes[0] + rundSomSkalTestes[1] ,
    "point scoret")
    }
  }


}

 //get request
 //https://www.thepolyglotdeveloper.com/2014/08/make-http-requests-android-ios-ionicframework/
/*
    $scope.getData = function() {
        $http.get("http://95.85.62.55/api/points", { params: { "key1": "value1", "key2": "value2" } })
            .success(function(data) {
                $scope.points = data.points;
                $scope.token = data.token;
                $scope.score = "læg alle points sammen selv din dovne hund :P"; //fortsæt her
                //console.log($scope.points)
            })
            .error(function(data) {
                alert("ERROR");
            });
    }
*/
 
});

