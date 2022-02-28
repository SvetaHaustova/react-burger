import styles from './form.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function Form({ inputs, form, title, buttonText, passwordInput, reverseInput, onChange, onSubmit }) {
    return (
        <>
            <h2 className={styles.title}>{title}</h2>
            <form className={styles.form} onSubmit={onSubmit}>
                <div className={reverseInput ? styles.form__reverse : styles.form__container}>
                    { inputs.map((input) => (
                        <Input
                            key={`${input.name}`}
                            name={input.name}
                            placeholder={input.placeholder}
                            type={input.type}
                            value={form[input.name]}
                            onChange={onChange}
                            error={false}
                            errorText={'Ошибка'}
                        />
                    ))}
                    {passwordInput && <PasswordInput name={'password'} value={form.password} onChange={onChange} />}
                </div>
                <Button type="primary" size="medium">{buttonText}</Button>
            </form>
        </>
    );
}

export default Form;