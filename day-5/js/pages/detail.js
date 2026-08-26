import { Button } from "../components/button.js";
import { Card } from "../components/card.js";
import { router, store } from "../main.js";

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
  if (todo) {
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
    });

    div.appendChild(card);
  } else {
    const containerDiv = document.createElement("div");
    containerDiv.className = "no-task";
    const h1 = document.createElement("h1");

    h1.textContent = "NO TASK AVIALBLE";

    const button = Button({
      text: "BACK TO LIST?",
      onClick: backBtnFn,
      type: "button",
      className: "back-btn",
    });

    containerDiv.appendChild(h1);
    containerDiv.appendChild(button);
    div.appendChild(containerDiv);
  }

  section.appendChild(div);

  return section;
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

function backBtnFn() {
  router.navigate("/list");
}
