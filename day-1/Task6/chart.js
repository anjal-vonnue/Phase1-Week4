const chart = document.querySelector("#chart");
const bars = document.querySelectorAll(".bar");
const size = document.querySelector(".size");

const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const width = entry.contentRect.width;
    const height = entry.contentRect.height;

    bars.forEach((bar, i) => {
      bar.style.height = `${(((i + 1) * 20) / 100) * height}px`;
    });
  });
});

observer.observe(chart);

const mediaQueryOne = window.matchMedia("(min-width: 768px)");
const mediaQueryTwo = window.matchMedia("(min-width: 1024px)");

if (mediaQueryOne.matches) {
  size.textContent = "crossed 768px";
}

console.log(mediaQueryOne);

mediaQueryOne.addEventListener("change", () => {
  if (mediaQueryOne.matches) {
    console.log(mediaQueryOne.matches);

    size.textContent = "crossed 768px";
  } else {
    console.log(mediaQueryOne.matches);
    size.textContent = "";
  }
});

mediaQueryTwo.addEventListener("change", () => {
  if (mediaQueryTwo.matches) {
    size.textContent = "crossed 1024px";
  } else {
    console.log(mediaQueryTwo.matches);
    size.textContent = "crossed 768px";
  }
});
