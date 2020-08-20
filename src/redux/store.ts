import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import { saveState } from "./localStorage";
import { setPersistedState } from "./actions/userActions";

// const persistedState = loadState();

const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(() => {
  saveState({
    user: {
      ...store.getState().user,
      comparisonOffers: store.getState().user.comparisonOffers,
    },
  });
  // console.log("updated state: ", store.getState());
  // console.log('local: ', loadState());
});

setTimeout(() => {
  store.dispatch(setPersistedState())
}, 300)

export default store;
