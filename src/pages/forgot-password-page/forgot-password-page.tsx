import styles from '../page.module.css';
import React, { FC } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../../components/form/form';
import { forgotPassword } from '../../services/actions/auth';
import { TForm, TInput } from '../../utils/types';

export const ForgotPasswordPage: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { loggedIn } = useSelector((store: any) => store.auth);

    const inputs: TInput[] = [
        { name: "email", placeholder: "Укажите e-mail", type: "email"}
    ];

    const [form, setForm] = React.useState<TForm>({ email: ""});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(forgotPassword(form.email));
        history.push({ pathname: '/reset-password', state: { prevPathname: history.location.pathname } });
    };

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