import { describe, expect, test, vi } from "vitest";
import { createStore } from "./store";

describe("testing store", () => {
  let store;
  const initialState = {
    name: "anjal",
    age: 22,
  };
  let reducer = vi.fn();
  let listener = vi.fn();
  test("--- testing getState", () => {
    store = createStore(initialState, reducer);

    expect(store.getState()).toBe(initialState);
  });

  test("--- testing dispatch called listner", () => {
    store = createStore(initialState, reducer);
    store.subscribe(listener);
    store.dispatch({
      type: "SET_ROUTE",
      payload: {
        route: "/home",
      },
    });

    expect(listener).toHaveBeenCalled();
  });
});
