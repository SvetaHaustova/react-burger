import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import styles from './app.module.css';
import { IngredientsContext } from '../../contexts/ingredients-context';
import * as api from '../../utils/api';

function App() {
    const [ingredients, setIngredients] = React.useState([]);
    const [currentIngredient, setCurrentIngredient] = React.useState(null);
    const [orderNumber, setOrderNumber] = React.useState(null);

    React.useEffect(() => {
        api.getIngredients()
        .then((res) => {
            setIngredients(res.data);
        })
        .catch((err) => console.log(err));
    }, [])

    const openModalIngredientDetails = (id) => {
        if (ingredients) {
            setCurrentIngredient(ingredients.find((ingredient) => ingredient._id === id));
        }
    }

    const closeModal = () => {
        setCurrentIngredient(null);
        setOrderNumber(null);
    };

    const makeOrder = (data) => {
        api.sendOrder(data)
        .then((res) => {
            setOrderNumber(res.order.number);
        })
        .catch((err) => console.log(err));
    }

    return (
        <div className={styles.page}>
            <AppHeader />
            { ingredients.length > 0 &&
                <main className={styles.page__burger}>
                    <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
                        <BurgerIngredients onOpen={openModalIngredientDetails} />
                        <BurgerConstructor makeOrder={makeOrder} />
                    </IngredientsContext.Provider>
                </main>
            }
            { currentIngredient &&
                <Modal onClose={closeModal} header="Детали ингредиента">
                    <IngredientDetails ingredient={currentIngredient} />
                </Modal>
            }
            { orderNumber &&
                <Modal onClose={closeModal} header="">
                    <OrderDetails orderNumber={orderNumber} />
                </Modal>
            }
        </div>
    );
}

export default App;
