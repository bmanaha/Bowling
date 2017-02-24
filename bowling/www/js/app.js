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
  //Jeg starter med at lave programmet online med statisk data fra arrayet neden under, for at teste inden jeg laver get request.
  //API get og post requests kommer først i bunden af app.js
  $scope.dummydatas = [
        {
        "points":[[3,7],[10,0],[8,2],[8,1],[10,0],[3,4],[7,0],[5,5],[3,2],[2,5]],
        "token":"9ndP4Vkv5U91INRNNcA4VJrbLpowC4vh",
        "totalpoints":"123 placeholder", // "points":[[5,4],[10,0],[8,0],[5,5],[2,7],[10,0],[5,2],[10,0],[1,6]],
        },];//
  
  $scope.test = function() {
    $scope.newscore = 0
    //this is the entire points array in the dummydatas array, seen above
      framePoints = $scope.dummydatas[0].points //scope.

    //print alle runder ud
    points = $scope.dummydatas[0].points
    angular.forEach(points, function(points, key)
    {
     console.log(key + ': ' + points);

       //recognize strike
      rundeSomSkalTestes = framePoints[key]
      næsteRunde = framePoints[key+1] //spare lægger bonus af det næste skud, oven i. strike lægger næste 2 skud oven i scoren

      console.log("runde",key+1,": ", rundeSomSkalTestes[0],",",rundeSomSkalTestes[1])
        //hvis det er en strike
        if(rundeSomSkalTestes[0] == 10)
        {
          console.log("Resultatet for runden ","er en Strike! :D")
          $scope.newscore = $scope.newscore + 10 + framePoints[key+1][0]+framePoints[key+1][1];
          console.log("total score er:",$scope.newscore)
        }
        else
        {
          //hvis det er en spare
          if(rundeSomSkalTestes[0] + rundeSomSkalTestes[1] == 10)
          {
            console.log("Resultatet for runden ","er en Spare! :)")
            $scope.newscore = $scope.newscore + 10 + framePoints[key+1][0];
            console.log("total score er:",$scope.newscore)
          }
          else // hvis det er et miss e.g hverken en strike eller en spare
          {
            missPointCalculate = rundeSomSkalTestes[0] + rundeSomSkalTestes[1]
            console.log("Resultatet for runden ","er et miss :(", missPointCalculate,
            " points scoret")
            $scope.newscore = $scope.newscore + missPointCalculate;
            console.log("total score er:",$scope.newscore)

          }
        }

    });
    



}

 //get request begynder her
 //https://www.thepolyglotdeveloper.com/2014/08/make-http-requests-android-ios-ionicframework/

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

 
});

