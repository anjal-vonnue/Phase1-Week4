export function Button({ text, onClick, type = "button", className = "" }) {
  const button = document.createElement("button");
  button.addEventListener("click", () => {
    onClick;
  });
  button.setAttribute("type", type);
  button.setAttribute("class", className);
  return button;
}
