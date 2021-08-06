import React from 'react';
import styles from './Tabs.module.css';

export default function TabControls({
  children,
}) {
  return <div className={styles.tabControls}>{children}</div>;
}
