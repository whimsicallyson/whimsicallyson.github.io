const submit = document.getElementById('submit');
const website = document.getElementById('website');

submit.addEventListener('click', function(e) {
  e.preventDefault;
  console.log(website.value);
  fetch('/scrape', {
    method: "POST", 
    body: website.value
  }).then(function(response) { console.log (response.body) });

});