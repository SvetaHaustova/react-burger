import { API_URL } from './constants';

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