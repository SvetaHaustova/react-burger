import { Middleware, MiddlewareAPI } from 'redux';
import { getCookie } from '../../utils/utils';
import { TWsOrdersActions, TWsOrdersUserActions } from '../actions/feed';
import { AppDispatch, RootState } from '../types';

export const socketMiddleware = (wsUrl: string, wsActions: TWsOrdersActions | TWsOrdersUserActions): Middleware => 
    (store: MiddlewareAPI<AppDispatch, RootState>) => {
    
    let socket: WebSocket | null = null;

    return (next) => (action) => {
        const { dispatch, getState } = store;
        const { loggedIn } = getState().auth;
        const token = loggedIn ? `?token=${getCookie('token')?.replace('Bearer ', '')}` : '';
        const { type } = action;
        const { wsInit, onOpen, onClose, onError, onOrders } = wsActions;
        
        if (type === wsInit) {
            socket = new WebSocket(`${wsUrl}${token}`);
        }
        
        if (socket) {
            socket.onopen = (event) => {
                dispatch({ type: onOpen, orders: event });
            };

            socket.onerror = (event) => {
                dispatch({ type: onError, orders: event });
            };

            socket.onmessage = (event) => {
                const { data } = event;
                const parsedData = JSON.parse(data);
                dispatch({ type: onOrders, orders: parsedData });
            };

            socket.onclose = (event) => {
                dispatch({ type: onClose, orders: event });
            };
        }
        next(action);
    };
};

export default socketMiddleware;