import styles from '../page.module.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../../components/form/form';

export function LoginPage() {
    const inputs = [
        { name: "email", placeholder: "E-mail", type: "email"}
    ];

    const [form, setForm] = React.useState({ email: "", password: ""});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //dispatch(login(form));
    };

    return (
        <main className={styles.main}>
            <Form
                title={"Вход"}
                inputs={inputs}
                form={form}
                passwordInput={true}
                buttonText={"Войти"}
                reverseInput={false}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
            <p className={styles.main__text}>Вы - новый пользователь? <Link to="/register" className={styles.main__link}>Зарегистрироваться</Link></p>
            <p className={styles.main__subtext}>Забыли пароль? <Link to="/forgot-password" className={styles.main__link}>Восстановить пароль</Link></p>
        </main>
    );
}