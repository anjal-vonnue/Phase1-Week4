export function mobileNavFn(drawer, hamBtn, closeBtn) {
  hamBtn.addEventListener("click", () => {
    if (drawer.classList.contains("close")) {
      drawer.classList.remove("close");
      drawer.classList.add("open");
    }
  });

  closeBtn.addEventListener("click", () => {
    if (drawer.classList.contains("open")) {
      drawer.classList.remove("open");
      drawer.classList.add("close");
    }
  });

  drawer.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;

    const links = drawer.querySelectorAll("a");
    const first = links[0];
    const last = links[links.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }

    if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}
