//link: https://easings.net/#easeOutCubic

const counter = document.querySelector(".counter");
const initialValue = 0;
const finalValue = 1000;
const duration = 3000;

function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

const start = performance.now();

function updateCounter() {
  const timeDiff = performance.now() - start;

  const progress = Math.min(timeDiff / duration, 1);

  const value =
    initialValue + (finalValue - initialValue) * easeOutCubic(progress);

  counter.textContent = Math.floor(value);

  if (progress < 1) {
    requestAnimationFrame(updateCounter);
  }
}

updateCounter();
