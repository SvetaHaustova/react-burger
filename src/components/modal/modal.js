import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { closeIngredient, closeOrder } from '../../services/actions/index';

function Modal({ children, header }) {
    const dispatch = useDispatch();

    const closeModal = React.useCallback(() => {
        dispatch(closeIngredient());
        dispatch(closeOrder());
    }, [dispatch]);

    React.useEffect(() => {
        const closeModalEscape = (e) => {
            if (e.key === 'Escape' || e.keyCode === 27) {
                closeModal();
            }
        }
        document.addEventListener('keydown', closeModalEscape);
        return () => {
            document.removeEventListener('keydown', closeModalEscape);
        };
    }, [closeModal])

    return ReactDOM.createPortal(
        (
            <>
                <div className={styles.modal}>
                    <div className={styles.modal__header}>
                        <p className="text text_type_main-large">{header}</p>
                        <CloseIcon type="primary" onClick={closeModal} />
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
                <ModalOverlay onClose={closeModal} />
            </>
        ), document.getElementById('modals')
    )
}

Modal.propTypes = {
    children: PropTypes.element,
    header: PropTypes.string,
};

export default Modal;