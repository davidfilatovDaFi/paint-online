import React, { useState } from "react";
import "../styles/bar.scss";
import Brush from "../tools/Brush";
import { useDispatch, useSelector } from "react-redux";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Line from "../tools/Line";
import Eraser from "../tools/Eraser";

export default function ToolBar() {
  const [color, setColor] = useState("#000000");
  const dispatch = useDispatch();
  const canvas = useSelector((state) => state.canvas);
  const tool = useSelector((state) => state.tool);
  const undoList = useSelector((state) => state.undo);
  const redoList = useSelector((state) => state.redo);

  const undo = () => {
    if (undoList.length > 0) {
      const img = new Image();
      img.src = undoList.pop();
      dispatch({ type: "redo", payload: tool.canvas.toDataURL() });
      img.onload = () => {
        tool.ctx.clearRect(0, 0, tool.canvas.width, tool.canvas.height);
        tool.ctx.drawImage(
          img,
          0,
          0,
          tool.canvas.width,
          tool.canvas.height
        );
      };
    }
  }

  const redo =() => {
    if (redoList.length > 0) {
      const img = new Image();
      img.src = redoList.pop();
      dispatch({ type: "undo", payload: tool.canvas.toDataURL() });
      img.onload = () => {
        tool.ctx.clearRect(0, 0, tool.canvas.width, tool.canvas.height);
        tool.ctx.drawImage(
          img,
          0,
          0,
          tool.canvas.width,
          tool.canvas.height
        );
      };
    }
  }

  return (
    <div className="bar">
      <button
        onClick={() =>
          dispatch({ type: "brush", payload: new Brush(canvas, color) })
        }
        className="bar__btn brush"
      ></button>
      <button
        onClick={() =>
          dispatch({ type: "rect", payload: new Rect(canvas, color) })
        }
        className="bar__btn rect"
      ></button>
      <button
        onClick={() =>
          dispatch({ type: "circle", payload: new Circle(canvas, color) })
        }
        className="bar__btn circle"
      ></button>
      <button
        onClick={() =>
          dispatch({ type: "eraser", payload: new Eraser(canvas, color) })
        }
        className="bar__btn eraser"
      ></button>
      <button
        onClick={() =>
          dispatch({ type: "line", payload: new Line(canvas, color) })
        }
        className="bar__btn line"
      ></button>
      <input
        onChange={(e) => {
          tool.strokeColor(e.target.value);
          setColor(e.target.value);
        }}
        value={color}
        type="color"
      />
      <div style={{ marginLeft: "20px" }}>
        <label htmlFor="width">Ширина линии</label>
        <input
          onChange={(e) => tool.lineWidth(e.target.value)}
          id="width"
          type="number"
          defaultValue={1}
          min={1}
          max={50}
        />
      </div>
      <button
        onClick={() => tool.clearCanvas()}
        style={{ marginLeft: "auto" }}
        className="bar__btn clear"
      ></button>
      <button onClick={undo} className="bar__btn undo"></button>
      <button onClick={redo} className="bar__btn redo"></button>
      <button className="bar__btn save"></button>
    </div>
  );
}
