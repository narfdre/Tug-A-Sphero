process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util')
  , _ = require('lodash')
  , Cylon = require('cylon')
  , MAX_SPEED = 60 * 2
  , Firebase = require('firebase')
  , rootRef = new Firebase('https://tug-a-sphero.firebaseio.com/ballots/-JDX8SoPDXn2bFk9KiRN')
  , exec = require('child_process').exec;
  ;



function roll(data, sphero){
  var dir, speed,
    redCount = data['eastCount'],
    blueCount = data['westCount'],
    team = data['changed'],
    color = 'blue';

  if(team == "eastCount"){
    dir = 1;
    speed = redCount - blueCount;
  }else if(team == "westCount"){
    dir = 181;
    speed = blueCount - redCount;
  }else{
    console.log("Unknown team ", team);
    return;
  }

  if( redCount == blueCount ){
    sphero.stop();
    sphero.setColor('green');
  }else{

    color = redCount > blueCount ? 'red' : 'blue'; 
    sphero.setColor(color);

    // speed = speed * 20;
    // if (speed > MAX_SPEED ) speed = MAX_SPEED;
    speed = MAX_SPEED;
    sphero.roll(speed, dir);
    console.log("Moving: ", dir);
  }
}


function setup(sphero){
  Cylon.robot({
    connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/' + sphero},
    device: {name: 'sphero', driver: 'sphero'},
    work: function spheroWorker(my){
      var sphero = my.sphero;

      console.log("Connected...");
      sphero.setColor('green');
      sphero.setBackLED(100);

      rootRef.on('value', function(data){
        console.log(data.val());
        roll(data.val(), sphero);
      });
    }
  }).start();
}


function selectSphero(options){
  var result;
  switch(options.length){
    case 0:
      console.log("No sign of a sphero. Have you paired it?");
      return;

    case 1:
      console.log('Automatically selected ', options[0]);
      result = options[0];
      break;

    default:
      console.log('You had', options.length, 'options... maybe we might give you a menu to select from eventually?');
      // TODO give em an option...
      return;
  }

  setup(result);
}

exec('ls /dev | grep tty.Sph', function(err, result, stderr){ 
  selectSphero(result.trim().split('\n'));
});


