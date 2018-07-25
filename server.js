// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var imageDownloader = require('image-downloader');
var fs = require('fs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


// for each node restart
// 1. get index.html and style.css
// 2. parse code for broken image links
// 3. for each image link, download
/*
  
  var promiseArray = [];

html brokenurls from new RegExp('src="\/web.*?"', 'ig')
css brokenurls from new RegExp('url(/web/.*?)', 'ig')

// brokenURL, hotlinkURL ('https://web.archive.org/' + brokenURL)
  var dest = './public/images';
  
  // iterated through index.html and then style.css
  // for each brokenURL...
    promiseArray.push( imageDownloader.image({ url: hotlinkURL, dest})
      .then(({filename, image}) => {
        // replace brokenURL in index.html or style.css with glitchURL ('/images/' + filename)
      });
    )
  
  // when all the promises in that for/each are done
  Promise.all( promiseArray )
    .then( () => {
      // rewrite index.html and style.css
    });

*/

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
