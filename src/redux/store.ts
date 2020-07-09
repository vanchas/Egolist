import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk'

const store: any = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

store.subscribe(() => {
  console.log('updated state: ', store.getState());
});

export default store;
