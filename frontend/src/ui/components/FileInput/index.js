import React from 'react';
import PropTypes from 'prop-types';
import Image from 'ui/components/Image';
import Icon from 'ui/components/Icon';
import clsx from 'clsx';
import styles from './FileInput.module.css';

// only handling one input of type "image" at the moment, but can be expanded in the future
export default function FileInput({
  className,
  value,
  imageClassName,
  placeholderText,
  onChange,
  hasError,
  onError,
  onDelete,
}) {
  const [file, setFile] = React.useState(null);
  const [invalidFile, setInvalidFile] = React.useState(false);

  function findInput(elem) {
    if (elem.className.indexOf('file-image-wrapper') >= 0) {
      return elem.querySelector('.file-input');
    }
    if (elem.nodeName === 'IMG') {
      return elem.parentElement.parentElement.querySelector('.file-input');
    }
    return elem.parentElement.querySelector('.file-input');
  }

  function previewImage(e) {
    if (value && value.length > 0) {
      onDelete();
    }

    setFile(URL.createObjectURL(e.target.files[0]));
  }

  function removeFile(e) {
    try {
      findInput(e.target).value = '';
      setFile(null);
      onChange(null);
    } catch (error) {
      console.error(error);
    }
    e.stopPropagation();
  }

  function validateType(e) {
    if (!(e.target
      && e.target.files
      && e.target.files[0])) {
      return false;
    }
    if (!RegExp('image/*').test(e.target.files[0].type)) {
      removeFile(e);
      setInvalidFile(true);
      onError('Invalid file type.');
      return false;
    }
    return true;
  }

  function openDialog(e) {
    try {
      findInput(e.target).click();
      setInvalidFile(false);
    } catch (error) {
      console.error(error);
    }
  }

  function onChangeHandler(e) {
    if (validateType(e)) {
      previewImage(e);
      onChange(e.target.files[0]);
    }
  }

  function onDeleteHandler(e) {
    e.stopPropagation();
    onDelete();
  }

  return (
    <div className={clsx(styles.fileInputsWrapper, className)}>
      <div className={clsx(styles.fileImageWrapper, 'file-image-wrapper')} onClick={openDialog} role="presentation">
        {file ? <Icon type="times" variant="secondary" className={styles.closeIcon} onClick={removeFile} /> : ''}
        {value ? <Icon type="times" variant="secondary" className={styles.closeIcon} onClick={onDeleteHandler} /> : ''}
        <input
          type="file"
          className={clsx(styles.fileInput, 'file-input')}
          onChange={onChangeHandler}
          accept="image/*"
          onError={removeFile}
        />
        <Image
          src={value && value.length > 0 ? value : file}
          placeholderText={placeholderText}
          className={clsx(
            styles.previewImage,
            (hasError || invalidFile) && styles.error,
            imageClassName,
          )}
        />
      </div>
    </div>
  );
}

FileInput.defaultProps = {
  className: '',
  value: '',
  imageClassName: '',
  placeholderText: '',
  onChange: () => {},
  onError: () => {},
  onDelete: () => {},
};

FileInput.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  imageClassName: PropTypes.string,
  placeholderText: PropTypes.string,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  onDelete: PropTypes.func,
};
