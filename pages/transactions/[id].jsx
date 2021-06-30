import { motion } from "framer-motion";
import ToggleBtn from "../../comps/AddItem/ToggleBtn";
import styles from "../../styles/AddItem/AddItem.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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

const Update = ({ cookies }) => {
  const router = useRouter();
  const transaction_query = router.query;
  const [transaction, setTransaction] = useState(null);

  const [toggleChecked, setToggleChecked] = useState(true);
  const updateToggleChecked = () => setToggleChecked(!toggleChecked);

  const [title, setTitle] = useState("");
  const updateTitle = (event) => setTitle(event.target.value);
  const [amount, setAmount] = useState("");
  const updateAmount = (event) => setAmount(event.target.value);

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:1337/transactions/${transaction_query.id}`, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${cookies.jwt}`,
          },
        })
        .then((response) => {
          setTransaction(response.data);
          setTitle(response.data.title);
          setAmount(response.data.amount);
          setToggleChecked(response.data.income);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateItem = (event) => {
    event.preventDefault();
    try {
      const newTransaction = {
        title: title,
        amount: Number(amount),
        income: toggleChecked,
        user: JSON.parse(cookies.user),
      };

      axios
        .put(
          /*`${process.env.PUBLIC_API_URL}/transactions` ||*/
          `http://localhost:1337/transactions/${transaction_query.id}`,
          newTransaction,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${cookies.jwt}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          router.push("/");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.section
      initial={{ x: "100vw" }}
      animate={{ x: "0" }}
      exit={{ x: "100vw" }}
      transition={{ type: "tween" }}
      className={styles.new}
    >
      <form className={styles.newForm} onSubmit={(event) => updateItem(event)}>
        <section className={styles.formSection}>
          <h3>Title</h3>
          <input
            value={title}
            onChange={(event) => {
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
            onChange={(event) => updateAmount(event)}
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
          <button type="submit" className={styles.addBtn}>
            Update
          </button>
        </section>
      </form>
    </motion.section>
  );
};

export default Update;
