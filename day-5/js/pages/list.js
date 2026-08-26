import { Button } from "../components/button.js";
import { Card } from "../components/card.js";
import { Modal } from "../components/modal.js";
import { app } from "../main.js";

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
      text: "COMPLETED",
      onClick: completeTask,
      type: "button",
    });

    const undoButton = Button({
      text: "UNDO",
      onClick: undoTask,
      type: "button",
    });

    const deleteButton = Button({
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

function completeTask() {
  console.log("task completed");
}

function undoTask() {
  console.log("task undone");
}

function deleteTask() {
  console.log("task deleted");
}
