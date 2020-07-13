import {GET_ALL_COMPLAINTS} from "../actions/types";
import {AnyAction} from "redux";

const initialState = {
  allComplaints: null
}

export default function rootReducer(state = initialState, action: AnyAction) {
  switch (action.payload) {

    case GET_ALL_COMPLAINTS:
      return { ...state, allComplaints: action.payload }

    default:
      return state
  }
}
