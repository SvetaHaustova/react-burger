import styles from '../page.module.css';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { FC } from 'react';
import ProfileForm from '../../components/profile-form/profile-form';
import ProfileNav from '../../components/profile-nav/profile-nav';
import ProfileOrders from '../../components/profile-orders/profile-orders';

export const ProfilePage: FC = () => {
    const { path } = useRouteMatch();

    return (
        <main className={styles.main__profile}>
            <div className={styles.main__container}>
                <ProfileNav />
                <Switch>
                    <Route path={`${path}`} exact={true}>
                        <ProfileForm />
                    </Route>
                    <Route path={`${path}/orders`} >
                        <ProfileOrders />
                    </Route>
                </Switch>
            </div>
        </main>
    )
}