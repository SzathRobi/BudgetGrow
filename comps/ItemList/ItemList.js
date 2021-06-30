import FilterBtns from "./FilterBtns";
import ListItem from "./ListItem";

import styles from "../../styles/ItemsList/ItemList.module.scss";

const ItemList = ({ transactions = [], cookies }) => {
  return (
    <section className={styles.itemList}>
      <section>
        {transactions.map((transaction) => (
          <ListItem
            key={transaction.id}
            cookies={cookies}
            transaction={transaction}
          />
        ))}
      </section>
    </section>
  );
};

export default ItemList;
