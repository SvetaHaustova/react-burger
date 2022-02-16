import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import styles from './app.module.css';
import { getIngredients } from '../../services/actions/index';

function App() {
    const dispatch = useDispatch();
    const { ingredients, currentIngredient } = useSelector(store => store.ingredients);
    const { orderNumber } = useSelector(store => store.order);

    React.useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])

    return (
        <div className={styles.page}>
            <AppHeader />
            { ingredients.length > 0 &&
                <main className={styles.page__burger}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </main>
            }
            { currentIngredient &&
                <Modal header="Детали ингредиента">
                    <IngredientDetails />
                </Modal>
            }
            { orderNumber &&
                <Modal header="">
                    <OrderDetails />
                </Modal>
            }
        </div>
    );
}

export default App;
