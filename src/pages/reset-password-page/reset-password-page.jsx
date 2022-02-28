import styles from '../page.module.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../../components/form/form';

export function ResetPasswordPage() {
    const inputs = [
        { name: "token", placeholder: "Введите код из письма", type: "text"}
    ];

    const [form, setForm] = React.useState({ password: "", token: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //dispatch(reset(form));
    };

    return (
        <main className={styles.main}>
            <Form
                title={"Восстановление пароля"}
                inputs={inputs}
                form={form}
                passwordInput={true}
                buttonText={"Сохранить"}
                reverseInput={true}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
            <p className={styles.main__text}>Вспомнили пароль? <Link to="/login" className={styles.main__link}>Войти</Link></p>
        </main>
    );
}