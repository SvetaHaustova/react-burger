import styles from './burger-ingredients.module.css';
import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsContext } from '../../contexts/ingredients-context';
import CardIngredients from '../card-ingredients/card-ingredients';
import PropTypes from 'prop-types';

function BurgerIngredients({ onOpen }) {
    const [current, setCurrent] = React.useState("buns");
    const { ingredients } = React.useContext(IngredientsContext);
    const bun = ingredients.filter((ingredient) => ingredient.type === "bun");
    const sauce = ingredients.filter((ingredient) => ingredient.type === "sauce");
    const main = ingredients.filter((ingredient) => ingredient.type === "main");

    return (
        <section className={styles.ingredients}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div style={{ display: 'flex' }}>
                <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="mains" active={current === 'mains'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.ingredients__container}>
                <CardIngredients ingredients={bun} name="Булки" onOpen={onOpen} />
                <CardIngredients ingredients={sauce} name="Соусы" onOpen={onOpen} />
                <CardIngredients ingredients={main} name="Начинки" onOpen={onOpen} />
            </div>
        </section>
    );
}

BurgerIngredients.propTypes = {
    onOpen: PropTypes.func.isRequired,
}

export default BurgerIngredients;