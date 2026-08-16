// const request = indexedDB.open("kanban", 1);

// request.onupgradeneeded = (event) => {
//   const db = event.target.result;

//   const store = db.createObjectStore("todos", { keyPath: "id" });
//   console.log("sucess");
// };

// let db;
// request.onsuccess = (event) => {
//   db = event.target.result;
//   console.log("database opened");
// };

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("kanban", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("todos")) {
        db.createObjectStore("todos", { keyPath: "id" });
        console.log("store created");
      }
    };

    request.onsuccess = (event) => {
      console.log("database opened");

      resolve(event.target.result);
    };

    request.onerror = (event) => {
      console.log("failed to open db");
      reject(event.target.error);
    };
  });
}

function addRecord(todo) {
  const tx = db.transaction("todos", "readwrite");
  const store = tx.objectStore("todos");
  const request = store.add(todo);

  request.onsuccess = () => {
    console.log("added key: ", request.result);
  };

  request.onerror = () => {
    console.log("add failed", request.error);
  };

  tx.onerror = () => {
    console.log("write failed", tx.error);
  };
}

function getRecord(id) {
  const tx = db.transaction("todos", "readonly");
  const store = tx.objectStore("todos");
  const request = store.get(id);

  request.onsuccess = () => {
    console.log("tods: ", request.result);
  };

  request.onerror = () => {
    console.log("get failed: ", request.error);
  };
}

function getAllRecord() {
  const tx = db.transaction("todos", "readonly");
  const store = tx.objectStore("todos");
  const request = store.getAll();

  request.onsuccess = () => {
    console.log("all todos: ", request.result);
  };

  request.onerror = () => {
    console.log("get all failed: ", request.error);
  };
}

function deleteRecord(id) {
  const tx = db.transaction("todos", "readwrite");
  const store = tx.objectStore("todos");
  const request = store.delete(id);

  request.onsuccess = () => {
    console.log("todo deleted: ", request.result);
  };

  request.onerror = () => {
    console.log("delete failed: ", request.onerror);
  };
}

function updateRecord(id, todo) {
  const tx = db.transaction("todos", "readwrite");
  const store = tx.objectStore("todos");
  const getRequest = store.get(id);

  getRequest.onsuccess = () => {
    const existingTodo = getRequest.result;

    existingTodo.done = todo.done;

    const updateTodo = store.put(existingTodo);

    updateTodo.onsuccess = () => {
      console.log("todo updated: ", existingTodo);
    };

    updateTodo.onerror = () => {
      console.log("update failed: ", updateTodo.error);
    };
  };

  getRequest.onerror = () => {
    console.log("there is not todo with id: ", id);
  };
}

let db;

async function initDB() {
  db = await openDB();
}
