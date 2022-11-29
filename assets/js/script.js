var searchButtonEl = document.querySelector('#search');
var searchField = document.querySelector('#search-field')

function searchButton (event) {
  event.preventDefault();

  var searchEntry = document.querySelector('#search-text').value;
  var apiKey = 'cf49844e3f54a62c370a39540478245f';
  var geoCoordinates = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchEntry + '&appid=' + apiKey;
  console.log(searchEntry);
  var lat;
  var lon;

  if (!searchEntry) {
    console.error('You need a search input value!');
    return;
  }

  fetch(geoCoordinates)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
          lat = data[i].lat;
          // console.log(lat);
          lon = data[i].lon;
          // console.log(lon);
          var citySearched = data[i].name + ', ' + data[i].state;
          // console.log(citySearched);
          var pastSearch = document.createElement('button');
          pastSearch.classList.add('btn', 'btn-primary', 'btn-block');
          pastSearch.textContent = citySearched;
          searchField.appendChild(pastSearch);
        }
        
      });
}

//   var queryString = './search-results.html?q=' + searchEntry + '&format=';

//   location.assign(queryString);


searchButtonEl.addEventListener('submit', searchButton);