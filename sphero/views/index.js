var Sphero = angular.module('sphero', ['firebase']);

function BallotController($scope, $firebase, $http){
    var ballotData = new Firebase('https://tug-a-sphero.firebaseio.com/ballots/-JDX8SoPDXn2bFk9KiRN');
    
    $scope.ballot = $firebase(ballotData);
    
    
}