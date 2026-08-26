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

    case "ADD_TODO": {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    }

    case "EDIT_TODO": {
      console.log("edit reducer: ", action.payload);

      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              title: action.payload.title,
              description: action.payload.description,
            };
          } else {
            return todo;
          }
        }),
      };
    }

    default: {
      return state;
    }
  }
}
