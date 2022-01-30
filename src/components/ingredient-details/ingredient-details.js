import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';

function IngredientDetails({ ingredient }) {
    return(
        <div className={styles.container}>
            <img className={styles.container__image} src={ingredient.image} alt={ingredient.name} />
            <h3 className="text_type_main-medium mt-4 mb-8">{ingredient.name}</h3>
            <ul className={styles.container__list}>
                <li className={styles.container__item}>
                    <p className={styles.container__text}>Калории, ккал</p>
                    <p className="text text_type_digits-default">{ingredient.calories}</p>
                </li>
                <li className={styles.container__item}>
                    <p className={styles.container__text}>Белки, г</p>
                    <p className="text text_type_digits-default">{ingredient.proteins}</p>
                </li>
                <li className={styles.container__item}>
                    <p className={styles.container__text}>Жиры, г</p>
                    <p className="text text_type_digits-default">{ingredient.fat}</p>
                </li>
                <li className={styles.container__item}>
                    <p className={styles.container__text}>Углеводы, г</p>
                    <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
                </li>
            </ul>
        </div>
    )
}

IngredientDetails.propTypes = {
    ingredient: PropTypes.oneOfType([PropTypes.object, PropTypes.shape({
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
        __v: PropTypes.number.isRequired,
    }),
    ]).isRequired,
};

export default IngredientDetails;