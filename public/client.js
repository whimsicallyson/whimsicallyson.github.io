const submit = document.getElementById('submit');
const website = document.getElementById('website');

submit.addEventListener('click', function() {
  console.log(website.value);
  fetch('/scrape', {method: POST, body: we).then(function(response) { console.log (response.body) });

});