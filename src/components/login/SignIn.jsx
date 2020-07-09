import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { authenticationService } from '../../_services';
import Alert from '../helpers/Alert'

export default function SignIn({ alert }) {
  return (
    <div>
      <div className="alert alert-info" role="alert">
        {/* User: Login - admin1@admin1, password - user <br /> */}
        Admin: Login - admin@admin, password - admin
      </div>
      <h2>Login</h2>
      {alert && <Alert />}
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().required('Email is required'),
          password: Yup.string().required('Password is required')
        })}
        onSubmit={({ email, password }, { setStatus, setSubmitting }) => {
          setStatus();
          authenticationService.login(email, password)
            .then(
              user => {
                setTimeout(() => {
                  setSubmitting(false);
                }, 3000);
              },
              error => {
                setSubmitting(false);
                setStatus(error);
              }
            );
        }}
        render={({ errors, status, touched, isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
              <ErrorMessage name="email" component="div" className="invalid-feedback" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
              <ErrorMessage name="password" component="div" className="invalid-feedback" />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
              {isSubmitting &&
                <div className="spinner-border spinner-border-sm text-primary ml-3" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              }
            </div>
            {status &&
              <div className={'alert alert-danger'}>{status}</div>
            }
          </Form>
        )}
      />
    </div>
  )
}
