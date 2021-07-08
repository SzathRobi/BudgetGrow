import { useState } from "react";
import { motion } from "framer-motion";
import styles from "../../styles/Filters/Filters.module.scss";

function Filters({ tab, tabPos, updateTab }) {
  const indicatorStyle = {
    width: tab === 0 ? "3rem" : "5.5rem",
  };

  return (
    <section className={styles.filters}>
      <div className={styles.btn_container}>
        <button className={styles.btn} onClick={() => updateTab(0, 0)}>
          ALL
        </button>
        <button className={styles.btn} onClick={() => updateTab(1, 53)}>
          INCOME
        </button>
        <button className={styles.btn} onClick={() => updateTab(2, 147)}>
          EXPENSE
        </button>
        <motion.div
          style={indicatorStyle}
          animate={{ x: tabPos }}
          className={styles.indicator}
        />
      </div>
    </section>
  );
}

export default Filters;
