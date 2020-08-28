import React, { useState } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import FacebookIcon from "../../assets/svg/facebook.svg";
import s from "./login.module.scss";
import HttpRequest from "../../_helpers/HttpRequest";
import Cookies from "js-cookie";
import Router from "next/router";
import SpinnerGrow from "../helpers/SpinnerGrow";

const styles = {
  error: {
    width: "100%",
    maxWidth: "400px",
    margin: "auto",
    backgroundColor: "#2e3137",
    padding: "2em 1em",
    color: "#fff",
  },
  header: {
    color: "#fff",
  },
};

export default function FacebookLoginComponent(props) {
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
      setTimeout(() => setError(null), 4000);
    }
  };

  const sendTokenToBackend = async (token) => {
    await HttpRequest.execute(`/oauth/callback/${token}`)
      .then((data) => {
        if (data && data.token) {
          Cookies.set("currentUser", JSON.stringify(data), { expires: 1 });
          return data;
        } else {
          props.setErrorFromBackend("К сожалению войти не удалось");
          setTimeout(() => props.setErrorFromBackend(null), 4000);
        }
      })
      .then((data) => {
        if (data) {
          Router.push("/");
          setTimeout(() => window.location.reload(), 500);
        }
      })
      .catch((err) => console.error(err));
  };

  let fbContent;

  if (isLoggedIn) {
    fbContent = (
      <div style={styles.error}>
        <img src={picture} alt={name} />
        <span className={`float-right`}><SpinnerGrow color={`primary`} /></span>
        <h2 style={styles.header}>Добро пожаловать, {name}</h2>
        <p>Email: {email}</p>
      </div>
    );
  } else {
    fbContent = (
      <>
        <div className={`pb-2`}>Вход с помощью Facebook</div>
        <FacebookLogin
          appId="900510350359522"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          cssClass="my-facebook-button-class"
          icon="fa-facebook"
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
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
      </>
    );
  }

  return (
    <div className={`text-center`}>
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
