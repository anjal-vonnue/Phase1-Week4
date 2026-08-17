//link: https://www.youtube.com/watch?v=1usuYqZMT7Q

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then((registration) => {
        console.log(
          "ServiceWorker registration successfull with scope: ",
          registration.scope,
        );
      })
      .catch((error) => {
        console.error("ServiceWorker Registration Failed: ", error);
      });
  });
}
