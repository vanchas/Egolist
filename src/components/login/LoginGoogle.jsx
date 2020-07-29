import React from "react";
import s from './login.module.scss'
import { GoogleLogin } from "react-google-login";
import GoogleIcon from '../../assets/svg/google.svg'

export default function () {
  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div>
      <div>Вход с помощью Google</div>
      <GoogleLogin
        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        render={(renderProps) => (
          <button
            className={`btn btn-danger`}
            onClick={() => {
                renderProps.onClick()
            }}
            disabled={renderProps.disabled}
          >
            Google
              <img src={GoogleIcon} alt={`google`} className={s.google_icon} />
          </button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}
