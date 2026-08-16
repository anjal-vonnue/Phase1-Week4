//link: https://rxdb.info/articles/indexeddb/indexeddb-tutorial.html

import {
  openDB,
  addRecord,
  getRecord,
  getAllRecords,
  deleteRecord,
  updateRecord,
} from "./db.js";

let addButtons;
let columns;
let tasks;
let dltButton;
let dragTask = null;

let keyboardTask = null;
let currentColumn = 0;

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
      //   saveState();
    });
  });
}

function deleteButtonAssign() {
  dltButton = document.querySelectorAll(".button_delete");
  dltButton.forEach((dltBtn) => {
    // console.log("delete");

    dltBtn.addEventListener("click", async () => {
      const dltLi = dltBtn.closest("li");
      const id = dltLi.dataset.id;

      await deleteTodo(id);
    });
  });
}

async function addTodo(title, status) {
  const todo = {
    id: crypto.randomUUID(),
    title: title,
    status: status,
    done: status === "done",
    updatedAt: Date.now(),
    pending: true,
  };

  await addRecord(todo);

  await render();
}

async function deleteTodo(id) {
  await deleteRecord(id);

  await render();
}

async function render() {
  console.log("inside render");

  const todos = await getAllRecords();
  columns = document.querySelectorAll(".task-column");

  document.querySelectorAll(".tasks").forEach((ul) => {
    ul.innerHTML = "";
  });

  todos.forEach((todo) => {
    const column = document.querySelector(
      `.task-column[data-status=${todo.status}]`,
    );
    // console.log(column);

    const ul = column.querySelector(".tasks");

    const li = document.createElement("li");
    li.classList.add("task", "task-flex");
    li.draggable = true;
    li.tabIndex = 0;

    li.dataset.id = todo.id;

    const p = document.createElement("p");
    p.textContent = todo.title;

    const button = document.createElement("button");
    button.textContent = "delete";
    button.classList.add("button_delete");

    li.appendChild(p);
    li.appendChild(button);

    ul.appendChild(li);
  });

  liAssign();

  deleteButtonAssign();
}

async function changeColumn(id, column) {
  const todo = await getRecord(id);

  if (!todo) return;

  todo.status = column.dataset.status;
  todo.done = todo.status === "done";
  todo.updatedAt = Date.now();
  todo.pending = true;

  await updateRecord(todo);

  await render();

  const newTask = document.querySelector(`.task[data-id="${id}"]`);

  if (newTask) {
    newTask.classList.add("keyboard-task");
    newTask.focus();
    keyboardTask = newTask;
  }
}

async function handleKeyboard(e) {
  const task = e.currentTarget;
  console.log(task);

  switch (e.code) {
    case "Space":
      e.preventDefault();

      if (!keyboardTask) {
        keyboardTask = task;
        const parentColumn = task.closest(".task-column");
        currentColumn = [...columns].indexOf(parentColumn);
        keyboardTask.classList.add("keyboard-task");
      } else {
        keyboardTask.classList.remove("keyboard-task");
        keyboardTask = null;
        // saveState();
      }
      break;

    case "ArrowRight":
      if (!keyboardTask) return;

      e.preventDefault();

      if (currentColumn < columns.length - 1) {
        currentColumn++;

        await changeColumn(keyboardTask.dataset.id, columns[currentColumn]);
      }
      break;

    case "ArrowLeft":
      if (!keyboardTask) return;

      e.preventDefault();

      if (currentColumn > 0) {
        currentColumn--;

        await changeColumn(keyboardTask.dataset.id, columns[currentColumn]);
      }
      break;
  }
}

function eventListenerSetup() {
  columns = document.querySelectorAll(".task-column");
  const addButtons = document.querySelectorAll(".button_add");

  addButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const column = button.closest(".task-column");
      const input = column.querySelector(".new_task");

      const title = input.value.trim();

      if (!title) return;

      const status = column.dataset.status;

      await addTodo(title, status);

      input.value = "";
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

    column.addEventListener("drop", async () => {
      if (!dragTask) return;
      const id = dragTask.dataset.id;
      const todo = await getRecord(id);

      todo.status = column.dataset.status;
      todo.done = todo.status === "done";
      todo.updatedAt = Date.now();
      todo.pending = true;

      await updateRecord(todo);

      await render();

      dragTask = null;
      column.classList.remove("col-color");
    });
  });
}

async function fakeServer(todo) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("saved to server: ", todo);
      resolve({ success: true });
    }, 500);
  });
}

async function saveToServer() {
  if (!navigator.onLine) {
    console.log("you are offline");
    return;
  }

  const todos = await getAllRecords();

  const pendingTodos = todos.filter((todo) => todo.pending);

  for (const todo of pendingTodos) {
    try {
      await fakeServer(todo);

      todo.pending = false;

      updateRecord(todo);

      console.log("todo saved to server: ", todo);
    } catch (error) {
      console.log("failed to save to server");
    }
  }
}

window.addEventListener("online", () => {
  console.log("window listener online");

  saveToServer();
});

async function init() {
  await openDB();
  await render();
  eventListenerSetup();
}

init();

// function render() {
//   console.log("inside render");

//   columns = document.querySelectorAll(".task-column");
//   dltButton = document.querySelectorAll(".button_delete");
//   addButtons = document.querySelectorAll(".button_add");

//   addButtons.forEach((button) => {
//     console.log("buton");

//     button.addEventListener("click", () => {
//       const ul = button.closest(".task-column").querySelector(".tasks");
//       const input = button.closest(".task-column").querySelector(".new_task");

//       const p = document.createElement("p");
//       p.textContent = input.value;
//       const btn = document.createElement("button");
//       btn.textContent = "delete";
//       btn.classList.add("button_delete");
//       const li = document.createElement("li");
//       li.classList.add("task", "task-flex");
//       li.draggable = true;
//       li.appendChild(p);
//       li.appendChild(btn);
//       console.log("ul", ul);

//       ul.appendChild(li);

//       saveState();
//       input.value = "";
//       liAssign();
//       deleteButtonAssign();
//     });
//   });

//   columns.forEach((column) => {
//     column.addEventListener("dragenter", (e) => {
//       e.preventDefault();
//       column.classList.add("col-color");
//     });

//     column.addEventListener("dragleave", (e) => {
//       column.classList.remove("col-color");
//     });
//     column.addEventListener("dragover", (e) => {
//       e.preventDefault();
//     });

//     column.addEventListener("drop", () => {
//       if (dragTask) {
//         column.querySelector("ul").appendChild(dragTask);
//         saveState();
//       }
//       column.classList.remove("col-color");
//     });
//   });
// }

// function saveState() {
//   const container = document.querySelector(".container");
//   localStorage.setItem("board", container.innerHTML);
// }

// function loadState() {
//   const savedState = localStorage.getItem("board");
//   console.log(savedState);

//   if (savedState) {
//     let container = document.querySelector(".container");
//     container.innerHTML = savedState;
//     console.log("container, ", container);
//   }
//   console.log("outside local state");

//   render();
//   liAssign();
//   deleteButtonAssign();
// }
