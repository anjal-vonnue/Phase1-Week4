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

    listeners.forEach((listener) => {
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
