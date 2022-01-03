import React from "react";
import styles from "./index.less";

const FasPage = ({ children }) => {
  return <div className={styles.page}>{children}</div>;
};
export default FasPage;
