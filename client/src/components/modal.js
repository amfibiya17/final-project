/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
// import { useNavigate } from 'react-rsouter-dom';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '50px',
  zIndex: 1000,
  backgroundColor: 'rgba(255, 255, 255, 0.75)',
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

const BUTTON_STYLES = {
  backgroundColor: '#00000051',
  textDecoration: 'none',
  textAlign: 'center',
  color: '#00000085',
  height: '25px',
  fontWeight: '500',
  fontFamily: 'inherit',
  letterSpacing: '0.06em',
  border: 'none',
  cursor: 'pointer',
  marginBottom: '5px',
  marginTop: '10px',
};

function Modal({ open, children, onClose }) {
  // const navigate = useNavigate();
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div nameClass="modal">
          {children}
        </div>
        <button style={BUTTON_STYLES} type="button" data-cy="close-event-added-modal" onClick={onClose}>Close</button>
      </div>
    </>,
    document.getElementById('portal'),
  );
}

export default Modal;
