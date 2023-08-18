import React from "react";
import "../styles/canvas.scss";

export default function Canvas() {
  return (
    <div className="canvas">
      <canvas
        width={900}
        height={600}
      ></canvas>
    </div>
  );
}
