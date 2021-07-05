import { AnimatePresence } from "framer-motion";
import FilterBtns from "./FilterBtns";
import ListItem from "./ListItem";

import styles from "../../styles/ItemsList/ItemList.module.scss";

const ItemList = ({
  cookies,
  settings,
  tab,
  transactions = [],
  transaction_income,
  transaction_expense,
}) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <section className={styles.itemList} key={tab}>
        {tab === 0 &&
          transactions.map((transaction) => (
            <ListItem
              key={transaction.id}
              cookies={cookies}
              settings={settings}
              transaction={transaction}
            />
          ))}
        {tab === 1 &&
          transaction_income.map((transaction) => (
            <ListItem
              key={transaction.id}
              cookies={cookies}
              settings={settings}
              transaction={transaction}
            />
          ))}
        {tab === 2 &&
          transaction_expense.map((transaction) => (
            <ListItem
              key={transaction.id}
              cookies={cookies}
              settings={settings}
              transaction={transaction}
            />
          ))}
      </section>
    </AnimatePresence>
  );
};

export default ItemList;
