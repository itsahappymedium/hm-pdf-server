// Libraries
var Express = require('express');

// Config
var config = require('./config/config.json');

// Constants
var SERVER_PORT = process.env.port || config.port,
    APP_VERSION = require('./package.json').version;

// Server Setup
var server = Express();
server.set('view engine', 'handlebars');
server.use(Express.static(process.cwd() + '/public'));

// Router
server.use('/pdf', require('./router'));

// Start the server / fire ze missiles!
server.listen(SERVER_PORT, function(){
  console.log('HM PDF Generator Server started');
  console.log('Current version: ' + APP_VERSION);
  console.log('Server listening on port ' + SERVER_PORT);
  console.log('May the Force be with you');
});
