import { combineReducers, createStore } from "redux";
import { reducerCanvas } from "./reducers/reducerCanvas";
import { reducerTool } from "./reducers/reducerTool";

const rootReducer = combineReducers({
  canvas: reducerCanvas,
  tool: reducerTool
});

export const store = createStore(rootReducer);
