var searchButtonEl = document.querySelector('#search');
var searchFieldEl = document.querySelector('#search-field')
var cityNameEl = document.querySelector('#city-name')
var tempEl = document.querySelector('#temp')
var windEl = document.querySelector('#wind')
var humidityEl = document.querySelector('#humidity')

function searchButton (event) {
  event.preventDefault();

  var searchEntry = document.querySelector('#search-text').value;
  var apiKey = 'cf49844e3f54a62c370a39540478245f';
  var geoCoordinates = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchEntry + '&appid=' + apiKey;
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
      // console.log(data);
      for (var i = 0; i < data.length; i++) {
        lat = data[i].lat;
        // console.log(lat);
        lon = data[i].lon;
        // console.log(lon);
        var citySearched = data[i].name + ', ' + data[i].state + ', ' + data[i].country;
        // console.log(citySearched);
        var pastSearch = document.createElement('button');
        pastSearch.classList.add('btn', 'btn-primary', 'btn-block');
        pastSearch.textContent = citySearched;
        searchFieldEl.appendChild(pastSearch);
     }

  var currentWeather = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=metric';

  fetch(currentWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      cityNameEl.textContent = data.name + '   ';
      var icon = data.weather[0].icon;
      document.querySelector('#weather-icon').src = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
      tempEl.textContent = 'Current Temperature: ' + data.main.temp + ' ° C';
      windEl.textContent = 'Current Wind Speed: ' + data.wind.speed + ' kph';
      humidityEl.textContent = 'Current Humidity: ' + data.main.humidity + ' %';
            
    })

  
  
    });
}

searchButtonEl.addEventListener('submit', searchButton);