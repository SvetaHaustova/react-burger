import styles from '../page.module.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../../components/form/form';

export function ForgotPasswordPage() {
    const inputs = [
        { name: "email", placeholder: "Укажите e-mail", type: "email"}
    ];

    const [form, setForm] = React.useState({ email: ""});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //dispatch(forgot(form));
    };

    return (
        <main className={styles.main}>
            <Form
                title={"Восстановление пароля"}
                inputs={inputs}
                form={form}
                passwordInput={false}
                buttonText={"Восстановить"}
                reverseInput={false}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
            <p className={styles.main__text}>Вспомнили пароль? <Link to="/login" className={styles.main__link}>Войти</Link></p>
        </main>
    );
}