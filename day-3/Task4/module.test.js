import { afterEach, describe, expect, it, test, vi, beforeEach } from "vitest";
import { init } from "./darkMode";
import { loadWeather } from "./weather";
import { fetchWeather } from "./weatherHelper";

beforeEach(() => {
  document.body.innerHTML = "<div id=app></div>";
});

afterEach(() => {
  vi.resetAllMocks();
});

describe("testing darkmode", () => {
  const localStorageMockFn = vi
    .spyOn(Storage.prototype, "getItem")
    .mockImplementation((theme) => {
      if (theme === "dark") {
        return "dark";
      } else {
        return "light";
      }
    });

  test("--- reading prefernce on init", () => {
    init();
    expect(localStorageMockFn).toHaveBeenCalledWith("theme");
  });
});

describe("testing with vi mock", () => {
  vi.mock("./weatherHelper.js", () => {
    return {
      fetchWeather: vi.fn(() => {
        const current = {
          temperature: 20,
        };

        return current;
      }),
    };
  });
  test("--- mock the fetchWeater", async () => {
    const result = await loadWeather(
      `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,weather_code,wind_speed_10m`,
    );

    console.log(result.temperature);

    expect(fetchWeather).toHaveBeenCalledWith(
      `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,weather_code,wind_speed_10m`,
    );
  });
});
