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
  var newHTML = '';
  var newCSS = '';

  fs.readFile('./views/index.html', function(err, data) {
    data = data.toString();
    var htmlBrokenURLs = data.match(new RegExp(/src="\/web.*?"/, 'ig'))
    if (htmlBrokenURLs != null) {
      for (var i = 0; i < htmlBrokenURLs.length; i++) {
        var justURL = htmlBrokenURLs[i].slice(5,-1); // slice removes src=" and "
        promiseArray.push(imageDownloader.image({ url: 'https://web.archive.org'+justURL, dest})
        .then(({filename, image}) => {
          data = data.replace(justURL, filename);
          console.log(htmlBrokenURLs.length);
          console.log('html ', i);
        }))
      }
      newHTML = data;
    }
  });

  fs.readFile('./public/style.css', function(err, data) {
    data = data.toString();
    var cssBrokenURLs = data.match(new RegExp(/url\(\/web.*?\)/, 'ig')) 
    if (cssBrokenURLs != null) {
      for (var i = 0; i < cssBrokenURLs.length; i++) {
        var justURL = cssBrokenURLs[i].slice(4,-1); // slice removes url( and )
        promiseArray.push(imageDownloader.image({ url: 'https://web.archive.org'+justURL, dest})
        .then(({filename, image}) => {
          data = data.replace(justURL, filename);
          console.log('css ', i);
        }))
      }
      newCSS = data;
    }
  });

  // when all the promises in that for/each are done
  Promise.all( promiseArray )
    .then( () => {
    fs.writeFile('./views/index.html', newHTML);
    fs.writeFile('./public/style.css', newCSS);
      // rewrite index.html and style.css
    });


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
