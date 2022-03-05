import { setCookie, deleteCookie } from '../../utils/utils';
import {
    registerRequest,
    loginRequest,
    updateTokenRequest,
    logoutRequest,
    getUserRequest,
    updateUserRequest,
    forgotPasswordRequest,
    resetPasswordRequest
} from '../../utils/api';

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const LOGIN_REQUEST = "REGISTER_REQUEST";
export const LOGIN_SUCCESS = "REGISTER_SUCCESS";
export const LOGIN_FAILED = "REGISTER_FAILED";

export const UPDATE_TOKEN_REQUEST = "UPDATE_TOKEN_REQUEST";
export const UPDATE_TOKEN_SUCCESS = "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_FAILED = "UPDATE_TOKEN_FAILED";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_FAILED = "USER_FAILED";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export function register(email, password, name) {
    return function(dispatch) {
        dispatch({
            type: REGISTER_REQUEST
        });
        registerRequest(email, password, name)
        .then((res) => {
            if (res.success) {
                setCookie('token', res.accessToken);
                localStorage.setItem('refreshToken', res.refreshToken);
                dispatch({
                    type: REGISTER_SUCCESS,
                    user: res.user
                });
            }
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: REGISTER_FAILED
            })
        });
    }
}

export function login(email, password) {
    return function(dispatch) {
        dispatch({
            type: LOGIN_REQUEST
        });
        loginRequest(email, password)
        .then((res) => {
            if (res.success) {
                setCookie('token', res.accessToken);
                localStorage.setItem('refreshToken', res.refreshToken);
                dispatch({
                    type: LOGIN_SUCCESS,
                    user: res.user
                });
            }
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: LOGIN_FAILED
            })
        });
    }
}

export function updateToken() {
    return function(dispatch) {
        dispatch({
            type: UPDATE_TOKEN_REQUEST
        });
        updateTokenRequest()
        .then((res) => {
            if (res.success) {
                setCookie('token', res.accessToken);
                localStorage.setItem('refreshToken', res.refreshToken);
                dispatch({
                    type: UPDATE_TOKEN_SUCCESS
                });
            }
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: UPDATE_TOKEN_FAILED
            })
        });
    }
}

export function logout() {
    return function(dispatch) {
        dispatch({
            type: LOGOUT_REQUEST
        });
        logoutRequest()
        .then((res) => {
            if (res.success) {
                localStorage.removeItem('refreshToken');
                deleteCookie('token');
                dispatch({
                    type: LOGOUT_SUCCESS
                });
            }
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: LOGOUT_FAILED
            })
        });
    }
}

export function getUser() {
    return function(dispatch) {
        dispatch({
            type: USER_REQUEST
        });
        getUserRequest()
        .then((res) => {
            if (res.success) {
                dispatch({
                    type: USER_SUCCESS,
                    user: res.user
                });
            }
        })
        .catch((err) => {
            console.log(err);
            if (localStorage.getItem('refreshToken')) {
                dispatch(updateToken());
                dispatch(getUser());
            } else {
                dispatch({
                    type: USER_FAILED
                })
            }
        });
    }
}

export function updateUser(email, name) {
    return function(dispatch) {
        dispatch({
            type: UPDATE_USER_REQUEST
        });
        updateUserRequest(email, name)
        .then((res) => {
            if (res.success) {
                dispatch({
                    type: UPDATE_USER_SUCCESS,
                    user: res.user
                });
            }
        })
        .catch((err) => {
            console.log(err);
            if (localStorage.getItem('refreshToken')) {
                dispatch(updateToken());
                dispatch(updateUser(email, name));
            } else {
                dispatch({
                    type: UPDATE_USER_FAILED
                })
            }
        });
    }
}

export function forgotPassword(email) {
    return function(dispatch) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        });
        forgotPasswordRequest(email)
        .then((res) => {
            if (res.success) {
                dispatch({
                    type: FORGOT_PASSWORD_SUCCESS
                });
            }
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: FORGOT_PASSWORD_FAILED
            })
        });
    }
}

export function resetPassword(password, token) {
    return function(dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        });
        resetPasswordRequest(password, token)
        .then((res) => {
            if (res.success) {
                dispatch({
                    type: RESET_PASSWORD_SUCCESS
                });
            }
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: RESET_PASSWORD_FAILED
            })
        });
    }
}