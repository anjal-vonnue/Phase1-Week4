import { describe, expect, test, vi } from "vitest";
import { createRouter } from "./router.js";

describe("testing router", () => {
  let router;
  let store;
  test("--- navigation test", () => {
    store = {
      dispatch: vi.fn(),
    };
    router = createRouter(store);
    router.register("/home", () => {});
    router.register("/list", () => {});
    router.navigate("/home");
    expect(window.location.pathname).toBe("/day-5/index.html/home");
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "SET_ROUTE",
      payload: {
        route: "/home",
      },
    });
    router.navigate("/list");
    expect(window.location.pathname).toBe("/day-5/index.html/list");
  });

  test("--- tesing detail route", () => {
    store = {
      dispatch: vi.fn(),
    };

    router = createRouter(store);
    router.register("/detail", () => {});
    router.navigate("/detail/3");
    expect(window.location.pathname).toBe("/day-5/index.html/detail/3");
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "SET_ROUTE",
      payload: {
        route: "/detail",
        params: {
          id: "3",
        },
      },
    });
  });

  test("--- tesing error route", () => {
    store = {
      dispatch: vi.fn(),
    };

    router = createRouter(store);
    router.register("/error", () => {});
    router.navigate("/awere");
    expect(window.location.pathname).toBe("/day-5/index.html/awere");
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "SET_ROUTE",
      payload: {
        route: "/error",
      },
    });
  });
});
