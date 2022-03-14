import styles from './profile-form.module.css';
import React from 'react';
import Form from '../../components/form/form';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../services/actions/auth';

function ProfileForm() {
    const dispatch = useDispatch();
    const { user, loggedIn } = useSelector(store => store.auth);
    const [form, setForm] = React.useState({ ...user, password: ""});
    const [isSameUserInfo, setIsSameUserInfo] = React.useState(false);

    React.useEffect(() => {
        if (loggedIn) {
            setIsSameUserInfo(form.name === user.name && form.email === user.email);
        }
    }, [form.email, form.name, loggedIn, user.email, user.name])

    const inputs = [
        { name: "name", placeholder: "Имя", type: "text"},
        { name: "email", placeholder: "Логин", type: "email"},
        { name: "password", placeholder: "Пароль", type: "password"}
    ];

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
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
                icon="EditIcon"
                disabled={isSameUserInfo}
            />
            <Button type="secondary" size="large" onClick={() => handleReset()} disabled={isSameUserInfo}>Отмена</Button>
        </div>
    )
}

export default ProfileForm;