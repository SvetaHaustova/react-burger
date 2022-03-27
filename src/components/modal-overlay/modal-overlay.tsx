import styles from './modal-overlay.module.css';
import { FC } from 'react';
import { TModalOverlayComponent } from '../../utils/types';

const ModalOverlay: FC<TModalOverlayComponent> = ({ onClose }) => {
    return (
        <div className={styles.overlay} onClick={onClose}>
        </div>
    )
}

export default ModalOverlay;