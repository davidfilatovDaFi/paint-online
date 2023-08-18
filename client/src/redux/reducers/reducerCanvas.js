export const reducerCanvas = (state = {}, action) => {
  switch (action.type) {
    case "canvas": {
      action.payload.width = window.innerWidth - 4;
      action.payload.height = window.innerHeight - 42;
      return action.payload;
    }
    default:
      return state;
  }
};
