const CartModule = (() => {
  let items = [];

  function addItem({ id, name, price, quantity }) {
    if (items.some((item) => item.name === name)) {
      console.log("item already exists");
    } else {
      items.push({ id, name, price, quantity });
    }

    console.log("item added: ", items);
  }

  function removeItem(name) {
    items = items.filter((item) => item.name !== name);
    console.log("item removed: ", items);
  }

  function updateQuantity({ name, quantity }) {
    items.forEach((item) => {
      if (item.name === name) {
        item.quantity = quantity;
      }
    });
    console.log("item updated: ", items);
  }

  function getItems() {
    return items;
  }

  function getTotal() {
    let total = 0;
    items.forEach((item) => {
      total = total + item.quantity * item.price;
    });

    return total;
  }

  function clear() {
    items = [];
    console.log("cleared Items: ", items);
  }

  return {
    addItem,
    removeItem,
    updateQuantity,
    getItems,
    getTotal,
    clear,
  };
})();

CartModule.addItem({ id: 1, name: "banana", price: 35, quantity: 1 });
CartModule.addItem({ id: 2, name: "apple", price: 350, quantity: 2 });
CartModule.removeItem("banana");
CartModule.addItem({ id: 3, name: "grapes", price: 80, quantity: 5 });
console.log(CartModule.getTotal());
CartModule.clear();

// console.log(CartModule.items);
// CartModule.items[0].name = "chocolates";
