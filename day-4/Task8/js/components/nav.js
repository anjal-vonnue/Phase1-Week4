export function navigationDrawer() {
  // const navigation = document.querySelector("#nav");
  const navigation = document.getElementById("project-nav");
  const linkDiv = document.querySelector("#link.links");
  const closeHam = document.getElementById("close-ham");
  const openHam = document.getElementById("hamburger");

  console.log(navigation);

  function openDrawer() {
    linkDiv.setAttribute("aria-expanded", "true");

    navigation.classList.add("open");
  }

  function closeDrawer() {
    navigation.classList.remove("open");
    // const linkDiv = document.querySelector("#link.false");
    linkDiv.setAttribute("aria-expanded", "false");
  }

  openHam.addEventListener("click", openDrawer);
  closeHam.addEventListener("click", closeDrawer);

  linkDiv.addEventListener("click", closeDrawer);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      if (linkDiv.getAttribute("aria-expanded") === "true") {
        console.log("hello");
        closeDrawer();
      }
    }
  });
}
