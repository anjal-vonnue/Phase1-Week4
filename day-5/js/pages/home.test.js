import { describe, expect, test, vi } from "vitest";
import { renderHome } from "./home";

const mocks = vi.hoisted(() => {
  return {
    dispatchFn: vi.fn(),
  };
});

vi.mock("../main.js", () => ({
  app: document.createElement("div"),
  store: {
    dispatch: mocks.dispatchFn,
  },
}));

vi.mock("../components/button.js", () => ({
  Button: vi.fn(({ id, text, onClick, type, className }) => {
    let button = document.createElement("button");
    if (text) {
      button.textContent = text;
    }
    if (onClick) {
      button.addEventListener("click", () => {
        onClick(id);
      });
    }
    if (type) {
      button.type = type;
    }

    if (className) {
      button.className = className;
    }

    return button;
  }),
}));

vi.mock("../components/card.js", () => ({
  Card: vi.fn(({ id, title, description, children }) => {
    const card = document.createElement("div");

    if (id) card.id = id;
    card.className = "card";

    const titleEl = document.createElement("h4");
    titleEl.textContent = title;

    const descEl = document.createElement("h5");
    descEl.textContent = description;

    card.appendChild(titleEl);
    card.appendChild(descEl);
    children.forEach((child) => {
      card.appendChild(child);
    });

    return card;
  }),
}));

describe("testing home page", () => {
  test("---testing home rendered", () => {
    const state = {
      todos: [
        {
          id: 1,
          title: "go buy a laptop",
          description: "buy from ernalkulam",
          createdAt: Date.now(),
          status: "completed",
        },
      ],
    };

    const section = renderHome(state, {});

    expect(section.textContent).toContain("Total Tasks: 1");
  });

  test("--- testing buttons are rendered in the cards and their funtions", () => {
    const state = {
      todos: [
        {
          id: 1,
          title: "go buy a laptop",
          description: "buy from ernalkulam",
          createdAt: Date.now(),
          status: "completed",
        },
      ],
    };

    const section = renderHome(state, {});

    const buttons = section.querySelectorAll(".card button");
    expect(buttons[0].textContent).toContain("COMPLETED");

    buttons[0].click();
    expect(mocks.dispatchFn).toHaveBeenCalledWith({
      type: "TASK_COMPLETED",
      payload: {
        id: 1,
      },
    });

    expect(buttons[1].textContent).toContain("UNDO");
    buttons[1].click();
    expect(mocks.dispatchFn).toHaveBeenCalledWith({
      type: "TASK_UNDO",
      payload: {
        id: 1,
      },
    });

    expect(buttons[2].textContent).toContain("DELETE");
    buttons[2].click();
    expect(mocks.dispatchFn).toHaveBeenCalledWith({
      type: "TASK_DELETE",
      payload: {
        id: 1,
      },
    });
  });
});
