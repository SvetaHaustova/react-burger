import styles from './form.module.css';
import { FC } from 'react';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { TFormComponent } from '../../utils/types';

const Form: FC<TFormComponent> = ({
    inputs,
    form,
    icon,
    disabled,
    title,
    buttonText,
    passwordInput,
    reverseInput,
    onChange,
    onSubmit
}) => {
    return (
        <>
            {title && <h2 className={styles.title}>{title}</h2>}
            <form className={styles.form} onSubmit={onSubmit}>
                <div className={reverseInput ? styles.form__reverse : styles.form__container}>
                    { inputs.map((input) => (
                        <Input
                            key={`${input.name}`}
                            name={input.name}
                            placeholder={input.placeholder}
                            type={input.type}
                            value={form[input.name] || ""}
                            onChange={onChange}
                            icon={icon && icon}
                        />
                    ))}
                    {passwordInput && <PasswordInput name={'password'} value={form.password || ""} onChange={onChange} />}
                </div>
                <Button type="primary" size="medium" disabled={disabled}>{buttonText}</Button>
            </form>
        </>
    );
}

export default Form;