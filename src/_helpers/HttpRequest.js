import store from "../redux/store";
import {showAlert} from "../redux/actions/appActions";
import {authenticationService} from "../_services/authentication.service";
import fetch from "isomorphic-unfetch";
import HttpStatus from "./HttpStatus";

export default class HttpRequest {

  static execute(REST, method = 'GET', type = "application/json", body = null) {
    const user = authenticationService.currentUserValue;
    const target = "https://egolist.padilo.pro/api";
    const requestParams = {
      method,
      headers: {
        "Content-Type": `${type};charset=utf-8`,
        "Authorization": `${user.token_type} ${user.token}`,
        "Access-Control-Allow-Origin": "*"
      },
      // credentials: "same-origin",
      body: null,
    };

    if (body) {
      if (body instanceof FormData) {
        requestParams.body = body;
      } else {
        requestParams.body = JSON.stringify(body);
      }
    }

    return fetch(`${target}${REST}`, requestParams).then((res) => {
      if (res.status === HttpStatus.EMPTY_RESPONSE) {
        return null;
      }
      return res.ok
        ? Promise
              .all([res.clone().blob(), res])
              .then(([blob, res]) => blob.type.includes("application/json")
                  ? res.json()
                  : Promise.reject(res)
          )
        : res.json()
              .then((json) => Promise.reject(json))
              .catch(err => {
                console.error(err)
                // store.dispatch(showAlert(err.message))
              });
    });
  }
}
