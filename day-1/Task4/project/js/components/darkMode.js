export function themeToggle() {
  const htmlRoot = document.querySelector("html");
  const currentTheme = htmlRoot.getAttribute("data-theme");
  const btn = document.getElementById("theme-btn");
  if (currentTheme == "light") {
    htmlRoot.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    btn.setAttribute("aria-pressed", "true");
  } else {
    htmlRoot.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    btn.setAttribute("aria-pressed", "false");
  }
}

export function init() {
  let htmlRoot;
  let localTheme;

  document.addEventListener("DOMContentLoaded", () => {
    htmlRoot = document.querySelector("html");
    localTheme = localStorage.getItem("theme");
    if (localTheme) {
      htmlRoot.setAttribute("data-theme", localTheme);
    }

    const themeBtn = document.getElementById("theme-btn");
    themeBtn.addEventListener("click", themeToggle);
  });
}
