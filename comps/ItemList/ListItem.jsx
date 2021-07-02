import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import styles from "../../styles/ItemsList/ListItem.module.scss";
import axios from "axios";
import { useRouter } from "next/router";

const ListItem = ({ transaction, cookies }) => {
  /* let formattedDate = new Date(transaction.date)
  formattedDate.toLocaleTimeString()
  console.log(formattedDate)
*/

  const router = useRouter();

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
      axios.delete(`http://localhost:1337/transactions/${transaction.id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${cookies.jwt}`,
        },
      });
      console.log("item succesfully deleted");
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const goToUpdate = () => router.push(`/transactions/${transaction.id}`);

  return (
    <motion.section
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
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
