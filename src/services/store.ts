import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middleware/middleware';
import { wsOrdersActions, wsOrdersUserActions } from './actions/feed';
import { WS_API_URL } from '../utils/constants';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(`${WS_API_URL}/all`, wsOrdersActions), socketMiddleware(WS_API_URL, wsOrdersUserActions)));

export const store = createStore(rootReducer, enhancer);