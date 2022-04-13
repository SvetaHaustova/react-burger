import { getIngredientsRequest } from '../../utils/api';
import { TIngredient } from '../../utils/types';
import { AppDispatch, AppThunk } from '../types';

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";
export const OPEN_INGREDIENT: "OPEN_INGREDIENT" = "OPEN_INGREDIENT";
export const CLOSE_INGREDIENT: "CLOSE_INGREDIENT" = "CLOSE_INGREDIENT";

export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: ReadonlyArray<TIngredient>;
}

export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IOpenIngredientAction {
    readonly type: typeof OPEN_INGREDIENT;
    readonly currentIngredient: TIngredient;
}

export interface ICloseIngredientAction {
    readonly type: typeof CLOSE_INGREDIENT;
}

export type TIngredientsActions = 
    | IGetIngredientsRequestAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsFailedAction
    | IOpenIngredientAction
    | ICloseIngredientAction;

const getIngredientsRequestAction = (): IGetIngredientsRequestAction => ({
    type: GET_INGREDIENTS_REQUEST
});

const getIngredientsSuccessAction = (ingredients: ReadonlyArray<TIngredient>): IGetIngredientsSuccessAction => ({
    type: GET_INGREDIENTS_SUCCESS,
    ingredients
});

const getIngredientsFailedAction = (): IGetIngredientsFailedAction => ({
    type: GET_INGREDIENTS_FAILED
});

export const openIngredient = (currentIngredient: TIngredient): IOpenIngredientAction => ({
    type: OPEN_INGREDIENT,
    currentIngredient
});

export const closeIngredient = (): ICloseIngredientAction => ({
    type: CLOSE_INGREDIENT
});

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(getIngredientsRequestAction());
    getIngredientsRequest()
    .then((res) => {
        dispatch(getIngredientsSuccessAction(res.data));
    })
    .catch((err) => {
        console.log(err);
        dispatch(getIngredientsFailedAction());
    });
};