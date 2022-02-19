import {
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,
    CLOSE_ORDER
} from '../actions/order';

const orderInitialState = {
    orderNumber: null,
    orderRequest: false,
    orderFailed: false
};

export const orderReducer = (state = orderInitialState, action) => {
    switch (action.type) {
        case POST_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false
            };
        }
        case POST_ORDER_SUCCESS: {
            return {
                ...state,
                orderNumber: action.orderNumber,
                orderRequest: false
            };
        }
        case POST_ORDER_FAILED: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: true
            };
        }
        case CLOSE_ORDER: {
            return {
                ...state,
                orderNumber: null
            };
        }
        default: {
            return state;
        }
    }
};
