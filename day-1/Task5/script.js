const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log(entry);
      entry.target.src = entry.target.getAttribute("data-src");
    }
  });
});

const images = document.querySelectorAll(".image");
const header = document.querySelector("header").querySelector("h1");
console.log(header);

images.forEach((img) => {
  observer.observe(img);
});

const headerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        header.textContent = entry.target.getAttribute("data-title");
        if (entry.target.classList.contains("counter")) {
          requestAnimationFrame(counterUpdate);
          if (!firsttime) {
            time = Date.now();
            firsttime = true;
          }
        }
      }
    });
  },
  { rootMargin: "-400px 0px" },
);

const sections = document.querySelectorAll("section");

sections.forEach((section) => {
  headerObserver.observe(section);
});

const counterP = document.querySelector(".counter").querySelector("p");
let firsttime = false;
let count = 0;
let time;
function counterUpdate() {
  const currentTime = Date.now();
  const twoSecond = currentTime - time;
  if (count <= 2000 && twoSecond < 2000) {
    counterP.textContent = count;
    count++;
    requestAnimationFrame(counterUpdate);
  }
}
