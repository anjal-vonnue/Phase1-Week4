import { fetchWeather } from "./weatherHelper.js";

export async function loadWeather(url) {
  try {
    const result = await fetchWeather(url);
    return result;
  } catch (err) {
    console.log("error while loading weather: ", err);
  }
}

loadWeather(
  `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,weather_code,wind_speed_10m`,
);
