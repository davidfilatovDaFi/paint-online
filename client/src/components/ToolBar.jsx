import React from "react";
import "../styles/bar.scss";
import Brush from "../tools/Brush";
import { useDispatch, useSelector } from "react-redux";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";

export default function ToolBar() {
  const dispatch = useDispatch();
  const canvas = useSelector((state) => state.canvas);

  return (
    <div className="bar">
      <button
        onClick={() => dispatch({ type: "brush", payload: new Brush(canvas) })}
        className="bar__btn brush"
      ></button>
      <button
        onClick={() =>
          dispatch({ type: "rect", payload: new Rect(canvas) })
        }
        className="bar__btn rect"
      ></button>
      <button
        onClick={() =>
          dispatch({ type: "circle", payload: new Circle(canvas) })
        }
        className="bar__btn circle"
      ></button>
      <button className="bar__btn eraser"></button>
      <button className="bar__btn line"></button>
      <input type="color" />
      <div style={{ marginLeft: "20px" }}>
        <label htmlFor="width">Ширина линии</label>
        <input id="width" type="number" defaultValue={1} min={1} max={50} />
      </div>
      <button
        style={{ marginLeft: "auto" }}
        className="bar__btn clear"
      ></button>
      <button className="bar__btn undo"></button>
      <button className="bar__btn redo"></button>
      <button className="bar__btn save"></button>
    </div>
  );
}
