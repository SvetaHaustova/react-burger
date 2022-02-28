import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Switch, useHistory } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import styles from './app.module.css';
import { closeOrder } from '../../services/actions/order';
import { getIngredients, closeIngredient } from '../../services/actions/ingredients';
import {
    headerModalIngredientDetails,
    loadingTextIngredients,
    errorTextIngredients
} from '../../utils/constants';
import {
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    NotFoundPage
} from '../../pages';

function App() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { ingredients, currentIngredient, ingredientsRequest, ingredientsFailed } = useSelector(store => store.ingredients);
    const { orderNumber } = useSelector(store => store.order);

    React.useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])

    const closeModalIngredient = () => {
        dispatch(closeIngredient());
    };

    const closeModalOrder = () => {
        dispatch(closeOrder());
    };

    return (
        <div className={styles.page}>
            <AppHeader />
            <Switch>
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
                <Route exact path="/">
                    {ingredientsRequest &&
                        <div className={styles.page__initial}>
                            <p className="text text_type_main-default">{loadingTextIngredients}</p>
                        </div>
                    }
                    {ingredientsFailed &&
                        <div className={styles.page__initial}>
                            <p className="text text_type_main-default">{errorTextIngredients}</p>
                        </div>
                    }
                    {!ingredientsRequest && !ingredientsFailed && ingredients.length > 0 &&
                        <main className={styles.page__burger}>
                            <DndProvider backend={HTML5Backend}>
                                <BurgerIngredients />
                                <BurgerConstructor />
                            </DndProvider>
                        </main>
                    }
                </Route>
                <Route path="*">
                    <NotFoundPage history={history} />
                </Route>
            </Switch>
            { currentIngredient &&
                <Modal header={headerModalIngredientDetails} onClose={closeModalIngredient}>
                    <IngredientDetails />
                </Modal>
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
