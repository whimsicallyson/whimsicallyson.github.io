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
  var indexHTML = data.toString();
  var htmlBrokenURLs = indexHTML.match(new RegExp(/src="\/web.*?"/, 'ig'));

  if (htmlBrokenURLs !== null) {
    for (var i = 0; i < htmlBrokenURLs.length; i++) {
      var justURL = htmlBrokenURLs[i].slice(5,-1); // slice removes src=" and "
      var filename = '/images/' + justURL.split('/').pop();
      indexHTML = indexHTML.replace(justURL, filename);
      promiseArray.push(
        imageDownloader.image({ url: 'https://web.archive.org'+justURL, dest})
          .catch((err) => { console.log(justURL, 'imagedownload failed', err); })
      )
    }

    // when all the promises in that for/each are done
    Promise.all( promiseArray )
      .then( () => {
        var newHTML = indexHTML;
        fs.writeFile('./views/index.html', newHTML, (err) => {
          console.log('html file written. error? ', err); 
        }); 
      })
      .catch((err) => {
        console.error("HTML image error", err);
        console.log(promiseArray);
      });
  }
});


fs.readFile('./public/style.css', function(err, data) {
  var indexCSS = data.toString();
  var cssBrokenURLs = indexCSS.match(new RegExp(/url\(\/web.*?\)/, 'ig')) 

  if (cssBrokenURLs !== null) {
    for (var i = 0; i < cssBrokenURLs.length; i++) {
      var justURL = cssBrokenURLs[i].slice(4,-1); // slice removes url( and )
      console.log(justURL);
      var filename = '/images/' + justURL.split('/').pop();
      indexCSS = indexCSS.replace(justURL, filename);
      promiseArray.push(imageDownloader.image({ url: 'http://web.archive.org'+justURL, dest})
        .catch((err) => { console.log(justURL, 'imagedownload failed', err); })    
      )
    }
    Promise.all( promiseArray )
      .then( () => {
        var newCSS = indexCSS;
        fs.writeFile('./public/style.css', newCSS, (err) => {
          console.log('css file written. error? ', err); 
        }); 
      })
      .catch((err) => {
        console.error("CSS image error", err);
        console.log(promiseArray);
      });
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
