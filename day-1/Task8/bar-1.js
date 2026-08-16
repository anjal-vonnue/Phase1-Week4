//link: https://webdesign.tutsplus.com/how-to-draw-bar-charts-using-javascript-and-html5-canvas--cms-28561t

let myCanvas = document.getElementById("myCanvas");
myCanvas.width = 500;
myCanvas.height = 500;

let ctx = myCanvas.getContext("2d");

function drawLine(ctx, startX, startY, endX, endY, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.restore();
}

function drawBar(
  ctx,
  upperLeftCornerX,
  upperLeftCornerY,
  width,
  height,
  color,
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
  ctx.restore();
}

class BarChart {
  constructor(options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
    this.titleOptions = options.titleOptions;
    this.maxValue = Math.max(...Object.values(this.options.data));
  }

  drawGridLines() {
    let canvasActualHeight = this.canvas.height - this.options.padding * 2;
    let canvasActualWidth = this.canvas.width - this.options.padding * 2;

    let gridValue = 0;

    while (gridValue <= this.maxValue) {
      let gridY =
        canvasActualHeight * (1 - gridValue / this.maxValue) +
        this.options.padding;

      drawLine(
        this.ctx,
        0,
        gridY,
        this.canvas.width,
        gridY,
        this.options.gridColor,
      );

      drawLine(
        this.ctx,
        15,
        this.options.padding / 2,
        15,
        gridY + this.options.padding / 2,
        this.options.gridColor,
      );

      this.ctx.save();
      this.ctx.fillStyle = this.options.gridColor;
      this.ctx.textBaseline = "bottom";
      this.ctx.font = "bold 10px Arial";
      this.ctx.fillText(gridValue, 0, gridY - 2);
      this.ctx.restore();

      gridValue += this.options.gridScale;
    }
  }

  drawBars() {
    let canvasActualHeight = this.canvas.height - this.options.padding * 2;
    let canvasActualWidth = this.canvas.width - this.options.padding * 2;

    let barIndex = 0;
    let numberOfBars = Object.keys(this.options.data).length;
    let barSize = canvasActualWidth / numberOfBars;

    let values = Object.values(this.options.data);

    for (let val of values) {
      let barHeight = Math.round((canvasActualHeight * val) / this.maxValue);

      drawBar(
        this.ctx,
        this.options.padding + barIndex * barSize,
        this.canvas.height - barHeight - this.options.padding,
        barSize,
        barHeight,
        this.colors[barIndex % this.colors.length],
      );

      barIndex++;
    }
  }

  drawLabel() {
    this.ctx.save();
    this.ctx.textBaseline = "bottom";
    this.ctx.fillStyle = this.titleOptions.align;
    this.ctx.font = `${this.titleOptions.font.weight} ${this.titleOptions.font.size} ${this.titleOptions.font.family}`;

    let xPos = this.canvas.width / 2;

    if (this.titleOptions.align == "left") {
      xPos = 10;
    }
    if (this.titleOptions.align == "right") {
      xPos = this.canvas.width - 10;
    }

    this.ctx.fillText(this.options.seriesName, xPos, this.canvas.height);

    this.ctx.restore();
  }

  draw() {
    this.drawGridLines();
    this.drawBars();
    this.drawLabel();
  }
}

let myBarchart = new BarChart({
  canvas: myCanvas,
  seriesName: "Vinyl records",
  padding: 20,
  gridScale: 5,
  gridColor: "#eeeeee",
  data: {
    "Classical Music": 16,
    "Alternative Rock": 12,
    Pop: 18,
    Jazz: 32,
  },
  colors: ["#a55ca5", "#67b6c7", "#bccd7a", "#eb9743"],
  titleOptions: {
    align: "center",
    fill: "black",
    font: {
      weight: "bold",
      size: "18px",
      family: "Lato",
    },
  },
});
myBarchart.draw();
