const sizes = {
  medium: {
    containerHeight: '34px',
    innerHeight: '31px',
    padding: '0 0 0 10px',
    indicatorMarginTop: '-1px',
    separator: 'block',
    indicatorContainerPadding: '8px',
  },
  small: {
    containerHeight: '26px',
    innerHeight: '23px',
    padding: '0 0 0 10px',
    indicatorMarginTop: '-1px',
    separator: 'none',
    indicatorContainerPadding: '0',
  },
};

export default function setStyles(size, display, hasError) {
  return {
    container: (provided, { isFocused }) => ({
      ...provided,
      position: 'relative',
      boxSizing: 'border-box',
      boxShadow: isFocused
        ? `0px 0px 3px 0px ${hasError ? 'rgb(var(--danger-color))' : 'var(--highlight-color)'}`
        : 'inset 0 1px 2px 0 rgba(var(--txt-color), 0.15)',
      borderRadius: '3px',
      border: hasError
        ? '1px solid rgb(var(--danger-color))'
        : '1px solid rgba(var(--txt-color), 0.15)',
      backgroundColor: 'rgb(var(--bg-color))',
      display: display === 'inline' ? 'inline-block' : 'block',
      height: sizes[size].containerHeight,
      ':hover': {
        border: `1px solid ${hasError ? 'rgb(var(--danger-color))' : 'var(--highlight-color)'}`,
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      minHeight: sizes[size].innerHeight,
      padding: sizes[size].padding,
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: 'transparent',
      border: 'none !important',
      color: 'rgb(var(--txt-color))',
      boxShadow: 'none !important',
      minHeight: sizes[size].innerHeight,
      top: '1px',
      ':hover': {
        border: 'none !important',
      },
    }),
    option: (provided, { isSelected, isFocused }) => ({
      ...provided,
      backgroundColor: (isFocused || isSelected)
        ? 'rgb(var(--primary-color)) !important'
        : 'rgb(var(--bg-color))',
      color: (isFocused || isSelected)
        ? 'rgb(var(--bg-color)) !important'
        : 'rgb(var(--txt-color))',
      ':hover': {
        backgroundColor: 'var(--highlight-color) !important',
        color: 'rgb(var(--bg-color)) !important',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'var(--txt-color) !important',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: 'var(--highlight-color) !important',
      color: 'rgb(var(--bg-color)) !important',
      ':hover': {
        opacity: '0.8',
      },
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'rgb(var(--bg-color)) !important',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'var(--highlight-color) !important',
        color: 'rgb(var(--bg-color)) !important',
      },
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: sizes[size].innerHeight,
      marginTop: '-1px',
    }),
    indicatorContainer: (provided) => ({
      ...provided,
      height: sizes[size].innerHeight,
      padding: sizes[size].indicatorContainerPadding,
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: sizes[size].separator,
    }),
    placeholder: (provided) => ({
      ...provided,
      fontWeight: '300',
      top: '56% !important',
      color: 'rgba(var(--txt-color), 0.7) !important',
      opacity: '0.7',
    }),
    input: (provided) => ({
      ...provided,
      backgroundColor: 'transparent !important',
      border: '1px transparent !important',
      boxShadow: 'none !important',
      mozBoxShadow: 'none !important',
      webkitBoxShadow: 'none !important',
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };
}
