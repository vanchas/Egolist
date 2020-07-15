import fetch from "isomorphic-unfetch";
import Cookies from "js-cookie";
import Router from "next/router";
import { authenticationService } from "../../_services/authentication.service";
import {
  UPDATE_USER_INFO,
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
  GET_INTERESTING_DESIRES_TO_OFFER,
  SORT_FAVORITE_DESIRES,
  SORT_FAVORITE_OFFERS,
  GET_CURRENT_GEO_POSITION,
  SORT_MY_OFFERS,
  SORT_MY_DESIRES,
  GET_COMPLAINTS_INFO,
} from "./types";

import { showSuccess, showAlert } from "./actions";

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
  region_id: string
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

  const user = authenticationService.currentUserValue;
  const response = await fetch(`https://egolist.padilo.pro/api/update_user`, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      Authorization: `${user.token_type} ${user.token}`,
    },
    body: formData,
    // body: JSON.stringify({
    //   name: 'string',
    //   second_name: 'string',
    //   email: 'string@asd',
    //   phone: '3801236547789',
    //   telegram: 'string',
    //   viber: 'string',
    //   whatsapp: 'string',
    //   site: 'string',
    //   avatar: null,
    //   region_id: 1
    // })
  });
  const promise = response.json();
  return promise
    .then((res) => {
      Cookies.set(
        "currentUser",
        JSON.stringify({
          ...res,
          token: user.token,
          token_type: user.token_type,
        })
      );
      return dispatch({ type: UPDATE_USER_INFO });
    })
    .catch((err) => console.error("Error: ", err));
};

export const getMyDesires = () => async (dispatch: Function) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(`https://egolist.padilo.pro/api/desires/my`, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      Authorization: `${user.token_type} ${user.token}`,
    },
  });
  const promise = response.json();
  return promise
    .then((res) => {
      return dispatch({ type: GET_MY_DESIRES, payload: res });
    })
    .catch((err) => console.error("Error: ", err));
};

export const getMyOffers = () => async (dispatch: Function) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(
    `https://egolist.padilo.pro/api/desires/offers/my`,
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        Authorization: `${user.token_type} ${user.token}`,
      },
    }
  );
  const promise = response.json();
  return promise
    .then((res) => {
      return dispatch({ type: GET_MY_OFFERS, payload: res });
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
  for (let p of photo) {
    formData.append("photo[]", p);
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
  const response = await fetch(
    `https://egolist.padilo.pro/api/desires/edit/${id}`,
    {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        Authorization: `${user.token_type} ${user.token}`,
      },
      body: formData,
    }
  );
  if (response.status === 200) {
    dispatch(showSuccess("Желание успешно изменено"));
  }
  const promise = response.json();
  return promise
    .then((res) => {
      return dispatch({ type: UPDATE_DESIRE });
    })
    .then(() => Router.push(`/desire?id=${id}`))
    .catch((err) => console.error("Error: ", err));
};

export const deleteDesire = (id: number | string) => async (
  dispatch: Function
) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(`https://egolist.padilo.pro/api/desires/${id}`, {
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      Authorization: `${user.token_type} ${user.token}`,
    },
  });
  const promise = response.json();
  return promise
    .then((res) => {
      return dispatch({ type: DELETE_DESIRE });
    })
    .catch((err) => console.error("Error: ", err));
};

export const addComplaint = (
  // id: number | string,
  complaint: string,
  type_id: number | string,
  complaint_to_id: number | string
) => async (dispatch: Function) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(
    `https://egolist.padilo.pro/api/complaints/add`,
    {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `${user.token_type} ${user.token}`,
      },
      body: JSON.stringify({
        complaint,
        type_id,
        complaint_to_id,
      }),
    }
  );
  const promise = response.json();
  if (response.status === 201) {
    return promise
      .then((data) => {
        dispatch(showSuccess("Жалоба успешно создана"));
        return dispatch({ type: ADD_COMPLAINT, payload: data });
      })
      .catch((err) => console.error("Error: ", err));
  } else {
    return promise
      .then((data) => {
        return dispatch(showAlert("Не верно заполнена форма"));
      })
      .catch((err) => console.error("Error: ", err));
  }
};

export const getComplaintsInfo = () => async (dispatch: Function) => {
  const response = await fetch(
    `https://egolist.padilo.pro/api/info/complaints`
  );
  const promise = response.json();
  return promise
    .then((data) => {
      return dispatch({ type: GET_COMPLAINTS_INFO, payload: data });
    })
    .catch((err) => console.error("Error: ", err));
};

export const getMyComplaints = () => async (dispatch: Function) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(`https://egolist.padilo.pro/api/complaints/my`, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      Authorization: `${user.token_type} ${user.token}`,
    },
  });
  const promise = response.json();
  return promise
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
  const response = await fetch(
    `https://egolist.padilo.pro/api/desires/create`,
    {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `${user.token_type} ${user.token}`,
      },
      body: formData,
    }
  );
  const promise = response.json();
  return promise
    .then((data) => {
      if (response.status === 201) {
        dispatch(showSuccess("Желание успешно создано"));
        setTimeout(() => {
          Router.push(`/desire?id=${data.id}`);
        }, 3000);
      } else {
        dispatch(showAlert(data.message));
      }
      return dispatch({ type: CREATE_DESIRE, payload: data });
    })
    .catch((err) => console.error("Error: ", err));
};

export const hideShowDesire = (id: number | string) => async (
  dispatch: Function
) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(
    `https://egolist.padilo.pro/api/desires/change/${id}`,
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        Authorization: `${user.token_type} ${user.token}`,
      },
    }
  );
  const promise = response.json();
  return promise
    .then((res) => {
      return dispatch({ type: HIDE_SHOW_DESIRE, payload: id });
    })
    .catch((err) => console.error("Error: ", err));
};

export const hideShowOffer = (id: number | string) => async (
  dispatch: Function
) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(
    `https://egolist.padilo.pro/api/desires/offers/change/${id}`,
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        Authorization: `${user.token_type} ${user.token}`,
      },
    }
  );
  const promise = response.json();
  return promise
    .then((res) => {
      return dispatch({ type: HIDE_SHOW_OFFER, payload: id });
    })
    .catch((err) => console.error("Error: ", err));
};

export const sortDesires = (sortValue: string) => async (
  dispatch: Function
) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(`https://egolist.padilo.pro/api/sort_desires`, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${user.token_type} ${user.token}`,
    },
    body: JSON.stringify({ search_by: sortValue }),
  });
  const promise = response.json();
  return promise
    .then((res) => {
      return dispatch({ type: SORT_DESIRES, payload: res });
    })
    .catch((err) => console.error("Error: ", err));
};

export const sortOffers = (sortValue: string) => async (dispatch: Function) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(`https://egolist.padilo.pro/api/sort_offers`, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${user.token_type} ${user.token}`,
    },
    body: JSON.stringify({ search_by: sortValue }),
  });
  const promise = response.json();
  return promise
    .then((res) => {
      return dispatch({ type: SORT_OFFERS, payload: res });
    })
    .catch((err) => console.error("Error: ", err));
};

export const sortOffersByDesireId = (
  id: string | number,
  sortValue: string
) => async (dispatch: Function) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(
    `https://egolist.padilo.pro/api/sort_offers/${id}`,
    {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${user.token_type} ${user.token}`,
      },
      body: JSON.stringify({ search_by: sortValue }),
    }
  );
  const promise = response.json();
  return promise
    .then((res) => {
      return dispatch({ type: SORT_OFFERS_BY_DESIRE_ID, payload: res });
    })
    .catch((err) => console.error("Error: ", err));
};

export const addOfferToFavorites = (id: number | string) => async (
  dispatch: Function
) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(
    `https://egolist.padilo.pro/api/favorite_offer/${id}`,
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        Authorization: `${user.token_type} ${user.token}`,
      },
    }
  );
  const promise = response.json();
  return promise
    .then((data) => {
      if (response.status === 201) {
        dispatch(showSuccess("Предложение добавлено в избранные"));
        dispatch({ type: ADD_OFFER_TO_FAVORITE, payload: id });
      } else {
        dispatch(showAlert(data.message))
      }
    })
    .catch((err) => console.error("Error: ", err));
};
export const addDesireToFavorites = (id: number | string) => async (
  dispatch: Function
) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(
    `https://egolist.padilo.pro/api/favorite_desire/${id}`,
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        Authorization: `${user.token_type} ${user.token}`,
      },
    }
  );
  const promise = response.json();
  return promise
    .then((data) => {
      if (response.status === 201) {
        dispatch(showSuccess("Желание добавлено в избранные"));
        dispatch({ type: ADD_DESIRE_TO_FAVORITE, payload: id });
      } else {
        dispatch(showAlert(data.message))
      }
    })
    .catch((err) => console.error("Error: ", err));
};
export const sortFavoriteDesires = (
  id: number | string,
  sortValue: string
) => async (dispatch: Function) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(
    `https://egolist.padilo.pro/api/favorites/fave_desire/sort/${id}`,
    {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `${user.token_type} ${user.token}`,
      },
      body: JSON.stringify({ search_by: sortValue }),
    }
  );
  const promise = response.json();
  return promise
    .then((data) => {
      return dispatch({ type: SORT_FAVORITE_DESIRES, payload: data });
    })
    .catch((err) => console.error("Error: ", err));
};
export const sortFavoriteOffers = (
  id: number | string,
  sortValue: string
) => async (dispatch: Function) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(
    `https://egolist.padilo.pro/api/favorites/fave_desire/sort/${id}`,
    {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `${user.token_type} ${user.token}`,
      },
      body: JSON.stringify({ search_by: sortValue }),
    }
  );
  const promise = response.json();
  return promise
    .then((data) => {
      return dispatch({ type: SORT_FAVORITE_OFFERS, payload: data });
    })
    .catch((err) => console.error("Error: ", err));
};
export const getFavoritesByDesire = (id: number | string) => async (
  dispatch: Function
) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(
    `https://egolist.padilo.pro/api/favorites/fave_by_desire/${id}`,
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        Authorization: `${user.token_type} ${user.token}`,
      },
    }
  );
  const promise = response.json();
  return promise
    .then((res) => {
      return dispatch({ type: GET_FAVORITES_BY_DESIRE, payload: res });
    })
    .catch((err) => console.error("Error: ", err));
};
export const getFavoritesByOffer = (id: number | string) => async (
  dispatch: Function
) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(
    `https://egolist.padilo.pro/api/favorites/fave_by_offer/${id}`,
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        Authorization: `${user.token_type} ${user.token}`,
      },
    }
  );
  const promise = response.json();
  return promise
    .then((res) => {
      return dispatch({ type: GET_FAVORITES_BY_OFFER, payload: res });
    })
    .catch((err) => console.error("Error: ", err));
};
export const getUserFavoritePosts = (id: number | string) => async (
  dispatch: Function
) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(
    `https://egolist.padilo.pro/api/favorites/fave_by_user/${id}`,
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        Authorization: `${user.token_type} ${user.token}`,
      },
    }
  );
  const promise = response.json();
  return promise
    .then((res) => {
      return dispatch({ type: GET_FAVORITE_POSTS, payload: res });
    })
    .catch((err) => console.error("Error: ", err));
};
export const deleteFavorite = (id: number | string) => async (
  dispatch: Function
) => {
  const user = authenticationService.currentUserValue;
  return await fetch(`https://egolist.padilo.pro/api/favorites/${id}`, {
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `${user.token_type} ${user.token}`,
    },
  })
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
    formData.append("photo", "[]");
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
  const response = await fetch(
    `https://egolist.padilo.pro/api/desires/offers/${desireId}/edit/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        Authorization: `${user.token_type} ${user.token}`,
      },
      body: formData,
    }
  );
  const promise = response.json();
  return promise
    .then((data) => {
      if (response.status === 200) {
        dispatch({ type: UPDATE_OFFER });
        dispatch(showSuccess("Предложение успешно отредактировано"));
      } else {
        dispatch(showAlert(data.message));
      }
    })
    .catch((err) => console.error("Error: ", err));
};
export const getOffer = (id: number | string) => async (dispatch: Function) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(
    `https://egolist.padilo.pro/api/desires/offers/show/${id}`,
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `${user.token_type} ${user.token}`,
      },
    }
  );
  const promise = response.json();
  return promise
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
  const response = await fetch(
    `https://egolist.padilo.pro/api/desires/offers/create/${desireId}`,
    {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `${user.token_type} ${user.token}`,
      },
      body: formData,
    }
  );
  const promise = response.json();
  if (response.status === 201 || response.status === 200) {
    return promise
      .then((data) => {
        dispatch({ type: CREATE_OFFER, payload: data });
        dispatch(showSuccess("Предложение успешно создано"));
        setTimeout(() => {
          Router.push(`/desire?id=${desireId}`);
        }, 3000);
      })
      .catch((err) => console.error("Error: ", err));
  } else {
    return promise
      .then((data) => {
        dispatch(showAlert(data.message));
      })
      .catch((err) => console.error("Error: ", err));
  }
};
export const getInterestingDesiresToOffer = (
  offerId: number | string
) => async (dispatch: Function) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(
    `https://egolist.padilo.pro/api/desires/interesting_for/${offerId}`,
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `${user.token_type} ${user.token}`,
      },
    }
  );
  const promise = response.json();
  return promise
    .then((res) => {
      dispatch({ type: GET_INTERESTING_DESIRES_TO_OFFER, payload: res });
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
};
export const sortMyOffers = (search_by: string) => async (
  dispatch: Function
) => {
  const user = authenticationService.currentUserValue;
  return await fetch(`https://egolist.padilo.pro/api/sort_offers_user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${user.token_type} ${user.token}`,
    },
    body: JSON.stringify({ search_by }),
  })
    .then((res) => res.json())
    .then((data) => {
      return dispatch({ type: SORT_MY_OFFERS, payload: data });
    })
    .catch((err) => console.error("Error:", err));
};
export const sortMyDesires = (search_by: string) => async (
  dispatch: Function
) => {
  const user = authenticationService.currentUserValue;
  return await fetch(`https://egolist.padilo.pro/api/sort_desires_user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${user.token_type} ${user.token}`,
    },
    body: JSON.stringify({ search_by }),
  })
    .then((res) => res.json())
    .then((data) => {
      return dispatch({ type: SORT_MY_DESIRES, payload: data });
    })
    .catch((err) => console.error("Error:", err));
};
