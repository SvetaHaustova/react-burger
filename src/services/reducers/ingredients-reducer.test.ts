import { AnyAction } from 'redux';
import { ingredientsReducer, ingredientsInitialState } from './ingredients-reducer';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    OPEN_INGREDIENT,
    CLOSE_INGREDIENT
} from '../actions/ingredients';

describe('Проверка ingredient reducer', () => {
    const ingredient = {
        calories: 420,
        carbohydrates: 53,
        fat: 24,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        name: "Краторная булка N-200i",
        price: 1255,
        proteins: 80,
        type: "bun",
        __v: 0,
        _id: "60d3b41abdacab0026a733c6",
    };
    
    it('Проверка initialState', () => {
        expect(ingredientsReducer(undefined, {} as AnyAction)).toEqual(ingredientsInitialState);
    });

    it('Проверка GET_INGREDIENTS_REQUEST', () => {
        expect(ingredientsReducer(ingredientsInitialState, {
            type: GET_INGREDIENTS_REQUEST,
        })).toEqual({
            ...ingredientsInitialState,
            ingredientsRequest: true,
            ingredientsFailed: false,
        });
    });

    it('Проверка GET_INGREDIENTS_SUCCESS', () => {
        const ingredients = [ingredient];
        
        expect(ingredientsReducer(ingredientsInitialState, {
            type: GET_INGREDIENTS_SUCCESS,
            ingredients
        })).toEqual({
            ...ingredientsInitialState,
            ingredients: [ingredient],
            ingredientsRequest: false
        });
    });

    it('Проверка GET_INGREDIENTS_FAILED', () => {
        expect(ingredientsReducer(ingredientsInitialState, {
            type: GET_INGREDIENTS_FAILED,
        })).toEqual({
            ...ingredientsInitialState,
            ingredientsRequest: false,
            ingredientsFailed: true,
        });
    });

    it('Проверка OPEN_INGREDIENT', () => {
        expect(ingredientsReducer(ingredientsInitialState, {
            type: OPEN_INGREDIENT,
            currentIngredient: ingredient,
        })).toEqual({
            ...ingredientsInitialState,
            currentIngredient: ingredient
        });
    });

    it('Проверка CLOSE_INGREDIENT', () => {
        expect(ingredientsReducer(ingredientsInitialState, {
            type: CLOSE_INGREDIENT,
        })).toEqual({
            ...ingredientsInitialState,
            currentIngredient: null
        });
    });
});