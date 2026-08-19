import { describe, expect, test } from "vitest";
import { formatDate } from "./dateformatter";

describe("testing dateFormatter", () => {
  test("1) --- DD/MM/YYYY", () => {
    expect(formatDate(new Date("2004-04-06"), "DD/MM/YYYY")).toBe("06/04/2004");
  });

  test("2) --- YYYY-MM-DD", () => {
    expect(formatDate(new Date("2004-04-06"), "YYYY-MM-DD")).toBe("2004-04-06");
  });

  test("3) --- Month DD, YYYY", () => {
    expect(formatDate(new Date("2004-04-06"), "Month DD, YYYY")).toBe(
      "April 06, 2004",
    );
  });

  test("4) --- leap year", () => {
    expect(formatDate(new Date("2024-02-29"), "DD/MM/YYYY")).toBe("29/02/2024");
  });

  test("5) --- December 31", () => {
    expect(formatDate(new Date("2026-12-31"), "YYYY-MM-DD")).toBe("2026-12-31");
  });

  test("6) --- relative", () => {
    expect(formatDate(new Date("2026-08-18"), "relative")).toBe("1 day ago");
  });

  test("7) --- invalid input", () => {
    const invalidDate = new Date();
    invalidDate.setDate(NaN);

    expect(() => formatDate(invalidDate, "DD/MM/YY")).toThrow("invalid date");
  });

  test("8) --- invalid format", () => {
    expect(() => formatDate(new Date("2004-04-06"), "")).toThrow(
      "invalid format",
    );
  });
});
