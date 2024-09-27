// Modal.js
import React from 'react';
import './Modal.scss'; // Add styles for the modal

const Modal = ({ isOpen, onClose, children, height }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ height: height || 'auto' }}>
        <button className="close-button" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
