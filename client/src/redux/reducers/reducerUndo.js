export const reducerUndo = (state = [], action) => {
  switch (action.type) {
    case "undo": {
      return [...state, action.payload];
    }
    default:
      return state;
  }
};
