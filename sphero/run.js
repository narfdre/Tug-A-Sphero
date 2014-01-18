var express = require('express'),
    http    = require('http'),
    path    = require('path');

var app = express();

// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: "jared's mom" }));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.errorHandler());

//Main Routes
app.get('/', function(req, res){
    res.send("hello");
});

//Start Server
http.createServer(app).listen(3003, function(){
    console.log('server started on port 3003');
});

process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');
var Cylon = require('cylon')
        , MAX_SPEED = 60;




        
var util = require('util'),
    _ = require('lodash');
 
var TEAMS = {
  'red' : 0,
  'blue' : 0
}



function spheroWorker(my){
          var s = my.sphero,
                  redCount = 0, 
                  blueCount = 0
                  ;
          

        console.log("Connected...");
        s.setColor('green');
        s.setBackLED(100);

        function roll(team){
                var dir, speed;
                redCount = TEAMS['red'];
                blueCount = TEAMS['blue'];
                if(team == "red"){
                        dir = 1;
                        speed = redCount - blueCount;
                        s.setColor('red');
                // }else{
                }else if(team == "blue"){
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
                // }else if(redCount > blueCount){
                }

                // speed = speed * 20;
                // if (speed > MAX_SPEED ) speed = MAX_SPEED;
                speed = 60;

                s.roll(speed, dir);
                console.log("Moving: ", dir);
        }

        function countTeam(item){
                  if (!item.text) return;
                 
                  console.log(item.text);
                 
                  var matches = item.text.match(COLORS);
                  var uniq;
                  var team;
                 
                  if (matches && matches.length){
                    var uniq = _.uniq(matches, function(team){ return team.toLowerCase(); })
                    var team = uniq.length && uniq[0];
                    var count = TEAMS[team];
                 
        
                          console.log('TEAMS', TEAMS);
        
                          roll(team);
                    TEAMS[team] = count + 1;
                  }
                 
        }

};

Cylon.robot({
        connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/cu.Sphero-WGR-AMP-SPP' },
        device: {name: 'sphero', driver: 'sphero'},
        work: spheroWorker
}).start();