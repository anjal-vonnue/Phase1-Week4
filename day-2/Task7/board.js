//link: https://rxdb.info/articles/indexeddb/indexeddb-tutorial.html

let addButtons;
let columns;
let tasks;
let dltButton;
let dragTask = null;

let keyboardTask = null;
let currentColumn = 0;

function saveState() {
  const container = document.querySelector(".container");
  localStorage.setItem("board", container.innerHTML);
}

function loadState() {
  const savedState = localStorage.getItem("board");
  console.log(savedState);

  if (savedState) {
    let container = document.querySelector(".container");
    container.innerHTML = savedState;
    console.log("container, ", container);
  }
  console.log("outside local state");

  render();
  liAssign();
  deleteButtonAssign();
}

function liAssign() {
  tasks = document.querySelectorAll(".task");

  tasks.forEach((task) => {
    task.draggable = true;

    task.addEventListener("keydown", handleKeyboard);

    task.addEventListener("dragstart", (e) => {
      e.target.id = "dragged-task";
      dragTask = e.target;
    });

    task.addEventListener("dragend", (e) => {
      e.target.id = "";
      saveState();
    });
  });
}

function deleteButtonAssign() {
  dltButton = document.querySelectorAll(".button_delete");
  dltButton.forEach((dltBtn) => {
    console.log("delete");

    dltBtn.addEventListener("click", () => {
      const dltLi = dltBtn.closest("li");
      dltLi.remove();
      saveState();
    });
  });
}

function render() {
  console.log("inside render");

  columns = document.querySelectorAll(".task-column");
  dltButton = document.querySelectorAll(".button_delete");
  addButtons = document.querySelectorAll(".button_add");

  addButtons.forEach((button) => {
    console.log("buton");

    button.addEventListener("click", () => {
      const ul = button.closest(".task-column").querySelector(".tasks");
      const input = button.closest(".task-column").querySelector(".new_task");

      const p = document.createElement("p");
      p.textContent = input.value;
      const btn = document.createElement("button");
      btn.textContent = "delete";
      btn.classList.add("button_delete");
      const li = document.createElement("li");
      li.classList.add("task", "task-flex");
      li.draggable = true;
      li.appendChild(p);
      li.appendChild(btn);
      console.log("ul", ul);

      ul.appendChild(li);

      saveState();
      input.value = "";
      liAssign();
      deleteButtonAssign();
    });
  });

  columns.forEach((column) => {
    column.addEventListener("dragenter", (e) => {
      e.preventDefault();
      column.classList.add("col-color");
    });

    column.addEventListener("dragleave", (e) => {
      column.classList.remove("col-color");
    });
    column.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    column.addEventListener("drop", () => {
      if (dragTask) {
        column.querySelector("ul").appendChild(dragTask);
        saveState();
      }
      column.classList.remove("col-color");
    });
  });
}

console.log("addButtons", addButtons);

loadState();

function handleKeyboard(e) {
  const task = e.currentTarget;
  console.log(task);

  switch (e.code) {
    case "Space":
      e.preventDefault();

      if (!keyboardTask) {
        keyboardTask = task;
        const parentColumn = task.closest(".task-column");
        currentColumn = [...columns].indexOf(parentColumn);
      } else {
        keyboardTask = null;
        saveState();
      }
      break;

    case "ArrowRight":
      if (!keyboardTask) return;

      e.preventDefault();

      if (currentColumn < columns.length - 1) {
        currentColumn++;

        columns[currentColumn]
          .querySelector(".tasks")
          .appendChild(keyboardTask);

        keyboardTask.focus();
      }
      break;

    case "ArrowLeft":
      if (!keyboardTask) return;

      e.preventDefault();

      if (currentColumn > 0) {
        currentColumn--;

        columns[currentColumn]
          .querySelector(".tasks")
          .appendChild(keyboardTask);

        keyboardTask.focus();
      }
      break;
  }
}
