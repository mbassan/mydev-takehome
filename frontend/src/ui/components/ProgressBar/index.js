import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './ProgressBar.module.css';

export default function ProgressBar({
  variant,
  percent,
  className,
}) {
  return (
    <div className={clsx(styles.outer, className)}>
      <div className={clsx(styles.tick, styles.tickTop, styles[variant])} style={{ left: `${percent}%` }} />
      <div className={clsx(styles.tick, styles.tickBottom, styles[variant])} style={{ left: `${percent}%` }} />
      <dic className={clsx(styles.inner, styles[variant])} style={{ width: `${percent}%` }} />
    </div>
  );
}

ProgressBar.defaultProps = {
  variant: 'default',
  percent: 0,
  className: '',
};

ProgressBar.propTypes = {
  variant: PropTypes.oneOf(['primary', 'success', 'warning', 'danger', 'default']),
  percent: PropTypes.number,
  className: PropTypes.string,
};
