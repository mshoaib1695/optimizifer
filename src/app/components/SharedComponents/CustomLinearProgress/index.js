import React from "react";

const CustomLinearProgress = ({ value, max, indeterminate }) => {
  const percentage = (value / max) * 100;

  return (
    <div className={"progressBar"}>
      <div
        className={
          indeterminate ? "progressBarIndeterminate" : "progressBarFill"
        }
        style={{ width: indeterminate ? "100%" : `${percentage}%` }}
      ></div>
    </div>
  );
};

export default CustomLinearProgress;
