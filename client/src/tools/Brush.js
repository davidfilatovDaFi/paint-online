import Tool from "./Tool";

export default class Brush extends Tool {
  constructor(canvas, socket, color, width) {
    super(canvas, socket, color, width);
    this.listen();
  }
  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }
  mouseDownHandler(e) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(
      e.pageX - e.target.offsetLeft,
      e.pageY - e.target.offsetTop
    );
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.prewWidth;
  }
  mouseUpHandler(e) {
    this.mouseDown = false;
    this.socket.send(
      JSON.stringify({
        method: "draw",
        figure: {
          type: "finish",
          color: this.color,
        },
      })
    );
  }
  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.socket.send(
        JSON.stringify({
          method: "draw",
          figure: {
            type: "brush",
            x: e.pageX - e.target.offsetLeft,
            y: e.pageY - e.target.offsetTop,
            color: this.ctx.strokeStyle,
            width: this.ctx.lineWidth,
          },
        })
      );
    }
  }
  static draw(ctx, x, y, color, width) {
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
