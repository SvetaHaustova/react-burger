import React from 'react';
import styles from './card-ingredients.module.css';
import { openIngredient } from '../../services/actions/ingredients';
import Ingredient from '../ingredient/ingredient';
import { TIngredient, TCardIngredientsComponent } from '../../utils/types';
import { useDispatch } from '../../services/hooks';

const CardIngredients = React.forwardRef<HTMLDivElement, TCardIngredientsComponent>(({ ingredients, name }, ref) => {
    const dispatch = useDispatch();

    const handleClick = (currentIngredient: TIngredient) => {
        dispatch(openIngredient(currentIngredient));
    };

    return (
        <div ref={ref}>
            <h2 className="text text_type_main-medium pt-10 pb-6">{name}</h2>
            <ul className={styles.ingredients__list}>
                {
                    ingredients.map((ingredient) => (
                        <Ingredient ingredient={ingredient} key={ingredient._id} onClick={() => handleClick(ingredient)} />
                    ))
                }
            </ul>
        </div>
    )
});

export default CardIngredients;