import styles from './burger-constructor.module.css';
import React from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { IngredientsContext } from '../../contexts/ingredients-context';

function BurgerConstructor({ onOpen }) {
    const { ingredients } = React.useContext(IngredientsContext);
    const bun = ingredients && ingredients.find(ingredient => ingredient.type === 'bun');
    const filterIngredients = ingredients.filter(ingredient => ingredient.type === 'main' || ingredient.type === 'sauce').slice(1, );
    return (
        <section className={styles.constructor}>
            <div className={styles.constructor__container}>
                {bun && <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />}
            </div>
            <ul className={styles.constructor__list}>
                {
                    filterIngredients.map((ingredient) => (
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
                {bun && <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />}
            </div>
            <div className={styles.constructor__total}>
                <div className={styles.constructor__price}>
                    <p className="text text_type_digits-medium mr-2">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="medium" onClick={onOpen}>Оформить заказ</Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    onOpen: PropTypes.func.isRequired,
}

export default BurgerConstructor;