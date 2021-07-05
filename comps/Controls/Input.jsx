import { useState, useEffect } from "react";
import styles from "../../styles/controls/Input.module.scss";

function Input({ labelText = "testText", value, handleChage }) {
  const [focused, setFocused] = useState(false);
  const focusIn = () => setFocused(true);
  const focusOut = () => setFocused(false);

  const textPosition = {
    transition: 300,
    top: focused ? "1rem" : "3.3rem",
    left: focused ? 0 : "0.5rem",
  };

  return (
    <label className={styles.label}>
      <p className={styles.label_text}>{labelText}</p>
      <input
        className={styles.input}
        value={value}
        onChange={handleChage}
        onFocus={focusIn}
        onBlur={focusOut}
        type="text"
      />
    </label>
  );
}

export default Input;
