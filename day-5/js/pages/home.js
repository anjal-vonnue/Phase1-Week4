import { Button } from "../components/button.js";
import { Card } from "../components/card.js";
import { store } from "../main.js";

export function renderHome(state, router) {
  console.log("this is home page");

  const homeSection = document.createElement("section");
  homeSection.className = "section-container";

  const overviewDiv = document.createElement("div");
  overviewDiv.className = "overview";
  //overview
  //total-tasks
  const totalTaskDiv = document.createElement("div");
  totalTaskDiv.className = "total-tasks";
  const tasksCreated = document.createElement("h3");
  tasksCreated.textContent = "Total Tasks: ";
  const taskSum = document.createElement("span");
  taskSum.id = "task-sum";
  //todo: change
  taskSum.textContent = state.todos.length;
  tasksCreated.appendChild(taskSum);
  totalTaskDiv.appendChild(tasksCreated);

  //tasks-status
  const tasksStatus = document.createElement("div");
  tasksStatus.className = "tasks-status";

  const tasksCompleted = document.createElement("h3");
  tasksCompleted.textContent = "Tasks Completed: ";
  const completedSpan = document.createElement("span");
  completedSpan.id = "task-completed";

  const completedCount = state.todos.filter(
    (todo) => todo.status === "completed",
  ).length;

  completedSpan.textContent = completedCount;
  tasksCompleted.appendChild(completedSpan);

  const tasksPending = document.createElement("h3");
  tasksPending.textContent = "Tasks Pending: ";
  const pendingSpan = document.createElement("span");
  pendingSpan.id = "task-pending";

  const pendingCount = state.todos.filter(
    (todo) => todo.status === "pending",
  ).length;

  pendingSpan.textContent = pendingCount;
  tasksPending.appendChild(pendingSpan);

  tasksStatus.appendChild(tasksCompleted);
  tasksStatus.appendChild(tasksPending);

  overviewDiv.appendChild(totalTaskDiv);
  overviewDiv.appendChild(tasksStatus);

  //recent-tasks
  const recentTasksDiv = document.createElement("div");
  recentTasksDiv.className = "recent-tasks";
  const recentHeading = document.createElement("h3");
  recentHeading.textContent = "Recent Tasks";

  state.todos.forEach((todo) => {
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

    recentTasksDiv.appendChild(card);
  });

  homeSection.appendChild(overviewDiv);
  homeSection.appendChild(recentTasksDiv);
  return homeSection;
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
