import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'ui/components/Icon';
import clsx from 'clsx';
import styles from './Filters.module.css';

export default function Filters({
  children,
  show,
  caption,
  className,
  close,
}) {
  return (
    <div className={clsx(styles.filters, className, !show && styles.hide)}>
      <div className={styles.filtersHeader}>
        {caption}
        <Icon className={styles.closeIcon} type="times" variant="secondary" onClick={close} />
      </div>
      <div className={styles.filtersContent}>{children}</div>
    </div>
  );
}

Filters.defaultProps = {
  show: false,
  className: null,
  close: () => {},
};

Filters.propTypes = {
  show: PropTypes.bool,
  className: PropTypes.string,
  close: PropTypes.func,
};
