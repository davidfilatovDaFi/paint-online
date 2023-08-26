import React, { useEffect, useRef } from "react";
import "../styles/canvas.scss";
import { useDispatch } from "react-redux";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";

export default function Canvas() {
  const canvasRef = useRef();
  const dispatch = useDispatch();

  const resizeHandler = () => {
    const ctx = canvasRef.current.getContext("2d");
    const saved = canvasRef.current.toDataURL();
    canvasRef.current.width = window.innerWidth - 4;
    canvasRef.current.height = window.innerHeight - 42;
    const img = new Image();
    img.src = saved;
    img.onload = () => {
      ctx.drawImage(
        img,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    };
  };

  const drawHandler = (msg) => {
    msg = JSON.parse(msg);
    const ctx = canvasRef.current.getContext("2d");
    const figure = msg.figure;
    switch (figure.type) {
      case "brush":
        Brush.draw(ctx, figure.x, figure.y, figure.color, figure.width);
        break;
      case "finish":
        ctx.beginPath();
        break;
      case "rect":
        Rect.onlineRect(
          ctx,
          figure.x,
          figure.y,
          figure.w,
          figure.h,
          figure.color,
          figure.width
        );
        break;
      case "circle":
        Circle.onlineCircle(
          ctx,
          figure.x,
          figure.y,
          figure.r,
          figure.color,
          figure.width
        );
        break;
      case "eraser":
        Eraser.draw(ctx, figure.x, figure.y, figure.width);
        break;
      case "line":
        Line.onlineLine(
          ctx,
          figure.x,
          figure.y,
          figure.currentX,
          figure.currentY,
          figure.color,
          figure.width
        );
        break;
    }
  };

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000/");
    dispatch({ type: "socket", payload: socket });
    dispatch({ type: "canvas", payload: canvasRef.current });
    dispatch({
      type: "brush",
      payload: new Brush(canvasRef.current, socket, "#000000", 1),
    });

    socket.onmessage = (event) => drawHandler(event.data);

    window.onresize = resizeHandler;

    return () => {
      window.onresize = null;
    };
  }, []);

  return (
    <div className="canvas">
      <canvas
        onMouseDown={() =>
          dispatch({ type: "undo", payload: canvasRef.current.toDataURL() })
        }
        ref={canvasRef}
        width={900}
        height={600}
      ></canvas>
    </div>
  );
}
