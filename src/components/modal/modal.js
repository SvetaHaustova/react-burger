import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function Modal({ children, onClose, header }) {
    
    React.useEffect(() => {
        const closeModal = (e) => {
            if (e.key === 'Escape' || e.keyCode === 27) {
                onClose();
            }
        }
        document.addEventListener('keydown', closeModal);
        return () => {
            document.removeEventListener('keydown', closeModal);
        };
    }, [onClose])

    return ReactDOM.createPortal(
        (
            <div className={styles.modal}>
                <div className={styles.modal__header}>
                    <p className="text text_type_main-large">{header}</p>
                    <CloseIcon type="primary" onClick={onClose} />
                </div>
                <div>
                    {children}
                </div>
            </div>
        ), document.getElementById('modals')
    )
}

Modal.propTypes = {
    children: PropTypes.element,
    onClose: PropTypes.func.isRequired,
    header: PropTypes.string,
};

export default Modal;