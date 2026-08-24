console.log("router.js");

export function createRouter() {
  const routes = [];

  function register(path, component) {
    console.log("path: " + path + " component: " + component);

    routes.push({
      path: path,
      component: component,
    });
  }

  function navigate(path) {
    const url = `/day-5/index.html${path}`;

    window.history.pushState({}, "", url);
    changeRoute();
  }

  function changeRoute() {
    const currentPath = getCurrentPath();
    console.log("current path: ", currentPath);

    if (currentPath.startsWith("/detail")) {
      const id = currentPath.slice("/detail/".length);
      routes.forEach((route) => {
        if ("/detail" === route.path) {
          console.log("deatil route");
          route.component(id);
        }
      });
      console.log("id: " + id, " type: " + typeof id);
    } else {
      routes.forEach((route) => {
        if (currentPath === route.path) {
          route.component();
        }
      });
    }
  }

  function getCurrentPath() {
    const pathname = window.location.pathname;
    const basePath = "/day-5/index.html";

    if (pathname.startsWith(basePath)) {
      const path = pathname.slice(basePath.length);

      console.log(path);

      return path;
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

//// for testing router

function home() {
  console.log("home");
}

function detail(id) {
  console.log("detail for: ", id);
}

const router = createRouter();

router.register("/home", home);

router.register("/detail", detail);

setTimeout(() => {
  router.navigate("/detail");
}, 2000);

setTimeout(() => {
  router.navigate("/home");
}, 4000);

router.changeRoute();
