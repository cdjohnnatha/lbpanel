import { updateObject } from '../../shared/utility';

import { AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_REDIRECT_PATH,
  AUTH_STOP_FAIL,
 } from '../actions/actionTypes';

const initialState = {
  user: null,
  expiry: null,
  token: null,
  error: null,
  loading: false,
  redirectPath: '/login'
}

const authStart = (state, action) => updateObject(state, { error: null, loading: true });

const authSuccess = (state, { token, user, expiry }) => {
  return updateObject(state, {
    token,
    user,
    expiry,
    error: null,
    loading: false,
    redirectPath: '/'
  });
}

const authFail = (state, { error }) => updateObject(state, { error, loading: false });

const authLogout = (state, action) => updateObject(state, initialState);

const setRedirectPath = (state, { redirectPath }) => updateObject(state, { redirectPath });


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return authStart(state, action);
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case AUTH_FAIL:
      return authFail(state, action);
    case AUTH_LOGOUT:
      return authLogout(state, action);
    case SET_REDIRECT_PATH:
      return setRedirectPath(state, action);
    default:
      return state;
  }
}

export default reducer;
