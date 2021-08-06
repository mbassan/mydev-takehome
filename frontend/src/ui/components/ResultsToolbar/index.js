import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SelectInput from 'ui/components/SelectInput';
import Pagination from 'ui/components/Pagination';
import Card from 'ui/components/Card';
import styles from './ResultsToolbar.module.css';

export default function ResultsToolbar({
  className,
  perPage,
  perPageOptions,
  perPageLabel,
  page,
  totalPages,
  maxPages,
  setPage,
  setPerPage,
  buttons,
  size,
}) {
  return (
    <Card className={clsx(styles.resultsToolbarContainer, className)}>
      <div className={styles.perPageContainer}>
        <div className={styles.perPageLabel}>
          {perPageLabel}
        </div>
        <div className={styles.perPageSelect}>
          <SelectInput
            size={size}
            value={perPage ? { value: perPage, label: perPage } : null}
            data={perPageOptions.map((item) => ({ value: item, label: item }))}
            onChange={setPerPage}
            className={styles[`select-${size}`]}
            clearable={false}
          />
        </div>
      </div>
      <Pagination
        className={styles.pagination}
        page={page}
        totalPages={totalPages}
        maxPages={maxPages}
        setPage={setPage}
      />
      <div className={styles.buttons}>{buttons}</div>
    </Card>
  );
}

ResultsToolbar.defaultProps = {
  className: '',
  page: 1,
  perPage: 30,
  perPageOptions: [15, 30, 50],
  perPageLabel: 'Results per page',
  totalPages: 1,
  maxPages: 5,
  setPage: () => {},
  setPerPage: () => {},
  buttons: [],
  size: 'small',
};

ResultsToolbar.propTypes = {
  className: PropTypes.string,
  page: PropTypes.number,
  perPage: PropTypes.number,
  perPageOptions: PropTypes.arrayOf(PropTypes.number),
  perPageLabel: PropTypes.string,
  totalPages: PropTypes.number,
  maxPages: PropTypes.number,
  setPage: PropTypes.func,
  setPerPage: PropTypes.func,
  buttons: PropTypes.arrayOf(PropTypes.element),
  size: PropTypes.oneOf(['small', 'medium']),
};
