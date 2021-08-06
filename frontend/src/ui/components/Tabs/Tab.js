import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Tabs.module.css';

export default function Tab({
  caption,
  name,
  variant,
  selected,
  selectClass,
  disabled,
  onClick,
}) {
  return (
    <div
      role="presentation"
      className={clsx(
        styles.tab,
        selected && styles.selected,
        disabled && styles.disabled,
        styles[`transition-${selectClass}`],
        styles[variant],
      )}
      onClick={onClick}
      data-name={name}
    >
      {caption}
    </div>
  );
}

Tab.defaultProps = {
  variant: 'default',
  selected: false,
  selectClass: 'left',
  disabled: false,
  onClick: () => {},
};

Tab.propTypes = {
  caption: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['default', 'panel']),
  selected: PropTypes.bool,
  selectClass: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
