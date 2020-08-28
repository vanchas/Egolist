import Cookies from 'js-cookie';
import Router from 'next/router';
import {showAlert, showSuccess} from '../redux/actions/appActions';
import store from '../redux/store';

let currentUserSubject = (Cookies.getJSON('currentUser')) ? Cookies.getJSON('currentUser') : {};

const target = `https://egolist.padilo.pro/api`;

export const authenticationService = {
  login,
  logout,
  registration,
  currentUser: currentUserSubject,
  get currentUserValue() { return currentUserSubject }
};

async function login(email: string, password: string): Promise<any> {
  const response = await fetch(`${target}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({ email, password })
  });
  const promise = response.json();
  if (response.status === 200) {
    promise.then(user => {
      Cookies.set('currentUser', JSON.stringify(user), { expires: 1 });
      currentUserSubject = user;
      return user;
    }).then(() => Router.push('/'))
      .then(() => window.location.reload(true))
      .catch(err => console.error('Error: ', err));
  } else {
    promise.then(res => {
      store.dispatch(showAlert(res.message));
    }).catch(err => console.error('Error: ', err));
  }
}

async function registration(name: string, email: string, phone: number, password: string, password_confirmation: string): Promise<any> {
  const response = await fetch(`${target}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      password,
      password_confirmation
    })
  });
      const promise = response.json();
      if (response.status === 201 || response.status === 200) {
        return promise.then(data => {
          store.dispatch(showSuccess(data.message));
          setTimeout(() => {
            window.location.reload(true)
          }, 3000);
        }).catch(err => console.error('Error: ', err));
      } else {
        return promise.then(data => {
          store.dispatch(showAlert(data.message));
          // setTimeout(() => Router.push(`/login`), 3000);
        }).catch(err => console.error('Error: ', err));
      }
}

async function logout(): Promise<any> {
  const user = authenticationService.currentUserValue;
  return await fetch(`${target}/logout`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      'Authorization': `${user.token_type} ${user.token}`
    }
  })
    .then(() => Router.push('/login'))
    .then(() => Cookies.remove('currentUser'))
    .then(() => window.location.reload(true))
    .catch(err => {
      Router.push('/login')
      console.error('Error: ', err)
    });
}
