function showWeather(response) {
  let tempElement = document.querySelector("#current-temp");
  let temp = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let details = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  details.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(temp);
  timeElement.innerHTML = showDate(date);

  console.log(response.data);
}
function showDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function citySearch(city) {
  let apiKey = "3516ae46fb6a9tf90fe7770oaa6c4a92";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiURL).then(showWeather);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-search");

  citySearch(searchInput.value);
}

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", search);

citySearch("Pretoria");
