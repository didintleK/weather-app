function showWeather(response) {
  let tempElement = document.querySelector("#current-temp");
  let temp = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  tempElement.innerHTML = Math.round(temp);
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
