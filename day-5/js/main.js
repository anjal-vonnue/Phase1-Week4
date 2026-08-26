import { renderDetail } from "./pages/detail.js";
import { renderHome } from "./pages/home.js";
import { renderList } from "./pages/list.js";
import { renderSettings } from "./pages/settings.js";
import { createRouter } from "./router/router.js";
import { reducer } from "./store/reducer.js";
import { createStore } from "./store/store.js";

console.log("hello world");

export const app = document.getElementById("app");

const initialState = {
  todos: [
    {
      id: 1,
      title: "go buy a laptop",
      description: "buy from ernalkulam",
      createdAt: Date.now() - 5000,
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
      createdAt: Date.now() + 2000,
      status: "completed",
    },
  ],
  route: "/home",
  params: {},
};

export const store = createStore(initialState, reducer);
store.subscribe(renderFn);

// store.dispatch({
//   type: "SET_ROUTE",
//   payload: initialState,
// });

const router = createRouter();

router.register("/home", renderHome);
router.register("/list", renderList);
router.register("/detail", renderDetail);
router.register("/settings", renderSettings);

router.changeRoute();

console.log("hello");

const navALink = document.querySelectorAll(".nav-a");

navALink.forEach((aTag) => {
  aTag.addEventListener("click", (e) => {
    e.preventDefault();
    const href = aTag.getAttribute("href");
    console.log("a tag clicked: ", href);

    router.navigate(href);
  });
});

function renderFn() {
  console.log("render function called");

  const state = store.getState();

  let child;

  switch (state.route) {
    case "/home": {
      child = renderHome(state, router);
      break;
    }

    case "/list": {
      child = renderList(state, router);
      break;
    }

    case "/settings": {
      child = renderSettings(state);
      break;
    }

    case "/detail": {
      child = renderDetail(state);
      break;
    }

    default: {
      child = renderHome(state);
    }
  }

  app.replaceChildren(child);
}
