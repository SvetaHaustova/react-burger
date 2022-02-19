import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import styles from './app.module.css';
import { closeOrder } from '../../services/actions/order';
import { getIngredients, closeIngredient } from '../../services/actions/ingredients';

function App() {
    const dispatch = useDispatch();
    const { ingredients, currentIngredient, ingredientsRequest, ingredientsFailed } = useSelector(store => store.ingredients);
    const { orderNumber } = useSelector(store => store.order);
console.log(ingredientsRequest)
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
            {
                ingredientsRequest
                ? <div className={styles.page__initial}>
                    <p className="text text_type_main-default">Идет загрузка ингредиентов</p>
                </div>
                : ingredientsFailed
                    ? <div className={styles.page__initial}>
                        <p className="text text_type_main-default">При загрузке ингредиентов произошла ошибка. Попробуйте в другой раз</p>
                    </div>
                    : ingredients.length > 0 &&
                        <main className={styles.page__burger}>
                            <DndProvider backend={HTML5Backend}>
                                <BurgerIngredients />
                                <BurgerConstructor />
                            </DndProvider>
                        </main>
            }
            { currentIngredient &&
                <Modal header="Детали ингредиента" onClose={closeModalIngredient}>
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
