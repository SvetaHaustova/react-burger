import styles from '../page.module.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../../components/form/form';

export function RegisterPage() {
    const inputs = [
        { name: "name", placeholder: "Имя", type: "text"},
        { name: "email", placeholder: "E-mail", type: "email"}
    ];

    const [form, setForm] = React.useState({ email: "", password: "", name: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //dispatch(register(form));
    };
    
    return (
        <main className={styles.main}>
            <Form
                title={"Регистрация"}
                inputs={inputs}
                form={form}
                passwordInput={true}
                buttonText={"Зарегистрироваться"}
                reverseInput={false}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
            <p className={styles.main__text}>Уже зарегистрированы? <Link to="/login" className={styles.main__link}>Войти</Link></p>
        </main>
    );
}