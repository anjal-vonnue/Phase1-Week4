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

export async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("failed to fetch the response");
    }

    const result = response.json();
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const emitter = new EventEmitter();
