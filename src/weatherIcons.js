import clearDayIcon from "./img/conditions-icons/clear-day.svg";
import clearNightIcon from "./img/conditions-icons/clear-night.svg";
import cloudyIcon from "./img/conditions-icons/cloudy.svg";
import fogIcon from "./img/conditions-icons/fog.svg";
import hailIcon from "./img/conditions-icons/hail.svg";
import partlyCloudyDayIcon from "./img/conditions-icons/partly-cloudy-day.svg";
import partlyCloudyNightIcon from "./img/conditions-icons/partly-cloudy-night.svg";
import rainSnowShowersDayIcon from "./img/conditions-icons/rain-snow-showers-day.svg";
import rainSnowShowersNightIcon from "./img/conditions-icons/rain-snow-showers-night.svg";
import rainSnowIcon from "./img/conditions-icons/rain-snow.svg";
import rainIcon from "./img/conditions-icons/rain.svg";
import showersDayIcon from "./img/conditions-icons/showers-day.svg";
import showersNightIcon from "./img/conditions-icons/showers-night.svg";
import sleetIcon from "./img/conditions-icons/sleet.svg";
import snowShowersDayIcon from "./img/conditions-icons/snow-showers-day.svg";
import snowShowersNightIcon from "./img/conditions-icons/snow-showers-night.svg";
import snowIcon from "./img/conditions-icons/snow.svg";
import thunderRainIcon from "./img/conditions-icons/thunder-rain.svg";
import thunderShowersDayIcon from "./img/conditions-icons/thunder-showers-day.svg";
import thunderShowersNightIcon from "./img/conditions-icons/thunder-showers-night.svg";
import thunderIcon from "./img/conditions-icons/thunder.svg";
import windIcon from "./img/conditions-icons/wind.svg";

function getWeatherIcon(icon) {
  const weatherIcons = {
    "clear-day": clearDayIcon,
    "clear-night": clearNightIcon,
    cloudy: cloudyIcon,
    fog: fogIcon,
    hail: hailIcon,
    "partly-cloudy-day": partlyCloudyDayIcon,
    "partly-cloudy-night": partlyCloudyNightIcon,
    "rain-snow-showers-day": rainSnowShowersDayIcon,
    "rain-snow-showers-night": rainSnowShowersNightIcon,
    "rain-snow": rainSnowIcon,
    rain: rainIcon,
    "showers-day": showersDayIcon,
    "showers-night": showersNightIcon,
    sleet: sleetIcon,
    "snow-showers-day": snowShowersDayIcon,
    "snow-showers-night": snowShowersNightIcon,
    snow: snowIcon,
    "thunder-rain": thunderRainIcon,
    "thunder-showers-day": thunderShowersDayIcon,
    "thunder-showers-night": thunderShowersNightIcon,
    thunder: thunderIcon,
    wind: windIcon,
  };

  return weatherIcons[icon];
}

export { getWeatherIcon };
