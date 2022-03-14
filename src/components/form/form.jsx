import styles from './form.module.css';
import PropTypes from 'prop-types';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function Form({ inputs, form, icon, disabled, title, buttonText, passwordInput, reverseInput, onChange, onSubmit }) {
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
                    {passwordInput && <PasswordInput name={'password'} value={form.password} onChange={onChange} />}
                </div>
                <Button type="primary" size="medium" disabled={disabled}>{buttonText}</Button>
            </form>
        </>
    );
}

Form.propTypes = {
    inputs: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
    form: PropTypes.objectOf(PropTypes.string).isRequired,
    icon: PropTypes.string,
    disabled: PropTypes.bool,
    title: PropTypes.string,
    buttonText: PropTypes.string.isRequired,
    passwordInput: PropTypes.bool.isRequired,
    reverseInput: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default Form;