import { AnyAction } from 'redux';
import { orderReducer, orderInitialState } from './order-reducer';
import {
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,
    CLOSE_ORDER
} from '../actions/order';

describe('Проверка order reducer', () => {
    it('Проверка initialState', () => {
        expect(orderReducer(undefined, {} as AnyAction)).toEqual(orderInitialState);
    });

    it('Проверка POST_ORDER_REQUEST', () => {
        expect(orderReducer(orderInitialState, {
            type: POST_ORDER_REQUEST,
        })).toEqual({
            ...orderInitialState,
            orderRequest: true,
            orderFailed: false
        });
    });

    it('Проверка POST_ORDER_SUCCESS', () => {
        const orderNumber = {
            orderNumber: 1234
        };

        expect(orderReducer(orderInitialState, {
            type: POST_ORDER_SUCCESS,
            orderNumber,
        })).toEqual({
            ...orderInitialState,
            orderNumber,
            orderRequest: false
        });
    });

    it('Проверка POST_ORDER_FAILED', () => {
        expect(orderReducer(orderInitialState, {
            type: POST_ORDER_FAILED
        })).toEqual({
            ...orderInitialState,
            orderRequest: false,
            orderFailed: true
        });
    });

    it('Проверка CLOSE_ORDER', () => {
        expect(orderReducer(orderInitialState, {
            type: CLOSE_ORDER
        })).toEqual({
            ...orderInitialState,
            orderNumber: null
        });
    });
});