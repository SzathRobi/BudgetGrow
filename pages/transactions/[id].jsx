import { motion } from "framer-motion";
import BudgetContext from "../../context/budgetContext";
import Button from "../../comps/Controls/Button";
import Input from "../../comps/Controls/Input";
import ToggleBtn from "../../comps/AddItem/ToggleBtn";
import styles from "../../styles/AddItem/AddItem.module.scss";
import { useContext, useEffect, useState } from "react";
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
  const { setNavTabs } = useContext(BudgetContext);
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
    setNavTabs(10);
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.new}
    >
      <form className={styles.newForm} onSubmit={(event) => updateItem(event)}>
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
        <Button text="Update" />
      </form>
    </motion.section>
  );
};

export default Update;
