import styles from './profile-form.module.css';
import React, { FC } from 'react';
import Form from '../form/form';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUser } from '../../services/actions/auth';
import { TForm, TInput } from '../../utils/types';
import { useDispatch, useSelector } from '../../services/hooks';

const ProfileForm: FC = () => {
    const dispatch = useDispatch();
    const { user, loggedIn } = useSelector((store) => store.auth);
    const [form, setForm] = React.useState<TForm>({ ...user, password: ""});
    const [isSameUserInfo, setIsSameUserInfo] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (loggedIn) {
            setIsSameUserInfo(form.name === user.name && form.email === user.email);
        }
    }, [form.email, form.name, loggedIn, user.name, user.email])

    const inputs: TInput[] = [
        { name: "name", placeholder: "Имя", type: "text"},
        { name: "email", placeholder: "Логин", type: "email"},
        { name: "password", placeholder: "Пароль", type: "password"}
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateUser(form.email, form.name));
    };

    const handleReset = () => {
        setForm({ ...user });
    };
    
    return (
        <div className={styles.profile__form}>
            <Form
                inputs={inputs}
                form={form}
                passwordInput={false}
                buttonText={"Сохранить"}
                reverseInput={false}
                onChange={handleChange}
                onSubmit={handleSubmit}
                icon={"EditIcon"}
                disabled={isSameUserInfo}
            />
            <Button type="secondary" size="large" onClick={() => handleReset()} disabled={isSameUserInfo}>Отмена</Button>
        </div>
    )
}

export default ProfileForm;