// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var fs = require('fs');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/resume', function(request, response) {
  var data = response.sendFile('https://cdn.glitch.com/32451e03-57c0-4098-8fc0-2c75d9c7dea0%2FAllyson%20Lubimir%20Resume.pdf?v=1565748016876');
  response.contentType("application/pdf");
  response.send(data);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
