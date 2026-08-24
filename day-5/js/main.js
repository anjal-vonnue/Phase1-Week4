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
};

const store = createStore(initialState, reducer);

const router = createRouter();

router.register("/home", renderHome);
router.register("/list", renderList);
router.register("/detail", renderDetail);
router.register("/settings", renderSettings);

router.changeRoute();

console.log("hello");
