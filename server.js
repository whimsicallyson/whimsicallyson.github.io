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

  
  var promiseArray = [];
  var dest = './public/images';

//html brokenurls from new RegExp('src="\/web.*?"', 'ig')
//css brokenurls from new RegExp('url(/web/.*?)', 'ig')
fs.readFile('./views/index.html', function(err, data) {
  data = data.toString();
  var htmlBrokenURLs = data.match(new RegExp('src="\/web.*?"', 'ig'))
  for (var i = 0; i < htmlBrokenURLs.length; i++) {
    promiseArray.push(imageDownloader.image({ url: 'https://web.archive.org'+htmlBrokenURLs[i].slice(4,-1), dest})
    .then(({filename, image}) => {
      var result = data.replace(/htmlBrokenURLs[i]/, dest + filename);
      console.log(result);
      fs.writeFile('./views/index.html', result);
    }))
  }
});

fs.readFile('./public/style.css', function(err, data) {
  data = data.toString();
  var cssBrokenURLs = data.match(new RegExp('url(/web/.*)', 'ig'))
  // url(/web/20080831213231im_/http://www.fogcreek.com/FogBugz/i/screen/open-quote.gif) 
  for (var i = 0; i < cssBrokenURLs.length; i++) {
    promiseArray.push(imageDownloader.image({ url: 'https://web.archive.org'+cssBrokenURLs[i], dest}))
    .then(({filename, image}) => {
      var result = data.replace(/cssBrokenURLs[i]/, dest + filename);
      console.log(result);
      fs.writeFile('./public/style.css', result);
    })
  }
});
/*
// brokenURL, hotlinkURL ('https://web.archive.org/' + brokenURL)
  
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
