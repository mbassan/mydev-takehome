import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './FormItem.module.css';

export default function FormItem({
  caption,
  children,
  className,
  errorMessage,
  colSpan,
}) {
  return (
    <div className={clsx(styles.formItem, className)} style={{ gridColumn: `span ${colSpan}` }}>
      <div className={styles.caption}>{caption}</div>
      <div className={styles.inputWrapper}>
        {children}
      </div>
      <div className={styles.errorMessage}>{errorMessage && errorMessage.msg}</div>
    </div>
  );
}

FormItem.defaultProps = {
  caption: '',
  className: '',
  errorMessage: '',
  colSpan: 1,
};

FormItem.propTypes = {
  caption: PropTypes.string,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  colSpan: PropTypes.number,
};
