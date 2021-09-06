function setLocationPin(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveLocation);
}

function retrieveLocation(position) {
  let weatherKey = `401cf95fe972c3be04dccbfdca20a830`;
  let weatheUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${weatherKey}`;
  axios.get(weatheUrl).then(displayWeather);
}

function displayWeather(response) {
  document.querySelector("#searched-city-name").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureDisplay = document.querySelector("#searched-city-temperature");
  temperatureDisplay.innerHTML = `${temperature}°C`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
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
