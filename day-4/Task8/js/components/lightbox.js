export function addLightBox() {
  const images = document.querySelectorAll(".image");
  const lightbox = document.getElementById("lightbox");
  const lightboxContainer = document.getElementById("lightbox_container");
  const closeButton = document.getElementById("close_button");
  const nextButton = document.getElementById("next_button");
  const prevButton = document.getElementById("prev_button");
  const buttons = [closeButton, nextButton, prevButton];
  let buttonIndex = 0;
  let imageIndex = 0;
  let intialTouchX, finalTouchX;

  if (images.length === 0) {
    return;
  }
  nextButton.addEventListener("click", () => {
    showNext();
  });

  prevButton.addEventListener("click", () => {
    showPrev();
  });

  closeButton.addEventListener("click", () => {
    closeLightBox();
  });

  for (let i = 0; i < images.length; i++) {
    images[i].addEventListener("click", () => {
      let imgSrc = images[i].getAttribute("src");
      imageIndex = i;
      openLightBox(imageIndex, imgSrc);
    });
  }

  function openLightBox(index, imgSrc) {
    lightbox.querySelector("img").src = imgSrc;
    lightboxContainer.classList.remove("close");
  }

  function showPrev() {
    if (imageIndex == 0) {
      imageIndex = images.length - 1;
    } else {
      imageIndex--;
    }
    openLightBox(imageIndex, images[imageIndex].getAttribute("src"));
  }

  function showNext() {
    if (imageIndex == 4) {
      imageIndex = 0;
    } else {
      imageIndex++;
    }
    openLightBox(imageIndex, images[imageIndex].getAttribute("src"));
  }

  function closeLightBox() {
    lightbox.querySelector("img").src = "";
    lightboxContainer.classList.add("close");
  }

  document.addEventListener("keydown", (e) => {
    console.log(e.key);

    if (e.key == "ArrowRight") {
      showNext();
    }
    if (e.key == "ArrowLeft") {
      showPrev();
    }
    if (e.key == "Escape") {
      closeLightBox();
    }

    if (e.key == "Tab") {
      e.preventDefault();
      if (lightboxContainer.classList.contains("close")) {
        return;
      }
      buttons[buttonIndex].classList.remove("outline");
      if (buttonIndex == 0) {
        buttonIndex++;
      } else if (buttonIndex == 2) {
        buttonIndex = 0;
      } else {
        buttonIndex++;
      }
      buttons[buttonIndex].focus();
      console.log(buttons[buttonIndex]);
      buttons[buttonIndex].classList.add("outline");
    }
  });

  function handleTouch(intialTouchX, finalTouchX) {
    if (lightboxContainer.classList.contains("close")) {
      return;
    }
    console.log("initial", intialTouchX);
    console.log("final", finalTouchX);

    let horizontalDistance = finalTouchX - intialTouchX;
    console.log("horizontal", horizontalDistance);

    if (horizontalDistance < 0) {
      showNext();
    } else {
      showPrev();
    }
  }

  document.addEventListener("touchstart", (e) => {
    intialTouchX = e.touches[0].clientX;
  });

  document.addEventListener("touchend", (e) => {
    finalTouchX = e.changedTouches[0].clientX;

    handleTouch(intialTouchX, finalTouchX);
  });
}
