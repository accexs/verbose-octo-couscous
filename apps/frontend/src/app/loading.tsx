import React from "react";

import styles from "./loading.module.css";

const Loading: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black z-50">
      <div className={"animate-lightsaber-strike"}>
        <div className={styles.saber}></div>
      </div>
    </div>
  );
};

export default Loading;
