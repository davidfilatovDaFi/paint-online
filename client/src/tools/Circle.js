import Tool from "./Tool";

export default class Circle extends Tool {
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
          type: "circle",
          x: this.startX,
          y: this.startY,
          r: this.radius,
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
      let width = currentX - this.startX;
      let height = currentY - this.startY;
      this.radius = Math.sqrt(width ** 2 + height ** 2);
      this.draw(this.startX, this.startY, this.radius);
    }
  }
  draw(x, y, r) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, 2 * Math.PI);
      this.ctx.stroke();
    };
  }
  static onlineCircle(ctx, x, y, r, color, width) {
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
  }
}
