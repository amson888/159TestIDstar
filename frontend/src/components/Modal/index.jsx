import React from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css';

const Modal = ({open, children}) => {
  const modalClass = `${style.modal} ${open ? style.open : ''}`.trim();
  
  return (
      <div className={modalClass}>
        <div className={style.inner}>
          {children}
        </div>
      </div>
  );
};

Modal.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
