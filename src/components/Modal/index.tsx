import React from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  message: string;
  img?: string;
  onClose: () => void;
}
const Modal: React.FC<ModalProps> = ({ message, img, onClose }) => {
  return (
    <div className={styles.modalLayout} onClick={onClose}>
      <div className={styles.modal}>
        <span className={styles.closeButton} onClick={onClose}>
          &times;
        </span>
        <div className={styles.modalContent}>
          <img className={styles.modalImage} src={img} alt="modalImg" />
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
