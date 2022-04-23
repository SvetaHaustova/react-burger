import React, { FC } from 'react';
import styles from './feed-status.module.css';
import { useSelector } from '../../services/hooks';

const FeedStatus: FC = () => {
    const { total, totalToday, orders } = useSelector((store) => store.feed);
    
    const doneOrders = React.useMemo(
        () => 
            orders.filter((item) => item.status === "done").slice(0, 15),
        [orders]
    );
    
    const inProgressOrders = React.useMemo(
        () => 
            orders.filter((item) => item.status === "pending").slice(0, 15),
        [orders]
    );

    return (
        <section className={styles.feed__status}>
            <div className={styles.feed__wrapper}>
                <div>
                    <h3 className={styles.feed__text}>Готовы:</h3>
                    <ul className={styles.feed__list}>
                        {doneOrders.map((order) => (
                            <li className={styles.feed__itemDone} key={order._id}>{order.number}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className={styles.feed__text}>В работе:</h3>
                    <ul className={styles.feed__list}>
                        {inProgressOrders.map((order) => (
                            <li className={styles.feed__itemInProgress} key={order._id}>{order.number}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={styles.feed__total}>
                <h3 className={styles.feed__text}>Выполнено за всё время:</h3>
                <p className={styles.feed__number}>{total}</p>
            </div>
            <div className={styles.feed__total}>
                <h3 className={styles.feed__text}>Выполнено за сегодня:</h3>
                <p className={styles.feed__number}>{totalToday}</p>
            </div>
        </section>
    )
}

export default FeedStatus;