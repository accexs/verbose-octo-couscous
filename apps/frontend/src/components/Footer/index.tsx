import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      className={
        "m-10 mt-14 flex flex-col items-center rounded-2xl bg-dark text-light"
      }
    >
      <h3 className={"mt-8 px-4 text-center text-2xl font-medium capitalize"}>
        Developed by
      </h3>
      <p className={"mt-5 w-3/4 px-4 text-center text-base font-light"}>
        Ronny Arvelo
      </p>
      <div
        className={
          "relative mt-14 flex w-full flex-row items-center justify-between border-t border-solid border-light px-8 py-6 font-medium"
        }
      >
        <span className={"text-center"}>
          &copy; 2023 All rights reserved.
        </span>
        <div className={"text-center"}>Made with all love.</div>
      </div>
    </footer>
  );
};

export default Footer;
