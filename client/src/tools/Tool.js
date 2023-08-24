export default class Tool {
  constructor(canvas, socket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.lineCap = "round";
    this.socket = socket;
  }

  set strokeColor(color) {
    this.ctx.strokeStyle = color;
  }

  set lineWidth(width) {
    this.ctx.lineWidth = width;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
