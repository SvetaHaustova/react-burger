import styles from '../page.module.css';
import React from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Form from '../../components/form/form';
import { register } from '../../services/actions/auth';

export function RegisterPage() {
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { loggedIn } = useSelector(store => store.auth);

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
        dispatch(register(form.email, form.password, form.name));
    };
    
    if (loggedIn) {
        return (
            <Redirect to={state?.from || "/"} />
        );
    }

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