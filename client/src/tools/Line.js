import Tool from "./Tool";

export default class Line extends Tool {
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
    this.currentX = e.pageX - e.target.offsetLeft;
    this.currentY = e.pageY - e.target.offsetTop;
    this.ctx.beginPath();
    this.ctx.moveTo(this.currentX, this.currentY);
    this.saved = this.canvas.toDataURL();
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.prewWidth;
  }
  mouseUpHandler(e) {
    this.mouseDown = false;
    this.socket.send(
      JSON.stringify({
        method: "draw",
        figure: {
          type: "line",
          x: e.pageX - e.target.offsetLeft,
          y: e.pageY - e.target.offsetTop,
          currentX: this.currentX,
          currentY: this.currentY,
          color: this.ctx.strokeStyle,
          width: this.ctx.lineWidth,
        },
      })
    );
  }
  mouseMoveHandler(e) {
    if (this.mouseDown)
      this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
  }
  draw(x, y) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.moveTo(this.currentX, this.currentY);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    };
  }
  static onlineLine(ctx, x, y, currentX, currentY, color, width) {
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(currentX, currentY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
  }
}
