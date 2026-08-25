export function renderHome() {
  console.log("this is home page");

  const sectionEl = document.createElement("section");

  const h2El = document.createElement("h2");
  h2El.textContent = "Welcome to home";

  sectionEl.appendChild(h2El);

  return sectionEl;
}
