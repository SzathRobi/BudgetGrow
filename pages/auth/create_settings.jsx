import axios from "axios";
import { motion } from "framer-motion";
import nookies from "nookies";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../../styles/auth/CreateSettings.module.scss";
import Button from "../../comps/Controls/Button";

/**
 * IIIIIIIIIII
 *
 * settings_form: have to add onSubmit hook + header: {display: hidden}
 *
 * IIIIIIIIIII
 */

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  return {
    props: {
      cookies: cookies,
    },
  };
}

function Create_settings({ cookies }) {
  const router = useRouter();

  const API_URL = "https://budgetgrow.herokuapp.com";

  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [current, setCurrent] = useState("");
  const updateState = (type, event) => type(event.target.value);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const createSettings = (event) => {
    event.preventDefault();

    const newSetting = {
      income,
      expense,
      current,
      user: JSON.parse(cookies.user),
    };

    axios
      .post(`${API_URL}/settings`, newSetting, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${cookies.jwt}`,
        },
      })
      .then((response) => {
        // Handle success.

        router.push("/");
        // Check response in console
        console.log("RESPONSE:", response);
        console.log("Well done!");
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error);
      });
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.settings}
    >
      <form
        onSubmit={(event) => createSettings(event)}
        className={styles.settings_form}
      >
        <h1>Settings</h1>
        <label className={styles.label}>
          <p>Monthly Income</p>
          <input
            type="text"
            {...register("monthly_income", { required: true })}
          />
          {errors.monthly_income?.type === "required" && (
            <p className={styles.error_text}>Monthly income is required</p>
          )}
        </label>
        <label className={styles.label}>
          <p>Monthly Expense</p>
          <input
            type="text"
            {...register("monthly_expense", { required: true })}
          />
          {errors.monthly_expense?.type === "required" && (
            <p className={styles.error_text}>Monthly expense is required</p>
          )}
        </label>
        <label className={styles.label}>
          <p>Current amount of money</p>
          <input type="text" {...register("current", { required: true })} />
          {errors.current?.type === "required" && (
            <p className={styles.error_text}>Monthly income is required</p>
          )}
        </label>
        <Button text="OK" />
      </form>
    </motion.section>
  );
}

export default Create_settings;
