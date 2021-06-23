import { motion } from "framer-motion";
import ToggleBtn from "../../comps/AddItem/ToggleBtn";
import styles from "../../styles/AddItem/AddItem.module.scss";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import nookies from "nookies";

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  return {
    props: {
      cookies: cookies,
    },
  };
}

const New = ({ cookies }) => {
  const [toggleChecked, setToggleChecked] = useState(true);
  const updateToggleChecked = () => setToggleChecked(!toggleChecked);

  const [title, setTitle] = useState("");
  const updateTitle = (event) => setTitle(event.target.value);
  const [amount, setAmount] = useState("");
  const updateAmount = (event) => setAmount(event.target.value);

  const createItem = (event) => {
    event.preventDefault();
    const newTransaction = {
      title: "tevepata",
      amount: 3000,
      income: true,
      users_permissions_user: cookies.user,
    };

    axios
      .post(
        `${process.env.PUBLIC_API_URL}/transactions` ||
          "http://localhost:1337/transactions",
        newTransaction
      )
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <motion.form
      initial={{ y: "100%" }}
      animate={{ y: "0" }}
      exit={{ y: "100%" }}
      transition={{ type: "tween" }}
      className={styles.new}
      onSubmit={() => createItem(event)}
    >
      <section className={styles.formSection}>
        <h3>Title</h3>
        <input
          value={title}
          onChange={() => {
            updateTitle(event);
          }}
          type="text"
          className={styles.input}
        />
      </section>
      <section className={styles.formSection}>
        <h3>Amount</h3>
        <input
          value={amount}
          onChange={() => updateAmount(event)}
          type="text"
          className={styles.input}
        />
      </section>
      <section className={styles.formSection}>
        <h3>{toggleChecked ? "INCOME" : "EXPENSE"}</h3>
        <ToggleBtn
          toggleChecked={toggleChecked}
          updateToggleChecked={updateToggleChecked}
        />
      </section>
      <section>
        <Link href="/">
          <a>Home</a>
        </Link>
        <button>ADD</button>
      </section>
    </motion.form>
  );
};

export default New;
