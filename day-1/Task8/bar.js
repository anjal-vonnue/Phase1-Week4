const myCanvas = document.getElementById("myCanvas");
console.log(myCanvas);

myCanvas.width = 550;
myCanvas.height = 350;

const ctx = myCanvas.getContext("2d");

const sales = [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const gradient = ctx.createLinearGradient(0, 20, 0, 260);
gradient.addColorStop(0, "red");
gradient.addColorStop(1, "orange");

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

const duration = 1500;
const startTime = performance.now();

let hoveredBar = -1;

let mouseX = 0;
let mouseY = 0;

myCanvas.addEventListener("mousemove", function (event) {
  const rect = myCanvas.getBoundingClientRect();

  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;

  hoveredBar = -1;

  for (let i = 0; i < sales.length; i++) {
    let x = 60 + i * 35;
    let height = sales[i];

    let barY = 260 - height;
    let barWidth = 25;

    if (
      mouseX >= x &&
      mouseX <= x + barWidth &&
      mouseY >= barY &&
      mouseY <= 260
    ) {
      hoveredBar = i;
      break;
    }
  }
});

myCanvas.addEventListener("mouseleave", function () {
  hoveredBar = -1;
});

function animate(currentTime) {
  let progress = (currentTime - startTime) / duration;

  progress = Math.min(progress, 1);

  const easedProgress = easeOut(progress);

  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

  ctx.strokeStyle = "lightgray";

  for (let y = 20; y <= 240; y += 20) {
    ctx.beginPath();
    ctx.moveTo(50, 260 - y);
    ctx.lineTo(500, 260 - y);
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.fillText(y, 20, 260 - y + 5);
  }

  for (let i = 0; i < sales.length; i++) {
    let x = 60 + i * 35;

    let height = sales[i] * easedProgress;

    let barY = 260 - height;

    ctx.fillStyle = gradient;
    ctx.fillRect(x, barY, 25, height);

    ctx.fillStyle = "black";
    ctx.fillText(months[i], x, 280);
  }

  ctx.fillStyle = "black";
  ctx.font = "16px Arial";

  ctx.fillText("Month", 260, 320);

  ctx.save();

  ctx.translate(15, 180);
  ctx.rotate(-Math.PI / 2);

  ctx.fillText("Sales", 0, 0);

  ctx.restore();

  if (hoveredBar !== -1 && progress >= 1) {
    const i = hoveredBar;

    const x = 60 + i * 35;
    const height = sales[i];
    const barY = 260 - height;

    const tooltipX = x + 30;
    const tooltipY = barY;

    ctx.fillStyle = "black";

    ctx.fillRect(tooltipX, tooltipY, 90, 35);

    ctx.fillStyle = "white";
    ctx.font = "14px Arial";

    ctx.fillText(`${months[i]}: ${sales[i]}`, tooltipX + 10, tooltipY + 22);
  }

  if (progress < 1) {
    requestAnimationFrame(animate);
  }
}

requestAnimationFrame(animate);

myCanvas.addEventListener("mousemove", function () {
  if (performance.now() - startTime >= duration) {
    animate(performance.now());
  }
});

function downloadChart() {
  const image = myCanvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "chart.png";
  link.href = image;
  link.click();
}
