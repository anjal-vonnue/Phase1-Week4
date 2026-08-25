import { Button } from "./button.js";

export function Modal({ title, description }) {
  const modalEl = document.createElement("div");

  const h2El = document.createElement("h2");
  h2El.className = "modal-title";
  h2El.textContent = title;

  const descEl = document.createElement("p");
  descEl.textContent = description;
  descEl.className = "modal-desc";

  modalEl.appendChild(h2El);
  modalEl.appendChild(descEl);

  return modalEl;
}
