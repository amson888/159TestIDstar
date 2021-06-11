import React from 'react';
import PropTypes from 'prop-types';
import styles from "./ErrorBox.module.css";

const ErrorBox = ({ message, style = {} }) => {
  return (
      <div className={styles['error-box']} style={style}>
        {message}
      </div>
  );
};

ErrorBox.propTypes = {
  message: PropTypes.oneOf([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  style: PropTypes.object
};

export default ErrorBox;
