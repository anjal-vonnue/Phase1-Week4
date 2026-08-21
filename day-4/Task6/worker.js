self.onmessage = function (e) {
  if (e.data === "start") {
    console.log("helow");

    const data = [];
    for (let i = 0; i < 100000; i++) {
      data.push({
        id: i,
        value: Math.floor(Math.random() * 100000),
      });
    }

    data.sort((a, b) => a.value - b.value);

    self.postMessage(data);
  }
};
