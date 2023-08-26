export default class Tool {
  constructor(canvas, socket, color, width) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.lineCap = "round";
    this.socket = socket;
    this.ctx.strokeStyle = color;
    this.color = color;
    this.prewWidth = width;
  }

  set strokeColor(color) {
    this.ctx.strokeStyle = color;
    this.color = color;
  }

  set lineWidth(width) {
    this.ctx.lineWidth = width;
    this.prewWidth = width;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
