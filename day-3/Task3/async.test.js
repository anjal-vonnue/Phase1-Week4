//link: https://vitest.dev/guide/mocking/timers

import { afterEach, describe, expect, it, test, vi } from "vitest";
import { debounce, fetchJSON, memoize } from "./async";

describe("testing FetchJson", () => {
  const mockData = {
    id: 1,
    name: "anjal",
    bio: "engineer",
  };
  test("--- resolved", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    await expect(fetchJSON("www.hello.com")).resolves.toBe(mockData);
  });

  test("--- https error", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      json: () => Promise.resolve(mockData),
    });

    await expect(fetchJSON("www.hello.com")).rejects.toThrow();
  });
});

describe("testing dobounce funtion", () => {
  test("--- called 1 times", () => {
    const mockFN = vi.fn(() => console.log("hello world"));
    const debounceFn = debounce(mockFN);
    vi.useFakeTimers();

    for (let i = 0; i < 10; i++) {
      debounceFn();
    }

    vi.runAllTimers();

    expect(mockFN).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });
});

describe("testing memoize function", () => {
  test("--- called once after repeated input", () => {
    const mockFn = vi.fn((x) => console.log(`this is ${x}`));
    const memoizeFn = memoize(mockFn);
    memoizeFn(200);
    memoizeFn(200);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test("--- called twice for different inputs", () => {
    const mockFn = vi.fn((x) => console.log(`this is ${x}`));
    const memoizeFn = memoize(mockFn);
    memoizeFn(100);
    memoizeFn(300);
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});

describe("testing abort controller", () => {
  test("--- testing timeout fires", async () => {
    vi.useFakeTimers();
    const controller = new AbortController();
    const signal = controller.signal;
    let result = fetchJSON("https://jsonplaceholder.typicode.com/users", {
      signal,
    });

    setTimeout(() => {
      controller.abort();
    }, 30);

    vi.advanceTimersByTime(30);

    await expect(result).rejects.toThrow();
  });
});
