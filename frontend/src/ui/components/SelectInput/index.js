import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import clsx from 'clsx';
import setStyles from './style';
import styles from './SelectInput.module.css';

export default function SelectInput({
  value,
  size,
  display,
  placeholder,
  data,
  hasError,
  disabled,
  multiple,
  creatable,
  clearable,
  className,
  inputClassName,
  onChange,
  onCreate,
  onFocus,
  onBlur,
}) {
  function onChangeHandler(e) {
    if (!e) {
      onChange(!multiple ? null : []);
      return false;
    }
    return onChange(!(e instanceof Array) ? e.value : e.map((v) => v));
  }

  function onCreateHandler(e) {
    if (!creatable) {
      return false;
    }
    return onCreate(e);
  }

  function showValue() {
    if (typeof value === 'string' && !multiple) {
      return data.find((option) => option.value === value);
    }
    if (value instanceof Array && typeof value[0] === 'string' && multiple) {
      return data.filter((option) => value.indexOf(option.value) >= 0);
    }
    return value;
  }

  const selectElem = creatable ? <CreatableSelect /> : <Select />;
  return (
    <div className={clsx(styles.selectWrapper, styles[display], className)}>
      <selectElem.type
        value={showValue()}
        options={data}
        onChange={onChangeHandler}
        onFocus={onFocus}
        onBlur={onBlur}
        onCreateOption={onCreateHandler}
        onKeyDown={(e) => console.log(e.key)}
        clearValue={onCreateHandler}
        placeholder={placeholder}
        isDisabled={disabled}
        isClearable={size !== 'small' ? clearable : false}
        isMulti={multiple}
        menuPosition="fixed"
        menuPlacement="bottom"
        menuPortalTarget={document.body}
        styles={setStyles(size, display, hasError)}
        className={inputClassName}
      />
    </div>
  );
}

SelectInput.defaultProps = {
  data: null,
  size: 'medium',
  display: 'block',
  hasError: false,
  disabled: false,
  multiple: false,
  creatable: false,
  clearable: true,
  className: '',
  inputClassName: '',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
};

SelectInput.propTypes = {
  size: PropTypes.oneOf('small', 'medium', 'large'),
  display: PropTypes.oneOf(['inline', 'block']),
  data: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.object)]),
  hasError: PropTypes.bool,
  disabled: PropTypes.bool,
  creatable: PropTypes.bool,
  clearable: PropTypes.bool,
  multiple: PropTypes.bool,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};
