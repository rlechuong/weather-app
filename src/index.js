import "./styles.css";
import { renderCurrentWeather } from "./renderCurrentWeather.js";
import { renderTodayWeather } from "./renderTodayWeather.js";
import { renderHourlyWeather } from "./renderHourlyWeather.js";
import { renderWeeklyWeather } from "./renderWeeklyWeather.js";

let processingDiv = document.querySelector("#processing");
let errorMessageDiv = document.querySelector("#error-message");

async function getWeatherData(location, unitGroup) {
  processingDiv.style.display = "block";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=HVM9MZXY5D5X3JPZ5RBMEM7W3&unitGroup=${unitGroup}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const weatherData = await response.json();
    console.log(weatherData);
    processingDiv.style.display = "none";
    return processData(weatherData, unitGroup);
  } catch (error) {
    console.error(`This is the ${error}`);
    throw new Error(`HTTP error!`);
  }
}

function processData(data, unitGroup) {
  const desiredKeys = [
    "cloudcover",
    "conditions",
    "datetime",
    "description",
    "dew",
    "feelslike",
    "feelslikemax",
    "feelslikemin",
    "humidity",
    "icon",
    "moonphase",
    "precip",
    "precipcover",
    "precipprob",
    "preciptype",
    "pressure",
    "severerisk",
    "snow",
    "snowdepth",
    "solarenergy",
    "solarradiation",
    "sunrise",
    "sunset",
    "temp",
    "tempmax",
    "tempmin",
    "uvindex",
    "visibility",
    "winddir",
    "windgust",
    "windspeed",
  ];
  const processedData = {
    resolvedAddress: "",
    currentConditions: {},
    hourlyData: [],
    weeklyData: [],
    alerts: [],
    unitGroup: unitGroup,
  };

  // Get the official address returned from the API
  processedData.resolvedAddress = data.resolvedAddress;

  // Processes desired data into the current conditions object
  desiredKeys.forEach(function (key) {
    if (Object.hasOwn(data.currentConditions, key)) {
      processedData.currentConditions[key] = data.currentConditions[key];
    }
  });

  // Processes desired data into the hourly array for use in hourly forecast
  for (let i = 0; i < data.days[0].hours.length; i++) {
    let hourlyDataObject = {};

    desiredKeys.forEach(function (key) {
      if (Object.hasOwn(data.days[0].hours[i], key)) {
        hourlyDataObject[key] = data.days[0].hours[i][key];
      }
    });

    processedData.hourlyData.push(hourlyDataObject);
  }

  // Processes desired data into weekly array for use in 10 day forecast
  for (let i = 0; i < 10; i++) {
    let weeklyDataObject = {};

    desiredKeys.forEach(function (key) {
      if (Object.hasOwn(data.days[i], key)) {
        weeklyDataObject[key] = data.days[i][key];
      }
    });

    processedData.weeklyData.push(weeklyDataObject);
  }

  // Copy the alerts array just in case want to use in the future
  processedData.alerts = data.alerts;

  console.log(processedData);
  return processedData;
}

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
      // if (currentAddress) {
      //   getWeatherData(
      //     currentAddress.getAttribute("data-address"),
      //     toggledUnit,
      //   ).then(function (data) {
      //     renderCurrentWeather(data);
      //     renderTodayWeather(data);
      //     renderHourlyWeather(data);
      //     renderWeeklyWeather(data);
      //   });
      // } else {
      //   processingDiv.style.display = "none";
      //   return;
      // }
    });
});

function toggleUnits() {
  let fButton = document.querySelector("#f-button");
  let cButton = document.querySelector("#c-button");

  fButton.addEventListener("click", () => {
    fButton.classList.add("toggled");
    fButton.disabled = true;
    cButton.classList.remove("toggled");
    cButton.disabled = false;

    let currentAddress = document.querySelector(".current-resolved-address");
    if (currentAddress) {
      getWeatherData(currentAddress.getAttribute("data-address"), "us").then(
        function (data) {
          renderCurrentWeather(data);
          renderTodayWeather(data);
          renderHourlyWeather(data);
          renderWeeklyWeather(data);
        },
      );
    }
  });

  cButton.addEventListener("click", () => {
    cButton.classList.add("toggled");
    cButton.disabled = true;
    fButton.classList.remove("toggled");
    fButton.disabled = false;
    let currentAddress = document.querySelector(".current-resolved-address");
    if (currentAddress) {
      getWeatherData(
        currentAddress.getAttribute("data-address"),
        "metric",
      ).then(function (data) {
        renderCurrentWeather(data);
        renderTodayWeather(data);
        renderHourlyWeather(data);
        renderWeeklyWeather(data);
      });
    }
  });
}

getWeatherData("Centreville", "us").then(function (data) {
  renderCurrentWeather(data);
  renderTodayWeather(data);
  renderHourlyWeather(data);
  renderWeeklyWeather(data);
});

toggleUnits();
