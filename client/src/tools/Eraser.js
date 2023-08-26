import Brush from "./Brush";

export default class Eraser extends Brush {
  constructor(canvas, socket) {
    super(canvas, socket);
  }
  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.socket.send(
        JSON.stringify({
          method: "draw",
          figure: {
            type: "eraser",
            x: e.pageX - e.target.offsetLeft,
            y: e.pageY - e.target.offsetTop,
            width: this.ctx.lineWidth,
          },
        })
      );
    }
  }
  static draw(ctx, x, y, width) {
    ctx.lineWidth = width;
    ctx.strokeStyle = "#ffffff";
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
