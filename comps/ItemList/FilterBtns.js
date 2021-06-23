import styles from "../../styles/ItemsList/FilterBtns.module.scss"

const FilterBtns = () => {
  return (
    <section className={styles.filterBtns}>
      <button className={styles.filterBtn}>ALL</button>    
      <button className={styles.filterBtn}>INCOME</button>    
      <button className={styles.filterBtn}>EXPENSE</button>    
    </section>
  )
}

export default FilterBtns