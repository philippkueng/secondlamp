var fs = require('fs');
var _ = require('underscore');
var hue = require('node-hue-api');

var HueApi = hue.HueApi;
var lightState = hue.lightState;

var hostname = "192.168.11.242",
    username = "newdeveloper",
    api;

api = new HueApi(hostname, username);

// converting the dataset that came from the website
// import it into MongoDB and export it again as a --jsonArray

// load the dataset
// var allData = JSON.parse(fs.readFileSync('output.json'));
var descData = JSON.parse(fs.readFileSync('tr-ft-gamedesc.json'));
var lastPossessingTeam = 1;

// debug
// var single = allData[100];
// console.log(single);

var getBall = function(tick) {
  var ball = _.find(tick.data, function(item) {
    return item.id === 5;
  });

  return ball;
};

var getPossessingTeam = function(tick) {

  var possessingPlayer = _.find(tick.data, function(item) {
    return item.poss === true;
  });
  if (typeof possessingPlayer !== 'undefined') {
    lastPossessingTeam = descData.player[possessingPlayer.id.toString()].team;
  }
  return lastPossessingTeam;

};

var calculateIntensity = function(tick) {
  // find out which team is currently in ball possession
  var ball = getBall(tick);
  var team = getPossessingTeam(tick);

  switch (team) {
    case 1:
      break;
    case 2:
      break;
    default:
      break;
  }

  return null;
};

// var index = 0;
// setInterval(function() {
//   var tickData = allData[index];
//   //calculateIntensity(tickData);
//   console.log(getPossessingTeam(tickData));

//   index += 1;
// }, 100);

// ----

var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

// connect to hue
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

var setState = function() {
  var state = lightState.create().on().rgb(red, green, blue).brightness(100);
  api.setLightState(3, state, function(err, lights) {
      if (err) throw err;
      displayResult(lights);
  });
};

setInterval(function() {
  setState();
}, 100);
