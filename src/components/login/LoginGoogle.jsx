import React, { useState } from "react";
import s from "./login.module.scss";
import { GoogleLogin } from "react-google-login";
import GoogleIcon from "../../assets/svg/google.svg";
import HttpRequest from "../../_helpers/HttpRequest";
import Cookies from "js-cookie";
import Router from 'next/router'

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
  const [familyName, setFamilyName] = useState("");
  const [givenName, setGivenName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const [error, setError] = useState(null);

  const responseGoogle = (response) => {
    if (response.accessToken) {
      setIsLoggedIn(true);
      setFamilyName(response.profileObj.familyName);
      setGivenName(response.profileObj.givenName);
      setEmail(response.profileObj.email);
      setPicture(response.profileObj.imageUrl);
      sendDataToBackend(
        response.profileObj.familyName,
        response.profileObj.givenName,
        response.profileObj.email,
        response.profileObj.imageUrl
      );
    } else {
      setError("К сожалению войти не удалось");
      setTimeout(() => setError(null), 4000);
    }
  };

  const sendDataToBackend = async (familyName, givenName, email, picture) => {
    await HttpRequest.execute(
      `/oauth/google?email=${email}&name=${familyName}&second_name=${givenName}&avatar=${picture}`,
      "POST"
    )
      .then((data) => {
        if (data && data.token) {
          Cookies.set("currentUser", JSON.stringify(data), { expires: 1 });
          return data
        } else {
          props.setErrorFromBackend('К сожалению войти не удалось')
          setTimeout(() => props.setErrorFromBackend(null), 4000)
        }
      })
      .then(data => {
        Router.push('/')
        if (data) window.location.reload(true)
      })
      .catch((err) => console.error(err));
  };

  let googleContent;

  if (isLoggedIn) {
    googleContent = (
      <div style={styles.error}>
        <img src={picture} alt={givenName + " " + familyName} />
        <h2>
          Добро пожаловать, {givenName} {familyName}
        </h2>
        <p>Email: {email}</p>
      </div>
    );
  } else {
    googleContent = (
      <GoogleLogin
        clientId="55483991239-46omfdl4med6t1nbel7if57u605ae55i.apps.googleusercontent.com"
        render={(renderProps) => (
          <button
            className={`btn btn-danger`}
            onClick={() => {
              renderProps.onClick();
            }}
            disabled={renderProps.disabled}
          >
            Google
            <img src={GoogleIcon} alt={`google`} className={s.google_icon} />
          </button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        // onFailure={responseGoogle}
        // cookiePolicy={"single_host_origin"}
      />
    );
  }

  // SECRET CODE:  kxsqBSFnUFxkFwWWRcfO1BP_
  // CLIENT ID:  55483991239-46omfdl4med6t1nbel7if57u605ae55i.apps.googleusercontent.com

  return (
    <div className={`text-center`}>
      <div>Вход с помощью Google</div>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        googleContent
      )}
    </div>
  );
}
