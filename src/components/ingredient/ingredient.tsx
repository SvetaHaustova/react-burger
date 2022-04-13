import styles from './ingredient.module.css';
import { FC } from 'react';
import { DragPreviewImage, useDrag } from "react-dnd";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { TIngredientComponent } from '../../utils/types';
import { useSelector } from '../../services/hooks';

const Ingredient: FC<TIngredientComponent> = ({ ingredient, onClick }) => {
    const location = useLocation();
    const { image, name, price } = ingredient;
    const { ingredientsConstructor } = useSelector((store) => store.constructor);

    const [{ isDrag }, dragRef, preview] = useDrag({
        type: "ingredients",
        item: ingredient,
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });

    const count = ingredientsConstructor?.filter((item) => item._id === ingredient._id).length;

    return (
        <Link to={{ pathname: `/ingredients/${ingredient._id}`, state: { background: location } }} className={styles.ingredient__link}>
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
        </Link>
    )
}

export default Ingredient;