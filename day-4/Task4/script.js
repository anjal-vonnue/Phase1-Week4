//link: https://stackoverflow.com/questions/34235357/garbage-collection-on-map-and-weakmap-collections-in-es6

const map = new Map();

function addElementToMap() {
  for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `DIV NO.${i}`;

    map.set(div, {
      title: `DIV NO.${i}`,
      element: "div",
    });

    document.body.appendChild(div);
  }
}

function removeElementFromDoc() {
  const divs = document.querySelectorAll("div");

  divs.forEach((div) => {
    div.remove();
  });
}

const weekMap = new WeakMap();

function addElementToWeekMap() {
  for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `DIV NO.${i}`;

    weekMap.set(div, {
      title: `Week DIV NO.${i}`,
      element: "div",
    });

    document.body.appendChild(div);
  }
}

//Map
// addElementToMap();
// removeElementFromDoc();

//Week Map
addElementToWeekMap();

removeElementFromDoc();

//link: https://medium.com/@ignatovich.dm/javascript-symbols-and-weakmaps-designing-truly-private-and-unique-properties-236ef0dbb7db

const privateData = new WeakMap();

class Account {
  constructor(name, balance) {
    privateData.set(this, {
      name,
      balance,
    });
  }

  getName() {
    return privateData.get(this).name;
  }

  getBalance() {
    return privateData.get(this).balance;
  }
}

const myAccount = new Account("Anjal", 100000);

console.log("HOLDER NAME: ", myAccount.getName());
console.log("ACCOUNT BALANCE: ", myAccount.getBalance());

console.log("name direct access: ", myAccount.name);
console.log("balance direct access: ", myAccount.balance);
