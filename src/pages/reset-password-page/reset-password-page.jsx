import styles from '../page.module.css';
import React from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../../components/form/form';
import { resetPassword } from '../../services/actions/auth';

export function ResetPasswordPage() {
    const { loggedIn, resetPasswordFailed } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const history = useHistory();
    const prevPathname = history.location.state?.prevPathname;

    const inputs = [
        { name: "token", placeholder: "Введите код из письма", type: "text"}
    ];

    const [form, setForm] = React.useState({ password: "", token: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword(form.password, form.token));
        if (!resetPasswordFailed) {
            history.push('/login');
        }
    };

    if (!prevPathname) {
        return (
            <Redirect to={'/login'} />
        );
    }

    if (loggedIn) {
        return (
            <Redirect to={"/"} />
        );
    }

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