var Hapi = require('hapi');
var _ = require('underscore');
var hue = require('node-hue-api');

/* HUE PART */

var HueApi = hue.HueApi;
var lightState = hue.lightState;

var hostname = "192.168.11.242",
    username = "newdeveloper",
    api;

api = new HueApi(hostname, username);

var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

api.connect(function(err, config) {
    if (err) throw err;
    displayResult(config);
});

api.lights(function(err, lights) {
    if (err) throw err;
    displayResult(lights);
});

var red = 255;
var green = 255;
var blue = 255;
var brightness = 100;

var setState = function() {
  var state = lightState.create().on().rgb(red, green, blue).brightness(brightness);
  api.setLightState(3, state, function(err, lights) {
      if (err) throw err;
      displayResult(lights);
  });
};

/* SERVER PART */

var server = new Hapi.Server(
  process.env.HOST || '0.0.0.0',
  parseInt(process.env.PORT || 5000), {
    cors: true
});

server.route({
  method: 'POST',
  path: '/',
  handler: function(request, reply) {
    // console.log(JSON.parse(request.payload));
    // console.log(request.payload);
    console.log(JSON.parse(request.payload));
    // var ball = _.find(JSON.parse(request.payload).data, function(item) {
    //   return item.id === 5;
    // });

    // // ballX
    // // console.log(ball);

    // if (ball.x < 0) {
    //   red = Math.abs(ball.x / 55 * 255);
    //   green = red;
    //   blue = 255;
    // } else {
    //   red = 255;
    //   green = Math.abs(ball.x / 55 * 255);
    //   blue = green;
    // }
    
    // var brightness = Math.abs(ball.y / 35 * 100);
    // setState();
    reply('thanks');
  }
});

// Start the server

server.start(function() {
  console.log('Server started at ' + server.info.uri);

  server.settings.uri = process.env.HOST ? 
    'http://' + process.env.HOST + ':' + process.env.PORT : 
    server.settings.uri;
  console.log('Server.settings.uri: ' + server.settings.uri);
});
