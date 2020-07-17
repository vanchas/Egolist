import {
    GET_LOCATIONS,
    SHOW_ALERT,
    HIDE_ALERT,
    GET_ALL_DESIRES,
    GET_DESIRE_BY_ID,
    GET_DESIRES_INFO,
    GET_CATEGORIES,
    GET_SUBCATEGORIES,
    GET_CITIES,
    GET_ALL_OFFERS,
    GET_OFFERS_BY_DESIRE_ID,
    SORT_DESIRES,
    SORT_OFFERS,
    SORT_OFFERS_BY_DESIRE_ID,
    GET_DESIRES_BY_CATEGORY,
    SEARCH_INFO,
    SHOW_SUCCESS,
    HIDE_SUCCESS,
    FILTER_DESIRES,
    FILTER_OFFERS,
<<<<<<< HEAD
    GET_OFFERS_BY_CATEGORY, GET_OFFER_BY_ID
=======
    SELECT_HEADING_CATEGORY
>>>>>>> master
} from "../actions/types";

const initialState: any = {
    locations: [],
    alert: null,
    desires: [],
    desire: {},
    desiresInfo: {},
    categories: [],
    subcategories: [],
    cities: [],
    offers: [],
    success: null,
<<<<<<< HEAD
    offer: null
=======
    selectedCategory: null
>>>>>>> master
};

export default function counterReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_LOCATIONS:
            return { ...state, locations: action.payload };

        case SELECT_HEADING_CATEGORY:
            return { ...state, selectedCategory: action.payload };

        case GET_CITIES:
            return { ...state, cities: action.payload };

        case GET_CATEGORIES:
            return { ...state, categories: action.payload };

        case GET_SUBCATEGORIES:
            return { ...state, subcategories: action.payload };

        case SHOW_ALERT:
            return { ...state, alert: action.payload };

        case HIDE_ALERT:
            return { ...state, alert: null };

        case SHOW_SUCCESS:
            return { ...state, success: action.payload };

        case HIDE_SUCCESS:
            return { ...state, success: null };

        case GET_ALL_OFFERS:
            return { ...state, offers: action.payload };

        case SORT_OFFERS:
            return { ...state, offers: action.payload };

        case SORT_OFFERS_BY_DESIRE_ID:
            return { ...state, offers: action.payload };

        case GET_ALL_DESIRES:
            return { ...state, desires: action.payload };

        case SORT_DESIRES:
            return { ...state, desires: action.payload };

        case GET_DESIRE_BY_ID:
            return { ...state, desire: action.payload };

        case GET_OFFER_BY_ID:
            return { ...state, offer: action.payload };

        case GET_OFFERS_BY_DESIRE_ID:
            return { ...state, offers: action.payload };

        case GET_DESIRES_INFO:
            return { ...state, desiresInfo: action.payload };

        case GET_DESIRES_BY_CATEGORY:
            return { ...state, desires: action.payload };

        case GET_OFFERS_BY_CATEGORY:
            return { ...state, offers: action.payload };

        case FILTER_DESIRES:
            return { ...state, desires: action.payload };

        case FILTER_OFFERS:
            return { ...state, offers: action.payload };

        case SEARCH_INFO:
            return { ...state, desires: action.payload.desires, offers: action.payload.offers };

        default:
            return state;
    }
}
