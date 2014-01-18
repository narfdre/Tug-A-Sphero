process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');
var Cylon = require('cylon')
        , MAX_SPEED = 60;

var Firebase = require('firebase');
var rootRef = new Firebase('https://tug-a-sphero.firebaseio.com/ballots/-JDX8SoPDXn2bFk9KiRN');




        
var util = require('util'),
    _ = require('lodash');
 

function spheroWorker(my){
          var s = my.sphero,
                  redCount = 0, 
                  blueCount = 0,
                  team = undefined
                  ;
          

        console.log("Connected...");
        s.setColor('green');
        s.setBackLED(100);

        function roll(data){
          var dir, speed;
          redCount = data['eastCount'];
          blueCount = data['westCount'];
          team = data['changed'];
          if(team == "eastCount"){
                  dir = 1;
                  speed = redCount - blueCount;
                  s.setColor('red');
          }else if(team == "westCount"){
                  dir = 181;
                  speed = blueCount - redCount;
                  s.setColor('blue');
          }else{
                  console.log("Unknown team ", team);
                  return;
          }

          if( redCount == blueCount ){
                  s.stop();
                  s.setColor('green');
                  return;
          }

          // speed = speed * 20;
          // if (speed > MAX_SPEED ) speed = MAX_SPEED;
          speed = 60;

          s.roll(speed, dir);
          console.log("Moving: ", dir);
        }

        rootRef.on('value', function(data){
          console.log(data.val());
          roll(data.val());
        });
};

Cylon.robot({
        connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/tty.Sphero-OYR-AMP-SPP' },
        device: {name: 'sphero', driver: 'sphero'},
        work: spheroWorker
}).start();