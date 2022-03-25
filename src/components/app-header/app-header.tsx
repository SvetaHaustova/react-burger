import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { Link, NavLink, useRouteMatch } from 'react-router-dom';
import { FC } from 'react';

const AppHeader: FC = () => {
    const mainPageMatch = useRouteMatch("/");
    const feedPageMatch = useRouteMatch("/feed");
    const profilePageMatch = useRouteMatch("/profile");
 
    return (
        <header className={styles.header}>
            <nav> 
                <ul className={styles.header__list}>
                    <li className={styles.header__item}>
                        <NavLink exact to="/" className={styles.header__link} activeClassName={styles.header__linkActive}>
                            <BurgerIcon type={(mainPageMatch && mainPageMatch.isExact) ? "primary" : "secondary"} />
                            <p className={styles.header__text}>Конструктор</p>
                        </NavLink>
                    </li>
                    <li className={styles.header__item}>
                        <NavLink to="/feed" className={styles.header__link} activeClassName={styles.header__linkActive}>
                            <ListIcon type={feedPageMatch ? "primary" : "secondary"} />
                            <p className={styles.header__text}>Лента заказов</p>
                        </NavLink>
                    </li>
                    <li className={styles.header__logo}>
                        <Link to="/" className={styles.header__link}>
                            <Logo />
                        </Link>
                    </li>
                    <li className={styles.header__item}>
                        <NavLink to="/profile" className={styles.header__link} activeClassName={styles.header__linkActive}>
                            <ProfileIcon type={profilePageMatch ? "primary" : "secondary"} />
                            <p className={styles.header__text}>Личный кабинет</p>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default AppHeader;