import React from 'react';
import PropTypes from 'prop-types';
import Card from 'ui/components/Card';
import Table from 'ui/components/Table';
import Pagination from 'ui/components/Pagination';
import clsx from 'clsx';
import styles from './List.module.css';

export default function List({
  title,
  className,
  listItems,
  cols,
  headerElems,
  emptyMessage,
  selectable,
  showTableHeader,
  onSelectRow,
  onRowClick,
  scrollable,
  page,
  totalPages,
  maxPages,
  setPage,
}) {
  return (
    <Card className={clsx(styles.listWrapper, className)}>
      <div className={styles.listHead}>
        <div className={styles.listTitle}>
          {title}
        </div>
        {page && (
          <Pagination
            className={styles.listPagination}
            page={page}
            totalPages={totalPages}
            maxPages={maxPages}
            setPage={setPage}
          />
        )}
        <div className={styles.listButtons}>
          {headerElems}
        </div>
      </div>
      <Table
        className={styles.listTable}
        data={listItems}
        emptyMessage={emptyMessage}
        cols={cols}
        selectable={selectable}
        scrollable={scrollable}
        showHeader={showTableHeader}
        onSelectRow={onSelectRow}
        onRowClick={onRowClick}
      />
    </Card>
  );
}

List.defaultProps = {
  title: '',
  className: null,
  headerElems: [],
  showTableHeader: true,
  listItems: [],
  cols: {},
  emptyMessage: '',
  selectable: false,
  onSelectRow: () => {},
  onRowClick: null,
  scrollable: false,
  page: 1,
  totalPages: 1,
  maxPages: 5,
  setPage: () => {},
};

List.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  headerElems: PropTypes.arrayOf(PropTypes.element),
  showTableHeader: PropTypes.bool,
  listItems: PropTypes.arrayOf(PropTypes.object),
  cols: PropTypes.arrayOf(PropTypes.object),
  emptyMessage: PropTypes.string,
  selectable: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onRowClick: PropTypes.func,
  scrollable: PropTypes.bool,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  maxPages: PropTypes.number,
  setPage: PropTypes.func,
};
