export const reducerTool = (state = {}, action) => {
  switch (action.type) {
    case "brush":
      return action.payload;
    case "rect":
      return action.payload;
    case "circle":
      return action.payload;
    case "eraser":
      return action.payload;
    case "line":
      return action.payload;
    default:
      return state;
  }
};
