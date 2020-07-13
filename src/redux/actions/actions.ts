import { GET_LOCATIONS, SHOW_ALERT, HIDE_ALERT, GET_ALL_DESIRES, GET_DESIRE_BY_ID, GET_DESIRES_INFO, GET_CATEGORIES, GET_SUBCATEGORIES, GET_CITIES, GET_ALL_OFFERS, GET_OFFERS_BY_DESIRE_ID, GET_OFFER_BY_ID, GET_DESIRES_BY_CATEGORY, SEARCH_INFO, SHOW_SUCCESS, HIDE_SUCCESS, FILTER_OFFERS, FILTER_DESIRES, } from "./types"
import fetch from 'isomorphic-unfetch'
import { authenticationService } from "../../_services/authentication.service";

export const getLocations = () => async (dispatch: Function) => {
    const response = await fetch(`https://egolist.padilo.pro/api/location`);
    const promise = response.json();
    return promise.then(res => {
        return dispatch({ type: GET_LOCATIONS, payload: res })
    }).catch(err => console.error('Error: ', err));
};
export const showAlert = (text: string) => async (dispatch: Function) => {
    dispatch({ type: SHOW_ALERT, payload: text });
    setTimeout(() => {
        dispatch({ type: HIDE_ALERT, payload: text });
    }, 3000);
}
export const showSuccess = (text: string) => async (dispatch: Function) => {
    dispatch({ type: SHOW_SUCCESS, payload: text });
    setTimeout(() => {
        dispatch({ type: HIDE_SUCCESS, payload: text });
    }, 3000);
}

export const getAllDesires = () => async (dispatch: Function) => {
    const user = authenticationService.currentUserValue;
    const response = await fetch(`https://egolist.padilo.pro/api/desires`, {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
            'Authorization': `${user.token_type} ${user.token}`
        }
    });
    const promise = response.json();
    return promise.then(res => {
        return dispatch({ type: GET_ALL_DESIRES, payload: res })
    }).catch(err => console.error('Error: ', err));
};

export const getDesireById = (id: number | string) => async (dispatch: Function) => {
    const user = authenticationService.currentUserValue;
    const response = await fetch(`https://egolist.padilo.pro/api/desires/show/${id}`, {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
            'Authorization': `${user.token_type} ${user.token}`
        }
    });
    const promise = response.json();
    return promise.then(res => {
        return dispatch({ type: GET_DESIRE_BY_ID, payload: res })
    }).catch(err => console.error('Error: ', err));
};
export const getOfferById = (id: number | string) => async (dispatch: Function) => {
    const user = authenticationService.currentUserValue;
    const response = await fetch(`https://egolist.padilo.pro/api/desires/offers/show/${id}`, {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            'Authorization': `${user.token_type} ${user.token}`
        }
    });
    const promise = response.json();
    return promise.then(res => {
        return dispatch({ type: GET_OFFER_BY_ID, payload: res })
    }).catch(err => console.error('Error: ', err));
};
export const getDesiresInfo = () => async (dispatch: Function) => {
    const user = authenticationService.currentUserValue;
    const response = await fetch(`https://egolist.padilo.pro/api/info/desires`, {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
            'Authorization': `${user.token_type} ${user.token}`
        }
    });
    const promise = response.json();
    return promise.then(res => {
        return dispatch({ type: GET_DESIRES_INFO, payload: res })
    }).catch(err => console.error('Error: ', err));
};
export const getCategories = () => async (dispatch: Function) => {
    const response = await fetch(`https://egolist.padilo.pro/api/categories`, {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json"
        }
    });
    const promise = response.json();
    return promise.then(res => {
        return dispatch({ type: GET_CATEGORIES, payload: res })
    }).catch(err => console.error('Error: ', err));
};
export const getSubcategories = (id: string | number) => async (dispatch: Function) => {
    const response = await fetch(`https://egolist.padilo.pro/api/categories/sub/get/${id}`, {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json"
        }
    });
    const promise = response.json();
    return promise.then(res => {
        return dispatch({ type: GET_SUBCATEGORIES, payload: res })
    }).catch(err => console.error('Error: ', err));
};
export const getCities = (id: string | number) => async (dispatch: Function) => {
    const response = await fetch(`https://egolist.padilo.pro/api/location/cities/${id}`, {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": 'application/json',
            "Accept": "application/json"
        }
    });
    const promise = response.json();
    return promise.then(res => {
        return dispatch({ type: GET_CITIES, payload: res })
    }).catch(err => console.error('Error: ', err));
};

export const getAllOffers = () => async (dispatch: Function) => {
    const user = authenticationService.currentUserValue;
    const response = await fetch(`https://egolist.padilo.pro/api/offers`, {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Authorization': `${user.token_type} ${user.token}`
        }
    });
    const promise = response.json();
    return promise.then(res => {
        return dispatch({ type: GET_ALL_OFFERS, payload: res })
    }).catch(err => console.error('Error: ', err));
};
export const getOffersByDesireId = (desire_id: string | number) => async (dispatch: Function) => {
    const user = authenticationService.currentUserValue;
    const response = await fetch(`https://egolist.padilo.pro/api/filter_offer`, {
        method: 'POST',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            'Authorization': `${user.token_type} ${user.token}`
        },
        body: JSON.stringify({ desire_id })
    });
    const promise = response.json();
    return promise.then(res => {
        return dispatch({ type: GET_OFFERS_BY_DESIRE_ID, payload: res })
    }).catch(err => console.error('Error: ', err));
};
export const getDesiresByCategory = (category_id: string | number) => async (dispatch: Function) => {
    const user = authenticationService.currentUserValue;
    const response = await fetch(`https://egolist.padilo.pro/api/filter_offer`, {
        method: 'POST',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            'Authorization': `${user.token_type} ${user.token}`
        },
        body: JSON.stringify({ category_ids: [category_id] })
    });
    const promise = response.json();
    return promise.then(res => {
        return dispatch({ type: GET_DESIRES_BY_CATEGORY, payload: res })
    }).catch(err => console.error('Error: ', err));
};
export const filterOffers = (key: string, value: string) => async (dispatch: Function) => {
    const user = authenticationService.currentUserValue;
    const response = await fetch(`https://egolist.padilo.pro/api/filter_offer`, {
        method: 'POST',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            'Authorization': `${user.token_type} ${user.token}`
        },
        body: JSON.stringify({ [key]: value })
    });
    const promise = response.json();
    return promise.then(res => {
        return dispatch({ type: FILTER_OFFERS, payload: res })
    }).catch(err => console.error('Error: ', err));
};
export const filterDesires = (key: string, value: string) => async (dispatch: Function) => {
    const user = authenticationService.currentUserValue;
    const response = await fetch(`https://egolist.padilo.pro/api/filter_desire`, {
        method: 'POST',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            'Authorization': `${user.token_type} ${user.token}`
        },
        body: JSON.stringify({ [key]: value })
    });
    const promise = response.json();
    return promise.then(res => {
        return dispatch({ type: FILTER_DESIRES, payload: res })
    }).catch(err => console.error('Error: ', err));
};
export const searchInfo = (search_field: string) => async (dispatch: Function) => {
    const response = await fetch(`https://egolist.padilo.pro/api/desires/search/${search_field}`, {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        }
    });
    const promise = response.json();
    return promise.then(res => {
        return dispatch({ type: SEARCH_INFO, payload: res })
    }).catch(err => console.error('Error: ', err));
};