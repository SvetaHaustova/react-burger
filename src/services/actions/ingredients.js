import { getIngredientsRequest } from '../../utils/api';

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const OPEN_INGREDIENT = "OPEN_INGREDIENT";
export const CLOSE_INGREDIENT = "CLOSE_INGREDIENT";

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