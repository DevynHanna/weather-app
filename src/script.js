function formatDate(timestamp) {
  let today = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[today.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[today.getMonth()];
  let date = today.getDate();
  let hour = today.getHours();
  let minutes = today.getMinutes();
  let year = today.getFullYear();
  return `${day} ${month} ${date}, ${year} ${hour}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

function showTemp(response) {
  cTemp = response.data.main.temp;
  let todaysTemp = document.querySelector(".todays-temp");
  todaysTemp.innerHTML = Math.round(response.data.main.temp);
  let humidityIndicator = document.querySelector("#humidity");
  humidityIndicator.innerHTML = response.data.main.humidity;
  let windIndicator = document.querySelector("#wind");
  windIndicator.innerHTML = response.data.wind.speed;
  let todaysHigh = document.querySelector(".today-high");
  todaysHigh.innerHTML = Math.round(response.data.main.temp_max);
  let todaysLow = document.querySelector(".today-low");
  todaysLow.innerHTML = Math.round(response.data.main.temp_min);
  let dateElement = document.querySelector(".todays-date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let weatherDescription = document.querySelector(".weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;
}

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#location");
  let h1 = document.querySelector(".current-location");
  let apiKey = "375139c251da45507c8593a3d7aa0f09";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  h1.innerHTML = cityInput.value;

  axios.get(apiUrl).then(showTemp);
}

function currentLocationTemp(response) {
  cTemp = response.data.main.temp;
  let todaysTemp = document.querySelector(".todays-temp");
  todaysTemp.innerHTML = Math.round(response.data.main.temp);
  let local = document.querySelector(".current-location");
  local.innerHTML = response.data.name;
  let humidityIndicator = document.querySelector("#humidity");
  humidityIndicator.innerHTML = response.data.main.humidity;
  let windIndicator = document.querySelector("#wind");
  windIndicator.innerHTML = response.data.wind.speed;
  let todaysHigh = document.querySelector(".today-high");
  todaysHigh.innerHTML = Math.round(response.data.main.temp_max);
  let todaysLow = document.querySelector(".today-low");
  todaysLow.innerHTML = Math.round(response.data.main.temp_min);
  let dateElement = document.querySelector(".todays-date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let weatherDescription = document.querySelector(".weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;
}

function displayCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "375139c251da45507c8593a3d7aa0f09";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(currentLocationTemp);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(displayCurrentLocation);
}

let currentPosition = document.querySelector("#current-location-button");
currentPosition.addEventListener("click", currentLocation);

let city = document.querySelector(".location-search");
city.addEventListener("submit", changeCity);

function ChangeToC() {
  let tempElement = document.querySelector("#unit-change");
  tempElement.innerHTML = Math.round(cTemp);
  unitLabel.innerText = "°C";

  celciusButton.classList.add("selected");
  fahrenheitButton.classList.remove("selected");

  celciusButton.setAttribute("disabled", true);
  fahrenheitButton.removeAttribute("disabled");
}

function ChangeToF(event) {
  let tempElement = document.querySelector("#unit-change");
  let fTemp = (cTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fTemp);
  unitLabel.innerText = "°F";

  celciusButton.classList.remove("selected");
  fahrenheitButton.classList.add("selected");

  celciusButton.removeAttribute("disabled");
  fahrenheitButton.setAttribute("disabled", true);
}

let cTemp = null;

let celciusButton = document.querySelector(".c-button");
celciusButton.addEventListener("click", ChangeToC);

let fahrenheitButton = document.querySelector(".f-button");
fahrenheitButton.addEventListener("click", ChangeToF);

let unitLabel = document.querySelector(".unit-text");
