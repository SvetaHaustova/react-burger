import React, { FC } from 'react';
import styles from '../page.module.css';
import { useRouteMatch } from 'react-router-dom';
import Order from '../../components/order/order';
import { useDispatch } from '../../services/hooks';
import {
    wsConnectionClosedOrdersAction,
    wsConnectionClosedOrdersUserAction,
    wsConnectionStartOrdersAction,
    wsConnectionStartOrdersUserAction
  } from '../../services/actions/feed';
 
export const OrderPage: FC = () => {
    const dispatch = useDispatch();
    const isUserOrders = useRouteMatch({ path: "/profile/orders/" });

    React.useEffect(
        () => {
            dispatch(isUserOrders ? wsConnectionStartOrdersUserAction() : wsConnectionStartOrdersAction());
                return () => {
                dispatch(isUserOrders ? wsConnectionClosedOrdersUserAction() : wsConnectionClosedOrdersAction());
            };
        }, [],
    );

    return (
        <main className={styles.main}>
            <h2 className={styles.main__title}>Информация о заказе</h2>
            <Order />
        </main>
    )
}