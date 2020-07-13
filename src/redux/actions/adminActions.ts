import { authenticationService } from "../../_services/authentication.service";
import {
  UPDATE_COMPLAINT,
  DELETE_COMPLAINT,
  CREATE_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  CREATE_SUBCATEGORY,
  EDIT_SUBCATEGORY,
  DELETE_SUBCATEGORY,
  GET_ALL_COMPLAINTS
} from "./types";
import {showAlert, showSuccess} from "./actions";

export const getAllComplaints = () => async (dispatch: Function) => {
  const user = authenticationService.currentUserValue;
  return await fetch(`https://egolist.padilo.pro/api/complaints`, {
    method: 'GET',
    headers: {
      'Authorization': `${user.token_type} ${user.token}`
    }
  }).then(res => res.json())
      .then(data => {
        return dispatch({ type: GET_ALL_COMPLAINTS, payload: data })
      }).catch(err => console.error('Error: ', err));
}

export const updateComplaint = (id: number | string, complaint: string, type_id: number | string, complaint_to_id: number | string) => async (dispatch: Function) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(`https://egolist.padilo.pro/api/complaints/change/${id}`, {
    method: 'POST',
    headers: {
      'Authorization': `${user.token_type} ${user.token}`
    },
    body: JSON.stringify({
      complaint, // - текст жалобы,
      type_id, // - по роуту info/complaints,
      complaint_to_id
    })
  });
  const promise = response.json();
  if (response.status === 200) {
    return promise
        .then((data) => {
          dispatch(showSuccess('Жалоба успешно обновлена'))
          return dispatch({ type: UPDATE_COMPLAINT, payload: data });
        })
        .catch((err) => console.error("Error: ", err));
  } else {
    return promise
        .then((data) => {
          return dispatch(showAlert('Не верно заполнена форма'));
        })
        .catch((err) => console.error("Error: ", err));
  }
}
export const deleteComplaint = (id: number | string) => async (dispatch: Function) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(`https://egolist.padilo.pro/api/complaints/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `${user.token_type} ${user.token}`
    }
  });
  const promise = response.json();
  return promise.then(res => {
    return dispatch({ type: DELETE_COMPLAINT, payload: res })
  }).catch(err => console.error('Error: ', err));
}
export const createCategory = (name: string) => async (dispatch: Function) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(`https://egolist.padilo.pro/api/categories/create`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `${user.token_type} ${user.token}`
    },
    body: JSON.stringify({ name })
  });
  const promise = response.json();
  return promise.then(res => {
    return dispatch({ type: CREATE_CATEGORY, payload: res })
  }).catch(err => console.error('Error: ', err));
}
export const editCategory = (id: number | string, name: string) => async (dispatch: Function) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(`https://egolist.padilo.pro/api/categories/edit/${id}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `${user.token_type} ${user.token}`
    },
    body: JSON.stringify({ name })
  });
  const promise = response.json();
  return promise.then(res => {
    return dispatch({ type: EDIT_CATEGORY, payload: res })
  }).catch(err => console.error('Error: ', err));
}
export const deleteCategory = (id: number | string) => async (dispatch: Function) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(`https://egolist.padilo.pro/api/categories/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `${user.token_type} ${user.token}`
    }
  });
  const promise = response.json();
  return promise.then(res => {
    return dispatch({ type: DELETE_CATEGORY, payload: res })
  }).catch(err => console.error('Error: ', err));
}

export const createSubcategory = (categoryId: number | string, name: string) => async (dispatch: Function) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(`https://egolist.padilo.pro/api/categories/sub/${categoryId}/create`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `${user.token_type} ${user.token}`
    },
    body: JSON.stringify({ name })
  });
  const promise = response.json();
  return promise.then(res => {
    return dispatch({ type: CREATE_SUBCATEGORY, payload: res })
  }).catch(err => console.error('Error: ', err));
}
export const editSubcategory = (id: number | string, categoryId: number | string, name: string) => async (dispatch: Function) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(`https://egolist.padilo.pro/api/categories/sub/${categoryId}/edit/${id}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `${user.token_type} ${user.token}`
    },
    body: JSON.stringify({ name })
  });
  const promise = response.json();
  return promise.then(res => {
    return dispatch({ type: EDIT_SUBCATEGORY, payload: res })
  }).catch(err => console.error('Error: ', err));
}
export const deleteSubcategory = (id: number | string) => async (dispatch: Function) => {
  const user = authenticationService.currentUserValue;
  const response = await fetch(`https://egolist.padilo.pro/api/categories/sub/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `${user.token_type} ${user.token}`
    }
  });
  const promise = response.json();
  return promise.then(res => {
    return dispatch({ type: DELETE_SUBCATEGORY, payload: res })
  }).catch(err => console.error('Error: ', err));
}
