//link: https://www.youtube.com/watch?v=oTOqGdKTsg8

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(listener);
  }

  off(event, listener) {
    if (!this.events[event]) {
      return;
    }

    this.events[event] = this.events[event].filter((fn) => fn !== listener);
  }

  emit(event, ...args) {
    if (!this.events[event]) {
      return;
    }

    this.events[event].forEach((fn) => fn(...args));

    if (this.events["*"]) {
      this.events["*"].forEach((fn) => fn(event, ...args));
    }
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };

    this.on(event, wrapper);
  }
}

const emitter = new EventEmitter();

class UserStore extends EventEmitter {
  constructor() {
    super();
    this.users = [];
  }

  userAdded(user) {
    const userLower = user.toLowerCase();
    if (this.users.includes(userLower)) {
      this.emit("alert", "user already added");
      return;
    } else {
      this.users.push(userLower);
      console.log(this.users);
    }

    this.emit("userAdded", userLower);
  }

  userRemoved(user) {
    const userLower = user.toLowerCase();
    if (this.users.includes(userLower)) {
      this.users = this.users.filter((u) => u !== userLower);
      this.emit("userDeleted", userLower);
      console.log(this.users);
    } else {
      this.emit("alert", "user doesn't exist");
    }
  }

  userUpated(oldName, newName) {
    const oldNameLower = oldName.toLowerCase();
    const newNameLower = newName.toLowerCase();
    if (this.users.includes(oldNameLower)) {
      this.users = this.users.map((u) => {
        if (u === oldNameLower) {
          return newNameLower;
        } else {
          return u;
        }
      });
      this.emit("userUpdated", oldNameLower);
      console.log(this.users);
    } else {
      this.emit("alert", "user doesn't exist");
    }
  }
}

const userStore = new UserStore();

function userAddedLog(user) {
  console.log("user added: ", user);
}

function userDeletedLog(user) {
  console.log("user deleted: ", user);
}

function userUpdatedLog(user) {
  console.log("user updated: ", user);
}

function logAlert(msg) {
  console.log(msg);
}

function appLog(event, data) {
  console.log("===== event: " + event + ". data: " + data + ". =====");
}

userStore.on("userAdded", userAddedLog);
userStore.on("userDeleted", userDeletedLog);
userStore.on("userUpdated", userUpdatedLog);
userStore.on("alert", logAlert);
userStore.on("*", appLog);

userStore.userAdded("Anjal");
userStore.userAdded("Anjal");
userStore.userRemoved("anjal");
userStore.userRemoved("anjal");
userStore.userAdded("Cristiano");
userStore.userAdded("hazard");
userStore.userUpated("Cristiano", "Cristiano Rolando");
