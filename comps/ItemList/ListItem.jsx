import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useContext } from "react";
import BudgetContext from "../../context/budgetContext";
import styles from "../../styles/ItemsList/ListItem.module.scss";
import axios from "axios";
import { useRouter } from "next/router";

const ListItem = ({ transaction, cookies, settings }) => {
  const router = useRouter();
  const { setNavTabs } = useContext(BudgetContext);

  const indicatorColor = {
    backgroundColor: transaction.income ? "green" : "red",
    boxShadow: transaction.income
      ? "2px 2px 10px green, inset 3px 3px 6px #000, inset -1px -2px 4px #575757"
      : "2px 2px 10px red, inset 3px 3px 6px #000, inset -1px -2px 4px #575757",
  };

  const amountColor = {
    color: transaction.income ? "green" : "red",
    textShadow: transaction.income ? "0 0 px green" : "0 0 2px red",
  };

  const deleteItem = () => {
    try {
      //update current money before deleting item

      const newCurrent = {
        current: transaction.income
          ? (settings.current -= transaction.amount)
          : (settings.current += transaction.amount),
      };

      axios
        .put(
          /*`${process.env.PUBLIC_API_URL}/transactions` ||*/
          `https://budgetgrow.herokuapp.com/settings/${settings.id}`,
          newCurrent,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${cookies.jwt}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
        });

      //delete item

      axios
        .delete(
          `https://budgetgrow.herokuapp.com/transactions/${transaction.id}`,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${cookies.jwt}`,
            },
          }
        )
        .then((response) => {
          //success + pagereload for ui update
          console.log("item succesfully deleted");
          console.log(response);
          router.reload();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const goToUpdate = () => {
    setNavTabs(10);
    router.push(`/transactions/${transaction.id}`);
  };

  return (
    <motion.section
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        duration: 0.3,
        type: "spring",
        damping: 10,
        stiffness: 100,
      }}
      className={styles.listItem}
    >
      <section>
        <h4 style={amountColor}>
          {transaction.amount} <span>FT</span>
        </h4>
        <h4>{transaction.title}</h4>
      </section>
      <section className={styles.btnContainer}>
        <FontAwesomeIcon
          onClick={goToUpdate}
          className={styles.icon}
          icon={faPenSquare}
        />
        <FontAwesomeIcon
          onClick={() => deleteItem()}
          className={styles.icon}
          icon={faTrash}
        />
        <div className={styles.priceIndicator} style={indicatorColor} />
      </section>
    </motion.section>
  );
};

export default ListItem;
