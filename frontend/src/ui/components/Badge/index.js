import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Badge.module.css';

export default function Badge({
  status,
  children,
}) {
  return (
    <div className={clsx(styles.badgeContainer, styles[`status-${status}`])}>
      <div className={styles.bg} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}

Badge.defaultProps = {
  status: 'default',
};

Badge.propTypes = {
  status: PropTypes.oneOf(['pending', 'running', 'done', 'stopped', 'high', 'medium', 'low', 'default']),
};
