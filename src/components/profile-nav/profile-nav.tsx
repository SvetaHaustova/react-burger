import styles from './profile-nav.module.css';
import { FC } from 'react';
import { NavLink, useRouteMatch, Redirect } from 'react-router-dom';
import { logout } from '../../services/actions/auth';
import { useDispatch, useSelector } from '../../services/hooks';

const ProfileNav: FC = () => {
    const dispatch = useDispatch();
    const { url } = useRouteMatch();
    const profilePageMatch = useRouteMatch("/profile");
    const { loggedIn } = useSelector((store) => store.auth);

    const handleLogout = () => {
        dispatch(logout());
        if (!loggedIn) {
            return (
                <Redirect to={"/login"} />
            );
        }
    };

    return (
        <nav className={styles.profile__nav}>
            <ul className={styles.profile__list}>
                <li>
                    <NavLink exact to={`${url}`} className={styles.profile__link} activeClassName={styles.profile__linkActive}>
                        Профиль
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`${url}/orders`} className={styles.profile__link} activeClassName={styles.profile__linkActive}>
                        История заказов
                    </NavLink>
                </li>
                <li>
                    <button type="button" className={styles.profile__button} onClick={handleLogout}>Выход</button>
                </li>
            </ul>
            {profilePageMatch?.isExact && <p className={styles.profile__text}>
                В этом разделе вы можете изменить свои персональные данные
            </p>}
        </nav>
    )
}

export default ProfileNav;