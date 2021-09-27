function setLocationPin(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveLocation);
}

function retrieveLocation(position) {
  let weatherKey = `401cf95fe972c3be04dccbfdca20a830`;
  let weatheUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${weatherKey}`;
  axios.get(weatheUrl).then(displayWeather);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let weatherForecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  weatherForecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col">${formatDay(forecastDay.dt)}
        <img 
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        />
          <div class="forecast-temperature">
            <span class="forecast-temperature-max">${Math.round(
              forecastDay.temp.max
            )}°</span>
            <span class="forecast-temperature-min">${Math.round(
              forecastDay.temp.min
            )}°</span>
          </div>
      </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `401cf95fe972c3be04dccbfdca20a830`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  document.querySelector("#searched-city-name").innerHTML = response.data.name;
  celsiusTemperature = Math.round(response.data.main.temp);
  let temperatureDisplay = document.querySelector("#searched-city-temperature");
  temperatureDisplay.innerHTML = `${celsiusTemperature}°C`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  //document.getElementById(
  //  "background-image"
  //).style.background = `url(http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png)`;
  //document.getElementById("background-image").style.backgroundRepeat =
  //  "no-repeat";
  //document.getElementById("background-image").style.backgroundPosition =
  //  "85% 15%";
  //document.getElementById("background-image").style.backgroundSize = "30% 40%";
  getForecast(response.data.coord);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

function searchCity(city) {
  let weatherKey = `401cf95fe972c3be04dccbfdca20a830`;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherKey}`;
  axios.get(weatherUrl).then(displayWeather);
}

function displayDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

let currentDayTime = document.querySelector("#current-day-time");
let now = new Date();
currentDayTime.innerHTML = displayDate(now);

let searchField = document.querySelector("#search-city-field");
searchField.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current-location-pin");
currentLocation.addEventListener("click", setLocationPin);

searchCity("Copenhagen");
