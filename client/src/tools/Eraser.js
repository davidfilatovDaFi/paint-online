import Brush from "./Brush";

export default class Eraser extends Brush {
  constructor(canvas, socket) {
    super(canvas, socket);
  }
  draw(x, y) {
    this.ctx.strokeStyle = "#ffffff";
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}
