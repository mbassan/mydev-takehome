import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './StatusIndicator.module.css';

export default function StatusIndicator({
  status,
  noText,
  className,
}) {
  return (
    <div className={clsx(styles.statusIndicatorContainer, styles[`status-${status}`], className)}>
      <div className={styles.statusIndicator} />
      {!noText ? status : ''}
    </div>
  );
}

StatusIndicator.defaultProps = {
  status: 'pending',
  noText: false,
  className: '',
};

StatusIndicator.propTypes = {
  status: PropTypes.oneOf([
    'pending',
    'running',
    'error',
    'done',
    'stopped',
    'open',
    'pending',
    'complete',
    'high',
    'medium',
    'low',
  ]),
  noText: PropTypes.bool,
  className: PropTypes.string,
};
