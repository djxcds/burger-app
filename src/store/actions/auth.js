import { AUTH_FAIL, AUTH_SUCCESS, AUTH_START, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH } from './actionTypes';
import {
  authSignUpInstance as axiosSignUp,
  authSignInInstance as axiosSignIn,
} from '../../axios/auth';

const authStart = () => {
    return {
        type: AUTH_START
    };
};

const authSuccess = (authData) => {
    const { token, userId } = authData
    return {
        type: AUTH_SUCCESS,
        token,
        userId
    };
};

const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error
    };
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: AUTH_LOGOUT,
    };
};

const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, +expirationTime * 1000)
    };
};

const auth = (email, password, isSignup) => {
    return async (dispatch) => {
        try {
          dispatch(authStart());
          const authData = {
            email,
            password,
            returnSecureToken: true
          };

          let fetchMethod = isSignup ? 
          axiosSignUp.post('', authData) : 
          axiosSignIn.post('', authData);
          const response = await fetchMethod;
          const { idToken: token, expiresIn, localId: userId } = response.data;
          const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

          localStorage.setItem('token', token);
          localStorage.setItem('expirationDate', expirationDate);
          localStorage.setItem('userId', userId);

          dispatch(authSuccess({ token, userId }));
          dispatch(checkAuthTimeout(expiresIn));
        } catch (error) {
            dispatch(authFail(error.response.data.error));
        }
    }
}

const setAuthRedirectPath = path => {
    return {
        type: SET_AUTH_REDIRECT_PATH,
        path
    };
};

const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const userId = localStorage.getItem('userId');
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate < new Date()) {
                return dispatch(logout());
            } 
            dispatch(authSuccess({ token, userId }));
            const expirationSeconds =
              (expirationDate.getTime() - new Date().getTime()) / 1000;
            dispatch(checkAuthTimeout(Math.round(expirationSeconds)));
        }
    }
}

export {
  authFail,
  authStart,
  authSuccess,
  auth,
  checkAuthTimeout,
  logout,
  setAuthRedirectPath,
  authCheckState,
};