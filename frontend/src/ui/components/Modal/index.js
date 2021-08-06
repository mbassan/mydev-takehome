import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'ui/components/Icon';
import clsx from 'clsx';
import styles from './Modal.module.css';

export default function Modal({
  children,
  show,
  size,
  caption,
  buttons,
  className,
  close,
}) {
  return (
    <>
      <div className={clsx(styles.modal, styles[size], className, !show && styles.hide)}>
        <div className={styles.modalHeader}>
          {caption}
          <Icon className={styles.closeIcon} type="times" variant="secondary" onClick={close} />
        </div>
        <div className={styles.modalContent}>{children}</div>
        <div className={styles.modalFooter}>{buttons}</div>
      </div>
      <div className={clsx(styles.modalBackdrop, !show && styles.hide)} />
    </>
  );
}

Modal.defaultProps = {
  show: false,
  size: 'medium',
  className: null,
  buttons: [],
  close: () => {},
};

Modal.propTypes = {
  show: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.element),
  close: PropTypes.func,
};
