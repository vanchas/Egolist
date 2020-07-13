import appReducer from './appReducer';
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import adminReducer from "./adminReducer";

const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
    admin: adminReducer
});

export default rootReducer;
