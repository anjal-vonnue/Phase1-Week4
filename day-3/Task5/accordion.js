export function accordionFn(header, panel) {
  panel.style.maxHeight = "0px";

  header.addEventListener("click", () => {
    const ariaValue = panel.getAttribute("aria-expanded");
    if (ariaValue === "false") {
      panel.style.maxHeight = "100px";
      panel.setAttribute("aria-expanded", true);
    } else {
      panel.style.maxHeight = "0px";
      panel.setAttribute("aria-expanded", false);
    }
  });
}
