import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Form.module.css';

export default function Form({
  className,
  children,
}) {
  return (
    <div className={clsx(styles.form, className)}>
      {children}
    </div>
  );
}

Form.defaultProps = {
  className: '',
};

Form.propTypes = {
  className: PropTypes.string,
};
