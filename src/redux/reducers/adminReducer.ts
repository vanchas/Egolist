import {
  DELETE_COMPLAINT,
  GET_ALL_COMPLAINTS,
  GET_ALL_USERS,
  GET_USERS_SORT_VALUES,
  GET_USERS_WHO_SENT_FILES,
  SEARCH_ALL_USERS, SORT_ALL_USERS_LIST,
  UPDATE_COMPLAINT,
  UPLOAD_PHOTO_VERIFY_EXAMPLE
} from "../actions/types";
import { AnyAction } from "redux";

interface IState {
  allComplaints: null | any[];
  allUsers: null | any[];
  photoVerifyExample: any;
  usersWhoSentFileForVerification: null | any[];
  sortingValues: any;
}

const initialState: IState = {
  allComplaints: null,
  allUsers: null,
  usersWhoSentFileForVerification: null,
  photoVerifyExample: null,
  sortingValues: null,
};

export default function adminReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case GET_ALL_COMPLAINTS:
      return { ...state, allComplaints: action.payload };

    case UPDATE_COMPLAINT:
      // @ts-ignore
      const updatedComplaints = state.allComplaints.map((c) => {
        if (c.id === action.payload.id) {
          return action.payload;
        }
        return c;
      });
      return { ...state, allComplaints: updatedComplaints };

    case DELETE_COMPLAINT:
      // @ts-ignore
      const newComplaints = state.allComplaints.filter(
        (c) => c.id !== action.payload
      );
      return { ...state, allComplaints: newComplaints };

    case GET_ALL_USERS:
      return { ...state, allUsers: action.payload };

    case SEARCH_ALL_USERS:
      return { ...state, allUsers: action.payload };

    case SORT_ALL_USERS_LIST:
      return { ...state, allUsers: action.payload };

    case GET_USERS_WHO_SENT_FILES:
      return { ...state, usersWhoSentFileForVerification: action.payload };

    case UPLOAD_PHOTO_VERIFY_EXAMPLE:
      return { ...state, photoVerifyExample: action.payload };

    case GET_USERS_SORT_VALUES:
      return { ...state, sortingValues: action.payload };

    default:
      return state;
  }
}
