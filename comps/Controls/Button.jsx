import React from "react";
import styles from "../../styles/controls/Button.module.scss";

function Button({ text, handleClick = null }) {
  return (
    <button onClick={handleClick} className={styles.btn}>
      {text}
    </button>
  );
}

export default Button;
