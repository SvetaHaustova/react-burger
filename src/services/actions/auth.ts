import { setCookie, deleteCookie } from '../../utils/utils';
import { TUser } from '../../utils/types';
import { AppDispatch, AppThunk } from '../types';
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


export const REGISTER_REQUEST: "REGISTER_REQUEST" = "REGISTER_REQUEST";
export const REGISTER_SUCCESS: "REGISTER_SUCCESS" = "REGISTER_SUCCESS";
export const REGISTER_FAILED: "REGISTER_FAILED" = "REGISTER_FAILED";

export const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_FAILED: "LOGIN_FAILED" = "LOGIN_FAILED";

export const UPDATE_TOKEN_REQUEST: "UPDATE_TOKEN_REQUEST" = "UPDATE_TOKEN_REQUEST";
export const UPDATE_TOKEN_SUCCESS: "UPDATE_TOKEN_SUCCESS" = "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_FAILED: "UPDATE_TOKEN_FAILED" = "UPDATE_TOKEN_FAILED";

export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED: "LOGOUT_FAILED" = "LOGOUT_FAILED";

export const USER_REQUEST: "USER_REQUEST" = "USER_REQUEST";
export const USER_SUCCESS: "USER_SUCCESS" = "USER_SUCCESS";
export const USER_FAILED: "USER_FAILED" = "USER_FAILED";

export const UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST" = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS" = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED: "UPDATE_USER_FAILED" = "UPDATE_USER_FAILED";

export const FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST" = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS" = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED: "FORGOT_PASSWORD_FAILED" = "FORGOT_PASSWORD_FAILED";

export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED: "RESET_PASSWORD_FAILED" = "RESET_PASSWORD_FAILED";


export interface IRegisterRequestAction {
    readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccessAction {
    readonly type: typeof REGISTER_SUCCESS;
    readonly user: TUser;
}

export interface IRegisterFailedAction {
    readonly type: typeof REGISTER_FAILED;
}

export interface ILoginRequestAction {
    readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
    readonly type: typeof LOGIN_SUCCESS;
    readonly user: TUser;
}

export interface ILoginFailedAction {
    readonly type: typeof LOGIN_FAILED;
}

export interface IUpdateTokenRequestAction {
    readonly type: typeof UPDATE_TOKEN_REQUEST;
}

export interface IUpdateTokenSuccessAction {
    readonly type: typeof UPDATE_TOKEN_SUCCESS;
}

export interface IUpdateTokenFailedAction {
    readonly type: typeof UPDATE_TOKEN_FAILED;
}

export interface ILogoutRequestAction {
    readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailedAction {
    readonly type: typeof LOGOUT_FAILED;
}

export interface IUserRequestAction {
    readonly type: typeof USER_REQUEST;
}

export interface IUserSuccessAction {
    readonly type: typeof USER_SUCCESS;
    readonly user: TUser;
}

export interface IUserFailedAction {
    readonly type: typeof USER_FAILED;
}

export interface IUpdateUserRequestAction {
    readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccessAction {
    readonly type: typeof UPDATE_USER_SUCCESS;
    readonly user: TUser;
}

export interface IUpdateUserFailedAction {
    readonly type: typeof UPDATE_USER_FAILED;
}

export interface IForgotPasswordRequestAction {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordSuccessAction {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordFailedAction {
    readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export interface IResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
}


export type TAuthActions = 
    | IRegisterRequestAction
    | IRegisterSuccessAction
    | IRegisterFailedAction
    | ILoginRequestAction
    | ILoginSuccessAction
    | ILoginFailedAction
    | IUpdateTokenRequestAction
    | IUpdateTokenSuccessAction
    | IUpdateTokenFailedAction
    | ILogoutRequestAction
    | ILogoutSuccessAction
    | ILogoutFailedAction
    | IUserRequestAction
    | IUserSuccessAction
    | IUserFailedAction
    | IUpdateUserRequestAction
    | IUpdateUserSuccessAction
    | IUpdateUserFailedAction
    | IForgotPasswordRequestAction
    | IForgotPasswordSuccessAction
    | IForgotPasswordFailedAction
    | IResetPasswordRequestAction
    | IResetPasswordSuccessAction
    | IResetPasswordFailedAction;


const registerRequestAction = (): IRegisterRequestAction => ({ type: REGISTER_REQUEST });
const registerSuccessAction = (user: TUser): IRegisterSuccessAction => ({ type: REGISTER_SUCCESS, user });
const registerFailedAction = (): IRegisterFailedAction => ({ type: REGISTER_FAILED });

const loginRequestAction = (): ILoginRequestAction => ({ type: LOGIN_REQUEST });
const loginSuccessAction = (user: TUser): ILoginSuccessAction => ({ type: LOGIN_SUCCESS, user });
const loginFailedAction = (): ILoginFailedAction => ({ type: LOGIN_FAILED });

const updateTokenRequestAction = (): IUpdateTokenRequestAction => ({ type: UPDATE_TOKEN_REQUEST });
const updateTokenSuccessAction = (): IUpdateTokenSuccessAction => ({ type: UPDATE_TOKEN_SUCCESS });
const updateTokenFailedAction = (): IUpdateTokenFailedAction => ({ type: UPDATE_TOKEN_FAILED });

const logoutRequestAction = (): ILogoutRequestAction => ({ type: LOGOUT_REQUEST });
const logoutSuccessAction = (): ILogoutSuccessAction => ({ type: LOGOUT_SUCCESS });
const logoutFailedAction = (): ILogoutFailedAction => ({ type: LOGOUT_FAILED });

const userRequestAction = (): IUserRequestAction => ({ type: USER_REQUEST });
const userSuccessAction = (user: TUser): IUserSuccessAction => ({ type: USER_SUCCESS, user });
const userFailedAction = (): IUserFailedAction => ({ type: USER_FAILED });

const updateUserRequestAction = (): IUpdateUserRequestAction => ({ type: UPDATE_USER_REQUEST });
const updateUserSuccessAction = (user: TUser): IUpdateUserSuccessAction => ({ type: UPDATE_USER_SUCCESS, user });
const updateUserFailedAction = (): IUpdateUserFailedAction => ({ type: UPDATE_USER_FAILED });

const forgotPasswordRequestAction = (): IForgotPasswordRequestAction => ({ type: FORGOT_PASSWORD_REQUEST });
const forgotPasswordSuccessAction = (): IForgotPasswordSuccessAction => ({ type: FORGOT_PASSWORD_SUCCESS });
const forgotPasswordFailedAction = (): IForgotPasswordFailedAction => ({ type: FORGOT_PASSWORD_FAILED });

const resetPasswordRequestAction = (): IResetPasswordRequestAction => ({ type: RESET_PASSWORD_REQUEST });
const resetPasswordSuccessAction = (): IResetPasswordSuccessAction => ({ type: RESET_PASSWORD_SUCCESS });
const resetPasswordFailedAction = (): IResetPasswordFailedAction => ({ type: RESET_PASSWORD_FAILED });


export const register: AppThunk = (email: string, password: string, name: string) => (dispatch: AppDispatch) => {
    dispatch(registerRequestAction());
    registerRequest(email, password, name)
    .then((res) => {
        if (res.success) {
            setCookie('token', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            dispatch(registerSuccessAction(res.user));
        }
    })
    .catch((err) => {
        console.log(err);
        dispatch(registerFailedAction());
    });
};

export const login: AppThunk = (email: string, password: string) => (dispatch: AppDispatch) => {
    dispatch(loginRequestAction());
    loginRequest(email, password)
    .then((res) => {
        if (res.success) {
            setCookie('token', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            dispatch(loginSuccessAction(res.user));
        }
    })
    .catch((err) => {
        console.log(err);
        dispatch(loginFailedAction());
    });
};

export const updateToken: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(updateTokenRequestAction());
    updateTokenRequest()
    .then((res) => {
        if (res.success) {
            setCookie('token', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            dispatch(updateTokenSuccessAction());
        }
    })
    .catch((err) => {
        console.log(err);
        dispatch(updateTokenFailedAction());
    });
};

export const logout: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(logoutRequestAction());
    logoutRequest()
    .then((res) => {
        if (res.success) {
            localStorage.removeItem('refreshToken');
            deleteCookie('token');
            dispatch(logoutSuccessAction());
        }
    })
    .catch((err) => {
        console.log(err);
        dispatch(logoutFailedAction());
    });
};

export const getUser: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(userRequestAction());
    getUserRequest()
    .then((res) => {
        if (res.success) {
            dispatch(userSuccessAction(res.user));
        }
    })
    .catch((err) => {
        console.log(err);
        if (localStorage.getItem('refreshToken')) {
            updateTokenRequest();;
            getUserRequest();
        } else {
            dispatch(userFailedAction());
        }
    });
};

export const updateUser: AppThunk = (email: string, name: string) => (dispatch: AppDispatch) => {
    dispatch(updateUserRequestAction());
    updateUserRequest(email, name)
    .then((res) => {
        if (res.success) {
            dispatch(updateUserSuccessAction(res.user));
        }
    })
    .catch((err) => {
        console.log(err);
        if (localStorage.getItem('refreshToken')) {
            updateTokenRequest();
            updateUserRequest(email, name);
        } else {
            dispatch(updateUserFailedAction());
        }
    });
};

export const forgotPassword: AppThunk = (email: string) => (dispatch: AppDispatch) => {
    dispatch(forgotPasswordRequestAction());
    forgotPasswordRequest(email)
    .then((res) => {
        if (res.success) {
            dispatch(forgotPasswordSuccessAction());
        }
    })
    .catch((err) => {
        console.log(err);
        dispatch(forgotPasswordFailedAction());
    });
};

export const resetPassword: AppThunk = (password: string, token: string) => (dispatch: AppDispatch) => {
    dispatch(resetPasswordRequestAction());
    resetPasswordRequest(password, token)
    .then((res) => {
        if (res.success) {
            dispatch(resetPasswordSuccessAction());
        }
    })
    .catch((err) => {
        console.log(err);
        dispatch(resetPasswordFailedAction());
    });
};