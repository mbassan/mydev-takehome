import React from 'react';
import PropTypes from 'prop-types';
import Button from 'ui/components/Button';
import clsx from 'clsx';
import styles from './ComboButton.module.css';

export default function ComboButton({
  className,
  value, // pass an array to select multiple values, a string/number/bool to select one
  data, // options
  variant,
  onChange,
}) {
  function isSelected(option) {
    if (value instanceof Array) {
      return value.indexOf(option.value) >= 0;
    }
    return option.value === value;
  }

  return (
    <div className={clsx(styles.comboButtonContainer, className)}>
      {data.map((option, i) => (
        <Button
          variant={isSelected(option) ? variant : 'default'}
          className={clsx(styles.button, !isSelected(option) && styles.inactive)}
          display="inline"
          onClick={() => onChange(option.value)}
          key={i}
        >
          {option.label || option.value}
        </Button>
      ))}
    </div>
  );
}

ComboButton.defaultProps = {
  value: '',
  data: [],
  className: '',
  variant: 'secondary',
  onChange: () => {},
};

ComboButton.propTypes = {
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number, PropTypes.bool]),
  data: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  variant: PropTypes.string,
  onChange: PropTypes.func,
};
