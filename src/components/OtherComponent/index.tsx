import React, { useState } from "react";
import styles from "./OtherComponent.module.scss";

const OtherComponent: React.FC<{ category: string }> = ({ category }) => {
  return (
    <div className={styles.layout}>
      <h2 className={styles.header}>{category}</h2>
    </div>
  );
};

export default OtherComponent;
