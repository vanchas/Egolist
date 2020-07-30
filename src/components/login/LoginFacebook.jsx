import React from "react";
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import FacebookIcon from '../../assets/svg/facebook.svg'
import s from './login.module.scss'

export default function () {
  const responseFacebook = (response) => {
    console.log(response);
  };

  return (
    <div>
      <div>Вход с помощью Facebook</div>
      <FacebookLogin
        appId="3147466608676750"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="my-facebook-button-class"
        icon="fa-facebook"
        render={(renderProps) => (
          <button
            onClick={() => {
              /* isDisabled: false
               * isProcessing: false
               * isSdkLoaded: true */
              renderProps.onClick();
            }}
            className={`btn btn-primary`}
          >
            Facebook
              <img src={FacebookIcon} alt={`facebook`} className={s.facebook_icon} />
          </button>
        )}
      />
    </div>
  );
}
