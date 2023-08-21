export const reducerRedo = (state = [], action) => {
  switch (action.type) {
    case "redo": {
      return [...state, action.payload];
    }
    default:
      return state;
  }
};
