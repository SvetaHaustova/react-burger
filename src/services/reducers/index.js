import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients-reducer';
import { orderReducer } from './order-reducer';
import { constructorReducer } from './constructor-reducer';
import { authReducer } from './auth-reducer';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    constructor: constructorReducer,
    auth: authReducer
});