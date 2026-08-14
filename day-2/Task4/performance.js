function renderNode() {
  const domContainer = document.getElementById("dom-container");
  domContainer.innerHTML = "";

  for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `div ${i + 1}`;
    domContainer.appendChild(div);
  }
}

function renderVirtual() {
  const virtualContainer = document.getElementById("virtual-container");
  virtualContainer.innerHTML = "";

  for (let i = 0; i < 20; i++) {
    const div = document.createElement("div");
    div.textContent = `item ${i + 1}`;
    virtualContainer.appendChild(div);
  }
}

const domStart = performance.now();
renderNode();
const domEnd = performance.now();
console.log(`Time to Render Nodes: ${domEnd - domStart}`);

const virtualStart = performance.now();
renderVirtual();
const virtualEnd = performance.now();
console.log(`Time to Render Virtual Nodes: ${virtualEnd - virtualStart}`);

///PeformanceObserve

const logLCP = new PerformanceObserver((entryList) => {
  const entries = entryList.getEntries();
  console.log(entries);

  const lastEntry = entries[entries.length - 1];
  //   console.log("firstEntry: ", entries[0]);
  //   console.log("lastEntry: ", lastEntry);

  console.log(`lsp starttime: ${lastEntry.startTime}`);
});

logLCP.observe({ type: "largest-contentful-paint", buffered: true });

let clsCount = 0;

const logCLS = new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    if (!entry.hadRecentInput) {
      clsCount = clsCount + entry.value;
      console.log("entry value: ", entry.value);
    }
  }
});

logCLS.observe({ type: "layout-shift", buffered: true });
