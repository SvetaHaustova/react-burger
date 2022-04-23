import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TModalComponent } from '../../utils/types';

const Modal: FC<TModalComponent> = ({ children, header, onClose }) => {
    React.useEffect(() => {
        const closeModalEscape = (e: { key: string; keyCode: number; }) => {
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
                <div className={styles.modal} data-test="modal">
                    <div className={styles.modal__header} data-test="modal-header">
                        <p className="text text_type_main-large">{header}</p>
                        <CloseIcon type="primary" onClick={onClose} />
                    </div>
                    {children}
                </div>
                <ModalOverlay onClose={onClose} />
            </>
        ), document.getElementById('modals') as HTMLElement
    )
}

export default Modal;