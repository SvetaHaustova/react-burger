import React, { FC } from 'react';
import styles from './feed-orders.module.css';
import { useRouteMatch } from 'react-router-dom';
import OrderItem from '../order-item/order-item';
import { useDispatch, useSelector } from '../../services/hooks';
import {
    wsConnectionClosedOrdersAction,
    wsConnectionClosedOrdersUserAction,
    wsConnectionStartOrdersAction,
    wsConnectionStartOrdersUserAction
  } from '../../services/actions/feed';

const FeedOrders: FC = () => {
    const dispatch = useDispatch();
    const { orders, userOrders } = useSelector((store) => store.feed);
    const isUserOrders = useRouteMatch({ path: "/profile/orders/" });
    //const currentOrders = isUserOrders ? [...userOrders].reverse() : orders;
    const currentOrders = isUserOrders ? userOrders : orders;

    React.useEffect(
        () => {
            dispatch(isUserOrders ? wsConnectionStartOrdersUserAction() : wsConnectionStartOrdersAction());
                return () => {
                dispatch(isUserOrders ? wsConnectionClosedOrdersUserAction() : wsConnectionClosedOrdersAction());
            };
        }, [],
    );

    return (
        <section className={styles.feed__orders}>
            <ul className={styles.feed__list}>
                {currentOrders.map((item) => (
                    <OrderItem
                        key={item._id}
                        id={item._id}
                        isUserOrders={isUserOrders}
                        number={item.number}
                        createdAt={item.createdAt}
                        name={item.name}
                        ingredientsId={item.ingredients}
                    />
                ))}
            </ul>
        </section>
    )
}

export default FeedOrders;