import React from 'react';
import PropTypes from 'prop-types';
import SelectInput from 'ui/components/SelectInput';
import TextInput from 'ui/components/TextInput';
import Button from 'ui/components/Button';
import Icon from 'ui/components/Icon';
import styles from './QueryBuilder.module.css';

export default function FilterRow({
  options,
  filter,
  setFilterValue,
  setFilterType,
  removeFilter,
}) {
  return (
    <div className={styles.filterRow}>
      <SelectInput
        caption="Type"
        placeholder="Select type..."
        display="block"
        data={options}
        onChange={(value) => setFilterType(value)}
      />
      {(filter
      && filter.inputComponent)
        ? filter.inputComponent((value) => setFilterValue(value))
        : (
          <TextInput
            caption="Value"
            placeholder={filter.placeholder || 'Enter value here...'}
            display="block"
            onChange={(e) => setFilterValue(e.target.value)}
          />
        )}
      <Button variant="danger" size="medium" onClick={removeFilter} iconButton>
        <Icon variant="primary" type="trash" />
      </Button>
    </div>
  );
}

FilterRow.defaultProps = {
  options: () => [],
  filter: {},
  setFilterValue: () => {},
  setFilterType: () => {},
  removeFilter: () => {},
};

FilterRow.propTypes = {
  options: PropTypes.array,
  filter: PropTypes.object,
  setFilterValue: PropTypes.func,
  setFilterType: PropTypes.func,
  removeFilter: PropTypes.func,
};
