import { convertTimeForHourly } from "./convertUnits.js";
import { getWeatherIcon } from "./weatherIcons.js";
import raindrop from "./img/raindrop.png";

function renderHourlyWeather(data) {
  const hourlyContainer = document.querySelector("#hourly-container");

  hourlyContainer.textContent = "";

  const currentTimeArray = data.currentConditions.datetime.split(":");

  for (let i = 0; i < data.hourlyData.length; i++) {
    let singleHourlyContainer = document.createElement("div");
    singleHourlyContainer.classList.add("single-hourly-container");

    // Time
    let hourlyTimeDiv = document.createElement("div");
    let hourlyTime = convertTimeForHourly(data.hourlyData[i].datetime);
    hourlyTimeDiv.textContent = hourlyTime;
    singleHourlyContainer.appendChild(hourlyTimeDiv);

    // Outline hour that matches current time
    let hourlyTimeArray = data.hourlyData[i].datetime.split(":");

    if (currentTimeArray[0] === hourlyTimeArray[0]) {
      singleHourlyContainer.style.outline = "2px solid blue";
    }

    // Icon
    let hourlyIconImg = document.createElement("img");
    hourlyIconImg.src = getWeatherIcon(data.hourlyData[i].icon);
    hourlyIconImg.style.height = "2rem";
    hourlyIconImg.style.width = "2rem";
    singleHourlyContainer.appendChild(hourlyIconImg);

    // Temperature
    let hourlyTempDiv = document.createElement("div");
    let hourlyTemp = data.hourlyData[i].temp;
    let hourlyTempUnit = "";
    if (data.unitGroup === "us") {
      hourlyTempUnit = "°F";
    } else if (data.unitGroup === "metric") {
      hourlyTempUnit = "°C";
    }
    hourlyTempDiv.textContent = `${hourlyTemp} ${hourlyTempUnit}`;
    singleHourlyContainer.appendChild(hourlyTempDiv);

    // Precipitation Chance
    let precipProbContainer = document.createElement("div");

    let raindropImg = document.createElement("img");
    raindropImg.src = raindrop;
    raindropImg.style.height = "1rem";
    raindropImg.style.width = "1rem";
    precipProbContainer.appendChild(raindropImg);

    let precipProbDiv = document.createElement("div");
    let precipProb = data.hourlyData[i].precipprob;
    precipProbDiv.textContent = `${precipProb}%`;
    precipProbContainer.appendChild(precipProbDiv);

    singleHourlyContainer.appendChild(precipProbContainer);

    hourlyContainer.appendChild(singleHourlyContainer);
  }
}

export { renderHourlyWeather };
