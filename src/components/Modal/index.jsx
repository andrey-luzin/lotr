import React, { useEffect } from 'react';

import './Modal.scss';

const Modal = ({ onRequestClose, children = null }) => {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.keyCode === 27) {
        onRequestClose();
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "visible";
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  return (
    <div className="modal">
      <div className="modal__overlay" />
      <button
        className="modal__close"
        onClick={onRequestClose}
        title="Закрыть"
      />
      <div className="modal__container">
        {children}
      </div>
    </div>
  );
};

export default Modal;