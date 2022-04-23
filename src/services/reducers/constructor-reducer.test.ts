import { AnyAction } from 'redux';
import { constructorReducer, constructorInitialState } from './constructor-reducer';
import {
    ADD_INGREDIENT_CONSTRUCTOR,
    REMOVE_INGREDIENT_CONSTRUCTOR,
    RESET_CONSTRUCTOR,
    MOVE_INGREDIENT_CONSTRUCTOR
} from '../actions/constructor';

describe('Проверка ingredient reducer', () => {
    const ingredients = [{
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
        uuid: "df0f9eb2-12a3-4868-852f-836a14fc4623",
    },
    {
        calories: 420,
        carbohydrates: 53,
        fat: 244,
        image: "https://code.s3.yandex.net/react/code/meat-02.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
        name: "Мясо бессмертных моллюсков Protostomia",
        price: 1337,
        proteins: 433,
        type: "main",
        __v: 0,
        _id: "60d3b41abdacab0026a733c9",
        uuid: "b1da744d-9a80-48a0-bba4-37a4ad1adadc",
      },
      {
        calories: 420,
        carbohydrates: 53,
        fat: 24,
        image: "https://code.s3.yandex.net/react/code/sauce-04.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
        name: "Соус фирменный Space Sauce",
        price: 80,
        proteins: 50,
        type: "sauce",
        __v: 0,
        _id: "60d3b41abdacab0026a733cd",
        uuid: "df0f9eb2-12a3-4868-852f-836a14fc4623",
      },
    ];
    
    it('Проверка initialState', () => {
        expect(constructorReducer(undefined, {} as AnyAction)).toEqual(constructorInitialState);
    });

    it('Проверка ADD_INGREDIENT_CONSTRUCTOR', () => {
        expect(constructorReducer({
            ...constructorInitialState,
            ingredientsConstructor: []
        }, {
            type: ADD_INGREDIENT_CONSTRUCTOR,
            item: ingredients[0]
        })).toEqual({
            ...constructorInitialState,
            ingredientsConstructor: [ingredients[0], ingredients[0]]
        });
    });

    it('Проверка REMOVE_INGREDIENT_CONSTRUCTOR', () => {
        expect(constructorReducer({
            ...constructorInitialState,
            ingredientsConstructor: [ingredients[0], ingredients[1]]
        }, {
            type: REMOVE_INGREDIENT_CONSTRUCTOR,
            uuid: ingredients[1].uuid
        })).toEqual({
            ...constructorInitialState,
            ingredientsConstructor: [ingredients[0]]
        });
    });

    it('Проверка MOVE_INGREDIENT_CONSTRUCTOR', () => {
        expect(constructorReducer({
            ...constructorInitialState,
            ingredientsConstructor: [ingredients[1], ingredients[2]]
        }, {
            type: MOVE_INGREDIENT_CONSTRUCTOR,
            dragIndex: 1,
            hoverIndex: 0
        })).toEqual({
            ...constructorInitialState,
            ingredientsConstructor: [ingredients[2], ingredients[1]]
        });
    });

    it('Проверка RESET_CONSTRUCTOR', () => {
        expect(constructorReducer({
            ...constructorInitialState,
            ingredientsConstructor: ingredients
        }, {
            type: RESET_CONSTRUCTOR,
        })).toEqual({
            ...constructorInitialState,
            ingredientsConstructor: []
        });
    });
});