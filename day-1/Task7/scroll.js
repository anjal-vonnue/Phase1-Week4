// link: https://dev.to/anishkumar/150-lines-or-less-implementing-virtual-scroll-for-web-from-scratch-4363
// link: https://medium.com/@sohail_saifi/implementing-virtual-scrolling-for-lists-with-100k-items-65867980c917

const TOTAL_ITEM = 10000;
const ITEM_HEIGHT = 50;
const BUFFER_ITEMS = 10;
const CONTAINER_HEIGHT = 500;

const listItems = [];

for (let i = 1; i <= TOTAL_ITEM; i++) {
  const itemText = `Item No: ${i}`;

  listItems.push(itemText);
}

const scrollContainer = document.getElementById("scroll-container");
const scrollDiv = document.getElementById("scroll");
const listContent = document.getElementById("list-content");

scrollDiv.style.height = `${TOTAL_ITEM * ITEM_HEIGHT}px`;

function render() {
  const scrollTop = scrollContainer.scrollTop;
  //   console.log(scrollTop);

  let start = Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER_ITEMS;
  let end =
    Math.ceil((scrollTop + CONTAINER_HEIGHT) / ITEM_HEIGHT) + BUFFER_ITEMS;
  //   console.log(end);

  start = Math.max(0, start);
  end = Math.min(TOTAL_ITEM, end);

  const translateY = start * ITEM_HEIGHT;
  listContent.style.transform = `translateY(${translateY}px)`;

  let list = "";

  for (let i = start; i < end; i++) {
    list = list + `<div class="list-item">${listItems[i]}</div>`;
  }
  listContent.innerHTML = list;
}

scrollContainer.addEventListener("scroll", render);

render();
