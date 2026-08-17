const navLinks = document.getElementById("primary-nav").querySelectorAll("a");

function changeRoute() {
  const mainContainer = document.getElementById("main");
  const path = location.pathname;
  const sectionName = path.split("/")[3].split(".")[0];
  console.log(sectionName);

  navLinks.forEach((link) => {
    link.classList.remove("a-active");
  });

  const headings = document.querySelectorAll(".heading");
  headings.forEach((heading) => {
    heading.classList.add("hidden");
  });

  if (sectionName === "") {
    document.getElementById("index").classList.remove("hidden");
    document.getElementById("nav-index").classList.add("a-active");
  } else {
    const activeHeading = document
      .getElementById(sectionName)
      .classList.remove("hidden");

    document.getElementById(`nav-${sectionName}`).classList.add("a-active");
  }

  /// breadcrumb
  const breadcrumb = document.getElementById("bread-page");
  if (sectionName !== "" && sectionName !== "index") {
    breadcrumb.textContent = `> ${sectionName}`;
  } else {
    breadcrumb.textContent = ``;
  }

  /// filter values
  if (path.includes("shop")) {
    const searchParams = new URLSearchParams(location.search);
    console.log(location.search);

    console.log(searchParams.get("sort"));
    const sortValue = searchParams.get("sort");
    const categoryValue = searchParams.get("category");

    if (sortValue !== null) {
      const sortSelection = document.getElementById("sort");
      sortSelection.value = sortValue;
    }

    if (categoryValue !== null) {
      const categorySelection = document.getElementById("category");
      categorySelection.value = categoryValue;
    }
  }
}

changeRoute();

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navLinks.forEach((l) => {
      l.classList.remove("a-active");
    });
    link.classList.add("a-active");
    const url = e.target.getAttribute("href").split("/")[1];
    window.history.pushState({}, "", url);

    console.log(url);
    changeRoute();
  });
});

window.addEventListener("popstate", (e) => {
  console.log(e);
  changeRoute();
});

// document.addEventListener("DOMContentLoaded", (e) => {
//   changeRoute();
// });
