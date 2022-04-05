import { postOrderRequest } from '../../utils/api';
import { resetConstructorAction } from './constructor';
import { TOrderNumber, TIngredientId } from '../../utils/types';
import { AppDispatch, AppThunk } from '../types';

export const POST_ORDER_REQUEST: "POST_ORDER_REQUEST" = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS: "POST_ORDER_SUCCESS" = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED: "POST_ORDER_FAILED" = "POST_ORDER_FAILED";
export const CLOSE_ORDER: "CLOSE_ORDER" = "CLOSE_ORDER";

export interface IPostOrderRequestAction {
    readonly type: typeof POST_ORDER_REQUEST;
}

export interface IPostOrderSuccessAction {
    readonly type: typeof POST_ORDER_SUCCESS;
    readonly orderNumber: TOrderNumber;
}

export interface IPostOrderFailedAction {
    readonly type: typeof POST_ORDER_FAILED;
}

export interface ICloseOrderAction {
    readonly type: typeof CLOSE_ORDER;
}

export type TOrderActions = 
    | IPostOrderRequestAction
    | IPostOrderSuccessAction
    | IPostOrderFailedAction
    | ICloseOrderAction;

const postOrderRequestAction = (): IPostOrderRequestAction => ({
    type: POST_ORDER_REQUEST
});

const postOrderSuccessAction = (orderNumber: TOrderNumber): IPostOrderSuccessAction => ({
    type: POST_ORDER_SUCCESS,
    orderNumber
});

const postOrderFailedAction = (): IPostOrderFailedAction => ({
    type: POST_ORDER_FAILED
});

export const closeOrder = (): ICloseOrderAction => ({
    type: CLOSE_ORDER
});

export const postOrder: AppThunk = (data: Array<TIngredientId>) => (dispatch: AppDispatch) => {
    dispatch(postOrderRequestAction());
    postOrderRequest(data)
    .then((res) => {
        dispatch(postOrderSuccessAction(res.order.number));
        dispatch(resetConstructorAction());
    })
    .catch((err) => {
        console.log(err);
        dispatch(postOrderFailedAction());
        dispatch(resetConstructorAction());
    });
};