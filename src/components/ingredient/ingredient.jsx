import styles from './ingredient.module.css';
import PropTypes from 'prop-types';
import { DragPreviewImage, useDrag } from "react-dnd";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { ingredientPropTypes } from '../../utils/types';

function Ingredient({ ingredient, onClick }) {
    const { image, name, price } = ingredient;
    const { ingredientsConstructor } = useSelector(store => store.constructor);

    const [{ isDrag }, dragRef, preview] = useDrag({
        type: "ingredients",
        item: ingredient,
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });

    const count = ingredientsConstructor?.filter((item) => item._id === ingredient._id).length;

    return (
        <li className={`${styles.ingredient__item} ${isDrag && styles.ingredient__drag}`} onClick={onClick} ref={dragRef}>
            {count > 0 && <Counter count={count} size="default" />}
            <DragPreviewImage connect={preview} src={image} />
            <img className={styles.ingredient__image} src={image} alt={name} />
            <div className={styles.ingredient__price}>
                <p className="text text_type_digits-default mr-2">{price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default">{name}</p>
        </li>
    )
}

Ingredient.propTypes = {
    ingredient: ingredientPropTypes.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Ingredient;