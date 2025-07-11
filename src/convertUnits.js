import { parse, format } from "date-fns";

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

// Takes 24-Hour formatted string and converts it into 12-Hour With AM/PM
function convertTimeForHourly(time) {
  const [hours, minutes, seconds] = time.split(":");
  const date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  date.setSeconds(parseInt(seconds || "0", 10));

  const options = {
    hour: "numeric",
    hour12: true,
  };

  return date.toLocaleTimeString("en-US", options);
}

function convertDateForToday(date) {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());
  const convertedDate = format(parsedDate, "EEEE, MMMM do, yyyy");

  return convertedDate;
}

function convertDateForWeekly(date) {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());
  const convertedDate = format(parsedDate, "EEE, M/d");

  return convertedDate;
}

export {
  convertTime,
  convertTimeForHourly,
  convertDateForToday,
  convertDateForWeekly,
};
