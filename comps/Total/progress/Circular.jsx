import React from "react";
import styles from "../../../styles/Total/Circular.module.scss";

function Circular({ total = 400, current = 100 }) {
  let percent = (current / total) * 100;
  let barPercent = percent * 5;

  let reversedPercent = 500 - barPercent;

  const circleStyle = {
    strokeDashoffset: reversedPercent,
  };

  return (
    <div className={styles.box}>
      <div className={styles.circle_container}>
        <svg>
          <circle style={circleStyle} cx="90" cy="90" r="80"></circle>
        </svg>
        <p className={styles.current}>{current}$</p>
        <p className={styles.counter}>{percent}%</p>
      </div>
    </div>
  );
}

export default Circular;
