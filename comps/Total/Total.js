import styles from "../../styles/Total/Total.module.scss";
import Circular from "./progress/Circular";

const Total = () => {
  return (
    <section className={styles.total_container}>
      <Circular />
      <h1 className={styles.total_text}>Total</h1>
      <div className={styles.total_linecontainer}>
        <div className={styles.total_line}></div>
      </div>
    </section>
  );
};

export default Total;
