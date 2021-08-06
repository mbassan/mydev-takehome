import React from 'react';
import Select from 'ui/components/SelectInput';
import countries from './listOfCountries';

export default function CountryPicker({
  value,
  size,
  display,
  hasError,
  disabled,
  multiple,
  onChange,
  onCreate,
  onFocus,
  onBlur,
  placeholder,
}) {
  return (
    <Select
      data={countries}
      value={value}
      placeholder={placeholder || 'Select country...'}
      display={display}
      size={size}
      hasError={hasError}
      disabled={disabled}
      multiple={multiple}
      onChange={onChange}
      onCreate={onCreate}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}
