export function addScrollAnimationToIndex() {
  const animationTarget = document.querySelectorAll(".animation-task");

  const observer = new IntersectionObserver((entries) => {
    //   console.log("entries", entries);

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // console.log(entry.target);
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  });

  for (let i = 0; i < animationTarget.length; i++) {
    observer.observe(animationTarget[i]);
  }
}

export function addBackToTop() {
  const backToTop = document.querySelector(".backToTop");

  window.addEventListener("scroll", () => {
    requestAnimationFrame(progressBarUpdate);
    if (scrollY <= 300) {
      backToTop.style.display = "none";
    } else {
      backToTop.style.display = "block";
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  function progressBarUpdate() {
    const innerBar = document.querySelector(".inner-bar");
    const totalScroll = document.body.scrollHeight - window.innerHeight;
    const progress = Math.floor((scrollY / totalScroll) * 100);
    innerBar.style.width = `${progress}%`;
  }
}
