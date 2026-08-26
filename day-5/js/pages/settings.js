import { Button } from "../components/button.js";
import { store } from "../main.js";

export function renderSettings(state) {
  console.log("this is settting page");

  const section = document.createElement("section");
  section.className = "section-container";

  const div = document.createElement("div");
  div.className = "settings";

  const clearButton = Button({
    text: "CLEAR ALL TASKS",
    onClick: clearAllTask,
    type: "button",
    className: "clear-button",
  });

  div.appendChild(clearButton);

  section.appendChild(div);

  return section;
}

function clearAllTask() {
  console.log("cleared all Tasks");
  store.dispatch({
    type: "CLEAR_TASKS",
  });
}
