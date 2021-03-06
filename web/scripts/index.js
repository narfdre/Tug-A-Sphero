var Sphero = angular.module('Sphero', ['firebase']);

//Sphero.controller("BallotController", ['$scope', '$firebase', function($scope, $firebase){
//    var ballotData = new Firebase('https://tug-a-sphero.firebaseio.com/ballots');
//    
////    $scope.ballots = $firebase(ballotData);
//    
//    $scope.addBallot = function(ballot){
//        $scope.ballots.$add(ballot);
//    };
//}]);

function BallotController($scope, $firebase, $log){
    var ballotData = new Firebase('https://tug-a-sphero.firebaseio.com/ballots');
    $scope.disabled = {
        eastCount: false,
        westCount: false
    }
    $scope.ballots = $firebase(ballotData);
    
    $scope.addBallot = function(ballot){
        ballot.eastCount = 0;
        ballot.westCount = 0;
        $scope.ballots.$add(ballot);
    };
    
    $scope.addVote = function(ballot, team){
        $scope.disabled[team] = true;
        ballot[team]++;
        ballot.changed = team;
        $scope.ballots.$save();
        setTimeout(function(){
            $scope.disabled[team] = false;
            $scope.$apply();
        }, 500);
    }
}