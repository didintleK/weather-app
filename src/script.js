function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-search");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
}

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", search);
