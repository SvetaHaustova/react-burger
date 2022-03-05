import styles from '../page.module.css';
import React from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Form from '../../components/form/form';
import { login } from '../../services/actions/auth';

export function LoginPage() {
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { loggedIn } = useSelector(store => store.auth);

    const inputs = [
        { name: "email", placeholder: "E-mail", type: "email"}
    ];

    const [form, setForm] = React.useState({ email: "", password: ""});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(form.email, form.password));
    };

    if (loggedIn) {
        return (
            <Redirect to={state?.from || "/"} />
        );
    }

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