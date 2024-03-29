function showWeather(response) {
  let tempElement = document.querySelector("#current-temp");
  let temp = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let details = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img
      src= ${response.data.condition.icon_url}
      class="current-weather-emoji"

    />`;

  details.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(temp);
  timeElement.innerHTML = showDate(date);
  getForecast(response.data.city);
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

function createDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKeyz = "3516ae46fb6a9tf90fe7770oaa6c4a92";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKeyz}&units=metric`;

  axios.get(apiURL).then(showForecast);
}

function showForecast(response) {
  let forecastString = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastString += `
    <div class="forecast">
              <div class="forecast-date">${createDay(day.time)}</div>
              <div class="forecast-icon"><img
                src= ${day.condition.icon_url}
                width="85"
              /></div>
              <div class="forecast-temperatures">
                <span class="temp-max">${Math.round(
                  day.temperature.maximum
                )}°    ~    </span>  
                <span class="temp-min">${Math.round(
                  day.temperature.minimum
                )}° </span>
              </div>
        </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastString;
}

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", search);

citySearch("Pretoria");
