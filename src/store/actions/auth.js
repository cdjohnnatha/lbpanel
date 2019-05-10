import { AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_STOP_FAIL,
  SET_REDIRECT_PATH
} from '../actions/actionTypes';

import axios from 'axios';
const https = require('https');
const baseUrl = process.env.REACT_APP_BACKEND_ADDRESS || 'http://localhost:3001';

export const authStart = () => ({ type: AUTH_START });

export const authSuccess = ({ user, token, expiry }) => ({ type: AUTH_SUCCESS, user, token, expiry });

export const authFail = (error) => ({ type: AUTH_FAIL, error });

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('expiry');
  return { type: AUTH_LOGOUT }
}

export const setRedirectPath = (redirectPath) => ({ type: SET_REDIRECT_PATH, redirectPath });

export const checkAuthTimeout = expirationTime =>  dispatch => {
  setTimeout(() => { dispatch(logout())}, expirationTime);
}


export const auth = (email, password) => {
  return async dispatch => {
    dispatch(authStart());

    const authData = { email, password };
    const url = `${baseUrl}/api/signin`;
    const agent = new https.Agent({ rejectUnauthorized: false });
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    axios.defaults.httpAgent = agent;
    try {
      const response = await axios.post(url, authData);
      const { data: { jwt, user, expiry } } = response; 
      localStorage.setItem('token', jwt);
      localStorage.setItem('user', user);
      localStorage.setItem('expiry', expiry);
      dispatch(authSuccess({ jwt, user, expiry }));
      dispatch(setRedirectPath('/'));
    } catch(error) {
      dispatch(authFail(error.response.data.error));
    }
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        const expiry = localStorage.getItem('expiry');
        dispatch(authSuccess({ user, token, expiry }));
    }
  };
};
