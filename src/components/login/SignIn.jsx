import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { authenticationService } from "../../_services";
import Eye from "../../assets/svg/eye.svg";
import EyeSlash from "../../assets/svg/eye-slash.svg";
import s from './login.module.scss'

export default function SignIn(props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="alert alert-info" role="alert">
        admin : admin@admin, admin <br />
        user с проверенным телефоном и имейлом: client@client.com, client <br />
        user с проверенным телефоном и имейлом, верифицирован: client@client.verify, client

      </div>
      <h2>Логин</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().required("Обязательное поле"),
          password: Yup.string().required("Обязательное поле"),
        })}
        onSubmit={({ email, password }, { setStatus, setSubmitting }) => {
          setStatus();
          authenticationService.login(email, password).then(
            (user) => {
              setTimeout(() => {
                setSubmitting(false);
              }, 3000);
            },
            (error) => {
              setSubmitting(false);
              setStatus(error);
            }
          );
        }}
        render={({ errors, status, touched, isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="email">Емейл*</label>
              <Field
                name="email"
                type="email"
                className={
                  "form-control" +
                  (errors.email && touched.email ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className={`form-group ${s.form_group}`}>
              <label htmlFor="password">Пароль*</label>
              <Field
                name="password"
                type={showPassword ? "text" : "password"}
                className={
                  "form-control" +
                  (errors.password && touched.password ? " is-invalid" : "")
                }
                style={{backgroundImage: 'none'}}
              />
              {showPassword ? (
                <span className={s.input_eye}
                    onClick={() => setShowPassword(false)}>
                  <img src={Eye} alt={``} />
                </span>
              ) : (
                <span className={s.input_eye}
                      onClick={() => setShowPassword(true)}>
                  <img src={EyeSlash} alt={``} />
                </span>
              )}
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Войти
              </button>
              {isSubmitting && (
                <div
                  className="spinner-border spinner-border-sm text-primary ml-3"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </div>
            {status && <div className={"alert alert-danger"}>{status}</div>}
          </Form>
        )}
      />
    </div>
  );
}
