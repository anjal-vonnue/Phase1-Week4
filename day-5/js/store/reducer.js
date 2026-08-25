export function reducer(state, action) {
  switch (action.type) {
    case "SET_ROUTE": {
      console.log("inside reducer with: ", action.payload);

      return {
        ...state,
        route: action.payload.route,
        params: action.payload.params,
      };
    }

    default: {
      return state;
    }
  }
}
