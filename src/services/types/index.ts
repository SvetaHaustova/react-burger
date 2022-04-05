import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';
import { store } from '../store';
import { TOrderActions } from '../actions/order';
import { TIngredientsActions } from '../actions/ingredients';
import { TAuthActions } from '../actions/auth';
import { TConstructorActions } from '../actions/constructor';

type TApplicationActions = TOrderActions | TIngredientsActions | TAuthActions | TConstructorActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = Dispatch<TApplicationActions>;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;