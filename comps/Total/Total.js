import styles from "../../styles/Total/Total.module.scss"

const Header = () => {
  return (
    <section className={styles.total_container}>
      <h1 className={styles.total_text}>Total</h1>
      <div className={styles.total_linecontainer}>
        <div className={styles.total_line}></div>
      </div>    
    </section>
  )
}

export default Header