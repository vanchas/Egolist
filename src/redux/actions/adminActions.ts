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
import {showSuccess} from "./actions";
import HttpRequest from "../../_helpers/HttpRequest";

export const getAllComplaints = () => async (dispatch: Function) => {
  HttpRequest.execute(`/complaints`)
      .then(data => {
        return dispatch({ type: GET_ALL_COMPLAINTS, payload: data })
      }).catch(err => console.error('Error: ', err));
}

export const updateComplaint = (id: number | string, complaint: string, type_id: number | string, complaint_to_id: number | string) => async (dispatch: Function) => {
  HttpRequest.execute(`/complaints/change/${id}`, 'POST',"application/json", {complaint,type_id,complaint_to_id})
      .then((data) => {
          dispatch(showSuccess('Жалоба успешно обновлена'))
          return dispatch({ type: UPDATE_COMPLAINT, payload: data });
      }).catch((err) => console.error("Error: ", err));
}

export const deleteComplaint = (id: number | string) => async (dispatch: Function) => {
  HttpRequest.execute(`/complaints/${id}`,'DELETE')
  .then(data => {
    return dispatch({ type: DELETE_COMPLAINT, payload: data })
  }).catch(err => console.error('Error: ', err));
}

export const createCategory = (name: string) => async (dispatch: Function) => {
  HttpRequest.execute(`/categories/create`,'POST',"application/json",{ name })
  .then(res => {
    return dispatch({ type: CREATE_CATEGORY, payload: res })
  }).catch(err => console.error('Error: ', err));
}

export const editCategory = (id: number | string, name: string) => async (dispatch: Function) => {
  HttpRequest.execute(`/categories/edit/${id}`,'POST',"application/json",{ name })
  .then(res => {
    return dispatch({ type: EDIT_CATEGORY, payload: res })
  }).catch(err => console.error('Error: ', err));
}

export const deleteCategory = (id: number | string) => async (dispatch: Function) => {
  HttpRequest.execute(`/categories/${id}`, 'DELETE')
      .then(data => {
    return dispatch({ type: DELETE_CATEGORY, payload: data })
  }).catch(err => console.error('Error: ', err));
}

export const createSubcategory = (categoryId: number | string, name: string) => async (dispatch: Function) => {
  HttpRequest.execute(`/categories/sub/${categoryId}/create`,'POST', "application/json",{ name })
.then(data => {
    return dispatch({ type: CREATE_SUBCATEGORY, payload: data })
  }).catch(err => console.error('Error: ', err));
}

export const editSubcategory = (id: number | string, categoryId: number | string, name: string) => async (dispatch: Function) => {
  HttpRequest.execute(`/categories/sub/${categoryId}/edit/${id}`, 'POST', "application/json", {name})
      .then(data => {
        return dispatch({type: EDIT_SUBCATEGORY, payload: data})
      }).catch(err => console.error('Error: ', err));
}

export const deleteSubcategory = (id: number | string) => async (dispatch: Function) => {
  HttpRequest.execute(`/categories/sub/${id}`,'DELETE')
      .then(data => {
        return dispatch({ type: DELETE_SUBCATEGORY, payload: data })
      }).catch(err => console.error('Error: ', err));
}
