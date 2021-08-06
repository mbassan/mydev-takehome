import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Table.module.css';

export default function Table({
  className,
  showHeader,
  data,
  cols,
  emptyMessage,
  selectable,
  onSelectRow,
  onRowClick,
  scrollable,
  variant,
}) {
  const [allSelected, setAllSelected] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);

  function selectAll() {
    setAllSelected(!allSelected);
    const all = !allSelected ? data : [];
    setSelectedRows(all);
    onSelectRow(all);
  }

  function selectRow(row) {
    const rowIsSelected = selectedRows.indexOf(row) >= 0;
    let newSelection = [...selectedRows];
    if (!rowIsSelected) {
      newSelection.push(row);
    } else {
      newSelection = newSelection.filter((currRow) => currRow !== row);
    }

    setAllSelected(false);
    setSelectedRows(newSelection);
    onSelectRow(newSelection);
  }

  function header() {
    if (!showHeader) {
      return '';
    }

    return (
      <thead>
        <tr>
          {selectable && data.length > 0
            && (
              <th className={styles.tableSelect}>
                <input type="checkbox" onChange={() => selectAll()} checked={allSelected} />
              </th>
              )}
          {cols.map((col, i) => <th className={styles[col.align]} key={i}>{col.label}</th>)}
        </tr>
      </thead>
    );
  }

  function rows() {
    if (data.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan={cols.length}>
              {emptyMessage}
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className={clsx(typeof onRowClick === 'function' && styles.clickable)}>
            {selectable
              ? (
                <td className={styles.tableSelect}>
                  <input type="checkbox" onChange={() => selectRow(row)} checked={selectedRows.indexOf(row) >= 0} />
                </td>
                )
              : ''}
            {cols.map((col, j) => (
              <td
                role="presentation"
                onClick={() => (typeof onRowClick === 'function' ? onRowClick(row) : false)}
                key={j}
                className={styles[col.align]}
              >
                {col.render ? col.render(row) : row[col.name]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  return (
    <div className={clsx(styles.tableContainer, scrollable && styles.scrollable)}>
      <table className={clsx(styles.table, styles[variant], className)}>
        {header()}
        {rows()}
      </table>
    </div>
  );
}

Table.defaultProps = {
  className: null,
  showHeader: true,
  data: [],
  cols: {},
  emptyMessage: '',
  selectable: false,
  onSelectRow: () => {},
  onRowClick: null,
  scrollable: false,
  variant: 'normal',
};

Table.propTypes = {
  className: PropTypes.string,
  showHeader: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
  cols: PropTypes.arrayOf(PropTypes.object),
  emptyMessage: PropTypes.string,
  selectable: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onRowClick: PropTypes.func,
  scrollable: PropTypes.bool,
  variant: PropTypes.oneOf(['normal', 'normal-header', 'spaced']),
};
