export async function fetchWeather(url) {
  try {
    const response = await fetch(url);
    const result = await response.json();
    if (!response.ok) {
      throw new Error("error happened response is not ok");
    }

    return result;
  } catch (err) {
    console.log("error while fetching weather: ", err);
  }
}
