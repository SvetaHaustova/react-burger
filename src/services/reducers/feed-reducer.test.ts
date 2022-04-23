import { AnyAction } from 'redux';
import { feedOrdersReducer, feedOrdersInitialState } from './feed-reducer';
import {
    WS_CONNECTION_SUCCESS_ORDERS,
    WS_CONNECTION_CLOSED_ORDERS,
    WS_CONNECTION_ERROR_ORDERS,
    WS_GET_ORDERS,
    WS_CONNECTION_SUCCESS_ORDERS_USER,
    WS_CONNECTION_CLOSED_ORDERS_USER,
    WS_CONNECTION_ERROR_ORDERS_USER,
    WS_GET_ORDERS_USER
} from '../actions/feed';

describe('Проверка feed reducer', () => {
    const order = {
        createdAt: "2022-04-11T14:48:48.639Z",
        ingredients: ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733cd"],
        name: "Space бессмертный фалленианский минеральный флюоресцентный бургер",
        number: 13366,
        status: "done",
        updatedAt: "2022-04-11T14:48:48.815Z",
        _id: "62543fd01a3b2c001bcfebf4",
    };
    
    it('Проверка initialState', () => {
        expect(feedOrdersReducer(undefined, {} as AnyAction)).toEqual(feedOrdersInitialState);
    });

    it('Проверка WS_CONNECTION_SUCCESS_ORDERS', () => {
        expect(feedOrdersReducer(feedOrdersInitialState, {
            type: WS_CONNECTION_SUCCESS_ORDERS,
        })).toEqual({
            ...feedOrdersInitialState,
            wsConnected: true,
        });
      });

    it('Проверка WS_CONNECTION_CLOSED_ORDERS', () => {
        expect(feedOrdersReducer(feedOrdersInitialState, {
            type: WS_CONNECTION_CLOSED_ORDERS,
        })).toEqual({
            ...feedOrdersInitialState,
            wsConnected: false,
        });
    });

    it('Проверка WS_CONNECTION_ERROR_ORDERS', () => {
        expect(feedOrdersReducer(feedOrdersInitialState, {
            type: WS_CONNECTION_ERROR_ORDERS,
        })).toEqual({
            ...feedOrdersInitialState,
            wsConnected: false,
        });
    });

    it('Проверка WS_GET_ORDERS', () => {
        const orders = {
            orders: [order],
            total: 1234,
            totalToday: 12,
        }

        expect(feedOrdersReducer(feedOrdersInitialState, {
            type: WS_GET_ORDERS,
            orders
        })).toEqual({
            ...feedOrdersInitialState,
            orders: [order],
            total: 1234,
            totalToday: 12,
        });
    });

    it('Проверка WS_CONNECTION_SUCCESS_ORDERS_USER', () => {
        expect(feedOrdersReducer(feedOrdersInitialState, {
            type: WS_CONNECTION_SUCCESS_ORDERS_USER,
        })).toEqual({
            ...feedOrdersInitialState,
            wsConnected: true,
        });
    });

    it('Проверка WS_CONNECTION_CLOSED_ORDERS_USER', () => {
        expect(feedOrdersReducer(feedOrdersInitialState, {
            type: WS_CONNECTION_CLOSED_ORDERS_USER,
        })).toEqual({
            ...feedOrdersInitialState,
            wsConnected: false,
        });
    });

    it('Проверка WS_CONNECTION_ERROR_ORDERS_USER', () => {
        expect(feedOrdersReducer(feedOrdersInitialState, {
            type: WS_CONNECTION_ERROR_ORDERS_USER,
        })).toEqual({
            ...feedOrdersInitialState,
            wsConnected: false,
        });
    });

    it('Проверка WS_GET_ORDERS_USER', () => {
        const orders = {
            success: true,
            orders: [order],
            total: 3,
            totalToday: 1,
        }

        expect(feedOrdersReducer(feedOrdersInitialState, {
            type: WS_GET_ORDERS_USER,
            orders
        })).toEqual({
            ...feedOrdersInitialState,
            userOrders: [order],
        });
    });
});