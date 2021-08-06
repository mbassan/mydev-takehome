import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Avatar.module.css';

export default function Avatar({
  size,
  children,
  className,
  onClick,
}) {
  return <span className={clsx(styles.avatar, styles[size], className)} type="button" onClick={onClick} role="presentation">{children}</span>;
}

Avatar.defaultProps = {
  size: 'medium',
  className: '',
  onClick: () => {},
};

Avatar.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
  className: PropTypes.string,
};
