import React from "react";
import { GlobalStateContext } from "context/GlobalContext";
import Loader from "ui/components/Loader";
import Footer from "ui/components/Footer";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  const { state } = React.useContext(GlobalStateContext);

  return (
    <div className={styles.pageWrapper}>
      <link
        id="theme"
        rel="stylesheet"
        type="text/css"
        href={`${process.env.PUBLIC_URL}/themes/blue-light.css`}
      />
      <div className={styles.layoutWrapper}>
        <div>
          {children}
          <Loader isLoading={state.isLoading} size="large" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
