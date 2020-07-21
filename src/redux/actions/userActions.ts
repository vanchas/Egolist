import Cookies from "js-cookie";
import Router from "next/router";
import {
  GET_MY_DESIRES,
  UPDATE_DESIRE,
  DELETE_DESIRE,
  ADD_COMPLAINT,
  GET_MY_COMPLAINTS,
  CREATE_DESIRE,
  HIDE_SHOW_DESIRE,
  HIDE_SHOW_OFFER,
  SORT_DESIRES,
  SORT_OFFERS,
  ADD_OFFER_TO_FAVORITE,
  ADD_DESIRE_TO_FAVORITE,
  GET_FAVORITES_BY_DESIRE,
  GET_FAVORITES_BY_OFFER,
  GET_FAVORITE_POSTS,
  DELETE_FAVORITE,
  SORT_OFFERS_BY_DESIRE_ID,
  GET_MY_OFFERS,
  UPDATE_OFFER,
  GET_OFFER,
  CREATE_OFFER,
  SORT_FAVORITE_DESIRES,
  SORT_FAVORITE_OFFERS,
  GET_CURRENT_GEO_POSITION,
  SORT_MY_OFFERS,
  SORT_MY_DESIRES,
  GET_COMPLAINTS_INFO, GET_USER_INFO, DELETE_DESIRE_PHOTO, DELETE_OFFER_PHOTO,
} from "./types"
import HttpRequest from "../../_helpers/HttpRequest";
import {showAlert, showSuccess} from "./actions";
import {authenticationService} from "../../_services/authentication.service";
import fetch from 'isomorphic-unfetch'

const target = `https://egolist.padilo.pro/api`;

export const updateUserInfo = (
  name: string,
  second_name: string,
  email: string,
  phone: string,
  telegram: string,
  viber: string,
  whatsapp: string,
  site: string,
  avatar: any,
  region_id: string,
  city_id: string,
  birth_date: string
) => async (dispatch: Function) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("second_name", second_name);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("telegram", telegram);
  formData.append("viber", viber);
  formData.append("whatsapp", whatsapp);
  formData.append("site", site);
  formData.append("avatar", avatar);
  formData.append("region_id", region_id);
  formData.append("city_id", city_id);
  formData.append("birth_date", birth_date);

    const user = authenticationService.currentUserValue;
    const response = await fetch(`${target}/update_user`, {
      method: "POST",
      headers: {
          "Authorization": `${user.token_type} ${user.token}`,
          "Accept": "application/json"
      },
      body: formData
  });
    const promise = response.json();
    return promise.then((data) => {
        if (response.ok) {
            dispatch(showSuccess('Успешно изменено'))
            Cookies.set(
                "currentUser",
                JSON.stringify({
                    user: data.user,
                    token: authenticationService.currentUserValue.token,
                    token_type: authenticationService.currentUserValue.token_type,
                })
            )
            setTimeout(() => {
                window.location.reload()
            }, 3000)
        } else {
            dispatch(showAlert(data.message))
        }
    })
    .catch((err) => console.error("Error: ", err));
};

export const getMyDesires = () => async (dispatch: Function) => {
  HttpRequest.execute(`/desires/my`)
    .then((data) => {
      return dispatch({ type: GET_MY_DESIRES, payload: data });
    })
    .catch((err) => console.error("Error: ", err));
};

export const getMyOffers = () => async (dispatch: Function) => {
  HttpRequest.execute(`/desires/offers/my`)
    .then((data) => {
      return dispatch({ type: GET_MY_OFFERS, payload: data });
    })
    .catch((err) => console.error("Error: ", err));
};

export const updateDesire = (
  id: number | string,
  photo: any,
  video: string,
  description: string,
  header: string,
  price: string,
  priority_id: string,
  type_id: string,
  category_ids: any,
  subcategory_ids: any,
  region_id: any,
  city_id: string,
  is_active: any
) => async (dispatch: Function) => {
  const formData = new FormData();
  if (!photo) {
    formData.append("photo", '');
  } else {
    if (typeof photo === 'string' || photo instanceof String) {
      formData.append("photo", JSON.stringify(photo));
    } else {
      for (let p of photo) {
        formData.append("photo[]", p);
      }
    }
  }
  formData.append("video", video);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("header", header);
  formData.append("priority_id", priority_id);
  formData.append("category_ids", category_ids);
  formData.append("subcategory_ids", subcategory_ids);
  formData.append("type_id", type_id);
  formData.append("region_id", region_id);
  formData.append("city_id", city_id);
  formData.append("is_active", is_active);

  const user = authenticationService.currentUserValue;
  const response = await fetch(`${target}/desires/edit/${id}`, {
      method: "POST",
      headers: {
          "Authorization": `${user.token_type} ${user.token}`,
          "Accept": "application/json"
      },
      body: formData
  });
  const promise = response.json();
  return promise.then((data) => {
      console.log(data)
      if (response.ok) {
          dispatch(showSuccess("Желание успешно изменено"));
          dispatch({ type: UPDATE_DESIRE });
          setTimeout(() => {
              Router.push(`/desire?id=${id}`)
          }, 3000)
      } else {
          dispatch(showAlert(data.message))
      }
    })
    .catch((err) => console.error("Error: ", err));
};

export const deleteOfferPhoto = (id: any, photo: any) => async (
    dispatch: Function
) => {
  HttpRequest.execute(`/desires/offers/photo/${id}`, "DELETE", "application/json", {photo})
      .then((data) => {
        return dispatch({ type: DELETE_OFFER_PHOTO });
      })
      .catch((err) => console.error("Error: ", err));
};

export const deleteDesirePhoto = (id: any, photo: any) => async (
    dispatch: Function
) => {
  HttpRequest.execute(`/desires/photo/${id}`, "DELETE", "application/json", {photo})
      .then((data) => {
        return dispatch({ type: DELETE_DESIRE_PHOTO });
      })
      .catch((err) => console.error("Error: ", err));
};

export const deleteDesire = (id: number | string) => async (
  dispatch: Function
) => {
  HttpRequest.execute(`/desires/${id}`, "DELETE")
    .then((data) => {
      return dispatch({ type: DELETE_DESIRE });
    })
    .catch((err) => console.error("Error: ", err));
};

export const addComplaint = (
  complaint: string,
  type_id: number | string,
  complaint_to_id: number | string
) => async (dispatch: Function) => {
  HttpRequest.execute(`/complaints/add`, "POST", "application/json", {complaint, type_id, complaint_to_id})
      .then((data) => {
        dispatch(showSuccess("Жалоба успешно создана"));
        return dispatch({ type: ADD_COMPLAINT, payload: data });
      })
      .catch((err) => console.error("Error: ", err));
};

export const getComplaintsInfo = () => async (dispatch: Function) => {
  HttpRequest.execute(`/info/complaints`)
    .then((data) => {
      return dispatch({ type: GET_COMPLAINTS_INFO, payload: data });
    })
    .catch((err) => console.error("Error: ", err));
};

export const getMyComplaints = () => async (dispatch: Function) => {
  HttpRequest.execute(`/complaints/my`)
    .then((res) => {
      return dispatch({ type: GET_MY_COMPLAINTS, payload: res });
    })
    .catch((err) => console.error("Error: ", err));
};

export const createDesire = (
  photo: any,
  video: string,
  description: string,
  header: string,
  price: string,
  priority_id: string,
  type_id: string,
  category_ids: any,
  subcategory_ids: any,
  region_id: string,
  city_id: string,
  is_active: any
) => async (dispatch: Function) => {
  const formData = new FormData();
  for (let p of photo) {
    formData.append("photo[]", p);
  }
  formData.append("video", video);
  formData.append("description", description);
  formData.append("header", header);
  formData.append("price", price);
  formData.append("priority_id", priority_id);
  formData.append("type_id", type_id);
  formData.append("category_ids", category_ids);
  formData.append("subcategory_ids", subcategory_ids);
  formData.append("region_id", region_id);
  formData.append("city_id", city_id);
  formData.append("is_active", is_active);

  const user = authenticationService.currentUserValue;
  const response = await fetch(`/desires/create`, {
      method: "POST",
      headers: {
          "Authorization": `${user.token_type} ${user.token}`,
          "Accept": "application/json"
      },
      body: formData
  });
  const promise = response.json();
   return promise.then((data) => {
       if (response.ok) {
           dispatch(showSuccess("Желание успешно создано"));
           setTimeout(() => {
               Router.push(`/desire?id=${data.id}`);
           }, 3000);
           return dispatch({ type: CREATE_DESIRE, payload: data });
       } else {
           dispatch(showAlert(data.message))
       }
    })
    .catch((err) => console.error("Error: ", err));
};

export const hideShowDesire = (id: number | string) => async (
  dispatch: Function
) => {
  HttpRequest.execute(`/desires/change/${id}`)
    .then((data) => {
      return dispatch({ type: HIDE_SHOW_DESIRE, payload: id });
    })
    .catch((err) => console.error("Error: ", err));
};

export const hideShowOffer = (id: number | string) => async (
  dispatch: Function
) => {
  HttpRequest.execute(`/desires/offers/change/${id}`)
    .then((data) => {
      return dispatch({ type: HIDE_SHOW_OFFER, payload: id });
    })
    .catch((err) => console.error("Error: ", err));
};

export const sortDesires = (sortId: string) => async (
  dispatch: Function
) => {
  HttpRequest.execute(`/sort_desires/${sortId}`)
    .then((data) => {
      return dispatch({ type: SORT_DESIRES, payload: data });
    })
    .catch((err) => console.error("Error: ", err));
};

export const sortOffers = (sortId: string) => async (dispatch: Function) => {
  HttpRequest.execute(`/sort_offers/${sortId}`)
    .then((res) => {
      return dispatch({ type: SORT_OFFERS, payload: res });
    })
    .catch((err) => console.error("Error: ", err));
};

export const sortOffersByDesireId = (
  id: string | number,
  sortId: string
) => async (dispatch: Function) => {
  HttpRequest.execute(`/sort_offers/${id}/sort/${sortId}`)
    .then((data) => {
      return dispatch({ type: SORT_OFFERS_BY_DESIRE_ID, payload: data });
    })
    .catch((err) => console.error("Error: ", err));
};

export const addOfferToFavorites = (id: number | string) => async (
  dispatch: Function
) => {
  HttpRequest.execute(`/favorite_offer/${id}`)
    .then((data) => {
        dispatch(showSuccess("Предложение добавлено в избранные"));
        dispatch({ type: ADD_OFFER_TO_FAVORITE, payload: id });
    }).catch((err) => console.error("Error: ", err));
};

export const addDesireToFavorites = (id: number | string) => async (
  dispatch: Function
) => {
  HttpRequest.execute(`/favorite_desire/${id}`)
    .then((data) => {
        dispatch(showSuccess("Желание добавлено в избранные"));
        dispatch({ type: ADD_DESIRE_TO_FAVORITE, payload: id });
    })
    .catch((err) => console.error("Error: ", err));
};

export const sortFavoriteDesires = (
  id: number | string,
  sortId: string
) => async (dispatch: Function) => {
  HttpRequest.execute(`/favorites/fave_desire/${id}/sort/${sortId}`)
    .then((data) => {
      return dispatch({ type: SORT_FAVORITE_DESIRES, payload: data });
    })
    .catch((err) => console.error("Error: ", err));
};

export const sortFavoriteOffers = (
  id: number | string,
  sortId: string
) => async (dispatch: Function) => {
  HttpRequest.execute(`/favorites/fave_offer/${id}/sort/${sortId}`)
    .then((data) => {
      return dispatch({ type: SORT_FAVORITE_OFFERS, payload: data });
    })
    .catch((err) => console.error("Error: ", err));
};

export const getFavoritesByDesire = (id: number | string) => async (
  dispatch: Function
) => {
  HttpRequest.execute(`/favorites/fave_by_desire/${id}`)
    .then((data) => {
      return dispatch({ type: GET_FAVORITES_BY_DESIRE, payload: data });
    })
    .catch((err) => console.error("Error: ", err));
};

export const getFavoritesByOffer = (id: number | string) => async (
  dispatch: Function
) => {
  HttpRequest.execute(`/favorites/fave_by_offer/${id}`)
    .then((data) => {
      return dispatch({ type: GET_FAVORITES_BY_OFFER, payload: data });
    })
    .catch((err) => console.error("Error: ", err));
};

export const getUserFavoritePosts = (id: number | string) => async (
  dispatch: Function
) => {
  HttpRequest.execute(`/favorites/fave_by_user/${id}`)
    .then((data) => {
      return dispatch({ type: GET_FAVORITE_POSTS, payload: data });
    })
    .catch((err) => console.error("Error: ", err));
};

export const deleteFavorite = (id: number | string) => async (
  dispatch: Function
) => {
  HttpRequest.execute(`/favorites/${id}`, "DELETE")
    .then(() => {
      return dispatch({ type: DELETE_FAVORITE, payload: id });
    })
    .catch((err) => console.error("Error: ", err));
};

export const updateOffer = (
  desireId: number | string,
  id: number | string,
  photo: any,
  video: string,
  description: string,
  header: string,
  price: string,
  category_ids: any,
  subcategory_ids: any,
  region_id: string,
  city_id: string,
  is_active: any
) => async (dispatch: Function) => {
  // console.log(category_ids, subcategory_ids, desireId, description, header, city_id, region_id, price, is_active, photo, video, id)
  const formData = new FormData();
  if (!photo.length) {
    formData.append("photo", '');
  } else {
    for (let p of photo) {
      formData.append("photo[]", p);
    }
  }
  formData.append("video", video);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("header", header);
  formData.append("category_ids", category_ids);
  formData.append("subcategory_ids", subcategory_ids);
  formData.append("region_id", region_id);
  formData.append("city_id", city_id);
  formData.append("is_active", is_active);

  const user = authenticationService.currentUserValue;
  const response = await fetch(`/desires/offers/${desireId}/edit/${id}`, {
      method: "POST",
      headers: {
          "Authorization": `${user.token_type} ${user.token}`,
          "Accept": "application/json"
      },
      body: formData
  });
  const promise = response.json();
   return promise.then((data) => {
       if (response.ok) {
           dispatch({ type: UPDATE_OFFER });
           dispatch(showSuccess("Предложение успешно отредактировано"));
           setTimeout(() => {
               window.location.reload()
           }, 3000)
       } else {
           dispatch(showAlert(data.message))
       }
    }).catch((err) => console.error("Error: ", err));
};

export const getOffer = (id: number | string) => async (dispatch: Function) => {
  HttpRequest.execute(`/desires/offers/show/${id}`)
    .then((res) => {
      return dispatch({ type: GET_OFFER, payload: res });
    })
    .catch((err) => console.error("Error: ", err));
};

export const createOffer = (
  desireId: number | string,
  photo: any,
  video: string,
  description: string,
  header: string,
  price: string,
  category_ids: any,
  subcategory_ids: any,
  region_id: string,
  city_id: string,
  is_active: any
) => async (dispatch: Function) => {
  const formData = new FormData();

  for (let p of photo) {
    formData.append("photo[]", p);
  }
  formData.append("description", description);
  formData.append("header", header);
  formData.append("price", price);
  formData.append("region_id", region_id);
  formData.append("city_id", city_id);
  formData.append("video", video);
  formData.append("category_ids", category_ids);
  formData.append("subcategory_ids", subcategory_ids);
  formData.append("is_active", is_active);

    const user = authenticationService.currentUserValue;
    const response = await fetch(`/desires/offers/create/${desireId}`, {
      method: "POST",
      headers: {
          "Authorization": `${user.token_type} ${user.token}`,
          "Accept": "application/json"
      },
      body: formData
  });
    const promise = response.json();
     return promise.then((data) => {
         if (response.ok) {
             dispatch({ type: CREATE_OFFER, payload: data });
             dispatch(showSuccess("Предложение успешно создано"));
             setTimeout(() => {
                 Router.push(`/desire?id=${desireId}`);
             }, 3000);
         } else {
             dispatch(showAlert(data.message))
         }
      })
      .catch((err) => console.error("Error: ", err));
};

export const getCurrentGeoPosition = () => async (dispatch: Function) => {
  return await fetch(`https://api.2ip.ua/geo.json?ip=`)
    .then((res) => res.json())
    .then((data) => {
      return dispatch({ type: GET_CURRENT_GEO_POSITION, payload: data });
    })
    .catch((err) => err);
}

export const sortMyOffers = (sortId: string) => async (
  dispatch: Function
) => {
  HttpRequest.execute(`/sort_offers_user/${sortId}`)
    .then((data) => {
      return dispatch({ type: SORT_MY_OFFERS, payload: data });
    })
    .catch((err) => console.error("Error:", err));
};

export const sortMyDesires = (sortId: string) => async (
  dispatch: Function
) => {
  HttpRequest.execute(`/sort_desires_user/${sortId}`)
    .then((data) => {
      return dispatch({ type: SORT_MY_DESIRES, payload: data });
    })
    .catch((err) => console.error("Error:", err));
};

export const getUserInfo = () => async (
    dispatch: Function
) => {
  HttpRequest.execute(`/details`)
     .then((data) => {
         dispatch(showSuccess(data.message))
         dispatch({ type: GET_USER_INFO, payload: data });
      }).catch((err) => console.error("Error:", err));
};
