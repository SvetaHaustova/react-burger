import styles from './not-found-page.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

export function NotFoundPage({ history }) {
    
    function handleGoBack() {
        history.goBack();
    }

    return (
        <main className={styles.notFoundPage}>
            <p className={styles.notFoundPage__number}>404</p>
            <p className={styles.notFoundPage__text}>Страница не найдена</p>
            <Button type="secondary" size="large" onClick={() => handleGoBack()}>Назад</Button>
        </main>
    );
}