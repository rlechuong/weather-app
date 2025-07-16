import { getWeatherData } from "./getWeatherData.js";
import { renderCurrentWeather } from "./renderCurrentWeather.js";
import { renderHourlyWeather } from "./renderHourlyWeather.js";
import { renderTodayWeather } from "./renderTodayWeather.js";
import { renderWeeklyWeather } from "./renderWeeklyWeather.js";

let errorMessageDiv = document.querySelector("#error-message");
let processingDiv = document.querySelector("#processing");

function searchButtonEvents() {
  let searchButton = document.querySelector("#submit-button");

  searchButton.addEventListener("click", function (event) {
    event.preventDefault();

    errorMessageDiv.style.display = "none";

    const searchBox = document.querySelector("#search");

    let fButton = document.querySelector("#f-button");
    let cButton = document.querySelector("#c-button");

    let toggledUnit = "";

    if (fButton.classList.contains("toggled")) {
      toggledUnit = "us";
    } else if (cButton.classList.contains("toggled")) {
      toggledUnit = "metric";
    }

    getWeatherData(searchBox.value, toggledUnit)
      .then(function (data) {
        renderCurrentWeather(data);
        renderTodayWeather(data);
        renderHourlyWeather(data);
        renderWeeklyWeather(data);
      })
      .catch((error) => {
        console.log(error);
        errorMessageDiv.style.display = "block";
        processingDiv.style.display = "none";
      });
  });
}

function unitsButtonsEvents() {
  let fButton = document.querySelector("#f-button");
  let cButton = document.querySelector("#c-button");

  fButton.addEventListener("click", () => {
    fButton.classList.add("toggled");
    fButton.disabled = true;
    cButton.classList.remove("toggled");
    cButton.disabled = false;

    let currentAddress = document.querySelector(".current-resolved-address");
    if (currentAddress) {
      errorMessageDiv.style.display = "none";

      getWeatherData(currentAddress.getAttribute("data-address"), "us")
        .then(function (data) {
          renderCurrentWeather(data);
          renderTodayWeather(data);
          renderHourlyWeather(data);
          renderWeeklyWeather(data);
        })
        .catch((error) => {
          console.log(error);
          errorMessageDiv.style.display = "block";
          processingDiv.style.display = "none";
        });
    }
  });

  cButton.addEventListener("click", () => {
    cButton.classList.add("toggled");
    cButton.disabled = true;
    fButton.classList.remove("toggled");
    fButton.disabled = false;
    let currentAddress = document.querySelector(".current-resolved-address");
    if (currentAddress) {
      errorMessageDiv.style.display = "none";

      getWeatherData(currentAddress.getAttribute("data-address"), "metric")
        .then(function (data) {
          renderCurrentWeather(data);
          renderTodayWeather(data);
          renderHourlyWeather(data);
          renderWeeklyWeather(data);
        })
        .catch((error) => {
          console.log(error);
          errorMessageDiv.style.display = "block";
          processingDiv.style.display = "none";
        });
    }
  });
}

export { searchButtonEvents, unitsButtonsEvents };
