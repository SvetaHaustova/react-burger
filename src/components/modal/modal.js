import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function Modal({ children, header, onClose }) {
    React.useEffect(() => {
        const closeModalEscape = (e) => {
            if (e.key === 'Escape' || e.keyCode === 27) {
                onClose();
            }
        }
        document.addEventListener('keydown', closeModalEscape);
        return () => {
            document.removeEventListener('keydown', closeModalEscape);
        };
    }, [onClose])

    return ReactDOM.createPortal(
        (
            <>
                <div className={styles.modal}>
                    <div className={styles.modal__header}>
                        <p className="text text_type_main-large">{header}</p>
                        <CloseIcon type="primary" onClick={onClose} />
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
                <ModalOverlay onClose={onClose} />
            </>
        ), document.getElementById('modals')
    )
}

Modal.propTypes = {
    children: PropTypes.element,
    header: PropTypes.string,
    onClose: PropTypes.func.isRequired
};

export default Modal;