export function renderSettings() {
  console.log("this is settting page");

  const sectionEl = document.createElement("section");

  const h2El = document.createElement("h2");
  h2El.textContent = "Welcome to Settings";

  sectionEl.appendChild(h2El);

  return sectionEl;
}
