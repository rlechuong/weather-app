import { getWeatherIcon } from "./weatherIcons.js";
import { convertTime } from "./convertUnits.js";

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

  currentWeatherHeader.textContent = "";
  currentWeatherBodyLeft.textContent = "";
  currentWeatherBodyRight.textContent = "";
  currentWeatherBodyBottom.textContent = "";

  // Address
  const currentResolvedAddressDiv = document.createElement("div");
  currentResolvedAddressDiv.classList.add("current-resolved-address");
  const currentResolvedAddress = data.resolvedAddress;
  currentResolvedAddressDiv.setAttribute("data-address", data.resolvedAddress);
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

export { renderCurrentWeather };
