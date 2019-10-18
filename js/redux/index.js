const { createStore } = require('redux');

let initialState = 0;

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

const store = createStore(counterReducer);

store.subscribe(() => console.log(store.getState()));
// console.log('initial state', store.getState());
store.dispatch({ type: 'INCREMENT' });
// console.log('after INCREMENT 1', store.getState());
store.dispatch({ type: 'INCREMENT' });
// console.log('after INCREMENT 2', store.getState());
store.dispatch({ type: 'DECREMENT' });
// console.log('after DECREMENT 1', store.getState());
store.dispatch({ type: 'DECREMENT' });
// console.log('after DECREMENT 2', store.getState());
