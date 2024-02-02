"use client";
import React, { useState } from "react";
import styles from "./index.module.css";

type TextCrawlProps = {
  text: string;
};

const TextCrawl: React.FC<TextCrawlProps> = ({ text }: TextCrawlProps) => {
  const [replay, setReplay] = useState(false);

  const handleReplayClick = () => {
    setReplay(!replay);
  };

  return (
    <div className={"my-10 w-full bg-black rounded relative"}>
      <button
        className={"btn btn-xs absolute top-2 right-2"}
        onClick={handleReplayClick}
      >
        {replay ? "Replay" : "Pause"}
      </button>
      <div className={styles.perspectiveContainer}>
        <div
          className={"px-36 py-14 text-center overflow-hidden h-64 uppercase"}
        >
          <div className={`${styles.textCrawl} ${replay ? styles.replay : ""}`}>
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextCrawl;
