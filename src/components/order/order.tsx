import React, { FC } from 'react';
import { useRouteMatch, useParams } from 'react-router-dom';
import styles from './order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderIngredient from '../order-ingredient/order-ingredient';
import { useSelector } from '../../services/hooks';
import { TParams } from '../../utils/types';
import { formatStatus, formatOrderDate } from '../../utils/utils';

export const Order: FC = () => {
    const { id } = useParams<TParams>();
    const isUserOrders = useRouteMatch({ path: "/profile/orders/" });
    const { ingredients } = useSelector((store) => store.ingredients);
    const { orders, userOrders } = useSelector((store) => store.feed);
    
    const order = React.useMemo(
        () => 
            orders && orders.find((item) => item._id === id),
        [orders, id]
    );
    
    const userOrder = React.useMemo(
        () => 
            userOrders && userOrders.find((item) => item._id === id),
        [orders, id]
    );
    
    const currentOrder = isUserOrders ? userOrder : order;

    const orderIngredients = React.useMemo(
        () => 
            ingredients && ingredients.filter((item) => currentOrder?.ingredients.includes(item._id)),
        [ingredients]
    );

    const totalPrice = React.useMemo(
        () =>
            orderIngredients
            ? orderIngredients.reduce((sum, current) => sum + current.price, 0)
            : 0,
        [orderIngredients]
    );

    return (
        <div className={styles.order}>
            {currentOrder &&
            <>
                <p className={styles.order__number}>#{currentOrder.number}</p>
                <p className={styles.order__text}>{currentOrder.name}</p>
                <p className={styles.order__status}>{formatStatus(currentOrder.status)}</p>
                <h3 className={styles.order__title}>Состав:</h3>
                <ul className={styles.order__list}>
                    {orderIngredients.map((ingredient) => (
                        <OrderIngredient 
                            key={ingredient._id}
                            ingredient={ingredient}
                            name={ingredient.name}
                            image={ingredient.image}
                            currentOrder={currentOrder}
                        />
                    ))}
                </ul>
                <div className={styles.order__price}>
                    <p className={styles.order__date}>{formatOrderDate(currentOrder.createdAt)}</p>
                    <div className={styles.order__total}>
                        <p className={styles.order__number}>{totalPrice}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </>}
        </div>
    )
}

export default Order;