import "./styles.css";
import { getWeatherIcon } from "./weatherIcons.js";
import { parse, format } from "date-fns";

// fetch(
//   "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Washington,DC,USA?key=HVM9MZXY5D5X3JPZ5RBMEM7W3",
// )
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (response) {
//     console.log(response);
//   });

async function getWeatherData(location, unitGroup) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=HVM9MZXY5D5X3JPZ5RBMEM7W3&unitGroup=${unitGroup}`;
  try {
    const response = await fetch(url);
    const weatherData = await response.json();
    console.log(weatherData);
    return processData(weatherData, unitGroup);
  } catch (error) {
    console.error(error);
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

function renderCurrentWeather(data) {
  const currentWeatherHeader = document.querySelector(
    "#current-weather-header",
  );
  const currentWeatherBodyLeft = document.querySelector(
    "#current-weather-body-left",
  );
  const currentWeatherBodyRight = document.querySelector(
    "#current-weather-body-right",
  );
  const currentWeatherBodyBottom = document.querySelector(
    "#current-weather-body-bottom",
  );

  // Address
  const currentResolvedAddressDiv = document.createElement("div");
  const currentResolvedAddress = data.resolvedAddress;
  currentResolvedAddressDiv.textContent = currentResolvedAddress;
  currentWeatherHeader.appendChild(currentResolvedAddressDiv);

  // Time
  const currentTimeDiv = document.createElement("div");
  const currentTime = convertTime(data.currentConditions.datetime);
  currentTimeDiv.textContent = `Updated: ${currentTime}`;
  currentWeatherHeader.appendChild(currentTimeDiv);

  // Weather Icon
  const currentIconImg = document.createElement("img");
  currentIconImg.src = getWeatherIcon(data.currentConditions.icon);
  currentIconImg.style.width = "10rem";
  currentIconImg.style.width = "10rem";
  currentWeatherBodyLeft.appendChild(currentIconImg);

  // Temperature
  const currentTemperatureDiv = document.createElement("div");
  const currentTemperature = data.currentConditions.temp;
  let currentTemperatureUnit = "";
  if (data.unitGroup === "us") {
    currentTemperatureUnit = "°F";
  } else if (data.unitGroup === "metric") {
    currentTemperatureUnit = "°C";
  }
  currentTemperatureDiv.textContent = `${currentTemperature}${currentTemperatureUnit}`;
  currentTemperatureDiv.style.fontSize = "4rem";
  currentWeatherBodyRight.appendChild(currentTemperatureDiv);

  // Feels Like
  const currentFeelsLikeDiv = document.createElement("div");
  const currentFeelsLike = data.currentConditions.feelslike;
  let currentFeelsLikeUnit = "";
  if (data.unitGroup === "us") {
    currentFeelsLikeUnit = "°F";
  } else if (data.unitGroup === "metric") {
    currentFeelsLikeUnit = "°C";
  }
  currentFeelsLikeDiv.textContent = `Feels Like: ${currentFeelsLike}${currentFeelsLikeUnit}`;
  currentWeatherBodyRight.appendChild(currentFeelsLikeDiv);

  // Conditions
  const currentConditionsDiv = document.createElement("div");
  const currentConditions = data.currentConditions.conditions;
  currentConditionsDiv.textContent = currentConditions;
  currentWeatherBodyBottom.appendChild(currentConditionsDiv);
}

function renderTodayWeather(data) {
  const todayContainer = document.querySelector("#today-container");

  // Date
  const todayDateDiv = document.createElement("div");
  const todayDate = convertDateForToday(data.weeklyData[0].datetime);
  todayDateDiv.textContent = `Date: ${todayDate}`;
  todayContainer.appendChild(todayDateDiv);

  // Description
  const todayDescriptionDiv = document.createElement("div");
  const todayDescription = data.weeklyData[0].description;
  todayDescriptionDiv.textContent = `Forecast: ${todayDescription}`;
  todayContainer.appendChild(todayDescriptionDiv);

  // Temperature Max
  const todayTempMaxDiv = document.querySelector("#today-max-temp-content");
  const todayTempMax = data.weeklyData[0].tempmax;
  let todayTempMaxUnit = "";
  if (data.unitGroup === "us") {
    todayTempMaxUnit = "°F";
  } else if (data.unitGroup === "metric") {
    todayTempMaxUnit = "°C";
  }
  todayTempMaxDiv.textContent = `${todayTempMax} ${todayTempMaxUnit}`;

  // Temperature Min
  const todayTempMinDiv = document.querySelector("#today-min-temp-content");
  const todayTempMin = data.weeklyData[0].tempmin;
  let todayTempMinUnit = "";
  if (data.unitGroup === "us") {
    todayTempMinUnit = "°F";
  } else if (data.unitGroup === "metric") {
    todayTempMinUnit = "°C";
  }
  todayTempMinDiv.textContent = `${todayTempMin} ${todayTempMinUnit}`;

  // Humidity
  const todayHumidityDiv = document.querySelector("#today-humidity-content");
  const todayHumidity = data.weeklyData[0].humidity;
  todayHumidityDiv.textContent = `${todayHumidity} %`;

  // UV Index
  const todayUVIndexDiv = document.querySelector("#today-uv-index-content");
  const todayUVIndex = data.weeklyData[0].uvindex;
  let exposureCategory = "";
  if (todayUVIndex <= 2) {
    exposureCategory = "Low";
  } else if (todayUVIndex > 2 && todayUVIndex < 6) {
    exposureCategory = "Moderate";
  } else if (todayUVIndex > 5 && todayUVIndex < 8) {
    exposureCategory = "High";
  } else if (todayUVIndex > 7 && todayUVIndex < 11) {
    exposureCategory = "Very High";
  } else if (todayUVIndex >= 11) {
    exposureCategory = "Extreme";
  }
  todayUVIndexDiv.textContent = `${todayUVIndex} (${exposureCategory})`;

  // Dew Point
  const todayDewPointDiv = document.querySelector("#today-dew-point-content");
  const todayDewPoint = data.weeklyData[0].dew;
  let todayDewUnit = "";
  if (data.unitGroup === "us") {
    todayDewUnit = "°F";
  } else if (data.unitGroup === "metric") {
    todayDewUnit = "°C";
  }
  todayDewPointDiv.textContent = `${todayDewPoint}${todayDewUnit}`;

  // Pressure
  const todayPressureDiv = document.querySelector("#today-pressure-content");
  const todayPressure = data.weeklyData[0].pressure;
  todayPressureDiv.textContent = `${todayPressure} mb`;

  // Visibility
  const todayVisibilityDiv = document.querySelector(
    "#today-visibility-content",
  );
  const todayVisibility = data.weeklyData[0].visibility;
  let todayVisibilityUnit = "";
  if (data.unitGroup === "us") {
    todayVisibilityUnit = "miles";
  } else if (data.unitGroup === "metric") {
    todayVisibilityUnit = "km";
  }
  todayVisibilityDiv.textContent = `${todayVisibility} ${todayVisibilityUnit}`;

  // Wind Direction
  const todayWindDirectionDiv = document.querySelector(
    "#today-wind-direction-content",
  );
  const todayWindDirection = data.weeklyData[0].winddir;
  todayWindDirectionDiv.textContent = `${todayWindDirection}°`;

  // Wind Gust
  const todayWindGustDiv = document.querySelector("#today-wind-gust-content");
  const todayWindGust = data.weeklyData[0].windgust;
  let todayWindGustUnit = "";
  if (data.unitGroup === "us") {
    todayWindGustUnit = "mph";
  } else if (data.unitGroup === "metric") {
    todayWindGustUnit = "kph";
  }
  todayWindGustDiv.textContent = `${todayWindGust} ${todayWindGustUnit}`;

  // Wind Speed
  const todayWindSpeedDiv = document.querySelector("#today-wind-speed-content");
  const todayWindSpeed = data.weeklyData[0].windspeed;
  let todayWindSpeedUnit = "";
  if (data.unitGroup === "us") {
    todayWindSpeedUnit = "mph";
  } else if (data.unitGroup === "metric") {
    todayWindSpeedUnit = "kph";
  }
  todayWindSpeedDiv.textContent = `${todayWindSpeed} ${todayWindSpeedUnit}`;

  // Sunrise
  const todaySunriseDiv = document.querySelector("#today-sunrise-content");
  const todaySunrise = convertTime(data.weeklyData[0].sunrise);
  todaySunriseDiv.textContent = `${todaySunrise}`;

  // Sunset
  const todaySunsetDiv = document.querySelector("#today-sunset-content");
  const todaySunset = convertTime(data.weeklyData[0].sunset);
  todaySunsetDiv.textContent = `${todaySunset}`;

  // Moon Phase
  const todayMoonPhaseDiv = document.querySelector("#today-moon-phase-content");
  const todayMoonPhase = data.weeklyData[0].moonphase;
  let moonPhaseValue = "";
  if (todayMoonPhase === 0) {
    moonPhaseValue = "New Moon";
  } else if (todayMoonPhase > 0 && todayMoonPhase < 0.25) {
    moonPhaseValue = "Waxing Crescent";
  } else if (todayMoonPhase === 0.25) {
    moonPhaseValue = "First Quarter";
  } else if (todayMoonPhase > 0.25 && todayMoonPhase < 0.5) {
    moonPhaseValue = "Waxing Gibbous";
  } else if (todayMoonPhase === 0.5) {
    moonPhaseValue = "Full Moon";
  } else if (todayMoonPhase > 0.5 && todayMoonPhase < 0.75) {
    moonPhaseValue = "Waning Gibbous";
  } else if (todayMoonPhase === 0.75) {
    moonPhaseValue = "Last Quarter";
  } else if (todayMoonPhase > 0.75 && todayMoonPhase <= 1) {
    moonPhaseValue = "Waning Crescent";
  }
  todayMoonPhaseDiv.textContent = `${todayMoonPhase} (${moonPhaseValue})`;
}

// Takes 24-Hour formatted string and converts it into 12-Hour With AM/PM
function convertTime(time) {
  const [hours, minutes, seconds] = time.split(":");
  const date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  date.setSeconds(parseInt(seconds || "0", 10));

  const options = {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  return date.toLocaleTimeString("en-US", options);
}

function convertDateForToday(date) {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());
  const convertedDate = format(parsedDate, "EEEE, MMMM do, yyyy");

  return convertedDate;
}

getWeatherData("Centreville", "us").then(function (data) {
  renderCurrentWeather(data);
  renderTodayWeather(data);
});
