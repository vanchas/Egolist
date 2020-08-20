import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { authenticationService } from "../../_services";
import MaskedInput from "react-text-mask";
import Eye from "../../assets/svg/eye.svg";
import EyeSlash from "../../assets/svg/eye-slash.svg";
import s from "./login.module.scss";
import Spinner from "../helpers/Spinner";

const phoneNumberMask = [
  // /[1-9]/,
  /\d/,
  /\d/,
  "(",
  /\d/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
];

export default function SignUp({ showAlert }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <h2 className={`text-white`}>Регистрация</h2>
      <Formik
        initialValues={{
          username: "",
          email: "",
          phone: "",
          password: "",
          password_confirmation: "",
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required("Обязательное поле"),
          password: Yup.string().required("Обязательное поле"),
          email: Yup.string().required("Обязательное поле"),
          phone: Yup.string().required("Обязательное поле"),
          password_confirmation: Yup.string().required("Обязательное поле"),
        })}
        onSubmit={(
          { username, email, phone, password, password_confirmation },
          { setStatus, setSubmitting }
        ) => {
          if (password !== password_confirmation) {
            showAlert(
              "Пароль и подтверждение пароля должны совпадать полностью"
            );
            setTimeout(() => {
              setSubmitting(false);
            }, 3000);
          } else {
            setStatus();
            authenticationService
              .registration(
                username,
                email,
                parseInt(phone.match(/\d/g).join("")),
                password,
                password_confirmation
              )
              .then(
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
          }
        }}
        render={({ errors, status, touched, isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="username">Имя*</label>
              <Field
                name="username"
                type="text"
                className={
                  "form-control" +
                  (errors.username && touched.username ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="username"
                component="div"
                className="invalid-feedback"
              />
            </div>
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
            <div className="form-group">
              <label htmlFor="phone">Телефон*</label>
              <Field
                name="phone"
                render={({ field }) => (
                  <MaskedInput
                    {...field}
                    mask={phoneNumberMask}
                    id="phone"
                    type="text"
                    className={
                      "form-control" +
                      (errors.phone && touched.phone ? " is-invalid" : "")
                    }
                  />
                )}
              />
              {/*<Field name="phone" type="number" className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')} />*/}
              <ErrorMessage
                name="phone"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className={`${s.form_group} form-group`}>
              <label htmlFor="password">Пароль*</label>
              <Field
                name="password"
                type={showPassword ? "text" : "password"}
                className={
                  "form-control" +
                  (errors.password && touched.password ? " is-invalid" : "")
                }
                style={{ backgroundImage: "none" }}
              />
              {showPassword ? (
                <span
                  className={s.input_eye}
                  onClick={() => setShowPassword(false)}
                >
                  <img src={Eye} alt={``} />
                </span>
              ) : (
                <span
                  className={s.input_eye}
                  onClick={() => setShowPassword(true)}
                >
                  <img src={EyeSlash} alt={``} />
                </span>
              )}
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className={`${s.form_group} form-group`}>
              <label htmlFor="password_confirmation">
                Подтверждение пароля*
              </label>
              <Field
                name="password_confirmation"
                type={showPassword ? "text" : "password"}
                className={
                  "form-control" +
                  (errors.password_confirmation && touched.password_confirmation
                    ? " is-invalid"
                    : "")
                }
                style={{ backgroundImage: "none" }}
              />
              {showPassword ? (
                <span
                  className={s.input_eye}
                  onClick={() => setShowPassword(false)}
                >
                  <img src={Eye} alt={``} />
                </span>
              ) : (
                <span
                  className={s.input_eye}
                  onClick={() => setShowPassword(true)}
                >
                  <img src={EyeSlash} alt={``} />
                </span>
              )}
              <ErrorMessage
                name="password_confirmation"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-secondary"
                disabled={isSubmitting}
              >
                Продолжить
              </button>
              {isSubmitting && (
                <div className="ml-3">
                  <Spinner color={`warning`} size={`sm`} />
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
