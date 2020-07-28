import {
    UPDATE_COMPLAINT,
    DELETE_COMPLAINT,
    CREATE_CATEGORY,
    EDIT_CATEGORY,
    DELETE_CATEGORY,
    CREATE_SUBCATEGORY,
    EDIT_SUBCATEGORY,
    DELETE_SUBCATEGORY,
    GET_ALL_COMPLAINTS,
    UPLOAD_PHOTO_VERIFY_EXAMPLE,
    SORT_ALL_USERS_LIST,
    GET_COUNT_USERS_WHO_SENT_FILES,
    GET_USERS_WHO_SENT_FILES,
    ALLOW_USER_VERIFICATION,
    REFUSE_USER_VERIFICATION, DELETE_PHOTO_VERIFY_EXAMPLE, SEARCH_ALL_USERS, GET_ALL_USERS, GET_USERS_SORT_VALUES,
} from "./types";
import {showAlert, showSuccess} from "./appActions";
import HttpRequest from "../../_helpers/HttpRequest";
import {authenticationService} from "../../_services/authentication.service";
import fetch from "isomorphic-unfetch";

const target = `https://egolist.padilo.pro/api`;

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

export const getAllUsers = () => async (dispatch: Function) => {
    // admin/users - get,получения списка юзеров, с пагинацией
    HttpRequest.execute(`/admin/users`)
        .then(data => {
            return dispatch({ type: GET_ALL_USERS, payload: data.data })
        }).catch(err => console.error('Error: ', err));
}

export const searchAllUsers = (search: string) => async (dispatch: Function) => {
// admin/users/{search} - get,поиск по имени и фамилии
    HttpRequest.execute(`/admin/users/${search}`)
        .then(data => {
            return dispatch({ type: SEARCH_ALL_USERS, payload: data })
        }).catch(err => console.error('Error: ', err));
}

export const getUsersSortValues = () => async (dispatch: Function) => {
    HttpRequest.execute(`/info/sorts/user`)
        .then(data => {
            return dispatch({ type: GET_USERS_SORT_VALUES, payload: data.sorts })
        }).catch(err => console.error('Error: ', err));
}

export const getCountOfUsersWhoSentFiles = () => async (dispatch: Function) => {
// admin - get, отображается количество людей, которые отправили файлы и не
    HttpRequest.execute(`/admin`)
        .then(data => {
            return dispatch({ type: GET_COUNT_USERS_WHO_SENT_FILES, payload: data })
        }).catch(err => console.error('Error: ', err));
}

export const getUsersWhoSentFiles = () => async (dispatch: Function) => {
// admin/references - get, список юзеров, которые отправили файлы на активацию аккаунта
    HttpRequest.execute(`/admin/references`)
        .then(data => {
            return dispatch({ type: GET_USERS_WHO_SENT_FILES, payload: data })
        }).catch(err => console.error('Error: ', err));
}

export const allowUserVerification = (id: any) => async (dispatch: Function) => {
// admin/make_verify/{id} - get, админ делает активным юзера
    HttpRequest.execute(`/admin/make_verify/${id}`)
        .then(data => {
            if (data.errors) {
                dispatch(showAlert(data.message))
            } else {
                dispatch(showSuccess(data.message))
                dispatch({ type: ALLOW_USER_VERIFICATION, payload: data })
                setTimeout(() => window.location.reload(), 3000)
            }
        }).catch(err => console.error('Error: ', err));
}

export const refuseUserVerification = (id: any, message: string) => async (dispatch: Function) => {
// admin/refuse/{id} - post, отказ от верификации, передаешь мне поле "message", не менее 200 символов с причиной отказа
    HttpRequest.execute(`/admin/refuse/${id}`,'POST', "application/json", {message})
        .then(data => {
            if (data.errors) {
                dispatch(showAlert(data.message))
            } else {
                dispatch(showSuccess(data.message))
                dispatch({ type: REFUSE_USER_VERIFICATION, payload: data })
                setTimeout(() => window.location.reload(), 3000)
            }
        }).catch(err => console.error('Error: ', err));
}

export const sortAllUsersList = (sort: string) => async (dispatch: Function) => {
    HttpRequest.execute(`/`,'POST', "application/json", sort)
        .then(data => {
            return dispatch({ type: SORT_ALL_USERS_LIST, payload: data })
        }).catch(err => console.error('Error: ', err));
}

export const deletePhotoVerifyExample = (photo: string) => async (dispatch: Function) => {
    // photo/delete - delete, в реквесте имя фотки
    HttpRequest.execute(`/admin/photo/delete`, 'POST', 'application/json', {example: photo})
        .then(data => {
            dispatch({ type: DELETE_PHOTO_VERIFY_EXAMPLE, payload: data })
        }).then(() => window.location.reload())
        .catch(err => console.error('Error: ', err));
}

export const uploadPhotoVerifyExample = (photoFirst: any, photoSecond: any) => async (dispatch: Function) => {
    // admin/photo/examples - post, админ может загружать пару фоток для примера
    const formData = new FormData();

    formData.append("photo_first", photoFirst);
    formData.append("photo_second", photoSecond);

    const user = authenticationService.currentUserValue;
    const response = await fetch(`${target}/admin/photo/examples`, {
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
            dispatch({ type: UPLOAD_PHOTO_VERIFY_EXAMPLE, payload: data.example });
            dispatch(showSuccess("Фото успешно отправлено"));
            setTimeout(() => window.location.reload(), 3000)
        } else {
            dispatch(showAlert(data.message))
        }
    })
        .catch((err) => console.error("Error: ", err));
};


export const updateUserInfoByAdmin = (
    id: any,
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
    // admin/edit/{id} - POST, все поля, которые есть у юзера
    const response = await fetch(`${target}/admin/user/${id}`, {
        method: "POST",
        headers: {
            "Authorization": `${user.token_type} ${user.token}`,
            "Accept": "application/json",
        },
        body: formData
    });
    const promise = response.json();
    return promise.then((data) => {
        if (response.ok) {
            dispatch(showSuccess('Успешно изменено'))
            setTimeout(() => {
                window.location.reload()
            }, 3000)
        } else {
            dispatch(showAlert(data.message))
        }
    })
        .catch((err) => console.error("Error: ", err));
};