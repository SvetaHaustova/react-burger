import styles from './burger-ingredients.module.css';
import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import CardIngredients from '../card-ingredients/card-ingredients';
import PropTypes from 'prop-types';

function BurgerIngredients({ ingredients, onOpen }) {
    const [current, setCurrent] = React.useState("buns");
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
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number
    })).isRequired,
    onOpen: PropTypes.func.isRequired,
}

export default BurgerIngredients;