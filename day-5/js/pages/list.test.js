import { beforeEach, describe, expect, test, vi } from "vitest";
import { renderList } from "./list";

const mocks = vi.hoisted(() => {
  return {
    dispatchFn: vi.fn(),
  };
});

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

vi.mock("../components/modal.js", () => ({
  Modal: vi.fn(() => {
    const modal = document.createElement("div");
    modal.className = "modal";

    const input = document.createElement("input");
    modal.appendChild(input);

    return modal;
  }),
}));

vi.mock("../main.js", () => ({
  app: document.createElement("div"),
  store: {
    dispatch: mocks.dispatchFn,
  },
}));

describe("testing list page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = "";
  });
  test("--- testing heading", () => {
    const state = {
      todos: [],
    };

    const section = renderList(state, {});

    expect(section.querySelector("h3").textContent).toBe("All Tasks");
  });

  test("--- Add, edit buttons rendering", () => {
    const state = {
      todos: [],
    };

    const section = renderList(state, {});
    expect(section.textContent).toContain("ADD TASK");
    expect(section.textContent).toContain("EDIT TASK");
  });

  test("--- todo rendering", () => {
    const state = {
      todos: [
        {
          id: 1,
          title: "go buy a laptop",
          description: "buy from ernalkulam",
          createdAt: Date.now(),
          status: "completed",
        },
        {
          id: 2,
          title: "wash clothes",
          description: "use washing machine",
          createdAt: Date.now(),
          status: "pending",
        },
        {
          id: 3,
          title: "do the tasks",
          description: "do the pending tasks",
          createdAt: Date.now(),
          status: "completed",
        },
      ],
    };

    const section = renderList(state, {});
    const card = section.querySelectorAll(".card");
    expect(card[0].textContent).toContain("go buy a laptop");
    expect(card[1].textContent).toContain("wash clothes");
  });

  test("--- tesing card buttons", () => {
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

    const section = renderList(state, {});

    const buttons = section.querySelectorAll(".card button");

    expect(buttons[0].textContent).toContain("COMPLETED");
    expect(buttons[1].textContent).toContain("UNDO");
    expect(buttons[2].textContent).toContain("DELETE");

    buttons[0].click();
    expect(mocks.dispatchFn).toHaveBeenCalledWith({
      type: "TASK_COMPLETED",
      payload: {
        id: 1,
      },
    });

    buttons[1].click();
    expect(mocks.dispatchFn).toHaveBeenCalledWith({
      type: "TASK_UNDO",
      payload: {
        id: 1,
      },
    });

    buttons[2].click();
    expect(mocks.dispatchFn).toHaveBeenCalledWith({
      type: "TASK_DELETE",
      payload: {
        id: 1,
      },
    });
  });
});
