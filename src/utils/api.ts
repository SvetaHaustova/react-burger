import { API_URL } from './constants';
import { getCookie } from './utils';
import { TIngredientId } from './types';

function handleCheckResponse(res: Response) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка ${res.status}`);
    }
}

export const getIngredientsRequest = () => {
    return fetch(`${API_URL}/ingredients`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then((res) => handleCheckResponse(res));
}

export const postOrderRequest = (data: Array<TIngredientId>) => {
    return fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${getCookie('token')}`,
        },
        body: JSON.stringify({ ingredients: data }),
    })
    .then((res) => handleCheckResponse(res));
}

export const registerRequest = (email: string, password: string, name: string) => {
    return fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password, name }),
    })
    .then((res) => handleCheckResponse(res));
}

export const loginRequest = (email: string, password: string) => {
    return fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }),
    })
    .then((res) => handleCheckResponse(res));
}

export const updateTokenRequest = () => {
    return fetch(`${API_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    })
    .then((res) => handleCheckResponse(res));
}

export const logoutRequest = () => {
    return fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    })
    .then((res) => handleCheckResponse(res));
}

export const getUserRequest = () => {
    return fetch(`${API_URL}/auth/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${getCookie('token')}`,
        },
    })
    .then((res) => handleCheckResponse(res));
}

export const updateUserRequest = (email: string, name: string) => {
    return fetch(`${API_URL}/auth/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${getCookie('token')}`,
        },
        body: JSON.stringify({ email, name }),
    })
    .then((res) => handleCheckResponse(res));
}

export const forgotPasswordRequest = (email: string) => {
    return fetch(`${API_URL}/password-reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email }),
    })
    .then((res) => handleCheckResponse(res));
}

export const resetPasswordRequest = (password: string, token: string) => {
    return fetch(`${API_URL}/password-reset/reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password, token }),
    })
    .then((res) => handleCheckResponse(res));
}