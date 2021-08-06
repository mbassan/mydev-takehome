import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { dateFormat } from 'ui/utilities/constants';
import ReactDatepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePicker.module.css';
import './override.css';

export default function DatePicker({
  timestamp, // selected timestamp (use always)
  rangeStartTimestamp, // use for range
  rangeEndTimestamp, // use for range
  minTimestamp, // use for range (to limit)
  selectsStart,
  selectsEnd,
  showTimeSelect,
  textInput,
  disabled,
  onChange,
  placement,
}) {
  function handleChange(value) {
    onChange(value);
  }

  function dateStringConvert(format) {
    return format.replace(/D/g, 'd').replace(/Y/g, 'y');
  }

  return (
    <ReactDatepicker
      selected={timestamp || null}
      startDate={rangeStartTimestamp || null}
      endDate={rangeEndTimestamp || null}
      minDate={minTimestamp || null}
      disabled={disabled}
      selectsStart={selectsStart}
      selectsEnd={selectsEnd}
      showTimeSelect={showTimeSelect}
      customInput={textInput}
      onChange={handleChange}
      popperClassName={styles.popper}
      calendarClassName={styles.calendar}
      wrapperClassName={styles.wrapper}
      className={styles.className}
      timeClassName={styles.time}
      popperContainer={({ children }) => createPortal(children, document.body)}
      popperPlacement={placement}
      dateFormat={dateStringConvert(dateFormat.date + (showTimeSelect ? ` ${dateFormat.time}` : ''))}
    />
  );
}

DatePicker.defaultProps = {
  timestamp: 0,
  rangeStartTimestamp: 0,
  rangeEndTimestamp: 0,
  minTimestamp: 0,
  selectsStart: false,
  selectsEnd: false,
  disabled: false,
  showTimeSelect: false,
  textInput: null,
  onChange: () => {},
  placement: 'bottom',
};

DatePicker.propTypes = {
  timestamp: PropTypes.number,
  rangeStartTimestamp: PropTypes.number,
  rangeEndTimestamp: PropTypes.number,
  minTimestamp: PropTypes.number,
  textInput: PropTypes.element,
  onChange: PropTypes.func,
  selectsStart: PropTypes.bool,
  selectsEnd: PropTypes.bool,
  disabled: PropTypes.bool,
  showTimeSelect: PropTypes.bool,
  placement: PropTypes.string,
};
