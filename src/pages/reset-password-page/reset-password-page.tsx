import styles from '../page.module.css';
import React, { FC } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import Form from '../../components/form/form';
import { resetPassword } from '../../services/actions/auth';
import { TForm, TInput } from '../../utils/types';
import { useDispatch, useSelector } from '../../services/hooks';

export const ResetPasswordPage: FC = () => {
    const { loggedIn, resetPasswordFailed } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const history = useHistory() as any;
    const prevPathname = history.location.state?.prevPathname;

    const inputs: TInput[] = [
        { name: "token", placeholder: "Введите код из письма", type: "text"}
    ];

    const [form, setForm] = React.useState<TForm>({ password: "", token: "" });

    const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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