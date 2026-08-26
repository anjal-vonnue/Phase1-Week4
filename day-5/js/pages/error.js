import { Button } from "../components/button.js";
import { store } from "../main.js";

export function renderError(router) {
  function backBtnFn() {
    router.navigate("/home");
  }

  console.log("this is settting page");

  const section = document.createElement("section");
  section.className = "section-container";

  const div = document.createElement("div");
  div.className = "recent-tasks";

  const containerDiv = document.createElement("div");
  containerDiv.className = "no-task";
  const h1 = document.createElement("h1");

  h1.textContent = "404 PAGE NOT FOUND";

  const button = Button({
    text: "BACK TO HOME?",
    onClick: backBtnFn,
    type: "button",
    className: "back-btn",
  });

  containerDiv.appendChild(h1);
  containerDiv.appendChild(button);
  div.appendChild(containerDiv);

  section.appendChild(div);

  return section;
}
