import React from 'react';
import PropTypes from 'prop-types';
import Card from 'ui/components/Card';
import clsx from 'clsx';
import styles from './Panel.module.css';

export default function Panel({
  title,
  className,
  headerElems,
  children,
  noHeader,
}) {
  return (
    <Card className={clsx(styles.panelWrapper, className)}>
      {!noHeader
        ? (
          <div className={styles.panelHead}>
            <div className={styles.panelTitle}>
              {title}
            </div>
            <div className={styles.panelButtons}>
              {headerElems}
            </div>
          </div>
          )
        : ''}
      <div className={styles.panelContainer}>
        {children}
      </div>
    </Card>
  );
}

Panel.defaultProps = {
  title: '',
  className: null,
  headerElems: [],
  noHeader: false,
};

Panel.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  headerElems: PropTypes.arrayOf(PropTypes.element),
  noHeader: PropTypes.bool,
};
