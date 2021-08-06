import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Icon from 'ui/components/Icon';
import styles from './Pagination.module.css';

export default function Pagination({
  className,
  page,
  totalPages,
  maxPages,
  setPage,
  size,
}) {
  function getStart() {
    return Math.max(Math.max(page + Math.floor(maxPages / 2), totalPages) - maxPages, 1);
  }

  function getLength() {
    return Math.min(totalPages - getStart() + 1, maxPages);
  }

  function getPages() {
    return Array(getLength()).fill(getStart()).map((x, y) => x + y);
  }

  if (totalPages <= 1) {
    return false;
  }

  return (
    <div className={clsx(styles.paginationContainer, styles[size], className)}>
      <div
        className={clsx(styles.page, styles.arrow, page === 1 && styles.inactive)}
        onClick={() => setPage(Math.max(page - 1, 1))}
        role="presentation"
      >
        <Icon type="angle-left" />
      </div>
      {getPages().map((p, i) => (
        <div
          className={clsx(styles.page, p === page && styles.selected)}
          onClick={() => setPage(p)}
          role="presentation"
          key={i}
        >
          {p}
        </div>
      ))}
      <div
        className={clsx(styles.page, styles.arrow, page === totalPages && styles.inactive)}
        onClick={() => setPage(Math.min(page + 1, totalPages))}
        role="presentation"
      >
        <Icon type="angle-right" />
      </div>
    </div>
  );
}

Pagination.defaultProps = {
  className: '',
  page: 1,
  totalPages: 1,
  maxPages: 5,
  setPage: () => {},
  size: 'small',
};

Pagination.propTypes = {
  className: PropTypes.string,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  maxPages: PropTypes.number,
  setPage: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};
