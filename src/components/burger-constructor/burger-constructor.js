import styles from './burger-constructor.module.css';
import React from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { IngredientsContext } from '../../contexts/ingredients-context';

const totalPriceInitialState = { totalPrice: 0 };

function totalPriceReducer(state, action) {
    switch (action.type) {
        case "set":
            return { totalPrice: action.payload };
        case "reset":
            return totalPriceInitialState;
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
        }
}

function BurgerConstructor({ makeOrder }) {
    const { ingredients } = React.useContext(IngredientsContext);
    const [totalPriceState, totalPriceDispatcher] = React.useReducer(totalPriceReducer, totalPriceInitialState);

    const bunIngredient = ingredients && ingredients.find(ingredient => ingredient.type === 'bun');
    const otherIngredients = ingredients && ingredients.filter(ingredient => ingredient.type !== 'bun').slice(0, 2);
    const totalPrice = bunIngredient && otherIngredients.map((ingredient) => ingredient.price)
                                                        .reduce((sum, price) => sum + price, 0) + bunIngredient.price * 2;

    const handleOrder = () => {
        const burgerIngredients = [bunIngredient, ...otherIngredients].map(((item) => item._id));
        makeOrder(burgerIngredients);
    }

    React.useEffect(() => {
        if (ingredients) {
            totalPriceDispatcher({ type: "set", payload: totalPrice });
        } else {
            totalPriceDispatcher({ type: "reset" });
        }
    }, [totalPrice, ingredients])

    return (
        <section className={styles.constructor}>
            <div className={styles.constructor__container}>
                {bunIngredient && <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bunIngredient.name} (верх)`}
                    price={bunIngredient.price}
                    thumbnail={bunIngredient.image}
                />}
            </div>
            <ul className={styles.constructor__list}>
                {
                    otherIngredients.map((ingredient) => (
                        <li className={styles.constructor__item} key={ingredient._id}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                isLocked={false}
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                            />
                        </li>
                    ))
                }
            </ul>
            <div className={styles.constructor__container}>
                {bunIngredient && <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bunIngredient.name} (низ)`}
                    price={bunIngredient.price}
                    thumbnail={bunIngredient.image}
                />}
            </div>
            <div className={styles.constructor__total}>
                <div className={styles.constructor__price}>
                    <p className="text text_type_digits-medium mr-2">{totalPriceState.totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="medium" onClick={handleOrder}>Оформить заказ</Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    makeOrder: PropTypes.func.isRequired,
}

export default BurgerConstructor;