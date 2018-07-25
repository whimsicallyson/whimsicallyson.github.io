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

fs.readFile('./views/index.html', function(err, data) {
  data = data.toString();
  var htmlBrokenURLs = data.match(new RegExp(/src="\/web.*?"/, 'ig'))
  for (var i = 0; i < htmlBrokenURLs.length; i++) {
    promiseArray.push(imageDownloader.image({ url: 'https://web.archive.org'+htmlBrokenURLs[i].slice(5,-1), dest})
    .then(({filename, image}) => {
      var result = data.replace(htmlBrokenURLs[i], filename); // this isn't quite right
      console.log(filename);
      fs.writeFile('./views/index.html', result);
    }))
  }
});

fs.readFile('./public/style.css', function(err, data) {
  data = data.toString();
  var cssBrokenURLs = data.match(new RegExp(/url\(\/web.*?\)/, 'ig')) 
  for (var i = 0; i < cssBrokenURLs.length; i++) {
    promiseArray.push(imageDownloader.image({ url: 'https://web.archive.org'+cssBrokenURLs[i].slice(4,-1), dest})
    .then(({filename, image}) => {
      var result = data.replace(cssBrokenURLs[i], filename);
      //console.log(result);
      fs.writeFile('./public/style.css', result);
    }))
  }
});

 // haven't touched this part yet 
  // when all the promises in that for/each are done
  Promise.all( promiseArray )
    .then( () => {
      // rewrite index.html and style.css
    });


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
