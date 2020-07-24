import {GET_ALL_COMPLAINTS} from "../actions/types";
import {AnyAction} from "redux";

interface IState {
  allComplaints: null | any[],
  allUsers: null | any[]
}

const initialState: IState = {
  allComplaints: null,
  allUsers: null
}

export default function adminReducer(state = initialState, action: AnyAction) {
  switch (action.payload) {

    case GET_ALL_COMPLAINTS:
      return {...state, allComplaints: action.payload}

    default:
      return state
  }
}
