import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'ui/components/Icon';
import Image from 'ui/components/Image';
import clsx from 'clsx';
import styles from './UserImage.module.css';

export default function UserImage({
  user,
  className,
  variant,
}) {
  return (
    <div className={clsx(styles.userImageContainer, className)}>
      {user && user._id && user.imageExt
        ? <Image src={`platform-user/image/${user._id}${user.imageExt}`} />
        : (
          <Icon
            className={clsx(!variant && styles.userIcon)}
            type="user"
            variant={variant}
          />
        )}
    </div>
  );
}

UserImage.defaultProps = {
  user: { _id: null, imageExt: null },
  className: null,
};

UserImage.propTypes = {
  user: PropTypes.object,
  className: PropTypes.string,
};
