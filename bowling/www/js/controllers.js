angular.module('starter.controllers', [])
.controller('BowlingController', function($scope, $http) {
  //Jeg starter med at lave programmet offline med statisk data, se venligst $scope.getData scopet.
  //API get og post requests kommer først i bunden af controller.js
  $scope.dummydatas = [
        {
        "points":[[3,7],[10,0],[8,2],[8,1],[10,0],[3,4],[7,0],[5,5],[3,2],[2,5]],
        "token":"9ndP4Vkv5U91INRNNcA4VJrbLpowC4vh",
        "totalpoints":"123 placeholder", // "points":[[5,4],[10,0],[8,0],[5,5],[2,7],[10,0],[5,2],[10,0],[1,6]],
        },];
        

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
    //hvis Get requestet ender godt!
        .success(function(data) {
            framePoints = $scope.points = data.points;
            $scope.token = data.token;
            $scope.beregnScore = "Læg alle points sammen selv din dovne hund! Det er gas, her er resultatet :P"; // Bad Joke the best kind of joke
            $scope.newScore = 0 // score bliver sat til nul i tilfælde af at man trykker på knappen flere gange
            $scope.sumPoints = [];
            console.log($scope.points)


// Skriv alle runder ud og beregn alle points
angular.forEach(framePoints, function(framePoints, key)
    {
     console.log(key + ': ' + framePoints);
      //bliver brugt til at regne bonus points ud senere
      
      if(data.points[key] == null){
        denneRunde = 0
      }else{
        denneRunde = data.points[key]
      }
      if(data.points[key+1] == null){
        næsteRunde = 0
      }
      else{
        næsteRunde = data.points[key+1]
      }
      if(data.points[key+2] == null){
        næsteNæsteRunde = 0
      }
      else{
        næsteNæsteRunde = data.points[key+2]
      }
      
      console.log("runde",key+1,": ", denneRunde[0],",",denneRunde[1])
        //hvis det er en strike
        //strike lægger næste 2 skud oven i scoren
        if(denneRunde[0] == 10)
        {
          console.log("Resultatet for runden ","er en Strike! :D")
          //hvis det er sidste skud i serien eller de næste to skud ikke giver nogen points
          if(data.points[key+1] == null || data.points[key+1][0] + data.points[key+1][1] == 0)
          {
            $scope.newScore = $scope.newScore + 10;
          }
          else
          {
            //lav et check om de næste to skud er strikes
            console.log("strike på strike?")
            if(næsteRunde[0] == 10)//data.points[key+1]//[0]
            {
              //tre strikes i træk/næste to er strikes
              if(næsteNæsteRunde[0] == 10)//data.points[key+2]//[0]
              {
                $scope.newScore = $scope.newScore + 10 + næsteRunde[0] + næsteNæsteRunde[0];
              }
              //to strikes i træk
              else
              {
                $scope.newScore = $scope.newScore + 10 + næsteRunde[0];
              }
            }
            else
            {
              $scope.newScore = $scope.newScore + 10 + næsteRunde[0]+næsteRunde[1];
            }
          }
        }
        else
        {
          //hvis det er en spare
          //spare lægger bonus af det næste skud, oven i. 
          if(denneRunde[0] + denneRunde[1] == 10)
          {
            console.log("Resultatet for runden ","er en Spare! :)")
            if(data.points[key+1] == null || data.points[key+1] == 0)
            {
              $scope.newScore = $scope.newScore + 10;
            }
            else
            {
              $scope.newScore = $scope.newScore + 10 + næsteRunde[0];
            }
          }
          else // hvis det er et miss e.g hverken en strike eller en spare
          {
            missPointCalculate = denneRunde[0] + denneRunde[1]
            console.log("Resultatet for runden ","er et miss :(", missPointCalculate,
            " points scoret")
            $scope.newScore = $scope.newScore + missPointCalculate;
          }
        }
        scoreToInt = parseInt($scope.newScore);
        $scope.sumPoints.push(scoreToInt)
        console.log("Total score er nu: ",$scope.sumPoints[key])
        
     });//for each løkke slut
console.log($scope.sumPoints);//skal gøre noget ved sidste rude i tilfælde af 3 strikes eller en strike og en spare

          //Post request her:
          //http://stackoverflow.com/questions/19254029/angularjs-http-post-does-not-send-data

          $http({
                  url: 'http://95.85.62.55/api/points',
                  method: "POST",
                  data: { 'token' : $scope.token,'points' : $scope.sumPoints }
                })
                .success(function(data, status, headers, config)
                {
                  $scope.successQuestion = data.success
                  console.log("Rigtigt resultat: ",$scope.successQuestion)
                })
                .error(function(data, status, headers, config)
                {
                alert.log("error")
                });

            })// hvis get requestet ikke ender godt
            .error(function(data) {
                alert("ERROR");
            });
    }

 
});

