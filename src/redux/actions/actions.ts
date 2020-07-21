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
  GET_OFFER_BY_ID,
  GET_DESIRES_BY_CATEGORY,
  SEARCH_INFO,
  SHOW_SUCCESS,
  HIDE_SUCCESS,
  FILTER_OFFERS,
  FILTER_DESIRES,
  GET_OFFERS_BY_CATEGORY,
  SELECT_HEADING_CATEGORY,
  SELECT_HEADING_SUBCATEGORY,
  GET_SORT_VALUES,
  SHOW_SIDEBAR, SHOW_ERROR,
} from "./types";
import HttpRequest from "../../_helpers/HttpRequest";

export const showError = (status: any, message: any) => (dispatch: Function) => {
    setTimeout(() => dispatch({type: SHOW_ERROR, payload: null}), 5000)
  return dispatch({ type: SHOW_ERROR, payload: {status, message} });
};

export const getSortingValues = () => async (dispatch: Function) => {
  HttpRequest.execute("/info/sorts")
    .then((data) => {
      dispatch({ type: GET_SORT_VALUES, payload: data.sorts });
    }).catch((err) => console.error("Error: ", err));
};

export const showSidebar = (value: any) => async (dispatch: Function) => {
  return await dispatch({ type: SHOW_SIDEBAR, payload: value });
};

export const selectHeadingCategories = (id: any) => async (
  dispatch: Function
) => {
  return await dispatch({ type: SELECT_HEADING_CATEGORY, payload: id });
};

export const selectHeadingSubcategories = (id: any) => async (
  dispatch: Function
) => {
  return await dispatch({ type: SELECT_HEADING_SUBCATEGORY, payload: id });
};

export const searchInfo = (
  search_field: string,
  region_id: any,
  city_id: any,
  category_ids: any,
  subcategory_ids: any
) => async (dispatch: Function) => {
  HttpRequest.execute(`
     /desires/search/${search_field}
     &?region_id=${region_id}
     &city_id=${city_id}
     &category_ids[]=${category_ids}
     &subcategory_ids[]=${subcategory_ids}`)
      .then((data) => {
        dispatch({ type: SEARCH_INFO, payload: data });
      }).catch((err) => console.error("Error: ", err));
};

export const getLocations = () => async (dispatch: Function) => {
  HttpRequest.execute(`/location`)
    .then((res) => {
      return dispatch({ type: GET_LOCATIONS, payload: res });
    }).catch((err) => console.error("Error: ", err));
};

export const showAlert = (text: string) => async (dispatch: Function) => {
  dispatch({ type: SHOW_ALERT, payload: text });
  setTimeout(() => {
    dispatch({ type: HIDE_ALERT, payload: text });
  }, 3000);
};

export const showSuccess = (text: string) => async (dispatch: Function) => {
  dispatch({ type: SHOW_SUCCESS, payload: text });
  setTimeout(() => {
    dispatch({ type: HIDE_SUCCESS, payload: text });
  }, 3000);
};

export const getAllDesires = () => async (dispatch: Function) => {
  HttpRequest.execute(`/desires`)
    .then((data) => {
      return dispatch({ type: GET_ALL_DESIRES, payload: data });
    }).catch((err) => console.error("Error: ", err));
};

export const getDesireById = (id: number | string) => async (dispatch: Function) => {
  HttpRequest.execute(`/desires/show/${id}`)
    .then((data) => {
      return dispatch({ type: GET_DESIRE_BY_ID, payload: data });
    }).catch((err) => console.error("Error: ", err));
};

export const getOfferById = (id: number | string) => async (
  dispatch: Function
) => {
  HttpRequest.execute(`/desires/offers/show/${id}`)
    .then((data) => {
      return dispatch({ type: GET_OFFER_BY_ID, payload: data });
    }).catch((err) => console.error("Error: ", err));
};

export const getDesiresInfo = () => async (dispatch: Function) => {
  HttpRequest.execute(`/info/desires`)
      .then((data) => {
      return dispatch({ type: GET_DESIRES_INFO, payload: data });
    }).catch((err) => console.error("Error: ", err));
};

export const getCategories = () => async (dispatch: Function) => {
  HttpRequest.execute(`/categories`)
    .then((data) => {
      return dispatch({ type: GET_CATEGORIES, payload: data });
    }).catch((err) => console.error("Error: ", err));
};

export const getSubcategories = (id: string | number) => async (
  dispatch: Function
) => {
  HttpRequest.execute(`/categories/sub/get/${id}`)
    .then((data) => {
      return dispatch({ type: GET_SUBCATEGORIES, payload: data });
    }).catch((err) => console.error("Error: ", err));
};

export const getCities = (id: string | number) => async (
  dispatch: Function
) => {
    HttpRequest.execute(`/location/cities/${id}`)
    .then((res) => {
      return dispatch({ type: GET_CITIES, payload: res });
    }).catch((err) => console.error("Error: ", err));
};

export const getAllOffers = () => async (dispatch: Function) => {
  HttpRequest.execute(`/offers`)
    .then((res) => {
      return dispatch({ type: GET_ALL_OFFERS, payload: res });
    }).catch((err) => console.error("Error: ", err));
};

export const getOffersByDesireId = (desire_id: string | number) => async (
  dispatch: Function
) => {
  HttpRequest.execute(`/filter_offer`, "POST","application/json",{ desire_id })
    .then((res) => {
      return dispatch({ type: GET_OFFERS_BY_DESIRE_ID, payload: res });
    }).catch((err) => console.error("Error: ", err));
};

export const getDesiresByCategory = (category_id: string | number) => async (
  dispatch: Function
) => {
  HttpRequest.execute(`/filter_desire`,"POST", "application/json",{ category_ids: [category_id] })
    .then((res) => {
      return dispatch({ type: GET_DESIRES_BY_CATEGORY, payload: res });
    }).catch((err) => console.error("Error: ", err));
};

export const getOffersByCategory = (category_id: string | number) => async (
  dispatch: Function
) => {
  HttpRequest.execute(`/filter_offer`, "POST","application/json",{ category_ids: [category_id] })
    .then((res) => {
      return dispatch({ type: GET_OFFERS_BY_CATEGORY, payload: res });
    }).catch((err) => console.error("Error: ", err));
}

export const filterOffers = (key: string, value: string) => async (
  dispatch: Function
) => {
  HttpRequest.execute(`/filter_offer`,"POST","application/json",{ [key]: value })
    .then((res) => {
      return dispatch({ type: FILTER_OFFERS, payload: res });
    }).catch((err) => console.error("Error: ", err));
};

export const filterDesires = (key: string, value: string) => async (
  dispatch: Function
) => {
    HttpRequest.execute(`/filter_desire`,"POST","application/json",{ [key]: value })
        .then((res) => {
          return dispatch({ type: FILTER_DESIRES, payload: res });
        }).catch((err) => console.error("Error: ", err));
};
