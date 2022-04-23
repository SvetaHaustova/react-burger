import { AnyAction } from 'redux';
import { authInitialState, authReducer } from './auth-reducer';
import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    UPDATE_TOKEN_REQUEST,
    UPDATE_TOKEN_SUCCESS,
    UPDATE_TOKEN_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    USER_REQUEST,
    USER_SUCCESS,
    USER_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED
} from '../actions/auth';

describe('Проверка feed reducer', () => {
    const user = { name: "Test", email: "test@test.ru" };
    const userUpdate = { name: "TestUpdate", email: "test@test.ru" };
    
    it('Проверка initialState', () => {
        expect(authReducer(undefined, {} as AnyAction)).toEqual(authInitialState);
    });

    it('Проверка REGISTER_REQUEST', () => {
        expect(authReducer(authInitialState, {
            type: REGISTER_REQUEST,
        })).toEqual({
            ...authInitialState,
            registerRequest: true,
            registerFailed: false,
        });
    });

    it('Проверка REGISTER_SUCCESS', () => {
        expect(authReducer({
            ...authInitialState,
            user: { name: "", email: "" }
        }, {
            type: REGISTER_SUCCESS,
            user
        })).toEqual({
            ...authInitialState,
            user,
            registerRequest: false,
            loggedIn: true
        });
    });

    it('Проверка REGISTER_FAILED', () => {
        expect(authReducer(authInitialState, {
            type: REGISTER_FAILED,
        })).toEqual({
            ...authInitialState,
            registerFailed: true,
            registerRequest: false,
        });
    });

    it('Проверка LOGIN_REQUEST', () => {
        expect(authReducer(authInitialState, {
            type: LOGIN_REQUEST,
        })).toEqual({
            ...authInitialState,
            loginRequest: true,
            loginFailed: false,
        });
    });

    it('Проверка LOGIN_SUCCESS', () => {
        expect(authReducer({
            ...authInitialState,
            user: { name: "", email: "" }
        }, {
            type: LOGIN_SUCCESS,
            user
        })).toEqual({
            ...authInitialState,
            user,
            loginRequest: false,
            loggedIn: true
        });
    });

    it('Проверка LOGIN_FAILED', () => {
        expect(authReducer(authInitialState, {
            type: LOGIN_FAILED,
        })).toEqual({
            ...authInitialState,
            loginFailed: true,
            loginRequest: false,
        });
    });

    it('Проверка UPDATE_TOKEN_REQUEST', () => {
        expect(authReducer(authInitialState, {
            type: UPDATE_TOKEN_REQUEST,
        })).toEqual({
            ...authInitialState,
            updateTokenRequest: true,
            updateTokenFailed: false,
        });
    });

    it('Проверка UPDATE_TOKEN_SUCCESS', () => {
        expect(authReducer(authInitialState, {
            type: UPDATE_TOKEN_SUCCESS,
        })).toEqual({
            ...authInitialState,
            loggedIn: true,
            updateTokenRequest: false,
        });
    });

    it('Проверка UPDATE_TOKEN_FAILED', () => {
        expect(authReducer(authInitialState, {
            type: UPDATE_TOKEN_FAILED,
        })).toEqual({
            ...authInitialState,
            updateTokenFailed: true,
            updateTokenRequest: false,
        });
    });

    it('Проверка LOGOUT_REQUEST', () => {
        expect(authReducer(authInitialState, {
            type: LOGOUT_REQUEST,
        })).toEqual({
            ...authInitialState,
            logoutRequest: true,
            logoutFailed: false,
        });
    });

    it('Проверка LOGOUT_SUCCESS', () => {
        expect(authReducer({
            ...authInitialState,
            user
        }, {
            type: LOGOUT_SUCCESS,
        })).toEqual({
            ...authInitialState,
            loggedIn: false,
            user: { name: "", email: "" },
        });
    });

    it('Проверка LOGOUT_FAILED', () => {
        expect(authReducer(authInitialState, {
            type: LOGOUT_FAILED,
        })).toEqual({
            ...authInitialState,
            logoutFailed: true,
            logoutRequest: false,
        });
    });

    it('Проверка USER_REQUEST', () => {
        expect(authReducer(authInitialState, {
            type: USER_REQUEST,
        })).toEqual({
            ...authInitialState,
            userRequest: true,
            userFailed: false,
        });
    });

    it('Проверка USER_SUCCESS', () => {
        expect(authReducer({
            ...authInitialState,
            user: { name: "", email: "" }
        }, {
            type: USER_SUCCESS,
            user
        })).toEqual({
            ...authInitialState,
            user,
            loggedIn: true,
            userRequest: false,
        });
    });

    it('Проверка USER_FAILED', () => {
        expect(authReducer(authInitialState, {
            type: USER_FAILED,
        })).toEqual({
            ...authInitialState,
            userFailed: true,
            userRequest: false,
        });
    });

    it('Проверка UPDATE_USER_REQUEST', () => {
        expect(authReducer(authInitialState, {
            type: UPDATE_USER_REQUEST,
        })).toEqual({
            ...authInitialState,
            updateUserRequest: true,
            updateUserFailed: false,
        });
    });

    it('Проверка UPDATE_USER_SUCCESS', () => {
        expect(authReducer({
            ...authInitialState,
            user
        }, {
            type: UPDATE_USER_SUCCESS,
            user: userUpdate
        })).toEqual({
            ...authInitialState,
            user: userUpdate,
            updateUserRequest: false,
        });
    });

    it('Проверка UPDATE_USER_FAILED', () => {
        expect(authReducer(authInitialState, {
            type: UPDATE_USER_FAILED,
        })).toEqual({
            ...authInitialState,
            updateUserFailed: true,
            updateUserRequest: false,
        });
    });

    it('Проверка FORGOT_PASSWORD_REQUEST', () => {
        expect(authReducer(authInitialState, {
            type: FORGOT_PASSWORD_REQUEST,
        })).toEqual({
            ...authInitialState,
            forgotPasswordRequest: true,
            forgotPasswordFailed: false,
        });
    });

    it('Проверка FORGOT_PASSWORD_SUCCESS', () => {
        expect(authReducer(authInitialState, {
            type: FORGOT_PASSWORD_SUCCESS,
        })).toEqual({
            ...authInitialState,
            forgotPasswordRequest: false,
            forgotPasswordFailed: false,
        });
    });

    it('Проверка FORGOT_PASSWORD_FAILED', () => {
        expect(authReducer(authInitialState, {
            type: FORGOT_PASSWORD_FAILED,
        })).toEqual({
            ...authInitialState,
            forgotPasswordFailed: true,
            forgotPasswordRequest: false,
        });
    });

    it('Проверка RESET_PASSWORD_REQUEST', () => {
        expect(authReducer(authInitialState, {
            type: RESET_PASSWORD_REQUEST,
        })).toEqual({
            ...authInitialState,
            resetPasswordRequest: true,
            resetPasswordFailed: false,
        });
    });

    it('Проверка RESET_PASSWORD_SUCCESS', () => {
        expect(authReducer(authInitialState, {
            type: RESET_PASSWORD_SUCCESS,
        })).toEqual({
            ...authInitialState,
            resetPasswordRequest: false,
            resetPasswordFailed: false,
        });
    });

    it('Проверка RESET_PASSWORD_FAILED', () => {
        expect(authReducer(authInitialState, {
            type: RESET_PASSWORD_FAILED,
        })).toEqual({
            ...authInitialState,
            resetPasswordFailed: true,
            resetPasswordRequest: false,
        });
    });
});