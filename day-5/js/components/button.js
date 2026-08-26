export function Button({
  text,
  onClick,
  type = "button",
  className = "",
  id = -1,
}) {
  const button = document.createElement("button");
  button.textContent = text;
  button.className = className;
  button.type = type;

  button.addEventListener("click", (e) => {
    if (typeof onClick === "function") {
      onClick(id);
    }
  });
  return button;
}
