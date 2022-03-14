import { API_URL } from './constants';
import { getCookie } from './utils';

function handleCheckResponse(res) {
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

export const postOrderRequest = (data) => {
    return fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ingredients: data }),
    })
    .then((res) => handleCheckResponse(res));
}

export const registerRequest = (email, password, name) => {
    return fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password, name }),
    })
    .then((res) => handleCheckResponse(res));
}

export const loginRequest = (email, password) => {
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
            Authorization: getCookie('token'),
        },
    })
    .then((res) => handleCheckResponse(res));
}

export const updateUserRequest = (email, name) => {
    return fetch(`${API_URL}/auth/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: getCookie('token'),
        },
        body: JSON.stringify({ email, name }),
    })
    .then((res) => handleCheckResponse(res));
}

export const forgotPasswordRequest = (email) => {
    return fetch(`${API_URL}/password-reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email }),
    })
    .then((res) => handleCheckResponse(res));
}

export const resetPasswordRequest = (password, token) => {
    return fetch(`${API_URL}/password-reset/reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password, token }),
    })
    .then((res) => handleCheckResponse(res));
}