import {
  GET_MY_DESIRES,
  GET_MY_COMPLAINTS,
  GET_FAVORITE_POSTS,
  GET_FAVORITES_BY_DESIRE,
  GET_MY_OFFERS,
  GET_OFFER_BY_ID,
  GET_OFFER,
  CREATE_OFFER,
  HIDE_SHOW_DESIRE,
  HIDE_SHOW_OFFER,
  DELETE_FAVORITE,
  SORT_FAVORITE_DESIRES,
  SORT_FAVORITE_OFFERS,
  GET_CURRENT_GEO_POSITION,
  SORT_MY_OFFERS,
  SORT_MY_DESIRES,
  GET_COMPLAINTS_INFO,
  GET_USER_INFO,
  GET_USER_MESSAGES,
  GET_PHOTO_VERIFY_EXAMPLE,
  UPLOAD_PHOTO_VERIFY_EXAMPLE,
  DELETE_OFFER,
  DELETE_DESIRE,
  ADD_OFFER_TO_COMPARISON,
  SET_PESISTED_STATE,
  REMOVE_OFFER_FROM_COMPARISON,
} from "../actions/types";
import { loadState } from "../localStorage";

interface IState {
  myDesires: any[];
  interestingDesires: any[];
  myOffers: any[];
  myComplaints: null | any[];
  favoriteOffers: any[];
  favoriteDesires: any[];
  offer: any;
  currentUserGeoPosition: any;
  complaintsInfo: any;
  user: any;
  myMessages: null | any[];
  photoVerifyExample: any;
  comparisonOffers: any[];
}

const initialState: IState = {
  myDesires: [],
  interestingDesires: [],
  myOffers: [],
  myComplaints: null,
  favoriteOffers: [],
  favoriteDesires: [],
  offer: null,
  currentUserGeoPosition: null,
  complaintsInfo: null,
  user: null,
  myMessages: [],
  photoVerifyExample: null,
  comparisonOffers: [],
};

export default function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_MY_DESIRES:
      return { ...state, myDesires: action.payload };

    case SET_PESISTED_STATE:
      const persistedState = loadState();
      if (persistedState && persistedState.user) {
        return {
          ...state,
          comparisonOffers: persistedState.user.comparisonOffers,
        };
      }
      return state;

    case REMOVE_OFFER_FROM_COMPARISON:
      return {
        ...state,
        comparisonOffers: state.comparisonOffers.filter(
          (offer) => offer.id !== action.payload
        ),
      };

    case ADD_OFFER_TO_COMPARISON:
      const newComparisonOffers = state.comparisonOffers
      const index = newComparisonOffers.findIndex(offer => offer.id === action.payload.id)

      if (index === -1){
        newComparisonOffers.push(action.payload)
      }
      return {
        ...state,
        comparisonOffers: newComparisonOffers,
      };

    case GET_PHOTO_VERIFY_EXAMPLE:
      return { ...state, photoVerifyExample: action.payload };

    case UPLOAD_PHOTO_VERIFY_EXAMPLE:
      return { ...state, photoVerifyExample: action.payload };

    case GET_USER_MESSAGES:
      // @ts-ignore
      return { ...state, myMessages: state.myMessages.concat(action.payload) };

    case DELETE_OFFER:
      return {
        ...state,
        myOffers: state.myOffers.filter(
          (offer: any) => offer.id !== action.payload
        ),
      };

    case DELETE_DESIRE:
      return {
        ...state,
        myDesires: state.myDesires.filter(
          (desire: any) => desire.id !== action.payload
        ),
      };

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

    case GET_OFFER:
      return { ...state, offer: action.payload };

    case CREATE_OFFER:
      return { ...state, myOffers: [...state.myOffers, action.payload] };

    case GET_FAVORITE_POSTS:
      const desirePosts = action.payload.filter((post: any) => {
        if (post.desire) return { ...post.desire, postId: post.id };
      });
      const offersPosts = action.payload.filter((post: any) => {
        if (post.sentense) return { ...post.sentense, postId: post.id };
      });
      return {
        ...state,
        favoriteDesires: desirePosts,
        favoriteOffers: offersPosts,
      };

    case DELETE_FAVORITE:
      if (action.payload.name === "desire") {
        return {
          ...state,
          favoriteDesires: state.favoriteDesires.filter(
            (post: any) => +post.id !== +action.payload.id
          ),
        };
      } else {
        return {
          ...state,
          favoriteOffers: state.favoriteOffers.filter(
            (post: any) => +post.id !== +action.payload.id
          ),
        };
      }

    case GET_FAVORITES_BY_DESIRE:
      return { ...state, favoriteOffers: action.payload };

    case SORT_FAVORITE_DESIRES:
      if (action.payload.length) {
        const sortedDesiresPosts = action.payload.filter((post: any) => {
          if (post.desire) return post.desire;
        });
        return { ...state, favoriteDesires: sortedDesiresPosts };
      }
      return { ...state, favoriteDesires: action.payload };

    case SORT_FAVORITE_OFFERS:
      if (action.payload.length) {
        const sortedOffersPosts = action.payload.filter((post: any) => {
          if (post.sentense) return post.sentense;
        });
        return { ...state, favoriteOffers: sortedOffersPosts };
      }
      return { ...state, favoriteOffers: action.payload };

    case HIDE_SHOW_DESIRE:
      const newMyDesires = state.myDesires.map((des: any) => {
        if (des.id === action.payload) {
          des.is_active === 1 ? des.is_active = 0 : des.is_active = 1
        }
        return des;
      });
      return { ...state, myDesires: newMyDesires };

    case HIDE_SHOW_OFFER:
      const newMyOffers = state.myOffers.map((off: any) => {
        if (off.id === action.payload) {
          off.is_active === 1 ? off.is_active = 0 : off.is_active = 1
        }
        return off;
      });
      return { ...state, myOffers: newMyOffers };

    default:
      return state;
  }
}
