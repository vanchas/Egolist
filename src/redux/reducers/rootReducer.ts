import appReducer from './appReducer';
import { combineReducers } from 'redux';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer
});

export default rootReducer;
