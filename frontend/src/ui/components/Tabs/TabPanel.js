import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Tabs.module.css';

export default function TabPanel({
  name,
  selected,
  selectClass,
  className,
  variant,
  children,
}) {
  return (
    <div
      data-name={name}
      className={clsx(
        styles.tabPanel,
        selected && styles.tabPanelSelected,
        styles[`transition-${selectClass}`],
        className,
        styles[variant],
      )}
    >
      {children}
    </div>
  );
}

TabPanel.defaultProps = {
  className: '',
  selected: false,
  selectClass: 'left',
};

TabPanel.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  selectClass: PropTypes.string,
  className: PropTypes.string,
};
