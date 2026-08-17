// link: https://vitest.dev/api/expect.html#tothrow

import { describe, expect, it } from "vitest";
import {
  addFn,
  addOne,
  checkStock,
  chunk,
  compose,
  curry,
  double,
  groupBy,
  inventory,
  partial,
  pipe,
  zip,
} from "./utils";

describe("testing chunk function", () => {
  it("--happy  path", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);

    expect(chunk([1, 2, 3, 4, 5], 2)).toHaveLength(3);
    expect(chunk([1, 2, 3, 4, 5], 2)).toContainEqual([3, 4]);
  });

  it("--edge case", () => {
    expect(chunk([1, 2, 3, 4, 5], 10)).toEqual([[1, 2, 3, 4, 5]]);
  });

  it("--error case", () => {
    expect(() => chunk([1, 2, 3, 4, 5], 0)).toThrow();
  });
});

describe("testing zip function", () => {
  it("--happy case", () => {
    expect(zip([1, 2, 3], ["a", "b", "c"])).toEqual([
      [1, "a"],
      [2, "b"],
      [3, "c"],
    ]);

    expect(zip([1, 2, 3], ["a", "b", "c"])).toBeTruthy();
  });

  it("--edge case", () => {
    expect(zip([], [1, 2, 3])).toEqual([]);
  });

  it("--error case", () => {
    expect(zip([1, 2, 3], ["a"])).toEqual([
      [1, "a"],
      [2, undefined],
      [3, undefined],
    ]);

    expect(zip([1, 2, 3], ["a"])[2]).toContain(undefined);
  });
});

describe("testing groupBy function", () => {
  it("--happy case", () => {
    expect(groupBy(inventory, checkStock)).toEqual({
      sufficient: [
        { name: "asparagus", type: "vegetables", quantity: 9 },
        { name: "goat", type: "meat", quantity: 23 },
        { name: "cherries", type: "fruit", quantity: 12 },
        { name: "fish", type: "meat", quantity: 22 },
      ],
      restock: [{ name: "bananas", type: "fruit", quantity: 5 }],
    });
  });

  it("--edge case", () => {
    expect(groupBy([], checkStock)).toEqual({});
  });

  it("--error case", () => {
    expect(() => groupBy(inventory, null)).toThrow();
  });
});

describe("testing pipe function", () => {
  it("--happy case", () => {
    expect(pipe(double, addOne)(5)).toBe(11);
  });

  it("--edge case", () => {
    expect(pipe(double)(5)).toBe(10);
  });

  it("--error case", () => {
    expect(() => pipe(double, null)(5)).toThrow();
  });
});

describe("testing compose funtion", () => {
  it("--happy case", () => {
    expect(compose(double, addOne)(5)).toBe(12);
  });

  it("--edge case", () => {
    expect(compose(double)(6)).toBe(12);
  });

  it("--error case", () => {
    expect(() => compose(double, null)(1)).toThrow();
  });
});

describe("testing curry function", () => {
  it("--happy case", () => {
    expect(curry(addFn)(1)(2)(3)).toBe(6);
  });

  it("--edge case", () => {
    expect(curry(addFn)(-1)(-2)(-3)).toBe(-6);
  });

  it("--error case", () => {
    expect(curry(addFn)(1)(2)()).toBeFalsy();
    expect(() => curry(null)(1)(2)()).toThrow();
  });
});

describe("testing partial funtions", () => {
  it("--happy case", () => {
    const addFive = partial(addFn, 5);

    expect(addFive(1, 2)).toBe(8);
  });

  it("--edge case", () => {
    const addition = partial(addFn);

    expect(addition(1, 3, 2)).toBe(6);
  });

  it("--error case", () => {
    expect(() => partial(null, 2)(1, 3)).toThrow();
  });
});
