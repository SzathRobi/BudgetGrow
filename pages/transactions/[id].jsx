import { motion } from "framer-motion";
import ToggleBtn from "../../comps/AddItem/ToggleBtn";
import styles from "../../styles/AddItem/AddItem.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import nookies from "nookies";

export async function getServerSideProps(ctx) {
  const API_URL = "https://budgetgrow.herokuapp.com";
  const cookies = nookies.get(ctx);
  const settingResponse = await fetch(`${API_URL}/settings`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });
  const settings = await settingResponse.json();
  return {
    props: {
      cookies,
      settings,
      API_URL,
    },
  };
}

const Update = ({ cookies, settings, API_URL }) => {
  const router = useRouter();
  const transaction_query = router.query;
  const [transaction, setTransaction] = useState(null);

  const [origiToggleChecked, setOrigiToggleChecked] = useState(true);
  const [toggleChecked, setToggleChecked] = useState(true);
  const updateToggleChecked = () => setToggleChecked(!toggleChecked);

  const [title, setTitle] = useState("");
  const updateTitle = (event) => setTitle(event.target.value);
  const [origiAmount, setOrigiAmount] = useState(null);
  const [amount, setAmount] = useState("");
  const updateAmount = (event) => setAmount(event.target.value);

  useEffect(() => {
    try {
      axios
        .get(`${API_URL}/transactions/${transaction_query.id}`, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${cookies.jwt}`,
          },
        })
        .then((response) => {
          setTransaction(response.data);
          setTitle(response.data.title);
          setOrigiAmount(response.data.amount);
          setAmount(response.data.amount);
          setOrigiToggleChecked(response.data.income);
          setToggleChecked(response.data.income);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateSettings = (newCurrent) =>
    axios
      .put(`${API_URL}/settings/${settings[0].id}`, newCurrent, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${cookies.jwt}`,
        },
      })
      .then((response) => {
        console.log(response);
      });

  const updateItem = (event) => {
    event.preventDefault();
    try {
      const newTransaction = {
        title: title,
        amount: Number(amount),
        income: toggleChecked,
        user: JSON.parse(cookies.user),
      };

      let newCurrent = {
        current: null,
      };

      //check if user changed income
      if (toggleChecked === origiToggleChecked) {
        //true => check amount is changed
        if (origiAmount !== newTransaction.amount) {
          //if changed do some math magic
          let difference = newTransaction.amount - origiAmount;

          console.log("difference:", difference);

          (newCurrent.current = toggleChecked
            ? (settings[0].current += difference)
            : (settings[0].current -= difference)),
            console.log(newCurrent);
        }
        updateSettings(newCurrent);
      }
      //income changed
      else {
        (newCurrent.current = toggleChecked
          ? (settings[0].current += newTransaction.amount)
          : (settings[0].current -= newTransaction.amount)),
          console.log("newCurrent:", newCurrent);
      }

      updateSettings(newCurrent);

      axios
        .put(
          /*`${process.env.PUBLIC_API_URL}/transactions` ||*/
          `${API_URL}/transactions/${transaction_query.id}`,
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
