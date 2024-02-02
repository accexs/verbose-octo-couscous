import React from "react";

import styles from "./loading.module.css";

const Loading: React.FC = () => {
  return (
    <main className={"flex flex-col items-center justify-center"}>
      <div className={styles.saber}></div>
    </main>
  );
};

export default Loading;
