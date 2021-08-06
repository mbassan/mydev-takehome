import React from 'react';
import PropTypes from 'prop-types';
import ReactSlider from 'react-slider';
import clsx from 'clsx';
import styles from './Slider.module.css';

export default function Slider({
  value,
  step,
  min,
  max,
  disabled,
  onChange,
  onChangeFinished,
}) {
  return (
    <ReactSlider
      value={value}
      min={min}
      max={max}
      className={styles.className}
      thumbClassName={styles.handle}
      thumbActiveClassName={styles.handleActive}
      trackClassName={clsx(styles.track, styles[`track-${value ? value.length : 1}`])}
      onChange={(val) => onChange(val)}
      onAfterChange={() => onChangeFinished(true)}
      disabled={disabled}
      step={step}
    />
  );
}

Slider.defaultProps = {
  value: 0,
  step: 1,
  min: 0,
  max: 100,
  disabled: false,
  onChange: () => {},
};

Slider.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};
