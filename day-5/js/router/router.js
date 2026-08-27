// import { store } from "../main.js";

// console.log("router.js");

export function createRouter(store) {
  const routes = [];

  function register(path, component) {
    // console.log("path: " + path + " component: " + component);

    routes.push({
      path: path,
      component: component,
    });
  }

  function navigate(path) {
    const url = `/day-5/#${path}`;

    window.history.pushState({}, "", url);
    changeRoute();
  }

  function changeRoute() {
    let flag = 0;
    const currentPath = getCurrentPath();
    // console.log("current path: ", currentPath);

    if (currentPath.startsWith("/detail")) {
      const id = currentPath.slice("/detail/".length);
      routes.forEach((route) => {
        if ("/detail" === route.path) {
          flag = 1;
          console.log("deatil route");
          // change this to state Mangements (below code)
          // route.component(id);
          store.dispatch({
            type: "SET_ROUTE",
            payload: {
              route: "/detail",
              params: {
                id: id,
              },
            },
          });
          // console.log("==== dispatch called with params:  ", id);
        }
      });
      console.log("id: " + id, " type: " + typeof id);
    } else {
      routes.forEach((route) => {
        console.log("check: ", currentPath === route.path);
        if (currentPath === route.path) {
          // change this to state Mangements (below code)
          // route.component();

          flag = 1;

          store.dispatch({
            type: "SET_ROUTE",
            payload: {
              route: currentPath,
            },
          });
        }
      });
    }

    if (flag === 0) {
      console.log("ERRORORR: ", currentPath);
      store.dispatch({
        type: "SET_ROUTE",
        payload: {
          route: "/error",
        },
      });
    }
  }

  function getCurrentPath() {
    const pathname = window.location.hash.slice(1);

    if (pathname) {
      console.log("=== pathname: ", pathname);

      return pathname;
    } else {
      return "/home";
    }
  }

  window.addEventListener("popstate", (e) => {
    e.preventDefault();
    console.log("popstate clicked");

    changeRoute();
  });

  return {
    register,
    navigate,
    changeRoute,
  };
}
