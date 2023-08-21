import { combineReducers, createStore } from "redux";
import { reducerCanvas } from "./reducers/reducerCanvas";
import { reducerTool } from "./reducers/reducerTool";
import { reducerRedo } from "./reducers/reducerRedo";
import { reducerUndo } from "./reducers/reducerUndo";

const rootReducer = combineReducers({
  canvas: reducerCanvas,
  tool: reducerTool,
  undo: reducerUndo,
  redo: reducerRedo
});

export const store = createStore(rootReducer);
