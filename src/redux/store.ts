import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import { loadState, saveState } from "./localStorage";
import { setPersistedState } from "./actions/userActions";

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

store.subscribe(() => {
  saveState({
    user: {
      comparisonOffers: store.getState().user.comparisonOffers,
    },
  });
  console.log("updated state: ", store.getState());
  // console.log('local: ', loadState());
});

if (setPersistedState) {
  store.dispatch(setPersistedState());
}

export default store;
