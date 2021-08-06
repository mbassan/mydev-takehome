import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Popover.module.css';

export default function Popover({
  children,
  show,
  setShow,
  position,
  className,
}) {
  const ref = React.createRef(null);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!loaded && show) {
      setLoaded(true);
    }

    function handleClickOutside(event) {
        if (ref.current && !ref.current.parentElement.contains(event.target) && show) {
            setShow(false);
        }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [
    ref,
    loaded,
    show,
    setShow,
  ]);

  return (
    <div
      ref={ref}
      className={clsx(styles.popover, className, (!loaded) && styles.hide, show ? styles.in : styles.out, styles[position])}
    >
      {children}
    </div>
  );
}

Popover.defaultProps = {
  position: 'left',
  className: '',
};

Popover.propTypes = {
  position: PropTypes.oneOf([
    'right',
    'left',
    'center',
  ]),
  className: PropTypes.string,
};
