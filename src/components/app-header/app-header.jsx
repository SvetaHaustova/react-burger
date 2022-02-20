import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';


function AppHeader() {
    return (
        <header className={styles.header}>
            <nav className={styles.header__container}>
                <ul className={styles.header__list}>
                    <li className={styles.header__item}>
                        <a className={styles.header__link} href="#top">
                            <BurgerIcon type="primary" />
                            <p className="text text_type_main-default pl-2 m-0">Конструктор</p>
                        </a>
                    </li>
                    <li className={styles.header__item}>
                        <a className={styles.header__link} href="#top">
                            <ListIcon type="secondary" />
                            <p className="text text_type_main-default text_color_inactive pl-2 m-0">Лента заказов</p>
                        </a>
                    </li>
                </ul>
            </nav>
            <Logo />
            <div className={styles.header__login}>
                <a className={styles.header__link} href="#top">
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-default text_color_inactive pl-2 m-0">Личный кабинет</p>
                </a>
            </div>
        </header>
    );
}

export default AppHeader;