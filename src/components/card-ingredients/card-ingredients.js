import React from 'react';
import styles from './card-ingredients.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { openIngredient } from '../../services/actions/index';

const CardIngredients = React.forwardRef(({ ingredients, name }, ref) => {
    const dispatch = useDispatch();
    
    const handleClick = (currentIngredient) => {
        dispatch(openIngredient(currentIngredient));
    };
    
    return (
        <div ref={ref}>
            <h2 className="text text_type_main-medium pt-10 pb-6">{name}</h2>
            <ul className={styles.ingredients__list}>
                {
                    ingredients.map((ingredient) => (
                        <li className={styles.ingredients__item} key={ingredient._id} onClick={() => handleClick(ingredient)}>
                            <Counter count={1} size="default" />
                            <img className={styles.ingredients__image} src={ingredient.image} alt={ingredient.name} />
                            <div className={styles.ingredients__price}>
                                <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
                                <CurrencyIcon type="primary" />
                            </div>
                            <p className="text text_type_main-default">{ingredient.name}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
})

CardIngredients.propTypes = {
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
    name: PropTypes.string.isRequired
}

export default CardIngredients;