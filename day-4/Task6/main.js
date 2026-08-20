//link: https://www.youtube.com/watch?v=k2RmGMwBPbs

const worker = new Worker("./worker.js");

const statusSpan = document.getElementById("status");
const sortButton = document.getElementById("sort");
const bgButton = document.getElementById("btn");
const result = document.getElementById("result");

sortButton.addEventListener("click", () => {
  statusSpan.textContent = "started Sorting";

  worker.postMessage("start");
});

worker.onmessage = function (e) {
  const data = e.data;
  statusSpan.textContent = "sorting completed";
  data.forEach((element) => {
    const div = document.createElement("div");
    const pTitle = document.createElement("p");
    pTitle.textContent = `id: ${element.id}`;
    const pValue = document.createElement("p");
    pValue.textContent = `value: ${element.value}`;

    div.appendChild(pTitle);
    div.appendChild(pValue);

    result.appendChild(div);
  });
};

bgButton.addEventListener("click", () => {
  if (document.body.style.background !== "red") {
    document.body.style.background = "red";
  } else {
    document.body.style.background = "white";
  }
});

function generateObjects() {
  const data = [];
  for (let i = 0; i < 10000000; i++) {
    data.push({
      id: i,
      value: Math.floor(Math.random() * 10000000),
    });
  }

  return data;
}
