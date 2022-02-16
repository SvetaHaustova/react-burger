import { getIngredientsRequest, postOrderRequest } from '../../utils/api';

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const OPEN_INGREDIENT = "OPEN_INGREDIENT";
export const CLOSE_INGREDIENT = "CLOSE_INGREDIENT";

export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED = "POST_ORDER_FAILED";
export const CLOSE_ORDER = "CLOSE_ORDER";

export const ADD_INGREDIENT_CONSTRUCTOR = "ADD_INGREDIENT_CONSTRUCTOR";
export const REMOVE_INGREDIENT_CONSTRUCTOR = "REMOVE_INGREDIENT_CONSTRUCTOR";

export function getIngredients() {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        getIngredientsRequest()
        .then((res) => {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                ingredients: res.data
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
        });
    }
}

export function postOrder(data) {
    return function(dispatch) {
        dispatch({
            type: POST_ORDER_REQUEST
        });
        postOrderRequest(data)
        .then((res) => {
            dispatch({
                type: POST_ORDER_SUCCESS,
                orderNumber: res.order.number
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: POST_ORDER_FAILED
            })
        });
    }
}

export function openIngredient(currentIngredient) {
    return {
        type: OPEN_INGREDIENT,
        currentIngredient
    };
}

export function closeIngredient() {
    return {
        type: CLOSE_INGREDIENT
    };
}

export function closeOrder() {
    return {
        type: CLOSE_ORDER
    };
}

export function addIngredient(item) {
    return {
        type: ADD_INGREDIENT_CONSTRUCTOR,
        item
    };
}

export function removeIngredient(uuid) {
    return {
        type: REMOVE_INGREDIENT_CONSTRUCTOR,
        uuid
    };
}