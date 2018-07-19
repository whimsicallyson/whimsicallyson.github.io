const submit = document.getElementById('submit');
const website = document.getElementById('website');

submit.addEventListener('click', function(e) {
  e.preventDefault();
  console.log(website);

  fetch('/scrape', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ url: website.value })
  }).then(function(response) { console.log (response.body) });

});