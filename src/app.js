function setLocationPin(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveLocation);
}

function retrieveLocation(position) {
  let weatherKey = `401cf95fe972c3be04dccbfdca20a830`;
  let weatheUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${weatherKey}`;
  axios.get(weatheUrl).then(displayWeather);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let forecastDays = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  forecastDays.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col">${day}
        <div class="weather-icon">☀️</div>
          <div class="forecast-temperature">
            <span class="forecast-temperature-max">20°</span>
            <span class="forecast-temperature-min">15°</span>
          </div>
      </div>
  `;
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
  document.getElementById("background-image").style.background =
    "url(http://openweathermap.org/img/wn/" +
    response.data.weather[0].icon +
    "@2x.png)";
  document.getElementById("background-image").style.backgroundRepeat =
    "no-repeat";
  document.getElementById("background-image").style.backgroundPosition =
    "85% 15%";
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let temperatureElement = document.querySelector("#searched-city-temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = `${fahrenheitTemperature}°F`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#searched-city-temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = `${celsiusTemperature}°C`;
}

let celsiusTemperature = null;

let currentDayTime = document.querySelector("#current-day-time");
let now = new Date();
currentDayTime.innerHTML = displayDate(now);

let searchField = document.querySelector("#search-city-field");
searchField.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current-location-pin");
currentLocation.addEventListener("click", setLocationPin);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("Copenhagen");
