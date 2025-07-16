import "./styles.css";
import { searchButtonEvents, unitsButtonsEvents } from "./buttonEvents.js";
import { getWeatherData } from "./getWeatherData.js";
import { renderCurrentWeather } from "./renderCurrentWeather.js";
import { renderHourlyWeather } from "./renderHourlyWeather.js";
import { renderTodayWeather } from "./renderTodayWeather.js";
import { renderWeeklyWeather } from "./renderWeeklyWeather.js";

let errorMessageDiv = document.querySelector("#error-message");
let processingDiv = document.querySelector("#processing");

getWeatherData("New York", "us")
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

searchButtonEvents();
unitsButtonsEvents();
