import React from 'react';
import PropTypes from 'prop-types';
import placeholder from 'ui/assets/images/placeholder.png';
import clsx from 'clsx';
import styles from './Image.module.css';

export default function Image({
  src,
  alt,
  placeholderText,
  className,
}) {
  const base = process.env.REACT_APP_API_URL || 'http://localhost:3000';

  function showPlaceholder(img) {
    img.target.src = placeholder;
    img.target.parentElement.className = `${img.target.parentElement.className} ${styles.hasPlaceholder}`;
  }

  function setUrl(url) {
    if (url.indexOf('//') < 0) {
      return `${base}/${url}`;
    }

    return url;
  }

  return (
    <div
      className={clsx(
        styles.textInputWrapper,
        styles.imageWrapper,
        !src && styles.hasPlaceholder,
        placeholderText.length > 0 && styles.hasPlaceholderText,
        !src && styles.hasPlaceholder,
        className,
      )}
    >
      {src
        ? (
          <img
            className={styles.img}
            src={setUrl(src)}
            alt={alt || ''}
            onError={showPlaceholder}
          />
        )
        : (
          <img
            className={styles.img}
            src={placeholder}
            alt={alt || ''}
          />
      )}
      {placeholderText.length > 0 ? <div className={styles.imagePlaceholderText}>{placeholderText}</div> : ''}
    </div>
  );
}

Image.defaultProps = {
  src: null,
  alt: '',
  placeholderText: '',
  className: '',
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  placeholderText: PropTypes.string,
  className: PropTypes.string,
};
