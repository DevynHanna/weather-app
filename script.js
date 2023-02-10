let today = new Date();
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
let year = today.getFullYear();
let hour = today.getHours();
let minutes = today.getMinutes();

let currentDay = document.querySelector(".todays-date");
currentDay.innerHTML = ` ${day} ${month} ${date}, ${year} ${hour}:${minutes
  .toString()
  .padStart(2, "0")}`;

function showTemp(response) {
  let todaysTemp = document.querySelector(".todays-temp");
  todaysTemp.innerHTML = Math.round(response.data.main.temp);
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
  let todaysTemp = document.querySelector(".todays-temp");
  todaysTemp.innerHTML = Math.round(response.data.main.temp);
  let local = document.querySelector(".current-location");
  local.innerHTML = response.data.name;
}

function displayCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=375139c251da45507c8593a3d7aa0f09`;

  axios.get(apiUrl).then(currentLocationTemp);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(displayCurrentLocation);
}

let currentPosition = document.querySelector("#current-location-button");
currentPosition.addEventListener("click", currentLocation);

let city = document.querySelector(".location-search");
city.addEventListener("submit", changeCity);

let celciusButton = document.querySelector(".c-button");
celciusButton.addEventListener("click", styleChangeToC);

let fahrenheitButton = document.querySelector(".f-button");
fahrenheitButton.addEventListener("click", styleChangeToF);

function styleChangeToC() {
  celciusButton.classList.add("selected");
  fahrenheitButton.classList.remove("selected");

  celciusButton.setAttribute("disabled", true);
  fahrenheitButton.removeAttribute("disabled");
}

function styleChangeToF() {
  celciusButton.classList.remove("selected");
  fahrenheitButton.classList.add("selected");

  celciusButton.removeAttribute("disabled");
  fahrenheitButton.setAttribute("disabled", true);
}
