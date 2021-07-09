import React, { useEffect } from "react";
import styles from "../../../styles/Total/Circular.module.scss";

function Circular({ settings }) {
  let percent = (settings.current / settings.income) * 100;
  let sexyPercent = percent.toFixed(2);
  let barPercent = percent * 5;

  let reversedPercent = 500 - barPercent;

  const circleStyle = {
    strokeDashoffset: reversedPercent,
  };

  useEffect(() => {
    if (percent > 100) {
      percent === 100;
    }
    if (reversedPercent > 500) {
      reversedPercent === 100;
    }
  }, [percent]);

  return (
    <div className={styles.box}>
      <div className={styles.circle_container}>
        <svg>
          <circle style={circleStyle} cx="105" cy="105" r="70"></circle>
        </svg>
        <p className={styles.current}>{settings.current}$</p>
        <p className={styles.percent}>{sexyPercent}%</p>
      </div>
    </div>
  );
}

export default Circular;
