import { renderDetail } from "./pages/detail.js";
import { renderHome } from "./pages/home.js";
import { renderList } from "./pages/list.js";
import { renderSettings } from "./pages/settings.js";
import { createRouter } from "./router/router.js";
import { reducer } from "./store/reducer.js";
import { createStore } from "./store/store.js";

console.log("hello world");

const initialState = {
  todos: [],
  route: "/home",
  params: {},
};

const store = createStore(initialState, reducer);

store.dispatch({
  type: "SET_ROUTE",
  payload: initialState,
});

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
