import styles from "../../styles/AddItem/ToggleBtn.module.scss"

const ToggleBtn = ({toggleChecked, updateToggleChecked}) => {
  return (
    <input 
      className={styles.checkbox} 
      type="checkbox"
      onChange={updateToggleChecked}
      checked={toggleChecked}
    />
  )
}

export default ToggleBtn