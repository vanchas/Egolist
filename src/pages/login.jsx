import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SignIn from "../components/login/SignIn";
import SignUp from "../components/login/SignUp";
import $ from "jquery";
import s from "../components/login/login.module.scss";
import { authenticationService } from "../_services";
import { connect } from "react-redux";
import { showAlert } from "../redux/actions/appActions";
import LoginFacebook from "../components/login/LoginFacebook";
import LoginGoogle from "../components/login/LoginGoogle";

const Login = (props) => {
  const router = useRouter();
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [errorFromBackend, setErrorFromBackend] = useState(null);

  useEffect(() => {
    $(".sign-up").hide();
    if (authenticationService.currentUserValue.role) {
      router.push("/");
    }
  }, []);

  const loginRegistrationToggle = () => {
    setShowLoginForm(!showLoginForm);
    $(".sign-in").slideToggle();
    $(".sign-up").slideToggle();
  };

  return (
    <div className={`d-flex flex-column ${s.login_page}`}>
      <div className="container py-3">
        <a
          onClick={loginRegistrationToggle}
          className="text-white btn btn-secondary float-right"
        >
          {showLoginForm ? "Регистрация" : "Вход"}
        </a>
      </div>

      <div className="container py-3 mx-auto">
        <div className="sign-in">
          <SignIn />
        </div>
        <div className="sign-up">
          <SignUp showAlert={props.showAlert} />
        </div>
      </div>
      {errorFromBackend && (
        <div className="alert alert-danger" role="alert">
          {errorFromBackend}
        </div>
      )}
      <div className={s.login_with_google_facebook_block}>
        <LoginFacebook setErrorFromBackend={setErrorFromBackend} />
        <LoginGoogle setErrorFromBackend={setErrorFromBackend} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  showAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
