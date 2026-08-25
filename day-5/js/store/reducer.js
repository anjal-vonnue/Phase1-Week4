export function reducer(state, action) {
  switch (action.type) {
    case "SET_ROUTE": {
      console.log("inside reducer with: ", action.payload);

      return {
        ...state,
        path: action.payload.path,
        params: action.payload.params,
      };
    }

    default: {
      return state;
    }
  }
}
