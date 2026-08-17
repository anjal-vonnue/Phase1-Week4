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

//progress bar
//link: https://gist.github.com/christianscott/93bde81fd5ffb337e8ab990bad89825e

const makeLoader = (progressEl, updateProgressCount, initialProgress = 0) => {
  let progressCount = initialProgress;
  const load = () => {
    progressCount = updateProgressCount(progressCount);
    progressEl.value = progressCount;
    loadingP.textContent = `${progressCount}% loading`;
    setTimeout(() => {
      requestAnimationFrame(load);
    }, 300);
  };

  return load;
};

const incrementMod100 = (i) => (i + 1) % 100;

const progressEl = document.getElementById("progress");
const loadingP = document.getElementById("loading");

const loader = makeLoader(progressEl, incrementMod100);
requestAnimationFrame(loader);
