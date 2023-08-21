export default class Tool {
  constructor(canvas, color, socket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.strokeStyle = color;
    this.ctx.lineCap = "round";
    this.socket = socket;
  }

  fillColor(color) {
    this.ctx.fillStyle = color;
  }
  strokeColor(color) {
    this.ctx.strokeStyle = color;
  }
  lineWidth(width) {
    this.ctx.lineWidth = width;
  }
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
