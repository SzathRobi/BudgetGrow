import styles from "../../styles/ItemsList/ListItem.module.scss" 

const ListItem = ({transaction}) => {

 /* let formattedDate = new Date(transaction.date)
  formattedDate.toLocaleTimeString()
  console.log(formattedDate)
*/

const indicatorColor = {
  backgroundColor: transaction.income ? "green" : "red",
  boxShadow: transaction.income 
    ? "2px 2px 10px green, inset 3px 3px 6px #000, inset -1px -2px 4px #575757"
    : "2px 2px 10px red, inset 3px 3px 6px #000, inset -1px -2px 4px #575757"
}

const amountColor = {
  color: transaction.income ? "green" : "red",
  textShadow: transaction.income ? "0 0 px green" : "0 0 2px red"
}

  return (
    <section className={styles.listItem}>
      <section>
        <h4 style={amountColor}>{transaction.amount} <span>FT</span></h4>
        <h4>{transaction.title}</h4> 
        
      </section>
      <div 
        className={styles.priceIndicator}
        style={indicatorColor}
      />
    </section>
  )
}

export default ListItem