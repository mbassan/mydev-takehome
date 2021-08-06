import React from 'react';
import Pagination from 'ui/components/Pagination';
import clsx from 'clsx';
import styles from './Tabs.module.css';

export default function TabPagination({
  name,
  selected,
  page,
  totalPages,
  maxPages,
  setPage,
}) {
  return (
    <Pagination
      page={page}
      totalPages={totalPages}
      maxPages={maxPages}
      setPage={setPage}
      className={clsx(styles.pagination, selected && styles.paginationSelected)}
    />
  );
}