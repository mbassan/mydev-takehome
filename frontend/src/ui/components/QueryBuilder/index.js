import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'ui/components/Icon';
import Button from 'ui/components/Button';
import Modal from 'ui/components/Modal';
import FilterRow from './FilterRow';
import styles from './QueryBuilder.module.css';

export default function QueryBuilders({
  onChange,
  queryFilters,
  valueDelimiter = ':',
}) {
  console.log(queryFilters);
  const [isOpen, setIsOpen] = React.useState(false);
  const [filters, setFilters] = React.useState([]);
  const [currentQuery, setCurrentQuery] = React.useState('');

  function newFilter() {
    setFilters([...filters, {}]);
  }

  function setFilterValue(index, value) {
    console.log(value);
    const newArr = [...filters];
    newArr[index].value = value;
    setFilters(newArr);
  }

  function setFilterType(index, type) {
    const newArr = [...filters];
    const filterType = queryFilters.filter((itm) => itm.value === type);
    if (filterType && filterType.length > 0) {
      newArr[index] = { ...filterType[0] };
      newArr[index].type = type;
      setFilters(newArr);
    }
  }

  function onSave() {
    const query = filters.map((filter) => `${filter.type}${valueDelimiter}${filter.value}`).join(' ');
    onChange(query);
    setCurrentQuery(query);
    setIsOpen(false);
  }

  function removeFilter(index) {
    setFilters([...filters.slice(0, index), ...filters.slice(index + 1)]);
  }

  return (
    <>
      <div className={styles.filterDisplay}>
        <div className={styles.query}>
          Query:
          {currentQuery}
        </div>
        <Button onClick={() => setIsOpen(true)}>Edit filter</Button>
      </div>
      <Modal
        caption="Query Builder"
        show={isOpen}
        close={() => setIsOpen(false)}
        buttons={[
          <Button variant="secondary" size="medium" onClick={() => setIsOpen(false)} key={1}>
            <Icon variant="secondary" type="submit" />
            Cancel
          </Button>,
          <Button variant="primary" size="medium" onClick={onSave} key={2}>
            <Icon variant="primary" type="submit" />
            Save
          </Button>]}
      >
        <div className={styles['content-modal-testing']}>
          {
            filters.map((filter, index) => (
              <FilterRow
                options={queryFilters}
                filter={filter}
                setFilterValue={setFilterValue.bind(null, index)}
                setFilterType={setFilterType.bind(null, index)}
                removeFilter={removeFilter.bind(null, index)}
              />
            ))
          }
          <div className={styles.addButtonContainer}>
            <Button variant="primary" size="medium" onClick={newFilter} key={1}>
              <Icon variant="primary" type="plus" />
              Add
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

QueryBuilders.defaultProps = {
  onChange: () => {},
  queryFilters: [],
  valueDelimiter: ':',
};

QueryBuilders.propTypes = {
  onChange: PropTypes.func,
  queryFilters: PropTypes.array,
  valueDelimiter: PropTypes.string,
};
