import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './NotificationBadge.module.css';

export default function NotificationBadge({
  number,
  children,
  variant,
  className,
}) {
  return (
    <div className={clsx(styles.notificationBadgeContainer, className)}>
      <div className={clsx(styles[variant], number > 0 ? styles.number : styles.hide)}>{number}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

NotificationBadge.defaultProps = {
  number: 0,
  variant: 'danger',
  className: null,
};

NotificationBadge.propTypes = {
  number: PropTypes.number,
  variant: PropTypes.oneOf(['success', 'warning', 'danger']),
  className: PropTypes.string,
};
