import { FC } from 'react';
import styles from '../page.module.css';
import FeedOrders from '../../components/feed-orders/feed-orders';
import FeedStatus from '../../components/feed-status/feed-status';

export const FeedPage: FC = () => {
    return (
        <main className={styles.main__burger}>
            <div className={styles.main__feed}>
                <h2 className={styles.main__title}>Лента заказов</h2>
                <div className={styles.main__feedWrapper}>
                    <FeedOrders />
                    <FeedStatus />
                </div>
            </div> 
        </main>
    )
}