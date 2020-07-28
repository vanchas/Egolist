import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import SignIn from '../components/login/SignIn';
import SignUp from '../components/login/SignUp';
import $ from 'jquery';
import s from '../components/login/login.module.scss';
import { authenticationService } from '../_services';
import { connect } from 'react-redux';
import { showAlert } from '../redux/actions/appActions'

const Login = props => {
  const router = useRouter();

  useEffect(() => {
    $('.sign-up').hide();
    if (authenticationService.currentUserValue.role) {
      router.push('/');
    }
  }, [])

  return (
    <div className={`d-flex flex-column ${s.login_page}`}>
      <div className="container py-3">
        <a onClick={() => {
          $('.sign-in').slideToggle();
          $('.sign-up').slideToggle();
        }} className="text-white btn btn-secondary float-right" >
          Войти / Зарегистрироваться
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
    </div>
  )
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  showAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
