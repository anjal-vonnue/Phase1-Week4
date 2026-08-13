setTimeout(() => {
  if (!localStorage.getItem("data-one")) {
    localStorage.setItem("data-one", "hello");
  }
  console.log(localStorage.getItem("data-one"));
}, 5000);

console.log(localStorage.getItem("data-one"));

const storageManager = {
  get(key) {
    if (localStorage.getItem(key)) {
      //   console.log("key: ", key);

      const value = JSON.parse(localStorage.getItem(key));

      if (Date.now() >= value.expiresAt) {
        this.delete(key);
        return null;
      }

      return value;
    }
    return null;
  },

  set(key, value, ttl) {
    const item = {
      value: value,
      expiresAt: Date.now() + ttl,
    };
    // console.log("item: ", item);

    localStorage.setItem(key, JSON.stringify(item));
  },

  delete(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};

storageManager.set("name", "anjal", 5000);
console.log(storageManager.get("name"));
setTimeout(() => {
  console.log(storageManager.get("name"));
}, 6000);

setTimeout(() => {
  console.log(storageManager.get("name"));
}, 2000);

const request = indexedDB.open("taskOne", 1);

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  console.log(db);

  const store = db.createObjectStore("todos", { keyPath: "id" });
  console.log("success");
};

let db;
request.onsuccess = (event) => {
  db = event.target.result;
  addTodo(todo);
  readTodo(1);
};

request.onerror = (event) => {
  console.error("could not open the database ", event.target.error);
};

function addTodo(todo) {
  const tx = db.transaction("todos", "readwrite");
  const store = tx.objectStore("todos");
  const request = store.add(todo);

  request.onsuccess = () => console.log("addey key: ", request.result);
  tx.onerror = () => console.log("write failed", tx.error);
}

const todo = {
  id: 1,
  name: " complete day 2 tasks",
  category: "week 4",
  done: false,
};

function readTodo(id) {
  const tx = db.transaction("todos", "readonly");
  const store = tx.objectStore("todos");
  const request = store.get(id);

  request.onsuccess = () => {
    console.log(request.result);
  };
}
