/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
// import { useNavigate } from 'react-rsouter-dom';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 1000,
};

function Modal({ open, children, onClose }) {
  // const navigate = useNavigate();
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button type="button" data-cy="close-event-added-modal" onClick={onClose}>Close</button>
        {children}
      </div>
    </>,
    document.getElementById('portal'),
  );
}

export default Modal;
