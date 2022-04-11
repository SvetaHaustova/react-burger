import { FC } from 'react';
import styles from './order-ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TOrderIngredientComponent } from '../../utils/types';

export const OrderIngredient: FC<TOrderIngredientComponent> = ({ ingredient, name, image, currentOrder }) => {
    const count = currentOrder.ingredients.filter((item) => item === ingredient._id).length;
    
    return (
        <li className={styles.order__ingredient}> 
            <img className={styles.order__image} src={image} alt={name} />
            <p className={styles.order__name}>{name}</p> 
            <div className={styles.order__wrapper}>
                <p className={styles.order__number}>{count}</p>
                <span className={styles.order__x}>x</span>
                <p className={styles.order__number}>{ingredient.price}</p>   
            </div>
            <CurrencyIcon type="primary" />
        </li>
    )
}

export default OrderIngredient;