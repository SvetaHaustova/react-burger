import styles from '../page.module.css';
import React, { FC } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Form from '../../components/form/form';
import { register } from '../../services/actions/auth';
import { TLocation, TForm, TInput } from '../../utils/types';

export const RegisterPage: FC = () => {
    const dispatch = useDispatch();
    const { state } = useLocation<TLocation>();
    const { loggedIn } = useSelector((store: any) => store.auth);

    const inputs: TInput[] = [
        { name: "name", placeholder: "Имя", type: "text"},
        { name: "email", placeholder: "E-mail", type: "email"}
    ];

    const [form, setForm] = React.useState<TForm>({ email: "", password: "", name: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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