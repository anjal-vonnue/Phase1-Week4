export function createStore(initialState, reducer) {
  let state = initialState;
  const listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);

    console.log("===========");
    console.log("state in the store");
    console.log(state);
    console.log("===========");

    console.log("===listener array===");
    console.log(listeners);
    console.log("===listener array===");

    listeners.forEach((listener) => {
      console.log("===listener===");
      console.log(listener);
      console.log("===listener===");

      listener();
    });
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  return {
    getState,
    dispatch,
    subscribe,
  };
}
