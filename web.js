var Hapi = require('hapi');

var server = new Hapi.Server(
  process.env.HOST || '0.0.0.0',
  parseInt(process.env.PORT || 5000), {
    cors: true
});

server.route({
  method: 'POST',
  path: '/',
  handler: function(request, reply) {
    console.log(request.payload);
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
