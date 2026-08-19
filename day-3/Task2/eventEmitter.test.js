//link: https://stevekinney.com/courses/testing/mocking-fetch-and-network-requests

import { afterEach, describe, expect, it, test, vi } from "vitest";
import { emitter, fetchJSON } from "./eventEmitter";

afterEach(() => {
  vi.clearAllMocks();
});

describe("testing event Emitter", () => {
  test("testing with mock function", () => {
    const mockFn = vi.fn((a, b) => a + b);
    emitter.on("mockTest", mockFn);

    const args = [1, 5];
    emitter.emit("mockTest", ...args);
    expect(mockFn).toHaveBeenCalledWith(...args);
  });
});

describe("testing fetchJSON", () => {
  test("tesing successPath with spyOn", async () => {
    const mockResponse = {
      userId: 1,
      id: 1,
      title: "test fetch",
    };

    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await fetchJSON("https://www.anjal.com/data");
    expect(result).toEqual(mockResponse);
  });

  test("testing HTTP error", async () => {
    const mockResponse = {
      userId: 2,
      id: 2,
      title: "http error test",
    };

    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      json: () => Promise.resolve(mockResponse),
    });

    await expect(fetchJSON("https://www.anjal.com/data")).rejects.toEqual(
      new Error("failed to fetch the response"),
    );
  });

  test("testing Network Error", async () => {
    vi.spyOn(global, "fetch").mockRejectedValue(new Error("Network Error"));

    await expect(fetchJSON("https://www.anjal.com/data")).rejects.toEqual(
      new Error("Network Error"),
    );
  });
});

describe("testing with Mock implementation", () => {
  const mockFn = vi.fn(() => Promise.resolve("hello world"));
  mockFn.mockImplementationOnce(() => Promise.reject("failed"));
  test("first call", () => {
    expect(mockFn()).rejects.toEqual("failed");
  });

  test("second call", () => {
    expect(mockFn()).resolves.toEqual("hello world");
  });
});
