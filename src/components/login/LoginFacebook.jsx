import React, { useEffect, useState } from "react";
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import FacebookIcon from "../../assets/svg/facebook.svg";
import s from "./login.module.scss";
import HttpRequest from "../../_helpers/HttpRequest";
import Cookies from "js-cookie";
import Router from "next/router";

const styles = {
  error: {
    width: "100%",
    maxWidth: "400px",
    margin: "auto",
    backgroundColor: "#f4f4f4",
    padding: "2em 1em",
  },
};

export default function (props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const [error, setError] = useState(null);

  const responseFacebook = (response) => {
    if (response.accessToken) {
      setIsLoggedIn(true);
      setName(response.name);
      setEmail(response.email);
      setPicture(response.picture.data.url);
      sendTokenToBackend(response.accessToken);
    } else {
      setError("К сожалению войти не удалось");
      setTimeout(() => setError(null), 4000)
    }
  };

  const sendTokenToBackend = async (token) => {
    await HttpRequest.execute(`/oauth/callback/${token}`)
      .then((data) => {
        if (data && data.token) {
          Cookies.set("currentUser", JSON.stringify(data), { expires: 1 });
          Router.push('/')
        } else {
          props.setErrorFromBackend('К сожалению войти не удалось')
          setTimeout(() => props.setErrorFromBackend(null), 4000)
        }
      })
      .catch((err) => console.error(err));
  };

  let fbContent;

  if (isLoggedIn) {
    fbContent = (
      <div style={styles.error}>
        <img src={picture} alt={name} />
        <h2>Добро пожаловать, {name}</h2>
        <p>Email: {email}</p>
      </div>
    );
  } else {
    fbContent = (
      <FacebookLogin
        appId="900510350359522"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="my-facebook-button-class"
        icon="fa-facebook"
        render={(renderProps) => (
          <button
            onClick={() => {
              // submitHandler
              /* isDisabled: false
               * isProcessing: false
               * isSdkLoaded: true */
              renderProps.onClick();
            }}
            className={`btn btn-primary`}
          >
            Facebook
            <img
              src={FacebookIcon}
              alt={`facebook`}
              className={s.facebook_icon}
            />
          </button>
        )}
      />
    );
  }

  return (
    <div className={`text-center`}>
      <div>Вход с помощью Facebook</div>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        fbContent
      )}
    </div>
  );
}
