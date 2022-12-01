var searchButtonEl = document.querySelector('#search');
var searchFieldEl = document.querySelector('#search-field')
var cityNameEl = document.querySelector('#city-name')
var tempEl = document.querySelector('#temp')
var windEl = document.querySelector('#wind')
var humidityEl = document.querySelector('#humidity')
var fiveDayHeadingEl = document.querySelector("#five-day-heading")
var dayOneEl = document.querySelector("#day-one")
var dayTwoEl = document.querySelector("#day-two")
var dayThreeEl = document.querySelector("#day-three")
var dayFourEl = document.querySelector("#day-four")
var dayFiveEl = document.querySelector("#day-five")
var forecastEl= document.querySelector('#forecastEl');

// All code is written in a single function that fires when the search button is clicked.
function searchButton(event) {
  event.preventDefault();

  // Pulls the value from the text field of the search bar and adds it into the geo-location API to return coordinates.
  var searchEntry = document.querySelector('#search-text').value;
  var apiKey = 'cf49844e3f54a62c370a39540478245f';
  var geoCoordinates = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchEntry + '&appid=' + apiKey;

  // Undefined variables that will be defined later, placed here so they can be used in all parts of the function.
  var lat;
  var lon;

  // Throws error to console if searchEntry bar is blank.
  if (!searchEntry) {
    console.error('You need a search input value!');
    return;
  }

  // Fetches from the geo-coordinates API and defines the lat and lon variables.
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

        // This section creates a field of past searches and displays them below search bar
        var pastSearch = document.createElement('button');
        pastSearch.classList.add('btn', 'btn-primary', 'btn-block');
        pastSearch.textContent = citySearched;
        searchFieldEl.appendChild(pastSearch);
      }

      // Calls to the current weather API using the lat and lon gained from the geo-location API above
      var currentWeather = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=metric';

      fetch(currentWeather)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // console.log(data);
          cityNameEl.textContent = data.name + '   ';
          var icon = data.weather[0].icon;
          document.querySelector('#weather-icon').src = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
          tempEl.textContent = 'Current Temperature: ' + data.main.temp + ' ° C';
          windEl.textContent = 'Current Wind Speed: ' + data.wind.speed + ' kph';
          humidityEl.textContent = 'Current Humidity: ' + data.main.humidity + ' %';

          // Third fetch now to the 5 day forecast API, again using the lat and lon variables from above.
          var fiveDayForecast = 'https://api.openweathermap.org/data/2.5/forecast/?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=metric';

          fetch(fiveDayForecast)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              console.log(data);
              fiveDayHeadingEl.textContent = 'Five Day Forecast:';
              
              /* Each section aligns to one of the display columns for the five day forecast. Is there a more
              efficient method than this? The index numbers selected are 24 hours ahead of the user's current
              time so will always show the weather for the time they're searching.
              */
              for (var i = 0; i < data.list.length; i++) {
                var Date = data.list[i].dt_txt;
                  if (Date.endsWith('15:00:00')) {
                  var dayElement = document.createElement('div');
                  dayElement.textContent = Date;
                  var Image = document.createElement('img');
                  var Icon = data.list[i].weather[0].icon;
                  Image.src = 'http://openweathermap.org/img/wn/' + Icon + '@2x.png'
                  dayElement.appendChild(Image);
                  var Temp = document.createElement('h5');
                  var TempReading = data.list[i].main.temp
                  Temp.textContent = 'Temp: ' + TempReading + ' ° C';
                  dayElement.appendChild(Temp);
                  var Wind = document.createElement('h5');
                  var WindReading = data.list[i].wind.speed
                  Wind.textContent = 'Wind: ' + WindReading + ' kph';
                  dayElement.appendChild(Wind);
                  var Humidity = document.createElement('h5');
                  var HumidityReading = data.list[i].main.humidity
                  Humidity.textContent = 'Humidity: ' + HumidityReading + ' %';
                  dayElement.appendChild(Humidity);
                  dayElement.classList.add('col')
                  forecastEl.appendChild(dayElement);
                }
              }
            })
        })
    });
}














// function displayPastSearches () {
//   var pastSearch = document.createElement('button');
//   pastSearch.classList.add('btn', 'btn-primary', 'btn-block');
//   pastSearch.textContent = citySearched;
//   searchFieldEl.appendChild(pastSearch);
// }



// function displayCurrentWeather () {

// }

// function displayForecast() {

// }









searchButtonEl.addEventListener('submit', searchButton);