import { postOrderRequest } from '../../utils/api';
import { RESET_CONSTRUCTOR } from './constructor';

export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED = "POST_ORDER_FAILED";
export const CLOSE_ORDER = "CLOSE_ORDER";

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
            dispatch({
                type: RESET_CONSTRUCTOR
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: POST_ORDER_FAILED
            });
            dispatch({
                type: RESET_CONSTRUCTOR
            });
        });
    }
}

export function closeOrder() {
    return {
        type: CLOSE_ORDER
    };
}