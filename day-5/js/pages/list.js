export function renderList() {
  console.log("this is list page");

  const sectionEl = document.createElement("section");

  const h2El = document.createElement("h2");
  h2El.textContent = "Welcome to List";

  sectionEl.appendChild(h2El);

  return sectionEl;
}
