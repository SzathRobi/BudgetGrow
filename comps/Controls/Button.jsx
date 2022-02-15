import React from "react";
import styles from "../../styles/controls/Button.module.scss";

function Button({ text, handleClick = null, style = null }) {
  return (
    <button onClick={handleClick} className={styles.btn} style={style}>
      {text}
    </button>
  );
}

export default Button;
