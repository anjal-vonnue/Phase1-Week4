export function accordionOnLoad() {
  const inputElement = document.querySelectorAll(".input-tag");
  const localState = localStorage.getItem("acc-state");
  if (localState !== null) {
    const saveInput = inputElement[localState];
    saveInput.checked = true;

    expandFn({ target: saveInput }, Number(localState));
  }
}

function expandFn(e, i) {
  const inputElement = document.querySelectorAll(".input-tag");
  let divElement = e.target.closest("div").querySelector("div.content");
  if (e.target.checked) {
    console.log("checked");
    console.log(divElement);
    e.target.setAttribute("aria-expanded", "true");
    divElement.style.maxHeight = "100px";

    localStorage.setItem("acc-state", i);

    for (let j = 0; j < inputElement.length; j++) {
      if (j != i) {
        inputElement[j].checked = false;
        inputElement[j].setAttribute("aria-expanded", false);
        let closedDiv = inputElement[j]
          .closest("div")
          .querySelector("div.content");

        console.log(closedDiv);
        closedDiv.style.maxHeight = "0";
      }
    }
  } else {
    console.log("not checked");
    divElement.style.maxHeight = "0";
    localStorage.removeItem("acc-state");
  }
}

export function addChangeEventToAccordion() {
  const inputElement = document.querySelectorAll(".input-tag");

  for (let i = 0; i < inputElement.length; i++) {
    inputElement[i].addEventListener("change", (e) => {
      expandFn(e, i);
    });
  }
}

export function addKeyboardtToAccordion() {
  const inputElement = document.querySelectorAll(".input-tag");

  for (let i = 0; i < inputElement.length; i++) {
    inputElement[i].addEventListener("keydown", (e) => {
      let keyPressed = e.key;
      console.log(keyPressed);

      if (keyPressed == "ArrowDown") {
        //   let header = inputElement[i + 1].closest("div").querySelector("label");
        //   header.style.outline = "3px solid black";
        inputElement[i + 1].focus();
      }
      if (keyPressed == "ArrowUp") {
        //   let header = inputElement[i - 1].closest("div").querySelector("label");
        //   header.style.outline = "3px solid black";
        inputElement[i - 1].focus();
      }

      if (keyPressed == "Home") {
        e.preventDefault();
        inputElement[0].focus();
      }

      if (keyPressed == "End") {
        e.preventDefault();
        inputElement[inputElement.length - 1].focus();
      }

      if (keyPressed == "Enter") {
        inputElement[i].checked = !inputElement[i].checked;

        expandFn(e, i);
      }
    });
  }
}
