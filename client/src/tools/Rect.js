import Tool from "./Tool";

export default class Rect extends Tool {
  constructor(canvas, socket) {
    super(canvas, socket);
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
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.saved = this.canvas.toDataURL();
  }
  mouseUpHandler(e) {
    this.mouseDown = false;
    this.socket.send(
      JSON.stringify({
        method: "draw",
        figure: {
          type: "rect",
          x: this.startX,
          y: this.startY,
          w: this.width,
          h: this.height,
          color: this.ctx.strokeStyle,
          width: this.ctx.lineWidth,
        },
      })
    );
  }
  mouseMoveHandler(e) {
    if (this.mouseDown) {
      let currentX = e.pageX - e.target.offsetLeft;
      let currentY = e.pageY - e.target.offsetTop;
      this.width = currentX - this.startX;
      this.height = currentY - this.startY;
      this.draw(this.startX, this.startY, this.width, this.height);
    }
  }
  draw(x, y, w, h) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.strokeRect(x, y, w, h);
    };
  }
  static onlineRect(ctx, x, y, w, h, color, width) {
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.strokeRect(x, y, w, h);
  }
}
