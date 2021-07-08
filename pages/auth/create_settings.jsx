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
 * TODO: header: {display: hidden}
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
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    const newSetting = {
      income: data.income,
      expense: data.expense,
      current: data.current,
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
        setLoading(false);
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
      <form onSubmit={handleSubmit(onSubmit)} className={styles.settings_form}>
        <h1>Settings</h1>
        <label className={styles.label}>
          <p>Monthly Income</p>
          <input
            type="text"
            {...register("income", { required: true, pattern: /^[0-9]*$/ })}
          />
          {errors.income?.type === "required" && (
            <p className={styles.error_text}>Monthly income is required</p>
          )}
          {errors.income?.type === "pattern" && (
            <p className={styles.error_text}>Only numbers accepted</p>
          )}
        </label>
        <label className={styles.label}>
          <p>Monthly Expense</p>
          <input
            type="text"
            {...register("expense", { required: true, pattern: /^[0-9]*$/ })}
          />
          {errors.expense?.type === "required" && (
            <p className={styles.error_text}>Monthly expense is required</p>
          )}
          {errors.expense?.type === "pattern" && (
            <p className={styles.error_text}>Only numbers accepted</p>
          )}
        </label>
        <label className={styles.label}>
          <p>Current amount of money</p>
          <input
            type="text"
            {...register("current", { required: true, pattern: /^[0-9]*$/ })}
          />
          {errors.current?.type === "required" && (
            <p className={styles.error_text}>Monthly income is required</p>
          )}
          {errors.current?.type === "pattern" && (
            <p className={styles.error_text}>Only numbers accepted</p>
          )}
        </label>
        <Button text="OK" />
      </form>
    </motion.section>
  );
}

export default Create_settings;
