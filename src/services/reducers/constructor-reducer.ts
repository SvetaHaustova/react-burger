import { TIngredient } from '../../utils/types';
import {
    TConstructorActions,
    ADD_INGREDIENT_CONSTRUCTOR,
    REMOVE_INGREDIENT_CONSTRUCTOR,
    RESET_CONSTRUCTOR,
    MOVE_INGREDIENT_CONSTRUCTOR
} from '../actions/constructor';

export type TConstructorState = {
    ingredientsConstructor: Array<TIngredient>;
};

export const constructorInitialState: TConstructorState = {
    ingredientsConstructor: []
};

export const constructorReducer = (state = constructorInitialState, action: TConstructorActions): TConstructorState => {
    switch (action.type) {
        case ADD_INGREDIENT_CONSTRUCTOR: {
            return {
                ...state,
                ingredientsConstructor:
                    state.ingredientsConstructor
                    ? action.item.type === "bun" 
                        ? [...state.ingredientsConstructor, action.item, action.item]
                        : [...state.ingredientsConstructor, action.item]
                    : action.item.type === "bun"
                        ? [action.item, action.item]
                        : [action.item]
            };
        }
        case REMOVE_INGREDIENT_CONSTRUCTOR: {
            return {
                ...state,
                ingredientsConstructor: [...state.ingredientsConstructor.filter((ingredient: TIngredient) => ingredient.uuid !== action.uuid)]
            };
        }
        case RESET_CONSTRUCTOR: {
            return {
                ...state,
                ingredientsConstructor: []
            };
        }
        case MOVE_INGREDIENT_CONSTRUCTOR: {
            const otherIngredients = state.ingredientsConstructor.filter((ingredient: TIngredient) => ingredient.type !== 'bun');
            const bun = state.ingredientsConstructor.filter((ingredient: TIngredient) => ingredient.type === 'bun');
            const otherIngredientsNew = [...otherIngredients];
            const drag = otherIngredientsNew.splice(action.dragIndex, 1);
            otherIngredientsNew.splice(action.hoverIndex, 0, drag[0]);
            return {
                ...state,
                ingredientsConstructor: [...bun, ...otherIngredientsNew]
            };
        }
        default: {
            return state;
        }
    }
};