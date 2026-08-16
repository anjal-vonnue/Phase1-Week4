//link: https://rxdb.info/articles/indexeddb/indexeddb-tutorial.html

let db;

export function openDB() {
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
      db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      console.log("failed to open db");
      reject(event.target.error);
    };
  });
}

export function addRecord(todo) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("todos", "readwrite");
    const store = tx.objectStore("todos");
    const request = store.add(todo);

    request.onsuccess = () => {
      console.log("added key: ", request.result);
      resolve(request.result);
    };

    request.onerror = () => {
      console.log("add failed", request.error);
      reject(request.error);
    };

    tx.onerror = () => {
      console.log("write failed", tx.error);
      reject(request.error);
    };
  });
}

export function getRecord(id) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("todos", "readonly");
    const store = tx.objectStore("todos");
    const request = store.get(id);

    request.onsuccess = () => {
      console.log("tods: ", request.result);
      resolve(request.result);
    };

    request.onerror = () => {
      console.log("get failed: ", request.error);
      reject(request.error);
    };
  });
}

export function getAllRecords() {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("todos", "readonly");
    const store = tx.objectStore("todos");
    const request = store.getAll();

    request.onsuccess = () => {
      //   console.log("all todos: ", request.result);
      resolve(request.result);
    };

    request.onerror = () => {
      console.log("get all failed: ", request.error);
      reject(request.error);
    };
  });
}

export function deleteRecord(id) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("todos", "readwrite");
    const store = tx.objectStore("todos");
    const request = store.delete(id);

    request.onsuccess = () => {
      console.log("todo deleted: ", request.result);
      resolve(request.result);
    };

    request.onerror = () => {
      console.log("delete failed: ", request.onerror);
      reject(request.error);
    };
  });
}

export function updateRecord(todo) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("todos", "readwrite");
    const store = tx.objectStore("todos");

    const request = store.put(todo);

    request.onsuccess = () => {
      resolve(todo);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}
