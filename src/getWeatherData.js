let processingDiv = document.querySelector("#processing");

async function getWeatherData(location, unitGroup) {
  processingDiv.style.display = "block";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=HVM9MZXY5D5X3JPZ5RBMEM7W3&unitGroup=${unitGroup}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const weatherData = await response.json();
    console.log(weatherData);
    processingDiv.style.display = "none";
    return processData(weatherData, unitGroup);
  } catch (error) {
    console.error(`${error}`);
    throw new Error(`${error}`);
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

export { getWeatherData };
