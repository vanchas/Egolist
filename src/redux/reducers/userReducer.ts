import {
  GET_MY_DESIRES,
  GET_MY_COMPLAINTS,
  GET_FAVORITE_POSTS,
  GET_FAVORITES_BY_DESIRE,
  GET_MY_OFFERS,
  GET_OFFER_BY_ID,
  GET_OFFER,
  CREATE_OFFER,
  // GET_INTERESTING_DESIRES_TO_OFFER,
  HIDE_SHOW_DESIRE,
  HIDE_SHOW_OFFER,
  DELETE_FAVORITE,
  SORT_FAVORITE_DESIRES,
  SORT_FAVORITE_OFFERS,
  GET_CURRENT_GEO_POSITION,
  SORT_MY_OFFERS, SORT_MY_DESIRES, GET_COMPLAINTS_INFO, GET_USER_INFO
} from "../actions/types";

const initialState: any = {
  myDesires: [],
  interestingDesires: [],
  myOffers: [],
  myComplaints: null,
  favoritePosts: [],
  offer: null,
  currentUserGeoPosition: null,
  complaintsInfo: null,
  showInterestingDesires: false,
  user: null
};

export default function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_MY_DESIRES:
      return { ...state, myDesires: action.payload };

    case GET_USER_INFO:
      return { ...state, user: action.payload };

    case SORT_MY_OFFERS:
      return { ...state, myOffers: action.payload };

    case SORT_MY_DESIRES:
      return { ...state, myDesires: action.payload };

    case GET_COMPLAINTS_INFO:
      return { ...state, complaintsInfo: action.payload };

    case GET_CURRENT_GEO_POSITION:
      // city: "Dnipro"
      // city_rus: "Днепр"
      // country: "Ukraine"
      // country_code: "UA"
      // country_rus: "Украина"
      // ip: "46.98.105.157"
      // latitude: "48.45"
      // longitude: "34.98333"
      // region: "Dnipropetrovska oblast"
      // region_rus: "Днепропетровская область"
      // time_zone: "+03:00"
      // zip_code: "52561"
      return { ...state, currentUserGeoPosition: action.payload };

    case GET_MY_OFFERS:
      return { ...state, myOffers: action.payload };

    case GET_MY_COMPLAINTS:
      return { ...state, myComplaints: action.payload };

    case GET_OFFER_BY_ID:
      return { ...state, offer: action.payload };

    // case GET_INTERESTING_DESIRES_TO_OFFER:
    //   return {
    //     ...state,
    //     interestingDesires: [
    //         ...state.interestingDesires,
    //         action.payload
    //     ]
    //   };

    case GET_OFFER:
      return { ...state, offer: action.payload };

    case CREATE_OFFER:
      return { ...state, myOffers: [...state.myOffers, action.payload] };

    case GET_FAVORITE_POSTS:
      return { ...state, favoritePosts: action.payload };

    case DELETE_FAVORITE:
      return { ...state, favoritePosts: state.favoritePosts.filter((post: any) => +post.id !== +action.payload) };

    case GET_FAVORITES_BY_DESIRE:
      return { ...state, favoriteOffers: action.payload };

    case SORT_FAVORITE_DESIRES:
      return { ...state, favoritePosts: action.payload };

    case SORT_FAVORITE_OFFERS:
      return { ...state, favoritePosts: action.payload };

    case HIDE_SHOW_DESIRE:
      const newMyDesires = state.myDesires.map((des: any) => {
        if (des.id === action.payload) {
          des.is_active = !des.is_active;
        }
        return des;
      })
      return { ...state, myDesires: newMyDesires };

    case HIDE_SHOW_OFFER:
      const newMyOffers = state.myOffers.map((off: any) => {
        if (off.id === action.payload) {
          off.is_active = !off.is_active;
        }
        return off;
      })
      return { ...state, myOffers: newMyOffers };

    default:
      return state;
  }
}
