import styles from './ingredient-details.module.css';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { TParams } from '../../utils/types';
import { useSelector } from '../../services/hooks';
 
const IngredientDetails: FC = () => {
    const { ingredients } = useSelector((store) => store.ingredients);
    const { id } = useParams<TParams>();
    const currentIngredient = React.useMemo(
            () => ingredients.find((item) => item._id === id),
        [ingredients, id]);

    return(
        <div className={styles.container}>
            {currentIngredient &&
            <>
                <img className={styles.container__image} src={currentIngredient.image} alt={currentIngredient.name} />
                <h3 className="text_type_main-medium mt-4 mb-8">{currentIngredient.name}</h3>
                <ul className={styles.container__list}>
                    <li className={styles.container__item}>
                        <p className={styles.container__text}>Калории, ккал</p>
                        <p className="text text_type_digits-default">{currentIngredient.calories}</p>
                    </li>
                    <li className={styles.container__item}>
                        <p className={styles.container__text}>Белки, г</p>
                        <p className="text text_type_digits-default">{currentIngredient.proteins}</p>
                    </li>
                    <li className={styles.container__item}>
                        <p className={styles.container__text}>Жиры, г</p>
                        <p className="text text_type_digits-default">{currentIngredient.fat}</p>
                    </li>
                    <li className={styles.container__item}>
                        <p className={styles.container__text}>Углеводы, г</p>
                        <p className="text text_type_digits-default">{currentIngredient.carbohydrates}</p>
                    </li>
                </ul>
            </>}
        </div>
    )
}

export default IngredientDetails;