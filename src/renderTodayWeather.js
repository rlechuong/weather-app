import { convertTime, convertDateForToday } from "./convertUnits.js";

function renderTodayWeather(data) {
  const todayHeader = document.querySelector("#today-header");

  todayHeader.textContent = "";

  // Date
  const todayDateDiv = document.createElement("div");
  const todayDate = convertDateForToday(data.weeklyData[0].datetime);
  todayDateDiv.textContent = `Date: ${todayDate}`;
  todayHeader.appendChild(todayDateDiv);

  // Description
  const todayDescriptionDiv = document.createElement("div");
  const todayDescription = data.weeklyData[0].description;
  todayDescriptionDiv.textContent = `Forecast: ${todayDescription}`;
  todayHeader.appendChild(todayDescriptionDiv);

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

export { renderTodayWeather };
