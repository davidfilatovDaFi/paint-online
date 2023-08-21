import React, { useEffect, useRef } from "react";
import "../styles/canvas.scss";
import { useDispatch } from "react-redux";
import Brush from "../tools/Brush";

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

  useEffect(() => {
    dispatch({ type: "canvas", payload: canvasRef.current });
    dispatch({ type: "brush", payload: new Brush(canvasRef.current) });

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
