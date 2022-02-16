import { combineReducers } from 'redux';
import {
    GET_INGREDIENTS_SUCCESS,
    OPEN_INGREDIENT,
    CLOSE_INGREDIENT,
    POST_ORDER_SUCCESS,
    CLOSE_ORDER,
    ADD_INGREDIENT_CONSTRUCTOR,
    REMOVE_INGREDIENT_CONSTRUCTOR
} from '../actions/index';

const ingredientsInitialState = {
    ingredients: [],
    currentIngredient: null
};

const orderInitialState = {
    orderNumber: null
};

const constructorInitialState = {
    ingredientsConstructor: []
};

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_SUCCESS: {
            return {...state, ingredients: action.ingredients};
        }
        case OPEN_INGREDIENT: {
            return {...state, currentIngredient: action.currentIngredient};
        }
        case CLOSE_ORDER: {
            return {...state, currentIngredient: null};
        }
        default: {
            return state;
        }
    }
};

export const orderReducer = (state = orderInitialState, action) => {
    switch (action.type) {
        case POST_ORDER_SUCCESS: {
            return {...state, orderNumber: action.orderNumber};
        }
        case CLOSE_INGREDIENT: {
            return {...state, orderNumber: null};
        }
        default: {
            return state;
        }
    }
};

export const constructorReducer = (state = constructorInitialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT_CONSTRUCTOR: {
            return {...state, ingredientsConstructor: [...state.ingredientsConstructor, action.item]};
        }
        case REMOVE_INGREDIENT_CONSTRUCTOR: {
            return {...state, ingredientsConstructor: [...state.ingredientsConstructor.filter((ingredient) => ingredient.uuid !== action.uuid)]};
        }
        default: {
            return state;
        }
    }
};

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    constructor: constructorReducer
});