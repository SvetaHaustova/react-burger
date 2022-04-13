import { TIngredient } from '../../utils/types';

export const ADD_INGREDIENT_CONSTRUCTOR: "ADD_INGREDIENT_CONSTRUCTOR" = "ADD_INGREDIENT_CONSTRUCTOR";
export const REMOVE_INGREDIENT_CONSTRUCTOR: "REMOVE_INGREDIENT_CONSTRUCTOR" = "REMOVE_INGREDIENT_CONSTRUCTOR";
export const RESET_CONSTRUCTOR: "RESET_CONSTRUCTOR" = "RESET_CONSTRUCTOR";
export const MOVE_INGREDIENT_CONSTRUCTOR: "MOVE_INGREDIENT_CONSTRUCTOR" = "MOVE_INGREDIENT_CONSTRUCTOR";

export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT_CONSTRUCTOR;
    readonly item: TIngredient;
}

export interface IRemoveIngredientAction {
    readonly type: typeof REMOVE_INGREDIENT_CONSTRUCTOR;
    readonly uuid: string;
}

export interface IMoveIngredientAction {
    readonly type: typeof MOVE_INGREDIENT_CONSTRUCTOR;
    readonly dragIndex: number;
    readonly hoverIndex: number;
}

export interface IResetConstructorAction {
    readonly type: typeof RESET_CONSTRUCTOR;
}

export type TConstructorActions = 
    | IAddIngredientAction
    | IRemoveIngredientAction
    | IMoveIngredientAction
    | IResetConstructorAction;

export const addIngredient = (item: TIngredient, uuid: string): IAddIngredientAction => ({
    type: ADD_INGREDIENT_CONSTRUCTOR,
    item: {...item, uuid: uuid}
});

export const removeIngredient = (uuid: string): IRemoveIngredientAction => ({
    type: REMOVE_INGREDIENT_CONSTRUCTOR,
    uuid
});

export const moveIngredient = (dragIndex: number, hoverIndex: number): IMoveIngredientAction => ({
    type: MOVE_INGREDIENT_CONSTRUCTOR,
    dragIndex,
    hoverIndex
});

export const resetConstructorAction = (): IResetConstructorAction => ({
    type: RESET_CONSTRUCTOR
});