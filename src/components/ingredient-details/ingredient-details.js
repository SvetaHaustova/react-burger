import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';

function IngredientDetails() {
    const { image, name, calories, proteins, fat, carbohydrates } = useSelector(store => store.ingredients.currentIngredient);

    return(
        <div className={styles.container}>
            <img className={styles.container__image} src={image} alt={name} />
            <h3 className="text_type_main-medium mt-4 mb-8">{name}</h3>
            <ul className={styles.container__list}>
                <li className={styles.container__item}>
                    <p className={styles.container__text}>Калории, ккал</p>
                    <p className="text text_type_digits-default">{calories}</p>
                </li>
                <li className={styles.container__item}>
                    <p className={styles.container__text}>Белки, г</p>
                    <p className="text text_type_digits-default">{proteins}</p>
                </li>
                <li className={styles.container__item}>
                    <p className={styles.container__text}>Жиры, г</p>
                    <p className="text text_type_digits-default">{fat}</p>
                </li>
                <li className={styles.container__item}>
                    <p className={styles.container__text}>Углеводы, г</p>
                    <p className="text text_type_digits-default">{carbohydrates}</p>
                </li>
            </ul>
        </div>
    )
}

export default IngredientDetails;