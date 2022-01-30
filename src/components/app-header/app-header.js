import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';


function AppHeader() {
    return (
        <header className={styles.header}>
            <nav className={styles.header__container}>
                <ul className={styles.header__list}>
                    <li className={styles.header__item}>
                        <BurgerIcon type="primary" />
                        <p className="text text_type_main-default pl-2 m-0">Конструктор</p>
                    </li>
                    <li className={styles.header__item}>
                        <ListIcon type="secondary" />
                        <p className="text text_type_main-default text_color_inactive pl-2 m-0">Лента заказов</p>
                    </li>
                </ul>
            </nav>
            <Logo />
            <div className={styles.header__login}>
                <ProfileIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive pl-2 m-0">Личный кабинет</p>
            </div>
        </header>
    );
}

export default AppHeader;