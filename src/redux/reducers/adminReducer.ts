import {
  GET_ALL_COMPLAINTS,
  GET_ALL_USERS,
  GET_USERS_SORT_VALUES,
  GET_USERS_WHO_SENT_FILES,
  UPLOAD_PHOTO_VERIFY_EXAMPLE,
} from "../actions/types";
import { AnyAction } from "redux";

interface IState {
  allComplaints: null | any[];
  allUsers: null | any[];
  photoVerifyExample: any;
  usersWhoSentFileForVerification: null | any[];
  usersSortValues: any;
}

const initialState: IState = {
  allComplaints: null,
  allUsers: null,
  usersWhoSentFileForVerification: null,
  photoVerifyExample: null,
  usersSortValues: null,
};

export default function adminReducer(state = initialState, action: AnyAction) {
  switch (action.payload) {
    case GET_ALL_COMPLAINTS:
      return { ...state, allComplaints: action.payload };

    case GET_ALL_USERS:
      return { ...state, allUsers: action.payload };

    case GET_USERS_WHO_SENT_FILES:
      return { ...state, usersWhoSentFileForVerification: action.payload };

    case UPLOAD_PHOTO_VERIFY_EXAMPLE:
      return { ...state, photoVerifyExample: action.payload };

    case GET_USERS_SORT_VALUES:
      return { ...state, usersSortValues: action.payload };

    default:
      return state;
  }
}
