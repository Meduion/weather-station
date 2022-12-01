var searchButtonEl = document.querySelector('#search');
var searchFieldEl = document.querySelector('#search-field');
var cityNameEl = document.querySelector('#city-name');
var tempEl = document.querySelector('#temp');
var windEl = document.querySelector('#wind');
var humidityEl = document.querySelector('#humidity');
var fiveDayHeadingEl = document.querySelector("#five-day-heading");
var forecastEl = document.querySelector('#forecastEl');

// Function that grabs user input and creates a list of previously displayed searches.
function displayPastSearches(citySearched) {
  var pastSearch = document.createElement('button');
  pastSearch.classList.add('btn', 'btn-primary', 'btn-block');
  pastSearch.textContent = citySearched;
  pastSearch.disabled = true;
  searchFieldEl.appendChild(pastSearch);
}

function displayCurrentWeather(lat, lon, apiKey) {
  // Calls to the current weather API using the lat and lon gained from the geo-location API
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
    })
}

function displayForecast(lat, lon, apiKey) {
  // Third fetch now to the 5 day forecast API, again using the lat and lon variables from the geo-location API.
  var fiveDayForecast = 'https://api.openweathermap.org/data/2.5/forecast/?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=metric';

  fetch(fiveDayForecast)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      fiveDayHeadingEl.textContent = 'Five Day Forecast:';

      /* This if statement removes any of the Five Day forecast elements that existed from a previous search;
      before adding this more would just be added and it would create a longer and longer list for every search.
      Solution found on stackoverflow, posted by Ivan Sivak, found at the following link:
      https://stackoverflow.com/questions/13125817/how-to-remove-elements-that-were-fetched-using-queryselectorall
      */
      if (document.contains(document.querySelector('.dayElement'))) {
        document.querySelectorAll('.dayElement').forEach(e => e.remove());
      }
      
      /* This loop combs through the results returned from the five-day forecast API and looks for indices
      that have a dt_txt property that ends with 15:00:00. The endsWith function was suggested by tutor
      Alistair Rowden and was unknown to me before the session. It then creates the data for each returned
      index and adds them to the browser, adding the bootstrap class 'col' so that it functions with the
      bootstrap and displays in five columns. Finally, it appends the created dayElement child to the
      forecastEL section in the HTML.
      */
      for (var i = 0; i < data.list.length; i++) {
        var date = data.list[i].dt_txt;
        if (date.endsWith('15:00:00')) {
          var dayElement = document.createElement('div');
          dayElement.textContent = date;
          var image = document.createElement('img');
          var icon = data.list[i].weather[0].icon;
          image.src = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
          dayElement.appendChild(image);
          var temp = document.createElement('h5');
          var tempReading = data.list[i].main.temp
          temp.textContent = 'Temp: ' + tempReading + ' ° C';
          dayElement.appendChild(temp);
          var wind = document.createElement('h5');
          var windReading = data.list[i].wind.speed
          wind.textContent = 'Wind: ' + windReading + ' kph';
          dayElement.appendChild(wind);
          var humidity = document.createElement('h5');
          var humidityReading = data.list[i].main.humidity
          humidity.textContent = 'Humidity: ' + humidityReading + ' %';
          dayElement.appendChild(humidity);
          dayElement.classList.add('col', 'dayElement')
          forecastEl.appendChild(dayElement);
        }
      }
    })
}

function searchButton(event) {
  event.preventDefault();
  // Pulls the value from the text field of the search bar and adds it into the geo-location API to return coordinates.
  var searchEntry = document.querySelector('#search-text').value;
  var apiKey = 'cf49844e3f54a62c370a39540478245f';
  var geoCoordinates = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchEntry + '&appid=' + apiKey;

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
        var lat = data[i].lat;
        // console.log(lat);
        var lon = data[i].lon;
        // console.log(lon);
        var citySearched = data[i].name + ', ' + data[i].state + ', ' + data[i].country;
        /* Each function written above is called here so that the variables generated within this function can
        be passed into the other function and used.
        */
        displayPastSearches(citySearched);
        displayCurrentWeather(lat, lon, apiKey);
        displayForecast(lat, lon, apiKey);
      }
    })
}

searchButtonEl.addEventListener('submit', searchButton);