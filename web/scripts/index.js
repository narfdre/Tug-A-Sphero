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
    
    $scope.ballots = $firebase(ballotData);
    
    $scope.addBallot = function(ballot){
        ballot.eastCount = 0;
        ballot.westCount = 0;
        $scope.ballots.$add(ballot);
    };
    
    $scope.addVote = function(ballot, team){
        ballot[team]++;
        $scope.ballots.$save();
    }
}