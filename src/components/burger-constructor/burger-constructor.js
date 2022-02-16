import styles from './burger-constructor.module.css';
import React from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { postOrder, removeIngredient } from '../../services/actions/index';

function BurgerConstructor() {
    const dispatch = useDispatch();
    //const { ingredients } = useSelector(store => store.ingredients);
    const { ingredientsConstructor } = useSelector(store => store.constructor);

    //const bunIngredient = ingredients && ingredients.find(ingredient => ingredient.type === 'bun');
    //const otherIngredients = ingredients && ingredients.filter(ingredient => ingredient.type !== 'bun').slice(0, 2);
    const bunIngredient = ingredientsConstructor && ingredientsConstructor.find(ingredient => ingredient.type === 'bun');
    const otherIngredients = ingredientsConstructor && ingredientsConstructor.filter(ingredient => ingredient.type !== 'bun');

    const totalPrice = React.useMemo(
        () => 
            //bunIngredient && otherIngredients.map((ingredient) => ingredient.price).reduce((sum, price) => sum + price, 0) + bunIngredient.price * 2,
            ingredientsConstructor ? ingredientsConstructor.reduce((sum, current) => sum + (current.type === 'bun' ? current.price * 2 : 1), 0) : 0,
        [ingredientsConstructor]
    )

    const handleRemoveIngredient = (uuid) => {
        dispatch(removeIngredient(uuid));
    }

    const handleOrder = () => {
        const burgerIngredients = ingredientsConstructor.map(((item) => item._id));
        dispatch(postOrder(burgerIngredients));
    }

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
                {otherIngredients &&
                    otherIngredients.map((ingredient) => (
                        <li className={styles.constructor__item} key={ingredient._id}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                isLocked={false}
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                                onDelete={() => handleRemoveIngredient(ingredient.uuid)}
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
                    <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="medium" onClick={handleOrder} disabled={!ingredientsConstructor}>Оформить заказ</Button>
            </div>
        </section>
    );
}

export default BurgerConstructor;