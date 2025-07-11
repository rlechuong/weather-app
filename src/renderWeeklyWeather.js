import { getWeatherIcon } from "./weatherIcons.js";
import { convertDateForWeekly } from "./convertUnits.js";
import raindrop from "./img/raindrop.png";

function renderWeeklyWeather(data) {
  let weeklyContainer = document.querySelector("#weekly-container");

  weeklyContainer.textContent = "";

  for (let i = 0; i < data.weeklyData.length; i++) {
    let dayContainer = document.createElement("div");
    dayContainer.classList.add("day-container");

    // Date
    let weeklyDateDiv = document.createElement("div");
    let weeklyDate = convertDateForWeekly(data.weeklyData[i].datetime);
    weeklyDateDiv.textContent = weeklyDate;
    dayContainer.appendChild(weeklyDateDiv);

    // Temperature Max
    let weeklyTempMaxDiv = document.createElement("div");
    let weeklyTempMax = data.weeklyData[i].tempmax;
    let weeklyTempMaxUnit = "";
    if (data.unitGroup === "us") {
      weeklyTempMaxUnit = "°F";
    } else if (data.unitGroup === "metric") {
      weeklyTempMaxUnit = "°C";
    }
    weeklyTempMaxDiv.textContent = `${weeklyTempMax} ${weeklyTempMaxUnit}`;
    dayContainer.appendChild(weeklyTempMaxDiv);

    // Temperature Min
    let weeklyTempMinDiv = document.createElement("div");
    let weeklyTempMin = data.weeklyData[i].tempmin;
    let weeklyTempMinUnit = "";
    if (data.unitGroup === "us") {
      weeklyTempMinUnit = "°F";
    } else if (data.unitGroup === "metric") {
      weeklyTempMinUnit = "°C";
    }
    weeklyTempMinDiv.textContent = `${weeklyTempMin} ${weeklyTempMinUnit}`;
    dayContainer.appendChild(weeklyTempMinDiv);

    // Icon
    let weeklyIconImg = document.createElement("img");
    weeklyIconImg.src = getWeatherIcon(data.weeklyData[i].icon);
    weeklyIconImg.style.height = "2rem";
    weeklyIconImg.style.width = "2rem";
    dayContainer.appendChild(weeklyIconImg);

    // Description
    let weeklyDescriptionDiv = document.createElement("div");
    let weeklyDescription = data.weeklyData[i].description;
    weeklyDescriptionDiv.textContent = `${weeklyDescription}`;
    dayContainer.appendChild(weeklyDescriptionDiv);

    // Raindrop
    let rainDropImg = document.createElement("img");
    rainDropImg.src = raindrop;
    rainDropImg.style.height = "2rem";
    rainDropImg.style.weight = "2rem";
    dayContainer.appendChild(rainDropImg);

    // Precipitation Probability
    let precipProbDiv = document.createElement("id");
    let precipProb = data.weeklyData[i].precipprob;
    precipProbDiv.textContent = `${precipProb} %`;
    dayContainer.appendChild(precipProbDiv);

    weeklyContainer.appendChild(dayContainer);
  }
}

export { renderWeeklyWeather };
