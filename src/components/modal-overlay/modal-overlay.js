import ReactDOM from 'react-dom';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({ onClose }) {
    return ReactDOM.createPortal(
        (
            <div className={styles.overlay} onClick={onClose}>
            </div>
        ), document.getElementById('modals')
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;