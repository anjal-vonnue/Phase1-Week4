//link: https://www.w3schools.com/js/js_meta_proxy.asp

const msg = document.getElementById("message");
const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
console.log(emailInput);

const user = { name: "your name", email: "your_mail@gmail.com" };
const views = [];

const state = new Proxy(user, {
  get(target, property) {
    return target[property];
  },

  set(target, property, value) {
    target[property] = value;
    views.forEach((view) => view());
    return target[property];
  },

  deleteProperty(target, property) {
    delete target[property];
    views.forEach((view) => view());
  },
});

function renderMessage() {
  msg.textContent = `Hi, ${state.name}. I think your email is ${state.email}`;
}

function registerView(fn) {
  if (fn) {
    views.push(fn);
    fn();
  }
}

registerView(renderMessage);

nameInput.addEventListener("input", (e) => {
  state.name = e.target.value;
});

emailInput.addEventListener("input", (e) => {
  state.email = e.target.value;
});
