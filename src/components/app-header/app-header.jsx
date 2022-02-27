import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';


function AppHeader() {
    return (
        <header className={styles.header}>
            <nav>
                <ul className={styles.header__list}>
                    <li className={styles.header__item}>
                        <a className={styles.header__link} href="#top">
                            <BurgerIcon type="primary" />
                            <p className="text text_type_main-default ml-2 m-0">Конструктор</p>
                        </a>
                    </li>
                    <li className={styles.header__item}>
                        <a className={styles.header__link} href="#top">
                            <ListIcon type="secondary" />
                            <p className="text text_type_main-default text_color_inactive ml-2 m-0">Лента заказов</p>
                        </a>
                    </li>
                    <li className={styles.header__logo}>
                        <a className={styles.header__link} href="#top">
                            <Logo />
                        </a>
                    </li>
                    <li className={styles.header__item}>
                        <a className={styles.header__link} href="#top">
                            <ProfileIcon type="secondary" />
                            <p className="text text_type_main-default text_color_inactive ml-2 m-0">Личный кабинет</p>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default AppHeader;