import { Button } from "../components/button.js";
import { Card } from "../components/card.js";
import { Modal } from "../components/modal.js";
import { app, store } from "../main.js";

export function renderList(state, router) {
  const section = document.createElement("section");
  section.className = "section-container";

  const curdButton = document.createElement("div");
  curdButton.className = "crud-buttons";

  const addTaskButton = Button({
    text: "ADD TASK",
    onClick: addTask,
    type: "button",
    className: "add-task",
  });

  const editTaskButton = Button({
    text: "EDIT TASK",
    onClick: editTask,
    type: "button",
    className: "edit-task",
  });

  curdButton.appendChild(addTaskButton);
  curdButton.appendChild(editTaskButton);

  const allTaskDiv = document.createElement("div");
  allTaskDiv.className = "recent-task";
  const heading = document.createElement("h3");
  heading.textContent = "All Tasks";

  const sortedTodos = state.todos.sort((a, b) => b.createdAt - a.createdAt);

  sortedTodos.forEach((todo) => {
    const completeButton = Button({
      id: todo.id,
      text: "COMPLETED",
      onClick: completeTask,
      type: "button",
    });

    const undoButton = Button({
      id: todo.id,
      text: "UNDO",
      onClick: undoTask,
      type: "button",
    });

    const deleteButton = Button({
      id: todo.id,
      text: "DELETE",
      onClick: deleteTask,
      type: "button",
    });

    const card = Card({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      createdAt: todo.createdAt,
      status: todo.status,
      children: [completeButton, undoButton, deleteButton],
      router: router,
    });

    allTaskDiv.appendChild(card);
  });

  section.appendChild(curdButton);
  section.appendChild(allTaskDiv);

  return section;
}

function addTask() {
  console.log("add task clicked");
  const modal = Modal("add");
  app.appendChild(modal);
}

function editTask() {
  console.log("edit task button");
  const modal = Modal("edit");
  app.appendChild(modal);
}

function completeTask(id) {
  console.log("task completed: ", id);
  store.dispatch({
    type: "TASK_COMPLETED",
    payload: {
      id: id,
    },
  });
}

function undoTask(id) {
  console.log("task undone: ", id);

  store.dispatch({
    type: "TASK_UNDO",
    payload: {
      id: id,
    },
  });
}

function deleteTask(id) {
  console.log("task deleted: ", id);
  store.dispatch({
    type: "TASK_DELETE",
    payload: {
      id: id,
    },
  });
}
