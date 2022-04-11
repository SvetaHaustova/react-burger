import React, { FC } from 'react';
import { TLocation } from '../../utils/types';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Order from '../order/order';
import styles from './app.module.css';
import { closeOrder } from '../../services/actions/order';
import { getUser } from '../../services/actions/auth';
import { getIngredients, closeIngredient } from '../../services/actions/ingredients';
import { headerModalIngredientDetails } from '../../utils/constants';
import ProtectedRoute from '../protected-route/protected-route';
import { useDispatch, useSelector } from '../../services/hooks';
import {
    HomePage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    ProfilePage,
    NotFoundPage,
    IngredientPage,
    FeedPage,
    OrderPage
} from '../../pages';

const App: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation<TLocation>();
    const background = location.state && location.state.background;
    const { orderNumber } = useSelector((store) => store.order);
    
    React.useEffect(() => {
        dispatch(getIngredients());
        dispatch(getUser());
    }, [dispatch])

    const closeModalIngredient = () => {
        dispatch(closeIngredient());
        history.goBack();
    };

    const closeModalOrder = () => {
        dispatch(closeOrder());
    };

    return (
        <div className={styles.page}>
            <AppHeader />
            <Switch location={background || location}>
                <Route path="/" exact={true}>
                    <HomePage />
                </Route>
                <ProtectedRoute path="/profile">
                    <ProfilePage />
                </ProtectedRoute>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/register">
                    <RegisterPage />
                </Route>
                <Route path="/forgot-password">
                    <ForgotPasswordPage />
                </Route>
                <Route path="/reset-password">
                    <ResetPasswordPage />
                </Route>
                <Route path="/feed" exact={true}>
                    <FeedPage />
                </Route>
                <Route path="/feed/:id" exact={true}>
                    <OrderPage />
                </Route>
                <Route path="/ingredients/:id">
                    <IngredientPage />
                </Route>
                <Route path="*">
                    <NotFoundPage history={history} />
                </Route>
            </Switch>
            { background &&
                <Route path="/ingredients/:id">
                    <Modal header={headerModalIngredientDetails} onClose={closeModalIngredient}>
                        <IngredientDetails />
                    </Modal>
                </Route>
            }
            { background &&
                <Route path="/feed/:id">
                    <Modal header="Информация о заказе" onClose={closeModalIngredient}>
                        <Order />
                    </Modal>
                </Route>
            }
            { orderNumber &&
                <Modal header="" onClose={closeModalOrder}>
                    <OrderDetails />
                </Modal>
            }
        </div>
    );
}

export default App;
