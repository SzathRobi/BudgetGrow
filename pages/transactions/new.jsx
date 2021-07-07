import { motion } from "framer-motion";
import ToggleBtn from "../../comps/AddItem/ToggleBtn";
import Input from "../../comps/Controls/Input";
import Button from "../../comps/Controls/Button";
import styles from "../../styles/AddItem/AddItem.module.scss";
import { useState } from "react";
import Link from "next/link";
import router, { useRouter } from "next/router";
import axios from "axios";
import nookies from "nookies";

export async function getServerSideProps(ctx) {
  const API_URL = "https://budgetgrow.herokuapp.com";
  const cookies = nookies.get(ctx);
  const settingsResponse = await fetch(`${API_URL}/settings`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });
  const settings = await settingsResponse.json();
  return {
    props: {
      cookies,
      settings,
      API_URL,
    },
  };
}

const New = ({ cookies, settings, API_URL }) => {
  const settingId = settings[0].id;
  const router = useRouter();

  const [toggleChecked, setToggleChecked] = useState(true);
  const updateToggleChecked = () => setToggleChecked(!toggleChecked);

  const [title, setTitle] = useState("");
  const updateTitle = (event) => setTitle(event.target.value);
  const [amount, setAmount] = useState("");
  const updateAmount = (event) => setAmount(event.target.value);

  const createItem = (event) => {
    event.preventDefault();
    try {
      //put

      const newCurrent = {
        current: toggleChecked
          ? (settings[0].current += Number(amount))
          : (settings[0].current -= Number(amount)),
      };

      axios
        .put(
          /*`${process.env.PUBLIC_API_URL}/transactions` ||*/
          `${API_URL}/settings/${settingId}`,
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

      const newTransaction = {
        title: title,
        amount: Number(amount),
        income: toggleChecked,
        user: JSON.parse(cookies.user),
      };

      axios
        .post(
          /*`${process.env.PUBLIC_API_URL}/transactions` ||*/
          `${API_URL}/transactions`,
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween" }}
      className={styles.new}
    >
      <form className={styles.newForm} onSubmit={(event) => createItem(event)}>
        <Input
          labelText="Title"
          value={title}
          handleChage={(event) => updateTitle(event)}
        />
        <Input
          labelText="Amount"
          value={amount}
          handleChage={(event) => updateAmount(event)}
        />
        <section className={styles.formSection}>
          <h3>{toggleChecked ? "INCOME" : "EXPENSE"}</h3>
          <ToggleBtn
            toggleChecked={toggleChecked}
            updateToggleChecked={updateToggleChecked}
          />
        </section>
        <Button text="ADD" />
      </form>
    </motion.section>
  );
};

export default New;
