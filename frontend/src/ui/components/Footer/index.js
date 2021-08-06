import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="privacy" className={styles.confidential}>
        Confidential
      </a>
    </footer>
  );
}
