import "./styles.css";

// fetch(
//   "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Washington,DC,USA?key=HVM9MZXY5D5X3JPZ5RBMEM7W3",
// )
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (response) {
//     console.log(response);
//   });

async function getWeatherData(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=HVM9MZXY5D5X3JPZ5RBMEM7W3`;
  try {
    const response = await fetch(url);
    const weatherData = await response.json();
    console.log(weatherData);
    return processData(weatherData);
  } catch (error) {
    console.error(error);
  }
}

function processData(data) {
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

  console.log(processedData);
  return processedData;
}

// function convertTime(time) {
//   const [hours, minutes, seconds] = time.split(":");
//   const date = new Date();
//   date.setHours(parseInt(hours, 10));
//   date.setMinutes(parseInt(minutes, 10));
//   date.setSeconds(parseInt(seconds || "0", 10));

//   const options = {
//     hour: "numeric",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: true,
//   };

//   return date.toLocaleTimeString("en-US", options);
// }

getWeatherData("DC");
