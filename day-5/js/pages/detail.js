import { Button } from "../components/button.js";
import { Card } from "../components/card.js";

export function renderDetail(state) {
  console.log("state: ", state);

  const id = state.params.id;
  console.log("id: ", id);

  const todo = state.todos.find((todo) => {
    console.log("todo: ", todo);

    if (todo.id === Number(id)) {
      return todo;
    }
  });
  console.log("todo: ", todo);

  const section = document.createElement("section");
  section.className = "section-container";

  const div = document.createElement("div");
  div.className = "recent-tasks";

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
  });

  div.appendChild(card);

  section.appendChild(div);

  return section;
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
