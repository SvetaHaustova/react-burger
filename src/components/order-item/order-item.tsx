import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './order-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { MAX_SHOW_INGREDIENT } from '../../utils/constants';
import { TOrderItemComponent } from '../../utils/types';
import { useSelector } from '../../services/hooks';
import { formatOrderDate, formatStatus } from '../../utils/utils';

const OrderItem: FC<TOrderItemComponent> = ({ number, createdAt, name, ingredientsId, isUserOrders, id, status }) => {
    const location = useLocation();
    const { ingredients } = useSelector((store) => store.ingredients);
    const orderIngredients = ingredients.filter((ingredient) => ingredientsId.includes(ingredient._id)).reverse();

    const orderIngredientsShow = orderIngredients.length > MAX_SHOW_INGREDIENT
        ? orderIngredients.slice(0, MAX_SHOW_INGREDIENT)
        : orderIngredients;

  const orderIngredientsHidden = orderIngredients.length > MAX_SHOW_INGREDIENT
        ? orderIngredients.length - MAX_SHOW_INGREDIENT
        : 0;

    const totalPrice = React.useMemo(
        () =>
            orderIngredients
            ? orderIngredients.reduce((sum, current) => sum + current.price, 0)
            : 0,
        [orderIngredients]
    );

    const classNameOrderItem = `${styles.order__item} ${isUserOrders && styles.order__itemWidth}`;

    return (
        <Link to={{ pathname: `${location.pathname}/${id}`, state: { background: location } }} className={styles.order__link}>
            <li className={classNameOrderItem}>
                <div className={styles.order__data}>
                    <p className={styles.order__number}>#{number}</p>
                    <p className={styles.order__date}>{formatOrderDate(createdAt)}</p>
                </div>
                <p className={styles.order__text}>{name}</p>
                {isUserOrders && <p className={styles.order__status}>{formatStatus(status)}</p>}
                <div className={styles.order__data}>
                    <ul className={styles.order__list}>
                        {orderIngredientsShow.map((item, index) => (
                            <li key={index} className={styles.order__images}>
                                <img className={styles.order__image} src={item.image} alt={item.name}/>
                                {index === 0 && orderIngredientsHidden > 0 && (
                                    <span className={styles.order__count}>+{orderIngredientsHidden}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                    <div className={styles.order__price}>
                        <p className={styles.order__number}>{totalPrice}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </li>
        </Link>
    )
}

export default OrderItem;