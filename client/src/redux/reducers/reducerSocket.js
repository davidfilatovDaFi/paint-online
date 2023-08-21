export const reducesSocket = (state = {}, action) => {
  switch (action.type) {
    case "socket": {
      return action.payload;
    }
    default:
      return state;
  }
};
