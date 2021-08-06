import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'ui/components/Icon';
import clsx from 'clsx';
import styles from './MapInfoBox.module.css';

export default function MapInfoBox({
  show,
  setShow,
  topPixels,
  leftPixels,
  className,
  children,
}) {
  const id = `info-box-${Math.floor(Math.random() * 99999) + 1}`;
  const [offsetX, setOffsetX] = React.useState(0);
  const [offsetY, setOffsetY] = React.useState(0);

  React.useEffect(() => {
    function setBoxLocation() {
      const boxWidth = document.getElementById(id).offsetWidth;
      const boxHeight = document.getElementById(id).offsetHeight;
      let oX = (boxWidth / 2) * -1;
      let oY = 0;

      if (leftPixels + boxWidth > window.innerWidth) {
        oX = boxWidth * -1;
      }
      if (leftPixels - boxWidth < 0) {
        oX = 0;
      }
      if (topPixels + boxHeight > window.innerHeight) {
        oY = boxHeight * -1;
      }
      setOffsetX(oX);
      setOffsetY(oY);
    }
    setBoxLocation();
  }, [id, topPixels, leftPixels]);

  return (
    <div
      className={clsx(styles.boxContainer, className, show && styles.show)}
      style={{ left: leftPixels + offsetX, top: topPixels + offsetY }}
      id={id}
    >
      <div className={styles.inner}>
        <Icon
          className={styles.closeIcon}
          variant="secondary"
          type="times"
          onClick={(() => setShow(false))}
        />
        {children}
      </div>
    </div>
  );
}

MapInfoBox.defaultProps = {
  show: false,
  setShow: () => {},
  className: '',
  positionY: 'bottom',
  positionX: '',
};

MapInfoBox.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  className: PropTypes.string,
  topPixels: PropTypes.string.isRequired,
  leftPixels: PropTypes.string.isRequired,
};
